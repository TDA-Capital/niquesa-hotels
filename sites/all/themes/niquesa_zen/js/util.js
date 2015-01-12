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
