---
name: optimization-theory
description: >
  Deep dive into optimization for ML. Covers SGD variants, Adam internals,
  learning rate schedules, distributed optimization, loss landscape geometry.
  Use when: user asks about optimizers, "how does Adam work", "learning rate schedule",
  "why warmup", "convergence proof", "loss landscape", "SAM optimizer".
metadata:
  { "openclaw": { "emoji": "📉" } }
---

# Optimization Theory for ML

Mathematical foundations and practical aspects of optimization in ML.

## Optimizer Zoo

### First-Order Methods
| Optimizer | Update Rule | Key Property |
|-----------|-----------|--------------|
| SGD | θ -= lr · g | Simplest, good generalization |
| SGD+Momentum | v = β·v + g; θ -= lr·v | Accelerated convergence |
| Nesterov | Look-ahead gradient | Better for convex |
| Adagrad | Per-param adaptive LR | Good for sparse |
| RMSProp | Running avg of g² | Fixes Adagrad decay |
| Adam | Momentum + RMSProp | Default choice |
| AdamW | Adam + decoupled weight decay | Standard for transformers |
| LAMB | Layer-wise adaptive LR | Large batch training |

### Adam Internals (derive step by step)
```
m_t = β₁·m_{t-1} + (1-β₁)·g_t          # First moment (mean)
v_t = β₂·v_{t-1} + (1-β₂)·g_t²          # Second moment (variance)
m̂_t = m_t / (1 - β₁^t)                   # Bias correction
v̂_t = v_t / (1 - β₂^t)                   # Bias correction
θ_t = θ_{t-1} - lr · m̂_t / (√v̂_t + ε)   # Update
```

### Learning Rate Schedules
| Schedule | Formula | When to Use |
|----------|---------|-------------|
| Constant | lr = lr₀ | Baseline, fine-tuning |
| Step decay | lr = lr₀ · γ^(epoch/step) | Classical CV |
| Cosine | lr = lr_min + 0.5(lr₀-lr_min)(1+cos(πt/T)) | Standard for LLMs |
| Warmup+Cosine | Linear 0→lr₀ then cosine | Most transformer training |
| 1-cycle | Warm up, cool down, anneal | Fast training (Smith) |
| WSD | Warmup → stable → decay | Recent LLM pretraining |

### Why Warmup?
- Early gradients are large and noisy (random initialization)
- Adam's running averages are biased toward zero initially
- Large early updates can push model to bad region
- Warmup lets statistics stabilize before taking big steps

## Loss Landscape Geometry
- Neural network loss surfaces are highly non-convex
- But in practice: many saddle points, few bad local minima
- Flat minima generalize better than sharp minima
- SAM (Sharpness-Aware Minimization) explicitly seeks flat regions
- Large batch training tends toward sharp minima → needs LAMB/LARS

## Distributed Optimization
- Data parallelism: AllReduce gradients across devices
- Gradient compression: quantize gradients for communication
- Local SGD: multiple local steps before synchronization
- ZeRO: partition optimizer states, gradients, parameters across devices
