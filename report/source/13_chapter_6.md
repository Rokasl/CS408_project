# Verification and Validation

This project's verification and validation were done strictly throughout testing. Development was
done in two parts, development of experimental system (for learning purposes) and development of
final system. Initial testing started at very early stage of the project, by testing experimental 
system's abstract machine behavior without the interaction of the compiler.
At that point it was done manually, by the author typing in expressions and looking through the output,
however as development went on it quickly became too inefficient. Thus a experimental testing framework
was developed (February 10th, 2017), which would go through pre-set test cases one by one without any
human interaction; giving feedback for the user in the process. Author then adapted the system
and applied lessons learned to create similar but improved framework for the final system. 

During the implementation of both systems test cases were added regularly, after each newly developed
component. Moreover, on account of iterative and incremental development methodology (IDD) author was
able to write targeted test cases for every component of the system. Because of this, new bugs were
identified and tracked faster, thus leading for faster software development. Test cases were initiated
before every content push to git and during development to check for any broken parts of the system.

After the implementation has ended, test framework was initiated one last time to see if all tests
still pass, as well as some manual testing was done by the author to verify the state of the 
system. Furthermore, test programs from "Frankjnr" implementation were lifted and used to verify the
behavior of the final system by confirming that the output of the tests are the same in both systems.
More on this in **Chapter 7**.   

Possible improvement would to be to use service similar to *Jenkins*, in order to automate tests
even more by automatically launching them and giving back feedback. But only on certain conditions,
for example, after every push to git or once a day regularly. 

For all test cases see **Appendix 3**.


## Experimental testing framework

This section will describe the implementation of the experimental testing framework.
It consists of two files utilizing two different scripts: Bash script and Expect script.
Its purpose is to automate the testing process. Below each of these scripts will be reviewed.

### Bash script

Bash script is the main script in the testing framework which stores all test cases,
then goes through them one by one. To launch it simply type *./tester.sh* in the terminal 
window. For full guide on installation and usage see **Appendix 2**. 

Test cases are arrays which store free values: expression to be tested, the name of the
test and expected output. Below sample test case is displayed:

```bash
declare -A test0=(
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
```

For each test case Bash script launches Expect script and passes test case parameters to it, in 
particular it passes the expression to be tested and the name of the test:

```bash
./tests/helper.sh ${test[expr]} ${test[name]
```

After, Expect script "helper.sh" finishes computing new program is generated, system must recompile 
abstract machine's code to use newly generated program. *Webpack* is used to compile JavaScript files
to one and to manage their structure. 

```bash
webpack --hide-modules #recompile to output.js 
```

After successful recompilation of JavaScript Bash script has to retrieve the output of the program by
getting the last line of the console output, it does this by utilizing Node functionality
and some string manipulation.

```bash
output=$(node ./dist/output.js); #get output
output="${output##*$'\n'}" #take only last line
```

Finally, Bash script just compares the expected output with actual output and gives back the result for 
the user to see.

```bash
if [ "$output" = "${test[expected]}" ]; then
    echo -e "${GREEN}Test passed${NC}"
else 
    echo -e "${RED}Test failed${NC}"
fi
```
### Expect script

Expect script is used because of its ability to send and receive commands to systems which have their own
terminal, in this case *GHCI*. 
Developed script takes the name of the test and the expression to be tested. Since it is only possible to
pass one array to Expect script, the script performs some array manipulation to retrieve the name and the
expression which was passed by the Bash script.

```bash
set expr [lrange $argv 0 end-1]
set name [lindex $argv end 0]
```

After that it launches *GHCI* terminal.

```bash
spawn ghci
```

And waits for ">" character before sending the command to load the "Compiler.hs" file, which is
experimental system's compiler. 

```bash
expect ">"
send ":load Compiler.hs\r"
```
Finally, Expect script sends the two following commands with some variables (taken form the array)
to generate the output of the compiler and quits to resume the Bash script execution.

```bash
expect "Main>"
send "$b\r"

expect "Main>"
send "jsWrite (jsSetup \"$name\" (compile xpr))\r" 
```


### Possible improvements

* Speed and efficiency;
* Move test cases into separate file to improve structure;
* More useful statistics at the end of test framework computation;


## Final testing framework

Contained in *final_implementation/Backend/tests* folder. Framework is designed to launch number of 
programs, located in *test_cases* folder, and give back feedback to the user, which test programs
succeeded and which ones failed. This framework eliminates manual testing, lets identify bugs faster,
thus 
speeding up development process and easing maintenance. And it is fully written in Bash Script.

Some parts of the test framework were lifted from earlier experiment, however the key differences are 
that it is not using GHC compiler directly; so it eliminates the need for Expect script (previously
located in "helper.sh" file),thus improving performance of the framework. Another change is that
test cases don't take in expressions anymore, instead they take in paths to actual programs, therefore
providing ability to launch them and check their outputs.

For all test case programs see **Appendix 3**. For usage and installation instructions
see **Appendix 2**.

### Implementation

Similarly like in experimental system's testing framework, test cases are stored in array.
Each of them are
objects which store three values: path of the test program, name of the test and expected output.
They are looped through one by one, displaying the name of the test to the user and recompiling the
test with:

```bash
frank ${test[path]} --output-js
```

It generates the "gen.js" in *Backend/machine/dist* folder. At this point *Backend/machine/dist/output.js*
needs to be recompiled to include new "gen.js" file. 

```bash
webpack --hide-modules
```

Then it just retrieves the output with *Node* and checks if it as expected or not; letting the user 
know if test failed or passed (same way as in experimental testing framework). Finally,
some statistics are shown on how many tests in total have passed and failed with corresponding percentages.



### Possible improvements

* Providing more statistics when all tests are executed;
* Timestamp tests, letting the user know how much time it took to run individual tests and all of 
  them together;
* Improve performance by not trying to launch programs which fail to compile by "Frankjnr" compiler.

