# CS408 - Run Frank in a Browser
Final 4th year project.

Supervisor: Dr. Conor McBride

Student: Rokas Labeikis

Repository is divided into three sections: Report, experimental system and final system.

For full documentation and instructions, see the report.

## Final System


### Requirements

* Node (https://nodejs.org/en/)
* npm (https://www.npmjs.com/)
* webpack (https://webpack.github.io/)
* ghc (https://www.haskell.org/ghc/)
* Frank 


### Setup Frank

After installing *Node, *npm*, *webpack* and *ghc* to your environment. Navigate to *final_implementation*
folder and install Frank by typing:

```bash
stack setup
stack install
```
You might need to edit your machine's environment path, to include Frank. 

### Compiling and executing programs

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

### Tests

Script initiates test cases and outputs the result in the terminal window.

#### Usage

Folder: *final_implementation/Backend/tests*.

To run tests execute command: 

```bash
./tester.sh
```

#### Troubleshooting

If *tester.sh* have issues with permissions, do: 

```bash
chmod +x tester.sh
chmod +x testcases.sh
```

### Benchmark

Navigate to *final_implementation/Backend/benchamrk* directory and initiate any of the tests by
executing the Bash script. Example:

```bash
./evalFrankjnr.sh
```


## Experimental System

### Requirements

* Node (https://nodejs.org/en/)
* npm (https://www.npmjs.com/)
* webpack (https://webpack.github.io/)
* ghc (https://www.haskell.org/ghc/)
* Expect script - required for testing, install command:

```bash 
    apt-get install expect
```

### Usage

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


### Tests

In the *simple_implementation/tests* directory execute:

```bash
./tester.sh
```

#### Troubleshooting

If files have issues with permissions: 

```bash
chmod +x tester.sh
chmod +x helper.sh
```

## Report

PDF and HTML versions of the report are located in the *report/output* folder.

Recompile with:

    npm run watch

Follow usage & installation instructions described in the readme.md file,
located in *report* folder.
