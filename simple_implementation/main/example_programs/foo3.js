var ProgramFoo3 = [];

ProgramFoo3[1] = function (s) {
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
ProgramFoo3[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 5
    }
};
ProgramFoo3[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "catch",
            i: 0,
            data: 1
        },
        tag: "num",
        data: 2
    }
};



module.exports = ProgramFoo3;