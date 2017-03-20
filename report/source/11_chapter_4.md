# Initial development & experimental system

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

System consists of:

* Compiler - written in Haskell;
* Language - written in Haskell;
* Machine - written in JavaScript, compiled with Webpack;
* Testing Framework - written in Bash and Expect scripts;

### Language

A simple language written in Haskell, which syntax supports few specific operations, such as, sum of two
expressions, Throw & Catch, Set, Next, Get, new reference. 

**Full language definition**

This section will focus on the exact definition of the language.
Language is defined as Haskell data type. In this case it supports only different types of expressions. 

```haskell
data Expr = 
```

Experimental language is focused on Integer manipulation, thus it only supports integer values.
Here is a definition of a Integer value.

```haskell
        | Val Int
```

Definition of sum of two expressions.

```haskell
        | Expr :+: Expr
```

Syntax definition of a Throw and Catch commands. If the first expression of Catch is equal to Throw, meaning
something went wrong then the second expression will be evaluated. 

```haskell         
        | Throw
        | Catch Expr Expr
```

Syntax definition of WithRef command. It creates new reference with a given value. First string variable
of the command defines name of new reference. Second value is an expression which defines how to compute
initial value of new reference. And the third value is the context in which the reference is valid. 
WithRef stack frame is the handler for "Get" and ":=" commands.

```haskell
        | WithRef String Expr Expr
```

Syntax definition of getting the value of a defined reference. 

```haskell
        | Get String 
```

Syntax definition of setting defined reference value to new expression. 

```haskell
        | String := Expr 
```

Syntax definition for evaluating two expressions one by one and taking value of the second. In most 
programming languages it is defined as ";".

```haskell
        | Expr :> Expr
```

Each of the operations were carefully selected, where their implementation in the Abstract Machine
varies significantly. Because the implementation of these operations will be generalized in the final
system, for instance, code for sum of two expressions will cope with all arithmetic calculations of two
expressions.   

### Compiler

Purpose of the Compiler is to take an expression of the simple, experimental language described above and
output a JavaScript working program, array of functions, which could be used by the Abstract Machine.

Below is a definition of code generation monad. It contains a constructor MkCodeGen and a deconstructor
codeGen. 

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

MkCodeGen is used to construct a definition in genDef function displayed below. genDef returns the 
definition number.

```haskell
genDef :: String -> CodeGen Int 
genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)
```

genDef is used by compile function to make new function definitions. Below is the type of compile function.
compile function takes in a valid language expression and outputs entry point of the compilation as well
as compilation process which can be separated into chucks of JavaScript code.  

```haskell
compile :: Expr -> CodeGen Int
```

compile function is either used to create new function definitions...

```haskell
help s (Val n) = genDef $
        "function(s){return{stack:"++ s ++ ", tag:\"num\", data:"++ show n ++"}}"
```
or to compile expressions to JavaScript. 

```haskell
help s (e1 :+: e2) = do 
    f2 <- compile e2
    help ("{prev:" ++ s ++ ", tag:\"left\", data:"++ show f2 ++"}") e1
```

**Formating and outputting to file**

jsSetup takes a name of the array, the output of compile function and outputs a JavaScript formatted
string. 

```haskell
jsSetup  ::  String       -- array name
         ->  CodeGen x    -- compilation process
         ->  (  String    -- JavaScript code
             ,  x         -- result
             )
```

jsWrite takes an output of jsSetup and writes everything to a file "generated.js" which can be safely
used by Abstract Machine.

```haskell
jsWrite :: (String, x) -> IO()
jsWrite (code, x) = writeFile "dist/generated.js" code
```

### Abstract machine

Purpose of the Abstract Machine is to take in a compiled program and run it in the browser.
It gradually builds a stack from the given program, where each frame of the stack has a link to
another frame. The elegant part of this is that, stack frames can be saved, updated, deleted and
restored; thus, making the Machines data structure flexible.

**Program Structure**

Each program is an array and its entries are functions which take in a stack. This way it is possible to
nest them while keeping track of the stack. 

Below is an example of a compiled program ready to be used by Abstract Machine. This particular
program is simple, it only adds two numbers "2 + 3", so the expected output is "5".

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

**Abstract Machine Implementation**

This section will explain detailed implementation of the experimental Abstract Machine. It is defined
as a function which takes in a compiled program as an argument.

Initial definition of mode with starting values. Because the starting stack is empty the "stack" parameter
is defined as "null"; the tag is an expression type and if it is equal to "go", the Machine must evaluate
next function. Finally, the "data" parameter holds an index of next function, so the initial
value is the index of last function in a program array.

