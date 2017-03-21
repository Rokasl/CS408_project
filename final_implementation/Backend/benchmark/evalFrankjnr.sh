#!/usr/bin/env bash
# chmod +x evaluateFrankjnr.sh (if permission denied)

cd ..
cd ..

TIMEFORMAT='It took %R seconds to compile and run program.fk 100 times'
time {
    for (( c=0; c<100; c++ ))
    do  
    frank Backend/benchmark/program.fk 
    done
}



