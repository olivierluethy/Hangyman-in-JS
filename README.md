# Mastermind-in-JS
Mastermind made with JavaScript

## Errors and findings I would have liked to know
Issue 1: How to get the background-color of an element with JavaScript?<br>
Solution: When you have the code like this:

HTML
```html
<!-- Color options for the user -->
<div id="circle-options">
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <button class="circles"></button>
    <div class="delete"><i class="fa fa-angle-left"></i> Delete</div>
</div>
```

CSS
```css
.circles:nth-child(1) {
    height: 50px;
    width: 50px;
    background-color: pink;
    border-radius: 50%;
    border: 2px solid black;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(2) {
    height: 50px;
    width: 50px;
    background-color: red;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(3) {
    height: 50px;
    width: 50px;
    background-color: lightblue;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(4) {
    height: 50px;
    width: 50px;
    background-color: blue;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(5) {
    height: 50px;
    width: 50px;
    background-color: yellow;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 2rem;
    cursor: pointer;
}
.circles:nth-child(6) {
    height: 50px;
    width: 50px;
    background-color: orange;
    border-radius: 50%;
    border: 2px solid black;
    display: inline-block;
    margin-right: 0.1rem;
    cursor: pointer;
}
```

JavaScript
```javascript
document.addEventListener("click", (e) => {
    var element = e.target;
    if (element.tagName == "BUTTON") {
        console.log(element.style.backgroundColor);
})
```
It won't work, because JavaScript can't see the CSS style from a separate file. 
JavaScript doesn't even show an error message, which is for my opinion quite weird. It just displays anything and when you add the variable to the console.log() function it starts a new line in the console, but it doesn't display something.
The only thing you could do here is to specify the background-color yourself.
Here's the link in where I realised that: <br>
http://www.java2s.com/Tutorials/Javascript/Style/Color/Get_background_Color_in_JavaScript.htm <br>
I was testing the code in codepen.com first and it worked. But when I put all the css into the css folder, I didn't work anymore.
And there I realised this issue. I was a bit disappointing because in the internet no one says that it doesn't work that way.