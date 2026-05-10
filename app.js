const START_DATE = "2026-05-09";
const STORAGE_KEY = "physique-system-local-v1";
const CLOUD_CONFIG_KEY = "physique-system-cloud-config-v1";
const TRACKING_CSV_PATH = "../04_tracking/myfitnesspal_nutrition.csv";
const CLOUD_TABLE = "fitness_app_state";

const plan = {
  targets: {
    calories: "2,350 kcal/day weekly average",
    trainingCalories: "2,400-2,500 kcal/day",
    nonTrainingCalories: "2,200-2,300 kcal/day",
    protein: "160-180 g/day",
    fat: "55-70 g/day",
    carbs: "240-330 g/day",
    trainingCarbs: "60-90 g before training",
    steps: "10,000-12,000/day",
    training: "Tue, Thu, Sat, Sun",
  },
  meals: ["Breakfast", "Morning snack", "Lunch", "Afternoon snack", "Dinner", "Evening snack"],
  workoutFueling: [
    {
      days: "Tuesday + Thursday",
      time: "18:10-19:10",
      beforeMeal: "Pre-workout afternoon snack",
      beforeMacros: "60-90 g carbs, 25-35 g protein, 5-15 g fat",
      afterMeal: "Post-workout dinner",
      afterMacros: "60-80 g carbs, 40-55 g protein, 15-25 g fat",
      note: "Keep fats and fibre moderate in the snack so training feels light.",
    },
    {
      days: "Saturday",
      time: "10:30-11:30",
      beforeMeal: "Breakfast",
      beforeMacros: "60-90 g carbs, 30-40 g protein, 10-20 g fat",
      afterMeal: "Post-workout morning snack",
      afterMacros: "40-60 g carbs, 25-35 g protein, 0-10 g fat",
      note: "Use the snack to restore carbs without making lunch oversized.",
    },
    {
      days: "Sunday",
      time: "10:30-11:30",
      beforeMeal: "Breakfast",
      beforeMacros: "70-100 g carbs, 30-40 g protein, 10-20 g fat",
      afterMeal: "Post-workout morning snack",
      afterMacros: "60-80 g carbs, 25-35 g protein, 0-10 g fat",
      note: "Use the upper end when Hyrox-like work is hard or run/erg volume is high.",
    },
  ],
  mealMacroSplits: [
    {
      title: "Tuesday + Thursday training days",
      target: "About 2,450 kcal: 175 g protein, 315 g carbs, 55 g fat",
      cue: "Use the afternoon snack as the main pre-workout meal and dinner as the main post-workout meal.",
      rows: [
        ["Breakfast", "35 g", "55 g", "15 g"],
        ["Morning snack", "20 g", "35 g", "5 g"],
        ["Lunch", "35 g", "65 g", "12 g"],
        ["Afternoon snack", "30 g", "80 g", "5 g"],
        ["Dinner", "35 g", "65 g", "15 g"],
        ["Evening snack", "20 g", "15 g", "3 g"],
        ["Total", "175 g", "315 g", "55 g"],
      ],
    },
    {
      title: "Saturday + Sunday morning training days",
      target: "About 2,450 kcal: 175 g protein, 315 g carbs, 55 g fat",
      cue: "Use breakfast as the main pre-workout meal and the morning snack as the main post-workout meal.",
      rows: [
        ["Breakfast", "35 g", "75 g", "15 g"],
        ["Morning snack", "30 g", "65 g", "5 g"],
        ["Lunch", "35 g", "55 g", "10 g"],
        ["Afternoon snack", "25 g", "50 g", "7 g"],
        ["Dinner", "35 g", "50 g", "15 g"],
        ["Evening snack", "15 g", "20 g", "3 g"],
        ["Total", "175 g", "315 g", "55 g"],
      ],
    },
    {
      title: "Non-training days",
      target: "About 2,275 kcal: 175 g protein, 245 g carbs, 66 g fat",
      cue: "Keep the same meal rhythm, let fats rise slightly, and bring carbs down.",
      rows: [
        ["Breakfast", "35 g", "45 g", "15 g"],
        ["Morning snack", "20 g", "25 g", "8 g"],
        ["Lunch", "40 g", "50 g", "15 g"],
        ["Afternoon snack", "25 g", "45 g", "8 g"],
        ["Dinner", "40 g", "55 g", "17 g"],
        ["Evening snack", "15 g", "25 g", "3 g"],
        ["Total", "175 g", "245 g", "66 g"],
      ],
    },
  ],
  sessions: [
    {
      day: "Tuesday",
      shortDay: "Tue",
      title: "Upper A",
      type: "lift",
      focus: "Upper chest, lateral delts, triceps",
      guidance: "Push quality hard sets without turning the session into junk volume.",
      exercises: [
        ["Incline DB press", "1 x 6-8 top set at RPE 8-9; 2 x 8-10 backoff with 10-15% reduction"],
        ["Weighted dips or machine chest press", "2 x 6-10"],
        ["Cable lateral raise", "3 x 12-20"],
        ["Seated DB shoulder press", "2 x 8-10"],
        ["Rope pushdown", "2 x 10-15"],
      ],
    },
    {
      day: "Thursday",
      shortDay: "Thu",
      title: "Lower Strength + Abs",
      type: "lift",
      focus: "Squat pattern, hinge, unilateral legs, abs",
      guidance: "Hard enough to progress, controlled enough to recover before Sunday conditioning.",
      exercises: [
        ["Back squat or hack squat", "1 x 5-6 top set; 2 x 6-8 backoff"],
        ["Romanian deadlift", "2 x 8-10"],
        ["Walking lunge or split squat", "2 x 8-10 per leg"],
        ["Leg curl", "2 x 10-15"],
        ["Calf raise", "3 x 10-15"],
        ["Hanging leg raise or cable crunch", "2-3 x 10-15"],
      ],
    },
    {
      day: "Saturday",
      shortDay: "Sat",
      title: "Upper B",
      type: "lift",
      focus: "Lats, upper back, lateral delts, biceps, triceps, abs",
      guidance: "Prioritise width, arms, and visible torso density before Sunday Hyrox-like work.",
      exercises: [
        ["Weighted pull-up or pulldown", "1 x 5-8 top set; 2 x 6-10 backoff"],
        ["Chest-supported row", "2 x 8-10"],
        ["Lat pulldown or cable row", "2 x 10-12"],
        ["Cable lateral raise", "3 x 12-20"],
        ["Incline DB curl", "2 x 8-12"],
        ["Overhead cable triceps extension", "2 x 10-15"],
        ["Cable crunch or hanging leg raise", "2-3 x 10-15"],
      ],
    },
    {
      day: "Sunday",
      shortDay: "Sun",
      title: "Hyrox-like conditioning",
      type: "cond",
      focus: "Mixed conditioning, carries, erg/run work, sled-style work if available",
      guidance: "Hard but controlled. This is the main conditioning exposure, not an extra add-on.",
      exercises: [
        ["Warm-up", "8-10 minutes easy run, bike, row, or ski erg"],
        ["Block 1", "3-5 rounds of 400-800 m run or 2-3 minutes erg work"],
        ["Block 2", "Farmer carry, suitcase carry, or sled-style push/pull substitute"],
        ["Block 3", "Walking lunges, step-ups, wall-ball, goblet squat, or med-ball work"],
        ["Core finisher", "Plank variation, cable crunch, or hanging knee raise"],
      ],
    },
  ],
  restDays: [
    ["Monday", "Rest / mobility", "Recovery, steps, low stress"],
    ["Wednesday", "Rest / easy walk", "Recovery"],
    ["Friday", "Rest / mobility", "Recovery before the Saturday/Sunday block"],
  ],
  phases: [
    ["Weeks 1-2", "Baseline and calibration", "Set loads, RPE, Sunday Hyrox intensity, photos, and check-in rhythm."],
    ["Weeks 3-4", "Controlled progression", "Add reps or load when rules allow. Prioritise delts, upper chest, lats, and arms."],
    ["Weeks 5-6", "Productive overload", "Push top sets toward RPE 8.5-9. Protect the meal before and after training."],
    ["Weeks 7-8", "Hard but controlled", "Watch sleep, soreness, pump quality, motivation, and joint irritation."],
    ["Week 9", "Deload or fatigue-managed week", "Reduce lifting and Sunday Hyrox intensity if fatigue is elevated."],
    ["Weeks 10-11", "Final overload block", "Resume hard training while preserving abs and recovery."],
    ["Week 12", "Consolidation and review", "Keep sessions sharp, preserve fullness, and complete final photos."],
  ],
};

