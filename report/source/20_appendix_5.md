# Appendix 5: Initial project specification and plan {.unnumbered}

During the development of the project initial specification and plan was completely reworked.
Thus, following information is deprecated or out of date.

## Functional requirements {.unnumbered}

To create new back end for Frankjnr:

* To create Abstract Machine which supports newest Frankjnr implementation, representing the state of Frank execution process;
Compiler which works with implemented Abstract Machine and compiles Frank code to working JavaScript which can run in the browser;

* To facilitate client-side communication of events and DOM updates between Frank code and the browser;

## Non-functional requirements {.unnumbered}

* To create tests which should always pass, in order to test new releases of the system;

* To measure performance (in comparison with the existing back-end and with other kinds of generated JS);

* Easier client-side programming (example, complex parser of a text field); 

## Technologies {.unnumbered}

Haskell - main functional programming language to be used;

JavaScript - main client-side language to be used;

Frank - built on Haskell, targeted language by the compiler; 
https://github.com/cmcl/frankjnr

Stack - Dependency manager and build tool for Frank;
https://github.com/commercialhaskell/stack

Vole - Compiles functional language to JavaScript
https://github.com/pigworker/Vole

Shonky - Current Frankjnr compiler 
https://github.com/pigworker/shonky

GHC - Haskell compiler
https://github.com/ghc/ghc


## Software development process {.unnumbered}

* Gathering requirements and working on project specification (week 1);
* Learning, researching Frank and any other related technologies (week 2);
* Understanding the implementation to reach the end goal (week 2-4);
* Updating project specification, plan if necessary (week 4);
* Working on project architecture, to be able to meet all the requirements (week 5);
* Working on the implementation (week 5 - 11);
* Testing (week 11);
* Project evaluation (week 12);
* Final report and presentation (week 12);
* Maintenance, if necessary (week 12+); 

During every stage of the software development process I will update my progress log, which then I’ll include in the final report. Also, I’ll try to implement some tests during the software implementation stage. And, finally, all code will be stored in a github repository, where it will be well documented and publicly available.

## Project evaluation {.unnumbered}

Project will be evaluated by other researchers who have a clear view of how the software should function. They will test the system and give their feedback and assessment. Evaluators will expect that the existing body of Frank examples should work in my implementation of the system the same way they do in other implementations, as well as client-side programming should become easier, example, writing parsers for data in web forms. Furthermore, project will use continuous evaluation technique, so it will be evaluated, for example, every two weeks by at least one researcher, in order to follow Agile software development practices.  


## Risks {.unnumbered}

* Dependence on Frank implementation (Frankjnr);
* Estimating and scheduling development time. As I have never worked on any similar project before, correctly estimating and scheduling time might be difficult;
* Planning before fully understanding the implementation process. For example, there might be conflict requirements or just in general incomplete specification as I don’t yet have full understanding of technologies I’m going to use. 
