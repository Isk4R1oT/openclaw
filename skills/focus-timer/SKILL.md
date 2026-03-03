---
name: focus-timer
description: >
  Pomodoro-style focus timer for deep study. 50 min focus + 10 min break.
  Use when: user says "start focus timer", "pomodoro", "focus mode",
  "deep work timer", "I need to concentrate".
metadata:
  { "openclaw": { "emoji": "⏳" } }
---

# Focus Timer

Structured focus blocks for deep study sessions.

## Default Schedule
- **Focus block**: 50 minutes (optimized for deep ML study)
- **Short break**: 10 minutes
- **Long break**: 30 minutes (after 4 blocks)

## During Focus Blocks
- Single topic only — no switching
- Deep dive mode: follow the thread wherever it goes
- No context switching to unrelated topics
- If a tangent is interesting: note it for later, don't follow it now

## During Breaks
- Quick flashcard review (5 cards from spaced-repetition)
- Stretch or walk
- Process what was just studied (let it consolidate)
- Check: "What's the most important thing I just learned?"

## Integration
- Sends start/end notifications via Telegram
- Logs focus blocks to study-session
- Tracks total blocks per day: `~/.mentor/focus/YYYY-MM-DD.md`
- After 4 blocks (200 min of focus): "Outstanding session! Take a real break."

## Custom Durations
User can adjust:
- Focus: 25 min (classic Pomodoro) or 50 min (deep work) or 90 min (ultra focus)
- Break: 5-15 min
- Long break: 15-30 min
