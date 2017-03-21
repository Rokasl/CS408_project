Machine = require("./components/machine.js");
Printer = require("./components/printer.js");
gen = require("./dist/gen.js");
var start = new Date().getTime();
var mode = new Machine(gen[0], gen[1]);
var end = new Date().getTime();
console.log(mode.comp.value);
console.log('Execution took (ms):');
console.log(end - start);
console.log(Printer(mode.comp.value));


