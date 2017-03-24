# Initial development & experimental system

## Introduction

Because of the complexity of the project and the lack of initial author knowledge of the field,
the most optimal plan was to start with small, less demanding development and expand gradually.
The intricacies consist of:

* Frank is a complex functional language;
* "Frankjnr" adds another layer of complexity, since author needs to be aware of the implementation and
  compilation process; 
* Dependence on Shonky's language, because the final implementation of the Compiler must be able to 
  understand and compile Shonky's data structures; 
* Complexity of the compilers and their implementation;
* Complexity of abstract machines and their implementation;

Thus, experimental language was developed with matching compiler and abstract machine. Both, the compiler
and the machine were developed while keeping in mind that their key parts will be reused for the final
system. So efficiency, reliability, structure were all important factors. Furthermore, experimental 
system was vastly influenced on concepts described in "Compiling Exceptions Correctly"
[@MathsProgContruction] and "Mathematics of Program Construction" [@CompilingCorrectly].

## Experimental system

System consists of:

* Compiler - written in Haskell;
* Language - written in Haskell;
* Machine - written in JavaScript, compiled with *webpack*;
* Testing framework - written in Bash and Expect scripts, overview of the framework can be found in
  **Chapter 6**.

### Language

A simple language written in Haskell, which syntax supports few specific operations, such as, sum of two
expressions, "Throw" & "Catch", "Set", "Next", "Get", new reference. Each of the operations were
carefully selected, where their implementation in the abstract machine
varies significantly. Thus, offering broad and important learning experience.

**Full language definition**

Language is defined as Haskell data type "Expr". In this case it supports only different
types of expressions. 
Experimental language is focused on Integer manipulation, thus it only supports integer values.
Here is a definition of a Integer value.

```haskell
        | Val Int
```

Definition of sum of two expressions.

```haskell
        | Expr :+: Expr
```

Syntax definition of a "Throw" and "Catch" commands. If the first expression of Catch is equal to Throw,
meaning an exception was raised (something went wrong), then the second expression will be evaluated,
otherwise it will be left unchecked. 

```haskell         
        | Throw
        | Catch Expr Expr
```

Syntax definition of "WithRef" command. It creates new reference with a given value. First string variable
of the command defines name of new reference, second value is an expression which defines how to compute
initial value of new reference and the third value is the context in which the reference is valid. 
"WithRef" stack frame is the handler for "Get" and ":=" commands. Example expression would be: 
*WithRef "x" (Val 2) (Val 5 :+: Get "x")*. From the example we can see that "x" is a new reference with
initial value of "Val 2" and its valid in a context *Val 5 :+: Get "x"*, which would return "7".

```haskell
        | WithRef String Expr Expr
```

Syntax definition of getting the value of a defined reference. 

```haskell
        | Get String 
```

Syntax definition of setting defined reference value to be equal to some new expression. 

```haskell
        | String := Expr 
```

Syntax definition for evaluating two expressions one by one and taking value of the second. In most 
programming languages it is defined as ";".

```haskell
        | Expr :> Expr
```

### Compiler

Purpose of the compiler is to take in an formatted expression of the experimental language described
above and output a JavaScript compiled data structure (array of functions, called resumptions), which
could be used by the abstract machine.

Below is a definition of code generation monad. It contains a constructor "MkCodeGen" and a 
deconstructor "codeGen". It takes in an next available integer value and outputs a data structure
which holds a list of integers which map to JavaScript code of string type, next available number after
the compilation and result of the compilation "val". Usually, the list of definitions will start with
the input "next number" and go up to just before the output "next number". 

```haskell
newtype CodeGen val = MkCodeGen {
            codeGen :: Int -> ([(Int, String)], Int, val) 
        }                
```

"MkCodeGen" is used to construct a definition in "genDef" function displayed below. "genDef" returns
the definition number and it is used by compile function to make new function definitions. 

```haskell
genDef :: String -> CodeGen Int 
genDef code = MkCodeGen $ \ next -> ([(next, code)]
                            , next + 1, next)
```

Below the type of "compile" function is shown.
"compile" function takes in a valid language expression and outputs entry point of the compilation as well
as compilation process which can be separated into chucks of generated JavaScript code.  

```haskell
compile :: Expr -> CodeGen Int
```

"compile" function is either used to create new function definitions 
or to compile expressions to JavaScript depending on the type of "Expr". For example, if "compile" takes
initial expression of *Val 2 :+: (Val 4 :+: Val 8)*, through pattern matching the case for ":+:" will 
be executed and through recursion it will be executed again for the right side (*Val 4 :+: Val 8*)
as well. Below definition of the ":+:" case is shown.


