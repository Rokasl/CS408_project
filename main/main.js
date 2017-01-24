Stack = require("./components/stack.js");
require("./components/AM.js");

var stack = new Stack();
stack.push(1);
console.log(stack.peek());
stack.push(2);
console.log(stack.peek());
stack.command("+");
console.log(stack.peek());
stack.push(3);
stack.command("*");
console.log(stack.peek());

console.log("it works");