/* =========================================================
 * NATO Phonetic — quiz app
 * Modes: Listen, Read, Spell, Speak
 * ========================================================= */

const state = {
  scope: "sets",           // "all" | "sets"
  selectedSets: new Set(SETS.map(s => s.id)),
  modes: { listen: true, read: true, spell: true, speak: true },
  readShow: "english",
  questions: [],
  index: 0,
  correct: 0,
  missed: [],              // array of { letter, word }
};

const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ---------- helpers ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function lookup(letter) {
  return LETTERS.find(l => l.letter === letter);
}

function activeLetters() {
  if (state.scope === "all") return LETTERS.slice();
  const ids = state.selectedSets;
  const set = new Set();
  SETS.forEach(s => { if (ids.has(s.id)) s.letters.forEach(l => set.add(l)); });
  return LETTERS.filter(l => set.has(l.letter));
}

function activeModes() {
  return Object.entries(state.modes).filter(([, v]) => v).map(([k]) => k);
}

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
}

/* ---------- speech ---------- */
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  try { window.speechSynthesis.cancel(); } catch (e) {}
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1;
  u.lang = "en-US";
  window.speechSynthesis.speak(u);
}

function getRecognizer() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = "en-US";
  r.interimResults = false;
  r.maxAlternatives = 5;
  return r;
}

/* ---------- home rendering ---------- */
function renderSets() {
  const list = $("#sets-list");
  list.innerHTML = "";
  SETS.forEach(s => {
    const row = document.createElement("label");
    row.className = "week-row";
    row.innerHTML = `
      <input type="checkbox" data-set="${s.id}" ${state.selectedSets.has(s.id) ? "checked" : ""} />
      <div>
        <div class="week-label">${s.label}</div>
        <div class="week-range">${s.range}</div>
      </div>
    `;
    list.appendChild(row);
  });
  list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      const id = cb.dataset.set;
      if (cb.checked) state.selectedSets.add(id);
      else state.selectedSets.delete(id);
    });
  });
  list.style.display = state.scope === "sets" ? "" : "none";
}

function bindHome() {
  $$('.pill[data-scope]').forEach(p => {
    p.addEventListener("click", () => {
      $$('.pill[data-scope]').forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      state.scope = p.dataset.scope;
      renderSets();
    });
  });

  ["listen", "read", "spell", "speak"].forEach(m => {
    const cb = $(`#mode-${m}`);
    cb.addEventListener("change", () => { state.modes[m] = cb.checked; });
  });

  $("#start-btn").addEventListener("click", startQuiz);
  $("#quiz-back").addEventListener("click", () => showScreen("screen-home"));
  $("#again-btn").addEventListener("click", startQuiz);
  $("#home-btn").addEventListener("click", () => showScreen("screen-home"));
}

/* ---------- quiz building ---------- */
function buildQuestions() {
  const letters = activeLetters();
  const modes = activeModes();
  if (!letters.length || !modes.length) return [];
  const qs = [];
  letters.forEach(l => {
    const mode = modes[Math.floor(Math.random() * modes.length)];
    qs.push({ mode, letter: l.letter, word: l.word });
  });
  return shuffle(qs);
}

function startQuiz() {
  const qs = buildQuestions();
  if (!qs.length) {
    alert("Pick at least one set and one mode.");
    return;
  }
  state.questions = qs;
  state.index = 0;
  state.correct = 0;
  state.missed = [];
  showScreen("screen-quiz");
  renderQuestion();
}

function updateProgress() {
  const total = state.questions.length;
  const done = state.index;
  $("#progress-fill").style.width = `${(done / total) * 100}%`;
  $("#progress-answered").textContent = done;
  $("#progress-left").textContent = total - done;
}

function nextQuestion(wasCorrect, q) {
  if (wasCorrect) state.correct++;
  else state.missed.push({ letter: q.letter, word: q.word });
  state.index++;
  setTimeout(() => {
    if (state.index >= state.questions.length) endQuiz();
    else renderQuestion();
  }, wasCorrect ? 700 : 1200);
}

/* ---------- question rendering ---------- */
function renderQuestion() {
  updateProgress();
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  const q = state.questions[state.index];
  const area = $("#question-area");
  area.innerHTML = "";

  if (q.mode === "listen")  return renderListen(q, area);
  if (q.mode === "read")    return renderRead(q, area);
  if (q.mode === "spell")   return renderSpell(q, area);
  if (q.mode === "speak")   return renderSpeak(q, area);
}

function makeChoiceButtons(choices, correctValue, onPick) {
  const grid = document.createElement("div");
  grid.className = "choice-grid";
  choices.forEach(c => {
    const b = document.createElement("button");
    b.className = "choice-btn";
    b.textContent = c;
    b.addEventListener("click", () => {
      const buttons = grid.querySelectorAll("button");
      buttons.forEach(x => x.disabled = true);
      const ok = c === correctValue;
      b.classList.add(ok ? "correct" : "wrong");
      if (!ok) {
        buttons.forEach(x => { if (x.textContent === correctValue) x.classList.add("correct"); });
      }
      onPick(ok);
    });
    grid.appendChild(b);
  });
  return grid;
}

