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
}(jQuery));