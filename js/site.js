var currentMousePos = {x: -1, y: -1 };

$(document).ready(function () {
    $(document).mousemove(function (event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    var args = document.location.href.match(/[^\/]+$/);
    var fileName = '';
    if (!args || args.length == 0) {
        return;
    }

    fileName = args[0];
    var infoFile = fileName.replace(".html", ".json");

    var fileInfo = "https://raw.githubusercontent.com/technet2/Wiki/master/info/" + infoFile;
    var editVersion = "https://github.com/technet2/Wiki/blob/master/articles/" + fileName;
    var historyVersion = "https://github.com/technet2/Wiki/commits/master/articles/" + fileName;

    var $h1 = document.querySelector('h1');
    if ($h1) {
        title = $h1.innerText;
        $('#editMeCrumb').append($('<a href="' + editVersion + '">' + title + '</a>'));
    }

    var url = "https://github.com/technet2/Wiki/commits/master/articles/" + fileName;
    var $tab = document.querySelector('#myHistory');
    $tab.setAttribute('href', url);
    //$('#myHistory').setAttribute('href', url);

    $.getJSON(fileInfo, function (data) {
        var keyPhrases = [];
        $.each(data.KeyPhrases, function (key, val) {
            keyPhrases.push("<span class=\"phr\" onclick=\"clickedPhrase('" + val.SafeName + "\')\">" + val.Name + "</span>&nbsp;|&nbsp;");
        });

        var netities = [];

        $.each(data.Netities, function (key, val) {
            var name = val.Name;
            var type = "";
            if (val.Type) {
                type += "" + val.Type;
            }
            if (val.SubType) {
                type += ", " + val.SubType;
            }
            if (type != "") {
                name += " (" + type + ")";
            }
            if (val.WikipediaUrl) {
                netities.push("<a href='" + val.WikipediaUrl + "'>" + name + "</a>&nbsp;|&nbsp;");
            }
            else {
                netities.push(name + "&nbsp;|&nbsp;");
            }
        });

        if (keyPhrases.length > 0) {
            $("<h2>Popular Phrases Identified</h2>").appendTo("#tags");

            $("<ul />", {
                "class": "tag-list",
                html: keyPhrases.join("")
            }).appendTo("#tags");
        }

        if (netities.length > 0) {
            $("<h2>Entities Indentified</h2>").appendTo("#tags");

            $("<ul />", {
                "class": "tag-list",
                html: netities.join("")
            }).appendTo("#tags");
        }
    }).error(function () { console.log('No info file found for this page'); });

});

function goToIndex(file) {
    clickedPhrase(file.replace('.json', ''));

    //file = 'https://github.com/technet2/Wiki/blob/master/index/' + file;
    //console.log(file);
    //window.location.href = file;
}

function goToSubIndex(file) {
    console.log(file);
    window.location.href = file;
}

function clickedPhrase(safeName) {
    //console.log(ele.innerText);
    var popup = $('#tagPopup');
    var tagList = $('#tagList');
    tagList.empty();

    var fileInfo = "https://raw.githubusercontent.com/technet2/Wiki/master/index/" + safeName + ".json";

    $.getJSON(fileInfo, function (data) {
        var nextLinks = [];

        popup.css('visibility', 'visible');
        popup.css('top', currentMousePos.y);
        var left = currentMousePos.x;
        if (document.body.clientWidth) {
            if (left + 300 > document.body.clientWidth) {
                left = document.body.clientWidth - 300;
            }
        }
        popup.css('left', left);

        $.each(data.Refs, function (key, val) {
            nextLinks.push("<div style='margin-bottom:8px;'><a href='/Wiki/articles/" + val.FileName + "'>" + val.Title + "</a></div>");
        });

        $("<div />", {
            "class": "link-list",
            html: nextLinks.join("")
        }).appendTo("#tagList");
    });

}

$(function () {

    $("#rateYo").rateYo({

        onSet: function (rating, rateYoInstance) {
            alert("You chose: " + rating + " (this feature is still in development)");
        }
    });
});