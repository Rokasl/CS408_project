# Introduction

This chapter focuses on explaining the project motivation, objectives and outcome. Also, in the last section,
the report structure is displayed.


## Background

Functional languages are evolving and constantly changing in order to adapt to innovations and the ever-changing 
needs of software engineering. Stemming from this, the concept of Frank language was created by Prof. Conor McBride and 
Prof. Sam Lindley, followed by its implementation named “Frank” and the more recent release - “Frankjnr”.

“Frank”is a strongly typed, strict functional programming language 
designed around Plotkin and Pretnar’s effect handler abstraction, strongly influenced by [@Plotkin5],
[@Plotkin6], [@Plotkin7], [@Plotkin], [@Plotkin2], [@Plotkin3], [@Plotkin4] papers on algebraic effects
and handlers for algebraic effects. It is also influenced by Paul Blain Levy’s call-by-push-value
calculus. Frank features a bidirectional effect
type system, effect polymorphism, and effect handlers; Frank thus supports type-checked
side-effects which only occur where permitted. Side-effects are comparable to exceptions which suspend
the evaluation of the expression where they occur and give control to a handler which interprets the
command. However, when a command is complete, depending on the handler, the system could resume from the
point it was suspended. Handlers are very similar to typical functions, but their argument processes
can communicate in more advanced ways. 

Because of the distinct features of Frank, in particular its capability to support effects and handlers,
it has potential to be used in the context of web development. However, neither of Frank’s implementations currently
support this. Therefore, the main intention of this project is to enable the usage of Frank for web development. Using 
a functional language for web development could greatly ease the process of writing parsers and form
validations on the web. Essentially, Frank code would be converted into JavaScript because of 
its support for functional programming. Frank would potentially gain all of the JavaScript
functionality and could even use JavaScript third-party libraries. For example, Frank would be able to handle 
different http requests, such as GET or POST; it could fire events (ex. alert boxes), and handle events
(ex. mouse clicks).

The most effective way to achieve this is to utilize the existing Frankjnr implementation, rewriting its 
Compiler and Abstract Machine (back end). The Compiler would take in parsed Frank code and output JavaScript which could
be used by Abstract Machine at Run-time. 

This projects requires comprehension regarding the ways Compilers and Abstract Machines work and knowledge on how to use them together.
The author chose this project knowing that it would be challenging, but also recognizing the valuable
learning experience.

## Objectives
* Utilize Frankjnr implementation;
* Utilize Shonky data structures;
* Develop a compiler which compiles Shonky's data structures to JavaScript data types;
* Develop an abstract machine implementation which supports the output of the compiler;
* The completed system must facilitate client-side communication of events and DOM updates between Frank code
  and the browser.

## Project Outcome

During the initial development stages, an experimental system was developed with its own language,
compiler, virtual machine and
testing framework in order to expand the author’s insight of the subject.
Lessons learned, along with the code style and a few functions of experimental system, were adapted in
creation of the final system.
Having done this, the author was successful in implementing a new abstract machine and compiler for Frankjnr,
which were in turn integrated into the Frankjnr project.
However, the newly developed components are very much in the prototype stage as some of Frank's features
are still not implemented and there are no new web functions added to the machine, which could potentially
handle HTTP requests and similar web operations.
Moreover, the project can still improve on a variety of concerns, such as performance and
building procedures as they were not initial goals of the project.
   

## Summary of chapters

**Chapter 2 - Related Work**

The aim of this chapter is to highlight work done by others that in some fashion ties in with this project.
This includes work which the author directly uses as a bouncing-off point, work that shows other attempts to
solve similar problems, as well as connected projects which have been partially used in the final implementation
of the project.

**Chapter 3 - Problem Description and Specification**

This chapter briefly overviews the main problems and challenges of the project. It briefly explains
the requirement analysis stage; the development tools and languages chosen. It also expands upon
functional and non-functional requirements, followed by a detailed specification and explanation
of the design methodology.

**Chapter 4 - Initial development & experimental system**

This chapter is focused on an initial experimental system. It highlights the reasoning behind it, the
purpose of each component, their implementation, drawbacks and any potential improvements. 

**Chapter 5 - Detailed Design and Implementation of the final system**

The chapter reflects upon the implementation and design of the final compiler and the abstract machine. It also
explains the project structure, the developed testing framework, project connections between Shonky and Frankjnr,
as well as possible improvements and alternative approaches to be considered. 

**Chapter 6 - Verification and Validation**

This chapter explains how the outcome of the project was validated and what testing procedures were
followed during and after the project. 


**Chapter 7 - Results and Evaluation**

The principal intention of the chapter is to summarize the outcome of the project, describing how it was 
evaluated and to propose relevant future work. 

