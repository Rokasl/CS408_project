/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

s = __webpack_require__(4);
printer = __webpack_require__(3);
var saver = new s();

var Machine = function Machine(f) {

    var save = [];
    var mode = {
        stack: null,
        tag: "go",
        data: f.length - 1
    }

    while (mode.tag === "go") {
        mode = f[mode.data](mode.stack);
        console.log(mode);

        while (mode.tag != "go" && mode.stack != null) {
            switch (mode.tag) {
                case ("num"):
                    switch (mode.stack.tag) {
                        case "left":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: "right",
                                    data: mode.data
                                },
                                tag: "go",
                                data: mode.stack.data
                            }
                            break;
                        case "right":
                            mode = {
                                stack: mode.stack.prev,
                                tag: "num",
                                data: mode.stack.data + mode.data
                            }
                            break;
                        case "catch":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: "catcher",
                                    data: mode.data,
                                },
                                tag: "go",
                                data: mode.stack.data
                            }

                            break;

                        case ":>left":
                            mode = {
                                stack: {
                                    prev: mode.stack.prev,
                                    tag: ":>right",
                                    data: mode.data
                                },
                                tag: "go",
                                data: mode.stack.data
                            }
                            break;
                        case ":>right":
                            mode = {
                                stack: mode.stack.prev,
                                tag: "num",
                                data: mode.data
                            }

                            break;



                        case "WithRef":
                            if (mode.stack.i === 1) {
                                mode.stack = mode.stack.prev;
                            } else {
                                mode = {
                                    stack: {
                                        prev: mode.stack.prev,
                                        tag: "WithRef",
                                        data: mode.data,
                                        name: mode.stack.name,
                                        i: 1
                                    },
                                    tag: "go",
                                    data: mode.stack.data
                                }
                            }
                            break;

                        case ":=":
                            m = mode;
                            mode = mode.stack.prev;
                            found = false;

                            while (mode != null) {
                                if (mode.tag === "WithRef" && mode.name === m.stack.name) {
                                    mode.data = m.data;
                                    found = true;
                                    break;
                                }

                                saver.saveStack(mode);
                                mode = mode.prev;

                            }


                            if (!found) { // variable not defined
                                mode = { // throw exception!
                                    stack: m.stack.prev,
                                    tag: "throw",
                                    data: "Exception: Undifined expression: " + m.stack.name
                                }
                            } else {

                                // everything is okay, restore stack & continue!
                                mode = saver.restoreStack(mode);

                                if (mode.data != null) {

                                    mode = {
                                        stack: mode,
                                        tag: "go",
                                        data: mode.data
                                    }
                                } else { // just halt, no further instructions
                                    mode = {
                                        stack: mode,
                                        tag: "halt",
                                        data: m.data
                                    }
                                }
                            }

                            break;

                    }
                    break;
                case ("throw"):
                    if (mode.stack.tag === "catcher") {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "num",
                            data: mode.stack.data
                        }
                    } else {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "throw",
                            data: "Unhandled exception!"
                        }
                    }
                    break;
                case ("get"):
                    save.push(mode);
                    if (mode.stack.tag === "WithRef" && mode.data === mode.stack.name) {
                        mode = {
                            stack: save[0].stack, //get back full stack
                            tag: "num",
                            data: mode.stack.data
                        }
                        save = [];
                    } else if (mode.stack.prev != null) {
                        mode = {
                            stack: mode.stack.prev,
                            tag: "get",
                            data: mode.data
                        }
                    } else {
                        mode = { // throw exception!
                            stack: null,
                            tag: "throw",
                            data: "Exception: Undifined expression: " + mode.data
                        }
                    }
                    break;

            }
        }
    }
    console.log("----END----");
    printer(mode);
    // just for node testing
    console.log(mode.data);
}


module.exports = Machine;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
            name : "variablez",
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var test_withref_get_set_next= [];
test_withref_get_set_next[0] = function(s){return{stack:s, tag:"num", data:30}};
test_withref_get_set_next[1] = function(s){return{stack:{prev:s, tag:"left", data:0}, tag:"get", data:"x"}};
test_withref_get_set_next[2] = function(s){return{stack:s, tag:"num", data:11}};
test_withref_get_set_next[3] = function(s){return{stack:{prev:{prev:{prev:s, tag:":>left", data:1}, tag:":=",name:"x"}, tag:"left", data:2}, tag:"get", data:"x"}};
test_withref_get_set_next[4] = function(s){return{stack:{prev:s, tag:"WithRef", data:3,i:0,name:"x"}, tag:"num", data:22}};
module.exports = test_withref_get_set_next;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var printStack = function (stack) {
    // pretty printer
    while (stack != null) {
        console.log('Data: ', stack.data,' Tag: ', stack.tag);
        console.log('-----------------');
        stack = stack.prev;
    }
    console.log('That\'s all folks!')
}

module.exports = printStack;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// Early version of stack saver, which saves states of the stack while going deeper
//      and has an ability to restore it to the start state, while keeping all the
//          changes.         

var saver = function () {
    var save = {
        prev: null,
        tag: null,
        data: null
    }

    this.saveStack = function (m) {
        save = {
            prev: save,
            tag: m.tag,
            data: m.data
        }
    }

    this.restoreStack = function (m) {
        var stack;
        // var stack = {
        //     prev: null,
        //     tag: null,
        //     data: null
        // };
        while (save.prev != null) {

            stack = {
                prev: m,
                tag: save.tag,
                data: save.data,
            }
            save = save.prev;
        }
        this.destroySave();
        return stack
    }
    this.destroySave = function () {
        save = { // reinitialize save
            prev: null,
            tag: null,
            data: null
        }
    }
}

module.exports = saver;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Machine = __webpack_require__(0);
foo = __webpack_require__(1);
gen = __webpack_require__(2);

var machine = new Machine(gen);

/***/ })
/******/ ]);