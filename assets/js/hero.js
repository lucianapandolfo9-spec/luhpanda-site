/*
 * Luh Panda · site v5 · video do hero (motion de 16 s, 30 fps).
 * - So roda se o <head> ligou html.hm-play (tela larga, sem movimento reduzido, sem economia de dados,
 *   ainda nao visto na sessao). Fora disso o hero fica no poster (ultimo quadro) com o texto visivel.
 * - Sem loop: toca uma vez e congela no ultimo quadro.
 * - O h1 e o lead sao HTML de verdade; ficam transparentes e entram com fade em 13,07 s (quadro 784 do
 *   motion, inicio do bloco final). O botao verde da nav e o do canto ficam visiveis desde o inicio.
 * - Qualquer falha (autoplay bloqueado, erro de rede, video travado) mostra o texto na hora.
 */
(function () {
  'use strict';
  var H = document.documentElement;
  var ENTRA_TEXTO = 13.07;          // segundos
  var SEGURANCA_MS = 22000;         // se o video travar, o texto entra mesmo assim
  window.LuhHero = { ativo: false };
  if (!H.classList.contains('hm-play')) return;

  var v = document.querySelector('.hero-video video');
  var pular = document.querySelector('.hero-pular');
  if (!v) { H.classList.remove('hm-play'); return; }
  window.LuhHero.ativo = true;

  var poster = v.getAttribute('poster');
  var mostrou = false;

  function mostrarTexto() {
    if (mostrou) return;
    mostrou = true;
    H.classList.add('hm-texto');
    try { sessionStorage.setItem('lp-hero-visto', '1'); } catch (e) {}
  }
  function desistir() {               // volta pro poster com o texto, sem animacao
    if (poster) v.setAttribute('poster', poster);
    H.classList.remove('hm-play');
    mostrarTexto();
  }

  // o poster e o ULTIMO quadro; durante o carregamento fica o fundo da marca, nao o fim do filme
  v.removeAttribute('poster');
  v.muted = true;
  v.src = v.getAttribute('data-src');
  var p = v.play();
  if (p && typeof p.catch === 'function') p.catch(desistir);

  v.addEventListener('timeupdate', function () { if (v.currentTime >= ENTRA_TEXTO) mostrarTexto(); });
  v.addEventListener('ended', mostrarTexto);
  v.addEventListener('error', desistir);
  setTimeout(mostrarTexto, SEGURANCA_MS);

  if (pular) {
    pular.addEventListener('click', function () {
      try { v.pause(); v.currentTime = isFinite(v.duration) ? v.duration : 15.98; } catch (e) {}
      if (poster) v.setAttribute('poster', poster);
      mostrarTexto();
      var h1 = document.querySelector('.hero-texto h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    });
  }
})();
