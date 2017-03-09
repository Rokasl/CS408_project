var Machine = function Machine(resumptions, operators) {

    var mode = {
        comp: {
            tag: "go",
            value: 0
        },
        stack: null
    }



    var argz = [];

    argz[0] = {
        tag: "value",
        value: "x"
    };

    argz[1] = {
        tag: "value",
        value: "y"
    };

    var i = 0;
    var count = 0;

    while (mode.comp.tag == "go" && count < 10) {
        count++;
        console.log(mode);

        if (i === 0) {
            mode = operators[0](null, argz);
            i++;
        } else {
            mode = resumptions[mode.comp.value](mode.stack, mode.stack.env);
        }

        console.log(mode);
        while (mode.comp.tag != "go" && mode.stack != null) {
            switch (mode.comp.tag) {
                case "value":
                    switch (mode.stack.tag) {
                        case "car":
                            mode = {
                                comp: {
                                    tag: "go",
                                    value: mode.stack.cdr
                                },
                                stack: {
                                    prev: mode.stack.prev,
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
                                    value: mode.comp.value
                                },
                                stack: mode.stack.prev
                            }
                            break;
                    }
                    break;
            }
        }
    }


    console.log(mode);

}

module.exports = Machine;