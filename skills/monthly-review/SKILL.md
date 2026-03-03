---
name: monthly-review
description: >
  Deep monthly learning review with trend analysis. Triggered by cron on 1st.
  Use when: user says "monthly review", "month summary", or on cron trigger.
metadata:
  { "openclaw": { "emoji": "📊" } }
---

# Monthly Review

Deep analysis of the learning month with trend comparison.

## Review Structure (1000 words)

### 1. Month Overview
- Total hours (vs ~60 hour goal)
- Sessions count
- Study streak stats

### 2. Curriculum Progress
- % complete (beginning of month → end)
- Chapters/lectures completed
- Papers read (count + list)
- Books progress

### 3. Knowledge Graph Evolution
- New concepts mastered this month
- Concepts still in learning
- Topic areas with most growth
- Visualization: mastery heatmap by topic

### 4. Assignment Performance Trends
- Average scores: this month vs last month
- Strongest assignment types
- Weakest assignment types
- Total completed vs assigned

### 5. Learning Velocity
- Concepts mastered per week (4-week trend)
- Is velocity increasing, stable, or decreasing?
- What's driving the trend?

### 6. Spaced Repetition Stats
- Cards reviewed this month
- Average retention rate
- Topics with lowest retention
- New cards created

### 7. Comparison to Previous Month
- Hours: up/down?
- Concepts mastered: up/down?
- Assignment scores: up/down?
- Reading pace: up/down?

### 8. Goals Review
- Last month's goals: achieved / missed / partial
- Success rate

### 9. Next Month Plan
- Curriculum targets
- Focus areas for improvement
- Suggested schedule adjustments
- New goals (SMART format)

### 10. Reflections
- What learning approach worked best this month?
- What didn't work?
- Any curriculum adjustments needed?

## Storage
Save to `~/.mentor/reviews/monthly/YYYY-MM.md`
