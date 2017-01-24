// 2 + 3
var ProgramFoo = function (s){

    this.foo0 = function (s) {
        return {
            stack : s,
            tag:  "num",
            data: 3 
        }
    }

    return {
            stack : {
                prev : s,
                tag : "left",
                data : this.foo0 //function
            },
            tag : "num",
            data : 2
    }
    
}

module.exports = ProgramFoo; 