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
})( jQuery );