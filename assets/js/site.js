/*
 * Luh Panda · site v5 · script compartilhado por todas as paginas.
 *
 * CONFIG: as unicas coisas que mudam sem mexer no resto.
 *  - PIXEL_ID: ID do conjunto de dados (pixel) do Gerenciador de Eventos da Meta.
 *    Vazio = pixel desligado (nenhum script da Meta carrega). Nao e segredo: o ID
 *    do pixel e publico por natureza, aparece no HTML de qualquer site que usa pixel.
 *  - Sem pagamento no site (decisao de 06/10/2026): todo pedido vira conversa no WhatsApp, com
 *    mensagem pronta por produto (PEDIDOS). O evento principal do pixel e Lead/Contact no clique.
 */
(function () {
  'use strict';

  var CONFIG = {
    PIXEL_ID: '',                       // PREENCHER: ID do pixel (so numeros)
    WHATS: '5584994127476'
  };

  // Mensagem pronta do CTA principal. Um lugar so pra trocar o texto.
  var MSG_DIAGNOSTICO =
    'Oi Luh! Quero o diagnóstico grátis de 20 min.\n' +
    'Meu negócio: \n' +
    'O que mais toma meu tempo hoje: ';

  var ORIGENS = {
    home: 'Vim pelo site.',
    bot: 'Vim pela página do bot de atendimento.',
    skill: 'Vim pela página da skill de obra.',
    formacao: 'Vim pela página de formação em IA.',
    social: 'Vim pela página de social media e tráfego para clínicas.',
    automacao: 'Vim pela página de automação sob medida.',
    acesso: 'Comprei a skill de obra e quero ajuda pra instalar.'
  };

  // Pedido direto de produto com preco no site: a conversa ja chega dizendo o que a pessoa quer.
  // O pagamento e combinado com a Luh no WhatsApp (Pix, ou link de cartao gerado na hora).
  var PEDIDOS = {
    skill: { nome: 'Skill Assistente de Obra', valor: 97,
      msg: 'Oi Luh! Quero a Skill Assistente de Obra (R$ 97). Li os pré-requisitos e tenho o Claude pago.' },
    m1: { nome: 'Formação particular · Módulo 1', valor: 997,
      msg: 'Oi Luh! Quero garantir minha vaga no Módulo 1 particular (R$ 997, ou R$ 897 no Pix).' },
    m2: { nome: 'Formação particular · Módulo 2', valor: 2497,
      msg: 'Oi Luh! Quero garantir minha vaga no Módulo 2 particular (R$ 2.497, ou R$ 2.247 no Pix).' }
  };

  function linkWhats(texto) {
    return 'https://wa.me/' + CONFIG.WHATS + '?text=' + encodeURIComponent(texto);
  }

  function linkDiagnostico(origem) {
    var extra = ORIGENS[origem] ? '\n(' + ORIGENS[origem] + ')' : '';
    return linkWhats(MSG_DIAGNOSTICO + extra);
  }

  // ---------- Meta Pixel ----------
  function pixelLigado() { return /^\d{6,20}$/.test(CONFIG.PIXEL_ID); }

  function carregarPixel() {
    if (!pixelLigado()) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', CONFIG.PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function rastrear(evento, dados) {
    if (pixelLigado() && typeof window.fbq === 'function') {
      window.fbq('track', evento, dados || {});
    }
  }

  // ---------- CTA de diagnostico e WhatsApp ----------
  function ligarWhats() {
    var origemPagina = document.body.getAttribute('data-pagina') || 'home';
    document.querySelectorAll('[data-diag]').forEach(function (a) {
      a.setAttribute('href', linkDiagnostico(a.getAttribute('data-diag') || origemPagina));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
    // Lead: qualquer clique que leva pro WhatsApp
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href*="wa.me/"]');
      if (!a) return;
      var pedido = a.getAttribute('data-pedido');
      var dados = { content_name: pedido || (a.getAttribute('data-diag') ? 'diagnostico' : 'whatsapp'), content_category: origemPagina };
      if (pedido && PEDIDOS[pedido]) { dados.value = PEDIDOS[pedido].valor; dados.currency = 'BRL'; }
      rastrear('Lead', dados);
      rastrear('Contact', { content_name: dados.content_name, content_category: origemPagina });
    });
  }

  // ---------- ViewContent nas paginas de oferta ----------
  function viewContent() {
    var conteudo = document.body.getAttribute('data-conteudo');
    if (!conteudo) return;
    var dados = { content_name: conteudo, content_type: 'product', content_ids: [conteudo] };
    var valor = document.body.getAttribute('data-valor');
    if (valor) { dados.value = Number(valor); dados.currency = 'BRL'; }
    rastrear('ViewContent', dados);
  }

  // ---------- Pedido de produto pelo WhatsApp (sem checkout no site) ----------
  function ligarPedidos() {
    var botoes = document.querySelectorAll('[data-pedido]');
    if (!botoes.length) return;
    botoes.forEach(function (b) {
      var p = PEDIDOS[b.getAttribute('data-pedido')];
      if (!p) return;
      b.setAttribute('href', linkWhats(p.msg));
      b.setAttribute('target', '_blank');
      b.setAttribute('rel', 'noopener');
    });
    // skill de obra: o botao so libera depois de confirmar os pre-requisitos
    var confirmacoes = document.querySelectorAll('[data-confirma-prereq]');
    if (!confirmacoes.length) return;
    var travados = document.querySelectorAll('[data-pedido][data-exige-prereq]');
    function atualizar() {
      var ok = Array.prototype.some.call(confirmacoes, function (c) { return c.checked; });
      travados.forEach(function (b) { b.setAttribute('aria-disabled', ok ? 'false' : 'true'); });
    }
    confirmacoes.forEach(function (c) {
      c.addEventListener('change', function () {
        confirmacoes.forEach(function (o) { o.checked = c.checked; });
        atualizar();
      });
    });
    atualizar();
  }

  // ---------- Reveal ----------
  function reveal() {
    var alvos = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      alvos.forEach(function (el) { el.classList.add('on'); });
      return;
    }
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    alvos.forEach(function (el) { obs.observe(el); });
  }

  // API pequena pras paginas de pos-compra (obrigado / acesso)
  window.LuhPanda = {
    config: CONFIG,
    linkWhats: linkWhats,
    linkDiagnostico: linkDiagnostico,
    rastrear: rastrear
  };

  carregarPixel();
  document.addEventListener('DOMContentLoaded', function () {
    ligarWhats();
    viewContent();
    ligarPedidos();
    reveal();
  });
})();
