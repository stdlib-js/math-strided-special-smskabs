// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
var e,t;e=this,t=function(){"use strict";var e="function"==typeof Object.defineProperty?Object.defineProperty:null,t=Object.defineProperty,r=Object.prototype,n=r.toString,o=r.__defineGetter__,a=r.__defineSetter__,i=r.__lookupGetter__,u=r.__lookupSetter__,l=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?t:function(e,t,l){var f,c,_,p;if("object"!=typeof e||null===e||"[object Array]"===n.call(e))throw new TypeError("invalid argument. First argument must be an object. Value: `"+e+"`.");if("object"!=typeof l||null===l||"[object Array]"===n.call(l))throw new TypeError("invalid argument. Property descriptor must be an object. Value: `"+l+"`.");if((c="value"in l)&&(i.call(e,t)||u.call(e,t)?(f=e.__proto__,e.__proto__=r,delete e[t],e[t]=l.value,e.__proto__=f):e[t]=l.value),_="get"in l,p="set"in l,c&&(_||p))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return _&&o&&o.call(e,t,l.get),p&&a&&a.call(e,t,l.set),e};function f(e,t,r){l(e,t,{configurable:!1,enumerable:!1,writable:!1,value:r})}function c(e,t,r,n,o,a,i,u){var l,f,c,_;if(e<=0)return a;for(l=r<0?(1-e)*r:0,f=o<0?(1-e)*o:0,c=i<0?(1-e)*i:0,_=0;_<e;_++)0===n[f]&&(a[c]=u(t[l])),l+=r,f+=o,c+=i;return a}function _(e,t,r,n,o,a,i,u,l,f,c){var _,p,d,s;if(e<=0)return u;for(_=n,p=i,d=f,s=0;s<e;s++)0===o[p]&&(u[d]=c(t[_])),_+=r,p+=a,d+=l;return u}function p(e){return Math.abs(e)}function d(e,t,r,n,o,a,i){return c(e,t,r,n,o,a,i,p)}return f(c,"ndarray",_),f(d,"ndarray",(function(e,t,r,n,o,a,i,u,l,f){return _(e,t,r,n,o,a,i,u,l,f,p)})),d},"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).smskabs=t();
//# sourceMappingURL=index.js.map
