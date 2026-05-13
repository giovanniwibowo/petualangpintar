// ═══════════════════════════════════════════════════════════════
//  PetualangPintar v0.2 — GAME ENGINE
//  Features: AI Questions, Sprite Animations, Leaderboard, Audio
// ═══════════════════════════════════════════════════════════════

// ── STATE ────────────────────────────────────────────────────────
const State = {
  // Player
  playerName: 'Petualang',
  playerChar: CHARACTERS[0],
  playerColor: COLORS[4].val,

  // Progress
  totalScore: 0,
  completedLevels: {},   // { levelId: { stars, score, time } }
  unlockedLevels: [1],

  // Current game
  currentLevel: null,
  levelScore: 0,
  levelStartTime: 0,
  currentCheckpoint: 0,
  lives: 3,
  levelQuestions: [],
  currentQuestion: null,
  answered: false,
  paused: false,
  timerInterval: null,
  timerSeconds: 15,

  // Settings
  sfxEnabled: true,
  musicEnabled: true,
  apiKey: '',
  useAI: false,
};

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  AudioEngine.init();
  loadFromStorage();
  buildCharGrid();
  buildColorPicker();
  buildLevelsGrid();
  buildLeaderboard();

  document.getElementById('toggle-sfx').addEventListener('change', e => {
    State.sfxEnabled = e.target.checked;
    AudioEngine.setSFX(State.sfxEnabled);
    saveSettings();
  });
  document.getElementById('toggle-music').addEventListener('change', e => {
    State.musicEnabled = e.target.checked;
    AudioEngine.setMusic(State.musicEnabled);
    saveSettings();
  });

  // Restore toggles
  document.getElementById('toggle-sfx').checked = State.sfxEnabled;
  document.getElementById('toggle-music').checked = State.musicEnabled;

  // Check API key
  if (State.apiKey) {
    State.useAI = true;
  }
});

// ── STORAGE ──────────────────────────────────────────────────────
function saveProgress() {
  localStorage.setItem('pp_progress', JSON.stringify({
    playerName: State.playerName,
    playerChar: State.playerChar,
    playerColor: State.playerColor,
    totalScore: State.totalScore,
    completedLevels: State.completedLevels,
    unlockedLevels: State.unlockedLevels,
  }));
}

function saveSettings() {
  localStorage.setItem('pp_settings', JSON.stringify({
    sfxEnabled: State.sfxEnabled,
    musicEnabled: State.musicEnabled,
    apiKey: State.apiKey,
  }));
}

function loadFromStorage() {
  try {
    const progress = JSON.parse(localStorage.getItem('pp_progress') || '{}');
    if (progress.playerName) {
      State.playerName = progress.playerName;
      State.playerChar = progress.playerChar || CHARACTERS[0];
      State.playerColor = progress.playerColor || COLORS[4].val;
      State.totalScore = progress.totalScore || 0;
      State.completedLevels = progress.completedLevels || {};
      State.unlockedLevels = progress.unlockedLevels || [1];
      document.getElementById('player-name').value = State.playerName;
    }
    const settings = JSON.parse(localStorage.getItem('pp_settings') || '{}');
    State.sfxEnabled = settings.sfxEnabled !== false;
    State.musicEnabled = settings.musicEnabled !== false;
    State.apiKey = settings.apiKey || '';
  } catch(e) {}
}

// ── LEADERBOARD ──────────────────────────────────────────────────
function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('pp_leaderboard') || '[]');
  } catch { return []; }
}

function saveToLeaderboard(entry) {
  let lb = getLeaderboard();
  const existing = lb.findIndex(e => e.name === entry.name);
  if (existing >= 0) {
    if (entry.score > lb[existing].score) lb[existing] = entry;
  } else {
    lb.push(entry);
  }
  lb.sort((a, b) => b.score - a.score);
  lb = lb.slice(0, 10);
  localStorage.setItem('pp_leaderboard', JSON.stringify(lb));
}

