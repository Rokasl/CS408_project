s = require("./StackSave.js");
printer = require("./Printer");
var saver = new s();

var Machine = function Machine(f) {

    var save = [];
    var mode = {
        stack: null,
        tag: "go",
        data: f.length - 1
    }

    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);
        console.log(mode);

        while (mode.tag != "go" && mode.stack != null) {
            switch (mode.tag) {
                case ("num"):
                    switch (mode.stack.tag) {
                        case "left":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: "right",
                                    data: mode.data
                                },
                                tag: "go",
                                data: mode.stack.data
                            }
                            break;
                        case "right":
                            mode = {
                                stack: mode.stack.prev,
                                tag: "num",
                                data: mode.stack.data + mode.data
                            }
                            break;
                        case "catch":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: "catcher",
                                    data: mode.data,
                                },
                                tag: "go",
                                data: mode.stack.data
                            }

                            break;

                        case ":>left":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: ":>right",
                                    data: mode.data
                                },
                                tag: "go",
                                data: mode.stack.data
                            }
                            break;
                        case ":>right":
                            mode = {
                                stack: mode.stack.prev,
                                tag: "num",
                                data: mode.data
                            }

                            break;



                        case "WithRef":
                            if (mode.stack.i === 1) {
                                mode.stack = mode.stack.prev;
                            } else {
                                mode = {
                                    stack: {
                                        prev: mode.stack.prev,
                                        tag: "WithRef",
                                        data: mode.data,
                                        name: mode.stack.name,
                                        i: 1
                                    },
                                    tag: "go",
                                    data: mode.stack.data
                                }
                            }
                            break;

                        case ":=":
                            m = mode;
                            mode = mode.stack.prev;
                            found = false;

                            while (mode != null) {
                                if (mode.tag === "WithRef" && mode.name === m.stack.name) {
                                    mode.data = m.data;
                                    found = true;
                                    break;
                                }

                                saver.saveStack(mode);
                                mode = mode.prev;

                            }


                            if (!found) { // variable not defined
                                mode = { // throw exception!
                                    stack: m.stack.prev,
                                    tag: "throw",
                                    data: "Exception: Undifined expression: " + m.stack.name
                                }
                            } else {

                                // everything is okay, restore stack & continue!
                                mode = saver.restoreStack(mode);

                                if (mode.data != null) {

                                    mode = {
                                        stack: mode,
                                        tag: "go",
                                        data: mode.data
                                    }
                                } else { // just halt, no further instructions
                                    mode = {
                                        stack: mode,
                                        tag: "halt",
                                        data: m.data
                                    }
                                }
                            }

                            break;

                    }
                    break;
                case ("throw"):
                    if (mode.stack.tag === "catcher") {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "num",
                            data: mode.stack.data
                        }
                    } else {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "throw",
                            data: "Unhandled exception!"
                        }
                    }
                    break;
                case ("get"):
                    save.push(mode);
                    if (mode.stack.tag === "WithRef" && mode.data === mode.stack.name) {
                        mode = {
                            stack: save[0].stack, //get back full stack
                            tag: "num",
                            data: mode.stack.data
                        }
                        save = [];
                    } else if (mode.stack.prev != null) {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "get",
                            data: mode.data
                        }
                    } else {
                        mode = { // throw exception!
                            stack: null,
                            tag: "throw",
                            data: "Exception: Undifined expression: " + mode.data
                        }
                    }
                    break;

            }
        }
    }
    console.log("----END----");
    printer(mode);
    // just for node testing
    console.log(mode.data);
}


module.exports = Machine;