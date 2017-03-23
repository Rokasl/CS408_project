# Problem Description and Specification

This section discusses the project problem, challenges, requirements and involved risks.

## Problem overview

The main aim of the project was to develop new compiler and corresponding abstract machine for existing
functional language Frank implementation called Frankjnr. The difference from the old ones was that new
compiler and abstract machine would support web development. Many different challenges follow from that.
First one being authors initial lack of knowledge on Frank language, since it is full and complex 
language author had to invest time into studying it and overcoming any difficulties by researching the
paper on Frank "*Do be do be do*" [@FrankPaper].


A second challenge was overcoming the complexity of existing systems. Because this project is not
standalone, it strictly depends on the Shonky syntax implementation as well as Frankjnr handling Frank's 
code. Author had to take time and carefully research existing systems, to understand how everything fits
together and how efficiently replace exiting Shonky interpreter with new compiler and abstract machine.


Another challenge was the difficult nature of compilers and abstract machines. This was the most difficult
challenge to overcome due to the depth and the amount of detail each of them contain. Thus, the incremental
approach was adapted, in order for the author to learn step by step, starting from less sophisticated concepts.
Therefore, author started the project by developing experimental system with its own language, compiler and
virtual machine to understand the crucial concepts of compiler and abstract machines. Moreover, author 
discussed any difficulties regarding the compilers and abstract machines with his supervisor, Conor McBride,
on regular basis.  

Fourth challenge was testing and validation. Because the project is focused on developing completely new
system without any usage of frameworks, testing framework had to be developed which could run test cases
and validate their correctness without any interaction of the user. Testing framework was developed by
utilizing Bash script, Expect script languages and Node, webpack, ghci commands. It was firstly,
created for experimental system and then based on observation and testing, altered and improved
for the final system. In the end, it dramatically improved development time by constantly locating bugs,
since the utilization of targeted test cases.

The project was extremely broad and involved great deal of initial research as well as constant analysis
of next 
steps, thus development was slow but effective. However, due to time constrains development time had to be
planned very carefully, because of this some acknowledged directions of development had to be ignored to
finish the prototype in time. For example, one of those directions was Haskell enforced type checker. 
Haskell compiler could have had a type checker which would prevent any bugs regarding generated
JavaScript programs by enforcing its types. Now such bugs are spotted by the console window of the browser
or testing framework. Thus, this would be one of key future developments.

### Project risks 

* Dependence on Frank implementation (Frankjnr);
* Estimating and scheduling development time. Due to authors inexperience with the subject of the project,
  correctly
  estimating and scheduling time is difficult. However, meetings with supervisor are organized
  regularly, to make sure the project is on track;
* Lack of available resources;
* Authors initial lack of experience with languages being used and analyzed concepts 
  (compiler and virtual machines).


## Requirements Analysis

Before any development could begin requirements needed to be gathered, author did this by discussing 
how the system should behave and what technologies it should utilize with the supervisor. He, also,
attended programming languages seminar where Frank language was discussed, gaining different perspective
on the whole project. Lastly, author read papers on relevant topics, such as "Compiling Exceptions
Correctly" [@CompilingCorrectly], to expand his knowledge and gain more insight in what to do.
Further research was made to ensure the appropriateness of chosen languages and technologies. 


## Specification

### Functional requirements

* To create new back end for Frankjnr implementation:
    + Develop Compiler which uses Shonky's language (Syntax file) and outputs a sensible and correct
      JavaScript code structure;
    + Develop Abstract Machine which can run previously compiled JavaScript code in the browser;
* To facilitate client-side communication of events and DOM updates between Frank code and the browser.


### Non-functional requirements

* To create set of tests which should always pass, before each new release of the system. Test cases 
  should be increased after every iteration to validate new features and ensure the previous features are
  not broken;
* To develop testing framework, which tests the system using the list of predetermine test cases;
* To measure performance (in comparison with the existing back end and with other kinds of generated 
  JavaScript);
* Client-side programming should become possible (example, complex parser of a text field).

### Use Cases

Use cases are not relevant to this project, since the developed compiler and abstract machine 
support Frank language, which potentially can be used in infinite number of ways. But generally, 
the user puts sensible Frank code into a Frank file then initiate compilation by using project's compiler,
the compiler will generate a JavaScript file. Furthermore,
user needs to include the recompiled machine, which utilizes previously compiled code, into
their project.
For more detailed information on how to use the system, check usage instruction in **Appendix 2**. 

## Design Methodology

The implementation of the project is fully focused on back-end development. The adopted design methodology
was iterative and incremental development (IID). The main reasons behind it were the difficult nature of
the project and author's initial lack of knowledge on the subject; this methodology allows the
developer to focus on few features at a time building the system incrementally, making it possible
to learn as you go.  

Iterative and incremental development (IID) is a process which grows the system incrementally, feature by
feature during self-contained cycles of analysis, design, implementation and testing which end when
the system is finished. Meaning, the system is improved (more functionality added) through every
iteration.

The core benefits of this methodology are:

* Regression testing is conducted after each iteration, where only few changes are made through single
iteration, because of this faulty elements of the software are easily identified and fixed before starting
the next iteration;
* Testing of systems features is easier, because this methodology allows for targeted testing 
of each element within the system;
* System could easily shift directions of development after each iteration;
* Learning curve is much flatter than usual, because developer is focusing on few features at a given time.

Another big decision was to start with a different system, an experiment throughout which the author could
learn the basics and adapt gained knowledge in the development of the final system. The experiment took
around four weeks and used the same methodology - iterative and incremental development.
