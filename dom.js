// ** Events ** //

/*
The Document Object Model (DOM) is the data representation of the objects that comprise the structure and content of a document on the web. This guide will introduce the DOM, look at how the DOM represents an HTML document in memory and how to use APIs to create web content and applications.

What is the DOM?
The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

A web page is a document that can be either displayed in the browser window or as the HTML source. In both cases, it is the same document but the Document Object Model (DOM) representation allows it to be manipulated. As an object-oriented representation of the web page, it can be modified with a scripting language such as JavaScript.

const paragraphs = document.querySelectorAll("p")
console.log(typeof paragraphs);
console.log(paragraphs);
console.log(paragraphs[0].nodeName);
console.log(paragraphs[1]);
console.log(paragraphs[2]);

All of the properties, methods, and events available for manipulating and creating web pages are organized into objects. For example, the document object that represents the document itself, any table objects that implement the HTMLTableElement DOM interface for accessing HTML tables, and so forth, are all objects.

The DOM is built using multiple APIs that work together. The core DOM defines the entities describing any document and the objects within it. This is expanded upon as needed by other APIs that add new features and capabilities to the DOM. For example, the HTML DOM API adds support for representing HTML documents to the core DOM, and the SVG API adds support for representing SVG documents.

DOM and JavaScript
The previous short example, like nearly all examples, is JavaScript. That is to say, it is written in JavaScript, but uses the DOM to access the document and its elements. The DOM is not a programming language, but without it, the JavaScript language wouldn't have any model or notion of web pages, HTML documents, SVG documents, and their component parts. The document as a whole, the head, tables within the document, table headers, text within the table cells, and all other elements in a document are parts of the document object model for that document. They can all be accessed and manipulated using the DOM and a scripting language like JavaScript.

The DOM is not part of the JavaScript language, but is instead a Web API used to build websites. JavaScript can also be used in other contexts. For example, Node.js runs JavaScript programs on a computer, but provides a different set of APIs, and the DOM API is not a core part of the Node.js runtime.

The DOM was designed to be independent of any particular programming language, making the structural representation of the document available from a single, consistent API. Even if most web developers will only use the DOM through JavaScript, implementations of the DOM can be built for any language, as this Python example demonstrates:

window.onload = ()=> {
    // create a couple of elements in an otherwise empty HTML page
    const heading = document.createElement("h1")
    const headingText = document.createTextNode("Big Head!")
    heading.appendChild(headingText)
    document.body.appendChild(heading)
    console.log(typeof heading)  // object
}

The document and window objects are the objects whose interfaces you generally use most often in DOM programming. In simple terms, the window object represents something like the browser, and the document object is the root of the document itself. Element inherits from the generic Node interface, and together these two interfaces provide many of the methods and properties you use on individual elements. These elements may also have specific interfaces for dealing with the kind of data those elements hold, as in the table object example in the previous section.


const story = document.body.querySelector(".story")
const setText = document.body.querySelector("#set-text")
setText.addEventListener("click", ()=> {
    story.textContent = "It was a dark and stormy night..."
})

const clearText = document.body.querySelector("#clear-text")
clearText.addEventListener("click", ()=> {
    story.textContent = ""      // null can be used also
})


const parent = document.body.querySelector(".parent");
const addChild = document.body.querySelector("#add-child");

addChild.addEventListener("click", () => {
  if (parent.childNodes.length > 1) {
    return;
  }
  const child = document.createElement("div");
  child.classList.add("newChild");         // add() adds class="newChild"
  child.textContent = "child";
  child.style.color = "white";
  child.style.backgroundColor = "blue";
  parent.appendChild(child);
});

const removeChild = document.body.querySelector("#remove-child")
removeChild.addEventListener("click", ()=> {
    const newChild = document.body.querySelector(".newChild")
    if(parent.childNodes.length > 1) {
        parent.removeChild(newChild)
    }
})

Using the Document Object Model
The Document Object Model (DOM) is an API for manipulating DOM trees of HTML and XML documents (among other tree-like documents). This API is at the root of the description of a page and serves as a base for scripting on the web.

What is a DOM tree?
A DOM tree is a tree structure whose nodes represent an HTML or XML document's contents. Each HTML or XML document has a DOM tree representation. For example, consider the following document:
<html lang="en">
  <head>
    <title>My Document</title>
  </head>
  <body>
    <h1>Header</h1>
    <p>Paragraph</p>
  </body>
</html>

It has a DOM tree that looks like this:

The DOM as a tree-like representation of a document that has a root and node elements containing content

Document -> HTML(HEAD), (BODY)-> (HEAD-> TITLE -> "MY Document"), (BODY-> h1, p)-> h1("Header"), p("Paragraph")

Although the above tree is similar to the above document's DOM tree, it's not identical, as the actual DOM tree preserves whitespace.

When a web browser parses an HTML document, it builds a DOM tree and then uses it to display the document.

What does the Document API do?
The Document API, also sometimes called the DOM API, allows you to modify a DOM tree in any way you want. It enables you to create any HTML or XML document from scratch or to change any contents of a given HTML or XML document. Web page authors can edit the DOM of a document using JavaScript to access the document")}} property of the global object. This document object implements the Document interface.

A simple example
Suppose the author wants to change the header of the above document and write two paragraphs instead of one. The following script would do the job:


function change() {
    const header = document.getElementsByTagName("h2").item(0)
    // console.log(typeof header)              // object
    // console.log(header)   // html collection as an array
    // console.log(typeof header)      // h2 as an object
    header.firstChild.data = "A dynamic document"
    // console.log(header)

    const para = document.getElementsByTagName("p").item(5)
    // console.log(para)
    para.firstChild.data = "This is the first Paragraph"
    // console.log(para)

    const newParaElem = document.createElement("p")
    const newParaText = document.createTextNode("This is the new second paragraph.")

    newParaElem.appendChild(newParaText)
    // console.log(newParaElem)
    para.parentNode.appendChild(newParaElem);
}

getElementsByTagName(tagNameValue) is a method available in any DOM Element or the root Document element. When called, it returns an array with all of the element's descendants matching the tag name. The first element of the list is located at position [0] in the array.

We've performed following steps:

1. First, we get all the p elements in the document:
const paragraphs = document.getElementsByTagName("p");

2. Then we get the second paragraph element from the list of p elements:
const secondParagraph = paragraphs[1];

3. Finally, we set background color to red using the style property of the paragraph object:
secondParagraph.style.background = "red";


const p_one = document.getElementsByTagName("p");
p_one[0].style.background = "blue"

first_paragraph = p_one[0]
console.log(first_paragraph);
// first_paragraph.style.background = 'red'



Creating TextNodes with document.createTextNode("..")
Use the document object to invoke the createTextNode method and create your text node. You just need to pass the text content. The return value is an object that represents the text node.

myTextNode = document.createTextNode("world");
Copy to Clipboard
This means that you have created a node of the type TEXT_NODE (a piece of text) whose text data is "world", and myTextNode is your reference to this node object. To insert this text into your HTML page, you need to make this text node a child of some other node element.

Inserting Elements with appendChild(..)
So, by calling secondParagraph.appendChild(node_element), you are making the element a new child of the second <p> element.

secondParagraph.appendChild(myTextNode);
Copy to Clipboard
After testing this sample, note that the words hello and world are together: helloworld. So visually, when you see the HTML page it seems like the two text nodes hello and world are a single node, but remember that in the document model, there are two nodes. The second node is a new node of type TEXT_NODE, and it is the second child of the second <p> tag. The following figure shows the recently created Text Node object inside the document tree.

const p_one = document.getElementsByTagName("p");
myTextNode = document.createTextNode(" - 5")
p_one[4].appendChild(myTextNode)

Creating TextNodes with document.createTextNode("..")
Use the document object to invoke the createTextNode method and create your text node. You just need to pass the text content. The return value is an object that represents the text node.

myTextNode = document.createTextNode("world");

This means that you have created a node of the type TEXT_NODE (a piece of text) whose text data is "world", and myTextNode is your reference to this node object. To insert this text into your HTML page, you need to make this text node a child of some other node element.

Inserting Elements with appendChild(..)
So, by calling p_one[4].appendChild(node_element), you are making the element a new child of the five <p> element.


After testing this sample, note that the words hello and world are together: helloworld. So visually, when you see the HTML page it seems like the two text nodes hello and world are a single node, but remember that in the document model, there are two nodes. The second node is a new node of type TEXT_NODE, and it is the second child of the second <p> tag. The following figure shows the recently created Text Node object inside the document tree.


Creating New Elements with the document object and the createElement(..) method
You can create new HTML elements or any other element you want with createElement. For example, if you want to create a new <p> element as a child of the <body> element, you can use the myBody in the previous example and append a new element node. To create a node call document.createElement("tagname"). For example:

const mybody = document.querySelectorAll("body");
console.log(mybody);     // NodeList[body] is an array with lenght 1


myNewPTagNode = document.createElement("p");
myNewPTagNode.innerText = "Hello"
mybody[0].appendChild(myNewPTagNode)  // 0 means length 1 of an array


Removing nodes with the removeChild(..) method
Nodes can be removed. The following code removes text node myTextNode (containing the word "world") from the second <p> element, secondParagraph.

mybody[0].removeChild(myNewPTagNode)
*/



