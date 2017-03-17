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
        switch (fun.tag) {
            case ("local"):
                return fun.operator.implementation(stk, fun.env, args)
                break;
            case ("operator"):
                return operators[fun.operator].implementation(stk, fun.env, args);
                break;
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



    var mode = operators[0].implementation(null, [], []); // starting mode first found operator with no args

    console.log(mode);

    var tempcount = 0;
    while (mode.stack != null && tempcount < 500) {
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
                            mode = apply(mode.stack.prev, mode.comp.value, []);
                        } else {
                            var intf = interfaceF(mode.comp.value);
                            mode = resumptions[mode.stack.frame.args.head]({
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
                            mode.stack.prev,
                            mode.stack.frame.fun,
                            ready,
                            mode.stack.frame.env,
                            mode.stack.frame.waiting,
                            mode.stack.frame.waitingHandles
                        );
                        break;
                }
                break;

            case ("command"):
                var found = false;
                if (mode.stack.frame.tag === "arg") {

                    for (var i = 0; i < mode.stack.frame.handles.length; i++) {
                        if (mode.stack.frame.handles[i] === mode.comp.command) {
                            found = true;
                            ready = mode.stack.frame.ready.concat([mode.comp]);
                            mode = argRight(
                                mode.stack.prev,
                                mode.stack.frame.fun,
                                ready,
                                mode.stack.frame.env,
                                mode.stack.frame.waiting,
                                mode.stack.frame.waitingHandles
                            );
                            break;
                        }
                    }

                }
                if (!found) {
                    mode.comp.callback = {
                        frame: mode.stack.frame,
                        callback: mode.comp.callback
                    }
                    mode.stack = mode.stack.prev
                }

                break;
        }
    }

    function argRight(stack, fun, ready, env, waiting, waitingHandles) {
        if (waiting != null) {
            var waitingH = tailHandles(waitingHandles);
            var h = headHandles(waitingHandles);
            mode = resumptions[waiting.head]({
                prev: stack,
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
            mode = apply(stack, fun, ready);
        }

        return mode;
    }

    console.log(mode);

    // needed for testing purposes
    console.log(prettyPrinter(mode.comp.value));

    function prettyPrinter(v) {
        return valString(v);

        function cdrString(v) {
            switch (v.tag) {
                case "pair":
                    return valString(v.car) + cdrString(v.cdr);
                case "atom":
                    if (v.atom === "") {
                        return " "
                    };
            }
            return "|" + valString(v);
        };

        function valString(v) {
            switch (v.tag) {
                case "atom":
                    if (v.atom === "cons") {
                        return ", "
                    }
                    if (v.atom === "nil") {return ""}
                    return " " + v.atom;
                case "int":
                    return " " + v.int
                    break;
                case "pair":
                    return valString(v.car) + cdrString(v.cdr);
            }
        };
    }

}

module.exports = Machine;