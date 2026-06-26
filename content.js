// content.js — CyberPet: multi-pet engine (cat / shiba / +more)
(function () {
  'use strict';

  let _ctxOk = false;
  try { _ctxOk = !!chrome.runtime?.id; } catch (_) {}
  if (!_ctxOk) return;
  if (document.getElementById('cyber-pet-root')) return;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. PET SVG TEMPLATES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const SVG = {};

  SVG.cat = `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
    <g id="pet-tail"><rect x="78" y="85" width="8" height="20" rx="4" fill="#5C5C5C"/><rect x="82" y="75" width="8" height="12" rx="4" fill="#7A7A7A"/></g>
    <g id="pet-body"><rect x="35" y="65" width="50" height="45" rx="12" fill="#5C5C5C"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/></g>
    <g id="pet-head">
      <path id="ear-left" d="M30 45 L45 25 L50 45 Z" fill="#475467"/><path d="M34 43 L44 29 L47 43 Z" fill="#F48E8E"/>
      <path id="ear-right" d="M90 45 L75 25 L70 45 Z" fill="#475467"/><path d="M86 43 L76 29 L73 43 Z" fill="#F48E8E"/>
      <rect x="25" y="40" width="70" height="40" rx="16" fill="#475467"/>
      <circle cx="33" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/>
      <g id="pet-eyes"><rect id="eye-left" x="42" y="54" width="8" height="10" rx="4" fill="#1D2939"/><rect id="eye-right" x="70" y="54" width="8" height="10" rx="4" fill="#1D2939"/><circle id="eye-light-l" cx="44" cy="56" r="1.5" fill="white"/><circle id="eye-light-r" cx="72" cy="56" r="1.5" fill="white"/></g>
      <path d="M56 66 Q60 69 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/>
      <line x1="20" y1="62" x2="10" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="20" y1="66" x2="8" y2="67" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="62" x2="110" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="66" x2="112" y2="67" stroke="#98A2B3" stroke-width="1.5"/>
    </g>
    <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
    <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
    <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
    <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  </svg>`;

  SVG.shiba = `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="32" ry="6" fill="#D0D5DD" opacity="0.6"/>
    <g id="dog-tail"><path d="M78 85 Q90 70 80 60 Q70 55 72 70" stroke="#E67E22" stroke-width="8" stroke-linecap="round" fill="none"/></g>
    <g id="dog-body"><rect x="35" y="65" width="50" height="45" rx="14" fill="#E67E22"/><rect x="42" y="75" width="36" height="30" rx="10" fill="#FFF"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#D35400"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#D35400"/></g>
    <g id="dog-head">
      <polygon id="ear-l" points="28,45 35,20 48,42" fill="#D35400"/><polygon id="ear-r" points="92,45 85,20 72,42" fill="#D35400"/>
      <rect x="25" y="40" width="70" height="42" rx="18" fill="#E67E22"/>
      <circle cx="42" cy="48" r="3" fill="#FFF"/><circle cx="78" cy="48" r="3" fill="#FFF"/>
      <circle cx="44" cy="58" r="4.5" fill="#2C3E50"/><circle cx="76" cy="58" r="4.5" fill="#2C3E50"/>
      <rect x="48" y="62" width="24" height="16" rx="8" fill="#FFF"/>
      <ellipse cx="60" cy="66" rx="4" ry="2.5" fill="#2C3E50"/>
      <path id="dog-tongue" d="M58 72 H62 V78 Q60 81 58 78 Z" fill="#FF8A8A"/>
    </g>
    <g id="dog-glasses" opacity="0"><rect x="36" y="52" width="20" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="64" y="52" width="20" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="56" y1="59" x2="64" y2="59" stroke="#FF9800" stroke-width="2"/></g>
    <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
    <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
    <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  </svg>`;

  SVG.rabbit = `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="26" ry="5" fill="#D0D5DD" opacity="0.5"/>
    <g id="rabbit-body"><circle cx="82" cy="95" r="8" fill="#F4F5F7"/><rect x="38" y="70" width="44" height="42" rx="16" fill="#F9FAFB"/><rect x="48" y="80" width="24" height="25" rx="6" fill="#E4E7EC"/><rect x="50" y="92" width="8" height="12" rx="3" fill="#F4F5F7"/><rect x="62" y="92" width="8" height="12" rx="3" fill="#F4F5F7"/></g>
    <g id="rabbit-head">
      <g id="rabbit-ear-l"><rect x="38" y="10" width="10" height="35" rx="5" fill="#F9FAFB"/><rect x="41" y="15" width="4" height="25" rx="2" fill="#FECDCA"/></g>
      <g id="rabbit-ear-r"><rect x="72" y="10" width="10" height="35" rx="5" fill="#F9FAFB"/><rect x="75" y="15" width="4" height="25" rx="2" fill="#FECDCA"/></g>
      <rect x="30" y="42" width="60" height="38" rx="16" fill="#F9FAFB"/>
      <circle cx="44" cy="56" r="4" fill="#F04438"/><circle cx="76" cy="56" r="4" fill="#F04438"/>
      <circle cx="45" cy="55" r="1.5" fill="white"/><circle cx="77" cy="55" r="1.5" fill="white"/>
      <path id="rabbit-mouth" d="M57 66 Q60 68 63 66 Q60 64 57 66" fill="#FECDCA"/>
    </g>
    <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
    <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
    <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
    <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  </svg>`;

  SVG.marmot = `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="28" ry="6" fill="#D0D5DD" opacity="0.6"/>
    <g id="marmot-body"><rect x="32" y="60" width="56" height="52" rx="16" fill="#D35400"/><rect x="42" y="70" width="36" height="36" rx="10" fill="#E67E22"/><rect x="38" y="110" width="12" height="6" rx="2" fill="#A04000"/><rect x="70" y="110" width="12" height="6" rx="2" fill="#A04000"/></g>
    <g id="marmot-head">
      <circle cx="36" cy="42" r="6" fill="#A04000"/><circle cx="84" cy="42" r="6" fill="#A04000"/>
      <rect x="30" y="36" width="60" height="36" rx="14" fill="#D35400"/>
      <circle cx="45" cy="48" r="3.5" fill="#1D2939"/><circle cx="75" cy="48" r="3.5" fill="#1D2939"/>
      <g id="marmot-mouth-zone"><rect x="56" y="56" width="4" height="6" fill="#FFF" stroke="#1D2939" stroke-width="0.5"/><rect x="60" y="56" width="4" height="6" fill="#FFF" stroke="#1D2939" stroke-width="0.5"/><ellipse cx="60" cy="54" rx="6" ry="4" fill="#A04000"/></g>
    </g>
    <g id="marmot-hands"><rect x="26" y="66" width="10" height="12" rx="4" fill="#A04000"/><rect x="84" y="66" width="10" height="12" rx="4" fill="#A04000"/></g>
    <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
    <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
    <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
    <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  </svg>`;

  const PETS = {
    cat:   { name: '🐱 CyberCat',    svg: SVG.cat,   css: 'pet-cat' },
    shiba: { name: '🐕 Shiba',       svg: SVG.shiba, css: 'pet-shiba' },
    rabbit:{ name: '🐰 Bunny',       svg: SVG.rabbit,css: 'pet-rabbit' },
    marmot:{ name: '🐹 Groundhog',   svg: SVG.marmot,css: 'pet-marmot' },
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. BUILD DOM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const root = document.createElement('div');
  root.id = 'cyber-pet-root';
  root.innerHTML = `
    <div id="cp-bubble" class="cp-bubble-hidden"></div>
    <div id="cp-canvas" class="pet-cat state-idle">
      <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">${SVG.cat}</svg>
    </div>
    <div id="cp-glow" class="cp-glow-idle"></div>
    <canvas id="cp-particles" width="200" height="200"></canvas>
  `;
  document.body.appendChild(root);

  const canvas = document.getElementById('cp-canvas');
  const svgEl = canvas.querySelector('svg');
  const bubble = document.getElementById('cp-bubble');

  function extOK() { try { return !!chrome.runtime?.id } catch(e) { return false } }
  function cleanup() {
    clearTimeout(T.bubbleTimer); clearTimeout(T.blinkTimer);
    clearInterval(T.stateTimer); clearInterval(T.inactiveTimer);
    clearInterval(T.eyeTimer);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. QUOTES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const Q = {
    idle: ["Your code compiles? I'm so proud! 🥹","Just dynamic-purring at my job.","404: Treat not found.","I've been watching you scroll...","Human, your code looks like spaghetti but I still love you."],
    hungry: ["My stomach is empty! 🥺","Feed me... or I'll delete your node_modules.","I'm so hungry!"],
    dirty: ["I'm feeling a bit dusty... 🫤","A bath would be nice."],
    happy: ["Purrr~ 💖","That's the spot! ✨","I love you human! ❤️"],
    slack: ["Caught you! 😾 Is that more interesting than your PM?","Focus! Or I will poop on your current webpage.","Hey! Are you slacking off?"],
    wake: ["Zzz... waking up... coffee? ☕","*yawn* Did I miss any bugs?","Stretch! 🐱 Now where's my snack?"]
  };
  const pick = a => a[Math.floor(Math.random() * a.length)];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const S = {
    pet: 'idle', fullness: 100, cleanliness: 100, mood: 100,
    focusing: false, isDragging: false, currentPet: 'cat',
    mouseX: -9999, mouseY: -9999, mouseActive: false, lastMove: Date.now(),
  };
  const T = { bubbleTimer: null, blinkTimer: null, stateTimer: null, inactiveTimer: null, eyeTimer: null };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. PET SWITCHING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function applyPet(name) {
    const pet = PETS[name];
    if (!pet || name === S.currentPet) return;
    S.currentPet = name;
    // Swap SVG content
    svgEl.innerHTML = pet.svg;
    // Update class prefix (pet-cat → pet-shiba)
    canvas.className = canvas.className.replace(/pet-\w+/g, '').trim() + ' ' + pet.css;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. STATE MACHINE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function setState(st) {
    if (st === S.pet) return;
    const prev = S.pet; S.pet = st;
    // Replace state class (state-idle → state-working etc.)
    canvas.className = canvas.className.replace(/state-\w+/g, '').trim() + ' state-' + st;

    // Glasses on/off for any pet (cat/shiba/rabbit/marmot all have one glasses group)
    const g = svgEl.querySelector('#pet-glasses') || svgEl.querySelector('#dog-glasses');
    if (g) g.setAttribute('opacity', st === 'working' ? '1' : '0');

    const zzz = svgEl.querySelector('#zzz-group');
    if (zzz) zzz.setAttribute('opacity', st === 'sleeping' ? '1' : '0');

    // Glow ring
    const ringEl = document.getElementById('cp-glow');
    if (ringEl) {
      const map = { idle:'idle', working:'focus', hungry:'hungry', sleep:'idle', surprised:'focus', curious:'idle' };
      ringEl.className = 'cp-glow-' + (map[st]||'idle');
    }

    if (prev === 'sleeping' && st !== 'sleeping') {
      setTimeout(() => showBubble(pick(Q.wake), 4000), 300);
    }
  }

  function doAction(action, duration) {
    setState(action);
    if (duration) setTimeout(() => { if (S.pet === action) setState('idle'); }, duration);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. BLINK
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function doBlink() {
    const l = svgEl.querySelector('#eye-left'), r = svgEl.querySelector('#eye-right');
    const ll = svgEl.querySelector('#eye-light-l'), lr = svgEl.querySelector('#eye-light-r');
    if (!l || !r) return;
    l.style.display = 'none'; r.style.display = 'none';
    if (ll) ll.style.display = 'none'; if (lr) lr.style.display = 'none';
    setTimeout(() => {
      l.style.display = ''; r.style.display = '';
      if (ll) ll.style.display = ''; if (lr) lr.style.display = '';
    }, 120);
  }

  function scheduleBlink() {
    clearTimeout(T.blinkTimer);
    T.blinkTimer = setTimeout(() => {
      if (S.pet !== 'sleeping') doBlink();
      scheduleBlink();
    }, 2000 + Math.random() * 5000);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. BUBBLE / PARTICLES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function showBubble(text, dur = 4000) {
    clearTimeout(T.bubbleTimer);
    bubble.textContent = text;
    bubble.className = 'cp-bubble-visible';
    T.bubbleTimer = setTimeout(() => { bubble.className = 'cp-bubble-hidden'; T.bubbleTimer = null; }, dur);
  }

  const PP = [];
  function spawn(type, n = 6) {
    for (let i = 0; i < n; i++) PP.push({
      type, x: 30 + Math.random() * 40, y: 20 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 1.5, vy: -2 - Math.random() * 3,
      life: 1, decay: 0.008 + Math.random() * 0.012, size: 8 + Math.random() * 8, phase: Math.random() * 6.28
    });
    drawParticles();
  }
  function drawParticles() {
    const cvs = document.getElementById('cp-particles');
    if (!cvs) return;
    const ctx = cvs.getContext('2d'); ctx.clearRect(0, 0, 200, 200);
    for (let i = PP.length - 1; i >= 0; i--) {
      const p = PP[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= p.decay; p.phase += 0.05;
      if (p.life <= 0) { PP.splice(i, 1); continue; }
      ctx.globalAlpha = p.life; ctx.save(); ctx.translate(p.x, p.y);
      if (p.type === 'heart') { ctx.font = p.size + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('❤️', 0, 0); }
      else if (p.type === 'sparkle') {
        ctx.fillStyle = '#FFD700'; const s = p.size * 0.4 * (0.8 + 0.2 * Math.sin(p.phase));
        ctx.beginPath(); for (let j = 0; j < 5; j++) { const a = j * 4 * Math.PI / 5 - Math.PI / 2, r = j === 0 ? s : s * 0.5; ctx[j === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * r, Math.sin(a) * r); }
        ctx.closePath(); ctx.fill();
      } else if (p.type === 'food') { ctx.font = p.size + 'px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🍖', 0, 0); }
      ctx.restore(); ctx.globalAlpha = 1;
    }
    if (PP.length) requestAnimationFrame(drawParticles);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. STORAGE POLL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function pollState() {
    if (!extOK()) { cleanup(); return; }
    chrome.storage.local.get(['fullness','cleanliness','mood','isFocusing','selectedPet'], d => {
      if (chrome.runtime.lastError) return;
      S.fullness = d.fullness ?? 100; S.cleanliness = d.cleanliness ?? 100;
      S.mood = d.mood ?? 100; S.focusing = d.isFocusing ?? false;

      // Apply saved pet
      if (d.selectedPet && d.selectedPet !== S.currentPet && PETS[d.selectedPet]) applyPet(d.selectedPet);

      if (S.pet === 'sleeping' && !S.focusing) return;
      if (S.focusing) setState('working');
      else if (S.fullness < 20) setState('hungry');
      else if (['working','hungry','surprised'].includes(S.pet)) setState('idle');
      if (bubble.className === 'cp-bubble-hidden') {
        if (S.focusing) return;
        if (S.fullness < 20) showBubble(pick(Q.hungry), 5000);
        else if (S.cleanliness < 20) showBubble(pick(Q.dirty), 5000);
        else if (S.mood > 80 && Math.random() < 0.3) showBubble(pick(Q.happy), 3500);
        else if (Math.random() < 0.3) showBubble(pick(Q.idle), 4000);
      }
    });
  }

  // Cross-tab + real-time sync
  try {
    chrome.storage.onChanged.addListener((ch, area) => {
      if (area !== 'local' || !extOK()) { if (!extOK()) cleanup(); return; }
      if (ch.selectedPet && PETS[ch.selectedPet.newValue]) applyPet(ch.selectedPet.newValue);
      if (ch.fullness) S.fullness = ch.fullness.newValue;
      if (ch.cleanliness) S.cleanliness = ch.cleanliness.newValue;
      if (ch.mood) S.mood = ch.mood.newValue;
      if (ch.isFocusing) {
        S.focusing = ch.isFocusing.newValue;
        if (S.focusing) setState('working'); else if (S.pet === 'working') setState('idle');
      }
    });
  } catch (_) {}

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. INACTIVITY / SLEEP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  function checkInactive() {
    if (Date.now() - S.lastMove > 120000 && S.pet === 'idle' && !S.focusing) setState('sleeping');
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 11. DRAGGING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let dy0 = 0, top0 = 0;
  root.addEventListener('mousedown', e => {
    S.isDragging = true; dy0 = e.clientY; const r = root.getBoundingClientRect(); top0 = r.top;
    root.style.bottom = 'auto'; root.style.top = top0 + 'px'; root.style.transition = 'none'; root.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!S.isDragging) return;
    root.style.top = Math.max(0, Math.min(window.innerHeight - 140, top0 + e.clientY - dy0)) + 'px';
    S.lastMove = Date.now();
  });
  document.addEventListener('mouseup', () => { if (S.isDragging) { S.isDragging = false; root.style.cursor = ''; root.style.transition = ''; } });
  let tid = null;
  root.addEventListener('touchstart', e => { const t = e.changedTouches[0]; tid = t.identifier; S.isDragging = true; dy0 = t.clientY; const r = root.getBoundingClientRect(); top0 = r.top; root.style.bottom = 'auto'; root.style.top = top0 + 'px'; root.style.transition = 'none'; }, { passive: true });
  document.addEventListener('touchmove', e => { if (!S.isDragging) return; const t = Array.from(e.changedTouches).find(t => t.identifier === tid); if (!t) return; root.style.top = Math.max(0, Math.min(window.innerHeight - 140, top0 + t.clientY - dy0)) + 'px'; }, { passive: true });
  document.addEventListener('touchend', () => { if (!S.isDragging) return; S.isDragging = false; tid = null; root.style.transition = ''; });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 12. CLICK
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const REACTIONS = ['meow', 'purr', 'tilt', 'surprised'];
  let cc = 0, cTimer = null;
  root.addEventListener('click', e => {
    if (S.isDragging) return;
    cc++;
    if (cc === 1) {
      cTimer = setTimeout(() => {
        cc = 0; const r = pick(REACTIONS);
        switch (r) {
          case 'meow': showBubble('*meow* 🐱', 2500); break;
          case 'purr': showBubble('Purrr~ ✨', 2500); break;
          case 'tilt': showBubble('*tilts head* 🤔', 2500); doAction('curious', 1200); break;
          case 'surprised': showBubble('Mrow?! 👀', 2500); doAction('surprised', 1200); break;
        }
      }, 250);
    } else {
      clearTimeout(cTimer); cc = 0;
      showBubble('Double pets! 🥰❤️', 3000);
      doAction('surprised', 800);
      spawn('heart', 10);
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 13. MESSAGES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  try {
    chrome.runtime.onMessage.addListener(msg => {
      if (!extOK()) return;
      const action = msg.action;
      if (!action) return;
      switch (action) {
        case 'slackWarning': showBubble(pick(Q.slack), 5000); doAction('surprised', 800); break;
        case 'petStateChange': setState(msg.state === 'working' ? 'working' : 'idle'); break;
        case 'working': setState('working'); break;
        case 'idle': setState('idle'); break;
        case 'sleeping': setState('sleeping'); break;
        case 'surprised': doAction('surprised', 800); break;
        case 'showBubble': showBubble(msg.text, msg.duration || 4000); break;
        case 'setPet':
          if (msg.pet && PETS[msg.pet]) { applyPet(msg.pet); chrome.storage.local.set({ selectedPet: msg.pet }); }
          break;
        case 'petReaction':
          switch (msg.type) {
            case 'feed': showBubble('*munch munch* 🍖 Yum!', 3500); spawn('food', 6); doAction('surprised', 500); break;
            case 'bath': showBubble('*splash splash* 🛁 So clean!', 3500); spawn('sparkle', 8); break;
            case 'pet': showBubble('Purrr~ ❤️', 3000); spawn('heart', 8); doAction('surprised', 400); break;
          } break;
      }
    });
  } catch (_) {}

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 14. INIT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Load saved pet immediately (before pollState timer kicks in)
  if (extOK()) {
    chrome.storage.local.get(['selectedPet'], d => {
      if (!chrome.runtime.lastError && d.selectedPet && d.selectedPet !== S.currentPet && PETS[d.selectedPet]) {
        applyPet(d.selectedPet);
      }
    });
  }

  scheduleBlink();
  pollState();
  T.stateTimer = setInterval(pollState, 15000);
  T.inactiveTimer = setInterval(checkInactive, 30000);
})();
