# Detailed Design and Implementation of the final system

Chapter focuses on implementation, design of the final compiler and abstract machine, as well as,
any topics connected to them. 

## Introduction

Final system started to develop on week six of the second semester after the end of experimental system
development. Some parts of the code were lifted from the earlier experiment and main concepts of how
virtual machines and compilers should work are reused.

### Disclaimer

Final system uses two other systems in its code base, thus not all of the code is written by
the author of this project. Author's code will be clearly indicated. Two projects connected to the 
system are:

* **Frankjnr** - developed by Sam Lindley, Craig McLaughlin and Conor McBride. Final system is
  essentially new back end for Frankjnr. So the whole
  Frankjnr project was used and new back end was placing in 'Backend' folder. Parts of Frankjnr code were
  slightly updated to let the user choose between the old back end and the new one. Updated files were:
  Compile.hs and Frank.hs, updates are clearly indicated with comments;
* **Shonky** - developed by Conor McBride. Final compiler uses Shonky's syntax file for its supported
  data structures and parse functions;

More detailed descriptions can be found at 'Related work' section of the report or at their
respective Github pages.

## Project folder structure

Final system is located in "final_implementation" folder. And all of the code for new 
compiler and abstract machine is located in "Backend" folder.

Table's starting folder is *"/final_implementation"*.

| Paths and Files              |                   | Summary                                                   |
|------------------------------|-------------------|-----------------------------------------------------------|
|                              |                   | Main directory for final implementation                   |
|                              | Frank.hs          | Main Frankjnr file                                        |
|                              | Compile.hs        | Compiles Frank to Shonky data structures                  |
|                              |                   |                                                           |
| */Backend*                   |                   | Machine and Compiler files                                |
|                              | Compiler.hs       | Main compiler                                             |
|                              |                   |                                                           |
| */Backend/machine*           |                   | Abstract Machine files                                    |
|                              | webpack.js        | Webpack configuration file                                |
|                              | tester.html       | HTML which includes output.js (testing purposes)          |
|                              | main.js           | Main machine function                                     |
|                              |                   |                                                           |
| */Backend/machine/components*|                   | Includes all components to construct Virtual Machine      |
|                              | machine.js        | Main component for  Virtual Machine                       |
|                              | printer.js        | Component responsible for result printing                 |
|                              |                   |                                                           |
| */Backend/machine/dist*      |                   | Generated files                                           |
|                              | gen.js            | Compiler generated code                                   |
|                              | output.js         | Webpack generated code (every JS file is packed into one) |
|                              |                   |                                                           |
| */Backend/Shonky*            |                   | Shonky project directory                                  |
|                              | Syntax.hs         | Contains needed data structures                           |
|                              |                   |                                                           |
| */Backend/tests*             |                   | Test framework                                            |
|                              | main.sh           | Main file (launch file)                                   |
|                              | testcases.sh      | Contains all of the test cases                            |
|                              |                   |                                                           |
| */Backend/tests/test_cases*  |                   | Actual programs to test                                   |
| */Backend/tests/test_cases/old* |                 | Test programs lifted from Frankjnr                        |
| */Backend/tests/test_cases/new* |                 | New test programs                                         |
|                              |                   |                                                           |
| */Backend/benchmark*         |                   | Benchmarking scripts                                      |

Table: Project folder structure

## Compiler

Compiler is located in *final_implementation/Backend/Compiler.hs* and it is written in Haskell. 
It is initiated when frank program compilation is called with flag "output-js". Example with program
named "foo.fk": 

```bash
frank foo.fk --output-js
```

Developed compiler constatly uses Shonky data sctructures, located in *Syntax.hs* file, because it
receives a list of program definitions from Frankjnr compiler in a form of Shonky
syntax data structure, in particular - "[Def Exp]".  "Def Exp" can be either ":=" or "DF", however
Frank compiler always gives back list of "DF", thus this compiler will only support them as well. 
"DF" means functions definitions and they consist of:

```haskell
DF String   -- name of operator being defined
  [[String]]    -- list of commands handled on each port
  [([Pat], Exp)]  -- list of pattern matching rules
```

