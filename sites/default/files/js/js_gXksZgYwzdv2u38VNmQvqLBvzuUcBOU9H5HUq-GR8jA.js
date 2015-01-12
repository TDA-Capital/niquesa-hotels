window.JSON||(window.JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)d=rep[c],typeof d=="string"&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var JSON=window.JSON,cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a,b){"use strict";var c=a.History=a.History||{},d=a.jQuery;if(typeof c.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");c.Adapter={bind:function(a,b,c){d(a).bind(b,c)},trigger:function(a,b,c){d(a).trigger(b,c)},extractEventData:function(a,c,d){var e=c&&c.originalEvent&&c.originalEvent[a]||d&&d[a]||b;return e},onDomLoad:function(a){d(a)}},typeof c.init!="undefined"&&c.init()}(window),function(a,b){"use strict";var c=a.document,d=a.setTimeout||d,e=a.clearTimeout||e,f=a.setInterval||f,g=a.History=a.History||{};if(typeof g.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");g.initHtml4=function(){if(typeof g.initHtml4.initialized!="undefined")return!1;g.initHtml4.initialized=!0,g.enabled=!0,g.savedHashes=[],g.isLastHash=function(a){var b=g.getHashByIndex(),c;return c=a===b,c},g.saveHash=function(a){return g.isLastHash(a)?!1:(g.savedHashes.push(a),!0)},g.getHashByIndex=function(a){var b=null;return typeof a=="undefined"?b=g.savedHashes[g.savedHashes.length-1]:a<0?b=g.savedHashes[g.savedHashes.length+a]:b=g.savedHashes[a],b},g.discardedHashes={},g.discardedStates={},g.discardState=function(a,b,c){var d=g.getHashByState(a),e;return e={discardedState:a,backState:c,forwardState:b},g.discardedStates[d]=e,!0},g.discardHash=function(a,b,c){var d={discardedHash:a,backState:c,forwardState:b};return g.discardedHashes[a]=d,!0},g.discardedState=function(a){var b=g.getHashByState(a),c;return c=g.discardedStates[b]||!1,c},g.discardedHash=function(a){var b=g.discardedHashes[a]||!1;return b},g.recycleState=function(a){var b=g.getHashByState(a);return g.discardedState(a)&&delete g.discardedStates[b],!0},g.emulated.hashChange&&(g.hashChangeInit=function(){g.checkerFunction=null;var b="",d,e,h,i;return g.isInternetExplorer()?(d="historyjs-iframe",e=c.createElement("iframe"),e.setAttribute("id",d),e.style.display="none",c.body.appendChild(e),e.contentWindow.document.open(),e.contentWindow.document.close(),h="",i=!1,g.checkerFunction=function(){if(i)return!1;i=!0;var c=g.getHash()||"",d=g.unescapeHash(e.contentWindow.document.location.hash)||"";return c!==b?(b=c,d!==c&&(h=d=c,e.contentWindow.document.open(),e.contentWindow.document.close(),e.contentWindow.document.location.hash=g.escapeHash(c)),g.Adapter.trigger(a,"hashchange")):d!==h&&(h=d,g.setHash(d,!1)),i=!1,!0}):g.checkerFunction=function(){var c=g.getHash();return c!==b&&(b=c,g.Adapter.trigger(a,"hashchange")),!0},g.intervalList.push(f(g.checkerFunction,g.options.hashChangeInterval)),!0},g.Adapter.onDomLoad(g.hashChangeInit)),g.emulated.pushState&&(g.onHashChange=function(b){var d=b&&b.newURL||c.location.href,e=g.getHashByUrl(d),f=null,h=null,i=null,j;return g.isLastHash(e)?(g.busy(!1),!1):(g.doubleCheckComplete(),g.saveHash(e),e&&g.isTraditionalAnchor(e)?(g.Adapter.trigger(a,"anchorchange"),g.busy(!1),!1):(f=g.extractState(g.getFullUrl(e||c.location.href,!1),!0),g.isLastSavedState(f)?(g.busy(!1),!1):(h=g.getHashByState(f),j=g.discardedState(f),j?(g.getHashByIndex(-2)===g.getHashByState(j.forwardState)?g.back(!1):g.forward(!1),!1):(g.pushState(f.data,f.title,f.url,!1),!0))))},g.Adapter.bind(a,"hashchange",g.onHashChange),g.pushState=function(b,d,e,f){if(g.getHashByUrl(e))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(f!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:f}),!1;g.busy(!0);var h=g.createStateObject(b,d,e),i=g.getHashByState(h),j=g.getState(!1),k=g.getHashByState(j),l=g.getHash();return g.storeState(h),g.expectedStateId=h.id,g.recycleState(h),g.setTitle(h),i===k?(g.busy(!1),!1):i!==l&&i!==g.getShortUrl(c.location.href)?(g.setHash(i,!1),!1):(g.saveState(h),g.Adapter.trigger(a,"statechange"),g.busy(!1),!0)},g.replaceState=function(a,b,c,d){if(g.getHashByUrl(c))throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(d!==!1&&g.busy())return g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:d}),!1;g.busy(!0);var e=g.createStateObject(a,b,c),f=g.getState(!1),h=g.getStateByIndex(-2);return g.discardState(f,e,h),g.pushState(e.data,e.title,e.url,!1),!0}),g.emulated.pushState&&g.getHash()&&!g.emulated.hashChange&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})},typeof g.init!="undefined"&&g.init()}(window),function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.sessionStorage||!1,g=a.setTimeout,h=a.clearTimeout,i=a.setInterval,j=a.clearInterval,k=a.JSON,l=a.alert,m=a.History=a.History||{},n=a.history;k.stringify=k.stringify||k.encode,k.parse=k.parse||k.decode;if(typeof m.init!="undefined")throw new Error("History.js Core has already been loaded...");m.init=function(){return typeof m.Adapter=="undefined"?!1:(typeof m.initCore!="undefined"&&m.initCore(),typeof m.initHtml4!="undefined"&&m.initHtml4(),!0)},m.initCore=function(){if(typeof m.initCore.initialized!="undefined")return!1;m.initCore.initialized=!0,m.options=m.options||{},m.options.hashChangeInterval=m.options.hashChangeInterval||100,m.options.safariPollInterval=m.options.safariPollInterval||500,m.options.doubleCheckInterval=m.options.doubleCheckInterval||500,m.options.storeInterval=m.options.storeInterval||1e3,m.options.busyDelay=m.options.busyDelay||250,m.options.debug=m.options.debug||!1,m.options.initialTitle=m.options.initialTitle||d.title,m.intervalList=[],m.clearAllIntervals=function(){var a,b=m.intervalList;if(typeof b!="undefined"&&b!==null){for(a=0;a<b.length;a++)j(b[a]);m.intervalList=null}},m.debug=function(){(m.options.debug||!1)&&m.log.apply(m,arguments)},m.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g,h,i;a?(h=Array.prototype.slice.call(arguments),e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])):e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){i=arguments[f];if(typeof i=="object"&&typeof k!="undefined")try{i=k.stringify(i)}catch(j){}e+="\n"+i+"\n"}return b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||l(e),!0},m.getInternetExplorerMajorVersion=function(){var a=m.getInternetExplorerMajorVersion.cached=typeof m.getInternetExplorerMajorVersion.cached!="undefined"?m.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},m.isInternetExplorer=function(){var a=m.isInternetExplorer.cached=typeof m.isInternetExplorer.cached!="undefined"?m.isInternetExplorer.cached:Boolean(m.getInternetExplorerMajorVersion());return a},m.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8)},m.enabled=!m.emulated.pushState,m.bugs={setHash:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!m.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(m.isInternetExplorer()&&m.getInternetExplorerMajorVersion()<7)},m.isEmptyObject=function(a){for(var b in a)return!1;return!0},m.cloneObject=function(a){var b,c;return a?(b=k.stringify(a),c=k.parse(b)):c={},c},m.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;return a+="/",a},m.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";return a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/"),c},m.getBaseUrl=function(){var a=m.getBaseHref()||m.getBasePageUrl()||m.getRootUrl();return a},m.getPageUrl=function(){var a=m.getState(!1,!1),b=(a||{}).url||d.location.href,c;return c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"}),c},m.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},m.getFullUrl=function(a,b){var c=a,d=a.substring(0,1);return b=typeof b=="undefined"?!0:b,/[a-z]+\:\/\//.test(a)||(d==="/"?c=m.getRootUrl()+a.replace(/^\/+/,""):d==="#"?c=m.getPageUrl().replace(/#.*/,"")+a:d==="?"?c=m.getPageUrl().replace(/[\?#].*/,"")+a:b?c=m.getBaseUrl()+a.replace(/^(\.\/)+/,""):c=m.getBasePageUrl()+a.replace(/^(\.\/)+/,"")),c.replace(/\#$/,"")},m.getShortUrl=function(a){var b=a,c=m.getBaseUrl(),d=m.getRootUrl();return m.emulated.pushState&&(b=b.replace(c,"")),b=b.replace(d,"/"),m.isTraditionalAnchor(b)&&(b="./"+b),b=b.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),b},m.store={},m.idToState=m.idToState||{},m.stateToId=m.stateToId||{},m.urlToId=m.urlToId||{},m.storedStates=m.storedStates||[],m.savedStates=m.savedStates||[],m.normalizeStore=function(){m.store.idToState=m.store.idToState||{},m.store.urlToId=m.store.urlToId||{},m.store.stateToId=m.store.stateToId||{}},m.getState=function(a,b){typeof a=="undefined"&&(a=!0),typeof b=="undefined"&&(b=!0);var c=m.getLastSavedState();return!c&&b&&(c=m.createStateObject()),a&&(c=m.cloneObject(c),c.url=c.cleanUrl||c.url),c},m.getIdByState=function(a){var b=m.extractId(a.url),c;if(!b){c=m.getStateString(a);if(typeof m.stateToId[c]!="undefined")b=m.stateToId[c];else if(typeof m.store.stateToId[c]!="undefined")b=m.store.stateToId[c];else{for(;;){b=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof m.idToState[b]=="undefined"&&typeof m.store.idToState[b]=="undefined")break}m.stateToId[c]=b,m.idToState[b]=a}}return b},m.normalizeState=function(a){var b,c;if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};b={},b.normalized=!0,b.title=a.title||"",b.url=m.getFullUrl(m.unescapeString(a.url||d.location.href)),b.hash=m.getShortUrl(b.url),b.data=m.cloneObject(a.data),b.id=m.getIdByState(b),b.cleanUrl=b.url.replace(/\??\&_suid.*/,""),b.url=b.cleanUrl,c=!m.isEmptyObject(b.data);if(b.title||c)b.hash=m.getShortUrl(b.url).replace(/\??\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;return b.hashedUrl=m.getFullUrl(b.hash),(m.emulated.pushState||m.bugs.safariPoll)&&m.hasUrlDuplicate(b)&&(b.url=b.hashedUrl),b},m.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};return d=m.normalizeState(d),d},m.getStateById=function(a){a=String(a);var c=m.idToState[a]||m.store.idToState[a]||b;return c},m.getStateString=function(a){var b,c,d;return b=m.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=k.stringify(c),d},m.getStateId=function(a){var b,c;return b=m.normalizeState(a),c=b.id,c},m.getHashByState=function(a){var b,c;return b=m.normalizeState(a),c=b.hash,c},m.extractId=function(a){var b,c,d;return c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"",b||!1},m.isTraditionalAnchor=function(a){var b=!/[\/\?\.]/.test(a);return b},m.extractState=function(a,b){var c=null,d,e;return b=b||!1,d=m.extractId(a),d&&(c=m.getStateById(d)),c||(e=m.getFullUrl(a),d=m.getIdByUrl(e)||!1,d&&(c=m.getStateById(d)),!c&&b&&!m.isTraditionalAnchor(a)&&(c=m.createStateObject(null,null,e))),c},m.getIdByUrl=function(a){var c=m.urlToId[a]||m.store.urlToId[a]||b;return c},m.getLastSavedState=function(){return m.savedStates[m.savedStates.length-1]||b},m.getLastStoredState=function(){return m.storedStates[m.storedStates.length-1]||b},m.hasUrlDuplicate=function(a){var b=!1,c;return c=m.extractState(a.url),b=c&&c.id!==a.id,b},m.storeState=function(a){return m.urlToId[a.url]=a.id,m.storedStates.push(m.cloneObject(a)),a},m.isLastSavedState=function(a){var b=!1,c,d,e;return m.savedStates.length&&(c=a.id,d=m.getLastSavedState(),e=d.id,b=c===e),b},m.saveState=function(a){return m.isLastSavedState(a)?!1:(m.savedStates.push(m.cloneObject(a)),!0)},m.getStateByIndex=function(a){var b=null;return typeof a=="undefined"?b=m.savedStates[m.savedStates.length-1]:a<0?b=m.savedStates[m.savedStates.length+a]:b=m.savedStates[a],b},m.getHash=function(){var a=m.unescapeHash(d.location.hash);return a},m.unescapeString=function(b){var c=b,d;for(;;){d=a.unescape(c);if(d===c)break;c=d}return c},m.unescapeHash=function(a){var b=m.normalizeHash(a);return b=m.unescapeString(b),b},m.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},m.setHash=function(a,b){var c,e,f;return b!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.setHash,args:arguments,queue:b}),!1):(c=m.escapeHash(a),m.busy(!0),e=m.extractState(a,!0),e&&!m.emulated.pushState?m.pushState(e.data,e.title,e.url,!1):d.location.hash!==c&&(m.bugs.setHash?(f=m.getPageUrl(),m.pushState(null,null,f+"#"+c,!1)):d.location.hash=c),m)},m.escapeHash=function(b){var c=m.normalizeHash(b);return c=a.escape(c),m.bugs.hashEscape||(c=c.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),c},m.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return b=m.unescapeHash(b),b},m.setTitle=function(a){var b=a.title,c;b||(c=m.getStateByIndex(0),c&&c.url===a.url&&(b=c.title||m.options.initialTitle));try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}return d.title=b,m},m.queues=[],m.busy=function(a){typeof a!="undefined"?m.busy.flag=a:typeof m.busy.flag=="undefined"&&(m.busy.flag=!1);if(!m.busy.flag){h(m.busy.timeout);var b=function(){var a,c,d;if(m.busy.flag)return;for(a=m.queues.length-1;a>=0;--a){c=m.queues[a];if(c.length===0)continue;d=c.shift(),m.fireQueueItem(d),m.busy.timeout=g(b,m.options.busyDelay)}};m.busy.timeout=g(b,m.options.busyDelay)}return m.busy.flag},m.busy.flag=!1,m.fireQueueItem=function(a){return a.callback.apply(a.scope||m,a.args||[])},m.pushQueue=function(a){return m.queues[a.queue||0]=m.queues[a.queue||0]||[],m.queues[a.queue||0].push(a),m},m.queue=function(a,b){return typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),m.busy()?m.pushQueue(a):m.fireQueueItem(a),m},m.clearQueue=function(){return m.busy.flag=!1,m.queues=[],m},m.stateChanged=!1,m.doubleChecker=!1,m.doubleCheckComplete=function(){return m.stateChanged=!0,m.doubleCheckClear(),m},m.doubleCheckClear=function(){return m.doubleChecker&&(h(m.doubleChecker),m.doubleChecker=!1),m},m.doubleCheck=function(a){return m.stateChanged=!1,m.doubleCheckClear(),m.bugs.ieDoubleCheck&&(m.doubleChecker=g(function(){return m.doubleCheckClear(),m.stateChanged||a(),!0},m.options.doubleCheckInterval)),m},m.safariStatePoll=function(){var b=m.extractState(d.location.href),c;if(!m.isLastSavedState(b))c=b;else return;return c||(c=m.createStateObject()),m.Adapter.trigger(a,"popstate"),m},m.back=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.back,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.back(!1)}),n.go(-1),!0)},m.forward=function(a){return a!==!1&&m.busy()?(m.pushQueue({scope:m,callback:m.forward,args:arguments,queue:a}),!1):(m.busy(!0),m.doubleCheck(function(){m.forward(!1)}),n.go(1),!0)},m.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)m.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)m.back(b)}return m};if(m.emulated.pushState){var o=function(){};m.pushState=m.pushState||o,m.replaceState=m.replaceState||o}else m.onPopState=function(b,c){var e=!1,f=!1,g,h;return m.doubleCheckComplete(),g=m.getHash(),g?(h=m.extractState(g||d.location.href,!0),h?m.replaceState(h.data,h.title,h.url,!1):(m.Adapter.trigger(a,"anchorchange"),m.busy(!1)),m.expectedStateId=!1,!1):(e=m.Adapter.extractEventData("state",b,c)||!1,e?f=m.getStateById(e):m.expectedStateId?f=m.getStateById(m.expectedStateId):f=m.extractState(d.location.href),f||(f=m.createStateObject(null,null,d.location.href)),m.expectedStateId=!1,m.isLastSavedState(f)?(m.busy(!1),!1):(m.storeState(f),m.saveState(f),m.setTitle(f),m.Adapter.trigger(a,"statechange"),m.busy(!1),!0))},m.Adapter.bind(a,"popstate",m.onPopState),m.pushState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.pushState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.pushState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0},m.replaceState=function(b,c,d,e){if(m.getHashByUrl(d)&&m.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&m.busy())return m.pushQueue({scope:m,callback:m.replaceState,args:arguments,queue:e}),!1;m.busy(!0);var f=m.createStateObject(b,c,d);return m.isLastSavedState(f)?m.busy(!1):(m.storeState(f),m.expectedStateId=f.id,n.replaceState(f.id,f.title,f.url),m.Adapter.trigger(a,"popstate")),!0};if(f){try{m.store=k.parse(f.getItem("History.store"))||{}}catch(p){m.store={}}m.normalizeStore()}else m.store={},m.normalizeStore();m.Adapter.bind(a,"beforeunload",m.clearAllIntervals),m.Adapter.bind(a,"unload",m.clearAllIntervals),m.saveState(m.storeState(m.extractState(d.location.href,!0))),f&&(m.onUnload=function(){var a,b;try{a=k.parse(f.getItem("History.store"))||{}}catch(c){a={}}a.idToState=a.idToState||{},a.urlToId=a.urlToId||{},a.stateToId=a.stateToId||{};for(b in m.idToState){if(!m.idToState.hasOwnProperty(b))continue;a.idToState[b]=m.idToState[b]}for(b in m.urlToId){if(!m.urlToId.hasOwnProperty(b))continue;a.urlToId[b]=m.urlToId[b]}for(b in m.stateToId){if(!m.stateToId.hasOwnProperty(b))continue;a.stateToId[b]=m.stateToId[b]}m.store=a,m.normalizeStore(),f.setItem("History.store",k.stringify(a))},m.intervalList.push(i(m.onUnload,m.options.storeInterval)),m.Adapter.bind(a,"beforeunload",m.onUnload),m.Adapter.bind(a,"unload",m.onUnload));if(!m.emulated.pushState){m.bugs.safariPoll&&m.intervalList.push(i(m.safariStatePoll,m.options.safariPollInterval));if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")m.Adapter.bind(a,"hashchange",function(){m.Adapter.trigger(a,"popstate")}),m.getHash()&&m.Adapter.onDomLoad(function(){m.Adapter.trigger(a,"hashchange")})}},m.init()}(window);
/*!
 * jQuery saxify-html5
 * Based on https://github.com/browserstate/ajaxify v1.0.1
 * dependencies:
 *   jQuery 1.5+, History.js
 */

(function(window, document, $){

    $.saxify = function(options){

        // Check to see if we should allow plugin for this browser
        if( !(window.history && history.pushState) && !options.allowFallback ) return false;

        // Check to see if History.js is enabled for this Browser
        if( !window.History || !window.History.enabled ) return false;

        var History = window.History,
            cache = {},
            opt = $.extend({
                // Links...
                linkSelector: "a",
                linkFilter: '[target="_blank"], .sax-ignore, .no-ajaxy',

                // Forms
                formSelector: "",                                       // This is deliberately left empty as we will not activate ajax form submission by default
                formFilter: "",

                // force some pages to reload...
                nonAjaxPages: [],

                // Optionally pass parameters in request.
                defaultRequestData: {},									// This can be overridden per request
                requestType: "GET",
                requestHeaders: {},

                // Transitions...
                fade: 600,												// fadeIn/Out transition. Can be bypassed by using negative value
                scrollTop: 0,											// To scroll to the top of the page after load, use a positive value here
                scrollSpeed: 800,
                scrollEase: 'swing',

                // callbacks...
                beforeSend: function(contentTarget, jqXHR, settings){ return; },
                beforeReplace: function(contentTarget, contentHtml, data, textStatus, jqXHR){ return; },
                successCallback: function(contentTarget, relativeUrl, contentHtml, data, textStatus, jqXHR){ return; },
                errorCallback: function(contentTarget, jqXHR, textStatus, errorThrown){ alert("We were unable to find that. Please try again."); return true; },				// Returning false here will instruct the plugin to navigate to the target url using window.location
                analyticsHandler: function(path){
                    if( typeof window._gaq !== 'undefined' ) window._gaq.push(['_trackPageview', path]);
                    else if( typeof window.ga !== 'undefined' ) window.ga('send', 'pageview', {'page': path});
                },
                // This function will update many typical nav stuctures. Customise using the selectors below or override completely
                navHandler: function(url, relativeUrl, relativeUrl_Root){
                    if($menu.length){
                        var $menuChildren = $menu.find(opt.menuChildrenSelector);
                        $menuChildren.filter(opt.activeSelector).removeClass(opt.activeClass);
                        $menuChildren = $menuChildren.has('a[href^="'+relativeUrl+'"],a[href^="'+relativeUrl_Root+'"],a[href^="'+url+'"]');
                        if( $menuChildren.length === 1 ) $menuChildren.addClass(opt.activeClass);
                    }
                },

                // Selectors...
                contentSelector: '#content_body',				        // Default page load element

                menuSelector: '#menu,.menu,#nav,nav:first,.nav:first',	// Common menu arrangements
                activeSelector: '.active,.selected,.current,.youarehere',
                activeClass: 'active selected current youarehere',
                menuChildrenSelector: '> li,> ul > li',

                scriptSelector: '.document-script',						// Scripts with this tag can be loaded within the content body. This can only be changed to a list of ID's.
                contentLoadingClass: 'ajax-loading-element',			// This class will be added to the target element of the current request
                pageLoadingClass: 'ajax-load-page',						// This class will be added to the <html/> element during full page (default) ajax requests
                loadingClass: 'ajax-load',							    // This class will be added to the <html/> element during ALL ajax requests. Use the callbacks for anything more specific

                updateContentAttributes: true,                          // Update css class of the content target element on load. Could be extended to other attributes.
                updateBodyAttributes: true,                             // Update css of document body on load. Only applies where a full page load is done.

                // We can cache server responses so queries are not duplicated.
                useCaching: true,										// Set to false if your content changes frequently

                // Use custom events to let your scripts know about the page load, instead of (or in addition to) callback...
                completedEventName: 'statechangecomplete'				// This event fires after request is complete and content replaced, but before successCallback and tracking update
            }, options || {});

        var $content = $(opt.contentSelector).filter(':first'),
            contentNode = $content.get(0),
            $menu = $(opt.menuSelector).filter(':first'),
            $window = $(window),
            $body = $(document.body),
            rootUrl = History.getRootUrl(),
            addRootToPath = function(p){ return (p.indexOf("/")===0? "":"/")+p; },
            ajaxAllowed = function(path){
                path = path.replace(/^\/|\/$/g, '').replace(rootUrl, '');
                path = addRootToPath(path);
                for(var l=opt.nonAjaxPages.length, i = (path==rootUrl)? l+1: 0; i<l; i++)
                    if(path.indexOf(opt.nonAjaxPages[i]) == 0) return false;
                return true;
            },
            rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        // Ensure Content
        if ( $content.length === 0 ) $content = $body;

        // Internal Helper
        $.expr[':'].saxifies = function(obj, index, meta, stack){
            if(typeof(obj.href)!="string") return false;
            var $this = $(obj),
                url = ( $this.attr('href') || $this.data("ajax-href") ) || '',
                isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;			// Check link
            return ( 0!=url.indexOf("#") ) && isInternalLink && !$this.is(opt.linkFilter) && ajaxAllowed(url);
        };

        // HTML Helper
        var documentHtml = function(html){
            // Prepare
            var result = String(html);
            if( -1==result.indexOf('<html') )
                result = '<html><head></head><body>'+ result +'</body></html>';
            result = result.replace(/<\!DOCTYPE[^>]*>/i, '')
                .replace(/<(html|head|body|title|meta)([\s\>])/gi,'<div class="document-$1"$2')
                .replace(/<\/(html|head|body|title|meta)\>/gi,'</div>');

            result = result.replace(/<script/gi, ' <!-- <script').replace(/\/script>/gi, '/script> --> ');          //We'll get these later.

            return $.trim(result);
        };

        // Setup the state data for this request
        var getRequestParameters = function($this, stateData){
            if($this.data("ajax-use-cache")!=undefined) stateData.useCache = $this.data("ajax-use-cache");
            if($this.data("ajax-content-target")) stateData.contentTarget = $this.data("ajax-content-target");
            if($this.data("ajax-load-fullpage")!=undefined) stateData.fullPage = $this.data("ajax-load-fullpage");
            else if(stateData.contentTarget && $(stateData.contentTarget)[0] !== contentNode) stateData.fullPage = false;
            stateData.requestData = $this.data("ajax-requestData") || opt.defaultRequestData;
            if($this.data("ajax-historyData")) stateData.historyData = $this.data("ajax-historyData");
            stateData.requestType = $this.data("ajax-requestType") || opt.requestType;
            stateData.requestHeaders = $this.data("ajax-requestHeaders") || opt.requestHeaders;
            return stateData;
        };

        // Ajaxify clicks
        var ajaxClick = function(event){
            // Continue as normal for cmd clicks etc. Check if this is a valid link.
            if ( event.which == 2 || event.metaKey || !$(this).is(":saxifies") ) { return true; }

            var $this = $(this),
                url = $this.attr('href') || $this.data("ajax-href"),
                title = $this.attr('title') || null,
                stateData = {ajaxClick: true, fullPage: true, requestData: null, historyData: null},
                ajaxOnClick = null;

            // Optionally set a function on the clickable element as a data attribute.
            // This function will receive the element's click event and must return true (if you use it) to continue processing
            // Because it runs first you can use it to change other jquery data associated with the element
            if(typeof $this.data("ajax-onclick") == "function"){
                ajaxOnClick = $this.data("ajax-onclick");
                if(!ajaxOnClick.call(this, event)) return true;
            }

            //We are good to go. Don't execute default action
            event.preventDefault();

            // Some properties of a request can be set using data attributes on the link
            stateData = getRequestParameters($this, stateData);

            // Ajaxify this link
            if(stateData.fullPage) History.pushState(stateData,title,url);
            else makeRequest({data: stateData}, url);

            return false;
        };
        $body.on("click", opt.linkSelector, ajaxClick);

        // Ajaxify form submits
        var ajaxForm = function(event){
            var $this = $(this),
                url = $this.attr("action"),
                method = $this.attr("method"),
                ajaxOnSubmit = null,
                stateData = {ajaxForm: true, requestType: method, fullPage: true, requestData: null, historyData: null},
                formData;
            if( !ajaxAllowed(url) ) return true;
            //We are good to go. Don't execute default action
            event.preventDefault();

            // Optionally set a callback function on the form as a data attribute.
            // This function will receive the submit event and must return true (if you use it) to continue submit action
            // You can use it to validate or change data associated with the form
            if(typeof $this.data("ajax-onsubmit") == "function"){
                ajaxOnSubmit = $this.data("ajax-onsubmit");
                if(!ajaxOnSubmit.call(this, event)) return false;
            }

            // Some properties of a request can be set using data attributes on the form
            stateData = getRequestParameters($this, stateData);

            // Add the form data to the requestData so it can be sent to the server via ajax
            formData = $this.serializeArray();
            for(var i=0; i<formData.length; i++)
                $.extend(stateData.requestData, formData[i] || {});

            // Ajaxify this form
            if(stateData.fullPage) History.pushState(stateData,null,url);
            else makeRequest({data: stateData}, url);

            return false;
        };

        if(opt.formSelector.length) $body.on("submit", opt.formSelector, ajaxForm);


        var request = function(State, url){
            var r = this,
                ajaxAnimationComplete = true,							// Set a flag for this request's animation
                target = (State.data && State.data.contentTarget)? State.data.contentTarget : opt.contentSelector;

            if(!$(target).length) return;

            r.requestStatus = 0;										// Status of the request. 0= not made, 1= awaiting response, 2= recieved.
            r.responseArgs = [];

            r.State = State;
            r.url = url || State.url;
            r.relativeUrl = r.url.replace(rootUrl,'');
            r.targetSelector = target;
            r.contentTarget = $(target).filter(":first");
            r.fullPageLoad = (r.State.data && typeof(r.State.data.fullPage)!="undefined")? r.State.data.fullPage : true;
            r.animOut = function(){
                ajaxAnimationComplete = false;
                // Set Loading
                $(document.documentElement).addClass(opt.loadingClass);
                r.contentTarget.addClass(opt.contentLoadingClass);
                r.fullPageLoad && $(document.documentElement).addClass(opt.pageLoadingClass);
                // Start fade out or wait
                if(opt.fade>0) r.contentTarget.addClass(opt.contentLoadingClass).animate({opacity:0}, opt.fade, function(){ ajaxAnimationComplete = true; });
                else setTimeout(function(){ ajaxAnimationComplete = true; }, Math.abs(opt.fade));
            };
            r.animIn = function(){
                // Complete the change
                if(r.fullPageLoad && opt.scrollSpeed>=0) $('html, body').animate({ scrollTop: opt.scrollTop }, opt.scrollSpeed, opt.scrollEase);
                // Start fade in or wait
                $(document.documentElement).removeClass(opt.loadingClass);
                r.contentTarget.removeClass(opt.contentLoadingClass);
                r.fullPageLoad && $(document.documentElement).removeClass(opt.pageLoadingClass);
                if(opt.fade>0) r.contentTarget.removeClass(opt.contentLoadingClass).stop(true, true).animate({opacity:1},opt.fade);
            };
            r.completeRequest = function(State, url){
                if(r.responseArgs.length){
                    r.animOut();
                    r.requestStatus = 2;
                    successFn.apply(r, r.responseArgs);
                }else{
                    r = new request(State, url);
                }
            };

            if(!r.State.data.ajaxClick && !ajaxAllowed(url)){ 			// We do not want pages in the nonAjaxPages list to be ajax loaded using browser back/forward
                document.location.href = r.url;	                    	// No need to do this after a click event
                return false;
            }

            function successFn(data, textStatus, jqXHR){

                // Check back later if we are still loading or our animation is incomplete
                if(!ajaxAnimationComplete || r.requestStatus === 1){
                    var thisReq = this,
                        Rgs = arguments;
                    setTimeout(function(){ successFn.apply(thisReq, Rgs) }, 100);
                    return;
                }else if(r.requestStatus !== 2){
                    return;
                }

                // Store args so we can cache
                r.responseArgs = arguments;

                var $data = $(documentHtml(data)),
                    $dataBody = $data.find('.document-body:first'),
                    $dataContent = $data.find(r.targetSelector).filter(':first'),
                    scripts = $dataContent[0].innerHTML.match(rscript) || [],
                    contentHtml = $dataContent.length? $dataContent.html() : $data.html();

                if( !contentHtml ) {
                    if(r.fullPageLoad) document.location.href = r.url;
                    else alert("There was an error reading the response. Please try again.");
                    return false;
                }

                opt.beforeReplace(r.contentTarget, contentHtml, data, textStatus, jqXHR);

                // Set cache
                if((r.State.data.useCache || opt.useCaching) && !cache[r.url]){
                    cache[r.url] = r;
                }

                // Update the meta
                if(r.fullPageLoad) {
                    document.title = $data.find('.document-title:first').text();

                    try {
                        document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
                    }
                    catch ( Exception ) { }
                }

                // Update the content attributes
                if(opt.updateBodyAttributes && $dataBody.length)
                    $("body").attr("class", $dataBody.attr("class").replace("document-body", ""));
                if(opt.updateContentAttributes)
                    r.contentTarget[0].className = opt.contentLoadingClass+" "+$dataContent.attr("class");

                // Update the content
                r.contentTarget.html(contentHtml);

                // Add the scripts
                $('<div>'+scripts+'</div>').find('script').each(function(i, s){
                    var $script = $(s), scriptText = $script.text(), scriptNode = document.createElement('script'), attributes = s.attributes || [];

                    if(scriptNode.src && scriptNode.src.length)
                        scriptNode.src = $script.attr('src');
                    for (var c=0; c < attributes.length; c++)
                        $(scriptNode).attr(attributes[c].name, attributes[c].value);

                    scriptNode.appendChild(document.createTextNode(scriptText));
                    r.contentTarget[0].appendChild(scriptNode);
                });

                opt.successCallback(r.contentTarget, addRootToPath(r.relativeUrl), contentHtml, data, textStatus, jqXHR);
                r.contentTarget.trigger(opt.completedEventName);		//We fire this event on the element which was updated instead of $window
                r.animIn();

                if(r.fullPageLoad){
                    // Update the menu
                    opt.navHandler(r.url, r.relativeUrl, addRootToPath(r.relativeUrl));

                    // Inform Analytics of the change
                    opt.analyticsHandler.call(this, addRootToPath(r.relativeUrl));
                }

            };

            function errorFn(jqXHR, textStatus, errorThrown){

                if(opt.errorCallback(r.contentTarget, jqXHR, textStatus, errorThrown))
                    document.location.href = r.url;
                r.animIn();
                return false;

            };

            function $ajax(){
                $.ajax({
                    url: (r.url.slice(-1)!="/")? r.url+"/" : r.url,
                    data: r.State.data.requestData,
                    type: r.State.data.requestType,
                    headers: r.State.data.requestHeaders,
                    beforeSend: function(jqXHR, settings){
                        r.requestStatus = 1;
                        opt.beforeSend(r.contentTarget, jqXHR, settings);
                    },
                    success: function(){
                        r.requestStatus = 2;
                        successFn.apply(this, arguments);
                    },
                    error: function(){
                        r.requestStatus = -1;
                        errorFn.apply(this, arguments);
                    }
                });
            };

            // Ajax Request the Page
            r.animOut();
            $ajax();

        };


        // Do clever caching if you like
        var makeRequest = function(State, url){
            if((State.data.useCache || opt.useCaching) && cache[url]) cache[url].completeRequest(State, url);
            else new request(State, url);
        }


        // Hook into State Changes
        $window.on('statechange', function(){
            var State = History.getState(),
                url = State.url;
            State.data.requestData = State.data.requestData || null;
            State.data.historyData = State.data.historyData || null;

            makeRequest(State, url);
        });


    };

})(window, document, jQuery);;
/*!
 * jQuery lazyImage plugin - v1.1 - 02/02/2013
 * http://www.nathanroyal.com/code-tools/lazy-load-images
 * Copyright (c) 2013 Nathan Johnson
 * licensed under the Creative Commons Attribution-ShareAlike license.
 */
(function($){
	$.fn.lazyImage = function(na, j){
		var opt = $.extend({ 
				waitTime : 50,			//The frequency at which to check the progress of image loading
				waitMultiplier : 20,	//Times to check if download complete, Best to override this with a larger number if your images are very large
				identifier : 'lazy',	//Css class which identifies lazy images not yet loaded
				hideClass : 'hide',		//Images with this class will remain hidden	
				fade: "slow",
				eachLoad: null
			}, na || {}),
			svprr = this,
			list = svprr.length,
			wait = list * opt.waitMultiplier,
			ex = ($.isFunction(na))? na : j,
			check = (ex && typeof(ex) === "function")? checkImLoad() : false;

		function checkImLoad(){
			if(list <= 0 || wait <= 0){				//All images loaded or timeout reached
				ex.call(svprr);								//Yes, run callback function
				return true;
			}else{
				wait--;								//No, check back later
				setTimeout( function(){ checkImLoad(); }, opt.waitTime);
			}
		}

		if(list){
			return this
				.one('load', function() {			//Set something to run when it finishes loading
					typeof opt.eachLoad == "function" && opt.eachLoad.call(this);
					$(this).removeClass(opt.identifier);
					list--;
					if(!$(this).hasClass(opt.hideClass)){
						if(opt.fade===0) $(this).show();
						else $(this).fadeIn(opt.fade); 	//Fade it in when loaded
					}
				})
				.each(function(index, node){
					node = $(node);
					if(node.attr('data-imgsrc')){	//If it has the lazy load data attribute, do stuff
						node.hide()					//Hide it first
						node.attr('src', $(this).data().imgsrc) //Set the source so it begins downloading
					}
					if(this.complete){
						node.trigger('load');		//Cache fix for browsers that don't trigger .load()
					}
				});
		}
	}
}(jQuery));;
/*!
 * jQuery fakeDrop plugin - v0.5 - 03/07/2014
 * http://www.nathanroyal.com/code-tools/
 * Copyright (c) 2013-2014 Nathan Johnson, Michał Bielawski
 * licensed under the Creative Commons Attribution-ShareAlike license.
 *
 * Minimum css: 
	.fakeDrop {position: relative;}
	.fakeDrop .bxd {position: absolute; top: 100%; left: -1px; right: -1px;}
	.js .fakeDrop .bxd {display: none;}
 *
 */
(function($){
	$.fn.fakeDrop = function(na, j){
		var opt = $.extend({
			upspeed: 300,
			downspeed: 400,
			eezeDown: "linear",  // Use only if you have included jquery easing 
			eezeUp: "linear",
			onDown: function(){return;},  // On drop
			onUp: function(){return;},
			slide: true  // Set to false if you have a clever way to do your transition using the callbacks
		}, na || {});

		return this.each(function(index, node){
			var fk = $(node).css("position", "relative"),
				bxd = $(".bxd", fk).hide(),
				collapsed = true,
				animating = false,
				m_o = function(){
					if(opt.slide){
						animating=true;
						collapsed = false;
						bxd.slideDown(opt.downspeed, opt.eezeDown, function(){
							animating=false;
						});
					}
					opt.onDown.call(node);
				},
				m_l = function(){
					if(opt.slide){
						animating = collapsed = true;
						bxd.stop().slideUp(opt.upspeed, opt.eezeUp, function(){
							animating=false;
						});
					}
					opt.onUp.call(node);
				};

			fk.on('mouseover', m_o)
				.on('mouseleave', m_l)
				.on('touchstart', function(e) {
					if (collapsed) m_o();
					else m_l();
				})
				.find('*')
					.on('touchstart touchend', function(e) {
						e.stopPropagation();
					});
		});
	};
}(jQuery));
;
/*!
 * jQuery ezSlidr plugin - v0.8 - 14/11/2013
 * http://www.nathanroyal.com/code-tools/ezSlidr
 * Copyright (c) 2013 Nathan Johnson
 * licensed under the Creative Commons Attribution-ShareAlike license.
 
 Example (Any type of element can be used, only the css classes need be the same. NO styles are required or provided.): 
 
 <div class="ezSlidr">
	<ul class="slides">
		<li>
			<h1>One</h1>
		</li>
		<li>
			<h1>Two</h1>
		</li>
		<li>
			<h1>Three</h1>
		</li>
		<li>
			<h1>Four</h1>
		</li>
		<li>
			<h1>Five</h1>
		</li>
	</ul>
</div>

 @option Integer speed
		 Speed of slide animation. default is 300(ms).

 @option Integer stepSize
		 Number of slides moved by trigger("ezSlidr",  "next"). Default is 1.

 @option Integer carousel
		 Set to a positive integer to start a continuous slideshow. value represents time in ms between sliding.

 @option String eeze
		 jQuery easing function to use. Do not use unless your project includes custom eases.

 @option Boolean respond
		 Set to true if slides should respond to width changes on the window. Using this option forces slides to the width of the slider window.

 @option Integer respondSpeed
		 Refresh speed of the respond feature. This option only takes effect if "respond" is "true".

 @option String activeClass
		 This option allows to to change the class identifying active elements. Defaults to "active". Change if this conflicts with your stylesheet.

 @option String listWrapClass
		 A div is wrapped around the list element. This option allows you to add a class to this wrapper.

 @option Function before(slider, current, target, currentIndex, targetIndex)
		 Callback run just before sliding. Receives the container, old and new active elements in that order.

 @option Function after(slider, current, target, currentIndex, targetIndex)
		 Callback run just after sliding. Receives the container, old and new active elements in that order.

 @option Function buttonClick(slider, btn)
		 Replaces the default button action. Default functionality can be retained as follows:
		 slider.trigger("ezSlidr", btn.hasClass("next")? "next" : "previous");
		 
Movement can also be initiated using:
 $(".ezSlidr").trigger("ezSlidr", "next")
 $(".ezSlidr").trigger("ezSlidr", "previous")
 $(".ezSlidr").trigger("ezSlidr", 2) //Index of target slide
 
 */
(function($){
	$.fn.ezSlidr = function(na, j){
		var htm = $("html"),
			opt = $.extend({ 
				speed: 300,
				stepSize: 1,
				carousel: 0,
				eeze: "linear",
				before: 0,
				after: 0,
				respond: false,
				respondSpeed: 300,
				windowClass: "slider-window",
				buttonClick: function(slider, btn){
					slider.trigger("ezSlidr", btn.hasClass("next")? "next" : "previous");
				},
				activeClass: "active"
			}, na || {});

		(function(){
			if(!htm.hasClass("clearfixed")){ 
				$('<style type="text/css">.mcf:before, .mcf:after{content:""; display:table;} .mcf:after{clear:both;} .mcf{zoom:1;}</style>').appendTo('head'); 
				htm.addClass("clearfixed");
			}
		})();

		return this.each(function(i, xed){
			var slider = $(xed),
				window = $('<div class="'+opt.windowClass+'"/>').css({"overflow": "hidden", "width": "100%"}),
				container = $(".slides", slider).addClass("mcf").wrap(window),
				slides = container.children().css("float","left"),
				previousBtn = $('<a href="#" class="slideBtn previous"></a>').appendTo(slider),
				nextBtn = $('<a href="#" class="slideBtn next '+opt.activeClass+'"></a>').appendTo(slider),
				btnz = previousBtn.add(nextBtn).hide(),
				length = slides.length,
				w = slides.outerWidth(true),
				current = -1,
				animating = false,
				t;
			
			if(length<=1) slider.addClass("no-sliding");
			slider.data("ezSlidr-length", length);
			if(!/absolute|fixed|relative/.test(slider.css("position"))) slider.css("position", "relative");
			
			if(opt.respond){
				var sliderWidth = w, 
					sw,
					tmr,
					frsh = function(force){
						sw = slider.width();
						if(force || w !==  sw){
							w = sw;
							container.width((length+1)*w).css({marginLeft: 0-(current*w)});
							slides.width(w);
						}
					};
				frsh(true);
				tmr = setInterval(function(){frsh()}, opt.respondSpeed);
			}else{
				container.width((length+1)*w);
			}
			
			function move(target, scifi){
				if(typeof target == "string"){ 
					if(target=="next"){ target = current+opt.stepSize; }
					else if(target=="previous"){ target = current-opt.stepSize; }
				}
				if(target<0) target = 0;
				if(target>=length) target = scifi? 0 : length-1;
				if(!animating && typeof target == "number" && target!==current){
					animating = true;
					typeof opt.before == "function" && opt.before(slider, slides.eq(current), slides.eq(target), current, target);
					container.animate({marginLeft: 0-(target*w)}, opt.speed, opt.eeze, function(){ 
						slides.eq(current).removeClass(opt.activeClass);
						slides.eq(target).addClass(opt.activeClass);
						current = target;
						slider.data("ezSlidr-current", current);
						typeof opt.after == "function" && opt.after(slider, slides.eq(current), slides.eq(target), current, target);
						animating = false; 
					});
					if(target == 0){ previousBtn.removeClass(opt.activeClass) }else{ previousBtn.addClass(opt.activeClass) }
					if(target == length-1){ nextBtn.removeClass(opt.activeClass) }else{ nextBtn.addClass(opt.activeClass) }
				}
				if(opt.carousel){
					clearTimeout(t);
					t = setTimeout(function(){ move("next", true) }, opt.carousel);
				}
			}
			move(0);
			
			slider.bind("ezSlidr", function(e, target){ move(target) });
			
			btnz.click(function(e){
				e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
				opt.buttonClick(slider, $(this));
			}).fadeIn();
		});
	}
}(jQuery));;
/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright å© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/*!
 * jQuery replaceSelect plugin - v0.8 - 01/04/2014
 * http://nathanroyal.com
 * Copyright (c) 2013 Nathan Johnson
 * licensed under the Creative Commons Attribution-ShareAlike license.
 */
(function(a){a.fn.replaceSelect=function(n){var r=a.extend({touchBrowser:"ontouchstart"in document.body},n||{});return this.each(function(n,k){function s(){var b=a('<div class="dd-top" />').append(a("<span />").text(l[p])),g=a('<div class="dd_container" />').insertBefore(m),d=a("a",c),h=0;g.append(b.append(c));r.touchBrowser?b.click(function(){c.is(":visible")?c.stop(!0).slideUp("fast"):c.slideDown("fast")}):b.hover(function(){c.slideDown("fast")},function(){c.stop(!0,!0).slideUp("fast")});d.click(function(e,g){e.preventDefault();e.stopPropagation();var f=a(this).data("dd-target");h!=f&&(k.selectedIndex=f,a("span",b).text(l[f]),d.eq(f).hide(),d.eq(h).show(),g||(a("[selected]",k).removeAttr("selected"),a("option",k).eq(f).attr("selected","selected"),m.trigger("change")),h=f);c.stop(!0).slideUp("fast")})}var m=a(k).hide(),q=a("option",m),t=q.length,l=[],c=a('<div class="dd-btm" />').hide(),p=0;q.each(function(b,g){var d=a(g),h=d.text(),e=d.attr("class")||"",e=a('<a href="#" class="'+e+'" />');0==b&&e.hide();d.is("[selected]")&&(p=b);l.push(h);c.append(e.text(l[b]).data("dd-target",b));b===t-1&&s()})})}})(jQuery);

/*!
	SlickNav Responsive Mobile Menu
	(c) 2014 Josh Cope
	licensed under MIT
*/
(function(e,t,n){function o(t,n){this.element=t;this.settings=e.extend({},r,n);this._defaults=r;this._name=i;this.init()}var r={label:"MENU",duplicate:true,duration:200,easingOpen:"swing",easingClose:"swing",closedSymbol:"&#9658;",openedSymbol:"&#9660;",prependTo:"body",parentTag:"a",closeOnClick:false,allowParentLinks:false,init:function(){},open:function(){},close:function(){}},i="slicknav",s="slicknav";o.prototype.init=function(){var n=this;var r=e(this.element);var i=this.settings;if(i.duplicate){n.mobileNav=r.clone();n.mobileNav.removeAttr("id");n.mobileNav.find("*").each(function(t,n){e(n).removeAttr("id")})}else n.mobileNav=r;var o=s+"_icon";if(i.label==""){o+=" "+s+"_no-text"}if(i.parentTag=="a"){i.parentTag='a href="#"'}n.mobileNav.attr("class",s+"_nav");var u=e('<div class="'+s+'_menu"></div>');n.btn=e("<"+i.parentTag+' aria-haspopup="true" tabindex="0" class="'+s+"_btn "+s+'_collapsed"><span class="'+s+'_menutxt">'+i.label+'</span><span class="'+o+'"><span class="'+s+'_icon-bar"></span><span class="'+s+'_icon-bar"></span><span class="'+s+'_icon-bar"></span></span></a>');e(u).append(n.btn);e(i.prependTo).prepend(u);u.append(n.mobileNav);var a=n.mobileNav.find("li");e(a).each(function(){var t=e(this);data={};data.children=t.children("ul").attr("role","menu");t.data("menu",data);if(data.children.length>0){var r=t.contents();var o=[];e(r).each(function(){if(!e(this).is("ul")){o.push(this)}else{return false}});var u=e(o).wrapAll("<"+i.parentTag+' role="menuitem" aria-haspopup="true" tabindex="-1" class="'+s+'_item"/>').parent();t.addClass(s+"_collapsed");t.addClass(s+"_parent");e(o).last().after('<span class="'+s+'_arrow">'+i.closedSymbol+"</span>")}else if(t.children().length==0){t.addClass(s+"_txtnode")}t.children("a").attr("role","menuitem").click(function(){if(i.closeOnClick)e(n.btn).click()})});e(a).each(function(){var t=e(this).data("menu");n._visibilityToggle(t.children,false,null,true)});n._visibilityToggle(n.mobileNav,false,"init",true);n.mobileNav.attr("role","menu");e(t).mousedown(function(){n._outlines(false)});e(t).keyup(function(){n._outlines(true)});e(n.btn).click(function(e){e.preventDefault();n._menuToggle()});n.mobileNav.on("click","."+s+"_item",function(t){t.preventDefault();n._itemClick(e(this))});e(n.btn).keydown(function(e){var t=e||event;if(t.keyCode==13){e.preventDefault();n._menuToggle()}});n.mobileNav.on("keydown","."+s+"_item",function(t){var r=t||event;if(r.keyCode==13){t.preventDefault();n._itemClick(e(t.target))}});if(i.allowParentLinks){e("."+s+"_item a").click(function(e){e.stopImmediatePropagation()})}};o.prototype._menuToggle=function(e){var t=this;var n=t.btn;var r=t.mobileNav;if(n.hasClass(s+"_collapsed")){n.removeClass(s+"_collapsed");n.addClass(s+"_open")}else{n.removeClass(s+"_open");n.addClass(s+"_collapsed")}n.addClass(s+"_animating");t._visibilityToggle(r,true,n)};o.prototype._itemClick=function(e){var t=this;var n=t.settings;var r=e.data("menu");if(!r){r={};r.arrow=e.children("."+s+"_arrow");r.ul=e.next("ul");r.parent=e.parent();e.data("menu",r)}if(r.parent.hasClass(s+"_collapsed")){r.arrow.html(n.openedSymbol);r.parent.removeClass(s+"_collapsed");r.parent.addClass(s+"_open");r.parent.addClass(s+"_animating");t._visibilityToggle(r.ul,true,e)}else{r.arrow.html(n.closedSymbol);r.parent.addClass(s+"_collapsed");r.parent.removeClass(s+"_open");r.parent.addClass(s+"_animating");t._visibilityToggle(r.ul,true,e)}};o.prototype._visibilityToggle=function(t,n,r,i){var o=this;var u=o.settings;var a=o._getActionItems(t);var f=0;if(n)f=u.duration;if(t.hasClass(s+"_hidden")){t.removeClass(s+"_hidden");t.slideDown(f,u.easingOpen,function(){e(r).removeClass(s+"_animating");e(r).parent().removeClass(s+"_animating");if(!i){u.open(r)}});t.attr("aria-hidden","false");a.attr("tabindex","0");o._setVisAttr(t,false)}else{t.addClass(s+"_hidden");t.slideUp(f,this.settings.easingClose,function(){t.attr("aria-hidden","true");a.attr("tabindex","-1");o._setVisAttr(t,true);t.hide();e(r).removeClass(s+"_animating");e(r).parent().removeClass(s+"_animating");if(!i)u.close(r);else if(r=="init")u.init()})}};o.prototype._setVisAttr=function(t,n){var r=this;var i=t.children("li").children("ul").not("."+s+"_hidden");if(!n){i.each(function(){var t=e(this);t.attr("aria-hidden","false");var i=r._getActionItems(t);i.attr("tabindex","0");r._setVisAttr(t,n)})}else{i.each(function(){var t=e(this);t.attr("aria-hidden","true");var i=r._getActionItems(t);i.attr("tabindex","-1");r._setVisAttr(t,n)})}};o.prototype._getActionItems=function(e){var t=e.data("menu");if(!t){t={};var n=e.children("li");var r=n.children("a");t.links=r.add(n.children("."+s+"_item"));e.data("menu",t)}return t.links};o.prototype._outlines=function(t){if(!t){e("."+s+"_item, ."+s+"_btn").css("outline","none")}else{e("."+s+"_item, ."+s+"_btn").css("outline","")}};o.prototype.toggle=function(){$this._menuToggle()};o.prototype.open=function(){$this=this;if($this.btn.hasClass(s+"_collapsed")){$this._menuToggle()}};o.prototype.close=function(){$this=this;if($this.btn.hasClass(s+"_open")){$this._menuToggle()}};e.fn[i]=function(t){var n=arguments;if(t===undefined||typeof t==="object"){return this.each(function(){if(!e.data(this,"plugin_"+i)){e.data(this,"plugin_"+i,new o(this,t))}})}else if(typeof t==="string"&&t[0]!=="_"&&t!=="init"){var r;this.each(function(){var s=e.data(this,"plugin_"+i);if(s instanceof o&&typeof s[t]==="function"){r=s[t].apply(s,Array.prototype.slice.call(n,1))}});return r!==undefined?r:this}}})(jQuery,document,window);

/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/(function(e){e(document).ready(function(){e("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>')});e.supersized=function(t){var n="#supersized",r=this;r.$el=e(n);r.el=n;vars=e.supersized.vars;r.$el.data("supersized",r);api=r.$el.data("supersized");r.init=function(){e.supersized.vars=e.extend(e.supersized.vars,e.supersized.themeVars);e.supersized.vars.options=e.extend({},e.supersized.defaultOptions,e.supersized.themeOptions,t);r.options=e.supersized.vars.options;r._build()};r._build=function(){var t=0,n="",i="",s,o="",u;while(t<=r.options.slides.length-1){switch(r.options.slide_links){case"num":s=t;break;case"name":s=r.options.slides[t].title;break;case"blank":s=""}n=n+'<li class="slide-'+t+'"></li>';if(t==r.options.start_slide-1){r.options.slide_links&&(i=i+'<li class="slide-link-'+t+' current-slide"><a>'+s+"</a></li>");if(r.options.thumb_links){r.options.slides[t].thumb?u=r.options.slides[t].thumb:u=r.options.slides[t].image;o=o+'<li class="thumb'+t+' current-thumb"><img src="'+u+'"/></li>'}}else{r.options.slide_links&&(i=i+'<li class="slide-link-'+t+'" ><a>'+s+"</a></li>");if(r.options.thumb_links){r.options.slides[t].thumb?u=r.options.slides[t].thumb:u=r.options.slides[t].image;o=o+'<li class="thumb'+t+'"><img src="'+u+'"/></li>'}}t++}r.options.slide_links&&e(vars.slide_list).html(i);r.options.thumb_links&&vars.thumb_tray.length&&e(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'">'+o+"</ul>");e(r.el).append(n);if(r.options.thumbnail_navigation){vars.current_slide-1<0?prevThumb=r.options.slides.length-1:prevThumb=vars.current_slide-1;e(vars.prev_thumb).show().html(e("<img/>").attr("src",r.options.slides[prevThumb].image));vars.current_slide==r.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;e(vars.next_thumb).show().html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}r._start()};r._start=function(){r.options.start_slide?vars.current_slide=r.options.start_slide-1:vars.current_slide=Math.floor(Math.random()*r.options.slides.length);var t=r.options.new_window?' target="_blank"':"";r.options.performance==3?r.$el.addClass("speed"):(r.options.performance==1||r.options.performance==2)&&r.$el.addClass("quality");if(r.options.random){arr=r.options.slides;for(var n,i,s=arr.length;s;n=parseInt(Math.random()*s),i=arr[--s],arr[s]=arr[n],arr[n]=i);r.options.slides=arr}if(r.options.slides.length>1){if(r.options.slides.length>2){vars.current_slide-1<0?loadPrev=r.options.slides.length-1:loadPrev=vars.current_slide-1;var o=r.options.slides[loadPrev].url?"href='"+r.options.slides[loadPrev].url+"'":"",u=e('<img src="'+r.options.slides[loadPrev].image+'"/>'),a=r.el+" li:eq("+loadPrev+")";u.appendTo(a).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading prevslide");u.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height());r.resizeNow()})}}else r.options.slideshow=0;o=api.getField("url")?"href='"+api.getField("url")+"'":"";var f=e('<img src="'+api.getField("image")+'"/>'),l=r.el+" li:eq("+vars.current_slide+")";f.appendTo(l).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading activeslide");f.load(function(){r._origDim(e(this));r.resizeNow();r.launch();typeof theme!="undefined"&&typeof theme._init=="function"&&theme._init()});if(r.options.slides.length>1){vars.current_slide==r.options.slides.length-1?loadNext=0:loadNext=vars.current_slide+1;o=r.options.slides[loadNext].url?"href='"+r.options.slides[loadNext].url+"'":"";var c=e('<img src="'+r.options.slides[loadNext].image+'"/>'),h=r.el+" li:eq("+loadNext+")";c.appendTo(h).wrap("<a "+o+t+"></a>").parent().parent().addClass("image-loading");c.load(function(){e(this).data("origWidth",e(this).width()).data("origHeight",e(this).height());r.resizeNow()})}r.$el.css("visibility","hidden");e(".load-item").hide()};r.launch=function(){r.$el.css("visibility","visible");e("#supersized-loader").remove();typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("next");e(".load-item").show();r.options.keyboard_nav&&e(document.documentElement).keyup(function(e){if(vars.in_animation)return!1;if(e.keyCode==37||e.keyCode==40){clearInterval(vars.slideshow_interval);r.prevSlide()}else if(e.keyCode==39||e.keyCode==38){clearInterval(vars.slideshow_interval);r.nextSlide()}else if(e.keyCode==32&&!vars.hover_pause){clearInterval(vars.slideshow_interval);r.playToggle()}});r.options.slideshow&&r.options.pause_hover&&e(r.el).hover(function(){if(vars.in_animation)return!1;vars.hover_pause=!0;if(!vars.is_paused){vars.hover_pause="resume";r.playToggle()}},function(){if(vars.hover_pause=="resume"){r.playToggle();vars.hover_pause=!1}});r.options.slide_links&&e(vars.slide_list+"> li").click(function(){index=e(vars.slide_list+"> li").index(this);targetSlide=index+1;r.goTo(targetSlide);return!1});r.options.thumb_links&&e(vars.thumb_list+"> li").click(function(){index=e(vars.thumb_list+"> li").index(this);targetSlide=index+1;api.goTo(targetSlide);return!1});if(r.options.slideshow&&r.options.slides.length>1){r.options.autoplay&&r.options.slides.length>1?vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval):vars.is_paused=!0;e(".load-item img").bind("contextmenu mousedown",function(){return!1})}e(window).resize(function(){r.resizeNow()})};r.resizeNow=function(){return r.$el.each(function(){e("img",r.el).each(function(){function o(e){if(e){if(thisSlide.width()<n||thisSlide.width()<r.options.min_width)if(thisSlide.width()*t>=r.options.min_height){thisSlide.width(r.options.min_width);thisSlide.height(thisSlide.width()*t)}else u()}else if(r.options.min_height>=i&&!r.options.fit_landscape){if(n*t>=r.options.min_height||n*t>=r.options.min_height&&t<=1){thisSlide.width(n);thisSlide.height(n*t)}else if(t>1){thisSlide.height(r.options.min_height);thisSlide.width(thisSlide.height()/t)}else if(thisSlide.width()<n){thisSlide.width(n);thisSlide.height(thisSlide.width()*t)}}else{thisSlide.width(n);thisSlide.height(n*t)}}function u(e){if(e){if(thisSlide.height()<i)if(thisSlide.height()/t>=r.options.min_width){thisSlide.height(r.options.min_height);thisSlide.width(thisSlide.height()/t)}else o(!0)}else if(r.options.min_width>=n){if(i/t>=r.options.min_width||t>1){thisSlide.height(i);thisSlide.width(i/t)}else if(t<=1){thisSlide.width(r.options.min_width);thisSlide.height(thisSlide.width()*t)}}else{thisSlide.height(i);thisSlide.width(i/t)}}thisSlide=e(this);var t=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2),n=r.$el.width(),i=r.$el.height(),s;r.options.fit_always?i/n>t?o():u():i<=r.options.min_height&&n<=r.options.min_width?i/n>t?r.options.fit_landscape&&t<1?o(!0):u(!0):r.options.fit_portrait&&t>=1?u(!0):o(!0):n<=r.options.min_width?i/n>t?r.options.fit_landscape&&t<1?o(!0):u():r.options.fit_portrait&&t>=1?u():o(!0):i<=r.options.min_height?i/n>t?r.options.fit_landscape&&t<1?o():u(!0):r.options.fit_portrait&&t>=1?u(!0):o():i/n>t?r.options.fit_landscape&&t<1?o():u():r.options.fit_portrait&&t>=1?u():o();thisSlide.parents("li").hasClass("image-loading")&&e(".image-loading").removeClass("image-loading");r.options.horizontal_center&&e(this).css("left",(n-e(this).width())/2);r.options.vertical_center&&e(this).css("top",(i-e(this).height())/2)});r.options.image_protect&&e("img",r.el).bind("contextmenu mousedown",function(){return!1});return!1})};r.nextSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0;clearInterval(vars.slideshow_interval);var t=r.options.slides,n=r.$el.find(".activeslide");e(".prevslide").removeClass("prevslide");n.removeClass("activeslide").addClass("prevslide");vars.current_slide+1==r.options.slides.length?vars.current_slide=0:vars.current_slide++;var i=e(r.el+" li:eq("+vars.current_slide+")"),s=r.$el.find(".prevslide");r.options.performance==1&&r.$el.removeClass("quality").addClass("speed");loadSlide=!1;vars.current_slide==r.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var o=r.el+" li:eq("+loadSlide+")";if(!e(o).html()){var u=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+r.options.slides[loadSlide].image+'"/>');a.appendTo(o).wrap("<a "+imageLink+u+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");a.load(function(){r._origDim(e(this));r.resizeNow()})}if(r.options.thumbnail_navigation==1){vars.current_slide-1<0?prevThumb=r.options.slides.length-1:prevThumb=vars.current_slide-1;e(vars.prev_thumb).html(e("<img/>").attr("src",r.options.slides[prevThumb].image));nextThumb=loadSlide;e(vars.next_thumb).html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("next");if(r.options.slide_links){e(".current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}i.css("visibility","hidden").addClass("activeslide");switch(r.options.transition){case 0:case"none":i.css("visibility","visible");vars.in_animation=!1;r.afterAnimation();break;case 1:case"fade":i.css({opacity:0,visibility:"visible"}).animate({opacity:1,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 2:case"slideTop":i.css({top:-r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 3:case"slideRight":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 4:case"slideBottom":i.css({top:r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 5:case"slideLeft":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 6:case"carouselRight":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.animate({left:-r.$el.width(),avoidTransforms:!1},r.options.transition_speed);break;case 7:case"carouselLeft":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.animate({left:r.$el.width(),avoidTransforms:!1},r.options.transition_speed)}return!1};r.prevSlide=function(){if(vars.in_animation||!api.options.slideshow)return!1;vars.in_animation=!0;clearInterval(vars.slideshow_interval);var t=r.options.slides,n=r.$el.find(".activeslide");e(".prevslide").removeClass("prevslide");n.removeClass("activeslide").addClass("prevslide");vars.current_slide==0?vars.current_slide=r.options.slides.length-1:vars.current_slide--;var i=e(r.el+" li:eq("+vars.current_slide+")"),s=r.$el.find(".prevslide");r.options.performance==1&&r.$el.removeClass("quality").addClass("speed");loadSlide=vars.current_slide;var o=r.el+" li:eq("+loadSlide+")";if(!e(o).html()){var u=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var a=e('<img src="'+r.options.slides[loadSlide].image+'"/>');a.appendTo(o).wrap("<a "+imageLink+u+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");a.load(function(){r._origDim(e(this));r.resizeNow()})}if(r.options.thumbnail_navigation==1){loadSlide==0?prevThumb=r.options.slides.length-1:prevThumb=loadSlide-1;e(vars.prev_thumb).html(e("<img/>").attr("src",r.options.slides[prevThumb].image));vars.current_slide==r.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;e(vars.next_thumb).html(e("<img/>").attr("src",r.options.slides[nextThumb].image))}typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"&&theme.beforeAnimation("prev");if(r.options.slide_links){e(".current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}i.css("visibility","hidden").addClass("activeslide");switch(r.options.transition){case 0:case"none":i.css("visibility","visible");vars.in_animation=!1;r.afterAnimation();break;case 1:case"fade":i.css({opacity:0,visibility:"visible"}).animate({opacity:1,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 2:case"slideTop":i.css({top:r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 3:case"slideRight":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 4:case"slideBottom":i.css({top:-r.$el.height(),visibility:"visible"}).animate({top:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 5:case"slideLeft":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});break;case 6:case"carouselRight":i.css({left:-r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.css({left:0}).animate({left:r.$el.width(),avoidTransforms:!1},r.options.transition_speed);break;case 7:case"carouselLeft":i.css({left:r.$el.width(),visibility:"visible"}).animate({left:0,avoidTransforms:!1},r.options.transition_speed,function(){r.afterAnimation()});n.css({left:0}).animate({left:-r.$el.width(),avoidTransforms:!1},r.options.transition_speed)}return!1};r.playToggle=function(){if(vars.in_animation||!api.options.slideshow)return!1;if(vars.is_paused){vars.is_paused=!1;typeof theme!="undefined"&&typeof theme.playToggle=="function"&&theme.playToggle("play");vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval)}else{vars.is_paused=!0;typeof theme!="undefined"&&typeof theme.playToggle=="function"&&theme.playToggle("pause");clearInterval(vars.slideshow_interval)}return!1};r.goTo=function(t){if(vars.in_animation||!api.options.slideshow)return!1;var n=r.options.slides.length;t<0?t=n:t>n&&(t=1);t=n-t+1;clearInterval(vars.slideshow_interval);typeof theme!="undefined"&&typeof theme.goTo=="function"&&theme.goTo();if(vars.current_slide==n-t){vars.is_paused||(vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval));return!1}if(n-t>vars.current_slide){vars.current_slide=n-t-1;vars.update_images="next";r._placeSlide(vars.update_images)}else if(n-t<vars.current_slide){vars.current_slide=n-t+1;vars.update_images="prev";r._placeSlide(vars.update_images)}if(r.options.slide_links){e(vars.slide_list+"> .current-slide").removeClass("current-slide");e(vars.slide_list+"> li").eq(n-t).addClass("current-slide")}if(r.options.thumb_links){e(vars.thumb_list+"> .current-thumb").removeClass("current-thumb");e(vars.thumb_list+"> li").eq(n-t).addClass("current-thumb")}};r._placeSlide=function(t){var n=r.options.new_window?' target="_blank"':"";loadSlide=!1;if(t=="next"){vars.current_slide==r.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var i=r.el+" li:eq("+loadSlide+")";if(!e(i).html()){var n=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+r.options.slides[loadSlide].image+'"/>');s.appendTo(i).wrap("<a "+imageLink+n+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");s.load(function(){r._origDim(e(this));r.resizeNow()})}r.nextSlide()}else if(t=="prev"){vars.current_slide-1<0?loadSlide=r.options.slides.length-1:loadSlide=vars.current_slide-1;var i=r.el+" li:eq("+loadSlide+")";if(!e(i).html()){var n=r.options.new_window?' target="_blank"':"";imageLink=r.options.slides[loadSlide].url?"href='"+r.options.slides[loadSlide].url+"'":"";var s=e('<img src="'+r.options.slides[loadSlide].image+'"/>');s.appendTo(i).wrap("<a "+imageLink+n+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");s.load(function(){r._origDim(e(this));r.resizeNow()})}r.prevSlide()}};r._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height())};r.afterAnimation=function(){r.options.performance==1&&r.$el.removeClass("speed").addClass("quality");if(vars.update_images){vars.current_slide-1<0?setPrev=r.options.slides.length-1:setPrev=vars.current_slide-1;vars.update_images=!1;e(".prevslide").removeClass("prevslide");e(r.el+" li:eq("+setPrev+")").addClass("prevslide")}vars.in_animation=!1;if(!vars.is_paused&&r.options.slideshow){vars.slideshow_interval=setInterval(r.nextSlide,r.options.slide_interval);r.options.stop_loop&&vars.current_slide==r.options.slides.length-1&&r.playToggle()}typeof theme!="undefined"&&typeof theme.afterAnimation=="function"&&theme.afterAnimation();return!1};r.getField=function(e){return r.options.slides[vars.current_slide][e]};r.init()};e.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",slide_list:"#slide-list",current_slide:0,in_animation:!1,is_paused:!1,hover_pause:!1,slideshow_interval:!1,update_images:!1,options:{}};e.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5e3,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0};e.fn.supersized=function(t){return this.each(function(){new e.supersized(t)})}})(jQuery);

/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1
	
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
	Slightly modified :0

*/
(function(a){theme={_init:function(){api.options.slide_links&&a(vars.slide_list).css("margin-left",-a(vars.slide_list).width()/2);api.options.autoplay?api.options.progress_bar&&theme.progressBar():(a(vars.play_button).attr("src")&&a(vars.play_button).attr("src",vars.image_path+"play.png"),api.options.progress_bar&&a(vars.progress_bar).stop().css({left:-a(window).width()}));a(vars.tray_button).toggle(function(){a(vars.thumb_tray).stop().animate({bottom:0,avoidTransforms:!0},300);a(vars.tray_arrow).attr("src")&&a(vars.tray_arrow).attr("src",vars.image_path+"button-tray-down.png");return!1},function(){a(vars.thumb_tray).stop().animate({bottom:-a(vars.thumb_tray).height(),avoidTransforms:!0},300);a(vars.tray_arrow).attr("src")&&a(vars.tray_arrow).attr("src",vars.image_path+"button-tray-up.png");return!1});a(vars.thumb_list).width(a("> li",vars.thumb_list).length*a("> li",vars.thumb_list).outerWidth(!0));a(vars.slide_total).length&&a(vars.slide_total).html(api.options.slides.length);api.options.thumb_links&&(a(vars.thumb_list).width()<=a(vars.thumb_tray).width()&&a(vars.thumb_back+","+vars.thumb_forward).fadeOut(0),vars.thumb_interval=Math.floor(a(vars.thumb_tray).width()/a("> li",vars.thumb_list).outerWidth(!0))*a("> li",vars.thumb_list).outerWidth(!0),vars.thumb_page=0,a(vars.thumb_forward).click(function(){vars.thumb_page-vars.thumb_interval<=-a(vars.thumb_list).width()?vars.thumb_page=0:vars.thumb_page-=vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}),a(vars.thumb_back).click(function(){0<vars.thumb_page+vars.thumb_interval?(vars.thumb_page=Math.floor(a(vars.thumb_list).width()/vars.thumb_interval)*-vars.thumb_interval,a(vars.thumb_list).width()<=-vars.thumb_page&&(vars.thumb_page+=vars.thumb_interval)):vars.thumb_page+=vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}));a(vars.next_slide).click(function(){api.nextSlide()});a(vars.prev_slide).click(function(){api.prevSlide()});jQuery.support.opacity&&a(vars.prev_slide+","+vars.next_slide).mouseover(function(){a(this).stop().animate({opacity:1},100)}).mouseout(function(){a(this).stop().animate({opacity:0.6},100)});api.options.thumbnail_navigation&&(a(vars.next_thumb).click(function(){api.nextSlide()}),a(vars.prev_thumb).click(function(){api.prevSlide()}));a(vars.play_button).click(function(){api.playToggle()});api.options.mouse_scrub&&a(vars.thumb_tray).mousemove(function(b){var d=a(vars.thumb_tray).width(),e=a(vars.thumb_list).width();if(e>d){var c=b.pageX-1;if(10<c||-10>c)newX=b.pageX/d*(d-e),c=parseInt(Math.abs(parseInt(a(vars.thumb_list).css("left"))-newX)).toFixed(0),a(vars.thumb_list).stop().animate({left:newX},{duration:3*c,easing:"easeOutExpo"})}});a(window).resize(function(){api.options.progress_bar&&!vars.in_animation&&(vars.slideshow_interval&&clearInterval(vars.slideshow_interval),0<api.options.slides.length-1&&clearInterval(vars.slideshow_interval),a(vars.progress_bar).stop().css({left:-a(window).width()}),!vars.progressDelay&&api.options.slideshow&&(vars.progressDelay=setTimeout(function(){vars.is_paused||(theme.progressBar(),vars.slideshow_interval=setInterval(api.nextSlide,api.options.slide_interval));vars.progressDelay=!1},1E3)));api.options.thumb_links&&vars.thumb_tray.length&&(vars.thumb_page=0,vars.thumb_interval=Math.floor(a(vars.thumb_tray).width()/a("> li",vars.thumb_list).outerWidth(!0))*a("> li",vars.thumb_list).outerWidth(!0),a(vars.thumb_list).width()>a(vars.thumb_tray).width()?(a(vars.thumb_back+","+vars.thumb_forward).fadeIn("fast"),a(vars.thumb_list).stop().animate({left:0},200)):a(vars.thumb_back+","+vars.thumb_forward).fadeOut("fast"))})},goTo:function(){api.options.progress_bar&&!vars.is_paused&&(a(vars.progress_bar).stop().css({left:-a(window).width()}),theme.progressBar())},playToggle:function(b){"play"==b?(a(vars.play_button).attr("src")&&a(vars.play_button).attr("src",vars.image_path+"pause.png"),api.options.progress_bar&&!vars.is_paused&&theme.progressBar()):"pause"==b&&(a(vars.play_button).attr("src")&&a(vars.play_button).attr("src",vars.image_path+"play.png"),api.options.progress_bar&&vars.is_paused&&a(vars.progress_bar).stop().css({left:-a(window).width()}))},beforeAnimation:function(b){api.options.progress_bar&&!vars.is_paused&&a(vars.progress_bar).stop().css({left:-a(window).width()});a(vars.slide_caption).length&&(api.getField("title")?a(vars.slide_caption).html(api.getField("title")):a(vars.slide_caption).html(""));vars.slide_current.length&&a(vars.slide_current).html(vars.current_slide+1);if(api.options.thumb_links&&(a(".current-thumb").removeClass("current-thumb"),a("li",vars.thumb_list).eq(vars.current_slide).addClass("current-thumb"),a(vars.thumb_list).width()>a(vars.thumb_tray).width()))if("next"==b)0==vars.current_slide?(vars.thumb_page=0,a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})):a(".current-thumb").offset().left-a(vars.thumb_tray).offset().left>=vars.thumb_interval&&(vars.thumb_page-=vars.thumb_interval,a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"}));else if("prev"==b)if(vars.current_slide==api.options.slides.length-1)vars.thumb_page=Math.floor(a(vars.thumb_list).width()/vars.thumb_interval)*-vars.thumb_interval,a(vars.thumb_list).width()<=-vars.thumb_page&&(vars.thumb_page+=vars.thumb_interval),a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"});else if(0>a(".current-thumb").offset().left-a(vars.thumb_tray).offset().left){if(0<vars.thumb_page+vars.thumb_interval)return!1;vars.thumb_page+=vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}},afterAnimation:function(){api.options.progress_bar&&!vars.is_paused&&theme.progressBar()},progressBar:function(){a(vars.progress_bar).stop().css({left:-a(window).width()}).animate({left:0},api.options.slide_interval)}};a.supersized.themeVars={progress_delay:!1,thumb_page:!1,thumb_interval:!1,image_path:"img/",play_button:"#pauseplay",next_slide:"#nextslide",prev_slide:"#prevslide",next_thumb:"#nextthumb",prev_thumb:"#prevthumb",slide_caption:"#slidecaption",slide_current:".slidenumber",slide_total:".totalslides",slide_list:"#slide-list",thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",thumb_forward:"#thumb-forward",thumb_back:"#thumb-back",tray_arrow:"#tray-arrow",tray_button:"#tray-button",progress_bar:"#progress-bar"};a.supersized.themeOptions={progress_bar:0,mouse_scrub:0}})(jQuery);

/*
    json2.js
    2014-02-04
*/
if(typeof JSON!=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf();};}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);;
/*!
 * jQuery ezPopup plugin - v0.1 - 10/06/2014
 * http://nathanroyal.com
 * Copyright (c) 2013 Nathan Johnson
 * licensed under the Creative Commons Attribution-ShareAlike license.
 * 
 * Options:
 * zIndex: z-index of overlay. Default is 1000.
 * background: Set the style of the overlay mask. Default uses 50% opaque white png.
 * keepEvents: When the target element is cloned into the overlay, keep events and data that are attached to it. Default is false.
 * recursiveKeepEvents: When the target element is cloned into the overlay, keep events and data that are attached to it - and it's children. Default is false.
 * moveTarget: Moves the targeted element into the overlay container instead of cloning it. Overrides keepEvents and recursiveKeepEvents. Default is false.
 * 
**/


(function( $ ){
	$.fn.ezPopup = function( naj ) {

		var $target,
			bodyOverflow, 
			outer = $('<div />').addClass("pop-up-outer"), 
			inner = $('<div />').addClass("pop-up-inner"),
			opt = $.extend({ 
				background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAAAXRSTlOArV5bRgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=')",
				zIndex: 1000,
				moveTarget: false,
				keepEvents: false,
				addCloseBtn: true,
				recursiveKeepEvents: false,
				onOpen: function(){return;},
				onClose: function(){return;}
			}, naj || {});
		
		function setup(){
			outer.click(hxde)
					.css({
							"top": 0,
							"left": 0,
							"width": "100%",
							"height": "100%",
							"position": "fixed",
							"display": "none",
							"overflow": "auto",
							"-webkit-transform": "translateZ(0)",	//Fuck you Chrome. Fuck you.
							"z-index": opt.zIndex,
							"background": opt.background
						})
					.appendTo("body");
			
			inner.click(function(e){ e.stopPropagation() })
					.on("click", ".close-popup", function(e){e.preventDefault(); hxde();})
					.css({"text-align": "left", "position": "relative"})
					.appendTo(outer)
					.wrap("<div style='display: table; height: 100%; width: 100%'><div style='display: table-cell; height: 100%; text-align: center; vertical-align: middle; width: 100%;'></div></div>");
			
			if(opt.addCloseBtn){
				inner.append('<a class="close-popup" href="#" style="position: absolute; top: 5px; right: 7px; width: 30px; height: 30px; line-height: 30px; text-align: center; font-family: Arial,monospace; font-size: 28px; color: #333333; text-decoration: none;">×</a>');
			}
		};
		function shxw(target){
			bodyOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			window.getComputedStyle(document.body).overflow;
			
			var clone;
			$target = target.data("target-parent", target.parent());
			
			if(opt.moveTarget){
				$target.appendTo(inner);
				clone = $target;
			}else{
				clone = $target.clone(opt.keepEvents, opt.recursiveKeepEvents);
				clone.appendTo(inner);
			}
			outer.fadeIn(function(){
				opt.onOpen(clone);
			});
		};
		function hxde(){
			document.body.style.overflow = bodyOverflow;
			
			outer.fadeOut(function(){
				if(opt.moveTarget)
					$target.appendTo($target.data("target-parent"));
				else
					inner.empty();
				
				opt.onClose($target);
				$target = null;
			})
		};
		setup();

		return this.each(function(i, btn){
			var $btn = $(btn), 
				target = $($btn.data("popup-target"));
			
			$btn.click(function(e){
				e.preventDefault();
				if(target.length) shxw(target);
				return false;
			});
		});

	};
})( jQuery );;
(function (window, document, $){
	//"use strict";

	window.browserIs = (function(b, d, ua){
			d.setAttribute('data-useragent',  ua);					// To use in css:
			d.setAttribute('data-platform', navigator.platform);	// html[data-useragent*='Chrome/13.0'][data-platform='Win32'] //hits chrome12 on windows
			b.IE = (/msie/i.test(ua) && parseFloat)? parseFloat(navigator.appVersion.split("MSIE")[1]) : -1;
			b.Webkit = (b.IE==-1 && (/Chrome/.test(ua) || /Safari/.test(ua)));
			b.Opera = (b.IE==-1 && !b.Webkit && /opera/i.test(ua));
			b.IOS = ua.match(/(iPad|iPhone|iPod)/i) || false;
			b.Mobile = ((" " + document.documentElement.className + " ").replace(/[\n\t]/g, " ").indexOf("mobile-browser") > -1);
			b.mediaQueries = (typeof window.Modernizr == "undefined")? 0 : (Modernizr.mq('only all'))? 1 : -1;
			b.touch = 'ontouchstart' in document.body;
			b.prefix = (function(styles){
				if(styles.length){var pre = ( Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']) )[1],
					dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
				return { dom: dom, lowercase: pre, css: '-' + pre + '-', js: pre[0].toUpperCase() + pre.substr(1) };
				}else{
					return { dom: 'MS', lowercase: 'ms', css: '-ms-', js: 'Ms' };
				}
			})( window.getComputedStyle? window.getComputedStyle(document.documentElement) : [] );
			return b;
		})({}, document.documentElement, navigator.userAgent);


	window.Util = {

		log: (function(){	// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
			window.log = function(){	// usage: log('inside coolFunc', this, arguments);
				log.history = log.history || []; // store logs to an array for reference
				log.history.push(arguments);
				arguments.callee = arguments.callee.caller;
				if(this.console) console.log( Array.prototype.slice.call(arguments) );
			};
			// make it safe to use console.log always
			(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});
		})(),

        polyfills: (function(){
            Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(d){if(null==this)throw new TypeError;var c=Object(this),b=c.length>>>0;if(0===b)return-1;var a=b;1<arguments.length&&(a=Number(arguments[1]),a!=a?a=0:0!=a&&(a!=1/0&&a!=-(1/0))&&(a=(0<a||-1)*Math.floor(Math.abs(a))));for(b=0<=a?Math.min(a,b-1):b-Math.abs(a);0<=b;b--)if(b in c&&c[b]===d)return b;return-1});
            "function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){return this.slice(0,a.length)==a});
            "function"!==typeof String.prototype.endsWith&&(String.prototype.endsWith=function(a){return-1!==this.indexOf(a,this.length-a.length)});
            "function"!=typeof Object.create&&function(){var b=function(){};Object.create=function(a){if(1<arguments.length)throw Error("Second argument not supported");if(null===a)throw Error("Cannot set a null [[Prototype]]");if("object"!=typeof a)throw TypeError("Argument must be an object");b.prototype=a;return new b}}();
            Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,f=!{toString:null}.propertyIsEnumerable("toString"),c="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),g=c.length;return function(b){if("object"!==typeof b&&("function"!==typeof b||null===b))throw new TypeError("Object.keys called on non-object");var d=[],a;for(a in b)e.call(b,a)&&d.push(a);if(f)for(a=0;a<g;a++)e.call(b,c[a])&&d.push(c[a]);return d}}());
        })(),
		
		getQueryVars: function(q, decode) {
			var query = q || window.location.search.substring(1),
				hash,
				vars = {},
				hashes = query.split('&');
			for(var i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
				vars[hash[0]] = decode? decodeURI(hash[1]) : hash[1];
			}
			return vars;
		},
		
		preventEvent: function(e, stopImmediate){
			e.preventDefault(); e.stopPropagation();
			stopImmediate && e.stopImmediatePropagation();
			return e;
		},
		
		areFontsLoaded: function(){
			if(typeof Util.areFontsLoaded.fontchecks == "undefined"){
				Util.areFontsLoaded.fontchecks = {
					"typekit": function(){return $(document.documentElement).hasClass('wf-active')}
				}
			}
			var check = Util.areFontsLoaded.fontchecks;
			return Site.flags.fonts = (Site.webFonts && check[Site.webFonts])? check[Site.webFonts]() : true;
		},
		
		contentFetchr: function(uri, selektr, callback, errorCallback, wrap, d){
			callback && $.ajax({
				url: uri,
				dataType: 'html',
				type: 'GET',
				data: d? d : {ajax_req: 1},
				success: function(response){
					if(typeof selektr === "string"){
						var r = (wrap)? $('<html />').html(response) : $(response);
						callback(r.find(selektr) || []);
					}else if(selektr){
						callback(response);
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					window.console && console.warn('ajax error: ' + errorThrown);
					errorCallback && errorCallback(jqXHR, textStatus, errorThrown);
				}
			});
		},

		stripTrailers: function(uri){ return uri.replace(/(\?|#).*/, '');  },
		stripFileExt: function(uri){ return uri.substr(0, uri.lastIndexOf('.')) || uri; },
		
		convertObjectToArray: function(o, a){
				if(o instanceof Array) return o;
				var a = a || [];
				for(u in o) a.push(o[u]);
				return a;
			},

		loadScript: function(src, callback){
			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.async = true;
			if(typeof callback == "function")
				script.onload = callback;
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
		},
					
		stretchedBack: function(target, img, opt){
			var $target = target.jquery? target : $(target),
				$img = typeof(img)=="string"? img : (img.jquery? img.attr("src") : img.src),
				options = $.extend({
					fade: 600,
					zindex: -1,
					preload: false,
					useCssTwo: false,
					attachment: "scroll",
					callback: function(){return;}
				}, opt || {}),
				gotBack = function(){
					if(!options.useCssTwo && 'backgroundSize' in document.documentElement.style){
						if(!/absolute|fixed|relative/.test($target.attr("position"))) $target.css("position", "relative");	
						
						if($target.css("z-index")==="auto" || $target.css("z-index")=="0") $target.css("z-index", 0);	
						var style = {
                            opacity: 0,
                            "position" : "absolute",
                            "top" : 0, "left" : 0, "right" : 0, "bottom" : 0,
                            "background-image" : "url("+$img+")",
                            "background-size" : "cover",
                            "background-position":"50% 50%",
                            "background-attachment": options.attachment,
                            "z-index": options.zindex
                        };

                        style[browserIs.prefix.css+"transform-style"] = "preserve-3d";
                        style[browserIs.prefix.css+"backface-visibility"] = "hidden";       // Safari bug fixes

                        $target.prepend(
							$("<div/>").css(style).fadeTo(options.fade, 1, options.callback)
						);
					}else{
						if(Site.checkMissingImages($img)) $target.backstretch($img, {fade: options.fade}).on("backstretch.after", options.callback);
						else options.callback();
					}
				};
			if(options.preload) $('<img />').one('load', gotBack)[0].src = $img;
			else gotBack();
		},

        simpleCookie: (function(window, document, undefined){
            var simpleCookie = window.simpleCookie = {
                check: function(){
                    return navigator.cookieEnabled;
                },

                set: function(name, value, expires, path, domain, secure){
                    var today = new Date();
                    today.setTime( today.getTime() );

                    if ( expires ){
                        expires = expires * 1000 * 60 * 60 * 24;
                    }
                    var expires_date = new Date( today.getTime() + (expires) );

                    document.cookie = name + "=" +escape( value ) +
                        ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
                        ( ( path ) ? ";path=" + path : "" ) +
                        ( ( domain ) ? ";domain=" + domain : "" ) +
                        ( ( secure ) ? ";secure" : "" );
                },

                get: function(c_name){
                    if (document.cookie.length > 0) {
                        var i,x,y,ARRcookies=document.cookie.split(";");
                        for (i=0;i<ARRcookies.length;i++){
                            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                            x=x.replace(/^\s+|\s+$/g,"");
                            if (x==c_name){
                                return unescape(y);
                            }
                        }
                    }else{
                        return null;
                    }
                }
            }
        })(window, document),

		gMap: {
				setLoc: function(mapId, title, lat, longd, opt){
					var map = document.getElementById(mapId),
						mapData = new Object;
					mapData.map = map;
					mapData.locTitle = title;
					mapData.locLatitude = lat;
					mapData.locLongditude = longd;
					mapData.opt = opt || {};
					return mapData;
				},
				buildLoc: function(map, opt){
					var mapData = new Object;
					mapData.map = map[0];
					mapData.locTitle = map.data("location-title");
					mapData.locLatitude = map.data("location-latitude");
					mapData.locLongditude = map.data("location-longditude");
					mapData.opt = opt || {};
					return mapData;
				},
				initMap: function(mapData){
					var t,
						jolie = function(){ return (typeof google === 'object' && typeof google.maps === 'object'); },
						render = function(){
							var mapCenter = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),
								mapOptions = {
									center: mapCenter,
									zoom: mapData.opt.zoom || 15,
									scrollwheel: mapData.opt.scrollwheel || false,
									zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
									mapTypeId: google.maps.MapTypeId.ROADMAP,
									styles: mapData.opt.mapStyle || null
								},
								map = new google.maps.Map(mapData.map, mapOptions),
								markerPos = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),
								marker = new google.maps.Marker({
									position: markerPos,
									map: map,
									icon: mapData.opt.icon || null,
									title: mapData.locTitle
								});
							if(mapData.opt.mapOffset) map.panBy(mapData.opt.mapOffset.x,mapData.opt.mapOffset.y);
						};

					if(jolie()){
						render();
					}else{
						window.gMapInit = function(){ render(); };
						Util.loadScript("http://maps.google.com/maps/api/js?sensor=false&callback=gMapInit");
					}
				}
			}

	};


})(this, document, jQuery);
;
(function (window, document, $){
	//"use strict";

	window.Pages = {

        "*": {
			initialize: function(){
				_RFLload = true;
				
				Site.$header = $('#main-header')
					.data("transition-name", "slide-up")
					.on("activxte", function(e, _hide){Site.flags.ignoreScroll = false; _hide || Site.$header.removeClass(Site.$header.data("transition-name"));})
					.on("de-activxte", function(e, _show){Site.flags.ignoreScroll = true; _show || Site.$header.addClass(Site.$header.data("transition-name"));});
				Site.brandNav = $(".brand-nav", Site.$header);
				Site.hotelNav = $("#main-nav");
				
				Site.mapStyle = [
									{
										"featureType": "all",
										"elementType": "labels.text.fill",
										"stylers": [
											{ "color": "#7b7b7b" }
										]
									},
									{
										"featureType": "landscape.man_made",
										"elementType": "geometry.fill",
										"stylers": [
											{ "color": "#dfe3e1" }
										]
									},
									{
										"featureType": "landscape.man_made",
										"elementType": "geometry.stroke",
										"stylers": [
											{ "color": "#685264" }
										]
									},
									{
										"featureType": "landscape.natural",
										"elementType": "geometry.fill",
										"stylers": [
											{ "color": "#f6f7f6" }
										]
									},
									{
										"featureType": "road",
										"elementType": "geometry.fill",
										"stylers": [
											{ "color": "#ffffff" }
										]
									},
									{
										"featureType": "road",
										"elementType": "geometry.stroke",
										"stylers": [
											{ "color": "#ced1d0" }
										]
									},
									{
										"featureType": "water",
										"elementType": "geometry.fill",
										"stylers": [
											{ "color": "#6fb5ea" }
										]
									},
									{
										"featureType": "poi.park",
										"elementType": "geometry.fill",
										"stylers": [
											{ "color": "#afa3c2" }
										]
									}
								];
				
				Site.scrlMonitr = new function(){
					var mon = this;
					mon.callbacks = {};
					mon.prvPosition = 0;
					mon.position = Site.$win.scrollTop();

					mon.getDirection = function(){
						return mon.position>mon.prvPosition? "down" : "up";
					};

					mon.scrolledPast = function(el, pos){
						return !!((typeof(pos)=="number"? pos : mon.position) > el.offset().top); 
					};

					mon.scrolledTo = function(el, pos){
						pos = typeof(pos)=="number"? pos : mon.position; 
						return !!(pos > el.offset().top && pos < el.offset().top+el.height()); 
					};

					mon.scrollTo = function (el, s, o, hideNav) {
						var sp = s || 400, _o = (typeof(o)=="number")? o : 0;
						hideNav&&(Site.flags.ignoreScroll = true);
						$('html, body').animate({ scrollTop: ( (typeof(el)=="number"? el : el.offset().top) +_o) }, sp, "easeOutSine", function(){ hideNav&&setTimeout(function(){Site.flags.ignoreScroll=false;}, 100) });
					};

					mon.freshen = function(flag){
						for(k in mon.callbacks){
							if(k==flag || k.startsWith(flag+".")){ 
								try { delete mon.callbacks[k]; } catch(e) { mon.callbacks[k]=undefined; }
							}
						}
					};

					Site.$win.bind("scroll", function(e, f){
						mon.prvPosition = mon.position;
						mon.position = Site.$win.scrollTop();
						for(ci in mon.callbacks)
							mon.callbacks[ci](e, mon.prvPosition, mon.position, mon.getDirection(), (f||null));
					});
				};

				Site.windowSizeMonitr = new function(){
					var mon = this;
					mon.callbacks = {};
					mon.prvWidth = Site.$win.width();
					mon.prvHeight = Site.$win.height();
					mon.width = mon.prvWidth;
					mon.height = mon.prvHeight;
					mon.headerHeight = Site.$header.height();
					mon.freshen = function(flag){
						for(k in mon.callbacks){
							if(k==flag || k.startsWith(flag+".")){ 
								try { delete mon.callbacks[k]; } catch(e) { mon.callbacks[k]=undefined; }
							}
						}
					};

					Site.$win.resize(function(e){
						mon.prvWidth = mon.width;
						mon.prvHeight = mon.height;
						mon.width = Site.$win.width();
						mon.height = Site.$win.height();
						mon.headerHeight = Site.$header.height();

						for(ci in mon.callbacks)
							mon.callbacks[ci](e, mon.prvWidth, mon.prvHeight, mon.width, mon.height);
					});
				};

				Site.scrollingMenu = function($menu){
					Site.scrollingMenu.scrld = -1;
					Site.$mainFooterBar.find(".scroll-menu").remove();
					var $scrollingMenu = $menu || $('<div class="scroll-menu menu" />').appendTo(Site.$mainFooterBar),
						menuScrollers = $(".menu-scroll"), i, s; 

					Site.scrlMonitr.callbacks["tmp.scrollingMenus"] = function(event, prvPosition, newPosition, direction){
						for(s=false,i=0; i<menuScrollers.length; i++){
							if(Site.scrlMonitr.scrolledTo(menuScrollers.eq(i), newPosition)){
								s=true;
								if(i!==Site.scrollingMenu.scrld){
									$(".active", $scrollingMenu).removeClass("active");
									$('a[data-scrllTo="'+i+'"]', $scrollingMenu).addClass("active");
									Site.scrollingMenu.scrld = i;
								}
								break;
							}
						}
						if(!s){
							Site.scrollingMenu.scrld>=0 && $(".active", $scrollingMenu).removeClass("active");
							Site.scrollingMenu.scrld = -1;
						}
					};

					menuScrollers.each(function(i, n){
						var $n = $(n), 
							scrld = Site.scrlMonitr.scrolledTo($n),
							link = $('<a href="#" data-scrllTo="'+i+'"></a>')
								.html('<span>'+$(n).data("scrollmenu-link-text")+'</span>')
								.click(function(e){
									Util.preventEvent(e);
									Site.scrlMonitr.scrollTo($(n), 700, 1);
								})
								.css({opacity: 0})
								.appendTo($scrollingMenu)
								.delay((i+1)*400)
								.fadeTo(800, 1);
						i==0&&link.addClass("active");
					});

				};

				Site.footerTabs = function(){
                    $(".footer-tab-module", Site.$mainFooterBar).each(function(i, mod){
						var $mod = $(mod),
                            hovering = false,
                            ac = "active",
                            labels = $(".footer-tab-labels li", mod),
                            tabWrapper = $(".footer-tabs", mod).hide(),
                            tabs = $(".footer-tab", tabWrapper),
                            getActive = function(){
                                return labels.index($(".footer-tab-labels ."+ac, mod))
                            },
                            mouseOverFn = function(){
                                hovering = true;
                                tabWrapper.stop(true).slideDown();
                            },
                            mouseOutFn = function(){
                                hovering = false;
                                tabWrapper.stop(true, true).slideUp();
                            };
                        tabs.eq(getActive()).addClass(ac);

                        labels.click(function(e){
                                e.preventDefault(); e.stopPropagation();
                                if(!$(this).hasClass(ac)){
                                    labels.add(tabs).removeClass(ac) && $(this).add(tabs.eq(labels.index(this))).addClass(ac);
                                }
                            });

						$mod.hover( mouseOverFn, mouseOutFn )
                            .on( "touchstart", mouseOverFn)
                            .on( "touchend", mouseOutFn )
                            .slideDown("slow");
					});

				};

				Site.ezImgSlide = function (index, ez, opt){
					var $ez = $(ez), 
						$slides = $(".slides li", ez), 
						$slideNav = $('<ul class="clearfix"></ul>').appendTo($ez).wrap('<div class="slideNav" />'),
						responds = !$ez.hasClass("no-respond");
					opt = opt || {speed: 600};

					$ez.ezSlidr({
						speed: opt.speed,
						stepSize: 1,
						respond: responds,
						eeze: "easeInOutCirc", 
						windowClass: "slider-window",
						//buttonClick: function(slider, btn){ },
						before: function(container, prev, next){ 
							if(typeof(opt.befo)=="function") opt.befo(container, prev, next);
						},
						after: function(container, prev, next, pid, nid){
							$("li",$slideNav).removeClass("active").eq(nid).addClass("active");
							if(typeof(opt.afer)=="function") opt.afer(container, prev, next);
						}
					});

					$slides.each(function(slideIndex, n){
						 $slideNav.append( $('<li class="'+(slideIndex?"":"active")+'"/>').click(function(){ $ez.trigger("ezSlidr", slideIndex) }) );
					});
				};

				Site.updateNav = function(){
					var header_links = $('header .header-links').empty()
					var new_links = $(".hidden-region .header-links", Site.contentBody);
					if (new_links.length)
						header_links.html(new_links.html());

					if($(".hidden-region .main-nav", Site.contentBody).length){
						Site.brandNav.add(Site.hotelNav).empty();
						Site.hotelNav.html($(".hidden-region .main-nav", Site.contentBody).html());
						$(".menu", Site.hotelNav).slicknav({prependTo: $(".menu-col", Site.$header), closeOnClick: true});
					}

					if($(".hidden-region .brand-nav", Site.contentBody).length){
						Site.hotelNav.add(Site.brandNav).empty();
						Site.brandNav.html($(".hidden-region .brand-nav", Site.contentBody).html());
						$(".menu", Site.brandNav).slicknav({prependTo: $(".menu", Site.brandNav).parent(), closeOnClick: true});
					}
				};

				Site.scrlMonitr.callbacks["headerScroll"] = function(event, prvPosition, newPosition, direction, ignore){
					if(!Site.flags.ignoreScroll && !ignore){
						if (newPosition > 100) Site.$header.addClass('collapsed');
						else Site.$header.removeClass('collapsed');

						if (newPosition<300 || direction=="up") {
							Site.$header.removeClass(Site.$header.data("transition-name")); 
						}else{
							Site.$header.addClass(Site.$header.data("transition-name"));
						}
					}
				};
				
				$(".fakeDrop", Site.$header).fakeDrop({eezeDown: "easeOutExpo"});
			},

			setup: function(){
			
				if(Site.contentBody.hasClass("group-level-page")){
					Site.$body.addClass("group-level-page");
				}else{
					Site.$body.removeClass("group-level-page");
				}
				Site.$mainFooterBar = $('.main-footer-bar', Site.contentBody);
				
				if(!_RFLload) Pages["*"].initialize();
				
				function heroModules(){
					function heroModule(i, n, s){
						var mod = this, 
							setBgFirst = s||false;
						mod.i = i; 
						mod.n = n;
						mod.unwrap = function(){
                            if($(mod.n).data("first-hero")){
                                $(".hero-module-head", mod.n).css({opacity: 1}).addClass("notransition");
                            }
                            Site.flags.pageReady = true;
                            //$(mod.n).parent(".rfl-load").length && $(mod.n).unwrap();
						};
						//$(mod.n).wrap('<div class="rfl-load" />');
						mod.init(setBgFirst);
					};
					heroModule.prototype = {
						init: function(setBgFirst){
							var mod = this;
							mod.$hero = $(mod.n);
							mod.$head = $(".hero-module-head", mod.n);
							mod.$heroheader = $(".hero-module-header", mod.n); 
							mod.$content = $(".hero-module-content-section", mod.n);
							mod.anim = 1200;
							mod.$bgImg = $(".background-img", mod.n);

							mod.$head.height(Site.windowSizeMonitr.height);

							Site.windowSizeMonitr.callbacks["tmp.heroes-"+mod.i] = function(event, prvWidth, prvHeight, width, height){
								mod.$head.height(height);
							};

							Site.onWinLoad(function(){ 
								if(setBgFirst) mod.setBg();
								else mod.setBgScroll() ;
							});
						},
						setBgScroll: function(){
							var mod = this;
							if(mod.$bgImg.length){
								mod.$head.each(function(i, n){
									
									function waitToInit(event, prvPosition, newPosition, direction){
										if(Site.scrlMonitr.scrolledPast(mod.$hero, newPosition+(Site.windowSizeMonitr.height*1.5))){
											if(direction) Site.scrlMonitr.freshen("tmp.scrollingHeroes."+mod.i+"."+i);
											Util.stretchedBack(
												$(n), 
												$(".background-img", n).attr("data-imgsrc") || $(".background-img", n).attr("src"), 
												{
													preload: true,
													fade: $(mod.n).data("first-hero")? 0 : mod.anim,
													callback: function () {
                                                        mod.unwrap();
														mod.$hero.addClass("ready");
													}
												}
											);
											return false;
										}else{
											return true;
										}
									};

									if(waitToInit(false, true, Site.scrlMonitr.position)) 
										Site.scrlMonitr.callbacks["tmp.scrollingHeroes."+mod.i+"."+i] = waitToInit;
									
								});
							}else{
								mod.unwrap();
								mod.$hero.addClass("ready");
							}
						},
						setBg: function(){
							var mod = this;
							if(mod.$bgImg.length){
								mod.$head.each(function(i, n){
									Util.stretchedBack(
										$(n), 
										$(".background-img", n).attr("data-imgsrc") || $(".background-img", n).attr("src"), 
										{
											preload: true,
											fade: $(mod.n).data("first-hero")? 0 : mod.anim,
											callback: function () {
												mod.unwrap();
												mod.$hero.addClass("ready");
											}
										}
									);
								});
							}else{
								mod.unwrap();
								mod.$hero.addClass("ready");
							}
						}
					};
					
					function suitesLandingHero(i, n){
						var mod = this;
						mod.setBg = function(){
							var tabLabels = $(".hero-tab-labels li", n),
								tabContents = $(".hero-tabs .hero-tab", n),
								currentTabIndex = tabLabels.filter(".active").length? tabLabels.index(tabLabels.filter(".active")) : 0;
							
							$(".lazy-img", mod.n).lazyImage({identifier: "lazy-img"}, function(){
								var initialBg = tabContents.length? $(".background-img", tabContents.eq(currentTabIndex)) : $(".background-img", mod.n).eq(0);
								
								function switchTab(newTabIndex){
									if(newTabIndex!==currentTabIndex){
										tabLabels.removeClass("active").eq(newTabIndex).addClass("active");
										if(Site.checkMissingImages($(".background-img", tabContents.eq(newTabIndex)).attr("src")))
											$(mod.n).backstretch($(".background-img", tabContents.eq(newTabIndex)).attr("src"), {fade: 1200});
										if(Site.flags.transformer){
											tabContents.filter(".active").removeClass("active");
											tabContents.eq(newTabIndex).addClass("active");
										}else{
											tabContents.filter(".active").removeClass("active").stop(true).fadeOut(300, function(){
													tabContents.eq(newTabIndex).addClass("active").stop(true).fadeIn(400);
												});
										}
										currentTabIndex = newTabIndex;
									}
								};

								if(tabContents.length){
									tabLabels.each(function(i, n){
										$(n).on("click", function(e){ switchTab(i) });
									});
									tabContents.eq(currentTabIndex).addClass("active");
									Site.flags.transformer || tabContents.not(":eq("+currentTabIndex+")").hide();
								}
								
								mod.unwrap();
								
								if(Site.checkMissingImages(initialBg)){
									$(mod.n).backstretch(initialBg.attr("src"), {fade: 1200});
								}
								mod.$hero.addClass("ready");
							});
						};

						heroModule.call(mod, i, n, true);
					};
					suitesLandingHero.prototype = Object.create(heroModule.prototype);
					
					function groupHomeLandingHero(i, n){
						var mod = this;

						function setUpDestinationSelector(){
							var $ds = $(".destinationSelector", n),
								$slides = $(".hero-slide", $ds),
                                allHotelsBtn = $(".landing-slide .hotels-btn", $ds).click(function(e){
                                    Util.preventEvent(e); slideTo('hero-slide[data-destination-id="all"]');
                                }),
                                destinationsBtn = $(".landing-slide .destinations-btn", $ds).click(function(e){
                                    Util.preventEvent(e); slideTo("destinations-slide");
                                }),
                                destinationsBackBtn = $('.destinations-slide, .hotels-slide[data-destination-id="all"]', $ds).find('.hero-button').click(function(e){
                                    Util.preventEvent(e); slideTo("landing-slide");
                                }),
                                hotelsBackBtns = $(".hotels-slide", $ds).not('[data-destination-id="all"]').find('.hero-button').click(function(e){
                                    Util.preventEvent(e); slideTo("destinations-slide");
                                }),
                                hotelBtns = $(".destinations-list a[data-destination-id]", $slides).click(function(e){
                                    Util.preventEvent(e); slideTo('hero-slide[data-destination-id="'+$(this).data("destination-id")+'"]');
                                }),
								animating = false;

							function slideTo(target){
								if(!animating){
									animating = true;
									$slides.filter(".active").removeClass("active");
									$slides.filter("."+target).addClass("active");
									animating = false;
								}
							};
						};

						mod.setBg= function(){
							
								mod.unwrap();
								mod.$hero.addClass("ready");
								setUpDestinationSelector();
								
							
						};

						heroModule.call(mod, i, n, true);
					};
					groupHomeLandingHero.prototype = Object.create(heroModule.prototype);
					
					function heroSliderModule(i, n){
						var mod = this;
						mod.i = i; 
						mod.n = n;
						mod.init = function(i, n){
							var headOffset = 155;
							mod.$hero = $(mod.n);
							mod.$head = $(".hero-module-head", mod.n);
							mod.anim = 800;

							if(Site.belowThresh("mobile")){
								mod.setMobile();
							}else{
								mod.$head.height(Site.windowSizeMonitr.height - headOffset);
								
								Site.windowSizeMonitr.callbacks["tmp.heroes-"+mod.i] = function(event, prvWidth, prvHeight, width, height){
									mod.$head.height(height-headOffset);
								};

								Site.onWinLoad(mod.setBg);
							}
						};
						mod.setBg = function(){  
							var slider = $(".ezSlidr", n),
								slidez = $(".slides .lazy-img", slider),
								imgRatio = 1,
								updateHeadings = function(slide){
									$(".hero-module-header .slide-heading", mod.$head).fadeTo(600, 0, function(){
										$(this).text(slide.data("slide-heading")).fadeTo(800, 1);
									});
									$(".hero-module-header .slide-sub-heading", mod.$head).fadeTo(600, 0, function(){
										$(this).text(slide.data("slide-subheading")).fadeTo(800, 1);
									});
									$(".hero-module-header .a-button", mod.$head).attr("href", slide.data("slide-link"));
								};

							slidez.lazyImage({
								identifier: "lazy-img", 
								fade: 600,
								eachLoad: function() {
									if(this===slidez.get(0)){ 
										var c = new Image(); 
										c.src = this.src;
										imgRatio = c.width/c.height;
										slider.width(Math.floor(mod.$head.height()*imgRatio));
										Site.windowSizeMonitr.callbacks["tmp.heroSlider"+i] = function(){ slider.width(Math.floor(mod.$head.height()*imgRatio)); };
										slider.each(function(_i, _n){
											Site.ezImgSlide(_i, _n, {speed: 800, befo: function(container, prev, next){ updateHeadings(next) }});
										});
										mod.$hero.addClass("ready");
									}
								}
							});
						};
						
						mod.setMobile = function(){  
							mod.n.remove();
							//Site.onWinLoad(function(){  });
						};

						mod.init();
					};
					
					$(".hero-module").each(function(i, n){
						if(i==0 && n == $("> .hero-module", Site.contentBody)[0]){
                            $(n).data("first-hero", true);
                            Site.flags.pageReady = false;
                        }
                        if($(n).hasClass("suites-landing-hero")) new suitesLandingHero(i, n);
						else if($(n).hasClass("group-home-landing-hero")) new groupHomeLandingHero(i, n);
						else if($(n).hasClass("hero-slider-module")) new heroSliderModule(i, n);
						else new heroModule(i, n);
					});
				};
				if($(".hero-module").length) heroModules();

				$(".function-room-module").each(function(i, n){
					var $module = $(n), 
						$menu = $(".function-room-menu", n), 
						$menuWrap = $menu.parent(), 
						$tabsWrap = $(".function-room-module-content", n);
					
					if($menu.length){
						if(!Site.belowThresh("mobile")) Site.scrlMonitr.callbacks["tmp.function-room-menu-"+i] = function(event, prvPosition, newPosition, direction){
							if (newPosition > $menuWrap.offset().top && newPosition < $module.offset().top+$module.height()) $menu.addClass('lock');
							else $menu.removeClass('lock');
						};
					}
					
					Site.onWinLoad(function(e){
						var $tabLinks = $(".function-room-module-nav a", $menu),
							$tabPages = $(".function-room-tab", $tabsWrap),
							animating = false,
							currentTab = 1;
						
						if($menu.length){
							function switchTab(newIndex, anim){
								var newTab = $tabPages.filter('[data-function-room-tabindex="'+newIndex+'"]'), oldTab, mo;  //console.log(newIndex, newTab);
								if(!animating && currentTab!==newIndex && newTab.length){
									animating = true;
									Site.scrlMonitr.scrollTo($menuWrap, 700, 0, true);
									
									$tabLinks.removeClass("active").filter('[data-function-room-tabindex="'+newIndex+'"]').addClass("active");
									$tabLinks.filter('[data-function-room-tabindex="'+currentTab+'"]').removeClass("active");
									oldTab = $tabPages.filter('[data-function-room-tabindex="'+currentTab+'"]');
									$tabsWrap.height($tabsWrap.height());
									$module.css("overflow", "hidden");

									if(Site.flags.animSupport){
										var tabAnimations = {
											"fadeAndSlideAndZoom" : {inClass:"fadeAndSlideAndZoomIn", outClass:"fadeAndSlideAndZoomOut"},
											"zoomFadeThenSlide" : {inClass:"zoomFadeThenSlideIn", outClass:"zoomFadeThenSlideOut"}  
										};

										oldTab.addClass(tabAnimations[anim].outClass).on(Site.flags.animEndEventName, function(){
											oldTab.off(Site.flags.animEndEventName).removeClass(tabAnimations[anim].outClass);
											newTab.addClass(tabAnimations[anim].inClass).on(Site.flags.animEndEventName, function(){
												newTab.off(Site.flags.animEndEventName).removeClass(tabAnimations[anim].inClass);
												animating = false;
											});
											animEnd();
										});

									}else{
										oldTab.fadeOut(function(){
											newTab.fadeIn(function(){
												animating = false;
												var ez = $(".ezSlidr", newTab), s = $(".slides li", ez), length = s.length, w = ez.width();
												$(".slides", ez).width((length+1)*w);
												s.width(w);
											});
											animEnd();
										});
									}

									function animEnd(){
										oldTab.removeClass("active");
										newTab.addClass("active");
										currentTab = newIndex;
										$tabsWrap.height("auto");
										$module.css("overflow", "auto");
									};
								}
							};

							$tabLinks.eq(0).add($tabPages.eq(0)).addClass("active");
							$tabLinks.each(function(i, n){
								$(n).click(function(e){ Util.preventEvent(e); switchTab($(n).data("function-room-tabindex"), "fadeAndSlideAndZoom") });
							});
						}else{
							$tabPages.addClass("active");
						}
						
						$tabPages.each(function(i, n){
							$(".slides .lazy-img", n).lazyImage({identifier: "lazy-img", fade: $(n).is(":visible")? 500 : 0});
							$(".ezSlidr", n).each(Site.ezImgSlide);
						});
					});
				});
				
				$(".offers-module").each(function(i, n){
					var $module = $(n), 
						$slides = $(".slides li", n), 
						slideLen = $slides.length, 
						$slideNav = $(".scrollable-nav", n), 
						$prevBtn = $(".scrollable-prev", n),
						$nextBtn = $(".scrollable-next", n),
						$ez,
						randomid = "offer_module_"+i+Date.now();

					Site.onWinLoad(function(){ $(".lazy-img", $slides).lazyImage({identifier: "lazy-img", fade: 500}) });

					if($(".ezSlidr", n).length){
						$ez = $(".ezSlidr", n).ezSlidr({
							speed: 700,
							stepSize: 1,
							respond: false,
							eeze: "easeInOutCirc",
							carousel: 8000,
							infinite: true,
							//buttonClick: function(slider, btn){ },
							before: function(container, prev, next, pid, nid){
								if(nid==0) $prevBtn.removeClass("active");
								else $prevBtn.addClass("active");
								if(nid==slideLen-1) $nextBtn.removeClass("active");
								else $nextBtn.addClass("active");
							},
							after: function(container, prev, next, pid, nid){ $("li",$slideNav).removeClass("active").eq(nid).addClass("active")}
						});

						$slides.each(function(slideIndex, n){
							 $slideNav.append( $('<li class="'+(slideIndex?"":"active")+'"/>').click(function(){ $ez.trigger("ezSlidr", slideIndex) }) );
						});

						$prevBtn.add($nextBtn).click(function(e){ Util.preventEvent(e); $ez.trigger("ezSlidr", $(this).hasClass("scrollable-next")? "next" : "previous"); });
					};
					
					var bx = $('.bxslider', n);
					bx.parents(".bx_slider_container").attr("id", randomid);
					bx.bxSlider({
						  auto: $(".slides",bx).length>3,
						  pause: 8000,
						  minSlides: 1,
						  maxSlides: 3,
						  slideWidth: 320,
						  slideMargin: 0,
						  //nextSelector: "#"+randomid+' .scrollable-prev',
						  //prevSelector: "#"+randomid+' .scrollable-next'//,
						  //nextText: 'Onward ?',
						  //prevText: '? Go back'
						});
						
				});
				
				$(".highlights-slider-module").each(function(i, n){
					var $module = $(n),
						$ez = $(".ezRotate", n), 
						$slides = $(".slides li", $ez), 
						slideLen = $slides.length, 
						$slideNav = $(".scrollable-nav", n);

					Site.onWinLoad(function(){ $(".lazy-img", $slides).lazyImage({identifier: "lazy-img", fade: 500}) });
					
					function ezRotator(hna){
						var opt = $.extend({ 
								speed: 300,
								carousel: -1,
								before: 0,
								after: 0,
								buttonClick: function($container, btn){
									$container.trigger("rxtate", btn.hasClass("next"));
								},
								activeClass: "active"
							}, hna || {}),
							nxtBtn = $('<a href="#" class="slider-next active" title="Next"></a>').appendTo($ez),
							prvBtn = $('<a href="#" class="slider-prev active" title="Previous"></a>').appendTo($ez);
						
						return this.each(function(ind, sl){
							var $container = $(sl),
								$wrapper = $(".slides", sl),
								$slides = $("> li", $wrapper),
								slideLen = $slides.length,
								activeInd = $slides.index($slides.filter("."+opt.activeClass)),
								animating = false,
								sp = 400,
								tmr;
							if(activeInd<0){
								activeInd = 0;
								$slides.eq(activeInd).addClass(opt.activeClass);
							}
							$wrapper.width($slides.outerWidth(true)*(slideLen+2));
							
							function rotate(fwd){
								if(!animating){
									var targetInd, target, clone, endElement;
									animating = true;
									$slides.filter("."+opt.activeClass).removeClass(opt.activeClass);
									if(fwd){
										targetInd = 1+activeInd>=slideLen? 0 : activeInd+1;
										target = $slides.eq(targetInd).addClass(opt.activeClass);
										endElement = $slides.eq(0);
										clone = endElement.clone();
										$wrapper.append(clone).animate({left: 0-$slides.eq(targetInd).outerWidth(true)}, sp, "easeOutSine");
										endElement.fadeOut(sp, function(){
											endElement.remove();
											endTransition();
											targetInd--;
										});
									}else{
										targetInd = activeInd-1<0? slideLen-1 : activeInd-1;
										target = $slides.eq(targetInd).addClass(opt.activeClass);
										endElement = $slides.eq(slideLen-1);
										clone = endElement.clone();
										$wrapper.prepend(clone).css({left: 0-$slides.eq(targetInd).outerWidth(true)}).animate({left: 0}, sp, "easeOutSine");
										endElement.fadeOut(sp, function(){
											endElement.remove();
											endTransition();
											targetInd++;
										});

									}
								}
							};
								
							function endTransition(){
								$wrapper.css({left: 0});
								$slides = $("> li", $wrapper);
								if(opt.carousel){ 
									clearTimeout(tmr);
									tmr = setTimeout(function(){ $container.trigger("rxtate", true); },  opt.carousel);
								}
								animating = false;
							};
								
							$container.on("rxtate", function(e, fwd){ rotate(fwd) });
							
							nxtBtn.add(prvBtn).click(function(e){
								e.preventDefault(); e.stopPropagation();
								$container.trigger("rxtate", $(this).hasClass("slider-next"));
							});
							
							endTransition();
						});
					};
					
					ezRotator.call($ez, {speed: 300, carousel: 6000});
				});
				
				$(".suites-rooms-module, .cafe-module", Site.contentBody).each(function(i, n){
					$(".slides .lazy-img", n).lazyImage({identifier: "lazy-img", fade: 500});
					$(".ezSlidr", n).each(Site.ezImgSlide);
				});
				
				$(".scroll-jacked", Site.contentBody).each(function(i, n){
					var jack = $(n).height(Site.windowSizeMonitr.height).css({opacity: 0}), 
						
						$slides = $(".slide", n),
						$copy = $(".text-block", n).css("z-index", $slides.length+1),
						fbJack = !(Modernizr.backgroundsize && Modernizr.csstransitions),
						imgSet =  ".slide .background-img",
						$slideNav;
					
					function jackScroll(Jack, fallback){
						var slides = $(".slide", Jack),
							delta = 0,
							currentSlideIndex = 0,
							scrollThreshold = 8,
							numSlides = slides.length-1,
							animationDur = 0.9,
							animating = false,
							t,
							activeClass = "active",
							slideNav = $('<ul class="clearfix"></ul>');
					  
						slides.each(function(slideIndex, n){
							$(n).css({"z-index": numSlides-slideIndex});
							slideNav.append( $('<li class="'+(slideIndex?"":activeClass)+'"/>').click(function(){ Jack.trigger("scrollToSlide", [slideIndex]) }) );
						});


						function elementScroll(e){
							if (animating){
								return false;
							}else{
								if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	// --- Scrolling up ---
									if(Site.scrlMonitr.position < 5){
										delta--;
										if ( Math.abs(delta) >= scrollThreshold) prevSlide();

										return false;	// Prevent page from scrolling
									}
								} else if(currentSlideIndex < numSlides) {// --- Scrolling down --- 
									delta++;
									if (delta >= scrollThreshold) nextSlide();
									
									return false;	// Prevent page from scrolling
								}
							}
						};

						function showSlide(){
							delta = 0;// reset
							if(fallback){
								slides.filter("."+activeClass).removeClass(activeClass).fadeOut(animationDur*1000);
								slides.eq(currentSlideIndex).addClass(activeClass).fadeIn(animationDur*1000);
							}else{
								slides.each(function(i, slide) {
									$(slide).toggleClass('active', (i >= currentSlideIndex));
								});
							}
							animating = true;
							clearTimeout(t);
							t=setTimeout(function(){
								animating = false;
								$("li", slideNav).removeClass("active").eq(currentSlideIndex).addClass("active");
							}, animationDur*1000);
							
						};

						function prevSlide(){
							currentSlideIndex--;
							if (currentSlideIndex) currentSlideIndex = 0;
							showSlide();
						}

						
						function nextSlide(){
							
							(function autoAdvance(){
							currentSlideIndex++;
							//if (currentSlideIndex > numSlides) currentSlideIndex = numSlides;
							showSlide();
							 if (currentSlideIndex > numSlides){
						
							 	prevSlide();}
							timeOut = setTimeout(autoAdvance,5000);
					     })();
						}

						$(document).ready(nextSlide)


						$(window).on({'DOMMouseScroll mousewheel': elementScroll});
						Jack.on({'scrollToSlide': function(e, slideNum){
								currentSlideIndex = slideNum;
								showSlide();
							}
						});
						
						
						if(browserIs.touch){
							var dragThreshold = 0.15,	// "percentage" to drag before engaging
								dragStart = null,
								percentage = 0,
								target,
								previousTarget;
							 
							 function touchStart(event) {
								if (dragStart !== null) { return; }
								if (event.originalEvent.touches) event = event.originalEvent.touches[0];
							
								dragStart = event.clientY;	// where in the viewport was touched
								target = slides.eq(currentSlideIndex)[0];	// make sure we're dealing with a slide	
								target.classList.add('notransition');	// disable transitions while dragging
							 
								previousTarget = slides.eq(currentSlideIndex-1)[0];
								previousTarget.classList.add('notransition');
							};
							 
							function touchMove (event) {
								if (dragStart === null) { return; }
								if (event.originalEvent.touches) event = event.originalEvent.touches[0];
							 
								delta = dragStart - event.clientY;
								percentage = delta / Site.windowSizeMonitr.height;
							
								if (percentage > 0) {	// Going down/next. Animate the height of the target element.
									if (previousTarget) { 
										previousTarget.style.height = ''; 	// reset
									}
									if(currentSlideIndex >= numSlides) return true;
									target.style.height = (100-(percentage*100))+'%';
								} else if (previousTarget) {	// Going up/prev. Animate the height of the _previous_ element.
									target.style.height = '';	// reset
									previousTarget.style.height = (-percentage*100)+'%';
								}
							
								return false;	// Do not drag element.
							};
							 
							function touchEnd () {
								dragStart = null;
								
								target.classList.remove('notransition');
								if (previousTarget) previousTarget.classList.remove('notransition'); 
							 
								if (percentage >= dragThreshold) {
									if(currentSlideIndex >= numSlides){ 
										percentage = 0;
										return true;
									}
									target.style.height = ''; 
									nextSlide();
								} else if ( Math.abs(percentage) >= dragThreshold ) {
									previousTarget.style.height = '';
									prevSlide();
								} else {
									target.style.height = '100%';
								}
							 
								percentage = 0;
							};
							 
							Jack.on({
								'touchstart': touchStart,
								'touchmove': touchMove,
								'touchend': touchEnd
							});
						}
						
						return $('<div class="slideNav" />').append(slideNav);
					};
					
					Site.windowSizeMonitr.callbacks["tmp.srollJacks-"+i] = function(event, prvWidth, prvHeight, width, height){
						jack.height(height);
					};
					
					Site.onWinLoad(function(e){
						$(imgSet, jack.wrap('<div class="rfl-load" />')).lazyImage({identifier : "lazy-img"}, function(){
							if(fbJack){
								$slides.each(function(i, s){
										if(Site.checkMissingImages($(".background-img", s).attr("src")))
											$(s).height("100%").backstretch($(".background-img", s).attr("src"));
									})
									.not(":eq(0)").hide(); 
							}else{
								$slides.each(function(i, s){
									$(s).css({
										"background-image" : "url("+$(".background-img", s).attr("src")+")", 
										"background-size" : "cover", 
										"background-position":"50% 50%", 
										"background-attachment": (Site.belowThresh("tablet"))? "scroll" : "fixed"
									});
								});
							}
							jack.parent().removeClass("rfl-load");
						
								$slideNav = jackScroll(jack.fadeTo(500, 1), fbJack);
								$slideNav
									.css("margin-top", (0-($("li",$slideNav).length*30)/2)+"px")
									.hide()
									.appendTo($copy)
									.fadeIn(1500);
							
						});
					});
				});

                $(".replace-select, .form-select", Site.contentBody).replaceSelect();
				
				if(Site.contentBody.hasClass("destinations-page")) Pages["*"].destinations();
				
			},

			position: function(W, H, oldW, oldH){ /**Util.backgroundAdjust($(".page_bg"));**/ },

			animateContent: function(){
				
				if($(document.documentElement).hasClass("rfl-load")){
					if(!Site.flags.transformer) Site.contentBody.fadeTo(Site.animationDuration, 1);
					$(document.documentElement).removeClass("rfl-load");
				}
				Site.onWinLoad(function(){

					function experiencex(){
						var experiencez = $(".experienx"), experiencezLength = experiencez.length;
						$(".experienx").each(function(i, n){
							var $experience = $(n).data({"active": true, "loaded": false, "filterIndex": i});

							Site.scrlMonitr.callbacks["tmp.experienxLoader."+i] = function(event, prvPosition, newPosition, direction){
								if($experience.data("active") && Site.scrlMonitr.scrolledPast($experience, newPosition+Site.windowSizeMonitr.height)){
									$(".lazy-img", n).lazyImage({identifier: "lazy-img"}, function(){
										 var $img = this;
										 $(".img", n).fadeTo(300, 0, function(){ 
											 $(this).css("background-image", "url("+$img.attr('src')+")").addClass("full").fadeTo(800, 1); 
										 });
									 });
									$experience.data("loaded", true);
									Site.scrlMonitr.freshen("tmp.experienxLoader."+i);
								}
							};
							
							if(i+1==experiencezLength) Site.$win.trigger("scroll", ["experiencex"]);
						});
					};
					experiencex();

					function homepageFeatures(){
						var ftrz = $(".homepage-feature"), ftrzLength = ftrz.length;
						ftrz.each(function(i, n){
							var heightRatio = 0.3166666,
								usingImgs = !Site.belowThresh("tablet-portrait"),
								$feature = $(n).data({"active": true, "loaded": false, "filterIndex": i}).height(Site.windowSizeMonitr.width*heightRatio),
								activeInd = 0,
								fade_speed = 400,
								slideNav = $(".slideNav ul", n),
								slides = $(".slide", n).each(function(){ slideNav.append('<li></li>'); }),
								imgSlides = usingImgs? $(".img-slide", n).css({opacity: 0, "display" : "block"}) : null,
								slideFt = function(ind){
									if(!slideFt.a){
										slideFt.a=true;
										slides.eq(activeInd).fadeOut(fade_speed);
										if(usingImgs){
											imgSlides.eq(activeInd).fadeTo(fade_speed, 0, function(){
												slides.eq(ind).fadeIn();
												imgSlides.eq(ind).fadeTo(fade_speed, 1, function(){slideFt.a=false});
											});
										}else{
											slides.eq(ind).delay(fade_speed).fadeIn(fade_speed, function(){slideFt.a=false});
										}
										activeInd=ind;
										$(".active", slideNav).removeClass("active");
										$("li", slideNav).eq(activeInd).addClass("active");
									}
								};
							function loadFeature(){
								$feature.data("loaded", true);
								$("li", slideNav).click(function(e){ Util.preventEvent(e); slideFt($("li", slideNav).index(this)); }).eq(0).addClass("active");
								slideFt(0);
							};

							Site.windowSizeMonitr.callbacks["tmp.homepageFeature-"+i] = function(event, prvWidth, prvHeight, width, height){
								$feature.height((width<Site.flags.thresholds["tablet-portrait"])? "auto" : (width*heightRatio));
							};

							if(usingImgs){
								Site.scrlMonitr.callbacks["tmp.homepageFeatureLoader."+i] = function(event, prvPosition, newPosition, direction){
									if($feature.data("active") && Site.scrlMonitr.scrolledPast($feature, newPosition+Site.windowSizeMonitr.height)){
										$(".lazy-img", n).lazyImage({identifier: "lazy-img"}, function(){
											 this.each(function(i, n){
												 if(Modernizr.backgroundsize) $(n).parent().css({"background-image": "url("+$(n).attr('src')+")"});
												 else if(Site.checkMissingImages($(n).attr('src'))) $(n).parent().backstretch($(n).attr('src'));
											 });
										 });
										Site.scrlMonitr.freshen("tmp.homepageFeatureLoader."+i);
										
										loadFeature();
									}
								};
							}else{
								loadFeature();
							}

							Site.$win.trigger("scroll", ["homePageFetaurex"]);

							$(".pager-next, .pager-prev", n).click(function(e){
								Util.preventEvent(e);
								var tx;
								if($(this).hasClass("pager-next")) tx = activeInd+1 < slides.length? activeInd+1 : 0;
								else tx = activeInd-1 >= 0? activeInd-1 : slides.length-1;
								slideFt(tx);
							});

							var gDwn = $('<li class="dwn"></li>'),
								gUp = $('<li class="up"></li>'),
								sncliq = function(e){ Site.scrlMonitr.scrollTo($feature, 500, $(this).hasClass("up")? 0-$feature.outerHeight(true) : $feature.outerHeight(true), true); };
							if(i==0) gUp.hide();
							if (i+1>=ftrzLength) gDwn.hide();
							$(".orange-box", $feature).append($('<div class="scroll-control"></div>').html($('<ul></ul>').append(gUp.add(gDwn).click(sncliq))));
						});
					};
					homepageFeatures();
					
					function personalizeFilter(){
						if(Site.belowThresh("mobile")){	//Do mobile things
							$("#personalizeFilter", Site.contentBody).hide();
						}else{
							var PF = $("#personalizeFilter", Site.contentBody).addClass("inactive"),
								oc = "open",
								tt, ti,
								active = false,
								travellerBtn = $(".controls .traveller-type", PF),
								interestBtn = $(".controls .interest-type", PF),
								clearBtn = $(".controls .clear-btn", PF),
								travellerSet = $(".filter-set.traveller", PF).data(oc, false),
								interestSet = $(".filter-set.interest", PF).data(oc, false),
								items = $(".rfltered", Site.contentBody),
								itemCount = items.length,
								mapFilter = PF.is("#gtMap_module #personalizeFilter"),
								t;

							travellerBtn.on('mouseover touchstart', function(e){ 
									travellerSet.addClass(oc).data(oc, true);
									interestSet.removeClass(oc).data(oc, false);
								}).on('mouseleave touchend', function(e){ 
									travellerSet.data(oc, false);
									clearTimeout(tt); tt=setTimeout(function(){ if(!travellerSet.data(oc)) travellerSet.removeClass(oc); }, 1000);
								});

							interestBtn.on('mouseover touchstart', function(e){ 
									interestSet.addClass(oc).data(oc, true);
									travellerSet.removeClass(oc).data(oc, false);
								}).on('mouseleave touchend', function(e){ 
									interestSet.data(oc, false);
									clearTimeout(ti); ti=setTimeout(function(){ if(!interestSet.data(oc)) interestSet.removeClass(oc); }, 1000);
								});
							travellerSet.add(interestSet).on('mouseover touchstart', function(e){ 
									clearTimeout(tt); clearTimeout(ti); $(this).data(oc, true);
								}).on('mouseleave touchend', function(e){ 
									$(this).data(oc, false).removeClass(oc);
								});

							clearBtn.on("click.personalizeFilter", function(){
								filtxr("all", $(this), false); 
							});
							$("button", travellerSet).on("click.personalizeFilter", function(){
								filtxr("traveller-tags", $(this), true);
							});
							$("button", interestSet).on("click.personalizeFilter", function(){
								filtxr("interest-tags", $(this), true);
							});

							function filtxr(filterType, btn, activity){
								var doAll = (filterType==="all"), tagname = btn.parent().attr("class");

								$("li", travellerSet.add(interestSet).removeClass("active")).removeClass("active");
								activity && btn.parent().addClass("active").parent().addClass("active");
								if(active !== activity){
									if(activity){ 
										PF.removeClass("inactive");
									}else{ 
										PF.addClass("inactive");
									}
									active= !active;
								}

								if(mapFilter){
									$("#gtMap_module").trigger("filterEvent", [filterType, tagname]);
								}else{
									items.each(function(i, n){
										var $item = $(n);
										if(doAll || $item.is("[data-"+filterType+"~='"+tagname+"']")){
											if(!$item.data("active"))
												$item.data("active", true).fadeIn();
										}else if($item.data("active")){
											$item.data("active", false).fadeOut();
										}
									});
									clearTimeout(t); t=setTimeout(function(){ Site.$win.trigger("scroll", ["personalizeFilter"]); }, 500);
								}
							};
						}
					};
					$("#personalizeFilter", Site.contentBody).length && personalizeFilter();
					
					$("#gallerySlideshow", Site.contentBody).length && Pages["*"].gallerySlideshow();
						
					$(".gMap:not('#gtMap_module .gMap')", Site.contentBody).each(function(i, m){
						var mod = $(m).parents(".contact-us-module").height(Site.windowSizeMonitr.height-Site.windowSizeMonitr.headerHeight),
							contnt = $(".content-section", mod),
							upd = function(hh, xxx){
								mod.height(hh);
								xxx = (hh-contnt.height())/2;
								contnt.css("margin-top", (xxx>0?xxx:0)+"px");
							};

						if(mod.length){
							upd(Site.windowSizeMonitr.height-Site.windowSizeMonitr.headerHeight);
							Site.windowSizeMonitr.callbacks["tmp.gmap_module-"+i] = function(event, prvWidth, prvHeight, width, height){
									upd(height-Site.windowSizeMonitr.headerHeight);
								};
						}

						Util.gMap.initMap( Util.gMap.buildLoc($(m), {mapStyle: Site.mapStyle, scrollwheel: true}) );
					});

                    if($(".menu-scroll", Site.contentBody).length) Site.scrollingMenu();

                    if($(".footer-tab-module", Site.$mainFooterBar).length) Site.footerTabs();

					$(".a-button.scroll-to, .discover-more-btn .scroll-to", Site.contentBody).on("click.scroll-to", function(e){
						Util.preventEvent(e);
						Site.scrlMonitr.scrollTo($(this), 500, $(this).outerHeight(true));
					});
					
					if(Site.saxify && window.location.hash){		//Hack for achoring with hashbang url fragment
						(function(h){
							var hash = (h.charAt(0) == "#")? h.substring(1).split('#') : h.split('#'),
								anchor, images, counter, target;
							if(hash.length>1){
								anchor = hash.pop();
								target = $('[name="'+anchor+'"]');
								if(target.length){
									images = $('img');
									counter = images.length;					//We need to load images first or scroll will go to wrong place
									function imageLoaded() {					//Each image check if its the last loaded and scroll if true
									   if( --counter === 0 ) setTimeout(function(){ Site.scrlMonitr.scrollTo(target, 600, 0); }, 1000);
									}
									images.each(function() {		
										if( this.complete )
											imageLoaded.call( this );			//Check 
										else
											$(this).one('load', imageLoaded);	//Check again when loaded
									});
								}
							}
						})(window.location.hash);
					}
					
				});
				
				$(".fakeDrop", Site.contentBody).fakeDrop({eezeDown: "easeOutExpo"});

				typeof(Drupal)!="undefined" && Drupal.attachBehaviors();

				$(".triggerReservationPopup").ezPopup({
					moveTarget: true,
					keepEvents: true,
					recursiveKeepEvents: true,
					background: Modernizr.rgba ? "rgba(27,22,26,0.95)" : "url(" + Site.assetPath() + "img/purplemask.png)"
				});
			},

			exit: function(){
				
				if(!_RFLload) Pages["*"].initialize();
				Site.scrlMonitr&&Site.scrlMonitr.freshen("tmp");
				Site.windowSizeMonitr&&Site.windowSizeMonitr.freshen("tmp");
				$(".menu", Site.$mainFooterBar).remove();
				$("#supersized.ss-visible").removeClass("ss-visible").fadeTo(600, 0).empty();
				if(typeof Site.flags.ignoreScroll != "boolean" || Site.flags.ignoreScroll==true){
					Site.$header.trigger("activxte");
				}
				$(window).off('DOMMouseScroll mousewheel');
				$(".pop-up-outer").remove();
				
			},

			gallerySlideshow: function(){
				
				var gallerySlideshow = $("#gallerySlideshow", Site.contentBody),
					imgArray = [], 
					imgz = $("img", gallerySlideshow).each(function(i, n){
						imgArray.push({image: $(n).data("img-src"), title: n.title, thumb: n.src});
					}), // Slideshow Images
					zuperSized = $("#supersized").empty();

				imgz.eq(0).lazyImage({fade: 0}, function(){
					$.supersized({
						autoplay			: 0,
						slide_interval  : 3000,		// Length between transitions
						transition  : 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
						transition_speed	: 700,		// Speed of transition	
						slide_links			: 'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
						thumbnail_navigation: 0,
						thumb_links			: true,
						//fit_landscape		: 0,
						//fit_portrait		: 1,
						performance : 0,
						slides 				: imgArray
					});
					zuperSized.addClass("ss-visible").delay(1000).fadeTo(1000, 1, "easeOutSine");
				});
			
				var menu = 
				$(".gallery-menu", Site.contentBody).slicknav({prependTo: $(".gallery-Nav", Site.contentBody), closeOnClick: true});
				
			},

			destinations: function(){
				var mod = $("#gtMap_module");
				
				if(Site.belowThresh("mobile")){
					alert("Destinations are not available on mobiles.");
					window.history.back();//$("#personalizeFilter").hide();
				}else if(mod.length && gtMapJSON){
					var filter = $("#personalizeFilter", mod),
						setH = function(e, inxt){setH.initH = setH.initH || filter.height(); ( mod.css("padding-top", inxt? setH.initH : filter.height() )+"px")};
					mod.height(Site.windowSizeMonitr.height).on("adjustViewport", setH).trigger("adjustViewport");
					Site.windowSizeMonitr.callbacks["tmp.gtMap_module"] = function(e, pW, pH, w, h){  mod.height(h); };
					Site.$header.trigger("de-activxte");
					
					var origins = gtMapJSON,
						extraPoints = [],
						extraOrigins = [];
					
					function MDBLS(){
						var _GT = this,
							filterActive = false,
							readmore;
								
						mod.on("filterEvent", function(e, filterType, tag){
							var deactivate = (filterType == "all"), filtxr;
							
							if(deactivate || !filterActive) mod.trigger("adjustViewport", [deactivate]);
							filterActive = !deactivate;
							
							if(filterType == "interest-tags") filtxr="interestTags";
							else if(filterType == "traveller-tags") filtxr="travellerTags";
								
							_GT.activeOrigins = [];
							_GT.each(_GT.origins, function(i, origin){
								if(deactivate || origin[filtxr].indexOf(tag) > -1 ){
									_GT.activeOrigins.push(origin.fn.originIndex);
									origin.fn.toggleMark(true);
								}else{
									origin.fn.toggleMark(false);
								}
							});
							_GT.fitBounds();
						});
						
						function GT_readmore(e, i, o){
							var rm = this, td_e = 600;
							rm.active = false;
							rm.activeOrigin = -1;
							rm.animating = false;
							rm.overlay = $("#GT_overlay", mod).on("click", overlayOut);
							rm.overlayContent = $(".gt-detailed", rm.overlay).on("click", function(e){
								Util.preventEvent(e);
							}).hide();
							rm.pager = $(".gt-pagination", mod);
							
							$(".gt-close", rm.overlay).click(overlayOut);
							
							function overlayIn(cb){
								rm.active=true; rm.animating=true;
								rm.overlay.fadeIn(function(){
									rm.animating=false;
									if(typeof(cb)=="function") cb();
								});
							};
							
							function overlayOut(cb){
								rm.animating=true;
								contentOut(function(){
									rm.overlay.fadeOut(function(){
										rm.active=false; rm.animating=false;
										if(typeof(cb)=="function") cb();
									});
								});
							};
							
							function contentIn(cb, gb){
								var back = false;
								if(typeof(cb)=="boolean") back=cb;
								else if(typeof(gb)=="boolean") back=gb;
								rm.overlayContent.css({left: back?"30px":"-30px"})
									.fadeIn({queue: false, duration: td_e})
									.animate({ left: "0px" }, {duration: td_e, easing: "easeOutSine", complete: function(){
										rm.animating=false;
										if(typeof(cb)=="function") cb();
									}});
							};
							
							function contentOut(cb, gb){
								rm.animating=true;
								rm.overlayContent.fadeOut({queue: false, duration: td_e})
									.animate({ left: gb?"-30px":"30px" }, {duration: td_e, easing: "easeOutSine", complete: cb || null});
							};
							
							function replacecontent(o, goingBack){
								contentOut(function(){
									$(".gt-img",rm.overlayContent).html('<img src="'+o.img+'" />');
									$(".gt-title",rm.overlayContent).html(o.title);
									$(".gt-description",rm.overlayContent).html(o.description);
									updatePager(o);
									contentIn(goingBack);
								}, goingBack);
							};
							rm.showDetail = function(o, dir){ 
								if(rm.active){
									replacecontent(o, dir || false);
								}else{
									overlayIn(function(){
										replacecontent(o, dir || false);
									});
								}
							};
							
							function updatePager(origin){
								$(".status", rm.pager).text((1+origin.fn.originIndex)+" / "+_GT.origins.length);
								rm.activeOrigin = origin.fn.originIndex;
								$(".prev", rm.pager)[(rm.activeOrigin<=0)?"removeClass":"addClass"]("active");
								$(".nxt", rm.pager)[(rm.activeOrigin+1>=_GT.origins.length)?"removeClass":"addClass"]("active");
							};
							$(".nxt, .prev", rm.pager).on("click", function(e){
								var target, btn = $(this), nxt = btn.hasClass("nxt");
								if(btn.hasClass("active")){
									target = nxt? rm.activeOrigin+1 : rm.activeOrigin-1;
									rm.showDetail(_GT.origins[target], !nxt);
								}
							});
						};
						readmore = new GT_readmore();
						
						var wl = window.location,
							query,
							parameters,
							viewId;
						
						if(wl.search.length) query = wl.search.substring(1);
						else if(wl.href.indexOf('?')) query = wl.href.substring(wl.href.indexOf('?')+1);
						else query = false;
						parameters = query? Util.getQueryVars(query, true) : query;
						
						_GT.each(_GT.origins, function(i, o){
							$(".bubble-text", o.fn.bubble.content_).on("click", function(e){ 
									readmore.showDetail(o);
								});
						
							query && parameters["viewDestination"]==o.title && o.fn.toggleBubble(true);
							query && parameters["viewDestinationDetails"]==o.title && $(".bubble-text", o.fn.bubble.content_).trigger("click");
						});
						
					};
					
                    var canvas = $('#gtMap_canvas'),
						gt = new gtMap({
						mapId: 'gtMap_canvas',
						title: canvas.attr('data-title'),
						lat: canvas.attr('data-latitude'),
						longd: canvas.attr('data-longitude'),
						assetPath: Site.assetPath() + 'js/vendor/',
						imgPath: Site.assetPath() + 'img/destinations/',
						origins: origins,
						extraPoints: extraPoints,
						extraOrigins: extraOrigins,
						mapStyle: Site.mapStyle,
						onRender: MDBLS
					});
					
					gtMapJSON=null;
				}
				
			}

		}

	};


})(this, document, jQuery);
;
/*
saxDefault ajax framework
Version 1.0
Nathan Johnson
*/
(function (window, document, $, _script){
	//"use strict";

	window.Site = {
		$win: $(window),
		$html: $(document.documentElement),
		$body: $(document.body),
		mainPage: 'home',
		subPage: '',
		tertianPage: '',
		currentUri: '',
		prevUri: '',
		animateReady: 0,
		fontsLoaded: 0,
		animationDuration: 400,
		contentBody: $('#content_body'),
		mainNav: $('#main_nav'),
		webFonts: "typekit",
		saxify: (typeof _SAXIFY == "boolean")? _SAXIFY : true,
		stripStructure: false,
		ignoreTrailers: true,
		unsafeToLink: ["/user", "/admin", "/node"],
		fx: "fade-down fade-right rotate-out-up-left rotate-out-up-right rotate-out-down-left rotate-out-down-right flip-out-y flip-out-x zoom-in zoom-out zoom-out-spin",
        pCache: {},
        onWinLoad: (function(){
            $(window).on( "load", function(){ Site.onWinLoad.loaded = true });
            return function(fn){
                if(Site.onWinLoad.loaded) fn.call();
                else $(window).on("load", fn);
            };
        })(),
		flags: {
			landing: true,
            pageReady: true,
			transformer: (function(){
					var tfmr = (Modernizr.csstransforms3d && Modernizr.csstransitions); 
					$(document.documentElement).addClass('rfl-'+(tfmr?"":"no-")+'tfmr');
					return tfmr;
				})(),
			animSupport: Modernizr.cssanimations,
			animEndEventName: {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				}[ Modernizr.prefixed( 'animation' ) ], 
			thresholds: {"mobile": 640, "tablet-portrait": 768, "tablet": 1048}
		},

        checkMissingImages: function(img){
            var host = window.location.protocol+"//"+window.location.host,
                src = typeof(img) == "string"? img : (img.attr("data-img-src")? img.attr("data-img-src") : img.attr("src")),
                src = jQuery(".background-img.hide").eq(0).attr("data-imgsrc");
            return !(src == host || src == host+"/");
        },

		belowThresh: function(lvl){ var w = Site.position.oldW || $(window).width(); return w <= Site.flags.thresholds[lvl]; },

		assetPath: function() {
			if (typeof Drupal == 'object')
				return Drupal.settings.basePath + Drupal.settings.themePath + '/';
			else
				return _script.src.substring(0, _script.src.indexOf("js/"));
		},

		init: function(){
			Site.initPages();
			
			function changeFunc(newUri){
				var newPage = Site.ignoreTrailers? Util.stripTrailers(newUri) : newUri,
					parts = newPage.split('/');
				
				Site.prevUri = Site.currentUri;
				Site.currentUri = newPage;
				Site.mainPage = (parts[1] && parts[1]!="")? parts[1] : "home";
				Site.subPage = parts[2] ? parts[2] : '';
				Site.tertianPage = parts[3] ? parts[3] : '';

				Site.animateContent();
				Site.updateNav();
			};
			
			var tfmr = Site.flags.transformer, bodyOverflow;
			
			Site.animateSite();
			$(window).on("resize", Site.position);

            if(Modernizr.history && Site.saxify){
				$.saxify({
                    fade: tfmr? -800 : 500,
                    scrollTop: 1,
                    scrollSpeed: 1000,
                    scrollEase: "easeOutSine",
                    defaultRequestData: {ajaxReq: 1},
                    contentSelector: Site.contentBody.selector,
                    nonAjaxPages: Site.unsafeToLink,
                    pageLoadingClass: "sax-loading",
                    menuSelector: ".nomenuaction",
                    beforeSend: function(contentTarget, jqXHR, settings){
                        //loaderOn();
                    },
                    errorCallback: function(contentTarget, jqXHR, textStatus, errorThrown){
                        window.location = "/404";
                        return false;
                    },
                    beforeReplace: function(contentTarget, contentHtml, data, textStatus, jqXHR){
                        Site.pageProto("*", "exit", true, true);
                        Site.pageProto(Site.currentUri, "exit", true, true);
                    },
                    successCallback: function(contentTarget, relativeUrl, contentHtml, data, textStatus, jqXHR){
						changeFunc(relativeUrl);
                    }
                });
			}
			
			changeFunc(window.location.pathname);
		},

        initPages: function(){
            Pages["/home"] = Pages["/"];

            var Pagekeys = [];
            for(var k in Pages) (k!=="*" && k.endsWith("*")) && Pagekeys.push(k.substring(0, k.length-1));

            Site.pageProto = function(page, fn, returnFN, executeFN){
                if(page && page != ""){
                    page = (page!=="/" && page.endsWith("/"))? page.substring(0, page.length-1) : page;
                    var pk = Pagekeys,
                        matches,
                        i=0,
                        l=pk.length,
                        finalMatch = [],
                        pageCached = Site.pCache[page]? true : false;

                    if(pageCached){
                        matches = Site.pCache[page];
                    }else{
                        matches = Pages[page]? [Pages[page]] : [];
                        for(; i<l ;i++){
                            if(page.startsWith(pk[i]))
                                matches.push(Pages[pk[i]+"*"]);
                        }
                        Site.pCache[page] = matches;
                    }

                    if(matches.length){
                        if(fn){
                            for(i=0,l=matches.length; i<l ;i++){
                                if(matches[i][fn]){
                                    executeFN && matches[i][fn]();
                                    returnFN && finalMatch.push(matches[i][fn]);
                                }
                            }
                            return finalMatch;
                        }else{
                            return true;
                        }
                    }
                }
                return false;
            };
        },

		position: function(){
			if(typeof Site.position.oldX == 'undefined' ){
				Site.position.oldW = $(window).width();
				Site.position.oldH = $(window).height();
			}
			if(typeof Site.position.timer != 'undefined' )
				clearInterval(Site.position.timer);
			
			function position(){
				var w = $(window).width(), h = $(window).height(), d;
				
				Pages["*"].position(w, h, Site.position.oldW, Site.position.oldH);
				p = Site.pageProto(Site.currentUri, "position");
				if( p.length ){
					for(d=0; d<p.length; d++) p[d](w, h, Site.position.oldW, Site.position.oldH);
				}
				
				Site.position.oldW = w;
				Site.position.oldH = h;
			}
			
			Site.position.timer = setTimeout(position, 100);
		},
		
		animateSite: function(i){
			var iteration = i || 0,
				giveUpAfter = 100,
				callback = function(){ Site.animateReady = 1 };
				
			if($('.page_bg').length) $('.page_bg > img').lazyImage(function(){Site.flags.backgrounds = true});
			else Site.flags.backgrounds = true;
			
			if(iteration > giveUpAfter || (Util.areFontsLoaded() && Site.flags.backgrounds) ){
				callback();
			}else{
				setTimeout(function(){Site.animateSite(iteration+1)}, 100);	
			}
		},

		animateContent: function(){
			if( Site.animateReady ){
				Site.position();
				Site.setupElements();

				Site.pageProto("*", "setup", true, true);
				Site.pageProto(Site.currentUri, "setup", true, true);
				
				Site.pageProto("*", "animateContent", true, true);
				Site.pageProto(Site.currentUri, "animateContent", true, true);
			}else{
				setTimeout( Site.animateContent, 50 );	
			}
		},
		
		updateNav: function(){
			var navUpdated = 0,
				navLink = '',
				activeClass = 'active';
			
			if( !Site.mainNav.is(':visible') ){
				setTimeout( Site.updateNav, 50);
				return false;
			}
			
			navLink = Site.mainNav.find('li[data-page="' + Site.mainPage + '"]');

			if( navLink.length ){
				Site.mainNav.find('li').removeClass(activeClass);
				navLink.addClass(activeClass);

				navUpdated = 1;
			}else{
				Site.mainNav.find('li').removeClass(activeClass);	
			}
			
			if( Site.subPage ){
				Site.mainNav.find('.menu li').removeClass(activeClass);
				Site.mainNav.find('li[data-page="' + Site.mainPage + '"] li[data-page="' + Site.subPage + '"]').addClass(activeClass);
			}
		},
		
		setupElements: function(){
			if ( browserIs.IE ) {
				
			}
		}

    };
	
	
	$(Site.init);

    
})(this, document, jQuery, (function(s){ return s[s.length-1] })(document.getElementsByTagName('script')));
;
/*
gtMap
Version 0.3.5
Nathan Johnson
*/
(function (window, document, $, undefined){
	
	var gtMap = window.gtMap = function(confxg){
		
		var gtMap = this, isArray = function(o){return !!(o.length || Object.prototype.toString.call(o) === '[object Array]') };
		
		if (!Object.keys) Object.keys = function(o) {	//Object.keys polyfill
				if (o !== Object(o)) throw new TypeError('Object.keys called on a non-object');
				var k=[],p;
				for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
				return k;
			};
		
		gtMap.convertObject = function(o, a){
			if(isArray(o)) return o;
			var u, a = a || [], k = Object.keys(o);
			for(u=0; u<k.length; u++)
				if(o.hasOwnProperty(k[u])) a.push(o[k[u]]);
			return a;
		};
		
		gtMap.loadScript = function(src, callback){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
			if(typeof(callback)=="function") script.onload = callback(script);
		};
		
		gtMap.initMap = function(confxg){
			function setLoc(){
				var map = document.getElementById(confxg.mapId), mapData = new Object;
				mapData.map = map;
				mapData.locTitle = confxg.title;
				mapData.locLatitude = confxg.lat;
				mapData.locLongditude = confxg.longd;
				mapData.imgPath = confxg.imgPath;
				mapData.origins = gtMap.convertObject(confxg.origins);
				mapData.extraPoints = confxg.extraPoints? gtMap.convertObject(confxg.extraPoints) : [];
				mapData.extraOrigins = confxg.extraOrigins? gtMap.convertObject(confxg.extraOrigins) : [];
				mapData.mapStyle = (confxg.mapStyle && confxg.mapStyle.length)? confxg.mapStyle : [];
				mapData.onRender = confxg.onRender || function(){return;};
				return mapData;
			};
			function render(){ setTimeout(function(){ new gtMap.render(setLoc()) }, 250) };

			function loadInfoBox(skip){
				if(!window.InfoBox && !skip) setTimeout(function(){ gtMap.loadScript(confxg.assetPath+"infobox.min.js", function(){ loadInfoBox(true) }) }, 250);
				else render();
			};
			if(!window.google || !google.maps){
				window.gMapInit = loadInfoBox;
				gtMap.loadScript("http://maps.google.com/maps/api/js?sensor=false&callback=gMapInit");
			}else{
				loadInfoBox();
			}
		};
		
		gtMap.render = function(mapData){
			var _GT = this,
				mapCenter = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),		// Put the destination in the center of the new map, and set other options
				mapOptions = {
					center: mapCenter,
					zoom: 7,
					scrollwheel: true,
					//disableDefaultUI: true,
					scaleControl: false,
					zoomControl: true,
					zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
					panControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					overviewMapControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: mapData.mapStyle
				},
				lineOpts = {
					strokeColor: '#6c6651',
					visible: true,
					strokeWeight: 3
				},
				directionsDisplay,
				directionsService,
				markerPos = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),	
				bounds = new google.maps.LatLngBounds(),
				mightBeIE = /msie/i.test(navigator.userAgent);
				
			_GT.origins = mapData.origins;
			_GT.extraOrigins = mapData.extraOrigins;
			_GT.activeOrigins = [];
			_GT.map = new google.maps.Map(mapData.map, mapOptions);		// render the map
			_GT.fitBounds = function(){ _GT.map.fitBounds(bounds); };
			_GT.marker = new google.maps.Marker({						// add marker
					position: markerPos,
					map: _GT.map,
					icon: mapData.imgPath+'hotel-marker.png',
					animation: google.maps.Animation.DROP,
					title: mapData.locTitle
				});
			
			_GT.each = function(objxct, cxllbxck){
				if(isArray(objxct)){
					for(var sk=0, k=Object.keys(objxct); sk<k.length; sk++) cxllbxck(k[sk], objxct[k[sk]]);
				}else{
					for(var sk in objxct) cxllbxck(sk, objxct[sk]);
				}
				return objxct;
			};
			
			_GT.onBubbleOpen = function(originSet, doBefore, fn){
				_GT.each(originSet, function(i, o){
					o.fn.originalBubbleOpen = o.fn.originalBubbleOpen || o.fn.bubble.open;
					
					o.fn.bubble.open = (function(originalOpen){
						return function(){
							if(doBefore) fn(i, o);
							originalOpen.apply(this, arguments);
							if(!doBefore) fn(i, o);
						};
					})(o.fn.originalBubbleOpen);
				});
			};

			function setupOrigin(sk){
				var origin = _GT.origins[sk], 
					thisOrigin = this,
					bubbleDiv = document.createElement('div');
				thisOrigin.active = false;
				thisOrigin.originIndex = sk;
				thisOrigin.pos = new google.maps.LatLng(origin.lat,origin.lng);
					bounds.extend(thisOrigin.pos);
				thisOrigin.mark = new google.maps.Marker({
						position: thisOrigin.pos,
						map: _GT.map,
						icon: mapData.imgPath+"destination-marker.png",
						//animation: google.maps.Animation.DROP,
						title: origin.title
					});
				thisOrigin.toggleRoute = function(_on){
					if(_on){
						directionsDisplay = new google.maps.DirectionsRenderer({
												map: _GT.map,
												suppressMarkers: true,
												preserveViewport: true,
												polylineOptions: lineOpts
											});
						directionsDisplay.setDirections(thisOrigin.directions);
					}else{
						if(directionsDisplay !== null && typeof(directionsDisplay) != "undefined"){
							directionsDisplay.setMap(null);
							directionsDisplay = null;
							if(captionWidget.activeRouteIndex>=0 && captionWidget.activePoiIndex>=0 && _GT.origins[captionWidget.activeRouteIndex].poi[captionWidget.activePoiIndex])
								_GT.origins[captionWidget.activeRouteIndex].poi[captionWidget.activePoiIndex].fn.bubble.close();
						}
					}
				};
				thisOrigin.togglePoi = function(_on){
					_GT.each(origin.poi, function(i, o){ o.fn.mark.setVisible(_on) });
				};
				thisOrigin.toggleMark = function(_on){
					_on || thisOrigin.toggleBubble(_on);
					thisOrigin.mark.setVisible(_on);
				};
				thisOrigin.toggleBubble = function(_on){
					if(_on){
						if(!thisOrigin.bubble.getVisible()){
							_GT.each(_GT.origins, function(i, o){ 
								(o&&o.fn==thisOrigin) || o.fn.toggleBubble(false); 
							});
							thisOrigin.bubble.open(_GT.map, thisOrigin.mark);
							thisOrigin.mark.setIcon(mapData.imgPath+"destination-marker-active.png");
						}
					}else{
						thisOrigin.bubble.close();
					}
				};
				thisOrigin.setRouteVisibility = function(v, external){ //console.log(v, external, thisOrigin);
						if(external){
							if(!v){
								thisOrigin.toggleMark(false);
								thisOrigin.togglePoi(false);
								thisOrigin.toggleRoute(false);
							}
						}else{
							_GT.each(_GT.origins, function(i, o){ 
								if(thisOrigin.originIndex!==o){
									if(v){
										o.fn.setRouteVisibility(false, true);
									}else{
										o.fn.togglePoi(false);
										o.fn.toggleRoute(false);
										o.fn.toggleMark(true); 
										o.fn.active=false;
									}
								}
							});
							thisOrigin.toggleMark(true);
							thisOrigin.toggleRoute(v);
							thisOrigin.togglePoi(v);
						}

						thisOrigin.active = v;
					};
				
				bubbleDiv.innerHTML = ['<div class="box-bg"><img src="'+origin.imgThumb+'"></div>',
											'<div class="bubble-text">',
												'<h4 class="single-line-text">'+origin.title+'</h4>',
											'</div>'].join('');

				thisOrigin.bubble = new InfoBox({
					 content: bubbleDiv,
					 boxClass: "infoBox styled-infobox",
					 disableAutoPan: mightBeIE,
					 zIndex: null,
					 maxWidth: 300,
					 boxStyle: {
						background: "#443141",
						opacity: 0.95,
						width: "300px",
						height: "225px"
					},
					pixelOffset: new google.maps.Size(-150, -280),
					visible: true,
					closeBoxMargin: "0px",
					enableEventPropagation: true,
					closeBoxURL: mapData.imgPath+"close.png",
					infoBoxClearance: new google.maps.Size(35, 35)
				});
				thisOrigin.bubble.onRemove = (function(originalOnRemove){
					return function(){
						originalOnRemove.apply(this, arguments);
						thisOrigin.mark.setIcon(mapData.imgPath+"destination-marker.png");
					};
				})(thisOrigin.bubble.onRemove);

				google.maps.event.addListener(thisOrigin.mark, 'click', function(){
					thisOrigin.toggleBubble(true);
					//_GT.map.panTo(thisOrigin.pos);
				});

				origin.fn = thisOrigin;
				_GT.activeOrigins.push(_GT.origins[sk]);
			};

			for(var sk = 0; sk < _GT.origins.length; sk++) new setupOrigin(sk);

			function setupExtraOrigins(sk){
				var origin = _GT.extraOrigins[sk], 
					thisOrigin = this;
				thisOrigin.active = false;
				thisOrigin.originIndex = _GT.origins.length+sk;
				thisOrigin.pos = new google.maps.LatLng(origin.lat,origin.lng);
				thisOrigin.mark = new google.maps.Marker({
						position: thisOrigin.pos,
						map: _GT.map,
						icon: origin.icon,
						title: origin.title
					});
				thisOrigin.toggleRoute = function(_on){
					if(_on){
						directionsDisplay = new google.maps.DirectionsRenderer({
												map: _GT.map,
												suppressMarkers: true,
												preserveViewport: true,
												polylineOptions: lineOpts
											});
						directionsDisplay.setDirections(thisOrigin.directions);
					}else{
						if(directionsDisplay !== null && typeof(directionsDisplay) != "undefined"){
							directionsDisplay.setMap(null);
							directionsDisplay = null;
						}
					}
				};
				thisOrigin.togglePoi = function(_on){ };
				thisOrigin.toggleMark = function(_on){
					thisOrigin.mark.setVisible(_on);
				};
				thisOrigin.setRouteVisibility = function(v, external){
					if(external){
						if(!v){
							thisOrigin.toggleMark(false);
							thisOrigin.toggleRoute(false);
						}
					}else{
						_GT.each(_GT.origins, function(i, o){ 
							if(thisOrigin.originIndex!==o){
								if(v){
									o.fn.setRouteVisibility(false, true);
								}else{
									o.fn.toggleRoute(false);
									o.fn.toggleMark(true); 
									o.fn.active=false;
								}
							}
						});
						thisOrigin.toggleMark(true);
						thisOrigin.toggleRoute(v);
					}
					thisOrigin.active = v;
				};

				function genPolyLine(){
					var waypts = [], p;
					_GT.each(origin.poi, function(i, o){ waypts.push({location: o.fn.position, stopover: true}) });
					var request = {
							origin: thisOrigin.pos,
							destination: markerPos,
							waypoints: waypts,
							optimizeWaypoints: true,
							travelMode: google.maps.TravelMode.WALKING
						};
					directionsService = new google.maps.DirectionsService(); 
					directionsService.route(request, function(response, status) {	//console.log(response, directionsDisplay); 
						if (status == google.maps.DirectionsStatus.OK) {
							thisOrigin.directions = response;
						}
					});

				}; genPolyLine();

				google.maps.event.addListener(thisOrigin.mark, 'click', function(){
					//thisOrigin.setRouteVisibility(!thisOrigin.active);
				});

				origin.fn = thisOrigin;
				_GT.origins.push(origin);
			};
			//for(var sk = 0; sk < _GT.extraOrigins.length; sk++) new setupExtraOrigins(sk);

			function genExtraPoints(){
				function extraPoint(p){
					var thisPoint = this, obj = mapData.extraPoints[p];
					thisPoint.position = new google.maps.LatLng(obj.lat, obj.lng);
					thisPoint.mark = new google.maps.Marker({
								position: thisPoint.position,
								map: _GT.map,
								icon: mapData.imgPath+"parking-icon.png",
								title: obj.title,
								visible: true
							});
					thisPoint.mark.poiIndex = p;

					obj.fn = thisPoint;
				};

				for(var p = 0; p < mapData.extraPoints.length; p++) new extraPoint(p);
			};
			//genExtraPoints();

			_GT.fitBounds();

			google.maps.event.addListenerOnce(_GT.map, 'idle', function(){	
				console && console.log("It's Time.");
				mapData.onRender.call(_GT);
			});
		};
		
		gtMap.initMap(confxg);
	};
	
})(this, document, jQuery);
;
