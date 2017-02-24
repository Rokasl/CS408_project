var ProgramFoo7 = [];

ProgramFoo7[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "num",
        data: 10
    }
};
ProgramFoo7[0] = function (s) {
    return {
        stack: s,
        tag: "get",
        data: "variable"
    }
};
ProgramFoo7[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "WithRef",
            name: "variable",
            data: 1,
            i:0
        },
        tag: "num",
        data: 12
    }
};



module.exports = ProgramFoo7;