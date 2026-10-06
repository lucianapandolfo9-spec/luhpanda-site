/*
 * Luh Panda · site v5 · reels do caso real (social-media.html).
 * - Automatico: o reel so carrega e toca quando entra na tela (IntersectionObserver) e pausa ao sair.
 * - Movimento reduzido ou economia de dados: fica no poster com botao de play; so toca no clique.
 * - O botao alterna tocar/pausar sempre (controle de pausa exigido pra video em loop).
 */
(function () {
  'use strict';
  var reels = document.querySelectorAll('.reel');
  if (!reels.length) return;

  var c = navigator.connection;
  var economia = !!(c && (c.saveData || /2g/.test(c.effectiveType || '')));
  var reduzido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var automatico = !economia && !reduzido && 'IntersectionObserver' in window;

  function carregar(v) {
    if (!v.getAttribute('src')) { v.setAttribute('src', v.getAttribute('data-src')); }
  }
  function marcar(fig, tocando) {
    fig.classList.toggle('tocando', tocando);
    var b = fig.querySelector('.reel-botao');
    if (b) b.setAttribute('aria-label', (tocando ? 'Pausar o reel ' : 'Tocar o reel ') + b.getAttribute('data-rotulo'));
  }
  function tocar(fig) {
    var v = fig.querySelector('video');
    carregar(v);
    var p = v.play();
    if (p && typeof p.catch === 'function') p.catch(function () {
      marcar(fig, false);
      fig.setAttribute('data-pausado-pela-pessoa', '1');   // autoplay bloqueado: mostra o play grande
    });
  }

  reels.forEach(function (fig) {
    var v = fig.querySelector('video');
    var b = fig.querySelector('.reel-botao');
    v.muted = true;
    v.addEventListener('play', function () { marcar(fig, true); });
    v.addEventListener('pause', function () { marcar(fig, false); });
    if (b) b.addEventListener('click', function () {
      fig.setAttribute('data-pausado-pela-pessoa', v.paused ? '' : '1');
      if (v.paused) { fig.removeAttribute('data-pausado-pela-pessoa'); tocar(fig); } else { v.pause(); }
    });
  });

  if (!automatico) return;
  document.documentElement.classList.add('reels-auto');
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      var fig = e.target, v = fig.querySelector('video');
      if (e.isIntersecting) {
        if (!fig.hasAttribute('data-pausado-pela-pessoa')) tocar(fig);
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { threshold: 0.5 });
  reels.forEach(function (fig) { obs.observe(fig); });
})();
