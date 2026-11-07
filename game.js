'use strict';
/* =========================================================
   MARINERS FÚTBOL 16 BITS · C.F. Barceloneta Sub 12 A
   Temporada 2026-27 · Fútbol 7
   ========================================================= */

// ---------- DATOS DEL EQUIPO (editar aquí) ----------
// pac=velocidad, sho=tiro, pas=pase, def=defensa, gk=portero (1-10)
// cara = número de foto en /caras (cara-01.png ... cara-14.png). 0 = sin foto.
// Las caras se pueden reasignar dentro del juego en PLANTILLA.
const PLAYERS = [
  {n:1,  name:'MARC',    pos:'POR', pac:5, sho:3, pas:5, def:5, gk:8, cara:12},
  {n:3,  name:'YOUSSEF', pos:'DEF', pac:7, sho:5, pas:6, def:7, cara:1},
  {n:4,  name:'ABDUL',   pos:'DEF', pac:6, sho:5, pas:6, def:8, cara:2},
  {n:6,  name:'OLIVER',  pos:'MED', pac:7, sho:6, pas:7, def:6, cara:3},
  {n:7,  name:'DAVID',   pos:'DEL', pac:8, sho:9, pas:7, def:4, cara:4},
  {n:8,  name:'DÍDAC',   pos:'MED', pac:6, sho:5, pas:7, def:6, cara:5},
  {n:9,  name:'ORIOL',   pos:'DEL', pac:8, sho:9, pas:6, def:4, cara:6},
  {n:10, name:'ALFON',   pos:'MED', pac:7, sho:6, pas:7, def:5, cara:7},
  {n:11, name:'KENAN',   pos:'MED', pac:7, sho:7, pas:6, def:5, cara:8},
  {n:12, name:'JUAN',    pos:'MED', pac:6, sho:5, pas:6, def:6, cara:13, inj:true},
  {n:14, name:'PAU',     pos:'DEF', pac:6, sho:5, pas:6, def:7, cara:9},
  {n:15, name:'CIRO',    pos:'DEF', pac:6, sho:4, pas:6, def:7, cara:10},
  {n:17, name:'VICENTE', pos:'DEF', pac:6, sho:4, pas:5, def:7, cara:11},
  {n:19, name:'MATHIAS', pos:'DEL', pac:7, sho:7, pas:6, def:5, cara:14},
  {n:22, name:'BRUNO',   pos:'MED', pac:6, sho:6, pas:6, def:5, cara:0, inj:true},
];
const DEFAULT_LINEUP = [1, 4, 3, 6, 11, 7, 9]; // dorsales: POR, DEF, DEF, MED, MED, DEL, DEL
const NUM_CARAS = 14;
// Tono de piel y pelo de cada foto (para el sprite en el campo)
const CARA_LOOK = [
  {skin:'#e8b98e', hair:'#5a3a22'},
  {skin:'#f0c8a0', hair:'#6b4528'}, {skin:'#f0c8a0', hair:'#3a2a20'}, {skin:'#ebc29a', hair:'#2a211c'},
  {skin:'#e3b28a', hair:'#2a211c'}, {skin:'#f3cfa8', hair:'#d8b060'}, {skin:'#c58b60', hair:'#1d1a1a'},
  {skin:'#efc59c', hair:'#7a5232'}, {skin:'#f0c8a0', hair:'#6b4528'}, {skin:'#efc59c', hair:'#9a7044'},
  {skin:'#c99068', hair:'#1d1a1a'}, {skin:'#c99068', hair:'#1d1a1a'}, {skin:'#f0c8a0', hair:'#3a2a20'},
  {skin:'#f3cfa8', hair:'#cfa45a'}, {skin:'#b97f55', hair:'#1d1a1a'},
];

// Rivales de la temporada 26/27 (Liga ACDEA + amistosos de pretemporada).
// str = fuerza (según la clasificación real). Colores de equipación orientativos: se pueden cambiar.
const TEAMS = {
  BAR:  {name:'C.F. BARCELONETA', short:'BAR', str:80, crest:'escudos/barceloneta.png',
         kit:{s:'#d8202f', s2:'#ffffff', pat:'stripes', sh:'#d8202f', so:'#d8202f', gk:'#ff7a1a', gksh:'#d8202f'}},
  OSAB: {name:'ONA SANT ADRIÀ B', short:'OSB', str:85, comp:'liga',
         kit:{s:'#1d63c6', s2:'#ffffff', pat:'hoops', sh:'#ffffff', so:'#1d63c6', gk:'#2b2b2b', gksh:'#2b2b2b'}},
  MON:  {name:'CD MONOPOL', short:'MNP', str:82, comp:'liga',
         kit:{s:'#f2c81e', s2:'#f2c81e', pat:'plain', sh:'#1b1b1b', so:'#f2c81e', gk:'#3b7d3b', gksh:'#1b1b1b'}},
  PTV:  {name:'PB TRINITAT VELLA', short:'PTV', str:75, comp:'liga',
         kit:{s:'#6d3aa8', s2:'#ffffff', pat:'half', sh:'#ffffff', so:'#6d3aa8', gk:'#2b2b2b', gksh:'#2b2b2b'}},
  BCB:  {name:'PB BARCINO B', short:'BCB', str:71, comp:'liga',
         kit:{s:'#1c2f6e', s2:'#f2c14e', pat:'stripes', sh:'#1c2f6e', so:'#f2c14e', gk:'#3b7d3b', gksh:'#1b1b1b'}},
  FBM:  {name:'F.B. MONTCADA', short:'MTC', str:72, comp:'liga', crest:'escudos/montcada.png',
         kit:{s:'#1b1b1b', s2:'#d8202f', pat:'stripes', sh:'#1b1b1b', so:'#1b1b1b', gk:'#e6e600', gksh:'#1b1b1b'}},
  BCA:  {name:'PB BARCINO A', short:'BCA', str:72, comp:'liga',
         kit:{s:'#1c2f6e', s2:'#f2c14e', pat:'plain', sh:'#f2c14e', so:'#1c2f6e', gk:'#3b7d3b', gksh:'#1b1b1b'}},
  CDT:  {name:'CD TRINIDAD', short:'TRI', str:56, comp:'liga',
         kit:{s:'#13a6a0', s2:'#ffffff', pat:'plain', sh:'#ffffff', so:'#13a6a0', gk:'#2b2b2b', gksh:'#2b2b2b'}},
  OSAA: {name:'ONA SANT ADRIÀ A', short:'OSA', str:52, comp:'liga',
         kit:{s:'#5ab4f0', s2:'#ffffff', pat:'hoops', sh:'#1d63c6', so:'#ffffff', gk:'#2b2b2b', gksh:'#2b2b2b'}},
  BCC:  {name:'PB BARCINO C', short:'BCC', str:45, comp:'liga',
         kit:{s:'#f2c14e', s2:'#1c2f6e', pat:'stripes', sh:'#1c2f6e', so:'#1c2f6e', gk:'#3b7d3b', gksh:'#1b1b1b'}},
  SANTS:{name:'U.E. SANTS', short:'UES', str:68, comp:'amistoso',
         kit:{s:'#ffffff', s2:'#1f8a3c', pat:'half', sh:'#1f8a3c', so:'#ffffff', gk:'#2b2b2b', gksh:'#2b2b2b'}},
  BONP: {name:'BON PASTOR', short:'BPA', str:87, comp:'amistoso',
         kit:{s:'#2346b8', s2:'#f2d02a', pat:'stripes', sh:'#2346b8', so:'#f2d02a', gk:'#3b7d3b', gksh:'#1b1b1b'}},
};
const LEAGUE_IDS = ['BAR','OSAB','MON','PTV','BCB','FBM','BCA','CDT','OSAA','BCC'];
const OPP_IDS = Object.keys(TEAMS).filter(k => k !== 'BAR');
// Clasificación real (actualizada 25/10/2026, web Bruno TV Kids Football)
const REAL_TABLE = [
  ['ONA SANT ADRIA B',3,3,0,0,30,13,9],['CF BARCELONETA',3,2,1,0,28,10,7],['CD MONOPOL',3,2,1,0,25,13,7],
  ['PB TRINITAT VELLA',3,2,0,1,17,12,6],['PB BARCINO B',3,2,0,1,15,17,6],['FB MONTCADA',3,1,1,1,16,14,4],
  ['PB BARCINO A',3,1,1,1,15,13,4],['CD TRINIDAD',3,0,0,3,6,21,0],['ONA SANT ADRIA A',3,0,0,3,6,23,0],['PB BARCINO C',3,0,0,3,1,23,0],
];
const REAL_SCORERS = [['DAVID',11],['ORIOL',11],['KENAN',3],['MATHIAS',2],['OLIVER',2],['ABDUL',1],['ALFON',1],['BRUNO',1],['DÍDAC',1],['PAU',1],['YOUSSEF',1]];

// ---------- UTILIDADES ----------
const $ = s => document.querySelector(s);
const rand = (a=0, b=1) => a + Math.random() * (b - a);
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const hyp = Math.hypot;
const mk = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('mariners16_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('mariners16_' + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem('mariners16_' + k); } catch (e) {} },
};
const noAcc = h => String(h).replace(/[ÁÉÍÓÚÀÈÒÏÜ]/g, c => c.normalize('NFD')[0]);
const byNum = n => PLAYERS.find(p => p.n === n);
const settings = Object.assign({dur: 4, diff: 1, sound: true}, store.get('settings', {}));
const faceMap = store.get('caras', {});
const caraOf = pl => (pl.name in faceMap ? faceMap[pl.name] : pl.cara);
const faceURL = pl => { const c = caraOf(pl); return c ? `caras/cara-${String(c).padStart(2,'0')}.png` : genericFace(pl); };
const lookOf = pl => CARA_LOOK[caraOf(pl)] || CARA_LOOK[0];
function poisson(l) { l = Math.min(l, 25); const L = Math.exp(-l); let k = 0, p = 1; do { k++; p *= Math.random(); } while (p > L); return k - 1; }

// ---------- FUENTE PIXEL 3x5 ----------
const GLYPH = {A:[2,5,7,5,5],B:[6,5,6,5,6],C:[3,4,4,4,3],D:[6,5,5,5,6],E:[7,4,6,4,7],F:[7,4,6,4,4],G:[3,4,5,5,3],H:[5,5,7,5,5],
  I:[7,2,2,2,7],J:[1,1,1,5,2],K:[5,5,6,5,5],L:[4,4,4,4,7],M:[5,7,7,5,5],N:[6,5,5,5,5],O:[2,5,5,5,2],P:[6,5,6,4,4],Q:[2,5,5,6,3],
  R:[6,5,6,5,5],S:[3,4,2,1,6],T:[7,2,2,2,2],U:[5,5,5,5,7],V:[5,5,5,5,2],W:[5,5,7,7,5],X:[5,5,2,5,5],Y:[5,5,2,2,2],Z:[7,1,2,4,7],
  0:[7,5,5,5,7],1:[2,6,2,2,7],2:[6,1,2,4,7],3:[6,1,2,1,6],4:[5,5,7,1,1],5:[7,4,6,1,6],6:[3,4,7,5,7],7:[7,1,2,2,2],8:[7,5,7,5,7],9:[7,5,7,1,6],
  ' ':[0,0,0,0,0],'.':[0,0,0,0,2],'-':[0,0,7,0,0],'!':[2,2,2,0,2],':':[0,2,0,2,0],"'":[2,2,0,0,0],'#':[5,7,5,7,5],'/':[1,1,2,4,4]};
function txt(g, s, x, y, col, sc = 1) {
  x = Math.round(x); y = Math.round(y);
  s = String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
  g.fillStyle = col;
  for (let i = 0; i < s.length; i++) {
    const gl = GLYPH[s[i]] || GLYPH[' '];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (gl[r] & (4 >> c)) g.fillRect(x + (i * 4 + c) * sc, y + r * sc, sc, sc);
  }
}
const txtW = (s, sc = 1) => String(s).length * 4 * sc - sc;

// ---------- ESCUDOS ----------
function makeCrest(t) {
  if (t.crest) return t.crest;
  const c = mk(24, 24), g = c.getContext('2d'), k = t.kit;
  const rowW = y => y < 14 ? 20 : Math.max(2, 20 - (y - 13) * 2.2);
  for (let y = 1; y < 23; y++) {
    const w = Math.round(rowW(y - 1)), x0 = 12 - w / 2;
    g.fillStyle = '#14182a'; g.fillRect(x0 - 1, y, w + 2, 1);
  }
  for (let y = 2; y < 22; y++) {
    const w = Math.round(rowW(y - 1)) - 2, x0 = 12 - w / 2;
    for (let x = 0; x < w; x++) {
      let col = k.s;
      if (k.pat === 'stripes' && Math.floor((x0 + x) / 3) % 2) col = k.s2;
      if (k.pat === 'hoops' && Math.floor(y / 3) % 2) col = k.s2;
      if (k.pat === 'half' && x0 + x >= 12) col = k.s2;
      if (k.pat === 'plain' && y > 13) col = k.sh;
      g.fillStyle = col; g.fillRect(x0 + x, y, 1, 1);
    }
  }
  g.fillStyle = '#f7efdc'; g.fillRect(3, 7, 18, 7); g.fillStyle = '#14182a';
  txt(g, t.short, 12 - Math.floor(txtW(t.short) / 2), 8, '#14182a');
  return c.toDataURL();
}
for (const id in TEAMS) { TEAMS[id].id = id; TEAMS[id].crestURL = makeCrest(TEAMS[id]); }
function genericFace(pl) {
  const c = mk(32, 32), g = c.getContext('2d');
  g.fillStyle = '#c92131'; g.fillRect(0, 0, 32, 32);
  g.fillStyle = '#ffffff'; for (let x = 0; x < 32; x += 8) g.fillRect(x, 22, 4, 10);
  g.fillStyle = '#e8b98e'; g.fillRect(10, 6, 12, 14); g.fillStyle = '#5a3a22'; g.fillRect(9, 4, 14, 5); g.fillRect(9, 6, 2, 6);
  g.fillStyle = '#14182a'; g.fillRect(13, 12, 2, 2); g.fillRect(18, 12, 2, 2); g.fillRect(14, 17, 4, 1);
  txt(g, pl.n, 16 - Math.floor(txtW(pl.n) / 2), 25, '#14182a');
  return c.toDataURL();
}

