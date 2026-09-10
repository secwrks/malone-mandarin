// First Grade Mandarin — 2026/27 assessment schedule
// Characters use TRADITIONAL forms (Broadway Elementary / Gao Laoshi & Liu Laoshi).
// Source: "2026 1. HFW School Locations" newsletter — test Wednesday 9/16/26.
// Each newsletter has two parts, so each test gets two entries below:
//   - "hfw"        → recognition only (listen / read / speak)
//   - "characters" → dictation portion (students must be able to WRITE these)
// `emoji` is the picture shown with the word so the kid can build an association.
// Directions use arrows matching the teacher's compass drawing (北 up, 南 down, 東 right, 西 left).

const WEEKS = [
  {
    id: "hfw-1",
    track: "hfw",
    label: "HFW · School Locations (recognize)",
    dateRange: "9/8/26 – 9/16/26",
    words: [
      { hanzi: "教室",   pinyin: "jiào shì",     english: "classroom",              emoji: "🧑‍🏫" },
      { hanzi: "圖書館", pinyin: "tú shū guǎn",  english: "library",                emoji: "📚" },
      { hanzi: "操場",   pinyin: "cāo chǎng",    english: "playground / field",     emoji: "⚽" },
      { hanzi: "禮堂",   pinyin: "lǐ táng",      english: "auditorium",             emoji: "🎭" },
      { hanzi: "餐廳",   pinyin: "cān tīng",     english: "restaurant / cafeteria", emoji: "🍽️" },
      { hanzi: "食堂",   pinyin: "shí táng",     english: "cafeteria / dining hall", emoji: "🍱" },
      { hanzi: "洗手間", pinyin: "xǐ shǒu jiān", english: "restroom",               emoji: "🚻" },
      { hanzi: "辦公室", pinyin: "bàn gōng shì", english: "office",                 emoji: "🖥️" },
      { hanzi: "東",     pinyin: "dōng",         english: "east",                   emoji: "➡️" },
      { hanzi: "南",     pinyin: "nán",          english: "south",                  emoji: "⬇️" },
      { hanzi: "西",     pinyin: "xī",           english: "west",                   emoji: "⬅️" },
      { hanzi: "北",     pinyin: "běi",          english: "north",                  emoji: "⬆️" },
    ],
  },
  {
    id: "chars-1",
    track: "characters",
    label: "Characters · Dictation (write)",
    dateRange: "9/8/26 – 9/16/26",
    words: [
      { hanzi: "是",   pinyin: "shì",     english: "is / am / are",   emoji: "✅" },
      { hanzi: "個",   pinyin: "gè",      english: "(measure word)",  emoji: "☝️" },
      { hanzi: "去",   pinyin: "qù",      english: "go",              emoji: "🏃" },
      { hanzi: "有",   pinyin: "yǒu",     english: "have / there is", emoji: "🤲" },
      { hanzi: "東",   pinyin: "dōng",    english: "east",            emoji: "➡️" },
      { hanzi: "西",   pinyin: "xī",      english: "west",            emoji: "⬅️" },
      { hanzi: "東西", pinyin: "dōng xī", english: "stuff / things",  emoji: "📦" },
    ],
  },
];
