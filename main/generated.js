var test_num = [];
test_num[0] = function (s) {
    return {
        stack: s,
        tag: "get",
        data: "variable"
    }
};
test_num[1] = function (s) {
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
test_num[2] = function (s) {
    return {
        stack: {
            prev: s,
            tag: "WithRef",
            data: 1,
            i: 0,
            name: "variable"
        },
        tag: "num",
        data: 2
    }
};
module.exports = test_num;