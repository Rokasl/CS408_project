# Related Work

## [Shonky](https://github.com/pigworker/shonky)

Shonky is an untyped and impure functional programming language created by Conor McBride.
The key feature of Shonky is that it supports the local handling of the computational effect,
using a regular application syntax. This means that a single process can coroutine multiple other
sub-processes; apart from the fact that it does not have type support, it is very similar to Frank.
Its interpreter is written in Haskell, although it has potential to be ported to JavaScript or PHP to
support web operations.

In the project, Shonky language data structures are used by the abstract machine;
**Chapter 5** covers in detail both how and why they are used. However, Shonky interpreter is completely 
scrapped and is only used as a reference in solving any Abstract Machine or Compiler difficulties.
 

## [Frankjnr](https://github.com/cmcl/frankjnr)

Frankjnr is the newest implementation of Frank functional programming language described
in “*Do be do be do*” [@FrankPaper] paper. Frankjnr
has a parser for Frank syntax, thus allowing the user to utilize Frank in writing expressions.
After parsing Frank code it performs a type check and other necessary operations followed by a
compilation to Shonky-supported data structures, which are then used by Shonky interpreter to
run Frank. 

## [Vole](https://github.com/pigworker/Vole)

Vole is a lightweight functional programming language implemented by Conor McBride.
It has its own compiler and two matching interpreters. One of the abstract machines is written
in Haskell and provides the opportunity to run compiled Vole programs on the local environment.
The other machine is written in JavaScript, thus making it possible to run Vole programs on the web.
There are a few working examples in the git repository of Vole. It also has some support for effects
and handlers, so it utilizes the ability to communicate between compiled Vole programs and
the front-end of applications, on run-time. 

In terms of its relevance to this project, Vole is a useful resource because it essentially tries
to solve the same problem, only for a different language. The author had to study Vole in order
to understand its technical implementation, along with its usage of resources, while also enhancing
his knowledge of compilers and abstract machines. Lastly, Vole is used for evaluation purposes
as another benchmark comparison. 

### Development Tools and Languages

This section will briefly explain tools and languages used, and the reasoning behind each of them. 

### [Vagrant](https://www.vagrantup.com/)

Vagrant is an optional tool which was used to create a separate development environment
for the project. It runs on Virtual Box and is essentially a server on one’s local computer
for booting up and working. Vagrant comes with up-to-date, relevant libraries out of the box.
The author used it to maintain a clean environment and to avoid the installation of software and
library management on the local machine, thus speeding up development.


### [Webpack](https://webpack.github.io/)

Webpack is a module builder and is available as an npm package. In this project, it is used
for abstract machine development, as it adds desired flexibility to plain JavaScript, and
compiles everything into a single light JavaScript file. The most important feature of webpack
is its ability to create and export different modules; for example, a module could be either
a function or a variable. This feature allows for an improved project structure as the user
is able to keep JavaScript components in separate files, which makes it easier to develop,
maintain and navigate through code. 

### JavaScript

JavaScript is a client side scripting language. In this project, the output of the compiler
is generated in JavaScript, which is then used by the virtual machine, also written in JavaScript,
so that both can cooperate on run time without any further compilations.

JavaScript is used because of its key features. Firstly, it has support for functional programming
by letting function arguments be other functions. Secondly, it is supported by all popular browsers.
JavaScript also has lots of libraries and features which support web development. 

### [Haskell](https://wiki.haskell.org)

Haskell is a static, implicitly-typed, and standardized functional programming language with non-strict
semantics. Haskell’s features include support for recursive functions, data types, pattern matching,
and list comprehensions. Haskell was chosen for compiler development because of its functional language
features, such as pattern-matching, efficient recursion, and support for monadic structures.
“Frankjnr” and “Shonky” are written in Haskell as well; so using Haskell provides an easier
compatibility with those projects.  

### [Report Markdown](https://github.com/tompollard/phd_thesis_markdown) 

This report adapted the template of a markdown developed by Tom Pollard, because of its flexible
structure and features, such as its support for Pandoc markdown and latex expressions. The report
is divided into separate source files, which produces a cohesive project structure, and every
source file is compiled into a single pdf file using a compiler powered by *npm*. 

### Bash script

Bash script is a series of command line instructions placed into a single file. It
is generally used for automation and, in this project, it is used to build automated test cases.


## Conclusion

The main three related projects are Vole, Shonky and Frankjnr. Vole is employed as a working
example of a solution to address a similar problem, which encouraged the author to experiment
with different approaches. Shonky and Frankjnr are used directly, because Frankjnr is the newest
implementation of Frank language and it uses Shonky’s interpreter for executing Frank programs.
The intention was to take the existing Frankjnr and replace Shonky’s interpreter with a new
compiler and abstract machine, which would support web development while keeping Shonky’s
syntax data structures. 