```haskell
help s (e1 :+: e2) = do 
    f2 <- compile e2
    help ("{prev:" ++ s ++ ", tag:\"left\",
                     data:"++ show f2 ++"}") e1
```

Furthermore, for each value of the expression ("Val 2", "Val 4" and "Val 8") the function definition
will be generated, because "compile" function has a case for that.

```haskell
help s (Val n) = genDef $
        "function(s){return{stack:"++ s ++ ",
                     tag:\"num\", data:"++ show n ++"}}"
```

After "compile" function is done executing the structure is compiled and ready to be outputted to 
the file.


#### Formating and outputting to file

Output formating is done by "jsSetup" function.
It takes the name of the array, the result of "compile" function and outputs a JavaScript formatted
string. 

```haskell
jsSetup  ::  String       -- array name
         ->  CodeGen x    -- compilation process
         ->  (  String    -- JavaScript code
             ,  x         -- result
             )
```

"jsWrite" takes an output of "jsSetup" and writes everything to a file - "generated.js", which is ready
to be used by the abstract machine.

```haskell
jsWrite :: (String, x) -> IO()
jsWrite (code, x) = writeFile "dist/generated.js" code
```

Example usage: 

```haskell
let xpr = Val 2 :+: (Val 4 :+: Val 8)
jsWrite (jsSetup "Add" (compile xpr))
```


### Abstract machine

Purpose of the abstract machine is to take in a compiled program and provide semantics for the 
file to be runnable in the browser.
It gradually builds a stack from a given data structure (located in "generated.js"), where each
frame of the stack has a link to
another frame. The elegant part of this structure is that, stack frames can be saved, updated,
deleted and restored, thus, making the machine's structure flexible.

**Data Structure of compiled expression**

Each generated data structure by the compiler is an array called *resumptions*. Its entries are functions
which take in a stack. This way it is possible to nest them while keeping track of the stack. 
Below is an example of array of resumptions ready to be used by the abstract machine; it was constructed
from the expression *Val 3 :+: Val 2*. The semantics of
this particular structure are simple, to add two numbers "2 + 3", so the expected output is "5".
Comments in the code snippet below explain meaning of different variables in the structure.
For more complicated examples see *main/example_programs* or test cases. 

```javascript
var foo = [];
foo[0] = function (s) {
    return {
        stack: s, // stack
        tag: "num", //expression type
        data: 3 // expression value
    }
};
foo[1] = function (s) {
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

#### Implementation

This section focuses on explaining detailed implementation of the experimental abstract machine. 
It is defined as a function which takes in array of resumptions as an argument. The array "foo", 
described above will be used as a reference throughout this section.  

Modes are objects, which store current stack and computation. Below initial definition of mode is shown 
with pre-set starting values. Because the starting stack is empty the "stack" parameter
is defined as "null"; the "tag" is an expression type and if it is equal to "go", the machine must take 
"data" parameter, which is an index of the last element in array of resumptions, in order to retrieve
next mode.

```javascript
var mode = {
    stack: null,
    tag: "go",
    data: f.length - 1
    }
```


Each resumption is a function, which takes in a stack as a parameter and return a mode.
Abstract machine will finish compilation if "mode.tag" is not equal to "go". However, if it is equal
to "go" then mode must be reinitialized, because the current mode is not a final value. Therefore,
machine retrieves the next mode from resumptions array and passes stack to it, so that the mode
has access to previous stack frames.

```javascript
    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);
```

"f" represents an resumptions array, thus, considering example of "foo" array, the code above would 
create the following mode.

```javascript
mode = {
        stack: { 
            prev: null, 
            tag: "left", 
            data: 0 
        },
        tag: "num", 
        data: 2 
    }
