module Dev.Compiler where

import Shonky.Syntax

import Control.Applicative
import Control.Monad (liftM, ap)
import Debug.Trace



type EnvTable = [(String, Int)]

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

matchFail :: JSStmt
matchFail = "throw( ... );" -- FIXME!

patCompile  :: JSExp -- representing the scrutinee of the match
            -> Pat   -- the Shonky computation pattern
            -> Counter (  EnvTable  -- mapping Shonky vars to env indices
                       ,  JSStmt    -- the code that builds the environment
                       )

patCompile c (PT x) = do
  i <- next
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ c ++ "; ")

patCompile c (PV p) = do
  (e,m) <- vpatCompile (c ++ ".value") p
  return (e, "if (" ++ c ++ ".tag!==\"value\") {" ++ matchFail ++"};\n" ++ m)

vpatCompile  :: JSExp -- representing the scrutinee of the match
             -> VPat  -- the Shonky value pattern
             -> Counter (  EnvTable  -- mapping Shonky vars to env indices
                        ,  JSStmt    -- the code that builds the environment
                        )

vpatCompile v (VPV x) = do
  i <- next
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ v ++ ";\n")

vpatCompile v (VPA a) = do
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
--   | {tag="fun",
--       handles: Command[][],
--       matcher: (JSComp[]) -> JSMatch,
--       branches: JSRun[]}

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