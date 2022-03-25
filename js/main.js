/* Array with letters from A-Z for Buttons */
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/* The array with words, where one word will be taken for the game */
let words = ["ABART", "AFFIG", "AFTER", "BADEN", "BAMBI", "PEDAL", "PERLE", "PFAHL", "PFAND", "PFEIL", "PFERD", "PFLUG", "PFOTE", "PFUND", "PHASE", "PIANO", "PILLE", "PILOT", "PIRAT", "PISTE", "PIXEL", "PLAGE", "PLATZ", "POKAL", "POKER", "POREN", "PREIS", "PRINZ", "PUDER", "PUMPE", "PUPPE", "PUSTE", "QUALM", "QUARZ", "RACHE", "RADAU", "RADIO", "RAMPE", "RANKE", "RATTE", "RAUCH", "RAUPE", "RECHT", "REGAL", "REGEL", "REGEN"];
/* Stores the chosen letter from the user */
var chosenLetter = "";
/* Picks a random word from the word-array */
var word = words[Math.floor(Math.random() * words.length)];
/* Is used for the modal to show, what the hidden word was */
document.getElementById("word1").innerHTML = "The word was " + word;
document.getElementById("word2").innerHTML = "The word was " + word;
/* Turn picked word from string to array */
arrayWord = Array.from(word);
/* Get length of random word-array */
var wordLength = arrayWord.length;
/* To get the number of used attemps */
var attemps = 0;
/* To determine if user guessed correctly */
var lucky = false;
/* To check if user has lost the game or not */
var lost = false;

/* When the website has been loaded */
document.addEventListener('DOMContentLoaded', function() {
    window.onload = function() {

        // Generates all the buttons
        for (i = 0; i < alphabet.length; i++) {
            var button = document.createElement("button");
            var textnode = document.createTextNode(alphabet[i]);
            button.appendChild(textnode);
            document.getElementById("alphabeticButtons").appendChild(button);
        }

        /* Generates the number of input field == number of letters in generated word */
        for (let i = 0; i < word.length; i++) {
            var input = document.createElement("input");
            input.readOnly = true;
            document.getElementById("inputFields").appendChild(input);
        }
    }
});

/* If something has been clicked */
document.addEventListener("click", (e) => {
    /* Check if player already lost the game */
    if (lost == false) {
        let element = e.target;
        /* Check if clicked element is a button */
        if (element.tagName == "BUTTON") {
            /* If yes, button gets some new properties */
            element.style.backgroundColor = "black";
            element.style.setProperty("text-decoration", "line-through");
            element.disabled = true;
            element.style.setProperty("cursor", "context-menu");
            /* Get text from button */
            chosenLetter = `${element.innerText}`;
            /* Check if the array contains an element that is the same as the letter of the variable */
            if (arrayWord.includes(chosenLetter)) {
                /* If it does, determine the index of it */
                for (let i = 0; i < arrayWord.length; i++) {
                    if (arrayWord[i] == chosenLetter) {
                        /* If the value from index is the same a the letter from variable, */
                        /* set the value from input field by using nth-child to fill the correct input field */
                        document.querySelector("#inputFields input:nth-child(" + (i + 1) + ")").value = arrayWord[i];
                    }
                }
                wordLength--;

                /* Check if user already guessed the entire word */
                if (wordLength == 0) {
                    winningmodal.style.display = "block";
                    document.getElementById("playagain").style.display = "block";
                }
                lucky = true;
            }
            /* If the letter isn't in array, the user guessed a wrong */
            else {
                lucky = false;
            }

            /* Check if user has guessed the wrong letter */
            if (lucky == false) {
                attemps++;
                console.log(word);

                /* Is reponsible for the hangman image on the left of the game */
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
                    /* If the user has already used 8 guesses, the last part of the body */
                    /* is shown and the loser-Modal will be displayed */
                    document.querySelector(".theman .legs").style.display = "block";
                    lostmodal.style.display = "block";
                    lost = true;
                    document.getElementById("playagain").style.display = "block";
                }
            }
        }
    }
    /* If user has lost the game */
    else if (lost == true) {
        /* Get an array from all the buttons */
        var button = document.getElementsByTagName("BUTTON");
        /* Go through all the buttons in array */
        for (var i = 0; i < button.length; i++) {
            /* If the button isn't disabled he will be disabled and get some different properties */
            if (button[i].disabled == false) {
                button[i].style.backgroundColor = "gray";
                button[i].style.setProperty("text-decoration", "none");
                button[i].style.setProperty("cursor", "context-menu");
                button[i].disabled = true;
            }
        }
    }
})

/* Shown modal when you have won the game */
/* -------------------------------------- */
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
        winningmodal.style.display = "none";
    }
}

/* Shown modal when you have lost the game */
/* --------------------------------------- */
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
        lostmodal.style.display = "none";
    }
}

/* Restart Game */
document.getElementById("playagain").addEventListener("click", function() {
    window.location = window.location;
})