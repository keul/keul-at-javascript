/**
 * @author keul
 * Tests script for jqInlineEdit
 */

$(document).ready(function() {
		
	$("#example1-1 .exampleBody strong").inlineEdit();

	$("#example1-2 .exampleBody strong,#example2 .exampleBody em").inlineEdit();

	$("#example2-1 .exampleBody strong,#example3 .exampleBody em").inlineEdit({multiEditing: true});

	$("#example2-2 .exampleBody strong").inlineEdit({acceptOnBlur: false});

	$("#example2-3 .exampleBody strong").inlineEdit({cancelKey: 8});
	$("#example2-3 .exampleBody em").inlineEdit({cancelKey: null});

	$("#example2-4 .exampleBody strong").inlineEdit({acceptKey: 40});
	$("#example2-4 .exampleBody em").inlineEdit({acceptKey: null});

	$("#example2-4-1 .exampleBody strong").inlineEdit({acceptKey: 40, acceptOnBlur: false});

	$("#example2-4-2 .exampleBody strong").inlineEdit({acceptKey: 40, preventFormSubmission: true});

	// Special example where is better to stop ENTER form SUBMIT
	$(".preventMovingOn input").live('keydown', function(event) {
		if (event.which===13) {
			alert("You are leaving this page due to ENTER pressure.\nThe field value is:\n" + $(this).val());
		}
		return true;
	})

	
});
