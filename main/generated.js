var test_withref_get_set_next = [];
test_withref_get_set_next[0] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 30
    }
};
test_withref_get_set_next[1] = function (s) {
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
test_withref_get_set_next[2] = function (s) {
    return {
        stack: s,
        tag: "num",
        data: 11
    }
};
test_withref_get_set_next[3] = function (s) {
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
test_withref_get_set_next[4] = function (s) {
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
module.exports = test_withref_get_set_next;