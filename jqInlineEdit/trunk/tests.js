/**
 * @author keul
 * Tests script for jqInlineEdit
 */

$(document).ready(function() {
	
	$("#example1 .exampleBody strong").inlineEdit();

	$("#example2 .exampleBody strong,#example2 .exampleBody em").inlineEdit();

	$("#example3 .exampleBody strong,#example3 .exampleBody em").inlineEdit({multiEditing: true});

	$("#example4 .exampleBody strong").inlineEdit({acceptOnBlur: false});

	$("#example5 .exampleBody strong").inlineEdit({cancelKey: 8});
	$("#example5 .exampleBody em").inlineEdit({cancelKey: null});

	$("#example6 .exampleBody strong").inlineEdit({acceptKey: 40});
	$("#example6 .exampleBody em").inlineEdit({acceptKey: null});
	$("#example6-1 .exampleBody strong").inlineEdit({acceptKey: 40, preventFormSubmission: true});
	
});
