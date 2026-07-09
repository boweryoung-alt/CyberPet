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
  idle: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="126" rx="27" ry="4.5" fill="#D0D5DD" opacity="0.5"/>
  <g id="dog-tail"><path d="M77 117 Q98 115 100 92 Q101 77 87 80 Q78 83 83 98 Q85 87 92 90 Q99 94 94 105 Q90 115 77 117 Z" fill="#EAD9BE"/><path d="M95 89 Q99 97 93 105" stroke="#E5BC8E" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g id="dog-body">
    <path d="M51 80 Q51 91 55 96 L65 96 Q69 91 69 80 Z" fill="#EAD9BE"/>
    <path d="M53 85 Q45 87 43 99 Q37 106 38 114 Q40 122 52 122 Q60 123 68 122 Q80 122 82 114 Q83 106 77 99 Q75 87 67 85 Q60 83 53 85 Z" fill="#EAD9BE"/>
    <path d="M60 89 Q72 92 72 106 Q72 116 60 117 Q48 116 48 106 Q48 92 60 89 Z" fill="#FCF9F3"/>
    <path d="M44 99 Q41 109 45 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M76 99 Q79 109 75 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M52 106 Q49 114 51 121 L60 121 Q60 113 60 106 Z" fill="#FCF9F3"/>
    <path d="M60 106 Q60 113 60 121 L69 121 Q71 114 68 106 Z" fill="#FCF9F3"/>
    <path d="M60 107 L60 120" stroke="#E3D2B6" stroke-width="1.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M54 116 L54 121 M57 116 L57 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M63 116 L63 121 M66 116 L66 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <g id="dog-head">
    <path id="ear-left" d="M31 47 Q27 20 38 18 Q50 26 51 47 Z" fill="#E5BC8E"/>
    <path d="M36 44 Q34 26 40 25 Q47 31 47 44 Z" fill="#F2E3CE"/>
    <path id="ear-right" d="M89 47 Q93 20 82 18 Q70 26 69 47 Z" fill="#E5BC8E"/>
    <path d="M84 44 Q86 26 80 25 Q73 31 73 44 Z" fill="#F2E3CE"/>
    <path d="M29 60 Q29 42 47 40 Q60 38.5 73 40 Q91 42 91 60 Q91 78 73 85 Q60 88 47 85 Q29 78 29 60 Z" fill="#E5BC8E"/>
    <path d="M32 62 Q34 51 45 50 Q52 49 56 48 Q58 40.5 60 40.5 Q62 40.5 64 48 Q68 49 75 50 Q86 51 88 62 Q89 76 78 83 Q60 88 42 83 Q31 76 32 62 Z" fill="#FCF9F3"/>
    <ellipse cx="46" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <ellipse cx="74" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <circle cx="35" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="85" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="46" cy="63" r="4.8" fill="#4A3F38"/><circle cx="44.2" cy="61.2" r="1.4" fill="#fff"/>
    <circle cx="74" cy="63" r="4.8" fill="#4A3F38"/><circle cx="72.2" cy="61.2" r="1.4" fill="#fff"/>
    <ellipse cx="60" cy="66" rx="4.6" ry="3.4" fill="#4A3F38"/>
    <path d="M60 69 L60 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M53 71 Q60 80 67 71 Z" fill="#4A3F38"/>
    <path id="dog-tongue" d="M57 73 Q57 79 60 79 Q63 79 63 73 Z" fill="#FB99A0"/>
  </g>
  <g id="dog-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  eating: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="126" rx="27" ry="4.5" fill="#D0D5DD" opacity="0.5"/>
  <g id="dog-tail"><animateTransform attributeName="transform" type="rotate" values="-5,87,115; 11,87,115; -5,87,115" dur="0.3s" repeatCount="indefinite"/><path d="M77 117 Q98 115 100 92 Q101 77 87 80 Q78 83 83 98 Q85 87 92 90 Q99 94 94 105 Q90 115 77 117 Z" fill="#EAD9BE"/><path d="M95 89 Q99 97 93 105" stroke="#E5BC8E" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g id="dog-body">
    <path d="M51 80 Q51 91 55 96 L65 96 Q69 91 69 80 Z" fill="#EAD9BE"/>
    <path d="M53 85 Q45 87 43 99 Q37 106 38 114 Q40 122 52 122 Q60 123 68 122 Q80 122 82 114 Q83 106 77 99 Q75 87 67 85 Q60 83 53 85 Z" fill="#EAD9BE"/>
    <path d="M60 89 Q72 92 72 106 Q72 116 60 117 Q48 116 48 106 Q48 92 60 89 Z" fill="#FCF9F3"/>
    <path d="M44 99 Q41 109 45 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M76 99 Q79 109 75 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M52 106 Q49 114 51 121 L60 121 Q60 113 60 106 Z" fill="#FCF9F3"/>
    <path d="M60 106 Q60 113 60 121 L69 121 Q71 114 68 106 Z" fill="#FCF9F3"/>
    <path d="M60 107 L60 120" stroke="#E3D2B6" stroke-width="1.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M54 116 L54 121 M57 116 L57 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M63 116 L63 121 M66 116 L66 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <g id="dog-head">
    <path id="ear-left" d="M31 47 Q27 20 38 18 Q50 26 51 47 Z" fill="#E5BC8E"/>
    <path d="M36 44 Q34 26 40 25 Q47 31 47 44 Z" fill="#F2E3CE"/>
    <path id="ear-right" d="M89 47 Q93 20 82 18 Q70 26 69 47 Z" fill="#E5BC8E"/>
    <path d="M84 44 Q86 26 80 25 Q73 31 73 44 Z" fill="#F2E3CE"/>
    <path d="M29 60 Q29 42 47 40 Q60 38.5 73 40 Q91 42 91 60 Q91 78 73 85 Q60 88 47 85 Q29 78 29 60 Z" fill="#E5BC8E"/>
    <path d="M32 62 Q34 51 45 50 Q52 49 56 48 Q58 40.5 60 40.5 Q62 40.5 64 48 Q68 49 75 50 Q86 51 88 62 Q89 76 78 83 Q60 88 42 83 Q31 76 32 62 Z" fill="#FCF9F3"/>
    <ellipse cx="46" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <ellipse cx="74" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <circle cx="35" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="85" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="46" cy="63" r="4.8" fill="#4A3F38"/><circle cx="44.2" cy="61.2" r="1.4" fill="#fff"/>
    <circle cx="74" cy="63" r="4.8" fill="#4A3F38"/><circle cx="72.2" cy="61.2" r="1.4" fill="#fff"/>
    <ellipse cx="60" cy="66" rx="4.6" ry="3.4" fill="#4A3F38"/>
    <path d="M60 69 L60 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round"/>
    <g id="chewing-mouth"><path d="M53 71 Q60 80 67 71 Z" fill="#4A3F38"><animate attributeName="d" values="M53 71 Q60 80 67 71 Z; M53 71 Q60 76 67 71 Z; M53 71 Q60 80 67 71 Z" dur="0.4s" repeatCount="indefinite"/></path></g>
    <path id="dog-tongue" d="M57 73 Q57 78 60 78 Q63 78 63 73 Z" fill="#FB99A0"/>
  </g>
  <g id="food-bowl"><path d="M46 106 Q60 100 74 106 Z" fill="#92400E"/><path d="M43 106 L77 106 L73 114 L47 114 Z" fill="#EF4444"/></g>
  <g id="dog-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  bathing: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="126" rx="27" ry="4.5" fill="#D0D5DD" opacity="0.5"/>
  <g id="dog-tail"><path d="M77 117 Q98 115 100 92 Q101 77 87 80 Q78 83 83 98 Q85 87 92 90 Q99 94 94 105 Q90 115 77 117 Z" fill="#EAD9BE"/><path d="M95 89 Q99 97 93 105" stroke="#E5BC8E" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g id="dog-body">
    <path d="M51 80 Q51 91 55 96 L65 96 Q69 91 69 80 Z" fill="#EAD9BE"/>
    <path d="M53 85 Q45 87 43 99 Q37 106 38 114 Q40 122 52 122 Q60 123 68 122 Q80 122 82 114 Q83 106 77 99 Q75 87 67 85 Q60 83 53 85 Z" fill="#EAD9BE"/>
    <path d="M60 89 Q72 92 72 106 Q72 116 60 117 Q48 116 48 106 Q48 92 60 89 Z" fill="#FCF9F3"/>
    <path d="M44 99 Q41 109 45 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M76 99 Q79 109 75 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M52 106 Q49 114 51 121 L60 121 Q60 113 60 106 Z" fill="#FCF9F3"/>
    <path d="M60 106 Q60 113 60 121 L69 121 Q71 114 68 106 Z" fill="#FCF9F3"/>
    <path d="M60 107 L60 120" stroke="#E3D2B6" stroke-width="1.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M54 116 L54 121 M57 116 L57 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M63 116 L63 121 M66 116 L66 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <g id="dog-head"><animateTransform attributeName="transform" type="translate" values="0,0; 0,0.6; 0,0" dur="2s" repeatCount="indefinite"/>
    <path id="ear-left" d="M31 47 Q27 20 38 18 Q50 26 51 47 Z" fill="#E5BC8E"/>
    <path d="M36 44 Q34 26 40 25 Q47 31 47 44 Z" fill="#F2E3CE"/>
    <path id="ear-right" d="M89 47 Q93 20 82 18 Q70 26 69 47 Z" fill="#E5BC8E"/>
    <path d="M84 44 Q86 26 80 25 Q73 31 73 44 Z" fill="#F2E3CE"/>
    <path d="M29 60 Q29 42 47 40 Q60 38.5 73 40 Q91 42 91 60 Q91 78 73 85 Q60 88 47 85 Q29 78 29 60 Z" fill="#E5BC8E"/>
    <path d="M32 62 Q34 51 45 50 Q52 49 56 48 Q58 40.5 60 40.5 Q62 40.5 64 48 Q68 49 75 50 Q86 51 88 62 Q89 76 78 83 Q60 88 42 83 Q31 76 32 62 Z" fill="#FCF9F3"/>
    <ellipse cx="46" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <ellipse cx="74" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <circle cx="35" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="85" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <path d="M41 63 Q46 68 51 63" stroke="#4A3F38" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M69 63 Q74 68 79 63" stroke="#4A3F38" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="66" rx="4.6" ry="3.4" fill="#4A3F38"/>
    <path d="M60 69 L60 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M60 71 Q55 74 51 71 M60 71 Q65 74 69 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  </g>
  <rect x="26" y="100" width="68" height="20" rx="4" fill="#B45309"/>
  <rect x="30" y="104" width="60" height="3" fill="#78350F"/>
  <g id="bath-bubbles">
    <circle cx="34" cy="94" r="5" fill="#93C5FD" opacity="0.7"><animate attributeName="cy" values="94;80;66" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.3;0" dur="2s" repeatCount="indefinite"/></circle>
    <circle cx="46" cy="88" r="4" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="88;72;58" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.2;0" dur="2.5s" repeatCount="indefinite"/></circle>
    <circle cx="78" cy="90" r="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="90;76;62" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0.2;0" dur="1.8s" repeatCount="indefinite"/></circle>
    <circle cx="88" cy="96" r="6" fill="#93C5FD" opacity="0.5"><animate attributeName="cy" values="96;82;68" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0.2;0" dur="2.2s" repeatCount="indefinite"/></circle>
  </g>
  <g id="dog-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  sick: `<!-- DOG SICK --><svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="126" rx="27" ry="4.5" fill="#D0D5DD" opacity="0.5"/>
  <g id="dog-tail"><path d="M77 117 Q98 115 100 92 Q101 77 87 80 Q78 83 83 98 Q85 87 92 90 Q99 94 94 105 Q90 115 77 117 Z" fill="#EAD9BE"/><path d="M95 89 Q99 97 93 105" stroke="#E5BC8E" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g id="dog-body">
    <path d="M51 80 Q51 91 55 96 L65 96 Q69 91 69 80 Z" fill="#EAD9BE"/>
    <path d="M53 85 Q45 87 43 99 Q37 106 38 114 Q40 122 52 122 Q60 123 68 122 Q80 122 82 114 Q83 106 77 99 Q75 87 67 85 Q60 83 53 85 Z" fill="#EAD9BE"/>
    <path d="M60 89 Q72 92 72 106 Q72 116 60 117 Q48 116 48 106 Q48 92 60 89 Z" fill="#FCF9F3"/>
    <path d="M44 99 Q41 109 45 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M76 99 Q79 109 75 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M52 106 Q49 114 51 121 L60 121 Q60 113 60 106 Z" fill="#FCF9F3"/>
    <path d="M60 106 Q60 113 60 121 L69 121 Q71 114 68 106 Z" fill="#FCF9F3"/>
    <path d="M60 107 L60 120" stroke="#E3D2B6" stroke-width="1.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M54 116 L54 121 M57 116 L57 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M63 116 L63 121 M66 116 L66 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <g id="dog-head">
    <path id="ear-left" d="M31 47 Q27 20 38 18 Q50 26 51 47 Z" fill="#E5BC8E"/>
    <path d="M36 44 Q34 26 40 25 Q47 31 47 44 Z" fill="#F2E3CE"/>
    <path id="ear-right" d="M89 47 Q93 20 82 18 Q70 26 69 47 Z" fill="#E5BC8E"/>
    <path d="M84 44 Q86 26 80 25 Q73 31 73 44 Z" fill="#F2E3CE"/>
    <path d="M29 60 Q29 42 47 40 Q60 38.5 73 40 Q91 42 91 60 Q91 78 73 85 Q60 88 47 85 Q29 78 29 60 Z" fill="#E5BC8E"/>
    <path d="M32 62 Q34 51 45 50 Q52 49 56 48 Q58 40.5 60 40.5 Q62 40.5 64 48 Q68 49 75 50 Q86 51 88 62 Q89 76 78 83 Q60 88 42 83 Q31 76 32 62 Z" fill="#FCF9F3"/>
    <ellipse cx="46" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <ellipse cx="74" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <circle cx="35" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="85" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <path d="M42 60 L50 67 M50 60 L42 67" stroke="#4A3F38" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M70 60 L78 67 M78 60 L70 67" stroke="#4A3F38" stroke-width="2.4" stroke-linecap="round"/>
    <ellipse cx="60" cy="66" rx="4.6" ry="3.4" fill="#4A3F38"/>
    <path d="M53 73 Q60 69 67 73" stroke="#4A3F38" stroke-width="2" stroke-linecap="round" fill="none"/>
    <rect x="48" y="30" width="24" height="9" rx="2" fill="#93C5FD" opacity="0.9"/>
    <rect x="51" y="32" width="18" height="4" rx="1" fill="#60A5FA" opacity="0.4"/>
  </g>
  <g id="dog-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  sleeping: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="126" rx="27" ry="4.5" fill="#D0D5DD" opacity="0.5"/>
  <g id="dog-tail"><path d="M77 117 Q98 115 100 92 Q101 77 87 80 Q78 83 83 98 Q85 87 92 90 Q99 94 94 105 Q90 115 77 117 Z" fill="#EAD9BE"/><path d="M95 89 Q99 97 93 105" stroke="#E5BC8E" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g id="dog-body">
    <path d="M51 80 Q51 91 55 96 L65 96 Q69 91 69 80 Z" fill="#EAD9BE"/>
    <path d="M53 85 Q45 87 43 99 Q37 106 38 114 Q40 122 52 122 Q60 123 68 122 Q80 122 82 114 Q83 106 77 99 Q75 87 67 85 Q60 83 53 85 Z" fill="#EAD9BE"/>
    <path d="M60 89 Q72 92 72 106 Q72 116 60 117 Q48 116 48 106 Q48 92 60 89 Z" fill="#FCF9F3"/>
    <path d="M44 99 Q41 109 45 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M76 99 Q79 109 75 118" stroke="#DBAF7C" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M52 106 Q49 114 51 121 L60 121 Q60 113 60 106 Z" fill="#FCF9F3"/>
    <path d="M60 106 Q60 113 60 121 L69 121 Q71 114 68 106 Z" fill="#FCF9F3"/>
    <path d="M60 107 L60 120" stroke="#E3D2B6" stroke-width="1.2" stroke-linecap="round" opacity="0.55"/>
    <path d="M54 116 L54 121 M57 116 L57 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
    <path d="M63 116 L63 121 M66 116 L66 121" stroke="#E3D2B6" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <g id="dog-head">
    <path id="ear-left" d="M31 47 Q27 20 38 18 Q50 26 51 47 Z" fill="#E5BC8E"/>
    <path d="M36 44 Q34 26 40 25 Q47 31 47 44 Z" fill="#F2E3CE"/>
    <path id="ear-right" d="M89 47 Q93 20 82 18 Q70 26 69 47 Z" fill="#E5BC8E"/>
    <path d="M84 44 Q86 26 80 25 Q73 31 73 44 Z" fill="#F2E3CE"/>
    <path d="M29 60 Q29 42 47 40 Q60 38.5 73 40 Q91 42 91 60 Q91 78 73 85 Q60 88 47 85 Q29 78 29 60 Z" fill="#E5BC8E"/>
    <path d="M32 62 Q34 51 45 50 Q52 49 56 48 Q58 40.5 60 40.5 Q62 40.5 64 48 Q68 49 75 50 Q86 51 88 62 Q89 76 78 83 Q60 88 42 83 Q31 76 32 62 Z" fill="#FCF9F3"/>
    <ellipse cx="46" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <ellipse cx="74" cy="55" rx="3" ry="1.8" fill="#DBAF7C"/>
    <circle cx="35" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <circle cx="85" cy="69" r="5" fill="#F3B0A8" opacity="0.5"/>
    <path d="M41 63 Q46 68 51 63" stroke="#4A3F38" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M69 63 Q74 68 79 63" stroke="#4A3F38" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="60" cy="66" rx="4.6" ry="3.4" fill="#4A3F38"/>
    <path d="M60 69 L60 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M60 71 Q55 74 51 71 M60 71 Q65 74 69 71" stroke="#4A3F38" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  </g>
  <g transform="translate(82, 60)"><ellipse cx="6" cy="5" rx="6" ry="5" fill="#DEEFFF" stroke="#93C5FD" stroke-width="1.2" opacity="0.75"><animate attributeName="rx" values="4;8;4" dur="2.5s" repeatCount="indefinite"/><animate attributeName="ry" values="3;7;3" dur="2.5s" repeatCount="indefinite"/></ellipse><ellipse cx="8" cy="4" rx="1.5" ry="2" fill="white" opacity="0.6"/></g>
  <g id="dog-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="1"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`
};
SVG.shiba = DOG_SVG.idle;
  const RABBIT_SVG = {
  idle: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="rabbit-tail"><circle cx="85" cy="95" r="8" fill="#F9FAFB"/></g>
  <g id="rabbit-body">
    <rect x="35" y="65" width="50" height="45" rx="14" fill="#F9FAFB"/>
    <rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/>
    <rect x="42" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/>
    <rect x="68" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/>
  </g>
  <g id="rabbit-head">
    <g id="rabbit-ear-l"><rect x="38" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="42" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <g id="rabbit-ear-r"><rect x="70" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="74" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <rect x="25" y="40" width="70" height="40" rx="16" fill="#F9FAFB"/>
    <circle cx="33" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/>
    <g id="rabbit-eyes"><rect id="eye-left" x="42" y="54" width="8" height="10" rx="4" fill="#1D2939"/><rect id="eye-right" x="70" y="54" width="8" height="10" rx="4" fill="#1D2939"/><circle id="eye-light-l" cx="44" cy="56" r="1.5" fill="white"/><circle id="eye-light-r" cx="72" cy="56" r="1.5" fill="white"/></g>
    <path d="M56 66 Q60 69 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/>
    <line x1="20" y1="62" x2="12" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="20" y1="66" x2="12" y2="67" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="62" x2="108" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="66" x2="108" y2="67" stroke="#D1D5DB" stroke-width="1.5"/>
  </g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  eating: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="rabbit-tail"><circle cx="85" cy="95" r="8" fill="#F9FAFB"/></g>
  <g id="rabbit-body">
    <rect x="35" y="65" width="50" height="45" rx="14" fill="#F9FAFB"/>
    <rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/>
    <rect x="42" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/>
    <rect x="68" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/>
  </g>
  <g id="rabbit-head">
    <g id="rabbit-ear-l"><rect x="38" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="42" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <g id="rabbit-ear-r"><rect x="70" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="74" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <rect x="25" y="40" width="70" height="40" rx="16" fill="#F9FAFB"/>
    <circle cx="33" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/>
    <g id="rabbit-eyes"><path d="M 42 58 Q 46 62 50 58" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M 70 58 Q 74 62 78 58" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/></g>
    <g id="chewing-mouth"><path d="M56 66 Q60 68 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"><animate attributeName="d" values="M56 66 Q60 68 64 66; M56 66 C56 69, 64 69, 64 66; M56 66 Q60 68 64 66" dur="0.6s" repeatCount="indefinite"/></path></g>
    <line x1="20" y1="62" x2="12" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="20" y1="66" x2="12" y2="67" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="62" x2="108" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="66" x2="108" y2="67" stroke="#D1D5DB" stroke-width="1.5"/>
  </g>
  <!-- Food bowl -->
  <g id="pet-food-bowl"><path d="M42 106 C42 106, 44 118, 60 118 C76 118, 78 106, 78 106 Z" fill="#FECDD3"/><ellipse cx="60" cy="106" rx="16" ry="3" fill="#FFD166"/></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`,
  bathing: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="rabbit-tail"><circle cx="85" cy="95" r="8" fill="#F9FAFB"/></g>
  <g id="rabbit-body"><rect x="35" y="65" width="50" height="45" rx="14" fill="#F9FAFB"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/></g>
  <g id="rabbit-head">
    <g id="rabbit-ear-l"><rect x="38" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="42" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <g id="rabbit-ear-r"><rect x="70" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="74" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <rect x="25" y="40" width="70" height="40" rx="16" fill="#F9FAFB"/>
    <circle cx="33" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/>
    <g id="rabbit-eyes"><rect x="42" y="54" width="8" height="10" rx="4" fill="#1D2939"/><rect x="70" y="54" width="8" height="10" rx="4" fill="#1D2939"/><circle cx="44" cy="56" r="1.5" fill="white"/><circle cx="72" cy="56" r="1.5" fill="white"/></g>
    <path d="M56 66 Q60 69 64 66" stroke="#1D2939" stroke-width="2" stroke-linecap="round" fill="none"/><line x1="20" y1="62" x2="12" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="20" y1="66" x2="12" y2="67" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="62" x2="108" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="66" x2="108" y2="67" stroke="#D1D5DB" stroke-width="1.5"/><rect x="46" y="32" width="28" height="8" rx="2" fill="#E2E8F0"/><rect x="50" y="35" width="20" height="5" rx="1" fill="#FFFFFF"/></g>
  <g id="bath-basin"><path d="M 24 102 C 24 102, 27 118, 60 118 C 93 118, 96 102, 96 102 Z" fill="#93C5FD" opacity="0.85"/><circle cx="28" cy="100" r="2" fill="white" opacity="0.8"><animate attributeName="cy" values="100;92;84" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.3;0" dur="2s" repeatCount="indefinite"/></circle><circle cx="92" cy="103" r="2" fill="white" opacity="0.8"><animate attributeName="cy" values="103;95;87" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.3;0" dur="2.5s" repeatCount="indefinite"/></circle></g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect><animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite"/></rect></g>
</svg>`,
  sick: `<svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="115" rx="30" ry="6" fill="#D0D5DD" opacity="0.6"/>
  <g id="rabbit-tail"><circle cx="85" cy="95" r="8" fill="#F9FAFB"/></g>
  <g id="rabbit-body"><rect x="35" y="65" width="50" height="45" rx="14" fill="#F9FAFB"/><rect x="43" y="75" width="34" height="30" rx="8" fill="#F2F4F7"/><rect x="42" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/><rect x="68" y="105" width="10" height="10" rx="4" fill="#E4E7EC"/></g>
  <g id="rabbit-head">
    <g id="rabbit-ear-l"><rect x="38" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="42" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <g id="rabbit-ear-r"><rect x="70" y="10" width="12" height="36" rx="6" fill="#F9FAFB"/><rect x="74" y="16" width="4" height="24" rx="2" fill="#FECDD3"/></g>
    <rect x="25" y="40" width="70" height="40" rx="16" fill="#F9FAFB"/>
    <circle cx="33" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/><circle cx="87" cy="68" r="4" fill="#FFCDD2" opacity="0.8"/>
    <g id="rabbit-eyes" stroke="#1D2939" stroke-width="2.5" stroke-linecap="round"><line x1="42" y1="54" x2="48" y2="60"/><line x1="48" y1="54" x2="42" y2="60"/><line x1="70" y1="54" x2="76" y2="60"/><line x1="76" y1="54" x2="70" y2="60"/></g>
    <line x1="55" y1="67" x2="65" y2="67" stroke="#1D2939" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="62" x2="12" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="20" y1="66" x2="12" y2="67" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="62" x2="108" y2="60" stroke="#D1D5DB" stroke-width="1.5"/><line x1="100" y1="66" x2="108" y2="67" stroke="#D1D5DB" stroke-width="1.5"/>
    <rect x="44" y="28" width="32" height="12" rx="4" fill="#93C5FD"/><rect x="57" y="24" width="6" height="4" rx="1" fill="#60A5FA"/>
  </g>
  <g id="pet-glasses" opacity="0"><rect x="38" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><rect x="66" y="52" width="16" height="14" rx="2" stroke="#FF9800" stroke-width="2" fill="none"/><line x1="54" y1="59" x2="66" y2="59" stroke="#FF9800" stroke-width="2"/></g>
  <g id="zzz-group" opacity="0"><text x="88" y="22" font-size="10" fill="#999" font-weight="bold">z</text><text x="96" y="12" font-size="14" fill="#999" font-weight="bold" opacity="0.6">z</text><text x="104" y="2" font-size="18" fill="#999" font-weight="bold" opacity="0.3">z</text></g>
  <defs><linearGradient id="screen-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#00D2FF" stop-opacity="1"/><stop offset="100%" stop-color="#00D2FF" stop-opacity="0"/></linearGradient></defs>
  <g id="pet-cyber-keyboard" opacity="0"><rect x="30" y="102" width="60" height="8" rx="2" fill="#344054" stroke="#475467" stroke-width="1.5"/><rect id="key-light-1" x="36" y="104" width="8" height="4" rx="1" fill="#FFD700" opacity="0"/><rect id="key-light-2" x="48" y="104" width="12" height="4" rx="1" fill="#00D2FF" opacity="0"/><rect id="key-light-3" x="66" y="104" width="10" height="4" rx="1" fill="#FF3366" opacity="0"/><rect id="key-light-4" x="80" y="104" width="6" height="4" rx="1" fill="#00FF66" opacity="0"/><path d="M 35 102 L 20 80 L 100 80 L 85 102 Z" fill="url(#screen-glow)" opacity="0.15"/></g>
</svg>`};
SVG.rabbit = RABBIT_SVG.idle;

