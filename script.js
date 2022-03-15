var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let words = ["ABART", "AFFIG", "AFTER", "BADEN", "BAMBI", "PEDAL", "PERLE", "PFAHL", "PFAND", "PFEIL", "PFERD", "PFLUG", "PFOTE", "PFUND", "PHASE", "PIANO", "PILLE", "PILOT", "PIRAT", "PISTE", "PIXEL", "PLAGE", "PLATZ", "POKAL", "POKER", "POREN", "PREIS", "PRINZ", "PUDER", "PUMPE", "PUPPE", "PUSTE", "QUALM", "QUARZ", "RACHE", "RADAU", "RADIO", "RAMPE", "RANKE", "RATTE", "RAUCH", "RAUPE", "RECHT", "REGAL", "REGEL", "REGEN"];
var chosenLetter = "";
var word = words[Math.floor(Math.random() * words.length)];
word = word.toUpperCase();
document.getElementById("word").innerHTML = "The word was " + word;
arrayWord = Array.from(word);
var wordLength = arrayWord.length;
var attemps = 0;
var lucky = false;
var lost = false;

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
    if (lost == false) {
        let element = e.target;
        if (element.tagName == "BUTTON") {
            element.style.backgroundColor = "black";
            element.style.setProperty("text-decoration", "line-through");
            chosenLetter = `${element.innerText}`;
            if (arrayWord.includes(chosenLetter)) {
                for (let i = 0; i < arrayWord.length; i++) {
                    if (arrayWord[i] == chosenLetter) {
                        document.querySelector("#inputFields input:nth-child(" + (i + 1) + ")").value = arrayWord[i];
                    }
                }
                if (wordLength == 0) {
                    winningmodal.style.display = "block";
                }
                wordLength--;
                lucky = true;

                if (wordLength == 0) {
                    winningmodal.style.display = "block";
                }
            } else {
                lucky = false;
            }

            if (lucky == false) {
                attemps++;
                console.log(word);

                if (attemps == 1) {
                    document.querySelector(".thedraw").style.display = "block";
                } else if (attemps == 2) {
                    document.querySelector(".thestand").style.display = "block";
                } else if (attemps == 3) {
                    document.querySelector(".thehang").style.display = "block";
                } else if (attemps == 4) {
                    document.querySelector(".therope").style.display = "block";
                } else if (attemps == 5) {
                    document.querySelector(".theman .head").style.display = "block";
                } else if (attemps == 6) {
                    document.querySelector(".theman .body").style.display = "block";
                } else if (attemps == 7) {
                    document.querySelector(".theman .hands").style.display = "block";
                } else if (attemps == 8) {
                    document.querySelector(".theman .legs").style.display = "block";
                    lostmodal.style.display = "block";
                    lost = true;
                }
                lucky = false;
            }
        }
    } else if (lost == true) {
        var button = document.getElementsByTagName("BUTTON");
        for (var i = 0; i < button.length; i++) {
            if (button[i].disabled == false) {
                button[i].style.backgroundColor = "gray";
                button[i].style.setProperty("text-decoration", "none");
                button[i].style.setProperty("cursor", "context-menu");
                button[i].disabled = true;
            }
        }
    }
})

// Get the modal when you have won
var winningmodal = document.getElementById("winningModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    winningmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == winningmodal) {
        winningmodalmodal.style.display = "none";
    }
}

// Get the modal when you have lost
var lostmodal = document.getElementById("lostModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    lostmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == lostmodal) {
        lostmodalmodal.style.display = "none";
    }
}