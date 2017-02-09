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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Machine = __webpack_require__(1);
	foo = __webpack_require__(4);
	gen = __webpack_require__(3);

	var machine = new Machine(gen);

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	                            if (mode.stack.i === 1) {
	                                mode.stack = mode.stack.prev;
	                            } else {
	                                mode = {
	                                    stack: {
	                                        prev: mode.stack.prev,
	                                        tag: "catch",
	                                        data: mode.data,
	                                        i: 1
	                                    },
	                                    tag: "go",
	                                    data: mode.stack.data
	                                }
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

	                                saveStack(mode);
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
	                                mode = restoreStack(mode);

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
	                    if (mode.stack.tag === "catch" && mode.stack.i != 0) {
	                        mode = {
	                            stack: null,
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
	    console.log(mode.data);

	    this.printStack = function () {
	        // TODO
	    }
	}


	var save = {
	    prev: null,
	    tag: null,
	    data: null
	}

	var saveStack = function (m) {
	    save = {
	        prev: save,
	        tag: m.tag,
	        data: m.data
	    }
	}

	var restoreStack = function (m) {
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

	    save = { // reinitialize save
	        prev: null,
	        tag: null,
	        data: null
	    }
	    return stack
	}

	module.exports = Machine;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);