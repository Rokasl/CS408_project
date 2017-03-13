module Compiler where

import Shonky.Syntax

import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace



type EnvTable = [(String, Int)] -- environment lookup table
type FTable = [(String, Int)] -- operator lookup table

--   patCompile :: .. -- whatever JSComp we're matching
--      -> Pat -> Counter (EnvTable, ..JS code to make a JSVal[])
--   vpatCompile :: .. -- whatever JSVal we're matching
--      -> VPat -> Counter (EnvTable, ..JS code to make a JSVal[])


newtype Counter x = MkCounter {
    runCounter :: Int -> (x, Int)
    }

instance Functor Counter where
        fmap = liftM

instance Applicative Counter where
        pure  = return
        (<*>) = ap

instance Monad Counter where 
    return x = MkCounter $ \ next -> (x, next)
    m >>= k = MkCounter $ \ next -> let (a, next') = runCounter m next
                                        in  runCounter (k a) next'

next :: Counter Int
next = MkCounter (\ i -> (i, i+1)) 

type JSExp = String
type JSStmt = String
type JSMode = String

matchFail :: JSStmt
matchFail = "throw(\"no match\");" -- FIXME!

patCompile  :: JSExp -- representing the scrutinee of the match
            -> Pat   -- the Shonky computation pattern
            -> Counter (  EnvTable  -- mapping Shonky vars to env indices
                       ,  JSStmt    -- the code that builds the environment
                       )


patCompile c (PV p) = do
  (e,m) <- vpatCompile (c ++ ".value") p
  return (e, "if (" ++ c ++ ".tag!==\"value\") {" ++ matchFail ++"};\n" ++ m)


patCompile c (PT x) = do
  i <- next
  return ([(x, i)], "if (" ++ c ++".tag!=\"value\"){"++ matchFail ++"};\n"
                    ++ "if("++ c ++".value.tag!=\"thunk\"){"++ matchFail ++"};\n"
                    ++ "if("++ c ++".value.thunk!=\""++ x ++"\"){"++ matchFail ++"};\n"
                    ++ "env[" ++ show i ++ "]=" ++ c ++ ".value;\n")


patCompile c (PC command vpats var) = do
  i <- next
  return ([(var, i)], "if (" ++ c ++".tag!=\"command\"){"++ matchFail ++"};\n"
                    ++ "env[" ++ show i ++ "]=" ++ c ++ ".value;\n")

  

vpatCompile  :: JSExp -- representing the scrutinee of the match
             -> VPat  -- the Shonky value pattern
             -> Counter (  EnvTable  -- mapping Shonky vars to env indices
                        ,  JSStmt    -- the code that builds the environment
                        )

vpatCompile v (VPV x) = do -- string variable
  i <- next
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ v ++ ";\n")

vpatCompile v (VPI x) = do -- integer variable
  i <- next
  return ([(show x, i)], "env[" ++ show i ++ "]=" ++ v ++ ";\n")

vpatCompile v (VPA a) = do -- atom value
  return ([],
    "if (" ++ v ++ ".tag!==\"atom\") {" ++ matchFail ++"};\n" ++
    "if (" ++ v ++ ".atom!==\"" ++ a ++ "\") {" ++ matchFail ++"};\n"
    )

vpatCompile v (p1 :&: p2) = do
  (t1, e1) <- vpatCompile (v ++ ".car") p1
  (t2, e2) <- vpatCompile (v ++ ".cdr") p2
  return (t1 ++ t2,
    "if (" ++ v ++ ".tag!==\"pair\") {" ++ matchFail ++"};\n" ++
    e1 ++ e2)



listOf  :: (JSExp -> p -> Counter (EnvTable, JSStmt))
             -- could be patCompile or vpatCompile
        -> JSExp -> [p] -> Counter (EnvTable, JSStmt)
listOf comp arr ps = go (zip [0..] ps) where
  go [] = return ([], "")
  go ((i,p) : ips) = do
    (t1, e1) <- comp (arr ++ "[" ++ show i ++ "]") p
    (t2, e2) <- go ips
    return (t1 ++ t2, e1 ++ e2)


-- lifted from earlier experiment

newtype CodeGen val = MkCodeGen {
            codeGen :: Int -- next available number (for naming helper functions)
                       -> ([(  Int        -- this number...
                            ,  String     -- ...defined as this JS code
                           )]
                          ,  Int       -- next available number after compilation
                          ,  val       -- result of compilation process
                          )  -- usually the list of definitions will start with
        }                    -- the input "next number" and go up to just before
                             -- the output "next number"
                             

