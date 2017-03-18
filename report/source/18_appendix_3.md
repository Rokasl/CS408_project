# Appendix 3: Test cases {.unnumbered}

**Experimental system**

declare -A test0=(
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
declare -A test1=( #addition
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Val 8)'
    [name]='test_sum'
    [expected]='14'
)
declare -A test2=( # Throw
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Throw)'
    [name]='test_throw'
    [expected]='Unhandled exception!'
)
declare -A test3=( # Catch
    [expr]='let xpr = Catch (Val 2 :+: (Val 4 :+: Throw)) (Val 2)'
    [name]='test_catch'
    [expected]='2'
)
declare -A test4=( # Catch with previous stack
    [expr]='let xpr = ((Val 5) :+: (Catch (Val 2 :+: (Val 4 :+: Throw)) (Val 2)))'
    [name]='test_catch_stack'
    [expected]='7'
)

declare -A test5=( # Simple WithRef, value is not used
    [expr]="let xpr = WithRef \"x\" (Val 2) (Val 5 :+: Val 3)"
    [name]='test_simple_withref'
    [expected]='8'
)
declare -A test6=( # 
    [expr]='let xpr = Get "x" :+: Val 2'
    [name]='test_get_false'
    [expected]='Exception: Undifined expression: x'
)
declare -A test7=( # 
    [expr]='let xpr = WithRef "x" (Val 2) (Val 5 :+: (Get "x"))'
    [name]='test_withref_get'
    [expected]='7'
)
declare -A test8=( # might need to adjust this
    [expr]='let xpr = WithRef "x" (Val 2) (("x" := (Get "x" :+: Val 11)) :> Get "x")'
    [name]='test_withref_get_set'
    [expected]='13'
)
declare -A test9=( # 
    [expr]='let xpr = WithRef "x" (Val 22) ("x" := (Get "x" :+: Val 11) :> (Get "x" :+: Val 30))'
    [name]='test_withref_get_set_next'
    [expected]='63'
)
declare -A test10=( # 
    [expr]='let xpr = Val 2 :> Val 5 :+: Val 8 :> Val 1000 :> Val 20 :+: Val 3'
    [name]='test_next'
    [expected]='23'
)

**Final system**

