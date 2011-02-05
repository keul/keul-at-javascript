/**
 * jQuery plugin for handle HTML Textarea bounds.
 * version 0.1.0
 * 
 * This verion don't support the maxLinesLengthBound for Internet Explorer.
 */

jQuery.textareabound = {
	key_codes: {
		up_arrow: 38,
		right_arrow: 39,
		down_arrow: 40,
		left_arrow: 37,
		backspace: 8,
		cret: 10,
		enter: 13,
		canc: 46,
		special_keys: [38, 39, 40, 37, 8, 13, 10, 46],
		special_nochars_keys: [38, 39, 40, 37, 8, 46]
	},
	isSpecialKey: function(keyCode, skipReturn) {
		if (!skipReturn)
			return keyCode==0 || jQuery.inArray(keyCode, jQuery.textareabound.key_codes.special_keys)>-1;
		return keyCode==0 || jQuery.inArray(keyCode, jQuery.textareabound.key_codes.special_nochars_keys)>-1;
	}
};

jQuery.fn.maxTextLength = function(max) {
	return this.each(function() {
		var elem = jQuery(this);
		elem.keypress(function(event) {
			if (!jQuery.textareabound.isSpecialKey(event.which)) {
				if (elem.val().length > max) {
					event.preventDefault();
				}
			}
		});
	});
};


jQuery.fn.maxLinesLengthBound = function(max) {
	
	getCursorPosition = function(elem) {
		if (typeof(elem.selectionStart)!=='undefined')
			return elem.selectionStart;
		/*
		 * The is someone in the world really able to put there code that REALLY works on IE?!
		 */
		return 0;
	}
	
	return this.each(function() {
		var elem = jQuery(this);
		var domElem = elem.get(0);
   		elem.keypress(function(event) {
			if (!jQuery.textareabound.isSpecialKey(event.which)) {
				var rows = elem.val().split("\n");
				var cursorPosition = getCursorPosition(domElem);
				var totalLength = 0;
				for (var i = 0; i < rows.length; i++) {
					if (typeof(domElem.selectionStart)==='undefined') break; // Explicit disable for IE
					var row = rows[i].replace(/\r/gm,"");
					//if (window.console) console.log(totalLength, cursorPosition, totalLength+row.length);
					//else alert(totalLength + " " + cursorPosition + " " + (totalLength+row.length));
					if (row.length+1 > max && totalLength<=cursorPosition && cursorPosition<=totalLength+row.length) {
						event.preventDefault();
						return false;
					}
					totalLength+=row.length+1;
				}
			}
		});
	});
};


jQuery.fn.maxLinesCountBound = function(max) {
	return this.each(function() {
		var elem = jQuery(this);
   		elem.keypress(function(event) {
			if (!jQuery.textareabound.isSpecialKey(event.which, true)) {
				var rows = elem.val().split("\n");
				var l = rows.length;
				if (event.which==13) l+=1;
				if (l>max) {
					event.preventDefault();
				}
			}
		});
	});
};