function buildLeaderboard() {
  const lb = getLeaderboard();
  const container = document.getElementById('lb-list');
  if (lb.length === 0) {
    container.innerHTML = '<div class="lb-empty">Belum ada pemain. Jadilah yang pertama! 🌟</div>';
    return;
  }
  container.innerHTML = lb.map((entry, i) => `
    <div class="lb-item ${i < 3 ? 'top-' + (i+1) : ''}">
      <span class="lb-rank">${['🥇','🥈','🥉'][i] || (i+1)}</span>
      <span class="lb-char">${entry.char}</span>
      <span class="lb-name">${entry.name}</span>
      <span class="lb-pts">⭐ ${entry.score.toLocaleString()}</span>
    </div>
  `).join('');

  // Show current player card
  const card = document.getElementById('lb-player-card');
  if (State.playerName && State.totalScore > 0) {
    const myRank = lb.findIndex(e => e.name === State.playerName) + 1;
    card.innerHTML = `
      <div class="lb-mycard">
        <span>${State.playerChar.emoji}</span>
        <div>
          <strong>${State.playerName}</strong>
          <div>⭐ ${State.totalScore.toLocaleString()} ${myRank > 0 ? '· Rank #' + myRank : ''}</div>
        </div>
      </div>
    `;
  } else {
    card.innerHTML = '';
  }
}

function clearLeaderboard() {
  if (confirm('Hapus semua data leaderboard?')) {
    localStorage.removeItem('pp_leaderboard');
    buildLeaderboard();
    showToast('Data leaderboard dihapus 🗑️');
  }
}

function goBackFromLeaderboard() {
  showScreen(State.playerName && State.completedLevels ? 'screen-levels' : 'screen-splash');
}

// ── UI BUILDERS ──────────────────────────────────────────────────
function buildCharGrid() {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = CHARACTERS.map((c, i) => `
    <div class="char-card ${i === 0 ? 'selected' : ''}" onclick="selectChar(${i})" data-id="${c.id}">
      <div class="char-emoji char-bounce">${c.emoji}</div>
      <div class="char-name">${c.name}</div>
      <div class="char-desc">${c.desc}</div>
    </div>
  `).join('');
}

function selectChar(idx) {
  document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.char-card')[idx].classList.add('selected');
  State.playerChar = CHARACTERS[idx];
  AudioEngine.playClick();
}

function buildColorPicker() {
  const picker = document.getElementById('color-picker');
  picker.innerHTML = COLORS.map((c, i) => `
    <div class="color-swatch ${i === 4 ? 'selected' : ''}"
         style="background:${c.val}"
         onclick="selectColor(${i}, '${c.val}')"
         title="${c.label}">
    </div>
  `).join('');
}

function selectColor(idx, val) {
  document.querySelectorAll('.color-swatch').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.color-swatch')[idx].classList.add('selected');
  State.playerColor = val;
  document.documentElement.style.setProperty('--player-color', val);
  AudioEngine.playClick();
}

function buildLevelsGrid() {
  const grid = document.getElementById('levels-grid');
  grid.innerHTML = LEVELS.map(lv => {
    const done = State.completedLevels[lv.id];
    const unlocked = State.unlockedLevels.includes(lv.id);
    const stars = done ? done.stars : 0;
    return `
      <div class="level-card ${unlocked ? 'unlocked' : 'locked'} ${done ? 'done' : ''}"
           style="${unlocked ? '--lv-color:' + lv.color : ''}"
           onclick="${unlocked ? 'startLevel(' + lv.id + ')' : 'showLockedMsg()'}">
        <div class="lv-emoji">${lv.emoji}</div>
        <div class="lv-num">Level ${lv.id}</div>
        <div class="lv-name">${lv.name}</div>
        <div class="lv-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
        <div class="lv-diff">${'🔥'.repeat(lv.difficulty)}</div>
        ${!unlocked ? '<div class="lv-lock">🔒</div>' : ''}
        ${done ? `<div class="lv-best">Best: ${done.score}</div>` : ''}
      </div>
    `;
  }).join('');

  // Update HUD badge
  document.getElementById('badge-char').textContent = State.playerChar.emoji;
  document.getElementById('badge-name').textContent = State.playerName;
  document.getElementById('badge-score').textContent = `⭐ ${State.totalScore.toLocaleString()}`;
}

