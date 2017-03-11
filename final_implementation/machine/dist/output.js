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

	    // temp args for testing
	    var argz = [];

	    argz[0] = {
	        tag: "value",
	        value: {
	            tag: "atom",
	            atom: "x"
	        }
	    };

	    argz[1] = {
	        tag: "value",
	        value: {
	            tag: "atom",
	            atom: "y"
	        }
	    };

	    argz[2] = {
	        tag: "value",
	        value: {
	            tag: "atom",
	            atom: "z"
	        }
	    };

	    var mode = operators[0](null, argz); // main operator 0 for now

	    console.log(mode);

	    var tempcount = 0;
	    while (mode.stack != null && tempcount < 10) {
	        tempcount++;


	        switch (mode.comp.tag) {
	            case "value":
	                switch (mode.stack.frame.tag) {
	                    case "car": // call a resumption imeditaly 
	                        mode = resumptions[mode.stack.frame.cdr](
	                            stack = {
	                                prev: mode.stack.prev,
	                                frame: {
	                                    tag: "cdr",
	                                    car: mode.comp.value
	                                },
	                            }, mode.stack.frame.env);
	                        break;

	                    case "cdr":
	                        mode = {
	                            comp: {
	                                tag: "value",
	                                value: {
	                                    tag: "pair",
	                                    car: mode.stack.frame.car,
	                                    cdr: mode.comp.value
	                                }
	                            },
	                            stack: mode.stack.prev
	                        }
	                        break;
	                    case "fun":
	                        mode = resumptions[mode.stack.frame.args.head](
	                            stack = {
	                                prev: mode.stack.prev,
	                                frame: {
	                                    tag: "arg",
	                                    fun: mode.comp.value,
	                                    env: mode.stack.frame.env,
	                                    ready: [],
	                                    waiting: mode.stack.frame.args.tail
	                                    // handler stuff 
	                                },
	                            }, mode.stack.frame.env);
	                        break;

	                    case "arg":
	                        if (mode.stack.frame.waiting != null) {

	                            mode = resumptions[mode.stack.frame.waiting.head](
	                                stack = {
	                                    prev: mode.stack.prev,
	                                    frame: {
	                                        tag: "arg",
	                                        fun: mode.stack.frame.fun,
	                                        env: mode.stack.frame.env,
	                                        ready: mode.stack.frame.ready.concat([mode.comp.value]),
	                                        waiting: mode.stack.frame.waiting.tail
	                                        // handler stuff 
	                                    },
	                                }, mode.stack.frame.env);

	                        } else {
	                            mode.stack.frame.ready = mode.stack.frame.ready.concat([mode.comp.value]);   
	                            console.log(mode);

	                            
	                            // DONE , now apply the function
	                            throw "todo";
	                        }
	                        break;
	                }
	                break;
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
	        if (args[2].tag !== "value") {
	            throw ("no match");
	        };
	        env[2] = args[2].value;
	        return {
	            stack: {
	                prev: stk,
	                frame: {
	                    tag: "fun",
	                    env: env,
	                    args: {
	                        head: 0,
	                        tail: {
	                            head: 1,
	                            tail: null
	                        }
	                    }
	                }
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
	prog[1] = function (stk, env) {
	    return {
	        stack: stk,
	        comp: {
	            tag: "value",
	            value: env[2]
	        }
	    }
	};
	module.exports = [prog, operator];

/***/ }
/******/ ]);