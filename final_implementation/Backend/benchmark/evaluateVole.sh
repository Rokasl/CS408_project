#!/usr/bin/expect 
# chmod +x expect.sh (if permission denied)

cd vole

spawn ghci

expect ">"
send ":load GHCiVole\r"

expect "GHCiVole>"
send "test <- readFile \"test.vole\"\r"

expect "GHCiVole>"
send "let defs = mkDefs test\r"


proc test_proc {} {
    set count 0;
    while {$count < 100 } {
        set count [expr $count+1];
        expect "GHCiVole>"
        send "try defs \"(!test1)\"\r"
        puts $count
    }
    expect "GHCiVole>"
    send ":quit\r"

    
}

puts [time {
    test_proc
}]

