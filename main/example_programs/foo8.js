var ProgramFoo8 = [];

ProgramFoo8[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 1
        },
        tag: "num",
        data: 10
    }
};


ProgramFoo8[1] = function (s) {
    return {
        stack: {
            prev: s,
            name : "variable",
            tag: ":=",
            data: 0, 
            i: 0
        },
        tag: "num",
        data: 1000000
    }
};


ProgramFoo8[0] = function (s) {
    return {
        stack: s,
        tag: "get",
        data: "variable"
    }
};
ProgramFoo8[3] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "WithRef",
            name: "variable",
            data: 2,
            i:0
        },
        tag: "num",
        data: 12
    }
};



module.exports = ProgramFoo8;