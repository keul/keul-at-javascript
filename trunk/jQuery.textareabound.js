/**
 * textareabound jQuery plugin
 * 
 * author: keul
 */

/*
jq(document).ready(function() {
	jq('textarea.lineLengthBound').keyup(function() {
		var max = parseInt(jq(this).attr('maxlength'));
		if(jq(this).val().length > max) {
			jq(this).val(jq(this).val().substr(0, jq(this).attr('maxlength')));
		}

		jq(this).parent().find('.charsRemaining').html('You have ' + (max - jq(this).val().length) +
		                                              ' characters remaining');
	});
});
*/

/*
function setSelectionRangeX(input, selectionStart, selectionEnd) {
	// IE
	if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	// real browsers :)
	} else if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}
}
*/

jQuery.fn.maxLinesLengthBound = function(max) {
	return this.each(function() {
		var elem = jQuery(this);
   		elem.keyup(function() {
			var text = elem.val();
			var finalText = "";
			var rows = text.split("\n");
			var line = "";
			for (var i=0;i<rows.length;i++) {
				line = rows[i];
				if (line.length > max) {
					
					line = line.substr(0, max);
				}
				if (line!='') finalText+=line + ((i<rows.length-1)?"\n":"");
			}
			elem.val(finalText);
		});
	});
};


jQuery.fn.maxLinesCountBound = function(max) {
	return this.each(function() {
		var elem = jQuery(this);
   		elem.keyup(function() {
			var text = elem.val();
			var finalText = "";
			var rows = text.split("\n");
			if (rows.length > max) {
				var finalText = "";
				for (var i = 0; i < max; i++) 
					finalText += rows[i] + ((i<max-1)?"\n":"");
				elem.val(finalText);
			}
		});
	});
};

/*
function boundWarn(elem, msg) {
	elem.parent().addClass("error");
	jq("#bound-error-msg").remove();
	elem.before('<div id="bound-error-msg" tal:content="error">'+msg+'</div>');
}

function checkBounds() {
	var row_length = 30;
	var max_rows = 10;
	var elem = jq(this);
	var text = jq.trim(elem.val());
	var rows = text.split("\n");
	if (rows.length>max_rows) {
		boundWarn(elem, "Puoi inserire al massimo " + max_rows + " righe");
		return;
	}

	for (var i=0;i<rows.length;i++) {
		var line = rows[i];
		if (line.length>row_length) {
			boundWarn(elem, "La riga " + i + " contiene " + line.length + " caratteri. Massimo consentito Ã¨ " + row_length);
			return;
		}
	}
	
	elem.parent().removeClass("error");
}
*/

jq(document).ready(function(){
	jq("#aaa").maxLinesLengthBound(30).maxLinesCountBound(10);
	jq("#bbb").maxLinesLengthBound(30).maxLinesCountBound(10);
})
