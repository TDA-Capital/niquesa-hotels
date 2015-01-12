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
}(jQuery));