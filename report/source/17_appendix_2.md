# Appendix 2: Usage & installation instructions {.unnumbered}

## Final system {.unnumbered}


### Requirements {.unnumbered}

* Node (https://nodejs.org/en/)
* npm (https://www.npmjs.com/)
* webpack (https://webpack.github.io/)
* ghc (https://www.haskell.org/ghc/)
* Frank 


### Setup Frank {.unnumbered}

After installing *Node, *npm*, *webpack* and *ghc* to used environment. User needs to navigate
to *final_implementation* folder and install Frank by typing following commands:

```bash
stack setup
stack install
```
User might need to edit their machine's environment path, to include Frank. 

### Compiling and executing programs {.unnumbered}

User is able to compile any Frank program from *final_implementation* directory or sub
directories with flag "output-js". Example:

```bash
frank examples/foo.fk --output-js
```

This will generate "gen.js" in *final_implementation/Backend/machine/dist* directory. Now user has
to recompile the machine's code. In the */final_implementation/Backend/machine* folder
execute command:

```bash
webpack
```

"output.js" will be generated in the same folder as "gen.js" was, user can place it in their HTML file to 
initiate execution and see results of the compiled program. 

### Tests {.unnumbered}

Script initiates test cases and outputs the result in the terminal window.

#### Usage {.unnumbered}

Folder: *final_implementation/Backend/tests*.

Run test cases: 

```bash
./tester.sh
```

#### Troubleshooting {.unnumbered}

If *tester.sh* have issues with permissions - possible solution: 

```bash
chmod +x tester.sh
chmod +x testcases.sh
```

### Benchmark {.unnumbered}

In the *final_implementation/Backend/benchamrk* directory initiate any of the benchmarks by
executing the Bash script. Example:

```bash
./evalFrankjnr.sh
```

## Experimental system {.unnumbered}


### Requirements {.unnumbered}

* Node (https://nodejs.org/en/)
* npm (https://www.npmjs.com/)
* webpack (https://webpack.github.io/)
* ghc (https://www.haskell.org/ghc/)
* Expect script - required for testing, install command:

```bash 
    apt-get install expect
```

### Usage {.unnumbered}

Initiates the compiler in the *simple_implementation* directory: 

```bash
ghci Compiler.hs
```

Define and compile valid expression, providing the name of the expression to "jsSetup" function in
the process. Example:

```haskell
let xpr = WithRef "x" (Val 2) (Val 5 :+: (Get "x"))
jsWrite (jsSetup "example_program" (compile xpr))
```

This will generate "generated.js" file in *simple_implementation/dist" directory. Now user has to 
recompile the abstract machine for it to include newly generated file. The user can do this by executing
*webpack* command in the *simple_implementation* folder. Finally, "output.js" will be generated in
*simple_implementation/dist" directory, which user can include in your their project to see results 
of the compilation.


### Tests {.unnumbered}

In the *simple_implementation/tests* directory execute:

```bash
./tester.sh
```

#### Troubleshooting {.unnumbered}

If files have issues with permissions: 

```bash
chmod +x tester.sh
chmod +x helper.sh
```

