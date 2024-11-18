const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
// document. => INTERFACE, entry point to he web page's content
// We are returning a node of the current document

// .classList is an Instance Property (https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
// basically .classList is read-only property and returns a live DOMTokenList collection of the class attribures of the element.
// so it can be used to manipulate the class list.
toggle.addEventListener('click', () => 
    document.body.classList.toggle('show-nav')
);

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
// the WINDOW object is the most top object of all the browser and this will allow us to hit 
// our target when we click outside of the current target we can remove the class
// e can be interpreter as Event parameter. Can be interpreter like this:
// window.addEventListener('click', event => event.target == modal ... )
// it has a lot of Methods and Properties that can be used by handlers
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false)