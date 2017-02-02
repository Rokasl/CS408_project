\documentclass{report}


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

\section{Simple Compiler}



\section{Simple Abstract Machine}

Basic Abstract Machine structure:

\begin{lstlisting}
     Mode: {
        stack: {
            prev: "", // pointer to previous stack
            tag: "", // opperation 
            data: "" // pointer to next mode to parse
        }
        tag: "",  // data type, example "num" for number
        data: "" // actual value to place on stack
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

This program will place 3 on top of the stack and halt.

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

JANURAY

January 4th: Looked at Frankjr, Shonky, Vole implementations.

January 5th: Tried to install Frankjr for about 4 hours with no success, constant
errors and crashes.

January 7th: Looked at Vole with a bit more detail.

January 9th: Worked on project specification, plan and presentation. Also, tried
bunch of new ways to install frank (cabal way) with no success.

January 10th: Looked at Vole, in particular Machine.lhs and Compile.lhs, Vole.js.

January 11th: Worked on project specification, plan and presentation.

January 16th: Looked at Shonky stack implementation, tried to output it
on the screen.

January 17th: Implemented simple linked list stack in JS, just as a pratice.

January 18th: Looked again at Shonky Abstract Machine. Understood the order how
input program is parsed.

January 24th: Implemented simple Abstract Machine, which can sum 2 numbers.

January 25th: Machine now works fine with stack larger than 2. It uses array to
store functions now. Looking into how to implement throw, catch and compiler.

January 26th: Started to work on simple compiler written in Haskell.

January 30th: Simple compiler code compiles now. However, I still can't run it
because I need to implement Show. My Haskell knowledge proves to be an issue.
Also, laid the groundwork for latex with lex2tex, so I can start working on final
report.

January 31th: Implemented Throw and Cache for Abstract Machine. Worked on final
report. 


FEBRUARY 

\end{document}