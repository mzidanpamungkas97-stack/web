/* ============ KONFIGURASI — edit bagian ini saja ============ */
const CFG = {
  nama: "Sayang",                                  // nama pasanganmu
  judulLagu: "Judul Lagu Kita – Nama Artis",       // tampil di tombol musik
  video: "assets/video-kenangan.mp4",
  musik: "assets/lagu-kita.mp3",
  foto: ["assets/foto-1.jpg", "assets/foto-2.jpg", "assets/foto-3.jpg"],
  pesan: `Happy birthday, najwa fahraliya! ❤️

6 oktober 2007 adalah tanggal dimana orang yang paling aku suka dan orang yang paling aku cinta sedang berulang tahun.terima kasih sudah lahir kedunia ini dan sudah ada didalam hidupku, mengisi kekosongan hatiku ini dengan dirimu dan membuat hari hariku menjadi lebih indah dari sebelumnya.

bisa dibilang diawal kita ketemu aku hanya ingin berteman denganmu ketika kamu bilang penonton hitzed dan erpan, disaat itu juga aku mau berteman denganmu.

belum ada interest sama sekali, tetapi saat di real life kamu cuek banget dan hanya ingin ngobrol bersama nopal, disitu aku agak sedikit sakit hati dan kesel, tapi yaudah lah.

berlanjut ke kelas 3 mts kayak kita tiba' aja lumayan deket(kali) dan akhirnya naiklah kita ke sma dan sampai saat itu kita udah ga pernah ngobrol' lagi

dan mulai lah di fase perkuliahan dimana kita dipertemukan lagi di kampus yang sama yaitu uin tercinta, dan disitu kita mulai chatan' lagi, ngobrol' lagi, sampai' kita main roblox bareng, disaat itulah dimana aku mulai ada interest ke kamu dan disaat itu juga aku dapet nomor wa kamu karna main roblox juga.

dan berlanjut dari sana kita ngobrolin banyak hal, a random things, dan rupanya kita cocok juga obrolannya, humornya masuk, dan juga sering kirim' link vidio tik tok, itu juga awalnya kita buat streak tik tok.

dan hal itu yang buat aku jatuh cinta sama kamu, sifat kamu, perilaku kamu, semua tentang kamu aku suka.

semoga kamu bisa ngebales cinta aku yang begitu besar ini dan bisa jadi milik aku sepenuhnya.aamiin.

I love you, today, tomorrow, and always selalu love you suka kamu. 💗`,
  kejutan: [
    "Kamu adalah alasan aku tersenyum hari ini 💗",
    "Tertawa bersamamu adalah bagian favoritku 😊",
    "Rumahku adalah di mana pun ada kamu 🏡",
    "Terima kasih sudah jadi kamu 🌷",
    "Aku pilih kamu, hari ini dan setiap hari ✨",
    "Kamu bikin hal biasa jadi terasa spesial 💫"
  ]
};

/* ============ Utilitas ============ */
const $ = s => document.querySelector(s);
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const rnd = (a, b) => a + Math.random() * (b - a);
const COL = ['#ff5c93', '#ff9ec4', '#c77dff', '#ffd6e8', '#ffffff'];
$('#nm').textContent = CFG.nama;
$('#mt').textContent = '🎵 ' + CFG.judulLagu;

function heart(c, x, y, s) {                       // gambar hati
  c.beginPath(); c.moveTo(x, y + s * .9);
  c.bezierCurveTo(x - s * 1.6, y - s * .1, x - s * .7, y - s * 1.2, x, y - s * .5);
  c.bezierCurveTo(x + s * .7, y - s * 1.2, x + s * 1.6, y - s * .1, x, y + s * .9);
  c.fill();
}

/* ============ Efek Partikel Bunga, Kelopak, Hati & Kilau ============ */
const fx = $('#fx'), fc = fx.getContext('2d');
let P = [], fxRun = false;
const fit = () => { fx.width = innerWidth * DPR; fx.height = innerHeight * DPR; };
addEventListener('resize', fit); fit();

