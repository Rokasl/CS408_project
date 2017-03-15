#!/usr/bin/expect 
# chmod +x helper.sh (if permission denied)

set path [lrange $argv 0 end-1]
set name [lindex $argv end 0]

spawn ghci

expect ">"
send ":load compiler.hs\r"

expect "Compiler>"
send "parseShonky \"$name\" \"$path\"\r"

expect "Compiler>"
send ":quit\r"

expect "Compiler>"
