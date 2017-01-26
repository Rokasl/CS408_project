

data  Expr  = Val Int 
            | Add Expr Expr




newtype CodeGen val = MkCodeGen {
            codeGen :: Int -> ([(Int, String)], Int, val)
        }
      
instance Monad CodeGen where
        return val = MkCodeGen $ \ next -> ([], next, val)
        ag >>= a2bg = MkCodeGen $ \ next ->
            case codeGen ag next of
                (ac, next, a) -> case 
                    codeGen(a2bg a) next of
                        (bc, next, b) -> (ac ++ bc, next, b)

genDef :: String -> CodeGen Int
genDef code = codeGen $ \ next -> ([next, code],next + 1, next)


-- compile :: Expr -> CodeGen Int
-- compile e = help "s" e where
--     help s (Val n) = genDef $
--         "function(s){return{stack:"++ s ++ ", tag:\"num\", data:"++ show n ++"}}"
    -- help s (e1 + e2) = do
    --     f2 <- compile e2
    --     help ("{prev:" ++ s ++ ", tag:\"left\", data:"++ show f2 ++"}") e1    