/* ============================================================
   shared.js — מנוע משותף
   • דיבור (Text-to-Speech) בעברית ובאנגלית
   • זיהוי דיבור (Speech Recognition) + ציון הגייה
   • צלילים, כוכבים, קונפטי, ועוזרי בנייה
   ============================================================ */

/* ---------- בחירת קולות ---------- */
let VOICES = [];
function loadVoices() { VOICES = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
if (window.speechSynthesis) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function pickVoice(lang) {
  if (!VOICES.length) loadVoices();
  const pref = lang.slice(0, 2).toLowerCase();
  return (
    VOICES.find((v) => v.lang && v.lang.toLowerCase() === lang.toLowerCase()) ||
    VOICES.find((v) => v.lang && v.lang.toLowerCase().startsWith(pref)) ||
    null
  );
}

/* ---------- דיבור ---------- */
function speak(text, lang = "en-US", { rate = 0.95, pitch = 1.05 } = {}) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) return resolve();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.onend = resolve;
    u.onerror = resolve;
    speechSynthesis.speak(u);
  });
}
const speakHe = (t, o = {}) => speak(t, "he-IL", { rate: 0.95, pitch: 1.05, ...o });
const speakEn = (t, o = {}) => speak(t, "en-US", { rate: 0.85, pitch: 1.1, ...o });
const speakEnSlow = (t) => speak(t, "en-US", { rate: 0.6, pitch: 1.1 });

/* ---------- זיהוי דיבור ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const RECOGNITION_OK = !!SR;

/* האם אנחנו בהקשר מאובטח (https / localhost)? מיקרופון דורש זאת. */
const SECURE_OK = window.isSecureContext === true;

/* מבקש הרשאת מיקרופון מפורשת פעם אחת — כך הדפדפן מציג חלון אישור.
   מחזיר true אם המיקרופון זמין, אחרת false (למשל בפתיחת קובץ ישירות). */
let micGranted = false;
async function ensureMic() {
  if (micGranted) return true;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // אין API — נניח שזיהוי הדיבור ינסה לבד
    return SECURE_OK;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    micGranted = true;
    return true;
  } catch (e) {
    return false;
  }
}

/* האם השגיאה היא בעיית הרשאה/הקשר (ולא סתם "לא שמעתי")? */
function isMicPermissionError(err) {
  const m = (err && err.message) || "";
  return ["not-allowed", "service-not-allowed", "audio-capture", "insecure", "no-mic"].includes(m);
}

function listen(lang = "en-US") {
  return new Promise((resolve, reject) => {
    if (!SR) return reject(new Error("no-recognition"));
    const r = new SR();
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 3;
    let done = false;
    r.onresult = (e) => {
      done = true;
      const alts = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      resolve({ transcript: alts[0] || "", alternatives: alts, confidence: e.results[0][0].confidence });
    };
    r.onerror = (e) => { if (!done) reject(new Error(e.error || "error")); };
    r.onend = () => { if (!done) reject(new Error("no-speech")); };
    try { r.start(); } catch (e) { reject(e); }
  });
}

