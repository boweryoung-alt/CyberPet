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

  // 🐱 Cat state templates
const CAT_SVG = {
  idle: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="pet-tail"><animateTransform attributeName="transform" type="rotate" values="-5,78,105;15,78,105;-5,78,105" dur="1.2s" repeatCount="indefinite"/><rect x="78" y="85" width="8" height="20" rx="4" fill="#5C5C5C"/><rect x="82" y="75" width="8" height="12" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-body"><rect x="35" y="65" width="50" height="45" rx="12" fill="#5C5C5C"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-head"><path id="ear-left" d="M30 45 L45 25 L50 45 Z" fill="#475467"/><path d="M34 43 L44 29 L47 43 Z" fill="#F48E8E"/><path id="ear-right" d="M90 45 L75 25 L70 45 Z" fill="#475467"/><path d="M86 43 L76 29 L73 43 Z" fill="#F48E8E"/><rect x="25" y="40" width="70" height="40" rx="16" fill="#475467"/><circle cx="33" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><g id="pet-eyes"><rect id="eye-left" x="42" y="54" width="8" height="10" rx="4" fill="#1D2939"/><rect id="eye-right" x="70" y="54" width="8" height="10" rx="4" fill="#1D2939"/><circle id="eye-light-l" cx="44" cy="56" r="1.5" fill="white"/><circle id="eye-light-r" cx="72" cy="56" r="1.5" fill="white"/></g><path d="M56 66 Q60 69 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/><line x1="20" y1="62" x2="10" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="20" y1="66" x2="8" y2="67" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="62" x2="110" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="66" x2="112" y2="67" stroke="#98A2B3" stroke-width="1.5"/></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  eating: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="pet-tail"><animateTransform attributeName="transform" type="rotate" values="-5,78,105;15,78,105;-5,78,105" dur="0.4s" repeatCount="indefinite"/><rect x="78" y="85" width="8" height="20" rx="4" fill="#5C5C5C"/><rect x="82" y="75" width="8" height="12" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-body"><rect x="35" y="65" width="50" height="45" rx="12" fill="#5C5C5C"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-head"><animateTransform attributeName="transform" type="translate" values="0,0; 0,1.5; 0,0" dur="0.8s" repeatCount="indefinite"/>
  <path id="ear-left" d="M30 45 L45 25 L50 45 Z" fill="#475467"/><path d="M34 43 L44 29 L47 43 Z" fill="#F48E8E"/><path id="ear-right" d="M90 45 L75 25 L70 45 Z" fill="#475467"/><path d="M86 43 L76 29 L73 43 Z" fill="#F48E8E"/><rect x="25" y="40" width="70" height="40" rx="16" fill="#475467"/><circle cx="33" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><g id="pet-eyes"><rect id="eye-left" x="42" y="54" width="8" height="10" rx="4" fill="#1D2939"/><rect id="eye-right" x="70" y="54" width="8" height="10" rx="4" fill="#1D2939"/><circle id="eye-light-l" cx="44" cy="56" r="1.5" fill="white"/><circle id="eye-light-r" cx="72" cy="56" r="1.5" fill="white"/></g><g id="chewing-mouth"><path d="M56 66 Q60 68 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"><animate attributeName="d" values="M56 66 Q60 68 64 66; M56 66 C56 69, 64 69, 64 66; M56 66 Q60 68 64 66" dur="0.6s" repeatCount="indefinite"/></path></g><g id="food-crumbs" fill="#FFD166"><circle cx="53" cy="67.5" r="1.2"><animate attributeName="opacity" values="1;1;0" dur="0.6s" repeatCount="indefinite"/></circle><circle cx="66.5" cy="68.5" r="1"><animate attributeName="opacity" values="1;0" dur="0.6s" repeatCount="indefinite"/></circle></g><line x1="20" y1="62" x2="10" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="20" y1="66" x2="8" y2="67" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="62" x2="110" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="66" x2="112" y2="67" stroke="#98A2B3" stroke-width="1.5"/></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  <g id="pet-food-bowl"><path d="M42 106 C42 106, 44 118, 60 118 C76 118, 78 106, 78 106 Z" fill="#F48E8E"/><ellipse cx="60" cy="106" rx="16" ry="3" fill="#FFD166"/></g>
</svg>`,
  bathing: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="pet-tail"><animateTransform attributeName="transform" type="rotate" values="-5,78,105;-5,78,105" dur="1s" repeatCount="indefinite"/><rect x="78" y="85" width="8" height="20" rx="4" fill="#5C5C5C"/><rect x="82" y="75" width="8" height="12" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-body"><rect x="35" y="65" width="50" height="45" rx="12" fill="#5C5C5C"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-head"><animateTransform attributeName="transform" type="translate" values="0,0; 0,1.5; 0,0" dur="2s" repeatCount="indefinite"/>
  <path id="ear-left" d="M30 45 L45 25 L50 45 Z" fill="#475467"/><path d="M34 43 L44 29 L47 43 Z" fill="#F48E8E"/><path id="ear-right" d="M90 45 L75 25 L70 45 Z" fill="#475467"/><path d="M86 43 L76 29 L73 43 Z" fill="#F48E8E"/><rect x="25" y="40" width="70" height="40" rx="16" fill="#475467"/><circle cx="33" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><g id="pet-eyes"><path d="M 42 58 Q 46 62 50 58" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M 70 58 Q 74 62 78 58" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/></g><path d="M56 66 Q60 69 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/><line x1="20" y1="62" x2="10" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="20" y1="66" x2="8" y2="67" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="62" x2="110" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="66" x2="112" y2="67" stroke="#98A2B3" stroke-width="1.5"/><rect x="48" y="34" width="24" height="7" rx="2" fill="#E4E7EC"/><rect x="52" y="31" width="16" height="4" rx="1" fill="#F2F4F7"/></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
  <g id="bath-steam" stroke="#D0D5DD" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M 20 95 Q 17 85 22 75 Q 19 65 21 55"><animate attributeName="opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite"/></path><path d="M 100 95 Q 103 85 98 75 Q 101 65 99 55"><animate attributeName="opacity" values="0;0.5;0" dur="2.8s" repeatCount="indefinite"/></path></g>
  <g id="bath-basin"><path d="M 24 102 C 24 102, 27 118, 60 118 C 93 118, 96 102, 96 102 Z" fill="#93C5FD" opacity="0.85"/><circle cx="28" cy="100" r="2.5" fill="white" opacity="0.8"><animate attributeName="translate" values="0,0; 0,-8; 0,0" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="92" cy="103" r="3" fill="white" opacity="0.8"><animate attributeName="translate" values="0,0; 0,-6; 0,0" dur="2s" repeatCount="indefinite"/></circle></g>
</svg>`,
  sick: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="pet-tail"><animateTransform attributeName="transform" type="rotate" values="-10,78,105;-10,78,105" dur="1s" repeatCount="indefinite"/><rect x="78" y="85" width="8" height="20" rx="4" fill="#5C5C5C"/><rect x="82" y="75" width="8" height="12" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-body"><rect x="35" y="65" width="50" height="45" rx="12" fill="#5C5C5C"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#7A7A7A"/></g>
  <g id="pet-head">
  <path id="ear-left" d="M30 45 L45 25 L50 45 Z" fill="#475467"/><path d="M34 43 L44 29 L47 43 Z" fill="#F48E8E"/><path id="ear-right" d="M90 45 L75 25 L70 45 Z" fill="#475467"/><path d="M86 43 L76 29 L73 43 Z" fill="#F48E8E"/><rect x="25" y="40" width="70" height="40" rx="16" fill="#475467"/><circle cx="33" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFA5A5" opacity="0.8"/><g id="pet-eyes" stroke="#1D2939" stroke-width="2" stroke-linecap="round"><line x1="42" y1="55" x2="48" y2="61" /><line x1="48" y1="55" x2="42" y2="61" /><line x1="70" y1="55" x2="76" y2="61" /><line x1="76" y1="55" x2="70" y2="61" /></g><line x1="55" y1="67" x2="65" y2="67" stroke="#1D2939" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="62" x2="10" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="20" y1="66" x2="8" y2="67" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="62" x2="110" y2="60" stroke="#98A2B3" stroke-width="1.5"/><line x1="100" y1="66" x2="112" y2="67" stroke="#98A2B3" stroke-width="1.5"/><rect x="44" y="28" width="32" height="12" rx="4" fill="#93C5FD"/><rect x="57" y="24" width="6" height="4" rx="1" fill="#60A5FA"/></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`};
SVG.cat = CAT_SVG.idle;

// Cat state helper — swaps SVG + canvas class for state-specific styling

function setDogState(name) {
  SVG.shiba = DOG_SVG[name];
  svgEl.innerHTML = SVG.shiba;
  canvas.className = canvas.className.replace(/dog-\w+/g, '').trim() + ' dog-' + name;
}
function setCatState(name) {
  SVG.cat = CAT_SVG[name];
  svgEl.innerHTML = SVG.cat;
  canvas.className = canvas.className.replace(/cat-\w+/g, '').trim() + ' cat-' + name;
}


  // 🐕 Dog state templates
const DOG_SVG = {
  idle: `<svg width="120" height="130" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .husky-shadow { fill: #1E293B; opacity: 0.1; }
    .husky-body { fill: #333A42; }
    .husky-white { fill: #F8F6F0; }
    .husky-pink { fill: #E11D48; opacity: 0.15; }
    .husky-paws { fill: #4B5563; }
    .husky-head { fill: #434C56; }
    .husky-tongue { fill: #FB7185; }
  </style>
  <ellipse cx="75" cy="142" rx="36" ry="5" class="husky-shadow" />
  <rect x="42" y="136" width="66" height="6" rx="3" class="husky-shadow"/>
  <g id="dog-body">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="3s" repeatCount="indefinite"/>
    <rect x="48" y="85" width="54" height="48" rx="14" fill="#333A42"/>
    <path d="M 54 85 L 96 85 L 90 118 L 75 124 L 60 118 Z" fill="#F8F6F0"/>
    <g id="dog-tail">
      <animateTransform attributeName="transform" type="rotate" values="-8,100,104; 12,100,104; -8,100,104" dur="1.2s" repeatCount="indefinite"/>
      <path d="M 100 108 C 110 108, 112 96, 104 94 C 96 92, 94 102, 98 106 C 100 100, 106 98, 106 104 C 106 108, 102 108, 100 108 Z" fill="#333A42"/>
    </g>
    <rect x="54" y="126" width="14" height="9" rx="3" fill="#4B5563"/>
    <rect x="82" y="126" width="14" height="9" rx="3" fill="#4B5563"/></g>
  <g id="dog-head">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M 32 50 L 26 14 L 64 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 36 45 L 32 24 L 56 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 40 45 L 38 30 L 52 38 Z" fill="#F8F6F0"/>
    <path d="M 118 50 L 124 14 L 86 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 114 45 L 118 24 L 94 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 110 45 L 112 30 L 98 38 Z" fill="#F8F6F0"/>
    <g id="head-bobble"><animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="3s" repeatCount="indefinite"/>
    <rect x="28" y="32" width="94" height="66" rx="18" fill="#434C56"/>
    <path d="M 28 66 C 28 86, 42 96, 75 96 C 108 96, 122 86, 122 66 C 122 52, 108 48, 98 62 C 90 42, 84 42, 75 60 C 66 42, 60 42, 52 62 C 42 48, 28 52, 28 66 Z" fill="#F8F6F0"/>
    <circle cx="50" cy="46" r="4.5" fill="#F8F6F0"/>
    <circle cx="100" cy="46" r="4.5" fill="#F8F6F0"/>
    <circle cx="51" cy="65" r="7.5" fill="#1E3A8A"/>
    <circle cx="51" cy="65" r="5" fill="#3B82F6"/>
    <circle cx="51" cy="65" r="2" fill="#0F172A"/>
    <circle cx="49" cy="63" r="1.5" fill="#FFFFFF"/>
    <circle cx="99" cy="65" r="7.5" fill="#1E3A8A"/>
    <circle cx="99" cy="65" r="5" fill="#3B82F6"/>
    <circle cx="99" cy="65" r="2" fill="#0F172A"/>
    <circle cx="97" cy="63" r="1.5" fill="#FFFFFF"/>
    <path d="M 64 74 L 86 74 L 88 84 L 75 92 L 62 84 Z" fill="#F8F6F0"/>
    <rect x="67" y="75" width="16" height="10" rx="5" fill="#111827"/>
    <path d="M 66 85 Q 71 88 75 85 Q 79 88 84 85" stroke="#111827" stroke-width="2" stroke-linecap="round" fill="none"/>
    <rect id="dog-tongue" x="71" y="86" width="8" height="7" rx="3" fill="#FB7185"/>
    <line x1="75" y1="86" x2="75" y2="91" stroke="#E11D48" stroke-width="1"/>
  </g>
  <g id="dog-glasses" opacity="0"><rect x="48" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="86" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="64" y1="60" x2="86" y2="60" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="0"><text x="120" y="25" font-size="11" fill="#999" font-weight="bold">z</text><text x="128" y="14" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="135" y="3" font-size="17" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="118" width="90" height="10" rx="3" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="38" y="120" width="10" height="5" rx="1.5" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="54" y="120" width="14" height="5" rx="1.5" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="78" y="120" width="12" height="5" rx="1.5" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="96" y="120" width="10" height="5" rx="1.5" fill="#00FF66" opacity="0"/><path d="M 42 116 L 28 94 L 122 94 L 108 116 Z" fill="url(#screen-glow)" opacity="0.12"/></g>
</svg>`,
  eating: `<svg width="120" height="130" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes chew {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(0, 1.5px) scale(0.95, 1.05); }
    }
    #animated-mouth {
      animation: chew 0.4s ease-in-out infinite;
      transform-origin: 75px 85px;
    }
  </style>
  <ellipse cx="75" cy="142" rx="36" ry="5" class="husky-shadow" />
  <rect x="40" y="136" width="70" height="6" rx="3" fill="#1E293B" opacity="0.1"/>
  <g id="dog-body">
    <rect x="52" y="85" width="46" height="48" rx="14" fill="#333A42"/>
    <path d="M 58 85 L 92 85 L 86 118 L 75 124 L 64 118 Z" fill="#F8F6F0"/>
    <path d="M 98 102 Q 111 95 106 85 C 101 78, 94 88, 98 96" stroke="#333A42" stroke-width="6" stroke-linecap="round" fill="none"/>
    <rect x="58" y="126" width="12" height="9" rx="3" fill="#4B5563"/>
    <rect x="80" y="126" width="12" height="9" rx="3" fill="#4B5563"/>
  </g>
  <g id="dog-head">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M 32 50 L 26 14 L 64 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 36 45 L 32 24 L 56 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 40 45 L 38 30 L 52 38 Z" fill="#F8F6F0"/>
    <path d="M 118 50 L 124 14 L 86 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 114 45 L 118 24 L 94 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 110 45 L 112 30 L 98 38 Z" fill="#F8F6F0"/>
    <rect x="28" y="32" width="94" height="66" rx="18" fill="#434C56"/>
    <path d="M 28 66 C 28 86, 42 96, 75 96 C 108 96, 122 86, 122 66 C 122 52, 108 48, 98 62 C 90 42, 84 42, 75 60 C 66 42, 60 42, 52 62 C 42 48, 28 52, 28 66 Z" fill="#F8F6F0"/>
    <circle cx="50" cy="46" r="4.5" fill="#F8F6F0"/><circle cx="100" cy="46" r="4.5" fill="#F8F6F0"/>
    <circle cx="51" cy="65" r="7.5" fill="#1E3A8A"/><circle cx="51" cy="65" r="5" fill="#3B82F6"/><circle cx="51" cy="65" r="2" fill="#0F172A"/><circle cx="49" cy="63" r="1.5" fill="#FFFFFF"/>
    <circle cx="99" cy="65" r="7.5" fill="#1E3A8A"/><circle cx="99" cy="65" r="5" fill="#3B82F6"/><circle cx="99" cy="65" r="2" fill="#0F172A"/><circle cx="97" cy="63" r="1.5" fill="#FFFFFF"/>
    <path d="M 64 74 L 86 74 L 88 84 L 75 92 L 62 84 Z" fill="#F8F6F0"/>
    <rect x="67" y="75" width="16" height="10" rx="5" fill="#111827"/>
    <g id="animated-mouth">
      <path d="M 66 85 Q 71 88 75 85 Q 79 88 84 85" stroke="#111827" stroke-width="2" stroke-linecap="round" fill="none"/>
      <rect x="71" y="86" width="8" height="7" rx="3" fill="#FB7185"/><line x1="75" y1="86" x2="75" y2="91" stroke="#E11D48" stroke-width="1"/>
      <rect x="62" y="88" width="2" height="2" fill="#B45309"/><rect x="64" y="91" width="1.5" height="1.5" fill="#B45309"/><rect x="86" y="86" width="2" height="2" fill="#B45309"/>
    </g>
  </g>
  <g id="food-bowl"><path d="M 50 122 Q 75 110 100 122 Z" fill="#92400E"/><circle cx="63" cy="118" r="3" fill="#B45309"/><circle cx="75" cy="116" r="3.5" fill="#78350F"/><circle cx="87" cy="119" r="3" fill="#B45309"/><path d="M 46 122 L 104 122 L 98 138 L 52 138 Z" fill="#EF4444"/><path d="M 52 135 L 98 135 L 96 138 L 54 138 Z" fill="#DC2626"/><g transform="translate(64, 127)"><rect x="5" y="3" width="12" height="4" rx="1" fill="#FFFFFF"/><circle cx="5" cy="3" r="2.2" fill="#FFFFFF"/><circle cx="5" cy="7" r="2.2" fill="#FFFFFF"/><circle cx="17" cy="3" r="2.2" fill="#FFFFFF"/><circle cx="17" cy="7" r="2.2" fill="#FFFFFF"/></g></g>
  <g id="dog-glasses" opacity="0"><rect x="48" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="86" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="64" y1="60" x2="86" y2="60" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="0"><text x="120" y="25" font-size="11" fill="#999" font-weight="bold">z</text><text x="128" y="14" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="135" y="3" font-size="17" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="118" width="90" height="10" rx="3" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="38" y="120" width="10" height="5" rx="1.5" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="54" y="120" width="14" height="5" rx="1.5" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="78" y="120" width="12" height="5" rx="1.5" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="96" y="120" width="10" height="5" rx="1.5" fill="#00FF66" opacity="0"/><path d="M 42 116 L 28 94 L 122 94 L 108 116 Z" fill="url(#screen-glow)" opacity="0.12"/></g>
</svg>`,
  bathing: `<svg width="120" height="130" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .husky-shadow { fill: #1E293B; opacity: 0.1; }
    .husky-body { fill: #333A42; }
    .husky-white { fill: #F8F6F0; }
    .husky-pink { fill: #E11D48; opacity: 0.15; }
    .husky-paws { fill: #4B5563; }
    .husky-head { fill: #434C56; }
  </style>
  <ellipse cx="75" cy="142" rx="36" ry="5" class="husky-shadow" />
  <rect x="35" y="138" width="80" height="6" rx="3" class="husky-shadow"/>
  <g id="dog-body">
    <rect x="48" y="85" width="54" height="40" rx="14" fill="#333A42"/>
    <path d="M 54 85 L 96 85 L 90 118 L 75 122 L 60 118 Z" fill="#F8F6F0"/>
  </g>
  <g id="dog-head">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M 32 50 L 26 14 L 64 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 40 45 L 38 30 L 52 38 Z" fill="#F8F6F0"/>
    <path d="M 118 50 L 124 14 L 86 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 110 45 L 112 30 L 98 38 Z" fill="#F8F6F0"/>
    <rect x="60" y="16" width="30" height="10" rx="3" fill="#E2E8F0"/>
    <rect x="65" y="20" width="20" height="6" rx="1" fill="#FFFFFF"/>
    <rect x="28" y="32" width="94" height="66" rx="18" fill="#434C56"/>
    <path d="M 28 66 C 28 86, 42 96, 75 96 C 108 96, 122 86, 122 66 C 122 52, 108 48, 98 62 C 90 42, 84 42, 75 60 C 66 42, 60 42, 52 62 C 42 48, 28 52, 28 66 Z" fill="#F8F6F0"/>
    <circle cx="50" cy="42" r="4.5" fill="#F8F6F0"/><circle cx="100" cy="42" r="4.5" fill="#F8F6F0"/>
    <circle cx="51" cy="65" r="7.5" fill="#1E3A8A"/><circle cx="51" cy="65" r="5" fill="#3B82F6"/><circle cx="51" cy="65" r="2" fill="#0F172A"/><circle cx="49" cy="63" r="1.5" fill="#FFFFFF"/>
    <circle cx="99" cy="65" r="7.5" fill="#1E3A8A"/><circle cx="99" cy="65" r="5" fill="#3B82F6"/><circle cx="99" cy="65" r="2" fill="#0F172A"/><circle cx="97" cy="63" r="1.5" fill="#FFFFFF"/>
    <path d="M 64 74 L 86 74 L 88 84 L 75 92 L 62 84 Z" fill="#F8F6F0"/>
    <rect x="67" y="75" width="16" height="10" rx="5" fill="#111827"/>
    <path d="M 66 86 Q 75 92 84 86" stroke="#111827" stroke-width="2" stroke-linecap="round" fill="none"/>
  </g>
  <rect x="30" y="115" width="90" height="22" rx="4" fill="#B45309"/>
  <rect x="34" y="119" width="82" height="4" fill="#78350F"/>
  <circle cx="38" cy="108" r="2" fill="#60A5FA" opacity="0.7"/><circle cx="114" cy="110" r="3" fill="#60A5FA" opacity="0.7"/>
  
  <!-- Rising bath bubbles -->
  <g id="bath-bubbles">
    <circle cx="38" cy="105" r="6" fill="#93C5FD" opacity="0.7">
      <animate attributeName="cy" values="105;90;75" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0.3;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="98" r="5" fill="#93C5FD" opacity="0.6">
      <animate attributeName="cy" values="98;82;66" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0.2;0" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="95" cy="100" r="6" fill="#93C5FD" opacity="0.6">
      <animate attributeName="cy" values="100;85;70" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0.2;0" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="110" cy="108" r="7" fill="#93C5FD" opacity="0.5">
      <animate attributeName="cy" values="108;92;76" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0.2;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="42" cy="112" r="4" fill="#93C5FD" opacity="0.7">
      <animate attributeName="cy" values="112;98;84" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" repeatCount="indefinite"/>
    </circle>
  </g>
  <!-- Steam rising -->
  <g stroke="#D0D5DD" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.4">
    <path d="M 32 112 Q 28 102 34 92 Q 30 82 33 72">
      <animate attributeName="opacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite"/>
    </path>
    <path d="M 118 108 Q 122 98 116 88 Q 120 78 118 68">
      <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite"/>
    </path>
  </g><g id="dog-glasses" opacity="0"><rect x="48" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="86" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="64" y1="60" x2="86" y2="60" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="0"><text x="120" y="25" font-size="11" fill="#999" font-weight="bold">z</text><text x="128" y="14" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="135" y="3" font-size="17" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="118" width="90" height="10" rx="3" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="38" y="120" width="10" height="5" rx="1.5" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="54" y="120" width="14" height="5" rx="1.5" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="78" y="120" width="12" height="5" rx="1.5" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="96" y="120" width="10" height="5" rx="1.5" fill="#00FF66" opacity="0"/><path d="M 42 116 L 28 94 L 122 94 L 108 116 Z" fill="url(#screen-glow)" opacity="0.12"/></g>
</svg>`,
  sick: `<!-- DOG SICK --><svg width="120" height="130" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .husky-shadow { fill: #1E293B; opacity: 0.1; }
    .husky-body { fill: #333A42; }
    .husky-white { fill: #F8F6F0; }
    .husky-pink { fill: #E11D48; opacity: 0.15; }
    .husky-paws { fill: #4B5563; }
    .husky-head { fill: #434C56; }
  </style>
  <ellipse cx="75" cy="142" rx="36" ry="5" class="husky-shadow" />
  <rect x="42" y="136" width="66" height="6" rx="3" class="husky-shadow"/>
  <g id="dog-body">
    <rect x="48" y="85" width="54" height="48" rx="14" fill="#333A42"/>
    <path d="M 54 85 L 96 85 L 90 118 L 75 124 L 60 118 Z" fill="#F8F6F0"/>
    <path d="M 102 112 Q 106 122 103 128" stroke="#333A42" stroke-width="6" stroke-linecap="round" fill="none"/>
    <rect x="54" y="126" width="14" height="9" rx="3" fill="#4B5563"/>
    <rect x="82" y="126" width="14" height="9" rx="3" fill="#4B5563"/>
  </g>
  <g id="dog-head">
    <path d="M 34 52 L 18 22 L 60 40 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 40 47 L 26 28 L 54 41 Z" fill="#F8F6F0"/>
    <path d="M 116 52 L 132 22 L 90 40 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 110 47 L 124 28 L 96 41 Z" fill="#F8F6F0"/>
    <rect x="28" y="32" width="94" height="66" rx="18" fill="#434C56"/>
    <path d="M 28 66 C 28 86, 42 96, 75 96 C 108 96, 122 86, 122 66 C 122 52, 108 48, 98 62 C 90 42, 84 42, 75 60 C 66 42, 60 42, 52 62 C 42 48, 28 52, 28 66 Z" fill="#F8F6F0"/>
    <circle cx="52" cy="50" r="4.5" fill="#F8F6F0"/><circle cx="98" cy="50" r="4.5" fill="#F8F6F0"/>
    <rect x="62" y="36" width="26" height="11" rx="2" fill="#93C5FD" opacity="0.9"/>
    <rect x="65" y="39" width="20" height="5" rx="1" fill="#60A5FA" opacity="0.4"/>
    <path d="M 45 60 L 57 70 M 57 60 L 45 70" stroke="#1E3A8A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 93 60 L 105 70 M 105 60 L 93 70" stroke="#1E3A8A" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 64 74 L 86 74 L 88 84 L 75 92 L 62 84 Z" fill="#F8F6F0"/>
    <rect x="67" y="75" width="16" height="10" rx="5" fill="#111827"/>
    <path d="M 67 89 Q 75 83 83 89" stroke="#111827" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  </g>
  <g id="dog-glasses" opacity="0"><rect x="48" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="86" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="64" y1="60" x2="86" y2="60" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="0"><text x="120" y="25" font-size="11" fill="#999" font-weight="bold">z</text><text x="128" y="14" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="135" y="3" font-size="17" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="118" width="90" height="10" rx="3" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="38" y="120" width="10" height="5" rx="1.5" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="54" y="120" width="14" height="5" rx="1.5" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="78" y="120" width="12" height="5" rx="1.5" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="96" y="120" width="10" height="5" rx="1.5" fill="#00FF66" opacity="0"/><path d="M 42 116 L 28 94 L 122 94 L 108 116 Z" fill="url(#screen-glow)" opacity="0.12"/></g>
</svg>`,
  sleeping: `<svg width="120" height="130" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .husky-shadow { fill: #1E293B; opacity: 0.1; }
    .husky-body { fill: #333A42; }
    .husky-white { fill: #F8F6F0; }
    .husky-pink { fill: #E11D48; opacity: 0.15; }
    .husky-paws { fill: #4B5563; }
    .husky-head { fill: #434C56; }
  </style>
  <ellipse cx="75" cy="142" rx="36" ry="5" class="husky-shadow" />
  <rect x="45" y="138" width="60" height="5" rx="2.5" class="husky-shadow"/>
  <g id="dog-body">
    <rect x="50" y="90" width="50" height="42" rx="16" fill="#333A42"/>
    <path d="M 56 90 L 94 90 L 88 116 L 75 122 L 62 116 Z" fill="#F8F6F0"/>
    <path d="M 100 105 Q 108 112 105 120 C 102 128, 98 126, 100 120" stroke="#333A42" stroke-width="5" stroke-linecap="round" fill="none"/>
    <rect x="56" y="124" width="12" height="8" rx="3" fill="#4B5563"/>
    <rect x="82" y="124" width="12" height="8" rx="3" fill="#4B5563"/>
  </g>
  <g id="dog-head">
    <animateTransform attributeName="transform" type="translate" values="0,0; 0,0.5; 0,0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M 32 50 L 26 14 L 64 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 36 45 L 32 24 L 56 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 40 45 L 38 30 L 52 38 Z" fill="#F8F6F0"/>
    <path d="M 118 50 L 124 14 L 86 36 Z" fill="#333A42" stroke="#333A42" stroke-width="2" stroke-linejoin="round"/>
    <path d="M 114 45 L 118 24 L 94 37 Z" fill="#E11D48" opacity="0.15"/>
    <path d="M 110 45 L 112 30 L 98 38 Z" fill="#F8F6F0"/>
    <rect x="28" y="32" width="94" height="66" rx="18" fill="#434C56"/>
    <path d="M 28 66 C 28 86, 42 96, 75 96 C 108 96, 122 86, 122 66 C 122 52, 108 48, 98 62 C 90 42, 84 42, 75 60 C 66 42, 60 42, 52 62 C 42 48, 28 52, 28 66 Z" fill="#F8F6F0"/>
    <circle cx="50" cy="52" r="4.5" fill="#F8F6F0"/><circle cx="100" cy="52" r="4.5" fill="#F8F6F0"/>
    <path d="M 44 65 C 48 70, 54 70, 58 65" stroke="#111827" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 92 65 C 96 70, 102 70, 106 65" stroke="#111827" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M 64 74 L 86 74 L 88 84 L 75 92 L 62 84 Z" fill="#F8F6F0"/>
    <rect x="67" y="75" width="16" height="10" rx="5" fill="#111827"/>
    <path d="M 67 86 Q 71 89 75 86 Q 79 89 83 86" stroke="#111827" stroke-width="2" stroke-linecap="round" fill="none"/>
    <circle cx="85" cy="88" r="3.5" fill="#60A5FA" opacity="0.6"/><circle cx="85" cy="88" r="2" fill="#FFFFFF"/>
  </g>
  <g id="zzz"><path d="M 110 50 L 118 50 L 110 58 L 118 58" stroke="#FDFBF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8"/><path d="M 120 40 L 128 40 L 120 48 L 128 48" stroke="#FDFBF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.8"/></g>
  <g id="dog-glasses" opacity="0"><rect x="48" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="86" y="55" width="16" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="64" y1="60" x2="86" y2="60" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="1"><text x="120" y="25" font-size="11" fill="#999" font-weight="bold">z</text><text x="128" y="14" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="135" y="3" font-size="17" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="118" width="90" height="10" rx="3" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="38" y="120" width="10" height="5" rx="1.5" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="54" y="120" width="14" height="5" rx="1.5" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="78" y="120" width="12" height="5" rx="1.5" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="96" y="120" width="10" height="5" rx="1.5" fill="#00FF66" opacity="0"/><path d="M 42 116 L 28 94 L 122 94 L 108 116 Z" fill="url(#screen-glow)" opacity="0.12"/></g>
</svg>`};
SVG.shiba = DOG_SVG.idle;
  SVG.rabbit = `<svg width="120" height="130" viewBox="0 0 140 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="warmMilkPink" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFB3C7"/><stop offset="100%" stop-color="#FFD4D4"/></linearGradient>
    <linearGradient id="glowSoftCyan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#DDFDFF"/><stop offset="100%" stop-color="#E9D5FF"/></linearGradient>
    <linearGradient id="glowOuterSoftCyan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#A7F3F0"/><stop offset="100%" stop-color="#C4B5FD"/></linearGradient>
  </defs>
  <g transform="matrix(0.3 0 0 0.3 25 10)">
    <ellipse cx="200" cy="432" rx="55" ry="6" fill="#A88E8E" opacity="0.08"/>
    <g id="rabbit-ear-l">
      <path d="M130,150 C85,-10 125,-20 155,25 C178,60 168,110 162,150 Z" fill="#FFFFFF" stroke="#3A2422" stroke-width="7" stroke-linejoin="round"/>
      <path d="M135,135 C98,15 125,10 146,45 C160,70 154,110 151,135 Z" fill="url(#warmMilkPink)"/>
    </g>
    <g id="rabbit-ear-r">
      <path d="M270,150 C315,-10 275,-20 245,25 C222,60 232,110 238,150 Z" fill="#FFFFFF" stroke="#3A2422" stroke-width="7" stroke-linejoin="round"/>
      <path d="M265,135 C302,15 275,10 254,45 C240,70 246,110 249,135 Z" fill="url(#warmMilkPink)"/>
    </g>
    <path d="M275,370 C295,360 310,375 305,395 C300,410 285,410 282,395 Z" fill="#FFFFFF" stroke="#3A2422" stroke-width="6" stroke-linejoin="round"/>
    <path d="M155,235 C132,295 125,385 200,385 C275,385 268,295 245,235 Z" fill="#FFFFFF" stroke="#3A2422" stroke-width="7" stroke-linejoin="round"/>
    <circle cx="200" cy="275" r="14" fill="#E2E8F0" stroke="#3A2422" stroke-width="4"/>
    <circle cx="200" cy="275" r="8" fill="url(#glowSoftCyan)" stroke="url(#glowOuterSoftCyan)" stroke-width="2"/>
    <path d="M150,260 C150,295 170,305 178,290 C182,275 168,255 156,255" fill="#FFFFFF" stroke="#3A2422" stroke-width="6" stroke-linejoin="round"/>
    <path d="M162,290 Q168,284 174,292" fill="none" stroke="#F87171" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M250,260 C250,295 230,305 222,290 C218,275 232,255 244,255" fill="#FFFFFF" stroke="#3A2422" stroke-width="6" stroke-linejoin="round"/>
    <path d="M238,290 Q232,284 226,292" fill="none" stroke="#F87171" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="150" cy="380" rx="16" ry="10" fill="#FFFFFF" stroke="#3A2422" stroke-width="6"/>
    <ellipse cx="250" cy="380" rx="16" ry="10" fill="#FFFFFF" stroke="#3A2422" stroke-width="6"/>
    <g id="rabbit-head">
      <path d="M102,185 C102,135 146,110 200,110 C254,110 298,135 298,185 C298,240 254,252 200,252 C146,252 102,240 102,185 Z" fill="#FFFFFF" stroke="#3A2422" stroke-width="7" stroke-linejoin="round"/>
      <g id="rabbit-eyes">
        <ellipse cx="160" cy="182" rx="18" ry="22" fill="#3A2422"/>
        <ellipse cx="153" cy="172" rx="8" ry="10" fill="#FFFFFF"/><circle cx="167" cy="190" r="3.5" fill="#FFFFFF"/>
        <ellipse cx="240" cy="182" rx="18" ry="22" fill="#3A2422"/>
        <ellipse cx="233" cy="172" rx="8" ry="10" fill="#FFFFFF"/><circle cx="247" cy="190" r="3.5" fill="#FFFFFF"/>
      </g>
      <ellipse cx="128" cy="212" rx="16" ry="8" fill="#FF75A0" opacity="0.3"/>
      <ellipse cx="272" cy="212" rx="16" ry="8" fill="#FF75A0" opacity="0.3"/>
      <path d="M196,195 L204,195 Q200,200 196,195 Z" fill="#FDA4AF" stroke="#3A2422" stroke-width="2" stroke-linejoin="round"/>
      <path d="M188,206 Q194,213 200,207 Q206,213 212,206" fill="none" stroke="#3A2422" stroke-width="4.5" stroke-linecap="round"/>
    </g>
  </g>
  <g id="pet-glasses" opacity="0"><rect x="46" y="60" width="14" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><rect x="80" y="60" width="14" height="10" rx="2" stroke="#FF9800" stroke-width="1.5" fill="none" opacity="0.8"/><line x1="60" y1="65" x2="80" y2="65" stroke="#FF9800" stroke-width="1.5" opacity="0.8"/></g>
  <g id="zzz-group" opacity="0"><text x="110" y="25" font-size="10" fill="#999" font-weight="bold">z</text><text x="118" y="15" font-size="13" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="126" y="5" font-size="16" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="105" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="107" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="107" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="107" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="107" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 105 L 20 85 L 100 85 L 85 105 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`;
  

  const PETS = {
    cat:   { name: '🐱 CyberCat',    svg: SVG.cat,   css: 'pet-cat' },
    shiba: { name: '🐕 Shiba',       svg: SVG.shiba, css: 'pet-shiba' },
    rabbit:{ name: '🐰 Bunny',       svg: SVG.rabbit,css: 'pet-rabbit' },
  };


  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. BUILD DOM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const root = document.createElement('div');
  root.id = 'cyber-pet-root';
  root.innerHTML = `
    <div id="cp-bubble" class="cp-bubble-hidden"></div>
    <div id="cp-canvas" class="pet-cat state-idle cat-idle dog-idle">
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

const Q_DOG = {
  idle: ["You're my favorite human! 🐕","Woof! Pet me please!","I love belly rubs! 🥹","Let's go for a walk! 🦮","Best day ever!","*sniff sniff* Whatcha doing?"],
  hungry: ["I'm starving! Feed me! 🥺","My bowl is empty!","I could eat a horse! 🐴","*whines hungrily*"],
  dirty: ["I need a bath! 🫤","I smell like... me.","Time for a shower?"],
  happy: ["Woof woof! 🐕💖","That's the spot!","I love you hooman! ❤️","*tail wagging furiously*"],
  slack: ["Stop slacking! WOOF! 😤","Get back to work or I'll chew your shoes!","Focus! 🐕"],
  wake: ["*yawns* Good morning!","Did I miss walk time? 🐾","Stretch! Now pet me!"]
};
  
// Pet-specific quote picker
function pickQ(type) {
  const source = S.currentPet === 'shiba' ? Q_DOG : Q;
  return source[type][Math.floor(Math.random() * source[type].length)];
}
const pick = a => a[Math.floor(Math.random() * a.length)];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const S = {
    pet: 'idle', fullness: 100, cleanliness: 100, mood: 100, health: 100,
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
    svgEl.innerHTML = pet.svg;
    if (name === "shiba") setDogState("idle");
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
      setTimeout(() => showBubble(pickQ('wake'), 4000), 300);
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
    chrome.storage.local.get(['fullness','cleanliness','mood','health','isFocusing','selectedPet'], d => {
      if (chrome.runtime.lastError) return;
      S.fullness = d.fullness ?? 100; S.cleanliness = d.cleanliness ?? 100;
      S.mood = d.mood ?? 100; S.health = d.health ?? 100;
      S.focusing = d.isFocusing ?? false;

      // Apply saved pet
      if (d.selectedPet && d.selectedPet !== S.currentPet && PETS[d.selectedPet]) applyPet(d.selectedPet);

      if (S.pet === 'sleeping' && !S.focusing) return;
      if (S.health > 20) { if (S.currentPet === 'shiba' && SVG.shiba === DOG_SVG.sick) { setDogState('idle'); } else if (S.currentPet === 'cat' && SVG.cat === CAT_SVG.sick) { setState('idle'); setCatState('idle'); } }
      if (S.focusing) setState('working');
      else if (S.health <= 20) { setState('sick'); if (S.currentPet === 'shiba') { setDogState('sick'); } else if (S.currentPet === 'cat') { setCatState('sick'); } } else if (S.fullness < 20) setState('hungry');
      else if (['working','hungry','surprised'].includes(S.pet)) setState('idle');
      if (bubble.className === 'cp-bubble-hidden') {
        if (S.focusing) return;
        if (S.health <= 0) showBubble('I feel terrible... 😵', 5000);
        else if (S.fullness < 20) showBubble(pickQ('hungry'), 5000);
        else if (S.cleanliness < 20) showBubble(pickQ('dirty'), 5000);
        else if (S.mood > 80 && Math.random() < 0.3) showBubble(pickQ('happy'), 3500);
        else if (Math.random() < 0.3) showBubble(pickQ('idle'), 4000);
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
    if (Date.now() - S.lastMove > 120000 && S.pet === 'idle' && !S.focusing) { setState('sleeping'); if (S.currentPet === 'shiba') setDogState('sleeping'); }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 11. DRAGGING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let dy0 = 0, top0 = 0;
  root.addEventListener('mousedown', e => {
    if (e.button === 2) return; // 右键不触发拖动
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
  // 12. CLICK / DOUBLE-CLICK / RIGHT-CLICK
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Single click = random reaction; double click = pet
  const REACTIONS = ['meow', 'purr', 'tilt', 'surprised'];
  let cc = 0, cTimer = null;
  root.addEventListener('click', e => {
    if (S.isDragging) return;
    if (S.pet === 'sleeping') { setState('idle'); if (S.currentPet === 'shiba') setDogState('idle'); else if (S.currentPet === 'cat') setCatState('idle'); }
    cc++;
    if (cc === 1) {
      cTimer = setTimeout(() => {
        cc = 0; const r = pick(REACTIONS);
        switch (r) {
          case 'meow': if (S.currentPet === 'shiba') { showBubble('*woof* 🐕', 2500); } else { showBubble('*meow* 🐱', 2500); } break;
          case 'purr': if (S.currentPet === 'shiba') { showBubble('*pants happily* 🐕', 2500); } else { showBubble('Purrr~ ✨', 2500); } break;
          case 'tilt': showBubble('*tilts head* 🤔', 2500); doAction('curious', 1200); break;
          case 'surprised': showBubble('Mrow?! 👀', 2500); doAction('surprised', 1200); break;
        }
      }, 250);
    } else {
      clearTimeout(cTimer); cc = 0;
      // Double-click = pet ❤️
      doInteract('pet');
    }
  });

  // Right-click = custom context menu (Feed / Bath)
  const ctxMenu = document.createElement('div');
  ctxMenu.id = 'cp-ctxmenu';
  ctxMenu.innerHTML = `
    <button data-act="feed">🍖 Feed (+30)</button>
    <button data-act="bath">🧼 Bath (+40)</button>
  `;
  ctxMenu.style.cssText = 'position:fixed;z-index:2147483647;background:#FFF;border:2px solid #333;border-radius:8px;padding:4px;box-shadow:3px 3px 0 #333;display:none;font-family:inherit;';
  document.body.appendChild(ctxMenu);
  // Style child buttons
  ctxMenu.querySelectorAll('button').forEach(b => {
    b.style.cssText = 'display:block;width:100%;padding:8px 12px;border:none;background:transparent;font-size:12px;font-weight:600;cursor:pointer;text-align:left;border-radius:4px;font-family:inherit;color:#222';
    b.onmouseenter = () => b.style.background = '#F0F0F0';
    b.onmouseleave = () => b.style.background = 'transparent';
  });
  ctxMenu.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    hideCtxMenu();
    doInteract(btn.dataset.act);
  });

  function showCtxMenu(x, y) {
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top  = y + 'px';
    ctxMenu.style.display = 'block';
    // Auto-flip if too close to right/bottom edge
    setTimeout(() => {
      const r = ctxMenu.getBoundingClientRect();
      if (r.right  > window.innerWidth)  ctxMenu.style.left = (x - r.width) + 'px';
      if (r.bottom > window.innerHeight) ctxMenu.style.top  = (y - r.height) + 'px';
    }, 0);
  }
  function hideCtxMenu() { ctxMenu.style.display = 'none'; }

  root.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (S.isDragging) return;
    showCtxMenu(e.clientX, e.clientY);
  });
  // Close menu on click anywhere else / ESC
  document.addEventListener('click', e => {
    if (!ctxMenu.contains(e.target)) hideCtxMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideCtxMenu(); });

  // Local interact: send to background, react locally
  function doInteract(type) {
    if (!extOK()) return;
    if (S.pet === 'sleeping') { setState('idle'); if (S.currentPet === 'shiba') setDogState('idle'); else if (S.currentPet === 'cat') setCatState('idle'); }
    chrome.runtime.sendMessage({ action: 'interact', type }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) return;
      switch (type) {
        case 'feed': if (S.currentPet === 'shiba') { setDogState('eating'); setTimeout(() => { setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('eating'); setTimeout(() => { setCatState('idle'); }, 10000); } showBubble('*munch munch* 🍖 Yum!', 3500); spawn('food', 6); doAction('surprised', 500); break;
        case 'bath': if (S.currentPet === 'shiba') { setDogState('bathing'); setTimeout(() => { setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('bathing'); setTimeout(() => { setCatState('idle'); }, 10000); } showBubble('*splash splash* 🛁 So clean!', 3500); spawn('sparkle', 8); break;
        case 'pet':  showBubble('Purrr~ ❤️', 3000); spawn('heart', 8); doAction('surprised', 400); break;
      }
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 13. MESSAGES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  try {
    chrome.runtime.onMessage.addListener(msg => {
      if (!extOK()) return;
      const action = msg.action;
      if (!action) return;
      switch (action) {
        case 'slackWarning': showBubble(pickQ('slack'), 5000); doAction('surprised', 800); break;
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
            case 'feed': if (S.currentPet === 'shiba') { setDogState('eating'); setTimeout(() => { setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('eating'); setTimeout(() => { setCatState('idle'); }, 10000); } showBubble('*munch munch* 🍖 Yum!', 3500); spawn('food', 6); doAction('surprised', 500); break;
            case 'bath': if (S.currentPet === 'shiba') { setDogState('bathing'); setTimeout(() => { setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('bathing'); setTimeout(() => { setCatState('idle'); }, 10000); } showBubble('*splash splash* 🛁 So clean!', 3500); spawn('sparkle', 8); break;
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