/*
Locating DOM elements using selectors

The Selectors API provides methods that make it quick and easy to retrieve Element nodes from the DOM by matching against a set of selectors. This is much faster than past techniques, wherein it was necessary to, for example, use a loop in JavaScript code to locate the specific items you needed to find.

The NodeSelector interface
This specification adds two new methods to any objects implementing the Document, DocumentFragment, or Element interfaces:

querySelector()
Returns the first matching Element node within the node's subtree. If no matching node is found, null is returned.

querySelectorAll()
Returns a NodeList containing all matching Element nodes within the node's subtree, or an empty NodeList if no matches are found.

Note: The NodeList returned by querySelectorAll() is not live, which means that changes in the DOM are not reflected in the collection. This is different from other DOM querying methods that return live node lists.

Selectors
The selector methods accept selectors to determine what element or elements should be returned. This includes selector lists so you can group multiple selectors in a single query.
To protect the user's privacy, some pseudo-classes are not supported or behave differently. For example :visited will return no matches and :link is treated as :any-link.
Only elements can be selected, so pseudo-classes are not supported.

Examples
To select all paragraph (p) elements in a document whose classes include warning or note, you can do the following:
const special = document.querySelectorAll("p.warning, p.note");
Copy to Clipboard
You can also query by ID. For example:
const el = document.querySelector("#main, #basic, #exclamation");
After executing the above code, el contains the first element in the document whose ID is one of main, basic, or exclamation.
*/


