(function($) {
	$.fn.extend({
  
	  roulette: function(rData) {
  
		var defaults = {
		  angle: 0,
		  angleOffset: -45,
		  speed: 5000,
		  easing: "easeInOutElastic",
		};
  
		var opt = $.extend(defaults);
  
		return this.each(function() {
		  var o = opt;
  
		  var data = rData
  
		  var $wrap = $(this);
		  var $btnStart = $wrap.find("#btn-start");
		  var $roulette = $wrap.find(".roulette");
		  var wrapW = $wrap.width();
		  var angle = o.angle;
		  var angleOffset = o.angleOffset;
		  var speed = o.speed;
		  var esing = o.easing;
		  var itemSize = data.length;
		  var itemSelector = "item";
		  var labelSelector = "label";
		  var d = 360 / itemSize;
		  var borderTopWidth = wrapW;
		  var borderRightWidth = tanDeg(d);

		  for (i = 1; i <= itemSize; i += 1) {
			var idx = i - 1;
			var rt = i * d + angleOffset;
			var name = ''
			if(data[idx].name.length > 7) {
				name = data[idx].name.slice(0, 6) + ".."
			} else {
				name = data[idx].name
			}
			var itemHTML = $('<div class="' + itemSelector + '">');
			var labelHTML = '';
				labelHTML += '<p class="' + labelSelector + '">';
				labelHTML += '	<span class="text">' + name + '<\/span>';
				labelHTML += '<\/p>';

			$roulette.append(itemHTML);
			$roulette.children("." + itemSelector).eq(idx).append(labelHTML);
			$roulette.children("." + itemSelector).eq(idx).css({
			  "left": wrapW / 2,
			  "top": -wrapW / 2,
			  "border-top-width": borderTopWidth,
			  "border-right-width": borderRightWidth,
			  "border-top-color": data[idx].color,
			  "border-left-width": "0.5px",
			  "border-left-color" : "#ccc",
			  "transform": "rotate(" + rt + "deg)"
			});
  
			var textH = parseInt(((2 * Math.PI * wrapW) / d) * .4);
  
			$roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
			  "height": textH + 'px',
			  "line-height": textH + 'px',
			  "transform": 'translateX(' + (textH * 1.3) * 1.39 + 'px) translateY(' + (wrapW * -.3) * 1.46 + 'px) rotateZ(' + (90 + d * .5) + 'deg)'
			});
  
		  }
  
		  function tanDeg(deg) {
			var rad = deg * Math.PI / 180;
			return wrapW / (1 / Math.tan(rad));
		  }
  
  
		  $btnStart.on("click", function() {
			rotation();
		  });
  
		  function rotation() {
  
			var completeA = 360 * r(5, 10) + r(0, 360);
  
			$roulette.rotate({
			  angle: angle,
			  animateTo: completeA,
			  center: ["50%", "50%"],
			  easing: $.easing.esing,
			  callback: function() {
				var currentA = $(this).getRotateAngle();
			  },
			  duration: speed
			});
		  }
  
		  function r(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  }
  
		});
	  }
	});
  })(jQuery);