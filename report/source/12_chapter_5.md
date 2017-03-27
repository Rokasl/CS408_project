# Detailed Design and Implementation of the final system

The chapter focuses on implementation, design of the final compiler and the abstract machine, as well as,
any topics connected to them. 

## Introduction

The development of the final system started on week six of the second semester, after the
end of the experimental system's development. Some parts of the code were lifted from the earlier experiment
and main concepts of how virtual machines and compilers should work were reused.

### Disclaimer

The final system uses two other systems in its code base, thus not all of the code is written by
the author of this project. Author's code will be clearly indicated. Two projects connected to the 
system are:

* **Frankjnr** - developed by Sam Lindley, Craig McLaughlin and Conor McBride. Final system is
  essentially new back end for Frankjnr. Thus, the whole
  Frankjnr project was used and new back end was placed in *Backend* folder. Parts of Frankjnr code were
  slightly updated to let the user choose between the old back end and the new one. Updated files were:
  Compile.hs and Frank.hs; updated functions are clearly indicated with comments;
* **Shonky** - developed by Conor McBride. Final compiler uses Shonky's syntax file for its supported
  data structures and parse functions. However, developed system does not use *semantics* module, since
  it is replacing it.

More detailed descriptions of the projects can be found at **Related work** section of the report or at
their respective git pages.

## Project's folder structure

The final system is located in *final_implementation* folder. And all of the code for new 
compiler and abstract machine is located in "Backend" folder.

Table's starting folder is */final_implementation*.

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

Table: Folder structure

## Compiler

The compiler is located in *final_implementation/Backend/Compiler.hs* and it is written in Haskell. 
It is initiated when Frank program is called with a flag "output-js". Example with program
named "foo.fk": 

```bash
frank foo.fk --output-js
```

The developed compiler uses Shonky data structures, located in *Syntax.hs* file. Compiler
receives a list of program definitions from Frankjnr compiler in a form of Shonky
syntax, in particular - "[Def Exp]".  "Def Exp" is a "DF" data structure shown 
below. And it essentially means definition of function (operator).

```haskell
DF String   -- name of operator being defined
  [[String]]    -- list of commands handled on each port
  [([Pat], Exp)]  -- list of pattern matching rules
```



The core goal of the compiler is to compile data types "Exp" to JavaScript structures
(arrays of operators and resumptions). "Exp" is defined in Shonky's *Syntax.hs*. 

```haskell
data Exp
  = EV String                    -- variable
  | EI Integer                   -- integer
  | EA String                    -- atom
  | Exp :& Exp                   -- pair
  | Exp :$ [Exp]                 -- application
  | Exp :! Exp                   -- composition (;)
  | Exp :// Exp                  -- composition (o)
  | EF [[String]] [([Pat], Exp)] -- operator
  | EX [Either Char Exp]  -- string concatenation expression
```


