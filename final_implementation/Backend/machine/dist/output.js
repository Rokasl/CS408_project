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
	        switch (fun.tag) {
	            case ("operator"):
	                return operators[fun.operator].implementation(stk, args);
	                break;
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
	    while (mode.stack != null && tempcount < 500) {
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
	                            mode = apply(mode.stack.prev, mode.comp.value, []);
	                        } else {
	                            var intf = interfaceF(mode.comp.value);
	                            mode = resumptions[mode.stack.frame.args.head]({
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
	                            mode.stack.prev,
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
	                var found = false;
	                if (mode.stack.frame.tag === "arg") {

	                    for (var i = 0; i < mode.stack.frame.handles.length; i++) {
	                        if (mode.stack.frame.handles[i] === mode.comp.command) {
	                            found = true;
	                            ready = mode.stack.frame.ready.concat([mode.comp]);
	                            mode = argRight(
	                                mode.stack.prev,
	                                mode.stack.frame.fun,
	                                ready,
	                                mode.stack.frame.env,
	                                mode.stack.frame.waiting,
	                                mode.stack.frame.waitingHandles
	                            );
	                            break;
	                        }
	                    }

	                }
	                if (!found) {
	                    mode.comp.callback = {
	                        frame: mode.stack.frame,
	                        callback: mode.comp.callback
	                    }
	                    mode.stack = mode.stack.prev
	                }

	                break;
	        }
	    }

	    function argRight(stack, fun, ready, env, waiting, waitingHandles) {
	        if (waiting != null) {
	            var waitingH = tailHandles(waitingHandles);
	            var h = headHandles(waitingHandles);
	            mode = resumptions[waiting.head]({
	                prev: stack,
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
	            mode = apply(stack, fun, ready);
	        }

	        return mode;
	    }

	    console.log(prettyPrinter(mode.comp.value));


	    function prettyPrinter(comp) {

	        return valString(comp);


	        function cdrString(v) {
	            switch (v.tag) {
	                case "pair":
	                    return carString(v.car) + cdrString(v.cdr);
	                case "atom":
	                    if (v.atom === "") {
	                        return ""
	                    };
	                default:
	                    return "|" + carString(v);
	            }
	        };

	        function carString(v) {
	            switch (v.tag) {
	                case "atom":
	                    return " " + v.atom;
	                case "pair":
	                    return carString(v.car) + carString(v.cdr);
	            }
	        }

	        function valString(v) {
	            switch (v.tag) {
	                case "atom":
	                    return v.atom;
	                case "pair":
	                    return "[" + carString(v.car) + cdrString(v.cdr) + "]";
	            }
	        };
	    }

	}

	module.exports = Machine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var operator = [];
	var prog = [];
	operator[0]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: {head:3, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[1]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[0]}}
	} catch (err) {throw("undefined function")}
	}};
	operator[2]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}};
	operator[3]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:7, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[4]={interface:{head:[], tail:{head:["put","get"], tail: null}},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[1]}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="command"){throw("no match");};
	if (args[1].command!=="get"){throw("no match");};
	env[1]={tag:"callback", callback:args[1].callback};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:8, tail: {head:10, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="command"){throw("no match");};
	if (args[1].command!=="put"){throw("no match");};
	env[1]=args[1].args[0];
	env[2]={tag:"callback", callback:args[1].callback};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: {head:13, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
	} catch (err) {throw("undefined function")}}}
	}};
	operator[5]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:14, tail: null}}}, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}};
	operator[6]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:17}}, comp:{tag:"value", value:{tag:"atom", atom:"pr"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[7]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:19}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[8]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:20}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[9]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:21}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[10]={interface:null,implementation:function(stk,args){var env=[];
	try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:22}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[11]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:25}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
	} catch (err) {throw("undefined function")}
	}};
	operator[12]={interface:null,implementation:function(stk,args){var env=[];
	try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:26}}, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}};
	prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:8}}}};
	prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
	prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
	prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:2, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:6}}}};
	prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
	prog[5] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
	prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:5, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:7}}}};
	prog[7] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:6, tail: null}}}, comp:{tag:"value", value:{tag:"atom", atom:"put"}}}};
	prog[8] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[9] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:9, tail: null}}}, comp:{tag:"value", value:env[1]}}};
	prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
	prog[12] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:9}}}};
	prog[13] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: null}}}, comp:{tag:"value", value:env[2]}}};
	prog[14] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[15] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[16] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:15}}, comp:{tag:"value", value:env[1]}}};
	prog[17] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:16}}, comp:{tag:"value", value:env[0]}}};
	prog[18] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[19] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:18}}, comp:{tag:"value", value:env[0]}}};
	prog[20] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[21] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[22] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[23] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[24] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:23}}, comp:{tag:"value", value:env[1]}}};
	prog[25] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:24}}, comp:{tag:"value", value:env[0]}}};
	prog[26] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	module.exports = [prog, operator];


/***/ }
/******/ ]);