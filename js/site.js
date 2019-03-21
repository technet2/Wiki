var currentMousePos = {x: -1, y: -1 };

$(document).ready(function () {
    $(document).mousemove(function (event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });

    var args = document.location.href.match(/[^\/]+$/);
    var fileName = '';
    if (!args || args.length === 0) {
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

    var $tab = document.querySelector('#myHistory');
    if ($tab) {
        var url = "https://github.com/technet2/Wiki/commits/master/articles/" + fileName;
        $tab.setAttribute('href', url);
    }

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
            if (type !== "") {
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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

var clearCookieName = 'clearCookie';
var optCookieName = 'extHrefOpt';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 

function clearCookie(cookieName) {
    setCookie(cookieName, null, 0);
}

var createUUID = function () {
    return "uuid-" + ((new Date).getTime().toString(16) + Math.floor(1E7 * Math.random()).toString(16));
}

var simpleWaitBarSegmentWidth = 0;
var simpleWaitBarSegmentPeriod = 0;
var simpleWaitBarStage = 0;
var simpleWaitBarTotalSegments = 0;
var progressBar;
var simpleWaitBarCallback;
var waitBarContainer;
var waitBarParent;

function simpleWaitBar(attachElement, widthPixels, heightPixels, segmentCount, totalMilliseconds, finishedCallback) {
    waitBarParent = attachElement;
    simpleWaitBarStage = 0;
    // Create container
    waitBarContainer = document.createElement('div');
    waitBarContainer.className = 'bar';
    waitBarContainer.style.width = widthPixels + 'px';
    waitBarContainer.style.height = heightPixels + 'px';
    // Create bar
    progressBar = document.createElement('div');
    progressBar.style.cssFloat = 'left';
    progressBar.style.width = '10px';
    progressBar.style.height = '100%';
    progressBar.style.background = 'black';
    waitBarContainer.appendChild(progressBar);
    attachElement.append(waitBarContainer);
    // Set variables
    simpleWaitBarSegmentWidth = widthPixels / segmentCount;
    simpleWaitBarSegmentPeriod = totalMilliseconds / segmentCount;
    simpleWaitBarCallback = finishedCallback;
    simpleWaitBarTotalSegments = segmentCount;
    simpleWaitBarWait();
}

function simpleWaitBarWait() {
    setTimeout(function () {
        simpleWaitBarStage += 1;
        var newWidth = (simpleWaitBarSegmentWidth * simpleWaitBarStage) + 'px';
        console.log(newWidth);
        if (simpleWaitBarStage > simpleWaitBarTotalSegments) {
            waitBarParent.removeChild(waitBarContainer);
            simpleWaitBarCallback();
        }
        else {
            progressBar.style.width = newWidth;
            simpleWaitBarWait();
        }
    }, simpleWaitBarSegmentPeriod);
}

$(function () {
    $rateYo = $("#rateYo");
    if ($rateYo.rateYo) {
        $rateYo.rateYo({
            onSet: function (rating, rateYoInstance) {
                alert("You chose: " + rating + " (this feature is still in development)");
            }
        });
    }
});