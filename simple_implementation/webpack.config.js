module.exports = {
    context: __dirname + "/main",
    entry: "./main.js",
    output: {
        path: __dirname + "/dist",
        filename: "output.js"
    },
    watchOptions: {
        poll: true
    },

};