// Palet warna bunga romantis
const FLOWER_PALETTES = [
  { c1: '#ff4d6d', c2: '#ff85a1', center: '#ffe66d' }, // Cherry rose
  { c1: '#ff758f', c2: '#ffccd5', center: '#ffd166' }, // Sakura blush
  { c1: '#f72585', c2: '#ffb3c6', center: '#fff3b0' }, // Vivid magenta
  { c1: '#c77dff', c2: '#f3c4fb', center: '#ffffff' }, // Lavender bloom
  { c1: '#ffffff', c2: '#ffd6e8', center: '#ffbe0b' }, // Pearl daisy
  { c1: '#ff007f', c2: '#ffb4d6', center: '#ffd000' }  // Romantic pink
];

// Gambar kelopak sakura dengan lekukan khas
function drawPetalSakura(c, s, c1, c2) {
  c.beginPath();
  c.moveTo(0, s * 0.85);
  c.bezierCurveTo(-s * 0.65, s * 0.4, -s * 0.75, -s * 0.5, -s * 0.15, -s * 0.95);
  c.lineTo(0, -s * 0.8);
  c.lineTo(s * 0.15, -s * 0.95);
  c.bezierCurveTo(s * 0.75, -s * 0.5, s * 0.65, s * 0.4, 0, s * 0.85);
  c.closePath();
  const grad = c.createLinearGradient(0, -s, 0, s);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  c.fillStyle = grad;
  c.fill();
}

// Gambar kelopak mawar melengkung
function drawPetalRose(c, s, c1, c2) {
  c.beginPath();
  c.moveTo(0, s);
  c.bezierCurveTo(-s * 0.85, s * 0.4, -s * 0.9, -s * 0.5, 0, -s);
  c.bezierCurveTo(s * 0.9, -s * 0.5, s * 0.85, s * 0.4, 0, s);
  c.closePath();
  const grad = c.createRadialGradient(0, s * 0.2, s * 0.1, 0, 0, s);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  c.fillStyle = grad;
  c.fill();
}

// Gambar bunga mekar 5 kelopak (sakura blossom)
function drawFullFlower(c, s, c1, c2, center) {
  for (let i = 0; i < 5; i++) {
    c.save();
    c.rotate((i * 2 * Math.PI) / 5);
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-s * 0.45, -s * 0.35, -s * 0.45, -s * 0.85, -s * 0.12, -s);
    c.lineTo(0, -s * 0.82);
    c.lineTo(s * 0.12, -s);
    c.bezierCurveTo(s * 0.45, -s * 0.85, s * 0.45, -s * 0.35, 0, 0);
    c.closePath();
    const grad = c.createLinearGradient(0, 0, 0, -s);
    grad.addColorStop(0, c2);
    grad.addColorStop(1, c1);
    c.fillStyle = grad;
    c.fill();
    c.restore();
  }
  // Putik tengah
  c.beginPath();
  c.arc(0, 0, s * 0.22, 0, 6.283);
  c.fillStyle = center || '#ffe66d';
  c.fill();
  // Bintik sari
  c.fillStyle = '#f77f00';
  for (let j = 0; j < 5; j++) {
    const a = (j * 2 * Math.PI) / 5;
    c.beginPath();
    c.arc(Math.cos(a) * s * 0.28, Math.sin(a) * s * 0.28, s * 0.05, 0, 6.283);
    c.fill();
  }
}

// Gambar bintang kilau berkilap
function drawSparkleStar(c, s, col) {
  c.fillStyle = col || '#fff';
  c.beginPath();
  for (let i = 0; i < 4; i++) {
    c.save();
    c.rotate((i * Math.PI) / 2);
    c.moveTo(0, 0);
    c.quadraticCurveTo(s * 0.2, s * 0.2, 0, s);
    c.quadraticCurveTo(-s * 0.2, s * 0.2, 0, 0);
    c.fill();
    c.restore();
  }
}