Goal for the compiler is to compile data type "Exp" (type of expression, such as atom or application) to 
working JavaScript, generating functions that do intermediate steps. The code for compiling "Exp" will
expect a lookup table which maps the "environment" array (stores values of pattern values) to 
array indices. In order to find out if certain values are in scope, otherwise compilation will fail.

```haskell
type EnvTable = [(String, Int)]
```

Furthermore, there are two types of patterns. Pattern for computation - "Pat" and pattern
for value - "VPat". Patterns for computation can be thunk, command or "VPat", such as variable "VPV",
pair "VPat :&: VPat" and so on. Compiler has to build an "EnvTable" from these patterns, hence
these two functions: "patCompile" and "vpatCompile". They have been implemented using counter monad
"Counter", which is there to count each patern and is used for "environment" lookup table.
And the core pattern maching priciple
used was "match-this-or-bust" described in PhD thesis "Computer Aided Manipulation of Symbols" 
[@Match-bust]. Therefore, these functions will generate series of checks for each individual pattern and
if everything is fine and the pattern is a variable and not, for example, an atom or integer,
add them to the "environment", else it will throw an expection. In the code snippet below the patern
is an integer so we don't need to add them to the environemnt, but it still has to pass these tests
in order to match. Value "next" is just a counter to arange correct indeces for "environment"
lookup table:

```haskell
vpatCompile v (VPI x) = do -- integer value
  i <- next
  return ([],
    "if (" ++ v ++ ".tag!==\"int\") ++
        {" ++ matchFail ++"};\n" ++
    "if (" ++ v ++ ".int!==" ++ show x ++ ") ++
        {" ++ matchFail ++"};\n"
    )
```

After "environment" lookup table is compiled and ready to go, compiler now needs to use it to 
compile expressions - "Exp". This is achieved in "expCompile" function, which takes in an 
"environment" lookup table, function lookup table, stack (string data structure), expression and 
outputs an JavaScript data structure encapsulated in monad "CodeGen". This monad is lifted from earlier
experiment and it is used here for the same reason, to construct function definitions and track their 
indeces in "funCompile" function. The compilation process will differ for each type of expression,
because each of them have to follow different rules to be compiled correctly, for
instance "EA" (atoms) type is straightforward, because atoms are simple and compiler only needs to compile
the actual atom. It looks like this:

```haskell
return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\"," ++
           "value:{tag:\"atom\", atom:\"" ++ a ++ "\"}}}"
``` 

However, for example "pair" type of expressions are more complicated, because the "pair" contains
two expressions, so the compiler has to compile them both separately:

```haskell
expCompile xis ftable stk (ecar :& ecdr) = do
  fcdr <- expFun xis ftable ecdr
  expCompile xis ftable 
    ("{prev: " ++ stk ++ ", frame:{ tag:\"car\", env:env, cdr:"
     ++ show fcdr ++ "}}")
    ecar
```

Another interesting and crucial type of expression compilation is function application. Here,
because the function is applied to list of arguments, compiler has to compile each of the arguments
by forming a linked list data structure. And to do this it utilizes the helper function named
"tailCompile", which recursivly builds a linked list. 


However, before any of individual expression compilation or "environement" building can begin,
compiler needs to 
combine everything into one JavaScript data structure, forming resumptions and operators arrays in the
process. The function for this is "operatorCompile",
which initiates chain reaction of function calls for each function definision and concatines the 
results into one data structure. This chain reaction of function calls consist of 
"oneCompile", which starts to compile single fuction definition and forms an "operators" array entry.
Then it calls
"makeOperator", which sets the "interface" (all available commands for given operator) by calling
"availableCommands" and "implementation" (JavaScript function definision) by calling "funCompile".
"funCompile" is responsible for 
forming the actual function definition of the operator and it procedes to initiate "linesCompile",
which forms a "try" and "catch" blocks and calls the final function "lineCompile", who fills the lines
with compiled expression data by actually calling "patCompile" and "expCompile" functions with 
data on functions patterns and expressions; finally, "lineCompile" forms a return statement of the
function. To see how these expressions and paterns look compiled, see "gen.js" file.