const docs = [
  ["Profile", "../00_profile/profile.md", "Profile, target-photo interpretation, constraints"],
  ["Goal contract", "../00_profile/goal_contract.md", "Goal, guardrails, review dates"],
  ["Current baseline", "../00_profile/current_baseline.md", "Body, lifts, nutrition, risks"],
  ["12-week plan", "../01_training/12_week_plan.md", "Phases and training logic"],
  ["Weekly split", "../01_training/weekly_split.md", "Training days and schedule"],
  ["Session templates", "../01_training/session_templates.md", "Exercises and prescriptions"],
  ["Nutrition targets", "../02_nutrition/nutrition_targets.md", "Calories and macros"],
  ["Adjustment rules", "../02_nutrition/adjustment_rules.md", "Trend-based decisions"],
  ["Photo protocol", "../04_tracking/photo_protocol.md", "Progress photo rules"],
  ["Weekly check-in", "../03_checkins/weekly_checkin_template.md", "Sunday review template"],
];

const state = loadState();
const views = [...document.querySelectorAll(".view")];
const navButtons = [...document.querySelectorAll(".nav-button")];
const weekSelect = document.querySelector("#week-select");
let cloudConfig = loadCloudConfig();
let cloudClient = null;
let cloudUser = null;
let cloudStatus = "Cloud sync is optional. Configure Supabase to sync between phone and desktop.";

