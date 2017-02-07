import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace

data Name = String
            deriving Show

data  Expr  = Val Int 
            | Expr :+: Expr
            -- Throw
            | Catch Expr Expr
            | Get Name
            | Name := Expr
            | Expr :> Expr  -- :> is ugly syntax for ";" (taking value of the second)
            -- WithRef Name -- name of new reference
               --      Expr -- how to compute initial value of new reference
               --      Expr -- code that makes use of reference
               -- the WithRef stack frame is the handler for Get and :=
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
                             

-- instance (Show a) => Show (CodeGen a) where
--      show MkCodeGen a => ([(s, i)], k, a)  = 
--                 "([" ++ show s ++ "," ++ show i ++ ")," ++ show k ++ 
--                     "," ++ show a ++ "])"   



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

jsSetup  ::  String       -- array name
         ->  CodeGen x    -- compilation process
         ->  (  String    -- a big pile of JS
             ,  x         -- whatever the result was
             )
jsSetup arr comp = (defs >>= def, x)
  where
    (defs, _, x) = codeGen comp 0
    def (i, c) = arr ++ "[" ++ show i ++ "] = " ++ c ++ ";\n"


-- writeFile :: FilePath -> String -> IO ()