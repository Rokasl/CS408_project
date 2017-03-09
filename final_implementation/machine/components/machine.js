var Machine = function Machine(resumptions, operators) {

    var mode = {
        stack: null,
        comp: {
            tag: "go",
            value: 0
        }
    };



    var argz = [];

    argz[0] = {
        tag: "value",
        value: "x"
    };

    argz[1] = {
        tag: "value",
        value: "y"
    };
    

    var mode = operators[0](null,argz)

    console.log(mode);

    switch(mode.comp.tag) {
        case "value":
            switch(mode.stack.tag) {
                case "car":
                    mode = {
                        comp: {
                            tag: "go",
                            value: mode.stack.cdr
                        },
                        stack: {
                            prev: mode.stack,
                            tag: "cdr",
                            env: mode.stack.env,
                            car: mode.comp.value
                        }
                    }
                break;

                case "cdr":
                    mode = {
                        comp: {
                            tag: "value",
                            value: ""
                        },
                        stack: mode.stack.prev
                    }
                break;
            }
        break;
    }

    console.log(mode);

    while (mode.comp.tag === "go") {
        throw("done");
    }

}

module.exports = Machine;