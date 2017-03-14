# Detailed Design and Implementation of the final system

## Introduction

The implementation of final Compiler and Abstract Machine were heavily supervised by Conor McBride.

## Project folder structure

## Possible improvements

use chunks of stacks when top of the chunk is possible needed stack frame and others are not (speedup)

turn local functions into top level operators is called "Lambda-lifting" it was 
invented by Thomas Jonson in 1985 (Springer LNCS 201). it's used in eg. GHC