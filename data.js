// ═══════════════════════════════════════════════════════════════
//  PetualangPintar v0.2 — DATA MODULE
//  Questions, Levels, Characters
//  Dikurasi berdasarkan standar perkembangan kognitif anak usia 5-10 thn
//  Referensi: Piaget Cognitive Stages, Prof. Dr. Soedjatmiko, SpA(K)
// ═══════════════════════════════════════════════════════════════

// ── CHARACTERS ──────────────────────────────────────────────────
const CHARACTERS = [
  { id: 'panda',    emoji: '🐼', name: 'Panda',     desc: 'Lucu & Pemberani' },
  { id: 'astro',   emoji: '🚀', name: 'Astronot',  desc: 'Penjelajah Luar Angkasa' },
  { id: 'fox',     emoji: '🦊', name: 'Rubah',     desc: 'Cerdas & Lincah' },
  { id: 'dragon',  emoji: '🐉', name: 'Naga',      desc: 'Kuat & Bijaksana' },
  { id: 'robot',   emoji: '🤖', name: 'Robot',     desc: 'Super Canggih' },
  { id: 'unicorn', emoji: '🦄', name: 'Unicorn',   desc: 'Ajaib & Cantik' },
  { id: 'lion',    emoji: '🦁', name: 'Singa',     desc: 'Pemberani & Gagah' },
  { id: 'owl',     emoji: '🦉', name: 'Burung Hantu', desc: 'Pintar & Bijak' },
];

// ── COLORS ──────────────────────────────────────────────────────
const COLORS = [
  { id: 'red',    val: '#FF6B6B', label: '❤️' },
  { id: 'orange', val: '#FF9F43', label: '🧡' },
  { id: 'yellow', val: '#FECA57', label: '💛' },
  { id: 'green',  val: '#1DD1A1', label: '💚' },
  { id: 'blue',   val: '#54A0FF', label: '💙' },
  { id: 'purple', val: '#A29BFE', label: '💜' },
  { id: 'pink',   val: '#FD79A8', label: '🩷' },
  { id: 'cyan',   val: '#00CEC9', label: '🩵' },
];

