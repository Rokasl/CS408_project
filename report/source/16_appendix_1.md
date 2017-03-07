# Appendix 1: Progress log {.unnumbered}

**JANUARY**

January 4th:\
*Research:*\
Looked over Frankjnr, Shonky, Vole implementations.

January 5th:\
Tried to install Frankjnr for a period of time, however couldn’t resolve all the errors.

January 7th:\
*Research:*\
Looked at Vole with a bit more detail.

January 9th:\
Tried to install Frankjnr by using Cabal dependency management tool, no success (deprecated dependencies).\
*Presentation & Report work:*\
Worked on project specification, plan and presentation.

January 10th:\
*Research:*\
Looked at Vole, in particular Machine.lhs, Compile.lhs and Vole.js.

January 11th:\
*Presentation & Report work:*\
Worked on project specification, plan and presentation.

January 16th:\
*Research:*\
Looked at Shonky stack implementation, tried to output it on the screen.

January 17th:\
*Machine Development:*\
Implemented simple linked list stack in JavaScript, just as a practice.

January 18th:\
*Research:*\
Looked again at Shonky’s Abstract Machine, particularly the order the input is parsed.

January 24th:\
*Machine Development:*\
Implemented simple Abstract Machine, which can sum 2 numbers.

January 25th:\
*Machine Development:*\
Machine now works with stack larger than 2.\
Updated the way it stores functions, now it uses Array data structure.\
*Research:*\
Looking into how to implement throw, catch and compiler.

January 26th:\
*Compiler Development:*\
Created basic language in Haskell. Which supports expressions and sum of expressions.\
Developed monadic structure for the compiler.

January 30th:\
*Compiler Development:*\
Finished the basic layout, however it doesn’t display any results yet.\
Presentation & Report Work:\
Setup of latex with lex2tex.


January 31th:\
*Machine Development:*\
Implemented Throw and Catch for Abstract Machine.\
Presentation & Report work:\
Worked on structure of the report. 

**FEBRUARY** 

February 01:\
*Presentation & Report work:*\
Worked on latex configurations.

February 02:\
*Machine Development:*\
Implemented early versions of stack saving, restoring and support for Set command.

February 04:\
*Presentation & Report work:*\
Report work - Introduction sections. 

February 06:\
*Compiler Development:*\
Tried to implement Show instance for CodeGen function.

February 07:\
*Research:*\
Looked at the lifecycle and expected behaviour of the Compiler.\
*Compiler Development:*\
Implemented Compiler Catch and Throw.

February 08:\
*Compiler Development:*\
Implemented Get, Next, WithRef commands.\
*Machine Development:*\
Implemented support for Next commands.\
Added new examples of working programs.

February 09:\
*Machine development:*\
Implemented early version of stack saving and restoring.\
Implemented support for Set commands.\
Added new working examples.\
Reworked Next command support, should work as expected.

February 10:\
*Test Framework development:*\
Implemented test framework by utilizing Bash and Expect scripts.\
*Machine development:*\
Divided code into separate classes and files.\
Added printer class, which just outputs the current stack to the console.

February 13:\
Started to rework Abstract Machine, to closer match the implementation required.\
*Machine development:*\
Reworked Catch and Throw command support.\
*Compiler development:*\
Small efficiency adjustments.\
Test Framework development:\
Added more test cases.\
General bug fixes.

February 14:
*Test Framework development:*\
Fixed major bug with string parsing.\
Added more test cases.\
*Machine development:*\
Completely reworked support for Get, Set and WithRef commands.\
General bug fixes.

February 15:\
Progress report.

February 16:\
Progress report.

February 24:\
*Final Compiler development:*\
Outputting generated code to js file.\
Researched top level functions.\
*Project*\
Updated project structure.

March 05:\
*Report*\
Chapter 4 almost done.\
*Project*\
Improvements all around: bug fixes, documentation updates.

March 07:\
*Report*\
Related work section\
Introduction chapter summarization\
*Final Compiler development:*\
Attempt to implement operators array\
Looking into how to compile operator variables\
