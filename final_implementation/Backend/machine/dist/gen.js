var operator = [];
var prog = [];
operator[0] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: stk,
                comp: {
                    tag: "value",
                    value: {
                        tag: "int",
                        int: 1
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[1] = {
    interface: {
        head: [], tail: null
    },
    implementation: function (stk, env, args) {
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
                        tag: "fun",
                        env: env,
                        args: {
                            head: 0,
                            tail: null
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
}
operator[2] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 1
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "atom",
                        atom: "unit"
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[3] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 2
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "atom",
                        atom: "nil"
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[4] = {
    interface: null,
    implementation: function (stk, env, args) {
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
                        cdr: 5
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "atom",
                        atom: "cons"
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[5] = {
    interface: null,
    implementation: function (stk, env, args) {
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
                        tag: "fun",
                        env: env,
                        args: {
                            head: 6,
                            tail: null
                        }
                    }
                },
                comp: {
                    tag: "value",
                    value: env[0]
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[6] = {
    interface: null,
    implementation: function (stk, env, args) {
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
                        tag: "fun",
                        env: env,
                        args: {
                            head: 7,
                            tail: {
                                head: 8,
                                tail: null
                            }
                        }
                    }
                },
                comp: {
                    tag: "value",
                    value: env[0]
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
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
            value: {
                tag: "atom",
                atom: ""
            }
        }
    }
};
prog[2] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: {
                tag: "atom",
                atom: ""
            }
        }
    }
};
prog[3] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: {
                tag: "atom",
                atom: ""
            }
        }
    }
};
prog[4] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 3
            }
        },
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[5] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 4
            }
        },
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
prog[6] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[7] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[8] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
module.exports = [prog, operator];