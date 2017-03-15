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
            return operators[fun.operator].implementation(stk, args);
        }


        switch (fun.tag) {
            case ("atom"):
                // update args to vargs
                var vargs = [];
                for (var i = 0; i < args.length; i++) {
                    vargs.push(args[i].value);
                }
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
            case ("thunk"): 
                return {
                    stack: stk,
                    comp: fun.thunk
                }
                break;
            case ("callback"):
                var stack = stk;
                var cbk = fun.callback;

                while (cbk !== null) {
                    stack = {
                        prev: stack,
                        frame: cbk.frame
                    }
                    cbk = cbk.callback;
                }

                return {
                    stack: stack,
                    comp: args[0]
                }
                break;
        }

        throw ("Something is missing...")
    }



    var mode = operators[0].implementation(null, []); // starting mode first found operator with no args

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
                            apply(mode.stack.prev, mode.comp.value, null);
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
                                        handles: headHandles(intf),
                                        waitingHandles: tailHandles(intf)
                                    },
                                }, mode.stack.frame.env);
                        }
                        break;

                    case "arg":
                        var ready = mode.stack.frame.ready.concat([mode.comp]);
                        mode = argRight(
                            mode.stack,
                            mode.stack.frame.fun,
                            ready,
                            mode.stack.env,
                            mode.stack.frame.waiting,
                            mode.stack.frame.waitingHandles
                        );


                        break;
                }
                break;

            case ("command"):

                if (mode.stack.frame.tag === "arg") {
                    for (var i = 0; i < mode.stack.frame.handles.length; i++) {
                        if (mode.stack.frame.handles[i] === mode.comp.command) {
                            ready = mode.stack.frame.ready.concat([mode.comp]);
                            mode = argRight(
                                mode.stack,
                                mode.stack.frame.fun,
                                ready,
                                mode.stack.env,
                                mode.stack.frame.waiting,
                                mode.stack.frame.waitingHandles
                            );
                        }
                    }
                } else {
                    mode.comp.callback = {
                        frame: mode.stack.frame,
                        callback: mode.comp.callback
                    }
                    mode.stack = mode.stack.prev
                }

                break;
        }
    }

    console.log(mode);

    function argRight(stack, fun, ready, env, waiting, waitingHandles) {

        if (waiting != null) {
            var waitingH = waitingHandles.tail;
            var h = waitingHandles.head;
            mode = resumptions[waiting.head](
                stack = {
                    prev: stack.prev,
                    frame: {
                        tag: "arg",
                        fun: fun,
                        env: env,
                        ready: ready,
                        waiting: waiting.tail,
                        handles: h,
                        waitingHandles: waitingH
                    },
                }, env);
        } else { // ready to apply the fucntion
            mode = apply(stack.prev, fun, ready);
        }

        return mode;
    }

}

module.exports = Machine;