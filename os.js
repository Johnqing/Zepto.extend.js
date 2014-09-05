/**
 * os
 */
(function($){
	$.os = function(userAgent){
		var name,
			version;
		if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(userAgent)) {
			name    = 'ios';
			version = match[1].replace('_', '.');
		}
		else if (match = /\bAndroid (\d+(\.\d+)?)/.exec(userAgent)) {
			name    = 'android';
			version = match[1];
		}

		var data = {
			name          : name    ,
			versionString : version ,
			version       : version && parseFloat(version)
		};

		$('body').addClass('app-' + name + '-' + parseInt(version));

		return data;
	}(navigator.userAgent);
})(Zepto);