function loadState() {
  const fallback = { week: getInitialWeek(), logs: [], sessionDraft: {}, nutritionDraft: {}, nutritionImport: {}, checkinDraft: {} };
  try {
    const loaded = { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    if (loaded.nutritionImport && loaded.nutritionImport.summary && !("averagePreWorkoutCarbs" in loaded.nutritionImport.summary.training)) {
      loaded.nutritionImport = {};
    }
    return loaded;
  } catch {
    return fallback;
  }
}

function loadCloudConfig() {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCloudConfig() {
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(cloudConfig));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getInitialWeek() {
  const start = new Date(`${START_DATE}T00:00:00`);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.min(12, Math.max(1, Math.floor(diff / 7) + 1));
}

function getTodayName() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long" });
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setHtml(id, html) {
  document.querySelector(`#${id}`).innerHTML = html;
}

function init() {
  for (let i = 1; i <= 12; i += 1) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Week ${i}`;
    weekSelect.appendChild(option);
  }
  weekSelect.value = String(state.week);
  weekSelect.addEventListener("change", () => {
    state.week = Number(weekSelect.value);
    saveState();
    renderAll();
  });

  navButtons.forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  readAuthRedirectStatus();
  registerServiceWorker();
  renderAll();
  refreshCloudUser().then(renderCloud).catch(() => {});
}

function readAuthRedirectStatus() {
  const params = new URLSearchParams(location.hash.replace(/^#/, ""));
  const error = params.get("error_code") || params.get("error");
  if (!error) return;

  if (error === "otp_expired") {
    cloudStatus = "That email link has expired or was already used. Send a fresh reset email from this Cloud tab.";
  } else {
    cloudStatus = params.get("error_description") || "The Supabase email link could not be used.";
  }

  if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
}

function isLocalApp() {
  return location.protocol === "file:" || ["localhost", "127.0.0.1", ""].includes(location.hostname);
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

function showView(id) {
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === id));
  views.forEach((view) => view.classList.toggle("active-view", view.id === id));
}

function renderAll() {
  renderDashboard();
  renderPlan();
  renderTraining();
  renderNutrition();
  renderCloud();
  renderCheckin();
  renderTracking();
  renderLogs();
  renderDocs();
}

function renderDashboard() {
  const today = getTodayName();
  const todaySession = plan.sessions.find((session) => session.day === today);
  const nextSession = todaySession || getNextSession(today);
  const schedule = [...plan.sessions, ...plan.restDays.map(([day, title, focus]) => ({ day, title, focus, type: "rest" }))]
    .sort((a, b) => dayIndex(a.day) - dayIndex(b.day));

  setHtml("dashboard", `
    <div class="split-panel">
      <article class="card">
        <p class="eyebrow">Week ${state.week}</p>
        <h2 class="section-title">${todaySession ? "Today is a training day" : "Next planned session"}</h2>
        <h3>${nextSession.day}: ${nextSession.title}</h3>
        <p>${nextSession.focus}</p>
        <p class="note">Target-photo logic: build upper-body fullness, keep abs visible, and avoid chasing rapid scale gain or a deep cut.</p>
        <div class="button-row">
          <button class="primary" type="button" data-jump-training>Open session</button>
          <button class="secondary" type="button" data-jump-checkin>Weekly check-in</button>
        </div>
      </article>
      <article class="card">
        <p class="eyebrow">Private reference</p>
        <h2 class="section-title">Target Priorities</h2>
        <ul>
          <li>Lateral delts and upper chest.</li>
          <li>Lats, arms, and torso density.</li>
          <li>Visible abs, controlled waist, better photos.</li>
        </ul>
        <p class="note">Progress photos stay outside the deployable app. Keep them in the private Dropbox folder.</p>
      </article>
    </div>

    <div class="grid four">
      ${metricCard("Calories", plan.targets.calories, "Use a weekly average.")}
      ${metricCard("Protein", plan.targets.protein, "Daily anchor.")}
      ${metricCard("Carbs", plan.targets.carbs, "Fuel lifting and Sunday conditioning.")}
      ${metricCard("Steps", plan.targets.steps, "Do not chase above 12k.")}
    </div>

    <article class="card schedule-card">
      <h2 class="section-title">This Week</h2>
      ${schedule.map((item) => scheduleRow(item, item.day === today)).join("")}
    </article>
  `);

  document.querySelector("[data-jump-training]").addEventListener("click", () => showView("training"));
  document.querySelector("[data-jump-checkin]").addEventListener("click", () => showView("checkin"));
}

function metricCard(label, value, subtext) {
  return `<article class="card flat metric"><span>${label}</span><strong>${value}</strong><span>${subtext}</span></article>`;
}

function scheduleRow(item, active) {
  const status = item.type === "lift" ? "lift" : item.type === "cond" ? "cond" : "";
  return `
    <div class="session-row ${active ? "active-day" : ""}">
      <strong>${item.day}</strong>
      <div>
        <strong>${item.title}</strong>
        <small>${item.focus}</small>
      </div>
      <span class="status ${status}">${item.type === "lift" ? "Lift" : item.type === "cond" ? "Hyrox-like" : "Rest"}</span>
    </div>
  `;
}

function renderPlan() {
  const activePhase = phaseForWeek(state.week);
  setHtml("plan", `
    <div class="grid three">
      <article class="card plan-block">
        <p class="eyebrow">Fitness Plan</p>
        <h2 class="section-title">12-Week Physique Target</h2>
        <p>Move visibly closer to the target photo: fuller delts, upper chest, lats, and arms while keeping abs visible.</p>
        <ul class="plan-list">
          <li><strong>Reality check</strong><span>The target is direction of travel, not a literal 12-week endpoint.</span></li>
          <li><strong>Main lever</strong><span>Upper-body hypertrophy plus fullness, leanness, pump, and consistent photos.</span></li>
          <li><strong>Scale target</strong><span>73 kg is longer-term and secondary to waist, abs, and photos.</span></li>
        </ul>
      </article>
      <article class="card plan-block">
        <p class="eyebrow">Gym Plan</p>
        <h2 class="section-title">Training Week</h2>
        <ul class="plan-list">
          <li><strong>Tuesday</strong><span>Upper A: upper chest, delts, triceps.</span></li>
          <li><strong>Thursday</strong><span>Lower Strength + abs, hard but recoverable.</span></li>
          <li><strong>Saturday</strong><span>Upper B: lats, delts, arms, abs.</span></li>
          <li><strong>Sunday</strong><span>Hyrox-like conditioning, controlled hard effort.</span></li>
        </ul>
      </article>
      <article class="card plan-block">
        <p class="eyebrow">Nutrition Plan</p>
        <h2 class="section-title">Targets</h2>
        <ul class="plan-list">
          <li><strong>Weekly average</strong><span>2,350 kcal/day.</span></li>
          <li><strong>Training days</strong><span>2,400-2,500 kcal on Tuesday, Thursday, Saturday, and Sunday.</span></li>
          <li><strong>Non-training days</strong><span>2,200-2,300 kcal on Monday, Wednesday, and Friday.</span></li>
          <li><strong>Protein</strong><span>160-180 g/day.</span></li>
          <li><strong>Fat</strong><span>55-70 g/day.</span></li>
          <li><strong>Carbs</strong><span>Remainder, with the main training carbs placed in the meal before and after training.</span></li>
          <li><strong>Meal split</strong><span>Use the suggested six-meal macro split in the Nutrition tab.</span></li>
        </ul>
      </article>
    </div>

    <article class="card">
      <h2 class="section-title">Meal Structure</h2>
      <div class="grid three">
        ${plan.meals.map((meal) => metricCard(meal, meal === "Afternoon snack" ? "Evening training" : "Meal slot", meal === "Afternoon snack" ? "Tue/Thu pre-workout snack." : "Protein plus useful carbs/fats as needed.")).join("")}
      </div>
    </article>

    <article class="card">
      <h2 class="section-title">Workout Fueling</h2>
      ${workoutFuelingTable()}
      <p class="note">These macros are part of the training-day total, not extra food on top of the 2,400-2,500 kcal target.</p>
    </article>

    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Guardrails</h2>
        <ul>
          <li>No aggressive cut and no uncontrolled high-surplus bulk.</li>
          <li>No rapid scale-gain push to match the target image.</li>
          <li>No extra conditioning on top of Sunday unless recovery and lifting performance are stable.</li>
          <li>If photos look flat and performance drops, restore 100-150 kcal/day from carbohydrates before cutting further.</li>
          <li>Stop and seek help for pain, dizziness, chest pain, unusual shortness of breath, or injury symptoms.</li>
        </ul>
      </article>
      <article class="card">
        <h2 class="section-title">Current Phase</h2>
        <div class="phase-list">
          ${plan.phases.map(([period, title, notes]) => `
            <div class="phase-item ${period === activePhase ? "active" : ""}">
              <strong>${period}: ${title}</strong>
              <p>${notes}</p>
            </div>
          `).join("")}
        </div>
      </article>
    </div>
  `);
}

function workoutFuelingTable() {
  return `
    <table class="exercise-table responsive-table">
      <thead>
        <tr><th>Day</th><th>Training</th><th>Before</th><th>After</th><th>Note</th></tr>
      </thead>
      <tbody>
        ${plan.workoutFueling.map((item) => `
          <tr>
            <td data-label="Day"><strong>${item.days}</strong></td>
            <td data-label="Training">${item.time}</td>
            <td data-label="Before"><strong>${item.beforeMeal}</strong><br>${item.beforeMacros}</td>
            <td data-label="After"><strong>${item.afterMeal}</strong><br>${item.afterMacros}</td>
            <td data-label="Note">${item.note}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function mealMacroSplitSections() {
  return `
    <div class="macro-split-list">
      ${plan.mealMacroSplits.map((split) => `
        <section class="macro-split">
          <div>
            <h3>${split.title}</h3>
            <p>${split.target}</p>
            <p class="muted">${split.cue}</p>
          </div>
          <table class="exercise-table responsive-table compact-table">
            <thead>
              <tr><th>Meal</th><th>Protein</th><th>Carbs</th><th>Fat</th></tr>
            </thead>
            <tbody>
              ${split.rows.map(([meal, protein, carbs, fat]) => `
                <tr class="${meal === "Total" ? "total-row" : ""}">
                  <th data-label="Meal">${meal}</th>
                  <td data-label="Protein">${protein}</td>
                  <td data-label="Carbs">${carbs}</td>
                  <td data-label="Fat">${fat}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </section>
      `).join("")}
    </div>
  `;
}

function renderTraining() {
  const selected = state.selectedSession || plan.sessions[0].day;
  const session = plan.sessions.find((item) => item.day === selected) || plan.sessions[0];
  const draft = getSessionDraft(session.day);
  ensureExerciseSets(session, draft);

  setHtml("training", `
    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Training Days</h2>
        <div class="schedule-card">
          ${plan.sessions.map((item) => `
            <button class="session-row ${item.day === session.day ? "active-day" : ""}" type="button" data-session="${item.day}">
              <strong>${item.shortDay}</strong>
              <div>
                <strong>${item.title}</strong>
                <small>${item.focus}</small>
              </div>
              <span class="status ${item.type === "cond" ? "cond" : "lift"}">${item.type === "cond" ? "Hyrox-like" : "Lift"}</span>
            </button>
          `).join("")}
        </div>
      </article>
      <article class="card">
        <p class="eyebrow">Week ${state.week}</p>
        <h2 class="section-title">${session.day}: ${session.title}</h2>
        <p>${session.guidance}</p>
        <p class="note">${session.type === "cond" ? "Sunday conditioning is fixed. Reduce intensity if lower-body soreness or sleep is poor." : "Use reverse pyramid work on the main lift and keep hard sets clean."}</p>
        ${session.type === "cond" ? readinessBlock(session.day) : progressionBlock()}
      </article>
    </div>

    <article class="card">
      <h2 class="section-title">Session Template</h2>
      ${exerciseTable(session.exercises)}
    </article>

    <article class="card">
      <h2 class="section-title">Session Log</h2>
      <div class="form-grid" id="session-form">
        ${inputField("Date", "date", draft.date || todayIso())}
        ${inputField("Sleep", "sleep", draft.sleep)}
        ${inputField("Energy", "energy", draft.energy)}
        ${inputField("Soreness", "soreness", draft.soreness)}
      </div>
      ${exerciseLog(session, draft)}
      <div class="form-grid session-notes" id="session-notes-form">
        ${inputField("Extra work / interval details", "work", draft.work, true)}
        ${inputField("Notes", "notes", draft.notes, true)}
        ${inputField("Next-session adjustment", "adjustment", draft.adjustment, true)}
      </div>
      <div class="button-row">
        <button class="primary" type="button" data-save-session>Save log</button>
        <button class="secondary" type="button" data-copy-session>Copy Markdown</button>
      </div>
    </article>
  `);

  document.querySelectorAll("[data-session]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSession = button.dataset.session;
      saveState();
      renderTraining();
    });
  });

  document.querySelectorAll("[data-readiness]").forEach((button) => {
    button.addEventListener("click", () => {
      const sessionDraft = getSessionDraft(session.day);
      sessionDraft.readiness = button.dataset.readiness;
      saveState();
      renderTraining();
    });
  });

  bindDraftInputs("session-form", state.sessionDraft[session.day]);
  bindDraftInputs("session-notes-form", state.sessionDraft[session.day]);
  bindSetInputs(session, state.sessionDraft[session.day]);
  document.querySelector("[data-save-session]").addEventListener("click", () => saveSessionLog(session));
  document.querySelector("[data-copy-session]").addEventListener("click", () => copyText(sessionMarkdown(session, getSessionDraft(session.day))));
}

function progressionBlock() {
  return `
    <div class="readiness">
      <strong>Progression decision</strong>
      <div class="readiness-options">
        <span class="pill">Add reps first</span>
        <span class="pill">Increase load at top range</span>
        <span class="pill">Repeat if RPE too high</span>
        <span class="pill">Reduce 5-10% if form breaks</span>
      </div>
    </div>
  `;
}

function readinessBlock(day) {
  const selected = getSessionDraft(day).readiness || "normal";
  const guidance = {
    normal: "Run the planned blocks hard but controlled.",
    tired: "Reduce one block or shorten intervals before increasing intensity.",
    sore: "Keep the session aerobic/technical and avoid heavy lunges or sled-style work.",
  };
  return `
    <div class="readiness">
      <strong>Readiness</strong>
      <div class="readiness-options">
        ${[
          ["normal", "Normal"],
          ["tired", "Tired"],
          ["sore", "Very sore"],
        ].map(([value, label]) => `<button class="chip ${selected === value ? "active" : ""}" type="button" data-readiness="${value}">${label}</button>`).join("")}
      </div>
      <p class="note">${guidance[selected]}</p>
    </div>
  `;
}

function exerciseTable(exercises) {
  return `
    <table class="exercise-table responsive-table">
      <thead><tr><th>Exercise</th><th>Prescription</th></tr></thead>
      <tbody>
        ${exercises.map(([name, details]) => `<tr><td data-label="Exercise"><strong>${name}</strong></td><td data-label="Prescription">${details}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function exerciseLog(session, draft) {
  ensureExerciseSets(session, draft);
  return `
    <div class="exercise-log">
      ${session.exercises.map(([name, details], exerciseIndex) => `
        <section class="exercise-log-card">
          <div class="exercise-log-header">
            <div>
              <strong>${name}</strong>
              <span class="mini-label">${details}</span>
            </div>
            <button class="secondary compact" type="button" data-add-set data-exercise-index="${exerciseIndex}">Add set</button>
          </div>
          <div class="set-table" role="group" aria-label="${escapeHtml(name)} set log">
            <div class="set-row set-head" aria-hidden="true">
              <span>Set</span>
              <span>Weight</span>
              <span>Reps</span>
              <span>RPE</span>
              <span>Done</span>
              <span></span>
            </div>
            ${draft.exercises[name].map((row, setIndex) => setRow(exerciseIndex, setIndex, row)).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function setRow(exerciseIndex, setIndex, row) {
  return `
    <div class="set-row">
      <span class="set-number">${setIndex + 1}</span>
      <input class="set-input" type="text" inputmode="decimal" placeholder="Weight" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" data-set-field="weight" value="${escapeHtml(row.weight || "")}" aria-label="Set ${setIndex + 1} weight">
      <input class="set-input" type="text" inputmode="numeric" placeholder="Reps" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" data-set-field="reps" value="${escapeHtml(row.reps || "")}" aria-label="Set ${setIndex + 1} reps">
      <input class="set-input" type="text" inputmode="decimal" placeholder="RPE" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" data-set-field="rpe" value="${escapeHtml(row.rpe || "")}" aria-label="Set ${setIndex + 1} RPE">
      <label class="done-toggle">
        <input type="checkbox" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" data-set-field="done" ${row.done ? "checked" : ""}>
        <span>Done</span>
      </label>
      <button class="ghost compact" type="button" data-remove-set data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">Remove</button>
    </div>
  `;
}

function bindSetInputs(session, draft) {
  document.querySelectorAll("[data-set-field]").forEach((input) => {
    const update = () => {
      const exercise = session.exercises[Number(input.dataset.exerciseIndex)][0];
      const row = draft.exercises[exercise][Number(input.dataset.setIndex)];
      row[input.dataset.setField] = input.type === "checkbox" ? input.checked : input.value;
      saveState();
    };
    input.addEventListener(input.type === "checkbox" ? "change" : "input", update);
  });

  document.querySelectorAll("[data-add-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = session.exercises[Number(button.dataset.exerciseIndex)][0];
      draft.exercises[exercise].push(emptySet());
      saveState();
      renderTraining();
    });
  });

  document.querySelectorAll("[data-remove-set]").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = session.exercises[Number(button.dataset.exerciseIndex)][0];
      const rows = draft.exercises[exercise];
      if (rows.length <= 1) return;
      rows.splice(Number(button.dataset.setIndex), 1);
      saveState();
      renderTraining();
    });
  });
}

