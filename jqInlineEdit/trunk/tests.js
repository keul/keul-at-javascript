/**
 * @author keul
 * Tests script for jqInlineEdit
 */

tinyMCE.init({
	mode : "none",
	theme: "simple"
});


$(document).ready(function() {
		
	$("#example1-1 .exampleBody strong").inlineEdit();

	$("#example1-2 .exampleBody strong,#example1-2 .exampleBody em").inlineEdit();

	$("#example2-1 .exampleBody strong,#example2-1 .exampleBody em").inlineEdit({multiEditing: true});

	$("#example2-2 .exampleBody strong").inlineEdit({acceptOnBlur: false});

	$("#example2-3 .exampleBody strong").inlineEdit({cancelKey: 8});
	$("#example2-3 .exampleBody em").inlineEdit({cancelKey: null});

	$("#example2-4 .exampleBody strong").inlineEdit({acceptKey: 40});
	$("#example2-4 .exampleBody em").inlineEdit({acceptKey: null});

	$("#example2-4-1 .exampleBody strong").inlineEdit({acceptKey: 40, acceptOnBlur: false});

	$("#example2-4-2 .exampleBody strong").inlineEdit({acceptKey: 40, preventFormSubmission: true});

	$("#example3-1 .exampleBody strong,#example3-1 .exampleBody em").inlineEdit({onInit: function() {
    	this.css('font-size', '130%');
		return this.is('em');
	}});

	$("#example3-2 .exampleBody strong,#example3-2 .exampleBody em").inlineEdit({beforeEdit: function() {
		alert('you are trying to edit this text: ' + this.text());
		return this.is('strong');
	}});

	var oversizeMe = function() {
		this.css('font-size', '130%');
	};
    $("#example3-3 .exampleBody strong").inlineEdit({
    	onInit: oversizeMe,
    	onInitField: oversizeMe
    });

    $("#example3-3-1 .exampleBody strong").inlineEdit({
		onInit: function() {this.css('font-size', '130%');},
		onInitField: function() {return false;}
	});

	$("#example3-4 .exampleBody strong").inlineEdit({event: 'mouseover'});

	$("#example3-4-1 .exampleBody em").click(function() {$(this).parent().children('strong').trigger('custom')});
	$("#example3-4-1 .exampleBody strong").inlineEdit({event: 'custom'});

	$("#example3-5 .exampleBody strong").inlineEdit({onEdit: function() {
		this.text(this.text().toUpperCase());
	}});

	$("#example3-6 .exampleBody strong").inlineEdit({onCancel: function(discardedText) {
		alert('The node text is still "'+this.text()+'" while the discarded text is "'+discardedText+'".');
	}});
	
	var boldSet = $("#example4-1 .exampleBody strong");
	boldSet.inlineEdit({onEdit: function() {
		$(boldSet.get(0)).stopInlineEdit();
	}});

	$("#example5-1 .exampleBody strong").inlineEdit({validate: function(newValue) {
		var italicText = this.nextAll('em:eq(1)').text();
		if (newValue!==italicText) {
			return false;
		} 
	}});

	$("#example5-2 .exampleBody strong").inlineEdit({validate: /(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/});

	// 6.1 is a non-example
	$("#example6-2 .exampleBody strong:first,#example6-2 .exampleBody span").inlineEdit({
		editableClass: 'ImEditable'
	});
	$("#example6-2-1 .exampleBody strong").inlineEdit({
		editableClass: 'inlineEditableElement ImEditable ImReallyEditable fooClass'
	});

	$("#example6-3 .exampleBody strong").inlineEdit({
		onInit: function() {
			if (this.text()==='inside this document') {
				return false;
			}
		},
		editableClass: 'inlineEditableElement ImEditable'
	});

	$("#example7-1 .exampleBody .text").inlineEdit({
		multiLine: true
	});

	$("#example7-2 .exampleBody .text").inlineEdit({
		multiLine: true,
		contentType: 'html'
	});
	$("#example7-2-1 .exampleBody strong").inlineEdit({
		contentType: 'html'
	});

	$("#example7-3 .exampleBody .text").inlineEdit({
		multiLine: true,
		contentType: 'html',
		multiEditing: true,
		cancelKey: null,
		acceptKey: 27,
		afterInitField: function() {
			this.attr('id', 'foo1');
			tinyMCE.execCommand('mceAddControl', false, "foo1");
		}
	});
	$("#example7-3 .exampleBody .stopTiny").click(function(event){
		event.preventDefault();
		tinyMCE.execCommand('mceRemoveControl', false, "foo1");
	});

	$("#example7-3-1 .exampleBody .text").inlineEdit({
		multiLine: true,
		contentType: 'html',
		multiEditing: true,
		afterInitField: function() {
			this.attr('id', 'foo2');
			tinyMCE.execCommand('mceAddControl', false, "foo2");
		},
		event: 'myTrigger'
	});
	$("#example7-3-1 .exampleBody a").click(function(event){
		event.preventDefault();
		if (!tinyMCE.getInstanceById('foo2')) {
			$("#example7-3-1 .exampleBody .text").trigger('myTrigger.InlineEdit');
		} else {
			tinyMCE.execCommand('mceRemoveControl', false, "foo2");
			$("#foo2").trigger('update.InlineEdit');
		}
		
	});




	// Special example where is better to stop ENTER form SUBMIT
	$(".preventMovingOn input").live('keydown', function(event) {
		if (event.which===13) {
			alert("You are leaving this page due to ENTER pressure.");
		}
		return true;
	})

	
});
