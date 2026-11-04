/* Hero motion do site v5 · cena do briefing "Motion Hero Site v5" (@marketing, 06/10/2026, v2).
 * Funcao pura de frame: tudo sai de `f`. Sem relogio, sem aleatorio (variacao por cubo e hash fixo).
 * Uso: node render.mjs --scene scenes/hero-v5.js --out out/hero
 *
 * Desvios assumidos em relacao ao briefing (todos listados no relatorio):
 *  - chanfro raio .08 dos cubos aproximado por aresta clara de 1,5 px (canvas 2D, sem malha chanfrada);
 *  - aurora com gradientes radiais em vez de blur de 90 px (mesmo aspecto, bem mais barato e deterministico);
 *  - inclinacao do plano de texto (rotX/rotY da camera) aproximada por escala, nao por perspectiva real;
 *  - mono em Menlo (ui-monospace varia por maquina); Inter vem de fonts/inter.woff2;
 *  - kickers 1 e 2 em y=+2,4 (base 296 px) e nao +1,9: a 350 px colidiam com o topo do "40h" (cap ~324 px);
 *  - sinal da paralaxe vertical do texto invertido (o selo docado saia do quadro com el 26);
 *  - polimento 06/10 (descritor entra rapido e sai depois do titulo, fica ~1 s legivel): morfes em smootherstep, arco 0,45, anel raio 2,7 deslocado +1,15 (nao toca o texto), F em escala 1,0, sombra de contato, frase de apoio legivel por ~1 s;
 *  - rotacao de grupo entre beats suavizada (o briefing lista saltos em f126 e f234). */
/* TABELA DE QUADROS (video de 16 s = 960 quadros a 60 fps). Storyboard aprovado em sb 0..359; quadro real = sb x 2,6667.
 *  marco                         sb          quadro real    tempo
 *  camera: empurra ate 1:1       72          192            3,2 s
 *  morph A>B (40h vira 10h)      78-120      208-320        3,5 - 5,3 s
 *  camera: aproxima              132         352            5,9 s
 *  morph B>C (bloco, Sistemas)   126-168     336-448        5,6 - 7,5 s
 *  camera: orbita                186         496            8,3 s
 *  morph C>D (barras, Social)    180-222     480-592        8,0 - 9,9 s
 *  camera: baixa e inclina       240         640            10,7 s
 *  morph D>E (anel, Formacao)    234-276     624-736        10,4 - 12,3 s
 *  selo 10h NO LUGAR DE 40 sai   290-306     773-816        12,9 - 13,6 s
 *  bloco final (h1 do site)      294         784            13,07 s  (fade do h1: 600 ms)
 *  morph E>F (grade final)       288-336     768-896        12,8 - 14,9 s
 *  hold final / poster           336-359     896-959        ate 15,98 s ; poster = quadro 959 */
