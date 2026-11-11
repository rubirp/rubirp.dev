// Genera public/docs/cv-es.pdf y public/docs/cv-en.pdf a partir del contenido de este archivo.
// Uso:  node cv-src/build-cv.mjs
// Requiere Google Chrome o Microsoft Edge instalados (se usan en modo headless para imprimir a PDF).
// El HTML intermedio queda en cv-src/out/ por si quieres revisarlo en el navegador.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const contact = {
  email: 'rubi_almansa@hotmail.com',
  web: 'rubirp.dev',
  linkedin: 'linkedin.com/in/rubirp',
  github: 'github.com/rubirp',
};

const cv = {
  es: {
    file: 'cv-es.pdf',
    lang: 'es',
    name: 'Rubén Rodríguez Pardo',
    role: 'Desarrollador de videojuegos',
    stack: 'TypeScript, Cocos Creator, HTML5',
    location: 'España, teletrabajo',
    headings: { profile: 'Perfil', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', links: 'Enlaces' },
    profile:
      'Desarrollador de videojuegos con más de cinco años de experiencia profesional creando juegos HTML5 con TypeScript y Cocos Creator. Actualmente trabajo en Linko Studios, estudio asociado en exclusiva a Games Global, desarrollando slots para casinos online regulados. Antes desarrollé juegos casuales y multijugador para Pogo (Electronic Arts) en Monti Games y Magic Media. Soy Ingeniero Multimedia y fundé Frasquito Games, la marca bajo la que publico mis proyectos independientes.',
    jobs: [
      {
        company: 'Linko Studios',
        client: 'Games Global',
        dates: '11/2024 – actualidad',
        role: 'Desarrollador de videojuegos',
        text:
          'Desarrollo de slots HTML5 para casinos online. Participo en todo el ciclo de vida de los juegos, desde las primeras fases hasta el lanzamiento y el mantenimiento posterior: implemento mecánicas y funcionalidades, cuido el rendimiento y la adaptación a móvil y escritorio, y trabajo junto a los equipos de arte, diseño y QA para llevar cada título a producción.',
        projects: [
          {
            name: 'Proyecto sin anunciar',
            note: 'Responsable del desarrollo de cliente',
            text:
              'Nuevo slot del estudio en el que llevo el peso del desarrollo de cliente: funcionalidades nuevas y su integración con el servidor, optimización de la carga y adaptación a móviles y tabletas.',
          },
          {
            name: 'Proyecto sin anunciar',
            note: 'Arranque del proyecto y soporte',
            text:
              'Preparación de la base del juego, montaje del arte y las animaciones y primeras versiones de los controles de la interfaz y sus layouts. Soporte puntual posterior al equipo.',
          },
          {
            name: 'Pachinko Linko 5',
            note: 'Segunda entrega de la serie',
            text:
              'Sistema del personaje animado con Spine, lluvia de monedas con cierre de fuegos artificiales mediante shaders, popup de velocidad rápida, rediseño del layout para cualquier proporción de pantalla, sonido, localización por mercados y corrección de errores de QA.',
          },
          {
            name: 'Linko 5',
            note: 'Título de debut del estudio (02/2026)',
            text:
              'Giros gratis, Linko Wheel, comodines y sus animaciones, recuperación de partidas interrumpidas, sistema de sonido, vistas vertical y horizontal y corrección de errores hasta el lanzamiento.',
          },
        ],
      },
      {
        company: 'Magic Media',
        client: 'Pogo, Electronic Arts',
        dates: '12/2023 – 09/2024',
        role: 'Desarrollador de videojuegos TypeScript',
        text:
          'Trabajo en un equipo multidisciplinar (diseño, arte, desarrollo y QA) para la plataforma Pogo. Además del juego, desarrollé herramientas de soporte como el simulador de balanceo.',
        projects: [
          {
            name: 'Pogo Slots',
            note: 'Expansión, lobby y mejoras',
            text:
              'Mi primera experiencia con juegos de tipo slots. Ampliamos el juego con un nuevo título, renovamos el lobby, mejoramos la experiencia de usuario y añadimos contenido.',
          },
        ],
      },
      {
        company: 'Monti Games',
        client: 'Pogo, Electronic Arts',
        dates: '05/2021 – 08/2023',
        role: 'Desarrollador de videojuegos',
        text:
          'Equipo de ingeniería dedicado al desarrollo y mantenimiento de juegos casuales para Pogo, la plataforma web de Electronic Arts. También actualicé los frameworks y SDKs comunes.',
        projects: [
          {
            name: 'Risk: Pogo Domination',
            note: 'Refactorización y rendimiento',
            text:
              'Refactorización completa para mejorar rendimiento y mantenimiento: nuevas funcionalidades, lógica migrada del cliente al servidor, mejor sincronización entre jugadores y restauración de partidas abandonadas.',
          },
          {
            name: 'Yahtzee: Wild!',
            note: 'Desarrollo desde cero',
            text:
              'Lógica y mecánicas de cliente y servidor, restauración de partidas, emparejamiento, recompensas, FTUE y mejoras de rendimiento.',
          },
          {
            name: 'Scrabble: Crossword Game',
            note: 'Rebranding y mantenimiento',
            text: 'Actualización gráfica y mecánica de un juego existente, con soporte principalmente en el cliente.',
          },
        ],
      },
      {
        company: 'Frasquito Games',
        client: 'Proyectos independientes',
        dates: '01/2018 – 05/2023',
        role: 'Desarrollador de videojuegos',
        text:
          'Marca propia bajo la que diseño, desarrollo y publico mis juegos (frasquitogames.com). Entre ellos Touch the Coin, publicado en Google Play con PhaserJS, y Pet Balls, hecho con Cocos Creator.',
        projects: [],
      },
    ],
    education: [
      { place: 'Universidad de Alicante', dates: '2012 – 2017', title: 'Grado en Ingeniería Multimedia' },
      { place: 'IES Herminio Almendros, Almansa', dates: '2010 – 2012', title: 'Bachillerato de Ciencias y Tecnología' },
    ],
    skills: [
      { label: 'Motores y frameworks', items: 'Cocos Creator, PhaserJS, Unity, Godot, SFML' },
      { label: 'Lenguajes', items: 'TypeScript, JavaScript, C/C++, C#, HTML, CSS' },
      { label: 'Pruebas', items: 'Jest, Cypress' },
      { label: 'Herramientas', items: 'Git, Jenkins, Spine, Jira, Trello, Perforce' },
      { label: 'Idiomas', items: 'Español nativo, inglés nivel B1' },
      { label: 'Competencias', items: 'Trabajo en equipo, proactividad, autogestión' },
    ],
    links: [
      ['Portfolio', 'rubirp.dev'],
      ['LinkedIn', 'linkedin.com/in/rubirp'],
      ['GitHub', 'github.com/rubirp'],
      ['Frasquito Games', 'frasquitogames.com'],
      ['Games Global', 'gamesglobal.com'],
      ['Pogo', 'pogo.com'],
    ],
  },
  en: {
    file: 'cv-en.pdf',
    lang: 'en',
    name: 'Rubén Rodríguez Pardo',
    role: 'Game Developer',
    stack: 'TypeScript, Cocos Creator, HTML5',
    location: 'Spain, remote',
    headings: { profile: 'Profile', experience: 'Experience', education: 'Education', skills: 'Skills', links: 'Links' },
    profile:
      'Game developer with more than five years of professional experience building HTML5 games with TypeScript and Cocos Creator. I currently work at Linko Studios, an exclusive studio partner of Games Global, developing slots for regulated online casinos. Before that I built casual and multiplayer games for Pogo (Electronic Arts) at Monti Games and Magic Media. I hold a degree in Multimedia Engineering and founded Frasquito Games, the brand under which I publish my independent projects.',
    jobs: [
      {
        company: 'Linko Studios',
        client: 'Games Global',
        dates: '11/2024 – present',
        role: 'Game Developer',
        text:
          'HTML5 slot development for online casinos. I take part in the whole life cycle of the games, from the early stages through launch and later maintenance: I implement mechanics and features, look after performance and how each game adapts to mobile and desktop, and work with the art, design and QA teams to take each title to production.',
        projects: [
          {
            name: 'Unannounced project',
            note: 'Lead on client development',
            text:
              'A new slot from the studio where I carry most of the client development: new features and their server integration, load-time optimization and adapting the game to phones and tablets.',
          },
          {
            name: 'Unannounced project',
            note: 'Project kick-off and support',
            text:
              'Prepared the game base, assembled the art and animations, and built the first versions of the interface controls and their layouts. Occasional support for the team afterwards.',
          },
          {
            name: 'Pachinko Linko 5',
            note: 'Second title in the series',
            text:
              'Spine-animated character system, coin rain with a shader-based fireworks finale, quick-speed popup, layout rework for any screen ratio, sound, per-market localization and QA bug fixing.',
          },
          {
            name: 'Linko 5',
            note: 'The studio’s debut title (02/2026)',
            text:
              'Free spins, Linko Wheel, wilds and their animations, recovery of interrupted rounds, sound system, portrait and landscape views, and bug fixing through to launch.',
          },
        ],
      },
      {
        company: 'Magic Media',
        client: 'Pogo, Electronic Arts',
        dates: '12/2023 – 09/2024',
        role: 'TypeScript Game Developer',
        text:
          'Worked in a multidisciplinary team (design, art, development and QA) for the Pogo platform. Besides the game itself, I built support tools such as the game balancing simulator.',
        projects: [
          {
            name: 'Pogo Slots',
            note: 'Expansion, lobby and improvements',
            text:
              'My first experience with slot games. We expanded the game with a new title, refreshed the lobby, improved the user experience and added content.',
          },
        ],
      },
      {
        company: 'Monti Games',
        client: 'Pogo, Electronic Arts',
        dates: '05/2021 – 08/2023',
        role: 'Game Developer',
        text:
          'Engineering team dedicated to developing and maintaining casual games for Pogo, the Electronic Arts web platform. I also updated the shared frameworks and SDKs.',
        projects: [
          {
            name: 'Risk: Pogo Domination',
            note: 'Refactoring and performance',
            text:
              'Full refactor to improve performance and maintainability: new features, logic moved from client to server, better player synchronization and restoring abandoned games.',
          },
          {
            name: 'Yahtzee: Wild!',
            note: 'Built from scratch',
            text:
              'Client and server logic and mechanics, game state restoration, matchmaking, rewards, FTUE and performance improvements.',
          },
          {
            name: 'Scrabble: Crossword Game',
            note: 'Rebranding and maintenance',
            text: 'Graphical and mechanical update of an existing game, with support mainly on the client side.',
          },
        ],
      },
      {
        company: 'Frasquito Games',
        client: 'Independent projects',
        dates: '01/2018 – 05/2023',
        role: 'Game Developer',
        text:
          'My own brand, under which I design, develop and publish my games (frasquitogames.com). They include Touch the Coin, released on Google Play with PhaserJS, and Pet Balls, built with Cocos Creator.',
        projects: [],
      },
    ],
    education: [
      { place: 'University of Alicante', dates: '2012 – 2017', title: 'Bachelor’s Degree in Multimedia Engineering' },
      { place: 'IES Herminio Almendros, Almansa', dates: '2010 – 2012', title: 'High School Diploma in Science and Technology' },
    ],
    skills: [
      { label: 'Engines and frameworks', items: 'Cocos Creator, PhaserJS, Unity, Godot, SFML' },
      { label: 'Languages', items: 'TypeScript, JavaScript, C/C++, C#, HTML, CSS' },
      { label: 'Testing', items: 'Jest, Cypress' },
      { label: 'Tools', items: 'Git, Jenkins, Spine, Jira, Trello, Perforce' },
      { label: 'Spoken languages', items: 'Native Spanish, English level B1' },
      { label: 'Strengths', items: 'Teamwork, proactivity, self-management' },
    ],
    links: [
      ['Portfolio', 'rubirp.dev'],
      ['LinkedIn', 'linkedin.com/in/rubirp'],
      ['GitHub', 'github.com/rubirp'],
      ['Frasquito Games', 'frasquitogames.com'],
      ['Games Global', 'gamesglobal.com'],
      ['Pogo', 'pogo.com'],
    ],
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const link = (host) => `<a href="https://${host}">${host}</a>`;

const css = `
  @page { size: A4; margin: 14mm 15mm 13mm; }
  * { box-sizing: border-box; }
  html { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-size: 9.6pt; line-height: 1.42; color: #1c2430; }
  body { margin: 0; }
  a { color: #1d4ed8; text-decoration: none; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; padding-bottom: 4mm; border-bottom: 1.2pt solid #1c2430; }
  h1 { font-size: 23pt; line-height: 1.1; margin: 0; font-weight: 700; letter-spacing: -0.01em; }
  .role { margin: 1.5mm 0 0; font-size: 11.5pt; font-weight: 600; color: #1d4ed8; }
  .stack { margin: 0.5mm 0 0; color: #51607a; }
  .contact { margin: 0; padding: 0; list-style: none; text-align: right; font-size: 9pt; line-height: 1.5; white-space: nowrap; }
  h2 { font-size: 11pt; margin: 5.5mm 0 2mm; font-weight: 700; color: #1c2430; break-after: avoid; }
  h2::after { content: ""; display: block; height: 0.6pt; background: #c9d2e0; margin-top: 1mm; }
  p { margin: 0; }
  .job { margin-top: 3.2mm; }
  .job:first-of-type { margin-top: 0; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; break-after: avoid; }
  .job-head h3 { margin: 0; font-size: 10.6pt; font-weight: 700; }
  .job-head h3 span { font-weight: 400; color: #51607a; }
  .dates { white-space: nowrap; font-variant-numeric: tabular-nums; color: #1c2430; font-weight: 600; font-size: 9.2pt; }
  .job-role { font-weight: 600; color: #1d4ed8; margin-bottom: 0.8mm; break-after: avoid; }
  .projects { list-style: none; margin: 1.6mm 0 0; padding: 0 0 0 3.5mm; border-left: 1.6pt solid #dbe3ef; }
  .projects li { margin-top: 1.5mm; break-inside: avoid; }
  .projects li:first-child { margin-top: 0; }
  .p-head { display: flex; justify-content: space-between; gap: 5mm; align-items: baseline; }
  .p-head b { font-weight: 700; }
  .p-head i { font-style: normal; color: #51607a; font-size: 9pt; text-align: right; }
  .edu { display: flex; justify-content: space-between; gap: 6mm; margin-top: 1.4mm; break-inside: avoid; }
  .edu:first-of-type { margin-top: 0; }
  .edu b { font-weight: 700; }
  .edu span { color: #51607a; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4mm 8mm; margin: 0; }
  .skills div { break-inside: avoid; }
  .skills dt { font-weight: 700; display: inline; }
  .skills dt::after { content: ": "; }
  .skills dd { display: inline; margin: 0; }
  .links { display: grid; grid-template-columns: repeat(3, auto); justify-content: space-between; white-space: nowrap; gap: 1mm 8mm; margin: 0; padding: 0; list-style: none; }
  .links span { color: #51607a; }
  section { break-inside: auto; }
  .keep { break-inside: avoid; }
`;

function render(d) {
  const jobs = d.jobs
    .map(
      (j) => `
      <div class="job">
        <div class="job-head"><h3>${esc(j.company)} <span>| ${esc(j.client)}</span></h3><span class="dates">${esc(j.dates)}</span></div>
        <p class="job-role">${esc(j.role)}</p>
        <p>${esc(j.text)}</p>
        ${
          j.projects.length
            ? `<ul class="projects">${j.projects
                .map((p) => `<li><div class="p-head"><b>${esc(p.name)}</b><i>${esc(p.note)}</i></div><p>${esc(p.text)}</p></li>`)
                .join('')}</ul>`
            : ''
        }
      </div>`
    )
    .join('');

  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8">
<title>${esc(d.name)} | CV</title>
<style>${css}</style>
</head>
<body>
  <header>
    <div>
      <h1>${esc(d.name)}</h1>
      <p class="role">${esc(d.role)}</p>
      <p class="stack">${esc(d.stack)}</p>
    </div>
    <ul class="contact">
      <li><a href="mailto:${contact.email}">${contact.email}</a></li>
      <li>${link(contact.web)}</li>
      <li>${link(contact.linkedin)}</li>
      <li>${link(contact.github)}</li>
      <li>${esc(d.location)}</li>
    </ul>
  </header>

  <section><h2>${d.headings.profile}</h2><p>${esc(d.profile)}</p></section>
  <section><h2>${d.headings.experience}</h2>${jobs}</section>
  <section class="keep"><h2>${d.headings.education}</h2>
    ${d.education.map((e) => `<div class="edu"><p><b>${esc(e.title)}</b> <span>| ${esc(e.place)}</span></p><span class="dates">${esc(e.dates)}</span></div>`).join('')}
  </section>
  <section class="keep"><h2>${d.headings.skills}</h2>
    <dl class="skills">${d.skills.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.items)}</dd></div>`).join('')}</dl>
  </section>
  <section class="keep"><h2>${d.headings.links}</h2>
    <ul class="links">${d.links.map(([l, h]) => `<li><span>${esc(l)}:</span> ${link(h)}</li>`).join('')}</ul>
  </section>
</body>
</html>`;
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('No se encontró Chrome ni Edge. Define CHROME_PATH con la ruta del navegador.');
  return found;
}

const outDir = join(here, 'out');
mkdirSync(outDir, { recursive: true });
const browser = findBrowser();

for (const d of Object.values(cv)) {
  const htmlPath = join(outDir, d.file.replace('.pdf', '.html'));
  const pdfPath = join(root, 'public', 'docs', d.file);
  writeFileSync(htmlPath, render(d), 'utf8');
  execFileSync(
    browser,
    ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--user-data-dir=${join(outDir, '.profile')}`, `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href],
    { stdio: 'ignore' }
  );
  console.log('PDF generado:', pdfPath);
}
