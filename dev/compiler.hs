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

patCompile c (PT x) = do
  i <- next
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ c ++ "; ")

patCompile c (PV p) = do
  (e,m) <- vpatCompile (c ++ ".value") p
  return (e, "if (" ++ c ++ ".tag===\"value\") {" ++ m ++ "} else { throw(...) }; ")

vpatCompile v (VPV x) = do
  i <- next
  return ([(x, i)], "env[" ++ show i ++ "]=" ++ v ++ "; ")

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