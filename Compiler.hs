import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace

data  Expr  = Val Int 
            | Expr :+: Expr
            deriving Show
            

newtype CodeGen val = MkCodeGen {
            codeGen :: Int -> ([(Int, String)], Int, val)
        } 

-- instance (Show a) => Show (CodeGen a) where
--     show (MkCodeGen )  = s   

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

genDef :: String -> CodeGen Int
genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)


compile :: Expr -> CodeGen Int
compile e = help "s" e where
    help s (Val n)| trace ((show s) ++ " " ++ show n) True = genDef $
        "function(s){return{stack:"++ s ++ ", tag:\"num\", data:"++ show n ++"}}"
    help s (e1 :+: e2) = do
        f2 <- compile e2
        help ("{prev:" ++ s ++ ", tag:\"left\", data:"++ show f2 ++"}") e1   