/*
Introduction to events

Events are things that happen in the system you are programming, which the system tells you about so your code can react to them.

For example, if the user clicks a button on a webpage, you might want to react to that action by displaying an information box. In this article, we discuss some important concepts surrounding events, and look at how they work in browsers. This won't be an exhaustive study; just what you need to know at this stage.

Prerequisites: Basic computer literacy, a basic understanding of HTML and CSS, JavaScript first steps.

Objective: To understand the fundamental theory of events, how they work in browsers, and how events may differ in different programming environments.

What is an event?
Events are things that happen in the system you are programming — the system produces (or "fires") a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken (that is, some code running) when the event occurs. Events are fired inside the browser window, and tend to be attached to a specific item that resides in it. This might be a single element, a set of elements, the HTML document loaded in the current tab, or the entire browser window. There are many different types of events that can occur.

For example:
1. The user selects, clicks, or hovers the cursor over a certain element.
2. The user chooses a key on the keyboard.
3. The user resizes or closes the browser window.
4. A web page finishes loading.
5. A form is submitted.
6. A video is played, paused, or ends.
7. An error occurs.

To react to an event, you attach an event handler to it. This is a block of code (usually a JavaScript function that you as a programmer create) that runs when the event fires. When such a block of code is defined to run in response to an event, we say we are registering an event handler. Note: Event handlers are sometimes called event listeners — they are pretty much interchangeable for our purposes, although strictly speaking, they work together. The listener listens out for the event happening, and the handler is the code that is run in response to it happening.

Note: Web events are not part of the core JavaScript language — they are defined as part of the APIs built into the browser.


const btn = document.querySelector(".btn")

// Then we have some JavaScript. We will look at this in more details in the next section, but for now we can just say: it adds an event handler to the button's "click" event, and the handler reacts to the event by setting the page background to a random color:

function random(number) {
  return Math.floor(Math.random() * (number + 1));
}

// console.log(Math.floor(Math.random() * 10)) it will shows different number between 0 to 9.

btn.addEventListener("click", ()=> {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`
  btn.style.backgroundColor = rndCol
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
})

console.log(typeof btn) // object
console.log(typeof btn.addEventListener); // function


//click
const btn = document.querySelector(".btn")
function random(number) {
  return Math.floor(Math.random() * (number + 1))
}

function handerFunction() {
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  btn.style.backgroundColor = rndColor;
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
}

btn.addEventListener("click", handerFunction)


// focus
// when something is fucused, click again cannot work untill click is given outsite of the focused input, button or anything. And then click again will change the fucused.

const btn = document.querySelector(".btn")
function random(number) {
  return Math.floor(Math.random() * (number + 1))
}

function handerFunction() {
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  btn.style.backgroundColor = rndColor;
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
}

btn.addEventListener("click", handerFunction)

// blur
when something is blurred, click again cannot change it but if click is done outside of the blurred thing, then this click will change the blurred.

const btn = document.querySelector(".btn")
function random(number) {
  return Math.floor(Math.random() * (number + 1))
}

function handerFunction() {
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  btn.style.backgroundColor = rndColor;
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
}

btn.addEventListener("click", handerFunction)


Listening for other events
There are many different events that can be fired by a button element. Let's experiment.

First, make a local copy of random-color-addeventlistener.html, and open it in your browser. It's just a copy of the simple random color example we've played with already. Now try changing click to the following different values in turn, and observing the results in the example:

focus and blur — The color changes when the button is focused and unfocused; try pressing the tab to focus on the button and press the tab again to focus away from the button. These are often used to display information about filling in form fields when they are focused, or to display an error message if a form field is filled with an incorrect value.

1. dblclick — The color changes only when the button is double-clicked.
2. mouseover and mouseout — The color changes when the mouse pointer hovers over the button, or when the pointer moves off the button, respectively.
Some events, such as click, are available on nearly any element. Others are more specific and only useful in certain situations: for example, the play event is only available on some elements, such as <video>.
*/


