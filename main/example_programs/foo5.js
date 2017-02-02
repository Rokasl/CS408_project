var ProgramFoo5 = [];

ProgramFoo5[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 2
        },
        tag: "num",
        data: 33
    }
};

ProgramFoo5[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 3
        },
        tag: "num",
        data: 6
    }
};

ProgramFoo5[3] = function (s) {
    return {
        stack: s,
        tag: "get",
        data: "variable"
    }
};

ProgramFoo5[0] = function (s) {
    return {
        stack: {
            prev: s,
            name : "variable",
            tag: ":=",
            data: 1, 
            i: 0
        },
        tag: "num",
        data: 2
    }
}




module.exports = ProgramFoo5;