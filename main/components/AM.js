var Machine = function Machine(f) {

    var mode = {
        stack: null,
        tag: "go",
        data: 0
    }

    while (mode.tag === "go") {
        console.log(mode);
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

                        break;
                    }
                break;
                case ("throw"):
                
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