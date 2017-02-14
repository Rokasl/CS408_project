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
	gen = __webpack_require__(5);

	var machine = new Machine(gen);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	s = __webpack_require__(2);
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
	                            mode = {
	                                stack: {
	                                    prev: mode.stack.prev,
	                                    tag: "WithRefRight",
	                                    data: mode.data,
	                                    name: mode.stack.name,
	                                },
	                                tag: "go",
	                                data: mode.stack.data
	                            }
	                            break;

	                        case "WithRefRight":
	                            mode.stack = mode.stack.prev;
	                            break;

	                        case ":=":
	                            m = mode;
	                            mode = mode.stack.prev;
	                            found = false;

	                            while (mode != null) {
	                                if (mode.tag === "WithRefRight" && mode.name === m.stack.name) {
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
	                                if (mode.data != null && mode.tag != "WithRefRight") {
	                                    mode = {
	                                        stack: mode.prev,
	                                        tag: "go",
	                                        data: mode.data
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
	                    m = mode; // save the current stack
	                    mode = mode.stack;
	                    found = false;

	                    while (mode != null) {
	                        if (mode.tag === "WithRefRight" && mode.name === m.data) {
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
	                            data: "Exception: Undifined expression: " + m.data
	                        }
	                    } else { // everything is okay, restore stack & continue!
	                        mode = {
	                            stack: saver.restoreStack(mode), // get back full stack
	                            tag: "num",
	                            data: mode.data
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Early version of stack saver, which saves states of the stack while going deeper
	//      and has an ability to restore it to the start state, while keeping all the
	//          changes.         

	var saver = function () {
	    var save = null;
	    var restore = null;

	    this.saveStack = function (m) {
	        save = {
	            prev: save,
	            tag: m.tag,
	            data: m.data,
	            name: m.name
	        }
	    }

	    this.restoreHelper = function (m) {
	        restore = {
	            prev: restore,
	            tag: m.tag,
	            data: m.data,
	            name: m.name
	        }
	    }

	    this.restoreStack = function (m) {
	        this.saveStack(m);
	    
	        while (save != null) {
	            this.restoreHelper(save);
	            save = save.prev;
	        }
	        
	        stack = restore;
	        this.destroySave();
	        this.destroyRestore();
	        return stack;
	    }
	    this.destroySave = function () {
	        save = null;
	    }
	    this.destroyRestore = function () {
	        restore = null;
	    }
	}

	module.exports = saver;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	var test_withref_get_set_next= [];
	test_withref_get_set_next[0] = function(s){return{stack:s, tag:"num", data:30}};
	test_withref_get_set_next[1] = function(s){return{stack:{prev:s, tag:"left", data:0}, tag:"get", data:"x"}};
	test_withref_get_set_next[2] = function(s){return{stack:s, tag:"num", data:11}};
	test_withref_get_set_next[3] = function(s){return{stack:{prev:{prev:{prev:s, tag:":>left", data:1}, tag:":=",name:"x"}, tag:"left", data:2}, tag:"get", data:"x"}};
	test_withref_get_set_next[4] = function(s){return{stack:{prev:s, tag:"WithRef", data:3,i:0,name:"x"}, tag:"num", data:22}};
	module.exports = test_withref_get_set_next;

/***/ }
/******/ ]);