function ensureExerciseSets(session, draft) {
  if (!draft.exercises || Array.isArray(draft.exercises)) {
    draft.exercises = {};
  }
  session.exercises.forEach(([name, details]) => {
    if (!Array.isArray(draft.exercises[name]) || draft.exercises[name].length === 0) {
      draft.exercises[name] = defaultSetRows(details, session.type);
    }
  });
}

function defaultSetRows(details, sessionType) {
  const count = sessionType === "cond" ? 1 : defaultSetCount(details);
  return Array.from({ length: count }, () => emptySet());
}

function defaultSetCount(details) {
  const matches = [...String(details).matchAll(/(\d+)(?:\s*-\s*(\d+))?\s*x/gi)];
  if (matches.length === 0) return 3;
  const total = matches.reduce((sum, match) => {
    const low = Number(match[1]);
    const high = Number(match[2] || match[1]);
    return sum + Math.max(low, high);
  }, 0);
  return Math.min(6, Math.max(1, total));
}

function emptySet() {
  return { weight: "", reps: "", rpe: "", done: false };
}

function inputField(label, key, value = "", wide = false) {
  const escaped = escapeHtml(value || "");
  if (wide) {
    return `
      <label class="field wide">
        <span>${label}</span>
        <textarea data-key="${key}">${escaped}</textarea>
      </label>
    `;
  }
  return `
    <label class="field">
      <span>${label}</span>
      <input type="text" data-key="${key}" value="${escaped}">
    </label>
  `;
}

function bindDraftInputs(formId, draft) {
  const form = document.querySelector(`#${formId}`);
  form.querySelectorAll("[data-key]").forEach((input) => {
    input.addEventListener("input", () => {
      draft[input.dataset.key] = input.value;
      saveState();
    });
  });
}

function getSessionDraft(day) {
  if (!state.sessionDraft[day]) {
    state.sessionDraft[day] = {};
  }
  return state.sessionDraft[day];
}

function saveSessionLog(session) {
  const draft = { ...getSessionDraft(session.day) };
  const log = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    kind: "session",
    week: state.week,
    title: `${session.day} - ${session.title}`,
    date: draft.date || todayIso(),
    markdown: sessionMarkdown(session, draft),
  };
  state.logs.unshift(log);
  state.sessionDraft[session.day] = { date: todayIso() };
  saveState();
  renderAll();
  showToast("Session log saved");
}

