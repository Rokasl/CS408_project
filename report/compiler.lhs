\documentclass[12pt]{report}


%include lhs2TeX.fmt
%include lhs2TeX.sty
%include polycode.fmt
\DeclareMathAlphabet{\mathkw}{OT1}{cmss}{bx}{n}
%subst keyword a = "\mathkw{" a "}"
%subst conid a = "\mathsf{" a "}"
%format where = "\;\mathkw{where}"
%format pattern = "\mathkw{pattern}"
%format :& = "\mathbin{:\!\!\&}"

%format tau = "\tau"

\newcommand{\F}{\mathsf}

\usepackage{textcomp}
\usepackage{listings}
\usepackage{upquote}
\lstset{
    numbers=left,                
    numberstyle=\scriptsize,
    tabsize=4,
    rulecolor=,
    language=java,
        basicstyle=\scriptsize,
        upquote=true,
        aboveskip={1.5\baselineskip},
        columns=fixed,
        showstringspaces=false,
        extendedchars=true,
        breaklines=true,
        prebreak = \raisebox{0ex}[0ex][0ex]{\ensuremath{\hookleftarrow}},
        frame=single,
        showtabs=false,
        showspaces=false,
        showstringspaces=false,
        identifierstyle=\ttfamily,
        keywordstyle=\ttfamily
}



\begin{document}
\title{CS408 Project Report}
\author{Rokas Labeikis}
\maketitle


\section{Introduction}

Frank is strongly typed, strict functional programming language invented by
Sam Lindley and Conor McBride and it is influenced by Paul Blain Levy’s
call-by-push-value calculus. Featuring  a bidirectional effect type system,
effect polymorphism, and effect handlers. This means that Frank supports
type-checked side-effects which only occur where permitted.
Side-effects are comparable to exceptions which suspend the evaluation of the
expression where they occur and give control to a handler which interprets
the command. However, when command is complete depending on the handler the
system could resume from the point it was suspended. Handlers are very similar
to typical functions but their argument processes can communicate in more
advanced ways. So the idea is to utilize this functionality in the web.
Side-effects might be various events such as mouse actions, http requests etc.
and the handler would be the application in the web page.

So, in this project the main goal is to compile Frank to JavaScript and run it
in the browser. So, for example, user would be able to edit their MyPlace pages
using Frank language. This involves creating Virtual Machine (abstract machine)
which can support Frank structure.

\section{The beginning}

By choosing this project, I knew that I was stepping out of my comfort zone.
At the beginning of the project I was aware only of the purpose of the Abstract
Machine, didn’t know much about compilers either, or how can they both work
together and how to implement either of them. My understanding of Haskell was
pretty basic as well. So I knew I have a big challenge ahead of me. Thus, It
made sense to begin with something simpler than implementing the whole system
from the start. And so, I’ve started by developing a simple Abstract Machine
with few very basic procedures, just to get me going. Then I had to create
a simple language with very few functions, such as addition of two values,
Catch and Throw, variable assignment. Furthermore,  I’ve had to implemented
a compiler for that Machine and language, so that they all could work together.

How do they work together? Compiler takes in an expression in my language,
such as, (Val 5) and outputs a populated javascript array, which we can call
a program. Then the Abstract Machine takes that program and parses it, populates
the stack and starts doing work.

Also, this wasn’t for the educational purposes only, I worked on the compiler and
Machine by keeping in mind that I would use parts of the builds in my final
system, so that I won’t start from scratch again. Because of that, I had to
constantly think about efficiency, testing and structure of my systems. In
the next few sections, I’m going to go more in detail about the compiler
and the Abstract Machine which I had to develop at the start.


\section{Simple Compiler}

> instance Monad CodeGen where
>        return val = MkCodeGen $ \ next -> ([], next, val)
>        ag >>= a2bg = MkCodeGen $ \ next ->
>            case codeGen ag next of
>                (ac, next, a) -> case 
>                    codeGen(a2bg a) next of
>                        (bc, next, b) -> (ac ++ bc, next, b)

>   genDef :: String -> CodeGen Int
>   genDef code = MkCodeGen $ \ next -> ([(next, code)],next + 1, next)


>   compile :: Expr -> CodeGen Int
>   compile e = help "s" e where
>       help s (Val n) = genDef $
>         "function(s){return{stack:"++ s ++ ",tag:\"num\", data:"++ show n ++"}}"
>       help s (e1 :+: e2) = do
>           f2 <- compile e2
>           help ("{prev:" ++ s ++ ", tag:\"left\", data:"++ show f2 ++"}") e1   


