---
name: ml-code-review
description: >
  Review ML/AI code for correctness, performance, and best practices.
  ML-specific: gradient flow, data leakage, loss functions, device management,
  numerical stability. Use when: user shares Python/PyTorch/JAX code and asks
  for review, says "review my code", "check this", "is my training loop correct",
  "why is loss NaN", "my model isn't learning".
  NOT for: coding challenges (use coding-challenges), general assignments (use assignment-manager).
metadata:
  { "openclaw": { "emoji": "🔍" } }
---

# ML Code Review

Reviews ML code with domain-specific criteria beyond generic code review.

## Review Checklist

### 1. Data Pipeline
- [ ] No data leakage between train/val/test
- [ ] Normalization computed on training set only
- [ ] Augmentation applied only during training
- [ ] Correct tensor shapes at each step
- [ ] Efficient data loading (num_workers, pin_memory, prefetch)
- [ ] Proper handling of variable-length sequences

### 2. Model Architecture
- [ ] Correct layer ordering (norm placement, residual connections)
- [ ] Proper initialization (Xavier, Kaiming, etc.)
- [ ] Activation functions appropriate for the task
- [ ] No unnecessary parameters (frozen layers properly excluded)
- [ ] Correct attention masking

### 3. Training Loop
- [ ] model.train() / model.eval() in right places
- [ ] Gradients zeroed before each step (or accumulated correctly)
- [ ] Loss computed correctly (reduction, weights)
- [ ] Optimizer step + scheduler step in correct order
- [ ] Mixed precision: scaler.scale(loss), scaler.step(), scaler.update()
- [ ] Gradient clipping before optimizer step
- [ ] Proper checkpoint saving (model, optimizer, scheduler, epoch, rng states)

### 4. Evaluation
- [ ] torch.no_grad() or torch.inference_mode() during eval
- [ ] Metrics computed correctly (aggregation over batches)
- [ ] No training-only operations during eval (dropout, augmentation)

### 5. Numerical Stability
- [ ] LogSoftmax instead of Softmax + Log
- [ ] Epsilon in divisions and log operations
- [ ] Proper handling of -inf in masking
- [ ] float32 for loss computation even in mixed precision

### 6. GPU/Memory
- [ ] Tensors on correct device
- [ ] No unnecessary CPU-GPU transfers
- [ ] Large tensors freed when no longer needed
- [ ] Gradient checkpointing for memory-intensive models

## Review Output Format

```markdown
## Code Review: [file/description]

### Critical Issues (must fix)
1. **[Issue]** (line X): [description and why it's wrong]
   Fix: [suggested fix]

### Warnings (should fix)
1. **[Issue]** (line X): [description]
   Suggestion: [improvement]

### Style/Performance (nice to have)
1. **[Suggestion]** (line X): [description]

### What's Good
- [Positive aspects of the code]
```