// Loop render partikel
function tick() {
  fc.setTransform(DPR, 0, 0, DPR, 0, 0);
  fc.clearRect(0, 0, innerWidth, innerHeight);
  P = P.filter(p => p.l > 0 && p.y < innerHeight + 80 && p.x > -100 && p.x < innerWidth + 100);

  for (const p of P) {
    p.x += p.vx + Math.sin(p.wobble) * (p.wAmp || 1);
    p.y += p.vy;
    p.vy += p.g;
    p.vx *= p.drag;
    p.r += p.vr;
    p.pitch += p.vPitch;
    p.roll += p.vRoll;
    p.wobble += p.vWobble;
    p.l -= p.decay;

    fc.save();
    fc.globalAlpha = Math.max(0, Math.min(1, p.l * 1.5));
    fc.translate(p.x, p.y);
    fc.rotate(p.r);

    // Efek 3D flip (kelopak berputar di udara secara natural)
    const sx = Math.max(0.12, Math.abs(Math.cos(p.pitch)));
    const sy = Math.max(0.12, Math.abs(Math.sin(p.roll)));
    fc.scale(sx, sy);

    if (p.k === 'flower') {
      drawFullFlower(fc, p.s, p.pal.c1, p.pal.c2, p.pal.center);
    } else if (p.k === 'petal_sakura') {
      drawPetalSakura(fc, p.s, p.pal.c1, p.pal.c2);
    } else if (p.k === 'petal_rose') {
      drawPetalRose(fc, p.s, p.pal.c1, p.pal.c2);
    } else if (p.k === 'sparkle') {
      drawSparkleStar(fc, p.s, p.pal.c1);
    } else if (p.k === 'confetti') {
      fc.fillStyle = p.c;
      fc.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    } else {
      fc.fillStyle = p.c || p.pal?.c1 || '#ff5c93';
      heart(fc, 0, 0, p.s);
    }

    fc.restore();
  }

  if (P.length) requestAnimationFrame(tick);
  else fxRun = false;
}

function ensureFxRun() {
  if (!fxRun) {
    fxRun = true;
    requestAnimationFrame(tick);
  }
}

// Ledakan partikel kecil (kompatibilitas fungsi lama)
function burst(x, y, n = 40, kinds = [0, 0, 2], spread = 7) {
  for (let i = 0; i < n; i++) {
    const a = rnd(0, 6.283), v = rnd(1, spread);
    const kType = kinds[Math.random() * kinds.length | 0];
    const pal = FLOWER_PALETTES[Math.random() * FLOWER_PALETTES.length | 0];
    P.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2,
      s: rnd(6, 14), r: rnd(0, 6), vr: rnd(-.2, .2),
      pitch: rnd(0, 6), vPitch: rnd(-.15, .15), roll: rnd(0, 6), vRoll: rnd(-.15, .15),
      wobble: rnd(0, 6), vWobble: rnd(.02, .06), wAmp: rnd(0.5, 1.5),
      l: 1, decay: rnd(.008, .015), g: .12, drag: .99,
      k: kType === 1 ? 'confetti' : (kType === 2 ? 'sparkle' : 'heart'),
      c: COL[Math.random() * COL.length | 0], pal
    });
  }
  ensureFxRun();
}

// Konfeti perayaan
function confetti() {
  for (let i = 0; i < 6; i++) setTimeout(() => burst(rnd(.1, .9) * innerWidth, innerHeight * .2, 28, [1], 6), i * 180);
}

// ANIMASI BUNGA YANG MEMENUHI SELURUH LAYAR
let flowerRainTimer = null;

