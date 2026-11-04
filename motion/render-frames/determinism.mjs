// Uso: node determinism.mjs [--scene scenes/hero-v5.js]
// Prova de determinismo: renderiza duas vezes (completo) e compara o hash de TODOS os quadros + md5 do mp4.
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const sceneArg = process.argv.includes('--scene') ? ['--scene', process.argv[process.argv.indexOf('--scene') + 1]] : [];
const run = (o) => { const r = spawnSync('node', ['render.mjs', ...sceneArg, '--out', o], { stdio: 'inherit' }); if (r.status) process.exit(r.status); };
run('out/det-a'); run('out/det-b');
const a = JSON.parse(readFileSync('out/det-a/hashes.json')), b = JSON.parse(readFileSync('out/det-b/hashes.json'));
const nomes = Object.keys(a); const dif = nomes.filter(n => a[n] !== b[n]);
const md5 = (p) => createHash('md5').update(readFileSync(p)).digest('hex');
import { existsSync } from 'node:fs';
if (existsSync('out/hero/hashes.json')) { const c = JSON.parse(readFileSync('out/hero/hashes.json')); console.log('contra o master out/hero: diferentes =', nomes.filter(n => c[n] !== a[n]).length); }
const unicos = new Set(Object.values(a)).size;
console.log(`quadros: ${nomes.length} · diferentes entre run A e B: ${dif.length} · hashes unicos dentro da run A: ${unicos}`);
const N = nomes.length; for (const n of [0, Math.round(N / 4), Math.round(N / 2), Math.round(3 * N / 4), N - 1].map(k => String(k).padStart(4, '0') + '.png')) console.log(n, a[n].slice(0, 16), b[n].slice(0, 16), a[n] === b[n] ? 'IGUAL' : 'DIFERENTE');
const ma = md5('out/det-a/video.mp4'), mb = md5('out/det-b/video.mp4');
console.log('mp4 md5', ma, mb, ma === mb ? 'IGUAL' : 'DIFERENTE');
process.exit(dif.length ? 1 : 0);
