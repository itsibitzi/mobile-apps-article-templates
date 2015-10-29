!function(t,e){"undefined"!=typeof module?module.exports=e():"function"==typeof define&&"object"==typeof define.amd?define("domReady",e):this[t]=e()}("domready",function(){var t,e=[],n=document,r=n.documentElement.doScroll,o="DOMContentLoaded",i=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return i||n.addEventListener(o,t=function(){for(n.removeEventListener(o,t),i=1;t=e.shift();)t()}),function(t){i?setTimeout(t,0):e.push(t)}}),function(t,e){"use strict";function n(){return"undefined"==typeof document?"":document.location.href}function r(t,e){var n,r;if(W){e=e||{},t="raven"+t.substr(0,1).toUpperCase()+t.substr(1),document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t);for(r in e)d(e,r)&&(n[r]=e[r]);if(document.createEvent)document.dispatchEvent(n);else try{document.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(o){}}}function o(t){this.name="RavenConfigError",this.message=t}function i(t){var e=tt.exec(t),n={},r=7;try{for(;r--;)n[Y[r]]=e[r]||""}catch(i){throw new o("Invalid DSN: "+t)}if(n.pass)throw new o("Do not specify your private key in the DSN!");return n}function u(t){return void 0===t}function s(t){return"function"==typeof t}function a(t){return"[object String]"===J.toString.call(t)}function c(t){return"object"==typeof t&&null!==t}function l(t){for(var e in t)return!1;return!0}function f(t){return c(t)&&"[object Error]"===J.toString.call(t)||t instanceof Error}function d(t,e){return J.hasOwnProperty.call(t,e)}function p(t,e){var n,r;if(u(t.length))for(n in t)d(t,n)&&e.call(null,n,t[n]);else if(r=t.length)for(n=0;r>n;n++)e.call(null,n,t[n])}function h(t,e){var n=[];t.stack&&t.stack.length&&p(t.stack,function(t,e){var r=m(e);r&&n.push(r)}),r("handle",{stackInfo:t,options:e}),v(t.name,t.message,t.url,t.lineno,n,e)}function m(t){if(t.url){var e,n={filename:t.url,lineno:t.line,colno:t.column,"function":t.func||"?"},r=g(t);if(r){var o=["pre_context","context_line","post_context"];for(e=3;e--;)n[o[e]]=r[e]}return n.in_app=!(z.includePaths.test&&!z.includePaths.test(n.filename)||/(Raven|TraceKit)\./.test(n["function"])||/raven\.(min\.)?js$/.test(n.filename)),n}}function g(t){if(t.context&&z.fetchContext){for(var e=t.context,n=~~(e.length/2),r=e.length,o=!1;r--;)if(e[r].length>300){o=!0;break}if(o){if(u(t.column))return;return[[],e[n].substr(t.column,50),[]]}return[e.slice(0,n),e[n],e.slice(n+1)]}}function v(t,e,n,r,o,i){var u,s;z.ignoreErrors.test&&z.ignoreErrors.test(e)||(e+="",e=b(e,z.maxMessageLength),s=t+": "+e,s=b(s,z.maxMessageLength),o&&o.length?(n=o[0].filename||n,o.reverse(),u={frames:o}):n&&(u={frames:[{filename:n,lineno:r,in_app:!0}]}),z.ignoreUrls.test&&z.ignoreUrls.test(n)||(!z.whitelistUrls.test||z.whitelistUrls.test(n))&&C(y({exception:{type:t,value:e},stacktrace:u,culprit:n,message:s},i)))}function y(t,e){return e?(p(e,function(e,n){t[e]=n}),t):t}function b(t,e){return t.length<=e?t:t.substr(0,e)+"…"}function x(){return+new Date}function w(){if(W&&document.location&&document.location.href){var t={headers:{"User-Agent":navigator.userAgent}};return t.url=document.location.href,document.referrer&&(t.headers.Referer=document.referrer),t}}function C(t){var e={project:U,logger:z.logger,platform:"javascript"},n=w();n&&(e.request=n),t=y(e,t),t.tags=y(y({},H.tags),t.tags),t.extra=y(y({},H.extra),t.extra),t.extra=y({"session:duration":x()-Z},t.extra),l(t.tags)&&delete t.tags,H.user&&(t.user=H.user),z.release&&(t.release=z.release),s(z.dataCallback)&&(t=z.dataCallback(t)||t),t&&!l(t)&&(!s(z.shouldSendCallback)||z.shouldSendCallback(t))&&(j=t.event_id||(t.event_id=T()),A("debug","Raven about to send:",t),k()&&(z.transport||E)({url:B,auth:{sentry_version:"4",sentry_client:"raven-js/"+Q.VERSION,sentry_key:F},data:t,options:z,onSuccess:function(){r("success",{data:t,src:B})},onError:function(){r("failure",{data:t,src:B})}}))}function E(t){t.auth.sentry_data=JSON.stringify(t.data);var e=_(),n=t.url+"?"+M(t.auth);(t.options.crossOrigin||""===t.options.crossOrigin)&&(e.crossOrigin=t.options.crossOrigin),e.onload=t.onSuccess,e.onerror=e.onabort=t.onError,e.src=n}function _(){return document.createElement("img")}function k(){return q?B?!0:(et||A("error","Error: Raven has not been configured."),et=!0,!1):!1}function S(t){for(var e,n=[],r=0,o=t.length;o>r;r++)e=t[r],a(e)?n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):e&&e.source&&n.push(e.source);return new RegExp(n.join("|"),"i")}function T(){var e=t.crypto||t.msCrypto;if(!u(e)&&e.getRandomValues){var n=new Uint16Array(8);e.getRandomValues(n),n[3]=4095&n[3]|16384,n[4]=16383&n[4]|32768;var r=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return r(n[0])+r(n[1])+r(n[2])+r(n[3])+r(n[4])+r(n[5])+r(n[6])+r(n[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"==t?e:3&e|8;return n.toString(16)})}function A(t){G[t]&&Q.debug&&G[t].apply(V,O.call(arguments,1))}function P(){var e=t.RavenConfig;e&&Q.config(e.dsn,e.config).install()}function M(t){var e=[];return p(t,function(t,n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}),e.join("&")}function $(t,e){u(e)?delete H[t]:H[t]=y(H[t]||{},e)}var N={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7,debug:!1},O=[].slice,R="?";N.wrap=function(t){function e(){try{return t.apply(this,arguments)}catch(e){throw N.report(e),e}}return e},N.report=function(){function r(t){a(),m.push(t)}function o(t){for(var e=m.length-1;e>=0;--e)m[e]===t&&m.splice(e,1)}function i(){c(),m=[]}function u(t,e){var n=null;if(!e||N.collectWindowErrors){for(var r in m)if(d(m,r))try{m[r].apply(null,[t].concat(O.call(arguments,2)))}catch(o){n=o}if(n)throw n}}function s(t,e,r,o,i){var s=null;if(y)N.computeStackTrace.augmentStackTraceWithInitialElement(y,e,r,t),l();else if(i)s=N.computeStackTrace(i),u(s,!0);else{var a={url:e,line:r,column:o};a.func=N.computeStackTrace.guessFunctionName(a.url,a.line),a.context=N.computeStackTrace.gatherContext(a.url,a.line),s={message:t,url:n(),stack:[a]},u(s,!0)}return p?p.apply(this,arguments):!1}function a(){h||(p=t.onerror,t.onerror=s,h=!0)}function c(){h&&(t.onerror=p,h=!1,p=e)}function l(){var t=y,e=g;g=null,y=null,v=null,u.apply(null,[t,!1].concat(e))}function f(e,n){var r=O.call(arguments,1);if(y){if(v===e)return;l()}var o=N.computeStackTrace(e);if(y=o,v=e,g=r,t.setTimeout(function(){v===e&&l()},o.incomplete?2e3:0),n!==!1)throw e}var p,h,m=[],g=null,v=null,y=null;return f.subscribe=r,f.unsubscribe=o,f.uninstall=i,f}(),N.computeStackTrace=function(){function e(e){if(!N.remoteFetching)return"";try{var n=function(){try{return new t.XMLHttpRequest}catch(e){return new t.ActiveXObject("Microsoft.XMLHTTP")}},r=n();return r.open("GET",e,!1),r.send(""),r.responseText}catch(o){return""}}function r(t){if(!a(t))return[];if(!d(x,t)){var n="",r="";try{r=document.domain}catch(o){}-1!==t.indexOf(r)&&(n=e(t)),x[t]=n?n.split("\n"):[]}return x[t]}function o(t,e){var n,o=/function ([^(]*)\(([^)]*)\)/,i=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,s="",a=10,c=r(t);if(!c.length)return R;for(var l=0;a>l;++l)if(s=c[e-l]+s,!u(s)){if(n=i.exec(s))return n[1];if(n=o.exec(s))return n[1]}return R}function i(t,e){var n=r(t);if(!n.length)return null;var o=[],i=Math.floor(N.linesOfContext/2),s=i+N.linesOfContext%2,a=Math.max(0,e-i-1),c=Math.min(n.length,e+s-1);e-=1;for(var l=a;c>l;++l)u(n[l])||o.push(n[l]);return o.length>0?o:null}function s(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function c(t){return s(t).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function l(t,e){for(var n,o,i=0,u=e.length;u>i;++i)if((n=r(e[i])).length&&(n=n.join("\n"),o=t.exec(n)))return{url:e[i],line:n.substring(0,o.index).split("\n").length,column:o.index-n.lastIndexOf("\n",o.index)-1};return null}function f(t,e,n){var o,i=r(e),u=new RegExp("\\b"+s(t)+"\\b");return n-=1,i&&i.length>n&&(o=u.exec(i[n]))?o.index:null}function p(e){if("undefined"!=typeof document){for(var n,r,o,i,u=[t.location.href],a=document.getElementsByTagName("script"),f=""+e,d=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,p=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,h=0;h<a.length;++h){var m=a[h];m.src&&u.push(m.src)}if(o=d.exec(f)){var g=o[1]?"\\s+"+o[1]:"",v=o[2].split(",").join("\\s*,\\s*");n=s(o[3]).replace(/;$/,";?"),r=new RegExp("function"+g+"\\s*\\(\\s*"+v+"\\s*\\)\\s*{\\s*"+n+"\\s*}")}else r=new RegExp(s(f).replace(/\s+/g,"\\s+"));if(i=l(r,u))return i;if(o=p.exec(f)){var y=o[1];if(n=c(o[2]),r=new RegExp("on"+y+"=[\\'\"]\\s*"+n+"\\s*[\\'\"]","i"),i=l(r,u[0]))return i;if(r=new RegExp(n),i=l(r,u))return i}return null}}function h(t){if(!u(t.stack)&&t.stack){for(var e,r,s=/^\s*at (.*?) ?\(?((?:(?:file|https?|chrome-extension):.*?)|<anonymous>):(\d+)(?::(\d+))?\)?\s*$/i,a=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,c=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,l=t.stack.split("\n"),d=[],p=/^(.*) is undefined$/.exec(t.message),h=0,m=l.length;m>h;++h){if(e=a.exec(l[h]))r={url:e[3],func:e[1]||R,args:e[2]?e[2].split(","):"",line:+e[4],column:e[5]?+e[5]:null};else if(e=s.exec(l[h]))r={url:e[2],func:e[1]||R,line:+e[3],column:e[4]?+e[4]:null};else{if(!(e=c.exec(l[h])))continue;r={url:e[2],func:e[1]||R,line:+e[3],column:e[4]?+e[4]:null}}!r.func&&r.line&&(r.func=o(r.url,r.line)),r.line&&(r.context=i(r.url,r.line)),d.push(r)}return d.length?(d[0].line&&!d[0].column&&p?d[0].column=f(p[1],d[0].url,d[0].line):d[0].column||u(t.columnNumber)||(d[0].column=t.columnNumber+1),{name:t.name,message:t.message,url:n(),stack:d}):null}}function m(t){var e=t.stacktrace;if(!u(t.stacktrace)&&t.stacktrace){for(var r,s=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,a=e.split("\n"),c=[],l=0,f=a.length;f>l;l+=2)if(r=s.exec(a[l])){var d={line:+r[1],column:+r[2],func:r[3]||r[4],args:r[5]?r[5].split(","):[],url:r[6]};if(!d.func&&d.line&&(d.func=o(d.url,d.line)),d.line)try{d.context=i(d.url,d.line)}catch(p){}d.context||(d.context=[a[l+1]]),c.push(d)}return c.length?{name:t.name,message:t.message,url:n(),stack:c}:null}}function g(e){var u=e.message.split("\n");if(u.length<4)return null;var s,a,f,p,h=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,m=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,g=/^\s*Line (\d+) of function script\s*$/i,v=[],y=document.getElementsByTagName("script"),b=[];for(a in y)d(y,a)&&!y[a].src&&b.push(y[a]);for(a=2,f=u.length;f>a;a+=2){var x=null;if(s=h.exec(u[a]))x={url:s[2],func:s[3],line:+s[1]};else if(s=m.exec(u[a])){x={url:s[3],func:s[4]};var w=+s[1],C=b[s[2]-1];if(C&&(p=r(x.url))){p=p.join("\n");var E=p.indexOf(C.innerText);E>=0&&(x.line=w+p.substring(0,E).split("\n").length)}}else if(s=g.exec(u[a])){var _=t.location.href.replace(/#.*$/,""),k=s[1],S=new RegExp(c(u[a+1]));p=l(S,[_]),x={url:_,line:p?p.line:k,func:""}}if(x){x.func||(x.func=o(x.url,x.line));var T=i(x.url,x.line),A=T?T[Math.floor(T.length/2)]:null;T&&A.replace(/^\s*/,"")===u[a+1].replace(/^\s*/,"")?x.context=T:x.context=[u[a+1]],v.push(x)}}return v.length?{name:e.name,message:u[0],url:n(),stack:v}:null}function v(t,e,n,r){var u={url:e,line:n};if(u.url&&u.line){t.incomplete=!1,u.func||(u.func=o(u.url,u.line)),u.context||(u.context=i(u.url,u.line));var s=/ '([^']+)' /.exec(r);if(s&&(u.column=f(s[1],u.url,u.line)),t.stack.length>0&&t.stack[0].url===u.url){if(t.stack[0].line===u.line)return!1;if(!t.stack[0].line&&t.stack[0].func===u.func)return t.stack[0].line=u.line,t.stack[0].context=u.context,!1}return t.stack.unshift(u),t.partial=!0,!0}return t.incomplete=!0,!1}function y(t,e){for(var r,i,u,s=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,a=[],c={},l=!1,d=y.caller;d&&!l;d=d.caller)if(d!==b&&d!==N.report){if(i={url:null,func:R,line:null,column:null},d.name?i.func=d.name:(r=s.exec(d.toString()))&&(i.func=r[1]),"undefined"==typeof i.func)try{i.func=r.input.substring(0,r.input.indexOf("{"))}catch(h){}if(u=p(d)){i.url=u.url,i.line=u.line,i.func===R&&(i.func=o(i.url,i.line));var m=/ '([^']+)' /.exec(t.message||t.description);m&&(i.column=f(m[1],u.url,u.line))}c[""+d]?l=!0:c[""+d]=!0,a.push(i)}e&&a.splice(0,e);var g={name:t.name,message:t.message,url:n(),stack:a};return v(g,t.sourceURL||t.fileName,t.line||t.lineNumber,t.message||t.description),g}function b(t,e){var r=null;e=null==e?0:+e;try{if(r=m(t))return r}catch(o){if(N.debug)throw o}try{if(r=h(t))return r}catch(o){if(N.debug)throw o}try{if(r=g(t))return r}catch(o){if(N.debug)throw o}try{if(r=y(t,e+1))return r}catch(o){if(N.debug)throw o}return{name:t.name,message:t.message,url:n()}}var x={};return b.augmentStackTraceWithInitialElement=v,b.computeStackTraceFromStackProp=h,b.guessFunctionName=o,b.gatherContext=i,b}();var L,j,B,F,U,I=t.Raven,q=!("object"!=typeof JSON||!JSON.stringify),W="undefined"!=typeof document,H={},z={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],crossOrigin:"anonymous",collectWindowErrors:!0,maxMessageLength:100},D=!1,J=Object.prototype,V=t.console||{},G={},X=[],Z=x();for(var K in V)G[K]=V[K];var Q={VERSION:"1.2.0",debug:!0,noConflict:function(){return t.Raven=I,Q},config:function(t,e){if(B)return A("error","Error: Raven has already been configured"),Q;if(!t)return Q;var n=i(t),r=n.path.lastIndexOf("/"),o=n.path.substr(1,r);return e&&p(e,function(t,e){"tags"==t||"extra"==t?H[t]=e:z[t]=e}),z.ignoreErrors.push(/^Script error\.?$/),z.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),z.ignoreErrors=S(z.ignoreErrors),z.ignoreUrls=z.ignoreUrls.length?S(z.ignoreUrls):!1,z.whitelistUrls=z.whitelistUrls.length?S(z.whitelistUrls):!1,z.includePaths=S(z.includePaths),F=n.user,U=n.path.substr(r+1),B="//"+n.host+(n.port?":"+n.port:"")+"/"+o+"api/"+U+"/store/",n.protocol&&(B=n.protocol+":"+B),z.fetchContext&&(N.remoteFetching=!0),z.linesOfContext&&(N.linesOfContext=z.linesOfContext),N.collectWindowErrors=!!z.collectWindowErrors,Q},install:function(){return k()&&!D&&(N.report.subscribe(h),p(X,function(t,e){e()}),D=!0),Q},context:function(t,n,r){return s(t)&&(r=n||[],n=t,t=e),Q.wrap(t,n).apply(this,r)},wrap:function(t,n){function r(){for(var e=[],r=arguments.length,o=!t||t&&t.deep!==!1;r--;)e[r]=o?Q.wrap(t,arguments[r]):arguments[r];try{return n.apply(this,e)}catch(i){throw Q.captureException(i,t),i}}if(u(n)&&!s(t))return t;if(s(t)&&(n=t,t=e),!s(n))return n;if(n.__raven__)return n;for(var o in n)d(n,o)&&(r[o]=n[o]);return r.__raven__=!0,r.__inner__=n,r},uninstall:function(){return N.report.uninstall(),D=!1,Q},captureException:function(t,e){if(!f(t))return Q.captureMessage(t,e);L=t;try{var n=N.computeStackTrace(t);h(n,e)}catch(r){if(t!==r)throw r}return Q},captureMessage:function(t,e){return z.ignoreErrors.test&&z.ignoreErrors.test(t)?void 0:(C(y({message:t+""},e)),Q)},addPlugin:function(t){return X.push(t),D&&t(),Q},setUserContext:function(t){return H.user=t,Q},setExtraContext:function(t){return $("extra",t),Q},setTagsContext:function(t){return $("tags",t),Q},clearContext:function(){return H={},Q},getContext:function(){return JSON.parse(JSON.stringify(H))},setRelease:function(t){return z.release=t,Q},setDataCallback:function(t){return z.dataCallback=t,Q},setShouldSendCallback:function(t){return z.shouldSendCallback=t,Q},setTransport:function(t){return z.transport=t,Q},lastException:function(){return L},lastEventId:function(){return j},isSetup:function(){return k()}};Q.setUser=Q.setUserContext,Q.setReleaseContext=Q.setRelease;var Y="source protocol user pass host port path".split(" "),tt=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;o.prototype=new Error,o.prototype.constructor=o;var et;P(),t.Raven=Q,"function"==typeof define&&define.amd?define("raven",[],function(){return Q}):"object"==typeof module?module.exports=Q:"object"==typeof exports&&(exports=Q)}("undefined"!=typeof window?window:this),define("modules/monitor",["raven"],function(t){var e={dsn:null,git_commit:"not available"};try{e={dsn:null,git_commit:"e61a0042baacfaa077d4ffa2fd4865ac9723bb4a"}}catch(n){}var r={extractTags:function(){var t=document.body.getAttribute("class"),e=t.match(/tone--([^\s]+)/);return{itemTone:e?e[1]:null,itemId:document.body.getAttribute("data-page-id"),deviceKind:document.body.getAttribute("data-ads-config"),ads:"true"===document.body.getAttribute("data-ads-enabled")}},ignoreErrors:function(){var t=["fake"];return t.push=function(){},t},setContext:function(n,r){return e.dsn?t.context({tags:{context:n}},r):r()}},o=function(){var n=r.extractTags();!t.isSetup()&&e.dsn&&t.config(e.dsn,{tags:n,release:e.git_commit,ignoreErrors:r.ignoreErrors(),shouldSendCallback:function(t){t.stacktrace&&t.stacktrace.frames&&(t.stacktrace.frames=t.stacktrace.frames.reverse().slice(0,3).reverse());var e=35;return 100*Math.random()<=e}}).install()};return{init:o,setContext:r.setContext,modules:r,config:e,raven:t}}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("bonzo",n):e[t]=n()}("bonzo",this,function(){function t(t,e){var n=null,r=T.defaultView.getComputedStyle(t,"");return r&&(n=r[e]),t.style[e]||n}function e(t){return t&&t.nodeName&&(1==t.nodeType||11==t.nodeType)}function n(t,n,r){var o,i,u;if("string"==typeof t)return C.create(t);if(e(t)&&(t=[t]),r){for(u=[],o=0,i=t.length;i>o;o++)u[o]=y(n,t[o]);return u}return t}function r(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function o(t,e,n,r){for(var o,i=0,u=t.length;u>i;i++)o=r?t.length-i-1:i,e.call(n||t[o],t[o],o,t);return t}function i(t,n,r){for(var o=0,u=t.length;u>o;o++)e(t[o])&&(i(t[o].childNodes,n,r),n.call(r||t[o],t[o],o,t));return t}function u(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function s(t){return t?t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():t}function a(t){t[D]("data-node-uid")||t[z]("data-node-uid",++I);var e=t[D]("data-node-uid");return U[e]||(U[e]={})}function c(t){var e=t[D]("data-node-uid");e&&delete U[e]}function l(t){var e;try{return null===t||void 0===t?void 0:"true"===t?!0:"false"===t?!1:"null"===t?null:(e=parseFloat(t))==t?e:t}catch(n){}return void 0}function f(t,e,n){for(var r=0,o=t.length;o>r;++r)if(e.call(n||null,t[r],r,t))return!0;return!1}function d(t){return"transform"==t&&(t=J.transform)||/^transform-?[Oo]rigin$/.test(t)&&(t=J.transform+"Origin"),t?u(t):null}function p(t,e,r,i){var u=0,s=e||this,a=[],c=Z&&"string"==typeof t&&"<"!=t.charAt(0)?Z(t):t;return o(n(c),function(t,e){o(s,function(n){r(t,a[u++]=e>0?y(s,n):n)},null,i)},this,i),s.length=u,o(a,function(t){s[--u]=t},null,!i),s}function h(t,e,n){var r=C(t),o=r.css("position"),i=r.offset(),u="relative",s=o==u,a=[parseInt(r.css("left"),10),parseInt(r.css("top"),10)];"static"==o&&(r.css("position",u),o=u),isNaN(a[0])&&(a[0]=s?0:t.offsetLeft),isNaN(a[1])&&(a[1]=s?0:t.offsetTop),null!=e&&(t.style.left=e-i.left+a[0]+H),null!=n&&(t.style.top=n-i.top+a[1]+H)}function m(t,e){return"function"==typeof e?e.call(t,t):e}function g(t,e,n){var r=this[0];return r?null==t&&null==e?(b(r)?x():{x:r.scrollLeft,y:r.scrollTop})[n]:(b(r)?S.scrollTo(t,e):(null!=t&&(r.scrollLeft=t),null!=e&&(r.scrollTop=e)),this):this}function v(t){if(this.length=0,t){t="string"==typeof t||t.nodeType||"undefined"==typeof t.length?[t]:t,this.length=t.length;for(var e=0;e<t.length;e++)this[e]=t[e]}}function y(t,e){var n,r,o,i=e.cloneNode(!0);if(t.$&&"function"==typeof t.cloneEvents)for(t.$(i).cloneEvents(e),n=t.$(i).find("*"),r=t.$(e).find("*"),o=0;o<r.length;o++)t.$(n[o]).cloneEvents(r[o]);return i}function b(t){return t===S||/^(?:body|html)$/i.test(t.tagName)}function x(){return{x:S.pageXOffset||A.scrollLeft,y:S.pageYOffset||A.scrollTop}}function w(t){var e=document.createElement("script"),n=t.match(N);return e.src=n[1],e}function C(t){return new v(t)}var E,_,k,S=window,T=S.document,A=T.documentElement,P="parentNode",M=/^(checked|value|selected|disabled)$/i,$=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,N=/\s*<script +src=['"]([^'"]+)['"]>/,O=["<table>","</table>",1],R=["<table><tbody><tr>","</tr></tbody></table>",3],L=["<select>","</select>",1],j=["_","",0,1],B={thead:O,tbody:O,tfoot:O,colgroup:O,caption:O,tr:["<table><tbody>","</tbody></table>",2],th:R,td:R,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:L,optgroup:L,script:j,style:j,link:j,param:j,base:j},F=/^(checked|selected|disabled)$/,U={},I=0,q=/^-?[\d\.]+$/,W=/^data-(.+)$/,H="px",z="setAttribute",D="getAttribute",J=function(){var t=T.createElement("p");return{transform:function(){var e,n=["transform","webkitTransform","MozTransform","OTransform","msTransform"];for(e=0;e<n.length;e++)if(n[e]in t.style)return n[e]}(),classList:"classList"in t}}(),V=/\s+/,G=String.prototype.toString,X={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},Z=T.querySelectorAll&&function(t){return T.querySelectorAll(t)};return J.classList?(E=function(t,e){return t.classList.contains(e)},_=function(t,e){t.classList.add(e)},k=function(t,e){t.classList.remove(e)}):(E=function(t,e){return r(e).test(t.className)},_=function(t,e){t.className=(t.className+" "+e).trim()},k=function(t,e){t.className=t.className.replace(r(e)," ").trim()}),v.prototype={get:function(t){return this[t]||null},each:function(t,e){return o(this,t,e)},deepEach:function(t,e){return i(this,t,e)},map:function(t,e){var n,r,o=[];for(r=0;r<this.length;r++)n=t.call(this,this[r],r),e?e(n)&&o.push(n):o.push(n);return o},html:function(t,e){var r=e?"textContent":"innerHTML",i=this,u=function(e,r){o(n(t,i,r),function(t){e.appendChild(t)})},s=function(n,o){try{if(e||"string"==typeof t&&!$.test(n.tagName))return n[r]=t}catch(i){}u(n,o)};return"undefined"!=typeof t?this.empty().each(s):this[0]?this[0][r]:""},text:function(t){return this.html(t,!0)},append:function(t){var e=this;return this.each(function(r,i){o(n(t,e,i),function(t){r.appendChild(t)})})},prepend:function(t){var e=this;return this.each(function(r,i){var u=r.firstChild;o(n(t,e,i),function(t){r.insertBefore(t,u)})})},appendTo:function(t,e){return p.call(this,t,e,function(t,e){t.appendChild(e)})},prependTo:function(t,e){return p.call(this,t,e,function(t,e){t.insertBefore(e,t.firstChild)},1)},before:function(t){var e=this;return this.each(function(r,i){o(n(t,e,i),function(t){r[P].insertBefore(t,r)})})},after:function(t){var e=this;return this.each(function(r,i){o(n(t,e,i),function(t){r[P].insertBefore(t,r.nextSibling)},null,1)})},insertBefore:function(t,e){return p.call(this,t,e,function(t,e){t[P].insertBefore(e,t)})},insertAfter:function(t,e){return p.call(this,t,e,function(t,e){var n=t.nextSibling;n?t[P].insertBefore(e,n):t[P].appendChild(e)},1)},replaceWith:function(t){var e=this;return this.each(function(r,i){o(n(t,e,i),function(t){r[P]&&r[P].replaceChild(t,r)})})},clone:function(t){var e,n,r=[];for(n=0,e=this.length;e>n;n++)r[n]=y(t||this,this[n]);return C(r)},addClass:function(t){return t=G.call(t).split(V),this.each(function(e){o(t,function(t){t&&!E(e,m(e,t))&&_(e,m(e,t))})})},removeClass:function(t){return t=G.call(t).split(V),this.each(function(e){o(t,function(t){t&&E(e,m(e,t))&&k(e,m(e,t))})})},hasClass:function(t){return t=G.call(t).split(V),f(this,function(e){return f(t,function(t){return t&&E(e,t)})})},toggleClass:function(t,e){return t=G.call(t).split(V),this.each(function(n){o(t,function(t){t&&("undefined"!=typeof e?e?!E(n,t)&&_(n,t):k(n,t):E(n,t)?k(n,t):_(n,t))})})},show:function(t){return t="string"==typeof t?t:"",this.each(function(e){e.style.display=t})},hide:function(){return this.each(function(t){t.style.display="none"})},toggle:function(t,e){return e="string"==typeof e?e:"","function"!=typeof t&&(t=null),this.each(function(n){n.style.display=n.offsetWidth||n.offsetHeight?"none":e,t&&t.call(n)})},first:function(){return C(this.length?this[0]:[])},last:function(){return C(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(P)},related:function(t){return C(this.map(function(e){for(e=e[t];e&&1!==e.nodeType;)e=e[t];return e||0},function(t){return t}))},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(e,n){function r(t,e,n){for(var r in i)if(i.hasOwnProperty(r)){n=i[r],(e=d(r))&&q.test(n)&&!(e in X)&&(n+=H);try{t.style[e]=m(t,n)}catch(o){}}}var o,i=e;return void 0===n&&"string"==typeof e?(n=this[0],n?n===T||n===S?(o=n===T?C.doc():C.viewport(),"width"==e?o.width:"height"==e?o.height:""):(e=d(e))?t(n,e):null:null):("string"==typeof e&&(i={},i[e]=n),this.each(r))},offset:function(t,e){if(t&&"object"==typeof t&&("number"==typeof t.top||"number"==typeof t.left))return this.each(function(e){h(e,t.left,t.top)});if("number"==typeof t||"number"==typeof e)return this.each(function(n){h(n,t,e)});if(!this[0])return{top:0,left:0,height:0,width:0};var n=this[0],r=n.ownerDocument.documentElement,o=n.getBoundingClientRect(),i=x(),u=n.offsetWidth,s=n.offsetHeight,a=o.top+i.y-Math.max(0,r&&r.clientTop,T.body.clientTop),c=o.left+i.x-Math.max(0,r&&r.clientLeft,T.body.clientLeft);return{top:a,left:c,height:s,width:u}},dim:function(){if(!this.length)return{height:0,width:0};var t=this[0],e=9==t.nodeType&&t.documentElement,n=e||!t.style||t.offsetWidth||t.offsetHeight?null:function(e){var n={position:t.style.position||"",visibility:t.style.visibility||"",display:t.style.display||""};return e.first().css({position:"absolute",visibility:"hidden",display:"block"}),n}(this),r=e?Math.max(t.body.scrollWidth,t.body.offsetWidth,e.scrollWidth,e.offsetWidth,e.clientWidth):t.offsetWidth,o=e?Math.max(t.body.scrollHeight,t.body.offsetHeight,e.scrollHeight,e.offsetHeight,e.clientHeight):t.offsetHeight;return n&&this.first().css(n),{height:o,width:r}},attr:function(t,e){var n,r=this[0];if("string"!=typeof t&&!(t instanceof String)){for(n in t)t.hasOwnProperty(n)&&this.attr(n,t[n]);return this}return"undefined"==typeof e?r?M.test(t)?F.test(t)&&"string"==typeof r[t]?!0:r[t]:r[D](t):null:this.each(function(n){M.test(t)?n[t]=m(n,e):n[z](t,m(n,e))})},removeAttr:function(t){return this.each(function(e){F.test(t)?e[t]=!1:e.removeAttribute(t)})},val:function(t){return"string"==typeof t||"number"==typeof t?this.attr("value",t):this.length?this[0].value:null},data:function(t,e){var n,r,i=this[0];return"undefined"==typeof e?i?(n=a(i),"undefined"==typeof t?(o(i.attributes,function(t){(r=(""+t.name).match(W))&&(n[u(r[1])]=l(t.value))}),n):("undefined"==typeof n[t]&&(n[t]=l(this.attr("data-"+s(t)))),n[t])):null:this.each(function(n){a(n)[t]=e})},remove:function(){return this.deepEach(c),this.detach()},empty:function(){return this.each(function(t){for(i(t.childNodes,c);t.firstChild;)t.removeChild(t.firstChild)})},detach:function(){return this.each(function(t){t[P]&&t[P].removeChild(t)})},scrollTop:function(t){return g.call(this,null,t,"y")},scrollLeft:function(t){return g.call(this,t,null,"x")}},C.setQueryEngine=function(t){Z=t,delete C.setQueryEngine},C.aug=function(t,e){for(var n in t)t.hasOwnProperty(n)&&((e||v.prototype)[n]=t[n])},C.create=function(t){return"string"==typeof t&&""!==t?function(){if(N.test(t))return[w(t)];var e=t.match(/^\s*<([^\s>]+)/),n=T.createElement("div"),r=[],i=e?B[e[1].toLowerCase()]:null,u=i?i[2]+1:1,s=i&&i[3],a=P;for(n.innerHTML=i?i[0]+t+i[1]:t;u--;)n=n.firstChild;s&&n&&1!==n.nodeType&&(n=n.nextSibling);do e&&1!=n.nodeType||r.push(n);while(n=n.nextSibling);return o(r,function(t){t[a]&&t[a].removeChild(t)}),r}():e(t)?[t.cloneNode(!0)]:[]},C.doc=function(){var t=C.viewport();return{width:Math.max(T.body.scrollWidth,A.scrollWidth,t.width),height:Math.max(T.body.scrollHeight,A.scrollHeight,t.height)}},C.firstChild=function(t){for(var e,n=t.childNodes,r=0,o=n&&n.length||0;o>r;r++)1===n[r].nodeType&&(e=n[o=r]);return e},C.viewport=function(){return{width:S.innerWidth,height:S.innerHeight}},C.isAncestor="compareDocumentPosition"in A?function(t,e){return 16==(16&t.compareDocumentPosition(e))}:function(t,e){return t!==e&&t.contains(e)},C}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("qwery",n):e[t]=n()}("qwery",this,function(){function t(t){return[].slice.call(t,0)}function e(t){var e;return t&&"object"==typeof t&&(e=t.nodeType)&&(1==e||9==e)}function n(t){return"object"==typeof t&&isFinite(t.length)}function r(t){for(var e=[],r=0,o=t.length;o>r;++r)n(t[r])?e=e.concat(t[r]):e[e.length]=t[r];return e}function o(t){var e,n,r=[];t:for(e=0;e<t.length;e++){for(n=0;n<r.length;n++)if(r[n]==t[e])continue t;r[r.length]=t[e]}return r}function i(t){return t?"string"==typeof t?u(t)[0]:!t[f]&&n(t)?t[0]:t:a}function u(o,u){var l,f=i(u);return f&&o?o===c||e(o)?!u||o!==c&&e(f)&&d(o,f)?[o]:[]:o&&n(o)?r(o):a.getElementsByClassName&&"string"==o&&(l=o.match(s))?t(f.getElementsByClassName(l[1])):o&&(o.document||o.nodeType&&9==o.nodeType)?u?[]:[o]:t(f.querySelectorAll(o)):[]}var s=/^\.([\w\-]+)$/,a=document,c=window,l=a.documentElement,f="nodeType",d="compareDocumentPosition"in l?function(t,e){return 16==(16&e.compareDocumentPosition(t))}:function(t,e){return e=e==a||e==window?l:e,e!==t&&e.contains(t)};return u.uniq=o,u},this),define("modules/$",["bonzo","qwery"],function(t,e){"use strict";function n(n,r){return t(e(n,r))}return n}),define("modules/ads",["modules/$","bonzo"],function(t,e){"use strict";var n="advert-mpu-content",r="advert-mobile-mpu-content",o="advert-banner-content",i={insertAdPlaceholders:function(e){var i=(window.innerWidth,0);if(t(".article__body > div > *:nth-child(-n+3)").each(function(){var e=t(this)[0].tagName;"P"==e||"H2"==e||"BLOCKQUOTE"==e?i++:("FIGURE"==e&&t(this).hasClass("element-placeholder")||t(this).hasClass("element-video"))&&i++}),"tablet"==e.adsConfig&&3==i){var u="<div class='advert-slot advert-slot--mpu advert-slot--mpu--tablet'><div class='advert-slot__label'>Advertisement<a class='advert-slot__action' href='x-gu://subscribe'>Hide<span data-icon='&#xe04F;'></span></a></div><div class=\"advert-slot__wrapper\" id=\"advert-slot__wrapper\"><div class='advert-slot__wrapper__content' id="+n+"></div></div></div>";t(".article__body > div > p:nth-of-type(1)").before(u)}else if("mobile"==e.adsConfig){var s="<div class='advert-slot advert-slot--mpu advert-slot--mpu--mobile'><div class='advert-slot__label'>Advertisement<a class='advert-slot__action' href='x-gu://subscribe'>Hide<span data-icon='&#xe04F;'></span></a></div><div class=\"advert-slot__wrapper\" id=\"advert-slot__wrapper\"><div class='advert-slot__wrapper__content' id="+r+"></div></div></div>",a="<div class='advert-slot__wrapper__content' id="+o+"></div>",c=(parseInt(e.mpuAfterParagraphs,10)||6)-1;t(".article__body > div > p:nth-of-type("+c+") ~ p + p").first().before(s),t(".advert-slot__wrapper").prepend(a)}},getBannerPos:function(t){var e,n=document.getElementById("banner_container");return n?(e=n.getBoundingClientRect(),t(e.left+document.body.scrollLeft,e.top+document.body.scrollTop,e.width,e.height)):null},getMpuPos:function(t){var e,n=document.getElementById("advert-slot__wrapper");return n?(e=n.getBoundingClientRect(),0!==e.width&&0!==e.height?t(e.left+document.body.scrollLeft,e.top+document.body.scrollTop,e.width,e.height):void 0):null},getMpuPosJson:function(){return i.getMpuPos(function(t,e,n,r){return'{"left":'+t+', "top":'+e+', "width":'+n+', "height":'+r+"}"})},getMpuPosCommaSeparated:function(){return i.getMpuPos(function(t,e,n,r){return t+","+e})},getMpuOffsetTop:function(){return i.getMpuPos(function(t,e,n,r){return e})},getBannerPosCallback:function(){i.getBannerPos(function(t,e,n,r){window.GuardianJSInterface.bannerAdsPosition(t,e,n,r)})},poller:function(t,e,n){var r=i.getMpuOffsetTop();n&&this.isAndroid&&i.updateAndroidPosition(),r!==e&&(this.isAndroid?i.updateAndroidPosition():window.location.href="x-gu://ad_moved"),
setTimeout(i.poller.bind(i,t+50,r),t)},updateAndroidPosition:function(){i.getMpuPos(function(t,e,n,r){window.GuardianJSInterface.mpuAdsPosition(t,e,n,r)})},initMpuPoller:function(){i.poller(1e3,i.getMpuOffsetTop(),!0)},fireAdsReady:function(e){t("body").hasClass("no-ready")||"true"!==t("body").attr("data-use-ads-ready")||(e.location.href="x-gu://ads-ready")}},u=function(e){i.isAndroid=t("body").hasClass("android"),this.initialised||(this.initialised=!0,("true"==e.adsEnabled||null!==e.adsEnabled&&e.adsEnabled.match&&e.adsEnabled.match(/mpu/))&&(i.insertAdPlaceholders(e),window.getMpuPosJson=i.getMpuPosJson,window.getBannerPosCallback=i.getBannerPosCallback,window.getMpuPosCommaSeparated=i.getMpuPosCommaSeparated,window.initMpuPoller=i.initMpuPoller,window.applyNativeFunctionCall("initMpuPoller"),window.applyNativeFunctionCall("getBannerPosCallback"),i.isAndroid||i.initMpuPoller()),i.fireAdsReady(window))};return{init:u,modules:i}});var gu=document.getElementById("gu"),baseUrl=gu.getAttribute("data-js-dir");require.config({paths:{bonzo:"../../../node_modules/bonzo/bonzo",bean:"../../../node_modules/bean/bean",d3:"../../../node_modules/d3/d3",domReady:"../../../node_modules/domready/ready",mobileSlider:"components/mobile-range-slider",throttleDebounce:"components/throttle-debounce",flipSnap:"components/flipsnap",fastClick:"../../../node_modules/fastclick/lib/fastclick",qwery:"../../../node_modules/qwery/qwery",fence:"../../../node_modules/fence/fence",smoothScroll:"../../../node_modules/smooth-scroll/dist/js/smooth-scroll",raven:"../../../node_modules/raven-js/dist/raven"},shim:{d3:{exports:"d3"}}}),require(["domReady","modules/monitor","modules/ads"],function(t,e,n){"use strict";function r(t){var e=document.body.getAttribute("data-template-directory"),n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e+t,document.getElementsByTagName("head")[0].appendChild(n)}t(function(){var t=document.body.getAttribute("data-content-type");e.init(),n.init({adsEnabled:document.body.getAttribute("data-ads-enabled"),adsConfig:document.body.getAttribute("data-ads-config"),mpuAfterParagraphs:document.body.getAttribute("data-mpu-after-paragraphs")}),"article"===t?require(["article"],function(t){e.setContext("article",function(){t.init()})}):"liveblog"===t?require(["liveblog"],function(t){e.setContext("liveblog",function(){t.init()})}):"audio"===t?require(["audio"],function(t){e.setContext("audio",function(){t.init()})}):"gallery"===t?require(["gallery"],function(t){e.setContext("gallery",function(){t.init()})}):"football"===t?require(["football"],function(t){e.setContext("football",function(){t.init()})}):"cricket"===t?require(["cricket"],function(t){e.setContext("cricket",function(){t.init()})}):require(["bootstraps/common"],function(t){e.setContext("common",function(){t.init()})})});var o=document.getElementById("gu"),i=o.getAttribute("data-skip-style");i||r("assets/css/style-async.css")}),define("app",function(){});