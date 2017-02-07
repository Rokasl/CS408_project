var test_throw= [];
test_throw[0] = function(s){return{stack:s, tag:"throw", data:" Unhandled exception!"}};
test_throw[1] = function(s){return{stack:{prev:s, tag:"left", data:0}, tag:"num", data:4}};
test_throw[2] = function(s){return{stack:{prev:s, tag:"left", data:1}, tag:"num", data:2}};
test_throw[3] = function(s){return{stack:s, tag:"num", data:1000}};
test_throw[4] = function(s){return{stack:{prev:{prev:s, tag:"catch", data:2,i:0}, tag:"left", data:3}, tag:"num", data:2}};
module.exports = test_throw;