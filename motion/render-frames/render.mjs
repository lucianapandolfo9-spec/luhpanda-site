// Renderizador deterministico: 6 s, 1920x1080, 60 fps = 360 quadros.
// Uso: node render.mjs [--scene scene.js] [--out out/run] [--start 0] [--end 359] [--crf 16] [--no-video]
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { lint } from './lint.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(readFileSync(join(here, 'spec.json'), 'utf8'));
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes('--' + k);

const scene = arg('scene', 'scene.js');
const out = resolve(here, arg('out', 'out/run'));
const start = Number(arg('start', 0)), end = Number(arg('end', spec.frames - 1));
const crf = arg('crf', '16');
const framesDir = join(out, 'frames');

const erros = lint([join(here, 'index.html'), resolve(here, scene)]);
if (erros.length) { console.error('LINT FALHOU:\n' + erros.join('\n')); process.exit(1); }

mkdirSync(framesDir, { recursive: true });
// raster por software e cor fixa: mesmo quadro, mesmos bytes
const CHROME_ARGS = ['--disable-gpu', '--disable-gpu-rasterization', '--disable-accelerated-2d-canvas', '--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text'];
let browser;
try { browser = await chromium.launch({ channel: 'chrome', args: CHROME_ARGS }); }
catch { browser = await chromium.launch({ args: CHROME_ARGS }); }
const ctx = await browser.newContext({ viewport: { width: spec.width, height: spec.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await ctx.newPage();
page.on('pageerror', e => { console.error('ERRO NA PAGINA:', e.message); process.exit(1); });
await page.goto(pathToFileURL(join(here, 'index.html')).href + '?scene=' + encodeURIComponent(scene));
await page.evaluate(() => window.__whenReady());

const hashes = {};
const t0 = process.hrtime.bigint();
for (let n = start; n <= end; n++) {
  await page.evaluate((f) => window.renderFrame(f), n);
  // espera o quadro pintar (rAF aqui e so barreira de pintura, nunca relogio da animacao)
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: spec.width, height: spec.height }, animations: 'disabled' });
  const name = String(n).padStart(4, '0') + '.png';
  writeFileSync(join(framesDir, name), png);
  hashes[name] = createHash('sha256').update(png).digest('hex');
  if (n % 60 === 0) process.stdout.write(`quadro ${n}/${end}\n`);
}
await browser.close();
writeFileSync(join(out, 'hashes.json'), JSON.stringify(hashes, null, 1));
console.log(`quadros ${start}-${end} em ${(Number(process.hrtime.bigint() - t0) / 1e9).toFixed(1)}s`);

if (!flag('no-video') && start === 0 && end === spec.frames - 1) {
  const mp4 = join(out, 'video.mp4');
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-framerate', String(spec.fps), '-i', join(framesDir, '%04d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', crf, '-preset', 'slow', '-r', String(spec.fps),
    '-movflags', '+faststart', '-fflags', '+bitexact', '-flags:v', '+bitexact', '-threads', '1', mp4], { stdio: 'inherit' });
  if (r.status !== 0) { console.error('ffmpeg falhou'); process.exit(1); }
  console.log('video: ' + mp4);
}
