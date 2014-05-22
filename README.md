wikia-js-snippets
=================

A collection of JavaScript snippets for use on Wikia, mainly with the Gadgets extension.

Follow this repo if you want to stay up-to-date on any scripts here you use.

Installation
============

Chat Options
------------
1. Place `<img style="display:none;" src="http://images2.wikia.nocookie.net/runescape/images/2/21/1x1-pixel.png" onload="if (!loaded&&!$('script[src$=\'Chat.js/load.js\']').length) {var loaded = true;var b=document.createElement('script');b.setAttribute('src','http://callofduty.wikia.com/index.php?title=MediaWiki:Chat.js/load.js&action=raw&ctype=text/javascript');b.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(b);}" />` in your wiki's *MediaWiki:Chat-welcome-message* file.
2. Place `var b=document.createElement('script');b.innerHTML='\nfunction importScript(b){var a=wgScript+"?title="+encodeURIComponent(b.replace(/ /g,"_")).replace(/%2F/ig,"/").replace(/%3A/ig,":")+"&action=raw&ctype=text/javascript";return importScriptURI(a)}\nfunction importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}\nfunction importScriptPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/javascript";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importScriptURI(a)}\nfunction importStylesheet(a){return importStylesheetURI(wgScript+"?action=raw&ctype=text/css&title="+encodeURIComponent(a.replace(/ /g,"_")))}\nfunction importStylesheetURI(b,d){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";a.href=b;if(d){a.media=d}document.getElementsByTagName("head")[0].appendChild(a);return a}\nfunction importStylesheetPage(b,d){var a="/index.php?title="+encodeURIComponent(b.replace(/ /g,"_")).replace("%2F","/").replace("%3A",":")+"&action=raw&ctype=text/css";if(typeof d=="string"){if(d.indexOf("://")==-1){a="http://"+d+".wikia.com"+a}else{a=d+a}}return importStylesheetURI(a)}\nfunction addOnloadHook(func) {$(func);}\n';document.getElementsByTagName('head')[0].appendChild(b);` in your wiki's *MediaWiki:Chat.js/load.js* file.
3. Also in that file, place `importScript('MediaWiki:Chat.js');`
4. If you wish to keep the options script **maintenance free** and **always up-to-date**, place `importScriptPage('ChatOptions/code.js', 'dev');` in *MediaWiki:Chat.js*. You no longer need to follow the instructions on the page. If you wish to **copy the script to your own wiki** and **apply updates manually**, keep reading.
5. In *MediaWiki:Chat.js*, place `importScript('MediaWiki:Chat.js/options.js');`.
6. In *MediaWiki:Chat.js/options.js*, paste the contents of [this file](https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js).
7. Chat Options should now be installed on your wiki!

Rollback Mods
-------------
1. Place `$.getScript("https://raw.github.com/sactage/wikia-js-snippets/master/RollbackMods.js");` in any JS file, such as *MediaWiki:Wikia.js* or *MediaWiki:Monobook.js*. You can also place it in your global.js file on Community Central.

Quick Licence
-------------
1. Place `$.getScript("https://raw.github.com/sactage/wikia-js-snippets/master/QuickLicence.js");` in any JS file, such as *MediaWiki:Wikia.js* or *MediaWiki:Monobook.js*. You can also place it in your global.js file on Community Central.