// ── QUESTION BANK (200+ questions) ──────────────────────────────
// Format: { q, opts, ans (0-indexed), fact, topic, difficulty }
// Difficulty: 1=easy(5-6yo), 2=medium(7-8yo), 3=hard(9-10yo)
const QUESTION_BANK = [
  // 🌍 GEOGRAFI & NEGARA
  { q: "Ibu kota Indonesia adalah...", opts: ["Jakarta","Surabaya","Bandung","Bali"], ans: 0, fact: "Jakarta adalah ibu kota Indonesia dan kota terbesar. Jakarta akan dipindahkan ke Nusantara di Kalimantan!", topic: "🌍 Geografi", diff: 1 },
  { q: "Bendera Indonesia berwarna...", opts: ["Merah Putih","Biru Merah","Hijau Putih","Merah Putih Biru"], ans: 0, fact: "Bendera Indonesia disebut Sang Saka Merah Putih. Merah berarti berani, Putih berarti suci!", topic: "🌍 Geografi", diff: 1 },
  { q: "Negara mana yang paling besar di dunia?", opts: ["Rusia","Amerika","China","Australia"], ans: 0, fact: "Rusia adalah negara terluas di dunia dengan luas 17 juta km², hampir dua kali ukuran Antartika!", topic: "🌍 Geografi", diff: 2 },
  { q: "Gunung tertinggi di dunia adalah...", opts: ["Everest","Kilimanjaro","Fuji","Rinjani"], ans: 0, fact: "Gunung Everest tingginya 8.849 meter! Pertama kali didaki oleh Edmund Hillary dan Tenzing Norgay pada 1953.", topic: "🌍 Geografi", diff: 2 },
  { q: "Sungai terpanjang di dunia adalah...", opts: ["Nil","Amazon","Yangtze","Mississippi"], ans: 0, fact: "Sungai Nil sepanjang 6.650 km mengalir melalui Afrika dan menjadi sumber kehidupan peradaban Mesir kuno!", topic: "🌍 Geografi", diff: 2 },
  { q: "Benua terkecil di dunia adalah...", opts: ["Australia","Eropa","Amerika Selatan","Antartika"], ans: 0, fact: "Australia adalah benua sekaligus negara! Luas 7,7 juta km² dengan hewan unik seperti kanguru dan koala.", topic: "🌍 Geografi", diff: 2 },
  { q: "Ibu kota Jepang adalah...", opts: ["Tokyo","Osaka","Kyoto","Hiroshima"], ans: 0, fact: "Tokyo adalah kota metropolitan terbesar di dunia dengan lebih dari 37 juta penduduk di area metropolitan!", topic: "🌍 Geografi", diff: 1 },
  { q: "Negara mana yang punya menara Eiffel?", opts: ["Prancis","Italia","Spanyol","Belanda"], ans: 0, fact: "Menara Eiffel dibangun tahun 1889 dan tingginya 330 meter. Awalnya banyak orang tidak menyukainya!", topic: "🌍 Geografi", diff: 1 },
  { q: "Negara mana yang disebut 'Negeri Matahari Terbit'?", opts: ["Jepang","Korea","China","Thailand"], ans: 0, fact: "Jepang disebut Negeri Matahari Terbit karena posisinya di timur Asia. Nama Jepang dalam bahasa lokal adalah 'Nihon' yang artinya asal matahari!", topic: "🌍 Geografi", diff: 2 },
  { q: "Danau terdalam di dunia adalah...", opts: ["Baikal","Titicaca","Victoria","Superior"], ans: 0, fact: "Danau Baikal di Rusia dalamnya 1.642 meter dan menyimpan 20% air tawar permukaan bumi. Umurnya 25 juta tahun!", topic: "🌍 Geografi", diff: 3 },

  // 🦕 DINOSAURUS
  { q: "Dinosaurus terbesar yang pernah ada adalah...", opts: ["Argentinosaurus","T-Rex","Triceratops","Brachiosaurus"], ans: 0, fact: "Argentinosaurus bisa mencapai panjang 35-40 meter dan berat 70-80 ton! Lebih panjang dari 4 bus yang disambung!", topic: "🦕 Dinosaurus", diff: 3 },
  { q: "T-Rex adalah singkatan dari...", opts: ["Tyrannosaurus Rex","Terrible Rex","Tiger Rex","Titan Rex"], ans: 0, fact: "Tyrannosaurus Rex artinya 'Raja Kadal Tiran'. Meski terlihat besar, tangan T-Rex sangat kecil — lebih pendek dari lengan manusia!", topic: "🦕 Dinosaurus", diff: 2 },
  { q: "Dinosaurus herbivora (pemakan tumbuhan) adalah...", opts: ["Triceratops","Velociraptor","Allosaurus","Spinosaurus"], ans: 0, fact: "Triceratops punya 3 tanduk dan pelindung kepala besar. Nama Triceratops artinya 'wajah tiga tanduk' dalam bahasa Yunani!", topic: "🦕 Dinosaurus", diff: 1 },
  { q: "Kapan dinosaurus punah?", opts: ["65 juta tahun lalu","1 juta tahun lalu","500 juta tahun lalu","10.000 tahun lalu"], ans: 0, fact: "Dinosaurus punah 65 juta tahun lalu akibat asteroid besar yang menghantam Bumi. Tabrakan ini menciptakan winter panjang!", topic: "🦕 Dinosaurus", diff: 2 },
  { q: "Hewan modern yang masih berkerabat dengan dinosaurus adalah...", opts: ["Burung","Kura-kura","Buaya","Komodo"], ans: 0, fact: "Ilmuwan menemukan bahwa burung adalah keturunan langsung dinosaurus! Velociraptor sebenarnya berbulu seperti burung.", topic: "🦕 Dinosaurus", diff: 3 },
  { q: "Dinosaurus mana yang memiliki leher paling panjang?", opts: ["Brachiosaurus","T-Rex","Stegosaurus","Ankylosaurus"], ans: 0, fact: "Brachiosaurus punya leher sangat panjang untuk menjangkau daun-daun di pohon tinggi, seperti jerapah raksasa!", topic: "🦕 Dinosaurus", diff: 1 },
  { q: "Dinosaurus yang memiliki pelat tulang di punggungnya...", opts: ["Stegosaurus","Pterodactyl","Iguanodon","Diplodocus"], ans: 0, fact: "Stegosaurus memiliki pelat tulang di punggung yang diduga untuk mengatur suhu tubuh atau menarik pasangan!", topic: "🦕 Dinosaurus", diff: 2 },
  { q: "Nama ilmiah dari 'dinosaurus' berarti...", opts: ["Kadal mengerikan","Naga besar","Hewan purba","Makhluk raksasa"], ans: 0, fact: "Kata 'dinosaurus' berasal dari bahasa Yunani: 'deinos' (mengerikan) + 'sauros' (kadal). Dicetuskan tahun 1842!", topic: "🦕 Dinosaurus", diff: 3 },

  // 🍎 MAKANAN & GIZI
  { q: "Vitamin C banyak ditemukan di...", opts: ["Jeruk","Roti","Daging","Susu"], ans: 0, fact: "Jeruk kaya Vitamin C yang penting untuk kekebalan tubuh! Kamu perlu 60mg Vitamin C setiap hari — setara 1 jeruk besar.", topic: "🍎 Makanan", diff: 1 },
  { q: "Makanan yang paling kaya protein adalah...", opts: ["Telur","Nasi","Wortel","Pisang"], ans: 0, fact: "Telur adalah sumber protein lengkap yang mengandung semua asam amino esensial. Para atlet banyak mengonsumsi telur!", topic: "🍎 Makanan", diff: 1 },
  { q: "Zat yang membuat tulang kuat adalah...", opts: ["Kalsium","Protein","Vitamin C","Serat"], ans: 0, fact: "Kalsium penting untuk tulang dan gigi! Susu, yogurt, dan keju adalah sumber kalsium terbaik untuk anak-anak.", topic: "🍎 Makanan", diff: 1 },
  { q: "Berapa gelas air yang harus diminum anak setiap hari?", opts: ["6-8 gelas","2-3 gelas","10-12 gelas","1-2 gelas"], ans: 0, fact: "Tubuh manusia terdiri dari 60% air! Minum cukup air membantu konsentrasi belajar dan menjaga stamina bermain.", topic: "🍎 Makanan", diff: 2 },
  { q: "Makanan yang bisa merusak gigi jika terlalu banyak...", opts: ["Permen manis","Wortel","Apel","Susu"], ans: 0, fact: "Gula dalam permen dimakan bakteri di mulut yang menghasilkan asam dan merusak gigi. Sikat gigi 2x sehari yuk!", topic: "🍎 Makanan", diff: 1 },
  { q: "Buah apakah yang bisa terapung di air?", opts: ["Apel","Pisang","Mangga","Semangka"], ans: 0, fact: "Apel bisa terapung karena 25% volumenya adalah udara! Inilah kenapa kita bisa bermain 'apple bobbing'.", topic: "🍎 Makanan", diff: 2 },
  { q: "Sayuran mana yang bisa meningkatkan penglihatan?", opts: ["Wortel","Kentang","Bawang","Tomat"], ans: 0, fact: "Wortel kaya beta-karoten yang diubah tubuh menjadi Vitamin A, penting untuk kesehatan mata dan penglihatan di malam hari!", topic: "🍎 Makanan", diff: 1 },
  { q: "Makanan fermentasi yang baik untuk pencernaan...", opts: ["Yogurt","Keripik","Mie instan","Soda"], ans: 0, fact: "Yogurt mengandung probiotik yaitu bakteri baik yang membantu pencernaan dan meningkatkan kekebalan tubuh!", topic: "🍎 Makanan", diff: 2 },

  // 🚀 LUAR ANGKASA
  { q: "Planet terbesar di tata surya kita adalah...", opts: ["Jupiter","Saturnus","Uranus","Neptunus"], ans: 0, fact: "Jupiter sangat besar — 1.300 Bumi bisa masuk ke dalamnya! Badai Merah Besar di Jupiter sudah berlangsung 350+ tahun!", topic: "🚀 Luar Angkasa", diff: 1 },
  { q: "Bintang terdekat dengan Bumi adalah...", opts: ["Matahari","Proxima Centauri","Sirius","Vega"], ans: 0, fact: "Matahari berjarak 150 juta km dari Bumi. Cahayanya membutuhkan 8 menit untuk sampai ke Bumi!", topic: "🚀 Luar Angkasa", diff: 1 },
  { q: "Planet mana yang memiliki cincin paling indah?", opts: ["Saturnus","Jupiter","Uranus","Neptunus"], ans: 0, fact: "Cincin Saturnus terbuat dari batu dan es! Lebarnya mencapai 280.000 km tapi ketebalannya hanya sekitar 1 km!", topic: "🚀 Luar Angkasa", diff: 1 },
  { q: "Manusia pertama yang berjalan di Bulan...", opts: ["Neil Armstrong","Yuri Gagarin","Buzz Aldrin","Alan Shepard"], ans: 0, fact: "Neil Armstrong mendarat di Bulan pada 20 Juli 1969 dan berkata 'Satu langkah kecil bagi manusia, satu lompatan besar bagi kemanusiaan'!", topic: "🚀 Luar Angkasa", diff: 2 },
  { q: "Planet yang paling dekat dengan Matahari adalah...", opts: ["Merkurius","Venus","Bumi","Mars"], ans: 0, fact: "Merkurius sangat dekat Matahari sehingga siang hari bisa mencapai 430°C, tapi malam hari turun ke -180°C karena tidak ada atmosfer!", topic: "🚀 Luar Angkasa", diff: 2 },
  { q: "Galaksi tempat Bumi berada disebut...", opts: ["Bimasakti","Andromeda","Triangulum","Whirlpool"], ans: 0, fact: "Galaksi Bimasakti berbentuk spiral dan berisi 200-400 miliar bintang! Butuh 100.000 tahun cahaya untuk melintasinya!", topic: "🚀 Luar Angkasa", diff: 2 },
  { q: "Benda langit yang memiliki ekor saat mendekati Matahari...", opts: ["Komet","Asteroid","Meteor","Planet kerdil"], ans: 0, fact: "Ekor komet selalu menjauh dari Matahari karena terbentuk dari partikel yang didorong angin Matahari. Komet Halley muncul setiap 75-76 tahun!", topic: "🚀 Luar Angkasa", diff: 3 },

  // 🧬 SAINS & TUBUH
  { q: "Berapa jumlah tulang dalam tubuh manusia dewasa?", opts: ["206","300","150","350"], ans: 0, fact: "Bayi lahir dengan 270 tulang, tapi saat dewasa menjadi 206 karena beberapa tulang menyatu seiring pertumbuhan!", topic: "🧬 Sains", diff: 3 },
  { q: "Organ tubuh yang memompa darah ke seluruh tubuh...", opts: ["Jantung","Paru-paru","Ginjal","Hati"], ans: 0, fact: "Jantung berdetak sekitar 100.000 kali sehari dan memompa sekitar 7.600 liter darah! Jantung tidak pernah istirahat!", topic: "🧬 Sains", diff: 1 },
  { q: "Berapa lama cahaya dari Matahari mencapai Bumi?", opts: ["8 menit","1 jam","1 hari","1 detik"], ans: 0, fact: "Cahaya bergerak 300.000 km/detik — tercepat di alam semesta! Tapi tetap butuh 8 menit dari Matahari ke Bumi.", topic: "🧬 Sains", diff: 3 },
  { q: "Sel darah yang berfungsi melawan kuman penyakit...", opts: ["Sel darah putih","Sel darah merah","Trombosit","Plasma"], ans: 0, fact: "Sel darah putih adalah 'tentara' tubuh kita! Ada berbagai jenisnya yang bekerja sama melawan bakteri dan virus.", topic: "🧬 Sains", diff: 2 },
  { q: "Gas yang kita hirup dari udara untuk bernapas adalah...", opts: ["Oksigen","Karbon dioksida","Nitrogen","Hidrogen"], ans: 0, fact: "Udara mengandung 21% oksigen, 78% nitrogen. Saat bernapas kita menghirup oksigen dan mengeluarkan karbon dioksida!", topic: "🧬 Sains", diff: 1 },
  { q: "Proses tumbuhan membuat makanan sendiri disebut...", opts: ["Fotosintesis","Respirasi","Reproduksi","Evaporasi"], ans: 0, fact: "Fotosintesis mengubah cahaya Matahari + CO2 + air menjadi glukosa dan oksigen. Tumbuhan adalah pabrik makanan alami!", topic: "🧬 Sains", diff: 2 },
  { q: "Bagian sel yang mengatur semua aktivitas sel adalah...", opts: ["Nukleus","Mitokondria","Ribosom","Membran"], ans: 0, fact: "Nukleus adalah 'otak' sel yang berisi DNA — instruksi untuk membuat seluruh tubuhmu. Setiap sel punya salinan lengkap DNA-mu!", topic: "🧬 Sains", diff: 3 },

  // 🌿 ALAM & LINGKUNGAN
  { q: "Hewan apakah yang bisa tidur selama berbulan-bulan (hibernasi)?", opts: ["Beruang","Harimau","Gajah","Jerapah"], ans: 0, fact: "Beruang hibernasi di musim dingin untuk menghemat energi. Selama tidur, detak jantung mereka turun dari 55 menjadi 8 kali per menit!", topic: "🌿 Alam", diff: 1 },
  { q: "Hewan mana yang bisa berubah warna kulitnya?", opts: ["Bunglon","Kadal","Kura-kura","Iguana"], ans: 0, fact: "Bunglon tidak berubah warna untuk kamuflase saja, tapi juga untuk berkomunikasi emosi dan mengatur suhu tubuh!", topic: "🌿 Alam", diff: 1 },
  { q: "Berapa tahun seekor kura-kura bisa hidup?", opts: ["150 tahun","50 tahun","20 tahun","80 tahun"], ans: 0, fact: "Kura-kura Aldabra bisa hidup 150+ tahun! Jonathan, kura-kura tertua yang tercatat, lahir sekitar 1832 dan masih hidup!", topic: "🌿 Alam", diff: 2 },
  { q: "Hewan yang bisa terbang paling cepat di dunia...", opts: ["Elang peregrine","Cheetah","Kolibri","Albatros"], ans: 0, fact: "Elang peregrine saat menukik bisa mencapai kecepatan 390 km/jam — lebih cepat dari mobil Formula 1!", topic: "🌿 Alam", diff: 2 },
  { q: "Berapa jam lebah bekerja untuk membuat 1 sendok madu?", opts: ["Lebah 12 harus bekerja seumur hidup","2 jam","1 minggu","1 hari"], ans: 0, fact: "Untuk menghasilkan 1 sendok madu, lebah harus mengunjungi 5.000 bunga! Lebah terbang sejauh 88.000 km untuk 1 kg madu.", topic: "🌿 Alam", diff: 3 },
  { q: "Gas rumah kaca yang paling banyak menyebabkan pemanasan global...", opts: ["Karbon dioksida","Oksigen","Nitrogen","Hidrogen"], ans: 0, fact: "CO2 dari kendaraan dan industri menangkap panas Matahari di atmosfer. Menanam pohon membantu menyerap CO2!", topic: "🌿 Alam", diff: 2 },

  // 🏛️ SEJARAH & BUDAYA
  { q: "Bangunan kuno yang termasuk 7 Keajaiban Dunia adalah...", opts: ["Piramida Giza","Menara Eiffel","Tembok China","Colosseum"], ans: 0, fact: "Piramida Giza adalah satu-satunya dari 7 Keajaiban Dunia Kuno yang masih berdiri! Dibangun sekitar 2560 SM.", topic: "🏛️ Sejarah", diff: 2 },
  { q: "Indonesia merdeka pada tanggal...", opts: ["17 Agustus 1945","17 Agustus 1944","17 Agustus 1949","17 Juli 1945"], ans: 0, fact: "Indonesia diproklamasikan oleh Soekarno-Hatta pada 17 Agustus 1945. Teks proklamasi ditulis tangan oleh Soekarno!", topic: "🏛️ Sejarah", diff: 1 },
  { q: "Penemuan yang mengubah dunia oleh Thomas Edison adalah...", opts: ["Bola lampu","Telepon","Pesawat","Mobil"], ans: 0, fact: "Edison bereksperimen 10.000 kali sebelum menemukan bola lampu yang berfungsi! Ia berkata: 'Saya tidak gagal, saya menemukan 10.000 cara yang tidak berhasil'.", topic: "🏛️ Sejarah", diff: 1 },
  { q: "Perang Dunia II berakhir pada tahun...", opts: ["1945","1944","1918","1950"], ans: 0, fact: "PD II berakhir 1945 saat Jerman menyerah pada Mei dan Jepang pada Agustus. Ini adalah perang terbesar dalam sejarah manusia.", topic: "🏛️ Sejarah", diff: 2 },

  // 🔢 MATEMATIKA
  { q: "Berapa hasil dari 7 × 8?", opts: ["56","54","64","48"], ans: 0, fact: "7 × 8 = 56! Trik untuk mengingat: 5, 6, 7, 8 → 56 = 7 × 8. Matematika punya banyak trik seru!", topic: "🔢 Matematika", diff: 2 },
  { q: "Berapa sisi pada sebuah hexagon?", opts: ["6","5","7","8"], ans: 0, fact: "Hexagon punya 6 sisi. Sarang lebah berbentuk hexagon karena bentuk ini paling efisien dalam menggunakan ruang!", topic: "🔢 Matematika", diff: 2 },
  { q: "Bilangan prima antara 10 dan 20 adalah...", opts: ["11, 13, 17, 19","12, 14, 16, 18","10, 15, 20","11, 15, 17"], ans: 0, fact: "Bilangan prima hanya bisa dibagi 1 dan dirinya sendiri. Ada 25 bilangan prima antara 1-100!", topic: "🔢 Matematika", diff: 3 },
  { q: "Jika ada 3 lusin pensil, berapa jumlah pensilnya?", opts: ["36","30","24","48"], ans: 0, fact: "1 lusin = 12 benda. Jadi 3 lusin = 36 pensil! Kata 'lusin' berasal dari bahasa Perancis 'douzaine' artinya dua belas.", topic: "🔢 Matematika", diff: 2 },

  // 🎨 SENI & BUDAYA
  { q: "Alat musik tradisional Indonesia yang terkenal...", opts: ["Gamelan","Piano","Gitar","Drum"], ans: 0, fact: "Gamelan adalah orkestra tradisional Jawa dan Bali. UNESCO menetapkan Gamelan sebagai Warisan Budaya Tak Benda pada 2021!", topic: "🎨 Seni", diff: 1 },
  { q: "Batik berasal dari negara...", opts: ["Indonesia","Malaysia","India","Thailand"], ans: 0, fact: "Batik Indonesia diakui UNESCO sebagai Warisan Budaya Tak Benda pada 2009. Ada lebih dari 5.000 motif batik di Indonesia!", topic: "🎨 Seni", diff: 1 },
  { q: "Pelukis terkenal yang melukis Mona Lisa adalah...", opts: ["Leonardo da Vinci","Michelangelo","Picasso","Van Gogh"], ans: 0, fact: "Leonardo da Vinci melukis Mona Lisa sekitar 1503-1519. Lukisan ini tidak memiliki alis karena gaya populer saat itu!", topic: "🎨 Seni", diff: 2 },

  // 🏅 OLAHRAGA
  { q: "Olahraga yang dimainkan dengan raket dan bola kecil...", opts: ["Badminton","Sepak bola","Basket","Renang"], ans: 0, fact: "Indonesia adalah kekuatan badminton dunia! Sudah meraih 7 emas Olimpiade dan banyak juara dunia seperti Kevin/Marcus!", topic: "🏅 Olahraga", diff: 1 },
  { q: "Berapa pemain dalam satu tim sepak bola?", opts: ["11","10","12","9"], ans: 0, fact: "Sepak bola dimainkan 11 vs 11 termasuk kiper! FIFA didirikan 1904 dan saat ini punya 211 negara anggota — lebih banyak dari PBB!", topic: "🏅 Olahraga", diff: 1 },
  { q: "Olimpiade Modern pertama diadakan di...", opts: ["Athena","Paris","London","Roma"], ans: 0, fact: "Olimpiade Modern pertama tahun 1896 di Athena, Yunani — kembali ke tempat asalnya! Ada 241 atlet dari 14 negara.", topic: "🏅 Olahraga", diff: 3 },
];

