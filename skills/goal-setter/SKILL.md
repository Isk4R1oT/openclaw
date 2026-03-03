---
name: goal-setter
description: >
  Set and track learning goals at daily, weekly, monthly, quarterly levels.
  SMART goals format. Use when: user says "set a goal", "what are my goals",
  "am I on track", "adjust my goals", "goal check".
metadata:
  { "openclaw": { "emoji": "🎯" } }
---

# Goal Setter

Structured goal setting and tracking for learning progress.

## Goal Types

### Daily Micro-Goals
- Read 1 paper or article
- Complete 1 coding challenge
- Review 10 flashcards
- Study for 120+ minutes
- Write 1 session summary

### Weekly Goals
- Master 1-2 new concepts
- Complete 3 assignments
- Read 2-3 papers
- Complete 1 literature review section
- Write study notes

### Monthly Goals
- Finish book chapter or course section
- Write 1 blog post
- Complete 1 system design practice
- Contribute to open source
- Complete mock interview

### Quarterly Goals
- Complete major curriculum section
- Build portfolio project
- Achieve specific knowledge milestones
- Publish or present work

## SMART Format
- **Specific**: "Master flash attention" not "learn more about attention"
- **Measurable**: "Score 4+/5 on flash attention quiz"
- **Achievable**: Based on current velocity from analytics
- **Relevant**: Aligned with curriculum
- **Time-bound**: "By end of this week"

## Goal Storage
`~/.mentor/goals/current.md`:
```markdown
# Current Goals

## Daily (today)
- [ ] Study 120 min
- [ ] Read: [specific paper]

## Weekly (this week)
- [ ] Master: flash attention
- [ ] Complete: 3 assignments on attention

## Monthly (this month)
- [ ] Finish: Attention section of curriculum
- [ ] Write: blog post on attention variants

## Quarterly
- [ ] Complete: transformer architecture module
```

## Adaptive Goals
If consistently missing goals (< 60% completion rate):
- Don't guilt-trip — suggest smaller goals
- "You've been hitting 70% of daily goals. Let's adjust to be more achievable."
- Better to complete 100% of realistic goals than 50% of ambitious ones