// Rabbit state helper
function setRabbitState(name) {
  SVG.rabbit = RABBIT_SVG[name];
  svgEl.innerHTML = SVG.rabbit;
}

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

  // 🐱 CAT — sarcastic, aloof, judgmental genius who secretly loves you
  const Q = {
    idle: ["Your code compiles? I'm so proud! 🥹","Just dynamic-purring at my job.","404: Treat not found.","I've been watching you scroll... judging silently.","Human, your code looks like spaghetti but I still love you.","I could fix that bug. I won't. But I could."],
    hungry: ["My stomach is empty! 🥺","Feed me... or I'll delete your node_modules.","I'm so hungry I might knock something off your desk."],
    dirty: ["I'm feeling a bit dusty... 🫤","A bath? Ugh. But fine.","Do not tell the other cats I said this, but... clean me."],
    happy: ["Purrr~ 💖","That's the spot! ✨","I tolerate you. That's love, for a cat.","Fine. You may continue existing. 😼"],
    slack: ["Caught you! 😾 Is that more interesting than your PM?","Focus! Or I will sit on your keyboard.","Hey! Are you slacking off? Pathetic.","asdkfj;alksdf — oops, that was me on your keyboard. Focus."],
    wake: ["Zzz... waking up... coffee? ☕","*yawn* Did I miss any bugs?","Stretch! 🐱 Now where's my snack?"],
    feed: ["*delicate nibble* Acceptable. 🍖","Finally. I was about to file a complaint.","Mine. All mine. 😻"],
    bath: ["*shakes off* The indignity... 🛁","I'll allow it. This once.","Sparkling. Obviously. ✨"],
    pet: ["Purrr~ ❤️ Don't stop.","Mrrp. You may pet me. 😽","*headbutt* More."],
    sick: ["I feel terrible... 😵 Fetch the vet. And treats.","Ugh. Even my whiskers hurt.","404: health not found. 🤒"]
  };

  // 🐕 DOG — loyal, hyper-enthusiastic, unconditionally adoring
  const Q_DOG = {
    idle: ["You're my favorite human! 🐕","Woof! Pet me please!","I love belly rubs! 🥹","Let's go for a walk! 🦮","Best. Day. EVER!","*sniff sniff* Whatcha doing?"],
    hungry: ["I'm starving! Feed me! 🥺","My bowl is empty and so is my soul!","I could eat a horse! 🐴","*whines hungrily* pleeease?"],
    dirty: ["I rolled in something... 🫤","I smell AMAZING. You disagree?","Bath time?! I both love and fear it!"],
    happy: ["Woof woof! 🐕💖","That's the spot!!!","I LOVE YOU HOOMAN! ❤️","*tail wagging so hard I might take off* 🚁"],
    slack: ["Stop slacking! WOOF! 😤","Get back to work or I'll chew your shoes!","Focus, best friend! I believe in you! 🐕"],
    wake: ["*yawns* Good morning bestie!","Did I miss walk time? 🐾","Stretch! Now throw the ball!"],
    feed: ["*GULP* Best meal ever! 🍖","GONE. It's gone. More?","Woof woof! Thank youuu! 🐾"],
    bath: ["*splash* WHEE! 🛁","I'm a clean good boy now!","Shake it off! 💦 Sorry about your walls."],
    pet: ["*leans entire body into you* ❤️","Pet me forever! 🐕","Woof! You're the best hooman!"],
    sick: ["I don't feel so good... 🤒 *sad tail*","Even walks sound bad right now...","*whimper* I need cuddles and medicine."]
  };

  // 🐰 RABBIT — shy, gentle, soft-spoken, a little anxious, very sweet
  const Q_RABBIT = {
    idle: ["*twitches nose quietly* 🐰","Um... hi. I like being near you.","*nibbles a tiny leaf* mmm.","I found a cozy spot... shh.","Is it okay if I stay here? 🥺","*wiggles ears softly*"],
    hungry: ["I'm a little hungry... if that's okay. 🥕","A carrot would be lovely...","*tummy rumbles softly* oops."],
    dirty: ["My fur got a bit messy... 🫤","I'd like to be clean and soft again.","*grooms one paw shyly*"],
    happy: ["*happy little hop* 💕","This makes me so warm inside...","Thank you... you're very kind. 🐰","*binky!* (that's a happy jump)"],
    slack: ["Um... should we be working? 🥺","I don't want to nag, but... focus?","*nudges you gently* back to work?"],
    wake: ["*soft yawn* mm... morning...","Did I nap too long? 🌙","*stretches tiny paws* hello again."],
    feed: ["*tiny nibbles* so yummy... 🥕","Thank you for the snack... 💕","*munches happily and quietly*"],
    bath: ["*shivers* clean and fluffy now 🛁","So soft... thank you.","*shakes gently* all fresh! ✨"],
    pet: ["*melts into your hand* 💕","Softly... yes, like that. 🐰","*nuzzles you shyly* ❤️"],
    sick: ["I feel poorly... 🤒 *tiny sniffle*","My ears feel droopy...","*curls up quietly* please stay near me."]
  };

