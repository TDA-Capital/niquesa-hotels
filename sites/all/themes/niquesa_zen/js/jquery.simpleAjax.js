/*!
 * jQuery.Sax {simpleAjax} - v0.9 - 22/05/2013
 * http://www.nathanroyal.com/
 * Copyright (c) 2013 Nathan Johnson
 * licensed under the Creative Commons Attribution-ShareAlike license.
 */
 
/**
 @description Turn a simple site into an ajax powered web app

 @requres jQuery 1.4.3 or higher.

 @example $.Sax();     
 @desc	  Nice and simple. Run Sax on the window with the default options .
		  Sax should be called as early in your scrpt as possible for best use.

 @example $.Sax({pageselector: "#content", antiAjaxList: ['/registration', "/some/other/url/where/ajax/is/forbidden"], callback: function(newUrl){console.log(newUrl)}});
 @desc 	  Sax accepts a single parameter which is an object containing various options.

 @example $(window).trigger("saxreload");
 @desc 	  Once initialized, sax will respond to the "saxreload" custom event which acts like an ajax version of location.reload().

 @option String linkSelector
		 Default value is "a", and Sax will listen for click events on elements matching this selector, and attempt to retrieve a href attribute. Elements should have a href value to avoid errors.

 @option String linkFilter
		 Sax will ignore links which meet the conditions in this string.
		 default: '[target="_blank"], [href^="http://"], [href^="https://"],[href^="mailto:"], [href^="tel:"]'.

 @option String pageSelector
		 Default value is "#page", and Sax will look for this element, and replace its contents with the xhr response.
		 This is the selector used to target the element containing the page data we will be swapping data in and out of.
		 This should be a unique identifier, and your server should always return this element.
		 You can configure your server to only return the content element for ajax requests.
		 Ajax requests will be sent with a parameter of ?ajaxReq=1 to identify them.
 
 @option Boolean bounceLanding
		 If a user enters the site at a page that is not the site root, by default Sax will fix the path by reloading the root and navigating to the page landed on.
		 To stop this behaviour set bounceLanding to false.
 
 @option Boolean updateContentClass
		 This will update the classname attribute of the content element will the classname of the matching element in the response. Defaults to true.
 
 @option Integer transitionSpeed
		 The default transition between pages is jQuery's fade transition. This option controls the speed of the fadeIn and fadeOut.
		 Later versions may support different transitions, 
		 however during ajax loading, a classname of "ajax-loading" is attached to the page content element, and the class "sax-loading" is applied to the html element.
		 If you are clever you can use this to do sexy css3 stuff.
		 You can also set transitionSpeed to 0, to prevent fadeOut/In completely, or give it a negative value to set a timeout the transition.
		 E.g: 1000 will be a fade in/out of 1 second. where -1000 will be a 1 second pause without a fade transition. This pause can be used to animate or do something else;
 
 @option Boolean stripStructure
		 True by default, set to false if server does we do not need to strip html structure because
		 your server only returns page contents on ajax calls.
 
 @option Boolean requestPage
		 True by default, set to false if you do not wish to request the new page. 
		 In this instance, Sax() will simply run your callback (onChange callback is not fired because page does not change), and will leave the document body untouched.
 
 @option Array roots
		 Array containing the paths of any directories you would like sax() to treat as if they were root of the website.
		 E.g: passing {roots: ["somepage"]} and navigating to www.yoursite.com/somepage/somewhere will load: www.yoursite.com/somepage/#!/somewhere 
 
 @option Array antiAjaxList
		 Array contaning the paths of any pages where you do not want to use ajax
		 These pajes will be navigated to normally. 
		 You can also put a partial uri here eg: ["/about"] will also apply to "/about/us" and "/about/something/else.html".
 
 @option Function callback
		 Executed on successful ajax requests. You may use this to initialise the new page content.
		 The callback function is fired on Sax() initialisation and passes the current location.
		 Receives response data.
 
 @option Function errorCallback
		 Executed on unsuccessful ajax requests. 
		 This function will recieve variables jqXHR, textStatus and errorThrown which contain data about the request.
 
 @option Function onChange
		 Executed on successful ajax requests just before the new page content is applied.
		 Your script may require an action before the old page content is removed from the DOM (e.g: removing event handlers).
		 Receives response data.
 
 @option Function beforeSend
		 Executed on before ajax requests.
		 
		When using $.Sax() if you experience a visible redirect when landing on a deep linked page (such as /page --> #!/page), 
		then you should include the following "bounce script" at, or near the top of your document <head/>:
			<script type="text/javascript">
				var _p=window.location.pathname; _p&&"/"!==_p&&(window.location="/#!"+_p);
			</script>
		Unless of course, you have set the "bounceLanding" option to false.
		
		More advanced bounce script enabling multiple roots:
			<script type="text/javascript">
				var _SAXIFY=true, 
					_p=window.location.pathname,
					_SAX_VETO = /^(\/|\/admin|\/user)$/,
					_SAX_ROOTS = ["it", "fr"];	//configure $.Sax before the page loads - like a BOSS.
				(function(){
					var _path = ""+window.location.pathname,//+window.location.hash,
						s,
						i=-1,
						atRoot = _path&&_path== "/",
						foundRoot = false,
						splitPaths = function(root){
							var hasSlash = _path.indexOf("/"+root+"/")==0,
								r = "/"+root+(!hasSlash? "" : "/"); 
							return {root: r, pathSubstring: _path.substring(0, r.length), newPath: _path.replace(r, "")}
						};
					
					if(!atRoot){
						while(!foundRoot && ++i<_SAX_ROOTS.length){
							s=splitPaths(_SAX_ROOTS[i]);
							
							atRoot = atRoot? atRoot : s.pathSubstring===_path;
							foundRoot = foundRoot? foundRoot : s.pathSubstring===s.root;
							
							if(_SAXIFY && foundRoot && !atRoot){
								window.location = s.root+"#!/"+s.newPath+window.location.hash;
							}
						}
						if(_SAXIFY && !foundRoot && !_SAX_VETO.test(_p)){
							window.location = '/#!'+_path+window.location.hash;
						}
					}
				})();
			</script>
 */
 