function sessionMarkdown(session, draft) {
  ensureExerciseSets(session, draft);
  return `# Week ${state.week} - ${session.day} - ${session.title}

- Date: ${draft.date || todayIso()}
- Session type: ${session.type === "cond" ? "Hyrox-like conditioning" : "Lifting"}
- Sleep: ${draft.sleep || ""}
- Energy: ${draft.energy || ""}
- Soreness: ${draft.soreness || ""}
- Readiness: ${draft.readiness || ""}

## Planned Work

${session.exercises.map(([name, details]) => `- ${name}: ${details}`).join("\n")}

## Logged Work

${exerciseSetsMarkdown(session, draft)}

${draft.work ? `## Extra Work / Interval Details\n\n${draft.work}\n` : ""}

## Notes

${draft.notes || ""}

## Next-Session Adjustment

${draft.adjustment || ""}
`;
}

function exerciseSetsMarkdown(session, draft) {
  return session.exercises.map(([name]) => {
    const rows = draft.exercises[name] || [];
    return `### ${name}

| Set | Weight | Reps | RPE | Done |
|---:|---:|---:|---:|---|
${rows.map((row, index) => `| ${index + 1} | ${row.weight || ""} | ${row.reps || ""} | ${row.rpe || ""} | ${row.done ? "yes" : "no"} |`).join("\n")}`;
  }).join("\n\n");
}

function renderNutrition() {
  const draft = state.nutritionDraft;
  setHtml("nutrition", `
    <div class="grid four">
      ${metricCard("Calories", "2,350", "kcal/day weekly average")}
      ${metricCard("Training days", "2,400-2,500", "Tue, Thu, Sat, Sun")}
      ${metricCard("Non-training days", "2,200-2,300", "Mon, Wed, Fri")}
      ${metricCard("Protein", "160-180 g", "Daily target")}
    </div>
    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Macro Setup</h2>
        <table class="exercise-table responsive-table key-table">
          <tbody>
            <tr><th data-label="Target">Current intake baseline</th><td data-label="Details">2,360 kcal/day; 200 g protein; 278 g carbs; 57 g fat; 34 g fiber</td></tr>
            <tr><th data-label="Target">Training-day calories</th><td data-label="Details">2,400-2,500 kcal on Tuesday, Thursday, Saturday, and Sunday</td></tr>
            <tr><th data-label="Target">Non-training-day calories</th><td data-label="Details">2,200-2,300 kcal on Monday, Wednesday, and Friday</td></tr>
            <tr><th data-label="Target">Carb target</th><td data-label="Details">Remainder of calories, usually about 240-330 g/day</td></tr>
            <tr><th data-label="Target">Training carbs</th><td data-label="Details">Put the main carb dose in the meal before and after training</td></tr>
            <tr><th data-label="Target">Steps</th><td data-label="Details">10,000-12,000/day; do not chase above 12,000</td></tr>
          </tbody>
        </table>
      </article>
      <article class="card">
        <h2 class="section-title">Meal Structure</h2>
        <table class="exercise-table responsive-table key-table">
          <tbody>
            ${plan.meals.map((meal) => `<tr><th data-label="Meal">${meal}</th><td data-label="Use">${meal === "Afternoon snack" ? "Tue/Thu: use as the pre-workout snack." : meal === "Morning snack" ? "Sat/Sun: use as the post-workout snack." : meal === "Breakfast" ? "Sat/Sun: use as the pre-workout meal." : "Use as a consistent meal slot."}</td></tr>`).join("")}
          </tbody>
        </table>
      </article>
    </div>
    <article class="card">
      <h2 class="section-title">Suggested Meal Macro Split</h2>
      ${mealMacroSplitSections()}
      <p class="note">These are planning templates. The daily macro total matters more than hitting every meal exactly, but the pattern keeps protein evenly spread and puts more carbohydrate around training.</p>
    </article>
    <article class="card">
      <h2 class="section-title">Workout Fueling</h2>
      ${workoutFuelingTable()}
      <p class="note">Keep these meals inside the day target: 2,400-2,500 kcal, 160-180 g protein, 55-70 g fat, and carbs as the remainder.</p>
    </article>
    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Daily Nutrition Log</h2>
        <div class="form-grid" id="nutrition-form">
          ${inputField("Date", "date", draft.date || todayIso())}
          ${inputField("Day type", "dayType", draft.dayType || defaultDayType())}
          ${inputField("Calories", "calories", draft.calories)}
          ${inputField("Protein", "protein", draft.protein)}
          ${inputField("Carbs", "carbs", draft.carbs)}
          ${inputField("Fat", "fat", draft.fat)}
          ${inputField("Fiber", "fiber", draft.fiber)}
          ${inputField("Breakfast", "breakfast", draft.breakfast)}
          ${inputField("Morning snack", "morningSnack", draft.morningSnack)}
          ${inputField("Lunch", "lunch", draft.lunch)}
          ${inputField("Workout carb check", "afternoonSnackCarbs", draft.afternoonSnackCarbs)}
          ${inputField("Afternoon snack details", "afternoonSnack", draft.afternoonSnack)}
          ${inputField("Dinner", "dinner", draft.dinner)}
          ${inputField("Evening snack", "eveningSnack", draft.eveningSnack)}
          ${inputField("Pre-workout macros", "preWorkoutMacros", draft.preWorkoutMacros)}
          ${inputField("Post-workout macros", "postWorkoutMacros", draft.postWorkoutMacros)}
          ${inputField("Notes", "notes", draft.notes, true)}
        </div>
        <p class="note">Tue/Thu: pre-workout afternoon snack. Sat/Sun: pre-workout breakfast and post-workout morning snack.</p>
        <div class="button-row">
          <button class="primary" type="button" data-save-nutrition>Save nutrition log</button>
          <button class="secondary" type="button" data-copy-nutrition>Copy Markdown</button>
        </div>
      </article>
      ${nutritionImportCard()}
    </div>
    <article class="card">
      <h2 class="section-title">Decision Rules</h2>
      <ul>
        <li>Review after 14 days using 7-day weight, waist, photos, performance, sleep, and recovery.</li>
        <li>If weight is not falling by 0.15-0.35 kg/week and waist/photos are flat, reduce to about 2,250 kcal/day.</li>
        <li>If weight drops faster than 0.35 kg/week and performance or recovery drops, add 100-150 kcal/day.</li>
        <li>If photos look flatter and pumps are poor, restore 100-150 kcal/day from carbohydrates.</li>
        <li>Do not chase 73 kg if waist or abs move in the wrong direction.</li>
      </ul>
    </article>
  `);

  bindDraftInputs("nutrition-form", state.nutritionDraft);
  document.querySelector("[data-save-nutrition]").addEventListener("click", saveNutritionLog);
  document.querySelector("[data-copy-nutrition]").addEventListener("click", () => copyText(nutritionMarkdown(state.nutritionDraft)));
  bindNutritionImportControls();
}

function nutritionImportCard() {
  const imported = state.nutritionImport || {};
  const canLoadRepositoryCsv = isLocalApp();
  return `
    <article class="card">
      <h2 class="section-title">MyFitnessPal CSV Import</h2>
      <p>${canLoadRepositoryCsv ? "Put a CSV in <code>04_tracking/</code> as <code>myfitnesspal_nutrition.csv</code>, or choose a downloaded export directly." : "Choose a downloaded MyFitnessPal export directly. Private CSV files are not published with the phone app."}</p>
      <div class="button-row import-controls">
        ${canLoadRepositoryCsv ? `<button class="primary" type="button" data-load-default-csv>Load tracking CSV</button>` : ""}
        <label class="secondary file-button">
          Choose CSV
          <input type="file" accept=".csv,text/csv" data-csv-file>
        </label>
        <button class="secondary" type="button" data-apply-import ${imported.summary ? "" : "disabled"}>Use latest day</button>
        <button class="secondary" type="button" data-copy-import ${imported.summary ? "" : "disabled"}>Copy summary</button>
      </div>
      ${imported.summary ? importedNutritionSummary(imported.summary) : `<p class="note">${canLoadRepositoryCsv ? "Static browser apps cannot browse folders automatically. The fixed-file button works when this app is served from the repository root and the CSV filename matches exactly." : "On your phone, use Choose CSV or sync imported data from another signed-in device."}</p>`}
      ${imported.error ? `<p class="note warning">${escapeHtml(imported.error)}</p>` : ""}
      ${imported.warnings && imported.warnings.length ? `<ul class="warning-list">${imported.warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}</ul>` : ""}
    </article>
  `;
}

function importedNutritionSummary(summary) {
  return `
    <div class="grid two import-summary">
      ${metricCard("Tracked days", String(summary.trackedDays), "Rows aggregated by date")}
      ${metricCard("Average calories", formatNumber(summary.averages.calories), "Daily average")}
      ${metricCard("Training days", formatNumber(summary.training.averageCalories), "Calories/day")}
      ${metricCard("Non-training days", formatNumber(summary.nonTraining.averageCalories), "Calories/day")}
    </div>
    <table class="exercise-table responsive-table compact-table key-table">
      <tbody>
        <tr><th data-label="Metric">Protein</th><td data-label="Value">${formatNumber(summary.averages.protein)} g/day</td></tr>
        <tr><th data-label="Metric">Carbs</th><td data-label="Value">${formatNumber(summary.averages.carbs)} g/day</td></tr>
        <tr><th data-label="Metric">Fat</th><td data-label="Value">${formatNumber(summary.averages.fat)} g/day</td></tr>
        <tr><th data-label="Metric">Fiber</th><td data-label="Value">${formatNumber(summary.averages.fiber)} g/day</td></tr>
        <tr><th data-label="Metric">Training pre-workout carbs</th><td data-label="Value">${formatNumber(summary.training.averagePreWorkoutCarbs)} g/day</td></tr>
        <tr><th data-label="Metric">Training post-workout carbs</th><td data-label="Value">${formatNumber(summary.training.averagePostWorkoutCarbs)} g/day</td></tr>
        <tr><th data-label="Metric">Latest day</th><td data-label="Value">${summary.latestDay.date}: ${formatNumber(summary.latestDay.calories)} kcal, ${formatNumber(summary.latestDay.protein)} g protein</td></tr>
      </tbody>
    </table>
  `;
}

function bindNutritionImportControls() {
  document.querySelector("[data-load-default-csv]")?.addEventListener("click", loadDefaultNutritionCsv);
  document.querySelector("[data-csv-file]").addEventListener("change", loadSelectedNutritionCsv);
  document.querySelector("[data-apply-import]").addEventListener("click", applyLatestImportedNutrition);
  document.querySelector("[data-copy-import]").addEventListener("click", () => {
    if (state.nutritionImport.summary) copyText(nutritionImportMarkdown(state.nutritionImport.summary));
  });
}

async function loadDefaultNutritionCsv() {
  if (!isLocalApp()) {
    showToast("Use Choose CSV on the hosted app");
    return;
  }

  try {
    const response = await fetch(TRACKING_CSV_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load ${TRACKING_CSV_PATH}`);
    const text = await response.text();
    setNutritionImport(parseNutritionCsv(text, "04_tracking/myfitnesspal_nutrition.csv"));
  } catch (error) {
    state.nutritionImport = {
      error: `${error.message}. Choose a CSV manually or place it at 04_tracking/myfitnesspal_nutrition.csv and run the app from the repository root server.`,
    };
    saveState();
    renderNutrition();
  }
}

async function loadSelectedNutritionCsv(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const text = await file.text();
  setNutritionImport(parseNutritionCsv(text, file.name));
}

function setNutritionImport(result) {
  state.nutritionImport = result;
  saveState();
  renderNutrition();
  showToast(result.summary ? "CSV imported" : "CSV import needs attention");
}

function parseNutritionCsv(text, source) {
  try {
    const rows = csvToRows(text);
    if (rows.length < 2) {
      return { source, error: "CSV is empty or missing data rows." };
    }
    const headers = rows[0].map(normalizeHeader);
    const records = rows.slice(1)
      .map((row) => recordFromRow(headers, row))
      .filter((record) => record.date);
    if (records.length === 0) {
      return { source, error: "No rows with a Date column were found." };
    }
    const warnings = [];
    const required = ["date", "meal", "calories", "carbs", "fat", "protein"];
    required.forEach((column) => {
      if (!headers.includes(column)) warnings.push(`Missing expected column: ${column}`);
    });
    const summary = summarizeNutritionRecords(records);
    summary.source = source;
    return { source, summary, warnings };
  } catch (error) {
    return { source, error: error.message };
  }
}

