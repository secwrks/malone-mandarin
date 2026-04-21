// ===================== Malone Mandarin =====================
// Simple SPA: pick weeks + modes -> quiz -> end screen.
// Wrong answers are re-queued so every word is answered correctly before the session ends.

// ---------- Bunny SVG (all magic layers inside, CSS toggles them) ----------
const BUNNY_SVG = `
<svg class="bunny-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="aura" cx="50%" cy="55%" r="55%">
      <stop offset="0%" stop-color="#fff6a8" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="#ffd3e0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffd3e0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6b6b"/>
      <stop offset="25%" stop-color="#ffd93d"/>
      <stop offset="50%" stop-color="#6bcb77"/>
      <stop offset="75%" stop-color="#4d96ff"/>
      <stop offset="100%" stop-color="#c779ff"/>
    </linearGradient>
  </defs>

  <!-- aura (level 8) -->
  <circle class="magic-layer m-aura" cx="100" cy="110" r="95" fill="url(#aura)"/>

  <!-- rainbow trail (level 7) -->
  <path class="magic-layer m-rainbow" d="M20 180 Q 100 140 180 180" fill="none" stroke="url(#rainbow)" stroke-width="8" stroke-linecap="round" opacity="0.85"/>

  <!-- wings (level 5) -->
  <g class="magic-layer m-wings">
    <path d="M50 110 Q 20 80 28 130 Q 35 150 60 135 Z" fill="#fff2b3" stroke="#e6c76a" stroke-width="2"/>
    <path d="M150 110 Q 180 80 172 130 Q 165 150 140 135 Z" fill="#fff2b3" stroke="#e6c76a" stroke-width="2"/>
  </g>

  <!-- BODY GROUP -->
  <g class="bunny-body-group">
    <!-- ears -->
    <ellipse cx="78" cy="42" rx="14" ry="32" fill="#ffffff" stroke="#3a3356" stroke-width="2.5"/>
    <ellipse cx="78" cy="46" rx="7" ry="22" fill="#ffc6d9"/>
    <ellipse cx="122" cy="42" rx="14" ry="32" fill="#ffffff" stroke="#3a3356" stroke-width="2.5"/>
    <ellipse cx="122" cy="46" rx="7" ry="22" fill="#ffc6d9"/>

    <!-- head -->
    <ellipse cx="100" cy="110" rx="58" ry="56" fill="#ffffff" stroke="#3a3356" stroke-width="2.5"/>

    <!-- cheeks (level 1) -->
    <g class="magic-layer m-cheeks">
      <circle cx="70" cy="122" r="9" fill="#ffb6c1" opacity="0.7"/>
      <circle cx="130" cy="122" r="9" fill="#ffb6c1" opacity="0.7"/>
    </g>

    <!-- eyes -->
    <circle cx="82" cy="100" r="6" fill="#2a2540"/>
    <circle cx="118" cy="100" r="6" fill="#2a2540"/>
    <circle cx="84" cy="98" r="2" fill="#fff"/>
    <circle cx="120" cy="98" r="2" fill="#fff"/>

    <!-- nose + mouth -->
    <path d="M95 115 Q 100 121 105 115 Z" fill="#ff8fb1" stroke="#3a3356" stroke-width="1.2"/>
    <path d="M100 121 Q 94 128 88 126" fill="none" stroke="#3a3356" stroke-width="2" stroke-linecap="round"/>
    <path d="M100 121 Q 106 128 112 126" fill="none" stroke="#3a3356" stroke-width="2" stroke-linecap="round"/>

    <!-- whiskers -->
    <line x1="60" y1="120" x2="40" y2="116" stroke="#3a3356" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="60" y1="124" x2="38" y2="124" stroke="#3a3356" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="140" y1="120" x2="160" y2="116" stroke="#3a3356" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="140" y1="124" x2="162" y2="124" stroke="#3a3356" stroke-width="1.2" stroke-linecap="round"/>

    <!-- crown (level 6) -->
    <g class="magic-layer m-crown">
      <path d="M74 60 L 86 76 L 100 56 L 114 76 L 126 60 L 124 82 L 76 82 Z"
            fill="#ffd93d" stroke="#c9a618" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="100" cy="58" r="3" fill="#ff6b6b"/>
      <circle cx="80" cy="80" r="2.5" fill="#4d96ff"/>
      <circle cx="120" cy="80" r="2.5" fill="#6bcb77"/>
    </g>

    <!-- glow rim (level 10) -->
    <ellipse class="magic-layer m-glow-rim" cx="100" cy="110" rx="62" ry="60" fill="none" stroke="#ffe27a" stroke-width="3" opacity="0.9"/>
  </g>

  <!-- wand (level 4) - outside body group so it waves independently -->
  <g class="magic-layer m-wand">
    <line x1="155" y1="130" x2="178" y2="100" stroke="#8a6aff" stroke-width="4" stroke-linecap="round"/>
    <g transform="translate(178 100)">
      <path d="M0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="#ffd93d" stroke="#c9a618" stroke-width="1.5"/>
    </g>
  </g>

  <!-- star above head (level 3) -->
  <g class="magic-layer m-star" transform="translate(100 14)">
    <path d="M0 -12 L 3 -4 L 12 -4 L 5 2 L 8 11 L 0 6 L -8 11 L -5 2 L -12 -4 L -3 -4 Z"
          fill="#ffd93d" stroke="#c9a618" stroke-width="1.5"/>
  </g>

  <!-- sparkles -->
  <g class="magic-layer m-sparkle-a">
    <path d="M30 40 L 34 48 L 42 52 L 34 56 L 30 64 L 26 56 L 18 52 L 26 48 Z" fill="#ffe27a" stroke="#c9a618" stroke-width="1"/>
  </g>
  <g class="magic-layer m-sparkle-b">
    <path d="M170 40 L 173 46 L 179 49 L 173 52 L 170 58 L 167 52 L 161 49 L 167 46 Z" fill="#c779ff" stroke="#8a6aff" stroke-width="1"/>
    <path d="M40 170 L 43 176 L 49 179 L 43 182 L 40 188 L 37 182 L 31 179 L 37 176 Z" fill="#6bcb77" stroke="#2fa260" stroke-width="1"/>
  </g>
</svg>
`;