function flowerScreenBlast(hitX, hitY) {
  // 1. Ledakan radial dari titik sasaran hati (100 partikel bunga & kelopak melesat keluar)
  for (let i = 0; i < 100; i++) {
    const angle = rnd(0, 6.283);
    const speed = rnd(5, 19);
    const pal = FLOWER_PALETTES[Math.random() * FLOWER_PALETTES.length | 0];
    const rollType = Math.random();
    let k = 'petal_sakura';
    let s = rnd(14, 26);
    if (rollType < 0.35) { k = 'flower'; s = rnd(18, 36); }
    else if (rollType < 0.70) { k = 'petal_rose'; s = rnd(14, 26); }
    else if (rollType < 0.88) { k = 'sparkle'; s = rnd(10, 18); }
    else { k = 'heart'; s = rnd(10, 20); }

    P.push({
      x: hitX, y: hitY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rnd(1, 4),
      s, r: rnd(0, 6), vr: rnd(-.15, .15),
      pitch: rnd(0, 6), vPitch: rnd(-.1, .1),
      roll: rnd(0, 6), vRoll: rnd(-.1, .1),
      wobble: rnd(0, 6), vWobble: rnd(.03, .07), wAmp: rnd(1, 2.5),
      l: 1, decay: rnd(.004, .008), g: rnd(.05, .12), drag: rnd(.97, .985),
      k, pal, c: pal.c1
    });
  }

  // 2. Hujan bunga langsung menyebar & memenuhi seluruh layar
  for (let i = 0; i < 120; i++) {
    const pal = FLOWER_PALETTES[Math.random() * FLOWER_PALETTES.length | 0];
    const rollType = Math.random();
    let k = 'petal_sakura';
    let s = rnd(12, 28);
    if (rollType < 0.4) { k = 'flower'; s = rnd(18, 38); }
    else if (rollType < 0.75) { k = 'petal_rose'; s = rnd(14, 28); }
    else if (rollType < 0.9) { k = 'sparkle'; s = rnd(8, 16); }
    else { k = 'heart'; s = rnd(10, 20); }

    P.push({
      x: rnd(0, innerWidth),
      y: rnd(-80, innerHeight * 0.75),
      vx: rnd(-2.5, 2.5),
      vy: rnd(1.5, 4.5),
      s, r: rnd(0, 6), vr: rnd(-.08, .08),
      pitch: rnd(0, 6), vPitch: rnd(-.08, .08),
      roll: rnd(0, 6), vRoll: rnd(-.08, .08),
      wobble: rnd(0, 6), vWobble: rnd(.02, .05), wAmp: rnd(1.2, 3),
      l: 1, decay: rnd(.003, .006), g: rnd(.03, .07), drag: .99,
      k, pal, c: pal.c1
    });
  }

  ensureFxRun();
}

// Hujan bunga berkala saat modal video aktif
function startSustainedFlowerRain() {
  stopSustainedFlowerRain();
  flowerRainTimer = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      const pal = FLOWER_PALETTES[Math.random() * FLOWER_PALETTES.length | 0];
      const isFlower = Math.random() < 0.35;
      P.push({
        x: rnd(0, innerWidth),
        y: -30,
        vx: rnd(-1.5, 1.5),
        vy: rnd(1.8, 3.8),
        s: isFlower ? rnd(18, 32) : rnd(12, 24),
        r: rnd(0, 6), vr: rnd(-.06, .06),
        pitch: rnd(0, 6), vPitch: rnd(-.08, .08),
        roll: rnd(0, 6), vRoll: rnd(-.08, .08),
        wobble: rnd(0, 6), vWobble: rnd(.02, .05), wAmp: rnd(1.5, 3),
        l: 1, decay: rnd(.003, .005), g: rnd(.03, .06), drag: .992,
        k: isFlower ? 'flower' : (Math.random() < 0.5 ? 'petal_sakura' : 'petal_rose'),
        pal, c: pal.c1
      });
    }
    ensureFxRun();
  }, 180);
}

function stopSustainedFlowerRain() {
  if (flowerRainTimer) {
    clearInterval(flowerRainTimer);
    flowerRainTimer = null;
  }
}

// Kursor hati (hanya desktop dengan mouse)
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  let lastT = 0;
  addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse' && e.timeStamp - lastT > 80) { lastT = e.timeStamp; burst(e.clientX, e.clientY, 1, [0], 1); }
  });
}

/* ============ Latar: hati melayang & bintang ============ */
for (let i = 0; i < 20; i++) {
  const e = document.createElement('i'), star = i % 3 === 0;
  e.className = star ? 'st' : 'ht';
  e.textContent = star ? '✦' : '♥';
  e.style.cssText = `left:${rnd(0, 100)}%;` + (star ? `top:${rnd(0, 100)}%;` : 'bottom:-40px;') +
    `font-size:${star ? rnd(8, 16) : rnd(10, 26)}px;animation-duration:${star ? rnd(3, 6) : rnd(9, 19)}s;animation-delay:-${rnd(0, 12)}s`;
  $('#bg').append(e);
}

