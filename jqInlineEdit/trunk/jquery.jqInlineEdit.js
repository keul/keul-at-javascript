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
			event: 'click',
			multiEditing: false,
			cancelKey: 27,
			acceptKey: 13,
			acceptOnBlur: true,
			preventFormSubmission: false,
			// Events
			onInit: null,
			beforeEdit: null,
			onInitField: null
		};
		$.extend(options, ops || {});
		
		return this.each(function() {
			var $this = $(this);

			// The onInit parameter
			if (options.onInit) {
				var initResult = options.onInit.call($this);
				if (initResult===false) {
					return;
				}
			}
			
			var activateInlinEditHandler = function(event) {

				// The beforeEdit parameter
				if (options.beforeEdit) {
					var beforeEditResult = options.beforeEdit.call($this);
					if (beforeEditResult===false) {
						return;
					}
				}

				event.preventDefault();
				$this.data('originalValue', $this.text());
				var originalSize = $this.width();
				var $editField = $('<input/>', {'type': 'text', 'class': 'editField'}).val($this.data('originalValue'));
				$editField.css('width', originalSize + 'px');
				if (options.onInitField) {
					var initFieldResult = options.onInitField.call($editField);
					if (initFieldResult===false) {
						return;
					}
				}
				$this.empty().append($editField).unbind(options.event+'.InlineEdit');
				$editField.keydown(function(event) {
					if (options.preventFormSubmission && event.which===13) {
						event.preventDefault();
					}
					if (event.which===options.cancelKey) {
						event.preventDefault();
						$editField.trigger('restore.InlineEdit');
					} else if (event.which===options.acceptKey) {
						event.preventDefault();
						$editField.trigger('update.InlineEdit');
					}
				}).blur(function(event) {
					if (!options.multiEditing) {
						if (options.acceptOnBlur) {
							$editField.trigger('update.InlineEdit');
						} else {
							$editField.trigger('restore.InlineEdit');
						}
					}
				}).focus();
			}			
			$this.bind(options.event+'.InlineEdit', activateInlinEditHandler);

			var abortInlineEditHandler = function(event) {
				$this.empty().text($this.data('originalValue'));
				$this.removeData('originalValue');
				$this.bind(options.event+'.InlineEdit', activateInlinEditHandler);
			}
			$this.bind('restore.InlineEdit', abortInlineEditHandler);

			var updateInlineEditHandler = function(event) {
				var newValue = $(event.target).val();
				$this.empty().text(newValue);
				$this.removeData('originalValue');
				$this.bind(options.event+'.InlineEdit', activateInlinEditHandler);
			}
			$this.bind('update.InlineEdit', updateInlineEditHandler);
			
			
		});
	};
})(jQuery);