/* ---------- ציון הגייה ---------- */
function normalize(s) {
  return (s || "").toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ").trim();
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
/* מחזיר 'great' | 'close' | 'try' לפי קרבת מה שנשמע למילה היעד */
function scorePronunciation(target, alternatives) {
  const t = normalize(target);
  let best = Infinity;
  (Array.isArray(alternatives) ? alternatives : [alternatives]).forEach((alt) => {
    const a = normalize(alt);
    if (!a) return;
    const dist = levenshtein(a, t);
    if (dist < best) best = dist;
    // גם אם נשמעת המילה בתוך משפט
    if (a.split(" ").includes(t)) best = Math.min(best, 0);
  });
  const ratio = best / Math.max(t.length, 1);
  if (best === 0 || ratio <= 0.15) return "great";
  if (ratio <= 0.45) return "close";
  return "try";
}

/* ---------- צלילים (Web Audio — בלי קבצים) ---------- */
let AC;
function audio() { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); return AC; }
function tone(freq, t0, dur, type = "sine", vol = 0.2) {
  const ac = audio();
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type; o.frequency.value = freq;
  o.connect(g); g.connect(ac.destination);
  const start = ac.currentTime + t0;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(vol, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.start(start); o.stop(start + dur + 0.02);
}
function soundCorrect() { try { tone(523, 0, 0.15); tone(659, 0.12, 0.15); tone(784, 0.24, 0.25); } catch (e) {} }
function soundWin()     { try { [523,659,784,1046].forEach((f,i)=>tone(f,i*0.12,0.3)); } catch (e) {} }
function soundTry()     { try { tone(330, 0, 0.18, "triangle", 0.15); tone(247, 0.16, 0.25, "triangle", 0.15); } catch (e) {} }
function soundPop()     { try { tone(660, 0, 0.08, "square", 0.12); } catch (e) {} }

/* ---------- קונפטי ---------- */
function confetti(n = 120) {
  let c = document.getElementById("confetti");
  if (!c) { c = document.createElement("canvas"); c.id = "confetti"; document.body.appendChild(c); }
  const ctx = c.getContext("2d");
  c.width = innerWidth; c.height = innerHeight;
  const cols = ["#ff5d8f","#ffd23f","#3ddc84","#4d8bff","#9b5de5","#ff9f68","#20c4c4"];
  const P = Array.from({ length: n }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
    r: 5 + Math.random() * 8, c: cols[(Math.random() * cols.length) | 0],
    vx: -2 + Math.random() * 4, vy: 2 + Math.random() * 4, a: Math.random() * 6,
  }));
  let frames = 0;
  (function run() {
    ctx.clearRect(0, 0, c.width, c.height);
    P.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.a += 0.1;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r); ctx.restore();
    });
    if (frames++ < 140) requestAnimationFrame(run);
    else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

/* ---------- התקדמות מתמשכת (נשמר במכשיר) ----------
   • כל תשובה נכונה = נקודה / שלב.
   • CHAMP_AT נקודות = אליפות 🏆 → הנקודות מתאפסות ומתחילים אלופה חדשה.
   • נשמרת טבלת נקודות לפי יום, ומספר האליפויות שנצברו.
*/
const CHAMP_AT = 100; // נקודות לאליפות

const Progress = {
  key(p) { return "eg_progress_" + p; },
  fresh() { return { points: 0, championships: 0, best: 0, days: {} }; },
  load(p) {
    try { return Object.assign(this.fresh(), JSON.parse(localStorage.getItem(this.key(p))) || {}); }
    catch (e) { return this.fresh(); }
  },
  save(p, d) { try { localStorage.setItem(this.key(p), JSON.stringify(d)); } catch (e) {} },
  today() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  },
  add(p, k = 1) {
    const d = this.load(p);
    d.points += k;
    const t = this.today();
    d.days[t] = (d.days[t] || 0) + k;
    let champ = false;
    if (d.points >= CHAMP_AT) {
      d.points -= CHAMP_AT;
      d.championships += 1;
      champ = true;
    }
    if (d.points > d.best) d.best = d.points;
    this.save(p, d);
    return { champ, points: d.points, championships: d.championships, days: d.days };
  },
};

/* ---------- ניקוד / שלבים (מגשר ל-Progress) ---------- */
const Score = {
  el: null,
  player: null,
  init(el, player) {
    this.el = el; this.player = player;
    const d = Progress.load(player);
    this.render(d.points);
  },
  add(k = 1) {
    const r = Progress.add(this.player, k);
    this.render(r.points);
    if (this.el) { this.el.style.transform = "scale(1.25)"; setTimeout(() => (this.el.style.transform = ""), 180); }
    soundLevelUp();
    if (r.champ) celebrateChampionship(this.player, r.championships);
    return r;
  },
  render(n) { if (this.el) this.el.textContent = "⭐ " + n + " / " + CHAMP_AT; },
};

/* צליל "עלית שלב" עדין */
function soundLevelUp() { try { tone(880, 0, 0.08, "sine", 0.1); } catch (e) {} }