function paintBunny(el, level = 0) {
  if (!el.dataset.painted) {
    el.innerHTML = BUNNY_SVG;
    el.dataset.painted = "1";
  }
  el.dataset.level = Math.max(0, Math.min(10, level));
}

// ---------- State ----------
const state = {
  scope: "weeks",           // "weeks" | "all"
  selectedWeekIds: new Set(),
  modes: { listen: true, read: true, trace: true, speak: true },
  queue: [],                // pending questions
  answered: 0,              // questions answered correctly
  totalInitial: 0,
  missStreakByWord: new Map(),
  missedWords: new Map(),   // hanzi -> word (to show at end)
  currentQ: null,
  magicLevel: 0,
};

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $(`#${id}`).classList.add("active");
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(arr, n) { return shuffle(arr).slice(0, n); }

function parseDate(mdY) {
  // "4/20/26" -> Date
  const [m, d, y] = mdY.split("/").map(Number);
  return new Date(2000 + y, m - 1, d);
}
function isCurrentWeek(range) {
  const [start, end] = range.split("–").map(s => s.trim());
  if (!start || !end) return false;
  const today = new Date();
  return today >= parseDate(start) && today <= parseDate(end);
}

// ---------- Speech ----------
let voiceCache = null;
function getVoice() {
  if (voiceCache) return voiceCache;
  const voices = window.speechSynthesis?.getVoices?.() || [];
  voiceCache =
    voices.find(v => /zh[-_]TW/i.test(v.lang)) ||
    voices.find(v => /zh[-_]HK/i.test(v.lang)) ||
    voices.find(v => /zh/i.test(v.lang)) ||
    null;
  return voiceCache;
}
function speak(text) {
  if (!window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-TW";
    u.rate = 0.75;
    u.pitch = 1.05;
    const v = getVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) { /* noop */ }
}
// Trigger voice list load
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => { voiceCache = null; getVoice(); };
}

