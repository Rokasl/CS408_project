# Initial development & experimental system

## Introduction

Because of the complexity of the project and the lack of the author’s initial knowledge
of the field, the most optimal plan was to start with small, less demanding development
and to expand gradually. The intricacies included:

* Frank is a complex functional language;
* Frankjnr adds another layer of complexity, since the author needs to be aware of
  the implementation and the compilation process;
* Dependence on Shonky's language, because the final implementation of the Compiler must
  be able to understand and compile Shonky's data structures;
* The complexity of the compilers and their implementation;
* The complexity of abstract machines and their implementation;


Thus, an experimental language was developed with a matching compiler and abstract machine.
Both the compiler and the machine were developed while keeping in mind that their key components
will be reused for the final system; therefore efficiency, reliability,
and structure were all important factors. Furthermore, the experimental system
was vastly influenced by concepts described in "Compiling Exceptions Correctly"
[@MathsProgContruction] and "Mathematics of Program Construction" [@CompilingCorrectly].

## Experimental system

The system consists of:

* Compiler - written in Haskell;
* Language - written in Haskell;
* Machine - written in JavaScript, compiled with *webpack*;
* Testing framework - written in Bash and Expect scripts, overview of the framework
  can be found in **Chapter 6**.


### Language

A simple language written in Haskell, whose syntax supports a few specific operations,
such as the sum of two expressions, "Throw" & "Catch", "Set", "Next", "Get" and a new reference.
Each of the operations were carefully selected; their implementation in the abstract machine
varied significantly, which offered a broad and valuable learning experience.

**Full language definition**

Language is defined as Haskell data type "Expr". In this case, it supports only
different types of expressions. An experimental language is focused on Integer manipulation;
it, thus, only supports integer values. Here is a definition of an Integer value.

```haskell
        | Val Int
```

Definition of the sum of two expressions.

```haskell
        | Expr :+: Expr
```

Syntax definition of a "Throw" and "Catch" commands. If the first expression of "Catch"
is equal to "Throw", meaning an exception is raised (something goes wrong),
then the second expression will be evaluated; otherwise it will be left unchecked.

```haskell         
        | Throw
        | Catch Expr Expr
```

Syntax definition of "WithRef" command. It creates a new reference with a given value. The
first string variable of the command defines the name of new reference, the second value is
an expression which describes how to compute the initial value of the new reference and the
third value is the context in which the reference is valid. "WithRef" stack frame is the handler
for "Get" and ":=" commands. An example expression would be: WithRef "x" (Val 2)
(Val 5 :+: Get "x"). From the example, we can see that "x" is a new reference with
an initial value of "Val 2" and it is valid in a context Val 5 :+: Get "x", which would
return "7".

```haskell
        | WithRef String Expr Expr
```

Syntax definition of getting the value of a defined reference.

```haskell
        | Get String 
```

Syntax definition of setting the defined reference value to be equal to some new expression.

```haskell
        | String := Expr 
```

Syntax definition for evaluating two expressions one by one and taking the value of the second.
In most programming languages it is defined as ";".

```haskell
        | Expr :> Expr
```

### Compiler

The purpose of the compiler is to take in a formatted expression of the experimental language
described above and to output a JavaScript compiled data structure (array of functions, called
resumptions) which can be used by the abstract machine.

Below is a definition of code generation monad. It contains a constructor "MkCodeGen" and
a deconstructor "codeGen". The monad takes in next available integer value and outputs a data
structure which holds a list of integers, which map to the JavaScript code of the string type,
the next available number after the compilation, and the result of the compilation "val".
Usually, the list of definitions will start with the input "next number" and go up to just
before the output "next number". 

```haskell
newtype CodeGen val = MkCodeGen {
            codeGen :: Int -> ([(Int, String)], Int, val) 
        }                
```

"MkCodeGen" is used to construct a definition in "genDef" function displayed below.
"genDef" returns the definition number and is used by compile function to generate new
function definitions.

```haskell
genDef :: String -> CodeGen Int 
genDef code = MkCodeGen $ \ next -> ([(next, code)]
                            , next + 1, next)
```

The type of "compile" function is shown below. The "compile" function takes in
a valid language expression and outputs the entry point of the compilation as well
as the compilation process which can be separated into chunks of generated JavaScript code.  

```haskell
compile :: Expr -> CodeGen Int
```

