// ---------------------------------------------------------------------------
// Hangyman — modern edition
// ---------------------------------------------------------------------------

const MAX_WRONG = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Offline fallback so the game still works if every API is unreachable.
const FALLBACK_WORDS = [
    'javascript', 'keyboard', 'mountain', 'elephant', 'umbrella', 'computer',
    'galaxy', 'harbor', 'rhythm', 'pyramid', 'sunflower', 'network',
    'quantum', 'whisper', 'journey', 'library', 'puzzle', 'orchestra',
    'telescope', 'volcano', 'hologram', 'marathon', 'cinnamon', 'penguin',
    'blizzard', 'zodiac', 'horizon', 'labyrinth', 'notebook', 'paradox',
];

// Datamuse returns many dictionary words for a given letter-length pattern.
// We request a pool of words and pick one at random client-side.
const WORD_LENGTHS = [5, 6, 7, 8];
const DATAMUSE_URL = length =>
    `https://api.datamuse.com/words?sp=${'?'.repeat(length)}&max=1000`;

// ---------- Game state ----------
const state = {
    word: '',
    revealed: [],    // array of booleans, one per letter
    wrongLetters: [],
    usedLetters: new Set(),
    wrongCount: 0,
    finished: false,
    won: false,
};

// ---------- DOM refs ----------
const els = {
    wordDisplay:    document.getElementById('wordDisplay'),
    keyboard:       document.getElementById('keyboard'),
    hangmanSvg:     document.getElementById('hangmanSvg'),
    attemptsLeft:   document.getElementById('attemptsLeft'),
    attemptsBadge:  document.getElementById('attemptsBadge'),
    wordLength:     document.getElementById('wordLengthStat'),
    wrongCount:     document.getElementById('wrongCountStat'),
    wrongLetters:   document.getElementById('wrongLettersStat'),
    statusBadge:    document.getElementById('statusBadge'),
    newGameBtn:     document.getElementById('newGameBtn'),
    overlay:        document.getElementById('overlay'),
    overlayCard:    document.getElementById('overlayCard'),
    overlayIcon:    document.getElementById('overlayIcon'),
    overlayTitle:   document.getElementById('overlayTitle'),
    overlayMessage: document.getElementById('overlayMessage'),
    overlayWord:    document.getElementById('overlayWord'),
    overlayPlayAgain: document.getElementById('overlayPlayAgain'),
};

// ---------- Word fetching ----------
async function fetchWord() {
    const length = WORD_LENGTHS[Math.floor(Math.random() * WORD_LENGTHS.length)];
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(DATAMUSE_URL(length), { signal: controller.signal });
        clearTimeout(timeout);

        if (res.ok) {
            const data = await res.json();
            const pool = data
                .map(entry => (entry && entry.word ? entry.word.toLowerCase() : ''))
                .filter(w => /^[a-z]+$/.test(w) && w.length === length);
            if (pool.length) {
                const word = pool[Math.floor(Math.random() * pool.length)];
                return { word, source: 'api' };
            }
        }
    } catch {
        // fall through to offline fallback
    }
    const offline = FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];
    return { word: offline, source: 'offline' };
}

// ---------- Rendering ----------
function renderWord() {
    els.wordDisplay.innerHTML = '';
    state.word.split('').forEach((letter, i) => {
        const tile = document.createElement('div');
        const shown = state.revealed[i];
        tile.className = [
            'w-9 h-12 sm:w-11 sm:h-14 rounded-lg flex items-center justify-center',
            'font-mono font-bold text-2xl sm:text-3xl',
            'border-b-4 transition-colors',
            shown
                ? 'bg-slate-800/70 border-brand-500 text-white letter-reveal'
                : 'bg-slate-800/30 border-slate-700 text-transparent',
        ].join(' ');
        tile.textContent = shown ? letter.toUpperCase() : '_';
        els.wordDisplay.appendChild(tile);
    });
}

function renderKeyboard() {
    els.keyboard.innerHTML = '';
    ALPHABET.forEach(letter => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.className = baseKeyClass();
        btn.addEventListener('click', () => guess(letter));
        els.keyboard.appendChild(btn);
    });
}

function baseKeyClass() {
    return [
        'key-btn select-none',
        'h-10 sm:h-11 rounded-lg font-semibold font-mono text-sm sm:text-base',
        'bg-slate-800 hover:bg-slate-700 text-slate-200',
        'border border-slate-700',
    ].join(' ');
}

function updateKey(letter, correct) {
    const btn = els.keyboard.querySelector(`[data-letter="${letter}"]`);
    if (!btn) return;
    btn.disabled = true;
    btn.className = [
        'key-btn select-none h-10 sm:h-11 rounded-lg font-semibold font-mono text-sm sm:text-base border cursor-not-allowed',
        correct
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
            : 'bg-rose-500/10 text-rose-400 border-rose-500/30 line-through opacity-70',
    ].join(' ');
}

function renderHangman() {
    els.hangmanSvg.querySelectorAll('.hangman-part').forEach(el => {
        const idx = Number(el.dataset.part);
        el.classList.toggle('show', idx < state.wrongCount);
    });
}

