# Problem Description and Specification

This section discusses the project problem, challenges, requirements and involved risks.

## Problem overview

The main aim of the project was to develop new Compiler and corresponding Abstract Machine for existing
functional language Frank implementation called Frankjnr. The difference from the old ones was that new
Compiler and Abstract Machine would support web development. Many different challenges follow from that.
First one being authors initial lack of knowledge on Frank language. Frank being full and complex 
language author had to study it and overcome any difficulties regarding the language by researching the
paper on Frank "*Do be do be do*" [@FrankPaper].


A second challenge was overcoming the complexity of existing systems. Because this project is not
standalone, it strictly depends on the Shonky Syntax implementation as well as Frankjnr handling Frank's 
code. Author had to take time and carefully research existing systems, to understand how everything fits
together and how efficiently replace exiting Shonky interpreter with new Compiler and Abstract Machine.


Another challenge was the difficult nature of compilers and abstract machines. This was the most difficult
challenge to overcome due to the depth and the amount of detail each of them have. Thus, the incremental
approach was adapted, in order to for the author to learn step by step, starting with simpler things.
Author started the project by developing experimental system with its own language,compiler and virtual
machine to understand the crucial concepts of compiler and abstract machines.  

Fourth challenge was testing and validation. Because the project is focused on developing completely new
system without any usage of frameworks, testing framework had to be developed which could run test cases
and check their correctness without any interaction of the user. Testing framework was developed by
utilizing Bash Script, Expect Script languages and Node, Webpack, Ghci commands. It was firstly,
created for experimental system and then based on observation and testing, altered and improved
for the final system. In the end, it dramatically improved development time by constantly locating bugs and
validating the correctness of the outputs.

The project was extremely broad and involved great initial research as well as constant analysis of next 
steps, thus development was slow but effective. However, due to time constrains development time had to be
planned very carefully, because of this some acknowledged directions of development had to be ignored to
finish the prototype in time. For example, one of those directions was Haskell enforced type checker. 
Haskell compiler could have had a type checker which would prevent any bugs regarding generated
JavaScript programs by enforcing its types. Now such bugs are spotted by the console window of the browser
or testing framework.


## Requirements Analysis

**Functional requirements**

* To create new back end for Frankjnr:
    + Develop Compiler which uses Shonky's language and outputs a working JavaScript structure of code;
    + Develop Abstract Machine which runs the previously compiled JavaScript code in the browser;
* To facilitate client-side communication of events and DOM updates between Frank code and the browser;


**Non-functional requirements**

* To create set of tests which should always pass, before each new release of the system;
* To develop testing framework, which tests the system with minimal human interaction;
* To measure performance (in comparison with the existing backend and with other kinds of generated JS);
* Easier client-side programming (example, complex parser of a text field);

**Risks** 

* Dependence on Frank implementation (Frankjnr). Instances of Frank code will be tested to make sure
  it behaves as expected;
* Estimating and scheduling development time. Due to inexperience with this kind of projects, correctly
  estimating and scheduling time might be difficult, this, also, greatly increases the possibility
  of not finishing the project. However, meetings with supervisor are organized regularly, to make sure
  the project is on track;

## Specification

## Design Methodology
