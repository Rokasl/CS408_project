var Machine = function Machine(f) {

    var mode = {
        stack: null,
        tag: "go",
        data: 0
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
                    }
                    break;
                case ("throw"):
                    if (mode.stack.tag === "catch") {
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
            }
        }
    }

    console.log(mode.data);

    this.printStack = function () {
        // TODO
    }
}


module.exports = Machine;