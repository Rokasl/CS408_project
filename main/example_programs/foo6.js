var ProgramFoo6 = [];

ProgramFoo6[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "num",
        data: 3
    }
};
ProgramFoo6[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 5
    }
};
ProgramFoo6[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: ":>",
            data: 1,
            i:0
        },
        tag: "num",
        data: 2
    }
};



module.exports = ProgramFoo6;