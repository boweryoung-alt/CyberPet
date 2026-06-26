// background.js — CyberPet core state machine, decay timer, and focus mode
// Runs as a Manifest V3 service worker.

const SLACK_SITES = [
  'youtube.com', 'twitter.com', 'x.com', 'reddit.com',
  'instagram.com', 'facebook.com', 'tiktok.com', 'netflix.com',
  'twitch.tv', 'bilibili.com', 'zhihu.com', 'douyin.com'
];

// ─── Initialization ───────────────────────────────────────────────────────────

// Create alarms ONLY if they don't exist. Calling chrome.alarms.create()
// on an existing alarm resets its timer, which would prevent decay from
// ever firing when the service worker is woken for other reasons (popup, etc.).
chrome.alarms.getAll((alarms) => {
  const names = alarms.map(a => a.name);
  if (!names.includes('petDecay'))    chrome.alarms.create('petDecay',    { periodInMinutes: 5 });
  if (!names.includes('focusCheck'))  chrome.alarms.create('focusCheck',  { periodInMinutes: 1 });
});

chrome.runtime.onInstalled.addListener(() => {
  // Only set default values for keys that don't already exist
  // (preserves user's selectedPet across extension updates)
  chrome.storage.local.get(null, (data) => {
    const defaults = {};
    if (data.fullness === undefined) defaults.fullness = 100;
    if (data.cleanliness === undefined) defaults.cleanliness = 100;
    if (data.mood === undefined) defaults.mood = 100;
    if (data.isFocusing === undefined) defaults.isFocusing = false;
    if (data.focusEndTime === undefined) defaults.focusEndTime = null;
    if (data.cooldownUntil === undefined) defaults.cooldownUntil = null;
    if (data.selectedPet === undefined) defaults.selectedPet = 'cat';
    if (Object.keys(defaults).length) chrome.storage.local.set(defaults);
  });
});

// ─── Decay Logic (every 15 min) ──────────────────────────────────────────────

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'petDecay') {
    decayPetStats();
  }
  if (alarm.name === 'focusCheck') {
    checkFocusSession();
  }
});

function decayPetStats() {
  chrome.storage.local.get(['fullness', 'cleanliness', 'mood'], (data) => {
    const f = Math.max(0, (data.fullness    ?? 100) - 2);
    const c = Math.max(0, (data.cleanliness ?? 100) - 1);
    let   m = (data.mood        ?? 100);

    // Mood accelerates when fullness or cleanliness dip below 50
    if (f < 50 || c < 50) {
      m = Math.max(0, m - 2);
    } else {
      m = Math.max(0, m - 1);
    }

    chrome.storage.local.set({
      fullness: f,
      cleanliness: c,
      mood: m
    });
  });
}

// ─── Focus Session ───────────────────────────────────────────────────────────

function checkFocusSession() {
  chrome.storage.local.get(['isFocusing', 'focusEndTime'], (data) => {
    if (!data.isFocusing) return;

    const now = Date.now();
    if (data.focusEndTime && now >= data.focusEndTime) {
      // Focus complete
      completeFocus();
      return;
    }

    // Slack-off detection: check current active tab
    if (data.isFocusing) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs || !tabs.length) return;
        const url = tabs[0].url || '';
        if (isSlackSite(url)) {
          // Notify content script to show warning bubble
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'slackWarning',
            site: new URL(url).hostname
          }).catch(() => {
            // Content script not ready — that's fine
          });
        }
      });
    }
  });
}

function isSlackSite(url) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    return SLACK_SITES.some(site => host.includes(site));
  } catch {
    return false;
  }
}

function completeFocus() {
  chrome.storage.local.set({ isFocusing: false, focusEndTime: null });

  // Mood bonus for finishing
  chrome.storage.local.get(['mood'], (d) => {
    const m = Math.min(100, (d.mood ?? 100) + 30);
    chrome.storage.local.set({ mood: m });
  });

  // System notification
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: '🎉 Focus Session Complete!',
    message: 'Great job! Your cyber pet is proud of you. Remember to drink some water.',
    priority: 2
  });
}

// ─── Message Handlers (from popup) ────────────────────────────────────────────

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {

    case 'startTimer': {
      const durationMs = (request.duration || 25) * 60 * 1000;
      chrome.storage.local.set({
        isFocusing: true,
        focusEndTime: Date.now() + durationMs
      });
      sendResponse({ success: true });
      break;
    }

    case 'stopTimer': {
      chrome.storage.local.set({ isFocusing: false, focusEndTime: null });
      sendResponse({ success: true });
      break;
    }

    case 'getStatus': {
      chrome.storage.local.get(
        ['fullness', 'cleanliness', 'mood', 'isFocusing', 'focusEndTime', 'cooldownUntil', 'selectedPet'],
        (data) => sendResponse(data)
      );
      return true; // keep channel open for async response
    }

    case 'interact': {
      chrome.storage.local.get(
        ['fullness', 'cleanliness', 'mood', 'cooldownUntil'],
        (data) => {
          const now = Date.now();
          if (data.cooldownUntil && now < data.cooldownUntil) {
            sendResponse({ success: false, reason: 'cooldown' });
            return;
          }

          const BASE_COOLDOWN = 2000; // 2 seconds
          let updates = { cooldownUntil: now + BASE_COOLDOWN };

          switch (request.type) {
            case 'feed':
              updates.fullness = Math.min(100, (data.fullness ?? 100) + 30);
              break;
            case 'bath':
              updates.cleanliness = Math.min(100, (data.cleanliness ?? 100) + 40);
              break;
            case 'pet':
              updates.mood = Math.min(100, (data.mood ?? 100) + 15);
              break;
          }

          chrome.storage.local.set(updates, () => {
            sendResponse({ success: true, updates });
          });
        }
      );
      return true;
    }

    case 'popupOpened': {
      checkFocusSession();
      sendResponse({});
      break;
    }

    case 'setPet': {
      if (request.pet) {
        chrome.storage.local.set({ selectedPet: request.pet });
      }
      sendResponse({ success: true });
      break;
    }
  }

  // return false (default) for synchronous handlers
  return false;
});

// ─── Periodic Cleanup ────────────────────────────────────────────────────────

// Keep service worker alive via alarm (MV3 may suspend after ~30s idle)
// The focusCheck alarm running every 30s helps keep it alive during focus.
// Additional keepalive: re-check on storage changes from content scripts
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.cooldownUntil) {
    // content script updated cooldown — no action needed, just keeps SW alive
  }
});
