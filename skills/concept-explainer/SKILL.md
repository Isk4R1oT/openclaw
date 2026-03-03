---
name: concept-explainer
description: >
  Deep, precise explanations of AI/ML concepts at advanced level. Layered:
  intuition → formal math → implementation. ALWAYS checks knowledge-graph first.
  Use when: user says "explain X", "what is Y", "how does Z work", "derive this",
  "intuition for", "why does X work", "difference between X and Y".
  NOT for: paper summaries (use arxiv-reader), code review (use ml-code-review).
metadata:
  { "openclaw": { "emoji": "💡" } }
---

# Concept Explainer

Delivers deep, layered explanations calibrated to the student's existing knowledge.

## Before Explaining ANYTHING

1. **Check knowledge-graph**: Is this concept mastered, learning, or new?
2. **Check memory_search**: Did we discuss this before?
3. **Find related concepts**: What connected topics does the student already know?

### If MASTERED:
"We covered [concept] on [date]. You demonstrated understanding when [specific evidence].
Building on that, the new angle here is..."

### If LEARNING (confidence < 5):
"We started [concept] in session [X]. Last time you were working through [specific aspect].
Let's deepen that..."

### If NEW:
Check prerequisites in knowledge-graph. If all met, proceed. If not:
"Before we dive into [concept], we need [prerequisite]. You're close — [prerequisite]
is at [status]. Let's solidify that first."

## Explanation Layers

### Layer 1: Intuition (2-3 min)
- Analogy or mental model (NOT dumbed down — advanced analogies)
- What problem does this solve?
- Why does the naive approach fail?
- One-sentence core insight

### Layer 2: Formal Treatment (10-15 min)
- Mathematical definition with standard notation
- Key equations derived step by step
- Assumptions stated explicitly
- Connections to other formalisms the student knows

### Layer 3: Implementation (5-10 min)
- How does this look in PyTorch/JAX code?
- What are the practical considerations?
- Common implementation gotchas
- Performance characteristics

### Layer 4: Connections (5 min)
- How does this relate to [mastered concept A]?
- How is this different from [related concept B]?
- Where does this appear in [paper we read]?
- What breaks when you change [key assumption]?

## After Explaining

1. Ask a comprehension question (Socratic check)
2. Generate 2-3 flashcards via flashcard-generator
3. Update knowledge-graph: set concept to "learning" with confidence 1-2/5
4. Log explanation in session notes

## Concept Map Generation

When explaining a complex topic, draw a concept map:
```
[Root Concept]
├── [Sub-concept A] (mastered ✓)
│   └── [Detail] (new)
├── [Sub-concept B] (learning 3/5)
└── [Sub-concept C] (not started)
    └── Prerequisites: [X, Y]
```

## Never Do
- Never re-explain from scratch a mastered concept
- Never skip the math for an advanced student
- Never use beginner analogies ("neural nets are like brains")
- Never explain without checking knowledge-graph first
