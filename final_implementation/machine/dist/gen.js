var operator = [];
var prog = [];
operator[0] = {
    interface: null,
    implementation: function (stk, args) {
        var env = [];
        try {
            if (args[0].tag !== "value") {
                throw ("no match");
            };
            env[0] = args[0].value;
            if (args[1].tag !== "value") {
                throw ("no match");
            };
            env[1] = args[1].value;
            if (args[2].tag != "value") {
                throw ("no match");
            };
            if (args[2].value.tag != "thunk") {
                throw ("no match");
            };
            if (args[2].value.thunk != "z") {
                throw ("no match");
            };
            env[2] = args[2].value;
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "fun",
                        env: env,
                        args: {
                            head: 0,
                            tail: {
                                head: 1,
                                tail: null
                            }
                        }
                    }
                },
                comp: {
                    tag: "value",
                    value: env[1]
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
};
prog[0] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
prog[1] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[2]
        }
    }
};
module.exports = [prog, operator];