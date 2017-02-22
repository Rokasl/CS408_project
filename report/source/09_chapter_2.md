# Related Work
<!-- Literature review ??? -->

## Vole

Vole is lightweight functional programming language with its own Compiler and Abstract Machine.
Compiler compiles the Vole code to JavaScript, which can be used by Vole.js (Abstract Machine) and run
it on the browser. It has some support for effects and handlers.

## Shonky

Shonky is untyped and impure functional programming language. The key feature of Shonky is that it
supports local handling of computational effect, using the regular application syntax.
This means one process can coroutine many other subprocesses. In that sense it is very similar to Frank,
just without type support. Its interpreter is written in Haskell, although it has potential to be ported
to JavaScript or PHP to support web operations.

##Frankjnr

Frankjnr is an implementation of Frank programming language described in "*Do be do be do*" [@FrankPaper].

### Frankjnr limitations

* Only top-level mutually recursive computation bindings are supported;
* Coverage checking is not implemented;

## Ocaml


## Haste 
<!--http://haste-lang.org/ -->
Haste is an implementation of the Haskell functional programming language,
designed for web applications and it is being used in the industry. It supports the full Haskell language,
including GHC extensions because it is based on GHC compiler. Haste support modern web technologies
such as WebSockets, LocalStorage, Canvas, etc. . Haste, also, has support for effects and handlers.
Furthermore, Haste programs can be compiled to a single JavaScript file. 

## Conclusion



