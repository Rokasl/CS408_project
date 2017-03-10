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

	    var mode = operators[0](null, argz); // main operator 0 for now

	    console.log(mode);

	    while (mode.stack != null) {
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
	        return {
	            stack: {
	                prev: stk,
	                frame: {
	                    tag: "car",
	                    env: env,
	                    cdr: 0
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
	module.exports = [prog, operator];

/***/ }
/******/ ]);