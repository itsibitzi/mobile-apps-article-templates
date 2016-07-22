!function(t,e){"undefined"!=typeof module?module.exports=e():"function"==typeof define&&"object"==typeof define.amd?define("domReady",e):this[t]=e()}("domready",function(){var t,e=[],n=document,r=n.documentElement.doScroll,i="DOMContentLoaded",o=(r?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return o||n.addEventListener(i,t=function(){for(n.removeEventListener(i,t),o=1;t=e.shift();)t()}),function(t){o?setTimeout(t,0):e.push(t)}}),function(t,e){"use strict";function n(){return"undefined"==typeof document?"":document.location.href}function r(t,e){var n,r;if(q){e=e||{},t="raven"+t.substr(0,1).toUpperCase()+t.substr(1),document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t);for(r in e)d(e,r)&&(n[r]=e[r]);if(document.createEvent)document.dispatchEvent(n);else try{document.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(i){}}}function i(t){this.name="RavenConfigError",this.message=t}function o(t){var e=et.exec(t),n={},r=7;try{for(;r--;)n[tt[r]]=e[r]||""}catch(o){throw new i("Invalid DSN: "+t)}if(n.pass)throw new i("Do not specify your private key in the DSN!");return n}function u(t){return void 0===t}function s(t){return"function"==typeof t}function c(t){return"[object String]"===J.toString.call(t)}function l(t){return"object"==typeof t&&null!==t}function a(t){for(var e in t)return!1;return!0}function f(t){return l(t)&&"[object Error]"===J.toString.call(t)||t instanceof Error}function d(t,e){return J.hasOwnProperty.call(t,e)}function p(t,e){var n,r;if(u(t.length))for(n in t)d(t,n)&&e.call(null,n,t[n]);else if(r=t.length)for(n=0;r>n;n++)e.call(null,n,t[n])}function h(t,e){var n=[];t.stack&&t.stack.length&&p(t.stack,function(t,e){var r=m(e);r&&n.push(r)}),r("handle",{stackInfo:t,options:e}),v(t.name,t.message,t.url,t.lineno,n,e)}function m(t){if(t.url){var e,n={filename:t.url,lineno:t.line,colno:t.column,"function":t.func||"?"},r=g(t);if(r){var i=["pre_context","context_line","post_context"];for(e=3;e--;)n[i[e]]=r[e]}return n.in_app=!(z.includePaths.test&&!z.includePaths.test(n.filename)||/(Raven|TraceKit)\./.test(n["function"])||/raven\.(min\.)?js$/.test(n.filename)),n}}function g(t){if(t.context&&z.fetchContext){for(var e=t.context,n=~~(e.length/2),r=e.length,i=!1;r--;)if(e[r].length>300){i=!0;break}if(i){if(u(t.column))return;return[[],e[n].substr(t.column,50),[]]}return[e.slice(0,n),e[n],e.slice(n+1)]}}function v(t,e,n,r,i,o){var u,s;z.ignoreErrors.test&&z.ignoreErrors.test(e)||(e+="",s=t+": "+e,i&&i.length?(n=i[0].filename||n,i.reverse(),u={frames:i}):n&&(u={frames:[{filename:n,lineno:r,in_app:!0}]}),z.ignoreUrls.test&&z.ignoreUrls.test(n)||(!z.whitelistUrls.test||z.whitelistUrls.test(n))&&C(y({exception:{values:[{type:t,value:e,stacktrace:u}]},culprit:n,message:s},o)))}function y(t,e){return e?(p(e,function(e,n){t[e]=n}),t):t}function b(t,e){return t.length<=e?t:t.substr(0,e)+"…"}function x(t){var e=z.maxMessageLength;if(t.message=b(t.message,e),t.exception){var n=t.exception.values[0];n.value=b(n.value,e)}return t}function w(){return+new Date}function E(){if(q&&document.location&&document.location.href){var t={headers:{"User-Agent":navigator.userAgent}};return t.url=document.location.href,document.referrer&&(t.headers.Referer=document.referrer),t}}function C(t){var e={project:F,logger:z.logger,platform:"javascript"},n=E();n&&(e.request=n),t=y(e,t),t.tags=y(y({},D.tags),t.tags),t.extra=y(y({},D.extra),t.extra),t.extra["session:duration"]=w()-K,a(t.tags)&&delete t.tags,D.user&&(t.user=D.user),z.release&&(t.release=z.release),z.serverName&&(t.server_name=z.serverName),s(z.dataCallback)&&(t=z.dataCallback(t)||t),t&&!a(t)&&(!s(z.shouldSendCallback)||z.shouldSendCallback(t))&&(H=t.event_id||(t.event_id=M()),t=x(t),P("debug","Raven about to send:",t),k()&&(z.transport||S)({url:W,auth:{sentry_version:"7",sentry_client:"raven-js/"+Y.VERSION,sentry_key:j},data:t,options:z,onSuccess:function(){r("success",{data:t,src:W})},onError:function(){r("failure",{data:t,src:W})}}))}function S(t){t.auth.sentry_data=JSON.stringify(t.data);var e=T(),n=t.url+"?"+L(t.auth),r=t.options.crossOrigin;(r||""===r)&&(e.crossOrigin=r),e.onload=t.onSuccess,e.onerror=e.onabort=t.onError,e.src=n}function T(){return document.createElement("img")}function k(){return B?W?!0:(nt||P("error","Error: Raven has not been configured."),nt=!0,!1):!1}function _(t){for(var e,n=[],r=0,i=t.length;i>r;r++)e=t[r],c(e)?n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):e&&e.source&&n.push(e.source);return new RegExp(n.join("|"),"i")}function M(){var e=t.crypto||t.msCrypto;if(!u(e)&&e.getRandomValues){var n=new Uint16Array(8);e.getRandomValues(n),n[3]=4095&n[3]|16384,n[4]=16383&n[4]|32768;var r=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return r(n[0])+r(n[1])+r(n[2])+r(n[3])+r(n[4])+r(n[5])+r(n[6])+r(n[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0,n="x"==t?e:3&e|8;return n.toString(16)})}function P(t){X[t]&&Y.debug&&X[t].apply(V,$.call(arguments,1))}function A(){var e=t.RavenConfig;e&&Y.config(e.dsn,e.config).install()}function L(t){var e=[];return p(t,function(t,n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}),e.join("&")}function N(t,e){u(e)?delete D[t]:D[t]=y(D[t]||{},e)}var O={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7,debug:!1},$=[].slice,R="?";O.report=function(){function r(t){c(),m.push(t)}function i(t){for(var e=m.length-1;e>=0;--e)m[e]===t&&m.splice(e,1)}function o(){l(),m=[]}function u(t,e){var n=null;if(!e||O.collectWindowErrors){for(var r in m)if(d(m,r))try{m[r].apply(null,[t].concat($.call(arguments,2)))}catch(i){n=i}if(n)throw n}}function s(t,e,r,i,o){var s=null;if(y)O.computeStackTrace.augmentStackTraceWithInitialElement(y,e,r,t),a();else if(o)s=O.computeStackTrace(o),u(s,!0);else{var c={url:e,line:r,column:i};c.func=O.computeStackTrace.guessFunctionName(c.url,c.line),c.context=O.computeStackTrace.gatherContext(c.url,c.line),s={message:t,url:n(),stack:[c]},u(s,!0)}return p?p.apply(this,arguments):!1}function c(){h||(p=t.onerror,t.onerror=s,h=!0)}function l(){h&&(t.onerror=p,h=!1,p=e)}function a(){var t=y,e=g;g=null,y=null,v=null,u.apply(null,[t,!1].concat(e))}function f(e,n){var r=$.call(arguments,1);if(y){if(v===e)return;a()}var i=O.computeStackTrace(e);if(y=i,v=e,g=r,t.setTimeout(function(){v===e&&a()},i.incomplete?2e3:0),n!==!1)throw e}var p,h,m=[],g=null,v=null,y=null;return f.subscribe=r,f.unsubscribe=i,f.uninstall=o,f}(),O.computeStackTrace=function(){function e(e){if(!O.remoteFetching)return"";try{var n=function(){try{return new t.XMLHttpRequest}catch(e){return new t.ActiveXObject("Microsoft.XMLHTTP")}},r=n();return r.open("GET",e,!1),r.send(""),r.responseText}catch(i){return""}}function r(t){if(!c(t))return[];if(!d(x,t)){var n="",r="";try{r=document.domain}catch(i){}-1!==t.indexOf(r)&&(n=e(t)),x[t]=n?n.split("\n"):[]}return x[t]}function i(t,e){var n,i=/function ([^(]*)\(([^)]*)\)/,o=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,s="",c=10,l=r(t);if(!l.length)return R;for(var a=0;c>a;++a)if(s=l[e-a]+s,!u(s)){if(n=o.exec(s))return n[1];if(n=i.exec(s))return n[1]}return R}function o(t,e){var n=r(t);if(!n.length)return null;var i=[],o=Math.floor(O.linesOfContext/2),s=o+O.linesOfContext%2,c=Math.max(0,e-o-1),l=Math.min(n.length,e+s-1);e-=1;for(var a=c;l>a;++a)u(n[a])||i.push(n[a]);return i.length>0?i:null}function s(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function l(t){return s(t).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function a(t,e){for(var n,i,o=0,u=e.length;u>o;++o)if((n=r(e[o])).length&&(n=n.join("\n"),i=t.exec(n)))return{url:e[o],line:n.substring(0,i.index).split("\n").length,column:i.index-n.lastIndexOf("\n",i.index)-1};return null}function f(t,e,n){var i,o=r(e),u=new RegExp("\\b"+s(t)+"\\b");return n-=1,o&&o.length>n&&(i=u.exec(o[n]))?i.index:null}function p(e){if("undefined"!=typeof document){for(var n,r,i,o,u=[t.location.href],c=document.getElementsByTagName("script"),f=""+e,d=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,p=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,h=0;h<c.length;++h){var m=c[h];m.src&&u.push(m.src)}if(i=d.exec(f)){var g=i[1]?"\\s+"+i[1]:"",v=i[2].split(",").join("\\s*,\\s*");n=s(i[3]).replace(/;$/,";?"),r=new RegExp("function"+g+"\\s*\\(\\s*"+v+"\\s*\\)\\s*{\\s*"+n+"\\s*}")}else r=new RegExp(s(f).replace(/\s+/g,"\\s+"));if(o=a(r,u))return o;if(i=p.exec(f)){var y=i[1];if(n=l(i[2]),r=new RegExp("on"+y+"=[\\'\"]\\s*"+n+"\\s*[\\'\"]","i"),o=a(r,u[0]))return o;if(r=new RegExp(n),o=a(r,u))return o}return null}}function h(t){if(!u(t.stack)&&t.stack){for(var e,r,s=/^\s*at (.*?) ?\(?((?:(?:file|https?|chrome-extension):.*?)|<anonymous>):(\d+)(?::(\d+))?\)?\s*$/i,c=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,l=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,a=t.stack.split("\n"),d=[],p=/^(.*) is undefined$/.exec(t.message),h=0,m=a.length;m>h;++h){if(e=c.exec(a[h]))r={url:e[3],func:e[1]||R,args:e[2]?e[2].split(","):"",line:+e[4],column:e[5]?+e[5]:null};else if(e=s.exec(a[h]))r={url:e[2],func:e[1]||R,line:+e[3],column:e[4]?+e[4]:null};else{if(!(e=l.exec(a[h])))continue;r={url:e[2],func:e[1]||R,line:+e[3],column:e[4]?+e[4]:null}}!r.func&&r.line&&(r.func=i(r.url,r.line)),r.line&&(r.context=o(r.url,r.line)),d.push(r)}return d.length?(d[0].line&&!d[0].column&&p?d[0].column=f(p[1],d[0].url,d[0].line):d[0].column||u(t.columnNumber)||(d[0].column=t.columnNumber+1),{name:t.name,message:t.message,url:n(),stack:d}):null}}function m(t){var e=t.stacktrace;if(!u(t.stacktrace)&&t.stacktrace){for(var r,s=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,c=e.split("\n"),l=[],a=0,f=c.length;f>a;a+=2)if(r=s.exec(c[a])){var d={line:+r[1],column:+r[2],func:r[3]||r[4],args:r[5]?r[5].split(","):[],url:r[6]};if(!d.func&&d.line&&(d.func=i(d.url,d.line)),d.line)try{d.context=o(d.url,d.line)}catch(p){}d.context||(d.context=[c[a+1]]),l.push(d)}return l.length?{name:t.name,message:t.message,url:n(),stack:l}:null}}function g(e){var u=e.message.split("\n");if(u.length<4)return null;var s,c,f,p,h=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,m=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,g=/^\s*Line (\d+) of function script\s*$/i,v=[],y=document.getElementsByTagName("script"),b=[];for(c in y)d(y,c)&&!y[c].src&&b.push(y[c]);for(c=2,f=u.length;f>c;c+=2){var x=null;if(s=h.exec(u[c]))x={url:s[2],func:s[3],line:+s[1]};else if(s=m.exec(u[c])){x={url:s[3],func:s[4]};var w=+s[1],E=b[s[2]-1];if(E&&(p=r(x.url))){p=p.join("\n");var C=p.indexOf(E.innerText);C>=0&&(x.line=w+p.substring(0,C).split("\n").length)}}else if(s=g.exec(u[c])){var S=t.location.href.replace(/#.*$/,""),T=s[1],k=new RegExp(l(u[c+1]));p=a(k,[S]),x={url:S,line:p?p.line:T,func:""}}if(x){x.func||(x.func=i(x.url,x.line));var _=o(x.url,x.line),M=_?_[Math.floor(_.length/2)]:null;_&&M.replace(/^\s*/,"")===u[c+1].replace(/^\s*/,"")?x.context=_:x.context=[u[c+1]],v.push(x)}}return v.length?{name:e.name,message:u[0],url:n(),stack:v}:null}function v(t,e,n,r){var u={url:e,line:n};if(u.url&&u.line){t.incomplete=!1,u.func||(u.func=i(u.url,u.line)),u.context||(u.context=o(u.url,u.line));var s=/ '([^']+)' /.exec(r);if(s&&(u.column=f(s[1],u.url,u.line)),t.stack.length>0&&t.stack[0].url===u.url){if(t.stack[0].line===u.line)return!1;if(!t.stack[0].line&&t.stack[0].func===u.func)return t.stack[0].line=u.line,t.stack[0].context=u.context,!1}return t.stack.unshift(u),t.partial=!0,!0}return t.incomplete=!0,!1}function y(t,e){for(var r,o,u,s=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,c=[],l={},a=!1,d=y.caller;d&&!a;d=d.caller)if(d!==b&&d!==O.report){if(o={url:null,func:R,line:null,column:null},d.name?o.func=d.name:(r=s.exec(d.toString()))&&(o.func=r[1]),"undefined"==typeof o.func)try{o.func=r.input.substring(0,r.input.indexOf("{"))}catch(h){}if(u=p(d)){o.url=u.url,o.line=u.line,o.func===R&&(o.func=i(o.url,o.line));var m=/ '([^']+)' /.exec(t.message||t.description);m&&(o.column=f(m[1],u.url,u.line))}l[""+d]?a=!0:l[""+d]=!0,c.push(o)}e&&c.splice(0,e);var g={name:t.name,message:t.message,url:n(),stack:c};return v(g,t.sourceURL||t.fileName,t.line||t.lineNumber,t.message||t.description),g}function b(t,e){var r=null;e=null==e?0:+e;try{if(r=m(t))return r}catch(i){if(O.debug)throw i}try{if(r=h(t))return r}catch(i){if(O.debug)throw i}try{if(r=g(t))return r}catch(i){if(O.debug)throw i}try{if(r=y(t,e+1))return r}catch(i){if(O.debug)throw i}return{name:t.name,message:t.message,url:n()}}var x={};return b.augmentStackTraceWithInitialElement=v,b.computeStackTraceFromStackProp=h,b.guessFunctionName=i,b.gatherContext=o,b}();var U,H,W,j,F,I=t.Raven,B=!("object"!=typeof JSON||!JSON.stringify),q="undefined"!=typeof document,D={},z={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],crossOrigin:"anonymous",collectWindowErrors:!0,maxMessageLength:100},G=!1,J=Object.prototype,V=t.console||{},X={},Z=[],K=w();for(var Q in V)X[Q]=V[Q];var Y={VERSION:"1.3.0",debug:!1,noConflict:function(){return t.Raven=I,Y},config:function(t,e){if(W)return P("error","Error: Raven has already been configured"),Y;if(!t)return Y;var n=o(t),r=n.path.lastIndexOf("/"),i=n.path.substr(1,r);return e&&p(e,function(t,e){"tags"==t||"extra"==t?D[t]=e:z[t]=e}),z.ignoreErrors.push(/^Script error\.?$/),z.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),z.ignoreErrors=_(z.ignoreErrors),z.ignoreUrls=z.ignoreUrls.length?_(z.ignoreUrls):!1,z.whitelistUrls=z.whitelistUrls.length?_(z.whitelistUrls):!1,z.includePaths=_(z.includePaths),j=n.user,F=n.path.substr(r+1),W="//"+n.host+(n.port?":"+n.port:"")+"/"+i+"api/"+F+"/store/",n.protocol&&(W=n.protocol+":"+W),z.fetchContext&&(O.remoteFetching=!0),z.linesOfContext&&(O.linesOfContext=z.linesOfContext),O.collectWindowErrors=!!z.collectWindowErrors,Y},install:function(){return k()&&!G&&(O.report.subscribe(h),p(Z,function(t,e){e()}),G=!0),Y},context:function(t,n,r){return s(t)&&(r=n||[],n=t,t=e),Y.wrap(t,n).apply(this,r)},wrap:function(t,n){function r(){for(var e=[],r=arguments.length,i=!t||t&&t.deep!==!1;r--;)e[r]=i?Y.wrap(t,arguments[r]):arguments[r];try{return n.apply(this,e)}catch(o){throw Y.captureException(o,t),o}}if(u(n)&&!s(t))return t;if(s(t)&&(n=t,t=e),!s(n))return n;if(n.__raven__)return n;for(var i in n)d(n,i)&&(r[i]=n[i]);return r.prototype=n.prototype,r.__raven__=!0,r.__inner__=n,r},uninstall:function(){return O.report.uninstall(),G=!1,Y},captureException:function(t,e){if(!f(t))return Y.captureMessage(t,e);U=t;try{var n=O.computeStackTrace(t);h(n,e)}catch(r){if(t!==r)throw r}return Y},captureMessage:function(t,e){return z.ignoreErrors.test&&z.ignoreErrors.test(t)?void 0:(C(y({message:t+""},e)),Y)},addPlugin:function(t){return Z.push(t),G&&t(),Y},setUserContext:function(t){return D.user=t,Y},setExtraContext:function(t){return N("extra",t),Y},setTagsContext:function(t){return N("tags",t),Y},clearContext:function(){return D={},Y},getContext:function(){return JSON.parse(JSON.stringify(D))},setRelease:function(t){return z.release=t,Y},setDataCallback:function(t){return z.dataCallback=t,Y},setShouldSendCallback:function(t){return z.shouldSendCallback=t,Y},setTransport:function(t){return z.transport=t,Y},lastException:function(){return U},lastEventId:function(){return H},isSetup:function(){return k()}};Y.setUser=Y.setUserContext,Y.setReleaseContext=Y.setRelease;var tt="source protocol user pass host port path".split(" "),et=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;i.prototype=new Error,i.prototype.constructor=i;var nt;A(),t.Raven=Y,"function"==typeof define&&define.amd?define("raven",[],function(){return Y}):"object"==typeof module?module.exports=Y:"object"==typeof exports&&(exports=Y)}("undefined"!=typeof window?window:this),define("modules/monitor",["raven"],function(t){var e={dsn:null,git_commit:"not available"};try{e={dsn:null,git_commit:"abc9f219ed6fcd6942b0fff2da0c78bc32b63dc4"}}catch(n){}var r={extractTags:function(){var t=document.body.getAttribute("class"),e=t.match(/tone--([^\s]+)/);return{itemTone:e?e[1]:null,itemId:document.body.getAttribute("data-page-id"),deviceKind:document.body.getAttribute("data-ads-config"),ads:"true"===document.body.getAttribute("data-ads-enabled")}},ignoreErrors:function(){var t=["fake"];return t.push=function(){},t},setContext:function(n,r){return e.dsn?t.context({tags:{context:n}},r):r()}},i=function(){var n=r.extractTags();!t.isSetup()&&e.dsn&&t.config(e.dsn,{tags:n,release:e.git_commit,ignoreErrors:r.ignoreErrors(),shouldSendCallback:function(t){t.stacktrace&&t.stacktrace.frames&&(t.stacktrace.frames=t.stacktrace.frames.reverse().slice(0,3).reverse());var e=35;return 100*Math.random()<=e}}).install()};return{init:i,setContext:r.setContext,modules:r,config:e,raven:t}}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("bonzo",n):e[t]=n()}("bonzo",this,function(){function t(t,e){var n=null,r=_.defaultView.getComputedStyle(t,"");return r&&(n=r[e]),t.style[e]||n}function e(t){return t&&t.nodeName&&(1==t.nodeType||11==t.nodeType)}function n(t,n,r){var i,o,u;if("string"==typeof t)return E.create(t);if(e(t)&&(t=[t]),r){for(u=[],i=0,o=t.length;o>i;i++)u[i]=y(n,t[i]);return u}return t}function r(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function i(t,e,n,r){for(var i,o=0,u=t.length;u>o;o++)i=r?t.length-o-1:o,e.call(n||t[i],t[i],i,t);return t}function o(t,n,r){for(var i=0,u=t.length;u>i;i++)e(t[i])&&(o(t[i].childNodes,n,r),n.call(r||t[i],t[i],i,t));return t}function u(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function s(t){return t?t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase():t}function c(t){t[z]("data-node-uid")||t[D]("data-node-uid",++F);var e=t[z]("data-node-uid");return j[e]||(j[e]={})}function l(t){var e=t[z]("data-node-uid");e&&delete j[e]}function a(t){var e;try{return null===t||void 0===t?void 0:"true"===t?!0:"false"===t?!1:"null"===t?null:(e=parseFloat(t))==t?e:t}catch(n){}}function f(t,e,n){for(var r=0,i=t.length;i>r;++r)if(e.call(n||null,t[r],r,t))return!0;return!1}function d(t){return"transform"==t&&(t=G.transform)||/^transform-?[Oo]rigin$/.test(t)&&(t=G.transform+"Origin"),t?u(t):null}function p(t,e,r,o){var u=0,s=e||this,c=[],l=Z&&"string"==typeof t&&"<"!=t.charAt(0)?Z(t):t;return i(n(l),function(t,e){i(s,function(n){r(t,c[u++]=e>0?y(s,n):n)},null,o)},this,o),s.length=u,i(c,function(t){s[--u]=t},null,!o),s}function h(t,e,n){var r=E(t),i=r.css("position"),o=r.offset(),u="relative",s=i==u,c=[parseInt(r.css("left"),10),parseInt(r.css("top"),10)];"static"==i&&(r.css("position",u),i=u),isNaN(c[0])&&(c[0]=s?0:t.offsetLeft),isNaN(c[1])&&(c[1]=s?0:t.offsetTop),null!=e&&(t.style.left=e-o.left+c[0]+q),null!=n&&(t.style.top=n-o.top+c[1]+q)}function m(t,e){return"function"==typeof e?e.call(t,t):e}function g(t,e,n){var r=this[0];return r?null==t&&null==e?(b(r)?x():{x:r.scrollLeft,y:r.scrollTop})[n]:(b(r)?k.scrollTo(t,e):(null!=t&&(r.scrollLeft=t),null!=e&&(r.scrollTop=e)),this):this}function v(t){if(this.length=0,t){t="string"==typeof t||t.nodeType||"undefined"==typeof t.length?[t]:t,this.length=t.length;for(var e=0;e<t.length;e++)this[e]=t[e]}}function y(t,e){var n,r,i,o=e.cloneNode(!0);if(t.$&&"function"==typeof t.cloneEvents)for(t.$(o).cloneEvents(e),n=t.$(o).find("*"),r=t.$(e).find("*"),i=0;i<r.length;i++)t.$(n[i]).cloneEvents(r[i]);return o}function b(t){return t===k||/^(?:body|html)$/i.test(t.tagName)}function x(){return{x:k.pageXOffset||M.scrollLeft,y:k.pageYOffset||M.scrollTop}}function w(t){var e=document.createElement("script"),n=t.match(N);return e.src=n[1],e}function E(t){return new v(t)}var C,S,T,k=window,_=k.document,M=_.documentElement,P="parentNode",A=/^(checked|value|selected|disabled)$/i,L=/^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,N=/\s*<script +src=['"]([^'"]+)['"]>/,O=["<table>","</table>",1],$=["<table><tbody><tr>","</tr></tbody></table>",3],R=["<select>","</select>",1],U=["_","",0,1],H={thead:O,tbody:O,tfoot:O,colgroup:O,caption:O,tr:["<table><tbody>","</tbody></table>",2],th:$,td:$,col:["<table><colgroup>","</colgroup></table>",2],fieldset:["<form>","</form>",1],legend:["<form><fieldset>","</fieldset></form>",2],option:R,optgroup:R,script:U,style:U,link:U,param:U,base:U},W=/^(checked|selected|disabled)$/,j={},F=0,I=/^-?[\d\.]+$/,B=/^data-(.+)$/,q="px",D="setAttribute",z="getAttribute",G=function(){var t=_.createElement("p");return{transform:function(){var e,n=["transform","webkitTransform","MozTransform","OTransform","msTransform"];for(e=0;e<n.length;e++)if(n[e]in t.style)return n[e]}(),classList:"classList"in t}}(),J=/\s+/,V=String.prototype.toString,X={lineHeight:1,zoom:1,zIndex:1,opacity:1,boxFlex:1,WebkitBoxFlex:1,MozBoxFlex:1},Z=_.querySelectorAll&&function(t){return _.querySelectorAll(t)};return G.classList?(C=function(t,e){return t.classList.contains(e)},S=function(t,e){t.classList.add(e)},T=function(t,e){t.classList.remove(e)}):(C=function(t,e){return r(e).test(t.className)},S=function(t,e){t.className=(t.className+" "+e).trim()},T=function(t,e){t.className=t.className.replace(r(e)," ").trim()}),v.prototype={get:function(t){return this[t]||null},each:function(t,e){return i(this,t,e)},deepEach:function(t,e){return o(this,t,e)},map:function(t,e){var n,r,i=[];for(r=0;r<this.length;r++)n=t.call(this,this[r],r),e?e(n)&&i.push(n):i.push(n);return i},html:function(t,e){var r=e?"textContent":"innerHTML",o=this,u=function(e,r){i(n(t,o,r),function(t){e.appendChild(t)})},s=function(n,i){try{if(e||"string"==typeof t&&!L.test(n.tagName))return n[r]=t}catch(o){}u(n,i)};return"undefined"!=typeof t?this.empty().each(s):this[0]?this[0][r]:""},text:function(t){return this.html(t,!0)},append:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r.appendChild(t)})})},prepend:function(t){var e=this;return this.each(function(r,o){var u=r.firstChild;i(n(t,e,o),function(t){r.insertBefore(t,u)})})},appendTo:function(t,e){return p.call(this,t,e,function(t,e){t.appendChild(e)})},prependTo:function(t,e){return p.call(this,t,e,function(t,e){t.insertBefore(e,t.firstChild)},1)},before:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[P].insertBefore(t,r)})})},after:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[P].insertBefore(t,r.nextSibling)},null,1)})},insertBefore:function(t,e){return p.call(this,t,e,function(t,e){t[P].insertBefore(e,t)})},insertAfter:function(t,e){return p.call(this,t,e,function(t,e){var n=t.nextSibling;n?t[P].insertBefore(e,n):t[P].appendChild(e)},1)},replaceWith:function(t){var e=this;return this.each(function(r,o){i(n(t,e,o),function(t){r[P]&&r[P].replaceChild(t,r)})})},clone:function(t){var e,n,r=[];for(n=0,e=this.length;e>n;n++)r[n]=y(t||this,this[n]);return E(r)},addClass:function(t){return t=V.call(t).split(J),this.each(function(e){i(t,function(t){t&&!C(e,m(e,t))&&S(e,m(e,t))})})},removeClass:function(t){return t=V.call(t).split(J),this.each(function(e){i(t,function(t){t&&C(e,m(e,t))&&T(e,m(e,t))})})},hasClass:function(t){return t=V.call(t).split(J),f(this,function(e){return f(t,function(t){return t&&C(e,t)})})},toggleClass:function(t,e){return t=V.call(t).split(J),this.each(function(n){i(t,function(t){t&&("undefined"!=typeof e?e?!C(n,t)&&S(n,t):T(n,t):C(n,t)?T(n,t):S(n,t))})})},show:function(t){return t="string"==typeof t?t:"",this.each(function(e){e.style.display=t})},hide:function(){return this.each(function(t){t.style.display="none"})},toggle:function(t,e){return e="string"==typeof e?e:"","function"!=typeof t&&(t=null),this.each(function(n){n.style.display=n.offsetWidth||n.offsetHeight?"none":e,t&&t.call(n)})},first:function(){return E(this.length?this[0]:[])},last:function(){return E(this.length?this[this.length-1]:[])},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},parent:function(){return this.related(P)},related:function(t){return E(this.map(function(e){for(e=e[t];e&&1!==e.nodeType;)e=e[t];return e||0},function(t){return t}))},focus:function(){return this.length&&this[0].focus(),this},blur:function(){return this.length&&this[0].blur(),this},css:function(e,n){function r(t,e,n){for(var r in o)if(o.hasOwnProperty(r)){n=o[r],(e=d(r))&&I.test(n)&&!(e in X)&&(n+=q);try{t.style[e]=m(t,n)}catch(i){}}}var i,o=e;return void 0===n&&"string"==typeof e?(n=this[0],n?n===_||n===k?(i=n===_?E.doc():E.viewport(),"width"==e?i.width:"height"==e?i.height:""):(e=d(e))?t(n,e):null:null):("string"==typeof e&&(o={},o[e]=n),this.each(r))},offset:function(t,e){if(t&&"object"==typeof t&&("number"==typeof t.top||"number"==typeof t.left))return this.each(function(e){h(e,t.left,t.top)});if("number"==typeof t||"number"==typeof e)return this.each(function(n){h(n,t,e)});if(!this[0])return{top:0,left:0,height:0,width:0};var n=this[0],r=n.ownerDocument.documentElement,i=n.getBoundingClientRect(),o=x(),u=n.offsetWidth,s=n.offsetHeight,c=i.top+o.y-Math.max(0,r&&r.clientTop,_.body.clientTop),l=i.left+o.x-Math.max(0,r&&r.clientLeft,_.body.clientLeft);return{top:c,left:l,height:s,width:u}},dim:function(){if(!this.length)return{height:0,width:0};var t=this[0],e=9==t.nodeType&&t.documentElement,n=e||!t.style||t.offsetWidth||t.offsetHeight?null:function(e){var n={position:t.style.position||"",visibility:t.style.visibility||"",display:t.style.display||""};return e.first().css({position:"absolute",visibility:"hidden",display:"block"}),n}(this),r=e?Math.max(t.body.scrollWidth,t.body.offsetWidth,e.scrollWidth,e.offsetWidth,e.clientWidth):t.offsetWidth,i=e?Math.max(t.body.scrollHeight,t.body.offsetHeight,e.scrollHeight,e.offsetHeight,e.clientHeight):t.offsetHeight;return n&&this.first().css(n),{height:i,width:r}},attr:function(t,e){var n,r=this[0];if("string"!=typeof t&&!(t instanceof String)){for(n in t)t.hasOwnProperty(n)&&this.attr(n,t[n]);return this}return"undefined"==typeof e?r?A.test(t)?W.test(t)&&"string"==typeof r[t]?!0:r[t]:r[z](t):null:this.each(function(n){A.test(t)?n[t]=m(n,e):n[D](t,m(n,e))})},removeAttr:function(t){return this.each(function(e){W.test(t)?e[t]=!1:e.removeAttribute(t)})},val:function(t){return"string"==typeof t||"number"==typeof t?this.attr("value",t):this.length?this[0].value:null},data:function(t,e){var n,r,o=this[0];return"undefined"==typeof e?o?(n=c(o),"undefined"==typeof t?(i(o.attributes,function(t){(r=(""+t.name).match(B))&&(n[u(r[1])]=a(t.value))}),n):("undefined"==typeof n[t]&&(n[t]=a(this.attr("data-"+s(t)))),n[t])):null:this.each(function(n){c(n)[t]=e})},remove:function(){return this.deepEach(l),this.detach()},empty:function(){return this.each(function(t){for(o(t.childNodes,l);t.firstChild;)t.removeChild(t.firstChild)})},detach:function(){return this.each(function(t){t[P]&&t[P].removeChild(t)})},scrollTop:function(t){return g.call(this,null,t,"y")},scrollLeft:function(t){return g.call(this,t,null,"x")}},E.setQueryEngine=function(t){Z=t,delete E.setQueryEngine},E.aug=function(t,e){for(var n in t)t.hasOwnProperty(n)&&((e||v.prototype)[n]=t[n])},E.create=function(t){return"string"==typeof t&&""!==t?function(){if(N.test(t))return[w(t)];var e=t.match(/^\s*<([^\s>]+)/),n=_.createElement("div"),r=[],o=e?H[e[1].toLowerCase()]:null,u=o?o[2]+1:1,s=o&&o[3],c=P;for(n.innerHTML=o?o[0]+t+o[1]:t;u--;)n=n.firstChild;s&&n&&1!==n.nodeType&&(n=n.nextSibling);do e&&1!=n.nodeType||r.push(n);while(n=n.nextSibling);return i(r,function(t){t[c]&&t[c].removeChild(t)}),r}():e(t)?[t.cloneNode(!0)]:[]},E.doc=function(){var t=E.viewport();return{width:Math.max(_.body.scrollWidth,M.scrollWidth,t.width),height:Math.max(_.body.scrollHeight,M.scrollHeight,t.height)}},E.firstChild=function(t){for(var e,n=t.childNodes,r=0,i=n&&n.length||0;i>r;r++)1===n[r].nodeType&&(e=n[i=r]);return e},E.viewport=function(){return{width:k.innerWidth,height:k.innerHeight}},E.isAncestor="compareDocumentPosition"in M?function(t,e){return 16==(16&t.compareDocumentPosition(e))}:function(t,e){return t!==e&&t.contains(e)},E}),function(t,e,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define("qwery",n):e[t]=n()}("qwery",this,function(){function t(t){return[].slice.call(t,0)}function e(t){var e;return t&&"object"==typeof t&&(e=t.nodeType)&&(1==e||9==e)}function n(t){return"object"==typeof t&&isFinite(t.length)}function r(t){for(var e=[],r=0,i=t.length;i>r;++r)n(t[r])?e=e.concat(t[r]):e[e.length]=t[r];return e}function i(t){var e,n,r=[];t:for(e=0;e<t.length;e++){for(n=0;n<r.length;n++)if(r[n]==t[e])continue t;r[r.length]=t[e]}return r}function o(t){return t?"string"==typeof t?u(t)[0]:!t[f]&&n(t)?t[0]:t:c}function u(i,u){var a,f=o(u);return f&&i?i===l||e(i)?!u||i!==l&&e(f)&&d(i,f)?[i]:[]:i&&n(i)?r(i):c.getElementsByClassName&&"string"==i&&(a=i.match(s))?t(f.getElementsByClassName(a[1])):i&&(i.document||i.nodeType&&9==i.nodeType)?u?[]:[i]:t(f.querySelectorAll(i)):[]}var s=/^\.([\w\-]+)$/,c=document,l=window,a=c.documentElement,f="nodeType",d="compareDocumentPosition"in a?function(t,e){return 16==(16&e.compareDocumentPosition(t))}:function(t,e){return e=e==c||e==window?a:e,e!==t&&e.contains(t)};return u.uniq=i,u},this),define("modules/$",["bonzo","qwery"],function(t,e){"use strict";function n(n,r){return t(e(n,r))}return n}),define("modules/ads",["modules/$","bonzo"],function(t,e){"use strict";var n,r=0,i={insertAdPlaceholders:function(e){r=1;var n=i.createMpuHtml(r);t(".article__body > div.prose > :first-child").before('<div class="advert-slot advert-slot--placeholder"></div>');var o=(parseInt(e.mpuAfterParagraphs,10)||6)-1;t(".article__body > div.prose > p:nth-of-type("+o+") ~ p + p").first().before(n)},insertLiveblogAdPlaceholders:function(){window.updateLiveblogAdPlaceholders=function(e){e&&(r=0,t(".advert-slot--mpu").remove()),t(".article__body > .block").each(function(e,n){if(1===n||6===n){r++;var o=i.createMpuHtml(r);t(e).after(o)}}),e&&(i.isAndroid?i.updateAndroidPosition():window.location.href="x-gu://ad_moved")},window.updateLiveblogAdPlaceholders()},createMpuHtml:function(t){return'<div class="advert-slot advert-slot--mpu"><div class="advert-slot__label">Advertisement<a class="advert-slot__action" href="x-gu://subscribe">Hide<span data-icon="&#xe04F;"></span></a></div><div class="advert-slot__wrapper" id="advert-slot__wrapper"><div class="advert-slot__wrapper__content" id="'+t+'"></div></div></div>'},getMpuPos:function(e){var n=t(".advert-slot__wrapper");if(n.length){var r=document.body.scrollLeft,i=document.body.scrollTop,o=[];return n.each(function(t,e){var n=t.getBoundingClientRect();0!==n.width&&0!==n.height&&(o.push(n.left+r),o.push(n.top+i),o.push(n.width),o.push(n.height))}),o.length>4?e(o[0],o[1],o[2],o[3],o[4],o[5],o[6],o[7]):e(o[0],o[1],o[2],o[3],-1,-1,-1,-1)}return null},getMpuPosCommaSeparated:function(){return i.getMpuPos(function(t,e,n,i,o,u,s,c){return r>1?t+","+e+","+o+","+u:t+","+e})},getMpuOffset:function(){return i.getMpuPos(function(t,e,n,i,o,u,s,c){return r>1?t+"-"+e+":"+o+"-"+u:t+"-"+e})},updateAndroidPosition:function(){"liveblog"===n?i.getMpuPos(function(t,e,n,r,i,o,u,s){window.GuardianJSInterface.mpuLiveblogAdsPosition(t,e,n,r,i,o,u,s)}):i.getMpuPos(function(t,e,n,r,i,o,u,s){window.GuardianJSInterface.mpuAdsPosition(t,e,n,r)})},initMpuPoller:function(){i.poller(1e3,i.getMpuOffset(),!0)},poller:function(t,e,n){var r=i.getMpuOffset();n&&i.isAndroid&&i.updateAndroidPosition(),r!==e&&(i.isAndroid?i.updateAndroidPosition():window.location.href="x-gu://ad_moved"),setTimeout(i.poller.bind(i,t+50,r),t)},fireAdsReady:function(e){t("body").hasClass("no-ready")||"true"!==t("body").attr("data-use-ads-ready")||(e.location.href="x-gu://ads-ready")},updateMPUPosition:function(e){e||(e=t(".advert-slot__wrapper").first().offset().top);
var n=t(".advert-slot__wrapper").first().offset().top;return n!==e&&(i.isAndroid?i.updateAndroidPosition():window.location.href="x-gu://ad_moved"),n}},o=function(e){i.isAndroid=t("body").hasClass("android"),this.initialised||(this.initialised=!0,("true"==e.adsEnabled||e.adsEnabled&&e.adsEnabled.match&&e.adsEnabled.match(/mpu/))&&("liveblog"!==e.adsType||t("body").hasClass("the-minute")?(i.insertAdPlaceholders(e),n="default"):(i.insertLiveblogAdPlaceholders(),n="liveblog"),window.initMpuPoller=i.initMpuPoller,window.applyNativeFunctionCall("initMpuPoller"),window.getMpuPosCommaSeparated=i.getMpuPosCommaSeparated,i.isAndroid||i.initMpuPoller(),i.fireAdsReady(window)))};return{init:o,modules:i}}),define("modules/util",[],function(){"use strict";function t(){GU.util={isElementInViewport:function(t){var e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)},isElementPartiallyInViewport:function(t){var e=t.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth,i=e.top<=n&&e.top+e.height>=0,o=e.left<=r&&e.left+e.width>=0;return i&&o},getElementOffset:function(t){var e=t.ownerDocument.documentElement,n=t.getBoundingClientRect(),r={x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop},i=t.offsetWidth,o=t.offsetHeight,u=n.top+r.y-Math.max(0,e&&e.clientTop,document.body.clientTop),s=n.left+r.x-Math.max(0,e&&e.clientLeft,document.body.clientLeft);return{top:u,left:s,height:o,width:i}},signalDevice:function(t){var e="x-gu://",n=e+t,r=document.createElement("iframe");r.style.display="none",r.src=n,GU.util.doIframeMessage(r)},doIframeMessage:function(t){document.documentElement.appendChild(t),document.documentElement.removeChild(t)},isOnline:function(){return!document.body.classList.contains("offline")&&navigator.onLine},getClosestParentWithClass:function(t,e){for(;t&&(!t.classList||!t.classList.contains(e));)t=t.parentNode;return t},getClosestParentWithTag:function(t,e){for(;t&&t.tagName!==e.toUpperCase();)t=t.parentNode;return t},getClosestParentWithData:function(t,e,n){for("string"==typeof n&&(n=[n]);t&&(!t.dataset||-1===n.indexOf(t.dataset[e]));)t=t.parentNode;return t},getStringFromUnicodeVal:function(t){return String.fromCharCode(t)},getLocalStorage:function(t){return localStorage.getItem(t)},setLocalStorage:function(t,e){localStorage.setItem(t,e)},debounce:function(t,e,n){var r,i,o,u,s;return function(){o=this,r=arguments,u=function(){s=null,n||t.apply(o,r)},i=n&&!s,clearTimeout(s),s=setTimeout(u,e),i&&t.apply(o,r)}},getElemsFromHTML:function(t){var e,n=[],r=document.createElement("div");for(r.innerHTML=t,e=0;e<r.childNodes.length;e++)n.push(r.childNodes[e]);return n}}}var e={init:t};return e}),define("app",["domReady","modules/monitor","modules/ads","modules/util"],function(t,e,n,r){"use strict";function i(){r.init(),GU.opts.skipStyle||o(),t(s)}function o(){var t="assets/css/style-async.css",e=GU.opts.templatesDirectory,n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e+t,document.getElementsByTagName("head")[0].appendChild(n)}function u(t,n){e.setContext(t,n.init)}function s(){var t=GU.opts.contentType;e.init(),n.init({adsEnabled:GU.opts.adsEnabled,adsConfig:GU.opts.adsConfig,adsType:"liveblog"===GU.opts.contentType?"liveblog":"",mpuAfterParagraphs:GU.opts.mpuAfterParagraphs}),"article"===t?require(["article"],u.bind(null,"article")):"liveblog"===t?require(["liveblog"],u.bind(null,"liveblog")):"audio"===t?require(["audio"],u.bind(null,"audio")):"gallery"===t?require(["gallery"],u.bind(null,"gallery")):"football"===t?require(["football"],u.bind(null,"football")):"cricket"===t?require(["cricket"],u.bind(null,"cricket")):require(["bootstraps/common"],u.bind(null,"common"))}return{init:i}});