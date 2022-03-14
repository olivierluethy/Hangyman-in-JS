var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var words = ['abandon', 'ability', 'able', 'abortion', 'about', 'above', 'abroad', 'absence', 'absolute', 'absorb', 'bill', 'billion', 'bag', 'approximately'];
var chosenLetter = "";
var word = words[Math.floor(Math.random() * words.length)];
word = word.toUpperCase();

document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {

        // Generates all the buttons
        for (i = 0; i < alphabet.length; i++) {
            var button = document.createElement("button");
            var textnode = document.createTextNode(alphabet[i]);
            button.appendChild(textnode);
            document.getElementById("alphabeticButtons").appendChild(button);
        }

        for (let i = 0; i < word.length; i++) {
            var input = document.createElement("input");
            input.readOnly = true;
            document.getElementById("inputFields").appendChild(input);
        }
    }
});

document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.tagName == "BUTTON") {
        element.style.backgroundColor = "black";
        element.style.setProperty("text-decoration", "line-through");
        chosenLetter = `${element.innerText}`;
        arrayWord = Array.from(word);
        for (let i = 0; i < arrayWord.length; i++) {
            if (arrayWord[i] == chosenLetter) {
                document.querySelector("#inputFields input:nth-child(" + (i + 1) + ")").value = arrayWord[i];
            }
        }
    } else {}
})