// ---------- Home screen ----------
function renderWeeks() {
  const list = $("#weeks-list");
  list.innerHTML = "";
  WEEKS.forEach(week => {
    const row = document.createElement("label");
    row.className = "week-row";
    if (state.selectedWeekIds.has(week.id)) row.classList.add("selected");
    if (isCurrentWeek(week.dateRange)) {
      row.classList.add("current");
    }
    const preview = week.words.slice(0, 8).map(w => w.hanzi).join("  ");
    row.innerHTML = `
      <input type="checkbox" ${state.selectedWeekIds.has(week.id) ? "checked" : ""}/>
      <div style="flex:1; min-width:0;">
        <div class="wk-label">${week.label}</div>
        <div class="wk-preview">${preview}</div>
        <div class="wk-meta">${week.dateRange} · ${week.words.length} words</div>
      </div>
    `;
    const cb = row.querySelector("input");
    cb.addEventListener("change", () => {
      if (cb.checked) state.selectedWeekIds.add(week.id);
      else state.selectedWeekIds.delete(week.id);
      row.classList.toggle("selected", cb.checked);
      updateStartEnabled();
    });
    list.appendChild(row);
  });
  list.hidden = state.scope !== "weeks";
}

function updateStartEnabled() {
  const hasWords = state.scope === "all" || state.selectedWeekIds.size > 0;
  const hasModes = state.modes.listen || state.modes.read || state.modes.trace;
  $("#start-btn").disabled = !(hasWords && hasModes);
}

