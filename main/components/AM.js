var Machine = function Machine(f){
    var mode = {
        stack : null,
        tag : "go",
        data : f
    }

    while (mode.tag === "go"){
        mode = mode.data(mode.stack);
            while(mode.tag != "go" && mode.stack != null){
                switch(mode.tag) {
                    case ("num"):
                        switch(mode.stack.tag) {
                            case "left":
                                mode = {
                                    stack :  {
                                        prev : mode.stack.prev,
                                        tag : "right",
                                        data : mode.data
                                    },
                                    tag : "go",
                                    data : mode.stack.data 
                                }
                            break;
                            case "right":
                                mode = {
                                    stack : mode.stack.prev,
                                    tag : "num",
                                    data : mode.stack.data + mode.data
                                }
                            break;
                        }
                    break;
                }
            }
        }

        console.log(mode.data);
    }


module.exports = Machine;