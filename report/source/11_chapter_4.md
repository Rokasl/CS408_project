# Initial development & Simple system

## Introduction

Because of the complexity of overall project and the lack of initial author knowledge in the field
the most optimal plan was to start with something small and expand gradually. The intricacies consist of:

* Frank is a complex functional language;
* Frankjnr adds another layer of complexity, since author needs to be aware of the implementation and
  compilation process; 
* Dependence on Shonky's language, because the final implementation of the Compiler must be able to 
  understand and compile Shonky language; 
* Complexity of the Compilers and their implementation;
* Complexity of Abstract Machines and their implementation;

Thus, simpler language was developed with matching Compiler and Abstract Machine. Both, the Compiler
and the Machine were developed while keeping in mind that their key parts will be used for the final
product. So efficiency, reliability, structure were all key factors.

## Simple system

### Language

A language written in Haskell, which supports few specific operations, such as, sum of two expressions,
Throw & Catch, Set, Next, Get, new reference. 

```haskell
data Expr = Val Int 
        | Expr :+: Expr -- sum of two expressions 
        | Throw
        | Catch Expr Expr -- evaluated first expression, if result is
                          -- Throw then evaluate second expression
        | Get String -- get the expression of the reference
        | String := Expr -- Set reference value to some expression
        | Expr :> Expr  
            -- :> is ugly syntax for ";" (taking value of the second)
        | WithRef String -- name of new reference
                    Expr -- how to compute initial value of new reference
                    Expr -- code that makes use of reference
            --  the WithRef stack frame is the handler for Get and :=
```

### Compiler

Purpose of the Compiler is to take an expression of the simple language described above and output
a JavaScript working program which could be used by the Abstract Machine.

```haskell
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
```



Function compile works together with genDef to make definitions of functions in JavaScript and link
them together, by utilizing linked list data structure. Below is displayed a small piece of the compile
function and full genDef function.

```haskell
genDef :: String -> CodeGen Int -- make a definition and return its number
genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)

compile :: Expr -> CodeGen Int -- the Int returned is the entry point
compile e = help "s" e where
    help s (Val n) = genDef $
        "function(s){return{stack:"++ s ++ ", tag:\"num\", data:"++ show n ++"}}"
```

### Abstract machine

Purpose of the Abstract Machine is to take in a compiled program and run it in the browser.
It gradually builds a stack from the given program, where each frame of the stack has a link to
another frame. The elegant part of this is that, stack frames can be saved, updated, deleted and
restored; thus, making the Machines data structure flexible.

Below is an example of a compiled program ready to be used by Abstract Machine. This particular
program is simple, it only adds two numbers (3 + 2), so the expected output is 5.

```javascript
var ProgramFoo = [];

ProgramFoo[0] = function (s) {
    return {
        stack: s, // stack
        tag: "num", //expression type
        data: 3 // expression value
    }
};
ProgramFoo[1] = function (s) {
    return {
        stack: { // stack 
            prev: s, // link to previous frame 
            tag: "left", // command used for adding numbers
            data: 0 // index of next operation 
        },
        tag: "num", // expression type
        data: 2 // expression value
    }
};
```

The Abstract Machine currently supports functionality for adding expressions,
creating a reference, getting the value of a reference, setting new value of a given reference,
throwing & catching an exception.

Room for improvement:

* Efficiency; 
* Documentation;
* Functionality;


### Testing framework

Testing framework consists of two files utilizing two different scripts: Bash script and Expect script.
Its purpose is to automate the testing process. Below each of these scripts will be briefly reviewed.

Bash script is the main script which stores all test cases, then goes through them one after another.
For each test case it launches Expect script and passes parameters to it, furthermore, it recompiles the
output of the Compiler by utilizing Webpack and retrieves the result of Abstract Machine with Node.
Then Bash script just compares the expected output with actual output.

```bash
for id_name in ${!test@}; do
    declare -n test=$id_name    
    #Test
    ./tests/helper.sh ${test[expr]} ${test[name]}
    #end of expect

    webpack --hide-modules #recompile output.js 

    output=$(node ./dist/output.js); #get output
    output="${output##*$'\n'}" #take only last line

    if [ "$output" = "${test[expected]}" ]; then
        echo -e "${GREEN}Test passed${NC}"
    else 
        echo -e "${RED}Test failed${NC}"
    fi
Done
```

Sample test case:

```bash
declare -A test0=(
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
```
Expect script takes the title of the test and the actual expression. Then it simply runs Ghci commands
to produce the output of the Compiler.

There is still plenty of room to improve this framework, in particular:

* Speed & efficiency;
* Move test cases into separate file;
* More useful statistics at the end of computation;

To use the testing framework just run ./tester.sh in the terminal window



## Conclusion


