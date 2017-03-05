s = require("./StackSave.js");
printer = require("./Printer");
var saver = new s();

var Machine = function Machine(f) {

    var mode = {
        stack: null,
        tag: "go",
        data: f.length - 1
    }

    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);

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
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: "WithRefRight",
                                    data: mode.data,
                                    name: mode.stack.name,
                                },
                                tag: "go",
                                data: mode.stack.data
                            }
                            break;

                        case "WithRefRight":
                            mode.stack = mode.stack.prev;
                            break;

                        case ":=":
                            m = mode;
                            mode = mode.stack.prev;
                            found = false;

                            while (mode != null) {
                                if (mode.tag === "WithRefRight" && mode.name === m.stack.name) {
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
                                if (mode.data != null && mode.tag != "WithRefRight") {
                                    mode = {
                                        stack: mode.prev,
                                        tag: "go",
                                        data: mode.data
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
                    m = mode; // save the current stack
                    mode = mode.stack;
                    found = false;

                    while (mode != null) {
                        if (mode.tag === "WithRefRight" && mode.name === m.data) {
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
                            data: "Exception: Undifined expression: " + m.data
                        }
                    } else { // everything is okay, restore stack & continue!
                        mode = {
                            stack: saver.restoreStack(mode), // get back full stack
                            tag: "num",
                            data: mode.data
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