/*
Removing listeners
If you've added an event handler using addEventListener(), you can remove it again using the removeEventListener() method. For example, this would remove the changeBackground() event handler:

btn.removeEventListener("click", handerFunction);

Event handlers can also be removed by passing an AbortSignal to addEventListener() and then later calling abort() on the controller owning the AbortSignal. For example, to add an event handler that we can remove with an AbortSignal:

const controller = new AbortController();

btn.addEventListener(
  "click",
  () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
  },
  { signal: controller.signal }
); // pass an AbortSignal to this handler

Then the event handler created by the code above can be removed like this:

controller.abort(); // removes any/all event handlers associated with this controller

For simple, small programs, cleaning up old, unused event handlers isn't necessary, but for larger, more complex programs, it can improve efficiency. Also, the ability to remove event handlers allows you to have the same button performing different actions in different circumstances: all you have to do is add or remove handlers.


Other event listener mechanisms

We recommend that you use addEventListener() to register event handlers. It's the most powerful method and scales best with more complex programs. However, there are two other ways of registering event handlers that you might see: event handler properties and inline event handlers.

Event handler properties
Objects (such as buttons) that can fire events also usually have properties whose name is on followed by the name of the event. For example, elements have a property onclick. This is called an event handler property. To listen for the event, you can assign the handler function to the property.

For example, we could rewrite the random-color example like this:

const btn = document.querySelector(".btn")
function random(number) {
  return Math.floor(Math.random() * (number + 1))
}

btn.onclick = () => {                   // this is an anonymous function
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  btn.style.backgroundColor = rndColor
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
}

// We can also set the handler property to a named function too.
const btn = document.querySelector(".btn")
function random(number) {
  return Math.floor(Math.random() * (number + 1))
}

const handler = ()=> {                   // this is a function expression
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  btn.style.backgroundColor = rndColor
  btn.style.border = "none"
  btn.style.borderRadius = "5px"
}

btn.onclick = handler

With event handler properties, you can't add more than one handler for a single event. For example, you can call addEventListener('click', handler) on an element multiple times, with different functions specified in the second argument:

element.addEventListener("click", function1);
element.addEventListener("click", function2);

This is impossible with event handler properties because any subsequent attempts to set the property will overwrite earlier ones:

element.onclick = function1;
element.onclick = function2;



Inline event handlers — don't use these
You might also see a pattern like this in your code:

<button onclick="bgChange()">Press me</button>
Copy to Clipboard
function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}


The earliest method of registering event handlers found on the Web involved event handler HTML attributes (or inline event handlers) like the one shown above — the attribute value is literally the JavaScript code you want to run when the event occurs. The above example invokes a function defined inside a <script> element on the same page, but you could also insert JavaScript directly inside the attribute, for example:

<button onclick="alert('Hello, this is my old-fashioned event handler!');">
  Press me
</button>


You can find HTML attribute equivalents for many of the event handler properties; however, you shouldn't use these — they are considered bad practice. It might seem easy to use an event handler attribute if you are doing something really quick, but they quickly become unmanageable and inefficient.

For a start, it is not a good idea to mix up your HTML and your JavaScript, as it becomes hard to read. Keeping your JavaScript separate is a good practice, and if it is in a separate file you can apply it to multiple HTML documents.

Even in a single file, inline event handlers are not a good idea. One button is OK, but what if you had 100 buttons? You'd have to add 100 attributes to the file; it would quickly turn into a maintenance nightmare. With JavaScript, you could easily add an event handler function to all the buttons on the page no matter how many there were, using something like this:


const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", bgChange);
}

Finally, many common server configurations will disallow inline JavaScript, as a security measure.

You should never use the HTML event handler attributes — those are outdated, and using them is bad practice.
*/



