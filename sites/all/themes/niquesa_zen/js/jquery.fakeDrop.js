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
