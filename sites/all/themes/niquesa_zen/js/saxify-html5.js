/*!
 * jQuery saxify-html5
 * Based on https://github.com/browserstate/ajaxify v1.0.1
 * dependencies:
 *   jQuery 1.5+, History.js
 */

(function(window, document, $){

    $.saxify = function(options){

        // Check to see if we should allow plugin for this browser
        if( !(window.history && history.pushState) && !options.allowFallback ) return false;

        // Check to see if History.js is enabled for this Browser
        if( !window.History || !window.History.enabled ) return false;

        var History = window.History,
            cache = {},
            opt = $.extend({
                // Links...
                linkSelector: "a",
                linkFilter: '[target="_blank"], .sax-ignore, .no-ajaxy',

                // Forms
                formSelector: "",                                       // This is deliberately left empty as we will not activate ajax form submission by default
                formFilter: "",

                // force some pages to reload...
                nonAjaxPages: [],

                // Optionally pass parameters in request.
                defaultRequestData: {},									// This can be overridden per request
                requestType: "GET",
                requestHeaders: {},

                // Transitions...
                fade: 600,												// fadeIn/Out transition. Can be bypassed by using negative value
                scrollTop: 0,											// To scroll to the top of the page after load, use a positive value here
                scrollSpeed: 800,
                scrollEase: 'swing',

                // callbacks...
                beforeSend: function(contentTarget, jqXHR, settings){ return; },
                beforeReplace: function(contentTarget, contentHtml, data, textStatus, jqXHR){ return; },
                successCallback: function(contentTarget, relativeUrl, contentHtml, data, textStatus, jqXHR){ return; },
                errorCallback: function(contentTarget, jqXHR, textStatus, errorThrown){ alert("We were unable to find that. Please try again."); return true; },				// Returning false here will instruct the plugin to navigate to the target url using window.location
                analyticsHandler: function(path){
                    if( typeof window._gaq !== 'undefined' ) window._gaq.push(['_trackPageview', path]);
                    else if( typeof window.ga !== 'undefined' ) window.ga('send', 'pageview', {'page': path});
                },
                // This function will update many typical nav stuctures. Customise using the selectors below or override completely
                navHandler: function(url, relativeUrl, relativeUrl_Root){
                    if($menu.length){
                        var $menuChildren = $menu.find(opt.menuChildrenSelector);
                        $menuChildren.filter(opt.activeSelector).removeClass(opt.activeClass);
                        $menuChildren = $menuChildren.has('a[href^="'+relativeUrl+'"],a[href^="'+relativeUrl_Root+'"],a[href^="'+url+'"]');
                        if( $menuChildren.length === 1 ) $menuChildren.addClass(opt.activeClass);
                    }
                },

                // Selectors...
                contentSelector: '#content_body',				        // Default page load element

                menuSelector: '#menu,.menu,#nav,nav:first,.nav:first',	// Common menu arrangements
                activeSelector: '.active,.selected,.current,.youarehere',
                activeClass: 'active selected current youarehere',
                menuChildrenSelector: '> li,> ul > li',

                scriptSelector: '.document-script',						// Scripts with this tag can be loaded within the content body. This can only be changed to a list of ID's.
                contentLoadingClass: 'ajax-loading-element',			// This class will be added to the target element of the current request
                pageLoadingClass: 'ajax-load-page',						// This class will be added to the <html/> element during full page (default) ajax requests
                loadingClass: 'ajax-load',							    // This class will be added to the <html/> element during ALL ajax requests. Use the callbacks for anything more specific

                updateContentAttributes: true,                          // Update css class of the content target element on load. Could be extended to other attributes.
                updateBodyAttributes: true,                             // Update css of document body on load. Only applies where a full page load is done.

                // We can cache server responses so queries are not duplicated.
                useCaching: true,										// Set to false if your content changes frequently

                // Use custom events to let your scripts know about the page load, instead of (or in addition to) callback...
                completedEventName: 'statechangecomplete'				// This event fires after request is complete and content replaced, but before successCallback and tracking update
            }, options || {});

        var $content = $(opt.contentSelector).filter(':first'),
            contentNode = $content.get(0),
            $menu = $(opt.menuSelector).filter(':first'),
            $window = $(window),
            $body = $(document.body),
            rootUrl = History.getRootUrl(),
            addRootToPath = function(p){ return (p.indexOf("/")===0? "":"/")+p; },
            ajaxAllowed = function(path){
                path = path.replace(/^\/|\/$/g, '').replace(rootUrl, '');
                path = addRootToPath(path);
                for(var l=opt.nonAjaxPages.length, i = (path==rootUrl)? l+1: 0; i<l; i++)
                    if(path.indexOf(opt.nonAjaxPages[i]) == 0) return false;
                return true;
            },
            rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        // Ensure Content
        if ( $content.length === 0 ) $content = $body;

        // Internal Helper
        $.expr[':'].saxifies = function(obj, index, meta, stack){
            if(typeof(obj.href)!="string") return false;
            var $this = $(obj),
                url = ( $this.attr('href') || $this.data("ajax-href") ) || '',
                isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;			// Check link
            return ( 0!=url.indexOf("#") ) && isInternalLink && !$this.is(opt.linkFilter) && ajaxAllowed(url);
        };

        // HTML Helper
        var documentHtml = function(html){
            // Prepare
            var result = String(html);
            if( -1==result.indexOf('<html') )
                result = '<html><head></head><body>'+ result +'</body></html>';
            result = result.replace(/<\!DOCTYPE[^>]*>/i, '')
                .replace(/<(html|head|body|title|meta)([\s\>])/gi,'<div class="document-$1"$2')
                .replace(/<\/(html|head|body|title|meta)\>/gi,'</div>');

            result = result.replace(/<script/gi, ' <!-- <script').replace(/\/script>/gi, '/script> --> ');          //We'll get these later.

            return $.trim(result);
        };

        // Setup the state data for this request
        var getRequestParameters = function($this, stateData){
            if($this.data("ajax-use-cache")!=undefined) stateData.useCache = $this.data("ajax-use-cache");
            if($this.data("ajax-content-target")) stateData.contentTarget = $this.data("ajax-content-target");
            if($this.data("ajax-load-fullpage")!=undefined) stateData.fullPage = $this.data("ajax-load-fullpage");
            else if(stateData.contentTarget && $(stateData.contentTarget)[0] !== contentNode) stateData.fullPage = false;
            stateData.requestData = $this.data("ajax-requestData") || opt.defaultRequestData;
            if($this.data("ajax-historyData")) stateData.historyData = $this.data("ajax-historyData");
            stateData.requestType = $this.data("ajax-requestType") || opt.requestType;
            stateData.requestHeaders = $this.data("ajax-requestHeaders") || opt.requestHeaders;
            return stateData;
        };

        // Ajaxify clicks
        var ajaxClick = function(event){
            // Continue as normal for cmd clicks etc. Check if this is a valid link.
            if ( event.which == 2 || event.metaKey || !$(this).is(":saxifies") ) { return true; }

            var $this = $(this),
                url = $this.attr('href') || $this.data("ajax-href"),
                title = $this.attr('title') || null,
                stateData = {ajaxClick: true, fullPage: true, requestData: null, historyData: null},
                ajaxOnClick = null;

            // Optionally set a function on the clickable element as a data attribute.
            // This function will receive the element's click event and must return true (if you use it) to continue processing
            // Because it runs first you can use it to change other jquery data associated with the element
            if(typeof $this.data("ajax-onclick") == "function"){
                ajaxOnClick = $this.data("ajax-onclick");
                if(!ajaxOnClick.call(this, event)) return true;
            }

            //We are good to go. Don't execute default action
            event.preventDefault();

            // Some properties of a request can be set using data attributes on the link
            stateData = getRequestParameters($this, stateData);

            // Ajaxify this link
            if(stateData.fullPage) History.pushState(stateData,title,url);
            else makeRequest({data: stateData}, url);

            return false;
        };
        $body.on("click", opt.linkSelector, ajaxClick);

        // Ajaxify form submits
        var ajaxForm = function(event){
            var $this = $(this),
                url = $this.attr("action"),
                method = $this.attr("method"),
                ajaxOnSubmit = null,
                stateData = {ajaxForm: true, requestType: method, fullPage: true, requestData: null, historyData: null},
                formData;
            if( !ajaxAllowed(url) ) return true;
            //We are good to go. Don't execute default action
            event.preventDefault();

            // Optionally set a callback function on the form as a data attribute.
            // This function will receive the submit event and must return true (if you use it) to continue submit action
            // You can use it to validate or change data associated with the form
            if(typeof $this.data("ajax-onsubmit") == "function"){
                ajaxOnSubmit = $this.data("ajax-onsubmit");
                if(!ajaxOnSubmit.call(this, event)) return false;
            }

            // Some properties of a request can be set using data attributes on the form
            stateData = getRequestParameters($this, stateData);

            // Add the form data to the requestData so it can be sent to the server via ajax
            formData = $this.serializeArray();
            for(var i=0; i<formData.length; i++)
                $.extend(stateData.requestData, formData[i] || {});

            // Ajaxify this form
            if(stateData.fullPage) History.pushState(stateData,null,url);
            else makeRequest({data: stateData}, url);

            return false;
        };

        if(opt.formSelector.length) $body.on("submit", opt.formSelector, ajaxForm);


        var request = function(State, url){
            var r = this,
                ajaxAnimationComplete = true,							// Set a flag for this request's animation
                target = (State.data && State.data.contentTarget)? State.data.contentTarget : opt.contentSelector;

            if(!$(target).length) return;

            r.requestStatus = 0;										// Status of the request. 0= not made, 1= awaiting response, 2= recieved.
            r.responseArgs = [];

            r.State = State;
            r.url = url || State.url;
            r.relativeUrl = r.url.replace(rootUrl,'');
            r.targetSelector = target;
            r.contentTarget = $(target).filter(":first");
            r.fullPageLoad = (r.State.data && typeof(r.State.data.fullPage)!="undefined")? r.State.data.fullPage : true;
            r.animOut = function(){
                ajaxAnimationComplete = false;
                // Set Loading
                $(document.documentElement).addClass(opt.loadingClass);
                r.contentTarget.addClass(opt.contentLoadingClass);
                r.fullPageLoad && $(document.documentElement).addClass(opt.pageLoadingClass);
                // Start fade out or wait
                if(opt.fade>0) r.contentTarget.addClass(opt.contentLoadingClass).animate({opacity:0}, opt.fade, function(){ ajaxAnimationComplete = true; });
                else setTimeout(function(){ ajaxAnimationComplete = true; }, Math.abs(opt.fade));
            };
            r.animIn = function(){
                // Complete the change
                if(r.fullPageLoad && opt.scrollSpeed>=0) $('html, body').animate({ scrollTop: opt.scrollTop }, opt.scrollSpeed, opt.scrollEase);
                // Start fade in or wait
                $(document.documentElement).removeClass(opt.loadingClass);
                r.contentTarget.removeClass(opt.contentLoadingClass);
                r.fullPageLoad && $(document.documentElement).removeClass(opt.pageLoadingClass);
                if(opt.fade>0) r.contentTarget.removeClass(opt.contentLoadingClass).stop(true, true).animate({opacity:1},opt.fade);
            };
            r.completeRequest = function(State, url){
                if(r.responseArgs.length){
                    r.animOut();
                    r.requestStatus = 2;
                    successFn.apply(r, r.responseArgs);
                }else{
                    r = new request(State, url);
                }
            };

            if(!r.State.data.ajaxClick && !ajaxAllowed(url)){ 			// We do not want pages in the nonAjaxPages list to be ajax loaded using browser back/forward
                document.location.href = r.url;	                    	// No need to do this after a click event
                return false;
            }

            function successFn(data, textStatus, jqXHR){

                // Check back later if we are still loading or our animation is incomplete
                if(!ajaxAnimationComplete || r.requestStatus === 1){
                    var thisReq = this,
                        Rgs = arguments;
                    setTimeout(function(){ successFn.apply(thisReq, Rgs) }, 100);
                    return;
                }else if(r.requestStatus !== 2){
                    return;
                }

                // Store args so we can cache
                r.responseArgs = arguments;

                var $data = $(documentHtml(data)),
                    $dataBody = $data.find('.document-body:first'),
                    $dataContent = $data.find(r.targetSelector).filter(':first'),
                    scripts = $dataContent[0].innerHTML.match(rscript) || [],
                    contentHtml = $dataContent.length? $dataContent.html() : $data.html();

                if( !contentHtml ) {
                    if(r.fullPageLoad) document.location.href = r.url;
                    else alert("There was an error reading the response. Please try again.");
                    return false;
                }

                opt.beforeReplace(r.contentTarget, contentHtml, data, textStatus, jqXHR);

                // Set cache
                if((r.State.data.useCache || opt.useCaching) && !cache[r.url]){
                    cache[r.url] = r;
                }

                // Update the meta
                if(r.fullPageLoad) {
                    document.title = $data.find('.document-title:first').text();

                    try {
                        document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
                    }
                    catch ( Exception ) { }
                }

                // Update the content attributes
                if(opt.updateBodyAttributes && $dataBody.length)
                    $("body").attr("class", $dataBody.attr("class").replace("document-body", ""));
                if(opt.updateContentAttributes)
                    r.contentTarget[0].className = opt.contentLoadingClass+" "+$dataContent.attr("class");

                // Update the content
                r.contentTarget.html(contentHtml);

                // Add the scripts
                $('<div>'+scripts+'</div>').find('script').each(function(i, s){
                    var $script = $(s), scriptText = $script.text(), scriptNode = document.createElement('script'), attributes = s.attributes || [];

                    if(scriptNode.src && scriptNode.src.length)
                        scriptNode.src = $script.attr('src');
                    for (var c=0; c < attributes.length; c++)
                        $(scriptNode).attr(attributes[c].name, attributes[c].value);

                    scriptNode.appendChild(document.createTextNode(scriptText));
                    r.contentTarget[0].appendChild(scriptNode);
                });

                opt.successCallback(r.contentTarget, addRootToPath(r.relativeUrl), contentHtml, data, textStatus, jqXHR);
                r.contentTarget.trigger(opt.completedEventName);		//We fire this event on the element which was updated instead of $window
                r.animIn();

                if(r.fullPageLoad){
                    // Update the menu
                    opt.navHandler(r.url, r.relativeUrl, addRootToPath(r.relativeUrl));

                    // Inform Analytics of the change
                    opt.analyticsHandler.call(this, addRootToPath(r.relativeUrl));
                }

            };

            function errorFn(jqXHR, textStatus, errorThrown){

                if(opt.errorCallback(r.contentTarget, jqXHR, textStatus, errorThrown))
                    document.location.href = r.url;
                r.animIn();
                return false;

            };

            function $ajax(){
                $.ajax({
                    url: (r.url.slice(-1)!="/")? r.url+"/" : r.url,
                    data: r.State.data.requestData,
                    type: r.State.data.requestType,
                    headers: r.State.data.requestHeaders,
                    beforeSend: function(jqXHR, settings){
                        r.requestStatus = 1;
                        opt.beforeSend(r.contentTarget, jqXHR, settings);
                    },
                    success: function(){
                        r.requestStatus = 2;
                        successFn.apply(this, arguments);
                    },
                    error: function(){
                        r.requestStatus = -1;
                        errorFn.apply(this, arguments);
                    }
                });
            };

            // Ajax Request the Page
            r.animOut();
            $ajax();

        };


        // Do clever caching if you like
        var makeRequest = function(State, url){
            if((State.data.useCache || opt.useCaching) && cache[url]) cache[url].completeRequest(State, url);
            else new request(State, url);
        }


        // Hook into State Changes
        $window.on('statechange', function(){
            var State = History.getState(),
                url = State.url;
            State.data.requestData = State.data.requestData || null;
            State.data.historyData = State.data.historyData || null;

            makeRequest(State, url);
        });


    };

})(window, document, jQuery);