instance Functor CodeGen where
        fmap = liftM

instance Applicative CodeGen where
        pure  = return
        (<*>) = ap

instance Monad CodeGen where
        return val = MkCodeGen $ \ next -> ([], next, val)
        ag >>= a2bg = MkCodeGen $ \ next ->
            case codeGen ag next of
                (ac, next, a) -> case 
                    codeGen(a2bg a) next of
                        (bc, next, b) -> (ac ++ bc, next, b)

instance Monoid x => Monoid (CodeGen x) where
        mempty = pure mempty
        mappend ca cb = mappend <$> ca <*> cb 

genDef :: String -> CodeGen Int -- make a definition and return its number
genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)


expFun
  :: EnvTable     -- maps variable names to env indices
  -> FTable
  -> Exp          -- Shonky source code
  -> CodeGen Int

expFun xis ftable e = do
  js <- expCompile xis ftable "stk" e
  genDef ("function(stk,env){return " ++ js ++ "}")

expCompile
  :: EnvTable     -- maps variable names to env indices
  -> FTable
  -> JSExp        -- stack
  -> Exp          -- Shonky source code
  -> CodeGen JSExp

expCompile xis ftable stk (EV x) = case lookup x xis of
  Just i -> return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:env[" ++ show i ++ "]}}"
  Nothing -> case lookup x ftable of
    Nothing -> error "It's not a pattern variable!"
    Just i -> return $ "{stack:"++ stk ++", comp:{tag:\"value\", value:{tag:\"operator\", operator:"++ show i ++"}}}"