// ---------- AUDIO ----------
let AC = null, musicTimer = null;
function ac() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
function tone(f, d, type = 'square', v = 0.08, f2 = null, delay = 0) {
  if (!settings.sound) return; const a = ac(); if (!a) return;
  const t = a.currentTime + delay, o = a.createOscillator(), gn = a.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
  gn.gain.setValueAtTime(v, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(gn).connect(a.destination); o.start(t); o.stop(t + d + 0.02);
}
function noise(d, v = 0.08, fc = 800, delay = 0) {
  if (!settings.sound) return; const a = ac(); if (!a) return;
  const t = a.currentTime + delay, n = Math.floor(a.sampleRate * d), buf = a.createBuffer(1, n, a.sampleRate), ch = buf.getChannelData(0);
  for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
  const s = a.createBufferSource(), fl = a.createBiquadFilter(), gn = a.createGain();
  s.buffer = buf; fl.type = 'bandpass'; fl.frequency.value = fc; gn.gain.setValueAtTime(v, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
  s.connect(fl).connect(gn).connect(a.destination); s.start(t);
}
const SFX = {
  kick() { tone(180, 0.08, 'square', 0.07, 70); noise(0.05, 0.05, 1200); },
  shot() { tone(260, 0.12, 'square', 0.09, 60); noise(0.09, 0.08, 900); },
  whistle(n = 1) { for (let i = 0; i < n; i++) { tone(2300, 0.22, 'square', 0.04, 2100, i * 0.3); tone(2350, 0.22, 'triangle', 0.04, 2250, i * 0.3); } },
  goal() { [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.16, 'square', 0.07, null, i * 0.11)); noise(1.6, 0.06, 600); },
  save() { tone(120, 0.1, 'triangle', 0.1, 80); noise(0.1, 0.06, 500); },
  tackle() { noise(0.12, 0.08, 300); },
  menu() { tone(880, 0.05, 'square', 0.04); },
  ok() { tone(660, 0.06, 'square', 0.05); tone(990, 0.08, 'square', 0.05, null, 0.06); },
  post() { tone(1400, 0.25, 'triangle', 0.07, 1300); },
};
const MELODY = [72,0,76,79,76,0,74,72, 74,0,77,81,79,77,76,74, 72,0,76,79,84,0,83,81, 79,77,76,74,72,0,0,0];
const BASS =   [48,48,55,55,53,53,55,55];
function startMusic() {
  stopMusic(); if (!settings.sound) return; let i = 0;
  musicTimer = setInterval(() => {
    const a = ac(); if (!a || !settings.sound) return;
    const m = MELODY[i % MELODY.length]; if (m) tone(440 * Math.pow(2, (m - 69) / 12), 0.16, 'square', 0.025);
    if (i % 4 === 0) tone(440 * Math.pow(2, (BASS[(i / 4) % BASS.length] - 69) / 12), 0.3, 'triangle', 0.05);
    i++;
  }, 170);
}
function stopMusic() { if (musicTimer) clearInterval(musicTimer); musicTimer = null; }

// ---------- ENTRADA ----------
const K = {};
const touch = {x: 0, y: 0, A: false, B: false, S: false};
const inp = {x: 0, y: 0, shoot: false, pass: false, sprint: false, sw: false, shootP: false, shootR: false, passP: false, swP: false};
let prevIn = {};
addEventListener('keydown', e => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code) && G.mode !== 'menu') e.preventDefault();
  if (!e.repeat) { if (SHOOT_K.includes(e.code)) pend.sP = true; if (PASS_K.includes(e.code)) pend.pP = true; if (SW_K.includes(e.code)) pend.wP = true; }
  K[e.code] = true;
  if ((e.code === 'Escape' || e.code === 'KeyP') && G.mode === 'match') togglePause();
  if ($('#screen').style.display === 'block' && !(e.code === 'Escape' && G.mode === 'match')) menuKey(e);
});
addEventListener('keyup', e => { K[e.code] = false; if (SHOOT_K.includes(e.code)) pend.sR = true; });
const SHOOT_K = ['KeyZ', 'KeyJ', 'Space'], PASS_K = ['KeyX', 'KeyK'], SW_K = ['KeyC', 'KeyL'];
const pend = {};
addEventListener('blur', () => { for (const k in K) K[k] = false; });
let gpPrev = {};
function pollInput() {
  let x = 0, y = 0;
  if (K.ArrowLeft || K.KeyA) x -= 1; if (K.ArrowRight || K.KeyD) x += 1;
  if (K.ArrowUp || K.KeyW) y -= 1; if (K.ArrowDown || K.KeyS) y += 1;
  x += touch.x; y += touch.y;
  let gS = false, gP = false, gR = false, gW = false;
  const gps = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const gp of gps) {
    if (!gp) continue;
    const ax = gp.axes[0] || 0, ay = gp.axes[1] || 0;
    if (Math.abs(ax) > 0.25) x += ax; if (Math.abs(ay) > 0.25) y += ay;
    const b = i => gp.buttons[i] && gp.buttons[i].pressed;
    if (b(14)) x -= 1; if (b(15)) x += 1; if (b(12)) y -= 1; if (b(13)) y += 1;
    gS = gS || b(0); gP = gP || b(2) || b(1); gR = gR || b(5) || b(7) || b(4) || b(6); gW = gW || b(3);
    if (b(9) && !gpPrev.start && G.mode === 'match') togglePause();
    if (G.mode === 'menu') gamepadMenu(gp);
    gpPrev.start = b(9);
  }
  const m = hyp(x, y); if (m > 1) { x /= m; y /= m; }
  inp.x = x; inp.y = y;
  inp.shoot = !!(K.KeyZ || K.KeyJ || K.Space || touch.A || gS);
  inp.pass = !!(K.KeyX || K.KeyK || touch.B || gP);
  inp.sprint = !!(K.ShiftLeft || K.ShiftRight || touch.S || gR);
  inp.sw = !!(K.KeyC || K.KeyL || gW);
  inp.shootP = inp.shootP || (inp.shoot && !prevIn.shoot) || !!pend.sP; inp.shootR = inp.shootR || (!inp.shoot && prevIn.shoot) || (!!pend.sR && !inp.shoot);
  inp.passP = inp.passP || (inp.pass && !prevIn.pass) || !!pend.pP; inp.swP = inp.swP || (inp.sw && !prevIn.sw) || !!pend.wP;
  pend.sP = pend.sR = pend.pP = pend.wP = false;
  prevIn = {shoot: inp.shoot, pass: inp.pass, sw: inp.sw};
}
const isTouch = ('ontouchstart' in window) || matchMedia('(pointer:coarse)').matches;
(function setupTouch() {
  const joy = $('#joy'), base = $('#joyBase'), knob = $('#joyKnob'); let jid = null, ox = 0, oy = 0;
  joy.addEventListener('pointerdown', e => { jid = e.pointerId; ox = e.clientX; oy = e.clientY; const r = $('#app').getBoundingClientRect();
    base.style.display = 'block'; base.style.left = (ox - r.left) + 'px'; base.style.top = (oy - r.top) + 'px'; joy.setPointerCapture(jid); ac(); });
  joy.addEventListener('pointermove', e => { if (e.pointerId !== jid) return; let dx = e.clientX - ox, dy = e.clientY - oy; const m = hyp(dx, dy), R = 42;
    if (m > R) { dx *= R / m; dy *= R / m; } knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    touch.x = Math.abs(dx) < 6 ? 0 : dx / R; touch.y = Math.abs(dy) < 6 ? 0 : dy / R; });
  const end = e => { if (e.pointerId !== jid) return; jid = null; touch.x = touch.y = 0; base.style.display = 'none'; knob.style.transform = 'translate(-50%,-50%)'; };
  joy.addEventListener('pointerup', end); joy.addEventListener('pointercancel', end);
  for (const [id, key] of [['#bA', 'A'], ['#bB', 'B'], ['#bS', 'S']]) {
    const el = $(id);
    el.addEventListener('pointerdown', e => { e.preventDefault(); touch[key] = true; el.classList.add('on'); el.setPointerCapture(e.pointerId); ac(); });
    const up = () => { touch[key] = false; el.classList.remove('on'); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('lostpointercapture', up);
  }
  $('#pauseBtn').addEventListener('click', () => togglePause());
})();

// ---------- CAMPO ----------
const VW = 320, VH = 180;
const F = {x0: 28, y0: 30, x1: 428, y1: 280}; // fútbol 7: 400 x 250
const FW = F.x1 + 28, FH = F.y1 + 26;
const FL = F.x1 - F.x0, FHt = F.y1 - F.y0, CX = (F.x0 + F.x1) / 2, CY = (F.y0 + F.y1) / 2;
const GOAL_W = 46, GY0 = CY - GOAL_W / 2, GY1 = CY + GOAL_W / 2, BAR_Z = 16, GDEP = 12;
const BOX_D = 66, BOX_W = 156;
let fieldCv = null;
function buildField() {
  const c = mk(FW, FH), g = c.getContext('2d');
  g.fillStyle = '#2a6f35'; g.fillRect(0, 0, FW, FH);
  for (let y = 0; y < FH; y += 4) for (let x = (y / 4) % 2 * 2; x < FW; x += 4) { g.fillStyle = '#286a33'; g.fillRect(x, y, 2, 2); }
  for (let x = F.x0, i = 0; x < F.x1; x += 25, i++) { g.fillStyle = i % 2 ? '#3f9f47' : '#47ab4f'; g.fillRect(x, F.y0, Math.min(25, F.x1 - x), FHt); }
  for (let i = 0; i < 900; i++) { g.fillStyle = Math.random() < .5 ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.05)'; g.fillRect(F.x0 + Math.floor(Math.random() * FL), F.y0 + Math.floor(Math.random() * FHt), 1, 1); }
  // vallas publicitarias
  const ads = [['SOM MARINERS', '#c92131', '#fff'], ['BRUNO TV KIDS FOOTBALL', '#14182a', '#f2c14e'], ['C.F. BARCELONETA', '#fff', '#c92131'], ['SUB 12 A', '#f2c14e', '#14182a']];
  let ax = 0, ai = 0;
  while (ax < FW) { const [t, bg, fg] = ads[ai % ads.length], w = txtW(t, 1) + 14; g.fillStyle = bg; g.fillRect(ax, 6, w, 11); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(ax, 16, w, 2); txt(g, t, ax + 7, 9, fg); ax += w + 2; ai++; }
  ax = -30; ai = 2;
  while (ax < FW) { const [t, bg, fg] = ads[ai % ads.length], w = txtW(t, 1) + 14; g.fillStyle = bg; g.fillRect(ax, FH - 14, w, 11); txt(g, t, ax + 7, FH - 11, fg); ax += w + 2; ai++; }
  // líneas
  g.fillStyle = '#f4f4ee';
  const line = (x, y, w, h) => g.fillRect(Math.round(x), Math.round(y), w, h);
  line(F.x0, F.y0, FL, 1); line(F.x0, F.y1, FL + 1, 1); line(F.x0, F.y0, 1, FHt); line(F.x1, F.y0, 1, FHt);
  line(CX, F.y0, 1, FHt);
  const circ = (cx, cy, r, a0 = 0, a1 = 360) => { for (let a = a0; a <= a1; a += 0.8) { const t = a * Math.PI / 180; line(cx + r * Math.cos(t), cy + r * Math.sin(t), 1, 1); } };
  circ(CX, CY, 28); line(CX - 1, CY - 1, 3, 3);
  for (const s of [0, 1]) {
    const gx = s ? F.x1 : F.x0, d = s ? -1 : 1;
    const bx = s ? gx - BOX_D : gx; line(bx, CY - BOX_W / 2, BOX_D, 1); line(bx, CY + BOX_W / 2, BOX_D + 1, 1); line(gx + d * BOX_D, CY - BOX_W / 2, 1, BOX_W);
    const sx = s ? gx - 20 : gx; line(sx, CY - 40, 20, 1); line(sx, CY + 40, 21, 1); line(gx + d * 20, CY - 40, 1, 80);
    line(gx + d * 46, CY, 2, 2);
    circ(gx + d * 46, CY, 26, s ? 127 : -53, s ? 233 : 53);
    // repintar dentro del área para el arco
    // portería (red)
    const nx = s ? F.x1 + 1 : F.x0 - GDEP;
    g.fillStyle = 'rgba(30,30,30,.35)'; g.fillRect(nx, GY0, GDEP, GOAL_W);
    g.fillStyle = 'rgba(240,240,240,.55)';
    for (let x = 0; x < GDEP; x += 3) g.fillRect(nx + x, GY0, 1, GOAL_W);
    for (let y = 0; y < GOAL_W; y += 3) g.fillRect(nx, GY0 + y, GDEP, 1);
    g.fillStyle = '#fff'; g.fillRect(nx, GY0 - 1, GDEP + 1, 2); g.fillRect(nx, GY1, GDEP + 1, 2); g.fillRect(s ? nx + GDEP : nx, GY0 - 1, 1, GOAL_W + 2);
    g.fillStyle = '#f4f4ee';
  }
  // banderines
  for (const [x, y] of [[F.x0, F.y0], [F.x1, F.y0], [F.x0, F.y1], [F.x1, F.y1]]) { g.fillStyle = '#ddd'; g.fillRect(x, y - 7, 1, 7); g.fillStyle = '#f2c14e'; g.fillRect(x + 1, y - 7, 3, 2); }
  fieldCv = c;
}

// ---------- PARTIDO ----------
const FORM = [
  {role: 'POR', u: 0.03, v: 0.5}, {role: 'DEF', u: 0.2, v: 0.3}, {role: 'DEF', u: 0.2, v: 0.7},
  {role: 'MED', u: 0.42, v: 0.25}, {role: 'MED', u: 0.42, v: 0.75}, {role: 'DEL', u: 0.64, v: 0.4}, {role: 'DEL', u: 0.68, v: 0.62},
];
const DIFF = [{name: 'FÁCIL', mul: 0.82}, {name: 'NORMAL', mul: 1}, {name: 'DIFÍCIL', mul: 1.16}];
let M = null;
const G = {mode: 'menu', paused: false, ctx: null};
const W = (team, u, v) => ({x: team === 0 ? F.x0 + u * FL : F.x1 - u * FL, y: F.y0 + v * FHt});

function newMatch(oppId, lineup, ctx) {
  const opp = TEAMS[oppId], diff = DIFF[settings.diff].mul;
  M = {opp, ctx, t: 0, len: settings.dur * 60, half: 1, score: [0, 0], scorers: [], oppScorers: [], players: [],
       ball: {x: CX, y: CY, z: 0, vx: 0, vy: 0, vz: 0, owner: null, last: null, noTake: null, noTakeT: 0, shot: false, gkCheck: false},
       state: 'kickoff', stateT: 0, kickTeam: 0, ctrl: null, cam: {x: CX - VW / 2, y: CY - VH / 2}, react: [1, (0.55 + opp.str / 180) * diff], shake: 0, msgT: 0};
  lineup.forEach((num, i) => {
    const d = byNum(num), slot = FORM[i], look = lookOf(d);
    M.players.push(mkPlayer(0, slot, {pac: d.pac, sho: d.sho, pas: d.pas, def: d.def, gk: d.gk || 3}, d, look, TEAMS.BAR.kit));
  });
  const base = opp.str / 10 * diff;
  const skins = ['#f0c8a0', '#e3b28a', '#c58b60', '#a86f48', '#f3cfa8', '#8a5a3a'], hairs = ['#2a211c', '#1d1a1a', '#6b4528', '#d8b060', '#3a2a20', '#9a7044'];
  const nums = [1, 2, 4, 5, 8, 9, 10];
  FORM.forEach((slot, i) => {
    const r = () => clamp(base + rand(-1.2, 1.2), 2, 10);
    const st = {pac: r(), sho: r() + (slot.role === 'DEL' ? 1 : 0), pas: r(), def: r() + (slot.role === 'DEF' ? 1 : 0), gk: slot.role === 'POR' ? clamp(base, 3, 9.5) : 3};
    M.players.push(mkPlayer(1, slot, st, {n: nums[i], name: '#' + nums[i]}, {skin: skins[i % 6], hair: hairs[(i * 5) % 6]}, opp.kit));
  });
  kickoff(0);
  G.mode = 'match'; G.paused = false; stopMusic();
  showHUD(true); hideScreen(); updHud();
}
function mkPlayer(team, slot, st, data, look, kit) {
  const p = W(team, slot.u, slot.v);
  return {team, role: slot.role, hu: slot.u, hv: slot.v, st, data, look, kit, x: p.x, y: p.y, vx: 0, vy: 0, fx: team ? -1 : 1, fy: 0,
          anim: Math.random(), cool: 0, stun: 0, slide: 0, dive: 0, diveY: 0, charge: 0, hold: 0, passAfter: 1, stam: 1, ai: 0};
}
function kickoff(team) {
  const b = M.ball;
  Object.assign(b, {x: CX, y: CY, z: 0, vx: 0, vy: 0, vz: 0, owner: null, last: null, shot: false, noTake: null, noTakeT: 0});
  for (const p of M.players) {
    const u = p.role === 'POR' ? 0.03 : Math.min(p.hu * 0.62, 0.44), pos = W(p.team, u, p.hv);
    Object.assign(p, {x: pos.x, y: pos.y, vx: 0, vy: 0, fx: p.team ? -1 : 1, fy: 0, slide: 0, dive: 0, stun: 0, charge: 0, hold: 0});
  }
  const kick = M.players.filter(p => p.team === team && p.role === 'DEL');
  const d = team ? 1 : -1;
  kick[0].x = CX + d * 4; kick[0].y = CY; kick[1].x = CX + d * 10; kick[1].y = CY - 18;
  b.owner = kick[0]; kick[0].passAfter = 0.6;
  M.state = 'kickoff'; M.stateT = 0; M.kickTeam = team;
  M.ctrl = team === 0 ? kick[0] : nearestTo(0, CX, CY, true);
}
function nearestTo(team, x, y, noGk) {
  let best = null, bd = 1e9;
  for (const p of M.players) { if (p.team !== team || (noGk && p.role === 'POR')) continue; const d = hyp(p.x - x, p.y - y); if (d < bd) { bd = d; best = p; } }
  return best;
}
const spd = p => 46 + p.st.pac * 4.6;
const attackDir = team => team === 0 ? 1 : -1;
const oppGoalX = team => team === 0 ? F.x1 : F.x0;
const ownGoalX = team => team === 0 ? F.x0 : F.x1;

function kick(p, vx, vy, vz) {
  const b = M.ball; b.owner = null; b.vx = vx; b.vy = vy; b.vz = vz; b.z = Math.max(b.z, 0.5);
  b.last = p; b.noTake = p; b.noTakeT = 0.22; b.shot = false; b.gkCheck = false; p.hold = 0; p.charge = 0;
}
function shoot(p, power, aim) {
  const gx = oppGoalX(p.team) + attackDir(p.team) * 2; let ty = CY + aim * GOAL_W * 0.4;
  const dG = hyp(gx - p.x, CY - p.y), err = (1.15 - p.st.sho / 10) * 16 * (0.6 + power) * (0.55 + dG / 180);
  ty += rand(-err, err);
  const dx = gx - p.x, dy = ty - p.y, d = hyp(dx, dy) || 1, s = 165 + power * 150 + p.st.sho * 6;
  kick(p, dx / d * s, dy / d * s, 14 + power * 62 + rand(-6, 10));
  const b = M.ball; b.shot = true; SFX.shot(); M.lastShot = {p, t: M.t};
}
function passTo(p, t, lob) {
  const lead = 0.28, tx = t.x + t.vx * lead, ty = t.y + t.vy * lead;
  const dx = tx - p.x, dy = ty - p.y, d = hyp(dx, dy) || 1;
  const er = (10 - p.st.pas) * 0.012, a = Math.atan2(dy, dx) + rand(-er, er);
  if (lob || d > 150) { const s = clamp(d * 1.25 + 40, 120, 230); kick(p, Math.cos(a) * s, Math.sin(a) * s, 70 + d * 0.25); }
  else { const s = clamp(d * 1.7 + 70, 115, 255); kick(p, Math.cos(a) * s, Math.sin(a) * s, 0); }
  M.passTo = t; M.passT = 1.2; SFX.kick();
}
function laneBlocked(p, t) {
  const dx = t.x - p.x, dy = t.y - p.y, L = hyp(dx, dy) || 1;
  for (const o of M.players) {
    if (o.team === p.team) continue;
    const u = ((o.x - p.x) * dx + (o.y - p.y) * dy) / (L * L); if (u < 0.08 || u > 0.95) continue;
    if (hyp(p.x + dx * u - o.x, p.y + dy * u - o.y) < 7) return true;
  }
  return false;
}
function openness(t) { let m = 99; for (const o of M.players) if (o.team !== t.team) m = Math.min(m, hyp(o.x - t.x, o.y - t.y)); return m; }
function humanPassTarget(p, dx, dy) {
  let best = null, bs = -1e9;
  for (const t of M.players) {
    if (t.team !== p.team || t === p) continue;
    const vx = t.x - p.x, vy = t.y - p.y, d = hyp(vx, vy) || 1, dot = (vx * dx + vy * dy) / d;
    if (dot < 0.35 && (dx || dy)) continue;
    const s = dot * 2.2 - d / 220 + Math.min(openness(t), 30) / 40 - (laneBlocked(p, t) ? 0.6 : 0) - (t.role === 'POR' ? 0.8 : 0);
    if (s > bs) { bs = s; best = t; }
  }
  return best;
}
function aiPassTarget(p) {
  const dir = attackDir(p.team); let best = null, bs = 0.15;
  for (const t of M.players) {
    if (t.team !== p.team || t === p) continue;
    const d = hyp(t.x - p.x, t.y - p.y); if (d < 22 || d > 210) continue;
    let s = dir * (t.x - p.x) / 90 + Math.min(openness(t), 34) / 26 - d / 320 - (laneBlocked(p, t) ? 1.2 : 0) - (t.role === 'POR' ? 1.5 : 0);
    if (s > bs) { bs = s; best = t; }
  }
  return best;
}
function tackle(p) {
  if (p.cool > 0 || p.stun > 0) return;
  p.cool = 0.75; p.slide = 0.28;
  const b = M.ball, o = b.owner; SFX.tackle();
  if (o && o.team !== p.team && hyp(o.x - p.x, o.y - p.y) < 13) {
    const pr = clamp((p.team === 0 ? 0.46 : 0.34) + (p.st.def - o.st.pas * 0.6 - 2) * 0.05, 0.15, 0.8);
    if (Math.random() < pr) {
      b.owner = null; b.vx = p.fx * 60 + rand(-25, 25); b.vy = p.fy * 60 + rand(-25, 25); b.vz = 20; b.last = p; b.noTake = o; b.noTakeT = 0.5; o.stun = 0.5;
      return true;
    }
    p.stun = 0.45;
  }
  return false;
}
function moveTo(p, tx, ty, s, dt) {
  const dx = tx - p.x, dy = ty - p.y, d = hyp(dx, dy);
  let vx = 0, vy = 0; if (d > 2.5) { const k = Math.min(s, d * 5) / d; vx = dx * k; vy = dy * k; }
  const a = Math.min(1, dt * 9); p.vx += (vx - p.vx) * a; p.vy += (vy - p.vy) * a;
}
function homePos(p) {
  const b = M.ball, dir = attackDir(p.team);
  const bu = p.team === 0 ? (b.x - F.x0) / FL : (F.x1 - b.x) / FL, bv = (b.y - F.y0) / FHt;
  const att = b.owner && b.owner.team === p.team;
  let u = p.hu + (bu - 0.45) * 0.5 + (att ? 0.07 : -0.05);
  const lim = {DEF: [0.08, 0.58], MED: [0.18, 0.82], DEL: [0.32, 0.93]}[p.role];
  u = clamp(u, lim[0], lim[1]);
  const v = clamp(p.hv + (bv - 0.5) * 0.35, 0.06, 0.94);
  return W(p.team, u, v);
}
function gkAI(p, dt) {
  const b = M.ball, gx = ownGoalX(p.team), dir = attackDir(p.team);
  if (b.owner === p) {
    p.hold += dt; p.vx *= 0.8; p.vy *= 0.8;
    if (p.hold > 0.9) { const t = aiPassTarget(p) || nearestTo(p.team, p.x + dir * 120, CY, true); passTo(p, t, hyp(t.x - p.x, t.y - p.y) > 110); }
    return;
  }
  let ty = clamp(CY + (b.y - CY) * 0.55, GY0 + 3, GY1 - 3), tx = gx + dir * 7;
  const toward = (b.vx * dir) < -40 && !b.owner;
  if (toward && Math.abs(b.vx) > 1) { const t = (gx - b.x) / b.vx; if (t > 0 && t < 1.5) ty = clamp(b.y + b.vy * t, GY0 - 4, GY1 + 4); }
  const inBox = Math.abs(b.x - gx) < BOX_D - 6 && Math.abs(b.y - CY) < BOX_W / 2 - 6;
  if (inBox && !b.shot) {
    const myD = hyp(b.x - p.x, b.y - p.y), opp = nearestTo(1 - p.team, b.x, b.y);
    const oD = opp ? hyp(opp.x - b.x, opp.y - b.y) : 99;
    if ((!b.owner && myD < oD + 8 && hyp(b.vx, b.vy) < 150) || (b.owner && b.owner.team !== p.team && myD < 30)) { tx = b.x; ty = b.y; }
  }
  moveTo(p, tx, ty, 40 + p.st.gk * 6, dt);
}
function teamRanks(team) {
  const b = M.ball, tgt = b.owner ? b.owner : {x: b.x + b.vx * 0.3, y: b.y + b.vy * 0.3};
  const arr = M.players.filter(p => p.team === team && p.role !== 'POR').map(p => ({p, d: hyp(p.x - tgt.x, p.y - tgt.y)})).sort((a, b) => a.d - b.d).map(o => o.p);
  if (team === 0 && M.ctrl && M.ctrl.role !== 'POR' && !G.autoplay) { arr.splice(arr.indexOf(M.ctrl), 1); arr.unshift(M.ctrl); }
  return arr;
}
function aiOwner(p, dt) {
  const b = M.ball, dir = attackDir(p.team), gx = oppGoalX(p.team), react = M.react[p.team];
  p.hold += dt;
  const dG = hyp(gx - p.x, CY - p.y);
  let near = null, nd = 99;
  for (const o of M.players) if (o.team !== p.team) { const d = hyp(o.x - p.x, o.y - p.y); if (d < nd && (o.x - p.x) * dir > -6) { nd = d; near = o; } }
  const range = 70 + p.st.sho * 7;
  if (dG < range && p.hold > 0.3 && Math.abs(p.y - CY) < 95) {
    if (Math.random() < dt * (dG < 60 ? 3 : 0.9) * react) { shoot(p, rand(0.5, 1), rand(-1, 1)); return; }
  }
  if ((nd < 16 && p.hold > 0.25 && Math.random() < dt * 3.2 * react) || p.hold > p.passAfter) {
    const t = aiPassTarget(p); if (t) { passTo(p, t); p.passAfter = rand(0.9, 2.6) / Math.max(0.6, react); return; }
    p.passAfter = p.hold + 0.6;
  }
  let tx = gx, ty = CY * 0.4 + p.y * 0.6;
  if (near && nd < 26) ty += (p.y >= near.y ? 1 : -1) * 34;
  ty = clamp(ty, F.y0 + 8, F.y1 - 8);
  moveTo(p, tx, ty, spd(p) * 0.78 * Math.min(1.1, 0.75 + react * 0.25), dt);
}
function aiOff(p, dt, ranks) {
  const b = M.ball, react = M.react[p.team], s = spd(p) * Math.min(1.08, 0.72 + react * 0.28);
  const rk = ranks.indexOf(p);
  if (!b.owner) {
    if (rk === 0 || (M.passTo === p && M.passT > 0)) { moveTo(p, b.x + b.vx * 0.25, b.y + b.vy * 0.25, s, dt); return; }
  } else if (b.owner.team !== p.team) {
    const o = b.owner;
    if (rk === 0) {
      moveTo(p, o.x + o.vx * 0.15, o.y + o.vy * 0.15, s, dt);
      if (hyp(o.x - p.x, o.y - p.y) < 9 && p.cool <= 0 && Math.random() < dt * (p.team === 0 ? 2.6 : 1.9) * react) tackle(p);
      return;
    }
    if (rk === 1) { const gx = ownGoalX(p.team); moveTo(p, o.x + (gx - o.x) * 0.3, o.y + (CY - o.y) * 0.3, s * 0.9, dt); return; }
  }
  const h = homePos(p); moveTo(p, h.x, h.y, s * 0.85, dt);
}
function humanCtrl(p, dt) {
  const b = M.ball;
  let sp = spd(p) * (b.owner === p ? 0.93 : 1);
  if (inp.sprint && p.stam > 0.05 && (inp.x || inp.y)) { sp *= 1.3; p.stam = Math.max(0, p.stam - dt * 0.35); } else p.stam = Math.min(1, p.stam + dt * 0.12);
  const a = Math.min(1, dt * 12); p.vx += (inp.x * sp - p.vx) * a; p.vy += (inp.y * sp - p.vy) * a;
  if (b.owner === p) {
    if (p.role === 'POR') { p.x = clamp(p.x, F.x0 + 2, F.x0 + BOX_D); p.y = clamp(p.y, CY - BOX_W / 2, CY + BOX_W / 2); }
    if (inp.shoot) p.charge = Math.min(1, p.charge + dt / 0.65);
    if (inp.shootR && (p.charge > 0 || inp.shootP)) {
      const dG = Math.abs(oppGoalX(0) - p.x);
      if (dG < 230) shoot(p, Math.max(0.25, p.charge), clamp(inp.y, -1, 1) || (p.y < CY ? -0.3 : 0.3));
      else { kick(p, p.fx * 230, p.fy * 230 + inp.y * 60, 90); SFX.shot(); }
      p.charge = 0;
    }
    if (inp.passP) { const dx = inp.x || inp.y ? inp.x : p.fx, dy = inp.x || inp.y ? inp.y : p.fy; const t = humanPassTarget(p, dx, dy); if (t) passTo(p, t); }
  } else {
    p.charge = 0;
    if (inp.shootP) tackle(p);
    if (inp.passP || inp.swP) switchCtrl();
  }
}
function switchCtrl() {
  const b = M.ball; let best = null, bd = 1e9;
  for (const p of M.players) { if (p.team !== 0 || p === M.ctrl || p.role === 'POR') continue; const d = hyp(p.x - b.x, p.y - b.y); if (d < bd) { bd = d; best = p; } }
  if (best) { M.ctrl = best; SFX.menu(); updHud(); }
}
function autoCtrl() {
  const b = M.ball;
  if (b.owner && b.owner.team === 0) { if (M.ctrl !== b.owner) { M.ctrl = b.owner; updHud(); } return; }
  if (M.passTo && M.passTo.team === 0 && M.passT > 0 && !b.owner) { if (M.ctrl !== M.passTo && M.passTo.role !== 'POR') { M.ctrl = M.passTo; updHud(); } return; }
  if (M.autoT > 0) return;
  const n = nearestTo(0, b.x + b.vx * 0.2, b.y + b.vy * 0.2, true);
  if (n && n !== M.ctrl && (!M.ctrl || hyp(M.ctrl.x - b.x, M.ctrl.y - b.y) > hyp(n.x - b.x, n.y - b.y) + 14)) { M.ctrl = n; M.autoT = 0.5; updHud(); }
}
function updatePlayers(dt) {
  const b = M.ball;
  M.autoT = (M.autoT || 0) - dt; M.passT = (M.passT || 0) - dt; if (M.passT <= 0) M.passTo = null;
  autoCtrl();
  const ranks = [teamRanks(0), teamRanks(1)];
  for (const p of M.players) {
    p.cool -= dt; p.slide = Math.max(0, p.slide - dt); p.dive = Math.max(0, p.dive - dt);
    if (p.stun > 0) { p.stun -= dt; p.vx *= 0.85; p.vy *= 0.85; }
    else if (p.slide > 0) { /* deslizando */ }
    else if (p.dive > 0) { p.vx *= 0.9; p.vy = p.diveY; }
    else if (!G.autoplay && p === M.ctrl && p.team === 0 && (p.role !== 'POR' || b.owner === p)) humanCtrl(p, dt);
    else if (p.role === 'POR') gkAI(p, dt);
    else if (b.owner === p) aiOwner(p, dt);
    else aiOff(p, dt, ranks[p.team]);
    if (p.slide > 0) { p.vx = p.fx * 120; p.vy = p.fy * 120; }
    p.x += p.vx * dt; p.y += p.vy * dt;
    const sp = hyp(p.vx, p.vy);
    if (sp > 6 && p.dive <= 0) { p.fx = p.vx / sp; p.fy = p.vy / sp; p.anim += dt * sp / 26; }
    p.x = clamp(p.x, F.x0 - 14, F.x1 + 14); p.y = clamp(p.y, F.y0 - 12, F.y1 + 10);
    if (b.owner === p) { p.x = clamp(p.x, F.x0 + 3, F.x1 - 3); p.y = clamp(p.y, F.y0 + 2, F.y1 - 2); }
  }
  // separación
  const P = M.players;
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
    const a = P[i], c = P[j], dx = c.x - a.x, dy = c.y - a.y, d = hyp(dx, dy);
    if (d < 7 && d > 0.01) { const k = (7 - d) / d * 0.5; a.x -= dx * k; a.y -= dy * k; c.x += dx * k; c.y += dy * k; }
  }
}
function updateBall(dt) {
  const b = M.ball; b.noTakeT -= dt;
  if (b.owner) {
    const o = b.owner; b.x = o.x + o.fx * 5; b.y = o.y + o.fy * 3 + 0.5; b.z = 0; b.vx = o.vx; b.vy = o.vy; b.vz = 0;
    return;
  }
  b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt; b.vz -= 300 * dt;
  if (b.z <= 0) { b.z = 0; if (b.vz < -35) b.vz = -b.vz * 0.45; else b.vz = 0; }
  const fr = Math.exp(-(b.z > 0 ? 0.25 : 1.25) * dt); b.vx *= fr; b.vy *= fr;
  const s = hyp(b.vx, b.vy); if (s < 5 && b.z === 0) { b.vx = b.vy = 0; }
  if (s < 120) b.shot = false;
  // porteros
  for (const p of M.players) {
    if (p.role !== 'POR' || !b.shot || b.gkCheck || b.last && b.last.team === p.team) continue;
    const reach = 12 + p.st.gk * 1.1, d = hyp(b.x - p.x, b.y - (p.y - 4));
    const dir = attackDir(p.team); if (b.vx * dir > 0) continue;
    if (d < reach && b.z < BAR_Z + 6) {
      b.gkCheck = true;
      const pr = clamp(0.38 + p.st.gk * 0.075 - (s - 220) / 700 - Math.abs(b.y - p.y) / 60, 0.08, 0.93);
      p.dive = 0.4; p.diveY = clamp((b.y - p.y) * 6, -90, 90);
      if (Math.random() < pr) {
        SFX.save();
        if (s < 255) { b.owner = p; b.shot = false; p.hold = 0; b.last = p; M.passTo = null; }
        else { b.vx = -b.vx * 0.35; b.vy = rand(-130, 130); b.vz = 50; b.shot = false; b.last = p; b.noTake = p; b.noTakeT = 0.4; }
      }
      return;
    }
  }
  // recoger balón
  let best = null, bd = 1e9;
  for (const p of M.players) {
    if (p.stun > 0 || (b.noTake === p && b.noTakeT > 0)) continue;
    if (p.role === 'POR' && b.shot && b.gkCheck) continue;
    const zl = p.role === 'POR' && p.dive > 0 ? 22 : 9;
    if (b.z > zl) continue;
    const d = hyp(p.x - b.x, p.y - b.y);
    if (d < (p.role === 'POR' ? 9 : 7) && d < bd) { bd = d; best = p; }
  }
  if (best) {
    if (b.shot && best.role !== 'POR' && b.last && b.last.team !== best.team && Math.random() < 0.55) {
      b.vx = -b.vx * 0.3 + rand(-40, 40); b.vy = rand(-80, 80); b.vz = 25; b.shot = false; b.last = best; b.noTake = best; b.noTakeT = 0.3; SFX.tackle();
    } else {
      b.owner = best; b.shot = false; b.last = best; best.hold = 0; best.passAfter = rand(0.8, 2.4); M.passTo = null;
      if (best.slide > 0) best.slide = 0;
    }
  }
}
function checkBounds() {
  const b = M.ball;
  if (b.x < F.x0 || b.x > F.x1) {
    const side = b.x < F.x0 ? 0 : 1; // portería del equipo 0 (izq) o 1 (der)
    const inMouth = b.y > GY0 && b.y < GY1 && b.z < BAR_Z;
    if (b.owner) { b.x = clamp(b.x, F.x0 + 1, F.x1 - 1); return; }
    if (inMouth) { goal(side === 0 ? 1 : 0); return; }
    if (Math.abs(b.y - GY0) < 3 || Math.abs(b.y - GY1) < 3) { if (b.z < BAR_Z + 2) { b.vx = -b.vx * 0.5; b.x = side ? F.x1 - 1 : F.x0 + 1; SFX.post(); return; } }
    const defTeam = side === 0 ? 0 : 1;
    if (b.last && b.last.team === defTeam) restart(1 - defTeam, side ? F.x1 - 1 : F.x0 + 1, b.y < CY ? F.y0 + 1 : F.y1 - 1, 'corner');
    else restart(defTeam, side ? F.x1 - 18 : F.x0 + 18, CY, 'saque');
    return;
  }
  if (b.y < F.y0 - 1 || b.y > F.y1 + 1) {
    const team = b.last ? 1 - b.last.team : 0;
    restart(team, clamp(b.x, F.x0 + 4, F.x1 - 4), b.y < F.y0 ? F.y0 : F.y1, 'banda');
  }
}
function restart(team, x, y, type) {
  const b = M.ball;
  Object.assign(b, {x, y, z: 0, vx: 0, vy: 0, vz: 0, shot: false, noTake: null});
  let taker = type === 'saque' ? M.players.find(p => p.team === team && p.role === 'POR') : nearestTo(team, x, y, true);
  const out = type === 'banda' ? (y < CY ? -1 : 1) : 0, sideX = type === 'corner' ? (x < CX ? -1 : 1) : 0;
  taker.x = x + sideX * 4 - (type === 'saque' ? attackDir(team) * 3 : 0); taker.y = y + out * 4;
  taker.fx = type === 'banda' ? attackDir(team) * 0.5 : type === 'corner' ? -sideX : attackDir(team); taker.fy = type === 'banda' ? -out : type === 'corner' ? (y < CY ? 1 : -1) : 0;
  const m = hyp(taker.fx, taker.fy); taker.fx /= m; taker.fy /= m;
  taker.vx = taker.vy = 0; b.owner = taker; taker.hold = 0; taker.passAfter = 0.5;
  for (const p of M.players) if (p.team !== team && hyp(p.x - x, p.y - y) < 22) { const d = hyp(p.x - x, p.y - y) || 1; p.x = x + (p.x - x) / d * 24; p.y = clamp(y + (p.y - y) / d * 24, F.y0 + 2, F.y1 - 2); }
  if (team === 0) M.ctrl = taker;
  M.state = 'restart'; M.stateT = 0; updHud();
  showMsg({banda: 'SAQUE DE BANDA', corner: 'CÓRNER', saque: 'SAQUE DE PUERTA'}[type], '', 0.9);
}
function goal(team) {
  const b = M.ball; M.score[team]++; M.concede = 1 - team; M.state = 'goal'; M.stateT = 0; b.owner = null; b.vx *= 0.3; b.vy *= 0.3;
  let who = b.last, txtSub = '';
  if (!who || who.team !== team) who = M.lastShot && M.lastShot.p.team === team && M.t - M.lastShot.t < 4 ? M.lastShot.p : who;
  if (team === 0) {
    if (who && who.team === 0) { M.scorers.push(who.data.name); txtSub = `<img class="px" src="${faceURL(who.data)}" alt="">#${who.data.n} ${esc(who.data.name)}`; }
    else { M.scorers.push('P.P.'); txtSub = 'GOL EN PROPIA PUERTA'; }
    showMsg('¡GOOOL!', txtSub, 2.6);
  } else {
    M.oppScorers.push(who && who.team === 1 ? who.data.name : 'P.P.');
    showMsg('GOL', esc(M.opp.name), 2.6);
  }
  SFX.goal(); M.shake = 0.5; updHud();
}
function stepMatch(dt) {
  if (!M || G.paused) return;
  M.stateT += dt; M.shake = Math.max(0, M.shake - dt);
  if (M.msgT > 0) { M.msgT -= dt; if (M.msgT <= 0) $('#banner').style.display = 'none'; }
  switch (M.state) {
    case 'kickoff':
      if (M.stateT > 1.1) { M.state = 'play'; SFX.whistle(); }
      break;
    case 'restart':
      if (M.stateT > 0.8) M.state = 'play';
      break;
    case 'play':
      M.t += dt;
      updatePlayers(dt); updateBall(dt); checkBounds();
      if (M.state === 'play') {
        if (M.half === 1 && M.t >= M.len / 2) { M.state = 'half'; M.stateT = 0; SFX.whistle(2); showMsg('DESCANSO', `${M.score[0]} - ${M.score[1]}`, 2.4); }
        else if (M.t >= M.len) { M.state = 'end'; M.stateT = 0; SFX.whistle(3); showMsg('FINAL', `${M.score[0]} - ${M.score[1]}`, 2.6); }
      }
      updHudTime();
      break;
    case 'goal':
      updateBall(dt); for (const p of M.players) { p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx * dt; p.y += p.vy * dt; }
      { const bx = M.ball.x; if (bx < F.x0 - GDEP + 2) { M.ball.x = F.x0 - GDEP + 2; M.ball.vx = 0; } if (bx > F.x1 + GDEP - 2) { M.ball.x = F.x1 + GDEP - 2; M.ball.vx = 0; } }
      if (M.stateT > 2.8) { if (M.t >= M.len) { M.state = 'end'; M.stateT = 0; SFX.whistle(3); showMsg('FINAL', `${M.score[0]} - ${M.score[1]}`, 2.6); } else kickoff(M.concede); }
      break;
    case 'half':
      if (M.stateT > 2.6) { M.half = 2; kickoff(1); }
      break;
    case 'end':
      if (M.stateT > 2.8) { M.state = 'done'; finishMatch(); }
      break;
  }
}
// ---------- RENDER ----------
const cv = $('#cv'), g = cv.getContext('2d');
g.imageSmoothingEnabled = false;
function fit() {
  const app = $('#app').getBoundingClientRect();
  const sc = Math.max(1, Math.min(app.width / VW, app.height / VH));
  const s = sc >= 2 ? Math.floor(sc * 2) / 2 : sc;
  cv.style.width = Math.floor(VW * s) + 'px'; cv.style.height = Math.floor(VH * s) + 'px';
  const portrait = app.height > app.width;
  $('#stage').style.alignItems = portrait && G.mode !== 'menu' ? 'flex-start' : 'center';
  $('#stage').style.paddingTop = portrait && G.mode !== 'menu' ? '70px' : '0';
}
addEventListener('resize', fit);
function drawPlayer(p, cx, cy) {
  const x = Math.round(p.x - cx), y = Math.round(p.y - cy), k = p.kit, gk = p.role === 'POR';
  const shirt = gk ? k.gk : k.s, shirt2 = gk ? k.gk : k.s2, pat = gk ? 'plain' : k.pat, shorts = gk ? k.gksh : k.sh, socks = gk ? k.gk : k.so;
  g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(x - 4, y - 1, 9, 2);
  if (p.slide > 0 || p.dive > 0 || p.stun > 0.3) {
    const d = p.dive > 0 ? (p.diveY < 0 ? -1 : 1) : 0;
    if (p.dive > 0) { // portero estirado (vertical en pantalla)
      g.fillStyle = shirt; g.fillRect(x - 2, y - 12 + d * 3, 5, 9); g.fillStyle = p.look.skin; g.fillRect(x - 1, d < 0 ? y - 16 : y - 3, 3, 3); g.fillRect(x - 1, d < 0 ? y - 19 : y + 0, 3, 3);
      g.fillStyle = shorts; g.fillRect(x - 2, d < 0 ? y - 3 : y - 13, 5, 2);
      return;
    }
    const f = p.fx >= 0 ? 1 : -1;
    g.fillStyle = socks; g.fillRect(x + f * 2 - (f < 0 ? 4 : 0), y - 3, 5, 2);
    g.fillStyle = shorts; g.fillRect(x - 1, y - 4, 3, 3);
    g.fillStyle = shirt; g.fillRect(x - f * 5 - (f > 0 ? 0 : 4), y - 5, 5, 4);
    g.fillStyle = p.look.skin; g.fillRect(x - f * 9 - (f > 0 ? 0 : 3), y - 6, 3, 3);
    g.fillStyle = p.look.hair; g.fillRect(x - f * 10 - (f > 0 ? 0 : 1), y - 6, 1, 3);
    return;
  }
  const moving = hyp(p.vx, p.vy) > 8, fr = moving ? Math.floor(p.anim * 4) % 4 : 0;
  const lo = [0, 1, 0, -1][fr], flip = p.fx < 0;
  // piernas
  g.fillStyle = socks; g.fillRect(x - 3 + lo, y - 4, 2, 3); g.fillRect(x + 1 - lo, y - 4, 2, 3);
  g.fillStyle = '#1a1a1a'; g.fillRect(x - 3 + lo, y - 1, 2, 1); g.fillRect(x + 1 - lo, y - 1, 2, 1);
  g.fillStyle = p.look.skin; g.fillRect(x - 3 + lo, y - 5, 2, 1); g.fillRect(x + 1 - lo, y - 5, 2, 1);
  // pantalón
  g.fillStyle = shorts; g.fillRect(x - 3, y - 7, 6, 2);
  // camiseta
  for (let c = 0; c < 6; c++) for (let r = 0; r < 5; r++) {
    let col = shirt;
    if (pat === 'stripes' && c % 2) col = shirt2; else if (pat === 'hoops' && r % 2) col = shirt2; else if (pat === 'half' && c >= 3) col = shirt2;
    g.fillStyle = col; g.fillRect(x - 3 + c, y - 12 + r, 1, 1);
  }
  // brazos
  const sw = moving ? [0, 1, 0, -1][fr] : 0;
  g.fillStyle = shirt; g.fillRect(x - 4, y - 12, 1, 2); g.fillRect(x + 3, y - 12, 1, 2);
  g.fillStyle = gk ? '#f2f2f2' : p.look.skin; g.fillRect(x - 4, y - 10 + sw, 1, 2); g.fillRect(x + 3, y - 10 - sw, 1, 2);
  // cabeza
  g.fillStyle = p.look.skin; g.fillRect(x - 2, y - 16, 4, 4);
  g.fillStyle = p.look.hair; g.fillRect(x - 2, y - 17, 4, 2); g.fillRect(flip ? x + 1 : x - 2, y - 16, 1, 2);
  if (Math.abs(p.fy) < 0.85 || p.fy > 0) { g.fillStyle = '#1a1a1a'; g.fillRect(flip ? x - 2 : x + 1, y - 15, 1, 1); }
}
function render() {
  if (!M) return;
  const b = M.ball, cam = M.cam;
  const tx = clamp(b.x - VW / 2 + b.vx * 0.15, 0, FW - VW), ty = clamp(b.y - b.z - VH / 2, 0, FH - VH);
  cam.x += (tx - cam.x) * 0.12; cam.y += (ty - cam.y) * 0.12;
  let cx = Math.round(cam.x), cy = Math.round(cam.y);
  if (M.shake > 0) { cx += Math.round(rand(-2, 2)); cy += Math.round(rand(-2, 2)); }
  g.drawImage(fieldCv, -cx, -cy);
  const list = M.players.slice().sort((a, c) => a.y - c.y);
  // sombra balón
  const bx = Math.round(b.x - cx), by = Math.round(b.y - cy);
  g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(bx - 1, by, 3, 1);
  let ballDrawn = false;
  const drawBall = () => {
    const zz = Math.round(b.z), fr = Math.floor((Math.abs(b.x) + Math.abs(b.y)) / 4) % 2;
    g.fillStyle = '#ffffff'; g.fillRect(bx - 1, by - 2 - zz, 3, 3); g.fillRect(bx - 2, by - 1 - zz, 5, 1); g.fillRect(bx, by - 3 - zz, 1, 5);
    g.fillStyle = '#1a1a1a'; g.fillRect(bx - fr, by - 1 - zz, 1, 1); g.fillRect(bx + 1 - fr, by - 2 - zz + fr, 1, 1);
    ballDrawn = true;
  };
  for (const p of list) {
    if (!ballDrawn && b.y + (b.z > 2 ? 6 : 0) < p.y) drawBall();
    drawPlayer(p, cx, cy);
  }
  if (!ballDrawn) drawBall();
  // postes delanteros (larguero) en las porterías
  for (const s of [0, 1]) {
    const gx = (s ? F.x1 : F.x0) - cx; g.fillStyle = '#ffffff';
    g.fillRect(gx - (s ? 0 : 1), GY0 - cy - BAR_Z / 2, 2, GOAL_W + BAR_Z / 2); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(gx - (s ? 0 : 1) + 2, GY0 - cy - BAR_Z / 2 + 1, 1, GOAL_W + BAR_Z / 2);
  }
  // jugador controlado
  const c = M.ctrl;
  if (c && M.state !== 'goal') {
    const x = Math.round(c.x - cx), y = Math.round(c.y - cy);
    const bob = Math.floor(performance.now() / 180) % 2;
    g.fillStyle = '#f2c14e'; g.fillRect(x - 2, y - 23 - bob, 5, 1); g.fillRect(x - 1, y - 22 - bob, 3, 1); g.fillRect(x, y - 21 - bob, 1, 1);
    const nm = c.data.name; const w = txtW(nm);
    g.fillStyle = 'rgba(20,24,42,.7)'; g.fillRect(x - Math.floor(w / 2) - 2, y - 31 - bob, w + 4, 7);
    txt(g, nm, x - Math.floor(w / 2), y - 30 - bob, '#ffffff');
    if (c.charge > 0) { g.fillStyle = '#14182a'; g.fillRect(x - 8, y + 2, 17, 4); g.fillStyle = c.charge > 0.85 ? '#ff4040' : '#f2c14e'; g.fillRect(x - 7, y + 3, Math.round(15 * c.charge), 2); }
    if (c.stam < 0.98) { g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(x - 6, y + 7, 13, 2); g.fillStyle = '#4fd1ff'; g.fillRect(x - 6, y + 7, Math.round(13 * c.stam), 2); }
  }
  // flecha de balón fuera de pantalla
  if (b.y - b.z - cy < 2) { g.fillStyle = '#fff'; g.fillRect(bx - 1, 2, 3, 1); g.fillRect(bx, 1, 1, 1); }
  // radar
  const rw = 60, rh = 38, rx = (VW - rw) / 2, ry = VH - rh - 3;
  g.fillStyle = 'rgba(20,24,42,.55)'; g.fillRect(rx, ry, rw, rh); g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(rx + rw / 2, ry, 1, rh);
  for (const p of M.players) { g.fillStyle = p === M.ctrl ? '#f2c14e' : p.team === 0 ? '#ff4b5c' : (M.opp.kit.s === '#ffffff' || M.opp.kit.s === '#f2c81e' ? '#4fd1ff' : '#ffffff'); g.fillRect(rx + Math.round((p.x - F.x0) / FL * (rw - 2)), ry + Math.round((p.y - F.y0) / FHt * (rh - 2)), 2, 2); }
  g.fillStyle = '#ffff66'; g.fillRect(rx + Math.round((b.x - F.x0) / FL * (rw - 2)), ry + Math.round((b.y - F.y0) / FHt * (rh - 2)), 1, 1);
  if (G.paused) { g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(0, 0, VW, VH); }
}
// HUD
function showHUD(on) {
  $('#hud').style.display = on ? 'block' : 'none';
  $('#touch').style.display = on && isTouch ? 'block' : 'none';
  fit();
}
function updHud() {
  if (!M) return;
  $('#sHome').src = TEAMS.BAR.crestURL; $('#sAway').src = M.opp.crestURL;
  $('#sHomeN').textContent = 'BAR'; $('#sAwayN').textContent = M.opp.short;
  $('#sSc').textContent = `${M.score[0]} - ${M.score[1]}`;
  const c = M.ctrl;
  if (c) { $('#ccImg').src = faceURL(c.data); $('#ccNum').textContent = '#' + c.data.n; $('#ccName').textContent = noAcc(c.data.name); }
  const own = M.ball.owner === c;
  $('#bA').textContent = own ? 'CHUTAR' : 'ENTRADA'; $('#bB').textContent = own ? 'PASE' : 'CAMBIO';
  updHudTime();
}
let lastMin = -1;
function updHudTime() {
  const m = Math.min(50, Math.floor(M.t / M.len * 50));
  if (m !== lastMin) { lastMin = m; $('#sTm').textContent = m + "'"; }
  const own = M.ball.owner === M.ctrl, want = own ? 'CHUTAR' : 'ENTRADA';
  if ($('#bA').textContent !== want) { $('#bA').textContent = want; $('#bB').textContent = own ? 'PASE' : 'CAMBIO'; }
}
function showMsg(big, sub, t) {
  $('#bnBig').textContent = noAcc(big); $('#bnSub').innerHTML = noAcc(sub || ''); const bn = $('#banner');
  bn.style.display = 'block'; const el = $('#bnBig'); el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  M.msgT = t;
}
function togglePause() {
  if (G.mode !== 'match' || !M || M.state === 'done') return;
  G.paused = !G.paused;
  if (G.paused) {
    screen(`<div class="wrap"><div class="menu" style="margin-top:12vh">
      <h2 style="text-align:center;color:var(--gold);font-size:18px;text-shadow:3px 3px 0 #000;margin-bottom:10px">PAUSA</h2>
      <button class="btn red" data-a="resume">Continuar</button>
      <button class="btn" data-a="sound">Sonido: ${settings.sound ? 'SÍ' : 'NO'}</button>
      <button class="btn" data-a="help">Controles</button>
      <button class="btn" data-a="quit">Abandonar partido</button></div></div>`, {
      resume: () => togglePause(), sound: () => { settings.sound = !settings.sound; store.set('settings', settings); G.paused = false; togglePause(); },
      help: () => { screen(helpHTML(true), {back: () => { G.paused = false; togglePause(); }}); },
      quit: () => { G.paused = false; M = null; G.mode = 'menu'; showHUD(false); mainMenu(); }}, true);
  } else { hideScreen(); }
}
// ---------- FIN DE PARTIDO ----------
function finishMatch() {
  showHUD(false); $('#banner').style.display = 'none';
  const res = {gf: M.score[0], ga: M.score[1], scorers: M.scorers.slice(), oppScorers: M.oppScorers.slice(), opp: M.opp.id};
  const ctx = M.ctx; G.mode = 'menu';
  if (ctx.type === 'copa' && res.gf === res.ga) { penalties(res, ctx); return; }
  ctx.onEnd(res);
}
function resultScreen(res, title, onCont, extra = '') {
  const won = res.gf > res.ga, draw = res.gf === res.ga, opp = TEAMS[res.opp];
  const sc = {}; res.scorers.forEach(n => sc[n] = (sc[n] || 0) + 1);
  const scHTML = Object.keys(sc).length ? Object.entries(sc).map(([n, c]) => { const pl = PLAYERS.find(p => p.name === n); return `<div>⚽ ${pl ? '#' + pl.n + ' ' : ''}${esc(n)}${c > 1 ? ' x' + c : ''}</div>`; }).join('') : '<div class="muted">Sin goles</div>';
  const pens = res.pens ? `<div style="font-size:11px;margin-top:-6px">Penaltis: ${res.pens[0]} - ${res.pens[1]}</div>` : '';
  screen(`<div class="wrap res"><div class="hdr" style="justify-content:center"><h2>${esc(title)}</h2></div>
    <div class="vs"><div><img class="px" src="${TEAMS.BAR.crestURL}" alt=""><br>BARCELONETA</div><div class="big">${res.gf}-${res.ga}</div><div><img class="px" src="${opp.crestURL}" alt=""><br>${esc(opp.name)}</div></div>
    ${pens}
    <h2 style="font-size:14px;margin:16px 0;color:${won || (res.pens && res.pens[0] > res.pens[1]) ? 'var(--gold)' : draw ? '#fff' : '#ff8a8a'}">${won ? '¡VICTORIA MARINER!' : draw ? (res.pens ? (res.pens[0] > res.pens[1] ? '¡PASAMOS EN PENALTIS!' : 'ELIMINADOS EN PENALTIS') : 'EMPATE') : 'DERROTA... ¡A SEGUIR!'}</h2>
    <div class="panel" style="max-width:420px;margin:0 auto;text-align:left"><h3>Goles del Barceloneta</h3><div class="list">${scHTML}</div></div>
    ${extra}
    <div class="row"><button class="btn red" data-a="cont">Continuar</button></div></div>`, {cont: onCont});
  if (won || (res.pens && res.pens[0] > res.pens[1])) SFX.goal(); startMusic();
}

