#jquery.focuser.js - [Demo](http://kraigh.github.io/jquery-focuser/)

##What?
Focuser is a simple jquery plugin that lets you highlight a specific div (or any element, really) by fading the background around it. This works best when you are trying to highlight content on your page, and was designed to work with "panel" type elements.

The focus state will be canceled after scrolling more than 3 pixels, or after clicking on the background. Clicking another 'focus' link while in a focus state will switch seamlessly to the new target element.

##How?
To use Focuser, just include `jquery.focuser.js on your page and make a link like this, with the targetId of the element you would liek to bring into focus:

    <a href="javascript:; class="focus" data-focus-id="targetId">Focus!</a>

You can even use a button:

    <button type="button" class="focus" data-focus-id="targetId">Focus!</button>

The plugin can also be called via javascript. The id parameter is required, while scroll and offset are not.

    focusOn(id, scroll, offset);
    
##Scrolling?
Focuser can also scroll to your focused content, using the [jquery-smooth-scroll](https://github.com/kswedberg/jquery-smooth-scroll) plugin. Just include jquery.smooth-scroll.js on your page (before jquery.focuser.js) and add the class scroll to any links that you want to scroll.

By default, the scroll will end 10 pixels above the content. You can customize this by adding the data-scroll-offset attribute to your link. Ex:

    <a href="javascript:; class="focus scroll" data-focus-id="targetId" data-scroll-offset="-60">Focus 20px above!</a>
    
##Demo.
View the demo [here](http://kraigh.github.io/jquery-focuser/) or look at /demo in the repo.