function renderStats() {
    const left = MAX_WRONG - state.wrongCount;
    els.attemptsLeft.textContent = left;
    els.wordLength.textContent = state.word.length;
    els.wrongCount.innerHTML = `${state.wrongCount}<span class="text-slate-500 text-base font-normal"> / ${MAX_WRONG}</span>`;
    els.wrongLetters.textContent = state.wrongLetters.length
        ? state.wrongLetters.map(l => l.toUpperCase()).join(' · ')
        : '—';

    els.attemptsBadge.className = [
        'text-xs font-medium px-2.5 py-1 rounded-md border',
        left > 3
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : left > 1
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30 attempts-danger',
    ].join(' ');
}

function setStatus(text, tone = 'neutral') {
    const tones = {
        neutral: 'bg-slate-800/60 border-slate-700 text-slate-300',
        ok:      'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
        warn:    'bg-amber-500/10 border-amber-500/30 text-amber-300',
    };
    els.statusBadge.className =
        `px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${tones[tone]}`;
    els.statusBadge.textContent = text;
}

// ---------- Game flow ----------
function guess(letterRaw) {
    if (state.finished) return;
    const letter = letterRaw.toLowerCase();
    if (!/^[a-z]$/.test(letter) || state.usedLetters.has(letter)) return;

    state.usedLetters.add(letter);

    if (state.word.includes(letter)) {
        state.word.split('').forEach((ch, i) => {
            if (ch === letter) state.revealed[i] = true;
        });
        updateKey(letter.toUpperCase(), true);
        renderWord();
        if (state.revealed.every(Boolean)) endGame(true);
    } else {
        state.wrongLetters.push(letter);
        state.wrongCount += 1;
        updateKey(letter.toUpperCase(), false);
        renderHangman();
        shakeHangman();
        if (state.wrongCount >= MAX_WRONG) endGame(false);
    }
    renderStats();
}

function shakeHangman() {
    els.hangmanSvg.classList.remove('shake');
    // force reflow so the animation can restart
    void els.hangmanSvg.offsetWidth;
    els.hangmanSvg.classList.add('shake');
}

function endGame(won) {
    state.finished = true;
    state.won = won;

    if (!won) {
        // reveal the full word on loss
        state.revealed = state.revealed.map(() => true);
        renderWord();
    }

    // disable remaining keys
    els.keyboard.querySelectorAll('button:not(:disabled)').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-40', 'cursor-not-allowed');
    });

    showOverlay(won);
}

function showOverlay(won) {
    els.overlayCard.classList.remove('border-emerald-500/40', 'border-rose-500/40');
    els.overlayIcon.classList.remove('bg-emerald-500/15', 'text-emerald-400', 'bg-rose-500/15', 'text-rose-400');

    if (won) {
        els.overlayCard.classList.add('border-emerald-500/40');
        els.overlayIcon.classList.add('bg-emerald-500/15', 'text-emerald-400');
        els.overlayIcon.innerHTML = iconCheck();
        els.overlayTitle.textContent = 'You won!';
        els.overlayTitle.className = 'text-2xl font-bold mb-2 text-emerald-300';
        els.overlayMessage.textContent = `Solved with ${MAX_WRONG - state.wrongCount} attempt(s) to spare.`;
    } else {
        els.overlayCard.classList.add('border-rose-500/40');
        els.overlayIcon.classList.add('bg-rose-500/15', 'text-rose-400');
        els.overlayIcon.innerHTML = iconX();
        els.overlayTitle.textContent = 'Game over';
        els.overlayTitle.className = 'text-2xl font-bold mb-2 text-rose-300';
        els.overlayMessage.textContent = 'The hangman is complete. Better luck next round!';
    }

    els.overlayWord.textContent = state.word.toUpperCase();
    els.overlay.classList.remove('hidden');
    els.overlay.classList.add('flex');
}

function hideOverlay() {
    els.overlay.classList.add('hidden');
    els.overlay.classList.remove('flex');
}

async function newGame() {
    hideOverlay();
    setStatus('Loading…');

    state.word = '';
    state.revealed = [];
    state.wrongLetters = [];
    state.usedLetters = new Set();
    state.wrongCount = 0;
    state.finished = false;
    state.won = false;

    renderKeyboard();
    renderHangman();
    renderStats();
    els.wordDisplay.innerHTML =
        '<div class="text-slate-500 text-sm animate-pulse">Fetching a fresh word…</div>';

    const { word, source } = await fetchWord();
    state.word = word;
    state.revealed = new Array(word.length).fill(false);

    renderWord();
    renderStats();
    setStatus(source === 'api' ? 'Ready' : 'Offline word', source === 'api' ? 'ok' : 'warn');
}

// ---------- Icons ----------
function iconCheck() {
    return `<svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
}
function iconX() {
    return `<svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
}

// ---------- Wire events ----------
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !els.overlay.classList.contains('hidden')) {
        hideOverlay();
        return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) guess(e.key);
});

els.newGameBtn.addEventListener('click', newGame);
els.overlayPlayAgain.addEventListener('click', newGame);
els.overlay.addEventListener('click', e => {
    if (e.target === els.overlay) hideOverlay();
});

// ---------- Boot ----------
newGame();