### Helper functions

This section will briefly explain functionality of few helper functions. 

**parseShonky** - is used for testing purposes, it takes Shonky syntax file (ending with "uf"), reads it,
parses it utilizing the parse function located in *Syntax.hs* and runs the compiler on the result. Thus,
generating new "gen.js" file.

**jsComplete** - wraps everything into one function, it takes the output of "operatorCompile", formats
it and writes the result of the compilation to the "gen.js" file.


## Abstract machine

Purpose of the abstract machine is to take in generated output of the compiler and run it in the 
web, thus completing the task of running Frank code in the browser.
For full usage & installation instructions see Appendix 2.

Abstract machine modules are located in\
*final_implementation/Backend/machine* folder. They are written in
JavaScript and are compiled to a single file\
*final_implementation/Backend/machine/dist/output.js*
by utilizing webpack.

### Implementation

Abstract machine takes contents of gen.js as an input, which contains two different arrays: 
operators and resumptions. Operators are equivalent to functions in Haskell, resumptions are computations
waiting to be executed. In current implementation starting operator is always the first function, so
main method should be at the top of file. And they return modes which are computation who store stack,
here the machine defines initial mode with initial empty stack, no arguments and no environment: 

```javascript
var mode = operators[0].implementation(null, [], []);
```

The machine will keep executing in a while loop until stack becomes empty; before halting
it will return the final mode and call printer helper function to display the output. In each while cycle
machine check the current computation tag, it can either be a "value" or a "command" and depending on 
which one it is, machine will act accordingly.

#### Computation - "value" 

If the "mode.comp.tag" is equal to "value" then machine will look at the first frame of the stack
to receive information on what to do next. There are four options depending on the frame tags, each
of them will construct new mode building or reducing the stack in the process (look at *JavaScript type
definitions* section to see their structure):

* **"car"** - will construct mode out of calling a resumption based on "mode.stack.frame.cdr" value.
  For resumption to construct a new mode they need two values, stack and an environment. Therefore, 
  machine will pass in the stack and the environment as well. Although, it will alter the stack by
  removing top stack frame and creating a new one with a "cdr" tag and a car value.
```javascript
     frame: {
       tag: "cdr",
       car: mode.comp.value
     },
```

* **"cdr"** - will reduce the stack and return a pair of *car* and *cdr* as its computation. It will take
  *car* value from the current stack frame and cdr from current computation value.

* **"fun"** - means application, so some function needs to be applied to a list of arguments,
  which is essentially list of resumptions. If the
  list of arguments is empty that means the machine is ready
  to initiate the function application by calling helper "apply" function without any arguments.
  If, however, the argument list is not empty machine needs to construct new mode with frame tag "arg".
  It creates new mode out of first argument resumption "resumptions[mode.stack.frame.args.head]" and 
  passes all the needed information in the new stack frame:
```javascript
     frame: {
       tag: "arg",
       fun: mode.comp.value,
       env: mode.stack.frame.env,
       ready: [],
       waiting: mode.stack.frame.args.tail,
       handles: headHandles(intf),
       waitingHandles: tailHandles(intf)
     },
``` 
  "fun" field to keep the function that will be applied when the arguments "waiting" list is empty.
  "env" to keep the environment, "ready" list to know which arguments have been parsed, initially it
  is empty. "waiting" to keep track of list of arguments that are left unchecked. And, lastly,
  "handles" with "waitingHandles" to keep track which argument handle what commands, so if handles
  list is empty it means that this argument doesn't handle any commands. It gets these values by 
  applying helper functions, which return head and tail of the list. And the initial handle list is 
  extracted from operators interface with helper function "interfaceF", which simply returns given 
  operators interface (list of commands that it can handle).  

* **"arg"** - simply adds current head of arguments to the ready list and initiates helper function 
  "argRight" which will return new mode (its functionality in detail
   is described in "Helper functions" section).

#### Computation - "command"

