var test_WithRef = [];
test_WithRef[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 30
    }
};
test_WithRef[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "get",
        data: "x"
    }
};
test_WithRef[2] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 11
    }
};
test_WithRef[3] = function (s) {
    return {
        stack: {
            prev: {
                prev: {
                    prev: s,
                    tag: ":>left",
                    data: 1
                },
                tag: ":=",
                name: "x"
            },
            tag: "left",
            data: 2
        },
        tag: "get",
        data: "x"
    }
};
test_WithRef[4] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "WithRef",
            data: 3,
            i: 0,
            name: "x"
        },
        tag: "num",
        data: 22
    }
};
module.exports = test_WithRef;