var operator = [];
var test_sample = [];
operator[0]=function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head: 0, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}
} catch (err) {throw("undefined function")}
};
operator[1]=function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:stk, comp:{tag:"value", value:{tag:"integer", integer:"0"}}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:stk, comp:{tag:"value", value:{tag:"integer", integer:"1"}}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:stk, comp:{tag:"value", value:{tag:"integer", integer:"1"}}}
} catch (err) {throw("undefined function")}}}
};
test_sample[0] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"integer", integer:"2"}}}};
module.exports = [test_sample, operator];
