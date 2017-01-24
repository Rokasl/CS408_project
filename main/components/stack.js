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