/* ============ Musik ============ */
const music = new Audio();
music.loop = true; music.volume = .6; music.src = CFG.musik;
const mbtn = $('#mbtn');
music.onplay = () => mbtn.classList.add('on');
music.onpause = () => mbtn.classList.remove('on');
music.onerror = () => { $('#mt').textContent = '🎵 (taruh lagu di ' + CFG.musik + ')'; };
mbtn.onclick = () => music.paused ? music.play().catch(() => { }) : music.pause();

/* ============ Video kenangan & ucapan ============ */
const vid = $('#vid'), vph = $('#vph'), playBtn = $('#play');

// Placeholder jika file belum ada
vid.onerror = () => {
  vid.hidden = true;
  vph.hidden = false;
  playBtn.hidden = true;
};

// Pasang video sumber dari konfigurasi
vid.src = CFG.video;

// Buka input file video jika pengguna ingin memilih file video langsung
const vidFileInput = $('#vid-file-input');
if (vidFileInput) {
  vidFileInput.onchange = e => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const objUrl = URL.createObjectURL(file);
      vid.src = objUrl;
      vid.hidden = false;
      vph.hidden = true;
      playBtn.hidden = true;
      vid.currentTime = 0;
      vid.play().then(() => {
        if (music && !music.paused) music.volume = 0.1;
      }).catch(() => {
        playBtn.hidden = false;
      });
    }
  };
}

playBtn.onclick = () => {
  vid.play().then(() => {
    playBtn.hidden = true;
    if (music && !music.paused) music.volume = 0.1;
  }).catch(() => { });
};

vid.onplay = () => {
  playBtn.hidden = true;
  if (music && !music.paused) music.volume = 0.1; // kecilkan musik agar suara video terdengar jelas
};

vid.onpause = () => {
  if (!vid.ended && !vid.error) playBtn.hidden = false;
  if (music && !music.paused) music.volume = 0.6;
};

vid.onended = () => {
  playBtn.hidden = false;
  playBtn.textContent = 'Putar Ulang Video ↺';
  if (music && !music.paused) music.volume = 0.6;
};

// TAMPILKAN MODAL VIDEO SECARA LANGSUNG TANPA JEDA
function showVideoModal() {
  const mem = $('#mem');
  mem.classList.add('show');
  startSustainedFlowerRain();

  // Langsung putar video tanpa menunggu klik tombol
  if (vid) {
    vid.currentTime = 0;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        playBtn.hidden = true;
        if (music && !music.paused) music.volume = 0.1;
      }).catch(err => {
        console.warn('Autoplay video dicegah oleh browser:', err);
        playBtn.hidden = false;
      });
    }
  }
}

/* ============ Game panah cinta (tarik & lepaskan) ============ */
const cv = $('#game'), g = cv.getContext('2d');
const HINT = 'Tahan & tarik ke belakang, lalu lepaskan 💘';
let W, H, bow, R, L, maxPull, tgt = { x: 0, y: 0, s: 1 };
let pull = null, arrow = null, over = false, miss = 0, last = 0, running = false;

function sizeGame() {
  const r = cv.getBoundingClientRect(); W = r.width; H = r.height;
  cv.width = W * DPR; cv.height = H * DPR;
  bow = { x: W * .14, y: H * .75 }; R = Math.min(W, H) * .13; L = R * 1.5; maxPull = R * 1.6;
}
addEventListener('resize', () => running && sizeGame());
const VMAX = () => W * 1.5, GRAV = () => W * .8;
const tipDist = pw => L - pw * maxPull * .7;       // jarak ujung panah dari pusat busur

function aim() {                                    // sudut & kekuatan tarikan
  if (!pull) return { a: -.6, pw: 0 };
  const dx = bow.x - pull.x, dy = bow.y - pull.y;
  if (dx <= 0) return { a: -.6, pw: 0 };
  return { a: Math.max(-1.4, Math.min(.1, Math.atan2(dy, dx))), pw: Math.min(Math.hypot(dx, dy), maxPull) / maxPull };
}
const pos = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

