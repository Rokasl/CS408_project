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

* **Frankjnr** - developed by Craig???. Final system is essentially new back end for Frankjnr. So the whole
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

Table: Project folder structure

## Compiler

Compiler is located in *final_implementation/Backend/Compiler.hs* and it is written in Haskell. 
It is initiated when frank program compilation is called with flag "output-js". Example with program
named "foo.fk": 

```bash
frank foo.fk --output-js
```

Compiler receives list of program definitions from Frankjnr compiler in a form of Shonky
syntax data type - [Def Exp]. 

 Then it has to compile the 
environment followed by expressions. 
Compiler receives 

### Built in functions

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

## Abstract machine

## Testing framework

Contained in *final_implementation/Backend/tests* folder. Framework is design to launch number of 
programs, located in *test_cases* folder, and give back results to the user, which test programs
succeeded and which failed. It eliminates manual testing, lets identify bugs faster, thus 
speeding up development process and easing maintenance. And it is fully written in Bash Script.

Some parts of the test framework were lifted from earlier experiment, however the key differences are 
that it is not using GHC compiler directly; so it eliminates the need for Expect Script (previously
located in *helper.sh* file),thus improving performance of the framework. Another change is that
test cases don't take in expressions anymore, instead they take in paths to actual programs, therefore
providing ability to launch them and check their output.

For all test case programs, usage & installation instructions check Github or see Appendix.

### Implementation

Similarly like in experimental systems test framework, test cases are stored in array. Each of them are
objects which store three values: path of the test program, name of the test and expected output.
They are looped through on by one displaying the name of the test to the user and recompiling the
test with:

```bash
frank ${test[path]} --output-js
```

It generates the *gen.js* in *Backend/machine/dist* folder. At this point *Backend/machine/dist/output.js*
needs to be recompiled to include new *gen.js* file. 

```bash
webpack --hide-modules
```

Then it just retrieves the output with *Node* and checks if it as expected or not; letting the user 
know if test failed or passed. Finally, some statistics are shown: how many tests in total have passed
and failed with corresponding percentages.



### Possible improvements

* Providing more statistics at the end;
* Timestamping tests, letting the user know how much time it took to run individual tests and all of 
  them together;
* Improve performance by not trying to launch programs which do not compile.


## Possible improvements

use chunks of stacks when top of the chunk is possible needed stack frame and others are not (speedup)

turn local functions into top level operators is called "Lambda-lifting" it was 
invented by Thomas Jonson in 1985 (Springer LNCS 201). it's used in eg. GHC


Match-this-or-bust pattern matching is late 60s technology:

  Computer Aided Manipulation of Symbols
  F.V. McBride
  PhD thesis, 1970, Queen's University Belfast

The more efficient compilation by building a tree of switches is

  Compiling Pattern Matching
  Lennart Augustsson
  in Functional Programming and Computer Architecture 1985
  Springer LNCS 209