# CS408 - Run Frank in Browser
Final 4th year project.

Supervisor: Prof. Conor McBride

Student: Rokas Labeikis

Repository is divided into three sections: Report, experimental system and final system.

For full documentation and instructions read the report.

## Report

Pdf and html versions of the report are located in the *report/output* folder.

Recompile with:

    npm run watch

## Experimental System

### Abstract Machine

Command to install webpack (you'll need node https://nodejs.org/ installed):

    npm install webpack -g

To watch for any changes in JavaScript:

    webpack -w

### Compiler

To run simply:

    ghci Compiler.hs

### Tests    
To run tests - open Terminal and type:

    ./tester.sh

### Requirements:

* chmod +x tester.sh (if permission denied)

* expect script

    apt-get install expect

* node & webpack
* ghci    

## Final System


### Requirements:

* chmod +x tester.sh (if permission denied)
* node & webpack
* ghci 