// Pointer events: satu kode untuk mouse & layar sentuh
cv.onpointerdown = e => { if (arrow || over) return; cv.setPointerCapture(e.pointerId); pull = pos(e); };
cv.onpointermove = e => { if (pull) pull = pos(e); };
cv.onpointerup = cv.onpointercancel = () => {
  if (!pull) return;
  const { a, pw } = aim(); pull = null;
  if (pw < .15) return;                              // tarikan terlalu pendek: batal
  const v = VMAX() * (.4 + .6 * pw), d = tipDist(pw);
  arrow = { x: bow.x + Math.cos(a) * d, y: bow.y + Math.sin(a) * d, vx: Math.cos(a) * v, vy: Math.sin(a) * v, a, stuck: false };
};

function shaft() {                                  // panah: ekor di (0,0), ujung di (L,0)
  g.save(); g.shadowColor = '#ff9ec4'; g.shadowBlur = 10;
  g.strokeStyle = '#ff5c93'; g.lineWidth = 3; g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, 0); g.lineTo(L, 0); g.stroke();
  g.fillStyle = '#ff5c93'; g.save(); g.translate(L, 0); g.rotate(-Math.PI / 2); heart(g, 0, 0, 6); g.restore();  // ujung berbentuk hati
  g.strokeStyle = '#ff9ec4'; g.lineWidth = 2; g.beginPath();
  for (const s of [-1, 1]) { g.moveTo(0, 0); g.lineTo(-8, 6 * s); g.moveTo(6, 0); g.lineTo(-2, 6 * s); }
  g.stroke(); g.restore();
}

function draw(t) {
  g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
  const s = Math.min(W, H) * .11;
  tgt = { x: W * .82, y: H * .36 + Math.sin(t / 700) * H * .05, s };

  // gerakkan panah yang sedang terbang
  if (arrow && !arrow.stuck) {
    const dt = Math.min((t - last) / 1000, .04);
    arrow.vy += GRAV() * dt; arrow.x += arrow.vx * dt; arrow.y += arrow.vy * dt;
    arrow.a = Math.atan2(arrow.vy, arrow.vx);
    if (Math.hypot(arrow.x - tgt.x, arrow.y - tgt.y) < s * 1.1 + miss * 10) hit();   // makin sering meleset, makin mudah
    else if (arrow.x > W + 60 || arrow.y > H + 60 || arrow.x < -60) missed();
  } else if (arrow) { arrow.x = tgt.x + arrow.ox; arrow.y = tgt.y + arrow.oy; }
  last = t;

  // target hati
  g.save(); g.shadowColor = '#ff5c93'; g.shadowBlur = 24; g.fillStyle = '#ff5c93'; heart(g, tgt.x, tgt.y, s); g.restore();
  g.fillStyle = '#ffffff66'; heart(g, tgt.x, tgt.y, s * .55);

  const { a, pw } = aim();
  // garis bantu lintasan
  if (pull && pw > .15) {
    const v = VMAX() * (.4 + .6 * pw), d = tipDist(pw);
    g.fillStyle = '#c77dff';
    for (let i = 1; i < 22; i++) {
      const k = i * .05; g.globalAlpha = 1 - i / 24; g.beginPath();
      g.arc(bow.x + Math.cos(a) * (d + v * k), bow.y + Math.sin(a) * d + Math.sin(a) * v * k + .5 * GRAV() * k * k, 3, 0, 6.283); g.fill();
    }
    g.globalAlpha = 1;
  }
  // busur + tali + panah yang siap ditembak
  g.save(); g.translate(bow.x, bow.y); g.rotate(a); g.lineCap = 'round';
  g.strokeStyle = '#c77dff'; g.lineWidth = 5; g.beginPath(); g.moveTo(0, -R); g.quadraticCurveTo(R * 1.1, 0, 0, R); g.stroke();
  const tail = -pw * maxPull * .7;
  g.strokeStyle = '#8a2b5c88'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(0, -R); g.lineTo(tail, 0); g.lineTo(0, R); g.stroke();
  if (!arrow) { g.translate(tail, 0); shaft(); }
  g.restore();
  // panah yang terbang / menancap (ujung panah = posisi x,y)
  if (arrow) { g.save(); g.translate(arrow.x, arrow.y); g.rotate(arrow.a); g.translate(-L, 0); shaft(); g.restore(); }
}

