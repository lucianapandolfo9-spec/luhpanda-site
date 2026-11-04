// Barra relogio e aleatoriedade nao semeada na cena e no harness.
import { readFileSync } from 'node:fs';
const PROIBIDO = [
  [/\bDate\b/, 'Date'], [/performance\s*\.\s*now/, 'performance.now'],
  [/requestAnimationFrame/, 'requestAnimationFrame'], [/Math\s*\.\s*random/, 'Math.random'],
  [/@keyframes/, '@keyframes'], [/\btransition\s*:/, 'CSS transition'], [/\banimation\s*:/, 'CSS animation'],
  [/setTimeout|setInterval/, 'setTimeout/setInterval'],
  [/\.animate\s*\(/, 'Web Animations API']
];
export function lint(files) {
  const erros = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8').split('\n');
    src.forEach((linha, i) => {
      const semComentario = linha.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
      for (const [re, nome] of PROIBIDO) {
        if (!re.test(semComentario)) continue;
        // o harness BLOQUEIA Math.random e neutraliza animation/transition de proposito
        if (/Math\.random = function|animation:none!important|transition:none!important/.test(linha)) continue;
        erros.push(`${f}:${i + 1} usa ${nome}: ${linha.trim().slice(0, 90)}`);
      }
    });
  }
  return erros;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const e = lint(process.argv.slice(2).length ? process.argv.slice(2) : ['index.html', 'scene.js']);
  console.log(e.length ? e.join('\n') : 'lint ok: nenhum relogio nem aleatoriedade solta');
  process.exit(e.length ? 1 : 0);
}