/*
// Event objects
Sometimes, inside an event handler function, you'll see a parameter specified with a name such as event, evt, or e. This is called the event object, and it is automatically passed to event handlers to provide extra features and information. For example, let's rewrite our random color example again slightly:


const btn = document.querySelector(".btn");

function random(number) {
  return Math.floor(Math.random() * (number + 1))
} 

function bgChange(e) {
  const rndColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  e.target.style.backgroundColor = rndColor;
  e.target.style.borderRadius = "5px";
  e.target.style.border = "none"
  console.log(e)
  console.log(typeof e)
}
btn.addEventListener("click", bgChange)

Here you can see we are including an event object, e, in the function, and in the function setting a background color style on e.target — which is the button itself. The target property of the event object is always a reference to the element the event occurred upon. So, in this example, we are setting a random background color on the button, not the page.

Note: You can use any name you like for the event object — you just need to choose a name that you can then use to reference it inside the event handler function. e/evt/event is most commonly used by developers because they are short and easy to remember. It's always good to be consistent — with yourself, and with others if possible.


Extra properties of event objects
Most event objects have a standard set of properties and methods available on the event object; see the Event object reference for a full list.

Some event objects add extra properties that are relevant to that particular type of event. For example, the keydown event fires when the user presses a key. Its event object is a KeyboardEvent, which is a specialized Event object with a key property that tells you which key was pressed:

const textBox = document.querySelector("#textBox")
const output = document.querySelector("#output")

textBox.addEventListener("keydown", (e)=> (output.textContent = `You pressed "${e.key}".`))


Preventing default behavior
Sometimes, you'll come across a situation where you want to prevent an event from doing what it does by default. The most common example is that of a web form, for example, a custom registration form. When you fill in the details and click the submit button, the natural behavior is for the data to be submitted to a specified page on the server for processing, and the browser to be redirected to a "success message" page of some kind (or the same page, if another is not specified).

The trouble comes when the user has not submitted the data correctly — as a developer, you want to prevent the submission to the server and give an error message saying what's wrong and what needs to be done to put things right. Some browsers support automatic form data validation features, but since many don't, you are advised to not rely on those and implement your own validation checks. Let's look at a simple example.

First, s simple HTML form that requires us to enter our first and last name:
Now some JavaScript — here we implement a very simple check inside a handler for the submit event (the submit event is fired on a form when it is submitted) that tests whether the text fields are empty. If they are, we call the preventDefault() function on the event object — which stops the form submission — and then display an error message in the paragraph below our form to tell the user what's wrong:


const form = document.querySelector("form")
// console.log(form)
const fname = document.querySelector("#fname")
const lname = document.querySelector("#lname")
const para = document.querySelector(".formPara")

form.addEventListener("submit", (e)=> {
  if(fname.value === "" || lname.value === "") {
    e.preventDefault();
    para.textContent = "You need to fill in both name!"
  } else {
    e.preventDefault(); // if it is not written p tag cannot hold the value.
    space = " "
    para.textContent= `${fname.value}${space}${lname.value}`
  }
  return para
})
Obviously, this is pretty weak form validation — it wouldn't stop the user from validating the form with spaces or numbers entered into the fields, for example — but it is OK for example purposes. The output is as follows:
*/


