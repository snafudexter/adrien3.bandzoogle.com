(function(){
	/*!
	 * cookie-monster - a simple cookie library
	 * v0.3.0
	 * https://github.com/jgallen23/cookie-monster
	 * copyright Greg Allen 2014
	 * MIT License
	*/
	var monster={set:function(a,b,c,d,e){var f=new Date,g="",h=typeof b,i="",j="";if(d=d||"/",c&&(f.setTime(f.getTime()+24*c*60*60*1e3),g="; expires="+f.toUTCString()),"object"===h&&"undefined"!==h){if(!("JSON"in window))throw"Bummer, your browser doesn't support JSON parsing.";i=encodeURIComponent(JSON.stringify({v:b}))}else i=encodeURIComponent(b);e&&(j="; secure"),document.cookie=a+"="+i+g+"; path="+d+j},get:function(a){for(var b=a+"=",c=document.cookie.split(";"),d="",e="",f={},g=0;g<c.length;g++){for(var h=c[g];" "==h.charAt(0);)h=h.substring(1,h.length);if(0===h.indexOf(b)){if(d=decodeURIComponent(h.substring(b.length,h.length)),e=d.substring(0,1),"{"==e)try{if(f=JSON.parse(d),"v"in f)return f.v}catch(i){return d}return"undefined"==d?void 0:d}}return null},remove:function(a){this.set(a,"",-1)},increment:function(a,b){var c=this.get(a)||0;this.set(a,parseInt(c,10)+1,b)},decrement:function(a,b){var c=this.get(a)||0;this.set(a,parseInt(c,10)-1,b)}};

	// asynchronous tracker (or proxy)
	if (typeof window._zaq !== 'object') {
		window._zaq = [];
	}

	if (typeof ZStats !== 'object') {
		ZStats = (function () {
			'use strict';
			var asyncTracker;

				/*
				 * apply wrapper
				 *
				 * @param array parameterArray An array comprising either:
				 *      [ 'methodName', optional_parameters ]
				 */
				function apply() {
					var i, f, parameterArray;

					for (i = 0; i < arguments.length; i += 1) {
						parameterArray = arguments[i];
						f = parameterArray.shift();
						//console.log("call", f, "on", asyncTracker);
						asyncTracker[f].apply(asyncTracker, parameterArray);
					}
				}

			var getLocation = function(href) {
				var l = document.createElement("a");
				l.href = href;
				return l;
			};

			function Tracker(trackerUrl, siteId, uuid) {
				var website_id, hash, timezone, xhr;
				var serverOpts = getLocation(document.getElementById("zstats").src);
				var protocol = serverOpts.protocol;
				var host = serverOpts.host;
				var destUrl = protocol + "//" + host + '/visits';

				xhr = new XMLHttpRequest();

				function handleError() {
					console.log("Sorry, something went wrong :(");
				}

				/*
				 * Send request
				 */
				function post(dest, data) {
					var formData;

					if ( xhr === null ) {
						return;
					}

					formData = new FormData();
					for ( var key in data ) {
						formData.append("visit[" + key + "]", data[key]);
					}

					xhr.open('POST', dest, true);
					xhr.send(formData);
				}

				function track(id, type, action) {
						// is this a new visitor?
						var is_new_visitor = monster.get('uid') === null;

						// is this a new visit?
						var is_new_visit = monster.get('sid') === null;

						var dntStatus = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
						if ( dntStatus === true || dntStatus === "1" ) {
							console.log("Not logging your visit, have a nice day!");
							return;
						}

						post(destUrl, {
							website_id: website_id,
							hash: hash,
							zone: timezone,
							target_id: id,
							target_type: type,
							action: action,
							path: window.location.href,
							host: window.location.host,
							referer: document.referrer,
							visit: is_new_visit,
							visitor: is_new_visitor
						});

						if ( is_new_visitor ) {
							monster.set('uid', 1, 120);
						}

						if ( is_new_visit ) {
							monster.set('sid', 1, 1);
						}
				}


				return {
					_setWebsite: function(w) {
						website_id = w;
					},
					_setZone: function(z) {
						var doc = new DOMParser().parseFromString(z, "text/html");
						if ( typeof(doc) !== "undefined" && typeof(doc.documentElement) !== "undefined") {
							z = doc.documentElement.textContent;
							timezone = z;
						}
					},
					_setHash: function(h) {
						hash = h;
					},
					_setTimezone: function(z) {
						timezone = z;
					},
					_trackPage: function(id) {
						track(id, "page", "hit");
					},
					_track: function(id, type, action) {
						track(id, type, action);
					}
				};

			}

			asyncTracker = new Tracker();
			//console.log(asyncTracker);

			// apply the queue of actions
			for (var iterator = 0; iterator < _zaq.length; iterator++) {
				if (_zaq[iterator]) {
					apply(_zaq[iterator]);
				}
			}

			function TrackerProxy() {
				return {
					push: apply
				};
			}

			// replace initialization array with proxy object
			_zaq = new TrackerProxy();
		});

		ZStats();
	}

})();