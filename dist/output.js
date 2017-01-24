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
	__webpack_require__(2);

	var stack = new Stack();
	stack.push(1);
	console.log(stack.peek());
	stack.push(2);
	console.log(stack.peek());
	stack.command("+");
	console.log(stack.peek());
	stack.push(3);
	stack.command("*");
	console.log(stack.peek());

	console.log("it works");

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

	


/***/ }
/******/ ]);