// ── SETUP FLOW ────────────────────────────────────────────────────
function beginAdventure() {
  const name = document.getElementById('player-name').value.trim() || 'Petualang';
  State.playerName = name;
  saveProgress();
  AudioEngine.playClick();

  if (!State.apiKey) {
    document.getElementById('overlay-apikey').classList.remove('hidden');
  } else {
    goToLevels();
  }
}

function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  if (key.startsWith('sk-ant-')) {
    State.apiKey = key;
    State.useAI = true;
    saveSettings();
    showToast('✨ AI aktif! Pertanyaan akan lebih dinamis!');
  } else if (key) {
    showToast('⚠️ Format API Key tidak valid. Pastikan diawali sk-ant-');
    return;
  }
  document.getElementById('overlay-apikey').classList.add('hidden');
  goToLevels();
}

function skipApiKey() {
  document.getElementById('overlay-apikey').classList.add('hidden');
  goToLevels();
}

function goToLevels() {
  document.documentElement.style.setProperty('--player-color', State.playerColor);
  buildLevelsGrid();
  showScreen('screen-levels');
  if (State.musicEnabled) {
    setTimeout(() => AudioEngine.startBGMusic(), 300);
  }
}

// ── GAME START ────────────────────────────────────────────────────
function startLevel(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  if (!level) return;
  AudioEngine.playClick();
  State.currentLevel = level;
  State.levelScore = 0;
  State.currentCheckpoint = 0;
  State.lives = 3;
  State.levelQuestions = getQuestionsForLevel(level);
  State.levelStartTime = Date.now();

  document.getElementById('hud-level').textContent = `${level.emoji} Level ${level.id}`;
  document.getElementById('hud-score').textContent = '⭐ 0';
  updateHearts();
  updateProgress();
  buildWorldTrack(level.checkpoints);
  positionCharacter(0);

  document.getElementById('game-world').style.background = level.bg;
  showScreen('screen-game');
}

function buildWorldTrack(count) {
  const track = document.getElementById('world-track');
  const existingCheckpoints = track.querySelectorAll('.checkpoint');
  existingCheckpoints.forEach(c => c.remove());

  for (let i = 0; i < count; i++) {
    const pct = 8 + (i / (count - 1 || 1)) * 84;
    const cp = document.createElement('div');
    cp.className = 'checkpoint';
    cp.id = `cp-${i}`;
    cp.style.left = pct + '%';
    cp.innerHTML = `
      <div class="cp-flag">🚩</div>
      <div class="cp-num">${i + 1}</div>
    `;
    cp.onclick = () => triggerCheckpoint(i);
    track.appendChild(cp);
  }
}

function positionCharacter(cpIndex) {
  const level = State.currentLevel;
  const count = level.checkpoints;
  const pct = cpIndex < count
    ? 8 + (cpIndex / (count - 1 || 1)) * 84
    : 95;

  const char = document.getElementById('player-char');
  const world = document.getElementById('game-world');
  const worldW = world.offsetWidth;
  const targetX = (pct / 100) * worldW - 30;

  // Animate walking
  char.classList.add('walking');
  char.style.left = targetX + 'px';

  // Update sprite
  document.getElementById('char-sprite').textContent = State.playerChar.emoji;

  setTimeout(() => {
    char.classList.remove('walking');
    if (cpIndex < count) {
      const cp = document.getElementById(`cp-${cpIndex}`);
      if (cp) cp.classList.add('active');
    }
  }, 600);

  // Scroll world if needed
  if (targetX > worldW * 0.6) {
    world.scrollLeft = targetX - worldW * 0.5;
  }
}

function triggerCheckpoint(idx) {
  if (idx !== State.currentCheckpoint) return;
  if (State.paused) return;
  AudioEngine.playCheckpoint();
  showQuestion(idx);
}

