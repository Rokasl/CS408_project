var operator = [];
var prog = [];
operator[0]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: {head:3, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
} catch (err) {throw("undefined function")}
}};
operator[1]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}};
operator[2]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}};
operator[3]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:7, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1}}}
} catch (err) {throw("undefined function")}
}};
operator[4]={interface:{head:[], tail:{head:["put","get"], tail: null}},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[1]}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="command"){throw("no match");};
if (args[1].command!=="get"){throw("no match");};
env[1]={tag:"callback", callback:args[1].callback};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:8, tail: {head:10, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="command"){throw("no match");};
if (args[1].command!=="put"){throw("no match");};
env[1]=args[1].args[0];
env[2]={tag:"callback", callback:args[1].callback};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: {head:13, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4}}}
} catch (err) {throw("undefined function")}}}
}};
operator[5]={interface:{head:[], tail:null},implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:14, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}};
operator[6]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:17}}, comp:{tag:"value", value:{tag:"atom", atom:"pr"}}}
} catch (err) {throw("undefined function")}
}};
operator[7]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:19}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
} catch (err) {throw("undefined function")}
}};
operator[8]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:20}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
} catch (err) {throw("undefined function")}
}};
operator[9]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:21}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}};
operator[10]={interface:null,implementation:function(stk,args){var env=[];
try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:22}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}};
operator[11]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:25}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}};
operator[12]={interface:null,implementation:function(stk,args){var env=[];
try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:26}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}};
prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:8}}}};
prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3}}}};
prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:2, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:6}}}};
prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
prog[5] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:5, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:7}}}};
prog[7] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:6, tail: null}}}, comp:{tag:"value", value:{tag:"atom", atom:"put"}}}};
prog[8] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[9] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:9, tail: null}}}, comp:{tag:"value", value:env[1]}}};
prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[12] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:9}}}};
prog[13] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: null}}}, comp:{tag:"value", value:env[2]}}};
prog[14] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[15] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[16] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:15}}, comp:{tag:"value", value:env[1]}}};
prog[17] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:16}}, comp:{tag:"value", value:env[0]}}};
prog[18] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[19] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:18}}, comp:{tag:"value", value:env[0]}}};
prog[20] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[21] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[22] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[23] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[24] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:23}}, comp:{tag:"value", value:env[1]}}};
prog[25] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:24}}, comp:{tag:"value", value:env[0]}}};
prog[26] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
module.exports = [prog, operator];
