# Hangyman (JavaScript)

A browser-based Hangman word-guessing game written in plain HTML, CSS and vanilla
JavaScript — a web remake of an earlier Discord.py version. Guess the hidden word
letter by letter before the drawing is completed.

## Features

- On-screen keyboard: click letters to guess; used letters are disabled.
- Six wrong guesses allowed, with an SVG hangman figure drawn step by step.
- Words are fetched from the [Datamuse API](https://www.datamuse.com/api/) for fresh
  rounds, with a built-in offline word list as a fallback if the API is unreachable.
- Win / loss state and the ability to start a new round.

## Tech

- HTML, CSS, vanilla JavaScript (no framework, no build step)
- Datamuse API for word generation

## Run

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server
```

Then open http://localhost:8000.
