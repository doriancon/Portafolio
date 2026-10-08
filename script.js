(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.querySelector('main');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => {
    const url = String(value || '').trim();
    return /^(https?:|mailto:|tel:)/i.test(url) || (!/^[a-z]+:/i.test(url) && !url.startsWith('//')) ? esc(url) : '';
  };
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const star = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="m50 0 9 33 29-21-21 29 33 9-33 9 21 29-29-21-9 33-9-33-29 21 21-29L0 50l33-9-21-29 29 21Z"/></svg>';
  const play = '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="m24 17 20 13-20 13Z"/></svg>';
  const socialActions = '<svg viewBox="0 0 24 24"><path d="M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12Z"/></svg><svg viewBox="0 0 24 24"><path d="M21 11a9 9 0 0 1-9 9c-2 0-3-.5-4-1L3 21l2-5a9 9 0 1 1 16-5Z"/></svg><svg viewBox="0 0 24 24"><path d="m3 4 19-1-8 19-3-10-8-8Zm8 8L22 3"/></svg><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>';
  const socials = () => Object.entries(data.profile.links).filter(([,url]) => url).map(([name,url]) => `<a href="${safeURL(url)}" target="_blank" rel="noopener noreferrer">${esc(name)} ${arrow}</a>`).join('');

  function placeholder(item, index) {
    return `<div class="piece-placeholder ph-${esc(item.variant || (item.type === 'video' ? 'video' : 'type'))}">
      <div class="ph-register"><span>${String(index + 1).padStart(2, '0')}</span><span>${item.type === 'video' ? 'MOTION / 9:16' : 'ESPACIO PARA UNA PIEZA'}</span></div>
      <div class="ph-art" aria-hidden="true"><i></i><i></i><i></i>${item.type === 'video' ? play : star}</div>
      <div class="ph-label"><strong>[${esc(item.label.toUpperCase())}]</strong><small>Material por incorporar</small></div>
    </div>`;
  }

  function media(item, index) {
    if (!item.src) return placeholder(item, index);
    if (item.type === 'video') {
      return `<video controls playsinline preload="none" ${item.poster ? `poster="${safeURL(item.poster)}"` : ''} ${item.autoplay ? 'data-autoplay muted loop' : ''} aria-label="${esc(item.label)}"><source src="${safeURL(item.src)}" type="video/mp4">Tu navegador no puede reproducir este video.</video>`;
    }
    return `<img src="${safeURL(item.src)}" alt="${esc(item.alt || item.label)}" loading="lazy" decoding="async" ${item.width ? `width="${Number(item.width)}" height="${Number(item.height)}"` : ''} ${item.fit === 'contain' ? 'class="fit-contain"' : ''}>`;
  }

  function piece(item, index) {
    const frame = item.frame || (item.type === 'video' ? 'phone' : 'none');
    const device = frame === 'phone' || frame === 'laptop';
    const account = item.account || 'Contenido de marca';
    const social = frame === 'social';
    return `<figure class="work-piece frame-${esc(frame)} ${item.src ? 'has-media' : 'is-placeholder'}" id="${esc(item.id)}" ${item.width ? `style="--media-ratio:${Number(item.width)} / ${Number(item.height)}"` : ''}>
      <div class="piece-surface">${social ? `<div class="social-topline"><span><strong>${esc(account)}</strong><small>Contenido de marca</small></span><i aria-hidden="true">···</i></div><div class="social-image">` : ''}${device ? '<div class="device-screen">' : ''}${media(item, index)}${device ? '</div>' : ''}${social ? `</div><div class="social-actions" aria-hidden="true">${socialActions}</div>` : ''}</div>
      ${item.src && item.type === 'image' ? `<button class="piece-zoom" data-piece="${esc(item.id)}" aria-label="Ampliar ${esc(item.label)}">${arrow}</button>` : ''}
      ${frame === 'campaign' && !item.src ? '<div class="campaign-props" aria-hidden="true"><span class="concept-sheet"><b>01</b>CONCEPTO<i></i><i></i><i></i></span><span class="copy-note">ESPACIO<br>PARA COPY <i>↗</i></span></div>' : ''}
      ${frame === 'laptop' ? '<div class="device-base" aria-hidden="true"></div>' : ''}
      <figcaption><span>${esc(item.caption || item.label)}</span><span>${item.type === 'video' ? 'VIDEO' : item.frame === 'laptop' ? 'DESKTOP' : item.frame === 'phone' ? 'MOBILE' : String(index + 1).padStart(2, '0')}</span></figcaption>
    </figure>`;
  }

  function workSection(section, brandId) {
    return `<section class="work-section layout-${esc(section.layout)}" id="${esc(brandId)}-${esc(section.id)}" aria-labelledby="title-${esc(brandId)}-${esc(section.id)}">
      <div class="work-section-heading reveal"><div><p class="eyebrow">${esc(section.label)}</p><h4 id="title-${esc(brandId)}-${esc(section.id)}">${esc(section.title)}</h4></div><p>${esc(section.intro)}</p></div>
      <div class="piece-composition" ${section.stageLabel ? `data-stage="${esc(section.stageLabel)}"` : ''}>${section.items.map(piece).join('')}</div>
    </section>`;
  }

  function chapter(project, index) {
    const next = data.projects[index + 1];
    return `<article class="brand-chapter theme-${esc(project.theme)}" id="marca-${esc(project.id)}" aria-labelledby="title-${esc(project.id)}">
      <header class="chapter-opening section-pad">
        <div class="chapter-kicker"><span>CAPÍTULO ${esc(project.number)} / ${String(data.projects.length).padStart(2,'0')}</span><span>${esc(project.year || 'EXPLORACIONES PROPIAS')}</span></div>
        <div class="chapter-title-wrap reveal"><span class="chapter-number" aria-hidden="true">${esc(project.number)}</span><h3 id="title-${esc(project.id)}">${esc(project.name)}</h3><span class="chapter-symbol" aria-hidden="true">${star}</span></div>
        <div class="chapter-intro"><div><p class="eyebrow">${esc(project.category)}</p><p class="${project.title ? 'chapter-statement' : 'chapter-summary'}">${esc(project.title || project.context)}</p></div><div class="chapter-context">${project.title ? `<p>${esc(project.context)}</p>` : ''}<dl><div><dt>MI ROL</dt><dd>${esc(project.role)}</dd></div><div><dt>QUÉ HICE</dt><dd>${esc(project.actions)}</dd></div></dl></div></div>
        <nav class="chapter-index" aria-label="Secciones de ${esc(project.name)}">${project.sections.map(s => `<a href="#${esc(project.id)}-${esc(s.id)}">${esc(s.label.split(' / ')[1].replace(/\.$/,''))}<span aria-hidden="true">↓</span></a>`).join('')}${(project.children || []).map(c=>`<a href="#marca-${esc(c.id)}">${esc(c.name)}<span aria-hidden="true">↓</span></a>`).join('')}</nav>
      </header>
      <div class="chapter-work section-pad">${project.sections.map(s => workSection(s, project.id)).join('')}
        ${(project.children || []).map(child => `<section class="independent-case" id="marca-${esc(child.id)}"><div class="independent-intro reveal"><div><p class="eyebrow">${esc(child.category)}</p><h3>${esc(child.name)}</h3></div><p>${esc(child.context)}</p></div>${child.sections.map(s => workSection(s, child.id)).join('')}</section>`).join('')}
      </div>
      ${next ? `<a class="chapter-transition section-pad" href="#marca-${esc(next.id)}"><span>SIGUIENTE CAPÍTULO / ${esc(next.number)}</span><strong>${esc(next.name)}</strong>${arrow}</a>` : '<div class="work-end section-pad" id="cierre"><figure class="closing-portrait"><img src="assets/profile/dorian-closing.png" alt="Retrato ilustrado de Dorian con ojos brillantes y una sonrisa cálida" loading="lazy"><svg class="portrait-wink" viewBox="0 0 1254 1254" aria-hidden="true"><defs><radialGradient id="wink-skin"><stop stop-color="#dc9765"/><stop offset="1" stop-color="#d88c5e"/></radialGradient></defs><path d="M329 666 Q348 611 410 619 Q508 614 558 697 L550 746 Q467 789 383 756 Q348 729 329 666Z" fill="url(#wink-skin)"/><path d="M345 684 Q431 747 540 700" fill="none" stroke="#29273e" stroke-width="13" stroke-linecap="round"/><path d="m358 696 -20 1m38 11 -15 12m42 0 -8 16" fill="none" stroke="#29273e" stroke-width="9" stroke-linecap="round"/></svg></figure><div class="work-end-copy"><span>FIN DE LA SELECCIÓN / CONTINUARÁ</span><p>La próxima idea<br>puede ser la tuya.</p><a class="text-link" href="#contacto">Conversemos '+arrow+'</a></div></div>'}
    </article>`;
  }

  function projects() {
    const titleWords = data.copy.projectsTitle.split(/\s+/);
    const titleSplit = Math.ceil(titleWords.length / 2);
    return `<section class="work-archive" id="proyectos" aria-labelledby="work-title"><header class="work-intro section-pad">
      <div class="work-intro-top"><p class="eyebrow">TRABAJO SELECCIONADO / 2023 — 2026</p><span aria-hidden="true">↓</span></div>
      <div class="work-intro-layout"><div><h2 id="work-title" class="reveal">${esc(titleWords.slice(0, titleSplit).join(' '))}<br><span>${esc(titleWords.slice(titleSplit).join(' '))}</span></h2><div class="work-intro-bottom"><p>${esc(data.copy.projectsIntro)}</p></div></div><figure class="projects-portrait"><img src="assets/profile/dorian-projects.png" alt="Dorian ilustrado en una pose relajada" loading="lazy"></figure></div>
      <nav class="work-contents" aria-label="Índice de marcas">${data.projects.map(p => `<a href="#marca-${esc(p.id)}"><span>${esc(p.number)}</span><strong>${esc(p.name)}</strong>${arrow}</a>`).join('')}</nav>
    </header>${data.projects.map(chapter).join('')}</section>`;
  }

  function softwareIcon(mark) {
    if (mark === 'capcut') return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12h30v7L9 36m0-24 30 24H9v-7l30-17" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/></svg>';
    if (mark === 'excel') return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M23 9h17v30H23M28 19h12M28 29h12M32 9v30" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 13h22v23H7z" fill="currentColor"/><path d="m13 18 10 13m0-13L13 31" stroke="var(--ink)" stroke-width="3"/></svg>';
    return esc(mark);
  }

  function software() {
    return `<section class="software section-pad" id="habilidades" aria-labelledby="software-title"><div class="software-heading"><span class="eyebrow">EL OFICIO / LAS HERRAMIENTAS</span><h2 id="software-title">Software</h2></div><div class="software-bars">${data.software.map((s, i) => `<div class="software-entry"><span class="app-icon" aria-hidden="true">${softwareIcon(s.mark)}</span><div class="software-track-wrap"><div class="software-name"><h3>${esc(s.name)}</h3><span aria-hidden="true">0${i + 1}</span></div><div class="software-track" role="meter" aria-label="Manejo de ${esc(s.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.level}"><span class="software-fill" style="--level:${s.level}%;--delay:${i * 100}ms"></span></div></div></div>`).join('')}</div></section>`;
  }

  function contact() {
    return `<section class="contact contact-editorial section-pad" id="contacto" aria-labelledby="contact-title"><div class="contact-heading"><h2 id="contact-title">${esc(data.copy.contactTitle)}</h2><span aria-hidden="true">${star}</span></div><dl class="contact-directory"><div><dt>EMAIL</dt><dd><a href="mailto:${esc(data.profile.email)}">${esc(data.profile.email)} ${arrow}</a></dd></div><div><dt>TELÉFONO</dt><dd><a href="tel:${esc(data.profile.phone.replace(/\s/g,''))}">${esc(data.profile.phone)} ${arrow}</a></dd></div><div><dt>LINKEDIN</dt><dd><a href="${safeURL(data.profile.links.LinkedIn)}" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a></dd></div><div><dt>UBICACIÓN</dt><dd>${esc(data.profile.location)}</dd></div></dl></section>`;
  }

  function renderHome() {
    const p = data.profile;
    document.title = `${p.shortName} — Marketing y Publicidad`;
    main.innerHTML = `<section class="hero" id="inicio"><div class="hero-topline"><span>PORTFOLIO CREATIVO / 2026</span><span>${esc(p.location)} <i class="location-dot"></i></span></div><div class="hero-composition"><div class="hero-type"><h1><span class="last-name">PORTAFOLIO</span></h1><div class="hero-disciplines">PUBLICIDAD / MARKETING</div><p class="hero-byline">${esc(p.firstName)} ${esc(p.lastName)} · 2026</p></div><div class="portrait-stage"><div class="hero-halo" aria-hidden="true"></div><div class="portrait-orbit"></div><img class="hero-portrait" src="${safeURL(p.illustration)}" alt="Ilustración editorial de ${esc(p.shortName)}" fetchpriority="high"><span class="hello-sticker">¡HEY, SOY<br>DORIAN! ${star}</span><span class="creative-note">pensar la marca.<br>llevarla a cada pantalla.</span></div><div class="hero-caption"><p>${esc(p.headline)}</p><a class="button button-dark" href="#proyectos">Ver mi trabajo ${arrow}</a></div><span class="hero-spark">${star}</span></div><div class="hero-bottom"><span>${esc(p.profession)}</span><a href="#proyectos">Las ideas, en acción <span aria-hidden="true">↓</span></a></div></section>
      <div class="ticker" aria-label="Marketing, publicidad, contenido y estrategia"><div class="ticker-track" aria-hidden="true">${Array(2).fill('<div class="ticker-group">'+Array(3).fill(['MARKETING', 'PUBLICIDAD', 'CONTENIDO', 'ESTRATEGIA'].map(x => '<span>'+x+'</span>'+star).join('')).join('')+'</div>').join('')}</div></div>
      <section class="about section-pad" id="sobre-mi"><div class="about-heading"><p class="eyebrow">DETRÁS DE LAS IDEAS</p><h2 class="reveal">${esc(data.copy.aboutTitle)}</h2><figure class="about-photo"><img src="${safeURL(p.photo)}" alt="Dorian en un paseo junto al mar" loading="lazy" decoding="async"><figcaption>PUBLICISTA · MARKETING · BUENOS AIRES ${arrow}</figcaption></figure></div><div class="about-copy"><p class="large-copy">${esc(p.intro)}</p><p>${esc(p.about)}</p><p>${esc(p.aboutMore)}</p><a class="text-link" href="${safeURL(p.cv)}" download>Descargar mi CV ${arrow}</a><div class="education"><span>FORMACIÓN</span><p>${esc(data.education.degree)}<small>${esc(data.education.school)}<br>${esc(data.education.period)}</small></p></div><div class="languages"><span>IDIOMAS</span><dl>${data.languages.map(l=>`<div><dt>${esc(l.name)}</dt><dd>${esc(l.level)}</dd></div>`).join('')}</dl></div></div></section>
      ${software()}${projects()}
      <section class="experience section-pad" id="experiencia"><div class="section-heading"><div><p class="eyebrow">EL RECORRIDO DETRÁS DEL TRABAJO</p><h2>${esc(data.copy.experienceTitle)}</h2></div><p>Marcas y equipos<br>con los que crecí.</p></div><div class="experience-list">${data.experience.map(x => `<details><summary><span class="experience-period">${esc(x.period)}</span><span class="experience-name">${esc(x.company)}<small>${esc(x.role)}</small></span><span class="expand-icon" aria-hidden="true"></span></summary><div class="experience-details"><ul>${x.details.slice(0, 3).map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></details>`).join('')}</div></section>${contact()}`;
    setupImagePreview();
    attachMediaErrors();
    setupMotion();
  }

  function setupImagePreview() {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-preview';
    dialog.setAttribute('aria-label', 'Vista ampliada de la pieza');
    dialog.innerHTML = '<button class="preview-close" aria-label="Cerrar vista ampliada">Cerrar ×</button><img alt=""><p></p>';
    main.append(dialog);
    main.querySelectorAll('.piece-zoom').forEach(button => button.addEventListener('click', () => {
      const figure = document.getElementById(button.dataset.piece);
      const image = figure.querySelector('img');
      dialog.querySelector('img').src = image.src;
      dialog.querySelector('img').alt = image.alt;
      dialog.querySelector('p').textContent = figure.querySelector('figcaption > span').textContent;
      dialog.showModal();
    }));
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => dialog.querySelector('img').removeAttribute('src'));
  }

  function attachMediaErrors() {
    main.querySelectorAll('.hero img, .about img, .work-piece img, .work-piece video').forEach(media => {
      const error = () => {
        if (media.parentElement.querySelector('.media-error')) return;
        const note = document.createElement('p');
        note.className = 'media-error';
        note.textContent = 'Esta pieza no está disponible por el momento.';
        media.hidden = true;
        media.parentElement.append(note);
      };
      media.addEventListener('error', error, {once: true});
      if (media.tagName === 'IMG' && media.complete && !media.naturalWidth) error();
      media.querySelectorAll('source').forEach(source => source.addEventListener('error', error, {once: true}));
    });
  }

  let revealObserver;
  let videoObserver;
  function setupHeroTransition() {
    const hero = main.querySelector('.hero');
    if (!('IntersectionObserver' in window)) return;
    let scheduled = false;
    let visible = true;
    const update = () => {
      scheduled = false;
      const bounds = hero.getBoundingClientRect();
      const progress = motion.matches ? 0 : Math.min(1, Math.max(0, -bounds.top / bounds.height));
      hero.style.setProperty('--hero-blur', `${(progress * 3).toFixed(2)}px`);
      hero.style.setProperty('--hero-opacity', (1 - progress * .16).toFixed(3));
    };
    const schedule = () => {
      if (scheduled || !visible) return;
      scheduled = true;
      requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    });
    observer.observe(hero);
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', update);
    update();
  }
  function setupMotion() {
    const nodes = main.querySelectorAll('.reveal, .software');
    if (motion.matches || !('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }), {threshold: 0.12});
    nodes.forEach(node => {
      node.classList.add('will-reveal');
      revealObserver.observe(node);
    });
    videoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting && !document.hidden && !video.dataset.userPaused) video.play().catch(() => {});
      else {
        video.dataset.observerPause = 'true';
        video.pause();
      }
    }), {threshold: 0.5});
    main.querySelectorAll('video[data-autoplay]').forEach(video => {
      video.addEventListener('pause', () => {
        if (!video.dataset.observerPause) video.dataset.userPaused = 'true';
        delete video.dataset.observerPause;
      });
      video.addEventListener('play', () => { delete video.dataset.userPaused; delete video.dataset.observerPause; });
      videoObserver.observe(video);
    });
  }
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    revealObserver?.disconnect();
    videoObserver?.disconnect();
    main.querySelectorAll('.will-reveal').forEach(node => node.classList.add('is-visible'));
    main.querySelectorAll('video[data-autoplay]').forEach(video => video.pause());
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) main.querySelectorAll('video').forEach(video => video.pause());
  });

  const menu = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.hidden = !open;
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  // Old case links still open the corresponding point in the continuous story.
  function targetForHash(hash) {
    const legacy = {'produccion-de-videos':'tunubeya-video'};
    if (hash.startsWith('proyecto/')) {
      const id = hash.slice(9);
      return document.getElementById(legacy[id] || 'marca-' + id) || document.getElementById('proyectos');
    }
    if (hash === 'herramientas') hash = 'habilidades';
    return document.getElementById(hash || 'inicio');
  }
  function route(initial = false) {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); } catch { hash = ''; }
    const target = targetForHash(hash);
    closeMenu();
    if (!target) return;
    target.querySelectorAll('.will-reveal').forEach(node => {
      if (node.closest('.chapter-opening') || target.classList.contains('work-section')) node.classList.add('is-visible');
    });
    requestAnimationFrame(() => {
      target.scrollIntoView({behavior: initial || motion.matches ? 'instant' : 'smooth'});
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    });
    const active = target.closest('#proyectos') ? '#proyectos' : '#' + target.id;
    document.querySelectorAll('.site-header nav a').forEach(a => a.hash === active ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (location.hash === link.hash) route();
    else location.hash = link.hash;
  });
  document.querySelector('#footer-name').textContent = `${data.profile.shortName} · Portfolio 2026`;
  window.addEventListener('hashchange', () => route());
  renderHome();
  setupHeroTransition();
  if (location.hash) route(true);
})();
