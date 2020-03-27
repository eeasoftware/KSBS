javascript:(
    function() {
        /**
         * Offending profile list for Auto-Removal
         */
        const kickstarterCommentTrollsAutoRemove=[];


        /**
         * Create style for troll user hover effect
         */
        // style declaration
        const css = 'img.avatar:hover{ border: 2px solid red; cursor:pointer; }';
        // create a new style element for the document (comments web page)
        const style = document.createElement('style');
        if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); }
        // add style element to the page head tag so our pretty circles can be seen when we hover over a user image
        document.getElementsByTagName('head')[0].appendChild(style);


        /**
         * Create script for global comment troll list
         */
        // troll list declaration
        const js = 'var kickstarterCommentTrolls = ' + JSON.stringify(kickstarterCommentTrollsAutoRemove) + ';';
        // create a new script element for the document (comments web page)
        const script = document.createElement('script');
        script.type="text/javascript";
        script.innerHTML = js;
        // add script element to the page head tag so our troll list can be cumulative based on profile clicks
        document.getElementsByTagName('head')[0].appendChild(script);
    


        /**
         * Help function to determine if the comments page has already been scanned for the 
         * first time by looking at the classes added to the elements
         */
        var hasClass = function (element, selector) {
            var classN = element.getAttribute("class");

            if (classN === null) {
                return false;
            }
    
            var idx = classN.indexOf(selector);

            return (idx > -1);
        };


        /**
         * Ban a troll from the relm of your comments forever (or at least until you refresh the page)
         */
        function banishTroll(event) {

            // get clicked on troll
            const possibleTroll = event.target || event.srcElement;
    
            if (possibleTroll.classList.contains('possibleTroll') === true) {
                // get the troll's essence so you can train your sentries to recognize the foul stench of the troll
                var essenceOfTroll = possibleTroll.parentNode.childNodes[1].childNodes[0].innerHTML;
    
                // add troll to the comment troll list
                kickstarterCommentTrolls.push(essenceOfTroll);
    
                // silence the troll
                silenceThem(essenceOfTroll);
            }
        };


        /**
         * Function to silence unwanted comment trolls
         */
        async function silenceThem(essenceOfTrolls = false) {

            // determine if it's a list of offending trolls or a single offending troll
            if (essenceOfTrolls === false) {
                essenceOfTrolls = kickstarterCommentTrolls;
            } else {
                essenceOfTrolls = [essenceOfTrolls];
            }
    
            // remove troll comment blocks (this includes any responses, which let's face it, can resemble troll behaviour from time to time)
            for (var essenceOfTroll of essenceOfTrolls) {
    
                var trollList = document.evaluate("//span[contains(., '" + essenceOfTroll + "')]", document, null, XPathResult.ANY_TYPE, null );
    
                var troll, trolls = [];
                while (troll = trollList.iterateNext()) {
                    trolls.push(troll);
                }
    
                for (const troll of trolls) {
                    const trollCommentBlock = troll.parentNode.parentNode.parentNode.parentNode.parentNode;
                    trollCommentBlock.remove();
                }
            }
        };


        /**
         * As more trolls enter your hunting grounds, send out your sentries to lay claim to the land and watch for trolls
         */
        async function expandHuntingGrounds() {

            var newGroundsList = document.evaluate("//span[contains(., 'Load previous replies')]", document, null, XPathResult.ANY_TYPE, null );
    
            var newGround, newGrounds = [];
            while (newGround = newGroundsList.iterateNext()) {
                newGrounds.push(newGround);
            }
    
            // look under every rock and in every cave...they are out there hiding
            for (const newGround of newGrounds) {
                const newGroundScope = newGround.parentNode;
                if (newGroundScope.tagName == 'BUTTON') {
                    await newGroundScope.click();
                }
            }
        };


        /**
         * Go on the attack and launch a troll hunt whenever new trolls are detected
         */
        async function trollHunt(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length > 0) {
                        
                        // expand your grounds and be patient
                        await expandHuntingGrounds();

                        // time your attack to do the most damage to the trolls
                        setTimeout(async function(){
                            await markPossibleTrolls();
                            await silenceThem();
                        }, 1000);
                    }
                    break;
                }
            }
        };


        /**
         * Keep a sharp eye on creatures entering your hunting grounds, any one of them could be a troll
         */
        async function markPossibleTrolls() {
        
            // find them all
            var possibleTrolls = document.querySelectorAll("#react-project-comments img.avatar");
            
            var firstNode = true;
            for (const possibleTroll of possibleTrolls) {
                if (firstNode === true) {
                    firstNode = false;
                    continue;
                }
    
                // brand them as possible trolls
                if (hasClass(possibleTroll, "possibleTroll") === false) {
                    possibleTroll.className += " possibleTroll";
                }
            }
        };


        /**
         * Mark your territory and begin monitoring the grounds for any new trolls
         */
        async function establishHuntingGrounds() {
            var commentList = document.querySelector("#react-project-comments");
            
            if (hasClass(commentList, "trollHuntingGrounds") === false) {
    
                // post sentries to stand guard
                var commentListConfig = { childList: true, subtree: true };
                const trollHunters = new MutationObserver(trollHunt);
                trollHunters.observe(commentList, commentListConfig);
    
                // set up camp
                classN = commentList.getAttribute("class");
                if (classN === null) {
                    commentList.setAttribute("class", "trollHuntingGrounds");
                } else {
                    commentList.className += " trollHuntingGrounds";
                }
    
                // send your sentries on patrol
                document.addEventListener('click', banishTroll, false);
            }
    
            // make an initial sweep of the territory to create a perimeter
            await markPossibleTrolls();
            await silenceThem();
        };


        /**
         * It's go time, stake your claim and Auto-Patrol any existing trolls in your domain
         */
        establishHuntingGrounds();
    }
)();
