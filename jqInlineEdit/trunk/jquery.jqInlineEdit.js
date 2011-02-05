/**
 * @projectDescription
 * @version 0.1.0
 * @author keul
 * 
 * jqInlineEdit is a jQuery plugin for an universal approach to inline edit with Javascript.
 * 
 */

(function($) {
	$.fn.inlineEdit = function(ops) {
		var options = {
			event: 'click'
		};
		$.extend(options, ops || {});
		
		return this.each(function() {
			var $this = $(this);
			
			$this.bind(options.event, function(event) {
				
			});
			
		});
	};
})(jQuery);