function hit() {                                    // kena target!
  over = true; arrow.stuck = true; arrow.ox = arrow.x - tgt.x; arrow.oy = arrow.y - tgt.y;
  const r = cv.getBoundingClientRect();
  const hitX = r.left + tgt.x;
  const hitY = r.top + tgt.y;

  $('#hint').textContent = 'Tepat di hatiku! 💘';

  // 1. Animasi bunga-bunga yang memenuhi seluruh layar
  flowerScreenBlast(hitX, hitY);

  // 2. Langsung memunculkan video ucapan yang besar tanpa jeda (0 ms)
  showVideoModal();
}
function missed() {
  arrow = null; miss++;
  $('#hint').textContent = miss >= 3 ? 'Hampir! Bidikannya kubantu ya 😉' : 'Hampir kena! Coba lagi 💕';
}
function loop(t) { if (running) { draw(t); requestAnimationFrame(loop); } }

function resetGame() {
  stopSustainedFlowerRain();
  over = false; miss = 0; arrow = null; pull = null; clearInterval(tw);
  $('#mem').classList.remove('show'); $('#after').hidden = true; vid.pause();
  if (music && !music.paused) music.volume = 0.6;
  $('#hint').textContent = HINT;
  $('#main').scrollIntoView({ behavior: 'smooth' });
}

/* ============ Alur halaman ============ */
$('#open').onclick = () => {
  music.play().catch(() => { });                      // musik baru mulai setelah klik (aturan autoplay browser)
  flowerScreenBlast(innerWidth / 2, innerHeight / 2);
  $('#intro').classList.add('out');
  setTimeout(() => {
    $('#intro').hidden = true; $('#main').hidden = false; $('#hint').textContent = HINT;
    sizeGame(); running = true; last = performance.now(); requestAnimationFrame(loop);
  }, 700);
};

let tw;                                              // efek mengetik
function typeText(el, txt) {
  clearInterval(tw); const ch = Array.from(txt); let i = 0; el.textContent = '';
  el.onclick = () => { clearInterval(tw); el.textContent = txt; };   // ketuk untuk langsung tampil semua
  tw = setInterval(() => { el.textContent += ch[i++]; if (i >= ch.length) clearInterval(tw); }, 24);
}
$('#next').onclick = () => {
  stopSustainedFlowerRain();
  $('#mem').classList.remove('show'); vid.pause();
  if (music && !music.paused) music.volume = 0.6;
  $('#after').hidden = false; $('#after').scrollIntoView({ behavior: 'smooth' });
  confetti();
  flowerScreenBlast(innerWidth / 2, innerHeight * 0.3);
  typeText($('#msg'), CFG.pesan);
};

/* ============ Fitur tambahan ============ */
let tt;
function toast(m) {
  const t = $('#toast'); t.textContent = m; t.classList.add('show');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800);
}
const hugBtn = $('#hug'), surBtn = $('#sur');
if (hugBtn) {
  hugBtn.onclick = () => {
    for (let i = 0; i < 3; i++) setTimeout(() => burst(innerWidth / 2, innerHeight * .75, 26, [0], 6), i * 200);
    toast('Peluk erat untukmu 🤗💗');
  };
}
if (surBtn) {
  surBtn.onclick = () => {
    toast(CFG.kejutan[Math.random() * CFG.kejutan.length | 0]);
    burst(innerWidth / 2, innerHeight * .6, 20, [0, 2], 5);
  };
}
$('#again').onclick = resetGame;

// Galeri foto (placeholder otomatis jika file belum ada)
CFG.foto.forEach((src, i) => {
  const f = document.createElement('figure'), im = new Image();
  im.alt = 'Kenangan ' + (i + 1); im.loading = 'lazy';
  im.onerror = () => { const d = document.createElement('div'); d.className = 'ph'; d.textContent = '📷 ' + src; im.replaceWith(d); };
  im.src = src; f.append(im); $('#gal').append(f);
});
