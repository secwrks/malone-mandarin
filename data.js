// First Grade Mandarin — 2026/27 assessment schedule
// Characters use TRADITIONAL forms (Broadway Elementary / Gao Laoshi & Liu Laoshi).
// Source: "2026 1. HFW School Locations" newsletter — test Wednesday 9/16/26.
// Each newsletter has two parts, so each test gets two entries below:
//   - "hfw"        → recognition only (listen / read / speak)
//   - "characters" → dictation portion (students must be able to WRITE these)

const WEEKS = [
  {
    id: "hfw-1",
    track: "hfw",
    label: "HFW · School Locations (recognize)",
    dateRange: "9/8/26 – 9/16/26",
    words: [
      { hanzi: "教室",   pinyin: "jiào shì",     english: "classroom" },
      { hanzi: "圖書館", pinyin: "tú shū guǎn",  english: "library" },
      { hanzi: "操場",   pinyin: "cāo chǎng",    english: "playground / field" },
      { hanzi: "禮堂",   pinyin: "lǐ táng",      english: "auditorium" },
      { hanzi: "餐廳",   pinyin: "cān tīng",     english: "restaurant / cafeteria" },
      { hanzi: "食堂",   pinyin: "shí táng",     english: "cafeteria / dining hall" },
      { hanzi: "洗手間", pinyin: "xǐ shǒu jiān", english: "restroom" },
      { hanzi: "辦公室", pinyin: "bàn gōng shì", english: "office" },
      { hanzi: "東",     pinyin: "dōng",         english: "east" },
      { hanzi: "南",     pinyin: "nán",          english: "south" },
      { hanzi: "西",     pinyin: "xī",           english: "west" },
      { hanzi: "北",     pinyin: "běi",          english: "north" },
    ],
  },
  {
    id: "chars-1",
    track: "characters",
    label: "Characters · Dictation (write)",
    dateRange: "9/8/26 – 9/16/26",
    words: [
      { hanzi: "是",   pinyin: "shì",     english: "is / am / are" },
      { hanzi: "個",   pinyin: "gè",      english: "(measure word)" },
      { hanzi: "去",   pinyin: "qù",      english: "go" },
      { hanzi: "有",   pinyin: "yǒu",     english: "have / there is" },
      { hanzi: "東",   pinyin: "dōng",    english: "east" },
      { hanzi: "西",   pinyin: "xī",      english: "west" },
      { hanzi: "東西", pinyin: "dōng xī", english: "stuff / things" },
    ],
  },
];