// ── QUESTIONS ────────────────────────────────────────────────────
async function showQuestion(cpIdx) {
  State.answered = false;
  State.currentQuestion = State.levelQuestions[cpIdx % State.levelQuestions.length];

  // Try AI generation if API key available
  if (State.useAI && State.apiKey) {
    const aiQ = await generateAIQuestion(State.currentLevel);
    if (aiQ) {
      State.currentQuestion = aiQ;
      document.getElementById('api-badge').style.display = 'block';
    } else {
      document.getElementById('api-badge').style.display = 'none';
    }
  } else {
    document.getElementById('api-badge').style.display = 'none';
  }

  const q = State.currentQuestion;
  document.getElementById('q-topic').textContent = q.topic;
  document.getElementById('q-checkpoint').textContent = `Checkpoint ${cpIdx + 1}`;
  document.getElementById('question-text').textContent = q.q;

  // Build options
  const grid = document.getElementById('options-grid');
  grid.innerHTML = q.opts.map((opt, i) => `
    <button class="option-btn" onclick="answerQuestion(${i}, this)">
      <span class="opt-label">${['A','B','C','D'][i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  updateQHearts();
  startTimer();
  document.getElementById('overlay-question').classList.remove('hidden');
}

function startTimer() {
  clearInterval(State.timerInterval);
  State.timerSeconds = 15;
  updateTimerUI(15);

  State.timerInterval = setInterval(() => {
    State.timerSeconds--;
    updateTimerUI(State.timerSeconds);
    if (State.timerSeconds <= 0) {
      clearInterval(State.timerInterval);
      if (!State.answered) {
        timeOut();
      }
    }
  }, 1000);
}

function updateTimerUI(seconds) {
  document.getElementById('timer-text').textContent = seconds;
  const circle = document.getElementById('timer-circle');
  const circumference = 2 * Math.PI * 34; // r=34
  const offset = circumference * (1 - seconds / 15);
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;
  circle.style.stroke = seconds <= 5 ? '#FF6B6B' : seconds <= 10 ? '#FECA57' : '#1DD1A1';
}

function timeOut() {
  State.answered = true;
  State.lives--;
  updateHearts();
  updateQHearts();
  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === State.currentQuestion.ans) b.classList.add('correct');
  });
  AudioEngine.playWrong();
  setTimeout(() => {
    document.getElementById('overlay-question').classList.add('hidden');
    if (State.lives <= 0) {
      showGameOver();
    } else {
      showFunFact(State.currentQuestion, 0, false);
    }
  }, 800);
}

function answerQuestion(idx, btn) {
  if (State.answered) return;
  State.answered = true;
  clearInterval(State.timerInterval);

  const q = State.currentQuestion;
  const correct = idx === q.ans;

  document.querySelectorAll('.option-btn').forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    else if (i === idx && !correct) b.classList.add('wrong');
  });

  if (correct) {
    AudioEngine.playCorrect();
    const timeBonus = Math.floor(State.timerSeconds / 15 * 50);
    const pts = 100 + timeBonus + (State.lives * 20);
    State.levelScore += pts;
    State.totalScore += pts;
    document.getElementById('hud-score').textContent = `⭐ ${State.levelScore}`;
    setTimeout(() => {
      document.getElementById('overlay-question').classList.add('hidden');
      showFunFact(q, pts, true);
    }, 500);
  } else {
    AudioEngine.playWrong();
    State.lives--;
    updateHearts();
    updateQHearts();
    if (State.lives <= 0) {
      setTimeout(() => {
        document.getElementById('overlay-question').classList.add('hidden');
        showGameOver();
      }, 900);
    } else {
      setTimeout(() => {
        State.answered = false;
        document.querySelectorAll('.option-btn').forEach(b => {
          b.disabled = false;
          b.classList.remove('correct', 'wrong');
        });
        startTimer();
      }, 1000);
    }
  }
}

function updateHearts() {
  const row = document.getElementById('hearts-row');
  row.innerHTML = Array(3).fill(0).map((_, i) =>
    `<span class="heart ${i >= State.lives ? 'lost' : ''}">${i < State.lives ? '❤️' : '🖤'}</span>`
  ).join('');
}

function updateQHearts() {
  const row = document.getElementById('q-hearts');
  row.innerHTML = Array(3).fill(0).map((_, i) =>
    `<span class="heart-sm ${i >= State.lives ? 'lost' : ''}">${i < State.lives ? '❤️' : '🖤'}</span>`
  ).join('');
}

function updateProgress() {
  const level = State.currentLevel;
  const pct = (State.currentCheckpoint / level.checkpoints) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `${State.currentCheckpoint}/${level.checkpoints}`;
}

// ── FUN FACT ──────────────────────────────────────────────────────
function showFunFact(q, pts, correct) {
  document.getElementById('ff-icon').textContent = correct ? '🎉' : '😅';
  document.getElementById('ff-title').textContent = correct ? 'Benar! Luar Biasa! 🌟' : 'Hampir! Coba lagi!';
  document.getElementById('ff-answer').textContent = `Jawaban: ${q.opts[q.ans]}`;
  document.getElementById('ff-text').textContent = q.fact;
  document.getElementById('ff-bonus').textContent = correct ? `+${pts} ⭐` : '📚 Belajar yuk!';
  document.getElementById('ff-bonus').className = `ff-bonus ${correct ? 'correct' : 'wrong'}`;

  if (correct) spawnParticles('ff-particles');
  document.getElementById('overlay-funfact').classList.remove('hidden');
}

function closeFunFact() {
  document.getElementById('overlay-funfact').classList.add('hidden');

  // Mark checkpoint as done
  const cp = document.getElementById(`cp-${State.currentCheckpoint}`);
  if (cp) {
    cp.classList.remove('active');
    cp.classList.add('done');
    cp.innerHTML = '<div class="cp-done">✅</div>';
  }

  State.currentCheckpoint++;
  updateProgress();

  if (State.currentCheckpoint >= State.currentLevel.checkpoints) {
    // Level complete!
    setTimeout(showLevelComplete, 300);
  } else {
    positionCharacter(State.currentCheckpoint);
  }
}

// ── LEVEL COMPLETE ────────────────────────────────────────────────
function showLevelComplete() {
  clearInterval(State.timerInterval);
  const elapsed = Math.floor((Date.now() - State.levelStartTime) / 1000);
  const stars = State.levelScore >= 800 ? 3 : State.levelScore >= 400 ? 2 : 1;
  const msgs = ['Luar Biasa! 🌟', 'Petualang Sejati! 🏆', 'Kamu Hebat! 🎉', 'Bravo, Jagoan! 🦁'];

  // Save progress
  const prev = State.completedLevels[State.currentLevel.id];
  if (!prev || State.levelScore > prev.score) {
    State.completedLevels[State.currentLevel.id] = {
      stars, score: State.levelScore, time: elapsed
    };
  }

  // Unlock next level
  const nextId = State.currentLevel.id + 1;
  if (nextId <= LEVELS.length && !State.unlockedLevels.includes(nextId)) {
    State.unlockedLevels.push(nextId);
  }

  saveProgress();
  saveToLeaderboard({
    name: State.playerName,
    char: State.playerChar.emoji,
    score: State.totalScore,
    date: new Date().toLocaleDateString('id-ID')
  });

  document.getElementById('complete-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('complete-msg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
  document.getElementById('complete-score').textContent = State.levelScore.toLocaleString();
  document.getElementById('complete-correct').textContent = State.currentCheckpoint;
  document.getElementById('complete-time').textContent = elapsed + 's';

  const nextBtn = document.getElementById('btn-next-level');
  nextBtn.style.display = nextId <= LEVELS.length ? 'block' : 'none';

  AudioEngine.playLevelUp();
  spawnParticles('complete-particles');
  document.getElementById('overlay-complete').classList.remove('hidden');
}

function goNextLevel() {
  document.getElementById('overlay-complete').classList.add('hidden');
  const nextId = State.currentLevel.id + 1;
  if (nextId <= LEVELS.length) {
    startLevel(nextId);
  } else {
    buildLevelsGrid();
    showScreen('screen-levels');
  }
}

function replayLevel() {
  document.getElementById('overlay-complete').classList.add('hidden');
  document.getElementById('overlay-gameover').classList.add('hidden');
  if (State.currentLevel) startLevel(State.currentLevel.id);
}

// ── GAME OVER ─────────────────────────────────────────────────────
function showGameOver() {
  clearInterval(State.timerInterval);
  document.getElementById('go-score').textContent = State.levelScore.toLocaleString();
  document.getElementById('overlay-gameover').classList.remove('hidden');
}

// ── PAUSE ─────────────────────────────────────────────────────────
function pauseGame() {
  State.paused = true;
  clearInterval(State.timerInterval);
  document.getElementById('overlay-pause').classList.remove('hidden');
}

function resumeGame() {
  State.paused = false;
  document.getElementById('overlay-pause').classList.add('hidden');
}

function quitToMenu() {
  clearInterval(State.timerInterval);
  document.getElementById('overlay-pause').classList.add('hidden');
  buildLevelsGrid();
  showScreen('screen-levels');
}

function showLockedMsg() {
  showToast('🔒 Selesaikan level sebelumnya dulu!');
}

// ── MUSIC TOGGLE ──────────────────────────────────────────────────
function toggleMusic() {
  State.musicEnabled = !State.musicEnabled;
  AudioEngine.setMusic(State.musicEnabled);
  document.getElementById('btn-music-icon').textContent = State.musicEnabled ? '🎵' : '🔇';
  document.getElementById('toggle-music').checked = State.musicEnabled;
  saveSettings();
}

// ── PARTICLES ────────────────────────────────────────────────────
function spawnParticles(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const emojis = ['⭐', '🌟', '✨', '🎉', '🎊', '💫', '🏆', '🎈'];
  for (let i = 0; i < 16; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDelay = Math.random() * 0.5 + 's';
    el.style.animationDuration = (1 + Math.random() * 1.5) + 's';
    container.appendChild(el);
  }
}

// ── TOAST ─────────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2500);
}

// ── SCREEN NAVIGATION ────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  AudioEngine.playClick();
  if (id === 'screen-leaderboard') buildLeaderboard();
  if (id === 'screen-levels') buildLevelsGrid();
}

// ── AI QUESTION GENERATION ────────────────────────────────────────
async function generateAIQuestion(level) {
  if (!State.apiKey) return null;
  try {
    const topicStr = level.topics.map(t => t.replace(/[^\w\s]/g, '')).join(', ');
    const ageNote = level.difficulty === 1 ? 'usia 5-6 tahun' : level.difficulty === 2 ? 'usia 7-8 tahun' : 'usia 9-10 tahun';

    const prompt = `Kamu adalah pembuat soal kuis edukatif untuk anak ${ageNote} bahasa Indonesia.

Buat 1 pertanyaan kuis tentang topik: ${topicStr}
Level kesulitan: ${level.difficulty}/3

Balas HANYA dengan JSON (tanpa markdown, tanpa backtick):
{
  "q": "pertanyaan di sini?",
  "opts": ["opsi A", "opsi B", "opsi C", "opsi D"],
  "ans": 0,
  "fact": "fakta menarik tentang jawaban benar (max 120 karakter)",
  "topic": "${level.topics[0]}"
}

Aturan:
- Pertanyaan harus faktual dan benar
- Jawaban benar selalu di index 0 (akan diacak oleh game)
- Gunakan bahasa Indonesia sederhana
- Fakta harus menarik dan mendidik`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    const parsed = JSON.parse(text.trim());

    // Shuffle options but track correct answer
    const correctAns = parsed.opts[parsed.ans];
    const shuffled = [...parsed.opts].sort(() => Math.random() - 0.5);
    parsed.opts = shuffled;
    parsed.ans = shuffled.indexOf(correctAns);

    return parsed;
  } catch (e) {
    console.warn('AI question failed, using built-in:', e.message);
    return null;
  }
}