function csvToRows(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted && char === '"' && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (!quoted && char === ",") {
      row.push(value);
      value = "";
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
}

function normalizeHeader(header) {
  const clean = cleanText(header).toLowerCase();
  if (clean === "date") return "date";
  if (clean === "meal") return "meal";
  if (clean === "calories") return "calories";
  if (clean === "carbohydrates (g)" || clean === "carbs" || clean === "carbohydrates") return "carbs";
  if (clean === "fat (g)" || clean === "fat") return "fat";
  if (clean === "protein (g)" || clean === "protein") return "protein";
  if (clean === "fiber" || clean === "fiber (g)") return "fiber";
  return clean;
}

function recordFromRow(headers, row) {
  const record = {};
  headers.forEach((header, index) => {
    record[header] = row[index] || "";
  });
  return {
    date: normalizeDate(record.date),
    meal: normalizeMeal(record.meal),
    calories: parseCsvNumber(record.calories),
    carbs: parseCsvNumber(record.carbs),
    fat: parseCsvNumber(record.fat),
    protein: parseCsvNumber(record.protein),
    fiber: parseCsvNumber(record.fiber),
  };
}

function normalizeDate(value) {
  const clean = cleanText(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
  const match = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (!match) return clean;
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${year}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function normalizeMeal(value) {
  const meal = cleanText(value).toLowerCase();
  if (meal.includes("breakfast")) return "Breakfast";
  if (meal.includes("lunch")) return "Lunch";
  if (meal.includes("dinner")) return "Dinner";
  if (meal.includes("snack 1")) return "Morning snack";
  if (meal.includes("snack 2")) return "Afternoon snack";
  if (meal.includes("snack 3")) return "Evening snack";
  if (meal === "snacks" || meal === "snack") return "Afternoon snack";
  return cleanText(value) || "Unlabelled";
}

function cleanText(value) {
  return String(value || "")
    .normalize("NFKC")
    .replaceAll("Â", "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsvNumber(value) {
  const clean = cleanText(value).replaceAll(",", "");
  if (!clean) return 0;
  const number = Number(clean);
  return Number.isFinite(number) ? number : 0;
}

function summarizeNutritionRecords(records) {
  const byDate = {};
  records.forEach((record) => {
    if (!byDate[record.date]) {
      byDate[record.date] = {
        date: record.date,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        meals: {},
      };
    }
    const day = byDate[record.date];
    day.calories += record.calories;
    day.protein += record.protein;
    day.carbs += record.carbs;
    day.fat += record.fat;
    day.fiber += record.fiber;
    if (!day.meals[record.meal]) {
      day.meals[record.meal] = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
    }
    day.meals[record.meal].calories += record.calories;
    day.meals[record.meal].protein += record.protein;
    day.meals[record.meal].carbs += record.carbs;
    day.meals[record.meal].fat += record.fat;
    day.meals[record.meal].fiber += record.fiber;
  });

  const days = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
  const trainingDays = days.filter((day) => isTrainingDate(day.date));
  const nonTrainingDays = days.filter((day) => !isTrainingDate(day.date));
  const latestDay = days[days.length - 1];
  return {
    trackedDays: days.length,
    rows: records.length,
    dateRange: `${days[0].date} to ${latestDay.date}`,
    averages: macroAverages(days),
    training: {
      days: trainingDays.length,
      averageCalories: average(trainingDays, "calories"),
      averagePreWorkoutCarbs: averageWorkoutMealCarbs(trainingDays, "before"),
      averagePostWorkoutCarbs: averageWorkoutMealCarbs(trainingDays, "after"),
    },
    nonTraining: {
      days: nonTrainingDays.length,
      averageCalories: average(nonTrainingDays, "calories"),
    },
    latestDay,
  };
}

function macroAverages(days) {
  return {
    calories: average(days, "calories"),
    protein: average(days, "protein"),
    carbs: average(days, "carbs"),
    fat: average(days, "fat"),
    fiber: average(days, "fiber"),
  };
}

function average(days, key) {
  if (days.length === 0) return 0;
  return days.reduce((sum, day) => sum + (day[key] || 0), 0) / days.length;
}

function averageWorkoutMealCarbs(days, timing) {
  if (days.length === 0) return 0;
  return days.reduce((sum, day) => {
    const mealName = workoutMealNames(day.date)[timing];
    return sum + ((day.meals[mealName] && day.meals[mealName].carbs) || 0);
  }, 0) / days.length;
}

function workoutMealNames(date) {
  const day = new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long" });
  if (day === "Tuesday" || day === "Thursday") return { before: "Afternoon snack", after: "Dinner" };
  if (day === "Saturday" || day === "Sunday") return { before: "Breakfast", after: "Morning snack" };
  return { before: "Afternoon snack", after: "Dinner" };
}

function isTrainingDate(date) {
  const day = new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long" });
  return plan.sessions.some((session) => session.day === day);
}

function applyLatestImportedNutrition() {
  const summary = state.nutritionImport && state.nutritionImport.summary;
  if (!summary) return;
  const day = summary.latestDay;
  state.nutritionDraft = {
    ...state.nutritionDraft,
    date: day.date,
    dayType: isTrainingDate(day.date) ? "Training day" : "Non-training day",
    calories: formatNumber(day.calories),
    protein: `${formatNumber(day.protein)} g`,
    carbs: `${formatNumber(day.carbs)} g`,
    fat: `${formatNumber(day.fat)} g`,
    fiber: `${formatNumber(day.fiber)} g`,
    breakfast: mealSummary(day.meals.Breakfast),
    morningSnack: mealSummary(day.meals["Morning snack"]),
    lunch: mealSummary(day.meals.Lunch),
    afternoonSnack: mealSummary(day.meals["Afternoon snack"]),
    afternoonSnackCarbs: latestWorkoutCarbCheck(day),
    dinner: mealSummary(day.meals.Dinner),
    eveningSnack: mealSummary(day.meals["Evening snack"]),
    preWorkoutMacros: mealSummary(day.meals[workoutMealNames(day.date).before]),
    postWorkoutMacros: mealSummary(day.meals[workoutMealNames(day.date).after]),
  };
  saveState();
  renderNutrition();
  showToast("Latest imported day applied");
}

function mealSummary(meal) {
  if (!meal) return "";
  return `${formatNumber(meal.calories)} kcal; ${formatNumber(meal.protein)} g protein; ${formatNumber(meal.carbs)} g carbs; ${formatNumber(meal.fat)} g fat`;
}

function latestWorkoutCarbCheck(day) {
  const meals = workoutMealNames(day.date);
  const beforeCarbs = (day.meals[meals.before] && day.meals[meals.before].carbs) || 0;
  const afterCarbs = (day.meals[meals.after] && day.meals[meals.after].carbs) || 0;
  return `Pre: ${formatNumber(beforeCarbs)} g; post: ${formatNumber(afterCarbs)} g`;
}

function nutritionImportMarkdown(summary) {
  return `# MyFitnessPal Nutrition Summary

- Source: ${summary.source || ""}
- Date range: ${summary.dateRange}
- Tracked days: ${summary.trackedDays}
- Rows imported: ${summary.rows}
- Average calories: ${formatNumber(summary.averages.calories)}
- Training-day calorie average: ${formatNumber(summary.training.averageCalories)}
- Non-training-day calorie average: ${formatNumber(summary.nonTraining.averageCalories)}
- Average protein: ${formatNumber(summary.averages.protein)} g
- Average carbs: ${formatNumber(summary.averages.carbs)} g
- Average fat: ${formatNumber(summary.averages.fat)} g
- Average fiber: ${formatNumber(summary.averages.fiber)} g
- Training-day pre-workout carbs: ${formatNumber(summary.training.averagePreWorkoutCarbs)} g
- Training-day post-workout carbs: ${formatNumber(summary.training.averagePostWorkoutCarbs)} g

## Interpretation

- Training-day calorie target: 2,400-2,500 kcal.
- Non-training-day calorie target: 2,200-2,300 kcal.
- Tue/Thu pre-workout target: 60-90 g carbs in the afternoon snack.
- Sat/Sun pre-workout target: 60-100 g carbs in breakfast, depending on session demand.
- Post-workout target: 40-80 g carbs, depending on day and session demand.
`;
}

function formatNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return String(Math.round(number * 10) / 10);
}

function defaultDayType() {
  return plan.sessions.some((session) => session.day === getTodayName()) ? "Training day" : "Non-training day";
}

function saveNutritionLog() {
  const draft = { ...state.nutritionDraft };
  const log = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    kind: "nutrition",
    week: state.week,
    title: `${draft.date || todayIso()} nutrition`,
    date: draft.date || todayIso(),
    markdown: nutritionMarkdown(draft),
  };
  state.logs.unshift(log);
  state.nutritionDraft = { date: todayIso(), dayType: defaultDayType() };
  saveState();
  renderAll();
  showToast("Nutrition log saved");
}

function nutritionMarkdown(draft) {
  return `# Nutrition Log - ${draft.date || todayIso()}

- Week: ${state.week}
- Day type: ${draft.dayType || defaultDayType()}
- Calories: ${draft.calories || ""}
- Protein: ${draft.protein || ""}
- Carbs: ${draft.carbs || ""}
- Fat: ${draft.fat || ""}
- Fiber: ${draft.fiber || ""}

## Meals

- Breakfast: ${draft.breakfast || ""}
- Morning snack: ${draft.morningSnack || ""}
- Lunch: ${draft.lunch || ""}
- Afternoon snack: ${draft.afternoonSnack || ""}
- Workout carb check: ${draft.afternoonSnackCarbs || ""}
- Dinner: ${draft.dinner || ""}
- Evening snack: ${draft.eveningSnack || ""}
- Pre-workout macros: ${draft.preWorkoutMacros || ""}
- Post-workout macros: ${draft.postWorkoutMacros || ""}

## Notes

${draft.notes || ""}

## Workout Fueling Rule

Tue/Thu: pre-workout afternoon snack, then post-workout dinner.
Sat/Sun: pre-workout breakfast, then post-workout morning snack.
`;
}

function renderCheckin() {
  const draft = state.checkinDraft;
  setHtml("checkin", `
    <article class="card">
      <h2 class="section-title">Weekly Check-In</h2>
      <div class="form-grid" id="checkin-form">
        ${inputField("Week number", "week", draft.week || String(state.week))}
        ${inputField("Average weight", "averageWeight", draft.averageWeight)}
        ${inputField("Waist at navel", "waist", draft.waist)}
        ${inputField("Calories average", "calories", draft.calories)}
        ${inputField("Training-day calorie average", "trainingCalories", draft.trainingCalories)}
        ${inputField("Non-training-day calorie average", "nonTrainingCalories", draft.nonTrainingCalories)}
        ${inputField("Protein average", "protein", draft.protein)}
        ${inputField("Carbs average", "carbs", draft.carbs)}
        ${inputField("Fat average", "fat", draft.fat)}
        ${inputField("Fiber average", "fiber", draft.fiber)}
        ${inputField("MyFitnessPal tracked days", "trackedDays", draft.trackedDays)}
        ${inputField("Workout fueling adherence", "afternoonSnackCarbs", draft.afternoonSnackCarbs)}
        ${inputField("Average steps", "steps", draft.steps)}
        ${inputField("Average sleep", "sleep", draft.sleep)}
        ${inputField("Energy / stress / hunger", "recovery", draft.recovery, true)}
        ${inputField("Training performance", "performance", draft.performance, true)}
        ${inputField("Physique observations", "physique", draft.physique, true)}
        ${inputField("Adjustments required", "adjustments", draft.adjustments, true)}
      </div>
      <div class="button-row">
        <button class="primary" type="button" data-save-checkin>Save check-in</button>
        <button class="secondary" type="button" data-copy-checkin>Copy Markdown</button>
      </div>
    </article>
    <article class="card">
      <h2 class="section-title">Review Lens</h2>
      <ul>
        <li>Is the physique moving closer through real changes, better fullness, and better photo consistency?</li>
        <li>Are abs visible and waist controlled?</li>
        <li>Are Tuesday and Saturday upper sessions progressing or holding steady?</li>
        <li>Is Sunday Hyrox-like work helping conditioning without flattening recovery?</li>
        <li>Did training days hit the higher calorie range and the workout-fueling meal targets?</li>
      </ul>
    </article>
  `);

  bindDraftInputs("checkin-form", state.checkinDraft);
  document.querySelector("[data-save-checkin]").addEventListener("click", saveCheckinLog);
  document.querySelector("[data-copy-checkin]").addEventListener("click", () => copyText(checkinMarkdown(state.checkinDraft)));
}

function renderTracking() {
  setHtml("tracking", `
    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Daily Minimum</h2>
        <ul>
          <li>Morning body weight.</li>
          <li>Protein intake.</li>
          <li>Calories if tracking.</li>
          <li>Steps, target 10,000-12,000/day.</li>
          <li>Sleep.</li>
          <li>Workout log on Tuesday, Thursday, Saturday, and Sunday.</li>
        </ul>
      </article>
      <article class="card">
        <h2 class="section-title">Weekly Review</h2>
        <ul>
          <li>7-day average body weight.</li>
          <li>Waist at navel.</li>
          <li>Progress photos, same conditions.</li>
          <li>Training performance summary.</li>
          <li>Average sleep, steps, calories, and protein.</li>
          <li>Fatigue, pump quality, and visible abs.</li>
        </ul>
      </article>
    </div>
    <article class="card">
      <h2 class="section-title">Photo Protocol</h2>
      <p>Take photos weekly: morning, after bathroom, before food, same lighting, same distance, same camera height, same location, same clothing.</p>
      <div class="grid three">
        ${metricCard("Pose 1", "Front relaxed", "Compare shape and waist.")}
        ${metricCard("Pose 2", "Side relaxed", "Compare torso and waist.")}
        ${metricCard("Pose 3", "Front flexed", "Compare abs, delts, chest, arms.")}
      </div>
      <p class="note">Use weekly photos for capture and biweekly/monthly photos for formal comparison. Do not overreact to one flat photo.</p>
    </article>
  `);
}

function renderCloud() {
  const configured = Boolean(cloudConfig.url && cloudConfig.anonKey);
  setHtml("cloud", `
    <div class="grid two">
      <article class="card">
        <h2 class="section-title">Cloud Sync</h2>
        <p>Use this when the app is hosted online and you want the same logs on your phone and desktop. Data stays local until you configure Supabase and save a cloud backup.</p>
        <div class="form-grid" id="cloud-config-form">
          ${inputField("Supabase project URL", "url", cloudConfig.url || "", true)}
          ${inputField("Supabase anon key", "anonKey", cloudConfig.anonKey || "", true)}
        </div>
        <div class="button-row">
          <button class="primary" type="button" data-save-cloud-config>Save cloud settings</button>
          <button class="secondary" type="button" data-clear-cloud-config>Clear settings</button>
        </div>
        <p class="note">The anon key is designed to be public, but your personal logs remain protected only if Supabase Auth and Row Level Security are configured using the schema in <code>deploy/supabase_schema.sql</code>.</p>
      </article>

      <article class="card">
        <h2 class="section-title">Account</h2>
        <div class="form-grid" id="cloud-auth-form">
          ${inputField("Email", "email", cloudConfig.email || "")}
          ${passwordField("Password", "password")}
        </div>
        <div class="button-row">
          <button class="primary" type="button" data-cloud-signin ${configured ? "" : "disabled"}>Sign in</button>
          <button class="secondary" type="button" data-cloud-signup ${configured ? "" : "disabled"}>Create account</button>
          <button class="ghost" type="button" data-cloud-signout ${cloudUser ? "" : "disabled"}>Sign out</button>
        </div>
        <div class="button-row">
          <button class="secondary" type="button" data-cloud-reset-email ${configured ? "" : "disabled"}>Send reset email</button>
          <button class="secondary" type="button" data-cloud-update-password ${cloudUser ? "" : "disabled"}>Set new password</button>
        </div>
        <p class="mini-label">For password reset: send the email, open the fresh link, enter a new password here, then set it.</p>
        <p class="mini-label">${cloudUser ? `Signed in as ${escapeHtml(cloudUser.email || cloudUser.id)}` : "Not signed in"}</p>
        <p class="note">${escapeHtml(cloudStatus)}</p>
      </article>
    </div>

    <article class="card">
      <h2 class="section-title">Sync Data</h2>
      <p>Use Save to cloud after logging sessions or nutrition. On your phone, sign in and use Load from cloud to bring the latest backup onto that device.</p>
      <div class="button-row">
        <button class="primary" type="button" data-cloud-save ${cloudUser ? "" : "disabled"}>Save local data to cloud</button>
        <button class="secondary" type="button" data-cloud-load ${cloudUser ? "" : "disabled"}>Load cloud data onto this device</button>
        <button class="secondary" type="button" data-export-json>Export JSON backup</button>
      </div>
    </article>

    <article class="card">
      <h2 class="section-title">Phone Setup</h2>
      <ol>
        <li>Deploy the <code>app/</code> folder to HTTPS hosting such as GitHub Pages, Cloudflare Pages, or Netlify.</li>
        <li>Create a Supabase project and run <code>deploy/supabase_schema.sql</code>.</li>
        <li>Open the hosted URL on your phone, add it to the home screen, enter the Supabase URL/key, and sign in.</li>
        <li>Save local data to cloud from desktop; load cloud data on the phone.</li>
      </ol>
    </article>
  `);

  bindCloudControls();
}

function bindCloudControls() {
  const configForm = document.querySelector("#cloud-config-form");
  if (configForm) {
    configForm.querySelectorAll("[data-key]").forEach((input) => {
      input.addEventListener("input", () => {
        cloudConfig[input.dataset.key] = input.value.trim();
      });
    });
  }

  const authForm = document.querySelector("#cloud-auth-form");
  if (authForm) {
    authForm.querySelectorAll("[data-key]").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.dataset.key === "email") cloudConfig.email = input.value.trim();
      });
    });
  }

  document.querySelector("[data-save-cloud-config]").addEventListener("click", handleSaveCloudConfig);
  document.querySelector("[data-clear-cloud-config]").addEventListener("click", handleClearCloudConfig);
  document.querySelector("[data-cloud-signin]").addEventListener("click", handleCloudSignin);
  document.querySelector("[data-cloud-signup]").addEventListener("click", handleCloudSignup);
  document.querySelector("[data-cloud-signout]").addEventListener("click", handleCloudSignout);
  document.querySelector("[data-cloud-reset-email]").addEventListener("click", handleCloudResetEmail);
  document.querySelector("[data-cloud-update-password]").addEventListener("click", handleCloudUpdatePassword);
  document.querySelector("[data-cloud-save]").addEventListener("click", saveCloudBackup);
  document.querySelector("[data-cloud-load]").addEventListener("click", loadCloudBackup);
  document.querySelector("#cloud [data-export-json]").addEventListener("click", exportJson);
}

