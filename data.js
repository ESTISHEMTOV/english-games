/* ============================================================
   data.js — אוצר המילים לכל המשחקים
   כל מילה: { en, he, emoji, topic }
   ה"ציורים" הם אימוג'ים גדולים — עובדים בלי אינטרנט.
   ============================================================ */

const VOCAB = {
  animals: {
    he: "חיות",
    enLabel: "Animals",
    emoji: "🐾",
    words: [
      { en: "cat",      he: "חתול",   emoji: "🐱" },
      { en: "dog",      he: "כלב",    emoji: "🐶" },
      { en: "fish",     he: "דג",     emoji: "🐟" },
      { en: "bird",     he: "ציפור",  emoji: "🐦" },
      { en: "lion",     he: "אריה",   emoji: "🦁" },
      { en: "cow",      he: "פרה",    emoji: "🐄" },
      { en: "duck",     he: "ברווז",  emoji: "🦆" },
      { en: "frog",     he: "צפרדע",  emoji: "🐸" },
      { en: "bear",     he: "דוב",    emoji: "🐻" },
      { en: "pig",      he: "חזיר",   emoji: "🐷" },
      { en: "horse",    he: "סוס",    emoji: "🐴" },
      { en: "monkey",   he: "קוף",    emoji: "🐵" },
      { en: "rabbit",   he: "ארנב",   emoji: "🐰" },
      { en: "elephant", he: "פיל",    emoji: "🐘" },
    ],
  },

  food: {
    he: "אוכל",
    enLabel: "Food",
    emoji: "🍎",
    words: [
      { en: "apple",  he: "תפוח",  emoji: "🍎" },
      { en: "banana", he: "בננה",  emoji: "🍌" },
      { en: "bread",  he: "לחם",   emoji: "🍞" },
      { en: "milk",   he: "חלב",   emoji: "🥛" },
      { en: "egg",    he: "ביצה",  emoji: "🥚" },
      { en: "cake",   he: "עוגה",  emoji: "🍰" },
      { en: "pizza",  he: "פיצה",  emoji: "🍕" },
      { en: "cheese", he: "גבינה", emoji: "🧀" },
      { en: "water",  he: "מים",   emoji: "💧" },
      { en: "grapes", he: "ענבים", emoji: "🍇" },
    ],
  },

  colors: {
    he: "צבעים",
    enLabel: "Colors",
    emoji: "🌈",
    words: [
      { en: "red",    he: "אדום",  emoji: "🔴" },
      { en: "blue",   he: "כחול",  emoji: "🔵" },
      { en: "green",  he: "ירוק",  emoji: "🟢" },
      { en: "yellow", he: "צהוב",  emoji: "🟡" },
      { en: "orange", he: "כתום",  emoji: "🟠" },
      { en: "purple", he: "סגול",  emoji: "🟣" },
      { en: "pink",   he: "ורוד",  emoji: "🩷" },
      { en: "black",  he: "שחור",  emoji: "⚫" },
      { en: "white",  he: "לבן",   emoji: "⚪" },
      { en: "brown",  he: "חוּם",   emoji: "🟤" },
    ],
  },

  family: {
    he: "משפחה",
    enLabel: "Family",
    emoji: "👨‍👩‍👧",
    words: [
      { en: "mother",  he: "אמא",   emoji: "👩" },
      { en: "father",  he: "אבא",   emoji: "👨" },
      { en: "baby",    he: "תינוק", emoji: "👶" },
      { en: "brother", he: "אח",    emoji: "👦" },
      { en: "sister",  he: "אחות",  emoji: "👧" },
      { en: "grandma", he: "סבתא",  emoji: "👵" },
      { en: "grandpa", he: "סבא",   emoji: "👴" },
    ],
  },

  body: {
    he: "הגוף שלי",
    enLabel: "My Body",
    emoji: "🧍",
    words: [
      { en: "hand",  he: "יד",  emoji: "✋" },
      { en: "eye",   he: "עין", emoji: "👁️" },
      { en: "ear",   he: "אוזן", emoji: "👂" },
      { en: "nose",  he: "אף",  emoji: "👃" },
      { en: "mouth", he: "פה",  emoji: "👄" },
      { en: "foot",  he: "רגל", emoji: "🦶" },
      { en: "hair",  he: "שיער", emoji: "💇" },
    ],
  },

  nature: {
    he: "טבע",
    enLabel: "Nature",
    emoji: "🌳",
    words: [
      { en: "sun",    he: "שמש",   emoji: "☀️" },
      { en: "moon",   he: "ירח",   emoji: "🌙" },
      { en: "star",   he: "כוכב",  emoji: "⭐" },
      { en: "tree",   he: "עץ",    emoji: "🌳" },
      { en: "flower", he: "פרח",   emoji: "🌸" },
      { en: "rain",   he: "גשם",   emoji: "🌧️" },
      { en: "cloud",  he: "ענן",   emoji: "☁️" },
    ],
  },

  things: {
    he: "חפצים",
    enLabel: "Things",
    emoji: "🧸",
    words: [
      { en: "ball",  he: "כדור", emoji: "⚽" },
      { en: "book",  he: "ספר",  emoji: "📖" },
      { en: "car",   he: "מכונית", emoji: "🚗" },
      { en: "house", he: "בית",  emoji: "🏠" },
      { en: "bed",   he: "מיטה", emoji: "🛏️" },
      { en: "cup",   he: "כוס",  emoji: "☕" },
      { en: "key",   he: "מפתח", emoji: "🔑" },
      { en: "hat",   he: "כובע", emoji: "🎩" },
    ],
  },

  numbers: {
    he: "מספרים",
    enLabel: "Numbers",
    emoji: "🔢",
    words: [
      { en: "one",   he: "אחת",   emoji: "1️⃣" },
      { en: "two",   he: "שתיים", emoji: "2️⃣" },
      { en: "three", he: "שלוש",  emoji: "3️⃣" },
      { en: "four",  he: "ארבע",  emoji: "4️⃣" },
      { en: "five",  he: "חמש",   emoji: "5️⃣" },
      { en: "six",   he: "שש",    emoji: "6️⃣" },
      { en: "seven", he: "שבע",   emoji: "7️⃣" },
      { en: "eight", he: "שמונה", emoji: "8️⃣" },
      { en: "nine",  he: "תשע",   emoji: "9️⃣" },
      { en: "ten",   he: "עשר",   emoji: "🔟" },
    ],
  },

  fruits: {
    he: "פירות",
    enLabel: "Fruits",
    emoji: "🍓",
    words: [
      { en: "strawberry", he: "תות",     emoji: "🍓" },
      { en: "orange",     he: "תפוז",    emoji: "🍊" },
      { en: "watermelon", he: "אבטיח",   emoji: "🍉" },
      { en: "cherry",     he: "דובדבן",  emoji: "🍒" },
      { en: "lemon",      he: "לימון",   emoji: "🍋" },
      { en: "peach",      he: "אפרסק",   emoji: "🍑" },
      { en: "pear",       he: "אגס",     emoji: "🍐" },
      { en: "pineapple",  he: "אננס",    emoji: "🍍" },
    ],
  },

  clothes: {
    he: "בגדים",
    enLabel: "Clothes",
    emoji: "👕",
    words: [
      { en: "shirt",  he: "חולצה",   emoji: "👕" },
      { en: "pants",  he: "מכנסיים", emoji: "👖" },
      { en: "dress",  he: "שמלה",    emoji: "👗" },
      { en: "shoes",  he: "נעליים",  emoji: "👟" },
      { en: "cap",    he: "כובע",    emoji: "🧢" },
      { en: "socks",  he: "גרביים",  emoji: "🧦" },
      { en: "coat",   he: "מעיל",    emoji: "🧥" },
      { en: "gloves", he: "כפפות",   emoji: "🧤" },
    ],
  },

  school: {
    he: "בית ספר",
    enLabel: "School",
    emoji: "🏫",
    words: [
      { en: "pen",      he: "עט",      emoji: "🖊️" },
      { en: "pencil",   he: "עיפרון",  emoji: "✏️" },
      { en: "bag",      he: "תיק",     emoji: "🎒" },
      { en: "scissors", he: "מספריים", emoji: "✂️" },
      { en: "ruler",    he: "סרגל",    emoji: "📏" },
      { en: "notebook", he: "מחברת",   emoji: "📓" },
      { en: "crayon",   he: "צבע",     emoji: "🖍️" },
      { en: "teacher",  he: "מורה",    emoji: "🧑‍🏫" },
    ],
  },

  weather: {
    he: "מזג אוויר",
    enLabel: "Weather",
    emoji: "🌦️",
    words: [
      { en: "rainbow",  he: "קשת",    emoji: "🌈" },
      { en: "snow",     he: "שלג",    emoji: "❄️" },
      { en: "wind",     he: "רוח",    emoji: "💨" },
      { en: "storm",    he: "סערה",   emoji: "⛈️" },
      { en: "hot",      he: "חם",     emoji: "🔥" },
      { en: "cold",     he: "קר",     emoji: "🧊" },
      { en: "umbrella", he: "מטריה",  emoji: "☂️" },
    ],
  },

  actions: {
    he: "פעולות",
    enLabel: "Actions",
    emoji: "🏃",
    words: [
      { en: "run",   he: "לרוץ",   emoji: "🏃" },
      { en: "jump",  he: "לקפוץ",  emoji: "🦘" },
      { en: "eat",   he: "לאכול",  emoji: "🍽️" },
      { en: "sleep", he: "לישון",  emoji: "😴" },
      { en: "read",  he: "לקרוא",  emoji: "📖" },
      { en: "write", he: "לכתוב",  emoji: "✍️" },
      { en: "sing",  he: "לשיר",   emoji: "🎤" },
      { en: "dance", he: "לרקוד",  emoji: "💃" },
      { en: "swim",  he: "לשחות",  emoji: "🏊" },
      { en: "draw",  he: "לצייר",  emoji: "🎨" },
    ],
  },

  vehicles: {
    he: "כלי תחבורה",
    enLabel: "Vehicles",
    emoji: "🚌",
    words: [
      { en: "bus",        he: "אוטובוס", emoji: "🚌" },
      { en: "train",      he: "רכבת",    emoji: "🚆" },
      { en: "plane",      he: "מטוס",    emoji: "✈️" },
      { en: "boat",       he: "סירה",    emoji: "⛵" },
      { en: "bike",       he: "אופניים", emoji: "🚲" },
      { en: "truck",      he: "משאית",   emoji: "🚚" },
      { en: "rocket",     he: "רקטה",    emoji: "🚀" },
      { en: "helicopter", he: "מסוק",    emoji: "🚁" },
    ],
  },

  toys: {
    he: "צעצועים",
    enLabel: "Toys",
    emoji: "🧸",
    words: [
      { en: "teddy",   he: "דובי",   emoji: "🧸" },
      { en: "kite",    he: "עפיפון", emoji: "🪁" },
      { en: "doll",    he: "בובה",   emoji: "🪆" },
      { en: "blocks",  he: "קוביות", emoji: "🧱" },
      { en: "drum",    he: "תוף",    emoji: "🥁" },
      { en: "balloon", he: "בלון",   emoji: "🎈" },
      { en: "robot",   he: "רובוט",  emoji: "🤖" },
    ],
  },

  jobs: {
    he: "מקצועות",
    enLabel: "Jobs",
    emoji: "👷",
    words: [
      { en: "doctor",      he: "רופא",  emoji: "🧑‍⚕️" },
      { en: "chef",        he: "טבח",   emoji: "👨‍🍳" },
      { en: "police",      he: "שוטר",  emoji: "👮" },
      { en: "farmer",      he: "חקלאי", emoji: "🧑‍🌾" },
      { en: "firefighter", he: "כבאי",  emoji: "🧑‍🚒" },
      { en: "pilot",       he: "טייס",  emoji: "🧑‍✈️" },
      { en: "artist",      he: "אמן",   emoji: "🧑‍🎨" },
    ],
  },
};

