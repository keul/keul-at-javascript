/**
 * @author keul
 * Tests script for jqInlineEdit
 */

$(document).ready(function() {
	
	$("#example1 strong").inlineEdit();
	$("#example2 strong,#example2 em").inlineEdit({multiEditing: true});
	
});
