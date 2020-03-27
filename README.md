# KSBS
Remove comment trolls from a Kickstarter campaign for as long as your viewing the page

## Compatability
This was tested in chromium based browsers such as Brave Browser (yeah for Brave), Google Chrome, and Microsoft Edge and should work in all of those.  In addition this script is pretty boiler plate, so it should also work in other popular browsers.  The method for permanently adding a troll link to your list is pretty similar in other browsers as well.

## Bookmarklet Code
Here is the full minified bookmarklet code for anyone who cares to add it to their browser.  After adding the bookmark all one must do is click the bookmark, and all comments from the included trolls list (see "Auto-Remove" below) will disappear.  Clicking on any "Trolls" avatar will remove those as well.

javascript:(function(){var kickstarterCommentTrolls=[],css="img.avatar:hover{ border: 36px solid red; cursor:pointer; }",style=document.createElement("style");style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),document.getElementsByTagName("head")[0].appendChild(style);var hasClass=function(element,selector){for(var className=" "+selector+" ",i=0,l=element.length;i<l;i++)if((" "+element[i].className+" ").replace(rclass," ").indexOf(className)>-1)return!0;return!1},banishTroll=function(event){var targetTroll,essenceOfTroll=(event.target||event.srcElement).getAttribute("src");kickstarterCommentTrolls.push(essenceOfTroll),silenceThem(essenceOfTroll)},silenceThem=function(singleEssenceOfTroll=!1){var count=0;if(!1!==singleEssenceOfTroll){var trollComments=document.querySelectorAll('img.avatar[src="'+singleEssenceOfTroll+'"]');for(var trollComment of trollComments){var trollCommentBlock;(trollCommentBlock=trollComment.parentNode.parentNode.parentNode.parentNode).remove(),count++}}else for(var essenceOfTroll of kickstarterCommentTrolls){var trollComments=document.querySelectorAll('img.avatar[src="'+essenceOfTroll+'"]');for(var trollComment of trollComments){var trollCommentBlock;(trollCommentBlock=trollComment.parentNode.parentNode.parentNode.parentNode).remove(),count++}}alert(count+" Troll Comments Removed.")},possibleTrolls=document.querySelectorAll("img.avatar");for(var possibleTroll of possibleTrolls)!0!==hasClass(possibleTroll,"possibleTroll")?(possibleTroll.addEventListener("click",banishTroll),possibleTroll.className+=" possibleTroll"):alert("already has click");silenceThem()})();

## Adding the bookmark
Add a new bookmark, give it a name, and add the above code as the URL and save.

## Auto-Remove
If there are some particular trolls you want to always remove without having to click on them each time, and would like to "Auto-Remove" them just by clicking the bookmarklet, add them to the "kickstarterCommentTrolls" list in the bookmarketly code on the first line.  Edit that list using the example below as a guide.  Right click on the "trolls" picture and click "inspect" to see the img tag "src" attribute.  Copy that link in the same fashion as shown here making sure to encapsulate the link in double quotes and to put a comma inbetween each link.

Example: var kickstarterCommentTrolls=["avatarLink1","avatarLink2"];

## Notes
1: if the bookmarklet stops working it's probably because Kicstarter changed their page code, so a few tweeks would get us up and running again.

2: if the "Auto-Remove" on first click stops working, then you'll need to remove and re-add their "src."
