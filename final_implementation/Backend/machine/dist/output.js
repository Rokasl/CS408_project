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

	    function interfaceF(val) {
	        if (val.tag === "operator") {
	            return operators[val.operator].interface;
	        }
	        return null;
	    }

	    function headHandles(intf) {
	        if (intf != null) {
	            return intf.head;
	        }
	        return [];
	    }

	    function tailHandles(intf) {
	        if (intf != null) {
	            return intf.tail;
	        }
	        return null;
	    }


	    function apply(stk, fun, args) { //returns a mode
	        if (fun.tag === "operator") {
	            return operators[fun.operator].implementation(stk, args);
	        }


	        switch (fun.tag) {
	            case ("atom"):
	                // update args to vargs
	                var vargs = [];
	                for (var i = 0; i < args.length; i++) {
	                    vargs.push(args[i].value);
	                }
	                return {
	                    stack: stk,
	                    comp: {
	                        tag: "command",
	                        command: fun.atom,
	                        args: vargs,
	                        callback: null
	                    }
	                }
	                break;
	            case ("thunk"): 
	                return {
	                    stack: stk,
	                    comp: fun.thunk
	                }
	                break;
	            case ("callback"):
	                var stack = stk;
	                var cbk = fun.callback;

	                while (cbk !== null) {
	                    stack = {
	                        prev: stack,
	                        frame: cbk.frame
	                    }
	                    cbk = cbk.callback;
	                }

	                return {
	                    stack: stack,
	                    comp: args[0]
	                }
	                break;
	        }

	        throw ("Something is missing...")
	    }



	    var mode = operators[0].implementation(null, []); // starting mode first found operator with no args

	    console.log(mode);

	    var tempcount = 0;
	    while (mode.stack != null && tempcount < 50) {
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
	                        if (mode.stack.frame.args === null) { //ready to go
	                            mode = apply(mode.stack.prev, mode.comp.value, null);
	                        } else {
	                            var intf = interfaceF(mode.comp.value);
	                            mode = resumptions[mode.stack.frame.args.head](
	                                stack = {
	                                    prev: mode.stack.prev,
	                                    frame: {
	                                        tag: "arg",
	                                        fun: mode.comp.value,
	                                        env: mode.stack.frame.env,
	                                        ready: [],
	                                        waiting: mode.stack.frame.args.tail,
	                                        handles: headHandles(intf),
	                                        waitingHandles: tailHandles(intf)
	                                    },
	                                }, mode.stack.frame.env);
	                        }
	                        break;

	                    case "arg":
	                        var ready = mode.stack.frame.ready.concat([mode.comp]);
	                        mode = argRight(
	                            mode.stack,
	                            mode.stack.frame.fun,
	                            ready,
	                            mode.stack.frame.env,
	                            mode.stack.frame.waiting,
	                            mode.stack.frame.waitingHandles
	                        );


	                        break;
	                }
	                break;

	            case ("command"):
	                if (mode.stack.frame.tag === "arg") {
	                    for (var i = 0; i < mode.stack.frame.handles.length; i++) {
	                        if (mode.stack.frame.handles[i] === mode.comp.command) {
	                            ready = mode.stack.frame.ready.concat([mode.comp]);
	                            mode = argRight(
	                                mode.stack,
	                                mode.stack.frame.fun,
	                                ready,
	                                mode.stack.frame.env,
	                                mode.stack.frame.waiting,
	                                mode.stack.frame.waitingHandles
	                            );
	                        }
	                    }
	                } else {
	                    mode.comp.callback = {
	                        frame: mode.stack.frame,
	                        callback: mode.comp.callback
	                    }
	                    mode.stack = mode.stack.prev
	                }

	                break;
	        }
	    }

	    console.log(mode);

	    function argRight(stack, fun, ready, env, waiting, waitingHandles) {
	        if (waiting != null) {
	            var waitingH = tailHandles(waitingHandles);
	            var h = headHandles(waitingHandles);
	            mode = resumptions[waiting.head](
	                stack = {
	                    prev: stack.prev,
	                    frame: {
	                        tag: "arg",
	                        fun: fun,
	                        env: env,
	                        ready: ready,
	                        waiting: waiting.tail,
	                        handles: h,
	                        waitingHandles: waitingH
	                    },
	                }, env);
	        } else { // ready to apply the fucntion
	            mode = apply(stack.prev, fun, ready);
	        }

	        return mode;
	    }

	}

	module.exports = Machine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var operator = [];
	var prog = [];
	operator[0]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:3, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[1]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	if (args[0].value.tag!=="pair") {throw("no match");};
	if (args[0].value.car.tag!=="atom") {throw("no match");};
	if (args[0].value.car.atom!=="zero") {throw("no match");};
	if (args[0].value.cdr.tag!=="atom") {throw("no match");};
	if (args[0].value.cdr.atom!=="") {throw("no match");};
	if (args[1].tag!=="value") {throw("no match");};
	env[0]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[0]}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	if (args[0].value.tag!=="pair") {throw("no match");};
	if (args[0].value.car.tag!=="atom") {throw("no match");};
	if (args[0].value.car.atom!=="suc") {throw("no match");};
	if (args[0].value.cdr.tag!=="pair") {throw("no match");};
	env[0]=args[0].value.cdr.car;
	if (args[0].value.cdr.cdr.tag!=="atom") {throw("no match");};
	if (args[0].value.cdr.cdr.atom!=="") {throw("no match");};
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:6, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}
	} catch (err) {throw("undefined function")}}
	}};
	operator[2]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:7, tail: null}}}, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}};
	operator[3]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:9}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[4]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:10}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[5]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:11}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[6]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:12}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[7]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:15}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[8]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:16}}, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}};
	prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}};
	prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
	prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}};
	prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:2, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
	prog[4] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[5] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
	prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:5, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}};
	prog[7] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[8] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:8}}, comp:{tag:"value", value:env[0]}}};
	prog[10] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[12] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[13] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[14] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:13}}, comp:{tag:"value", value:env[1]}}};
	prog[15] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:14}}, comp:{tag:"value", value:env[0]}}};
	prog[16] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	module.exports = [prog, operator];


/***/ }
/******/ ]);