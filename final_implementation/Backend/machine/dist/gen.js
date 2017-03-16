var operator = [];
var prog = [];
operator[0]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:0, tail: {head:9, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[1]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[0]}}
} catch (err) {throw("undefined function")}
}}
operator[2]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
operator[3]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:10, tail: {head:13, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:1, env:[]}}}
} catch (err) {throw("undefined function")}
}}
operator[4]={interface: {head:[], tail:{head:["put","get"], tail: null}}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:stk, comp:{tag:"value", value:env[1]}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="command"){throw("no match");};
if (args[1].command!=="get"){throw("no match");};
env[1]={tag:"callback", callback:args[1].callback};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:14, tail: {head:16, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}
} catch (err) {try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="command"){throw("no match");};
if (args[1].command!=="put"){throw("no match");};
env[1]=args[1].args[0];
env[2]={tag:"callback", callback:args[1].callback};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:17, tail: {head:19, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:4, env:[]}}}
} catch (err) {throw("undefined function")}}}
}}
operator[5]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
if (args[1].value.tag!=="pair") {throw("no match");};
if (args[1].value.car.tag!=="atom") {throw("no match");};
if (args[1].value.car.atom!=="nil") {throw("no match");};
if (args[1].value.cdr.tag!=="atom") {throw("no match");};
if (args[1].value.cdr.atom!=="") {throw("no match");};
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:11, env:[]}}}
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
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:21, tail: {head:24, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}
} catch (err) {throw("undefined function")}}
}}
operator[6]={interface: {head:[], tail:null}, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:25, tail: null}}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
operator[7]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:28}}, comp:{tag:"value", value:{tag:"atom", atom:"pr"}}}
} catch (err) {throw("undefined function")}
}}
operator[8]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:30}}, comp:{tag:"value", value:{tag:"atom", atom:"suc"}}}
} catch (err) {throw("undefined function")}
}}
operator[9]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:31}}, comp:{tag:"value", value:{tag:"atom", atom:"zero"}}}
} catch (err) {throw("undefined function")}
}}
operator[10]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:32}}, comp:{tag:"value", value:{tag:"atom", atom:"unit"}}}
} catch (err) {throw("undefined function")}
}}
operator[11]={interface: null, implementation:function(stk,env,args){try {return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:33}}, comp:{tag:"value", value:{tag:"atom", atom:"nil"}}}
} catch (err) {throw("undefined function")}
}}
operator[12]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:36}}, comp:{tag:"value", value:{tag:"atom", atom:"cons"}}}
} catch (err) {throw("undefined function")}
}}
operator[13]={interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
if (args[1].tag!=="value") {throw("no match");};
env[1]=args[1].value;
return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:37}}, comp:{tag:"value", value:env[1]}}
} catch (err) {throw("undefined function")}
}}
prog[0] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:9, env:[]}}}};
prog[1] = function(stk,env){return {stack:stk, comp:{tag:"value",value:{tag:"local", env:env, operator:{interface: null, implementation:function(stk,env,args){try {if (args[0].tag!=="value") {throw("no match");};
env[0]=args[0].value;
return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:3, env:[]}}}
} catch (err) {throw("undefined function")}
}}
}}}};
prog[2] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
prog[3] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
prog[4] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
prog[5] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:11, env:[]}}}};
prog[6] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:4, tail: {head:5, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
prog[7] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:3, tail: {head:6, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
prog[8] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:2, tail: {head:7, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:12, env:[]}}}};
prog[9] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:1, tail: {head:8, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
prog[10] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
prog[11] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"atom", atom:"get"}}}};
prog[12] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:11, tail: null}}}, comp:{tag:"value", value:{tag:"operator", operator:8, env:[]}}}};
prog[13] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:12, tail: null}}}, comp:{tag:"value", value:{tag:"atom", atom:"put"}}}};
prog[14] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[15] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[16] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:15, tail: null}}}, comp:{tag:"value", value:env[1]}}};
prog[17] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[18] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:null}}, comp:{tag:"value", value:{tag:"operator", operator:10, env:[]}}}};
prog[19] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:18, tail: null}}}, comp:{tag:"value", value:env[2]}}};
prog[20] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[1]}}};
prog[21] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:20, tail: null}}}, comp:{tag:"value", value:env[0]}}};
prog[22] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[23] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[2]}}};
prog[24] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"fun", env:env, args:{head:22, tail: {head:23, tail: null}}}}, comp:{tag:"value", value:{tag:"operator", operator:5, env:[]}}}};
prog[25] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
prog[26] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[27] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:26}}, comp:{tag:"value", value:env[1]}}};
prog[28] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:27}}, comp:{tag:"value", value:env[0]}}};
prog[29] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[30] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:29}}, comp:{tag:"value", value:env[0]}}};
prog[31] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[32] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[33] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[34] = function(stk,env){return {stack:stk, comp:{tag:"value", value:{tag:"atom", atom:""}}}};
prog[35] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:34}}, comp:{tag:"value", value:env[1]}}};
prog[36] = function(stk,env){return {stack:{prev: stk, frame:{ tag:"car", env:env, cdr:35}}, comp:{tag:"value", value:env[0]}}};
prog[37] = function(stk,env){return {stack:stk, comp:{tag:"value", value:env[0]}}};
module.exports = [prog, operator];