function distractors(pool, correctValue, n) {
  const others = pool.filter(v => v !== correctValue);
  return shuffle(others).slice(0, n);
}

/* Listen: hear word, pick letter */
function renderListen(q, area) {
  area.innerHTML = `
    <div class="q-prompt">Listen — pick the letter</div>
    <button class="play-btn" id="play-btn">🔊 Play again</button>
  `;
  const choices = shuffle([q.letter, ...distractors(LETTERS.map(l => l.letter), q.letter, 3)]);
  area.appendChild(makeChoiceButtons(choices, q.letter, (ok) => {
    feedback(ok, `${q.letter} = ${q.word}`);
    nextQuestion(ok, q);
  }));
  $("#play-btn").addEventListener("click", () => speak(q.word));
  speak(q.word);
}

/* Read: see letter, pick word */
function renderRead(q, area) {
  area.innerHTML = `
    <div class="q-prompt">Which word for this letter?</div>
    <div class="q-letter">${q.letter}</div>
  `;
  const choices = shuffle([q.word, ...distractors(LETTERS.map(l => l.word), q.word, 3)]);
  area.appendChild(makeChoiceButtons(choices, q.word, (ok) => {
    feedback(ok, `${q.letter} = ${q.word}`);
    nextQuestion(ok, q);
  }));
}

/* Spell: see word, pick letter */
function renderSpell(q, area) {
  const info = lookup(q.letter);
  area.innerHTML = `
    <div class="q-prompt">Which letter is this?</div>
    <div class="q-word">${q.word}</div>
    <div class="q-pron">${info ? info.pron : ""}</div>
  `;
  const choices = shuffle([q.letter, ...distractors(LETTERS.map(l => l.letter), q.letter, 3)]);
  area.appendChild(makeChoiceButtons(choices, q.letter, (ok) => {
    feedback(ok, `${q.word} = ${q.letter}`);
    nextQuestion(ok, q);
  }));
}

/* Speak: see letter, say word */
function renderSpeak(q, area) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    area.innerHTML = `
      <div class="q-prompt">Say the word for this letter</div>
      <div class="q-letter">${q.letter}</div>
      <div class="q-pron">Speech recognition not supported here — tap the answer to continue.</div>
    `;
    const choices = shuffle([q.word, ...distractors(LETTERS.map(l => l.word), q.word, 3)]);
    area.appendChild(makeChoiceButtons(choices, q.word, (ok) => {
      feedback(ok, `${q.letter} = ${q.word}`);
      nextQuestion(ok, q);
    }));
    return;
  }

  area.innerHTML = `
    <div class="q-prompt">Say the word for this letter</div>
    <div class="q-letter">${q.letter}</div>
    <button class="mic-btn" id="mic-btn">🎤 Tap & speak</button>
    <div class="heard" id="heard"></div>
  `;
  const mic = $("#mic-btn");
  const heard = $("#heard");
  let answered = false;

  mic.addEventListener("click", () => {
    if (answered) return;
    const r = getRecognizer();
    mic.classList.add("listening");
    mic.textContent = "🎤 Listening…";
    heard.textContent = "";

    r.onresult = (ev) => {
      const heardWords = [];
      for (let i = 0; i < ev.results[0].length; i++) {
        heardWords.push(ev.results[0][i].transcript.trim().toLowerCase());
      }
      heard.textContent = `Heard: "${heardWords[0]}"`;
      const target = q.word.toLowerCase().replace(/[^a-z]/g, "");
      const ok = heardWords.some(h => {
        const norm = h.replace(/[^a-z]/g, "");
        return norm === target || norm.includes(target) || target.includes(norm);
      });
      finishSpeak(ok);
    };
    r.onerror = () => { finishSpeak(false, "Couldn't hear that — try again or skip."); };
    r.onend = () => { mic.classList.remove("listening"); mic.textContent = "🎤 Tap & speak"; };
    try { r.start(); } catch (e) {}
  });

  function finishSpeak(ok, msg) {
    if (answered) return;
    answered = true;
    feedback(ok, msg || `${q.letter} = ${q.word}`);
    nextQuestion(ok, q);
  }
}

function feedback(ok, msg) {
  const el = $("#feedback");
  el.textContent = (ok ? "✅ " : "❌ ") + msg;
  el.className = "feedback " + (ok ? "ok" : "bad");
}

/* ---------- end screen ---------- */
function endQuiz() {
  showScreen("screen-end");
  const total = state.questions.length;
  $("#end-stats").textContent = `${state.correct} of ${total} correct`;
  const missedPanel = $("#end-missed");
  const missedList = $("#end-missed-list");
  missedList.innerHTML = "";
  if (state.missed.length) {
    missedPanel.hidden = false;
    state.missed.forEach(m => {
      const chip = document.createElement("div");
      chip.className = "missed-chip";
      chip.innerHTML = `<b>${m.letter}</b>${m.word}`;
      missedList.appendChild(chip);
    });
  } else {
    missedPanel.hidden = true;
  }
  const title = $("#end-title");
  if (state.correct === total)        title.textContent = "Perfect! 🎉";
  else if (state.correct / total >= 0.8) title.textContent = "Great work!";
  else                                title.textContent = "Keep practicing!";
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSets();
  bindHome();
});
