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
	foo = __webpack_require__(3);

	var machine = new Machine(foo);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Machine = function Machine(f) {

	    var mode = {
	        stack: null,
	        tag: "go",
	        data: 0
	    }

	    while (mode.tag === "go") {

	        mode = f[mode.data](mode.stack);

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
	                    }
	                    break;
	                case ("throw"):
	                    if (mode.stack.tag === "catch") {
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
	            }
	        }
	    }

	    console.log(mode.data);

	    this.printStack = function () {
	        // TODO
	    }
	}


	module.exports = Machine;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	var ProgramFoo3 = [];

	ProgramFoo3[1] = function (s) {
	    return {
	        stack: {
	            prev: s,
	            tag: "left",
	            data: 2
	        },
	        tag: "num",
	        data: 3
	    }
	};
	ProgramFoo3[2] = function (s) {
	    return {
	        stack: s,
	        tag: "num",
	        data: 5
	    }
	};
	ProgramFoo3[0] = function (s) {
	    return {
	        stack: {
	            prev: s,
	            tag: "catch",
	            i: 0,
	            data: 1
	        },
	        tag: "num",
	        data: 2
	    }
	};



	module.exports = ProgramFoo3;

/***/ }
/******/ ]);