/*
Event bubbling
Event bubbling describes how the browser handles events targeted at nested elements.

Setting a listener on a parent element
Consider a web page like this:

<div id="container">
  <button>Click me!</button>
</div>
<pre id="output"></pre>

Here the button is inside another element, a <div> element. We say that the <div> element here is the parent of the element it contains. What happens if we add a click event handler to the parent, then click the button?


const preOutput = document.querySelector("#preOutput")
function handleClick(e) {
  preOutput.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const parentContainer = document.querySelector("#parentContainer")
parentContainer.addEventListener("click", handleClick) // e will contain the reference of the parentContainer(DIV)

You'll see that the parent fires a click event when the user clicks the button:

You clicked on a DIV element
This makes sense: the button is inside the <div>, so when you click the button you're also implicitly clicking the element it is inside.

Bubbling example
What happens if we add event listeners to the button and the parent?


const preOutput = document.querySelector("#preOutput")
function handleClick(e) {
  preOutput.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

// Let's try adding click event handlers to the bottom, its parent(the <div></div>) element, and the (<body></body>) element that contain both of them(button, div).

const btnChild = document.querySelector("#btnChild")
const parentContainer = document.querySelector("#parentContainer")

document.body.addEventListener("click", handleClick)
parentContainer.addEventListener("click", handleClick) // e will contain the reference of the parentContainer(DIV)
btnChild.addEventListener("click", handleClick)

You'll see that all three elements fire a click event when the user clicks the button:

You clicked on a BUTTON element
You clicked on a DIV element
You clicked on a BODY element
In this case:
1. the click on the button fires first
2. followed by the click on its parent (the <div> element)
3. followed by the <div> element's parent (the <body> element).

We describe this by saying that the event bubbles up from the innermost element that was clicked.
This behavior can be useful and can also cause unexpected problems. In the next sections, we'll see a problem that it causes, and find the solution.
*/


/*
Video player example
In this example our page contains a video, which is hidden initially, and a button labeled "Display video". We want the following interaction:

1. When the user clicks the "Display video" button, show the box containing the video, but don't start playing the video yet.
2. When the user clicks on the video, start playing the video.
3. When the user clicks anywhere in the box outside the video, hide the box.

The HTML looks like this:

<button>Display video</button>

<div class="hidden">
  <video>
    <source
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      type="video/webm" />
    <p>
      Your browser doesn't support HTML video. Here is a
      <a href="rabbit320.mp4">link to the video</a> instead.
    </p>
  </video>
</div>

It includes:

1. a <button> element
2. a <div> element which initially has a class="hidden" attribute
3. a <video> element nested inside the <div> element.
We're using CSS to hide elements with the "hidden" class set. Actually visibility: hidden is written in css file to hide the visibility of the image.

The JavaScript looks like this:

const videoBtn = document.querySelector("#videoBtn")
// console.log(videoBtn)
const box = document.querySelector(".hidden")
// console.log(box)
const video = document.querySelector("video")
// console.log(video)
videoBtn.addEventListener("click", ()=> box.classList.remove("hidden")) // remove the class visibility: hidden and show the image in the browser.
video.addEventListener("click", ()=> video.play());
box.addEventListener("click", ()=> box.classList.add("hidden"));

You should see that when you click the button, the box and the video it contains are shown. But then when you click the video, the video starts to play, but the box is hidden again!

The video is inside the <div> — it is part of it — so clicking the video runs both the event handlers, causing this behavior.

Fixing the problem with stopPropagation()
As we saw in the last section, event bubbling can sometimes create problems, but there is a way to prevent it. The Event object has a function available on it called stopPropagation() which, when called inside an event handler, prevents the event from bubbling up to any other elements.


const videoBtn = document.querySelector("#videoBtn")
// console.log(videoBtn)
const box = document.querySelector(".hidden")
// console.log(box)
const video = document.querySelector("video")
// console.log(video)

videoBtn.addEventListener("click", ()=> box.classList.remove("hidden"))
video.addEventListener("click", (e)=> {
  e.stopPropagation();
  video.play();
});
box.addEventListener("click", ()=> box.classList.add("hidden"))

All we're doing here is calling stopPropagation() on the event object in the handler for the <video> element's 'click' event. This will stop that event from bubbling up to the box. Now try clicking the button and then the video:
*/




