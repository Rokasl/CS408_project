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

**March**

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
Looking into how to compile operator variables

March 08:\
*Report*\
Background section\
*Final Compiler development:*\
Various fixes\
operatorCompile function adjustment\
File Writer adjustment


March 09:\
*Report*\
Related work section\
*Final Compiler development:*\
Adjusted file generation\
Fixed operatorCompile function\
*Final Abstract Machine development:*\
Initialized project structure with webpack\
Initial implementation of final Machine (support for CAR and CDR operations)


March 10:\
*Final Compiler development:*\
Adjusted type definitions\
Added one layer of structure to Computations\
*Final Abstract Machine development:*\
Fixed bugs regarding CAR and CDR\
Optimization- "go" tag is not needed, creating modes directly\
CDR now returns pair


March 11:\
*Final Compiler development:*\
Added needed functionality to compiler to support 'application' operations\
*Final Abstract Machine development:*\
Added functionality for FUN and ARG, still need to figure out how to apply a function to ready list


March 12:\
*Final Compiler development:*\
Added parser functions, now the compiler is able to covert Shonky language to its syntax\
*Final Testing Framework development:*\
Created initial structure of the framework as well as sample test case\
*Report*\
Problem overview section

March 13:\
*Final Compiler development:*\
Commands development\
*Final Abstract Machine development:*\
Commands development\
*Report*\
Specification section

March 14:\
*Final Compiler development:*\
Bug fixes\
*Final Abstract Machine development:*\
Bug fixes, command support implemented\
*Report*\
Requirement analysis section\
*Project structure*\
Frankjnr now uses new back end

March 15:\


March 16:\


March 17:\
Test framework development\
Compiler and Machine - added Built in function support\
Machine Print function development

March 18:\
Report work - Final implementation section and appendixes

March 19:\
Report:\
Abstract machine sections\

March 20:\
Report:\
Testing and validation sections\

March 21:\
Benchmarking and evaluation sections\

March 22:\
Evaluation and conclusion\

