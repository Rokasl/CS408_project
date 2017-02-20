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