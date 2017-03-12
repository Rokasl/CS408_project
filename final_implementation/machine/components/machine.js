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

    argz[2] = {
        tag: "value",
        value: {
            tag: "atom",
            atom: "z"
        }
    };


    var mode = operators[0](null, argz); // main operator 0 for now

    console.log(mode);

    var tempcount = 0;
    while (mode.stack != null && tempcount < 10) {
        tempcount++;


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
                    case "fun":
                        mode = resumptions[mode.stack.frame.args.head](
                            stack = {
                                prev: mode.stack.prev,
                                frame: {
                                    tag: "arg",
                                    fun: mode.comp.value,
                                    env: mode.stack.frame.env,
                                    ready: [],
                                    waiting: mode.stack.frame.args.tail
                                    // handler stuff 
                                },
                            }, mode.stack.frame.env);
                        break;

                    case "arg":
                        if (mode.stack.frame.waiting != null) {

                            mode = resumptions[mode.stack.frame.waiting.head](
                                stack = {
                                    prev: mode.stack.prev,
                                    frame: {
                                        tag: "arg",
                                        fun: mode.stack.frame.fun,
                                        env: mode.stack.frame.env,
                                        ready: mode.stack.frame.ready.concat([mode.comp.value]),
                                        waiting: mode.stack.frame.waiting.tail
                                        // handler stuff 
                                    },
                                }, mode.stack.frame.env);

                        } else {
                            mode.stack.frame.ready = mode.stack.frame.ready.concat([mode.comp.value]);   
                            console.log(mode);

                            
                            // DONE , now apply the function,  reverse the ready list an apply the function?
                            // how to identify which operator is main?
                            
                           break; // temp 
                        }
                        break;
                }
                break;
        }
    }

    console.log(mode);

}

module.exports = Machine;