function bindHome() {
  paintBunny($("#bunny-home"), 0);

  $$(".pill").forEach(p => {
    p.addEventListener("click", () => {
      $$(".pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      state.scope = p.dataset.scope;
      $("#weeks-list").hidden = state.scope !== "weeks";
      updateStartEnabled();
    });
  });

  // Explicit click handling on the mode cards (not reliant on <label> → change event,
  // which is flaky on some mobile browsers — would leave state.modes stale).
  $$(".mode-card").forEach(card => {
    const input = card.querySelector("input");
    const key = input.id.replace("mode-", "");
    card.classList.toggle("on", input.checked);
    state.modes[key] = input.checked;
    card.addEventListener("click", (e) => {
      e.preventDefault();
      input.checked = !input.checked;
      state.modes[key] = input.checked;
      card.classList.toggle("on", input.checked);
      updateStartEnabled();
    });
  });

  $("#start-btn").addEventListener("click", startSession);
}

// ---------- Session setup ----------
function getSelectedWords() {
  const weeks = state.scope === "all"
    ? WEEKS
    : WEEKS.filter(w => state.selectedWeekIds.has(w.id));
  const words = [];
  const seen = new Set();
  weeks.forEach(wk => wk.words.forEach(w => {
    const key = w.hanzi + "|" + w.pinyin;
    if (!seen.has(key)) { seen.add(key); words.push(w); }
  }));
  return words;
}

function pickMode() {
  const enabled = Object.entries(state.modes).filter(([, v]) => v).map(([k]) => k);
  return enabled[Math.floor(Math.random() * enabled.length)];
}

function buildQueue() {
  const words = getSelectedWords();
  const queue = words.map(w => ({ word: w, mode: pickMode(), repeat: false }));
  return shuffle(queue);
}

function startSession() {
  state.queue = buildQueue();
  state.totalInitial = state.queue.length;
  state.answered = 0;
  state.missStreakByWord.clear();
  state.missedWords.clear();
  state.magicLevel = 0;
  paintBunny($("#bunny-quiz"), 0);
  showScreen("screen-quiz");
  nextQuestion();
  // Warm up TTS on the first user tap
  try { window.speechSynthesis?.resume?.(); } catch {}
}

// ---------- Quiz ----------
function updateProgress() {
  const total = state.answered + state.queue.length;
  const pct = total > 0 ? (state.answered / total) * 100 : 0;
  $("#progress-fill").style.width = pct + "%";
  $("#progress-answered").textContent = state.answered;
  $("#progress-left").textContent = state.queue.length;
}

function nextQuestion() {
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  updateProgress();

  if (state.queue.length === 0) return endSession();

  const q = state.queue.shift();
  state.currentQ = q;

  if (q.mode === "listen")      renderListen(q);
  else if (q.mode === "read")   renderRead(q);
  else if (q.mode === "speak")  renderSpeak(q);
  else                           renderTrace(q);
}

function distractors(correct, all, n = 3) {
  // Prefer distractors that are (1) the same length as the target character(s)
  // and (2) from the same week/track — so a single-character target like 上
  // isn't mixed with opposite-pair words like 上下 or 大小.
  const correctWeek = WEEKS.find(wk =>
    wk.words.some(w => w.hanzi === correct.hanzi && w.pinyin === correct.pinyin)
  );
  const sameLen = (w) =>
    w.hanzi !== correct.hanzi && w.hanzi.length === correct.hanzi.length;

  const tiers = [];
  if (correctWeek) tiers.push(correctWeek.words.filter(sameLen));
  tiers.push(all.filter(sameLen));
  tiers.push(all.filter(w => w.hanzi !== correct.hanzi));

  const seen = new Set();
  const pool = [];
  for (const tier of tiers) {
    for (const w of shuffle(tier)) {
      if (!seen.has(w.hanzi)) { seen.add(w.hanzi); pool.push(w); }
      if (pool.length >= n) break;
    }
    if (pool.length >= n) break;
  }
  return pool.slice(0, n);
}

// --- Listen: hear -> pick character ---
function renderListen(q) {
  const words = getSelectedWords();
  const options = shuffle([q.word, ...distractors(q.word, words, 3)]);
  const area = $("#question-area");
  area.innerHTML = `
    <div class="q-prompt">
      <div class="q-instruction">Listen & Tap</div>
      <button class="speak-btn" id="speak-btn"><span class="speaker">🔊</span> Play Sound</button>
      <div class="q-pinyin" id="show-pinyin" style="margin-top:12px;opacity:0;transition:opacity .3s;">${q.word.pinyin}</div>
    </div>
    <div class="choices" id="choices"></div>
  `;
  const choicesEl = $("#choices");
  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = opt.hanzi;
    b.addEventListener("click", () => handleAnswer(opt.hanzi === q.word.hanzi, b, q));
    choicesEl.appendChild(b);
  });

  const doSpeak = () => {
    speak(q.word.hanzi);
    $("#show-pinyin").style.opacity = "0.85";
  };
  $("#speak-btn").addEventListener("click", doSpeak);
  // auto-play on entry (may require prior user gesture on iOS — first tap satisfies it)
  setTimeout(doSpeak, 350);
}

// --- Read: see character -> pick English ---
function renderRead(q) {
  const words = getSelectedWords();
  const options = shuffle([q.word, ...distractors(q.word, words, 3)]);
  const isLong = q.word.hanzi.length > 2;
  const area = $("#question-area");
  area.innerHTML = `
    <div class="q-prompt">
      <div class="q-instruction">What does this mean?</div>
      <div class="q-hanzi ${isLong ? "small" : ""}" id="read-hanzi">${q.word.hanzi}</div>
      <div class="q-pinyin">${q.word.pinyin}</div>
    </div>
    <div class="choices" id="choices"></div>
  `;
  $("#read-hanzi").addEventListener("click", () => speak(q.word.hanzi));
  const choicesEl = $("#choices");
  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "choice text-choice";
    b.textContent = opt.english;
    b.addEventListener("click", () => handleAnswer(opt.hanzi === q.word.hanzi, b, q));
    choicesEl.appendChild(b);
  });
}

