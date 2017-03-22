# Results and Evaluation

## Outcome 

### Experimental system

During the initial development stages, an experimental system was developed with its own language,
compiler, virtual machine and testing framework in order to expand the author’s insight of the subject.
Experimental system is able to compile and run in the browser specific list of operations, in
particular sum of two expressions, "Throw" and "Catch", "Set", "Next", "Get" and to create new reference.
These operations were chosen because they each have significantly different implementation, thus
offering broader learning experience for the author. Moreover, abstract machine is written in JavaScript,
therefore it is able to communicate with compiled expressions on run-time. Defining quality of the 
abstract machine is that it utilizes stack as its core data structure, with support for interrupts. 
They have connected handlers who when initiated start going through the stack, in order to execute some
operation; when they are done, handlers restore the stack to its original position and give back control.

Here is an example of an expression with many of the available operations in action. Initially variable
"x" is created with value of "22", then it is assigned a new meaning of sum of previous "x" value and
value "11". Moving on "Next" (":>") operation is used to initiate last expression, where the new value 
"x" is taken and added to value "30". Virtual machine will return "63" in the browser
for this expression.

```haskell 
WithRef "x" (Val 22) (
    "x" := (Get "x" :+: Val 11)
        :> (Get "x" :+: Val 30))
```

Lastly, computation is interrupted on ":=" and "Get" commands to search through the stack and retrieve
or update reference of "x". 


### Final system

Lessons learned, along with the code style and a few functions of experimental system, were adapted in
creation of the final system.
Having done this, the author was successful in implementing a new abstract machine and compiler for
"Shonky" data structures, which were in turn integrated into the Frankjnr project. Final system supports
variables, integer values, atoms, pairs, function application, local functions, commands, thunk patterns,
top level functions and contains built in semantics for addition and subtraction. All these features
combined offer close to full development package,
thus almost any current Frank program could be compiled by the new compiler and successfully executed
by the abstract machine in the browser. 

Quick example of how the compiler and abstract machine work together and how user may use it.
User is able to execute Frank programs in four steps. First step is to write a program in Frank with
file ending of ".fk", such as:

```haskell
main : []Int
main! = fib 5

fib : Int -> Int
fib 0 = 0
fib 1 = 1
fib 2 = 1
fib n = fib (n-1) + fib (n-2)
```

Second step is to compile it with flag "output-js" to initiate new compiler. This will
generate "gen.js" file in *Backend/machine/dist* directory with resumptions and operators arrays, which
may be used by the virtual machine.

```bash
frank fib.fk --output-js
```

Third step is to recompile the machine's code (in *machine* folder), to include newly generated file,
with *webpack* command. And finally user needs to include "output.js" form *dist* folder,
in his project's HTML file. In this example user would see 5 as the computation result in the browser. 


#### Limitations

All of the limitations are possible improvements and they are present because of time constrains.

* Compilation of Frank programs with new compiler can be initiated only from the base
  *final_implementation* folder, because the file generation path is fixed for testing purposes;
* To be compiled successfully Frank program must have a "main" function and it must be the first one
  in the file;
* Lack of web functionality. Even though Frank language can be used to code in web context, current 
  implementation does not have any web features implemented because of time constrains;
* Some features are still in prototype stages and very small amount of them are still not implemented, 
  such as string concatenation.     

Moreover, the system can still improve on a variety of concerns, such as performance and
building procedures as they were not initial goals of the project.

## Evaluation

Experimental evaluation was chosen for this project and it was done in two parts. First part was 
benchmarking performance of developed system against two other similar systems (automatic evaluation).
Second part was comparison of functionality between developed system and Frankjnr original components.

### Benchmark

Benchmarking framework can be found in *final_implementation/Backend/benchmark* folder. Tests can be
initiated in a terminal window by typing *./evalNewBackend.sh*, *./evalVole.sh* or *./evalFrankjnr.sh*.
Requirements for launching the benchmark tests are the same as for the final system, in addition the
scripts must have permissions. 

This benchmark was solely focused on the performance of the systems. Two type of times were taken
into account: compilation time and execution time. Compilation time is how fast given program is parsed
and compiled; execution time is how fast virtual machine returns the final result. Vagrant (Virtual Box)
environment was used for running the tests with two gigabytes of allocated memory. These environments
are known to be considerably slower than real ones, therefore chosen systems might perform faster in
real world, however in this case systems were only compared between each other. The following systems
were benchmarked:

* Final system (developed by the author of this project);
* Frankjnr original system;
* Vole system.

Single test included compilation and execution of a given program hundred times and each system were
taken 5 times.
The program, which was executed had same semantics for all systems. 
Below the program is shown which was used to benchmark Fraknjr original and new system. 

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


\begin{figure}[!htb]
  \includegraphics[width=1\textwidth, center]{source/images/benchmark.png}
  \caption{Benchmark result graph}
  \label{fig:benchmark}
\end{figure}


Concerns and challenges were:

* Vole uses different compiler which has its own terminal, thus expect script was used. This might have
  affected performance.
* Final system is dependent on Frankjnr compiler.
* Final system uses JavaScript powered machine compared to other which use Haskell for abstract machine.

This evaluation gives a clear idea of the state of the system in terms of performance compared to other
similar systems. However, these 
results were expected, since the performance was not one of the core goals of the project. Moreover,
due to developed benchmark framework, it could be easily used again after further development
to quickly check for changes in performance.


### Functionality comparison

One of the main goals of the final system was to support the same functionality as Frankjnr original 
components do and implement addition web development features on top. Known main features of both
systems were extracted and compared. The table below shows the results of the comparison. 

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

New test program was created and executed by both systems to collect the results for each feature. If
the program would throw an exception or the output was not as expected, the tested feature is not
supported by the system.
Furthermore, author has taken 
Frankjnr original test cases from *tests* folder and initiated them against the final system, in order
to see the results from different perspective. Out of
twelve original tests, four have not passed on the final system. However, all of them
were connected to functionality, witch was not implemented by the final system at the time,
for example, string concatenation. 
For more detailed overview of testing, see **chapter 6**. 

This evaluation evidently shows that
developed system can directly compete with the original system and that most goals of the project
were reached. 


