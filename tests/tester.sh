#!/usr/bin/env bash

# chmod +x tester.sh (if permission denied)
# requires (apt-get install expect)
# requires node $ webpack

GREEN='\033[0;32m' #font color
RED='\033[0;31m' #font color
NC='\033[0m' #default color

cd ..

#Test Cases
declare -A test0=(
    [expr]='let xpr = Val 10'
    [name]='test_num'
    [expected]='10'
)
declare -A test1=( #addition
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Val 8)'
    [name]='test_sum'
    [expected]='14'
)
declare -A test2=( # Throw
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Throw)'
    [name]='test_throw'
    [expected]='Unhandled exception!'
)
declare -A test3=( # Catch
    [expr]='let xpr = Catch (Val 2 :+: (Val 4 :+: Throw)) (Val 2)'
    [name]='test_catch'
    [expected]='2'
)
declare -A test4=( # Catch with previous stack
    [expr]='let xpr = ((Val 5) :+: (Catch (Val 2 :+: (Val 4 :+: Throw)) (Val 2)))'
    [name]='test_catch_stack'
    [expected]='7'
)
declare -A test5=( # Simple WithRef, value is not used
    [expr]="let xpr = (WithRef \"x\" (Val 2) (Val 5 :+: Val 3))"
    [name]='test_simple_withref'
    [expected]='8'
)

for id_name in ${!test@}; do
    declare -n test=$id_name    
    
    #Test
    ./tests/helper.sh ${test[expr]} ${test[name]}
    #end of expect

    webpack #recompile output.js 

    output=$(node ./dist/output.js); #get output
    output="${output##*$'\n'}" #take only last line

    echo $output;
    echo ${test[expected]};
    if [ "$output" = "${test[expected]}" ]; then
        echo -e "${GREEN}Test passed${NC}"
    else 
        echo -e "${RED}Test failed${NC}"
    fi
    
done