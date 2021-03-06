/*
saxDefault ajax framework
Version 1.0
Nathan Johnson
*/
(function (window, document, $, _script){
	//"use strict";

	var browserIs = (function(b, d, ua){
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
				var pre = ( Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']) )[1],
					dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
				return { dom: dom, lowercase: pre, css: '-' + pre + '-', js: pre[0].toUpperCase() + pre.substr(1) };
			})(window.getComputedStyle(document.documentElement, ''));
			return b;
		})({}, document.documentElement, navigator.userAgent);
		
	var Util = window.Util = {
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
		
		polyfills: (function(){
			Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(d){if(null==this)throw new TypeError;var c=Object(this),b=c.length>>>0;if(0===b)return-1;var a=b;1<arguments.length&&(a=Number(arguments[1]),a!=a?a=0:0!=a&&(a!=1/0&&a!=-(1/0))&&(a=(0<a||-1)*Math.floor(Math.abs(a))));for(b=0<=a?Math.min(a,b-1):b-Math.abs(a);0<=b;b--)if(b in c&&c[b]===d)return b;return-1});
			"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){return this.slice(0,a.length)==a});
			"function"!==typeof String.prototype.endsWith&&(String.prototype.endsWith=function(a){return-1!==this.indexOf(a,this.length-a.length)});
			"function"!=typeof Object.create&&function(){var b=function(){};Object.create=function(a){if(1<arguments.length)throw Error("Second argument not supported");if(null===a)throw Error("Cannot set a null [[Prototype]]");if("object"!=typeof a)throw TypeError("Argument must be an object");b.prototype=a;return new b}}();
			Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,f=!{toString:null}.propertyIsEnumerable("toString"),c="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),g=c.length;return function(b){if("object"!==typeof b&&("function"!==typeof b||null===b))throw new TypeError("Object.keys called on non-object");var d=[],a;for(a in b)e.call(b,a)&&d.push(a);if(f)for(a=0;a<g;a++)e.call(b,c[a])&&d.push(c[a]);return d}}());
		})(),

		stripTrailers: function(uri){ return uri.replace(/(\?|#).*/, '');  },
		stripFileExt: function(uri){ return uri.substr(0, uri.lastIndexOf('.')) || uri; },
		
		convertObjectToArray: function(o, a){
				if(o instanceof Array) return o;
				var a = a || [];
				for(u in o) a.push(o[u]);
				return a;
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

		loadScript: function(src, callback){
			var script = document.createElement('script');

			script.type = 'text/javascript';
			script.async = true;
			if(typeof callback == "function")
				script.onload = callback;
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
		},

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

	var Site = window.Site = {
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
		flags: {
			landing: true, 
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
			thresholds: {"mobile": 640, "tablet-portrait": 800, "tablet": 1048}
		},
		belowThresh: function(lvl){ var w = Site.position.oldW || $(window).width(); return w <= Site.flags.thresholds[lvl]; },
		onWinLoad: (function(){
			$(window).on( "load", function(){ Site.onWinLoad.loaded = true });
			return function(fn){
				if(Site.onWinLoad.loaded) fn.call();
				else $(window).on("load", fn);
			};
		})(),
		assetPath: _script.src.substring(0, _script.src.indexOf("js/")),

		init: function(){
			Pages.init();
			
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
			if(Site.saxify){
				$.Sax({
					pageSelector: Site.contentBody.selector, 
					callback: changeFunc, 
					antiAjaxList: Site.unsafeToLink, 
					transitionSpeed: tfmr? -500 : 1000,
					stripStructure: false,
					requestPage: true,
					beforeSend: function(){
						$('html, body').animate({ scrollTop: 0 }, 1000, "easeOutSine");
						if(false&&tfmr){  //Not this time
							bodyOverflow = document.body.style.overflow;
							document.body.style.overflow = "hidden";
							window.getComputedStyle(document.body).overflow;
						}
					},
					onChange: function(response){
						Pages.pageProto("*", "exit", true, true);
						Pages.pageProto(Site.currentUri, "exit", true, true);
						setTimeout(function(){
							if(false&&tfmr) {
								//var fx = Site.fx.split(" "), i = Math.floor(Math.random()*fx.length);
								//Site.contentBody.removeClass(fx.join()).addClass(fx[i>0? i-1 : 0]);
								document.body.style.overflow = bodyOverflow;
							}
						}, 600);
					}
				});
			}else{
				changeFunc(window.location.pathname);
			}
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
				p = Pages.pageProto(Site.currentUri, "position");
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

				Pages.pageProto("*", "setup", true, true);
				Pages.pageProto(Site.currentUri, "setup", true, true);
				
				Pages.pageProto("*", "animateContent", true, true);
				Pages.pageProto(Site.currentUri, "animateContent", true, true);
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

	var Pages = window.Pages = {
		pCache: {},
		init: function(){
			Pages["/home"] = Pages["/"];
			
			var Pagekeys = [];
			for(var k in Pages) (k!=="*" && k.endsWith("*")) && Pagekeys.push(k.substring(0, k.length-1));
			
			Pages.pageProto = function(page, fn, returnFN, executeFN){
				if(page && page != ""){
					page = (page!=="/" && page.endsWith("/"))? page.substring(0, page.length-1) : page;
					var pk = Pagekeys, 
						matches,
						i=0,
						l=pk.length,
						finalMatch = [],
						pageCached = Pages.pCache[page]? true : false;
				
					if(pageCached){
						matches = Pages.pCache[page];
					}else{
						matches = Pages[page]? [Pages[page]] : [];
						for(; i<l ;i++){
							if(page.startsWith(pk[i])) 
								matches.push(Pages[pk[i]+"*"]);
						}
						Pages.pCache[page] = matches;
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
							if(k.startsWith(flag)){ 
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
							if(k.startsWith(flag)){ 
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
					if($(".hidden-region .main-nav", Site.contentBody).length){
						Site.hotelNav.html($(".hidden-region .main-nav", Site.contentBody).html());
						$(".menu", Site.hotelNav).slicknav({prependTo: $(".menu-col", Site.$header), closeOnClick: true});
					}
					if($(".hidden-region .brand-nav", Site.contentBody).length){
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
					function heroModule(i, n){
						var mod = this; 
						mod.i = i; 
						mod.n = n;
						mod.init();
					};
					heroModule.prototype = {
						init: function(){
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

							Site.onWinLoad(function(){ mod.setBg() });
						},
						setBg: function(){
							var mod = this;
							if(mod.$bgImg.length){
								mod.$head.each(function(i, n){
									$(n).backstretch($(".background-img", n).attr("data-imgsrc") || $(".background-img", n).attr("src"), {fade: mod.anim})
									.on("backstretch.after", function (e, instance, index) {
											mod.$hero.addClass("ready")
										});
								});
							}else{
								mod.$hero.addClass("ready");
							}
						}
					};

					function suitesLandingHero(i, n){
						var mod = this;
						mod.setBg = function(){
							var tabLabels = $(".hero-tab-labels li", n),
								tabContents = $(".hero-tabs .hero-tab", n),
								currentTabIndex = tabLabels.index(".active") || 0;

							$(".lazy-img", tabContents).lazyImage({identifier: "lazy-img"}, function(){
								function switchTab(newTabIndex){
									if(newTabIndex!==currentTabIndex){
										tabLabels.removeClass("active").eq(newTabIndex).addClass("active");
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

								tabLabels.each(function(i, n){
									$(n).on("click", function(e){ switchTab(i) });
								});
								tabContents.eq(currentTabIndex).addClass("active");
								Site.flags.transformer || tabContents.not(":eq("+currentTabIndex+")").hide();
								$(mod.n).backstretch($(".background-img", tabContents.eq(currentTabIndex)).attr("src"), {fade: 1200});
								mod.$hero.addClass("ready");
							});
						};

						heroModule.call(mod, i, n);
					};
					suitesLandingHero.prototype = Object.create(heroModule.prototype);

					function groupHomeLandingHero(i, n){
						var mod = this;

						function setUpDestinationSelector(){
							var $ds = $(".destinationSelector", n),
								$slides = $(".hero-slide", $ds),
								destinationsBtn = $(".landing-slide .hero-button", $ds).click(function(e){
									Util.preventEvent(e); slideTo("destinations-slide");
								}),
								destinationsBackBtn = $(".destinations-slide .hero-button", $ds).click(function(e){
									Util.preventEvent(e); slideTo("landing-slide");
								}),
								hotelsBackBtns = $(".hotels-slide .hero-button", $ds).click(function(e){
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

						mod.setBg = function(){
							$(".background-img", mod.n).lazyImage({identifier: "lazy-img"}, function(){
								$(mod.n).backstretch($(".background-img", n).attr("src"), {fade: 1200});
								mod.$hero.addClass("ready");
								setUpDestinationSelector();
							});
						};

						heroModule.call(mod, i, n);
					};
					groupHomeLandingHero.prototype = Object.create(heroModule.prototype);

					function heroSliderModule(i, n){
						var mod = this;
						mod.i = i; 
						mod.n = n;
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

						mod.init();
					};
					heroSliderModule.prototype = {
						init: function(i, n){
							var mod = this, 
								headOffset = 155;
							mod.$hero = $(mod.n);
							mod.$head = $(".hero-module-head", mod.n);
							mod.anim = 800;

							mod.$head.height(Site.windowSizeMonitr.height - headOffset);

							Site.windowSizeMonitr.callbacks["tmp.heroes-"+mod.i] = function(event, prvWidth, prvHeight, width, height){
								mod.$head.height(height-headOffset);
							};

							Site.onWinLoad(function(){ mod.setBg(); });
						}
					};


					$(".hero-module").each(function(i, n){
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
						Site.scrlMonitr.callbacks["tmp.function-room-menu-"+i] = function(event, prvPosition, newPosition, direction){
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
							$ez;

						Site.onWinLoad(function(){ $(".lazy-img", $slides).lazyImage({identifier: "lazy-img", fade: 500}) });

						$ez = $(".ezSlidr", n).ezSlidr({
							speed: 700,
							stepSize: 1,
							respond: false,
							eeze: "easeInOutCirc",
							carousel: 8000,
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
							if (currentSlideIndex < 0) currentSlideIndex = 0;
							showSlide();
						}

						function nextSlide(){
							currentSlideIndex++;
							// if (currentSlideIndex > numSlides) currentSlideIndex = numSlides;
							showSlide();
						}

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
						$(".slide .background-img", jack.wrap('<div class="rfl-load" />')).lazyImage({identifier : "lazy-img"}, function(){
							if(fbJack){
								$slides.each(function(i, s){
										$(s).height("100%").backstretch($(".background-img", s).attr("src"));
									})
									.not(":eq(0)").hide(); 
							}else{
								$slides.each(function(i, s){
									$(s).css({
										"background-image" : "url("+$(".background-img", s).attr("src")+")", 
										"background-size" : "cover", 
										"background-position":"50% 50%", 
										"background-attachment":"fixed"
									});
								});
							}
							jack.parent().removeClass("rfl-load");
							$slideNav = jackScroll(jack.fadeTo(500, 1), fbJack);
							$slideNav.css("margin-top", (0-($("li",$slideNav).length*30)/2)+"px").hide().appendTo($copy).fadeIn(1500);
						});
					});
				});
				
				if($(".menu-scroll", Site.contentBody).length) Site.scrollingMenu();	
				
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
								$feature = $(n).data({"active": true, "loaded": false, "filterIndex": i}).height(Site.windowSizeMonitr.width*heightRatio),
								activeInd = 0,
								slideNav = $(".slideNav ul", n),
								slides = $(".slide", n).each(function(){ slideNav.append('<li></li>'); }),
								imgSlides = $(".img-slide", n).css({opacity: 0, "display" : "block"}),
								slideFt = function(ind){
									if(!slideFt.a){
										slideFt.a=true;
										slides.eq(activeInd).fadeOut();
										imgSlides.eq(activeInd).fadeTo(400, 0, function(){
											slides.eq(ind).fadeIn();
											imgSlides.eq(ind).fadeTo(400, 1, function(){slideFt.a=false});
										});
										activeInd=ind;
										$(".active", slideNav).removeClass("active");
										$("li", slideNav).eq(activeInd).addClass("active");
									}
								};

							Site.windowSizeMonitr.callbacks["tmp.homepageFeature-"+i] = function(event, prvWidth, prvHeight, width, height){
								$feature.height(width*heightRatio);
							};

							Site.scrlMonitr.callbacks["tmp.homepageFeatureLoader."+i] = function(event, prvPosition, newPosition, direction){
								if($feature.data("active") && Site.scrlMonitr.scrolledPast($feature, newPosition+Site.windowSizeMonitr.height)){
									$(".lazy-img", n).lazyImage({identifier: "lazy-img"}, function(){
										 this.each(function(i, n){
											 if(Modernizr.backgroundsize) $(n).parent().css({"background-image": "url("+$(n).attr('src')+")"});
											 else $(n).parent().backstretch($(n).attr('src'));
										 });
									 });
									$feature.data("loaded", true);
									Site.scrlMonitr.freshen("tmp.homepageFeatureLoader."+i);

									$("li", slideNav).click(function(e){ Util.preventEvent(e); slideFt($("li", slideNav).index(this)); }).eq(0).addClass("active");
									slideFt(0);
								}
							};

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
					
					$(".a-button.scroll-to, .discover-more-btn .scroll-to", Site.contentBody).on("click.scroll-to", function(e){
						Util.preventEvent(e);
						Site.scrlMonitr.scrollTo($(this), 500, $(this).outerHeight(true));
					});
					
				});
				
				$(".fakeDrop", Site.contentBody).fakeDrop({eezeDown: "easeOutExpo"});
			},
			exit: function(){
				
				if(!_RFLload) Pages["*"].initialize();
				Site.scrlMonitr&&Site.scrlMonitr.freshen("tmp.");
				Site.windowSizeMonitr&&Site.windowSizeMonitr.freshen("tmp.");
				$(".scroll-menu", Site.$mainFooterBar).remove();
				$("#supersized.ss-visible").removeClass("ss-visible").fadeTo(600, 0).empty();
				if(typeof Site.flags.ignoreScroll != "boolean" || Site.flags.ignoreScroll==true){
					Site.$header.trigger("activxte");
				}
				
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
				
			},
			destinations: function(){
				var mod = $("#gtMap_module");
				
				if(Site.belowThresh("mobile")){
					alert("Destinations are not available on mobiles.");
					$("#personalizeFilter").hide();
				}else if(mod.length && gtMapJSON){ //console.log(gtMapJSON);
					var filter = $("#personalizeFilter", mod),
						setH = function(e, inxt){setH.initH = setH.initH || filter.height(); ( mod.css("padding-top", inxt? setH.initH : filter.height() )+"px")};
					mod.height(Site.windowSizeMonitr.height).on("adjustViewport", setH).trigger("adjustViewport");
					Site.windowSizeMonitr.callbacks["tmp.gtMap_module"] = function(e, pW, pH, w, h){  mod.height(h); };
					Site.$header.trigger("de-activxte");
					
					var origins = gtMapJSON,//JSON.parse(document.getElementById("test").textContent),
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
									$(".gt-subtitle",rm.overlayContent).html(o.subTitle);
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
						
						_GT.each(_GT.origins, function(i, o){
							$(".bubble-text", o.fn.bubble.content_).on("click", function(e){ 
									readmore.showDetail(o);
								});
						});
						
					};
					
					var gt = new gtMap({
									mapId: "gtMap_canvas", 
									title: "Petersham Nurseries", 
									lat: 41.902587, /*51.447254*/ 
									longd: 12.479739, /*-0.302837*/ 
									assetPath: Site.assetPath+"js/vendor/", 
									imgPath: Site.assetPath+"img/destinations/", 
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
	
	
	$(Site.init);

})(this, document, jQuery, (function(s){ return s[s.length-1] })(document.getElementsByTagName('script')));