// --- Trace: stroke-order quiz using Hanzi Writer ---
function renderTrace(q) {
  const area = $("#question-area");
  // Keep only CJK characters — drop separators like "／" for stroke quiz purposes.
  const chars = Array.from(q.word.hanzi).filter(c => /[\u3400-\u9fff]/.test(c));
  const multi = chars.length > 1;

  area.innerHTML = `
    <div class="trace-wrap">
      <div class="q-instruction">Trace — follow the stroke order</div>
      <div class="q-pinyin">${q.word.hanzi} · ${q.word.pinyin} · ${q.word.english}</div>
      <div class="hz-progress" id="hz-progress"></div>
      <div class="trace-stage hanzi-stage">
        <div id="hz-target"></div>
      </div>
      <div class="trace-controls">
        <button class="btn-clear" id="trace-demo">Show me ✨</button>
        <button class="btn-done" id="trace-skip">Skip ›</button>
      </div>
      <div class="trace-hint" id="hz-hint">Tap the pinyin to hear it again</div>
    </div>
  `;

  $(".q-pinyin").addEventListener("click", () => speak(q.word.hanzi));
  speak(q.word.hanzi);

  if (typeof HanziWriter === "undefined") {
    $("#hz-hint").textContent = "Loading writer…";
    setTimeout(() => renderTrace(q), 400);
    return;
  }

  if (chars.length === 0) {
    // Nothing drawable — auto-pass (e.g., if a word had only punctuation, which we don't expect)
    setTimeout(() => handleAnswer(true, null, q), 400);
    return;
  }

  const stage = $(".hanzi-stage");
  const size = Math.min(340, Math.max(240, stage.clientWidth - 12));
  let idx = 0;
  let writer = null;
  let totalMistakes = 0;

  const updateProgress = () => {
    if (!multi) { $("#hz-progress").textContent = ""; return; }
    $("#hz-progress").textContent = `Character ${idx + 1} of ${chars.length}`;
  };

  const advance = () => {
    idx++;
    if (idx >= chars.length) {
      // Allow up to 2 stroke-mistakes per character before we count it as tricky
      const correct = totalMistakes <= (chars.length * 2);
      $("#hz-hint").textContent = correct ? "Great stroke order! ✨" : "Let's try that one again later";
      setTimeout(() => handleAnswer(correct, null, q), 600);
    } else {
      setTimeout(() => startChar(chars[idx]), 400);
    }
  };

  const buildWriter = (char) => HanziWriter.create("hz-target", char, {
    width: size,
    height: size,
    padding: 8,
    strokeColor: "#c85ce0",
    radicalColor: "#8a6aff",
    outlineColor: "#f0d8f5",
    drawingColor: "#c85ce0",
    strokeAnimationSpeed: 1.1,
    delayBetweenStrokes: 180,
    showOutline: true,
    showHintAfterMisses: 2,
    highlightOnComplete: true,
    onLoadCharDataError: () => {
      $("#hz-hint").textContent = `No stroke data for ${char} — skipping`;
      setTimeout(advance, 800);
    },
  });

  const startQuiz = () => {
    writer.quiz({
      onMistake: () => { totalMistakes++; },
      onComplete: advance,
    });
  };

  const startChar = (char) => {
    updateProgress();
    $("#hz-target").innerHTML = "";
    writer = buildWriter(char);
    startQuiz();
  };

  $("#trace-demo").addEventListener("click", () => {
    if (!writer) return;
    try { writer.cancelQuiz(); } catch {}
    writer.animateCharacter({ onComplete: () => setTimeout(startQuiz, 200) });
  });

  $("#trace-skip").addEventListener("click", () => {
    try { writer?.cancelQuiz(); } catch {}
    handleAnswer(false, null, q);
  });

  startChar(chars[0]);
}

