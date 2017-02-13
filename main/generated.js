var test_simple_withref = [];
test_simple_withref[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 3
    }
};
test_simple_withref[1] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "left",
            data: 0
        },
        tag: "num",
        data: 5
    }
};
test_simple_withref[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "WithRef",
            data: 1,
            i: 0,
            name: "x"
        },
        tag: "num",
        data: 2
    }
};
module.exports = test_simple_withref;