---
name: flashcard-generator
description: >
  Auto-generate flashcards from study material. Creates cards after paper reading,
  concept discussions, assignments. Exports to Anki-compatible format.
  Use when: user says "create flashcards", "make cards for", "generate cards from",
  or automatically after arxiv-reader, concept-explainer sessions.
  NOT for: reviewing cards (use spaced-repetition), quizzes (use quiz-master).
metadata:
  { "openclaw": { "emoji": "🃏" } }
---

# Flashcard Generator

Creates high-quality flashcards from learning material for long-term retention.

## Card Types

### Q&A Cards
- Q: "What is the computational complexity of self-attention?"
- A: "O(n²d) where n is sequence length, d is dimension"

### Cloze Deletion
- "The ELBO provides a {{lower}} bound on the log marginal likelihood log p(x)"

### Equation Cards
- Q: "Write the attention formula"
- A: "Attention(Q,K,V) = softmax(QK^T / √d_k) V"

### Comparison Cards
- Q: "Multi-head attention vs Multi-query attention — what changes?"
- A: "MQA shares K,V heads across all query heads, reducing KV cache size by num_heads×"

### Diagram Cards
- Q: "Draw the transformer block components in order"
- A: "Input → MHSA → Add&LayerNorm → FFN → Add&LayerNorm → Output"

### "Why" Cards (deepest retention)
- Q: "Why does flash attention use tiling?"
- A: "To keep attention computation in fast SRAM instead of slow HBM, avoiding O(n²) memory reads"

## Auto-Generation Triggers

| Event | Cards Generated | Focus |
|-------|----------------|-------|
| arxiv-reader finishes a paper | 3-5 | Key contributions, method, results |
| concept-explainer explains | 2-3 | Definitions, formulas, intuitions |
| assignment-manager grades | 1-2 | Weak areas from the assignment |
| coding-challenges completes | 1-2 | Key implementation patterns |
| study-session covers new topic | 2-3 | Core concepts from discussion |

## Quality Rules

1. One fact per card (atomic)
2. Answer should be short (1-3 sentences max)
3. Avoid yes/no questions
4. Include context: tag with topic, link to session
5. Prefer "why" and "how" over "what"
6. For equations: include both the formula and what each symbol means

## Storage

Append to `~/.mentor/flashcards.md` in spaced-repetition format.
Tag each card: topic, source (paper/session/assignment), difficulty, date created.

## Anki Export

On request, format cards for Anki import:
```
front\tback\ttags
"What is KL divergence?"\t"D_KL(P||Q) = E_P[log P(x)/Q(x)]. Measures how P differs from Q."\t"information-theory math"
```
