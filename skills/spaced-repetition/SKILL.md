---
name: spaced-repetition
description: >
  Implements spaced repetition (SM-2 algorithm) for AI/ML concepts.
  Manages flashcard decks, schedules reviews, tracks retention.
  Use when: user says "review flashcards", "what's due for review",
  "create flashcard", "quiz me", or during morning cron for due cards.
  NOT for: creating assignments (use assignment-manager), quizzes (use quiz-master).
metadata:
  {
    "openclaw": {
      "emoji": "🔄"
    }
  }
---

# Spaced Repetition System

Implements the SM-2 algorithm for long-term retention of AI/ML concepts.
Flashcards are auto-generated from sessions and can be manually created.

## Flashcard Deck

Stored at `~/.mentor/flashcards.md`:

```markdown
# Flashcard Deck

| ID | Question | Answer | Next Review | Interval (days) | Ease | Topic |
|----|----------|--------|-------------|-----------------|------|-------|
| F001 | What is the computational complexity of self-attention? | O(n²d) where n=seq_len, d=dim | 2026-03-05 | 3 | 2.5 | attention |
| F002 | Derive the gradient of softmax | ∂σᵢ/∂zⱼ = σᵢ(δᵢⱼ - σⱼ) | 2026-03-04 | 1 | 2.1 | fundamentals |
```

## SM-2 Algorithm

After each review, update based on quality score (0-5):
- 0: Complete blackout
- 1: Wrong, but recognized after seeing answer
- 2: Wrong, but answer felt familiar
- 3: Correct with difficulty
- 4: Correct with hesitation
- 5: Perfect, instant recall

```
if quality >= 3:  # correct
    if repetition == 0: interval = 1
    elif repetition == 1: interval = 6
    else: interval = round(interval * ease_factor)
    ease_factor = max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    repetition += 1
else:  # incorrect
    repetition = 0
    interval = 1
    # ease_factor unchanged
```

## Card Types

1. **Q&A**: "What is [concept]?" → "[definition]"
2. **Fill-in-blank**: "The ELBO is a _____ bound on log p(x)" → "lower"
3. **Equation completion**: "KL(q||p) = " → "E_q[log q(x) - log p(x)]"
4. **Diagram**: "Name the components of a transformer block" → "MHSA → Add&Norm → FFN → Add&Norm"
5. **Connection**: "How does [X] relate to [Y]?" → "[explanation]"

## Auto-Generation

After these events, auto-generate flashcards:
- arxiv-reader completes a paper → 3-5 cards on key contributions
- concept-explainer explains a concept → 2-3 cards on definitions and formulas
- assignment-manager grades an assignment → 1-2 cards on weak areas
- study-session covers a new topic → 2-3 cards on key concepts

## Daily Review Flow

1. Find all cards where `next_review <= today`
2. Present cards one at a time
3. User answers, then sees correct answer
4. Rate quality (0-5)
5. Update interval and ease factor
6. Report: "Reviewed X cards. Y correct, Z need more work."

## Integration with Knowledge Graph

- Cards tagged by topic link to knowledge-graph concepts
- High ease factor (>2.8) on all cards for a concept → supports "mastered" status
- Low ease factor (<1.5) → concept needs re-study, flag in knowledge-graph
