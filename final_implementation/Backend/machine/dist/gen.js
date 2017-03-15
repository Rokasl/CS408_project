var operator = [];
var prog = [];
operator[0]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:3, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}
} catch (err) {throw("undefined function")}
}};
operator[1]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
if (args[0].value.tag!=="pair") {throw("no match");};
if (args[0].value.car.tag!=="atom") {throw("no match");};
if (args[0].value.car.atom!=="zero") {throw("no match");};
if (args[0].value.cdr.tag!=="atom") {throw("no match");};
if (args[0].value.cdr.atom!=="") {throw("no match");};
if (args[1].tag!=="value") {throw("no match");};
env[0]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[0]}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
if (args[0].value.tag!=="pair") {throw("no match");};
if (args[0].value.car.tag!=="atom") {throw("no match");};
if (args[0].value.car.atom!=="suc") {throw("no match");};
if (args[0].value.cdr.tag!=="pair") {throw("no match");};
env[0]=args[0].value.cdr.car;
if (args[0].value.cdr.cdr.tag!=="atom") {throw("no match");};
if (args[0].value.cdr.cdr.atom!=="") {throw("no match");};
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:6, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}
} catch (err) {throw("undefined function")}}
}};
operator[2]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:7, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}};
operator[3]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:9}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
} catch (err) {throw("undefined function")}
}};
operator[4]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:10}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
} catch (err) {throw("undefined function")}
}};
operator[5]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:11}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}};
operator[6]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:12}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}};
operator[7]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:15}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}};
operator[8]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:16}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}};
prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}};
prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}};
prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:2, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
prog[4] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[5] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:5, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}};
prog[7] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[8] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:8}}, comp:{tag:"value", value:env[0]}}};
prog[10] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[12] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[13] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[14] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:13}}, comp:{tag:"value", value:env[1]}}};
prog[15] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:14}}, comp:{tag:"value", value:env[0]}}};
prog[16] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
module.exports = [prog, operator];
