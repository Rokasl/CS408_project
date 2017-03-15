# Detailed Design and Implementation of the final system

Chapter focuses on implementation, design of the final compiler and abstract machine, as well as,
any topics connected to them. 

## Introduction

Final system started to develop on week six of the second semester after the end of experimental system
development. Some parts of the code were lifted from the earlier experiment and main concepts of how
virtual machines and compilers should work are reused.

**Disclaimer**

Final system uses two other systems in its code base, thus not all of the code is written by
the author of this project. Author's code will be clearly indicated. Two projects connected to the 
system are:

* **Frankjnr** - developed by Craig???. Final system is essentially new back end for Frankjnr. So the whole
  Frankjnr project was used and new back end was placing in 'Backend' folder. Parts of Frankjnr code were
  slightly updated to let the user choose between the old back end and the new one. Updated files were:
  Compile.hs and Frank.hs, updates are clearly indicated with comments;
* **Shonky** - developed by Conor McBride. Final compiler uses Shonky's syntax file for its supported
  data structures and parse functions;

More detailed descriptions can be found at 'Related work' section of the report or at their Github pages.

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
|                              |                   |                                                           |
| */Backend/machine/dist*      |                   | Generated files                                           |
|                              | gen.js            | Compiler generated code                                   |
|                              | output.js         | Webpack generated code (every JS file is packed into one) |
|                              |                   |                                                           |
| */Backend/Shonky*            |                   | Shonky project directory                                  |
|                              | Syntax.hs         | Contains needed data structures                           |
|                              |                   |                                                           |
| */Backend/tests*             |                   | Test framework                                            |
|                              | main.sh           | Main file                                                 |
|                              | helper.sh         | expect script helper file                                 |
|                              | testcases.sh      | Contains all of the test cases                            |

Table: Project folder structure


## Abstract machine

## Compiler

## Testing framework


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