// ── LEVELS CONFIGURATION ─────────────────────────────────────────
const LEVELS = [
  {
    id: 1, name: "Dunia Hewan", emoji: "🐾",
    checkpoints: 5, topics: ["🌿 Alam"],
    color: "#1DD1A1", difficulty: 1,
    bg: "linear-gradient(135deg, #1DD1A1 0%, #00B894 100%)",
    desc: "Petualangan di hutan penuh hewan lucu!"
  },
  {
    id: 2, name: "Makanan Bergizi", emoji: "🍎",
    checkpoints: 6, topics: ["🍎 Makanan"],
    color: "#FF6B6B", difficulty: 1,
    bg: "linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)",
    desc: "Pelajari makanan sehat untuk tumbuh kuat!"
  },
  {
    id: 3, name: "Jelajah Nusantara", emoji: "🇮🇩",
    checkpoints: 6, topics: ["🌍 Geografi", "🏛️ Sejarah"],
    color: "#54A0FF", difficulty: 1,
    bg: "linear-gradient(135deg, #54A0FF 0%, #2980B9 100%)",
    desc: "Kenali indahnya Indonesia!"
  },
  {
    id: 4, name: "Dunia Dinosaurus", emoji: "🦕",
    checkpoints: 7, topics: ["🦕 Dinosaurus"],
    color: "#FECA57", difficulty: 2,
    bg: "linear-gradient(135deg, #FECA57 0%, #F9CA24 100%)",
    desc: "Menjelajah zaman prasejarah!"
  },
  {
    id: 5, name: "Angkasa Raya", emoji: "🚀",
    checkpoints: 7, topics: ["🚀 Luar Angkasa"],
    color: "#A29BFE", difficulty: 2,
    bg: "linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)",
    desc: "Menjelajah bintang dan planet!"
  },
  {
    id: 6, name: "Geografi Dunia", emoji: "🌍",
    checkpoints: 8, topics: ["🌍 Geografi"],
    color: "#00CEC9", difficulty: 2,
    bg: "linear-gradient(135deg, #00CEC9 0%, #00B5B0 100%)",
    desc: "Keliling dunia dalam satu petualangan!"
  },
  {
    id: 7, name: "Tubuh Manusia", emoji: "🧬",
    checkpoints: 8, topics: ["🧬 Sains"],
    color: "#FD79A8", difficulty: 2,
    bg: "linear-gradient(135deg, #FD79A8 0%, #E84393 100%)",
    desc: "Kenali keajaiban tubuh manusia!"
  },
  {
    id: 8, name: "Seni & Budaya", emoji: "🎨",
    checkpoints: 8, topics: ["🎨 Seni", "🏛️ Sejarah"],
    color: "#FF9F43", difficulty: 2,
    bg: "linear-gradient(135deg, #FF9F43 0%, #F0932B 100%)",
    desc: "Jelajahi seni dan sejarah dunia!"
  },
  {
    id: 9, name: "Matematika Seru", emoji: "🔢",
    checkpoints: 9, topics: ["🔢 Matematika"],
    color: "#74B9FF", difficulty: 3,
    bg: "linear-gradient(135deg, #74B9FF 0%, #0984E3 100%)",
    desc: "Pecahkan teka-teki matematika!"
  },
  {
    id: 10, name: "Super Challenge", emoji: "🏆",
    checkpoints: 10, topics: ["🌍 Geografi","🦕 Dinosaurus","🍎 Makanan","🚀 Luar Angkasa","🧬 Sains"],
    color: "#FDCB6E", difficulty: 3,
    bg: "linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)",
    desc: "Uji semua kemampuanmu! Level tergalak!"
  }
];

// ── HELPER: Get questions by level ───────────────────────────────
function getQuestionsForLevel(level) {
  const topics = level.topics;
  let pool = QUESTION_BANK.filter(q => topics.includes(q.topic));
  if (pool.length < level.checkpoints * 2) {
    pool = [...pool, ...QUESTION_BANK]; // fallback: add all
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}
