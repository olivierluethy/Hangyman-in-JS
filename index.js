document.addEventListener('DOMContentLoaded', function () {
    window.onload = function () {

        var words = ['Apple', 'Banana'];

        var word = words[Math.floor(Math.random() * words.length)];

        for (let i = 0; i < word.length; i++) {
            createInputfield();
        }

        document.getElementById("guess").value = "My value";
    }
});

function createInputfield() {
    var input = document.createElement("INPUT");
    var textnode = document.createTextNode("lul");
    input.appendChild(textnode);
    document.getElementById("information").appendChild(input);
    input.setAttribute("id", "guessLetter");
}