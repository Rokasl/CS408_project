#!/usr/bin/env bash

# chmod +x main.sh (if permission denied)
# requires (apt-get install expect)
# requires node & webpack

GREEN='\033[0;32m' #font color
RED='\033[0;31m' #font color
NC='\033[0m' #default color

source testcases.sh #Get test cases

cd ..

declare -i passed=0
declare -i failed=0

declare -i total=0

for id_name in ${!test@}; do
    declare -n test=$id_name    
    total=$((total+1))

    #Test compiler
    ./tests/helper.sh ${test[path]} ${test[name]}
    #end of expect

    cd machine

    webpack --hide-modules #recompile output.js 

    output=$(node ./dist/output.js); #get output
    output="${output##*$'\n'}" #take only last line

    cd ..

    if [ "$output" = "${test[expected]}" ]; then
        echo -e "${GREEN}Test passed${NC}"
        passed=$((passed+1))
    else 
        echo -e "${RED}Test failed${NC}"
        failed=$((failed+1))
    fi
    
done

declare -i passRate=passed*100/total
declare -i failRate=failed*100/total

echo ""
echo -e "${GREEN}$passed ($passRate%) Tests passed!${NC}"
echo -e "${RED}$failed ($failRate%) Tests failed!${NC}"