/* רשימה שטוחה של כל המילים — נוח לדגימה אקראית */
const ALL_WORDS = Object.entries(VOCAB).flatMap(([topic, t]) =>
  t.words.map((w) => ({ ...w, topic }))
);

/* ----- צירופי מילים משמעותיים (לתום) ----- */
const PHRASES = [
  { en: "I can run",   he: "אני יכול/ה לרוץ",  emoji: "🏃" },
  { en: "I can jump",  he: "אני יכול/ה לקפוץ", emoji: "🦘" },
  { en: "I can swim",  he: "אני יכול/ה לשחות", emoji: "🏊" },
  { en: "I can fly",   he: "אני יכול/ה לעוף",  emoji: "🕊️" },
  { en: "I see a cat", he: "אני רואה חתול",    emoji: "🐱" },
  { en: "I see a dog", he: "אני רואה כלב",     emoji: "🐶" },
  { en: "I see the sun", he: "אני רואה את השמש", emoji: "☀️" },
  { en: "I like cake", he: "אני אוהב/ת עוגה",  emoji: "🍰" },
  { en: "I like milk", he: "אני אוהב/ת חלב",   emoji: "🥛" },
  { en: "I have a ball", he: "יש לי כדור",     emoji: "⚽" },
  { en: "I have a book", he: "יש לי ספר",      emoji: "📖" },
  { en: "It is a star", he: "זה כוכב",         emoji: "⭐" },
];

