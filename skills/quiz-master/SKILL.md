---
name: quiz-master
description: >
  Quick-fire quiz sessions on AI/ML topics. Multiple modes: rapid recall,
  deep thinking, multi-choice, open-ended. Use when: user says "quiz me",
  "test my knowledge", "rapid fire", "10 questions on X", "knowledge check".
  NOT for: flashcard review (use spaced-repetition), formal assignments (use assignment-manager).
metadata:
  { "openclaw": { "emoji": "❓" } }
---

# Quiz Master

Quick-fire quizzes to test and reinforce AI/ML knowledge.

## Quiz Modes

### Rapid Recall (30 sec per question)
- Definition questions: "What is [concept]?"
- Formula recall: "Write the formula for [X]"
- Quick comparisons: "[A] vs [B] — key difference?"
- Paper recall: "What did [paper] contribute?"

### Deep Thinking (5 min per question)
- "Why does [approach A] work better than [B] for [task]?"
- "Derive [formula] from first principles"
- "Design [system] given [constraints]"
- "What would happen if you changed [X] in [architecture]?"

### Multiple Choice
- 4 options, one correct, distractors are common misconceptions
- Good for testing nuanced understanding

### Open-Ended
- "Explain [concept] as if teaching a junior ML engineer"
- Tests depth and communication

## Quiz Flow

1. Select topic (from knowledge-graph "learning" concepts or user choice)
2. Generate 10 questions, mixed difficulty
3. Present one at a time
4. User answers
5. Immediate feedback with explanation
6. Track score: X/10
7. Identify weak areas
8. Report: "Score: 8/10. Weak on: [topics]. Strong on: [topics]."

## Question Generation

Pull from:
- Knowledge-graph "learning" concepts (priority)
- Recent session topics (from study-session logs)
- Recent paper content (from arxiv-reader summaries)
- Spaced-repetition cards due for review

## After Quiz

- Update knowledge-graph confidence scores based on quiz performance
- Generate flashcards for missed questions
- Log quiz results to `~/.mentor/quizzes/YYYY-MM-DD.md`
- Suggest focus areas for next study session
