module Compiler where

import Shonky.Syntax

import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace



type EnvTable = [(String, Int)] -- environment lookup table

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
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ c ++ "; ")


  

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

genDef :: String -> CodeGen Int -- make a definition and return its number
genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)


expFun
  :: EnvTable     -- maps variable names to env indices
  -> Exp          -- Shonky source code
  -> CodeGen Int

expFun xis e = do
  js <- expCompile xis "stk" e
  genDef ("function(stk,env){return " ++ js ++ "}")

expCompile
  :: EnvTable     -- maps variable names to env indices
  -> JSExp        -- stack
  -> Exp          -- Shonky source code
  -> CodeGen JSExp

expCompile xis stk (EV x) = case lookup x xis of
  Nothing -> error "it's not a pattern variable, but is it a top-level function?"
  Just i -> return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:env[" ++ show i ++ "]}}"

expCompile xis stk (EI x) = 
  return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:{tag:\"integer\", integer:\"" ++ show x ++ "\"}}}"

expCompile xis stk (EA a) = 
  return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\", value:{tag:\"atom\", atom:\"" ++ a ++ "\"}}}"

expCompile xis stk (ecar :& ecdr) = do
  fcdr <- expFun xis ecdr
  expCompile xis
    ("{prev: " ++ stk ++ ", tag:\"car\", env:env, cdr:" ++ show fcdr ++ "}")
    ecar
 

lineCompile :: ([Pat], Exp) -> CodeGen JSStmt
lineCompile (ps, e) = do
  let ((xis, patJS), _) = runCounter (listOf patCompile "args" ps) 0
  expJS <- expCompile xis "stk" e
  return $ "{" ++ patJS ++ "return " ++ expJS ++ "\n}"

-- codeGen (lineCompile ([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")) 0

linesCompile :: [([Pat], Exp)] -> CodeGen JSStmt
linesCompile [] = return "throw(\"undefined function\")"
linesCompile (l : ls) = do
  ctry   <- lineCompile l
  ccatch <- linesCompile ls
  return $ "try " ++ ctry ++ " catch (err) {" ++ ccatch ++ "}"

funCompile :: [([Pat], Exp)] -> CodeGen JSStmt
funCompile ls = do
  c <- linesCompile ls
  return $ "function(stk,args){var env=[];\n" ++ c ++ "\n}"

-- codeGen (funCompile [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")]) 0


topLevelCompile :: [Def Exp] -> CodeGen [(Int, JSStmt)]
topLevelCompile ds = do
  let fs = [(f, (h, pse)) | DF f h pse <- ds]
  let ftable = zipWith (\ (f, _) i -> (f, i)) fs [0..]
  -- now adjust compiler functions to take an ftable (preferably by extending the CodeGen monad)
  -- now compile all the top level functions and put them in an array
  error "not done yet"


jsSetup  ::  String       -- array name
         ->  CodeGen JSStmt    -- compilation process
         ->  String    -- a big pile of JS
            
jsSetup arr comp = "var " ++ arr ++ "= [];\n"
                     ++ x
                     ++ (defs >>= def) ++ "module.exports = "
                      ++ arr ++ ";"
  where
    (defs, _, x) = codeGen comp 0
    def (i, c) = arr ++ "[" ++ show i ++ "] = " ++ c ++ ";\n"

-- example jsWrite (jsSetup "prog" (funCompile [([PV (VPV "x"), PV (VPV "y")], EV "y" :& EV "x")]))
jsWrite :: String -> IO()
jsWrite code = writeFile "gen.js" code


-- jstype JSRun = (JSVal[], JSStack) -> JSMode
-- jstype JSMode = {stack: JSStack, comp: JSComp}     

-- jstype JSComp
--   = {tag="value", value: JSVal}
--   | {tag="command", command: Command, args: JSVal[], resume: JSVal}

-- (Command is String)

-- jstype JSVal
--   = {tag="atom", atom: String}
--   | {tag="int", int: Int}
--   | {tag="pair", car: JSValue, cdr: JSValue}
--   | {tag="toplevelfun", toplevelfun: Int}

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


