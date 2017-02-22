# Abstract {.unnumbered}

<!-- This is the abstract -->

Frank is strongly typed, strict functional programming language invented by Sam Lindley and Conor McBride
and it is influenced by Paul Blain Levy’s call-by-push-value calculus. Featuring  a bidirectional effect
type system, effect polymorphism, and effect handlers. This means that Frank supports type-checked
side-effects which only occur where permitted. Side-effects are comparable to exceptions which suspend
the evaluation of the expression where they occur and give control to a handler which interprets the
command. However, when command is complete depending on the handler the system could resume from the
point it was suspended. Handlers are very similar to typical functions but their argument processes
can communicate in more advanced ways. So the idea is to utilize this functionality in the web.
Side-effects might be various events such as mouse actions, http requests etc. and the handler
would be the application in the web page.

In this project the main goal is to compile Frank to JavaScript and run it in the browser.
So, for example, user would be able to edit their MyPlace pages using Frank language.
This involves creating a Compiler and Virtual Machine (abstract machine) which can support compiled
Frank structure.

\pagenumbering{roman}
\setcounter{page}{1}
