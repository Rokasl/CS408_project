var operator = [];
var prog = [];
operator[0]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:3, tail: {head:10, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[1]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
if (args[1].value.tag!=="pair") {throw("no match");};
if (args[1].value.car.tag!=="atom") {throw("no match");};
if (args[1].value.car.atom!=="nil") {throw("no match");};
if (args[1].value.cdr.tag!=="atom") {throw("no match");};
if (args[1].value.cdr.atom!=="") {throw("no match");};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:6, env:[]}}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
if (args[1].value.tag!=="pair") {throw("no match");};
if (args[1].value.car.tag!=="atom") {throw("no match");};
if (args[1].value.car.atom!=="cons") {throw("no match");};
if (args[1].value.cdr.tag!=="pair") {throw("no match");};
env[1]=args[1].value.cdr.car;
if (args[1].value.cdr.cdr.tag!=="pair") {throw("no match");};
env[2]=args[1].value.cdr.cdr.car;
if (args[1].value.cdr.cdr.cdr.tag!=="atom") {throw("no match");};
if (args[1].value.cdr.cdr.cdr.atom!=="") {throw("no match");};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: {head:15, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}
} catch (err) {throw("undefined function")}}
}}
operator[2]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:16, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
operator[3]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:18}}, comp:{tag:"value", value:{tag:"atom", atom:"wrap"}}}
} catch (err) {throw("undefined function")}
}}
operator[4]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:19}}, comp:{tag:"value", value:{tag:"atom", atom:"Num"}}}
} catch (err) {throw("undefined function")}
}}
operator[5]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:20}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}}
operator[6]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:21}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}}
operator[7]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:24}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}}
operator[8]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:25, tail: null}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
operator[9]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:26, tail: {head:27, tail: null}}}}, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
prog[0] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[1] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:3, env:[]}}}};
prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:6, env:[]}}}};
prog[3] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:2, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}
} catch (err) {throw("undefined function")}
}}
}}}};
prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}};
prog[5] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}};
prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}};
prog[7] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:6, env:[]}}}};
prog[8] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:6, tail: {head:7, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}};
prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:5, tail: {head:8, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}};
prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:9, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:7, env:[]}}}};
prog[11] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[12] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: null}}}, comp:{tag:"value", value:env[0]}}};
prog[13] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[14] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[2]}}};
prog[15] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:13, tail: {head:14, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}};
prog[16] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[17] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[18] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:17}}, comp:{tag:"value", value:env[0]}}};
prog[19] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[20] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[21] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[22] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[23] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:22}}, comp:{tag:"value", value:env[1]}}};
prog[24] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:23}}, comp:{tag:"value", value:env[0]}}};
prog[25] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[26] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[27] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
module.exports = [prog, operator];
