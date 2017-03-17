#!/usr/bin/env bash
# chmod +x testcases.sh (if permission denied)


#Test Cases
declare -A test0=(
    [path]='Backend/tests/test_cases/add.fk'
    [name]='Testing: addition with Peano numbers'
    [expected]=' suc suc zero   '
)

declare -A test1=(
    [path]='Backend/tests/test_cases/command.fk'
    [name]='Testing: simple commands'
    [expected]=' suc suc zero   '
)

declare -A test2=(
    [path]='Backend/tests/test_cases/int.fk'
    [name]='Testing: integer values'
    [expected]=' suc suc zero   '
)

declare -A test3=(
    [path]='Backend/tests/test_cases/intCommand.fk'
    [name]='Testing: integer values with commands'
    [expected]=' suc suc zero   '
)

declare -A test4=(
    [path]='Backend/tests/test_cases/local.fk'
    [name]='Testing: local functions'
    [expected]=' suc suc zero   '
)