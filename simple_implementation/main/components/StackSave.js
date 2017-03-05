// Early version of stack saver, which saves states of the stack while going deeper
//      and has an ability to restore it to the start state, while keeping all the
//          changes.         

var saver = function () {
    var save = null;
    var restore = null;

    this.saveStack = function (m) { // m is current stack frame
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