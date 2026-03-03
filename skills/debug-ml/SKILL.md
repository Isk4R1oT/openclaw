---
name: debug-ml
description: >
  Systematic ML debugging methodology. Diagnoses why models aren't learning,
  loss issues, performance problems. Use when: user says "my model isn't learning",
  "loss is NaN", "loss plateaued", "overfitting", "model is too slow",
  "something is wrong with training", "debug this".
metadata:
  { "openclaw": { "emoji": "🐛" } }
---

# ML Debugging

Systematic debugging methodology for ML training and inference issues.

## Debugging Flowchart

### Loss Not Decreasing
1. Is the data correct? → Check a few samples visually
2. Is the model getting gradients? → Print gradient norms
3. Is learning rate reasonable? → Try 1e-3, 1e-4, 1e-5
4. Is the loss function correct? → Verify with a tiny overfit test
5. Is the model architecture correct? → Check dimensions, skip connections
6. Is there a data pipeline bug? → Same batch every time = label shuffling?

### Loss is NaN/Inf
1. Learning rate too high → Reduce by 10x
2. Division by zero → Add epsilon to denominators
3. Log of zero/negative → Clamp inputs to log
4. Gradient explosion → Add gradient clipping
5. Mixed precision overflow → Check loss scaling
6. Softmax numerical issues → Use log_softmax

### Overfitting
1. Add dropout, weight decay, data augmentation
2. Reduce model capacity
3. Add early stopping
4. Check for data leakage (MOST COMMON)
5. Increase dataset size or use pretrained model

### Underfitting
1. Increase model capacity
2. Train longer
3. Reduce regularization
4. Check learning rate (might be too low)
5. Check data quality and labels

### Training Too Slow
1. Profile with torch.profiler: is it GPU-bound or CPU-bound?
2. Data loading bottleneck → Increase num_workers, pin_memory
3. Small batch size → Increase batch, use gradient accumulation
4. No mixed precision → Add AMP
5. Excessive logging/checkpointing → Reduce frequency

## Diagnostic Tools
```python
# Gradient monitoring
for name, param in model.named_parameters():
    if param.grad is not None:
        print(f"{name}: grad_norm={param.grad.norm():.4f}")

# Activation statistics
hooks = []
for layer in model.modules():
    hooks.append(layer.register_forward_hook(
        lambda m, i, o: print(f"{m.__class__.__name__}: mean={o.mean():.4f}, std={o.std():.4f}")
    ))

# Tiny overfit test
small_batch = next(iter(dataloader))
for i in range(1000):
    loss = model(small_batch).loss
    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
    if i % 100 == 0: print(f"Step {i}: loss={loss.item():.4f}")
# Loss should go to ~0. If not, there's a bug.
```

## The Golden Rule
When debugging ML: change ONE thing at a time and measure the effect.
