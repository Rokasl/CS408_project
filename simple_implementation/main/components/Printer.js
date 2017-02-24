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