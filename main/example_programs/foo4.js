var ProgramFoo4 = [];

ProgramFoo4[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "catch",
            i: 0,
            data: 1
        },
        tag: "num",
        data: 33
    }
};

ProgramFoo4[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "num",
        data: 6
    }
};

ProgramFoo4[0] = function (s) {
    return {
        stack: s,
        tag: "throw",
        data: 6
    }
};

ProgramFoo4[3] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 2
        },
        tag: "num",
        data: 2
    }
};


module.exports = ProgramFoo4;