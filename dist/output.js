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

	Stack = __webpack_require__(1);
	Machine = __webpack_require__(2);
	foo = __webpack_require__(4);

	var machine = new Machine(foo);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Stack = function Stack() {
	    var n = 0;       // size of the stack
	    var first = null;   // top of stack

	    var Node = function Node() {
	        var item;
	        var next;

	        this.getNext = function() {
	            return next;
	        }
	        this.setNext = function(n) {
	            next = n;
	        }
	        this.getItem = function() {
	            return item;
	        }
	        this.setItem = function(i) {
	            item = i;
	        }
	    }

	    this.isEmpty = function() {
	        return first === null;
	    }

	    this.size = function()  {
	        return n;
	    }

	    // add an element to the stack
	    this.push  = function (item) {
	        var oldfirst = first;
	        first = new Node();
	        first.setItem(item);
	        first.setNext(oldfirst);
	        n++;
	    }

	        // delete and return the most recently added element
	    this.pop = function () {
	        if (this.isEmpty()) {
	            console.log("can't pop, empty stack");
	            return;
	        }
	        var item = first.getItem();      // save item to return
	        first = first.getNext();            // delete first node
	        n--;
	        return item;                   // return the saved item
	    }

	    this.print = function() {
	        for (var i = 0; i <= n; i++){
	            console.log(this.pop());
	        }
	    }

	    this.peek = function(){
	        if(!this.isEmpty()) {
	            return first.getItem();
	        }
	       
	    }

	    this.command = function(command) {
	        fst = this.pop();
	        snd = this.pop();
	        switch(command) {
	            case "*":
	                this.push(fst * snd);
	            break;
	            case "+":
	                this.push(fst + snd);
	            break;
	            default:
	                this.push(snd);
	                this.push(fst);
	            break;
	        }

	    }

	}

	module.exports = Stack; 



/***/ },
/* 2 */
/***/ function(module, exports) {

	var Machine = function Machine(f){
	    var mode = {
	        stack : null,
	        tag : "go",
	        data : f
	    }

	    while (mode.tag === "go"){
	        mode = mode.data(mode.stack);
	            while(mode.tag != "go" && mode.stack != null){
	                switch(mode.tag) {
	                    case ("num"):
	                        switch(mode.stack.tag) {
	                            case "left":
	                                mode = {
	                                    stack :  {
	                                        prev : mode.stack.prev,
	                                        tag : "right",
	                                        data : mode.data
	                                    },
	                                    tag : "go",
	                                    data : mode.stack.data 
	                                }
	                            break;
	                            case "right":
	                                mode = {
	                                    stack : mode.stack.prev,
	                                    tag : "num",
	                                    data : mode.stack.data + mode.data
	                                }
	                            break;
	                        }
	                    break;
	                }
	            }
	        }

	        console.log(mode.data);
	    }


	module.exports = Machine;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	// 2 + 3
	var ProgramFoo = function (s){

	    this.foo0 = function (s) {
	        return {
	            stack : s,
	            tag:  "num",
	            data: 3 
	        }
	    }

	    return {
	            stack : {
	                prev : s,
	                tag : "left",
	                data : this.foo0 //function
	            },
	            tag : "num",
	            data : 2
	    }
	    
	}

	module.exports = ProgramFoo; 

/***/ }
/******/ ]);