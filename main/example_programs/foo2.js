var ProgramFoo2 = [];

ProgramFoo2[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 2
        },
        tag: "num",
        data: 3
    }
};
ProgramFoo2[2] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 5
    }
};
ProgramFoo2[0] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 1
        },
        tag: "num",
        data: 2
    }
};



module.exports = ProgramFoo2;