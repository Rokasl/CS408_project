# Abstract {.unnumbered}

<!-- This is the abstract -->

Frank is a strongly typed, strict functional programming language invented by Sam Lindley and Conor McBride.
It is influenced by Paul Blain Levy’s call-by-push-value calculus, and features a bidirectional effect
type system, effect polymorphism, as well as effect handlers. This means that Frank supports type-checked
side-effects which only occur where permitted. Side-effects are comparable to exceptions which suspend
the evaluation of the expression where they occur and give control to a handler which interprets the
command. However, when a command is complete, depending on the handler, the system could resume from the
point it was suspended. Handlers are very similar to typical functions, but their argument processes
can communicate in more advanced ways. The idea is to utilize this functionality in the web.
Side-effects might be various events such as mouse actions, http requests, etc., and the handler
would be the application in the web page.

The overarching goal of the project is to compile Frank to JavaScript and to run it in the browser.
Users would thus be able to use Frank for web development purposes.
This involves creating a Compiler and a Virtual Machine (abstract machine) which can support a compiled
Frank structure.

\pagenumbering{roman}
\setcounter{page}{1}