// --- Speak: use mic -> verify pronunciation ---
function renderSpeak(q) {
  const area = $("#question-area");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!SR;
  const isLong = q.word.hanzi.length > 2;

  area.innerHTML = `
    <div class="q-prompt">
      <div class="q-instruction">Say it out loud</div>
      <div class="q-hanzi ${isLong ? "small" : ""}" id="speak-hanzi">${q.word.hanzi}</div>
      <div class="q-pinyin">${q.word.pinyin} · ${q.word.english}</div>
      ${supported ? `
        <button class="mic-btn" id="mic-btn">
          <span class="mic-icon">🎤</span>
          <span class="mic-label" id="mic-label">Tap &amp; Speak</span>
        </button>
        <div class="mic-heard" id="mic-heard">Tap the mic, then say the word</div>
      ` : `
        <div class="mic-unsupported">
          This browser can't listen. Try Chrome or Safari on another device.
        </div>
      `}
    </div>
    <div class="speak-actions">
      <button class="btn-clear" id="speak-hint">Hear it 🔊</button>
      <button class="btn-done" id="speak-skip">Skip ›</button>
    </div>
  `;

  $("#speak-hanzi").addEventListener("click", () => speak(q.word.hanzi));
  $("#speak-hint").addEventListener("click", () => speak(q.word.hanzi));
  $("#speak-skip").addEventListener("click", () => handleAnswer(false, null, q));

  // auto-play the target so the kid hears what they're about to say
  setTimeout(() => speak(q.word.hanzi), 300);

  if (!supported) return;

  const micBtn = $("#mic-btn");
  const micLabel = $("#mic-label");
  const heard = $("#mic-heard");
  let recognition = null;
  let recognizing = false;
  let attempts = 0;

  const stopRecognition = () => {
    try { recognition?.abort?.(); } catch {}
    recognizing = false;
    micBtn.classList.remove("listening");
  };

  const startRecognition = () => {
    if (recognizing) { stopRecognition(); return; }
    // cancel TTS so the mic doesn't pick up the speaker
    try { window.speechSynthesis?.cancel(); } catch {}
    recognition = new SR();
    recognition.lang = "zh-TW";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onstart = () => {
      recognizing = true;
      micBtn.classList.add("listening");
      micLabel.textContent = "Listening…";
      heard.textContent = "";
    };
    recognition.onerror = (e) => {
      recognizing = false;
      micBtn.classList.remove("listening");
      micLabel.textContent = "Try again";
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        heard.textContent = "Microphone is blocked — allow mic access and try again";
      } else if (e.error === "no-speech") {
        heard.textContent = "I didn't hear anything — tap and try again";
      } else if (e.error === "language-not-supported") {
        heard.textContent = "This device can't listen in Mandarin";
      } else {
        heard.textContent = "Couldn't listen — tap and try again";
      }
    };
    recognition.onend = () => {
      recognizing = false;
      micBtn.classList.remove("listening");
    };
    recognition.onresult = (ev) => {
      attempts++;
      const alts = [];
      const first = ev.results[0];
      for (let i = 0; i < first.length; i++) alts.push(first[i].transcript);
      const matched = alts.find(t => transcriptMatches(t, q.word));
      if (matched) {
        heard.innerHTML = `Heard: <b>${escapeHtml(matched.trim())}</b> ✨`;
        micLabel.textContent = "Great!";
        micBtn.disabled = true;
        handleAnswer(true, null, q);
      } else {
        const best = (alts[0] || "").trim();
        heard.innerHTML = best
          ? `Heard: <b>${escapeHtml(best)}</b> — try again`
          : "Hmm, I didn't catch that — try again";
        micLabel.textContent = attempts >= 3 ? "One more try" : "Try again";
      }
    };

    try {
      recognition.start();
    } catch (err) {
      heard.textContent = "Couldn't start the mic — try again";
    }
  };

  micBtn.addEventListener("click", startRecognition);
}