(function(window, document, $){
	$.Sax = function(options){
	
		var opt = $.extend({
				linkSelector: "a",
				linkFilter: '[target="_blank"], [href^="http://"], [href^="https://"],[href^="mailto:"], [href^="tel:"], .sax-ignore',
				pageSelector: "#page",
				transitionSpeed: 400,
				bounceLanding: true,
				updateContentClass: true,
				antiAjaxList: [],
                stripStructure: true,
                loadConditionRefresh: 100,
				loadCondition: function(){return true},
				beforeSend: function(){return;},
				callback: function(){return;},
				onChange: function(){return;},
				errorCallback: function(){alert("We were unable to find that. Please try again.")},
				loaderOn: function(){return;},
				loaderOff: function(){return;},
				roots: []
			}, options || {}),

            alcTimer = null,
			applyLoadCondition = function(){
                clearTimeout(alcTimer);
                if(opt.loadCondition())
                    opt.loaderOff();
                else
                    alcTimer = setTimeout(function(){ applyLoadCondition() }, opt.loadConditionRefresh);
			},

			checkPath = function(p){
				var path = (p[0] !== "/")? "/"+p : p, i;
				for(i=0; i < opt.antiAjaxList.length ;i++){
					if(path.indexOf(opt.antiAjaxList[i]) == 0) return false;
				}
				for(i=0; i < opt.roots.length ;i++){
					if(path.indexOf("/"+opt.roots[i]) == 0) return false;
				}
				return true;
			},
			
			_path = ""+window.location.pathname,//+window.location.hash,
			_siteUrl = location.protocol+"//"+location.hostname,
			
			s,
			i=-1,
			atRoot = _path&&_path== "/",
			foundRoot = false,
			splitPaths = function(root){
				var hasSlash = _path.indexOf("/"+root+"/")==0,
					r = "/"+root+(!hasSlash? "" : "/"); 
				return {root: r, pathSubstring: _path.substring(0, r.length), newPath: _path.replace(r, "")}
			};
		
		if(!atRoot){
			while(!foundRoot && ++i<opt.roots.length){
				s=splitPaths(opt.roots[i]);
				
				atRoot = atRoot? atRoot : s.pathSubstring===_path;
				foundRoot = foundRoot? foundRoot : s.pathSubstring===s.root;
				
				if(opt.bounceLanding && foundRoot && !atRoot)
					window.location = s.root+"#!/"+s.newPath+window.location.hash;
				
				if(foundRoot){
					if(!atRoot) 
						_path = (s.newPath.charAt(0)=="/")? s.newPath : "/"+s.newPath;
					//if(_path.slice(-1)=="/") 
					//	_path = _path.substring(0, s.root.length-1);
					if(_path.slice(-1)!=="/") 
						_path = _path+"/";
				}
			}
			if(opt.bounceLanding && !foundRoot && checkPath(_path))
				window.location = '/#!'+_path+window.location.hash;
		}
		
		function getPage(initLoad){
			var uri = window.location.hash;
			if(uri.indexOf("#!") == 0 || uri == ""){
				uri = (uri == "" && _path == "/")? _path : uri.replace("#!", "");
				
				if((typeof initLoad == "boolean" && initLoad) || !opt.requestPage){
					opt.callback.call(window, uri);
				}else{
					opt.beforeSend();
					opt.loaderOn();
					var xri = (function(anh){return (anh.slice(-1)!="/")? anh+"/" : anh;})(uri.replace(/^\//, '')),
						pageContent = $(opt.pageSelector),
						fade = opt.transitionSpeed,
						gp = function(){
							   $.ajax({
									url: _siteUrl + _path + (xri=="/"? "" : xri),
									dataType: 'html',
									type: 'GET',
									data: {ajaxReq: 1},
									success: function (response){
										var r = (opt.stripStructure)? $(response) : $('<html />').html(response);
										opt.onChange(r);
										var title = response.match("<title>(.*?)</title>"),
											newContent = r.find(opt.pageSelector),
											html = newContent.html(),
											contentClass = newContent.attr("class"),
											pageClass = ($("body", r).length)? $("body", r).attr("class") : "";
										
										if(title && title[1])
											document.title = title[1].replace("&amp;", "&");
											
										(pageClass&& pageClass.length) && $("body").attr("class", pageClass);
										pageContent.removeClass("ajax-loading").html(html);
										if(opt.updateContentClass) pageContent.attr("class", contentClass);
										$("html").removeClass("sax-loading");
										
										fade>0 && pageContent.animate({opacity:1}, fade);
										opt.callback.call(window, uri, r);

                                       applyLoadCondition();
									},
									error: function(jqXHR, textStatus, errorThrown){
										pageContent.removeClass("ajax-loading");
										$("html").removeClass("sax-loading");
										fade&&fade>0 && pageContent.animate({opacity:1}, fade);
										typeof opt.errorCallback === "function" && opt.errorCallback(jqXHR, textStatus, errorThrown);
										opt.loaderOff();
									}
								});
							};
					
					pageContent.addClass("ajax-loading");
					$("html").addClass("sax-loading");
					if(fade > 0)
						pageContent.animate({opacity:0}, opt.transitionSpeed, gp);
					else if(fade < 0)
						var timer = setTimeout(gp, -fade);
					else
						gp();
				}
			}
		};

		getPage((window.location.hash.length<=0 || window.location.hash == "#!/")? true : false);

		if('onhashchange' in window  && (document.documentMode === undefined || document.documentMode > 7 )){
			window.onhashchange = getPage;
		}else{
			var oldHref = window.location.hash, timer;
			timer && clearInterval(d.variables.timer);
			timer = setInterval(function(e){
									var newHref = window.location.hash;
									if(newHref !== oldHref){
										oldHref = newHref;
										getPage();
									}
								}, 100);
		};
		
		$(window).bind("saxreload", getPage);

		$(document).delegate(opt.linkSelector, "click.Sax", function(event){
			var h = $(this).attr("href")? $(this).attr("href") : "#",
				hrf = h.replace(_siteUrl, ""),
				compareToRoot = function(){
					var slash = h.indexOf("/")==0?"":_siteUrl;
					return (h.indexOf(slash) == 0) && h.indexOf(slash+_path) !== 0;
				},
				href;
			if(hrf === "#"){ 
				event.preventDefault(); return false; 
			}
			if(hrf.charAt(0)!=="/"){
				hrf = "/"+hrf;
			}
			href = hrf.replace(_path, "");
			if(compareToRoot() || (href=="/" && hrf!==_path && hrf+"/"!==_path)){
				return true;
			}
			
			//if(href[0] !== "#" && !$(this).clone().attr("href", hrf).is(opt.linkFilter) && checkPath(href)){
			if(href[0] !== "#" && !$(this).is(opt.linkFilter) && checkPath(href)){
				event.preventDefault();
				
				nuHash = (href.indexOf("#!/") == 0)? href : "#!/" + href;
				
				if(!(nuHash == "#!/" && window.location.hash == "")){
					window.location.hash = nuHash;
				}
				return false;
			}
		});
	
	}
})(window, document, jQuery);