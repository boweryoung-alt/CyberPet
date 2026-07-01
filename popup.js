// popup.js — CyberPet control panel logic

(function () {
  'use strict';

  const SECOND = 1000;
  const FOCUS_DURATION = 25; // minutes

  // DOM refs
  const els = {
    fullness   : { val: document.getElementById('val-fullness'),   bar: document.getElementById('bar-fullness') },
    cleanliness: { val: document.getElementById('val-clean'),      bar: document.getElementById('bar-clean') },
    mood       : { val: document.getElementById('val-mood'),       bar: document.getElementById('bar-mood') },
    health     : { val: document.getElementById('val-health'),     bar: document.getElementById('bar-health') },
    moodFaces  : document.getElementById('moodFaces'),
    statusDot  : document.getElementById('statusDot'),
    timerDisplay: document.getElementById('timerDisplay'),
    btnFocus   : document.getElementById('btn-focus'),
    btnFeed    : document.getElementById('btn-feed'),
    btnBath    : document.getElementById('btn-bath'),
    btnPet     : document.getElementById('btn-pet'),
    cdFeed     : document.getElementById('cd-feed'),
    cdBath     : document.getElementById('cd-bath'),
    cdPet      : document.getElementById('cd-pet'),
  };

  // ─── Helpers ───────────────────────────────────────────────────────────────
  function getEmojiForMood(m) {
    if (m >= 80) return '😸';
    if (m >= 60) return '😊';
    if (m >= 40) return '😐';
    if (m >= 20) return '😢';
    return '😿';
  }

  function barClass(v) {
    if (v >= 50) return 'good';
    if (v >= 25) return 'warn';
    return 'danger';
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // ─── UI Update ─────────────────────────────────────────────────────────────
  function updateUI() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (data) => {
      if (!data) return;

      const f = data.fullness    ?? 100;
      const c = data.cleanliness ?? 100;
      const m = data.mood        ?? 100;
      const h = data.health      ?? 100;
      const focusing = data.isFocusing ?? false;

      // Bars
      els.fullness.val.textContent    = f;
      els.fullness.bar.style.width    = f + '%';
      els.fullness.bar.className      = 'progress-fill ' + barClass(f);

      els.cleanliness.val.textContent = c;
      els.cleanliness.bar.style.width = c + '%';
      els.cleanliness.bar.className   = 'progress-fill ' + barClass(c);

      els.mood.val.textContent        = m;
      els.mood.bar.style.width        = m + '%';
      els.mood.bar.className          = 'progress-fill ' + barClass(m);

      els.health.val.textContent      = h;
      els.health.bar.style.width      = h + '%';
      els.health.bar.className        = 'progress-fill ' + barClass(h);

      // Mood face
      els.moodFaces.textContent = getEmojiForMood(m);

      // Status dot
      els.statusDot.className = focusing ? 'status-dot focus' : 'status-dot online';

      // Focus button
      if (focusing) {
        els.btnFocus.textContent = 'Stop Focus';
        els.btnFocus.className   = 'btn-focus-stop';
      } else {
        els.btnFocus.textContent = 'Start Focus (25 min)';
        els.btnFocus.className   = 'btn-focus-start';
      }

      // Cooldown indicators
      const now = Date.now();
      const cd  = data.cooldownUntil || 0;
      const remaining = Math.max(0, Math.ceil((cd - now) / SECOND));
      const btnDisabled = remaining > 0;

      [els.btnFeed, els.btnBath, els.btnPet].forEach(btn => {
        btn.disabled = btnDisabled;
      });

      if (btnDisabled) {
        const cdText = `${remaining}s`;
        els.cdFeed.textContent = cd > now ? cdText : '';
        els.cdBath.textContent = cd > now ? cdText : '';
        els.cdPet.textContent  = cd > now ? cdText : '';
      } else {
        els.cdFeed.textContent = '';
        els.cdBath.textContent = '';
        els.cdPet.textContent  = '';
      }
    });
  }

  // ─── Focus Timer Countdown ─────────────────────────────────────────────────
  let countdownInterval = null;

  function updateTimerDisplay() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (data) => {
      if (!data) return;
      const focusing = data.isFocusing ?? false;
      const endTime = data.focusEndTime;

      if (!focusing || !endTime) {
        els.timerDisplay.textContent = formatTime(FOCUS_DURATION * 60);
        els.timerDisplay.className = 'timer';
        if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
        return;
      }

      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / SECOND));
      els.timerDisplay.textContent = formatTime(remaining);
      els.timerDisplay.className   = 'timer running';

      if (remaining <= 0) {
        // Timer expired — refresh state
        if (countdownInterval) clearInterval(countdownInterval);
        countdownInterval = null;
        updateUI();
        return;
      }

      if (!countdownInterval) {
        countdownInterval = setInterval(updateTimerDisplay, SECOND);
      }
    });
  }

  // ─── Interactions (with cooldown and reaction) ─────────────────────────────
  function interact(type) {
    chrome.runtime.sendMessage({ action: 'interact', type }, (response) => {
      if (response && response.success) {
        updateUI();

        // Tell content script to show reaction
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs.length) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'petReaction',
              type
            }).catch(() => {});
          }
        });
      }
    });
  }

  // ─── Focus toggle ──────────────────────────────────────────────────────────
  function toggleFocus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (data) => {
      if (!data) return;
      const focusing = data.isFocusing ?? false;

      if (focusing) {
        chrome.runtime.sendMessage({ action: 'stopTimer' }, () => {
          // Also notify content script
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'petStateChange',
                state: 'idle'
              }).catch(() => {});
            }
          });
          updateUI();
        });
      } else {
        chrome.runtime.sendMessage({ action: 'startTimer', duration: FOCUS_DURATION }, () => {
          // Notify content script
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'petStateChange',
                state: 'working'
              }).catch(() => {});
            }
          });
          updateUI();
        });
      }
    });
  }

  // ─── Pet Selection ─────────────────────────────────────────────────────────
  const petSelector = document.getElementById('petSelector');

  function selectPet(petName) {
    // Update button UI
    petSelector.querySelectorAll('button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.pet === petName);
    });
    // Send to content script and background
    chrome.storage.local.set({ selectedPet: petName });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'setPet', pet: petName }).catch(() => {});
      }
    });
  }

  // Load saved pet preference
  chrome.storage.local.get(['selectedPet'], (data) => {
    if (data.selectedPet) selectPet(data.selectedPet);
  });

  petSelector.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && btn.dataset.pet) {
      selectPet(btn.dataset.pet);
    }
  });

  // ─── Event Bindings ────────────────────────────────────────────────────────
  els.btnFeed.addEventListener('click', () => interact('feed'));
  els.btnBath.addEventListener('click', () => interact('bath'));
  els.btnPet.addEventListener('click',  () => interact('pet'));

  els.btnFocus.addEventListener('click', toggleFocus);

  // ─── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // Signal background that popup opened (triggers focus check)
    chrome.runtime.sendMessage({ action: 'popupOpened' });

    updateUI();
    updateTimerDisplay();
  });

  // ─── Auto-refresh every 3s while popup is open ────────────────────────────
  setInterval(() => {
    updateUI();
    updateTimerDisplay();
  }, 3000);

})();
