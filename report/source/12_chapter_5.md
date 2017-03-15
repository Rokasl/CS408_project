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