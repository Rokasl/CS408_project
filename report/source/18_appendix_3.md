# Appendix 3: Test cases {.unnumbered}

## Experimental system {.unnumbered}

This is a full list of experimental system's test cases. "expr" - is expression to be tested, "name" -
the name of the test and "expected" is expected output. 

```bash
declare -A test0=( #value
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
```

```bash
declare -A test1=( #addition
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Val 8)'
    [name]='test_sum'
    [expected]='14'
)
```

```bash
declare -A test2=( # Throw
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Throw)'
    [name]='test_throw'
    [expected]='Unhandled exception!'
)
```

```bash
declare -A test3=( # Catch
    [expr]='let xpr = Catch (Val 2 :+:
             (Val 4 :+: Throw)) (Val 2)'
    [name]='test_catch'
    [expected]='2'
)
```

```bash
declare -A test4=( # Catch with previous stack
    [expr]='let xpr = ((Val 5) :+: (Catch (Val 2 :+:
                         (Val 4 :+: Throw)) (Val 2)))'
    [name]='test_catch_stack'
    [expected]='7'
)
```


```bash
declare -A test5=( # Simple WithRef, value is not used
    [expr]='let xpr = WithRef "x" (Val 2) 
                            (Val 5 :+: Val 3)'
    [name]='test_simple_withref'
    [expected]='8'
)
```

```bash
declare -A test6=( #undifined variable
    [expr]='let xpr = Get "x" :+: Val 2'
    [name]='test_get_false'
    [expected]='Exception: Undifined expression: x'
)
```

```bash
declare -A test7=( #adding defined variable 
    [expr]='let xpr = WithRef "x" (Val 2)
                         (Val 5 :+: (Get "x"))'
    [name]='test_withref_get'
    [expected]='7'
)
```

```bash
declare -A test8=( # composition and variable defintion
    [expr]='let xpr = WithRef "x" (Val 2)
                 (("x" := (Get "x" :+: Val 11))
                  :> Get "x")'
    [name]='test_withref_get_set'
    [expected]='13'
)
```

```bash
declare -A test9=( # same as test 8 but plus addition 
    [expr]='let xpr = WithRef "x" (Val 22)
                         ("x" := (Get "x" :+: Val 11)
                             :> (Get "x" :+: Val 30))'
    [name]='test_withref_get_set_next'
    [expected]='63'
)
```

```bash
declare -A test10=( # composition test
    [expr]='let xpr = Val 2 :> Val 5 :+: Val 8
                     :> Val 1000 :> Val 20 :+: Val 3'
    [name]='test_next'
    [expected]='23'
)
```

## Final system {.unnumbered}

Below is a list of all test programs for the final system:

### New test programs {.unnumbered}

**Test program 1:**

path: "Backend/tests/test_cases/new/add.fk".\
Description: Peano number addition.\
Expected result: [suc[suc[zero]]].

```haskell 
main : {Nat}
main! = add (suc zero) (suc zero) 

data Nat = zero | suc Nat

add : {Nat -> Nat -> Nat}
add zero b = b
add (suc a) b = suc (add a b)   
```

**Test program 2:**

path: "Backend/tests/test_cases/new/command.fk".\
Description: command test.\
Expected result: [pr[zero][suc[zero]]].\

*Test program is too long to show, check provided path for the code.*

**Test program 3:**

path: "Backend/tests/test_cases/new/int.fk".\
Description: integer value test.\
Expected result: 1.\

```haskell 
main : {Int}
main! = 1
```

**Test program 4:**

path: "Backend/tests/test_cases/new/intAdd.fk".\
Description: integer addition test.\
Expected result: 20.\

```haskell 
main : {Int}
main! = 10 + 10
```

**Test program 5:**

path: "Backend/tests/test_cases/new/intMinus.fk".\
Description: integer minus test.\
Expected result: 10.\

```haskell 
main : {Int}
main! = 20 - 10
```

**Test program 6:**

path: "Backend/tests/test_cases/new/intCommand.fk".\
Description: integer values with commands.\
Expected result: [pr01].\

*Test program is too long to show, check provided path for the code.*


**Test program 7:**

path: "Backend/tests/test_cases/new/intList.fk".\
Description: list with integer values.\
Expected result: [cons1[cons2[cons3[nil]]]].\

```haskell 
main : {List Int}
main! = [1, 2, 3]
```

**Test program 8:**

path: "Backend/tests/test_cases/new/intLocal.fk".\
Description: local functions with integer values.\
Expected result: [pr[cons0[cons1[cons2[nil]]]][cons0[cons1[cons2[nil]]]]].

*Test program is too long to show, check provided path for the code.*


**Test program 9:**

path: "Backend/tests/test_cases/new/intOperator.fk".\
Description: operator call with integer value.\
Expected result: 3.\

```haskell 
main : {Int}
main! = plusOne(2)

plusOne : {Int -> Int}
plusOne x = x + 1
```

**Test program 10:**

path: "Backend/tests/test_cases/new/lists.fk".\
Description: list test.\
Expected result: [cons[zero][cons[suc[zero]][cons[zero][nil]]]].\

```haskell 
main : {List Nat}
main! = [zero, suc zero, zero]

data Nat = zero 
         | suc Nat
```

**Test program 11:**

path: "Backend/tests/test_cases/new/local.fk".\
Description: local function test.\
Expected result:\
[pr[cons[zero][cons[suc[zero]][cons[suc[suc[zero]]][nil]]]]\
[cons[zero][cons[suc[zero]][cons[suc[suc[zero]]][nil]]]]].


