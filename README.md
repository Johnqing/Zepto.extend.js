对zepto进行了简单的拓展
===============

### 添加OS模块

```
$.os;

//=>{name: "ios", versionString: "7.0", version: 7}

```
### 添加了swipe事件

```
$(document).swipe(function(dir){
		//dir => {dir:(dy>0 ? "swipeDown" : "swipeUp")} || {dir:(dx>0 ? "swipeRight" : "swipeLeft")}
});

or

$(document).swipe({
  move: function(){},
  start: function(){},
  left: function(){},
  right: function(){},
  up: function(){},
  down: function(){}
});

```
