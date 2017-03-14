var operator = [];
var prog = [];
operator[0] = {
    interface: {
        head: [], tail: null
    },
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
            if (args[1].value.tag !== "pair") {
                throw ("no match");
            };
            if (args[1].value.car.tag !== "atom") {
                throw ("no match");
            };
            if (args[1].value.car.atom !== "nil") {
                throw ("no match");
            };
            if (args[1].value.cdr.tag !== "atom") {
                throw ("no match");
            };
            if (args[1].value.cdr.atom !== "") {
                throw ("no match");
            };
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "fun",
                        env: env,
                        args: null
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "operator",
                        operator: 4
                    }
                }
            }
        } catch (err) {
            try {
                if (args[0].tag !== "value") {
                    throw ("no match");
                };
                env[0] = args[0].value;
                if (args[1].tag !== "value") {
                    throw ("no match");
                };
                if (args[1].value.tag !== "pair") {
                    throw ("no match");
                };
                if (args[1].value.car.tag !== "atom") {
                    throw ("no match");
                };
                if (args[1].value.car.atom !== "cons") {
                    throw ("no match");
                };
                if (args[1].value.cdr.tag !== "pair") {
                    throw ("no match");
                };
                env[1] = args[1].value.cdr.car;
                if (args[1].value.cdr.cdr.tag !== "pair") {
                    throw ("no match");
                };
                env[2] = args[1].value.cdr.cdr.car;
                if (args[1].value.cdr.cdr.cdr.tag !== "atom") {
                    throw ("no match");
                };
                if (args[1].value.cdr.cdr.cdr.atom !== "") {
                    throw ("no match");
                };
                return {
                    stack: {
                        prev: stk,
                        frame: {
                            tag: "fun",
                            env: env,
                            args: {
                                head: 1,
                                tail: {
                                    head: 4,
                                    tail: null
                                }
                            }
                        }
                    },
                    comp: {
                        tag: "value",
                        value: {
                            tag: "operator",
                            operator: 5
                        }
                    }
                }
            } catch (err) {
                throw ("undefined function")
            }
        }
    }
};
operator[1] = {
    interface: null,
    implementation: function (stk, args) {
        var env = [];
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "fun",
                        env: env,
                        args: null
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "operator",
                        operator: 3
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
};
operator[2] = {
    interface: {
        head: [], tail: null
    },
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
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "fun",
                        env: env,
                        args: {
                            head: 5,
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
};
operator[3] = {
    interface: null,
    implementation: function (stk, args) {
        var env = [];
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 6
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
};
operator[4] = {
    interface: null,
    implementation: function (stk, args) {
        var env = [];
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 7
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
};
operator[5] = {
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
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 10
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
};
prog[0] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[1] = function (stk, env) {
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
            value: env[0]
        }
    }
};
prog[2] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
prog[3] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[2]
        }
    }
};
prog[4] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "fun",
                env: env,
                args: {
                    head: 2,
                    tail: {
                        head: 3,
                        tail: null
                    }
                }
            }
        },
        comp: {
            tag: "value",
            value: {
                tag: "operator",
                operator: 0
            }
        }
    }
};
prog[5] = function (stk, env) {
    return {
        stack: stk,
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
            value: {
                tag: "atom",
                atom: ""
            }
        }
    }
};
prog[7] = function (stk, env) {
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
prog[8] = function (stk, env) {
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
prog[9] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 8
            }
        },
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[10] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 9
            }
        },
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
module.exports = [prog, operator];