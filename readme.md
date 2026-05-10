# Local Website App

This folder contains the static app for the 12-week physique system. It can run locally or be deployed to HTTPS hosting for phone access.

## Run

From the repository root:

```bash
python3 -m http.server 8765
```

Then open:

```text
http://localhost:8765/app/
```

## What It Does

- Shows the active week and fixed training days.
- Provides session templates for Tuesday, Thursday, Saturday, and Sunday.
- Includes the corrected Sunday Hyrox-like conditioning day.
- Shows nutrition targets, meal structure, calorie cycling, and adjustment rules.
- Saves draft session logs with set/reps/weight/RPE rows, daily nutrition logs, and weekly check-ins in browser local storage.
- Imports MyFitnessPal nutrition CSVs from a selected file or from `04_tracking/myfitnesspal_nutrition.csv`.
- Supports optional Supabase cloud sync from the Cloud screen.
- Includes PWA metadata so it can be added to a phone home screen when hosted over HTTPS.
- Copies logs as Markdown so they can be stored in `05_logs/`.

## Phone Access

Deploy only this `app/` folder, plus the `deploy/` folder if you want the Supabase schema. Do not publish private folders such as `00_profile/`, `04_tracking/*.csv`, or `05_logs/*.md`.

Once deployed over HTTPS:

1. Open the hosted app on your phone.
2. Use the browser share menu to add it to the home screen.
3. Open the Cloud screen.
4. Enter the Supabase project URL and anon key.
5. Sign in and load the cloud backup.

## MyFitnessPal CSV Import

For the fixed-file import button, put the downloaded CSV here:

```text
04_tracking/myfitnesspal_nutrition.csv
```

The app must be opened through the local server for the fixed-file import to work. If opening the app as a `file://` page, use the Choose CSV button instead.

## Storage

Saved logs stay in the current browser until you use the Cloud screen. Use Supabase sync for cross-device access and the export buttons for backups.