// Pet-specific quote picker
function pickQ(type) {
  const source = S.currentPet === 'shiba' ? Q_DOG : S.currentPet === 'rabbit' ? Q_RABBIT : Q;
  const arr = source[type] || Q[type];
  return arr[Math.floor(Math.random() * arr.length)];
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
      if (S.health > 20) { if (S.currentPet === 'shiba' && SVG.shiba === DOG_SVG.sick) { setState('idle'); setDogState('idle'); } else if (S.currentPet === 'cat' && SVG.cat === CAT_SVG.sick) { setState('idle'); setCatState('idle'); } else if (S.currentPet === 'rabbit' && SVG.rabbit === RABBIT_SVG.sick) { setState('idle'); setRabbitState('idle'); } }
      if (S.focusing) setState('working');
      else if (S.health <= 20) { setState('sick'); if (S.currentPet === 'shiba') { setDogState('sick'); } else if (S.currentPet === 'cat') { setCatState('sick'); } else if (S.currentPet === 'rabbit') { setRabbitState('sick'); } } else if (S.fullness < 20) setState('hungry');
      else if (['working','hungry','surprised'].includes(S.pet)) setState('idle');
      if (bubble.className === 'cp-bubble-hidden') {
        if (S.focusing) return;
        if (S.health <= 0) showBubble(pickQ('sick'), 5000);
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
    if (S.pet !== 'idle') { setState('idle'); if (S.currentPet === 'shiba') setDogState('idle'); else if (S.currentPet === 'cat') setCatState('idle'); else if (S.currentPet === 'rabbit') setRabbitState('idle'); }
    cc++;
    if (cc === 1) {
      cTimer = setTimeout(() => {
        cc = 0; const r = pick(REACTIONS);
        switch (r) {
          case 'meow': showBubble(S.currentPet === 'shiba' ? '*woof* 🐕' : S.currentPet === 'rabbit' ? '*squeak* 🐰' : '*meow* 🐱', 2500); break;
          case 'purr': showBubble(S.currentPet === 'shiba' ? '*pants happily* 🐕' : S.currentPet === 'rabbit' ? '*soft nose wiggle* ✨' : 'Purrr~ ✨', 2500); break;
          case 'tilt': showBubble('*tilts head* 🤔', 2500); doAction('curious', 1200); break;
          case 'surprised': showBubble(S.currentPet === 'shiba' ? 'Bark?! 👀' : S.currentPet === 'rabbit' ? 'Eep?! 👀' : 'Mrow?! 👀', 2500); doAction('surprised', 1200); break;
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
    if (S.pet !== 'idle') { setState('idle'); if (S.currentPet === 'shiba') setDogState('idle'); else if (S.currentPet === 'cat') setCatState('idle'); else if (S.currentPet === 'rabbit') setRabbitState('idle'); }
    chrome.runtime.sendMessage({ action: 'interact', type }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) return;
      switch (type) {
        case 'feed': setState('idle'); if (S.currentPet === 'shiba') { setDogState('eating'); setTimeout(() => { if (S.currentPet === 'shiba') setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('eating'); setTimeout(() => { if (S.currentPet === 'cat') setCatState('idle'); }, 10000); } else if (S.currentPet === 'rabbit') { setRabbitState('eating'); setTimeout(() => { if (S.currentPet === 'rabbit') setRabbitState('idle'); }, 10000); } showBubble(pickQ('feed'), 3500); spawn('food', 6); doAction('surprised', 500); break;
        case 'bath': setState('idle'); if (S.currentPet === 'shiba') { setDogState('bathing'); setTimeout(() => { if (S.currentPet === 'shiba') setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('bathing'); setTimeout(() => { if (S.currentPet === 'cat') setCatState('idle'); }, 10000); } else if (S.currentPet === 'rabbit') { setRabbitState('bathing'); setTimeout(() => { if (S.currentPet === 'rabbit') setRabbitState('idle'); }, 10000); } showBubble(pickQ('bath'), 3500); spawn('sparkle', 8); break;
        case 'pet':  showBubble(pickQ('pet'), 3000); spawn('heart', 8); doAction('surprised', 400); break;
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
            case 'feed': setState('idle'); if (S.currentPet === 'shiba') { setDogState('eating'); setTimeout(() => { if (S.currentPet === 'shiba') setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('eating'); setTimeout(() => { if (S.currentPet === 'cat') setCatState('idle'); }, 10000); } else if (S.currentPet === 'rabbit') { setRabbitState('eating'); setTimeout(() => { if (S.currentPet === 'rabbit') setRabbitState('idle'); }, 10000); } showBubble(pickQ('feed'), 3500); spawn('food', 6); doAction('surprised', 500); break;
            case 'bath': setState('idle'); if (S.currentPet === 'shiba') { setDogState('bathing'); setTimeout(() => { if (S.currentPet === 'shiba') setDogState('idle'); }, 10000); } else if (S.currentPet === 'cat') { setCatState('bathing'); setTimeout(() => { if (S.currentPet === 'cat') setCatState('idle'); }, 10000); } else if (S.currentPet === 'rabbit') { setRabbitState('bathing'); setTimeout(() => { if (S.currentPet === 'rabbit') setRabbitState('idle'); }, 10000); } showBubble(pickQ('bath'), 3500); spawn('sparkle', 8); break;
            case 'pet': showBubble(pickQ('pet'), 3000); spawn('heart', 8); doAction('surprised', 400); break;
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
