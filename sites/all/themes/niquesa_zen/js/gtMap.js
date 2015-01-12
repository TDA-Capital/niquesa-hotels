/*
gtMap
Version 0.3.5
Nathan Johnson
*/
(function (window, document, $, undefined){
	
	var gtMap = window.gtMap = function(confxg){
		
		var gtMap = this, isArray = function(o){return !!(o.length || Object.prototype.toString.call(o) === '[object Array]') };
		
		if (!Object.keys) Object.keys = function(o) {	//Object.keys polyfill
				if (o !== Object(o)) throw new TypeError('Object.keys called on a non-object');
				var k=[],p;
				for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
				return k;
			};
		
		gtMap.convertObject = function(o, a){
			if(isArray(o)) return o;
			var u, a = a || [], k = Object.keys(o);
			for(u=0; u<k.length; u++)
				if(o.hasOwnProperty(k[u])) a.push(o[k[u]]);
			return a;
		};
		
		gtMap.loadScript = function(src, callback){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = src;
			document.getElementsByTagName('head')[0].appendChild(script);
			if(typeof(callback)=="function") script.onload = callback(script);
		};
		
		gtMap.initMap = function(confxg){
			function setLoc(){
				var map = document.getElementById(confxg.mapId), mapData = new Object;
				mapData.map = map;
				mapData.locTitle = confxg.title;
				mapData.locLatitude = confxg.lat;
				mapData.locLongditude = confxg.longd;
				mapData.imgPath = confxg.imgPath;
				mapData.origins = gtMap.convertObject(confxg.origins);
				mapData.extraPoints = confxg.extraPoints? gtMap.convertObject(confxg.extraPoints) : [];
				mapData.extraOrigins = confxg.extraOrigins? gtMap.convertObject(confxg.extraOrigins) : [];
				mapData.mapStyle = (confxg.mapStyle && confxg.mapStyle.length)? confxg.mapStyle : [];
				mapData.onRender = confxg.onRender || function(){return;};
				return mapData;
			};
			function render(){ setTimeout(function(){ new gtMap.render(setLoc()) }, 250) };

			function loadInfoBox(skip){
				if(!window.InfoBox && !skip) setTimeout(function(){ gtMap.loadScript(confxg.assetPath+"infobox.min.js", function(){ loadInfoBox(true) }) }, 250);
				else render();
			};
			if(!window.google || !google.maps){
				window.gMapInit = loadInfoBox;
				gtMap.loadScript("http://maps.google.com/maps/api/js?sensor=false&callback=gMapInit");
			}else{
				loadInfoBox();
			}
		};
		
		gtMap.render = function(mapData){
			var _GT = this,
				mapCenter = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),		// Put the destination in the center of the new map, and set other options
				mapOptions = {
					center: mapCenter,
					zoom: 7,
					scrollwheel: true,
					//disableDefaultUI: true,
					scaleControl: false,
					zoomControl: true,
					zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
					panControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					overviewMapControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: mapData.mapStyle
				},
				lineOpts = {
					strokeColor: '#6c6651',
					visible: true,
					strokeWeight: 3
				},
				directionsDisplay,
				directionsService,
				markerPos = new google.maps.LatLng(mapData.locLatitude, mapData.locLongditude),	
				bounds = new google.maps.LatLngBounds(),
				mightBeIE = /msie/i.test(navigator.userAgent);
				
			_GT.origins = mapData.origins;
			_GT.extraOrigins = mapData.extraOrigins;
			_GT.activeOrigins = [];
			_GT.map = new google.maps.Map(mapData.map, mapOptions);		// render the map
			_GT.fitBounds = function(){ _GT.map.fitBounds(bounds); };
			_GT.marker = new google.maps.Marker({						// add marker
					position: markerPos,
					map: _GT.map,
					icon: mapData.imgPath+'hotel-marker.png',
					animation: google.maps.Animation.DROP,
					title: mapData.locTitle
				});
			
			_GT.each = function(objxct, cxllbxck){
				if(isArray(objxct)){
					for(var sk=0, k=Object.keys(objxct); sk<k.length; sk++) cxllbxck(k[sk], objxct[k[sk]]);
				}else{
					for(var sk in objxct) cxllbxck(sk, objxct[sk]);
				}
				return objxct;
			};
			
			_GT.onBubbleOpen = function(originSet, doBefore, fn){
				_GT.each(originSet, function(i, o){
					o.fn.originalBubbleOpen = o.fn.originalBubbleOpen || o.fn.bubble.open;
					
					o.fn.bubble.open = (function(originalOpen){
						return function(){
							if(doBefore) fn(i, o);
							originalOpen.apply(this, arguments);
							if(!doBefore) fn(i, o);
						};
					})(o.fn.originalBubbleOpen);
				});
			};

			function setupOrigin(sk){
				var origin = _GT.origins[sk], 
					thisOrigin = this,
					bubbleDiv = document.createElement('div');
				thisOrigin.active = false;
				thisOrigin.originIndex = sk;
				thisOrigin.pos = new google.maps.LatLng(origin.lat,origin.lng);
					bounds.extend(thisOrigin.pos);
				thisOrigin.mark = new google.maps.Marker({
						position: thisOrigin.pos,
						map: _GT.map,
						icon: mapData.imgPath+"destination-marker.png",
						//animation: google.maps.Animation.DROP,
						title: origin.title
					});
				thisOrigin.toggleRoute = function(_on){
					if(_on){
						directionsDisplay = new google.maps.DirectionsRenderer({
												map: _GT.map,
												suppressMarkers: true,
												preserveViewport: true,
												polylineOptions: lineOpts
											});
						directionsDisplay.setDirections(thisOrigin.directions);
					}else{
						if(directionsDisplay !== null && typeof(directionsDisplay) != "undefined"){
							directionsDisplay.setMap(null);
							directionsDisplay = null;
							if(captionWidget.activeRouteIndex>=0 && captionWidget.activePoiIndex>=0 && _GT.origins[captionWidget.activeRouteIndex].poi[captionWidget.activePoiIndex])
								_GT.origins[captionWidget.activeRouteIndex].poi[captionWidget.activePoiIndex].fn.bubble.close();
						}
					}
				};
				thisOrigin.togglePoi = function(_on){
					_GT.each(origin.poi, function(i, o){ o.fn.mark.setVisible(_on) });
				};
				thisOrigin.toggleMark = function(_on){
					_on || thisOrigin.toggleBubble(_on);
					thisOrigin.mark.setVisible(_on);
				};
				thisOrigin.toggleBubble = function(_on){
					if(_on){
						if(!thisOrigin.bubble.getVisible()){
							_GT.each(_GT.origins, function(i, o){ 
								(o&&o.fn==thisOrigin) || o.fn.toggleBubble(false); 
							});
							thisOrigin.bubble.open(_GT.map, thisOrigin.mark);
							thisOrigin.mark.setIcon(mapData.imgPath+"destination-marker-active.png");
						}
					}else{
						thisOrigin.bubble.close();
					}
				};
				thisOrigin.setRouteVisibility = function(v, external){ //console.log(v, external, thisOrigin);
						if(external){
							if(!v){
								thisOrigin.toggleMark(false);
								thisOrigin.togglePoi(false);
								thisOrigin.toggleRoute(false);
							}
						}else{
							_GT.each(_GT.origins, function(i, o){ 
								if(thisOrigin.originIndex!==o){
									if(v){
										o.fn.setRouteVisibility(false, true);
									}else{
										o.fn.togglePoi(false);
										o.fn.toggleRoute(false);
										o.fn.toggleMark(true); 
										o.fn.active=false;
									}
								}
							});
							thisOrigin.toggleMark(true);
							thisOrigin.toggleRoute(v);
							thisOrigin.togglePoi(v);
						}

						thisOrigin.active = v;
					};
				
				bubbleDiv.innerHTML = ['<div class="box-bg"><img src="'+origin.imgThumb+'"></div>',
											'<div class="bubble-text">',
												'<h4 class="single-line-text">'+origin.title+'</h4>',
											'</div>'].join('');

				thisOrigin.bubble = new InfoBox({
					 content: bubbleDiv,
					 boxClass: "infoBox styled-infobox",
					 disableAutoPan: mightBeIE,
					 zIndex: null,
					 maxWidth: 300,
					 boxStyle: {
						background: "#443141",
						opacity: 0.95,
						width: "300px",
						height: "225px"
					},
					pixelOffset: new google.maps.Size(-150, -280),
					visible: true,
					closeBoxMargin: "0px",
					enableEventPropagation: true,
					closeBoxURL: mapData.imgPath+"close.png",
					infoBoxClearance: new google.maps.Size(35, 35)
				});
				thisOrigin.bubble.onRemove = (function(originalOnRemove){
					return function(){
						originalOnRemove.apply(this, arguments);
						thisOrigin.mark.setIcon(mapData.imgPath+"destination-marker.png");
					};
				})(thisOrigin.bubble.onRemove);

				google.maps.event.addListener(thisOrigin.mark, 'click', function(){
					thisOrigin.toggleBubble(true);
					//_GT.map.panTo(thisOrigin.pos);
				});

				origin.fn = thisOrigin;
				_GT.activeOrigins.push(_GT.origins[sk]);
			};

			for(var sk = 0; sk < _GT.origins.length; sk++) new setupOrigin(sk);

			function setupExtraOrigins(sk){
				var origin = _GT.extraOrigins[sk], 
					thisOrigin = this;
				thisOrigin.active = false;
				thisOrigin.originIndex = _GT.origins.length+sk;
				thisOrigin.pos = new google.maps.LatLng(origin.lat,origin.lng);
				thisOrigin.mark = new google.maps.Marker({
						position: thisOrigin.pos,
						map: _GT.map,
						icon: origin.icon,
						title: origin.title
					});
				thisOrigin.toggleRoute = function(_on){
					if(_on){
						directionsDisplay = new google.maps.DirectionsRenderer({
												map: _GT.map,
												suppressMarkers: true,
												preserveViewport: true,
												polylineOptions: lineOpts
											});
						directionsDisplay.setDirections(thisOrigin.directions);
					}else{
						if(directionsDisplay !== null && typeof(directionsDisplay) != "undefined"){
							directionsDisplay.setMap(null);
							directionsDisplay = null;
						}
					}
				};
				thisOrigin.togglePoi = function(_on){ };
				thisOrigin.toggleMark = function(_on){
					thisOrigin.mark.setVisible(_on);
				};
				thisOrigin.setRouteVisibility = function(v, external){
					if(external){
						if(!v){
							thisOrigin.toggleMark(false);
							thisOrigin.toggleRoute(false);
						}
					}else{
						_GT.each(_GT.origins, function(i, o){ 
							if(thisOrigin.originIndex!==o){
								if(v){
									o.fn.setRouteVisibility(false, true);
								}else{
									o.fn.toggleRoute(false);
									o.fn.toggleMark(true); 
									o.fn.active=false;
								}
							}
						});
						thisOrigin.toggleMark(true);
						thisOrigin.toggleRoute(v);
					}
					thisOrigin.active = v;
				};

				function genPolyLine(){
					var waypts = [], p;
					_GT.each(origin.poi, function(i, o){ waypts.push({location: o.fn.position, stopover: true}) });
					var request = {
							origin: thisOrigin.pos,
							destination: markerPos,
							waypoints: waypts,
							optimizeWaypoints: true,
							travelMode: google.maps.TravelMode.WALKING
						};
					directionsService = new google.maps.DirectionsService(); 
					directionsService.route(request, function(response, status) {	//console.log(response, directionsDisplay); 
						if (status == google.maps.DirectionsStatus.OK) {
							thisOrigin.directions = response;
						}
					});

				}; genPolyLine();

				google.maps.event.addListener(thisOrigin.mark, 'click', function(){
					//thisOrigin.setRouteVisibility(!thisOrigin.active);
				});

				origin.fn = thisOrigin;
				_GT.origins.push(origin);
			};
			//for(var sk = 0; sk < _GT.extraOrigins.length; sk++) new setupExtraOrigins(sk);

			function genExtraPoints(){
				function extraPoint(p){
					var thisPoint = this, obj = mapData.extraPoints[p];
					thisPoint.position = new google.maps.LatLng(obj.lat, obj.lng);
					thisPoint.mark = new google.maps.Marker({
								position: thisPoint.position,
								map: _GT.map,
								icon: mapData.imgPath+"parking-icon.png",
								title: obj.title,
								visible: true
							});
					thisPoint.mark.poiIndex = p;

					obj.fn = thisPoint;
				};

				for(var p = 0; p < mapData.extraPoints.length; p++) new extraPoint(p);
			};
			//genExtraPoints();

			_GT.fitBounds();

			google.maps.event.addListenerOnce(_GT.map, 'idle', function(){	
				console && console.log("It's Time.");
				mapData.onRender.call(_GT);
			});
		};
		
		gtMap.initMap(confxg);
	};
	
})(this, document, jQuery);