Because of "command" type of computations Frank is different from other functional languages. When command
computation appears the current execution is interrupted and the control is given to the handler,
which looks for
the requested command in the stack while building a callback (checked stack frames) to restore the stack
when the command is found and finished executing.

In this implementation, computations with tag equal to "command" are created in a case when an atom
is applied to a list arguments. Then the abstract machine goes down the stack while looking for the
command. Each time it doesn't find it, it will place top frame in the callback and move down by
one frame:

```javascript
mode.comp.callback = {
  frame: mode.stack.frame,
  callback: mode.comp.callback
}
mode.stack = mode.stack.prev
```  

For the machine to find a command in a frame, it must be an "arg" frame. And it must contain the command 
that the handler is looking for in its "handles" list (it indicates which commands does given "arg"
handle).

```javascript
if (mode.stack.frame.tag === "arg") {
  for (var i = 0; i < mode.stack.frame.handles.length; i++) {
    if (mode.stack.frame.handles[i] === mode.comp.command) {
      ...
```

When these conditions are met, the command handler is found. Therefore it will place the computation
of the command on the "ready" argument list and will try to apply it by calling "argRight" helper
function, which in turn will call "apply" helper function if there are no waiting resumptions. 


### Helper functions

This section will describe the functionality of two main helper functions. 

**argRight** - takes in stack tail, function to be applied, list of arguments that are ready, 
environment, list of arguments which are still waiting to be checked and list of handled commands.
List of handled commands is kept for the machine to know what commands does the resumption handle.
Same as in the "fun" case if the waiting list of resumptions (arguments) is empty then the machine is
ready to apply the function, thus call apply function, if it is not then create new "arg" frame in the
same fashion as in "fun" option. The key difference is that "fun" could be instantly applied if it didn't
have any arguments, thus not creating any "arg" frames. Moreover, there is potential to move all logic
to "argRight" function without having any in "fun" case, improving code reuse and optimization.  

**apply** - Depending on a "fun" computation value, constructs a mode from which to continue 
execution. "fun" computation could be one of the following:

* **"int"** - Applying int to an argument is not really sensible, however in this case it is possible 
because of built in operations (see *Built in functions* section). This custom functionality lets machine
add and subtract integer values.

* **"local"** - Means a local function, and the machine is turning it into top level operator, concept
introduced by [@LambdaLifting] and it is named "Lambda Lifting". Therefore, mode is constructed out of 
an operator variable.

* **"operator"** - Means top level function, mode is constructed from an operator depending on 
"fun.operator" value which is an index for operators array. 

* **"atom"** - Applications of atoms mean a command is initiated; mode with command tag and command
value should be created. It, also keeps the arguments and creates a "callback" value to be able to restore
the stack successfully after finding required command in the stack. Thus new mode looks like this:

```javascript
      stack: stk,
      comp: {
        tag: "command",
        command: fun.atom,
        args: vargs,
        callback: null
      }
```

* **"thunk"** - Application of thunk pattern (suspended computation).
Constructs a mode while ignoring any arguments; computation expression comes from "fun.thunk".
New mode is equal to:

```javascript
      stack: stk,
      comp: fun.thunk
```

* **"callback"** - This means command has been found and executed and now the machine has to restore
the stack to its original position. It does this looping through the "callback" while building the stack
with callback's frames. When it is done, machine returns a mode constructed of the restored stack and 
first argument. 

```javascript
      stack: stack,
      comp: args[0]
```

**printer** - takes the mode of finished execution, parses it to make it readable and displays it on 
the screen.

### JavaScript type definitions

This section explains the JavaScript types used to enforce the data structure of programs.

"JSRun" is an operator, who always return mode. They are located in operators array in the generated
program ("gen.js"). Mode has a stack and current computation; top stack frame and current computation
both determine what to do next. 

```javascript
jstype JSRun = (JSStack, JSEnv, JSVal[]) -> JSMode
jstype JSMode = {stack: JSStack, comp: JSComp}     
```

Stack could be empty or consist of a frame and a link to previous frame. The idea of these links 
are applied from linked list data structure, where each element of the list has a link to the next 
element. This structure is used regularly throughout the project.

