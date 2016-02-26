$(document).ready(function() {
	$(".edit-content-link").click(function() {
		if ($("div.edit-mode-help").is(":visible")) {
			$("span.remove-directory").remove();
		} else {
			$("[id^='folder-list'] span.folder:first-child").each(function (i, el) {
				var span = '\
				<span class="edit-remove-frx remove-directory" title="Remove this file">\
					<span class="aui-icon aui-icon-small aui-iconfont-remove">Remove</span>\
					<img class="directory-spinner" src="http://' + $(location).attr('host') + '/static/nngxkj/2static/images/spinner_003366.gif" style="display: none;">\
				</span>';
				$(el).append(span);
			});
		}
	});

	$(document).on('click', 'span.remove-directory', function () {
		$(this).find("span:first-child").css("display", "none");
		$(this).find(".directory-spinner").removeAttr("style");

		var directory = $(this).closest("li");
		$(directory).children("span.folder").click();
	    $(directory).find("span.removeFrx").click();
	});
});