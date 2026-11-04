// Versao para o site a partir dos quadros ja renderizados (nao renderiza de novo).
// Uso: node encode.mjs --frames out/hero/frames --dest out/hero/site [--crf 23] [--max-mb 2.5]
// Gera hero-motion.mp4 (60 fps). Se passar de --max-mb, gera tambem hero-motion-30fps.mp4 (a spec dela e 60; 30 so por peso).
// Gera hero-poster.jpg (1920x1080, ultimo quadro) e hero-poster-1280.jpg.
import { spawnSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { readFileSync } from 'node:fs';
const last = String(JSON.parse(readFileSync(new URL('./spec.json', import.meta.url))).frames - 1).padStart(4, '0');   // poster = ultimo quadro
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const frames = resolve(arg('frames', 'out/hero/frames')), dest = resolve(arg('dest', 'out/hero/site'));
const crf = arg('crf', '23'), maxMB = Number(arg('max-mb', '2.5'));
mkdirSync(dest, { recursive: true });
const ff = (a) => { const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...a], { stdio: 'inherit' }); if (r.status) process.exit(r.status); };
const enc = ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', crf, '-preset', 'slow', '-movflags', '+faststart', '-an', '-fflags', '+bitexact', '-flags:v', '+bitexact', '-threads', '1'];
const mb = (p) => statSync(p).size / 1048576;
const v60 = join(dest, 'hero-motion.mp4');
ff(['-framerate', '60', '-i', join(frames, '%04d.png'), ...enc, '-r', '60', v60]);
console.log(`60 fps: ${mb(v60).toFixed(2)} MB`);
if (mb(v60) > maxMB) {
  const v30 = join(dest, 'hero-motion-30fps.mp4');
  // sobe o crf de 1 em 1 (ate --crf-max, padrao 30) ate caber no limite
  for (let c = Number(crf); c <= Number(arg('crf-max', '30')); c++) {
    const enc30 = enc.map((x, i) => (enc[i - 1] === '-crf' ? String(c) : x));
    ff(['-framerate', '60', '-i', join(frames, '%04d.png'), '-vf', "select='not(mod(n,2))',setpts=N/(30*TB)", ...enc30, '-r', '30', v30]);
    console.log(`30 fps crf ${c}: ${mb(v30).toFixed(2)} MB`);
    if (mb(v30) <= maxMB) break;
  }
}
ff(['-i', join(frames, last + '.png'), '-q:v', '3', join(dest, 'hero-poster.jpg')]);
ff(['-i', join(frames, last + '.png'), '-vf', 'scale=1280:720', '-q:v', '3', join(dest, 'hero-poster-1280.jpg')]);
console.log(`poster: ${(statSync(join(dest, 'hero-poster.jpg')).size / 1024).toFixed(0)} KB, ${(statSync(join(dest, 'hero-poster-1280.jpg')).size / 1024).toFixed(0)} KB`);
