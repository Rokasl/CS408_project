var Machine = function Machine(f) {

    var save = [];
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
                            if (mode.stack.i === 1) {
                                mode.stack = mode.stack.prev;
                            } else {
                                mode = {
                                    stack: {
                                        prev: mode.stack.prev,
                                        tag: "catch",
                                        data: mode.data,
                                        i: 1
                                    },
                                    tag: "go",
                                    data: mode.stack.data
                                }
                            }
                            break;

                        case ":>":
                            if (mode.stack.i === 1) {
                                mode.stack = mode.stack.prev;
                            } else {
                                mode = {
                                    stack: {
                                        prev: mode.stack.prev,
                                        tag: ":>",
                                        data: mode.data,
                                        i: 1
                                    },
                                    tag: "go",
                                    data: mode.stack.data
                                }
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
                    }
                    break;
                case ("throw"):
                    if (mode.stack.tag === "catch" && mode.stack.i != 0) {
                        mode = {
                            stack: null,
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
                    saveStack(mode);
                    if (mode.stack.tag === "WithRef" && mode.data === mode.stack.name) {
                        mode = {
                            stack: save[0].stack, //get back full stack
                            tag: "num",
                            data: mode.stack.data
                        }
                        save = [];
                        restoreStack(mode);
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
    console.log(mode.data);

    this.printStack = function () {
        // TODO
    }
}


var save = {
    stack: null,
    tag: null,
    data: null
}

var saveStack = function (m) {
    save = {
        stack: save,
        tag: m.tag,
        data: m.data
    }
}

var restoreStack = function (m) {
    var stack;

    while(save.stack != null) {
        stack = {
            stack: m,
            tag: save.tag,
            data: save.data,
        }
        save = save.stack;
    }
    console.log(stack);
    return stack
}

module.exports = Machine;