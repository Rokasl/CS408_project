# Results and Evaluation

## Outcome 

### Experimental system

During the initial development stages, an experimental system was developed with its own language,
compiler, virtual machine and testing framework in order to expand the author’s insight of the subject.
The experimental system is able to compile and run a specific list of operations on the browser,
particularly the sum of two expressions, "Throw" and "Catch", "Set", "Next", "Get" and can also
create a new reference. These operations were chosen because they each have a significantly different
implementation, thus offering a broader learning experience for the author. The abstract machine
is written in JavaScript; it is therefore able to communicate with compiled expressions on run-time.
The defining quality of the abstract machine is that it utilizes stack as its core data structure,
with support for interrupts. They have connected handlers which, when initiated, start going through
the stack, in order to execute a particular operation; when finished, the handlers restore the
stack to its original position and give back control.

Here is an example of an expression with many of the available operations in action. Initially,
variable "x" is created with value of "22"; then it is assigned a new meaning which constitutes
of the sum between the previous "x" value and the added value "11". Moving on, "Next" (":>")
operation is used to initiate the last expression, where the new value of "x" is added with a
value "30". The virtual machine will return "63" in the browser for this expression.

```haskell 
WithRef "x" (Val 22) (
    "x" := (Get "x" :+: Val 11)
        :> (Get "x" :+: Val 30))
```

Lastly, the computation is interrupted on ":=" and "Get" commands and control is given to the handler,
in order to search through the stack and retrieve or update the reference of "x".


### Final system

The style of the code and a few functions of the experimental system were adapted in creating the
final system. The author was successful in implementing a new abstract machine and compiler for
"Shonky" data structures, which were in turn integrated into the Frankjnr project. The final
system supports variables, integer values, atoms, pairs, function application, local functions,
commands, thunk patterns, top level functions, and also contains built-in semantics for addition
and subtraction. All of these features together offer a nearly complete development package,
allowing virtually any current Frank program to be compiled by the new compiler and successfully
executed by the abstract machine in a browser. 

\begin{figure}[!htb]
  \includegraphics[width=\textwidth, center]{source/images/fullcycle.png}
  \caption{A complete life cycle}
  \label{fig:compile}
\end{figure}

Here is a quick example of how the compiler and abstract machine would work together and how user
may use it. The user is able to execute Frank programs in four steps. The first step is to write
a program in Frank with file ending in ".fk", such as:

```haskell
main : []Int
main! = fib 5

fib : Int -> Int
fib 0 = 0
fib 1 = 1
fib 2 = 1
fib n = fib (n-1) + fib (n-2)
```

The second step is to compile it with a flag "output-js" to initiate the new compiler;
this will generate a "gen.js" file in *Backend/machine/dist* directory with resumptions and
operators arrays, which may be used by the virtual machine.

```bash
frank fib.fk --output-js
```

The third step is to recompile the machine's code (in *machine* folder), to
include the newly generated file, with the *webpack* command. Finally, the
user needs to include the "output.js" from *dist* folder, in theirs project's HTML file.
In this example, the user would see "5" as the computation result in the browser.


#### Limitations

All of the limitations are possible improvements and they are mainly present due to time constraints.

* The compilation of Frank programs with the new compiler can be initiated only from the base
  final_implementation folder, because the file generation path is fixed for testing purposes;
* To be compiled successfully, a Frank program must have a "main" function and must also be the
  first one in the file;
* There is a lack of current web functionality support. However, because of Frank's ability to
  suspend a current computation, to handle commands and to restart the machine afterwards, Frank's
  code has a potential to query or initiate DOM updates; this functionality could be achieved in
  the near future;
* Some features are still in prototype stages and a few have not been implemented,
  such as string concatenation.

## Evaluation

An experimental evaluation was chosen for this project, done in two parts. The first part was
benchmarking the performance of the developed system against two other similar systems
(automatic evaluation); the second part was comparing the functionality of the developed system
to Frankjnr’s original components.

### Benchmark

The benchmarking framework can be found in\
*final_implementation/Backend/benchmark* folder. Benchmark tests can be initiated in a terminal
window by typing *./evalNewBackend.sh*, *./evalVole.sh* or *./evalFrankjnr.sh*. The requirements
for launching the benchmark tests are the same as the ones for the final system; however, the
scripts must have valid permissions.

