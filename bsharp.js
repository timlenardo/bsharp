"use strict";
(() => {
  // src/ts/data.ts
  var CHORD_DEFINITIONS = [
    { name: "red", display: "Red", chord: "C", notes: ["C4", "E4", "G4"] },
    { name: "yellow", display: "Yellow", chord: "F/C", notes: ["C4", "F4", "A4"] },
    { name: "blue", display: "Blue", chord: "G/B", notes: ["B3", "D4", "G4"] },
    { name: "black", display: "Black", chord: "F/A", notes: ["A3", "C4", "F4"] },
    { name: "green", display: "Green", chord: "G/D", notes: ["D4", "G4", "B4"] },
    { name: "orange", display: "Orange", chord: "C/E", notes: ["E4", "G4", "C5"] },
    { name: "purple", display: "Purple", chord: "F", notes: ["F4", "A4", "C5"] },
    { name: "pink", display: "Pink", chord: "G", notes: ["G4", "B4", "D5"] },
    { name: "brown", display: "Brown", chord: "C/G", notes: ["G4", "C5", "E5"] },
    { name: "gray", display: "Gray", chord: "A", notes: ["A3", "C#4", "E4"] },
    { name: "tan", display: "Tan", chord: "D", notes: ["D4", "F#4", "A4"] },
    { name: "lightgreen", display: "Light Green", chord: "E", notes: ["E4", "G#4", "B4"] },
    { name: "lightpurple", display: "Light Purple", chord: "Bb", notes: ["Bb3", "D4", "F4"] },
    { name: "skyblue", display: "Sky Blue", chord: "Eb", notes: ["Eb4", "G4", "Bb4"] }
  ];
  var CHORDS_TONE = Object.fromEntries(
    CHORD_DEFINITIONS.map((c) => [c.name, c.notes])
  );
  var FIRST_BLACK_INDEX = 9;
  var INSTRUMENTS = [
    { id: "piano_1", display: "Piano", chordPath: "piano" },
    { id: "guitar", display: "Guitar", chordPath: "guitar" },
    { id: "guitar-strummed", display: "Guitar (Strummed)", chordPath: "guitar-strummed" }
  ];
  var AUDIO_FILE_LIST = [
    "piano/acf_black_long.mp3",
    "piano/acf_black_medium.mp3",
    "piano/acf_black_short.mp3",
    "piano/acse_gray_long.mp3",
    "piano/acse_gray_medium.mp3",
    "piano/acse_gray_short.mp3",
    "piano/asdf_lightpurple_long.mp3",
    "piano/asdf_lightpurple_medium.mp3",
    "piano/asdf_lightpurple_short.mp3",
    "piano/ceg_red_long.mp3",
    "piano/ceg_red_medium.mp3",
    "piano/ceg_red_short.mp3",
    "piano/cfa_yellow_long.mp3",
    "piano/cfa_yellow_medium.mp3",
    "piano/cfa_yellow_short.mp3",
    "piano/dfsa_tan_long.mp3",
    "piano/dfsa_tan_medium.mp3",
    "piano/dfsa_tan_short.mp3",
    "piano/dgh_green_long.mp3",
    "piano/dgh_green_medium.mp3",
    "piano/dgh_green_short.mp3",
    "piano/dsgas_skyblue_long.mp3",
    "piano/dsgas_skyblue_medium.mp3",
    "piano/dsgas_skyblue_short.mp3",
    "piano/egc_orange_long.mp3",
    "piano/egc_orange_medium.mp3",
    "piano/egc_orange_short.mp3",
    "piano/egsh_lightgreen_long.mp3",
    "piano/egsh_lightgreen_medium.mp3",
    "piano/egsh_lightgreen_short.mp3",
    "piano/fac_purple_long.mp3",
    "piano/fac_purple_medium.mp3",
    "piano/fac_purple_short.mp3",
    "piano/gce_brown_long.mp3",
    "piano/gce_brown_medium.mp3",
    "piano/gce_brown_short.mp3",
    "piano/ghd_pink_long.mp3",
    "piano/ghd_pink_medium.mp3",
    "piano/ghd_pink_short.mp3",
    "piano/hdg_blue_long.mp3",
    "piano/hdg_blue_medium.mp3",
    "piano/hdg_blue_short.mp3",
    "guitar/a3c4f4_black.mp3",
    "guitar/a3cs4e4_gray.mp3",
    "guitar/as3d4f4_lightpurple.mp3",
    "guitar/c4e4g4_red.mp3",
    "guitar/c4f4a4_yellow.mp3",
    "guitar/d4fs4a4_tan.mp3",
    "guitar/d4g4h4_green.mp3",
    "guitar/ds4g4as4_skyblue.mp3",
    "guitar/e4g4c5_orange.mp3",
    "guitar/e4gs4h4_lightgreen.mp3",
    "guitar/f4a4c5_purple.mp3",
    "guitar/g4c5e5_brown.mp3",
    "guitar/g4h4d5_pink.mp3",
    "guitar/h3d4g4_blue.mp3",
    "guitar-strummed/a3c4f4_black.mp3",
    "guitar-strummed/a3cs4e4_gray.mp3",
    "guitar-strummed/as3d4f4_lightpurple.mp3",
    "guitar-strummed/c4e4g4_red.mp3",
    "guitar-strummed/c4f4a4_yellow.mp3",
    "guitar-strummed/d4fs4a4_tan.mp3",
    "guitar-strummed/d4g4h4_green.mp3",
    "guitar-strummed/ds4g4as4_skyblue.mp3",
    "guitar-strummed/e4g4c5_orange.mp3",
    "guitar-strummed/e4gs4h4_lightgreen.mp3",
    "guitar-strummed/f4a4c5_purple.mp3",
    "guitar-strummed/g4c5e5_brown.mp3",
    "guitar-strummed/g4h4d5_pink.mp3",
    "guitar-strummed/h3d4g4_blue.mp3"
  ];

  // src/ts/utils.ts
  function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
  }
  function cumulativeSum(arr) {
    const out = [];
    let acc = 0;
    for (const value of arr) {
      acc += value;
      out.push(acc);
    }
    return out;
  }
  function randomElem(arr, weights) {
    if (weights === void 0) {
      return arr[Math.floor(Math.random() * arr.length)];
    } else {
      const cumWeights = cumulativeSum(weights);
      const number = Math.random();
      for (const [index, value] of arr.entries()) {
        if (number <= cumWeights[index]) {
          return value;
        }
      }
      return arr[arr.length - 1];
    }
  }
  function padNumber(value, padding) {
    return String(value).padStart(padding, "0");
  }
  function formatDate(d) {
    return d.getFullYear() + "-" + padNumber(d.getMonth() + 1, 2) + "-" + padNumber(d.getDate(), 2);
  }
  function formatDatetime(dt, offset = false) {
    let out = formatDate(dt) + " " + padNumber(dt.getHours(), 2) + ":" + padNumber(dt.getMinutes(), 2);
    if (offset) {
      let tzOffset = dt.getTimezoneOffset();
      const sign = tzOffset < 0 ? "-" : "+";
      tzOffset = Math.abs(tzOffset);
      const tzHours = padNumber(Math.floor(tzOffset / 60), 2);
      const tzMinutes = padNumber(tzOffset % 60, 2);
      out += sign + tzHours + ":" + tzMinutes;
    }
    return out;
  }
  function getCurrentTimestamp() {
    return Date.now() / 1e3;
  }
  function validInt(s) {
    return parseInt(s) === Number(s);
  }

  // src/ts/state.ts
  var STATE_KEY = "bsharp_state";
  var SESSION_HISTORY_KEY = "bsharp_session_history";
  var LEGACY_STATE_KEY = "cim_state";
  var LEGACY_SESSION_HISTORY_KEY = "cim_session_history";
  var LEGACY_USER_ID = 0;
  var GUEST_USER_ID = 100;
  var SESSION_TIMEOUT_TIME_SECONDS = 60 * 30;
  var DEFAULT_CHORD = Object.keys(CHORDS_TONE)[1];
  var DEFAULT_INSTRUMENT = "piano_1";
  var DEFAULT_TARGET_NUMBER = 25;
  var DEFAULT_SHOW_CHORD_MODE = "black_only";
  var DEFAULT_REVEAL_CHORD_MODE = "always";
  var DEFAULT_CHORD_DISPLAY_MODE = "shapes_and_letters";
  var DEFAULT_SINGLE_NOTE_MODE = "white_only_on_black";
  var DEFAULT_SINGLE_NOTE_CORRECTNESS_MODE = "only_correct";
  var DEFAULT_PERSIST_REACTION_FACE = true;
  var DEFAULT_ENABLE_ONBOARDING_HINTS = true;
  var DEFAULT_COLOR_SCHEME = "dark";
  var DEFAULT_CHORD_SELECTION_MODE = "random";
  var STATE = null;
  var _SESSION_HISTORY = null;
  function getObject(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  function setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function newTally() {
    return {
      correct: 0,
      identifications: 0,
      confusion_matrix: {}
    };
  }
  function newStats() {
    return {
      current_chord: STATE !== null ? STATE.current_chord : DEFAULT_CHORD,
      start_time: getCurrentTimestamp(),
      updated_time: getCurrentTimestamp(),
      correct: 0,
      identifications: 0,
      confusion_matrix: {},
      notes: newTally(),
      done: false
    };
  }
  function newProfile(name, icon, id, targetNumber = DEFAULT_TARGET_NUMBER, showChordMode = DEFAULT_SHOW_CHORD_MODE, revealChordMode = DEFAULT_REVEAL_CHORD_MODE, chordDisplayMode = DEFAULT_CHORD_DISPLAY_MODE, singleNoteMode = DEFAULT_SINGLE_NOTE_MODE, singleNoteCorrectnessMode = DEFAULT_SINGLE_NOTE_CORRECTNESS_MODE, persistReactionFace = DEFAULT_PERSIST_REACTION_FACE, enableOnboardingHints = DEFAULT_ENABLE_ONBOARDING_HINTS, colorScheme = DEFAULT_COLOR_SCHEME, chordSelectionMode = DEFAULT_CHORD_SELECTION_MODE) {
    if (id === void 0 || id === null) {
      id = GUEST_USER_ID + 1;
      while (id in STATE.profiles) {
        id++;
      }
    }
    return {
      id,
      name,
      icon,
      target_number: targetNumber,
      show_chord_mode: showChordMode,
      reveal_chord_mode: revealChordMode,
      chord_display_mode: chordDisplayMode,
      single_note_mode: singleNoteMode,
      single_note_correctness_mode: singleNoteCorrectnessMode,
      persist_reaction_face: persistReactionFace,
      enable_onboarding_hints: enableOnboardingHints,
      color_scheme: colorScheme,
      chord_selection_mode: chordSelectionMode,
      stats: newStats(),
      current_chord: DEFAULT_CHORD,
      current_instrument: DEFAULT_INSTRUMENT
    };
  }
  function initializeProfileDefaults(profile) {
    const defaults = {
      show_chord_mode: DEFAULT_SHOW_CHORD_MODE,
      reveal_chord_mode: DEFAULT_REVEAL_CHORD_MODE,
      chord_display_mode: DEFAULT_CHORD_DISPLAY_MODE,
      single_note_mode: DEFAULT_SINGLE_NOTE_MODE,
      single_note_correctness_mode: DEFAULT_SINGLE_NOTE_CORRECTNESS_MODE,
      persist_reaction_face: DEFAULT_PERSIST_REACTION_FACE,
      enable_onboarding_hints: DEFAULT_ENABLE_ONBOARDING_HINTS,
      color_scheme: DEFAULT_COLOR_SCHEME,
      chord_selection_mode: DEFAULT_CHORD_SELECTION_MODE,
      current_instrument: DEFAULT_INSTRUMENT
    };
    for (const [key, defaultVal] of Object.entries(defaults)) {
      if (profile[key] === void 0) {
        profile[key] = defaultVal;
      }
    }
  }
  function loadState() {
    let state = getObject(STATE_KEY);
    if (state === null) {
      state = getObject(LEGACY_STATE_KEY);
    }
    if (state === null) {
      const newProfiles = {};
      newProfiles[GUEST_USER_ID] = newProfile("Guest", "fa-user", GUEST_USER_ID);
      state = {
        profiles: newProfiles,
        current_chord: DEFAULT_CHORD,
        current_profile: GUEST_USER_ID
      };
    } else if (state["profiles"] === void 0) {
      const newProfiles = {};
      newProfiles[LEGACY_USER_ID] = newProfile("Legacy User", "fa-user", LEGACY_USER_ID);
      newProfiles[GUEST_USER_ID] = newProfile("Guest", "fa-user", GUEST_USER_ID);
      const updatedState = {
        profiles: newProfiles,
        current_chord: state.current_chord,
        current_profile: GUEST_USER_ID
      };
      if (state["stats"]) {
        updatedState.profiles[LEGACY_USER_ID].stats = state["stats"];
      }
      state = updatedState;
    }
    if (state.current_profile === void 0 || state.current_profile === null) {
      state.current_profile = GUEST_USER_ID;
    }
    for (const profile of Object.values(state.profiles)) {
      initializeProfileDefaults(profile);
    }
    STATE = state;
  }
  function saveState() {
    setObject(STATE_KEY, STATE);
  }
  function getCurrentProfile() {
    let currentProfileId = STATE.current_profile;
    if (!STATE.profiles.hasOwnProperty(currentProfileId)) {
      currentProfileId = GUEST_USER_ID;
      STATE.current_profile = currentProfileId;
    }
    return STATE.profiles[currentProfileId];
  }
  function getCurrentTargetNumber() {
    let targetNumber = getCurrentProfile().target_number;
    if (targetNumber === void 0) {
      targetNumber = DEFAULT_TARGET_NUMBER;
      getCurrentProfile().target_number = targetNumber;
    }
    return targetNumber;
  }
  function getSessionHistory() {
    let history = _SESSION_HISTORY;
    if (history === null) {
      history = getObject(SESSION_HISTORY_KEY);
      if (history === null) {
        history = getObject(LEGACY_SESSION_HISTORY_KEY);
      }
    }
    if (history === null || Array.isArray(history)) {
      history = {};
    }
    _SESSION_HISTORY = history;
    return history;
  }
  function getCurrentSessionHistory() {
    const fullHistory = getSessionHistory();
    const profileId = String(getCurrentProfile().id);
    let histories = fullHistory[profileId];
    if (histories === void 0) {
      histories = {};
      fullHistory[profileId] = histories;
    }
    let history = histories[STATE.current_chord];
    if (history === void 0) {
      history = [];
      histories[STATE.current_chord] = history;
    }
    return history;
  }
  function saveSessionHistory() {
    const sessionHistory = getSessionHistory();
    const profileId = String(getCurrentProfile().id);
    let currentSessionHistory = sessionHistory[profileId];
    if (currentSessionHistory === void 0) {
      currentSessionHistory = {};
    }
    const chord = STATE.current_chord;
    let chordHistory = currentSessionHistory[chord];
    if (chordHistory === void 0) {
      chordHistory = [];
      currentSessionHistory[chord] = chordHistory;
    }
    const currentStats = getCurrentProfile().stats;
    const lastSession = chordHistory[chordHistory.length - 1];
    if (lastSession === void 0 || currentStats.start_time !== lastSession.start_time) {
      chordHistory.push(currentStats);
    }
    sessionHistory[profileId] = currentSessionHistory;
    setObject(SESSION_HISTORY_KEY, sessionHistory);
  }
  function isRecent(timestamp) {
    return getCurrentTimestamp() - timestamp <= SESSION_TIMEOUT_TIME_SECONDS;
  }

  // src/ts/stats.ts
  function normalizeStatsObject(stats) {
    if (stats.notes === void 0) {
      stats.notes = newTally();
    }
  }
  function updateStartTimeIfNeeded() {
    const stats = getCurrentProfile().stats;
    if (stats.identifications === 0) {
      stats.start_time = getCurrentTimestamp();
    }
  }
  function updateStats(correctColor, chosenColor) {
    const stats = getCurrentProfile().stats;
    stats.identifications++;
    if (correctColor === chosenColor) {
      stats.correct++;
    }
    if (stats.confusion_matrix[correctColor] === void 0) {
      stats.confusion_matrix[correctColor] = {};
    }
    const row = stats.confusion_matrix[correctColor];
    if (row[chosenColor] === void 0) {
      row[chosenColor] = 0;
    }
    row[chosenColor] = row[chosenColor] + 1;
    stats.updated_time = getCurrentTimestamp();
    saveState();
  }
  function calculatePercentage(correct, identifications) {
    if (identifications === 0) {
      return 0;
    }
    return 100 * (correct / identifications);
  }
  function calculateNeutralLevel(percentage) {
    return Math.min(Math.max(0, Math.floor((percentage - 50) / 10)), 4);
  }
  function getCatEmoji(level) {
    const emojiLevels = {
      0: "\u{1F63F}",
      1: "\u{1F63E}",
      2: "\u{1F431}",
      3: "\u{1F63A}",
      4: "\u{1F638}",
      5: "\u{1F640}",
      6: "\u{1F63B}"
    };
    return emojiLevels[level];
  }
  var RECENT_IDENTIFICATIONS_LIMIT = 140;
  function countMatrixIdentifications(cm) {
    let total = 0;
    for (const row of Object.values(cm)) {
      for (const count of Object.values(row)) {
        total += count;
      }
    }
    return total;
  }
  function scaleMatrix(cm, factor) {
    const result = {};
    for (const [ok, row] of Object.entries(cm)) {
      result[ok] = {};
      for (const [ik, count] of Object.entries(row)) {
        result[ok][ik] = count * factor;
      }
    }
    return result;
  }
  function getCurrentCoefficients() {
    const sessionHistory = getCurrentSessionHistory();
    const numChords = Object.keys(CHORDS_TONE).indexOf(STATE.current_chord) + 1;
    const matrices = [];
    let remaining = RECENT_IDENTIFICATIONS_LIMIT;
    for (let i = sessionHistory.length - 1; i >= 0 && remaining > 0; i--) {
      const session = sessionHistory[i];
      const sessionCount = countMatrixIdentifications(session.confusion_matrix);
      if (sessionCount === 0) continue;
      if (sessionCount <= remaining) {
        matrices.push(session.confusion_matrix);
        remaining -= sessionCount;
      } else {
        const scale = remaining / sessionCount;
        matrices.push(scaleMatrix(session.confusion_matrix, scale));
        remaining = 0;
      }
    }
    const matrix = mergeMatrices(matrices, numChords);
    return calculateCoefficients(matrix);
  }
  function mergeMatrices(confusionMatrices, numChords) {
    const chords = Object.keys(CHORDS_TONE).slice(0, numChords);
    const outMatrix = Object.fromEntries(
      chords.map((x) => [x, Object.fromEntries(chords.map((y) => [y, 0]))])
    );
    for (const cm of confusionMatrices) {
      for (const ok of Object.keys(cm)) {
        for (const ik of Object.keys(cm[ok])) {
          if (outMatrix[ok] && outMatrix[ok][ik] !== void 0) {
            outMatrix[ok][ik] = outMatrix[ok][ik] + cm[ok][ik];
          }
        }
      }
    }
    return outMatrix;
  }
  function normalizeArrayMasked(arr, mask) {
    const normTo = 1 - sum(arr.filter((_, i) => mask[i]));
    const normFactor = sum(arr.filter((_, i) => !mask[i])) / normTo;
    return arr.map((val, i) => mask[i] ? val : val / normFactor);
  }
  function calculateCoefficients(matrix, wrongWeight = 5, mistakenForWeight = 1.5, threshold = 5) {
    const chords = Object.keys(matrix);
    const numChords = chords.length;
    const defaultValue = 1 / numChords;
    let coefficients = new Array(numChords).fill(0);
    const numChances = new Array(numChords).fill(0);
    const minValues = new Array(numChords).fill(1 / (1.2 * numChords));
    for (const [correctIndex, correctChord] of chords.entries()) {
      for (const [chosenIndex, chosenChord] of chords.entries()) {
        const value = matrix[correctChord][chosenChord];
        if (value === void 0) continue;
        if (chosenIndex !== correctIndex) {
          coefficients[correctIndex] += value * wrongWeight;
          coefficients[chosenIndex] += value * mistakenForWeight;
        } else {
          coefficients[correctIndex] += value;
        }
        numChances[correctIndex] += value;
      }
    }
    let mask = numChances.map((x) => x < threshold);
    coefficients = coefficients.map((value, i) => mask[i] ? defaultValue : value);
    let normalized = false;
    while (!normalized) {
      coefficients = normalizeArrayMasked(coefficients, mask);
      normalized = true;
      for (const [index, value] of coefficients.entries()) {
        const minCoefficient = minValues[index];
        if (value < minCoefficient) {
          mask[index] = true;
          coefficients[index] = minCoefficient;
          normalized = false;
          break;
        }
      }
    }
    return coefficients;
  }

  // src/ts/audio.ts
  var AUDIO_FILES = null;
  function getInstrumentIdForPath(path) {
    return INSTRUMENTS.find((instrument) => instrument.chordPath === path)?.id || INSTRUMENTS[0].id;
  }
  function getAudioFiles(instrument) {
    if (AUDIO_FILES === null) {
      AUDIO_FILES = /* @__PURE__ */ new Map();
      for (const file of AUDIO_FILE_LIST) {
        const path = file.split("/")[0];
        const instrumentId = getInstrumentIdForPath(path);
        const filename = file.split("/").pop();
        const [base] = filename.split(".");
        const parts = base.split("_");
        const chord = parts[0];
        const color = parts[1];
        const ext = filename.split(".").pop();
        const audioFile = {
          filename: file,
          instrument: instrumentId,
          color,
          chord,
          ext,
          elem: null
        };
        if (!AUDIO_FILES.has(instrumentId)) {
          AUDIO_FILES.set(instrumentId, /* @__PURE__ */ new Map());
        }
        const instrumentFiles = AUDIO_FILES.get(instrumentId);
        if (!instrumentFiles.has(color)) {
          instrumentFiles.set(color, []);
        }
        instrumentFiles.get(color).push(audioFile);
      }
    }
    return AUDIO_FILES.get(instrument) || AUDIO_FILES.get(INSTRUMENTS[0].id);
  }
  function audioFileElem(audioFile, onEnded) {
    if (audioFile.elem === null) {
      audioFile.elem = document.createElement("audio");
      audioFile.elem.classList.add("chord");
      audioFile.elem.controls = true;
      audioFile.elem.preload = "auto";
      audioFile.elem.src = "static/chords/" + audioFile.filename;
      audioFile.elem.onended = onEnded;
      audioFile.elem.load();
    }
    return audioFile.elem;
  }
  var _currentTrainerAudio = null;
  function playChordFiles(instrument, color, onEnded) {
    const audioFiles = getAudioFiles(instrument);
    const files = audioFiles.get(color);
    if (files) {
      if (_currentTrainerAudio) {
        _currentTrainerAudio.pause();
        _currentTrainerAudio.currentTime = 0;
      }
      const audioFile = randomElem(files);
      const elem = audioFileElem(audioFile, onEnded);
      _currentTrainerAudio = elem;
      elem.play();
    }
  }
  function preloadAudio(instrument, color, onEnded) {
    const audioFiles = getAudioFiles(instrument).get(color);
    if (audioFiles) {
      for (const audioFile of audioFiles) {
        audioFileElem(audioFile, onEnded);
      }
    }
  }

  // src/ts/onboarding.ts
  var _isFirstIdentification = false;
  function checkIsFirstSession() {
    const history = getSessionHistory();
    const profileHistory = history[String(getCurrentProfile().id)];
    if (!profileHistory) return true;
    for (const sessions of Object.values(profileHistory)) {
      for (const session of sessions) {
        if (session.identifications > 0) return false;
      }
    }
    return true;
  }
  var STEP_CONFIG = {
    play: { text: "Click the play button to hear the sound", arrow: true },
    guess: { text: "Guess the color", arrow: false },
    goNext: { text: "", arrow: false }
  };
  function showOverlay(step, textOverride) {
    if (!getCurrentProfile().enable_onboarding_hints) return;
    const overlay = document.getElementById("onboarding-overlay");
    if (!overlay) return;
    const config = STEP_CONFIG[step];
    if (!config) return;
    overlay.dataset.step = step;
    overlay.innerHTML = "";
    if (config.arrow) {
      const arrow = document.createElement("div");
      arrow.className = "onboarding-arrow";
      arrow.textContent = "\u2191";
      overlay.appendChild(arrow);
    }
    const text = document.createElement("span");
    text.className = "onboarding-text";
    text.textContent = textOverride ?? config.text;
    overlay.appendChild(text);
    overlay.classList.add("visible");
  }
  function hideOverlay() {
    const overlay = document.getElementById("onboarding-overlay");
    if (!overlay) return;
    overlay.classList.remove("visible");
  }
  function initOnboarding() {
    _isFirstIdentification = checkIsFirstSession();
    showOverlay("play");
  }
  function resetOnboarding() {
    _isFirstIdentification = checkIsFirstSession();
    if (!getCurrentProfile().enable_onboarding_hints) {
      hideOverlay();
    }
  }
  function showOnboardingPlayPrompt() {
    showOverlay("play");
  }
  function dismissOnboardingStep(step) {
    const overlay = document.getElementById("onboarding-overlay");
    if (overlay?.dataset.step === step) {
      hideOverlay();
    }
  }
  function showOnboardingGuessPrompt() {
    if (_isFirstIdentification) {
      showOverlay("guess");
    }
  }
  function showOnboardingGoNextPrompt(isCorrect) {
    hideOverlay();
    if (_isFirstIdentification) {
      const text = isCorrect ? "Great job! Click the arrow to continue" : "Click the arrow to try again";
      showOverlay("goNext", text);
      _isFirstIdentification = false;
    }
  }

  // src/ts/ui.ts
  var _DOWNLOAD_ENABLED_CLICKS = 0;
  var _DOWNLOAD_ENABLED_LAST_CLICK = null;
  var _EASTER_EGG_CLICKS = 0;
  var _EASTER_EGG_LAST_CLICK = null;
  var _EASTER_EGG_ENABLED = false;
  var _getEmojiLock = () => false;
  var _resetStatsFn = () => {
  };
  var _changeSelectorFn = () => {
  };
  var _onTrainerOpenFn = () => {
  };
  function registerGameCallbacks(getEmojiLock2, resetStats2, changeSelector2, onTrainerOpen2) {
    _getEmojiLock = getEmojiLock2;
    _resetStatsFn = resetStats2;
    _changeSelectorFn = changeSelector2;
    _onTrainerOpenFn = onTrainerOpen2;
  }
  function setCatEmoji(level) {
    const emoji = getCatEmoji(level);
    const elem = document.getElementById("reaction-emoji");
    if (elem) elem.innerHTML = emoji;
  }
  var NEUTRAL_EMOJI_LEVEL = 2;
  function resetCatEmoji() {
    const stats = getCurrentProfile().stats;
    if (stats.identifications === 0) {
      setCatEmoji(NEUTRAL_EMOJI_LEVEL);
      return;
    }
    setCatEmoji(calculateNeutralLevel(calculatePercentage(stats.correct, stats.identifications)));
  }
  function updateStatsContainer(containerElem, correct, identifications) {
    const correctElem = containerElem.querySelector(".stats-correct");
    const totalElem = containerElem.querySelector(".stats-total");
    const percElem = containerElem.querySelector(".stats-percent");
    if (correctElem) correctElem.innerHTML = String(correct);
    if (totalElem) totalElem.innerHTML = String(identifications);
    const percentage = calculatePercentage(correct, identifications);
    if (percElem) {
      percElem.innerHTML = identifications > 0 ? "(" + percentage.toFixed(0) + "%)" : "";
    }
  }
  function updateStatsDisplay() {
    const containerElem = document.getElementById("stats-container");
    if (!containerElem) return;
    const stats = getCurrentProfile().stats;
    normalizeStatsObject(stats);
    const correct = stats.correct;
    const identifications = stats.identifications;
    const statsDisplayElem = document.getElementById("chord-stats-display");
    if (statsDisplayElem) {
      updateStatsContainer(statsDisplayElem, correct, identifications);
    }
    if (identifications >= getCurrentTargetNumber()) {
      containerElem.classList.add("done");
    } else {
      containerElem.classList.remove("done");
    }
    if (correct === identifications) {
      containerElem.classList.add("perfect");
    } else {
      containerElem.classList.remove("perfect");
    }
    const noteStatsElem = document.getElementById("sn-stats-display");
    if (noteStatsElem) {
      const notesCorrect = stats.notes.correct;
      const noteIdentifications = stats.notes.identifications;
      updateStatsContainer(noteStatsElem, notesCorrect, noteIdentifications);
      if (noteIdentifications) {
        noteStatsElem.classList.add("visible");
      } else {
        noteStatsElem.classList.remove("visible");
      }
    }
    if (!_getEmojiLock()) {
      resetCatEmoji();
    }
  }
  function populateFlags(getSelectedColors2, chordsOn2) {
    const colors = getSelectedColors2();
    const baseElem = document.getElementById("flag-holder");
    if (!baseElem) return;
    for (const wrapperElem of baseElem.querySelectorAll(".flag-wrapper")) {
      if (colors.includes(wrapperElem.dataset.color)) {
        wrapperElem.classList.add("visible");
      } else {
        wrapperElem.classList.remove("visible");
      }
    }
    if (colors.length > 9) {
      baseElem.classList.add("flags-compact");
    } else {
      baseElem.classList.remove("flags-compact");
    }
    if (colors.length < 4) {
      baseElem.classList.add("flags-expanded");
    } else {
      baseElem.classList.remove("flags-expanded");
    }
    if (chordsOn2() && getCurrentProfile().reveal_chord_mode === "always") {
      baseElem.classList.add("chord-notes");
    } else {
      baseElem.classList.remove("chord-notes");
    }
  }
  function setChordDisplayMode(chordMode) {
    let useShapes = true;
    let useLetters = true;
    if (chordMode === "shapes_only") {
      useLetters = false;
    } else if (chordMode === "letters_only") {
      useShapes = false;
    }
    const noteHolders = [
      document.getElementById("flag-holder"),
      document.getElementById("single-note-selector-container")
    ];
    for (const holderElem of noteHolders) {
      if (!holderElem) continue;
      if (useShapes) {
        holderElem.classList.add("use-shapes");
      } else {
        holderElem.classList.remove("use-shapes");
      }
      if (useLetters) {
        holderElem.classList.add("use-letters");
      } else {
        holderElem.classList.remove("use-letters");
      }
    }
  }
  var _CURRENT_PANEL = null;
  var PANEL_TRIGGER_MAP = {
    "i-infobox": "i-infobox-trigger",
    "trainer-infobox": "trainer-infobox-trigger",
    "stats-history-container": "stats-history-trigger",
    "profile-info-container": "profile-infobox-trigger"
  };
  function setActiveTrigger(panelElem) {
    const homeButton = document.getElementById("home-button");
    if (homeButton) homeButton.classList.remove("active");
    for (const triggerId of Object.values(PANEL_TRIGGER_MAP)) {
      const triggerElem = document.getElementById(triggerId);
      if (triggerElem) triggerElem.parentElement?.classList.remove("active");
    }
    if (panelElem === null) {
      if (homeButton) homeButton.classList.add("active");
    } else {
      const triggerId = PANEL_TRIGGER_MAP[panelElem.id];
      if (triggerId) {
        const triggerElem = document.getElementById(triggerId);
        if (triggerElem) triggerElem.parentElement?.classList.add("active");
      }
    }
  }
  function setPanelOpen(open) {
    const container = document.querySelector(".cim-container");
    if (!container) return;
    if (open) {
      container.classList.add("panel-open");
    } else {
      container.classList.remove("panel-open");
    }
  }
  function togglePanel(panelElem) {
    if (_CURRENT_PANEL === panelElem) {
      panelElem.classList.remove("visible");
      _CURRENT_PANEL = null;
      setPanelOpen(false);
      setActiveTrigger(null);
    } else {
      if (_CURRENT_PANEL !== null) {
        _CURRENT_PANEL.classList.remove("visible");
      }
      panelElem.classList.add("visible");
      _CURRENT_PANEL = panelElem;
      setPanelOpen(true);
      setActiveTrigger(panelElem);
    }
  }
  function closePanel() {
    if (_CURRENT_PANEL !== null) {
      _CURRENT_PANEL.classList.remove("visible");
      _CURRENT_PANEL = null;
      setPanelOpen(false);
    }
    setActiveTrigger(null);
  }
  function initActiveState() {
    setActiveTrigger(null);
  }
  function toggleExpansionBar() {
    const menu = document.getElementById("menu-container");
    if (menu) menu.classList.toggle("visible");
  }
  function toggleInfoboxVisibility() {
    togglePanel(document.getElementById("i-infobox"));
  }
  function toggleStatsHistoryVisibility() {
    populateStatsHistoryModal();
    togglePanel(document.getElementById("stats-history-container"));
  }
  function toggleProfilePanel() {
    const panel = document.getElementById("profile-info-container");
    if (panel.classList.contains("visible") && _CURRENT_PANEL === panel) {
      closePanel();
    } else {
      populateProfileSwitcher();
      populateProfileSettings();
      togglePanel(panel);
    }
  }
  function toggleTrainerVisibility() {
    const panel = document.getElementById("trainer-infobox");
    togglePanel(panel);
    if (_CURRENT_PANEL === panel) {
      _onTrainerOpenFn();
    }
  }
  function applyColorScheme(scheme) {
    if (scheme === "light") {
      document.body.classList.remove("colorscheme-dark");
      document.body.classList.add("colorscheme-light");
    } else {
      document.body.classList.remove("colorscheme-light");
      document.body.classList.add("colorscheme-dark");
    }
    window.BSharpAndroid?.setTheme(scheme !== "light");
  }
  function populateProfileUiElements() {
    const profile = getCurrentProfile();
    const profileIconElem = document.getElementById("profile-icon");
    if (!profileIconElem) return;
    if (profileIconElem.dataset.userIcon !== void 0) {
      profileIconElem.classList.remove(profileIconElem.dataset.userIcon);
    }
    const userIcon = profile.icon;
    profileIconElem.classList.add(userIcon);
    profileIconElem.dataset.userIcon = userIcon;
    const profileNameSpan = document.getElementById("profile-text");
    if (profileNameSpan) profileNameSpan.textContent = profile.name;
  }
  function populateProfileSwitcher() {
    if (STATE === null) return;
    const container = document.getElementById("profile-switcher");
    if (!container) return;
    container.innerHTML = "";
    const currentId = getCurrentProfile().id;
    const profiles = Object.values(STATE.profiles).filter((p) => p.id !== GUEST_USER_ID);
    profiles.push(STATE.profiles[GUEST_USER_ID]);
    for (const profile of profiles) {
      const btn = document.createElement("button");
      btn.classList.add("switcher-item", "switcher-profile");
      if (profile.id === currentId) btn.classList.add("active");
      btn.type = "button";
      const icon = document.createElement("i");
      icon.classList.add("fa", "fa-solid", profile.icon);
      btn.appendChild(icon);
      btn.addEventListener("click", () => {
        setCurrentProfile(profile);
        populateProfileSwitcher();
        populateProfileSettings();
      });
      container.appendChild(btn);
    }
    const addBtn = document.createElement("button");
    addBtn.classList.add("switcher-item", "switcher-add");
    addBtn.type = "button";
    const addIcon = document.createElement("i");
    addIcon.classList.add("fa", "fa-solid", "fa-plus");
    addBtn.appendChild(addIcon);
    addBtn.addEventListener("click", () => {
      openProfileAdder();
    });
    container.appendChild(addBtn);
  }
  function getCheckedIconSelectorSettingElem() {
    const container = document.getElementById("profile-info-container");
    if (!container) return null;
    for (const elem of container.querySelectorAll("input[name='profile_icon_selector']")) {
      if (elem.checked) return elem;
    }
    return null;
  }
  function isProfileNameTaken(profileName) {
    for (const profile of Object.values(STATE.profiles)) {
      if (profile.name.toLowerCase() === profileName.toLowerCase()) return true;
    }
    return false;
  }
  function getProfileSettings() {
    const profileContainer = document.getElementById("profile-info-container");
    const profileNameElem = document.getElementById("profile_name_setting");
    const profileName = profileNameElem.value;
    let profileIcon = null;
    const checkedIconElem = getCheckedIconSelectorSettingElem();
    if (checkedIconElem !== null) {
      profileIcon = checkedIconElem.value;
    }
    const id = JSON.parse(profileContainer.dataset.id || "null");
    const showChordMode = document.getElementById("show-chord-name-mode-selector").value;
    const revealChordMode = document.getElementById("chord-reveal-mode-selector").value;
    const chordDisplayMode = document.getElementById("chord-name-display-mode-selector").value;
    const singleNoteModeElem = document.getElementById("single-note-trainer-mode-selector");
    const singleNoteMode = singleNoteModeElem ? singleNoteModeElem.value : DEFAULT_SINGLE_NOTE_MODE;
    const singleNoteCorrectnessModeElem = document.getElementById("single-note-trainer-correctness-mode-selector");
    const singleNoteCorrectnessMode = singleNoteCorrectnessModeElem ? singleNoteCorrectnessModeElem.value : DEFAULT_SINGLE_NOTE_CORRECTNESS_MODE;
    const targetNumber = document.getElementById("target_number_setting").value;
    const persistReactionFace = document.getElementById("persist_reaction_face_setting").checked;
    const enableOnboardingHints = document.getElementById("enable_onboarding_hints_setting").checked;
    const colorScheme = document.getElementById("color-scheme-selector").value;
    const chordSelectionMode = document.getElementById("chord-selection-mode-selector").value;
    return {
      name: profileName,
      icon: profileIcon,
      id,
      target_number: targetNumber,
      show_chord_mode: showChordMode,
      reveal_chord_mode: revealChordMode,
      chord_display_mode: chordDisplayMode,
      single_note_mode: singleNoteMode,
      single_note_correctness_mode: singleNoteCorrectnessMode,
      persist_reaction_face: persistReactionFace,
      enable_onboarding_hints: enableOnboardingHints,
      color_scheme: colorScheme,
      chord_selection_mode: chordSelectionMode
    };
  }
  function clearProfileDialog() {
    const profileDialog = document.getElementById("profile-info-container");
    if (!profileDialog) return;
    const checkedIconElem = getCheckedIconSelectorSettingElem();
    if (checkedIconElem !== null) checkedIconElem.checked = false;
    for (const elem of profileDialog.querySelectorAll("input[type='text']")) {
      elem.value = "";
    }
    for (const elem of profileDialog.querySelectorAll("button.button")) {
      elem.classList.remove("visible");
    }
    const showChordMode = profileDialog.querySelector("select#show-chord-name-mode-selector");
    if (showChordMode) showChordMode.value = DEFAULT_SHOW_CHORD_MODE;
    const chordDisplayMode = profileDialog.querySelector("select#chord-name-display-mode-selector");
    if (chordDisplayMode) chordDisplayMode.value = DEFAULT_CHORD_DISPLAY_MODE;
    const singleNoteMode = document.getElementById("single-note-trainer-mode-selector");
    if (singleNoteMode) singleNoteMode.value = DEFAULT_SINGLE_NOTE_MODE;
    const singleNoteCorrectnessMode = document.getElementById("single-note-trainer-correctness-mode-selector");
    if (singleNoteCorrectnessMode) singleNoteCorrectnessMode.value = DEFAULT_SINGLE_NOTE_CORRECTNESS_MODE;
    const colorSchemeSelector = document.getElementById("color-scheme-selector");
    if (colorSchemeSelector) colorSchemeSelector.value = DEFAULT_COLOR_SCHEME;
    const chordSelectionModeSelector = document.getElementById("chord-selection-mode-selector");
    if (chordSelectionModeSelector) chordSelectionModeSelector.value = DEFAULT_CHORD_SELECTION_MODE;
    profileDialog.dataset.id = "null";
  }
  function populateProfileSettings() {
    const profile = getCurrentProfile();
    const isGuest = profile.id === GUEST_USER_ID;
    clearProfileDialog();
    const profileDialog = document.getElementById("profile-info-container");
    for (const elem of profileDialog.querySelectorAll("button.settings-button")) {
      elem.classList.add("visible");
    }
    const profileNameElem = document.getElementById("profile_name_setting");
    profileNameElem.value = profile.name;
    for (const elem of profileDialog.querySelectorAll("input[name='profile_icon_selector']")) {
      if (elem.value === profile.icon) {
        elem.checked = true;
        break;
      }
    }
    document.getElementById("target_number_setting").value = String(profile.target_number);
    document.getElementById("show-chord-name-mode-selector").value = profile.show_chord_mode;
    document.getElementById("chord-reveal-mode-selector").value = profile.reveal_chord_mode;
    document.getElementById("chord-name-display-mode-selector").value = profile.chord_display_mode;
    const singleNoteModeElem = document.getElementById("single-note-trainer-mode-selector");
    if (singleNoteModeElem) singleNoteModeElem.value = profile.single_note_mode;
    const singleNoteCorrectnessModeElem = document.getElementById("single-note-trainer-correctness-mode-selector");
    if (singleNoteCorrectnessModeElem) singleNoteCorrectnessModeElem.value = profile.single_note_correctness_mode;
    document.getElementById("persist_reaction_face_setting").checked = profile.persist_reaction_face;
    document.getElementById("enable_onboarding_hints_setting").checked = profile.enable_onboarding_hints;
    document.getElementById("color-scheme-selector").value = profile.color_scheme;
    document.getElementById("chord-selection-mode-selector").value = profile.chord_selection_mode;
    profileDialog.dataset.id = String(profile.id);
    const deleteButtonElem = document.getElementById("delete-profile-button");
    if (isGuest) {
      profileNameElem.disabled = true;
      deleteButtonElem.disabled = true;
    } else {
      profileNameElem.disabled = false;
      deleteButtonElem.disabled = false;
    }
  }
  function openProfileAdder() {
    const panel = document.getElementById("profile-info-container");
    if (_CURRENT_PANEL !== panel) {
      if (_CURRENT_PANEL !== null) {
        _CURRENT_PANEL.classList.remove("visible");
      }
      panel.classList.add("visible");
      _CURRENT_PANEL = panel;
      setPanelOpen(true);
      setActiveTrigger(panel);
    }
    clearProfileDialog();
    const switcher = document.getElementById("profile-switcher");
    if (switcher) {
      for (const item of switcher.querySelectorAll(".switcher-profile")) {
        item.classList.remove("active");
      }
      const addBtn = switcher.querySelector(".switcher-add");
      if (addBtn) addBtn.classList.add("active");
    }
    const profileContainer = document.getElementById("profile-info-container");
    for (const elem of profileContainer.querySelectorAll("button.add-button")) {
      elem.classList.add("visible");
    }
    document.getElementById("profile_name_setting").disabled = false;
    document.getElementById("target_number_setting").value = String(DEFAULT_TARGET_NUMBER);
    const showChordMode = document.getElementById("show-chord-name-mode-selector");
    if (showChordMode) showChordMode.value = DEFAULT_SHOW_CHORD_MODE;
    const revealChordMode = document.getElementById("chord-reveal-mode-selector");
    if (revealChordMode) revealChordMode.value = DEFAULT_REVEAL_CHORD_MODE;
    const chordDisplayMode = document.getElementById("chord-name-display-mode-selector");
    if (chordDisplayMode) chordDisplayMode.value = DEFAULT_CHORD_DISPLAY_MODE;
    document.getElementById("persist_reaction_face_setting").checked = DEFAULT_PERSIST_REACTION_FACE;
    document.getElementById("enable_onboarding_hints_setting").checked = DEFAULT_ENABLE_ONBOARDING_HINTS;
    document.getElementById("color-scheme-selector").value = DEFAULT_COLOR_SCHEME;
    document.getElementById("chord-selection-mode-selector").value = DEFAULT_CHORD_SELECTION_MODE;
    const firstIcon = profileContainer.querySelector("input[name='profile_icon_selector']");
    if (firstIcon) firstIcon.checked = true;
  }
  function closeProfileAdder() {
    closePanel();
    clearProfileDialog();
  }
  function addProfile() {
    const newProfileValues = getProfileSettings();
    const nameTaken = isProfileNameTaken(newProfileValues.name);
    const targetNumValid = validInt(newProfileValues.target_number);
    if (newProfileValues.icon === null || newProfileValues.name === "") {
      alert("Must specify a profile name and icon.");
    } else if (nameTaken) {
      alert("A profile with the name " + newProfileValues.name + " already exists.");
    } else if (!targetNumValid) {
      alert("Target number must be a valid integer, got " + newProfileValues.target_number);
    } else {
      const profile = newProfile(
        newProfileValues.name,
        newProfileValues.icon,
        void 0,
        parseInt(newProfileValues.target_number),
        newProfileValues.show_chord_mode,
        newProfileValues.reveal_chord_mode,
        newProfileValues.chord_display_mode,
        newProfileValues.single_note_mode,
        newProfileValues.single_note_correctness_mode,
        newProfileValues.persist_reaction_face,
        newProfileValues.enable_onboarding_hints,
        newProfileValues.color_scheme,
        newProfileValues.chord_selection_mode
      );
      STATE.profiles[profile.id] = profile;
      saveState();
      closeProfileAdder();
      setCurrentProfile(profile);
    }
  }
  function submitProfileChanges() {
    const profileValues = getProfileSettings();
    const currentProfile = STATE.profiles[profileValues.id];
    if (currentProfile.name !== profileValues.name && isProfileNameTaken(profileValues.name)) {
      alert("The name " + profileValues.name + " is taken, please choose another one.");
      return;
    }
    if (profileValues.icon === null) {
      alert("Must specify an icon!");
      return;
    }
    if (!validInt(profileValues.target_number)) {
      alert("Must specify a valid target number, got: " + profileValues.target_number);
      return;
    }
    currentProfile.name = profileValues.name;
    currentProfile.icon = profileValues.icon;
    currentProfile.target_number = parseInt(profileValues.target_number);
    currentProfile.show_chord_mode = profileValues.show_chord_mode;
    currentProfile.reveal_chord_mode = profileValues.reveal_chord_mode;
    currentProfile.chord_display_mode = profileValues.chord_display_mode;
    currentProfile.single_note_mode = profileValues.single_note_mode;
    currentProfile.single_note_correctness_mode = profileValues.single_note_correctness_mode;
    currentProfile.persist_reaction_face = profileValues.persist_reaction_face;
    currentProfile.enable_onboarding_hints = profileValues.enable_onboarding_hints;
    currentProfile.color_scheme = profileValues.color_scheme;
    currentProfile.chord_selection_mode = profileValues.chord_selection_mode;
    saveState();
    if (profileValues.id === getCurrentProfile().id) {
      setCurrentProfile(getCurrentProfile());
    }
    populateProfileUiElements();
    closeProfileAdder();
  }
  function deleteProfile() {
    const profileContainer = document.getElementById("profile-info-container");
    const profileId = JSON.parse(profileContainer.dataset.id || "null");
    if (profileId === GUEST_USER_ID) {
      alert("Deleting the guest user is not allowed.");
      return;
    }
    if (confirm("Are you sure you want to delete the profile " + STATE.profiles[profileId].name + "?")) {
      STATE.current_profile = GUEST_USER_ID;
      setCurrentProfile(STATE.profiles[GUEST_USER_ID]);
      delete STATE.profiles[profileId];
    }
    saveState();
    closeProfileAdder();
  }
  function setCurrentProfile(profile) {
    if (profile.id !== getCurrentProfile().id) {
      _resetStatsFn(false);
      STATE.current_profile = profile.id;
    }
    if (profile.current_chord === void 0) {
      profile.current_chord = Object.keys(CHORDS_TONE)[1];
    }
    if (profile.current_instrument === void 0) {
      profile.current_instrument = DEFAULT_INSTRUMENT;
    }
    const instrumentSelector = document.getElementById("instrument-selector");
    if (instrumentSelector) {
      instrumentSelector.value = profile.current_instrument;
    }
    normalizeStatsObject(profile.stats);
    resetOnboarding();
    populateProfileUiElements();
    setChordDisplayMode(profile.chord_display_mode);
    applyColorScheme(profile.color_scheme);
    _changeSelectorFn(profile.current_chord);
    saveState();
  }
  function clearStatsHistoryModal() {
    const modal = document.getElementById("stats-history-container");
    if (!modal) return;
    while (modal.firstChild) {
      modal.removeChild(modal.lastChild);
    }
  }
  function appendEmptyStatsMessage(container) {
    const msg = document.createElement("div");
    msg.classList.add("stats-history-empty");
    msg.textContent = "No sessions recorded yet.";
    container.appendChild(msg);
  }
  function populateStatsHistoryModal() {
    clearStatsHistoryModal();
    const statsContainer = document.getElementById("stats-history-container");
    const history = getSessionHistory();
    const profileHistory = history[String(STATE.current_profile)];
    if (!profileHistory) {
      appendEmptyStatsMessage(statsContainer);
      return;
    }
    const array = Object.values(profileHistory).flat();
    array.sort((a, b) => b.updated_time - a.updated_time);
    let hasEntries = false;
    for (const session of array) {
      const correct = session.correct;
      const identifications = session.identifications;
      if (identifications === 0) continue;
      hasEntries = true;
      const percentage = calculatePercentage(correct, identifications);
      const emoji = getCatEmoji(calculateNeutralLevel(percentage));
      const date = new Date(session.start_time * 1e3);
      const div = document.createElement("div");
      div.classList.add("stats-history-item");
      const color = document.createElement("div");
      color.classList.add(session.current_chord, "stats-color");
      div.appendChild(color);
      const dateElem = document.createElement("div");
      dateElem.classList.add("stats-date");
      dateElem.innerText = formatDatetime(date, false);
      div.appendChild(dateElem);
      const stats = document.createElement("div");
      stats.classList.add("session-stats");
      stats.innerText = correct + " / " + identifications + " (" + percentage.toFixed(0) + "%) " + emoji;
      div.appendChild(stats);
      statsContainer.appendChild(div);
    }
    if (!hasEntries) {
      appendEmptyStatsMessage(statsContainer);
    }
  }
  function enableDownload() {
    if (_DOWNLOAD_ENABLED_CLICKS === -1) return;
    let timeSinceLastClick = 0;
    if (_DOWNLOAD_ENABLED_LAST_CLICK !== null) {
      timeSinceLastClick = getCurrentTimestamp() - _DOWNLOAD_ENABLED_LAST_CLICK;
    }
    if (timeSinceLastClick > 1.5) _DOWNLOAD_ENABLED_CLICKS = 0;
    if (_DOWNLOAD_ENABLED_CLICKS < 5) {
      _DOWNLOAD_ENABLED_CLICKS++;
      _DOWNLOAD_ENABLED_LAST_CLICK = getCurrentTimestamp();
      return;
    }
    _DOWNLOAD_ENABLED_CLICKS = -1;
    const elem = document.getElementById("download-link");
    if (elem) elem.classList.add("visible");
  }
  function triggerEasterEgg() {
    if (_EASTER_EGG_ENABLED) return;
    let timeSinceLastClick = 0;
    if (_EASTER_EGG_LAST_CLICK !== null) {
      timeSinceLastClick = getCurrentTimestamp() - _EASTER_EGG_LAST_CLICK;
    }
    if (timeSinceLastClick > 1.5) _EASTER_EGG_CLICKS = 0;
    if (_EASTER_EGG_CLICKS < 5) {
      _EASTER_EGG_CLICKS++;
      _EASTER_EGG_LAST_CLICK = getCurrentTimestamp();
      return;
    }
    _EASTER_EGG_ENABLED = true;
    const chordElem = document.getElementById("chord-selector");
    if (chordElem) {
      for (const optElem of chordElem.options) {
        if (optElem.value === "red") {
          optElem.removeAttribute("hidden");
        }
      }
    }
  }
  function showScreenPinningInfo() {
    document.getElementById("screen-pinning-modal").classList.add("visible");
  }
  function closeScreenPinningModal() {
    document.getElementById("screen-pinning-modal").classList.remove("visible");
  }
  function downloadState() {
    const stateJson = JSON.stringify({
      state: STATE,
      history: getSessionHistory()
    }, null, 2);
    const data = new Blob([stateJson]);
    const downloadElem = document.createElement("a");
    downloadElem.href = URL.createObjectURL(data);
    downloadElem.download = "bsharp_state_" + Math.round(getCurrentTimestamp()) + ".json";
    downloadElem.click();
    downloadElem.remove();
  }

  // src/ts/game.ts
  var _COLORS = null;
  var _CHORDS_ON = false;
  var _CORRECT_COLOR = null;
  var _SELECTED_ELEM = null;
  var _CORRECT_ELEM = null;
  var _CURRENT_AUDIO = null;
  var _AUDIO_PLAYED = false;
  var _EMOJI_LOCK = false;
  var _CURRENT_COEFFICIENTS = null;
  var _TRAINER_PRELOADED = false;
  var _PERSIST_REACTION_FACE_ENABLED = false;
  function getTestDeterministicColor() {
    return window.__bsharp_test_deterministic_color ?? null;
  }
  function getSelectedColors() {
    const chordIdx = Object.keys(CHORDS_TONE).findIndex((x) => x === STATE.current_chord);
    if (_COLORS === null) {
      _COLORS = Object.keys(CHORDS_TONE).slice(0, chordIdx + 1);
    }
    return _COLORS;
  }
  function isBlackLevel(level) {
    if (level === void 0) {
      level = getSelectedColors().length;
    }
    return level > FIRST_BLACK_INDEX;
  }
  function chordsOn() {
    return _CHORDS_ON;
  }
  function setPlayedAfter(delay) {
    setTimeout(() => {
      _AUDIO_PLAYED = true;
    }, delay);
  }
  function onAudioEnded() {
    _AUDIO_PLAYED = true;
    showOnboardingGuessPrompt();
  }
  function stopCurrentAudio() {
    if (_CURRENT_AUDIO) {
      const [chord] = _CURRENT_AUDIO;
      chord.pause();
      chord.currentTime = 0;
    }
  }
  function _getWeights() {
    if (getCurrentProfile().chord_selection_mode !== "adaptive") {
      return void 0;
    }
    if (_CURRENT_COEFFICIENTS !== null) {
      return _CURRENT_COEFFICIENTS;
    }
    _CURRENT_COEFFICIENTS = getCurrentCoefficients();
    return _CURRENT_COEFFICIENTS;
  }
  function selectNewColor() {
    const weights = _getWeights();
    _CORRECT_COLOR = getTestDeterministicColor() ?? randomElem(getSelectedColors(), weights);
    if (_SELECTED_ELEM !== null) {
      _SELECTED_ELEM.classList.remove("flag-correct");
      _SELECTED_ELEM.classList.remove("flag-incorrect");
      _SELECTED_ELEM = null;
    }
    if (_CORRECT_ELEM !== null) {
      _CORRECT_ELEM.classList.remove("flag-correct");
      _CORRECT_ELEM.classList.remove("flag-incorrect");
      _CORRECT_ELEM = null;
    }
  }
  function populateAudio() {
    selectNewColor();
    stopCurrentAudio();
    const audioFiles = getAudioFiles(getCurrentProfile().current_instrument);
    const files = audioFiles.get(_CORRECT_COLOR);
    if (files) {
      const newAudioFile = randomElem(files);
      const afElem = audioFileElem(newAudioFile, onAudioEnded);
      _CURRENT_AUDIO = [afElem, afElem.duration];
    }
    const playButton = document.getElementById("play-button");
    if (playButton) playButton.classList.remove("deactivated");
    _AUDIO_PLAYED = false;
  }
  function playAudio() {
    const playButton = document.getElementById("play-button");
    if (playButton && playButton.classList.contains("deactivated")) return;
    if (!_CURRENT_AUDIO) return;
    dismissOnboardingStep("play");
    const [chord, duration] = _CURRENT_AUDIO;
    stopCurrentAudio();
    const safeDuration = isNaN(duration) ? 0.8 : duration;
    setPlayedAfter(safeDuration * 0.8);
    chord.play();
  }
  function selectFlagWrapper(wrapperElem) {
    if (_SELECTED_ELEM !== null) return;
    if (!_AUDIO_PLAYED) return;
    const chosenColor = wrapperElem.dataset.color;
    const elem = wrapperElem.querySelector(":scope > .flag");
    if (!chosenColor || !elem) return;
    const flagHolder = document.getElementById("flag-holder");
    _EMOJI_LOCK = true;
    updateStartTimeIfNeeded();
    updateStats(_CORRECT_COLOR, chosenColor);
    updateStatsDisplay();
    const isCorrect = chosenColor === _CORRECT_COLOR;
    if (isCorrect) {
      elem.classList.add("flag-correct");
      setCatEmoji(6);
    } else {
      elem.classList.add("flag-incorrect");
      _CORRECT_ELEM = flagHolder.querySelector(`div[data-color="${_CORRECT_COLOR}"]>div.flag`);
      if (_CORRECT_ELEM) _CORRECT_ELEM.classList.add("flag-correct");
      setCatEmoji(5);
    }
    _SELECTED_ELEM = elem;
    showOnboardingGoNextPrompt(isCorrect);
    if (getCurrentProfile().persist_reaction_face && getCurrentProfile().stats.identifications < getCurrentTargetNumber()) {
      _PERSIST_REACTION_FACE_ENABLED = true;
    } else {
      setTimeout(() => {
        _EMOJI_LOCK = false;
        resetCatEmoji();
      }, 1500);
    }
    if (_CHORDS_ON && getCurrentProfile().reveal_chord_mode === "after_guess") {
      document.getElementById("flag-holder").classList.add("chord-notes");
    }
    const nextButton = document.getElementById("next-chord");
    if (nextButton) nextButton.classList.remove("deactivated");
  }
  function nextAudio() {
    const nextButton = document.getElementById("next-chord");
    if (!nextButton || nextButton.classList.contains("deactivated")) return;
    dismissOnboardingStep("goNext");
    if (_CHORDS_ON && getCurrentProfile().reveal_chord_mode === "after_guess") {
      document.getElementById("flag-holder").classList.remove("chord-notes");
    }
    populateAudio();
    playAudio();
    nextButton.classList.add("deactivated");
  }
  function resetStats(done = true) {
    getCurrentProfile().stats.done = done;
    if (!done || getCurrentProfile().stats.identifications > 0) {
      saveSessionHistory();
    }
    if (_PERSIST_REACTION_FACE_ENABLED && done) {
      resetCatEmoji();
      _PERSIST_REACTION_FACE_ENABLED = false;
      _EMOJI_LOCK = false;
    }
    getCurrentProfile().stats = newStats();
    _CURRENT_COEFFICIENTS = null;
    saveState();
    updateStatsDisplay();
    populateAudio();
    showOnboardingPlayPrompt();
  }
  function retrieveSavedStats() {
    const currentHistory = getCurrentSessionHistory();
    if (currentHistory !== void 0 && currentHistory.length > 0) {
      const lastSession = currentHistory[currentHistory.length - 1];
      if (!lastSession.done) {
        getCurrentProfile().stats = currentHistory.pop();
        if (!isRecent(lastSession.updated_time)) {
          resetStats(true);
        }
      }
    }
    updateStatsDisplay();
  }
  function changeSelector(to) {
    const chordSelector = document.getElementById("chord-selector");
    if (to !== void 0) {
      chordSelector.value = to;
    }
    const currentProfile = getCurrentProfile();
    if (STATE.current_chord !== chordSelector.value) {
      resetStats(false);
      STATE.current_chord = chordSelector.value;
      currentProfile.current_chord = chordSelector.value;
      currentProfile.stats.current_chord = currentProfile.current_chord;
      retrieveSavedStats();
    }
    _COLORS = null;
    _CHORDS_ON = currentProfile.show_chord_mode === "always" || isBlackLevel() && currentProfile.show_chord_mode === "black_only";
    populateFlags(getSelectedColors, chordsOn);
    populateAudio();
    showOnboardingPlayPrompt();
    saveState();
    for (const color of getSelectedColors()) {
      preloadAudio(currentProfile.current_instrument, color, onAudioEnded);
    }
  }
  function changeInstrumentSelector(to) {
    const instrumentSelector = document.getElementById("instrument-selector");
    if (!instrumentSelector) return;
    if (to !== void 0) {
      instrumentSelector.value = to;
    }
    const currentProfile = getCurrentProfile();
    if (currentProfile.current_instrument !== instrumentSelector.value) {
      stopCurrentAudio();
      currentProfile.current_instrument = instrumentSelector.value;
      populateAudio();
      saveState();
      for (const color of getSelectedColors()) {
        preloadAudio(currentProfile.current_instrument, color, onAudioEnded);
      }
    }
  }
  function onTrainerOpen() {
    if (!_TRAINER_PRELOADED) {
      const currentInstrument = getCurrentProfile().current_instrument;
      for (const color of Object.keys(CHORDS_TONE)) {
        preloadAudio(currentInstrument, color, onAudioEnded);
      }
      _TRAINER_PRELOADED = true;
    }
  }
  function playChord(color) {
    playChordFiles(getCurrentProfile().current_instrument, color, onAudioEnded);
  }
  function getEmojiLock() {
    return _EMOJI_LOCK;
  }

  // src/ts/session_cleanup.ts
  function cleanSessionHistory() {
    const fullHistory = getSessionHistory();
    for (const profileHistory of Object.values(fullHistory)) {
      if (profileHistory[""] !== void 0) {
        delete profileHistory[""];
      }
      for (const chord of Object.keys(profileHistory)) {
        profileHistory[chord] = profileHistory[chord].filter(
          (o) => o.identifications || !o.done && isRecent(o.updated_time)
        ).map((o) => {
          if (o.current_chord !== chord) {
            o.current_chord = chord;
          }
          return o;
        }).reduce((accumulator, value) => {
          const lastSession = accumulator[accumulator.length - 1];
          if (lastSession === void 0 || value.identifications !== lastSession.identifications || value.start_time !== lastSession.start_time) {
            accumulator.push(value);
          }
          return accumulator;
        }, []);
      }
    }
    localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(fullHistory));
  }

  // src/ts/nextArrowAnimation.ts
  var NEXT_ARROW_FILL_CLASS = "next-arrow-fill";
  var NEXT_ARROW_FILL_DURATION_PROPERTY = "--next-arrow-fill-duration";
  function getNextArrow() {
    return document.querySelector("#next-chord > i.fa-arrow-right");
  }
  function startNextArrowFill(durationMs) {
    const arrow = getNextArrow();
    if (!arrow) return;
    const duration = Number.isFinite(durationMs) && durationMs > 0 ? durationMs : 0;
    arrow.classList.remove(NEXT_ARROW_FILL_CLASS);
    arrow.style.removeProperty(NEXT_ARROW_FILL_DURATION_PROPERTY);
    void arrow.offsetWidth;
    arrow.style.setProperty(NEXT_ARROW_FILL_DURATION_PROPERTY, `${duration}ms`);
    arrow.classList.add(NEXT_ARROW_FILL_CLASS);
  }
  function resetNextArrowFill() {
    const arrow = getNextArrow();
    if (!arrow) return;
    arrow.classList.remove(NEXT_ARROW_FILL_CLASS);
    arrow.style.removeProperty(NEXT_ARROW_FILL_DURATION_PROPERTY);
  }

  // src/ts/main.ts
  registerGameCallbacks(getEmojiLock, resetStats, changeSelector, onTrainerOpen);
  var w = window;
  w.play_audio = playAudio;
  w.next_audio = nextAudio;
  w.reset_stats = resetStats;
  w.change_selector = changeSelector;
  w.change_instrument_selector = changeInstrumentSelector;
  w.toggle_expansion_bar = toggleExpansionBar;
  w.toggle_trainer_visibility = toggleTrainerVisibility;
  w.toggle_infobox_visibility = toggleInfoboxVisibility;
  w.close_panel = closePanel;
  w.toggle_stats_history_visibility = toggleStatsHistoryVisibility;
  w.toggle_profile_panel = toggleProfilePanel;
  w.open_profile_adder = openProfileAdder;
  w.close_profile_adder = closeProfileAdder;
  w.add_profile = addProfile;
  w.submit_profile_changes = submitProfileChanges;
  w.delete_profile = deleteProfile;
  w.enable_download = enableDownload;
  w.trigger_easter_egg = triggerEasterEgg;
  w.download_state = downloadState;
  w.play_chord = playChord;
  w.show_screen_pinning_info = showScreenPinningInfo;
  w.close_screen_pinning_modal = closeScreenPinningModal;
  w.__bsharp_correct_color = () => _CORRECT_COLOR;
  w.__bsharp_start_next_arrow_fill = startNextArrowFill;
  w.__bsharp_reset_next_arrow_fill = resetNextArrowFill;
  var FLAG_BOUNDARY_SLOP_PX = 10;
  var pendingFlagPointer = null;
  function flagWrapperFromEvent(event, holder) {
    const target = event.target;
    const wrapperElem = target?.closest(".flag-wrapper.visible");
    if (!wrapperElem || !holder.contains(wrapperElem)) return null;
    return wrapperElem;
  }
  function isPointInsideElementBounds(x, y, elem, slopPx = FLAG_BOUNDARY_SLOP_PX) {
    const rect = elem.getBoundingClientRect();
    return x >= rect.left - slopPx && x <= rect.right + slopPx && y >= rect.top - slopPx && y <= rect.bottom + slopPx;
  }
  function installFlagPointerHandling() {
    const holder = document.getElementById("flag-holder");
    if (!holder) return;
    holder.addEventListener("pointerdown", (event) => {
      if (pendingFlagPointer !== null) {
        pendingFlagPointer = null;
        return;
      }
      if (!event.isPrimary) return;
      const wrapperElem = flagWrapperFromEvent(event, holder);
      if (!wrapperElem) return;
      pendingFlagPointer = {
        pointerId: event.pointerId,
        wrapperElem,
        leftOriginalBounds: false
      };
      if (wrapperElem.setPointerCapture) {
        wrapperElem.setPointerCapture(event.pointerId);
      }
    });
    holder.addEventListener("pointermove", (event) => {
      if (!pendingFlagPointer || pendingFlagPointer.pointerId !== event.pointerId) return;
      if (!isPointInsideElementBounds(
        event.clientX,
        event.clientY,
        pendingFlagPointer.wrapperElem
      )) {
        pendingFlagPointer.leftOriginalBounds = true;
      }
    });
    holder.addEventListener("pointerup", (event) => {
      if (!pendingFlagPointer || pendingFlagPointer.pointerId !== event.pointerId) return;
      const pending = pendingFlagPointer;
      pendingFlagPointer = null;
      if (!pending.leftOriginalBounds && isPointInsideElementBounds(event.clientX, event.clientY, pending.wrapperElem)) {
        event.preventDefault();
        stopCurrentAudio();
        selectFlagWrapper(pending.wrapperElem);
      }
    });
    const clearPointer = (event) => {
      if (!pendingFlagPointer || pendingFlagPointer.pointerId !== event.pointerId) return;
      pendingFlagPointer = null;
    };
    holder.addEventListener("pointercancel", clearPointer);
    holder.addEventListener("lostpointercapture", clearPointer);
  }
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest("#play-button, #next-chord")) return;
    if (target.closest("[onclick], button, a, select, input")) {
      stopCurrentAudio();
    }
  }, true);
  document.addEventListener("DOMContentLoaded", function() {
    loadState();
    const profile = getCurrentProfile();
    const stats = profile.stats;
    if (stats !== void 0 && stats.updated_time !== void 0) {
      if (!isRecent(stats.updated_time)) {
        resetStats();
      }
    }
    populateProfileUiElements();
    setChordDisplayMode(profile.chord_display_mode);
    applyColorScheme(profile.color_scheme);
    changeInstrumentSelector(profile.current_instrument);
    changeSelector(profile.current_chord);
    installFlagPointerHandling();
    initOnboarding();
    updateStatsDisplay();
    cleanSessionHistory();
    initActiveState();
  });
})();