/* פירוק לצירופי מילה — לבניית כפתורי "I + can + run" */
PHRASES.forEach((p) => (p.parts = p.en.split(" ")));

/* ----- "קצת עליי" — משפטי היכרות בסיסיים (לכל ילד) -----
   קל לעריכה: אפשר לשנות שם/גיל/מקום/אחים לפי הצורך.
   שי + ליה — לשון נקבה; יונתן — לשון זכר. */
const ABOUT_ME = {
  shai: [
    { emoji: "👋",  en: "Hi! My name is Shai.",  he: "הֵיי! קוראים לי שי." },
    { emoji: "🖐️", en: "I am five years old.",   he: "אני בת חמש." },
    { emoji: "👧",  en: "I am a girl.",           he: "אני ילדה." },
    { emoji: "🏡",  en: "I live in Tzrufa.",      he: "אני גרה בצרופה." },
    { emoji: "👭",  en: "I have two sisters.",    he: "יש לי שתי אחיות." },
    { emoji: "❤️", en: "I love my family.",      he: "אני אוהבת את המשפחה שלי." },
    { emoji: "🧸",  en: "I like to play.",        he: "אני אוהבת לשחק." },
    { emoji: "😊",  en: "Nice to meet you!",      he: "נעים להכיר!" },
  ],
  lia: [
    { emoji: "👋",  en: "Hi! My name is Lia.",    he: "הֵיי! קוראים לי ליה." },
    { emoji: "🖐️", en: "I am five years old.",   he: "אני בת חמש." },
    { emoji: "👧",  en: "I am a girl.",           he: "אני ילדה." },
    { emoji: "🏡",  en: "I live in Tzrufa.",      he: "אני גרה בצרופה." },
    { emoji: "❤️", en: "I love my family.",      he: "אני אוהבת את המשפחה שלי." },
    { emoji: "🧸",  en: "I like to play.",        he: "אני אוהבת לשחק." },
    { emoji: "🌈",  en: "I like colors.",         he: "אני אוהבת צבעים." },
    { emoji: "😊",  en: "Nice to meet you!",      he: "נעים להכיר!" },
  ],
  yonatan: [
    { emoji: "👋",  en: "Hi! My name is Yonatan.", he: "הֵיי! קוראים לי יונתן." },
    { emoji: "🖐️", en: "I am six years old.",     he: "אני בן שש." },
    { emoji: "👦",  en: "I am a boy.",             he: "אני ילד." },
    { emoji: "🏡",  en: "I live in Tzrufa.",       he: "אני גר בצרופה." },
    { emoji: "❤️", en: "I love my family.",       he: "אני אוהב את המשפחה שלי." },
    { emoji: "🧸",  en: "I like to play.",         he: "אני אוהב לשחק." },
    { emoji: "🚗",  en: "I like cars.",            he: "אני אוהב מכוניות." },
    { emoji: "😊",  en: "Nice to meet you!",       he: "נעים להכיר!" },
  ],
};

