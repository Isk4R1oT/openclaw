---
name: coding-challenges
description: >
  ML-specific coding challenges: implement from scratch, optimize, debug, reproduce.
  Use when: user says "coding challenge", "implement from scratch", "code exercise",
  "practice coding", "implement attention", "write a training loop".
  NOT for: reviewing existing code (use ml-code-review), general assignments (use assignment-manager).
metadata:
  {
    "openclaw": {
      "emoji": "💻"
    }
  }
---

# Coding Challenges

ML-specific programming exercises with execution and review.

## Challenge Categories

### Implement from Scratch
Build ML components without using high-level APIs:
- Multi-head attention (just numpy/torch tensors)
- Backpropagation through a simple network
- Adam optimizer step-by-step
- Batch normalization forward and backward
- Dropout with proper scaling
- Positional encoding (sinusoidal and RoPE)
- Beam search decoder
- BPE tokenizer
- KV cache for autoregressive generation
- Top-k and top-p sampling

### Optimize Existing Code
Given working but slow code, make it faster:
- Vectorize Python loops to numpy/torch
- Add mixed precision training
- Implement gradient checkpointing
- Optimize data loading pipeline
- Use torch.compile effectively
- Memory-efficient attention implementation

### Debug Broken Code
Code that runs but produces wrong results:
- Data leakage in train/test split
- Forgetting model.eval() during evaluation
- Wrong loss function for the task
- Gradient accumulation off-by-one
- Learning rate scheduler applied wrong
- Numerical instability in softmax
- Broadcasting bugs in tensor operations

### Reproduce Paper Results
Given a paper, reproduce the key experiment:
- Set up the exact architecture
- Match hyperparameters
- Compare results to paper's claims
- Document discrepancies

## Challenge Format

```markdown
# Challenge: [Name]
Difficulty: [L1-L5]
Topic: [knowledge-graph concept]
Time limit: [X minutes]

## Problem
[Description of what to implement]

## Requirements
- [Specific constraints]
- [Expected interface/API]

## Test Cases
[Input/output examples for verification]

## Starter Code (optional)
[Skeleton to build on]
```

## After Submission

1. Run code in sandbox to verify correctness
2. Check against test cases
3. Review for ML-specific best practices
4. Benchmark performance if relevant
5. Compare to reference implementation
6. Generate flashcard for key pattern used
7. Update knowledge-graph confidence

## Difficulty Scaling

Check knowledge-graph before selecting difficulty:
- New concept → L1-L2 (guided implementation with hints)
- Learning concept → L3 (implement with minimal guidance)
- Mastered concept → L4-L5 (optimize, extend, combine with other concepts)