(function () {
  'use strict';
  var W = 1920, HH = 1080, D2R = Math.PI / 180;
  var FOCAL = (HH / 2) / Math.tan(35 * D2R / 2);          // fov vertical fixo 35 graus
  var INTER = 'Inter, "Helvetica Neue", Arial, sans-serif';
  var MONO = 'Menlo, ui-monospace, monospace';
  var C = { fundo: '#12081A', poco: '#0C0512', roxo: '#6F2E8F', roxoCl: '#8B4BA3', lar: '#FF6B35', txt: '#F2EAF7', suave: '#C4B2D1', fraco: '#8B7A98', borda: '#3A2249', legivel: '#A593B3' };   // legivel: entre fraco e suave (contraste de texto pequeno)
  var DESC_ALPHA = 1;     // camada dos descritores PROVISORIOS: 0 apaga sem mexer em layout nem timing
  var O = [5.0, -0.2, 0];

  // ---------- utilitarios ----------
  function clamp(x, a, b) { return Math.min(b, Math.max(a, x)); }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function prog(f, a, b) { return clamp((f - a) / (b - a), 0, 1); }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  var EZ = {
    outExpo: function (t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    outCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    inCubic: function (t) { return t * t * t; },
    inOutCubic: function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    inOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; },
    inOutSine: function (t) { return -(Math.cos(Math.PI * t) - 1) / 2; },
    smoother: function (t) { return t * t * t * (t * (6 * t - 15) + 10); },
    outBack: function (t) { var s = 1.2; return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2); }
  };
  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
  function mixc(a, b, k) { return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)]; }
  function rgb(c) { return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')'; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function rotY(v, deg) { var a = deg * D2R, c = Math.cos(a), s = Math.sin(a); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; }
  function rotX(v, deg) { var a = deg * D2R, c = Math.cos(a), s = Math.sin(a); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; }

  // ---------- camera (2.5) ----------
  var CAMKF = [
    { f: 0,   T: [1.5, 0, 0],   az: -18, el: 7,  d: 24.0, roll: 0,  ez: null },
    { f: 72,  T: [1.5, 0, 0],   az: -8,  el: 4,  d: 17.13, roll: 0, ez: EZ.outCubic },
    { f: 132, T: [2.5, 0, 0],   az: 6,   el: 3,  d: 14.8, roll: 0,  ez: EZ.inOutCubic },
    { f: 186, T: [2.5, 0, 0],   az: -6,  el: 8,  d: 15.5, roll: 0,  ez: EZ.inOutSine },
    { f: 240, T: [2.5, .3, 0],  az: 10,  el: 14, d: 14.5, roll: -2, ez: EZ.inOutCubic },
    { f: 294, T: [2.5, 0, 0],   az: -4,  el: 26, d: 16.0, roll: 2,  ez: EZ.inOutCubic },
    { f: 336, T: [2.5, 0, 0],   az: 0,   el: 4,  d: 18.2, roll: 0,  ez: EZ.inOutQuart },
    { f: 359, T: [2.5, 0, 0],   az: 0,   el: 4,  d: 18.8, roll: 0,  ez: EZ.outCubic }
  ];
  function camState(f) {
    var k = 0;
    while (k < CAMKF.length - 2 && f >= CAMKF[k + 1].f) k++;
    var a = CAMKF[k], b = CAMKF[k + 1], e = b.ez(prog(f, a.f, b.f));
    return { T: [lerp(a.T[0], b.T[0], e), lerp(a.T[1], b.T[1], e), lerp(a.T[2], b.T[2], e)],
             az: lerp(a.az, b.az, e), el: lerp(a.el, b.el, e), d: lerp(a.d, b.d, e), roll: lerp(a.roll, b.roll, e) };
  }
  function makeProj(cs) {
    var az = cs.az * D2R, el = cs.el * D2R;
    var pos = [cs.T[0] + cs.d * Math.cos(el) * Math.sin(az), cs.T[1] + cs.d * Math.sin(el), cs.T[2] + cs.d * Math.cos(el) * Math.cos(az)];
    var fw = norm(sub(cs.T, pos)), rt = norm(cross(fw, [0, 1, 0])), up = cross(rt, fw);
    var r = cs.roll * D2R, cr = Math.cos(r), sr = Math.sin(r);
    var rt2 = [rt[0] * cr + up[0] * sr, rt[1] * cr + up[1] * sr, rt[2] * cr + up[2] * sr];
    var up2 = [up[0] * cr - rt[0] * sr, up[1] * cr - rt[1] * sr, up[2] * cr - rt[2] * sr];
    return {
      pos: pos,
      p: function (v) { var d = sub(v, pos), z = dot(d, fw); return { x: W / 2 + dot(d, rt2) / z * FOCAL, y: HH / 2 - dot(d, up2) / z * FOCAL, z: z }; }
    };
  }

  // ---------- cubos (2.0 a 2.3) ----------
  var HEIGHTS = [4, 6, 8, 10, 12];
  var COLI = [], LEVI = [];                         // coluna e nivel de cada cubo na forma D
  (function () { var i = 0; HEIGHTS.forEach(function (h, c) { for (var k = 0; k < h; k++) { COLI[i] = c; LEVI[i] = k; i++; } }); })();
  function vhash(i) { return ((i * 37 + 11) % 13) / 12; }
  function surv(i) { return i % 4 === 0; }
  function shapePos(s, i) {
    var g = Math.floor(i / 4);
    if (s === 'A' || s === 'F') {
      var col = i % 8, row = Math.floor(i / 8);
      return [(col - 3.5) * .62, (2 - row) * .62, s === 'F' ? -3 : 0];
    }
    if (s === 'B') return [(g % 5 - 2) * .78, (.5 - Math.floor(g / 5)) * .78, 0];
    if (s === 'C') { var lz = Math.floor(i / 20), ly = Math.floor((i % 20) / 5), lx = i % 5; return [(lx - 2) * .6, (1.5 - ly) * .6, (lz - .5) * .6]; }
    if (s === 'D') return [(COLI[i] - 2) * .72, -2.2 + LEVI[i] * .38, 0];
    var th = 2 * Math.PI * i / 40; return [2.7 * Math.cos(th), .25 * Math.sin(3 * th), 2.7 * Math.sin(th)];   // E
  }
  function shapeOff(s) { return s === 'E' ? [1.15, 0, 0] : [0, 0, 0]; }   // afasta o anel do texto (espaco de mundo, nao gira)
  var EDGE = { A: .5, B: .5, C: .52, D: .34, E: .36, F: .5 };
  function shapeSize(s, i) {
    if (s === 'B') return surv(i) ? .5 * 1.15 : 0;
    if (s === 'F') return .5;
    return EDGE[s];
  }
  function shapeColor(s, i) {
    if (s === 'A') return hex(C.roxoCl);
    if (s === 'B') return hex(surv(i) ? C.lar : C.roxo);
    if (s === 'C' || s === 'F') return hex(surv(i) ? C.lar : C.roxo);
    if (s === 'D') return hex(LEVI[i] === HEIGHTS[COLI[i]] - 1 ? C.lar : C.roxo);
    return hex(surv(i) ? C.lar : C.roxoCl);          // E
  }
  var MORPHS = [
    { from: 'A', to: 'B', fa: 78,  fb: 120, st: 10, ez: EZ.smoother },
    { from: 'B', to: 'C', fa: 126, fb: 168, st: 12, ez: EZ.smoother },
    { from: 'C', to: 'D', fa: 180, fb: 222, st: 14, ez: EZ.smoother },
    { from: 'D', to: 'E', fa: 234, fb: 276, st: 16, ez: EZ.smoother },
    { from: 'E', to: 'F', fa: 288, fb: 336, st: 16, ez: EZ.smoother }
  ];

  function cubeState(i, f) {
    var g = Math.floor(i / 4), v = vhash(i), cur = 'A', m, u = 0, e = 0, mm = null;
    for (var k = 0; k < MORPHS.length; k++) {
      m = MORPHS[k];
      var delay = m.st * g / 9, dur = (m.fb - m.fa) - m.st;
      u = clamp((f - m.fa - delay) / dur, 0, 1);
      if (u <= 0) { break; }
      if (u < 1) { mm = m; e = m.ez(u); break; }
      cur = m.to;
    }
    var from = mm ? mm.from : cur, to = mm ? mm.to : cur;
    var pa = shapePos(from, i), pb = shapePos(to, i);
    var pos = [lerp(pa[0], pb[0], mm ? e : 0), lerp(pa[1], pb[1], mm ? e : 0), lerp(pa[2], pb[2], mm ? e : 0)];
    var size = lerp(shapeSize(from, i), shapeSize(to, i), mm ? e : 0);
    var col = mixc(shapeColor(from, i), shapeColor(to, i), mm ? e : 0);
    var own = 0;
    if (mm) {
      pos[1] += .45 * v * Math.sin(Math.PI * u);
      own = 90 * e * (i % 2 === 0 ? 1 : -1);
      if (mm.from === 'A' && mm.to === 'B' && !surv(i)) { size = .5 * (1 - smooth(.65, 1, u)); col = hex(C.roxoCl); }
      if (mm.from === 'B' && mm.to === 'C' && !surv(i)) { size = .52 * smooth(0, .4, u); col = hex(C.roxo); }
    }
    // sobrevivente vira laranja entre f96 e f120 (por tempo, nao por quadro de morph)
    if (surv(i) && f < 126) col = mixc(hex(C.roxoCl), hex(C.lar), EZ.inOutSine(prog(f, 96, 120)));
    // topo de cada coluna fica laranja entre f206 e f222
    if (f >= 180 && f < 234) col = mixc(shapeColor('C', i), shapeColor('D', i), EZ.inOutSine(prog(f, 206, 222)));
    if (f >= 222 && f < 234) col = shapeColor('D', i);
    // entrada na forma A (f10 a 44)
    var colA = i % 8, rowA = Math.floor(i / 8);
    var ua = clamp((f - 10 - (colA + rowA) * 1.2) / 20, 0, 1);
    if (f < 78) { size *= Math.max(0, EZ.outBack(ua)); own = 90 * (1 - EZ.outBack(ua)) * (i % 2 === 0 ? 1 : -1) * (ua < 1 ? 1 : 0); }
    // respiracao
    var amp = .04 * smooth(40, 50, f) * (1 - smooth(72, 78, f)) + .02 * smooth(332, 340, f);
    pos[1] += amp * Math.sin(2 * Math.PI * (f + v * 90) / 90);
    var oa = shapeOff(from), ob = shapeOff(to), ke = mm ? e : 0;
    return { pos: pos, size: size, col: col, own: own, off: [lerp(oa[0], ob[0], ke), 0, 0] };
  }

  // rotacao do grupo (2.3), suavizada nas juncoes
  function groupRot(f) {
    var yaw, pit;
    if (f < 100) { yaw = -12; pit = lerp(6, 0, EZ.inOutSine(prog(f, 0, 126))); }
    else if (f < 126) { var a = EZ.inOutSine(prog(f, 100, 126)); yaw = lerp(-12, -38, a); pit = lerp(6, 0, EZ.inOutSine(prog(f, 0, 126))); }
    else if (f < 186) { var b = EZ.inOutSine(prog(f, 126, 186)); yaw = lerp(-38, 22, b); pit = lerp(0, 12, b); }
    else if (f < 234) { var c = EZ.inOutSine(prog(f, 186, 240)); yaw = lerp(22, -10, c); pit = lerp(12, 4, c); }
    else {
      var w = EZ.inOutSine(prog(f, 234, 276));
      yaw = lerp(-10, 40 + .9 * (f - 234), w); pit = lerp(4, 58, w);
      var z = EZ.inOutQuart(prog(f, 288, 336));
      yaw = lerp(yaw, -10, z); pit = lerp(pit, 6, z);
    }
    return { yaw: yaw, pit: pit };
  }

  var BOX = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
  var FACES = [{ i: [4, 5, 6, 7], n: [0, 0, 1] }, { i: [1, 0, 3, 2], n: [0, 0, -1] }, { i: [5, 1, 2, 6], n: [1, 0, 0] },
               { i: [0, 4, 7, 3], n: [-1, 0, 0] }, { i: [7, 6, 2, 3], n: [0, 1, 0] }, { i: [0, 1, 5, 4], n: [0, -1, 0] }];
  var KEY = norm([-4, 6, 8]), RIM = norm([8, 2, -4]);
  var AMB = hex(C.fraco).map(function (x) { return x / 255 * .55; });
  var KEYC = hex(C.txt).map(function (x) { return x / 255 * .9; });
  var RIMC = hex(C.lar).map(function (x) { return x / 255 * .6; });

  function drawCubes(ctx, f, P) {
    var gr = groupRot(f), list = [];
    for (var i = 0; i < 40; i++) {
      var s = cubeState(i, f);
      if (s.size < .004) continue;
      var rel = rotX(rotY(s.pos, gr.yaw), gr.pit);
      var cen = [O[0] + rel[0] + s.off[0], O[1] + rel[1], O[2] + rel[2]];
      list.push({ i: i, s: s, cen: cen, depth: P.p(cen).z });
    }
    // sombra de contato no piso (y=-3,2): mais macia e clara quanto mais alto o cubo
    list.forEach(function (it) {
      var q = P.p([it.cen[0], -3.2, it.cen[2]]); if (q.z < .5) return;
      var hgt = clamp((it.cen[1] + 3.2) / 6, 0, 1), rad = FOCAL / q.z * (.55 + it.s.size) * (1 + hgt * .8);
      var a = .22 * (1 - hgt * .8) * clamp(it.s.size / .3, 0, 1);
      ctx.save(); ctx.translate(q.x, q.y); ctx.scale(1, .28);
      var sg = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
      sg.addColorStop(0, 'rgba(6,2,10,' + a + ')'); sg.addColorStop(1, 'rgba(6,2,10,0)');
      ctx.fillStyle = sg; ctx.fillRect(-rad, -rad, rad * 2, rad * 2); ctx.restore();
    });
    list.sort(function (a, b) { return b.depth - a.depth || a.i - b.i; });
    list.forEach(function (it) {
      var h = it.s.size / 2, vtx = BOX.map(function (b) {
        var l = rotY([b[0] * h, b[1] * h, b[2] * h], it.s.own);
        l = rotX(rotY(l, gr.yaw), gr.pit);
        return [it.cen[0] + l[0], it.cen[1] + l[1], it.cen[2] + l[2]];
      });
      var base = it.s.col;
      FACES.forEach(function (fc) {
        var n = rotX(rotY(rotY(fc.n, it.s.own), gr.yaw), gr.pit);
        var toCam = sub(P.pos, it.cen);
        if (dot(n, toCam) <= 0) return;
        var li = [0, 1, 2].map(function (k) { return AMB[k] + KEYC[k] * Math.max(0, dot(n, KEY)) + RIMC[k] * Math.max(0, dot(n, RIM)); });
        var q = fc.i.map(function (k) { return P.p(vtx[k]); });
        ctx.beginPath(); ctx.moveTo(q[0].x, q[0].y);
        for (var k = 1; k < 4; k++) ctx.lineTo(q[k].x, q[k].y);
        ctx.closePath();
        ctx.fillStyle = 'rgb(' + Math.round(clamp(base[0] * li[0], 0, 255)) + ',' + Math.round(clamp(base[1] * li[1], 0, 255)) + ',' + Math.round(clamp(base[2] * li[2], 0, 255)) + ')';
        ctx.fill();
        ctx.lineJoin = 'round'; ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(242,234,247,.28)'; ctx.stroke();
      });
    });
  }

  // ---------- fundo (2.0) ----------
  function blob(ctx, cx, cy, rx, ry, color, alpha) {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(1, ry / rx);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.15);
    g.addColorStop(0, 'rgba(' + color + ',' + alpha + ')'); g.addColorStop(.55, 'rgba(' + color + ',' + (alpha * .35) + ')'); g.addColorStop(1, 'rgba(' + color + ',0)');
    ctx.fillStyle = g; ctx.fillRect(-rx * 1.2, -rx * 1.2, rx * 2.4, rx * 2.4); ctx.restore();
  }
  function drawBackground(ctx, f, P) {
    ctx.fillStyle = C.fundo; ctx.fillRect(0, 0, W, HH);
    var ph = 2 * Math.PI * f / 360;
    blob(ctx, 320 + 80 * Math.sin(ph), 60, 320, 320, '111,46,143', .85 * .5);
    var pulse = f < 120 ? lerp(.35, .6, EZ.inOutSine(prog(f, 96, 120))) : lerp(.6, .4, EZ.inOutSine(prog(f, 120, 150)));
    blob(ctx, 1700, 120 + 50 * Math.cos(ph), 260, 260, '255,107,53', .4 * pulse);
    blob(ctx, 1100 - 60 * Math.sin(ph), 700, 380, 210, '139,75,163', .45);
    // piso em grade y=-3.2
    var off = (f * .02) % 1, fogA = function (z) { return .5 * clamp((z + 30) / 26, 0, 1); };
    ctx.lineWidth = 1.2; ctx.lineCap = 'butt';
    for (var zi = -30; zi <= 10; zi++) {                      // linhas paralelas a x (z fixo)
      var z = zi + off, a = fogA(z); if (a <= .005) continue;
      var p0 = P.p([-20, -3.2, z]), p1 = P.p([20, -3.2, z]);
      if (p0.z < .5 || p1.z < .5) continue;
      ctx.strokeStyle = 'rgba(58,34,73,' + a + ')'; ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.stroke();
    }
    for (var xi = -20; xi <= 20; xi++) {                      // linhas paralelas a z (segmentos de 1 unidade)
      for (var zj = -30; zj < 10; zj++) {
        var za = zj + off, zb = zj + 1 + off, aa = fogA((za + zb) / 2); if (aa <= .005) continue;
        var q0 = P.p([xi, -3.2, za]), q1 = P.p([xi, -3.2, zb]);
        if (q0.z < .5 || q1.z < .5) continue;
        ctx.strokeStyle = 'rgba(58,34,73,' + aa + ')'; ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.lineTo(q1.x, q1.y); ctx.stroke();
      }
    }
    var vg = ctx.createRadialGradient(W / 2, HH / 2, HH * .45, W / 2, HH / 2, W * .62);
    vg.addColorStop(0, 'rgba(12,5,18,0)'); vg.addColorStop(1, 'rgba(12,5,18,.55)');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, HH);
  }

  // ---------- texto cinetico (2.0) ----------
  // run = { s, w (peso), c (cor), fam }. Tudo em pixels; origem x em px da margem, base em px.
  var TX = { ox: 0, oy: 0, sx: 1, sy: 1 };   // paralaxe/inclinacao do plano de texto, atualizado por quadro
  function setFont(ctx, run, size) { ctx.font = (run.w || 800) + ' ' + size + 'px ' + (run.fam || INTER); }
  function chars(runs) {
    var out = [];
    runs.forEach(function (r) { for (var k = 0; k < r.s.length; k++) out.push({ ch: r.s[k], run: r }); });
    return out;
  }
  // desenha linha por caractere; opts: x,base (px), size, f0, stag, dur, f1, stag2, dur2, track (em), alphaMul
  function drawLine(ctx, f, runs, o) {
    var cs = chars(runs), x = o.x, tr = (o.track || 0) * o.size;
    // f1end: a saida da linha INTEIRA termina nessa data (o atraso por letra se ajusta ao tamanho da linha)
    var st2 = o.f1end != null ? Math.max(0, (o.f1end - o.f1 - o.dur2) / Math.max(1, cs.length - 1)) : o.stag2;
    for (var c = 0; c < cs.length; c++) {
      var ch = cs[c].ch, run = cs[c].run;
      setFont(ctx, run, o.size);
      var adv = (o.advFix && o.advFix[c] != null) ? o.advFix[c] : ctx.measureText(ch).width;
      var u = clamp((f - o.f0 - c * o.stag) / o.dur, 0, 1);
      var u2 = o.f1 == null ? 0 : clamp((f - o.f1 - c * st2) / o.dur2, 0, 1);
      if (u > 0 && u2 < 1 && ch !== ' ') {
        var e = EZ.outExpo(u), e2 = EZ.inCubic(u2);
        var al = smooth(0, .35, u) * (1 - e2) * (o.alphaMul == null ? 1 : o.alphaMul);
        var dy = (1 - e) * .9 * o.size - e2 * .35 * o.size, rx = (1 - e) * -75 * D2R, sc = .96 + .04 * e;
        ctx.save();
        ctx.globalAlpha = al;
        ctx.translate(x + TX.ox, o.base + dy + TX.oy);
        ctx.scale(sc * TX.sx, sc * Math.cos(rx) * TX.sy);
        ctx.fillStyle = o.color ? o.color(c, run) : run.c;
        if (o.custom && o.custom(ctx, c, ch, run, adv)) { /* desenhado pelo chamador */ } else ctx.fillText(ch, 0, 0);
        ctx.restore();
      }
      x += adv + tr;
    }
    return x;
  }
  function wordsLine(ctx, f, text, o) {                       // entrada/saida por palavra
    var ws = text.split(' '), x = o.x;
    setFont(ctx, o.run, o.size);
    var sp = ctx.measureText(' ').width;
    ws.forEach(function (w, k) {
      var wd = ctx.measureText(w).width;
      var u = clamp((f - o.f0 - k * o.stag) / o.dur, 0, 1), u2 = clamp((f - o.f1 - k * o.stag2) / o.dur2, 0, 1);
      if (u > 0 && u2 < 1) {
        var e = EZ.outExpo(u), e2 = EZ.inCubic(u2);
        ctx.save(); ctx.globalAlpha = smooth(0, .35, u) * (1 - e2);
        ctx.fillStyle = o.run.c;
        ctx.fillText(w, x + TX.ox, o.base + (1 - e) * 40 - e2 * .35 * o.size + TX.oy);
        ctx.restore();
      }
      x += wd + sp;
    });
  }

  var KICK = function (s, col) { return [{ s: s, w: 500, fam: MONO, c: col || C.lar }]; };
  function kicker(ctx, f, text, o) {
    var size = 26;
    drawLine(ctx, f, KICK(text), { x: 110, base: o.base, size: size, f0: o.f0, stag: o.stag, dur: o.dur, f1: o.f1, f1end: o.f1end, stag2: o.stag2, dur2: o.dur2, track: .16 });
  }

  // numero 40h / 10h (rolagem do 4 para 1, cor e selo docado)
  function numberState(f) {
    var k = EZ.inOutCubic(prog(f, 132, 160));
    return { size: lerp(380, 96, k), base: lerp(600, 150, k) };    // -0,6 un => 600 px ; +3,9 un => 150 px
  }
  function drawNumber(ctx, f) {
    if (f < 14) return;
    var st = numberState(f), size = st.size;
    var kcol = EZ.inOutSine(prog(f, 96, 114));
    var out = 1 - EZ.inCubic(prog(f, 290, 306));   // selo sai antes de o h1 do site entrar (inicio do bloco final)
    if (out <= 0) return;
    var runs = [{ s: '4', w: 800, c: C.txt }, { s: '0', w: 800, c: C.txt }, { s: 'h', w: 300, c: C.suave }];
    ctx.font = '800 ' + size + 'px ' + INTER;
    var digW = Math.max.apply(null, ['4', '3', '2', '1'].map(function (d) { return ctx.measureText(d).width; }));
    var fix = { 0: digW };
    var roll = EZ.inOutQuart(prog(f, 78, 114)), lineH = size * .92;
    var xEnd = drawLine(ctx, f, runs, {
      x: 110, base: st.base, size: size, f0: 14, stag: 4, dur: 22, track: -.04, advFix: fix, alphaMul: out,
      color: function (c, run) { return rgb(mixc(hex(run.c), hex(C.lar), kcol)); },
      custom: function (cx, c, ch, run, adv) {
        if (c !== 0 || f < 78) return false;
        // coluna 4-3-2-1 numa mascara da altura de uma linha
        cx.save();
        cx.beginPath(); cx.rect(-size * .06, -size * .80, digW + size * .12, lineH); cx.clip();
        cx.scale(1, 1 + .08 * Math.sin(Math.PI * prog(f, 78, 114)));
        ['4', '3', '2', '1'].forEach(function (d, k) {
          cx.fillText(d, (digW - cx.measureText(d).width) / 2, k * lineH - roll * 3 * lineH);
        });
        cx.restore(); return true;
      }
    });
    // selo "NO LUGAR DE 40" ao lado do 10h docado
    if (f >= 150) {
      drawLine(ctx, f, [{ s: 'NO LUGAR DE 40', w: 500, fam: MONO, c: C.legivel }], { x: xEnd + 28, base: st.base - size * .04, size: 22, f0: 150, stag: 1, dur: 12, track: .1, alphaMul: out });
    }
  }

  // bloco de oferta (01/02/03)
  function oferta(ctx, f, n, l1, l2runs, desc, f0, f1, descCor) {
    drawLine(ctx, f, KICK(n), { x: 110, base: 350, size: 26, f0: f0, stag: 2, dur: 14, f1: f1, f1end: f1 + 14, dur2: 10, track: .16 });
    drawLine(ctx, f, [{ s: l1, w: 800, c: C.txt }], { x: 110, base: 510, size: 180, f0: f0, stag: 1.5, dur: 18, f1: f1, f1end: f1 + 14, dur2: 10, track: -.03 });
    drawLine(ctx, f, l2runs, { x: 110, base: 650, size: 96, f0: f0 + 6, stag: 1.5, dur: 18, f1: f1, f1end: f1 + 14, dur2: 10, track: -.02 });
    drawLine(ctx, f, [{ s: desc, w: 500, fam: MONO, c: descCor || C.legivel }], { x: 110, base: 770, size: 24, f0: f0 + 12, stag: .3, dur: 12, f1: f1 + 8, f1end: f1 + 20, dur2: 8, track: .08, alphaMul: DESC_ALPHA });
  }

  window.SCENE = {
    setup: function () {},
    draw: function (ctx, frameReal, t, H) {
      // storyboard aprovado em 360 quadros; o video agora tem H.SPEC.FRAMES. Tudo escala junto (timing, stagger, easing).
      var f = Math.min(359, frameReal * 360 / H.SPEC.FRAMES);
      var cs = camState(f), P = makeProj(cs);
      drawBackground(ctx, f, P);
      drawCubes(ctx, f, P);

      // plano de texto preso a camera: paralaxe e inclinacao leve
      TX.ox = -cs.az * .04 * 100; TX.oy = cs.el * .04 * 100;   /* sinal invertido: o do briefing empurrava o selo 10h pra fora do topo */
      TX.sx = Math.cos(-cs.az * .35 * D2R); TX.sy = Math.cos(cs.el * .2 * D2R);
      ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';

      // beat 1 e 2
      kicker(ctx, f, 'UM PROJETO NORMALMENTE LEVA', { base: 296, f0: 4, stag: 1.5, dur: 14, f1: 72, f1end: 86, dur2: 10 });
      kicker(ctx, f, 'COM A LUH PANDA', { base: 296, f0: 84, stag: 1.5, dur: 14, f1: 116, f1end: 132, dur2: 10 });
      drawNumber(ctx, f);
      ctx.font = '500 52px ' + INTER;
      wordsLine(ctx, f, 'O mesmo projeto, em um quarto do tempo.', { x: 110, base: 800, size: 52, run: { w: 500, c: C.suave }, f0: 90, stag: 2, dur: 13, f1: 137, stag2: 1, dur2: 7 });

      // beats 3 a 5
      oferta(ctx, f, '01', 'Sistemas', [{ s: 'e automação', w: 300, c: C.suave }], 'BOT DE ATENDIMENTO NO WHATSAPP PARA CLÍNICAS', 140, 172);
      oferta(ctx, f, '02', 'Social', [{ s: 'media ', w: 300, c: C.suave }, { s: '+ tráfego', w: 800, c: C.lar }], 'PARA CLÍNICAS DE ESTÉTICA E BEM-ESTAR · BRASIL INTEIRO', 180, 226, C.suave);
      oferta(ctx, f, '03', 'Formação', [{ s: 'em ', w: 300, c: C.suave }, { s: 'IA', w: 800, c: C.lar }], 'TURMA E AULA DE IA PARA A EQUIPE DA CLÍNICA', 234, 280);
    }
  };
})();
