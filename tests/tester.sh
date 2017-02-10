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
declare -A test1=(
    [expr]='let xpr = Val 2 :+: (Val 4 :+: Val 8)'
    [name]='test_sum'
    [expected]='14'
)

for id_name in ${!test@}; do
    declare -n test=$id_name


    echo "Expr: ${test[expr]}"
    echo "Name: ${test[name]}"

    #Test
    ./tests/helper.sh ${test[expr]} ${test[name]}
    #end of expect

    webpack #recompile output.js 

    output=$(node ./dist/output.js); #get output
    output="${output##*$'\n'}" #take only last line

  

    if [ $output -eq "${test[expected]}" ]; then
        echo -e "${GREEN}Test passed${NC}"
    else 
        echo -e "${RED}Test failed${NC}"
    fi
    
done