*Test program is too long to show, check provided path for the code.*


**Test program 12:**

path: "Backend/tests/test_cases/new/operator.fk".\
Description: list test.\
Expected result: [suc[zero]].\

```haskell 
main : {Nat}
main! = plusOne(zero)

plusOne : {Nat -> Nat}
plusOne x = suc x

data Nat = zero 
         | suc Nat
```

### Old test programs {.unnumbered}

These programs are all lifted from "Frankjnr" implementation tests folder.

**Test program 13:**

path: "Backend/tests/test_cases/old/app.fk".\
Description: application test.\
Expected result: 42.\

```haskell 
main : {Int}
main! = app {f -> f 42} {x -> x}

app : {{X -> Y} -> X -> Y}
app f x = f x
```

**Test program 14:**

path: "Backend/tests/test_cases/old/evalState.fk".\
Description: hello world.\
Expected result: "Hello World!".\

```haskell 
main : []String
main! = evalState "Hello" (put (append get! " World!"); get!)

append : List X -> List X -> List X
append nil ys = ys
append (cons x xs) ys = cons x (append xs ys)

interface State X = get : X
	          | put : X -> Unit

evalState : X -> <State X>Y    -> Y
evalState   x    <put x' -> k>  = evalState x' (k unit)
evalState   x    <get    -> k>  = evalState x (k x)
evalState   x         y         = y
```

**Test program 15:**

path: "Backend/tests/test_cases/old/fact.fk".\
Description: factorial.\
Expected result: 120.\

```haskell 
main : []Int
main! = fact 5

mult : Int -> Int -> Int
mult 0 y = 0
mult x y = y + mult (x-1) y

fact : Int -> Int
fact 0 = 1
fact n = mult n (fact (n - 1))
```

**Test program 16:**

path: "Backend/tests/test_cases/old/fib.fk".\
Description: Fibonacci generation and negative integer test.\
Expected result: 5.\

```haskell 
main : []Int
main! = fib 5

fib : Int -> Int
fib 0 = 0
fib 1 = 1
fib 2 = 1
fib n = fib (n-1) + fib (n-2)

minusTwoOnZero : Int -> Int
minusTwoOnZero 0 = -2
minusTwoOnZero n = 0
```

**Test program 17:**

path: "Backend/tests/test_cases/old/flex-ab-eq.fk".\
Description: Regression for unifying effect-parametric datatype with flexible.\
Expected result: [unit].\

```haskell 
main : {Unit}
main! = boo foo!

interface Eff X = bang : Unit

data Bar = bar {Unit}

foo : [Eff Bar]Unit
foo! = unit

boo : <Eff S>Unit -> Unit
boo   <bang -> k> = boo k!
boo   unit        = unit
```


**Test program 18:**

path: "Backend/tests/test_cases/old/listMap.fk".\
Description: map a pure (addition) function over a list.\
Expected result:\
[cons[cons2[nil]][cons[cons3[nil]][cons[cons4[nil]][nil]]]].\

```haskell 
main : []List (List Int)
main! = map {x -> cons (x+1) nil} (cons 1 (cons 2 (cons 3 nil)))

interface State X = get : X
	          | put : X -> Unit

map : {a -> b} -> List a -> List b
map f nil = nil
map f (cons x xs) = cons (f x) (map f xs)
```

**Test program 19:**

path: "Backend/tests/test_cases/old/paper.fk".\
Description: examples from the paper\
Expected result: "do be ".\

*Test program is too long to show, check provided path for the code.*

**Test program 20:**

path: "Backend/tests/test_cases/old/r3.fk".\
Description: compiler Nontermination Issue No. 3.\
Expected result: 1.\

```haskell 
main : []Int
main! = iffy True {1} {2}

data Bool = True | False

iffy : Bool -> {X} -> {X} -> X
iffy True t _  = t!
iffy False _ f = f!
```

**Test program 21:**

path: "Backend/tests/test_cases/old/r4.fk".\
Description: problem with unifying abilities identified by Jack Williams (No. 4).\
Expected result: 42.\

```haskell 
main : [Console]Int
main! = apply foo!

data Bar = One {Int}

apply : Bar [Console] -> [Console]Int
apply (One f) = f!

foo : {Bar [Console]}
foo! = One {42}
```

**Test program 22:**

path: "Backend/tests/test_cases/old/r5.fk".\
Description: Suspended computation datatype argument.\
Expected result: [unit].\

```haskell 
main : []Unit
main! = foo (just {unit})

data Maybe X = just X | nothing

foo : Maybe {Unit} -> Unit
foo (just x) = x!
```

**Test program 23:**

path: "Backend/tests/test_cases/old/r7.fk".\
Description: issue with recursive call in suspended comp..\
Expected result: [unit].\

```haskell 
main : []Unit
main! = unit

interface Receive X = receive : X

on : X -> {X -> Y} -> Y
on x f = f x

receivePassthrough : <Receive String>X -> [Receive String]X
receivePassthrough x              = x
receivePassthrough <receive -> r> =
  on receive! { s -> receivePassthrough (r s) }
```

**Test program 24:**

path: "Backend/tests/test_cases/old/str.fk".\
Description: pattern matching list of strings.\
Expected result: 1.\

```haskell 
main : []Int
main! = foo (cons "abcd" nil)

foo : List String -> Int
foo (cons "ab" (cons "cd" nil)) = 0
foo (cons "abcd" nil) = 1
foo _ = 2
```