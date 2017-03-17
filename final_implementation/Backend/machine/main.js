Machine = require("./components/machine.js");
Printer = require("./components/printer.js");
gen = require("./dist/gen.js");

var mode = new Machine(gen[0], gen[1]);
console.log(mode.comp.value);
console.log(Printer(mode.comp.value));