/* ----- אלף-בית באנגלית (לשי) — אות + מילה לדוגמה + ציור ----- */
const ABC = [
  { L: "A", word: "apple",      emoji: "🍎" },
  { L: "B", word: "ball",       emoji: "⚽" },
  { L: "C", word: "cat",        emoji: "🐱" },
  { L: "D", word: "dog",        emoji: "🐶" },
  { L: "E", word: "elephant",   emoji: "🐘" },
  { L: "F", word: "fish",       emoji: "🐟" },
  { L: "G", word: "grapes",     emoji: "🍇" },
  { L: "H", word: "hat",        emoji: "🎩" },
  { L: "I", word: "ice cream",  emoji: "🍦" },
  { L: "J", word: "jump",       emoji: "🦘" },
  { L: "K", word: "key",        emoji: "🔑" },
  { L: "L", word: "lion",       emoji: "🦁" },
  { L: "M", word: "moon",       emoji: "🌙" },
  { L: "N", word: "nose",       emoji: "👃" },
  { L: "O", word: "orange",     emoji: "🍊" },
  { L: "P", word: "pizza",      emoji: "🍕" },
  { L: "Q", word: "queen",      emoji: "👑" },
  { L: "R", word: "rabbit",     emoji: "🐰" },
  { L: "S", word: "sun",        emoji: "☀️" },
  { L: "T", word: "tree",       emoji: "🌳" },
  { L: "U", word: "umbrella",   emoji: "☂️" },
  { L: "V", word: "van",        emoji: "🚐" },
  { L: "W", word: "water",      emoji: "💧" },
  { L: "X", word: "box",        emoji: "📦" },
  { L: "Y", word: "yo-yo",      emoji: "🪀" },
  { L: "Z", word: "zebra",      emoji: "🦓" },
];