// ---------- PENALTIS ----------
let PEN = null;
function penalties(res, ctx) {
  G.mode = 'pens'; hideScreen(); showHUD(false); $('#touch').style.display = isTouch ? 'block' : 'none';
  $('#bA').textContent = 'CHUTAR'; $('#bB').textContent = '-';
  const opp = TEAMS[res.opp];
  PEN = {res, ctx, opp, kicks: [[], []], turn: 0, phase: 'aim', t: 0, cursor: 0, gkZone: 0, ball: null, msg: '', msgT: 0,
    shooters: G.lineup.slice(1).concat(G.lineup.slice(1)).map(byNum), gk: byNum(G.lineup[0])};
  fit();
}
function penZone(x) { return x < 130 ? -1 : x > 190 ? 1 : 0; }
function penStep(dt) {
  const P = PEN; P.t += dt; if (P.msgT > 0) P.msgT -= dt;
  const n0 = P.kicks[0].length, n1 = P.kicks[1].length, s0 = P.kicks[0].filter(Boolean).length, s1 = P.kicks[1].filter(Boolean).length;
  if (P.phase === 'aim') {
    if (P.turn === 0) {
      P.cursor = 160 + Math.sin(P.t * 2.6) * 102;
      if (inp.shootP) { const x = P.cursor; P.target = x; P.gkZone = [-1, 0, 1][Math.floor(Math.random() * 3)]; P.phase = 'fly'; P.t = 0; SFX.shot(); }
    } else {
      P.choice = inp.x < -0.3 ? -1 : inp.x > 0.3 ? 1 : 0;
      if (inp.shootP || P.t > 2.2) {
        const z = [-1, 0, 1][Math.floor(Math.random() * 3)];
        P.target = 160 + z * 62 + rand(-14, 14); if (Math.random() < 0.08) P.target = z < 0 ? 64 : 256;
        P.gkZone = P.choice; P.phase = 'fly'; P.t = 0; SFX.shot();
      }
    }
  } else if (P.phase === 'fly') {
    if (P.t > 0.45) {
      const x = P.target, wide = x < 72 || x > 248;
      let scored;
      if (wide) scored = false;
      else if (penZone(x) === P.gkZone) scored = Math.random() > (P.turn === 0 ? 0.72 : 0.62 + (P.gk.gk || 5) * 0.02);
      else scored = true;
      P.kicks[P.turn].push(scored); P.phase = 'result'; P.t = 0;
      P.msg = scored ? '¡GOL!' : wide ? '¡FUERA!' : '¡PARADA!'; P.msgT = 1.3;
      scored ? (P.turn === 0 ? SFX.goal() : SFX.tackle()) : SFX.save();
    }
  } else if (P.phase === 'result' && P.t > 1.4) {
    const a = P.kicks[0], b = P.kicks[1], sa = a.filter(Boolean).length, sb = b.filter(Boolean).length;
    let done = false;
    if (a.length <= 5 && b.length <= 5) {
      const remA = 5 - a.length, remB = 5 - b.length;
      if (sa > sb + remB || sb > sa + remA) done = true;
      if (a.length === 5 && b.length === 5 && sa !== sb) done = true;
    } else if (a.length === b.length && sa !== sb) done = true;
    if (done) { P.phase = 'done'; const r = P.res; r.pens = [sa, sb]; setTimeout(() => { G.mode = 'menu'; $('#touch').style.display = 'none'; P.ctx.onEnd(r); PEN = null; }, 900); return; }
    P.turn = 1 - P.turn; P.phase = 'aim'; P.t = 0;
  }
}
function penRender() {
  const P = PEN; if (!P) return;
  g.fillStyle = '#2a6f35'; g.fillRect(0, 0, VW, VH);
  for (let x = 0, i = 0; x < VW; x += 40, i++) { g.fillStyle = i % 2 ? '#3f9f47' : '#47ab4f'; g.fillRect(x, 60, 40, 120); }
  g.fillStyle = '#14182a'; g.fillRect(0, 0, VW, 30);
  txt(g, 'TANDA DE PENALTIS', 160 - txtW('TANDA DE PENALTIS', 2) / 2, 4, '#f2c14e', 2);
  // marcador de tandas
  const row = (y, arr, label) => { txt(g, label, 8, y, '#fff'); for (let i = 0; i < Math.max(5, arr.length); i++) { const v = arr[i]; g.fillStyle = v === undefined ? '#555' : v ? '#3ddc5a' : '#e33'; g.fillRect(40 + i * 7, y, 5, 5); } };
  row(17, P.kicks[0], 'BAR'); txt(g, P.opp.short, 200, 17, '#fff'); for (let i = 0; i < Math.max(5, P.kicks[1].length); i++) { const v = P.kicks[1][i]; g.fillStyle = v === undefined ? '#555' : v ? '#3ddc5a' : '#e33'; g.fillRect(220 + i * 7, 17, 5, 5); }
  // portería
  g.fillStyle = 'rgba(240,240,240,.35)'; for (let x = 72; x <= 248; x += 6) g.fillRect(x, 50, 1, 56); for (let y = 50; y < 106; y += 6) g.fillRect(72, y, 176, 1);
  g.fillStyle = '#fff'; g.fillRect(70, 48, 180, 3); g.fillRect(70, 48, 3, 60); g.fillRect(247, 48, 3, 60);
  g.fillStyle = '#f4f4ee'; g.fillRect(0, 107, VW, 1);
  // portero
  const gkTeam = P.turn === 0 ? 1 : 0;
  const kit = gkTeam === 0 ? TEAMS.BAR.kit : P.opp.kit;
  const look = gkTeam === 0 ? lookOf(P.gk) : {skin: '#e3b28a', hair: '#2a211c'};
  let gx = 160, lean = 0;
  if (P.phase !== 'aim') { const k = Math.min(1, P.t / 0.3); gx = 160 + P.gkZone * 60 * k; lean = P.gkZone * k; }
  const S = 3; const px = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(gx + x * S, 104 + y * S - (Math.abs(lean) > 0.5 ? -4 : 0), w * S, h * S); };
  if (Math.abs(lean) > 0.5) {
    const d = Math.sign(lean);
    px(-6, -6, 12, 4, kit.gk); px(d > 0 ? 6 : -9, -6, 3, 3, look.skin); px(d > 0 ? -10 : 6, -5, 4, 2, kit.gksh);
    px(d > 0 ? 9 : -12, -6, 3, 2, '#f2f2f2');
  } else {
    px(-2, -16, 4, 4, look.skin); px(-2, -17, 4, 2, look.hair); px(-3, -12, 6, 5, kit.gk); px(-5, -13, 2, 3, '#f2f2f2'); px(3, -13, 2, 3, '#f2f2f2');
    px(-3, -7, 6, 2, kit.gksh); px(-3, -5, 2, 4, kit.gk); px(1, -5, 2, 4, kit.gk);
  }
  // balón
  let bx = 160, by = 160, bs = 6;
  if (P.phase === 'fly' || P.phase === 'result') {
    const k = Math.min(1, P.t / 0.45), saved = P.phase === 'result' && !P.kicks[P.turn][P.kicks[P.turn].length - 1];
    const ty = 70 + (Math.abs(P.target - 160) / 100) * 20;
    bx = 160 + (P.target - 160) * (P.phase === 'result' ? 1 : k); by = 160 + (ty - 160) * (P.phase === 'result' ? 1 : k); bs = 6 - 3 * k;
    if (saved && P.phase === 'result') { by += P.t * 60; }
  }
  g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(bx - bs / 2, 166, bs, 2);
  g.fillStyle = '#fff'; g.fillRect(Math.round(bx - bs / 2), Math.round(by - bs / 2), Math.round(bs), Math.round(bs));
  g.fillStyle = '#1a1a1a'; g.fillRect(Math.round(bx - 1), Math.round(by - 1), 2, 2);
  // tirador
  const sh = P.turn === 0 ? P.shooters[P.kicks[0].length % P.shooters.length] : null;
  if (P.phase === 'aim') {
    g.fillStyle = 'rgba(20,24,42,.8)'; g.fillRect(0, 169, VW, 11);
    if (P.turn === 0) {
      g.fillStyle = '#f2c14e'; const x = Math.round(P.cursor); g.fillRect(x - 5, 76, 11, 1); g.fillRect(x, 71, 1, 11);
      const t = `LANZA ${sh.name} - PULSA CHUTAR`; txt(g, t, 160 - txtW(t) / 2, 172, '#fff');
    } else {
      const t = `PARA ${P.gk.name}: ELIGE LADO Y PULSA`; txt(g, t, 160 - txtW(t) / 2, 172, '#fff');
      g.fillStyle = '#f2c14e'; const ax = 160 + (P.choice || 0) * 60; g.fillRect(ax - 3, 112, 7, 2); g.fillRect(ax - 1, 114, 3, 2);
    }
  }
  if (P.msgT > 0) { const w = txtW(P.msg, 3); g.fillStyle = 'rgba(20,24,42,.8)'; g.fillRect(160 - w / 2 - 6, 118, w + 12, 24); txt(g, P.msg, 160 - w / 2, 123, '#f2c14e', 3); }
}

