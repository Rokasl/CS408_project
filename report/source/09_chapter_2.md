# Related Work

## [Shonky](https://github.com/pigworker/shonky)

Shonky is untyped and impure functional programming language created by Conor McBride. The key feature
of Shonky is that it supports local handling of computational effect, using the regular application syntax.
This means one process can coroutine many other subprocesses. In that sense it is very similar to Frank,
just without type support. Its interpreter is written in Haskell, although it has potential to be ported
to JavaScript or PHP to support web operations.

In the context of the project Shonky language data structures are used by the Abstract Machine, in Chapter
5 it is explained in great detail of how exactly were they used and for what purpose. However,
Shonky interpreter is completely scrapped and is only used as a reference in solving any Abstract
Machine or Compiler difficulties.  

## [Frankjnr](https://github.com/cmcl/frankjnr)

Frankjnr is an newest implementation of Frank functional programming language described in
"*Do be do be do*" [@FrankPaper] paper. Frankjnr has a parser for Frank syntax, thus the user is able
to use Frank to write expressions. After parsing Frank code it performs
type check and other necessary operations followed by compilation to Shonky supported data structures 
which are then used by Shonky interpreter to run Frank. 


## [Vole](https://github.com/pigworker/Vole)

Vole is lightweight functional programming language implemented by Conor McBride. It has its own
compiler and matching two interpreters.  
One abstract machine is written in Haskell and provides opportunity to run compiled Vole programs on the
local environment.
Other machine is written in JavaScript, therefore it is possible to run Vole programs
on the web, there are few working examples in the git repository of Vole. It, also, has some support
for effects and handlers, so it utilizes the ability to communicate between compiled Vole programs and
application front-end on run-time.

In the context of this project - Vole is a useful resource, because it essentially tries to
solve the same problem but for a different language. Author had to study Vole, to 
understand its technical implementation, usage of resources and to expand his knowledge of compilers 
and abstract machines. Lastly, Vole is used for evaluation purposes as another benchmark comparison. 

### Development Tools and Languages

This section will briefly explain used tools and languages and reasoning behind each of them. 

### [Vagrant](https://www.vagrantup.com/)

Vagrant is an optional tool to create separate development environment for the project. It runs on Virtual
Box and it is essentially a server on your local computer which you can boot up and work on. Furthermore,
Vagrant comes with up to date relevant libraries out of the box. Therefore, author used it to have
clean environment and to avoid installation of software and library management on local machine,
thus speeding up development.


### [Webpack](https://webpack.github.io/)

Webpack is a module builder and it is available as npm package. In this project it is used for abstract
machine development as it adds wanted flexibility to plain JavaScript, and it compiles everything
to a single light JavaScript file. The most important feature of *webpack* is an ability
to create and export different modules, for example, module could be a function or a variable. This allows
for improved project structure as user is able to keep JavaScript components in separate files, thus making
it easer to develop, maintain and navigate through code.

### JavaScript

JavaScript is a client side scripting language. In this project output of the compiler is generated in
JavaScript, which is then used by virtual machine
which is, also, written in JavaScript so that both could cooperate on run time without any further 
compilations. 

JavaScript is used because of its key features. Firstly, it has support for functional programming by
letting function arguments be other functions. Secondly, it is supported by all popular browsers.
And finally, JavaScript has lots of libraries and features which support web development.

### [Haskell](https://wiki.haskell.org)

Haskell is a statically, implicitly typed, lazy, standardized functional programming language with
non-strict semantics.
Haskell features include support for recursive functions, data types, pattern matching,
and list comprehensions. 

Haskell was chosen for compiler development because of its functional language features, like 
pattern-matching, efficient recursion, support for monadic structures. Moreover, "Frankjnr" and "Shonky"
are written in Haskell as well, thus, using Haskell would provide easier compatibility with those
projects.  

### [Report Markdown](https://github.com/tompollard/phd_thesis_markdown) 

This report adapted the template of markdown developed by Tom Pollard, because of its flexible structure
and features, such as support for Pandoc markdown and latex expressions. Report is divided into separate
source files, which creates strong project structure and every source file is compiled to a single pdf
file with compiler powered by *npm*. 

### Bash script

Bash script is a series of command line instructions placed into a single file. It is generally used for 
automation and its being used to build automated test cases in the context of this project.


## Conclusion

Three main related projects are Vole, Shonky and Frankjnr. Vole was used as an working example of a solution
for similar problem, which got author thinking of different ways to approach the problem. Shonky and
Frankjnr were used directly, because Frankjnr is the newest implementation of Frank language and it uses
Shonky's interpreter for executing Frank programs. Therefore, the idea was to take existing Frankjnr
and replace the Shonky's interpreter with new compiler and abstract machine which would support web
development while keeping Shonky's syntax data structures.
