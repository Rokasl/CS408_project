# Introduction

This chapter focuses on explaining the project motivation, objectives and outcome. Also, in the last section
report structure is displayed.

## Background

<!--In current modern times web development is one of the most important and successful spheres of engineering,
because the accessibility to the Internet is periodically increasing and its undeniable benefits to both the
consumer and the supplier. -->

Functional languages are evolving, they are constantly changing to innovate and adapt to ever changing 
needs of software engineering. Thus, concept of Frank language was created by Prof. Conor McBride and 
Prof. Sam Lindley followed by its implementation called Frank and more recently newer release - Frankjnr.

Frank is strongly typed, strict functional programming language 
designed around Plotkin and Pretnar’s effect handler abstraction, strongly influenced by [@Plotkin5],
[@Plotkin6], [@Plotkin7], [@Plotkin], [@Plotkin2], [@Plotkin3], [@Plotkin4] papers on algebraic effects
and handlers for algebraic effects. It is, also, influenced by Paul Blain Levy’s call-by-push-value
calculus. Frank features a bidirectional effect
type system, effect polymorphism, and effect handlers. This means that Frank supports type-checked
side-effects which only occur where permitted. Side-effects are comparable to exceptions which suspend
the evaluation of the expression where they occur and give control to a handler which interprets the
command. However, when command is complete depending on the handler the system could resume from the
point it was suspended. Handlers are very similar to typical functions but their argument processes
can communicate in more advanced ways. 

Because of the district features of Frank, in particular its capability to support effects and handlers,
it has potential to be used in web development context. However, neither of Frank implementations currently
support this. Thus this projects motivation is to be able to use Frank for web development. Using 
functional language for web development could greatly ease the process of writing parsers and form
validations in the web. Furthermore, Frank code would be essentially converted into JavaScript because of 
its support for functional programming. This means Frank would potentially gain all the JavaScript
functionality and could even use JavaScript libraries. For example, Frank would be able to handle 
different http requests, such as GET or POST, Frank could fire events (ex. alert boxes) or handle events
(ex. mouse clicks).

The most convenient way to achieve this is to utilize existing Frankjnr implementation, rewriting its 
Compiler and Abstract Machine. Compiler would take in parsed Frank code and output JavaScript which could
be used by Abstract Machine at Run-time. 

This projects requires knowledge how Compilers and Abstract Machines work and how to use them together
them. Author chose this project while knowing that it would be extremely challenging but most effective
learning experience.

## Objectives
* Utilize Frankjnr implementation of Frank and Shonky language;
* Utilize Shonky syntax and data structures;
* Develop Code Compiler which compiles Shonky's code to JavaScript program;
* Develop Abstract Machine implementation which supports the output of the Compiler;
* Completed system must facilitate client-side communication of events and DOM updates between Frank code
  and the browser;


## Project Outcome

During initial development stages experimental system was developed with its own language,
compiler, virtual machine and
testing framework in order to expand authors insight of the subject.
Lessons learned and code style with few functions of experimental system were adapted in
creation of the final system.
Because of it, Author was successful in implementing new Abstract Machine and Compiler for Frankjnr.
They were, also, successfully integrated into Frankjnr project.
However, newly developed components are very much in prototype stage as they don't yet have full support
of all Frank's features. Moreover, the project can still improve on variaty of things, such as performance,
building procedures and testing.
   

## Summary of chapters

**Chapter 2 - Related Work**

The point of the chapter is to highlight work done by others that somehow ties in with this project.
It may be work that author is basing his work of, work that shows others attempts to solve similar problems
or connected projects which were partially used in the final implementation of the project.

**Chapter 3 - Problem Description and Specification**

This chapter briefly overviews the main problems and challenges of the project. It briefly explains
requirement analysis stage and development tools, languages chosen. It, also, expands upon
functional and non-functional requirements, followed by detailed specification and explanation
of design methodology.

**Chapter 4 - Initial development & experimental system**

This chapter is focused on initial experimental system. It highlights the reasoning behind it,
purpose of each component, their implementation, drawbacks and any possible improvements. 

**Chapter 5 - Detailed Design and Implementation of the final system**

Chapter reflects upon implementation and design of the final compiler and abstract machine. It, also,
explains project structure, developed testing framework, project connections between Shonky and Frankjnr
as well as possible improvements and considered alternative approaches. 

**Chapter 6 - Verification and Validation**

This chapter explains how the outcome of the project was validated and what testing procedures were
followed during and after the project. 


**Chapter 7 - Results and Evaluation**

Main idea of the chapter is to highlight summarized outcome of the project, how it was 
evaluated and explain relevant future work. 

