/**
 * Javascript tests for TextareaBound plugin
 */

$(document).ready(function(){
	$("textarea").attr({
		cols: 50,
		rows: 20
	})
	$(".c1").maxLinesLengthBound(25).maxLinesCountBound(8);
	$("#t1").maxLinesLengthBound(20).maxLinesCountBound(5);
})