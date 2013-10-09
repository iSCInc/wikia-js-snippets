/**
 * ChatOptions
 * Change how Special:Chat looks and functions using an interface.
 * Uses cookies to store the changes.
 * A potential solution to all your chathacks problems.
 *
 * Many thanks to the Call of Duty Wiki Chat,
 * who supported and helped this the whole way through.
 * It has been much appreciated. Thank you!
 *
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 *
 * @version 1.3.2
 * @author Callofduty4
 * @author Madnessfan34537
 * @author Sactage <sactage@gmail.com>
 */

/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, latedef:true, noarg:true, noempty:true, nonew:true, undef:true, browser:true, devel:true, jquery:true */

/*global importScriptPage, mw, showPopup */


/**
 * Function to set a cookie
 * @param cookie_name A string representing the cookie's name
 * @param data The value of the cookie to be set
 */
function setCookie(cookie_name, data) {
    var domain = mw.config.get('wgServer').split("//")[1];
    document.cookie =
        cookie_name + "=" + data +
        "; max-age=" + 60 * 60 * 24 * 150 +
        "; path=/; domain=" + domain;
}

/**
 * Function to get a cookie's value
 * @param cookie_name A string representing the cookie's name
 * @param pos The index of the value to get from the cookie
 * @return String string value of the cookie
 */
