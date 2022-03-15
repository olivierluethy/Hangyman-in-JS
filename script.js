var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let words = ["ABART", "AFFIG", "AFTER", "BADEN", "BAMBI", "PEDAL", "PERLE", "PFAHL", "PFAND", "PFEIL", "PFERD", "PFLUG", "PFOTE", "PFUND", "PHASE", "PIANO", "PILLE", "PILOT", "PIRAT", "PISTE", "PIXEL", "PLAGE", "PLATZ", "POKAL", "POKER", "POREN", "PREIS", "PRINZ", "PUDER", "PUMPE", "PUPPE", "PUSTE", "QUALM", "QUARZ", "RACHE", "RADAU", "RADIO", "RAMPE", "RANKE", "RATTE", "RAUCH", "RAUPE", "RECHT", "REGAL", "REGEL", "REGEN"];
var chosenLetter = "";
var word = words[Math.floor(Math.random() * words.length)];
word = word.toUpperCase();
document.getElementById("word").innerHTML = "The word was " + word;
arrayWord = Array.from(word);
var wordLength = arrayWord.length;

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
        for (let i = 0; i < arrayWord.length; i++) {
            if (arrayWord[i] == chosenLetter) {
                document.querySelector("#inputFields input:nth-child(" + (i + 1) + ")").value = arrayWord[i];
                wordLength--;

                if (wordLength == 0) {
                    modal.style.display = "block";
                }
            }
        }
    }
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}