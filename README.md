# KSBS
Remove comment trolls from a Kickstarter campaign for as long as your viewing the page

## Compatability
This was tested in chromium based browsers such as Brave Browser (yeah for Brave), Google Chrome, and Microsoft Edge and should work in all of those.  In addition this script is pretty boiler plate, so it should also work in other popular browsers.  The method for permanently adding a troll link to your list is pretty similar in other browsers as well.

## Bookmarklet Code
Here is the full minified bookmarklet code for anyone who cares to add it to their browser.  After adding the bookmark all one must do is click the bookmark, and all comments from the included trolls list (see "Auto-Remove" below) will disappear.  Clicking on any "Trolls" avatar will remove those as well.



## Adding the bookmark
Add a new bookmark, give it a name, and add the above code as the URL and save.

## Auto-Remove
If there are some particular trolls you want to always remove without having to click on them each time and want to "Auto-Remove" them just by clicking the bookmarklet, add them to the "kickstarterCommentTrolls" list in the bookmarketly code.  Edit that list using the example below as a guide.  Hint: if you right click on the "trolls" picture and click inspect you should be able to see the img tag "src" attribute (source)

Example: var kickstarterCommentTrolls=["avatarLink1","avatarLink2"];

## Notes
1: if the bookmarklet stops working it's probably because Kicstarter changed their page code, so a few tweeks would get us up and running again.

2: if the "Auto-Remove" on first click stops working, then you'll need to remove and re-add their "src."
