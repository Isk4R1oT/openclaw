---
name: study-session
description: >
  Manage structured AI/ML learning sessions with time tracking, detailed logging,
  and progress summaries. Use when: user says "start session", "let's study",
  "begin today's session", "track my learning time", "end session", "how long today",
  "what did we cover", "session summary". Handles session lifecycle, time tracking,
  and detailed note-taking about what was discussed.
  NOT for: curriculum planning (use curriculum-tracker), assignments (use assignment-manager).
metadata:
  {
    "openclaw": {
      "emoji": "⏱️"
    }
  }
---

# Study Session Manager

Manages timed study sessions with detailed logging. Every minute of learning
is tracked and every concept discussed is recorded.

## Session Lifecycle

### Starting a Session
When user says "start session" or begins studying:

1. Record start time: `echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) START" >> ~/.mentor/sessions/$(date +%Y-%m-%d).md`
2. Call `memory_search` for yesterday's session to show continuity
3. Check `~/.mentor/goals/daily.md` for today's goals
4. Report: "Session started. Today's goals: [X]. You've studied [Y] minutes so far today."

### During a Session
Every 20-30 minutes of discussion, append to the session log:

```markdown
### [HH:MM] Topic: [topic name]
**Concepts covered:** [list]
**Key insights:** [what the student understood or discovered]
**Questions asked:** [important questions from the student]
**Connections to prior knowledge:** [links to previous sessions]
**Open questions:** [things to explore later]
```

### Ending a Session
When user says "end session" or wraps up:

1. Record end time and compute duration
2. Write comprehensive session summary to `~/.mentor/sessions/YYYY-MM-DD.md`
3. Update cumulative stats in `~/.mentor/stats.md`
4. Report: "Session ended. Duration: X min. Total today: Y min. Topics: [list]."
5. Suggest what to pick up next time

## Session Log Format

Each day's log at `~/.mentor/sessions/YYYY-MM-DD.md`:

```markdown
# Study Log — YYYY-MM-DD

## Session 1: HH:MM - HH:MM (X min)
### Topics Covered
- [Topic 1]: [detailed description of what was discussed]
- [Topic 2]: [detailed description]

### Key Concepts Learned
- [Concept]: [one-sentence explanation showing understanding]

### Papers/Articles Discussed
- [Paper title] (arxiv ID): [what we focused on]

### Assignments Given
- [Assignment description] (due: date)

### Connections to Prior Sessions
- "This builds on [topic] from [date] because..."

### Open Questions for Next Time
- [Question 1]
- [Question 2]

### Student Self-Assessment
- Confidence on today's topics: [1-5]
- Energy level: [1-5]
```

## Daily Goal: 120 Minutes

Track progress naturally:
- < 30 min: "You've only studied X minutes today. Let's make this count."
- 30-90 min: "Good progress — X minutes in. Keep the momentum."
- 90-119 min: "Almost at your daily goal! X minutes to go."
- >= 120 min: "Daily goal hit! Y minutes total. Solid work today."
- >= 180 min: "Deep session today — Z minutes. Make sure to take breaks."

## Cumulative Stats

Maintain `~/.mentor/stats.md`:
```markdown
# Study Stats
- Total hours this week: X
- Sessions this week: Y
- Current streak: Z days
- Topics this week: [list]
- Average session length: W min
```

## Weekly Summary Trigger

When the weekly-review cron triggers, this skill provides:
- Total study hours
- Sessions count
- Topics covered with detail level
- Assignment completion rate
- Streak status
