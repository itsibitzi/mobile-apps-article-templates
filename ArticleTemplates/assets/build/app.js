!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define("domReady",t):this[e]=t()}("domready",function(){var e,t=[],n=document,o=n.documentElement.doScroll,i="DOMContentLoaded",r=(o?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return r||n.addEventListener(i,e=function(){for(n.removeEventListener(i,e),r=1;e=t.shift();)e()}),function(e){r?setTimeout(e,0):t.push(e)}}),define("modules/ads",[],function(){"use strict";function e(e){var t=n(U),o=(parseInt(e,10)||6)-1,i=document.createElement("div"),r=document.querySelector(".article__body > div.prose > :first-child"),d=document.querySelector(".article__body > div.prose > p:nth-of-type("+o+") ~ p + p");d&&d.parentNode&&(d.parentNode.insertBefore(t,d),i.classList.add("advert-slot"),i.classList.add("advert-slot--placeholder"),r&&r.parentNode&&r.parentNode.insertBefore(i,r),b=!0)}function t(e){var t,o,i,r,d=document.querySelectorAll(".article__body > .block");if(e){for(o=document.getElementsByClassName("advert-slot--mpu"),t=o.length;t>0;t--)o[t-1].parentNode.removeChild(o[t-1]);U=0}for(t=0;t<d.length;t++)r=d[t],(1===t||6===t)&&(U++,i=n(U),r.nextSibling?r.parentNode.insertBefore(i,r.nextSibling):r.parentNode.appendChild(i));e&&("android"===GU.opts.platform?l():GU.util.signalDevice("ad_moved"))}function n(e){var t=document.createElement("div");return t.classList.add("advert-slot"),t.classList.add("advert-slot--mpu"),t.innerHTML='<div class="advert-slot__label">Advertisement<a class="advert-slot__action" href="x-gu://subscribe">Hide<span data-icon="&#xe04F;"></span></a></div><div class="advert-slot__wrapper" id="advert-slot__wrapper"><div class="advert-slot__wrapper__content" id="'+e+'"></div></div>',t}function o(e){var t,n,o=document.getElementsByClassName("advert-slot__wrapper"),i=document.body.scrollLeft,r=document.body.scrollTop,d={x1:-1,y1:-1,w1:-1,h1:-1,x2:-1,y2:-1,w2:-1,h2:-1};if(o.length){for(n=0;n<o.length;n++)t=o[n].getBoundingClientRect(),0!==t.width&&0!==t.height&&(d["x"+(n+1)]=t.left+i,d["y"+(n+1)]=t.top+r,d["w"+(n+1)]=t.width,d["h"+(n+1)]=t.height);return e(d)}return null}function i(){return o(r)}function r(e){return U>1?e.x1+","+e.y1+","+e.x2+","+e.y2:e.x1+","+e.y1}function d(){return o(a)}function a(e){return U>1?e.x1+"-"+e.y1+":"+e.x2+"-"+e.y2:e.x1+"-"+e.y1}function l(){o("liveblog"===w?u:s)}function u(e){var t=e.x1,n=e.y1,o=e.w1,i=e.h1,r=e.x2,d=e.y2,a=e.w2,l=e.h2;window.GuardianJSInterface.mpuLiveblogAdsPosition(t,n,o,i,r,d,a,l)}function s(e){var t=e.x1,n=e.y1,o=e.w1,i=e.h1;window.GuardianJSInterface.mpuAdsPosition(t,n,o,i)}function c(){f(1e3,d(),!0)}function f(e,t,n){var o=d();n&&"android"===GU.opts.platform&&l(),o!==t&&("android"===GU.opts.platform?l():GU.util.signalDevice("ad_moved")),y=setTimeout(f.bind(null,e+50,o),e)}function m(){window.clearTimeout(y),y=null}function p(){!document.body.classList.contains("no-ready")&&GU.opts.useAdsReady&&GU.util.signalDevice("ads-ready")}function g(e){var t,n=document.getElementsByClassName("advert-slot__wrapper")[0];return n&&(t=GU.util.getElementOffset(n).top,t!==e&&("android"===GU.opts.platform?l():GU.util.signalDevice("ad_moved"))),t}function v(){window.initMpuPoller=c,window.killMpuPoller=m,window.getMpuPosCommaSeparated=i,window.updateLiveblogAdPlaceholders=t,window.applyNativeFunctionCall("initMpuPoller")}function h(n){!E&&n.adsEnabled&&(E=!0,w=n.adsType,v(),"liveblog"===w?(b=!0,t()):(U=1,e(n.mpuAfterParagraphs)),b&&("android"!==GU.opts.platform&&c(),p()))}var y,w,b=!1,E=!1,U=0;return{init:h,updateMPUPosition:g}}),define("modules/util",[],function(){"use strict";function e(){GU.util={isElementInViewport:function(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)},isElementPartiallyInViewport:function(e){var t=e.getBoundingClientRect(),n=window.innerHeight||document.documentElement.clientHeight,o=window.innerWidth||document.documentElement.clientWidth,i=t.top<=n&&t.top+t.height>=0,r=t.left<=o&&t.left+t.width>=0;return i&&r},getElementOffset:function(e){var t=e.ownerDocument.documentElement,n=e.getBoundingClientRect(),o={x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop},i=e.offsetWidth,r=e.offsetHeight,d=n.top+o.y-Math.max(0,t&&t.clientTop,document.body.clientTop),a=n.left+o.x-Math.max(0,t&&t.clientLeft,document.body.clientLeft);return{top:d,left:a,height:r,width:i}},signalDevice:function(e){var t="x-gu://",n=t+e,o=document.createElement("iframe");o.style.display="none",o.src=n,GU.util.doIframeMessage(o)},doIframeMessage:function(e){document.documentElement.appendChild(e),document.documentElement.removeChild(e)},isOnline:function(){return!GU.opts.isOffline&&navigator.onLine},getClosestParentWithClass:function(e,t){for(;e&&(!e.classList||!e.classList.contains(t));)e=e.parentNode;return e},getClosestParentWithTag:function(e,t){for(;e&&e.tagName!==t.toUpperCase();)e=e.parentNode;return e},getClosestParentWithData:function(e,t,n){for("string"==typeof n&&(n=[n]);e&&(!e.dataset||-1===n.indexOf(e.dataset[t]));)e=e.parentNode;return e},getStringFromUnicodeVal:function(e){return String.fromCharCode(e)},getLocalStorage:function(e){return localStorage.getItem(e)},setLocalStorage:function(e,t){localStorage.setItem(e,t)},debounce:function(e,t,n){var o,i,r,d,a;return function(){r=this,o=arguments,d=function(){a=null,n||e.apply(r,o)},i=n&&!a,clearTimeout(a),a=setTimeout(d,t),i&&e.apply(r,o)}},getElemsFromHTML:function(e){var t,n=[],o=document.createElement("div");for(o.innerHTML=e,t=0;t<o.childNodes.length;t++)1===o.childNodes[t].nodeType&&n.push(o.childNodes[t]);return n}}}var t={init:e};return t}),define("app",["domReady","modules/ads","modules/util"],function(e,t,n){"use strict";function o(){n.init(),e(r)}function i(e){e.init()}function r(){var e=GU.opts.contentType;t.init({adsEnabled:GU.opts.adsEnabled&&"true"===GU.opts.adsEnabled||GU.opts.adsEnabled&&-1!==GU.opts.adsEnabled.indexOf("mpu"),adsConfig:GU.opts.adsConfig,adsType:"liveblog"!==GU.opts.contentType||GU.opts.isMinute?"default":"liveblog",mpuAfterParagraphs:GU.opts.mpuAfterParagraphs}),"article"===e?require(["article"],i):"liveblog"===e?require(["liveblog"],i):"audio"===e?require(["audio"],i):"gallery"===e?require(["gallery"],i):"football"===e?require(["football"],i):"cricket"===e?require(["cricket"],i):"video"===e?require(["video"],i):require(["bootstraps/common"],i)}return{init:o}});