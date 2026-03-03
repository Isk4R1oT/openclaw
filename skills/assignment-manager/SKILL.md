---
name: assignment-manager
description: >
  Create, track, and grade AI/ML learning assignments and exercises.
  Use when: user says "give me an assignment", "check my answer", "what should
  I practice", "create a problem about X", "grade this", "quiz me on X",
  or when ai-mentor needs to assign work at session end.
  NOT for: flashcards (use spaced-repetition), coding challenges (use coding-challenges).
metadata:
  {
    "openclaw": {
      "emoji": "📝"
    }
  }
---

# Assignment Manager

Creates, tracks, and evaluates study assignments with structured feedback.

## Assignment Types

### Conceptual (explain a concept)
"Explain why attention is O(n²) and what sparse attention approaches do about it."
- Tests: understanding, ability to communicate, depth of knowledge
- Grading: Is the explanation accurate? Is it complete? Could someone learn from it?

### Implementation (write code/pseudocode)
"Write pseudocode for the forward pass of multi-head attention including KV cache."
- Tests: practical understanding, detail orientation
- Grading: Correctness, edge cases handled, efficiency awareness

### Research (find and analyze)
"Find the original Chinchilla paper. What were the key findings about compute-optimal training?"
- Tests: research skills, critical reading, synthesis
- Grading: Did they find the right paper? Is the analysis accurate? Do they see implications?

### Design (architect a system)
"Design a RAG system for multi-document reasoning with citation tracking."
- Tests: system thinking, trade-off analysis, practical knowledge
- Grading: Completeness, feasibility, innovation, consideration of edge cases

### Mathematical Derivation
"Derive the gradient of the cross-entropy loss with respect to the logits."
- Tests: mathematical rigor, step-by-step reasoning
- Grading: Correct steps, proper notation, intuitive explanations alongside math

### Debug (find and fix bugs)
"Here's a training loop with 3 bugs. Find and fix them."
- Tests: attention to detail, debugging methodology, ML-specific knowledge
- Grading: All bugs found? Correct fixes? Explanation of why they're bugs?

## Difficulty Scale

- **L1 (Recall)**: Define a concept, state a formula
- **L2 (Understanding)**: Explain why, compare approaches
- **L3 (Application)**: Implement, design, use in context
- **L4 (Analysis)**: Debug, optimize, critique a paper's approach
- **L5 (Synthesis)**: Novel application, original design, research proposal

Calibrate to knowledge-graph: mastered concepts → L4-L5 only. Learning concepts → L2-L3.

## Assignment Lifecycle

### Creating
1. Check knowledge-graph for student's level on the topic
2. Select appropriate type and difficulty
3. Write clear problem statement with constraints
4. Store at `~/.mentor/assignments/[id].md`:

```markdown
# Assignment: [ID]
Topic: [topic]
Type: [conceptual/implementation/research/design/math/debug]
Difficulty: [L1-L5]
Created: [date]
Due: [date]
Status: pending

## Problem
[Clear problem statement]

## Constraints
[Time limit, format requirements, etc.]

## Hints (reveal on request)
1. [Hint 1]
2. [Hint 2]
```

### Grading
1. Read student's submission carefully
2. Ask 2-3 Socratic follow-up questions to test depth
3. Score on three axes (each 1-5):
   - **Correctness**: Is the answer factually right?
   - **Depth**: Does it go beyond surface level?
   - **Clarity**: Is it well-communicated?
4. Provide structured feedback:
   - What was strong
   - What to improve
   - One thing to explore further
5. Update assignment status and knowledge-graph

### Tracking
Store summary at `~/.mentor/assignments/index.md`:
```markdown
| ID | Topic | Type | Difficulty | Score | Date |
|----|-------|------|-----------|-------|------|
| A001 | attention | conceptual | L3 | 4/4/3 | 2026-01-15 |
```

## Never Do

- Never just say "correct" — always probe deeper
- Never give the answer without the student attempting first
- Never assign L1 problems for mastered concepts
- Never skip grading — every assignment gets feedback