\section{Simple Abstract Machine}

Basic Stack structure:

\begin{lstlisting}
     Mode: {
        stack: { // rest of stack
            prev: "", // previous stack
            tag: "", // opperation 
            data: "" // pointer to next frame
        }
        tag: "",  // data type, example "num" for number
        data: "" // value
    }
\end{lstlisting}


Example program:

\begin{lstlisting}
    var ProgramFoo = [];

ProgramFoo[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 3
    }
};

\end{lstlisting}

By passing this program to the Abstract Machine 3 will be placed on top of stack
and then program machine will halt, since there are no further instructions.

Furthermore, lets examine how very simple Abstract Machine works.

Here we initialize starting variables, with mode.data being the most important bit,
because it points to the starting instruction of the program that we pass in.
\begin{lstlisting}
    var save = [];
    var mode = {
        stack: null,
        tag: "go",
        data: 0
    }
\end{lstlisting}

\section{Project Evaluation}

Project will be evaluated by other researchers who have a clear view of how the
software should function. They will test the system and give their feedback and
assessment. Evaluators will expect that the existing body of Frank examples should
work in my implementation of the system the same way they do in other
implementations, as well as client-side programming should become easier, example,
writing parsers for data in web forms. Furthermore, project will use continuous
evaluation technique, so it will be evaluated, for example, every two weeks by at
least one researcher, in order to follow Agile software development practices.  

\section{Progress Log}

JANUARY

January 4th: 
Research:
Looked over Frankjr, Shonky, Vole implementations.

January 5th: 
Tried to install Frankjnr for a period of time, however couldn’t resolve all the errors.

January 7th:
Research:
Looked at Vole with a bit more detail.

January 9th:
Tried to install Frankjnr by using Cabal dependency management tool, no success (deprecated dependencies).
Presentation & Report work:
Worked on project specification, plan and presentation.

January 10th: 
Research:
Looked at Vole, in particular Machine.lhs, Compile.lhs and Vole.js.

January 11th:
Presentation & Report work: 
Worked on project specification, plan and presentation.

January 16th:
Research:
Looked at Shonky stack implementation, tried to output it on the screen.

January 17th: 
Machine Development:
Implemented simple linked list stack in JavaScript, just as a practice.

January 18th: 
Research:
Looked again at Shonky’s Abstract Machine, particularly the order the input is parsed.

January 24th: 
Machine Development:
Implemented simple Abstract Machine, which can sum 2 numbers.

January 25th: 
Machine Development:
Machine now works with stack larger than 2.
Updated the way it stores functions, now it uses Array data structure.
Research:
Looking into how to implement throw, catch and compiler.

January 26th: 
Compiler Development:
Created basic language in Haskell. Which supports expressions and sum of expressions. 
Developed monadic structure for the compiler.

January 30th: 
Compiler Development:
Finished the basic layout, however it doesn’t display any results yet.
Presentation & Report Work:
Setup of latex with lex2tex.

January 31th: 
Machine Development:
Implemented Throw and Catch for Abstract Machine. 
Presentation & Report work:
Worked on structure of the report. 

FEBRUARY 

February 01:
Presentation & Report work:
Worked on latex configurations.

February 02:
Machine Development:
Implemented early versions of stack saving, restoring and support for Set command.

February 04:
Presentation & Report work: 
Report work - Introduction sections. 

February 06:
Compiler Development:
Tried to implement Show instance for CodeGen function.

February 07: 
Research:
Looked at the lifecycle and expected behaviour of the Compiler.
Compiler Development:
Implemented Compiler Catch and Throw.

February 08: 
Compiler Development:
Implemented Get, Next, WithRef commands.
Machine Development: 
Implemented support for Next commands.
Added new examples of working programs.

February 09: 
Machine development: 
Implemented early version of stack saving and restoring.
Implemented support for Set commands.
Added new working examples.
Reworked Next command support, should work as expected.

February 10:
Test Framework development:
Implemented test framework by utilizing Bash and Expect scripts.
Machine development:
Divided code into separate classes and files.
Added printer class, which just outputs the current stack to the console.

February 13:
Started to rework Abstract Machine, to closer match the implementation required.
Machine development:
Reworked Catch and Throw command support.
Compiler development:
Small efficiency adjustments.
Test Framework development:
Added more test cases.
General bug fixes.

February 14:
Test Framework development:
Fixed major bug with string parsing.
Added more test cases.
Machine development:
Completely reworked support for Get, Set and WithRef commands.
General bug fixes.

\end{document}