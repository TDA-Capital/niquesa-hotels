/*
saxDefault ajax framework
Version 1.0
Nathan Johnson
*/
(function ($, Drupal, window, document, undefined) {

	// To understand behaviors, see https://drupal.org/node/756722#behaviors
	Drupal.behaviors.my_custom_behavior = {
	  attach: function(context, settings) {

		// Place your code here.

	  }
	};

	var browserIs = (function(b, d, ua){
			d.setAttribute('data-useragent',  ua);					// To use in css:
			d.setAttribute('data-platform', navigator.platform );	// html[data-useragent*='Chrome/13.0'][data-platform='Win32'] //hits chrome12 on windows
			b.IE = (/msie/i.test(ua) && parseFloat)? parseFloat(navigator.appVersion.split("MSIE")[1]) : -1;
			b.Webkit = (b.IE==-1 && (/Chrome/.test(ua) || /Safari/.test(ua)));
			b.Opera = (b.IE==-1 && !b.Webkit && /opera/i.test(ua));
			b.IOS = ua.match(/(iPad|iPhone|iPod)/i) || false;
			b.Mobile = ((" " + document.documentElement.className + " ").replace(/[\n\t]/g, " ").indexOf("mobile-browser") > -1);
			b.mediaQueries = (typeof window.Modernizr == "undefined")? 0 : (Modernizr.mq('only all'))? 1 : -1;
			b.touch = 'ontouchstart' in document.body;
			return b;
		})({}, document.documentElement, navigator.userAgent);

	var Site = window.Site = {
		mainPage: 'home',
		subPage: '',
		tertianPage: '',
		currentUri: '',
		prevUri: '',
		animateReady: 0,
		fontsLoaded: 0,
		animationDuration: 700,
		body: $(document.body),
		contentBody: $('#content_body'),
		mainNav: $('#block-system-main-menu .menu'),
		webFonts: "none",
		temp_html: ($('#temp_html').length)? $('#temp_html').css('opacity', 0) : $('<div id="temp_html"></div>').css('opacity', 0).appendTo("body"),
		saxify: (typeof _SAXIFY == "boolean")? _SAXIFY : true,
		stripStructure: false,
		ignoreTrailers: true,
		unsafeToLink: ["/user", "/admin", "/node"],
		fx: "fade-down fade-right rotate-out-up-left rotate-out-up-right rotate-out-down-left rotate-out-down-right flip-out-y flip-out-x zoom-in zoom-out zoom-out-spin",
		flags: {landing: true, transformer: (Modernizr.csstransforms3d && Modernizr.csstransitions), thresholds: {"mobile": 700, "tablet": 1024, "backgroundImg": 1400}},
		belowThresh: function(lvl){ var w = Site.position.oldW || $(window).width(); return w <= Site.flags.thresholds[lvl]; },
		loader: new function(){
					var cSpeed=7;
					var cWidth=40;
					var cHeight=40;
					var cTotalFrames=12;
					var cFrameWidth=40;
					var cImageSrc='/sites/all/themes/mof/css/images/482.png'; //Only these need updating
					
					var cImageTimeout=false,
						cIndex=0,
						cXpos=0,
						cPreloaderTimeout=false,
						FPS,
						SECONDS_BETWEEN_FRAMES=0,
						readi = false,
						ani=false,
						$img =  $('<div id="loaderImage"/>').css({width: cWidth+'px', height: cHeight+'px', "position": "fixed", "top": "50%", "left": "50%", "margin": '-'+(cHeight/2)+'px 0 0 -'+(cWidth/2)+'px', "z-index": "100", "display": "none"}).appendTo('body'),
						img = $img[0],
						imageLoader = function(i, src){	//Pre-loads the sprites image
							clearTimeout(cImageTimeout);
							cImageTimeout=0;
							genImage = new Image();
							genImage.onload=function (){
								i.style.backgroundImage='url('+src+')';
								readi=true;
							};
							genImage.onerror=new Function('alert(\'Could not load the image\')');
							genImage.src=cImageSrc;
						};
					function startAnimation(){
						if(readi){
							if(!ani){
								FPS = Math.round(100/cSpeed);	//FPS = Math.round(100/(maxSpeed+2-speed));
								SECONDS_BETWEEN_FRAMES = 1 / FPS;
								cPreloaderTimeout=setTimeout(function(){continueAnimation();}, SECONDS_BETWEEN_FRAMES/1000);
							}
							ani=true;
							$img.stop(true).fadeIn(Site.animationDuration);
						}
					}
					function continueAnimation(){
						cXpos += cFrameWidth;
						cIndex += 1;	//increase the index so we know which frame of our animation we are currently on
						if (cIndex >= cTotalFrames) cXpos = cIndex=0;	//if our cIndex is higher than our total number of frames, we're at the end and should restart
						if(img) img.style.backgroundPosition=(-cXpos)+'px 0';
						cPreloaderTimeout=setTimeout(function(){continueAnimation();}, SECONDS_BETWEEN_FRAMES*1000);
					}
					function stopAnimation(){//stops animation
						$img.fadeOut(Site.animationDuration, function(){
							clearTimeout(cPreloaderTimeout);
							cPreloaderTimeout=false;
							ani=false;
						});
					}
					imageLoader(img, cImageSrc);
				
					this.on = function(){ startAnimation(); };
					this.off = function(){ stopAnimation(); };
				},

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
			
			var tfmr = Site.flags.transformer;
			// !tfmr && Site.contentBody.addClass("notransition").removeClass(Site.fx);
			
			Site.animateSite();
			$(window).on("resize.position", Site.position);
			if(Site.saxify){
				var transEndEventNames = {
						'WebkitTransition' : 'webkitTransitionEnd',
						'MozTransition'    : 'transitionend',
						'OTransition'      : 'oTransitionEnd otransitionend',
						'msTransition'     : 'MSTransitionEnd',
						'transition'       : 'transitionend'
					},
					transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
				$.Sax({
					pageSelector: Site.contentBody.selector, 
					callback: changeFunc, 
					antiAjaxList: Site.unsafeToLink, 
					transitionSpeed: Site.animationDuration,
					updateContentClass: false,
					stripStructure: false,
					requestPage: true,
					beforeSend: function(){
						//if(tfmr){
						//	document.body.style.overflow = "hidden";
						//	window.getComputedStyle(document.body).overflow;
						//}
						$('html, body').animate({ scrollTop: 0 }, 1000);
					},
					onChange: function(response){
						Pages.pageProto("*", "exit", true, true);
						Pages.pageProto(Site.currentUri, "exit", true, true);
					}//,
					//loaderOn: Site.loader.on,
					//loaderOff: Site.loader.off
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
				callback = function(){
					Site.animateReady = 1;
				}
				
			if($('.page_bg').length){
				$('.'+(Site.belowThresh("backgroundImg")? "page_bg" : "page_bg_large")+' > img').lazyImage(function(){Site.flags.backgrounds = true});
			}else{
				Site.flags.backgrounds = true;
			}
			
			if(iteration > giveUpAfter || (Util.areFontsLoaded() && Site.flags.backgrounds) ){
				callback();
			}else{
				setTimeout(function(){Site.animateSite(iteration+1)}, 100);	
			}
		},

		animateContent: function(){
			var delay = 0;
			
			if( Site.animateReady ){
				var callback = function(){
					Site.temp_html.html('');
					
					Site.position();
					Site.setupElements();

					Pages.pageProto("*", "setup", true, true);
					Pages.pageProto(Site.currentUri, "setup", true, true);
					
					Pages.pageProto("*", "animateContent", true, true);
					Pages.pageProto(Site.currentUri, "animateContent", true, true);
				}

				//if ($('.preload > img', Site.temp_html).length){
				//	 $('.preload > img').lazyImage(callback);
				//}else{
					callback();
				//}
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
			if ( browserIs.IE && browserIs.IE < 9) {
				var links = $('a, .inputbutton');
				for( var i = 0; i < links.length; i++ )
					links[i].onfocus = function(){ this.blur(); }
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
			setup: function(){
				$(".v-center", Site.contentBody).verticalCenter({onParent: true});
				
				var bgz = $('.'+(Site.belowThresh("backgroundImg")? "page_bg" : "page_bg_large")+' > img', Site.contentBody),
					bgzSecondary = Modernizr.backgroundsize? $('.'+(Site.belowThresh("backgroundImg")? "page_bg_secondary" : "page_bg_secondary_large")+' > img', Site.contentBody) : [];
					
				if(bgz.length){
					bgz.lazyImage(
						{eachLoad: function(){ }}, 
						function(e, j){
							var set = this, a = [];
							this.each(function(i, n){ a.push(n.src); });
							if(a.length){
								if(browserIs.Mobile || Site.belowThresh("tablet")) Site.body.css({"background-image":"url("+a[0]+")", "background-size":"cover", "background-position":"50% 50%", "background-attachment":"fixed"});
								else $.backstretch(a, {duration: 5000, fade: 750});
							}
						}
					);
				}else{
					var bs = Site.body.data('backstretch');
					if(bs){ 
						bs.$wrap.fadeOut("fast", function(){ bs && bs.destroy(false); });
					}else{ 
						Site.body.css("background-image", "none");
					}
				}
				
				if(bgzSecondary.length){
					bgzSecondary.lazyImage(
						{eachLoad: function(){
							var i = this, p = $(i).parent().parent();
							p.addClass("hasSecondaryBackground").css({"background-image":"url("+i.src+")", "background-size":"cover", "background-position":"50% 50%", "background-attachment":"scroll"});
						}}
					);
				}
			},
			position: function(W, H, oldW, oldH){
				if(Site.belowThresh("mobile")) $(".screensized", Site.contentBody).css("min-height", H+"px");
				else $(".screensized", Site.contentBody).height(H);
			},
			animateContent: function(){
				if(Site.flags.landing){
					if($(document.documentElement).hasClass("rfl-load")){
						Site.contentBody.fadeTo(Site.animationDuration, 1);
						$(document.documentElement).removeClass("rfl-load");
					}
					$('.menu').slicknav({closeOnClick: true, prependTo: $("#header")});
					Site.flags.landing = false;
				}
			},
			exit: function(){  }
		},
		"/": {
			setup: function(){
				var homeOb = Pages[Site.currentUri];
					homeOb.v = {
						interactive: $('.homepage-interactive-section', Site.contentBody), 
						sections: $('.homepage-section', Site.contentBody), 
						scrlNav: $('<ul />').attr("id","scrollNav").hide()
					},
					controller = $.superscrollorama(),
					oldie = browserIs.IE>0 && browserIs.IE<9;
				if(Site.belowThresh("tablet") || oldie){
					homeOb.v.interactive.hide();
					
					var mobileSection = $(".homepage-mobileonly-section", Site.contentBody),
						appStages = $(".faux-interactive", mobileSection),
						readySection = function(section){
							if(!section.data("im-loaded")){
								var i = appStages.index(section),
									last = (i+1==appStages.length),
									nxt = last? homeOb.v.sections.eq(1) : appStages.eq(i+1),
									nxtBtn = $(".scroll-down-link", section).click(function(e){ Util.preventEvent(e); Util.scrlTo(nxt, 1500, -60); }),
									scrns = $(".app-screens",section);
								
								if(scrns.length && $("img", scrns).length>1){
									var imgs = $("img", scrns), l=imgs.length, w = imgs.width(), c=(l-1), o, t, twn;
									t = setInterval(function(){
											o=c; 
											c = (c+1)<l? c+1 : 0;
											imgs.eq(o).css({"z-index": 2});
											twn = TweenMax.fromTo(imgs.eq(c).css({"z-index": 3}), 1, {x: 1-w}, {x: 0, ease: Expo.easeOut, onComplete: function(){ imgs.eq(o).css({"z-index": 1}); }});
										}, 3000);
								}
								scrns.length && TweenMax.fromTo(Util.invisibility(scrns), 1, {css:{opacity: 0}}, {css:{opacity: 1}});
								section.data("im-loaded", true).addClass("ready");
							}
						};
						homeOb.v.sections = homeOb.v.sections.add(mobileSection);
					oldie && mobileSection.removeClass("tablet-only mobile-only").show();
					
					homeOb.v.sections.each(function(i, s){
						var watcher = scrollMonitor.create(s, -(scrollMonitor.viewportHeight/2));
						if(i==2||i==3){
							watcher.enterViewport(function(){
								//upd(); 
								if(i==3) Site.body.addClass("dark-style"); 
								else if(i==2){
									//if(watcher.isAboveViewport){
									//	controller.addTween($(s), TweenMax.fromTo($('.catch-fish', s), 1, {css:{left:"50%"}}, {css:{left:"0%"}, ease: Expo.easeOut}), (scrollMonitor.viewportHeight/2));
									//	controller.addTween($(s), TweenMax.fromTo($('.catch-hook', s), 1, {css:{right:"50%"}}, {css:{right:"0%"}, ease: Expo.easeOut}), (scrollMonitor.viewportHeight/2));
									//}else{
										controller.addTween($(s), TweenMax.fromTo($('.catch-fish', s), 1, {css:{left:"0%"}}, {css:{left:"50%"}, ease: Expo.easeIn}), (scrollMonitor.viewportHeight/2));
										controller.addTween($(s), TweenMax.fromTo($('.catch-hook', s), 1, {css:{right:"0%"}}, {css:{right:"50%"}, ease: Expo.easeIn}), (scrollMonitor.viewportHeight/2));
									//}
								}
							});
							watcher.exitViewport(function(){ 
								if(i==3) Site.body.removeClass("dark-style");
							});
						}
						$(s).data("section-index", i).data("watcher", watcher);
					});
					
					$("img[data-imgsrc]", mobileSection).lazyImage(
						{eachLoad: function(){ var section = $(this).parents(".faux-interactive"); readySection(section); }}, 
						function(){
							$("img[data-imgsrc]", homeOb.v.sections.filter(".selected-catches-section")).lazyImage(
								{fade: 0, eachLoad: function(){ /*Util.invisibility($(this), true);*/ }}, 
								homeOb.setupGallery
							);
						}
					);
				}else{
					homeOb.v.sections = homeOb.v.sections.add(homeOb.v.interactive);
					homeOb.v.appStages = $(".appstage", homeOb.v.interactive).hide();
					homeOb.v.iphone = $("#iphone", homeOb.v.interactive);
					homeOb.v.appScreens = Util.invisibility($(".app-screens", homeOb.v.iphone));
					homeOb.v.appIcons = Util.invisibility($("#appstage_icons", homeOb.v.interactive));
					
					homeOb.v.sections.each(function(i, s){
						var watcher = scrollMonitor.create(s, -(scrollMonitor.viewportHeight/2)), 
							navLink = $('<button title="Go to section '+(1+i)+'." />').click(function(e){ Util.scrlTo($(s), 1500); }).appendTo(homeOb.v.scrlNav).wrap("<li />"), 
							upd = function(){
								$("button", homeOb.v.scrlNav).add(homeOb.v.sections).removeClass("active");
								navLink.add($(s)).addClass("active");
							};
						if(i==0 || i==3){
							watcher.enterViewport(function(){ 
								upd(); 
								Site.body.addClass("dark-style"); 
								//homeOb.v.iphone.stop().fadeIn();
							});
							watcher.exitViewport(function(){ 
								Site.body.removeClass("dark-style");
								//homeOb.v.iphone.stop().fadeOut();
							});
						}else{ 
							watcher.enterViewport(upd); 
							if(i==2){
								controller.addTween($(s), TweenMax.fromTo($('.catch-fish', s), 1, {css:{left:"0%"}}, {css:{left:"50%"}, ease: Expo.easeIn}), (scrollMonitor.viewportHeight/2));
								controller.addTween($(s), TweenMax.fromTo($('.catch-hook', s), 1, {css:{right:"0%"}}, {css:{right:"50%"}, ease: Expo.easeIn}), (scrollMonitor.viewportHeight/2));
							}
						}
						$(s).data("section-index", i).data("watcher", watcher);
					});
					
					function setupInteractivity(){
						var stgs = homeOb.v.appStages;
							
						stgs.each(function(i, s){
							var $s = $(s),
								last = (i+1==stgs.length),
								nxt = last? homeOb.v.sections.eq(1) : stgs.eq(i+1).parent(),
								nxtBtn = $(".scroll-down-link", s).click(function(e){ Util.preventEvent(e); Util.scrlTo(nxt, 1500); }),
								watcher = scrollMonitor.create($s.parent(), -(scrollMonitor.viewportHeight/2)),
								stageName = $s.data("app-stage") || [],
								screens = i? homeOb.v.appScreens.filter('.'+stageName) : "",
								twxxn = {},
								desc = Util.invisibility($(".app_desc", $s)),
								scrolled = false,
								link = stageName.length? $("."+stageName, homeOb.v.appIcons).click(function(e){ Util.preventEvent(e); Util.scrlTo($s.parent(), 1500); }) : [];
							
							watcher.enterViewport(function(){	//console.log("entering:", stageName);
								$("li", homeOb.v.appIcons).removeClass("active");
								stageName.length && link.addClass("active");
								if(i>0){
									scrolled = true;
									twxxn.stage = TweenMax.fromTo(
													Util.invisibility($s), 
													0.5, 
													{opacity: 0}, 
													{opacity: 1, onComplete: function(){TweenMax.fromTo(desc, .5, {opacity: 0}, {opacity: 1})}, onReverseComplete: function(){ $s.hide(); Util.invisibility(desc); }}
												);
									twxxn.screen = TweenMax.fromTo(screens, 1, {opacity: 0}, {opacity: 1});
								}
							});
							
							watcher.exitViewport(function(){	//console.log("exiting:", stageName);
								if(scrolled && i>0){
									scrolled = false;
									twxxn.stage.reverse();
									twxxn.screen.reverse();
								}
							});
							
							if(i==0){
								controller.pin($s.fadeIn(700), $s.outerHeight(), {
								  anim: (new TimelineLite())
									.append([
									  TweenMax.fromTo(homeOb.v.iphone, 1, {css:{top: "114%"}}, {css:{top: "50%"}}),
									  TweenMax.fromTo($('.hgroup', s), 1, {opacity: 1}, {opacity: 0})
									])
									.append(
									  TweenMax.fromTo(homeOb.v.appIcons, 0.4, {opacity: 0}, {opacity: 1})
									)
								});
							}else if(i==1){
								/*controller
									.addTween($s, TweenMax.fromTo(homeOb.v.iphone, 1, {css:{top: "114%"}}, {css:{top: "50%"}}), $s.outerHeight(), 0-$s.outerHeight())
									.addTween($s, (new TimelineLite()).append([
														  TweenMax.fromTo($('.interactive-1 .hgroup'), 0.6, {opacity: 1}, {opacity: 0})
														])
														.append(
														  TweenMax.fromTo(homeOb.v.appIcons, 0.4, {opacity: 0}, {opacity: 1})
														), $s.outerHeight(), 0-$s.outerHeight());*/
							}else if(last){
								homeOb.v.scrlNav.appendTo(Site.contentBody).fadeIn(1500);
								homeOb.v.iphone.fadeIn(3000);
							}
							
							$s.data("watcher", watcher);
							$s.addClass("ready");
							
							if(i && $("img", screens).length>1){
								var imgs = $("img", screens), l=imgs.length, w = imgs.width(), c=(l-1), o, t, twn;
								t = setInterval(function(){
										o=c; 
										c = (c+1)<l? c+1 : 0;
										imgs.eq(o).css({"z-index": 2});
										twn = TweenMax.fromTo(imgs.eq(c).css({"z-index": 3}), 1, {x: 1-w}, {x: 0, ease: Expo.easeOut, onComplete: function(){ imgs.eq(o).css({"z-index": 1}); }});
									}, 3000);
							}
						});
						homeOb.v.controller = controller;
					};
					
					$("img[data-imgsrc]",homeOb.v.interactive).lazyImage(
						{fade: 0, eachLoad: function(){ /*Util.invisibility($(this), true);*/ }}, 
						function(){
							$("img[data-imgsrc]", homeOb.v.sections.filter(".selected-catches-section")).lazyImage(
								{fade: 0, eachLoad: function(){ /*Util.invisibility($(this), true);*/ }}, 
								homeOb.setupGallery
							);
							setupInteractivity();
						}
					);
				}
			},
			position: function(W, H, oldW, oldH){
				//homeOb.v.controller && homeOb.v.controller.triggerCheckAnim();
			},
			animateContent: function(){ },
			exit: function(){ Site.body.removeClass("dark-style"); },
			setupGallery: function(images){
				var set = this, 
					panels = set.parent(), 
					gallery = set.eq(0).parents(".gallery"),
					wdt = $(window).width(), 
					slidr = $(".slidr", gallery).width(wdt*set.length+1);
				
				set.each(function(i, img){
					var $img = $(img), pnl = $img.parent();
					pnl.css({"background-image" : "url("+img.src+")", opacity: 0, width: wdt}).fadeTo(400, 1);
				});
				
				function slider(na, j){
					var htm = $("html"),
						opt = $.extend({ 
							speed: 800,
							stepSize: 1,
							carousel: 7000,
							before: 0,
							after: 0,
							buttonClick: function(slider, btn){
								slider.trigger("ezSlidr", btn.hasClass("next")? "next" : "previous");
							},
							activeClass: "active"
						}, na || {}),
						slider = gallery,
						container = slidr,
						slides = panels,
						previousBtn = $('<a href="#" class="slideBtn previous" title="Previous"></a>').insertAfter(slider),
						nextBtn = $('<a href="#" class="slideBtn next '+opt.activeClass+'" title="Next"></a>').insertAfter(slider),
						btnz = previousBtn.add(nextBtn).hide(),
						length = slides.length,
						w = wdt,
						current = -1,
						animating = false,
						t;
					
					container.width((length+1)*w);
					slider.data("ezSlidr-length", length);
					
					$( window ).resize(function() {
						w = $(window).width(); container.width(w*(set.length+1)); slides.width(w);
					});
					
					function move(target, scifi){
						if(typeof target == "string"){ 
							if(target=="next"){ target = current+opt.stepSize; }
							else if(target=="previous"){ target = current-opt.stepSize; }
						}
						if(target<0) target = 0;
						if(target>=length) target = scifi? 0 : length-1;
						if(!animating && typeof target == "number" && target!==current){
							animating = true;
							typeof opt.before == "function" && opt.before(slider, slides.eq(current), slides.eq(target));
							container.animate({marginLeft: 0-(target*w)}, opt.speed, function(){ 
								typeof opt.after == "function" && opt.after(slider, slides.eq(current), slides.eq(target));
								slides.eq(current).removeClass(opt.activeClass);
								slides.eq(target).addClass(opt.activeClass);
								current = target;
								slider.data("ezSlidr-current", current);
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
				};
				slider();
			}
		},
		"/contact": {
			setup: function(){
				var form = $(".webform-client-form", Site.contentBody), msg = $(".form-status", form).length? form.find(".form-status") : $('<div class="form-status" />').appendTo(form);
				//Util.replaceSelect(form.find(".replace-select, .form-select"));
				Util.quickValidate(form, {defaultBgColor : "#ffffff", submit: function(valid){
						if(valid){
							msg.text("Please wait. Loading...");
							$.ajax({
								type: 'POST',
								url: form.attr("action"),
								data: form.serialize(),
								success: function(response){
									$("input, textarea, select, .dd_container", form).filter(":visible").attr("disabled", "disabled").fadeTo(400, 0.4);
									msg.text("Thank you for your enquiry.");
								},
								error: function(jqXHR, textStatus, errorThrown){
									msg.text("There has been an error, please try again.");
								}
							});
						}
						return false;
					}
				});
			}
		},
		"/tutorial": {
			setup: function(){
				$(".tutorial", Site.contentBody).each(function(i, t){
					var $t = $(t),
						phone = $(".iphone", t),
						imgs = $("img", phone),
						sections = $(".tut-stage", t);
					function tutor(){
						var l=imgs.length, 
							w = imgs.width(),
							previousBtn = $('<a href="#" class="slideBtn previous" title="Previous"></a>').insertAfter(phone),
							nextBtn = $('<a href="#" class="slideBtn next active" title="Next"></a>').insertAfter(phone),
							btnz = previousBtn.add(nextBtn),//.css({opacity: 0}),
							c=0, 
							o, t, twn,
							nx = function(fwd){
									o=c; 
									//if(fwd) c = (c+1)<l? c+1 : 0;
									//else c = (c===0)? l-1 : c-1;
									c = fwd? c+1 : c-1;
									if(c == 0){ previousBtn.removeClass("active") }else{ previousBtn.addClass("active") }
									if(c == l-1){ nextBtn.removeClass("active") }else{ nextBtn.addClass("active") }
									
									imgs.eq(o).css({"z-index": 2});
									twn = TweenMax.fromTo(
											imgs.eq(c).css({"z-index": 3, opacity: 1}), 
											1, 
											{x: 1-w}, 
											{x: 0, 
												ease: Expo.easeOut, 
												onComplete: function(){ imgs.eq(o).css({"z-index": 1, opacity: 0}); }
											}
										);
									sections.eq(o).fadeOut(function(){
										TweenMax.fromTo(sections.eq(c).fadeIn(), .5, {y: 30}, {y: 0});
									});
								};
							twn = TweenMax.fromTo(imgs.eq(c), 1, {opacity: 0}, {opacity: 1, ease: Expo.easeOut}); 
							TweenMax.fromTo(sections.eq(c).fadeIn(), .5, {y: 30}, {y: 0});
							//TweenMax.fromTo(
								btnz.click(function(e){
									Util.preventEvent(e); $(this).hasClass("active") && nx($(this).hasClass("next"));
								})
							//, 1, {opacity: 0}, {opacity: 1, ease: Expo.easeOut});
					};
					imgs.lazyImage(
						{eachLoad: function(){
							Util.invisibility($(this), true)
						}},
						tutor
					);
				});
			}
		}
	};
	
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
		
		scrlTo: function (el, s, o) {
			var sp = s || Site.animationDuration, _o = (typeof(o)=="number")? o : 0; $('html, body').animate({ scrollTop: (el.offset().top+_o) }, sp, "easeOutSine");
		},
		
		invisibility: function(el, forceDisplayBlock){
			el.css(forceDisplayBlock? {opacity:0, "display": "block"} : {opacity:0});
			return forceDisplayBlock? el : el.show();
		},
		
		preventEvent: function(e, stopImmediate){
			e.preventDefault(); e.stopPropagation();
			stopImmediate && e.stopImmediatePropagation();
			return e;
		},
		
		stripTrailers: function(uri){ return uri.replace(/(\?|#).*/, '');  },
		stripFileExt: function(uri){ return uri.substr(0, uri.lastIndexOf('.')) || uri; },

		areFontsLoaded: function(){
			if(typeof Util.areFontsLoaded.fontchecks == "undefined"){
				Util.areFontsLoaded.fontchecks = {
					"typekit": function(){return $('html').hasClass('wf-active')}
				}
			}
			var check = Util.areFontsLoaded.fontchecks;
			return Site.flags.fonts = (Site.webFonts && check[Site.webFonts])? check[Site.webFonts]() : true;
		},
		
		quickValidate: function(forms, naj){
			var opt = $.extend({ 
				invalidClass: "invalid",
				msgOutput : ".form-status",
				submit : function(valid){return valid}
			}, naj || {});
			forms.each(function(){
				var form = $(this), 
					formAction = form.attr("action"),
					stat = $(opt.msgOutput, form);
				if(!stat.length) stat = $('<div class="form-status" />').appendTo(form);
				if(formAction.indexOf("?ajax_req=1")){
					formAction=formAction.replace("?ajax_req=1", "");
					form.attr("action", formAction);
				}
				
				form.submit(function(){
					var formValid = true,
						messages = "";
					
					$('input:not(:submit, :reset, :button), textarea, select', form).each(function(i, n){ 
							var $n=$(n), v = true;
							if($n.is(".required, [required]") && !$n.val()){ 
								formValid = v = false; 
								messages += '<div>'+$n.attr("name")+' is a required field.</div>'; 
							}
							if($n.is("[type=email]") && $n.val().indexOf("@")<1){ 
								formValid = v =false; 
								messages += '<div>'+$n.attr("name")+' must be in email format.</div>'; 
							}
							
							if(!v) $n.addClass(opt.invalidClass);
							else $n.removeClass(opt.invalidClass);
						});
					
					stat.html('');
					if( !formValid ) stat.html(messages);
					return opt.submit(formValid);
				});
			});
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
		
		cssAbility: function(properties){							//Depends entirely on modernizr
			if(window.Modernizr && properties && properties.length){
				if(typeof properties == "string"){
					return Modernizr[properties] || false;
				}else{
					for(var p=0, l=properties.length; p<l ;p++){
						if(!Modernizr[properties[p]])
							return false;
					}
				}
				return true	
			}else{
				return false;
			}
		},
		
		polyfills: (function(){
			Array.prototype.lastIndexOf||(Array.prototype.lastIndexOf=function(d){if(null==this)throw new TypeError;var c=Object(this),b=c.length>>>0;if(0===b)return-1;var a=b;1<arguments.length&&(a=Number(arguments[1]),a!=a?a=0:0!=a&&(a!=1/0&&a!=-(1/0))&&(a=(0<a||-1)*Math.floor(Math.abs(a))));for(b=0<=a?Math.min(a,b-1):b-Math.abs(a);0<=b;b--)if(b in c&&c[b]===d)return b;return-1});
			"function"!=typeof String.prototype.startsWith&&(String.prototype.startsWith=function(a){return this.slice(0,a.length)==a});
			"function"!==typeof String.prototype.endsWith&&(String.prototype.endsWith=function(a){return-1!==this.indexOf(a,this.length-a.length)});
		})(),
		
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
									mapTypeId: google.maps.MapTypeId.ROADMAP
								},
								map = new google.maps.Map(mapData.map, mapOptions),
								markerPos = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),
								marker = new google.maps.Marker({
									position: markerPos,
									map: map,
									icon: mapData.opt.icon || null,
									title: mapData.locTitle
								});
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

	$(Site.init);

})(jQuery, Drupal, this, this.document);
