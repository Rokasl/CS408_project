# Related Work

## Shonky

Shonky is untyped and impure functional programming language. The key feature of Shonky is that it
supports local handling of computational effect, using the regular application syntax.
This means one process can coroutine many other subprocesses. In that sense it is very similar to Frank,
just without type support. Its interpreter is written in Haskell, although it has potential to be ported
to JavaScript or PHP to support web operations.

In the context of the project Shonky language data structures are used by the Abstract Machine, in Chapter
5 it is explained in great detail of how exactly were they used and for what purpose. However,
Shonky interpreter is completely scrapped and is only used as a reference in solving any Abstract
Machine or Compiler difficulties.  

##Frankjnr

Frankjnr is an newest implementation of Frank functional programming language described in
"*Do be do be do*" [@FrankPaper] paper. Frankjnr has a parser for Frank syntax, thus the user is able
to use Frank to write expressions. After parsing Frank code it performs
type check and other necessary operations followed by compilation to Shonky supported data structures 
which are then used by Shonky interpreter to run Frank. 

### Frankjnr limitations

* Only top-level mutually recursive computation bindings are supported;
* Coverage checking is not implemented;


## Vole

Vole is lightweight functional programming language with its own Compiler and two Abstract Machines. 
One Machine is written in Haskell and provides opportunity to run compiled Vole programs on the local 
machine.
Other Virtual Machine is written in JavaScript, because of this it is possible to run Vole programs
on the web, there are few working examples in the Git repository of Vole. It, also, has some support
for effects and handlers, so it utilizes the ability to communicate between compiled Vole programs and
application front-end on run-time.

In the context of this project - Vole is a useful resource, because it essentially tries to
solve the same problem but for a different language. Author had to study Vole, to 
understand its technical implementation, usage of resources and to expand his knowledge of Compilers 
and Abstract Machines. Lastly, Vole is used for evaluation purposes as another benchmark comparison. 

## Conclusion

Three main related projects are Vole, Shonky and Frankjnr. Vole was used as an working example of a solution
for similar problem, which got author thinking of different ways to approach the problem. Shonky and
Frankjnr were used directly, because Frankjnr is the newest implementation of Frank language and it uses
Shonky's interpreter for executing Frank programs. Therefore, the idea was to take existing Frankjnr
and replace the Shonky's interpreter with new compiler and abstract machine which would support web
development while keeping Shonky's syntax data structures.