function passwordField(label, key) {
  return `
    <label class="field">
      <span>${label}</span>
      <input type="password" data-key="${key}" autocomplete="current-password">
    </label>
  `;
}

async function handleSaveCloudConfig() {
  saveCloudConfig();
  cloudClient = null;
  cloudStatus = "Cloud settings saved on this device.";
  await refreshCloudUser();
  renderCloud();
}

function handleClearCloudConfig() {
  cloudConfig = {};
  cloudClient = null;
  cloudUser = null;
  localStorage.removeItem(CLOUD_CONFIG_KEY);
  cloudStatus = "Cloud settings cleared on this device.";
  renderCloud();
}

function getCloudClient() {
  if (!cloudConfig.url || !cloudConfig.anonKey) throw new Error("Add Supabase URL and anon key first.");
  if (!window.supabase || !window.supabase.createClient) throw new Error("Supabase client did not load. Check your internet connection.");
  if (!cloudClient) {
    cloudClient = window.supabase.createClient(cloudConfig.url, cloudConfig.anonKey);
  }
  return cloudClient;
}

async function refreshCloudUser() {
  if (!cloudConfig.url || !cloudConfig.anonKey || !window.supabase) return;
  const client = getCloudClient();
  const { data, error } = await client.auth.getUser();
  if (!error) cloudUser = data.user;
}