```javascript
jstype JSStack 
  = null
  | {prev: JSStack, frame: JSFrame }
```

Stacks frame type, which determines the operation that needs to be done when current computation is 
equal to "value". 

```javascript
jstype JSFrame 
  = null
  | {tag:"car", env: JSEnv, cdr: Int }
  | {tag:"cdr", car: JSVal }
  | {tag:"fun", env: JSEnv, args: JSList Int }
  | {tag:"arg", fun: JSVal, ready: JSComp[],
     env: JSEnv, waiting: JSList Int,
     headles: Int, waitingHandles: JSList Int }
```

List data structure, where it could be empty or have an current element and tailing list of elements. 

```javascript
jstype JSList x
  = null
  | {head : x, tail : JSList x}    
```

Computation could either be a "value" or a "command". 

```javascript
jstype JSComp
  = {tag:"value", value: JSVal}
  | {tag:"command", command: String,
     args: JSVal[], callback:JSCallBack}
```

```javascript
jstype JSCallBack
  = null
  | {frame: JSFrame, callback:JSCallBack}
```

These are the types of what value can be. "atom" is just an value that cannot be deconstructed 
any further. "int" represents an integer value. "pair" is a pair of two values, one is held in 
"car" object and the other is in "cdr". "operator" is a top level function. "callback" holds a 
"callback" object which has stack frames waiting to be restored after machine finds definition of
command that it was looking for. "thunk" represents a suspended computation. And "local" means local function, 
which do to procedure called "Lambda Lifting" [@LambdaLifting], abstract machine will turn it into a top
level function and execute. 
 

```javascript
jstype JSVal
  = {tag:"atom", atom: String}
  | {tag:"int", int: Int}
  | {tag:"pair", car: JSVal, cdr: JSVal}
  | {tag:"operator", operator: Int, env:JSEnv}
  | {tag:"callback", callback: JSCallBack}
  | {tag:"thunk", thunk:JSComp}
  | {tag:"local", env:JSEnv, operator: JSVal}
```

## Built in functions

Current built in functions are "plus" and "minus", in order to make integer manipulation possible. 
They are defined before the top-level function compilation begins in function *operatorCompile*
and then just initialized together with them, like this:

```haskell
let fs = [(f, (h, pse)) | DF f h pse <- ds] ++ builtins
```

However their current definitions are a bit different compared to others which are generated. 
Compiler is not able to 
give them meaning because he does not know how to manipulate two integer expressions; instead compiler
must pass this functionality 
to the abstract machine, which can interpret those expressions and apply wanted arithmetic operation.
Compiler codes wanted arithmetic operation into the function definition, like this:

```haskell
DF "minus" [] [...], EV "x" :$ [EV "y", EV "y"]
```

":$" means application, compiler tries to apply integer variable "x" to list of integer variables "y",
which initially does not make any sense. However, machine has encoded semantics for this situation,
therefore if integer is applied to a list of arguments that could only mean one of 
two things, either that integer needs to be added to first element of the list or substracted from it.
Machine determinse this by looking how many elements are in the list and applies the correct opperation
accordingly.

```javascript
if (args.length === 2) { // minus
  answ = fun.int - args[0].value.int;
} else { // plus
  answ = fun.int + args[0].value.int;
}
```

Those were special cases when compiler is not able to deal with them, however other built in functions,
which do not require arithmetic operations can easily be added without machine knowing about them.
Such as, pairing two elements or getting first element out of a pair.


## Possible improvements

**Abstract machine**

* To store stack frames in chunks of frames, where only the top frame of a given chunk could potentially
handle a command. This would skip checking all frames, which tags are not equal to "arg",
therefore improving performance.  

**Compiler**

* Current state of JavaScript type definitions are not enforced by the compiler; so compiler trusts 
the programmer to encode them correctly. The improvement would be to enforce types with Haskell
data structures, thus minimizing the risk of bugs in production. 

* To change pattern matching procedures from "match-this-or-bust" [@Match-bust] to building a tree of 
switches described in "Functional Programming and Computer Architecture" [@Tree-switching], in order
to increase efficiency. 

  