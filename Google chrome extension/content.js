$(document).ready(function() {
    //only modify the document if on a crucible/fisheye page
    if(window.location.href.indexOf("crucible") >= 0 || window.location.href.indexOf("fisheye") >= 0){
        var appendAllModificationItems = function(){
        //adds additional close file icon for deleting whole directories
        $("[id^='folder-list'] span.folder:first-child").each(function (i, el) {
                var span = '\
                <span class="edit-remove-frx remove-directory" title="Remove this folder tree">\
                    <span class="aui-icon aui-icon-small aui-iconfont-remove">Remove</span>\
                    <img class="directory-spinner" src="http://' + $(location).attr('host') + '/static/nngxkj/2static/images/spinner_003366.gif" style="display: none;">\
                </span>';
                $(el).append(span);
            });

            //add icon to delete copied items that have no changes
            $("#frx-overview").append("\
                <li>\
                    <span id='FDR-RemoveAllCopiedFiles'>\
                        <span class='aui-icon aui-icon-small aui-iconfont-remove' style='color:#d04437'></span>\
                        <a style='color:#d04437'>Remove All Copied Files</a>\
                    </span>\
                </li>\
            ");
        };

        //if already in edit mode, add the modification items
        if($("div.edit-mode-help").length > 0){
            appendAllModificationItems();
        }

        $(document).on("click", "span#FDR-RemoveAllCopiedFiles", function() {
            //select all the files that are copied but are not folders, and trigger their removal
            $("span.frx-copied").not(".folder").find(".removeFrx").each(function(idx, el){
                $(el).trigger("click");
            });
        });

        $(document).on('click', 'span.remove-directory', function() {
            $(this).find("span:first-child").css("display", "none");
            $(this).find(".directory-spinner").removeAttr("style");

            var directory = $(this).closest("li");
            $(directory).children("span.folder").click();
            $(directory).find("span.removeFrx").click();
        });

        $(".edit-content-link").on("click", function() {
            if ($("div.edit-mode-help").is(":visible")) {
                $("span.remove-directory").remove();
                $("span#FDR-RemoveAllCopiedFiles").remove();
            } else {
                appendAllModificationItems();
            }
        });
    }
});
