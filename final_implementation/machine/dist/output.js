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
	gen = __webpack_require__(2);

	var machine = new Machine(gen[0], gen[1]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Machine = function Machine(resumptions, operators) {

	    var mode = {
	        comp: {
	            tag: "go",
	            value: 0
	        },
	        stack: null
	    }



	    var argz = [];

	    argz[0] = {
	        tag: "value",
	        value: "x"
	    };

	    argz[1] = {
	        tag: "value",
	        value: "y"
	    };

	    var i;
	    var count = 0;

	    for (var n = 0; n < operators.length; n++) {
	        i = true;
	        while (mode.comp.tag == "go" && count < 10) {
	            count++;
	            console.log(mode);

	            if (i) {
	                mode = operators[n](null, argz);
	                i = false;
	            } else {
	                mode = resumptions[mode.comp.value](mode.stack, mode.stack.env);
	            }

	            console.log(mode);
	            while (mode.comp.tag != "go" && mode.stack != null) {
	                switch (mode.comp.tag) {
	                    case "value":
	                        switch (mode.stack.tag) {
	                            case "car":
	                                mode = {
	                                    comp: {
	                                        tag: "go",
	                                        value: mode.stack.cdr
	                                    },
	                                    stack: {
	                                        prev: mode.stack.prev,
	                                        tag: "cdr",
	                                        env: mode.stack.env,
	                                        car: mode.comp.value
	                                    }
	                                }
	                                break;

	                            case "cdr":
	                                mode = {
	                                    comp: {
	                                        tag: "value",
	                                        value: mode.comp.value
	                                    },
	                                    stack: mode.stack.prev
	                                }
	                                break;
	                        }
	                        break;
	                }
	            }
	        }
	    }

	    console.log(mode);

	}

	module.exports = Machine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var operator = [];
	var prog = [];
	operator[0] = function (stk, args) {
	    var env = [];
	    try {
	        if (args[0].tag !== "value") {
	            throw ("no match");
	        };
	        env[0] = args[0].value;
	        if (args[1].tag !== "value") {
	            throw ("no match");
	        };
	        env[1] = args[1].value;
	        return {
	            stack: {
	                prev: stk,
	                tag: "car",
	                env: env,
	                cdr: 0
	            },
	            comp: {
	                tag: "value",
	                value: env[1]
	            }
	        }
	    } catch (err) {
	        throw ("undefined function")
	    }
	};
	prog[0] = function (stk, env) {
	    return {
	        stack: stk,
	        comp: {
	            tag: "value",
	            value: env[0]
	        }
	    }
	};
	module.exports = [prog, operator];

/***/ }
/******/ ]);