#!/usr/bin/env bash
# chmod +x testcases.sh (if permission denied)


#Test Cases new
declare -A test0=(
    [path]='Backend/tests/test_cases/new/add.fk'
    [name]='Testing: addition with Peano numbers'
    [expected]='suc suc zero    '
)

declare -A test1=(
    [path]='Backend/tests/test_cases/new/command.fk'
    [name]='Testing: simple commands'
    [expected]='pr zero  suc zero    '
)

declare -A test2=(
    [path]='Backend/tests/test_cases/new/int.fk'
    [name]='Testing: integer values'
    [expected]='1 '
)

declare -A test3=(
    [path]='Backend/tests/test_cases/new/intCommand.fk'
    [name]='Testing: integer values with commands'
    [expected]='pr 0 1  '
)

declare -A test4=(
    [path]='Backend/tests/test_cases/new/local.fk'
    [name]='Testing: local functions'
    [expected]='pr zero  suc zero   suc suc zero        zero  suc zero   suc suc zero         '
)

declare -A test5=(
    [path]='Backend/tests/test_cases/new/intAdd.fk'
    [name]='Testing: integer addition'
    [expected]='20 '
)

declare -A test6=(
    [path]='Backend/tests/test_cases/new/intOperator.fk'
    [name]='Testing: call other operators with integer value'
    [expected]='3 '
)

declare -A test7=(
    [path]='Backend/tests/test_cases/new/lists.fk'
    [name]='Testing: lists'
    [expected]='zero  suc zero   zero      '
)

declare -A test8=(
    [path]='Backend/tests/test_cases/new/intList.fk'
    [name]='Testing: lists with integer values'
    [expected]='1 2 3     '
)


declare -A test21=(
    [path]='Backend/tests/test_cases/new/operator.fk'
    [name]='Testing: operator call'
    [expected]='suc zero   '
)

declare -A test22=(
    [path]='Backend/tests/test_cases/new/intLocal.fk'
    [name]='Testing: lists with integer values'
    [expected]='pr 0 1 2     0 1 2      '
)

declare -A test23=(
    [path]='Backend/tests/test_cases/new/intMinus.fk'
    [name]='Testing: integer minus test'
    [expected]='10 '
)

#Test cases OLD, lifted from Frankjnr tests

declare -A test9=(
    [path]='Backend/tests/test_cases/old/app.fk'
    [name]='Testing: app test'
    [expected]='42 '
)

declare -A test10=(
    [path]='Backend/tests/test_cases/old/evalState.fk'
    [name]='Testing: should fail! Strings not implemented'
    [expected]='\"Hello World!\"'
)

declare -A test11=(
    [path]='Backend/tests/test_cases/old/fact.fk'
    [name]='Testing: factorial'
    [expected]='120 '
)

declare -A test12=(
    [path]='Backend/tests/test_cases/old/fib.fk'
    [name]='Testing: fib'
    [expected]='5 '
)

declare -A test13=(
    [path]='Backend/tests/test_cases/old/flex-ab-eq.fk'
    [name]='Testing: unit test'
    [expected]='unit  '
)

declare -A test14=(
    [path]='Backend/tests/test_cases/old/listMap.fk'
    [name]='Testing: lists with integer values'
    [expected]='2   3   4       '
)

declare -A test15=(
    [path]='Backend/tests/test_cases/old/paper.fk'
    [name]='Testing: Examples from the paper'
    [expected]='\"do be \"'
)

declare -A test16=(
    [path]='Backend/tests/test_cases/old/r3.fk'
    [name]='Testing: Compiler Nontermination Issue'
    [expected]='1 '
)

declare -A test17=(
    [path]='Backend/tests/test_cases/old/r4.fk'
    [name]='Testing: Problem with unifying abilities'
    [expected]='42 '
)

declare -A test18=(
    [path]='Backend/tests/test_cases/old/r5.fk'
    [name]='Testing: Suspended computation datatype argument'
    [expected]='unit  '
)

declare -A test19=(
    [path]='Backend/tests/test_cases/old/r7.fk'
    [name]='Testing: Issue with recursive call in suspended comp'
    [expected]='unit'
)

declare -A test20=(
    [path]='Backend/tests/test_cases/old/str.fk'
    [name]='Testing: Pattern matching list of strings'
    [expected]='1'
)