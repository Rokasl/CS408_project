var Machine = function Machine(resumptions, operators) {

    // temp args for testing
    var argz = [];

    argz[0] = {
        tag: "value",
        value: {
            tag: "atom",
            atom: "x"
        }
    };

    argz[1] = {
        tag: "value",
        value: {
            tag: "atom",
            atom: "y"
        }
    };

    var mode = operators[0](null, argz); // main operator 0 for now

    console.log(mode);

    while (mode.stack != null) {
        switch (mode.comp.tag) {
            case "value":
                switch (mode.stack.frame.tag) {
                    case "car": // call a resumption imeditaly 
                        mode = resumptions[mode.stack.frame.cdr](
                            stack = {
                                prev: mode.stack.prev,
                                frame: {
                                    tag: "cdr",
                                    car: mode.comp.value
                                },
                            }, mode.stack.frame.env);
                        break;

                    case "cdr":
                        mode = {
                            comp: {
                                tag: "value",
                                value: {
                                    tag: "pair",
                                    car: mode.stack.frame.car,
                                    cdr: mode.comp.value
                                }
                            },
                            stack: mode.stack.prev
                        }
                        break;
                }
                break;
        }
    }

    console.log(mode);

}

module.exports = Machine;