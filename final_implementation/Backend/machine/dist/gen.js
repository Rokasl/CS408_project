var operator = [];
var prog = [];
operator[0]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:2, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[1]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:2, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:3, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[2]={interface: {head:["alerting"], tail: null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:3, tail: {head:4, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:6, env:[]}}}
} catch (err) {try {if (args[0].tag!=="command"){throw("no match");};
if (args[0].command!=="alerting"){throw("no match");};
env[0]={tag:"callback", callback:args[0].callback};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}
} catch (err) {throw("undefined function")}}
}}
operator[3]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:5, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
operator[4]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:6}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}}
operator[5]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:7}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}}
operator[6]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:10}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}}
operator[7]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: null}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
operator[8]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: {head:13, tail: null}}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}};
prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"alerting"}}}};
prog[2] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){throw("undefined function")
}}
}}}};
prog[3] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
prog[5] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[6] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[7] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[8] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:8}}, comp:{tag:"value", value:env[1]}}};
prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:9}}, comp:{tag:"value", value:env[0]}}};
prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[12] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[13] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
module.exports = [prog, operator];