// ---------- BUCLE ----------
let last = performance.now(), acc = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000); last = now; acc += dt;
  pollInput();
  while (acc >= 1 / 60) {
    if (G.mode === 'match') stepMatch(1 / 60);
    else if (G.mode === 'pens' && PEN) penStep(1 / 60);
    acc -= 1 / 60;
    inp.shootP = inp.shootR = inp.passP = inp.swP = false;
  }
  if (G.mode === 'match') render();
  else if (G.mode === 'pens') penRender();
  else menuBg(now);
  requestAnimationFrame(frame);
}
// fondo animado en menús
let bgBalls = [];
function menuBg(now) {
  if (!fieldCv) return;
  const t = now / 1000, x = (Math.sin(t * 0.15) * 0.5 + 0.5) * (FW - VW), y = (Math.cos(t * 0.11) * 0.5 + 0.5) * (FH - VH);
  g.drawImage(fieldCv, -Math.round(x), -Math.round(y));
}

// ---------- PANTALLAS ----------
let screenActions = {};
function screen(html, actions = {}, clear = false) {
  const s = $('#screen'); s.innerHTML = noAcc(html); s.style.display = 'block'; s.className = clear ? 'clear' : ''; s.scrollTop = 0;
  screenActions = actions;
  const f = s.querySelector('.btn, button'); if (f && !isTouch) f.focus({preventScroll: true});
}
function hideScreen() { $('#screen').style.display = 'none'; $('#screen').innerHTML = ''; }
$('#screen').addEventListener('click', e => {
  const el = e.target.closest('[data-a]'); if (!el) return;
  const a = el.dataset.a, fn = screenActions[a]; ac();
  if (fn) { SFX.menu(); fn(el.dataset.v, el); }
});
function menuKey(e) {
  const s = $('#screen'); if (s.style.display === 'none') return;
  const btns = [...s.querySelectorAll('[data-a]')].filter(b => !b.disabled && b.offsetParent);
  if (!btns.length) return;
  let i = btns.indexOf(document.activeElement);
  if (['ArrowDown', 'ArrowRight'].includes(e.code)) { e.preventDefault(); btns[(i + 1) % btns.length].focus(); SFX.menu(); }
  if (['ArrowUp', 'ArrowLeft'].includes(e.code)) { e.preventDefault(); btns[(i - 1 + btns.length) % btns.length].focus(); SFX.menu(); }
  if (['KeyZ', 'KeyX', 'KeyJ'].includes(e.code) && i >= 0) { e.preventDefault(); btns[i].click(); }
  if (e.code === 'Escape' && screenActions.back) screenActions.back();
}
let gpMenuPrev = {}, gpMenuT = 0;
function gamepadMenu(gp) {
  const now = performance.now(), b = i => gp.buttons[i] && gp.buttons[i].pressed;
  const ay = gp.axes[1] || 0, ax = gp.axes[0] || 0;
  const dn = b(13) || ay > 0.5 || b(15) || ax > 0.5, up = b(12) || ay < -0.5 || b(14) || ax < -0.5;
  if ((dn || up) && now - gpMenuT > 220) { gpMenuT = now; menuKey({code: dn ? 'ArrowDown' : 'ArrowUp', preventDefault() {}}); }
  if (b(0) && !gpMenuPrev.a) { const el = document.activeElement; if (el && el.dataset && el.dataset.a) el.click(); }
  if (b(1) && !gpMenuPrev.b && screenActions.back) screenActions.back();
  gpMenuPrev = {a: b(0), b: b(1)};
}
function header(t, back = true) { return `<div class="hdr"><img class="px" src="${TEAMS.BAR.crestURL}" width="36" height="36" alt=""><h2>${t}</h2>${back ? '<button class="btn sm back" data-a="back">Volver</button>' : ''}</div>`; }

