---
name: weekly-review
description: >
  Structured weekly learning review. Triggered by Sunday cron.
  Use when: user says "weekly review", "week summary", "how was my week",
  or when cron triggers on Sunday.
metadata:
  { "openclaw": { "emoji": "📋" } }
---

# Weekly Review

Comprehensive review of the learning week.

## Review Structure (500 words)

### 1. Time Summary
- Total study hours (vs 14-hour goal for 7 days × 2 hours)
- Number of sessions
- Average session length
- Days studied / days missed

### 2. Topics Covered
- List all topics discussed this week (from session logs)
- For each: summary of what was covered and depth reached
- Connections made between topics

### 3. Papers Read
- List papers read this week (from arxiv-reader logs)
- Key takeaway from each
- How they connect to curriculum

### 4. Assignments
- Completed: count, average score, breakdown
- Pending: count, topics, when due
- Missed: count, topics (requires follow-up)

### 5. Knowledge Graph Changes
- Concepts moved from "not started" to "learning"
- Concepts moved from "learning" to "mastered"
- Confidence changes

### 6. Weak Areas
- Topics where quiz/assignment scores were low
- Concepts that needed multiple explanations
- Areas the student explicitly expressed confusion

### 7. Next Week Plan
- Curriculum items to cover
- Papers to read
- Specific goals (aligned with curriculum-tracker)
- Focus area for improvement

## Storage
Save to `~/.mentor/reviews/weekly/YYYY-WW.md`

## Delivery
Send via Telegram as a well-formatted message.
