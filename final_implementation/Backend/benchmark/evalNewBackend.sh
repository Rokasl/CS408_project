#!/usr/bin/env bash
# chmod +x evaluateNewBackend.sh (if permission denied)

cd ..
cd ..

TIMEFORMAT='It took %R seconds to compile program.fk 100 times!'
foo=$(time {
    for (( c=0; c<100; c++ ))
    do  
    frank Backend/benchmark/program.fk --output-js
    done
} 3>&1 1>&2 2>&3 )

echo 

cd Backend/machine

webpack --hide-modules #recompile output.js 

echo 
echo "This will take a bit longer, because results need to be extracted"

declare -i total=0
for (( c=0; c<100; c++ ))
do
output=$(node ./dist/output.js); #get output
IFS=$'\n' lines=($output)
total=$((total+${lines[${#lines[@]}-2]}))
done
RESULT=$(awk "BEGIN {printf \"%.2f\",${total}/1000}")
echo "It took $RESULT seconds to run program.fk 100 times!"