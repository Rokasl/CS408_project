// 2 + 3 + 5
var ProgramFoo2 = function (s) {

    this.foo0 = function (s) {
        return {
            stack:  {
                prev: s,
                tag: "right",
                data: this.foo1
            },
            tag: "num",
            data: 3
        }
    }

    this.foo1 = function (s) {
        return {
            stack: s,
            tag: "num",
            data: 5
        }
    }

    return {
        stack: {
            prev: s,
            tag: "left",
            data: this.foo0 //function
        },
        tag: "num",
        data: 2
    }

}

module.exports = ProgramFoo2;