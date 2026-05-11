# NATO Phonetic

A small static web app for practicing the NATO (ICAO) phonetic alphabet — Alfa through Zulu.

Four practice modes:

- **Listen** — hear the word, pick the letter
- **Read** — see a letter, pick the word
- **Spell** — see a word, pick the letter
- **Speak** — see a letter, say the word (uses the browser's speech recognition)

Letters are grouped into four sets (A–G, H–N, O–T, U–Z) so you can drill smaller chunks.

## Running locally

It's plain HTML/JS/CSS — open `index.html` in a browser, or serve the directory:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Speech features (Listen / Speak) need a browser that supports the Web Speech API (Chrome, Safari, Edge).