function getCookie(cookie_name, pos) {
    var i, x, y, cookie_array = document.cookie.split(";"), style_objects;
    for (i = 0; i < cookie_array.length; i++) {
        x = cookie_array[i].substr(0, cookie_array[i].indexOf("="));
        y = cookie_array[i].substr(cookie_array[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x === cookie_name) {
            style_objects = y.split(", ");
            return decodeURIComponent(style_objects[pos]);
        }
    }
    return "";
}

/**
 * Function to check if a chat options module is enabled
 * @since 1.3.0
 * @author Sactage
 * @param module The name of the options module
 * @return boolean
 */
function isEnabled(module) {
    var c;
    switch (module) {
    case "chatHacks":
        c = getCookie("customisation", 2);
        break;
    case "tabComplete":
        c = getCookie("customisation", 4);
        break;
    case "multiKick":
        c = getCookie("customisation", 5);
        break;
    case "multiPM":
        c = getCookie("customisation", 6);
        break;
    case "searchBar":
        c = getCookie("customisation", 7);
        break;
    case "stopSideScroll":
        c = getCookie("customisation", 9);
        break;
    case "ignoreURL":
        c = getCookie("customisation", 8);
        break;
    default:
        return false;
    }
    return (c === "true");
}

// Store chat customisation options as an object
var chatOptions = {
    look: {
        fontColor: getCookie("customisation", 1),
        fontFamily: getCookie("customisation", 3),
        surroundColor: getCookie("customisation", 10),
        selfPostColor: getCookie("customisation", 11),
        backgroundColor: getCookie("customisation", 0),
        modalIcon: "http://www.derehamreclaim.co.uk/_images-pages/icon-hammerSpanner.jpg"
    },
    modules: {
        chatHacks: {
            element: "#chatHacks",
            enabled: isEnabled("chatHacks"),
            loaded: false,
            load: function () {
                if ($("#pingspan").length > 0 || this.loaded) {
                    return;
                }
                importScriptPage("User:Monchoman45/ChatHacks.js", "community");
                this.loaded = true;
            }
        },
        tabComplete: {
            element: "#tabComplete",
            enabled: isEnabled("tabComplete"),
            loaded: false,
            load: function () {
                importScriptPage("User:Joeytje50/tabinsert.js", "runescape");
                this.loaded = true;
            }
        },
        multiKick: {
            element: "#multiKick",
            enabled: isEnabled("multiKick"),
            loaded: false,
            load: function () {
                importScriptPage("User:Madnessfan34537/multikick.js", "callofduty");
                $('.Write').append($('<a>').attr({
                    id: 'multiKickerButton',
                    'class': 'wikia-button',
                    href: '#',
                    style: 'position: absolute; right: 55px; top: 22px;'
                }).text("Multikick").click(showPopup));
                this.loaded = true;
            }
        },
        multiPM: {
            element: "#multiPM",
            enabled: isEnabled("multiPM"),
            loaded: false,
            load: function () {
                importScriptPage("MediaWiki:Chat.js/multipms.js", "callofduty");
                this.loaded = true;
            }
        },
        searchBar: {
            element: "#searchBar",
            enabled: isEnabled("searchBar"),
            loaded: false,
            load: function () {
                importScriptPage("MediaWiki:Chat.js/searchbar.js", "callofduty");
                this.loaded = true;
            }
        },
        ignoreURL: {
            element: "#ignoreURL",
            enabled: isEnabled("ignoreURL"),
            loaded: false,
            load: function () {
                mw.util.addCSS('li[data-user="URL"] { display:none; }');
                this.loaded = true;
            }
        },
        stopSideScroll: {
            element: "#stopSideScroll",
            enabled: isEnabled("stopSideScroll"),
            loaded: false,
            load: function () {
                mw.util.addCSS('#WikiaPage .Chat .message { word-wrap: break-word; }');
                this.loaded = true;
            }
        }
    }
};

/**
 * Applies updated settings to the chat skin
 */
function updateChatSkin() {
    var m, module;
    $('body').css({"background-color": chatOptions.look.surroundColor});
    $('.WikiaPage').css({"background-color": chatOptions.look.backgroundColor, "color": chatOptions.look.fontColor, "font-family": chatOptions.look.fontFamily});
    $('.Chat').css({"font-family": chatOptions.look.fontFamily});
    $('.Rail').css({"font-family": chatOptions.look.fontFamily});
    $('.ChatHeader').css({"background-color": chatOptions.look.backgroundColor, "font-family": chatOptions.look.fontFamily});
    mw.util.addCSS('.Chat .you { background: ' + chatOptions.look.selfPostColor + ' !important;}');
    $('.Write [name="message"]').css({"color": chatOptions.look.fontColor});
    $('.Write .message').css({"background-color": chatOptions.look.backgroundColor});
    $('.ChatHeader .User .username').css({"color": chatOptions.look.fontColor});
    for (m in chatOptions.modules) {
        if (chatOptions.modules.hasOwnProperty(m)) {
            module = chatOptions.modules[m];
            if (typeof module.enabled === 'boolean' && module.enabled && !module.loaded) {
                module.load();
            }
        }
    }
}

/**
 * Close the options window without saving any changes
 */
function cancelChanges() {
    var dialog = $('#optionsWindow');
    dialog.closeModal();
}

/**
 * Saves user options and stores them in a cookie for persistence across sessions
 */
function updateCookie() {
    var m, module;
    chatOptions.look.backgroundColor = $('#backgroundColourinput').val();
    chatOptions.look.fontColor = $('#fontColourinput').val();
    chatOptions.look.fontFamily = $('#fontList').val();
    chatOptions.look.surroundColor = $('#surroundColourinput').val();
    chatOptions.look.selfPostColor = $('#selfPostColourinput').val();
    for (m in chatOptions.modules) {
        if (chatOptions.modules.hasOwnProperty(m)) {
            module = chatOptions.modules[m];
            module.enabled = module.element && $(module.element).attr("checked") === "checked";
        }
    }

    // Set the cookies
    setCookie("customisation", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " +  chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.ignoreURL.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor);
    updateChatSkin();
    cancelChanges();
}

/**
 * Displays the options window
 */
function openOptions() {
    var i, font, groups = mw.config.get("wgUserGroups");
    $.showCustomModal("Options", '<form method="" name="" class="WikiaForm "><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Self-post background&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Stop the sidescroll bar to appear after someone spams</fieldset></form>', {
        id: "optionsWindow",
        width: 600,
        buttons: [
            {
                id: "cancel",
                message: "Cancel",
                handler: function () {
                    cancelChanges();
                }
            },
            {
                id: "updateCookie",
                defaultButton: true,
                message: "Update!",
                handler: function () {
                    updateCookie();
                }
            }
        ]
    });
    $(".close").click(cancelChanges);
    // Check if various modules have been enabled by the user, and check their boxes if so
    if (chatOptions.modules.chatHacks.enabled) {
        $("#chatHacks").attr("checked", true);
    }
    if (chatOptions.modules.multiPM.enabled) {
        $("#multiPM").attr("checked", true);
    }
    if (chatOptions.modules.tabComplete.enabled) {
        $("#tabComplete").attr("checked", true);
    }
    if (chatOptions.modules.searchBar.enabled) {
        $("#searchBar").attr("checked", true);
    }
    if (chatOptions.modules.multiKick.enabled) {
        $("#multiKick").attr("checked", true);
    }
    if (chatOptions.modules.ignoreURL.enabled) {
        $("#ignoreURL").attr("checked", true);
    }
    if (chatOptions.modules.stopSideScroll.enabled) {
        $("#stopSideScroll").attr("checked", true);
    }

    if (window.customFonts !== undefined && window.customFonts.length) {
        for (i = 0; i < window.customFonts.length; i++) {
            font = window.customFonts[i];
            $("#fontList").append('<option value="' + font + '" style="font-family:' + font + ';">' + font.slice(0, 1).toUpperCase() + font.slice(1) + '</option>');
        }
    }
    // Set certain modules' checkboxes to disabled if specific conditions are not met
    if (groups.indexOf("chatmoderator") === -1 && groups.indexOf("sysop") === -1 && groups.indexOf("staff") === -1 && groups.indexOf("helper") === -1 && groups.indexOf("vstf") === -1) {
        $("#multiKick").attr("disabled", true);
    }
    if (mw.config.get('wgServer') !== "http://callofduty.wikia.com") {
        $("#ignoreURL").attr("disabled", true);
    }
    $("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected", "selected"); // sets the font selector to the one chosen currently
}




// Add Options button
if (!$("#chatOptionsButton").length) {
    $('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Options</div>'); // Prevent multiple buttons from being appended
}

window.onload = updateChatSkin();

