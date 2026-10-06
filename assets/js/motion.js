/*
 * Luh Panda · site v5 · MOTION (prototipo 05/10/2026).
 *
 * Sem biblioteca: Web Animations API nativa (el.animate) + IntersectionObserver.
 * - So anima transform e opacity (roda no compositor, 60 fps no celular, nao trava a rolagem).
 * - Nenhum listener de scroll: tudo dispara por IntersectionObserver.
 * - O HTML ja tem o estado final (SEO/acessibilidade). Com prefers-reduced-motion, nada aqui roda
 *   e a pagina fica no estado final, estatico.
 *
 * Blocos ligados por atributo:
 *   [data-motion="passos"]  passos que se montam em sequencia (so CSS, aqui so liga a classe)
 *   [data-motion="obra"]    demonstracao da skill de obra (chat -> planilha)
 *   [data-motion="hub"]     tour pelo Hub com cursor (abas acessiveis, assumivel pelo mouse)
 *   [data-motion="bot"]     conversa de WhatsApp: bot qualifica, oferece horario, agenda (05/10)
 *
 * Cursor: no desktop e a seta que anda; em tela de toque (celular) vira um toque de dedo,
 * um circulo que aparece e pulsa no ponto do clique, sem "andar" pela tela.
 */
(function () {
  'use strict';

  var reduzido = !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // se o <head> nao ligou o .mo (movimento reduzido) ou o failsafe de 4s ja desligou, a pagina fica estatica
  var podeAnimar = !reduzido && typeof Element.prototype.animate === 'function' &&
    document.documentElement.classList.contains('mo');
  window.LuhMotion = { ativo: podeAnimar };
  if (!podeAnimar) document.documentElement.classList.remove('mo');

  var EASE = 'cubic-bezier(.16,1,.3,1)';
  var MOLA = 'cubic-bezier(.2,1.35,.4,1)';

  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function anima(el, quadros, opcoes) {
    if (!el || !podeAnimar) return Promise.resolve();
    var a = el.animate(quadros, opcoes);
    return a.finished.catch(function () {});
  }

  // Promessa que resolve quando o elemento estiver visivel (fracao minima da altura dele).
  // margemBaixo: desconta barra fixa no rodape do celular (compra/WhatsApp), que cobre o fim da tela
  function quandoVisivel(el, fracao, margemBaixo) {
    return new Promise(function (resolve) {
      var obs = new IntersectionObserver(function (ents) {
        if (ents[0].isIntersecting && ents[0].intersectionRatio >= fracao) { obs.disconnect(); resolve(); }
      }, { threshold: [0, fracao, 1], rootMargin: '0px 0px -' + (margemBaixo || 0) + 'px 0px' });
      obs.observe(el);
    });
  }

  // ---------- numeros ----------
  function milhar(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  var FORMATOS = {
    brl: function (v) { return 'R$ ' + milhar(Math.round(v)); },
    brl2: function (v) {
      var c = Math.round(v * 100), r = Math.floor(c / 100), cent = String(c % 100);
      return 'R$ ' + milhar(r) + ',' + (cent.length < 2 ? '0' + cent : cent);
    },
    pct: function (v) { return Math.round(v) + '%'; },
    int: function (v) { return String(Math.round(v)); }
  };

  function contar(el, de, ate, dur, fmt) {
    var id = (el._conta = (el._conta || 0) + 1);
    fmt = fmt || FORMATOS.int;
    el.textContent = fmt(de);
    return new Promise(function (resolve) {
      var ini = null;
      function quadro(ts) {
        if (el._conta !== id) return resolve();
        if (ini === null) ini = ts;
        var t = Math.min(1, (ts - ini) / dur), e = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(de + (ate - de) * e);
        if (t < 1) requestAnimationFrame(quadro); else { el.textContent = fmt(ate); resolve(); }
      }
      requestAnimationFrame(quadro);
    });
  }

  // ---------- cursor que anda e clica (desktop) ou toque de dedo (celular) ----------
  var TOQUE = !!(window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  function Cursor(palco) {
    this.palco = palco;
    this.toque = TOQUE;
    this.el = document.createElement('div');
    this.el.setAttribute('aria-hidden', 'true');
    if (this.toque) {
      this.el.className = 'mo-toque';
      this.el.innerHTML = '<i></i>';
    } else {
      this.el.className = 'mo-cursor';
      this.el.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3.5 2.2 19.6 12l-7 1.5 4 7.6-3 1.6-4-7.7-5.4 4.8z"/></svg>';
    }
    palco.appendChild(this.el);
    this.x = 0; this.y = 0; this.visivel = false;
  }
  Cursor.prototype.ponto = function (alvo, fx, fy) {
    var p = this.palco.getBoundingClientRect(), r = alvo.getBoundingClientRect();
    return { x: r.left - p.left + r.width * (fx == null ? 0.5 : fx), y: r.top - p.top + r.height * (fy == null ? 0.6 : fy) };
  };
  Cursor.prototype.pular = function (x, y) {
    this.x = x; this.y = y;
    this.el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  };
  Cursor.prototype.mostrar = function () {
    if (this.toque) { this.visivel = true; return Promise.resolve(); } // o dedo so aparece no toque
    if (this.visivel) return Promise.resolve();
    this.visivel = true; this.el.style.opacity = '1';
    return anima(this.el, [{ opacity: 0 }, { opacity: 1 }], { duration: 260 });
  };
  Cursor.prototype.esconder = function () {
    if (this.toque) { this.visivel = false; return Promise.resolve(); }
    if (!this.visivel) return Promise.resolve();
    this.visivel = false; this.el.style.opacity = '0';
    return anima(this.el, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
  };
  Cursor.prototype.ir = function (alvo, fx, fy, soApontar) {
    var d = this.ponto(alvo, fx, fy);
    var dist = Math.sqrt(Math.pow(d.x - this.x, 2) + Math.pow(d.y - this.y, 2));
    if (this.toque) {
      // dedo nao desliza pela tela: so muda o ponto e respeita o tempo que a mao levaria
      this.pular(d.x, d.y);
      return soApontar ? Promise.resolve() : espera(Math.min(520, Math.max(240, dist * 0.8)));
    }
    var dur = Math.min(950, Math.max(380, dist * 1.5));
    var de = 'translate3d(' + this.x + 'px,' + this.y + 'px,0)';
    // leve curva no meio do caminho: parece mao, nao robo
    var meio = 'translate3d(' + ((this.x + d.x) / 2 + 12) + 'px,' + ((this.y + d.y) / 2 - 10) + 'px,0)';
    this.pular(d.x, d.y);
    return anima(this.el, [{ transform: de }, { transform: meio, offset: 0.5 }, { transform: this.el.style.transform }],
      { duration: dur, easing: 'cubic-bezier(.45,.05,.25,1)' });
  };
  Cursor.prototype.clicar = function () {
    if (this.toque) return this.tocar();
    var onda = document.createElement('span');
    onda.className = 'mo-clique';
    onda.setAttribute('aria-hidden', 'true');
    this.palco.appendChild(onda);
    var t = 'translate3d(' + this.x + 'px,' + this.y + 'px,0)';
    anima(onda, [{ transform: t + ' scale(.2)', opacity: 0.95 }, { transform: t + ' scale(1.5)', opacity: 0 }],
      { duration: 560, easing: 'cubic-bezier(.2,.7,.3,1)' }).then(function () { onda.remove(); });
    return anima(this.el.firstChild, [{ transform: 'scale(1)' }, { transform: 'scale(.8)' }, { transform: 'scale(1)' }],
      { duration: 240, easing: 'ease-out' });
  };

  // toque de dedo: o circulo aparece no ponto, afunda, pulsa duas ondas e some
  Cursor.prototype.tocar = function () {
    var self = this, t = 'translate3d(' + this.x + 'px,' + this.y + 'px,0)';
    this.el.style.transform = t;
    [0, 230].forEach(function (atraso) {
      var onda = document.createElement('span');
      onda.className = 'mo-clique mo-clique--toque';
      onda.setAttribute('aria-hidden', 'true');
      self.palco.appendChild(onda);
      anima(onda, [{ transform: t + ' scale(.5)', opacity: 0.9 }, { transform: t + ' scale(1.9)', opacity: 0 }],
        { duration: 620, delay: 120 + atraso, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'backwards' }).then(function () { onda.remove(); });
    });
    anima(this.el, [
      { transform: t + ' scale(1.35)', opacity: 0 },
      { transform: t + ' scale(1)', opacity: 0.95, offset: 0.18 },
      { transform: t + ' scale(.82)', opacity: 0.95, offset: 0.3 },
      { transform: t + ' scale(1)', opacity: 0.9, offset: 0.48 },
      { transform: t + ' scale(1)', opacity: 0.9, offset: 0.72 },
      { transform: t + ' scale(1.1)', opacity: 0 }
    ], { duration: 1000, easing: 'ease-out' });
    // a interface reage no momento em que o dedo afunda
    return espera(300);
  };

  // ---------- 1) passos que se montam ----------
  function ligarPassos() {
    document.querySelectorAll('[data-motion="passos"]').forEach(function (bloco) {
      quandoVisivel(bloco, 0.3).then(function () { bloco.classList.add('mo-in'); });
    });
  }

  // ---------- digitacao sem mudar o tamanho da bolha ----------
  // Cada trecho de texto vira [digitado][resto transparente]: a bolha ja nasce no tamanho final.
  function prepararDigitacao(bolha, pular) {
    var trechos = [];
    var pulos = !pular ? [] : (pular.length !== undefined ? Array.prototype.slice.call(pular) : [pular]);
    var walker = document.createTreeWalker(bolha, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.data.trim()) return NodeFilter.FILTER_REJECT;
        for (var i = 0; i < pulos.length; i++) if (pulos[i].contains(n)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nos = [];
    while (walker.nextNode()) nos.push(walker.currentNode);
    nos.forEach(function (n) {
      var w = document.createElement('span'), a = document.createElement('span'), b = document.createElement('span');
      b.className = 'mo-b';
      w.appendChild(a); w.appendChild(b);
      n.parentNode.replaceChild(w, n);
      trechos.push({ a: a, b: b, txt: n.data, k: -1 });
    });
    var pontos = document.createElement('span');
    pontos.className = 'mo-dots';
    pontos.setAttribute('aria-hidden', 'true');
    pontos.innerHTML = '<i></i><i></i><i></i>';
    pontos.style.display = 'none';
    bolha.appendChild(pontos);
    return { trechos: trechos, pontos: pontos };
  }
  function mostrarAte(dig, n) {
    var resto = n;
    dig.trechos.forEach(function (t) {
      var k = Math.max(0, Math.min(t.txt.length, resto));
      resto -= t.txt.length;
      if (t.k !== k) { t.k = k; t.a.textContent = t.txt.slice(0, k); t.b.textContent = t.txt.slice(k); }
    });
  }
  function totalDe(dig) { return dig.trechos.reduce(function (s, t) { return s + t.txt.length; }, 0); }
  function digitar(dig, cps) {
    var total = totalDe(dig);
    return new Promise(function (resolve) {
      var ini = null;
      function quadro(ts) {
        if (ini === null) ini = ts;
        var n = Math.floor((ts - ini) / 1000 * cps);
        mostrarAte(dig, n);
        if (n >= total) resolve(); else requestAnimationFrame(quadro);
      }
      requestAnimationFrame(quadro);
    });
  }

  // ---------- 2) demonstracao da skill de obra ----------
  function ligarObra(demo) {
    function q(s) { return demo.querySelector(s); }
    var foto = q('[data-mo="foto"]'), leitura = q('[data-mo="leitura"]'), opcoes = q('[data-mo="opcoes"]'),
        sim = q('[data-mo-alvo="sim"]'), resposta = q('[data-mo="resposta"]'), final = q('[data-mo="final"]'),
        drive = q('[data-mo="drive"]'), linha = q('[data-mo="linha"]'), total = q('[data-conta-obra]'),
        mais = q('.obra-mais'), caixaTotal = q('.obra-total'), planilha = q('.planilha'), replay = q('.mo-replay');
    if (!foto || !leitura || !linha || !total) return;

    var pecas = [foto, leitura, opcoes, resposta, final, drive, linha];
    var de = parseFloat(total.getAttribute('data-de')), ate = parseFloat(total.getAttribute('data-ate'));
    var digLeitura = prepararDigitacao(leitura, opcoes);
    var digFinal = prepararDigitacao(final, drive);
    var cursor = new Cursor(demo);
    var miniatura = foto.querySelector('.msg-foto i');
    var scan = null;
    if (miniatura) { scan = document.createElement('b'); scan.className = 'mo-scan'; miniatura.appendChild(scan); }
    var rodando = false;

    function entra(el, quadros, op) { el.classList.add('mo-ok'); return anima(el, quadros, op); }
    function bolha(el) {
      return entra(el, [{ opacity: 0, transform: 'translate3d(0,12px,0) scale(.97)' }, { opacity: 1, transform: 'none' }],
        { duration: 380, easing: EASE });
    }
    function zerar() {
      pecas.forEach(function (el) { el.classList.remove('mo-ok'); });
      mostrarAte(digLeitura, 0); mostrarAte(digFinal, 0);
      total.textContent = FORMATOS.brl2(de);
    }
    function completar() {
      pecas.forEach(function (el) { el.classList.add('mo-ok'); });
      mostrarAte(digLeitura, 1e9); mostrarAte(digFinal, 1e9);
      total.textContent = FORMATOS.brl2(ate);
    }

    async function pensarEDigitar(dig, pausa, cps) {
      dig.pontos.style.display = 'flex';
      await espera(pausa);
      dig.pontos.style.display = 'none';
      await digitar(dig, cps);
    }

    async function rodar() {
      if (rodando) return;
      rodando = true;
      replay.hidden = true;
      zerar();
      await espera(250);

      // a foto do comprovante chega no chat
      await entra(foto, [
        { opacity: 0, transform: 'translate3d(46px,70px,0) rotate(7deg) scale(.7)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 700, easing: MOLA });
      if (scan) anima(scan, [{ opacity: 0, transform: 'translate3d(0,-10px,0)' }, { opacity: 1, offset: 0.2 },
        { opacity: 1, offset: 0.8 }, { opacity: 0, transform: 'translate3d(0,48px,0)' }], { duration: 900, iterations: 2 });

      // o Claude "pensa" e digita a leitura
      await espera(350);
      mostrarAte(digLeitura, 0);
      await bolha(leitura);
      await pensarEDigitar(digLeitura, 900, 62);
      await entra(opcoes, [{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }],
        { duration: 340, easing: MOLA });

      // o cursor anda e clica em "sim"
      var c = demo.querySelector('.chat').getBoundingClientRect(), p = demo.getBoundingClientRect();
      cursor.pular(c.right - p.left - 28, c.bottom - p.top - 16);
      await cursor.mostrar();
      await cursor.ir(sim, 0.55, 0.6);
      await cursor.clicar();
      anima(sim, [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 300 });
      await espera(120);
      await entra(resposta, [{ opacity: 0, transform: 'translate3d(24px,0,0)' }, { opacity: 1, transform: 'none' }],
        { duration: 320, easing: EASE });

      // a linha voa do chat e se encaixa na planilha (espera a planilha estar na tela, sem puxar a rolagem)
      await espera(250);
      await quandoVisivel(planilha, 0.85, 90);
      var celula = linha.querySelector('td');
      var pDemo = demo.getBoundingClientRect(), rOrig = leitura.getBoundingClientRect(), rDest = celula.getBoundingClientRect();
      var voo = document.createElement('div');
      voo.className = 'mo-voo';
      voo.setAttribute('aria-hidden', 'true');
      voo.innerHTML = '#0047 · Reforma Apto 302 · Pintura · <b>R$ 486,90</b>';
      demo.appendChild(voo);
      var sx = rOrig.left - pDemo.left + 10, sy = rOrig.top - pDemo.top + rOrig.height * 0.35;
      var ex = rDest.left - pDemo.left + 4, ey = rDest.top - pDemo.top + (rDest.height - voo.offsetHeight) / 2;
      var mx = (sx + ex) / 2 + 30, my = Math.min(sy, ey) - 50;
      function t(x, y, s) { return 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s + ')'; }
      await anima(voo, [
        { transform: t(sx, sy, 0.6), opacity: 0 },
        { transform: t(sx, sy - 8, 1), opacity: 1, offset: 0.14 },
        { transform: t(mx, my, 1.06), offset: 0.55 },
        { transform: t(ex, ey, 1), opacity: 1 }
      ], { duration: 1100, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' });
      // o cartao some rapido e a linha se encaixa celula por celula, sem os dois textos sobrepostos
      anima(voo, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }).then(function () { voo.remove(); });
      linha.classList.add('mo-ok');
      linha.querySelectorAll('td').forEach(function (td, i) {
        anima(td, [{ opacity: 0, transform: 'translate3d(-10px,0,0)' }, { opacity: 1, transform: 'none' }],
          { duration: 360, delay: 90 + i * 45, easing: EASE, fill: 'backwards' });
      });

      // o total da obra conta pra cima
      await espera(250);
      anima(mais, [{ opacity: 0, transform: 'translate3d(0,8px,0)' }, { opacity: 1, transform: 'translate3d(0,-4px,0)', offset: 0.25 },
        { opacity: 1, offset: 0.7 }, { opacity: 0, transform: 'translate3d(0,-20px,0)' }], { duration: 1700, easing: 'ease-out' });
      anima(caixaTotal, [{ transform: 'scale(1)' }, { transform: 'scale(1.025)', offset: 0.3 }, { transform: 'scale(1)' }],
        { duration: 700, easing: EASE });
      await contar(total, de, ate, 1300, FORMATOS.brl2);

      // o Claude confirma e aparece a pasta do Drive com o link
      await espera(200);
      mostrarAte(digFinal, 0);
      await bolha(final);
      await pensarEDigitar(digFinal, 600, 66);
      await entra(drive, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }],
        { duration: 520, easing: MOLA });
      await cursor.ir(drive, 0.3, 0.55);
      await cursor.clicar();
      anima(drive, [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 300 });
      await espera(700);
      await cursor.esconder();

      completar();
      replay.hidden = false;
      anima(replay, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
      rodando = false;
    }

    replay.addEventListener('click', function () { rodar(); });
    zerar();
    quandoVisivel(demo, 0.35).then(rodar);
  }

  // ---------- 3) tour pelo Hub ----------
  function ligarHub(mock) {
    var abas = Array.prototype.slice.call(mock.querySelectorAll('[role="tab"]'));
    var paineis = abas.map(function (a) { return document.getElementById(a.getAttribute('aria-controls')); });
    var titulo = mock.querySelector('[data-hub-titulo]');
    var menu = mock.querySelector('.hubmock-menu');
    var atual = Math.max(0, abas.findIndex(function (a) { return a.classList.contains('on'); }));
    var cursor = podeAnimar ? new Cursor(mock) : null;
    var mouseFino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var tourId = 0, emVista = false, montouPrimeiro = false, retomada = null, mouseDentro = false;

    function rolarMenu(aba) {
      if (menu.scrollWidth <= menu.clientWidth + 2) return;
      var alvo = aba.offsetLeft - (menu.clientWidth - aba.offsetWidth) / 2;
      menu.scrollTo({ left: Math.max(0, alvo), behavior: podeAnimar ? 'smooth' : 'auto' });
    }

    function montar(painel) {
      if (!podeAnimar) return;
      painel.getAnimations({ subtree: true }).forEach(function (a) { a.cancel(); });
      painel.querySelectorAll('[data-in]').forEach(function (el, i) {
        anima(el, [{ opacity: 0, transform: 'translate3d(0,12px,0) scale(.97)' }, { opacity: 1, transform: 'none' }],
          { duration: 480, delay: 110 + i * 65, easing: EASE, fill: 'backwards' });
      });
      painel.querySelectorAll('[data-conta]').forEach(function (el) {
        var fim = parseFloat(el.getAttribute('data-conta')), fmt = FORMATOS[el.getAttribute('data-fmt') || 'int'];
        el.textContent = fmt(0);
        setTimeout(function () { contar(el, 0, fim, 1100, fmt); }, 260);
      });
      painel.querySelectorAll('.barra').forEach(function (b, i) {
        anima(b, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
          { duration: 650, delay: 300 + i * 80, easing: EASE, fill: 'backwards' });
      });
      painel.querySelectorAll('.linha').forEach(function (l) {
        anima(l, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1200, delay: 320, easing: 'ease-in-out', fill: 'backwards' });
      });
      painel.querySelectorAll('.area').forEach(function (l) {
        anima(l, [{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 900, fill: 'backwards' });
      });
    }

    function ativar(i, animar) {
      if (i === atual) return;
      var velho = paineis[atual], novo = paineis[i];
      abas.forEach(function (a, k) {
        var on = k === i;
        a.classList.toggle('on', on);
        a.setAttribute('aria-selected', on ? 'true' : 'false');
        a.tabIndex = on ? 0 : -1;
      });
      velho.classList.remove('ativo');
      velho.setAttribute('aria-hidden', 'true');
      novo.classList.add('ativo');
      novo.removeAttribute('aria-hidden');
      if (titulo) titulo.textContent = 'hub · ' + (novo.getAttribute('data-titulo') || '');
      atual = i;
      rolarMenu(abas[i]);
      if (animar && podeAnimar) {
        velho.classList.add('saindo');
        anima(velho, [{ opacity: 1 }, { opacity: 0 }], { duration: 170 }).then(function () { velho.classList.remove('saindo'); });
        montar(novo);
      }
    }

    function pararTour() { tourId++; if (cursor) cursor.esconder(); }

    async function tour() {
      if (!cursor || !emVista) return;
      var meu = ++tourId;
      function vivo() { return meu === tourId; }
      var r = paineis[atual].getBoundingClientRect(), p = mock.getBoundingClientRect();
      if (!cursor.visivel) { cursor.pular(r.left - p.left + r.width * 0.6, r.top - p.top + r.height * 0.55); await cursor.mostrar(); }
      while (vivo()) {
        await espera(1500);
        if (!vivo()) return;
        var prox = (atual + 1) % abas.length;
        rolarMenu(abas[prox]);
        await espera(220);
        if (!vivo()) return;
        await cursor.ir(abas[prox], 0.4, 0.6);
        if (!vivo()) return;
        await cursor.clicar();
        if (!vivo()) return;
        ativar(prox, true);
        await espera(650);
        if (!vivo()) return;
        var foco = paineis[prox].querySelector('[data-foco]');
        if (foco) await cursor.ir(foco, 0.78, 0.3, true);
        if (!vivo()) return;
        await espera(900);
      }
    }

    function retomarEm(ms) {
      clearTimeout(retomada);
      retomada = setTimeout(function () { if (emVista && !mouseDentro) tour(); }, ms);
    }

    // a pessoa assume: mouse em cima de um modulo (desktop), clique/toque ou teclado
    abas.forEach(function (aba, i) {
      aba.addEventListener('click', function () { pararTour(); ativar(i, true); retomarEm(9000); });
      if (mouseFino) {
        aba.addEventListener('mouseenter', function () { clearTimeout(retomada); pararTour(); ativar(i, true); });
      }
      aba.addEventListener('keydown', function (ev) {
        var k = ev.key, d = (k === 'ArrowDown' || k === 'ArrowRight') ? 1 : (k === 'ArrowUp' || k === 'ArrowLeft') ? -1 : 0;
        if (!d) return;
        ev.preventDefault();
        var n = (i + d + abas.length) % abas.length;
        pararTour(); ativar(n, true); abas[n].focus(); retomarEm(9000);
      });
    });
    if (mouseFino) {
      mock.addEventListener('mouseenter', function () { mouseDentro = true; clearTimeout(retomada); });
      mock.addEventListener('mouseleave', function () { mouseDentro = false; retomarEm(3500); });
    }

    if (!podeAnimar) return;
    var obs = new IntersectionObserver(function (ents) {
      var e = ents[0];
      emVista = e.isIntersecting && e.intersectionRatio >= 0.35;
      if (emVista) {
        if (!montouPrimeiro) {
          montouPrimeiro = true;
          mock.classList.add('mo-vivo');
          montar(paineis[atual]);
          retomarEm(1400);
        } else if (tourId === 0 || !cursor.visivel) retomarEm(600);
      } else { clearTimeout(retomada); pararTour(); }
    }, { threshold: [0, 0.35, 0.6] });
    obs.observe(mock);
  }

  // ---------- 4) bot de WhatsApp: atende as 22h, qualifica, agenda ----------
  function ligarBot(demo) {
    function q(s) { return demo.querySelector(s); }
    var msgs = Array.prototype.slice.call(demo.querySelectorAll('[data-mo^="m"]'));
    var opcoes = q('[data-mo="opcoes"]'), horario = q('[data-mo-alvo="horario"]'), slot = q('[data-mo="agenda"]'),
        agenda = q('.agenda'), selo = q('[data-mo="selo"]'), replay = q('.mo-replay'), corpo = q('.zap-corpo');
    if (!msgs.length || !horario || !slot || !selo || !replay) return;

    var pecas = msgs.concat([opcoes, slot, selo]);
    var digs = {};
    msgs.forEach(function (m) {
      if (m.classList.contains('msg--ia')) digs[m.getAttribute('data-mo')] = prepararDigitacao(m, m.querySelectorAll('time, .chat-opcoes'));
    });
    var cursor = new Cursor(demo);
    var rodando = false;

    function entra(el, quadros, op) { el.classList.add('mo-ok'); return anima(el, quadros, op); }
    function zerar() {
      pecas.forEach(function (el) { if (el) el.classList.remove('mo-ok'); });
      Object.keys(digs).forEach(function (k) { mostrarAte(digs[k], 0); });
    }
    function completar() {
      pecas.forEach(function (el) { if (el) el.classList.add('mo-ok'); });
      Object.keys(digs).forEach(function (k) { mostrarAte(digs[k], 1e9); });
    }
    function m(n) { return q('[data-mo="m' + n + '"]'); }

    // mensagem do cliente: sobe da caixa de texto
    function cliente(el) {
      return entra(el, [{ opacity: 0, transform: 'translate3d(0,16px,0) scale(.96)' }, { opacity: 1, transform: 'none' }],
        { duration: 340, easing: EASE });
    }
    // resposta do bot: bolha nasce no tamanho final, pontinhos, e o texto digita
    async function bot(el, pausa, cps) {
      var dig = digs[el.getAttribute('data-mo')];
      mostrarAte(dig, 0);
      await entra(el, [{ opacity: 0, transform: 'translate3d(0,10px,0) scale(.97)' }, { opacity: 1, transform: 'none' }],
        { duration: 300, easing: EASE });
      dig.pontos.style.display = 'flex';
      await espera(pausa);
      dig.pontos.style.display = 'none';
      await digitar(dig, cps);
    }

    async function rodar() {
      if (rodando) return;
      rodando = true;
      replay.hidden = true;
      zerar();
      await espera(300);

      await cliente(m(1));                 // 22:01, cliente pergunta
      await espera(450);
      await bot(m(2), 650, 70);            // bot responde na hora e qualifica
      await espera(550);
      await cliente(m(3));
      await espera(400);
      await bot(m(4), 550, 70);            // segunda pergunta
      await espera(550);
      await cliente(m(5));
      await espera(400);
      await bot(m(6), 450, 64);            // oferece horarios
      await entra(opcoes, [{ opacity: 0, transform: 'scale(.85)' }, { opacity: 1, transform: 'none' }],
        { duration: 340, easing: MOLA });

      // cursor (ou dedo) escolhe o horario
      var c = corpo.getBoundingClientRect(), p = demo.getBoundingClientRect();
      cursor.pular(c.right - p.left - 30, c.bottom - p.top - 10);
      await cursor.mostrar();
      await cursor.ir(horario, 0.5, 0.6);
      await cursor.clicar();
      anima(horario, [{ transform: 'scale(1)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }], { duration: 300 });
      await espera(150);
      await cliente(m(7));
      cursor.esconder();

      // o compromisso entra na agenda (espera a agenda estar na tela, sem puxar a rolagem)
      await espera(200);
      await quandoVisivel(agenda, 0.8, 90);
      var pDemo = demo.getBoundingClientRect(), rOrig = m(7).getBoundingClientRect(), rDest = slot.querySelector('.ag-item').getBoundingClientRect();
      var origemNaTela = rOrig.bottom > 0 && rOrig.top < window.innerHeight;
      if (origemNaTela) {
        var voo = document.createElement('div');
        voo.className = 'mo-voo';
        voo.setAttribute('aria-hidden', 'true');
        voo.innerHTML = 'Quinta · <b>10:30</b> · Avaliação';
        demo.appendChild(voo);
        var sx = rOrig.left - pDemo.left, sy = rOrig.top - pDemo.top;
        var ex = rDest.left - pDemo.left, ey = rDest.top - pDemo.top + (rDest.height - voo.offsetHeight) / 2;
        var mx = (sx + ex) / 2, my = Math.min(sy, ey) - 40;
        var t = function (x, y, s) { return 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s + ')'; };
        await anima(voo, [
          { transform: t(sx, sy, 0.7), opacity: 0 },
          { transform: t(sx, sy - 6, 1), opacity: 1, offset: 0.15 },
          { transform: t(mx, my, 1.05), offset: 0.55 },
          { transform: t(ex, ey, 1), opacity: 1 }
        ], { duration: 1000, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' });
        anima(voo, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }).then(function () { voo.remove(); });
      }
      slot.classList.add('mo-ok');
      await anima(slot.querySelector('.ag-item'), [{ opacity: 0, transform: 'translate3d(0,-8px,0) scale(.96)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, easing: MOLA });

      // bot confirma e o selo fecha a historia
      await espera(250);
      await bot(m(8), 400, 72);
      await espera(250);
      await entra(selo, [{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'none' }],
        { duration: 520, easing: MOLA });

      completar();
      replay.hidden = false;
      anima(replay, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
      rodando = false;
    }

    replay.addEventListener('click', function () { rodar(); });
    zerar();
    quandoVisivel(q('.zap'), 0.3).then(rodar);
  }

  function iniciar() {
    if (podeAnimar) ligarPassos();
    if (podeAnimar) document.querySelectorAll('[data-motion="obra"]').forEach(ligarObra);
    if (podeAnimar) document.querySelectorAll('[data-motion="bot"]').forEach(ligarBot);
    // as abas do Hub funcionam mesmo sem animacao (clique e teclado)
    document.querySelectorAll('[data-motion="hub"]').forEach(ligarHub);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
