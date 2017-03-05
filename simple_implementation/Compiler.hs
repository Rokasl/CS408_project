import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace

data Name = String
            deriving Show

data  Expr  = Val Int 
            | Expr :+: Expr -- sum of two expressions 
            | Throw
            | Catch Expr Expr -- evaluated first expression, if result is
                                -- Throw then evaluate second expression
            | Get String -- get the expression of the reference
            | String := Expr -- Set reference value to some expression
            | Expr :> Expr  -- :> is ugly syntax for ";" (taking value of the second)
            | WithRef String -- name of new reference
                          Expr -- how to compute initial value of new reference
                          Expr -- code that makes use of reference
                --  the WithRef stack frame is the handler for Get and :=
            deriving Show
            

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


compile :: Expr -> CodeGen Int -- the Int returned is the entry point
compile e = help "s" e where
    help s (Val n) = genDef $
        "function(s){return{stack:"++ s ++ ", tag:\"num\", data:"++ show n ++"}}"
    help s (e1 :+: e2) = do 
        f2 <- compile e2
        help ("{prev:" ++ s ++ ", tag:\"left\", data:"++ show f2 ++"}") e1
    help s Throw = genDef $
        "function(s){return{stack:" ++ s
        ++ ", tag:\"throw\", data:\" Unhandled exception!\"}}" 
    help s (Catch e1 e2) = do
        f2 <- compile e1
        help ("{prev:" ++ s ++ ", tag:\"catch\", data:"++ show f2 ++ "}") e2 
    help s (e1 :> e2) = do
        f2 <- compile e2
        help ("{prev:" ++ s ++ ", tag:\":>left\", data:"++ show f2 ++ "}") e1
    help s (Get name) = genDef $
       "function(s){return{stack:"++ s ++ ", tag:\"get\", data:"++ show name ++"}}"
    help s (WithRef name e1 e2) = do
        f2 <- compile e2
        help ("{prev:" ++ s ++ ", tag:\"WithRef\", data:"++ show f2 ++ "," 
                ++ "name:\"" ++ name ++ "\"}") e1
    help s (name := e1) = do
        help ("{prev:" ++ s ++ ", tag:\":=\"," 
                ++ "name:\"" ++ name ++ "\"}") e1            


-- example, how to run:
-- jsSetup "program" (compile Expr) 

jsSetup  ::  String       -- array name
         ->  CodeGen x    -- compilation process
         ->  (  String    -- a big pile of JS
             ,  x         -- whatever the result was
             )
jsSetup arr comp = ("var " ++ arr ++ "= [];\n"
                     ++ (defs >>= def) ++ "module.exports = "
                      ++ arr ++ ";", x)
  where
    (defs, _, x) = codeGen comp 0
    def (i, c) = arr ++ "[" ++ show i ++ "] = " ++ c ++ ";\n"


-- example
-- jsWrite (jsSetup "prog" (compile (Val 2)))    

jsWrite :: (String, x) -> IO()
jsWrite (code, x) = writeFile "dist/generated.js" code