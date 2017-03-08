# CS408 - Run Frank in Browser
Final 4th year project.

Repository is divided into three sections: Report, experimental system and final system.

##Report

Recompile with:

    npm run watch

##Experimental System

###Abstract Machine

Command to install webpack (you'll need node https://nodejs.org/ installed):

    npm install webpack -g

To watch for any changes in JavaScript:

    webpack -w

###Compiler

To run simply:

    ghci Compiler.hs

###Tests    
To run tests - open Terminal and type:

    ./tester.sh

####Requirements:

* chmod +x tester.sh (if permission denied)

* expect 

    apt-get install expect

* node & webpack    

##Final System