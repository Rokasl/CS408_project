module.exports = {
    context: "main",
    entry: "./main.js",
    output: {
        path: __dirname + "/dist",
        filename: "output.js"
    },
    watchOptions: {
        poll: true
    },

};