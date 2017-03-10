var operator = [];
var prog = [];
operator[0] = function (stk, args) {
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
        return {
            stack: {
                prev: stk,
                frame: {
                    tag: "car",
                    env: env,
                    cdr: 0
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
module.exports = [prog, operator];