expCompile xis ftable stk (EI x) = 
  return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:{tag:\"integer\", integer:\"" ++ show x ++ "\"}}}"

expCompile xis ftable stk (EA a) = 
  return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:{tag:\"atom\", atom:\"" ++ a ++ "\"}}}"

expCompile xis ftable stk (ecar :& ecdr) = do
  fcdr <- expFun xis ftable ecdr
  expCompile xis ftable 
    ("{prev: " ++ stk ++ ", frame:{ tag:\"car\", env:env, cdr:" ++ show fcdr ++ "}}")
    ecar
  
expCompile xis ftable stk (ef :$ exs) = do
 ftail <- tailCompile xis ftable (ef :$ exs)
 expCompile xis ftable 
    ("{prev: " ++ stk ++ ", frame:{ tag:\"fun\", env:env, args:" 
      ++ ftail ++"}}")
    ef

tailCompile :: EnvTable -> FTable -> Exp -> CodeGen JSExp
tailCompile xis ftable (ef :$ []) = do
  return $ "null"
tailCompile xis ftable (ef :$ exs) = do
  fexs <- expFun xis ftable (head exs)
  ftail <- tailCompile xis ftable (ef :$ tail exs)
  return $ "{head:"++ show fexs ++", tail: "++ ftail ++"}"


lineCompile :: ([Pat], Exp) -> FTable -> CodeGen JSStmt
lineCompile (ps, e) ftable = do
  let ((xis, patJS), _) = runCounter (listOf patCompile "args" ps) 0
  expJS <- expCompile xis ftable "stk" e
  return $ "{" ++ patJS ++ "return " ++ expJS ++ "\n}"

-- codeGen (lineCompile ([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")) 0

linesCompile :: [([Pat], Exp)] -> FTable -> CodeGen JSStmt
linesCompile [] ftable = return "throw(\"undefined function\")"
linesCompile (l : ls) ftable = do
  ctry   <- lineCompile l ftable
  ccatch <- linesCompile ls ftable
  return $ "try " ++ ctry ++ " catch (err) {" ++ ccatch ++ "}"

funCompile :: [([Pat], Exp)] -> FTable -> CodeGen JSStmt
funCompile ls ftable = do
  c <- linesCompile ls ftable
  return $ "function(stk,args){var env=[];\n" ++ c ++ "\n}"

-- codeGen (funCompile [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")]) 0

-- ([DF "fib" [[]] [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")] ])

-- codeGen (operatorCompile ([DF "fib" [[]] [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")] ])) 0

-- helper function for operatorCompile
oneCompile :: FTable -> (String, ([[String]],[([Pat], Exp)])) -> CodeGen JSStmt
oneCompile ftable (f,(h, pse)) = do
  jsf <- funCompile pse ftable
  case lookup f ftable of
    Nothing -> error "Bug! - Something is not right with operator lookup table"
    Just n -> return $ "operator["++ show n ++"]={interface:" ++ availableCommands h
                       ++ ",implementation:" ++ jsf ++ "};\n"

availableCommands :: [[String]] -> String
availableCommands [] = "null"
availableCommands ([] : []) = "null"
availableCommands (e : []) = "{head:["++ arrayCommands e ++"], tail: null}"
availableCommands (e : es) = "{head:["++ arrayCommands e ++"], tail:"++ availableCommands es ++"}"

arrayCommands :: [String] -> String
arrayCommands [] = ""
arrayCommands (e : []) = "\"" ++ e ++ "\""
arrayCommands (e : es) = "\"" ++ e ++ "\"," ++ arrayCommands es

-- Top Level Compiler - compile all top level functions
operatorCompile :: [Def Exp] -> CodeGen (FTable, JSStmt)
operatorCompile ds = do
  let fs = [(f, (h, pse)) | DF f h pse <- ds]
  let ftable = zipWith (\ (f, _) i -> (f, i)) fs [0..]
  x <- foldMap (oneCompile ftable) fs
  return (ftable, x)

jsSetup  ::  String       -- array name
         ->  CodeGen (FTable, JSStmt)    -- compilation process
         ->  String    -- a big pile of JS

jsSetup arr comp =   "var operator = [];\n"
                     ++ "var " ++ arr ++ " = [];\n"
                     ++ x
                     ++ (defs >>= def) ++ "module.exports = ["
                     ++ arr ++ ", operator];\n"
  where
    (defs, _, (ftable, x)) = codeGen comp 0
    def (i, c) = arr ++ "[" ++ show i ++ "] = " ++ c ++ ";\n"

-- example jsComplete "prog" ( operatorCompile ([DF "fib" [[]] [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")] ]))
-- example jsComplete "prog" ( operatorCompile ([DF "test2" [[]] [([PV (VPV "x"), PV (VPV "y"), PV (VPV "z")], EV "y" :$ [EV "x", EV "z"])] ]))
jsWrite :: String -> IO()
jsWrite code = writeFile "machine/dist/gen.js" code

jsComplete :: String -> CodeGen (FTable, JSStmt) -> IO()
jsComplete  arr comp = jsWrite (jsSetup arr comp)

parseShonky :: String -> String -> IO()
parseShonky name path = do
  contents <- readFile path
  jsComplete name (parser contents)

parser :: String -> CodeGen(FTable, JSStmt)
parser contents = case (parse pProg contents) of
  Nothing -> operatorCompile ([DF "error" [[]] []])
  Just (xs, name) -> operatorCompile xs



-- Type definitions!!! 
-- Possible improvement - code them into haskell, so that the haskell would enforce them.

-- jstype JSRun = (JSVal[], JSStack) -> JSMode
-- jstype JSMode = {stack: JSStack, comp: JSComp}     

-- jstype JSStack 
--   = null
--   | {prev: JSStack, frame: JSFrame }

-- jstype JSFrame 
--   = null
--   | {tag:"car", env: JSEnv, cdr: Int }
--   | {tag:"cdr", car: JSVal }
--   | {tag:"fun", env: JSEnv, args: JSList Int }
--   | {tag:"args", fun: JSVal, ready: JSComp[], env: JSEnv, waiting: JSList Int }

-- jstype JSList x
--   = null
--   | {head : x, tail : JSList x}    

-- jstype JSComp
--   = {tag:"value", value: JSVal}
--   | {tag:"command", command: String, args: JSVal[], callback:JSCallBack}

-- jstype JSCallBack
--   = null
--   | {frame: JSFrame, callback:JSCallBack}

-- jstype JSVal
--   = {tag:"atom", atom: String}
--   | {tag:"int", int: Int}
--   | {tag:"pair", car: JSValue, cdr: JSValue}
--   | {tag:"operator", operator: Int}
--   | {tag:"callback", callback: JSCallBack}
--   | {tag:"thunk", thunk:JSComp}

-- jstype JSMatch
--   = null  -- bad news
--   | {branch: int, env: JSVal[]}

-- if we know the EnvTable for each case in a match, we can compile the
-- expressions as JSRun things, then collect them in a "branches" array.

-- e.g.
-- runCounter (patCompile "args[0]" (PV (VPV "x"))) 0
-- gives
--   (([("x",0)]
--   ,"if (args[0].tag===\"value\") {env[0]=args[0].value; }
--     else { throw(...) }; ")
--   ,1)


