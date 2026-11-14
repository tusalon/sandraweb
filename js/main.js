const $ = s => document.querySelector(s);
const fill = (sel, files, alt) => { $(sel).innerHTML = files.map(f => `<img src="img/${f}" alt="${alt}" loading="lazy">`).join(''); };
const pad = n => String(n).padStart(2, '0');

fill('#grid', Array.from({ length: 38 }, (_, i) => `g/${pad(i + 1)}.jpg`), 'Uñas por Gordi\'s Nails');
fill('#clases-strip', [1, 2, 3, 4, 5].map(i => `clase${i}.jpg`), 'Trabajo de una alumna');
fill('#op-strip', Array.from({ length: 9 }, (_, i) => `op/${i + 1}.jpg`), 'Opinión de una clienta');
fill('#local-grid', [1, 2, 3, 4, 5, 6].map(i => `local${i}.jpg`), 'Local de Gordi\'s Nails');

// lightbox
const lb = $('#lb');
document.addEventListener('click', e => {
  if (e.target.matches('.grid img,.strip img')) { lb.querySelector('img')?.remove(); lb.append(Object.assign(new Image(), { src: e.target.src, alt: e.target.alt })); lb.hidden = false; }
  else if (!lb.hidden) lb.hidden = true;
});
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

// idioma ES/EN: los textos llevan data-es / data-en
let lang = 'es';
try { lang = localStorage.getItem('lang') || 'es'; } catch (e) {}
function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-' + l + ']').forEach(el => { el.textContent = el.dataset[l]; });
  $('#lang').textContent = l === 'es' ? 'EN' : 'ES';
  try { localStorage.setItem('lang', l); } catch (e) {}
}
$('#lang').onclick = () => setLang(lang === 'es' ? 'en' : 'es');
if (lang !== 'es') setLang(lang);
$('#y').textContent = new Date().getFullYear();
