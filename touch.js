
// touch
(function($){
	var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
	var hasTouch = 'ontouchstart' in window && !isTouchPad;

	if(!hasTouch)
		throw new Error('Your browser does not support the onTouch！');

	var touchStart = hasTouch ? 'touchstart' : 'mousedown';
	var touchMove = hasTouch ? 'touchmove' : '';
	var touchEnd = hasTouch ? 'touchend' : 'mouseup';

	var noop = function(){}
	/**
	 * touch绑定
	 * @param el
	 * @param options
	 * @returns {*}
	 */
	var touch = function(el, options, cb){
		var _ox,_oy,
			_nx,_ny;
		var _move = function(e){
			options.move && options.move(e);
		},
		_start = function(e){
			_ox = e.clientX || e.changedTouches[0].clientX;
			_oy = e.clientY || e.changedTouches[0].clientY;
			options.start && options.start(e);
			el.on(touchMove, _move);
			el.on(touchEnd, _end);
		},
		_end = function(e){
			_nx = e.clientX || e.changedTouches[0].clientX;
			_ny = e.clientY || e.changedTouches[0].clientY;
			//
			var dx = _nx - _ox,
				dy = _ny - _oy;
			if(dx*dx+dy*dy < 25) return;

			var dir;

			if(Math.abs(dx) > Math.abs(dy)){
				dir = {dir:(dx>0 ? "swipeRight" : "swipeLeft")};
				(!dx>0) && options.left && options.left();
				dx>0 && options.right && options.right();
			}else{
				dir = {dir:(dy>0 ? "swipeDown" : "swipeUp")};
				(!dx>0) && options.up && options.up();
				dx>0 && options.down && options.down();
			}
			cb && cb(dir);
		};

		el.on(touchStart, _start);
		return el;
	}


	$.fn.swipe = function(cb){
		var options = {};
		if(typeof cb == 'object'){
			options = cb;
			cb = noop;
		}

		return this.each(function(){
			var node = $(this);

			touch(node, options, cb);
		});
	}

	$.fn.touch = touch;
})(Zepto);
