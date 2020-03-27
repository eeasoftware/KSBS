# KSBS
Remove comment trolls from a Kickstarter campaign for as long as your viewing the page

## Compatability
This was tested in chromium based browsers such as Brave Browser (yeah for Brave), Google Chrome, and Microsoft Edge and should work in all of those.  In addition this script is pretty boiler plate, so it should also work in other popular browsers.  The method for permanently adding a troll link to your list is pretty similar in other browsers as well.

## Bookmarklet Code
Here is the full minified bookmarklet code for anyone who cares to add it to their browser.  After adding the bookmark all one must do is click the bookmark, and all comments from the included trolls list (see "Auto-Remove" below) will disappear.  Clicking on any "Trolls" avatar will remove those as well.

javascript:(function(){const kickstarterCommentTrollsAutoRemove=[],css="img.avatar:hover{ border: 2px solid red; cursor:pointer; }",style=document.createElement("style");style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),document.getElementsByTagName("head")[0].appendChild(style);const js="var kickstarterCommentTrolls = "+JSON.stringify(kickstarterCommentTrollsAutoRemove)+";",script=document.createElement("script");script.type="text/javascript",script.innerHTML=js,document.getElementsByTagName("head")[0].appendChild(script);var hasClass=function(element,selector){var classN=element.getAttribute("class"),idx;return null!==classN&&classN.indexOf(selector)>-1};function banishTroll(event){const possibleTroll=event.target||event.srcElement;if(!0===possibleTroll.classList.contains("possibleTroll")){var essenceOfTroll=possibleTroll.parentNode.childNodes[1].childNodes[0].innerHTML;kickstarterCommentTrolls.push(essenceOfTroll),silenceThem(essenceOfTroll)}}async function silenceThem(essenceOfTrolls=!1){for(var essenceOfTroll of essenceOfTrolls=!1===essenceOfTrolls?kickstarterCommentTrolls:[essenceOfTrolls]){for(var trollList=document.evaluate("//span[contains(., '"+essenceOfTroll+"')]",document,null,XPathResult.ANY_TYPE,null),troll,trolls=[];troll=trollList.iterateNext();)trolls.push(troll);for(const troll of trolls){const trollCommentBlock=troll.parentNode.parentNode.parentNode.parentNode.parentNode;trollCommentBlock.remove()}}}async function expandHuntingGrounds(){for(var newGroundsList=document.evaluate("//span[contains(., 'Load previous replies')]",document,null,XPathResult.ANY_TYPE,null),newGround,newGrounds=[];newGround=newGroundsList.iterateNext();)newGrounds.push(newGround);for(const newGround of newGrounds){const newGroundScope=newGround.parentNode;"BUTTON"==newGroundScope.tagName&&await newGroundScope.click()}}async function trollHunt(mutationsList,observer){for(let mutation of mutationsList)if("childList"===mutation.type){mutation.addedNodes.length>0&&(await expandHuntingGrounds(),setTimeout((async function(){await markPossibleTrolls(),await silenceThem()}),1e3));break}}async function markPossibleTrolls(){var possibleTrolls=document.querySelectorAll("#react-project-comments img.avatar"),firstNode=!0;for(const possibleTroll of possibleTrolls)!0!==firstNode?!1===hasClass(possibleTroll,"possibleTroll")&&(possibleTroll.className+=" possibleTroll"):firstNode=!1}async function establishHuntingGrounds(){var commentList=document.querySelector("#react-project-comments");if(!1===hasClass(commentList,"trollHuntingGrounds")){var commentListConfig={childList:!0,subtree:!0};const trollHunters=new MutationObserver(trollHunt);trollHunters.observe(commentList,commentListConfig),classN=commentList.getAttribute("class"),null===classN?commentList.setAttribute("class","trollHuntingGrounds"):commentList.className+=" trollHuntingGrounds",document.addEventListener("click",banishTroll,!1)}await markPossibleTrolls(),await silenceThem()}establishHuntingGrounds()})();

## Adding the bookmark
Add a new bookmark, give it a name, and add the above code as the URL and save.

## Auto-Remove
If there are some particular trolls you want to always remove without having to click on them each time, and would like to "Auto-Remove" them just by clicking the bookmarklet, add them to the "kickstarterCommentTrolls" list in the bookmarketly code on the first line.  Edit that list using the example below as a guide.  Right click on the "trolls" picture and click "inspect" to see the img tag "src" attribute.  Copy that link in the same fashion as shown here making sure to encapsulate the link in double quotes and to put a comma inbetween each link.

Example: var kickstarterCommentTrolls=["avatarLink1","avatarLink2"];

## Notes
1: if the bookmarklet stops working it's probably because Kicstarter changed their page code, so a few tweeks would get us up and running again.

2: if the "Auto-Remove" on first click stops working, then you'll need to remove and re-add their "src."

## For All You FOSS Guys
You can view the expanded full source code with documentation in the ksbs.js file
