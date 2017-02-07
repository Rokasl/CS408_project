var prog = [];
prog[0] = function (s) {
    return {
        stack: s,
        tag: "throw",
        data: " Unhandled exception!"
    }
};
prog[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "num",
        data: 4
    }
};
prog[2] = function (s) {
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
prog[3] = function (s) {
    return {
        stack: s,
        tag: "throw",
        data: " Unhandled exception!"
    }
};
prog[4] = function (s) {
    return {
        stack: {
            prev: {
                prev: s,
                tag: "catch",
                data: 2,
                i: 0
            },
            tag: "left",
            data: 3
        },
        tag: "num",
        data: 100
    }
};
module.exports = prog;