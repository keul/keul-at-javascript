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
			multiEditing: false,
			// keys
			cancelKey: 27,
			acceptKey: 13,
			acceptOnBlur: true,
			preventFormSubmission: false,
			// Events
			event: 'click',
			onInit: null,
			onInitField: null,
			beforeEdit: null,
			onEdit: null,
			onCancel: null,
			// validation
			validate: null,
			// Styles
			editableClass: 'inlineEditableElement',
			// multiline/advanced editing
			multiLine: false,
			contentType: 'text'
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
			
			if (options.editableClass) {
				$this.addClass(options.editableClass);
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
				$this.data('originalValue', $this[options.contentType]());
				var originalWidth = $this.width();
				var originalHeight = $this.height();
				var $editField = null;
				if (options.multiLine) {
					$editField = $('<textarea/>', {'class': 'editField'});	
				} else {
					$editField = $('<input/>', {'type': 'text', 'class': 'editField'});
				}
				
				$editField.val($this.data('originalValue')).css('width', originalWidth + 'px');
				if (options.multiLine) {
					$editField.css('height', originalHeight + 'px'); 
				}

				if (options.onInitField) {
					var initFieldResult = options.onInitField.call($editField);
					if (initFieldResult===false) {
						return;
					}
				}

				$this.empty().append($editField).unbind(options.event+'.InlineEdit');

				if (options.afterInitField) {
					options.afterInitField.call($editField);
				}

				$editField.keydown(function(event) {
					// look for multiline and enter key
					if (event.which===13 && options.multiLine) {
						return;
					}
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
				var discardedText = $(event.target).val();
				$this.empty()[options.contentType]($this.data('originalValue'));
				$this.removeData('originalValue');
				$this.bind(options.event+'.InlineEdit', activateInlinEditHandler);
				if (options.onCancel) {
					options.onCancel.call($this, discardedText);
				}
			}
			$this.bind('restore.InlineEdit', abortInlineEditHandler);

			var updateInlineEditHandler = function(event) {
				var newValue = $(event.target).val();
				if (options.validate) {
					if (typeof(options.validate)==='function') {
						var validateResult = options.validate.call($this, newValue);
						if (validateResult===false) {
							$this.trigger('restore.InlineEdit');
							return;
						}
					} else if (!options.validate.test(newValue)) {
						$this.trigger('restore.InlineEdit');
						return;
					}
				}
				$this.empty()[options.contentType](newValue);
				$this.removeData('originalValue');
				$this.bind(options.event+'.InlineEdit', activateInlinEditHandler);

				// Post edit event
				if (options.onEdit) {
					options.onEdit.call($this);
				}
			}
			$this.bind('update.InlineEdit', updateInlineEditHandler);
			
			$this.bind('stop.InlineEdit', function(event) {
				var elem = $(this); 
				elem.unbind('.InlineEdit');
				elem.removeData('originalValue');
				if (options.editableClass) {
					elem.removeClass(options.editableClass);	
				}
				
			});
		});
	};
	
	/**
	 * No more able to edit elements after this call
	 */
	$.fn.stopInlineEdit = function(){
		return this.trigger('stop.InlineEdit');
	}
	
})(jQuery);

