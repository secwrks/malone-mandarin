// NATO phonetic alphabet (ICAO/ITU-R standard)
// Grouped into "sets" so learners can drill smaller chunks.

const LETTERS = [
  { letter: "A", word: "Alfa",     pron: "AL-fah" },
  { letter: "B", word: "Bravo",    pron: "BRAH-voh" },
  { letter: "C", word: "Charlie",  pron: "CHAR-lee" },
  { letter: "D", word: "Delta",    pron: "DEL-tah" },
  { letter: "E", word: "Echo",     pron: "EKK-oh" },
  { letter: "F", word: "Foxtrot",  pron: "FOKS-trot" },
  { letter: "G", word: "Golf",     pron: "GOLF" },
  { letter: "H", word: "Hotel",    pron: "hoh-TELL" },
  { letter: "I", word: "India",    pron: "IN-dee-ah" },
  { letter: "J", word: "Juliett",  pron: "JEW-lee-ETT" },
  { letter: "K", word: "Kilo",     pron: "KEY-loh" },
  { letter: "L", word: "Lima",     pron: "LEE-mah" },
  { letter: "M", word: "Mike",     pron: "MIKE" },
  { letter: "N", word: "November", pron: "no-VEM-ber" },
  { letter: "O", word: "Oscar",    pron: "OSS-cah" },
  { letter: "P", word: "Papa",     pron: "pah-PAH" },
  { letter: "Q", word: "Quebec",   pron: "keh-BECK" },
  { letter: "R", word: "Romeo",    pron: "ROW-me-oh" },
  { letter: "S", word: "Sierra",   pron: "see-AIR-rah" },
  { letter: "T", word: "Tango",    pron: "TANG-go" },
  { letter: "U", word: "Uniform",  pron: "YOU-nee-form" },
  { letter: "V", word: "Victor",   pron: "VIK-tah" },
  { letter: "W", word: "Whiskey",  pron: "WISS-key" },
  { letter: "X", word: "X-ray",    pron: "ECKS-ray" },
  { letter: "Y", word: "Yankee",   pron: "YANG-key" },
  { letter: "Z", word: "Zulu",     pron: "ZOO-loo" },
];

const SETS = [
  { id: "set-1", label: "Set 1 · A–G",  range: "A B C D E F G",       letters: ["A","B","C","D","E","F","G"] },
  { id: "set-2", label: "Set 2 · H–N",  range: "H I J K L M N",       letters: ["H","I","J","K","L","M","N"] },
  { id: "set-3", label: "Set 3 · O–T",  range: "O P Q R S T",         letters: ["O","P","Q","R","S","T"] },
  { id: "set-4", label: "Set 4 · U–Z",  range: "U V W X Y Z",         letters: ["U","V","W","X","Y","Z"] },
];