// Pinyin tone stripping + character cleanup used by the speak-mode matcher.
function stripToneMarks(s) {
  // strip combining diacritical marks (U+0300 – U+036F)
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function cleanForMatch(s) {
  // drop whitespace, punctuation, and common CJK interpuncts
  return s.replace(/[\s，。！？、,.!?·・／\/]/g, "").toLowerCase();
}
function transcriptMatches(transcript, word) {
  if (!transcript) return false;
  const t = cleanForMatch(transcript);
  const h = cleanForMatch(word.hanzi);
  if (t && h && (t === h || t.includes(h) || h.includes(t))) return true;
  // pinyin fallback — recognizers occasionally return romanization
  const tPinyin = cleanForMatch(stripToneMarks(transcript));
  const wPinyin = cleanForMatch(stripToneMarks(word.pinyin));
  if (tPinyin && wPinyin && (tPinyin === wPinyin || tPinyin.includes(wPinyin))) return true;
  return false;
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
}

// ---------- Answer handling ----------
function handleAnswer(correct, btn, q) {
  const feedback = $("#feedback");

  if (correct) {
    if (btn) {
      btn.classList.add("correct");
      $$("#choices .choice").forEach(c => c.disabled = true);
    }
    state.answered += 1;
    state.magicLevel = Math.min(10, state.magicLevel + 1);
    paintBunny($("#bunny-quiz"), state.magicLevel);
    feedback.textContent = pickCheer();
    feedback.className = "feedback ok";
    burstConfetti();
    setTimeout(nextQuestion, 950);
  } else {
    if (btn) {
      btn.classList.add("wrong");
      // also highlight the correct one
      $$("#choices .choice").forEach(c => {
        if (c.textContent === q.word.hanzi || c.textContent === q.word.english) {
          c.classList.add("correct");
        }
        c.disabled = true;
      });
    }
    // track
    state.missedWords.set(q.word.hanzi, q.word);
    const streak = (state.missStreakByWord.get(q.word.hanzi) || 0) + 1;
    state.missStreakByWord.set(q.word.hanzi, streak);
    // re-queue this word: bounce it a few spots back so it returns later in the session
    const reinsertAt = Math.min(state.queue.length, 3 + Math.floor(Math.random() * 3));
    state.queue.splice(reinsertAt, 0, { ...q, repeat: true });

    feedback.innerHTML = `The answer is <b>${q.word.hanzi}</b> · ${q.word.pinyin} · ${q.word.english}`;
    feedback.className = "feedback bad";
    speak(q.word.hanzi);
    // let Malone see the correct one, then continue
    setTimeout(nextQuestion, 2200);
  }
  updateProgress();
}

const CHEERS = ["Yes!", "太棒了!", "Magic!", "Good job!", "Sparkle!", "Woohoo!", "Bunny loves it!", "Nice one!"];
function pickCheer() { return CHEERS[Math.floor(Math.random() * CHEERS.length)]; }

// ---------- Confetti ----------
function burstConfetti() {
  const layer = document.createElement("div");
  layer.className = "celebrate";
  document.body.appendChild(layer);
  const colors = ["#ff8fb1", "#ffd93d", "#6bcb77", "#4d96ff", "#c779ff"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "confetti";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    p.style.animationDelay = (Math.random() * 0.3) + "s";
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 1700);
}

// ---------- End ----------
function endSession() {
  paintBunny($("#bunny-end"), state.magicLevel);
  const perfect = state.missedWords.size === 0;
  $("#end-title").textContent = perfect ? "🌟 Perfect! 🌟" : "Great work, Malone!";
  const answered = state.totalInitial + state.missedWords.size * 0; // answered equals total
  $("#end-stats").textContent =
    `${state.answered} questions answered · ${state.missedWords.size} tricky word${state.missedWords.size === 1 ? "" : "s"}`;
  const missedWrap = $("#end-missed");
  const missedList = $("#end-missed-list");
  if (state.missedWords.size > 0) {
    missedWrap.hidden = false;
    missedList.innerHTML = "";
    state.missedWords.forEach(w => {
      const chip = document.createElement("span");
      chip.className = "missed-chip";
      chip.textContent = w.hanzi;
      chip.title = `${w.pinyin} · ${w.english}`;
      chip.addEventListener("click", () => speak(w.hanzi));
      missedList.appendChild(chip);
    });
  } else {
    missedWrap.hidden = true;
  }
  showScreen("screen-end");
}

// ---------- Nav ----------
function bindNav() {
  $("#quiz-back").addEventListener("click", () => {
    try { window.speechSynthesis?.cancel?.(); } catch {}
    showScreen("screen-home");
  });
  $("#again-btn").addEventListener("click", startSession);
  $("#home-btn").addEventListener("click", () => showScreen("screen-home"));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderWeeks();
  bindHome();
  bindNav();
  updateStartEnabled();
});
