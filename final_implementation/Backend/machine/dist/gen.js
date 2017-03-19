var operator = [];
var prog = [];
operator[0] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
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
                    value: {
                        tag: "operator",
                        operator: 1,
                        env: []
                    }
                }
            }
        } catch (err) {
            throw ("undefined function")
        }
    }
}
operator[1] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            if (args[0].tag !== "value") {
                throw ("no match");
            };
            if (args[0].value.tag !== "int") {
                throw ("no match");
            };
            if (args[0].value.int !== 0) {
                throw ("no match");
            };
            return {
                stack: stk,
                comp: {
                    tag: "value",
                    value: {
                        tag: "int",
                        int: 0
                    }
                }
            }
        } catch (err) {
            try {
                if (args[0].tag !== "value") {
                    throw ("no match");
                };
                if (args[0].value.tag !== "int") {
                    throw ("no match");
                };
                if (args[0].value.int !== 1) {
                    throw ("no match");
                };
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
                try {
                    if (args[0].tag !== "value") {
                        throw ("no match");
                    };
                    if (args[0].value.tag !== "int") {
                        throw ("no match");
                    };
                    if (args[0].value.int !== 2) {
                        throw ("no match");
                    };
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
                    try {
                        if (args[0].tag !== "value") {
                            throw ("no match");
                        };
                        env[0] = args[0].value;
                        return {
                            stack: {
                                prev: stk,
                                frame: {
                                    tag: "fun",
                                    env: env,
                                    args: {
                                        head: 4,
                                        tail: {
                                            head: 8,
                                            tail: null
                                        }
                                    }
                                }
                            },
                            comp: {
                                tag: "value",
                                value: {
                                    tag: "operator",
                                    operator: 7,
                                    env: []
                                }
                            }
                        }
                    } catch (err) {
                        throw ("undefined function")
                    }
                }
            }
        }
    }
}
operator[2] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            if (args[0].tag !== "value") {
                throw ("no match");
            };
            if (args[0].value.tag !== "int") {
                throw ("no match");
            };
            if (args[0].value.int !== 0) {
                throw ("no match");
            };
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "fun",
                        env: env,
                        args: {
                            head: 9,
                            tail: {
                                head: 10,
                                tail: null
                            }
                        }
                    }
                },
                comp: {
                    tag: "value",
                    value: {
                        tag: "operator",
                        operator: 8,
                        env: []
                    }
                }
            }
        } catch (err) {
            try {
                if (args[0].tag !== "value") {
                    throw ("no match");
                };
                env[0] = args[0].value;
                return {
                    stack: stk,
                    comp: {
                        tag: "value",
                        value: {
                            tag: "int",
                            int: 0
                        }
                    }
                }
            } catch (err) {
                throw ("undefined function")
            }
        }
    }
}
operator[3] = {
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
                            head: 11,
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
operator[4] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 12
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
operator[5] = {
    interface: null,
    implementation: function (stk, env, args) {
        try {
            return {
                stack: {
                    prev: stk,
                    frame: {
                        tag: "car",
                        env: env,
                        cdr: 13
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
                        tag: "car",
                        env: env,
                        cdr: 16
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
operator[7] = {
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
                            head: 17,
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
operator[8] = {
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
                            head: 18,
                            tail: {
                                head: 19,
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
            value: {
                tag: "int",
                int: 5
            }
        }
    }
};
prog[1] = function (stk, env) {
    return {
        stack: stk,
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
            value: {
                tag: "int",
                int: 1
            }
        }
    }
};
prog[3] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "fun",
                env: env,
                args: {
                    head: 1,
                    tail: {
                        head: 2,
                        tail: null
                    }
                }
            }
        },
        comp: {
            tag: "value",
            value: {
                tag: "operator",
                operator: 8,
                env: []
            }
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
                    head: 3,
                    tail: null
                }
            }
        },
        comp: {
            tag: "value",
            value: {
                tag: "operator",
                operator: 1,
                env: []
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
                tag: "int",
                int: 2
            }
        }
    }
};
prog[7] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "fun",
                env: env,
                args: {
                    head: 5,
                    tail: {
                        head: 6,
                        tail: null
                    }
                }
            }
        },
        comp: {
            tag: "value",
            value: {
                tag: "operator",
                operator: 8,
                env: []
            }
        }
    }
};
prog[8] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "fun",
                env: env,
                args: {
                    head: 7,
                    tail: null
                }
            }
        },
        comp: {
            tag: "value",
            value: {
                tag: "operator",
                operator: 1,
                env: []
            }
        }
    }
};
prog[9] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: {
                tag: "int",
                int: 0
            }
        }
    }
};
prog[10] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: {
                tag: "int",
                int: 2
            }
        }
    }
};
prog[11] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
prog[12] = function (stk, env) {
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
prog[13] = function (stk, env) {
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
prog[14] = function (stk, env) {
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
prog[15] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 14
            }
        },
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[16] = function (stk, env) {
    return {
        stack: {
            prev: stk,
            frame: {
                tag: "car",
                env: env,
                cdr: 15
            }
        },
        comp: {
            tag: "value",
            value: env[0]
        }
    }
};
prog[17] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[18] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
prog[19] = function (stk, env) {
    return {
        stack: stk,
        comp: {
            tag: "value",
            value: env[1]
        }
    }
};
module.exports = [prog, operator];