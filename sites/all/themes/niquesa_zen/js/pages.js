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