The compilation results of each "DF" are combined 
into one JavaScript data structure, forming "resumptions" and "operators" arrays 
in the process. Top level function for this is "operatorCompile".
It
initiates chain reaction of function calls for each function definition ("DF") and concatenates the 
results into one data structure. This chain reaction of function calls consist of 
"oneCompile", which starts to compile single function definition and forms an "operators" array entry.
Then it calls
"makeOperator", which sets the "interface" (all available commands for given operator) 
and "implementation" (JavaScript function definition) by calling "funCompile".
"funCompile" is responsible for 
forming the actual function implementation of the operator and it proceeds to initiate "linesCompile",
which forms a "try" and "catch" blocks and calls the final function "lineCompile", who fills the lines
with compiled expressions by calling "patCompile" and "expCompile" functions with 
data on function's patterns and expressions. Finally, "lineCompile" forms a return statement.
To see how these expressions and patterns look compiled, see "gen.js" file. A figure 5.1 
shows a lifecycle of a single compilation. In the example, the code compiles the 
*[DF "main" [] [([],EI 1)]* definition, which evaluates to a single integer equal to 1.



\begin{figure}[!htb]
  \includegraphics[width=.9\textwidth, center]{source/images/compile.png}
  \caption{A high level representation of the compile functions}
  \label{fig:compile}
\end{figure}


"lineCompile" will compile expressions "Exp", however before it can do that, it must build an
environment look-up table. The table is used to retrieve defined values, shown below.  

```haskell
type EnvTable = [(String, Int)] -- environment look-up table
```

The compiler builds the lookup table by compiling list of patterns "Pat" with "patCompile"
and "vpatCompile"
functions. "Pat" values are retrieved from initial "DF" expression. 
Furthermore, there are two types of patterns. Patterns for computation - "Pat" and patterns
for value - "VPat". Patterns for computation can be thunk, command or "VPat" type. 
Functions "patCompile" and "vpatCompile" have been implemented using counter monad
"Counter", which is there to incrementally count each pattern and is used for indices of the
environment lookup table.

In order to form the environment's lookup table entries compiler must match patterns.
The core pattern matching principle
used was "match-this-or-bust" described in PhD thesis "Computer Aided Manipulation of Symbols" 
[@Match-bust]. "patCompile" and "vpatCompile" functions, therefore, will generate series
of checks for each individual
pattern. If there is none failing tests, then patterns will be added to the environement,
else it will throw an exception with "match failed!" message. As a consequence, the environment
look-up table ("EnvTable") will be formed with correspoding JavaScript matching tests, which will 
be later placed into a generated file.
The code snippet below represents a case for matching "VPat" integer values. First element of the 
return statement is an empty environment, second is series of matching checks. In this case, the
environment is empty because integers are not defined variables, so they can not be referenced
anywhere else. 

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

After the environment look-up table is ready, "lineCompile" function can now use it to 
compile expressions - "Exp" into computations (JavaScript objects), thus forming a "return"
statement in JavaScript. This is achieved in "expCompile"
function, which takes in an 
environment look-up table, function lookup table, stack (string data structure), expression ("Exp")
and outputs an JavaScript data structure encapsulated in monad "CodeGen". This monad is lifted
from earlier experiment and it is used here for the same reason, to construct function definitions
and track their indices in "funCompile" function. The compilation process will differ for each type
of expression, because each of them have to follow different rules to be compiled correctly.
For example, atoms are compiled as shown below. A JavaScript object is returned, which contains a 
stack and a computation with atom's values.

```haskell
return $ "{stack:" ++ stk ++ ", comp:{tag:\"value\"," ++
           "value:{tag:\"atom\", atom:\"" ++ a ++ "\"}}}"
``` 

On the other hand, for example, "pair" type of expressions are slightly more complicated,
because the "pair" contains
two expressions, so the compiler has to evaluate them both separately. The process is similar to
experimental systems addition, since the compiler makes a resumption for the second component
and keeps computing the first one.

```haskell
expCompile xis ftable stk (ecar :& ecdr) = do
  fcdr <- expFun xis ftable ecdr -- resumption
  expCompile xis ftable  -- compute first component
    ("{prev: " ++ stk ++ ", frame:{ tag:\"car\", env:env, cdr:"
     ++ show fcdr ++ "}}")
    ecar 
```

Another interesting and crucial type of expression compilation is function application. Here,
because the function is applied to list of arguments, compiler has to compile each of the arguments
by forming a linked list data structure. And to form it the compiler utilizes a helper function, named
"tailCompile", which recursively builds a linked list. To look at all of the "expCompile" cases, see 
*Compiler.hs* file. 

### Full compilation example

This example will show how function definition *[DF "main" [] [([],EI 1)]* is compiled.
Expected output is displayed below.

```javascript 
operator[0] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: stk,
                comp: {
                    tag: "value",
                    value: {
                        tag: "int",
                        int: 1
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
```

The compilation begins with "operatorCompile", and it immediately, initiates "oneCompile" with prepared
function table and single "DF" expression. In the context of this example, *"main" [] [([],EI 1)]*
will be passed to "oneCompile". As a result, "oneCompile" creates "operator[0]=" and initiates
"makeCompile" function with counter equal to 0, in addition to previous parameters. 

"makeCompile" creates two objects: "interface" and "implementation". Furthermore, it adds all 
available commands to the interface object and initiates "funCompile" inside the "implementation" 
object. "funCompile" takes 0 (counter) and *[([],EI 1)]* as its parameters and adds 
"function(stk,env,args){", before calling "linesCompile" function to form a "try" and "catch" blocks.
And "linesCompile" call "lineCompile" inside "try" block, in order to form a return statement.
Finally, "lineCompile" initiates "patCompile", to form an environment look-up table, followed
by "expCompile" in order to compile expression *EI 1*. At this point compilation is done, because
there are no more "DF"'s in the list, thus "operatorCompile" is done.



### Helper functions

This section will briefly explain the functionality of few helper functions. 

**parseShonky** - is used for testing purposes, it takes Shonky syntax files (ending with "uf"), reads it,
parses it utilizing the parse function located in *Syntax.hs* and runs the compiler on the result. Thus,
generating new "gen.js" file.

**jsComplete** - Takes the output of "operatorCompile". Wraps compiled list of "DF"
into one structure , formats it and writes the result of the compilation to the "gen.js" file.


## Abstract machine

The purpose of the abstract machine is to take in generated output of the compiler and run it on a 
browser, thus completing the main goal of the project.
For full usage and installation instructions see **Appendix 2**.

Abstract machine modules are located in\
*final_implementation/Backend/machine* folder. They are written in
JavaScript and are compiled to a single file\
*final_implementation/Backend/machine/dist/output.js*
by utilizing *webpack* library.

### JavaScript type definitions

This section explains the JavaScript types used by abstract machine to enforce the data structure
of the compiled Frank programs. Firtly, "JSEnv" represents an environemnt, which
is an array of "JSVal" values described below.

```javascript
JSEnv = JSVal[]
```

"JSRun" is an operator and it always returns a mode. Operators are located in "operators" array (in "gen.js").
Mode contains a stack and current computation. Top stack frame and current computation
both determine what to do next in the machine's lifecycle. 

```javascript
jstype JSRun = (JSStack, JSEnv, JSVal[]) -> JSMode
jstype JSMode = {stack: JSStack, comp: JSComp}     
```

A stack could be empty or consist of a frame and a link to previous frame. The idea of these links 
are applied from linked list data structure, where each element of the list has a link to the next 
element. Linked lists are used regularly throughout the project.

```javascript
jstype JSStack 
  = null
  | {prev: JSStack, frame: JSFrame }
```

Below is a stack's frame type, which determines the operation that needs to be done when
current computation is 
equal to "value". The operation is decided depending on the value of the "tag", so if the "tag" is equal to 
"car", the machine will expect that "env" and "cdr" values are defined as well.

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

Linked list data structure, where it could be empty or have a head element and tailing 
list of elements. 

```javascript
jstype JSList x
  = null
  | {head : x, tail : JSList x}    
```

A computation could either be a "value" or a "command", machine will know which one it is by checking 
its "tag" field and proceeding acordingly.

```javascript
jstype JSComp
  = {tag:"value", value: JSVal}
  | {tag:"command", command: String,
     args: JSVal[], callback:JSCallBack}
```

The linked list data structure is used again to form a call back structure. This structure is used when 
the machine begins to search for command's handler in the stack while building a "JSCallBack" by adding
checked stack frames to it. After the handler is found and command is done executing, the machine uses
"JSCallBack" to rebuild the stack to its original state.

```javascript
jstype JSCallBack
  = null
  | {frame: JSFrame, callback:JSCallBack}
```

Possible value types are displayed below, their type is determined by the "tag" value. "atom" is just an value
that cannot be deconstructed 
any further, however in a special case when "atom" is applied to a list of arguments
a command is initiated, which is based on "atom" value.
"int" represents an integer value. "pair" is a pair of two values, one is held in 
"car" object and the other is in "cdr". "operator" is a top level function. "callback" holds a 
"callback" object which has stack frames waiting to be restored after machine finds a hadler of a
command that it was looking for. "thunk" represents a suspended computation. And "local"
represents local functions, which due to procedure called "Lambda Lifting" [@LambdaLifting],
abstract machine will turn them into a top level functions and execute. 
 

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



### Implementation

The abstract machine takes contents of "gen.js" as an input, which contains two different arrays: 
"operators" and "resumptions". The operators are equivalent to top level functions in Frank, the
resumptions are computations
waiting to be executed. In current machine's implementation starting operator is always the
first function; 
main method, thus, must be at the top of Frank's file. Operators return modes which are computation
which keep track of stack.
Below the machine defines initial mode with initial empty stack, no arguments and no environment. 

```javascript
var mode = operators[0].implementation(null, [], []);
```


The machine will keep executing in a while loop until stack becomes empty; before halting
it will return the final mode and call printer helper function to display the output. In each while cycle
the machine checks the current computation tag, it can either be a "value" or a "command" and depending on 
which one it is, the machine will act accordingly.

\begin{figure}[!htb]
  \includegraphics[width=\textwidth, center]{source/images/machine.png}
  \caption{A high level representation of the virtual machine}
  \label{fig:compile}
\end{figure}

#### Computation - "value" 

If the "mode.comp.tag" is equal to "value" then the machine will look at the first frame of the stack
to receive information on what to do next. There are four options depending on the frame tags, each
of them will construct a new mode while altering the stack in the process (look at *JavaScript type
definitions* section to see structure):

* **"car"** - will construct mode out of calling a resumption based on "mode.stack.frame.cdr" value.
  For resumption to construct a new mode it needs two values, stack and an environment. Therefore, 
  machine will pass in the stack and the environment as well. Although, it will alter the stack by
  removing top stack frame and creating a new one with a "cdr" tag and a car value. This procedure
  is similar to experimental system's addition operation.
```javascript
    mode = resumptions[mode.stack.frame.cdr]( 
        stack = { // new stack
          prev: mode.stack.prev, 
          frame: {
            tag: "cdr",
            car: mode.comp.value
          },
        }, mode.stack.frame.env); // environment
```

* **"cdr"** - will reduce the stack and return a pair of *car* and *cdr* as its computation. 
  It will take *car* value from the current stack frame and *cdr* from current computation value.

* **"fun"** - means application, so some pattern needs to be applied to a list of arguments,
  which is essentially list of resumptions. If the
  list of arguments is empty that means the machine is ready
  to initiate the function application by calling helper "apply" function without any arguments.
  If, however, the waiting argument list is not empty the machine needs to construct a new mode with
  frame tag equal to "arg".
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
  "fun" field is used to keep the pattern that will be applied when the arguments "waiting" list is empty.
  "env" is held to keep the environment. "ready" list is used to know which arguments have been parsed, initially it
  is empty. "waiting" is used to keep track of list of arguments that are left unchecked. And, lastly,
  "handles" with "waitingHandles" are used to keep track which argument handle what commands, so if handles
  list is empty it means that this argument doesn't handle any commands. It gets these values by 
  applying helper functions, which return head and tail of the "waitingHandles" list. And the initial
  handle list is 
  extracted from the operator's interface by utilizing helper function "interfaceF", which simply returns given 
  operators interface (list of commands that it can handle).  

* **"arg"** - simply adds current head of arguments to the ready list and initiates helper function 
  "argRight" which will return new mode (its functionality in detail
   is described in "Helper functions" section).

#### Computation - "command"

Because of command type computations, Frank is different from other functional languages. When command
computation happens the current execution is interrupted and the control is given to the handler,
which looks for
the requested command in the stack while building a callback (checked stack frames) to restore the stack
when the command is found and finished executing.

In this implementation, computations with a tag equal to "command" are created in a case when an atom
is applied to a list arguments. Then the abstract machine goes down the stack while looking for the
command's handler. Each time it does not find it, the machine will place top frame in the callback
and move down by one frame:

```javascript
mode.comp.callback = {
  frame: mode.stack.frame, // current frame
  callback: mode.comp.callback 
}
mode.stack = mode.stack.prev // new frame
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

**argRight** - takes in stack tail, function to be applied, list of arguments which are ready, 
environment, list of arguments which are still waiting to be checked and list of handled commands.
List of handled commands is kept for the machine to know what commands does the resumption handle.
Same as in the "fun" case, if the "waiting" list of resumptions (arguments) is empty then the machine is
ready to apply the function, thus it will call apply function. If the "waiting" list not empty
then the machine will create new "arg" frame in the
same fashion as in "fun" option. The key difference is that "fun" could be instantly applied if it did not
have any arguments, thus not creating any "arg" frames. However, there is a potential to move all logic
to "argRight" function without having any in "fun" case, improving code reuse and optimization.  

**apply** - Depending on a "fun" computation value, constructs a mode from which to continue 
execution. "fun" computation could be one of the following:

* **"int"** - Applying "int" to an argument is not really sensible, however in this case it is possible 
because of built-in operations (see *Built-in functions* section). This custom functionality lets machine
add and subtract integer values.

* **"local"** - Means a local function. The machine is turning a local function into top level operator,
concept introduced by [@LambdaLifting] and it is named "Lambda Lifting". Mode is
constructed out of an "operator" variable, which contains full function definition.

* **"operator"** - Means top level function, mode is constructed from an 
"fun.operator" value which is an index for operators array. 

* **"atom"** - Applications of atoms mean a command is initiated; mode with "command" tag and command
value should be created. It, also keeps the arguments and creates a "callback" value to be able to restore
the stack successfully after finding required command in the stack. Definition of new mode is displayed below.

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
the stack to its original position. It does this by looping through the "callback" while building the stack
with callbacks frames. When it is done, machine returns a mode constructed of the restored stack and 
first element of arguments list. 

```javascript
      stack: stack,
      comp: args[0]
```

**printer** - takes the mode of finished execution, parses it to make it readable and displays it on 
the browser's console.

## Built-in functions

Current built-in functions include "plus" and "minus", in order to make integer manipulation possible. 
They are defined before the top-level function compilation begins in function *operatorCompile*
and then just initialized together with them, like this:

```haskell
let fs = [(f, (h, pse)) | DF f h pse <- ds] ++ builtins
```

However their current definitions are a bit different. 
The compiler is not able to 
give them meaning because it does not know how to manipulate two integer expressions; instead compiler
must pass this functionality 
to the abstract machine, which can interpret those expressions and apply wanted arithmetic operation.
The compiler codes wanted arithmetic operation into the function definition, like this:

```haskell
DF "minus" [] [...], EV "x" :$ [EV "y", EV "y"]
```

":$" means application, compiler tries to apply integer variable "x" to a list of integer variables "y",
which initially does not make any sense. However, machine has encoded semantics for this situation.
If integer, therefore, is applied to a list of arguments that could only mean one of 
two things, either that integer needs to be added to the first element of the list or subtracted  from it.
The machine determines the arithmetic operation by looking how many elements are in the argument list and 
applies the correct operation accordingly.

```javascript
if (args.length === 2) { // minus
  answ = fun.int - args[0].value.int;
} else { // plus
  answ = fun.int + args[0].value.int;
}
```

Those were special cases when compiler is not able to deal with them, however other built-in functions,
which do not require arithmetic operations can easily be added without machine knowing about them.
Such as, pairing two elements or getting first element out of a pair.


## Possible improvements

**Abstract machine**

* To store stack frames in chunks of frames, where only the top frame of a given chunk could potentially
handle a command. When searching for a command's handler this method would allow to jump through frames,
which tags are not equal to "arg", therefore improving performance and efficiency. This improvement
is based on concepts described in "Proceedings of the 1st International Workshop on Type-Driven Development"
[@Chunks1];

* Add string concatenation and built-in web feature support. 

**Compiler**

* Current state of JavaScript type definitions are not enforced by the compiler; so compiler trusts 
the programmer to encode them correctly. The improvement would be to enforce types with Haskell
data structures, thus minimizing the risk of bugs in production; 

* To change pattern matching procedures from "match-this-or-bust" [@Match-bust] to building a tree of 
switches described in "Functional Programming and Computer Architecture" [@Tree-switching], in order
to increase efficiency;

* Implement string concatenation support. 

  