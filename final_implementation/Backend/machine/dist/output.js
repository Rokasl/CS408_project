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
	            case ("local"):
	                return fun.operator.implementation(stk, fun.env, args)
	                break;
	            case ("operator"):
	                return operators[fun.operator].implementation(stk, fun.env, args);
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



	    var mode = operators[0].implementation(null, [], []); // starting mode first found operator with no args

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

	    console.log(mode);

	    // needed for testing purposes
	    console.log(prettyPrinter(mode.comp.value));

	    function prettyPrinter(v) {
	        return valString(v);

	        function cdrString(v) {
	            switch (v.tag) {
	                case "pair":
	                    return valString(v.car) + cdrString(v.cdr);
	                case "atom":
	                    if (v.atom === "") {
	                        return " "
	                    };
	            }
	            return "|" + valString(v);
	        };

	        function valString(v) {
	            switch (v.tag) {
	                case "atom":
	                    if (v.atom === "cons") {
	                        return ", "
	                    }
	                    if (v.atom === "nil") {return ""}
	                    return " " + v.atom;
	                case "int":
	                    return " " + v.int
	                    break;
	                case "pair":
	                    return valString(v.car) + cdrString(v.cdr);
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
	operator[0]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:10, tail: {head:21, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[1]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[0]}}
	} catch (err) {throw("undefined function")}
	}}
	operator[2]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}}
	operator[3]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:22, tail: {head:25, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[4]={interface: {head:[], tail:{head:["put","get"], tail: null}}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:stk, comp:{tag:"value", value:env[1]}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="command"){throw("no match");};
	if (args[1].command!=="get"){throw("no match");};
	env[1]={tag:"callback", callback:args[1].callback};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:26, tail: {head:28, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="command"){throw("no match");};
	if (args[1].command!=="put"){throw("no match");};
	env[1]=args[1].args[0];
	env[2]={tag:"callback", callback:args[1].callback};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:29, tail: {head:31, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}
	} catch (err) {throw("undefined function")}}}
	}}
	operator[5]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	if (args[1].value.tag!=="pair") {throw("no match");};
	if (args[1].value.car.tag!=="atom") {throw("no match");};
	if (args[1].value.car.atom!=="nil") {throw("no match");};
	if (args[1].value.cdr.tag!=="atom") {throw("no match");};
	if (args[1].value.cdr.atom!=="") {throw("no match");};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:11, env:[]}}}
	} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	if (args[1].value.tag!=="pair") {throw("no match");};
	if (args[1].value.car.tag!=="atom") {throw("no match");};
	if (args[1].value.car.atom!=="cons") {throw("no match");};
	if (args[1].value.cdr.tag!=="pair") {throw("no match");};
	env[1]=args[1].value.cdr.car;
	if (args[1].value.cdr.cdr.tag!=="pair") {throw("no match");};
	env[2]=args[1].value.cdr.cdr.car;
	if (args[1].value.cdr.cdr.cdr.tag!=="atom") {throw("no match");};
	if (args[1].value.cdr.cdr.cdr.atom!=="") {throw("no match");};
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:33, tail: {head:36, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}
	} catch (err) {throw("undefined function")}}
	}}
	operator[6]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:37, tail: null}}}, comp:{tag:"value", value:env[1]}}
	} catch (err) {throw("undefined function")}
	}}
	operator[7]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:40}}, comp:{tag:"value", value:{tag:"atom", atom:"pr"}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[8]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:42}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[9]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:43}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[10]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:44}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[11]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:45}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
	} catch (err) {throw("undefined function")}
	}}
	operator[12]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	if (args[1].tag!=="value") {throw("no match");};
	env[1]=args[1].value;
	return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:48}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
	} catch (err) {throw("undefined function")}
	}}
	prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:9, env:[]}}}};
	prog[1] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3, env:[]}}}
	} catch (err) {throw("undefined function")}
	}}
	}}}};
	prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[5] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:11, env:[]}}}};
	prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:5, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[7] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:3, tail: {head:6, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[8] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:2, tail: {head:7, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:8, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
	prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: {head:9, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}};
	prog[11] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:9, env:[]}}}};
	prog[12] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
	env[0]=args[0].value;
	return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3, env:[]}}}
	} catch (err) {throw("undefined function")}
	}}
	}}}};
	prog[13] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[14] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[15] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[16] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:11, env:[]}}}};
	prog[17] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:15, tail: {head:16, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[18] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:14, tail: {head:17, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[19] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:13, tail: {head:18, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
	prog[20] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: {head:19, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
	prog[21] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: {head:20, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}};
	prog[22] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
	prog[23] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
	prog[24] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:23, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:8, env:[]}}}};
	prog[25] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:24, tail: null}}}, comp:{tag:"value", value:{tag:"atom", atom:"put"}}}};
	prog[26] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[27] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[28] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:27, tail: null}}}, comp:{tag:"value", value:env[1]}}};
	prog[29] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
	prog[30] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
	prog[31] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:30, tail: null}}}, comp:{tag:"value", value:env[2]}}};
	prog[32] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
	prog[33] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:32, tail: null}}}, comp:{tag:"value", value:env[0]}}};
	prog[34] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[35] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[2]}}};
	prog[36] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:34, tail: {head:35, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
	prog[37] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
	prog[38] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[39] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:38}}, comp:{tag:"value", value:env[1]}}};
	prog[40] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:39}}, comp:{tag:"value", value:env[0]}}};
	prog[41] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[42] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:41}}, comp:{tag:"value", value:env[0]}}};
	prog[43] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[44] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[45] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[46] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
	prog[47] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:46}}, comp:{tag:"value", value:env[1]}}};
	prog[48] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:47}}, comp:{tag:"value", value:env[0]}}};
	module.exports = [prog, operator];


/***/ }
/******/ ]);