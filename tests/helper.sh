#!/usr/bin/expect 
# chmod +x helper.sh (if permission denied)


set expr [lrange $argv 0 end-1]
set name [lindex $argv end 0]

spawn ghci

expect ">"
send ":load Compiler.hs\r"

expect "Main>"
send "$expr\r"

expect "Main>"
send "jsWrite (jsSetup \"$name\" (compile xpr))\r" 

expect "Main>"
send ":quit\r"

expect "Main>"