/* ---------- חגיגת אליפות 🏆 ---------- */
function celebrateChampionship(player, num) {
  soundWin(); confetti(220);
  const en = player === "tom";          // תום — אנגלית
  const m = player === "yonatan";       // יונתן — עברית לשון זכר
  const ov = el("div", "champ-overlay");
  const card = el("div", "champ-card");
  let html;
  if (en) html = `<h2>Champion!</h2><p>You won championship #${num}! 🎉<br>Points reset — let's win another one!</p>`;
  else if (m) html = `<h2>אתה אלוף!</h2><p>זאת אליפות מספר ${num}! 🎉<br>הנקודות מתאפסות — קדימה לאליפות הבאה!</p>`;
  else html = `<h2>את אלופה!</h2><p>זאת אליפות מספר ${num}! 🎉<br>הנקודות מתאפסות — קדימה לאליפות הבאה!</p>`;
  card.innerHTML = `<div class="cup">🏆</div>` + html;
  const btn = el("button", "action next", en ? "Yay! 🎈" : "יאללה! 🎈");
  btn.onclick = () => ov.remove();
  card.appendChild(btn);
  ov.appendChild(card);
  document.body.appendChild(ov);
  setTimeout(() => confetti(160), 600);
  const say = en ? "You are the champion! Great job!" : (m ? "כל הכבוד! אתה אלוף!" : "כל הכבוד! את אלופה!");
  speak(say, en ? "en-US" : "he-IL");
}

/* ---------- בניית מסך ההתקדמות ----------
   ממלא container ב: שלב נוכחי, פס התקדמות, אליפויות, וטבלת נקודות יומית.
*/
function renderProgress(container, player) {
  const he = player !== "tom";   // עברית לכולם חוץ מתום (אנגלית)
  const d = Progress.load(player);
  container.innerHTML = "";

  container.appendChild(el("div", "prompt-he", he ? "כל הדרך לאליפות! 🏆" : "On the way to the championship! 🏆"));
  container.appendChild(el("div", "level-badge", "⭐ " + d.points));
  container.appendChild(el("div", "level-cap", (he ? "שלב " : "Level ") + d.points + " / " + CHAMP_AT));

  const bar = el("div", "bar");
  const fill = el("i"); fill.style.width = Math.min(100, (d.points / CHAMP_AT) * 100) + "%";
  bar.appendChild(fill); container.appendChild(bar);

  container.appendChild(el("div", "level-cap", (he ? "האליפויות שלך:" : "Championships won:")));
  const tr = el("div", "trophies");
  if (d.championships > 0) tr.innerHTML = "🏆".repeat(Math.min(d.championships, 20)) + (d.championships > 20 ? " ×" + d.championships : "");
  else tr.innerHTML = `<span class="none">${he ? "עוד אין — הראשונה בדרך!" : "None yet — the first is coming!"}</span>`;
  container.appendChild(tr);

  // טבלת נקודות לפי יום (מהחדש לישן)
  const dates = Object.keys(d.days).sort().reverse();
  const table = el("table", "days-table");
  table.innerHTML = `<tr><th>${he ? "תאריך" : "Date"}</th><th>${he ? "נקודות" : "Points"}</th></tr>`;
  if (dates.length === 0) {
    const row = el("tr"); row.innerHTML = `<td colspan="2" class="days-empty">${he ? "עדיין אין נקודות — אפשר להתחיל!" : "No games yet — let's start!"}</td>`;
    table.appendChild(row);
  } else {
    const today = Progress.today();
    dates.slice(0, 14).forEach((dt) => {
      const [y, m, day] = dt.split("-");
      const row = el("tr", dt === today ? "today" : "");
      const label = `${day}/${m}` + (dt === today ? (he ? " (היום)" : " (today)") : "");
      row.innerHTML = `<td>${label}</td><td class="pts">${d.days[dt]} ⭐</td>`;
      table.appendChild(row);
    });
  }
  container.appendChild(table);
}

/* ---------- עוזרים ---------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function sample(arr, k) { return shuffle(arr).slice(0, k); }
function randItem(arr) { return arr[(Math.random() * arr.length) | 0]; }
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* פותח את קול המערכת אחרי אינטראקציה ראשונה (דרוש בחלק מהדפדפנים) */
function primeAudio() { try { audio().resume(); } catch (e) {} if (window.speechSynthesis) { speechSynthesis.resume(); } }
document.addEventListener("pointerdown", primeAudio, { once: true });