```javascript
var mode = {
    stack: null,
    tag: "go",
    data: f.length - 1
    }
```

Mode is a function in a program array which takes in a stack as a parameter. Abstract Machine will
operate until mode.tag is equal to "go". If it is then mode must be reinitialized by getting getting a
next function from program array and passing stack to it, so that the mode has access to previous stack.

```javascript
    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);
```

After the mode is reinitialized mode.tag can't be equal to "go" and mode stack can't be empty. If these 
requirements aren't met then it means that execution is over.

```javascript
while (mode.tag != "go" && mode.stack != null) {
```

If the execution is still going then the behavior of the Abstract Machine will differ based on mode's
tag parameter. Tag could be equal to these values:

* **"num"** - all of the basic evaluations of given expression: 
    + Addition ("left" and "right") - creates a stack frame with tag "right", if the top of the stack tag
    is equal to "right" it means that Abstract Machine can add two  of the top frames together, because all
    of the other computations are done. 
    + Catch - creates a stack frame with tag "catcher" and places it on the top of the stack. Its data 
    parameter is equal to the index of second expression which will be evaluated if first expressions
    throws an exception.
    + New reference - creates a stack frame with tag "WithRefRight", it is different from other stack
    frames because it has a "name" parameter, which is needed to identify between different references.
    It, also, holds the value of the reference in its "data" parameter.
    + Next (:>left and :>right) - implementation is similar to addition, however the key difference is
    that if the top stack frame tag is equal to ":>right" the Abstract Machine will take its data without
    adding anything and it will delete the used stack frame.  
    + Set (:=) - very similar to "Get" command, key difference is that it alters the stack frame which
    has tag "WithRefRight" and the given name of the reference. This command utilizes linked list stack
    saving to be able to restore the stack while saving any changes made. It could throw an exception
    if the reference is undefined. 
 
* **"throw"** - it defines that something went wrong so the Abstract Machine will look for a "catch"
usage in the previous stack, if it doesn't find it then it will output an exception.

Machine checks if the top of the stack is equal to "catcher", if it is then it means exception was
handled, so Abstract Machine reinitializes mode to continue executions by taking "catcher" values of
"stack" and "data".

```javascript
mode = {
    stack: mode.stack.prev,
    tag: "num",
    data: mode.stack.data
    }
```        

Else Machine drops the top of the stack and continues to look for "catcher" until stack is empty.

```javascript
mode = {
    stack: mode.stack.prev,
    tag: "throw",
    data: "Unhandled exception!"
    }
```

* **"get"** - goes through stack while looking for a reference, output's either a value of the reference
  if it does find it or tries to throw an exception if it doesn't. It, also, utilizes linked stack saving
  and restoring functions, in order to restore the stack if it does find a reference. 


After the Abstract Machine finishes running it will output the final stack to the console by invoking a 
custom printer function for the user to clearly see the stack. 

```javascript
printer(mode);
```

And finally, Abstract Machine outputs final value of the execution on the separate line for testing
purposes, it is used by Testing framework to check for expected and actual output of a test.

```javascript
console.log(mode.data);
```

**Linked Stack Saving and Restoring**

Abstract Machine uses saver function in "get" and ":=" implementations. This function lets the Machine
not only to inspect the depths of the stack but, also, to assign new values to existing frames of the
stack. To achieve this, Abstract Machine saves each frame of the stack from top until it finds the frame
it is looking for. Below "saveStack" function is displayed, the "m" variable represents the current stack
frame.

```javascript
save = {
    prev: save,
    tag: m.tag,
    data: m.data,
    name: m.name
}
```  

The save is reverse linked list of stack frames, thus it is possible to restore the original stack including
all the changes made. After stack is successfully restored all of the save data must be destroyed and parameters
reseted to keep future saves unaffected.

Limitations:

* Only one Stack save can exist at a given time. 
 

**Final Remarks**

The Abstract Machine currently supports functionality for adding expressions,
creating a reference, getting the value of a reference, setting new value of a given reference,
throwing & catching an exception.

Room for improvement:

* Efficiency and optimization; 
* Documentation;
* Functionality;

All of these points are addressed in the final implementation.


## Conclusion

A preliminary experiment, implementing the essence of Frank-like execution for much simpler language, has
been completed successfully. The key lessons were: 

* Haskell syntax; 
* Language creation and its syntax development;
* Compiler - parsing the input and generating valid JavaScript code; 
* Machine - executing given program, and managing its resources, such as mode, stack and saved stack. 

Key things to improve are optimization & performance.
 
The further plan is to roll out the lessons learned creating compiler and VM for more of the "Shonky"
intermediate language that is generated by Frank compiler. This will be covered in the next chapter.