function cloudAuthValues() {
  const form = document.querySelector("#cloud-auth-form");
  return {
    email: form.querySelector('[data-key="email"]').value.trim(),
    password: form.querySelector('[data-key="password"]').value,
  };
}

function cloudRedirectUrl() {
  const path = location.pathname.endsWith("/") ? location.pathname : location.pathname.replace(/\/[^/]*$/, "/");
  return `${location.origin}${path}`;
}

async function handleCloudSignin() {
  try {
    const { email, password } = cloudAuthValues();
    const { data, error } = await getCloudClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
    cloudUser = data.user;
    cloudConfig.email = email;
    saveCloudConfig();
    cloudStatus = "Signed in. You can now save or load cloud data.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

async function handleCloudSignup() {
  try {
    const { email, password } = cloudAuthValues();
    const { data, error } = await getCloudClient().auth.signUp({
      email,
      password,
      options: { emailRedirectTo: cloudRedirectUrl() },
    });
    if (error) throw error;
    cloudUser = data.user;
    cloudConfig.email = email;
    saveCloudConfig();
    cloudStatus = "Account created. If email confirmation is enabled, confirm the email, then return here to sign in.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

async function handleCloudResetEmail() {
  try {
    const { email } = cloudAuthValues();
    if (!email) throw new Error("Enter your email address first.");
    const { error } = await getCloudClient().auth.resetPasswordForEmail(email, {
      redirectTo: cloudRedirectUrl(),
    });
    if (error) throw error;
    cloudConfig.email = email;
    saveCloudConfig();
    cloudStatus = "Password reset email sent. Open the newest email link, then return here to set a new password.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

async function handleCloudUpdatePassword() {
  try {
    const { password } = cloudAuthValues();
    if (!password || password.length < 8) throw new Error("Enter a new password of at least 8 characters.");
    await refreshCloudUser();
    if (!cloudUser) throw new Error("Open the fresh password reset email link first, then set the new password here.");
    const { error } = await getCloudClient().auth.updateUser({ password });
    if (error) throw error;
    cloudStatus = "Password updated. You can sign in with the new password.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

async function handleCloudSignout() {
  try {
    await getCloudClient().auth.signOut();
    cloudUser = null;
    cloudStatus = "Signed out.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

function appStateForCloud() {
  return JSON.parse(JSON.stringify(state));
}

async function saveCloudBackup() {
  try {
    await refreshCloudUser();
    if (!cloudUser) throw new Error("Sign in before saving cloud data.");
    const { error } = await getCloudClient()
      .from(CLOUD_TABLE)
      .upsert({
        user_id: cloudUser.id,
        app_state: appStateForCloud(),
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    if (error) throw error;
    cloudStatus = "Cloud backup saved.";
  } catch (error) {
    cloudStatus = error.message;
  }
  renderCloud();
}

async function loadCloudBackup() {
  try {
    await refreshCloudUser();
    if (!cloudUser) throw new Error("Sign in before loading cloud data.");
    const confirmed = window.confirm("Replace this device's local app data with the cloud backup?");
    if (!confirmed) return;
    const { data, error } = await getCloudClient()
      .from(CLOUD_TABLE)
      .select("app_state, updated_at")
      .eq("user_id", cloudUser.id)
      .maybeSingle();
    if (error) throw error;
    if (!data || !data.app_state) throw new Error("No cloud backup found.");
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, data.app_state);
    saveState();
    cloudStatus = `Cloud backup loaded${data.updated_at ? ` from ${new Date(data.updated_at).toLocaleString()}` : ""}.`;
    renderAll();
  } catch (error) {
    cloudStatus = error.message;
    renderCloud();
  }
}

function saveCheckinLog() {
  const log = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    kind: "checkin",
    week: state.week,
    title: `Week ${state.checkinDraft.week || state.week} check-in`,
    date: todayIso(),
    markdown: checkinMarkdown(state.checkinDraft),
  };
  state.logs.unshift(log);
  state.checkinDraft = {};
  saveState();
  renderAll();
  showToast("Check-in saved");
}

function checkinMarkdown(draft) {
  return `# Week ${draft.week || state.week} Check-In

## Body Composition

- Average weight: ${draft.averageWeight || ""}
- Waist at navel: ${draft.waist || ""}

## Nutrition

- Calories average: ${draft.calories || ""}
- Training-day calorie average: ${draft.trainingCalories || ""}
- Non-training-day calorie average: ${draft.nonTrainingCalories || ""}
- Protein average: ${draft.protein || ""}
- Carbs average: ${draft.carbs || ""}
- Fat average: ${draft.fat || ""}
- Fiber average: ${draft.fiber || ""}
- MyFitnessPal tracked days: ${draft.trackedDays || ""}
- Workout fueling adherence: ${draft.afternoonSnackCarbs || ""}
- Average steps: ${draft.steps || ""}
- Average sleep: ${draft.sleep || ""}

## Recovery

${draft.recovery || ""}

## Training Performance

${draft.performance || ""}

## Physique Observations

${draft.physique || ""}

## Required Adjustments

${draft.adjustments || ""}
`;
}

function renderLogs() {
  if (state.logs.length === 0) {
    setHtml("logs", `
      <article class="card">
        <h2 class="section-title">Saved Logs</h2>
        <p>No local logs yet. Save a session, nutrition log, or weekly check-in to see it here.</p>
      </article>
    `);
    return;
  }

  setHtml("logs", `
    <article class="card">
      <h2 class="section-title">Saved Logs</h2>
      <p>Logs are stored in this browser only. Use Copy Markdown and place important entries in <code>05_logs/</code>.</p>
      <div class="button-row">
        <button class="secondary" type="button" data-export-json>Export JSON</button>
        <button class="ghost" type="button" data-clear-logs>Clear local logs</button>
      </div>
    </article>
    <div class="log-list">
      ${state.logs.map((log) => `
        <article class="log-item">
          <div>
            <strong>${escapeHtml(log.title || "Untitled log")}</strong>
            <span class="mini-label">${escapeHtml(log.date || "")} - Week ${escapeHtml(log.week || "")} - ${escapeHtml(log.kind || "")}</span>
          </div>
          <button class="secondary" type="button" data-copy-log="${escapeHtml(log.id)}">Copy</button>
        </article>
      `).join("")}
    </div>
  `);

  document.querySelectorAll("[data-copy-log]").forEach((button) => {
    button.addEventListener("click", () => {
      const log = state.logs.find((item) => item.id === button.dataset.copyLog);
      if (log) copyText(log.markdown);
    });
  });
  document.querySelector("#logs [data-export-json]").addEventListener("click", exportJson);
  document.querySelector("#logs [data-clear-logs]").addEventListener("click", clearLogs);
}

function renderDocs() {
  const linksAreAvailable = isLocalApp();
  setHtml("docs", `
    <article class="card">
      <h2 class="section-title">Markdown Source Files</h2>
      <p>${linksAreAvailable ? "The app is a friendly layer over the Markdown system. These files remain the source of truth." : "The phone app publishes only app files. The private Markdown system remains in the Dropbox folder."}</p>
    </article>
    <div class="doc-list">
      ${docs.map(([title, href, desc]) => linksAreAvailable ? `
          <a class="doc-link" href="${href}" target="_blank" rel="noreferrer">
            <strong>${title}</strong>
            <span class="mini-label">${desc}</span>
          </a>
        ` : `
          <article class="doc-link">
            <strong>${title}</strong>
            <span class="mini-label">${href.replace("../", "")} - ${desc}</span>
          </article>
        `).join("")}
    </div>
  `);
}

function dayIndex(day) {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(day);
}

function getNextSession(today) {
  const todayIdx = dayIndex(today);
  return plan.sessions
    .map((session) => ({ ...session, delta: (dayIndex(session.day) - todayIdx + 7) % 7 }))
    .sort((a, b) => a.delta - b.delta)[0];
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Markdown copied");
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast("Markdown copied");
  }
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state.logs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `physique-system-logs-week-${state.week}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function clearLogs() {
  const confirmed = window.confirm("Clear local browser logs? Markdown files in 05_logs are not affected.");
  if (!confirmed) return;
  state.logs = [];
  saveState();
  renderLogs();
}

function phaseForWeek(week) {
  if (week <= 2) return "Weeks 1-2";
  if (week <= 4) return "Weeks 3-4";
  if (week <= 6) return "Weeks 5-6";
  if (week <= 8) return "Weeks 7-8";
  if (week === 9) return "Week 9";
  if (week <= 11) return "Weeks 10-11";
  return "Week 12";
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const toast = el("div", "toast", message);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

init();