```

Abstract machine will
continue executing while reinitializing mode's value every time "mode.tag" changes to "go" until the
"mode.tag" becomes not equal to "go" and the stack is empty. It means that mode is a value and that 
the machine is done computing.

```javascript
while (mode.tag != "go" && mode.stack != null) {
```

If the execution is still going then the behavior of the abstract machine will differ based on mode's
"tag" parameter. In example of "foo" computation, the "mode.tag" is equal to "num". 
Overall, "mode.tag" could be equal to these values:

* **"num"** - all of the basic evaluations of given expression. Further machine's actions depend
    on the value of "mode.stack.tag". In the case of the example "foo" its value would be "left". 
    + Addition ("**left**" and "**right**" tags) - "left" tag creates a stack frame with tag "right", thus preparing 
    a frame for addition by placing the current value on the top of the stack and preparing to evaluate
    other expression. If the top of the
    stack "tag" is equal to "right" the abstract machine can add two of the top frames together,
    therefore creating new "num" mode (contains the answer of the addition) and deleting the top frame
    of the stack. In the case of "foo" example, the "left" case would change its mode to:
    ```javascript
        mode = {
            stack: {
                prev: null,
                tag: "right",
                data: 2
                },
            tag: "go",
            data: 0
        }
    ```
    Then it would be reinitialized to:
    ```javascript
        mode = {
            stack: {
                prev: null,
                tag: "right",
                data: 2
                },
            tag: "num",
            data: 3
        }
    ```
    And because the "mode.stack.tag" is equal to "right", the "mode.data" and "mode.stack.data"
    would be added together and a new mode created:
    ```javascript
        mode = {
            stack: null,
            tag: "num",
            data: 3 + 2
        }
    ```
    This would be a final mode, because the stack is empty and the "tag" is not equal to "go", so the
    machine would return "5" as the result of the computation. Other instructions manipulate mode's data
    in similar fashion, building or destroying stack in the process.

    + "**Catch**" - creates a stack frame with tag "catcher" and places it on the top of the stack. Its data 
    parameter is equal to the index of second expression which will be evaluated if first expressions
    throws an exception.
    + New reference - creates a stack frame with tag "**WithRefRight**", it is different from other stack
    frames because it has a "name" parameter, which is needed to identify between different references.
    It, also, holds the value of the reference in its "data" parameter.
    + Next ("**:>left**" and "**:>right**") - implementation is similar to addition, however the key difference is
    that if the top stack frame tag is equal to ":>right" the abstract machine will take its data without
    adding anything and it will delete the previous stack frame. These operations evaluate two expressions
    but return the value of the second.
    + Set ("**:=**") - very similar to "Get" command (described below), key difference is that it alters the
    value of stack frame which has tag "WithRefRight" with given name of the reference. This command
    utilizes linked list stack saving structure to be able to restore the stack while saving any changes
    made. Exception could be thrown if the reference is undefined. 
 
* **"throw"** - defines that something went wrong so the abstract machine will look for a "catcher"
frame in the previous stack frames; if it does not find it then it will output an exception.
```javascript
    mode = {
        stack: mode.stack.prev,
        tag: "throw",
        data: "Unhandled exception!"
    }
```
However, 
if it does then it means exception was handled, therefore the abstract machine will reinitialize
mode to continue executions by taking "catcher" values of "stack" and "data" (some expression).
```javascript
    mode = {
        stack: mode.stack.prev,
        tag: "num",
        data: mode.stack.data
    }
```        


* **"get"** - goes through the stack while looking for a reference, output's either a value of the reference
  if it does find it, or tries to throw an exception if it does not. It, also, utilizes linked stack saving
  and restoring structure, in order to restore the stack if it does find a reference. 

After the abstract machine finishes running, the "mode.tag" is not equal to "go" and the stack is 
empty, it will output the final mode to the console by invoking a "printer" function for the user
to clearly see the results. 
And finally, abstract machine outputs final value of the execution on the separate line for testing
purposes, it is used by testing framework to check for expected and actual output of a test.

```javascript
console.log(mode.data);
```

#### Linked Stack Saving and Restoring

Abstract machine uses "saver" helper function in "get" and ":=" implementations. This function lets the
machine
to inspect the depths of the stack and to assign new values to existing frames of the
stack by remembering changes made. To achieve this, abstract machine saves each frame of the stack
by linking frames together, thus each newly saved frame has a link to previous saved frame. 
Below "saveStack" function is displayed, the "m" variable represents the current stack
frame and "prev" field is a link to previous saved frame.

```javascript
save = {
    prev: save,
    tag: m.tag,
    data: m.data,
    name: m.name
}
```  

The save is reverse linked list of stack frames, thus it is possible to restore the original stack including
all the changes made by reverse engineering the stack. After stack is successfully restored, all of the
save data must be destroyed and parameters reseted to keep future saves unaffected.
Finally, current limitation is that only one instance of stack save can exist at a given time, however
this is addressed in the final system.
 

#### Final Remarks

The abstract machine currently supports functionality for adding expressions,
creating a reference, getting the value of a reference, setting new value of a given reference and
throwing & catching exceptions.

Room for improvement:

* Efficiency and optimization, for example, by removing "go" tag and calling resumptions array directly; 
* Documentation;
* Functionality;

All of these points are addressed in the final implementation.


## Conclusion

A preliminary experiment, implementing the essence of Frank-like execution for much simpler language, has
been completed successfully. The key lessons were: 

* Haskell syntax; 
* Language creation and its syntax development;
* Compiler - parsing the input and generating valid JavaScript code; 
* Machine - executing compiled expression array and managing its resources, such as mode,
  stack and saved stack. 

Key things to improve are optimization & performance.
 
The further plan was to roll out the lessons learned creating compiler and virtual machine for more of
the "Shonky" intermediate language that is generated by Frank compiler. This will be covered
in the next chapter.

