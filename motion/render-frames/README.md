# render-frames

Renderizador determinístico de motion. Spec fixa em `spec.json`: 16 s, 1920x1080, 60 fps, 960 quadros.

A animação é uma função pura do número do quadro: `SCENE.draw(ctx, frame, t, H)` com `t = frame / 60`.
Proibido na cena: Date, performance.now, requestAnimationFrame como relógio, Math.random (bloqueado em runtime),
CSS animation/transition. Aleatoriedade só com `H.mulberry32(seed)`. `lint.mjs` barra tudo isso antes de renderizar.

## Comandos

```
npm run lint
node render.mjs                                   # cena-teste scene.js
node render.mjs --scene scenes/hero-v5.js --out out/hero   # hero do site v5 (master crf 16)
node encode.mjs --frames out/hero/frames --dest out/hero/site   # versão do site (crf 23) + posters
node determinism.mjs --scene scenes/hero-v5.js    # renderiza 2x e compara os 360 quadros e o mp4
node render.mjs --start 150 --end 150 --no-video --out out/um-quadro   # um quadro só
```

Plugar cena nova: criar `scenes/x.js` com `window.SCENE = { setup?(ctx,H), draw(ctx, frame, t, H) }`.

Chrome sai do sistema (`channel: 'chrome'`), sem baixar navegador. Raster em CPU e perfil sRGB fixos de propósito.
`out/` e `node_modules/` ficam fora do git (ver `.gitignore`).
