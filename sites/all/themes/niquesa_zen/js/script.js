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
