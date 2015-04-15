!function(e,n){"undefined"!=typeof module?module.exports=n():"function"==typeof define&&"object"==typeof define.amd?define("domReady",n):this[e]=n()}("domready",function(){var e,n=[],t=document,r=t.documentElement.doScroll,o="DOMContentLoaded",i=(r?/^loaded|^c/:/^loaded|^i|^c/).test(t.readyState);return i||t.addEventListener(o,e=function(){for(t.removeEventListener(o,e),i=1;e=n.shift();)e()}),function(e){i?e():n.push(e)}}),function(e,n){function t(e,n){var t,r;n=n||{},e="raven"+e.substr(0,1).toUpperCase()+e.substr(1),document.createEvent?(t=document.createEvent("HTMLEvents"),t.initEvent(e,!0,!0)):(t=document.createEventObject(),t.eventType=e);for(r in n)f(n,r)&&(t[r]=n[r]);if(document.createEvent)document.dispatchEvent(t);else try{document.fireEvent("on"+t.eventType.toLowerCase(),t)}catch(o){}}function r(e){this.name="RavenConfigError",this.message=e}function o(e){var n=X.exec(e),t={},o=7;try{for(;o--;)t[H[o]]=n[o]||""}catch(i){throw new r("Invalid DSN: "+e)}if(t.pass)throw new r("Do not specify your private key in the DSN!");return t}function i(e){return"undefined"==typeof e}function c(e){return"function"==typeof e}function u(e){return"string"==typeof e}function a(e){return"object"==typeof e&&null!==e}function l(e){for(var n in e)return!1;return!0}function s(e){return a(e)&&"[object Error]"===B.toString.call(e)||e instanceof Error}function f(e,n){return B.hasOwnProperty.call(e,n)}function d(e,n){var t,r;if(i(e.length))for(t in e)f(e,t)&&n.call(null,t,e[t]);else if(r=e.length)for(t=0;r>t;t++)n.call(null,t,e[t])}function m(){I="?sentry_version=4&sentry_client=raven-js/"+J.VERSION+"&sentry_key="+M}function p(e,n){var r=[];e.stack&&e.stack.length&&d(e.stack,function(e,n){var t=g(n);t&&r.push(t)}),t("handle",{stackInfo:e,options:n}),x(e.name,e.message,e.url,e.lineno,r,n)}function g(e){if(e.url){var n,t={filename:e.url,lineno:e.line,colno:e.column,"function":e.func||"?"},r=h(e);if(r){var o=["pre_context","context_line","post_context"];for(n=3;n--;)t[o[n]]=r[n]}return t.in_app=!(!W.includePaths.test(t.filename)||/(Raven|TraceKit)\./.test(t["function"])||/raven\.(min\.)?js$/.test(t.filename)),t}}function h(e){if(e.context&&W.fetchContext){for(var n=e.context,t=~~(n.length/2),r=n.length,o=!1;r--;)if(n[r].length>300){o=!0;break}if(o){if(i(e.column))return;return[[],n[t].substr(e.column,50),[]]}return[n.slice(0,t),n[t],n.slice(t+1)]}}function x(e,n,t,r,o,i){var c,u;n+="",("Error"!==e||n)&&(W.ignoreErrors.test(n)||(o&&o.length?(t=o[0].filename||t,o.reverse(),c={frames:o}):t&&(c={frames:[{filename:t,lineno:r,in_app:!0}]}),n=y(n,W.maxMessageLength),W.ignoreUrls&&W.ignoreUrls.test(t)||(!W.whitelistUrls||W.whitelistUrls.test(t))&&(u=r?n+" at "+r:n,w(v({exception:{type:e,value:n},stacktrace:c,culprit:t,message:u},i)))))}function v(e,n){return n?(d(n,function(n,t){e[n]=t}),e):e}function y(e,n){return e.length<=n?e:e.substr(0,n)+"…"}function b(){return+new Date}function E(){var e={url:document.location.href,headers:{"User-Agent":navigator.userAgent}};return document.referrer&&(e.headers.Referer=document.referrer),e}function w(e){S()&&(e=v({project:q,logger:W.logger,platform:"javascript",request:E()},e),e.tags=v(v({},W.tags),e.tags),e.extra=v(v({},W.extra),e.extra),e.extra=v({"session:duration":b()-D},e.extra),l(e.tags)&&delete e.tags,F&&(e.user=F),W.release&&(e.release=W.release),c(W.dataCallback)&&(e=W.dataCallback(e)),(!c(W.shouldSendCallback)||W.shouldSendCallback(e))&&(A=e.event_id||(e.event_id=_()),k(e)))}function k(e){var n=new Image,r=N+I+"&sentry_data="+encodeURIComponent(JSON.stringify(e));n.crossOrigin="anonymous",n.onload=function(){t("success",{data:e,src:r})},n.onerror=n.onabort=function(){t("failure",{data:e,src:r})},n.src=r}function S(){return P?N?!0:(R("error","Error: Raven has not been configured."),!1):!1}function C(e){for(var n,t=[],r=0,o=e.length;o>r;r++)n=e[r],u(n)?t.push(n.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):n&&n.source&&t.push(n.source);return new RegExp(t.join("|"),"i")}function _(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0,t="x"==e?n:3&n|8;return t.toString(16)})}function R(n,t){e.console&&console[n]&&J.debug&&console[n](t)}function T(){var n=e.RavenConfig;n&&J.config(n.dsn,n.config).install()}var $={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7},j=[].slice,O="?";$.wrap=function(e){function n(){try{return e.apply(this,arguments)}catch(n){throw $.report(n),n}}return n},$.report=function(){function t(e){u(),p.push(e)}function r(e){for(var n=p.length-1;n>=0;--n)p[n]===e&&p.splice(n,1)}function o(){a(),p=[]}function i(e,n){var t=null;if(!n||$.collectWindowErrors){for(var r in p)if(f(p,r))try{p[r].apply(null,[e].concat(j.call(arguments,2)))}catch(o){t=o}if(t)throw t}}function c(e,n,t,r,o){var c=null;if(x)$.computeStackTrace.augmentStackTraceWithInitialElement(x,n,t,e),l();else if(o)c=$.computeStackTrace(o),i(c,!0);else{var u={url:n,line:t,column:r};u.func=$.computeStackTrace.guessFunctionName(u.url,u.line),u.context=$.computeStackTrace.gatherContext(u.url,u.line),c={message:e,url:document.location.href,stack:[u]},i(c,!0)}return d?d.apply(this,arguments):!1}function u(){m||(d=e.onerror,e.onerror=c,m=!0)}function a(){m&&(e.onerror=d,m=!1,d=n)}function l(){var e=x,n=g;g=null,x=null,h=null,i.apply(null,[e,!1].concat(n))}function s(n,t){var r=j.call(arguments,1);if(x){if(h===n)return;l()}var o=$.computeStackTrace(n);if(x=o,h=n,g=r,e.setTimeout(function(){h===n&&l()},o.incomplete?2e3:0),t!==!1)throw n}var d,m,p=[],g=null,h=null,x=null;return s.subscribe=t,s.unsubscribe=r,s.uninstall=o,s}(),$.computeStackTrace=function(){function n(n){if(!$.remoteFetching)return"";try{var t=function(){try{return new e.XMLHttpRequest}catch(n){return new e.ActiveXObject("Microsoft.XMLHTTP")}},r=t();return r.open("GET",n,!1),r.send(""),r.responseText}catch(o){return""}}function t(e){if(!u(e))return[];if(!f(b,e)){var t="";-1!==e.indexOf(document.domain)&&(t=n(e)),b[e]=t?t.split("\n"):[]}return b[e]}function r(e,n){var r,o=/function ([^(]*)\(([^)]*)\)/,c=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,u="",a=10,l=t(e);if(!l.length)return O;for(var s=0;a>s;++s)if(u=l[n-s]+u,!i(u)){if(r=c.exec(u))return r[1];if(r=o.exec(u))return r[1]}return O}function o(e,n){var r=t(e);if(!r.length)return null;var o=[],c=Math.floor($.linesOfContext/2),u=c+$.linesOfContext%2,a=Math.max(0,n-c-1),l=Math.min(r.length,n+u-1);n-=1;for(var s=a;l>s;++s)i(r[s])||o.push(r[s]);return o.length>0?o:null}function c(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function a(e){return c(e).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function l(e,n){for(var r,o,i=0,c=n.length;c>i;++i)if((r=t(n[i])).length&&(r=r.join("\n"),o=e.exec(r)))return{url:n[i],line:r.substring(0,o.index).split("\n").length,column:o.index-r.lastIndexOf("\n",o.index)-1};return null}function s(e,n,r){var o,i=t(n),u=new RegExp("\\b"+c(e)+"\\b");return r-=1,i&&i.length>r&&(o=u.exec(i[r]))?o.index:null}function d(n){for(var t,r,o,i,u=[e.location.href],s=document.getElementsByTagName("script"),f=""+n,d=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,m=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,p=0;p<s.length;++p){var g=s[p];g.src&&u.push(g.src)}if(o=d.exec(f)){var h=o[1]?"\\s+"+o[1]:"",x=o[2].split(",").join("\\s*,\\s*");t=c(o[3]).replace(/;$/,";?"),r=new RegExp("function"+h+"\\s*\\(\\s*"+x+"\\s*\\)\\s*{\\s*"+t+"\\s*}")}else r=new RegExp(c(f).replace(/\s+/g,"\\s+"));if(i=l(r,u))return i;if(o=m.exec(f)){var v=o[1];if(t=a(o[2]),r=new RegExp("on"+v+"=[\\'\"]\\s*"+t+"\\s*[\\'\"]","i"),i=l(r,u[0]))return i;if(r=new RegExp(t),i=l(r,u))return i}return null}function m(e){if(!e.stack)return null;for(var n,t,c=/^\s*at (.*?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/i,u=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,a=e.stack.split("\n"),l=[],f=/^(.*) is undefined$/.exec(e.message),d=0,m=a.length;m>d;++d){if(n=u.exec(a[d]))t={url:n[3],func:n[1]||O,args:n[2]?n[2].split(","):"",line:+n[4],column:n[5]?+n[5]:null};else{if(!(n=c.exec(a[d])))continue;t={url:n[2],func:n[1]||O,line:+n[3],column:n[4]?+n[4]:null}}!t.func&&t.line&&(t.func=r(t.url,t.line)),t.line&&(t.context=o(t.url,t.line)),l.push(t)}return l.length?(l[0].line&&!l[0].column&&f?l[0].column=s(f[1],l[0].url,l[0].line):l[0].column||i(e.columnNumber)||(l[0].column=e.columnNumber+1),{name:e.name,message:e.message,url:document.location.href,stack:l}):null}function p(e){for(var n,t=e.stacktrace,i=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,c=t.split("\n"),u=[],a=0,l=c.length;l>a;a+=2)if(n=i.exec(c[a])){var s={line:+n[1],column:+n[2],func:n[3]||n[4],args:n[5]?n[5].split(","):[],url:n[6]};if(!s.func&&s.line&&(s.func=r(s.url,s.line)),s.line)try{s.context=o(s.url,s.line)}catch(f){}s.context||(s.context=[c[a+1]]),u.push(s)}return u.length?{name:e.name,message:e.message,url:document.location.href,stack:u}:null}function g(n){var i=n.message.split("\n");if(i.length<4)return null;var c,u,s,d,m=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,g=/^\s*Line (\d+) of function script\s*$/i,h=[],x=document.getElementsByTagName("script"),v=[];for(u in x)f(x,u)&&!x[u].src&&v.push(x[u]);for(u=2,s=i.length;s>u;u+=2){var y=null;if(c=m.exec(i[u]))y={url:c[2],func:c[3],line:+c[1]};else if(c=p.exec(i[u])){y={url:c[3],func:c[4]};var b=+c[1],E=v[c[2]-1];if(E&&(d=t(y.url))){d=d.join("\n");var w=d.indexOf(E.innerText);w>=0&&(y.line=b+d.substring(0,w).split("\n").length)}}else if(c=g.exec(i[u])){var k=e.location.href.replace(/#.*$/,""),S=c[1],C=new RegExp(a(i[u+1]));d=l(C,[k]),y={url:k,line:d?d.line:S,func:""}}if(y){y.func||(y.func=r(y.url,y.line));var _=o(y.url,y.line),R=_?_[Math.floor(_.length/2)]:null;y.context=_&&R.replace(/^\s*/,"")===i[u+1].replace(/^\s*/,"")?_:[i[u+1]],h.push(y)}}return h.length?{name:n.name,message:i[0],url:document.location.href,stack:h}:null}function h(e,n,t,i){var c={url:n,line:t};if(c.url&&c.line){e.incomplete=!1,c.func||(c.func=r(c.url,c.line)),c.context||(c.context=o(c.url,c.line));var u=/ '([^']+)' /.exec(i);if(u&&(c.column=s(u[1],c.url,c.line)),e.stack.length>0&&e.stack[0].url===c.url){if(e.stack[0].line===c.line)return!1;if(!e.stack[0].line&&e.stack[0].func===c.func)return e.stack[0].line=c.line,e.stack[0].context=c.context,!1}return e.stack.unshift(c),e.partial=!0,!0}return e.incomplete=!0,!1}function x(e,n){for(var t,o,i,c=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,u=[],a={},l=!1,f=x.caller;f&&!l;f=f.caller)if(f!==v&&f!==$.report){if(o={url:null,func:O,line:null,column:null},f.name?o.func=f.name:(t=c.exec(f.toString()))&&(o.func=t[1]),i=d(f)){o.url=i.url,o.line=i.line,o.func===O&&(o.func=r(o.url,o.line));var m=/ '([^']+)' /.exec(e.message||e.description);m&&(o.column=s(m[1],i.url,i.line))}a[""+f]?l=!0:a[""+f]=!0,u.push(o)}n&&u.splice(0,n);var p={name:e.name,message:e.message,url:document.location.href,stack:u};return h(p,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),p}function v(e,n){var t=null;n=null==n?0:+n;try{if(t=p(e))return t}catch(r){if(y)throw r}try{if(t=m(e))return t}catch(r){if(y)throw r}try{if(t=g(e))return t}catch(r){if(y)throw r}try{if(t=x(e,n+1))return t}catch(r){if(y)throw r}return{}}var y=!1,b={};return v.augmentStackTraceWithInitialElement=h,v.computeStackTraceFromStackProp=m,v.guessFunctionName=r,v.gatherContext=o,v}();var U,A,N,F,M,q,I,L=e.Raven,P=!("object"!=typeof JSON||!JSON.stringify),W={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,tags:{},maxMessageLength:100,extra:{}},z=!1,B=Object.prototype,D=b(),J={VERSION:"1.1.18",debug:!0,noConflict:function(){return e.Raven=L,J},config:function(e,n){if(N)return R("error","Error: Raven has already been configured"),J;if(!e)return J;var t=o(e),r=t.path.lastIndexOf("/"),i=t.path.substr(1,r);return n&&d(n,function(e,n){W[e]=n}),W.ignoreErrors.push(/^Script error\.?$/),W.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),W.ignoreErrors=C(W.ignoreErrors),W.ignoreUrls=W.ignoreUrls.length?C(W.ignoreUrls):!1,W.whitelistUrls=W.whitelistUrls.length?C(W.whitelistUrls):!1,W.includePaths=C(W.includePaths),M=t.user,q=t.path.substr(r+1),N="//"+t.host+(t.port?":"+t.port:"")+"/"+i+"api/"+q+"/store/",t.protocol&&(N=t.protocol+":"+N),W.fetchContext&&($.remoteFetching=!0),W.linesOfContext&&($.linesOfContext=W.linesOfContext),$.collectWindowErrors=!!W.collectWindowErrors,m(),J},install:function(){return S()&&!z&&($.report.subscribe(p),z=!0),J},context:function(e,t,r){return c(e)&&(r=t||[],t=e,e=n),J.wrap(e,t).apply(this,r)},wrap:function(e,t){function r(){for(var n=[],r=arguments.length,o=!e||e&&e.deep!==!1;r--;)n[r]=o?J.wrap(e,arguments[r]):arguments[r];try{return t.apply(this,n)}catch(i){throw J.captureException(i,e),i}}if(i(t)&&!c(e))return e;if(c(e)&&(t=e,e=n),!c(t))return t;if(t.__raven__)return t;for(var o in t)f(t,o)&&(r[o]=t[o]);return r.__raven__=!0,r.__inner__=t,r},uninstall:function(){return $.report.uninstall(),z=!1,J},captureException:function(e,n){if(!s(e))return J.captureMessage(e,n);U=e;try{$.report(e,n)}catch(t){if(e!==t)throw t}return J},captureMessage:function(e,n){return W.ignoreErrors.test&&W.ignoreErrors.test(e)?void 0:(w(v({message:e+""},n)),J)},setUserContext:function(e){return F=e,J},setExtraContext:function(e){return W.extra=e||{},J},setTagsContext:function(e){return W.tags=e||{},J},setReleaseContext:function(e){return W.release=e,J},lastException:function(){return U},lastEventId:function(){return A},isSetup:function(){return S()}};J.setUser=J.setUserContext;var H="source protocol user pass host port path".split(" "),X=/^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;r.prototype=new Error,r.prototype.constructor=r,T(),"function"==typeof define&&define.amd?(e.Raven=J,define("raven",[],function(){return J})):"object"==typeof module?module.exports=J:"object"==typeof exports?exports=J:e.Raven=J}(window),define("modules/monitor",["raven"],function(e){var n={dsn:null,git_commit:"not available"};try{n={dsn:"https://8abc43d4e79b425eb6d4b5659ccd4020@app.getsentry.com/40557",git_commit:"ab27a13e82365b27b887037109bd9762a5c8d16f"}}catch(t){}var r={extractTags:function(){var e=document.body.getAttribute("class"),n=e.match(/tone--([^\s]+)/);return{itemTone:n?n[1]:null,itemId:document.body.getAttribute("data-page-id"),deviceKind:document.body.getAttribute("data-ads-config"),ads:"true"===document.body.getAttribute("data-ads-enabled")}},ignoreErrors:function(){var e=["fake"];return e.push=function(){},e},setContext:function(t,r){return n.dsn?e.context({tags:{context:t}},r):r()}},o=function(){var t=r.extractTags();!e.isSetup()&&n.dsn&&e.config(n.dsn,{tags:t,release:n.git_commit,ignoreErrors:r.ignoreErrors(),shouldSendCallback:function(e){e.stacktrace&&e.stacktrace.frames&&(e.stacktrace.frames=e.stacktrace.frames.reverse().slice(0,3).reverse());var n=35;return 100*Math.random()<=n}}).install()};return{init:o,setContext:r.setContext,modules:r,config:n,raven:e}});var gu=document.getElementById("gu"),baseUrl=gu.getAttribute("data-js-dir");require.config({paths:{bonzo:"../../../node_modules/bonzo/bonzo",bean:"../../../node_modules/bean/bean",d3:"../../../node_modules/d3/d3",domReady:"../../../node_modules/domready/ready",mobileSlider:"components/mobile-range-slider",fastClick:"../../../node_modules/fastclick/lib/fastclick",qwery:"../../../node_modules/qwery/qwery",fence:"../../../node_modules/fence/fence",smoothScroll:"../../../node_modules/smooth-scroll/dist/js/smooth-scroll",raven:"../../../node_modules/raven-js/dist/raven"},shim:{d3:{exports:"d3"}}}),require(["domReady","modules/monitor"],function(e,n){function t(e){var n=document.body.getAttribute("data-template-directory"),t=document.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=n+e,document.getElementsByTagName("head")[0].appendChild(t)}e(function(){var e=document.body.getAttribute("data-content-type");n.init(),"article"===e?require(["article"],function(e){n.setContext("article",function(){e.init()})}):"liveblog"===e?require(["liveblog"],function(e){n.setContext("liveblog",function(){e.init()})}):"audio"===e?require(["audio"],function(e){n.setContext("audio",function(){e.init()})}):"gallery"===e?require(["gallery"],function(e){n.setContext("gallery",function(){e.init()})}):"football"===e?require(["football"],function(e){n.setContext("football",function(){e.init()})}):require(["bootstraps/common"],function(e){n.setContext("common",function(){e.init()})})});var r=document.getElementById("gu"),o=r.getAttribute("data-skip-style");o||t("assets/css/style-async.css")}),define("app",function(){});
//# sourceMappingURL=app.js
//# sourceMappingURL=app.js.map