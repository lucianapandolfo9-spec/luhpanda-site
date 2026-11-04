/* Cena-teste: tipografia cinetica + icosaedro 3D com camera orbitando.
 * Funcao pura de frame. Textos ficticios, sem dado de cliente, sem travessao.
 * Troque este arquivo (ou passe --scene outro.js) para plugar a cena final. */
(function () {
  'use strict';
  var W = 1920, HH = 1080;
  var PHI = (1 + Math.sqrt(5)) / 2;

  // icosaedro: 12 vertices, 20 faces
  var V = [[-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0], [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI], [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]]
    .map(function (v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; });
  var F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
           [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];

  var stars = [];            // poeira 3D com seed fixa
  var WORDS = ['IA', 'trabalhando', 'de verdade', 'no seu negócio'];

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }

  function rotY(v, a) { var c = Math.cos(a), s = Math.sin(a); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; }
  function rotX(v, a) { var c = Math.cos(a), s = Math.sin(a); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; }

  // camera lookAt + perspectiva
  function makeCam(pos, target, fov) {
    var f = norm(sub(target, pos)), r = norm(cross(f, [0, 1, 0])), u = cross(r, f);
    var focal = (HH / 2) / Math.tan(fov / 2);
    return function (p) {
      var d = sub(p, pos), x = dot(d, r), y = dot(d, u), z = dot(d, f);
      return { x: W / 2 + x / z * focal, y: HH / 2 - y / z * focal, z: z };
    };
  }

  function mix(c1, c2, k) { return [0, 1, 2].map(function (i) { return Math.round(c1[i] + (c2[i] - c1[i]) * k); }); }

  window.SCENE = {
    setup: function (ctx, H) {
      var rnd = H.mulberry32(20261006);
      for (var i = 0; i < 160; i++) stars.push([(rnd() - .5) * 14, (rnd() - .5) * 8, (rnd() - .5) * 14, .6 + rnd() * 1.6]);
    },

    draw: function (ctx, frame, t, H) {
      // ---- fundo ----
      var g = ctx.createLinearGradient(0, 0, W, HH);
      g.addColorStop(0, '#12081A'); g.addColorStop(1, '#0C0512');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, HH);
      var aur = ctx.createRadialGradient(W * (.72 + .04 * Math.sin(t * .9)), HH * .45, 0, W * .72, HH * .45, 760);
      aur.addColorStop(0, 'rgba(111,46,143,.55)'); aur.addColorStop(1, 'rgba(111,46,143,0)');
      ctx.fillStyle = aur; ctx.fillRect(0, 0, W, HH);

      // ---- camera: orbita + dolly (funcao so de t) ----
      var kc = H.easeInOutCubic(H.prog(t, 0, 6));
      var ang = H.lerp(-.9, .9, kc), elev = H.lerp(.35, .12, kc), dist = H.lerp(7.4, 4.6, kc);
      var cam = makeCam([Math.sin(ang) * dist * Math.cos(elev), Math.sin(elev) * dist, Math.cos(ang) * dist * Math.cos(elev)],
                        [H.lerp(-.9, -.5, kc), 0, 0], .9);

      // ---- poeira 3D ----
      ctx.fillStyle = '#C4B2D1';
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i], p = cam([s[0], s[1] + Math.sin(t * .8 + i) * .08, s[2]]);
        if (p.z < .5) continue;
        ctx.globalAlpha = H.clamp(.5 - p.z * .02, .08, .5);
        ctx.beginPath(); ctx.arc(p.x, p.y, s[3] * 3 / Math.max(p.z, 1) * 3, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ---- forma 3D: icosaedro que entra, gira e respira ----
      var kin = H.easeOutBack(H.prog(t, 0, 1.2));
      var sc = 1.55 * kin * (1 + .03 * Math.sin(t * 2.2));
      var ry = t * .9, rx = .35 + .25 * Math.sin(t * .7);
      var light = norm([-.5, .8, .6]);
      var pv = V.map(function (v) { var r = rotX(rotY(v, ry), rx); return [r[0] * sc, r[1] * sc, r[2] * sc]; });
      var faces = F.map(function (f, idx) {
        var a = pv[f[0]], b = pv[f[1]], c = pv[f[2]];
        var n = norm(cross(sub(b, a), sub(c, a)));
        var cen = [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3];
        return { f: f, n: n, cen: cen, depth: cam(cen).z, idx: idx };
      });
      faces.sort(function (p, q) { return q.depth - p.depth || p.idx - q.idx; }); // estavel
      faces.forEach(function (fc) {
        var vis = dot(fc.n, norm(sub(fc.cen, [0, 0, 0]))) > -0.0; // faces voltadas pra fora
        var shade = H.clamp(dot(fc.n, light) * .5 + .5, 0, 1);
        var col = mix([58, 34, 73], [255, 107, 53], Math.pow(shade, 2.2) * .85);
        var q = fc.f.map(function (i) { return cam(pv[i]); });
        ctx.beginPath(); ctx.moveTo(q[0].x, q[0].y); ctx.lineTo(q[1].x, q[1].y); ctx.lineTo(q[2].x, q[2].y); ctx.closePath();
        ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (vis ? .92 : .35) + ')'; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(242,234,247,.55)'; ctx.stroke();
      });

      // ---- tipografia cinetica ----
      ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      var baseX = 150, ys = [330, 470, 610, 750], sizes = [200, 130, 130, 76];
      var tOut = H.easeInCubic(H.prog(t, 5.2, 5.9));        // saida
      WORDS.forEach(function (w, i) {
        var t0 = .35 + i * .42;
        ctx.font = '800 ' + sizes[i] + 'px "Helvetica Neue", Helvetica, Arial, sans-serif';
        var x = baseX;
        for (var k = 0; k < w.length; k++) {                // letra por letra, atraso fixo
          var ch = w[k], lk = H.prog(t, t0 + k * .035, t0 + k * .035 + .55);
          var e = H.easeOutBack(lk), a = H.clamp(lk * 2.2, 0, 1) * (1 - tOut);
          var dy = (1 - e) * 120 + tOut * -90, rot = (1 - e) * -.35;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.translate(x, ys[i] + dy); ctx.rotate(rot);
          ctx.fillStyle = (i === 0 || i === 2) ? '#FF6B35' : '#F2EAF7';
          ctx.fillText(ch, 0, 0);
          ctx.restore();
          x += ctx.measureText(ch).width;
        }
      });
      // fio de progresso (prova visual de que t anda)
      ctx.fillStyle = '#FF6B35'; ctx.fillRect(0, HH - 8, W * (frame / (H.SPEC.FRAMES - 1)), 8);
      // marcador de quadro, para conferir olho nu
      ctx.globalAlpha = .6; ctx.fillStyle = '#8B7A98'; ctx.font = '22px ui-monospace, Menlo, monospace';
      ctx.fillText('frame ' + String(frame).padStart(3, '0') + ' · t ' + t.toFixed(3) + 's', 150, HH - 40);
      ctx.globalAlpha = 1;
    }
  };
})();