"Compile" function is either used to create new function definitions or
to compile expressions into JavaScript, depending on the type of "Expr". For example,
if "compile" takes an initial expression of Val 2 :+: (Val 4 :+: Val 8), through
pattern-matching the case for ":+:" will be executed, and through recursion it will be
executed again for the right side (Val 4 :+: Val 8) as well. The definition of the
":+:" case is shown below.


```haskell
help s (e1 :+: e2) = do 
    f2 <- compile e2
    help ("{prev:" ++ s ++ ", tag:\"left\",
                     data:"++ show f2 ++"}") e1
```

Furthermore, for each value of the expression ("Val 2", "Val 4" and "Val 8"),
the function definition will be generated, because "compile" function has a case for that.

```haskell
help s (Val n) = genDef $
        "function(s){return{stack:"++ s ++ ",
                     tag:\"num\", data:"++ show n ++"}}"
```

After the "compile" function is done executing the structure is compiled and
ready to be outputted to the file.


#### Formating and outputting to file

Output formating is done by "jsSetup" function. It takes the name of the array,
the result of the "compile" function and outputs a JavaScript formatted string.

```haskell
jsSetup  ::  String       -- array name
         ->  CodeGen x    -- compilation process
         ->  (  String    -- JavaScript code
             ,  x         -- result
             )
```

"jsWrite" takes an output of "jsSetup" and writes up everything into a 
file - "generated.js", which is ready to be used by the abstract machine.

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

The purpose of the abstract machine is to take in a compiled program and to provide semantics
for the file, so that it is runnable on the browser. It gradually builds a stack from a given
data structure (located in "generated.js"), where each frame of the stack has a link to another
frame. The elegant aspect of this structure is that stack frames can be saved, updated,
deleted and restored, thus making the machine's structure flexible.

**Data Structure of compiled expression**

The data structure of the compiled expression
Each data structure generated by the compiler is an array called *resumptions*. Its entries
are functions which take in a stack. This way, it is possible to nest them while keeping
track of the stack. Below is an example of an array of resumptions ready to be used by
the abstract machine; it was constructed from the expression Val 3 :+: Val 2. The
semantics of this particular structure are simple - to add two numbers "2 + 3", so the
expected output is "5". Comments in the code snippet below explain the meaning of the
different variables in the structure. For more complex examples, see *main/example_programs* or
test cases.

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

This section focuses on explaining the detailed implementation of the experimental abstract
machine. It is defined as a function which takes in an array of resumptions as an argument.
The array "foo", described above, will be used as a reference throughout this section.

Modes are objects which store current stack and computation. The initial definition
of mode with pre-set starting values is shown below. Because the starting stack is empty,
the "stack" parameter is defined as "null"; the "tag" is an expression type; if it is
equal to "go", the machine must take the "data" parameter, which is an index of the last
element in the array of resumptions, in order to retrieve the next mode.

```javascript
var mode = {
    stack: null,
    tag: "go",
    data: f.length - 1
    }
```


Each resumption is a function, which takes in a stack as a parameter and returns a mode.
The abstract machine will finish the compilation if "mode.tag" is not equal to "go". However,
if it is equal to "go", then mode must be reinitialized, because the current mode is not a final
value. The machine therefore retrieves the next mode from the resumptions array and passes
stack to it, so that the mode has access to previous stack frames.

```javascript
    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);
```

"f" represents a resumptions array. Considering the example "foo" array, the
code above would create the following mode.

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

The abstract machine will continue executing while reinitializing the mode's value every
time "mode.tag" changes to "go" until the "mode.tag" becomes not equal to "go" and the
 stack is empty. This means that the mode is a value and that the machine is done computing.

```javascript
while (mode.tag != "go" && mode.stack != null) {
```

If the execution continues, then the behavior of the abstract machine will differ based
on the mode's "tag" parameter. In example "foo" computation, the "mode.tag" is equal to
"num". Overall, "mode.tag" could be equal to these values:

* **"num"** - all of the basic evaluations of the given expression. The machine's
    further actions depend on the value of "mode.stack.tag". In the case of the example "foo",
    its value would be "left". 
    + Addition ("**left**" and "**right**" tags) - "left" tag creates a stack frame with tag
     "right", thus preparing a frame for addition by placing the current value on the top of
     the stack and preparing to evaluate the other expression. If the top of the stack "tag"
     is equal to "right", the abstract machine can add two of the top frames together, therefore
     creating a new "num" mode (contains the answer of the addition) and deleting the top frame
     of the stack. In the case of example "foo", the "left" case would change its mode to:
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
    And because the "mode.stack.tag" is equal to "right", the "mode.data" would be added with
    "mode.stack.data" to create a new mode:
    ```javascript
        mode = {
            stack: null,
            tag: "num",
            data: 3 + 2
        }
    ```
    This would be the final mode, because the stack would be empty and the "tag" would not equal
    "go"; so the machine would return "5" as the result of the computation. Other instructions
    manipulate the mode's data in a similar fashion, building or destroying the stack in the
    process.
    + "**Catch**" - creates a stack frame with the tag "catcher" and places it on the top of the stack.
    Its data parameter is equal to the index of second expression which will be evaluated if first
    expressions throws an exception.
    + New reference - creates a stack frame with a tag "**WithRefRight**". It is different from
    the other stack frames because it has a "name" parameter, which is needed to distinguish
    between different references. It also holds the value of the reference in its "data" parameter.
    + Next ("**:>left**" and "**:>right**") - implementation is similar to addition; however,
    the key difference is that if the top stack frame tag is equal to the ":>right",
    the abstract machine will take its data without adding anything and delete the previous
    stack frame. These operations evaluate two expressions but return the value of the second.
    + Set ("**:=**") - very similar to the "Get" command (described below); the key difference
    is that it alters the value of the stack frame which has a tag "WithRefRight" with
    the given name of the reference. This command utilizes a linked list stack saving
    structure to restore the stack while saving any changes made. An exception could be thrown
    if the reference is undefined.
 
* **"throw"** - defines that something went wrong; so the abstract machine will look for
a "catcher" frame in the previous stack frames, and if it does not find it then it will
output an exception.
```javascript
    mode = {
        stack: mode.stack.prev,
        tag: "throw",
        data: "Unhandled exception!"
    }
```
However, if it does, then this means that the exception was handled; therefore, the abstract
machine will reinitialize the mode to continue executions by taking the "catcher" values
of "stack" and "data" (some expression).
```javascript
    mode = {
        stack: mode.stack.prev,
        tag: "num",
        data: mode.stack.data
    }
```        


* **"get"** - goes through the stack while looking for a reference, outputs either a value
of the reference if it finds it, or tries to throw an exception if it does not. It also utilizes
a linked stack saving and restoring structure in order to restore the stack if it does find
a reference.

After the abstract machine finishes running, the "mode.tag" is not equal to "go" and the
stack is empty, it will output the final mode to the console by invoking a "printer"
function for the user to clearly see the results. Finally, the abstract machine outputs
the final value of the execution on the separate line for testing purposes, which is used
by the testing framework to compare the expected and the actual output of a test.

```javascript
console.log(mode.data);
```

#### Linked Stack Saving and Restoring

The abstract machine uses the "saver" helper function in "get" and ":=" implementations.
This function allows the machine to inspect the depths of the stack and to assign new values
to the existing frames of the stack by remembering changes made. To achieve this, the abstract
machine saves each frame of the stack by linking frames together; each newly saved frame thus
has a link to the previous saved frame. Below, the "saveStack" function is displayed, where
the "m" variable represents the current stack frame and "prev" field is a link to the previous
saved frame.

```javascript
save = {
    prev: save,
    tag: m.tag,
    data: m.data,
    name: m.name
}
```  

The save is a reverse linked list of stack frames; thus it is possible to restore the original
stack including all the changes made by reverse-engineering the stack. After the stack is
successfully restored, all of the save data must be destroyed and parameters reset to keep
future saves unaffected. A current limitation is that only one instance of a stack save can
exist at a given time; however, this is addressed in the final system.
 

#### Final Remarks

The abstract machine currently supports functionality for adding expressions, creating a reference,
obtaining the value of a reference, setting the new value of a given reference and throwing &
catching exceptions.

Room for improvement:

* Efficiency and optimization. An example would be removing the "go" tag and calling
  resumptions array directly;
* Documentation;
* Functionality;

All of these points are addressed in the final implementation.


## Conclusion

A preliminary experiment, implementing the essence of Frank-like execution for a much
simpler language, has been completed successfully. The key lessons were: 

* Haskell syntax;
* Language creation and its syntax development;
* Compiler - parsing the input and generating valid JavaScript code;
* Machine - executing the compiled expression array and managing its resources,
  such as the mode, the stack and the saved stack.


Key things to improve include optimization & performance.

The further plan was to roll out the lessons learned creating a compiler and a
virtual machine for more of the "Shonky" intermediate language that is generated
by Frank compiler. This will be covered in the next chapter.

