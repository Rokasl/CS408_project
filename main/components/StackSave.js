// Early version of stack saver, which saves states of the stack while going deeper
//      and has an ability to restore it to the start state, while keeping all the
//          changes.         

var saver = function () {
    var save = {
        prev: null,
        tag: null,
        data: null
    }

    this.saveStack = function (m) {
        save = {
            prev: save,
            tag: m.tag,
            data: m.data
        }
    }

    this.restoreStack = function (m) {
        var stack;
        // var stack = {
        //     prev: null,
        //     tag: null,
        //     data: null
        // };
        while (save.prev != null) {

            stack = {
                prev: m,
                tag: save.tag,
                data: save.data,
            }
            save = save.prev;
        }
        this.destroySave();
        return stack
    }
    this.destroySave = function () {
        save = { // reinitialize save
            prev: null,
            tag: null,
            data: null
        }
    }
}

module.exports = saver;