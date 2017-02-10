var test_sum= [];
test_sum[0] = function(s){return{stack:s, tag:"num", data:8}};
test_sum[1] = function(s){return{stack:{prev:s, tag:"left", data:0}, tag:"num", data:4}};
test_sum[2] = function(s){return{stack:{prev:s, tag:"left", data:1}, tag:"num", data:2}};
module.exports = test_sum;