This benchmark was solely focused on the performance of the systems. Two types of times were taken
into account: the compilation time and the execution time. The compilation time describes how fast
a given program is parsed and compiled; the execution time reveals how fast a virtual machine returns
the final result. A Vagrant (Virtual Box) environment with two gigabytes of allocated memory was used
for running the tests. These environments are known to be considerably slower than real ones; chosen
systems might perform faster in the real world; however, in this case, systems were only compared
against each other. The following systems were benchmarked:

* Final system (developed by the author of this project);
* Frankjnr original system;
* Vole.

A single test included the compilation and the execution of a given program, done 100 times,
repeated 5 times for each system. The program which was executed had the same semantics for
all systems. Shown below is the program used to benchmark Fraknjr and a new back-end. 

```haskell
main : []List (List Num)
main! = map {x -> cons (wrap x) nil} (cons Num (cons Num (cons Num nil)))

data Num = Num | wrap Num

map : {a -> b} -> List a -> List b
map f nil = nil
map f (cons x xs) = cons (f x) (map f xs)
```


| Test Nr. | Final system | Original system | Vole       |
|----------|--------------|-----------------|------------|
| Test 1   | 2.787 sec.   | 0.754 sec.      | 1.261 sec. |
| Test 2   | 2.847 sec.   | 0.882 sec.      | 1.293 sec. |
| Test 3   | 3.005 sec.   | 0.993 sec.      | 1.226 sec. |
| Test 4   | 2.962 sec.   | 1.046 sec.      | 1.248 sec. |
| Test 5   | 2.976 sec.   | 1.029 sec.      | 1.227 sec. |
| Average  | 2.915 sec.   | 0.941 sec.      | 1.251 sec. |

Table: Benchmark result table

\newpage

\begin{figure}[!htb]
  \includegraphics[width=1\textwidth, center]{source/images/benchmark.png}
  \caption{Benchmark result graph}
  \label{fig:benchmark}
\end{figure}


The concerns and challenges included:

* Vole uses a different compiler with its own terminal; expect script was therefore used,
  which might have affected performance;
* The final system is dependent on the Frankjnr compiler;
* The final system uses a JavaScript-powered machine as opposed to others, which use
  Haskell abstract machines.

This evaluation gives an explicit illustration of the state of the system in terms of performance,
in comparison with other similar systems. These results were anticipated, however, as performance
was not one of the core goals of the project. The developed benchmark framework could be effectively
reused after further development to efficiently check for changes in performance.


### Functionality comparison

One of the main goals in creating the final system was for it to support the same functionality
as Frankjnr’s original components, while also adding web development features.
The known main features of both systems were extracted and compared; the table below
illustrates the outcomes of the comparison.

| Feature                | Final system | Original system |
|------------------------|--------------|-----------------|
| Integer support        |      Yes     |       Yes       |
| String concatenation   |      No      |       Yes       |
| Local functions        |      Yes     |       Yes       |
| Functions              |      Yes     |       Yes       |
| Commands               |      Yes     |       Yes       |
| Variables              |      Yes     |       Yes       |
| Atoms                  |      Yes     |       Yes       |
| Pairs                  |      Yes     |       Yes       |
| Application            |      Yes     |       Yes       |
| Composition            |      No      |       Yes       |
| Built-in functions     |      Yes     |       Yes       |
| Parse Shonky files     |      Yes     |       No        |
| Web development support |      Yes     |        No       |

Table: Supported functionality

A new test program was created and executed by both systems to collect the results for each feature.
If the program threw an exception, or the output was not as expected, the tested feature would not be
supported by the system. In addition, the author took Frankjnr’s original test cases from tests folder
and initiated them against the final system, in order to see the results from a different perspective.
Out of the twelve original tests, four did not pass on the final system; this was because all of them
were connected to functionality, such as string concatenation, which had not been implemented at the
time. For a more detailed overview of testing, see **chapter 6**.

This evaluation positively illustrates that the developed system can directly compete with the
original Frankjnr back-end in terms of functionality, and that most goals of the project have been
attained.


