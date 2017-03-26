# Verification and Validation

This project's verification and validation were done strictly throughout testing. Development
was done in two parts, firstly developing the experimental system (for learning purposes) and then
the final system. Initial testing began at the early stages of the project, by testing the
experimental system’s abstract machine’s behavior without the interaction of the compiler.
At that point, it was done manually, the author typing in expressions and assessing the output;
however, as development went on, this quickly became inefficient. An experimental testing
framework was thus developed (February 10th, 2017), which went through pre-set test cases
one by one without any human interaction whilst providing feedback for the user during the
process. The author then adapted the system and applied his acquired experience to create
an improved framework for the final system.

During the implementation of both systems, test cases were added regularly after each
newly developed component. On the account of iterative and incremental development methodology (IDD),
the author was able to write targeted test cases for each component of the system. Consequently, new bugs
were identified and tracked faster, which allowed for more efficiency in software development.
Test cases were initiated before every content push to git, as well as
during the development, in order to check for any broken parts of the system.

Following the implementation, test framework was initiated again in order to check whether
all tests still passed; some manual testing was also performed to verify the state of the
system. Furthermore, test programs from *Frankjnr* implementation were lifted
and used to verify the behavior of the final system by confirming that the output
of the tests were the same in both systems. See more on this in **Chapter 7**.

A possible improvement would to be to use a service similar to *Jenkins* in order to automate
the tests after every push to git and once a day, regularly.

For a full list of test case expressions and programs, see **Appendix 3**.


## Experimental testing framework

This section will describe the implementation of the experimental testing framework.
It consists of two files utilizing two different scripts: a Bash script and an Expect script.
Its purpose is to automate the testing process. Each of these scripts will be reviewed below.

### Bash script

Bash script is the main script in the testing framework which stores test cases;
then assesses them one by one. To launch the script, the user has to input *./tester.sh* in
the terminal window. For a full guide on installation and usage, see **Appendix 2**.

Test cases are arrays which store free values: the expression to be tested, the name
of the test and the expected output. A sample test case is displayed below:

```bash
declare -A test0=(
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
```

For each test case, Bash script launches Expect script and passes on to it the test case
parameters - the expression to be tested and the name of the test:

```bash
./tests/helper.sh ${test[expr]} ${test[name]
```

After Expect script "helper.sh" finishes computing, a new program is generated.
The system must then recompile the abstract machine's code to use the newly generated program.
*Webpack* is used to compile JavaScript files into a single unit and to manage their structure.

```bash
webpack --hide-modules #recompile to output.js 
```

After a successful compilation of JavaScript, Bash script has to retrieve the output of the
program by acquiring the last line of the console output; it does this by utilizing
the Node library and some string manipulation.

```bash
output=$(node ./dist/output.js); #get output
output="${output##*$'\n'}" #take only last line
```

Finally, Bash script simply compares the expected output with the actual output
and displays the resulting conclusion for the user.

```bash
if [ "$output" = "${test[expected]}" ]; then
    echo -e "${GREEN}Test passed${NC}"
else 
    echo -e "${RED}Test failed${NC}"
fi
```
### Expect script

Expect script is used because of its ability to send and receive commands to systems which
have their own terminal, which in this case is *GHCI*. The developed script takes the name
of the test and the expression to be tested. Since it is only possible to pass one array to
Expect script, the script performs some array manipulation to retrieve the name and the
expression passed by the Bash script.

```bash
set expr [lrange $argv 0 end-1]
set name [lindex $argv end 0]
```

After that, it launches the *GHCI* terminal.

```bash
spawn ghci
```

Then, the script waits for the character ">" before sending the command to load the
"Compiler.hs" file, the experimental system's compiler.

```bash
expect ">"
send ":load Compiler.hs\r"
```
Finally, the Expect script sends the two following commands along with some variables
taken from the array to generate the output of the compiler, and quits to resume the Bash
script execution.

```bash
expect "Main>"
send "$b\r"

expect "Main>"
send "jsWrite (jsSetup \"$name\" (compile xpr))\r" 
```


### Possible improvements

* Speed and efficiency;
* Move test cases into separate file to improve structure;
* More useful statistics at the end of the test framework computation;


## Final testing framework

Contained in *final_implementation/Backend/tests* folder. The framework is designed to launch
a number of programs located in test_cases folder, and to provide feedback to the user regarding
the successes and failures of the test programmes. This framework eliminates manual testing;
allows for a quicker bug identification, thus speeding up the development process and easing
maintenance. It is also fully written in Bash script, unlike the experimental testing framework.
Some parts of the test framework were lifted from an earlier experiment; however,
the key difference is that it does not use the GHC compiler directly; so it eliminates
the need for Expect script (previously located in "helper.sh" file),
which improves the performance of the framework. Another change is that test cases no
longer take in expressions; instead, they take in paths to actual programs.
This provides the ability to launch complete programs and to check their outputs.

For all test case programs, see **Appendix 3**. For usage and installation
instructions, see **Appendix 2**.

### Implementation

Similarly to the experimental system's testing framework, test cases are stored in an array.
Each of the test cases are objects which store three values: the path of the test program,
the name of the test and the expected output. They are looped through one by one, displaying
the name of the test to the user and recompiling the test with:

```bash
frank ${test[path]} --output-js
```

It generates the "gen.js" in *Backend/machine/dist* folder. At this point, 
*Backend/machine/dist/output.js* needs to be compiled again to include the new "gen.js" file.

```bash
webpack --hide-modules
```

The script then simply retrieves the output with *Node* and checks whether it matches the
expectation, while letting the user know if the test passed or failed
(same as in the experimental testing framework). Finally, some statistics are shown
on how many tests have passed or failed in total, with the corresponding percentage values.


### Possible improvements

* Providing more statistics when all of the tests are executed;
* Timestamp tests, letting the user know both the individual test times and also the total
  time for all tests;
* Improve performance by adjusting the testing framework so that it does not attempt to launch
  programs failed to compile by Frankjnr compiler in the first place.