/*
Event capture
An alternative form of event propagation is event capture. This is like event bubbling but the order is reversed: so instead of the event firing first on the innermost element targeted, and then on successively less nested elements, the event fires first on the least nested element, and then on successively more nested elements, until the target is reached.

Event capture is disabled by default. To enable it you have to pass the capture option in addEventListener().

This example is just like the bubbling example we saw earlier, except that we have used the capture option:

<body>
  <div id="container">
    <button>Click me!</button>
  </div>
  <pre id="output"></pre>
</body>

const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `You clicked on a ${e.currentTarget.tagName} element\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick, { capture: true });
container.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);

In this case, the order of messages is reversed: the <body> event handler fires first, followed by the <div> event handler, followed by the <button> event handler:

You clicked on a BODY element
You clicked on a DIV element
You clicked on a BUTTON element

Why bother with both capturing and bubbling? In the bad old days, when browsers were much less cross-compatible than now, Netscape only used event capturing, and Internet Explorer used only event bubbling. When the W3C decided to try to standardize the behavior and reach a consensus, they ended up with this system that included both, which is what modern browsers implement.

By default almost all event handlers are registered in the bubbling phase, and this makes more sense most of the time.
*/



/*
Event delegation
In the last section, we looked at a problem caused by event bubbling and how to fix it. Event bubbling isn't just annoying, though: it can be very useful. In particular, it enables event delegation. In this practice, when we want some code to run when the user interacts with any one of a large number of child elements, we set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on every child individually.

Let's go back to our first example, where we set the background color of the whole page when the user clicked a button. Suppose that instead, the page is divided into 16 tiles, and we want to set each tile to a random color when the user clicks that tile.

Here's the HTML:
<div id="container">
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
  <div class="tile"></div>
</div>
Copy to Clipboard
We have a little CSS, to set the size and position of the tiles:

.tile {
  height: 100px;
  width: 25%;
  float: left;
}

Now in JavaScript, we could add a click event handler for every tile. But a much simpler and more efficient option is to set the click event handler on the parent, and rely on event bubbling to ensure that the handler is executed when the user clicks on a tile:

function random(number) {
  return Math.floor(Math.random() * number);
}

function bgChange() {
  const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return rndCol;
}

const container = document.querySelector("#container");

container.addEventListener(
  "click",
  (event) => (event.target.style.backgroundColor = bgChange())
);
The output is as follows (try clicking around on it):

Note: In this example, we're using event.target to get the element that was the target of the event (that is, the innermost element). If we wanted to access the element that handled this event (in this case the container) we could use event.currentTarget.
*/



/*
It's not just web pages
Events are not unique to JavaScript — most programming languages have some kind of event model, and the way the model works often differs from JavaScript's way. In fact, the event model in JavaScript for web pages differs from the event model for JavaScript as it is used in other environments.

For example, Node.js is a very popular JavaScript runtime that enables developers to use JavaScript to build network and server-side applications. The Node.js event model relies on listeners to listen for events and emitters to emit events periodically — it doesn't sound that different, but the code is quite different, making use of functions like on() to register an event listener, and once() to register an event listener that unregisters after it has run once. The HTTP connect event docs provide a good example.

You can also use JavaScript to build cross-browser add-ons — browser functionality enhancements — using a technology called WebExtensions. The event model is similar to the web events model, but a bit different — event listeners' properties are camel-cased (such as onMessage rather than onmessage), and need to be combined with the addListener function. See the runtime.onMessage page for an example.

You don't need to understand anything about other such environments at this stage in your learning; we just wanted to make it clear that events can differ in different programming environments.
*/




/*
Conclusion
You should now know all you need to know about web events at this early stage. As mentioned, events are not really part of the core JavaScript — they are defined in browser Web APIs.

Also, it is important to understand that the different contexts in which JavaScript is used have different event models — from Web APIs to other areas such as browser WebExtensions and Node.js (server-side JavaScript). We are not expecting you to understand all of these areas now, but it certainly helps to understand the basics of events as you forge ahead with learning web development.
*/
