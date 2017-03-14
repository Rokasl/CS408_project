var Machine = function Machine(resumptions, operators) {

    function interfaceF(val) {
        if (val.tag === "operator") {
            return operators[val.operator].interface;
        }
        return null;
    }

    function headHandles(intf) {
        if (intf != null) {
            return intf.head;
        }
        return [];
    }

    function tailHandles(intf) {
        if (intf != null) {
            return intf.tail;
        }
        return null;
    }


    function apply(stk, fun, args) { //returns a mode
        if (fun.tag === "operator") {
            return operators[fun.operator].implementation(stk, args); //stk prev maybe???
        }

        // update args to vargs
        var vargs = [];
        for (var i = 0; i < args.length; i++) {
            vargs.push(args[i].value);
        }

        switch (fun.tag) {
            case ("atom"):
                return { 
                    stack: stk,
                    comp: {
                        tag: "command",
                        command: fun.atom,
                        args: vargs,
                        callback: null
                    }
                }
                break;
            case ("thunk"): // like this?
                return {
                    stack:stk,
                    comp: fun.thunk
                }
            break;
            case ("callback"):
                return {
                    stack: {
                        prev: stk,
                        frame: fun.callback
                    },
                    comp : vargs[0]
                }
            break;
        }

        throw ("Something is missing...")
    }


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


    var mode = operators[0].implementation(null, argz); // main operator 0 for now

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
                        if (mode.stack.frame.args === null) { //ready to go
                            apply(mode.stack, mode.comp.value, null);
                        } else {
                            var intf = interfaceF(mode.comp.value);
                            mode = resumptions[mode.stack.frame.args.head](
                                stack = {
                                    prev: mode.stack.prev,
                                    frame: {
                                        tag: "arg",
                                        fun: mode.comp.value,
                                        env: mode.stack.frame.env,
                                        ready: [],
                                        waiting: mode.stack.frame.args.tail,
                                        handles: [headHandles(intf)],
                                        waitingHandles: tailHandles(intf)
                                    },
                                }, mode.stack.frame.env);
                        }
                        break;

                    case "arg":
                        var ready = mode.stack.frame.ready.concat([mode.comp]);

                        if (mode.stack.frame.waiting != null) {
                            var waitingH;
                            var h;
                            if (mode.stack.frame.waitingHandles != null) {
                                h = mode.stack.frame.handles.concat([mode.stack.frame.waitingHandles.head]);
                                waitingH = mode.stack.frame.waitingHandles.tail;
                            } else {
                                h = mode.stack.frame.handles;
                                waitingH = null;
                            }
                            mode = resumptions[mode.stack.frame.waiting.head](
                                stack = {
                                    prev: mode.stack.prev,
                                    frame: {
                                        tag: "arg",
                                        fun: mode.stack.frame.fun,
                                        env: mode.stack.frame.env,
                                        ready: ready,
                                        waiting: mode.stack.frame.waiting.tail,
                                        handles: h,
                                        waitingHandles: waitingH
                                    },
                                }, mode.stack.frame.env);
                        } else { // ready to apply the fucntion

                            mode.stack.frame.ready = ready;
                            // reverse ??? 

                            mode = apply(mode.stack, mode.stack.frame.fun, mode.stack.frame.ready);

                        }

                        break;
                }
                break;

            case ("command"):
                if (mode.stack != null) {
                    if (mode.stack.frame.tag === "arg") {
                        for (var i = 0; i < mode.stack.frame.handles; i++) {
                            if (mode.stack.frame.handles[i] === mode.comp.command) {
                                mode.stack.frame.ready = mode.stack.frame.ready.concat([mode.comp.commad]);

                                // like this?
                                throw ("not done");

                            }
                        }
                    } else {
                        mode.comp.callback = {
                            frame: mode.stack.frame,
                            callback: mode.comp.callback
                        }
                        mode.stack = mode.stack.prev
                    }
                }
                break;
        }
    }

    console.log(mode);

}

module.exports = Machine;