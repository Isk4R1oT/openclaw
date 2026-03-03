---
name: learning-analytics
description: >
  Analyze learning patterns and provide data-driven insights. Time distribution,
  learning velocity, struggling areas, optimal study times.
  Use when: user asks "how am I doing", "learning analytics", "study patterns",
  "where am I struggling", "show my stats", "learning dashboard".
metadata:
  { "openclaw": { "emoji": "📈" } }
---

# Learning Analytics

Data-driven analysis of learning patterns and effectiveness.

## Data Sources
- `~/.mentor/sessions/` — Session logs (time, topics, depth)
- `~/.mentor/assignments/` — Assignment scores and completion
- `~/.mentor/knowledge-graph.md` — Concept mastery status
- `~/.mentor/curriculum.md` — Curriculum progress
- `~/.mentor/quizzes/` — Quiz scores by topic
- `~/.mentor/flashcards.md` — Spaced repetition performance

## Analytics Dashboard

### Time Analytics
- Total hours: this week / this month / all time
- Average session length
- Most productive day of week
- Most productive time of day
- Study streak (current / longest)

### Topic Analytics
- Time spent per topic area
- Topics with highest/lowest assignment scores
- Topics that required most revisits
- Fastest mastered topics
- Topics in "learning" status longest (potential struggles)

### Learning Velocity
- Concepts mastered per week (trend line)
- Papers read per week
- Assignments completed per week
- Quiz score trends over time

### Struggling Areas
- Topics with multiple low quiz scores
- Concepts stuck in "learning" status for > 2 weeks
- Assignment types with consistently low scores
- Papers that were hard to discuss (flagged by ai-mentor)

## Actionable Recommendations
Based on analytics:
- "You spend 60% of time on NLP but only 20% on math. Consider rebalancing."
- "Your assignment scores for optimization are consistently lower. Suggest extra practice."
- "You learn best in morning sessions (8-10am). Consider scheduling deep dives then."
- "Flash attention has been in 'learning' for 3 weeks. Time for a focused session."

## Report Generation
On request, generate a comprehensive report:
```markdown
# Learning Analytics Report — [period]

## Summary
- Hours studied: [X]
- Concepts mastered: [Y]
- Papers read: [Z]
- Assignments completed: [W]

## Strengths
[topics where performance is strong]

## Areas for Improvement
[topics needing more work]

## Recommendations
[3-5 specific, actionable next steps]
```