function titleScreen() {
  G.mode = 'menu'; showHUD(false);
  screen(`<div class="wrap title">
    <img class="px logo" src="escudos/barceloneta.png" alt="Escudo C.F. Barceloneta">
    <h1>MARINERS<br>FÚTBOL 16 BITS<span>SUB 12 A · 26/27</span></h1>
    <img class="px photo" src="img-equipo.png" alt="El equipo Sub 12 A en pixel art">
    <button class="btn red" data-a="start" style="font-size:14px;padding:16px 26px">Jugar</button>
    <div class="blink">SOM MARINERS</div>
    <p class="muted" style="margin-top:22px">Bruno TV Kids Football · C.F. Barceloneta</p></div>`,
    {start: () => { ac(); startMusic(); mainMenu(); }});
}
function mainMenu() {
  G.mode = 'menu'; showHUD(false); if (!musicTimer) startMusic();
  const lg = store.get('liga', null), cp = store.get('copa', null);
  screen(`<div class="wrap">${header('MARINERS FÚTBOL 16 BITS', false)}
    <div class="menu">
      <button class="btn red" data-a="libre">Partido libre<small>Elige rival y juega un amistoso</small></button>
      <button class="btn" data-a="liga">Liga ACDEA 26/27<small>${lg ? `Jornada ${Math.min(lg.j + 1, 18)} de 18` : '10 equipos · 18 jornadas'}</small></button>
      <button class="btn" data-a="copa">Copa Mariners<small>${cp ? (cp.champ ? 'Terminada' : cp.out ? 'Eliminados' : ['Cuartos de final', 'Semifinales', 'Final'][cp.round]) : 'Eliminatorias: cuartos, semis y final'}</small></button>
      <button class="btn" data-a="plantilla">Plantilla<small>Convocados, dorsales y fotos</small></button>
      <button class="btn" data-a="opciones">Opciones<small>${settings.dur} min · ${DIFF[settings.diff].name} · Sonido ${settings.sound ? 'sí' : 'no'}</small></button>
      <button class="btn" data-a="ayuda">Cómo se juega</button>
    </div></div>`, {
    libre: pickRival, liga: ligaScreen, copa: copaScreen, plantilla: plantillaScreen, opciones: opcionesScreen,
    ayuda: () => screen(helpHTML(), {back: mainMenu})});
}
function helpHTML(inMatch) {
  return `<div class="wrap">${inMatch ? '<div class="hdr"><h2>CONTROLES</h2><button class="btn sm back" data-a="back">Volver</button></div>' : header('CÓMO SE JUEGA')}
  <div class="panel"><h3>Teclado</h3><div class="keys">
    <b>←↑↓→</b> / <b>WASD</b> mover<br>
    <b>Z</b> / <b>J</b> / <b>ESPACIO</b> con balón: CHUTAR (mantén para más potencia y apunta con ↑↓) · sin balón: ENTRADA<br>
    <b>X</b> / <b>K</b> con balón: PASE (hacia donde apuntas) · sin balón: CAMBIAR JUGADOR<br>
    <b>SHIFT</b> sprint · <b>C</b> cambiar jugador · <b>ESC</b> / <b>P</b> pausa</div></div>
  <div class="panel"><h3>Móvil</h3><div class="keys">Joystick: toca y arrastra en la mitad izquierda.<br>Botón rojo: CHUTAR / ENTRADA · Azul: PASE / CAMBIO · Amarillo: SPRINT.<br>Mejor en horizontal. En iPhone: Compartir → Añadir a pantalla de inicio.</div></div>
  <div class="panel"><h3>Mando</h3><div class="keys">Stick / cruceta mover · A chutar/entrada · X o B pase/cambio · Y cambiar · RB/RT sprint · START pausa</div></div>
  <div class="panel"><h3>Reglas</h3><div class="muted">Fútbol 7: portero + 6. Dos partes de 25 minutos (el tiempo de juego real se cambia en Opciones). En la Copa, si hay empate se decide en una tanda de penaltis.</div></div></div>`;
}
function opcionesScreen() {
  const o = (k, v, label) => `<button class="btn ${settings[k] === v ? 'on' : ''}" data-a="set" data-v="${k}:${v}">${label}</button>`;
  screen(`<div class="wrap">${header('OPCIONES')}
    <div class="panel"><h3>Duración del partido (tiempo real)</h3><div class="opt">${[2, 4, 6, 8].map(m => o('dur', m, m + ' min')).join('')}</div></div>
    <div class="panel"><h3>Dificultad</h3><div class="opt">${DIFF.map((d, i) => o('diff', i, d.name)).join('')}</div></div>
    <div class="panel"><h3>Sonido</h3><div class="opt">${o('sound', true, 'Sí')}${o('sound', false, 'No')}</div></div>
    <div class="panel"><h3>Datos guardados</h3><div class="opt"><button class="btn" data-a="reset">Borrar liga, copa y fotos</button></div></div></div>`, {
    back: mainMenu,
    set: v => { const [k, val] = v.split(':'); settings[k] = k === 'sound' ? val === 'true' : Number(val); store.set('settings', settings); if (k === 'sound') { settings.sound ? startMusic() : stopMusic(); } opcionesScreen(); },
    reset: () => { if (confirm('¿Borrar la liga, la copa y la asignación de fotos?')) { store.del('liga'); store.del('copa'); store.del('caras'); store.del('lineup'); for (const k in faceMap) delete faceMap[k]; opcionesScreen(); } }});
}
function statBars(p) {
  const rows = p.pos === 'POR' ? [['POR', p.gk], ['VEL', p.pac], ['PAS', p.pas], ['DEF', p.def]] : [['VEL', p.pac], ['TIR', p.sho], ['PAS', p.pas], ['DEF', p.def]];
  return `<div class="bars">${rows.map(([l, v]) => `<span>${l}</span><div class="bar"><i style="width:${v * 10}%"></i></div>`).join('')}</div>`;
}
const POSN = {POR: 'Portero', DEF: 'Defensa', MED: 'Centrocampista', DEL: 'Delantero'};
function plantillaScreen() {
  const pl = PLAYERS.slice().sort((a, b) => a.n - b.n);
  screen(`<div class="wrap">${header('PLANTILLA · CONVOCADOS')}
    <p class="muted">Toca un jugador para elegir su foto. Las fotos salen de la foto del equipo de la web.</p>
    <div class="cards">${pl.map(p => `<button class="card ${p.inj ? 'out' : ''}" data-a="face" data-v="${p.n}">
      ${p.inj ? '<span class="inj">LESIÓN</span>' : ''}<img class="px" src="${faceURL(p)}" alt="">
      <div><div class="num">${p.n}</div><div class="nm">${esc(p.name)}</div><div class="pos">${POSN[p.pos]}</div>${statBars(p)}</div></button>`).join('')}</div></div>`,
    {back: mainMenu, face: v => facePicker(byNum(+v))});
}
function facePicker(p) {
  const cur = caraOf(p);
  let h = `<div class="wrap">${header('FOTO DE #' + p.n + ' ' + esc(p.name))}<div class="faces">`;
  for (let i = 1; i <= NUM_CARAS; i++) {
    const usedBy = PLAYERS.filter(q => q !== p && caraOf(q) === i).map(q => q.name).join(', ');
    h += `<button class="${cur === i ? 'on' : ''}" data-a="pick" data-v="${i}" title="${esc(usedBy)}"><img class="px" src="caras/cara-${String(i).padStart(2, '0')}.png" alt="Cara ${i}"></button>`;
  }
  h += `<button class="${!cur ? 'on' : ''}" data-a="pick" data-v="0"><img class="px" src="${genericFace(p)}" alt="Sin foto"></button></div>
    <p class="muted" style="margin-top:12px">Si una foto ya la usa otro jugador, se intercambian.</p></div>`;
  screen(h, {back: plantillaScreen, pick: v => {
    v = +v; const other = PLAYERS.find(q => q !== p && v && caraOf(q) === v);
    if (other) faceMap[other.name] = cur; faceMap[p.name] = v; store.set('caras', faceMap); SFX.ok(); plantillaScreen(); }});
}
function teamCard(id) { const t = TEAMS[id]; return `<button class="btn team" data-a="pick" data-v="${id}"><img class="px" src="${t.crestURL}" alt="">${esc(t.name)}<em>${t.comp === 'amistoso' ? 'Pretemporada' : 'Liga ACDEA'} · ${'★'.repeat(Math.max(1, Math.round((t.str - 35) / 11)))}</em></button>`; }
function pickRival() {
  screen(`<div class="wrap">${header('PARTIDO LIBRE · ELIGE RIVAL')}<div class="teams">${OPP_IDS.map(teamCard).join('')}</div></div>`,
    {back: mainMenu, pick: id => lineupScreen(id, {type: 'libre', label: 'AMISTOSO', onEnd: r => resultScreen(r, 'PARTIDO LIBRE', mainMenu)}, pickRival)});
}
// ----- alineación -----
G.lineup = (() => { const l = store.get('lineup', DEFAULT_LINEUP); return l.length === 7 && l.every(n => byNum(n) && !byNum(n).inj) ? l : DEFAULT_LINEUP.slice(); })();
function lineupScreen(oppId, ctx, back) {
  let sel = null;
  const draw = () => {
    const opp = TEAMS[oppId];
    const slots = FORM.map((f, i) => { const p = byNum(G.lineup[i]); return `<button class="slot ${sel === 's' + i ? 'sel' : ''}" style="left:${6 + f.u * 120}%;top:${f.v * 100}%" data-a="slot" data-v="${i}"><img class="px" src="${faceURL(p)}" alt="">${p.n} ${esc(p.name)}</button>`; }).join('');
    const bench = PLAYERS.filter(p => !G.lineup.includes(p.n)).sort((a, b) => a.n - b.n).map(p => `<button class="${p.inj ? 'out' : ''} ${sel === 'b' + p.n ? 'sel' : ''}" data-a="bench" data-v="${p.n}" ${p.inj ? 'disabled' : ''}><img class="px" src="${faceURL(p)}" alt="">${p.n} ${esc(p.name)} ${p.inj ? '· LESIÓN' : ''}</button>`).join('');
    screen(`<div class="wrap">${header('ALINEACIÓN')}
      <div class="panel" style="display:flex;align-items:center;gap:10px;justify-content:center;font-size:10px;flex-wrap:wrap">
        <img class="px" src="${TEAMS.BAR.crestURL}" width="32" height="32" alt="">BARCELONETA <span style="color:var(--gold)">VS</span> ${esc(opp.name)}<img class="px" src="${opp.crestURL}" width="32" height="32" alt="">
        <div class="muted" style="width:100%;text-align:center">${esc(ctx.label || '')}</div></div>
      <div class="pitch">${slots}</div>
      <p class="muted" style="text-align:center">Toca un titular y luego un suplente (u otro titular) para cambiarlos.</p>
      <div class="bench">${bench}</div>
      <div class="row"><button class="btn red" data-a="play" style="font-size:14px">¡A jugar!</button></div></div>`, {
      back,
      slot: v => { const k = 's' + v; if (sel && sel[0] === 's' && sel !== k) { const i = +sel.slice(1), j = +v; [G.lineup[i], G.lineup[j]] = [G.lineup[j], G.lineup[i]]; sel = null; }
        else if (sel && sel[0] === 'b') { G.lineup[+v] = +sel.slice(1); sel = null; } else sel = sel === k ? null : k; store.set('lineup', G.lineup); draw(); },
      bench: v => { if (sel && sel[0] === 's') { G.lineup[+sel.slice(1)] = +v; sel = null; } else sel = sel === 'b' + v ? null : 'b' + v; store.set('lineup', G.lineup); draw(); },
      play: () => { SFX.ok(); newMatch(oppId, G.lineup.slice(), ctx); }});
  };
  draw();
}
// ---------- LIGA ----------
function newLeague() {
  const ids = LEAGUE_IDS.slice(1).sort(() => Math.random() - 0.5); ids.unshift('BAR');
  const n = ids.length, rounds = [], arr = ids.slice();
  for (let r = 0; r < n - 1; r++) {
    const m = []; for (let i = 0; i < n / 2; i++) { const a = arr[i], b = arr[n - 1 - i]; m.push(r % 2 ? [b, a] : [a, b]); }
    rounds.push(m); arr.splice(1, 0, arr.pop());
  }
  const all = rounds.concat(rounds.map(r => r.map(([a, b]) => [b, a])));
  const tab = {}; LEAGUE_IDS.forEach(id => tab[id] = {pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0});
  const L = {rounds: all, j: 0, tab, res: [], goleadores: {}, last: null};
  store.set('liga', L); return L;
}
function addRes(L, a, b, ga, gb) {
  const A = L.tab[a], B = L.tab[b]; A.pj++; B.pj++; A.gf += ga; A.gc += gb; B.gf += gb; B.gc += ga;
  if (ga > gb) { A.g++; B.p++; } else if (ga < gb) { B.g++; A.p++; } else { A.e++; B.e++; }
}
function simScore(a, b) { const sa = TEAMS[a].str, sb = TEAMS[b].str; return [poisson(3.3 * Math.pow(sa / sb, 2.2)), poisson(3.3 * Math.pow(sb / sa, 2.2))]; }
function simScorers(n) {
  const pool = PLAYERS.filter(p => !p.inj && p.pos !== 'POR'), out = [];
  for (let i = 0; i < n; i++) { const tot = pool.reduce((s, p) => s + p.sho * p.sho, 0); let r = Math.random() * tot; for (const p of pool) { r -= p.sho * p.sho; if (r <= 0) { out.push(p.name); break; } } }
  return out;
}
const sortTab = tab => Object.entries(tab).sort(([ia, a], [ib, b]) => (b.g * 3 + b.e) - (a.g * 3 + a.e) || (b.gf - b.gc) - (a.gf - a.gc) || b.gf - a.gf || ia.localeCompare(ib));
function tableHTML(tab) {
  return `<div class="scroll"><table><tr><th>#</th><th class="l">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th></tr>
  ${sortTab(tab).map(([id, r], i) => `<tr class="${id === 'BAR' ? 'me' : ''}"><td>${i + 1}</td><td class="l"><img class="px" src="${TEAMS[id].crestURL}" alt="">${esc(TEAMS[id].name)}</td><td>${r.pj}</td><td>${r.g}</td><td>${r.e}</td><td>${r.p}</td><td>${r.gf}</td><td>${r.gc}</td><td>${r.gf - r.gc > 0 ? '+' : ''}${r.gf - r.gc}</td><td><b>${r.g * 3 + r.e}</b></td></tr>`).join('')}</table></div>`;
}
function ligaScreen() {
  let L = store.get('liga', null) || newLeague();
  const done = L.j >= L.rounds.length;
  let next = '', ourM = null;
  if (!done) {
    ourM = L.rounds[L.j].find(m => m.includes('BAR'));
    const home = ourM[0] === 'BAR', opp = home ? ourM[1] : ourM[0], t = TEAMS[opp];
    next = `<div class="panel"><h3>Jornada ${L.j + 1} de ${L.rounds.length}</h3>
      <div style="display:flex;align-items:center;gap:10px;justify-content:center;font-size:10px;flex-wrap:wrap;line-height:1.6">
      <img class="px" src="${TEAMS[ourM[0]].crestURL}" width="36" height="36" alt="">${esc(TEAMS[ourM[0]].name)} <span style="color:var(--gold)">VS</span> ${esc(TEAMS[ourM[1]].name)}<img class="px" src="${TEAMS[ourM[1]].crestURL}" width="36" height="36" alt=""></div>
      <p class="muted" style="text-align:center">${home ? 'Local · Parque de La Catalana' : 'Visitante · Campo del ' + esc(t.name)}</p>
      <div class="row"><button class="btn red" data-a="play">Jugar partido</button><button class="btn sm" data-a="sim">Simular</button></div></div>`;
  } else {
    const pos = sortTab(L.tab).findIndex(([id]) => id === 'BAR') + 1;
    next = `<div class="panel" style="text-align:center"><h3>Liga terminada</h3><div style="font-size:16px;color:${pos === 1 ? 'var(--gold)' : '#fff'};margin:10px 0">${pos === 1 ? '🏆 ¡CAMPEONES DE LIGA!' : 'Barceloneta: ' + pos + 'º puesto'}</div>
      <button class="btn red" data-a="reset">Nueva liga</button></div>`;
  }
  const last = L.last ? `<div class="panel"><h3>Resultados jornada ${L.last.j}</h3><div class="list">${L.last.m.map(([a, b, x, y]) => `<div ${a === 'BAR' || b === 'BAR' ? 'style="color:var(--gold)"' : ''}>${esc(TEAMS[a].name)} ${x} - ${y} ${esc(TEAMS[b].name)}</div>`).join('')}</div></div>` : '';
  const gol = Object.entries(L.goleadores).sort((a, b) => b[1] - a[1]);
  const golH = `<div class="panel"><h3>Goleadores del Barceloneta</h3>${gol.length ? `<table>${gol.map(([n, c]) => { const p = PLAYERS.find(q => q.name === n); return `<tr><td class="l">${p ? '<img class="px" src="' + faceURL(p) + '" alt="">#' + p.n + ' ' : ''}${esc(n)}</td><td>${c}</td></tr>`; }).join('')}</table>` : '<p class="muted">Aún no hay goles.</p>'}</div>`;
  screen(`<div class="wrap">${header('LIGA ACDEA 26/27')}${next}${last}
    <div class="panel"><h3>Clasificación</h3>${tableHTML(L.tab)}</div>${golH}
    <div class="row"><button class="btn sm" data-a="real">Clasificación real (web)</button>${done ? '' : '<button class="btn sm" data-a="reset">Reiniciar liga</button>'}</div></div>`, {
    back: mainMenu,
    play: () => { const home = ourM[0] === 'BAR', opp = home ? ourM[1] : ourM[0]; lineupScreen(opp, {type: 'liga', label: `LIGA ACDEA · JORNADA ${L.j + 1} · ${home ? 'LOCAL' : 'VISITANTE'}`, onEnd: r => ligaResult(r)}, ligaScreen); },
    sim: () => { const home = ourM[0] === 'BAR', opp = home ? ourM[1] : ourM[0]; const [a, b] = simScore('BAR', opp); ligaResult({gf: a, ga: b, scorers: simScorers(a), oppScorers: [], opp, sim: true}); },
    reset: () => { if (confirm('¿Empezar una liga nueva?')) { newLeague(); ligaScreen(); } },
    real: realTable});
}
function ligaResult(r) {
  const L = store.get('liga', null); const ms = L.rounds[L.j], out = [];
  for (const [a, b] of ms) {
    let x, y;
    if (a === 'BAR') { x = r.gf; y = r.ga; } else if (b === 'BAR') { x = r.ga; y = r.gf; } else [x, y] = simScore(a, b);
    addRes(L, a, b, x, y); out.push([a, b, x, y]);
  }
  r.scorers.forEach(n => { if (n !== 'P.P.') L.goleadores[n] = (L.goleadores[n] || 0) + 1; });
  L.j++; L.last = {j: L.j, m: out}; store.set('liga', L);
  const pos = sortTab(L.tab).findIndex(([id]) => id === 'BAR') + 1;
  resultScreen(r, `LIGA · JORNADA ${L.j}${r.sim ? ' (SIMULADO)' : ''}`, ligaScreen, `<p class="muted" style="margin-top:12px">Barceloneta: ${pos}º en la clasificación</p>`);
}
function realTable() {
  screen(`<div class="wrap">${header('CLASIFICACIÓN REAL')}<p class="muted">Liga ACDEA 26/27 · actualizada el 25/10/2026 (web Bruno TV Kids Football)</p>
   <div class="panel scroll"><table><tr><th>#</th><th class="l">Club</th><th>J</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>PTS</th></tr>
   ${REAL_TABLE.map((r, i) => `<tr class="${r[0].includes('BARCELONETA') ? 'me' : ''}"><td>${i + 1}</td><td class="l">${r[0]}</td>${r.slice(1).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</table></div>
   <div class="panel"><h3>Goleadores reales (tras J3)</h3><table>${REAL_SCORERS.map(([n, c]) => `<tr><td class="l">${n}</td><td>${c}</td></tr>`).join('')}</table></div></div>`, {back: ligaScreen});
}
// ---------- COPA ----------
function newCup() {
  const others = OPP_IDS.slice().sort(() => Math.random() - 0.5).slice(0, 7);
  const t = ['BAR', ...others].sort(() => Math.random() - 0.5);
  const C = {round: 0, ties: [[], [], []], champ: null, out: false};
  for (let i = 0; i < 8; i += 2) C.ties[0].push({a: t[i], b: t[i + 1], x: null, y: null, w: null});
  store.set('copa', C); return C;
}
function tieHTML(t) {
  if (!t) return '<div class="tie"><div>—</div><div>—</div></div>';
  const row = (id, s, w) => `<div class="${w ? 'w' : ''}"><span><img class="px" src="${TEAMS[id].crestURL}" alt=""> ${TEAMS[id].short}</span><span>${s === null ? '' : s}</span></div>`;
  return `<div class="tie ${t.a === 'BAR' || t.b === 'BAR' ? 'me' : ''}">${row(t.a, t.x === null ? null : t.x + (t.p ? ` (${t.p[0]})` : ''), t.w === t.a)}${row(t.b, t.y === null ? null : t.y + (t.p ? ` (${t.p[1]})` : ''), t.w === t.b)}</div>`;
}
function copaScreen() {
  let C = store.get('copa', null) || newCup();
  const names = ['Cuartos de final', 'Semifinales', 'Final'];
  let box = '', ourTie = null;
  if (C.champ) box = `<div class="panel" style="text-align:center"><h3>Copa terminada</h3><img class="px" src="${TEAMS[C.champ].crestURL}" width="64" height="64" alt=""><div style="font-size:14px;margin:10px 0;color:var(--gold)">${C.champ === 'BAR' ? '🏆 ¡BARCELONETA CAMPEÓN DE COPA!' : 'Campeón: ' + esc(TEAMS[C.champ].name)}</div><button class="btn red" data-a="reset">Nueva copa</button></div>`;
  else if (C.out) box = `<div class="panel" style="text-align:center"><h3>Eliminados</h3><p class="muted">El Barceloneta ha caído en ${names[C.outRound ?? C.round].toLowerCase()}.</p><div class="row"><button class="btn" data-a="simrest">Ver cómo acaba</button><button class="btn red" data-a="reset">Nueva copa</button></div></div>`;
  else {
    ourTie = C.ties[C.round].find(t => t.a === 'BAR' || t.b === 'BAR');
    const opp = ourTie.a === 'BAR' ? ourTie.b : ourTie.a;
    box = `<div class="panel"><h3>${names[C.round]}</h3><div style="display:flex;align-items:center;gap:10px;justify-content:center;font-size:10px;flex-wrap:wrap">
      <img class="px" src="${TEAMS.BAR.crestURL}" width="36" height="36" alt="">BARCELONETA <span style="color:var(--gold)">VS</span> ${esc(TEAMS[opp].name)}<img class="px" src="${TEAMS[opp].crestURL}" width="36" height="36" alt=""></div>
      <p class="muted" style="text-align:center">Partido único · si hay empate, penaltis</p>
      <div class="row"><button class="btn red" data-a="play">Jugar</button></div></div>`;
  }
  const cols = [0, 1, 2].map(r => `<div class="col"><div style="color:var(--gold);text-align:center">${['CUARTOS', 'SEMIS', 'FINAL'][r]}</div>${[0, 1, 2, 3].slice(0, [4, 2, 1][r]).map(i => tieHTML(C.ties[r][i])).join('')}</div>`).join('');
  screen(`<div class="wrap">${header('COPA MARINERS')}${box}<div class="panel"><h3>Cuadro</h3><div class="bracket">${cols}</div></div></div>`, {
    back: mainMenu,
    play: () => { const opp = ourTie.a === 'BAR' ? ourTie.b : ourTie.a; lineupScreen(opp, {type: 'copa', label: 'COPA MARINERS · ' + names[C.round].toUpperCase(), onEnd: r => copaResult(r)}, copaScreen); },
    reset: () => { newCup(); copaScreen(); },
    simrest: () => { const C2 = store.get('copa'); while (!C2.champ) advanceCup(C2, null); store.set('copa', C2); copaScreen(); }});
}
function resolveTie(t, ours) {
  if (ours) { const home = t.a === 'BAR'; t.x = home ? ours.gf : ours.ga; t.y = home ? ours.ga : ours.gf; if (ours.pens) t.p = home ? ours.pens : [ours.pens[1], ours.pens[0]]; }
  else { [t.x, t.y] = simScore(t.a, t.b); if (t.x === t.y) { let pa = 3 + Math.floor(Math.random() * 3), pb = 3 + Math.floor(Math.random() * 3); if (pa === pb) pa++; t.p = Math.random() < 0.5 ? [pa, pb] : [pb, pa]; } }
  t.w = t.x > t.y ? t.a : t.x < t.y ? t.b : (t.p[0] > t.p[1] ? t.a : t.b);
}
function advanceCup(C, ours) {
  for (const t of C.ties[C.round]) if (!t.w) resolveTie(t, (t.a === 'BAR' || t.b === 'BAR') ? ours : null);
  const w = C.ties[C.round].map(t => t.w);
  if (C.round === 2) { C.champ = w[0]; return; }
  C.round++; C.ties[C.round] = [];
  for (let i = 0; i < w.length; i += 2) C.ties[C.round].push({a: w[i], b: w[i + 1], x: null, y: null, w: null});
}
function copaResult(r) {
  const C = store.get('copa'); const round = C.round;
  advanceCup(C, r);
  const ourTie = C.ties[round].find(t => t.a === 'BAR' || t.b === 'BAR');
  if (ourTie.w !== 'BAR') { C.out = true; C.outRound = round; }
  store.set('copa', C);
  resultScreen(r, 'COPA MARINERS', copaScreen, C.champ === 'BAR' ? '<h2 style="font-size:16px;color:var(--gold);margin-top:14px">🏆 ¡CAMPEONES DE COPA!</h2>' : '');
}

// ---------- ARRANQUE ----------
buildField(); fit(); titleScreen(); requestAnimationFrame(frame);
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
