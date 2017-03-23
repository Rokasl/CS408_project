# Appendix 2: Usage & installation instructions {.unnumbered}

## Final system {.unnumbered}


### Requirements {.unnumbered}

* Node (https://nodejs.org/en/)
* npm (https://www.npmjs.com/)
* webpack (https://webpack.github.io/)
* ghc (https://www.haskell.org/ghc/)
* Frank 


### Setup Frank {.unnumbered}

After installing *Node, *npm*, *webpack* and *ghc* to your environment. Navigate to *final_implementation*
folder and install Frank by typing:

```bash
stack setup
stack install
```
You might need to edit your machine's environment path, to include Frank. 

### Compiling and executing programs {.unnumbered}

Navigate to *final_implementation* and compile any frank program from current directory or sub
directories with flag "output-js". Example:

```bash
frank examples/foo.fk --output-js
```

This will generate "gen.js" in *final_implementation/Backend/machine/dist* directory. Now you have
to recompile the machine's code. You can do this by navigating to */final_implementation/Backend/machine*
and executing command:

```bash
webpack
```

"output.js" will be generated in the same folder as "gen.js" was, you can place it in HTML file to 
initiate execution and see results of the compiled program. 

### Tests {.unnumbered}

Script initiates test cases and outputs the result in the terminal window.

#### Usage {.unnumbered}

Folder: *final_implementation/Backend/tests*.

To run tests execute command: 

```bash
./tester.sh
```

#### Troubleshooting {.unnumbered}

If *tester.sh* have issues with permissions, do: 

```bash
chmod +x tester.sh
chmod +x testcases.sh
```

### Benchmark {.unnumbered}

Navigate to *final_implementation/Backend/benchamrk* directory and initiate any of the tests by
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
* Expect script - required for testing, install by typing this command:

```bash 
    apt-get install expect
```

### Usage {.unnumbered}

Initiate the compiler in the *simple_implementation* directory: 

```bash
ghci Compiler.hs
```

Define and compile valid expression, providing the name of the expression to "jsSetup" function in
the process. Example:

```haskell
let xpr = WithRef "x" (Val 2) (Val 5 :+: (Get "x"))
jsWrite (jsSetup "example_program" (compile xpr))
```

This will generate "generated.js" file in *simple_implementation/dist" directory. Now you need to 
recompile the abstract machine for it to include newly generated file. You can do this by executing
*webpack* command in the *simple_implementation* folder. Finally, "output.js" will be generated in
*simple_implementation/dist" directory, which you can include in your web project to see results 
of you compilation.


### Tests {.unnumbered}

Navigate to *simple_implementation/tests* and type:

```bash
./tester.sh
```

#### Troubleshooting {.unnumbered}

If files have issues with permissions, type: 

```bash
chmod +x tester.sh
chmod +x helper.sh
```

