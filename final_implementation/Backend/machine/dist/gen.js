var operator = [];
var prog = [];
operator[0]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:2, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[1]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:3, tail: null}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
operator[2]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
operator[3]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:5}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}}
operator[4]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:6}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}}
operator[5]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:9}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}}
operator[6]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:10, tail: null}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
operator[7]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: {head:12, tail: null}}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
prog[0] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"int", int:42}}}};
prog[1] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: null}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
}}}};
prog[2] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:stk, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
}}}};
prog[3] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[4] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[5] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[6] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[7] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[8] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:7}}, comp:{tag:"value", value:env[1]}}};
prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:8}}, comp:{tag:"value", value:env[0]}}};
prog[10] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[12] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
module.exports = [prog, operator];
