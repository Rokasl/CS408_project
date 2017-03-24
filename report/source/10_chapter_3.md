# Problem Description and Specification

This section discusses the project’s problem, challenges, requirements and risks involved.

## Problem overview

The main aim of the project was to develop a new compiler and a corresponding
abstract machine for the new implementation of the functional language Frank,
called Frankjnr. The differential characteristic for the new compiler and abstract
machine is the fact that they would support web development. This gives rise to
multiple challenges, the initial one being the author’s initial lack of knowledge
of Frank. As it is a complex language, the author had to invest effort in order
to comprehend it, enquiring the paper on Frank, “Do be do be do” [@FrankPaper].


Another challenge was overcoming the complexity of the existing systems. Due to the fact that this
project is not a standalone, it depends largely on Shonky’s syntax implementation as well
as Frankjnr’s handling of Frank code. The author had to take time to scrupulously research
the existing systems to discern all the intricacies and interconnections, and to devise means
to efficiently replace the existing Shonky interpreter with a new compiler and abstract machine.


One of the challenges was the complex nature of compilers and abstract machines.
This was the most difficult challenge to overcome due to the breadth of conceptual
detail both of them contain. An incremental approach was therefore adapted, in order
for the author to learn gradually, starting from less sophisticated concepts. The author
thus started the project by developing an experimental system with its own language,
compiler and virtual machine in order to understand the crucial concepts of a compiler and
abstract machines. During the early course of development, the author regularly consulted
his supervisor Conor McBride regarding various issues relating to compilers and abstract machines.


Testing and validation also proved to be a challenge. As the project is focused
on developing a completely new system without any usage of frameworks, a testing
framework had to be developed; one which could run test cases and validate them without
any interaction on the part of the user. The testing framework was developed by utilizing
Bash script, Expect script languages, along with Node, webpack, and ghci commands. It was
at first created for an experimental system and then progressively altered and improved
for the final system, based on continuous observation and testing. In the end, it dramatically
contributed in decreasing development time by locating bugs, especially through targeted test cases. 

The project was extremely broad and involved a great deal of initial research as
well as in-depth planning; development time was therefore slow, but productive.
However, due to time constraints, some of the intended directions of development
had to be disregarded, in order to to finish the prototype in time. One of these
was the Haskell-enforced type checker. The Haskell compiler could have a type
checker which would prevent any bugs related to generated JavaScript programs
by enforcing its types. Such bugs are currently spotted by the console window
of the browser or the testing framework. A Haskell-enforced type checker could
potentially be one of key future developments.

### Project risks 

* The dependence on Frank implementation (Frankjnr);
* Estimating and scheduling development time. Due to author’s limited previous exposure to the subject,
  it proved difficult to anticipate the time and the resources required; however, regular meetings
  with the supervisor ensured that the project was kept on track. 
* The lack of available resources;
* The author’s initial lack of experience with languages used, and the analyzed
  concepts (compilers and virtual machines).


## Requirements Analysis

Before development, requirements needed to be gathered. These were set out during a consultation
with the supervisor regarding how the system should behave and what technologies it should utilize.
In addition, the author attended a programming languages seminar where Frank language was discussed,
thus gaining a practical
perspective on the entire project. The author also read papers on relevant
topics, such as “Compiling Exceptions Correctly” [@CompilingCorrectly] in order to broaden his subject
knowledge, which assisted in mapping out the
direction of the project. Further research was done to ensure the appropriateness of chosen
languages and technologies.


## Specification

### Functional requirements

* To create a new back end for Frankjnr implementation:
    + Develop a compiler which uses Shonky’s language (Syntax file) and
      outputs a sensible and correct JavaScript code structure;
    + Develop an abstract machine which can run previously compiled
      JavaScript code in the browser;
* To facilitate client-side communication of events and DOM updates
  between Frank code and the browser.

### Non-functional requirements

* To create a set of tests which should pass before each new release
  of the system. Test cases should be increased after every iteration to
  validate new features and to ensure that previous features are not broken;
* To develop a testing framework, which would test the system using the list of
  predetermined test cases;
* To measure performance (in comparison with the existing back end
  and with other kinds of generated JavaScript);
* Client-side programming should become possible (ex. complex
  parser of a text field).

### Use Cases

Since the developed compiler and abstract machine support Frank language, which can potentially
be used in an infinite number of ways, use cases are not relevant to this project. Generally,
the user writes Frank programs; then compiles them in order to generate a JavaScript file. The
user needs to include the re-compiled machine, which utilizes previously compiled code, into
their project. For more detailed information on how to use the system, check the usage
instructions in **Appendix 2**.

## Design Methodology

The implementation of the project is fully focused on back-end development.
The adopted design methodology was iterative and incremental development
(IID). The main reasons behind choosing it included the difficult nature of the project and the
author’s initial lack of knowledge on the subject. This particular methodology allows
the developer to focus on a few features at a time, building the system incrementally,
allowing for progressive learning. 

Iterative and incremental development (IID) is a process which grows the system
incrementally, one feature after another, during self-contained cycles of analysis,
design, implementation and testing which end when the system is finished.
This means that the system is improved (with more functionality added) through every
Iteration.

The core benefits of this methodology include:

* Regression testing is conducted after each iteration, with only a few
  changes made through a single repetition; because of this, faulty elements
  of the software are easily identified and fixed before starting the
  subsequent iteration;
* The testing of a system’s features is easier, because this methodology allows
  for targeted testing of each element within the system;
* The system could easily shift directions of development after each iteration;
* The learning curve is much flatter than usual, because the developer focuses
  on a selected few features at any given time.

One of the other principal decisions was to start with a different system, an experiment
throughout which the author could learn the fundamental concepts related to compilers and
virtual machines and later on adapt the knowledge gained during the development of the final system.
The experiment was conducted over approximately four weeks and used the same methodology - iterative
and incremental development.

