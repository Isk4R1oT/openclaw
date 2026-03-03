---
name: math-drills
description: >
  Mathematical practice for ML: linear algebra, probability, optimization,
  information theory. Generates problems with step-by-step solutions.
  Use when: user says "math practice", "derive", "prove", "math drill",
  "linear algebra exercise", "probability problem".
metadata:
  { "openclaw": { "emoji": "∑" } }
---

# Math Drills

Mathematical exercises mapped to ML applications.

## Topics and ML Connections

### Linear Algebra
- Eigendecomposition → PCA, spectral methods
- SVD → dimensionality reduction, matrix completion
- Matrix calculus → backpropagation, Jacobians
- Tensor operations → attention computation, einsum mastery

### Probability & Statistics
- Bayesian inference → posterior estimation, priors
- KL divergence → VAE loss, RLHF, distribution matching
- Maximum likelihood → training objectives
- Sampling methods → MCMC, variational inference

### Optimization
- Convex optimization → loss landscape analysis
- Gradient descent proofs → convergence guarantees
- Lagrange multipliers → constrained optimization, KKT conditions
- Stochastic methods → SGD convergence, variance reduction

### Information Theory
- Entropy → cross-entropy loss connection
- Mutual information → representation learning
- Rate-distortion → compression, MDL principle
- Channel capacity → information bottleneck

## Problem Format

```
## Problem [ID]: [Topic]
Difficulty: [L1-L5]
ML Connection: [what this math is used for in ML]

[Problem statement with clear notation]

### Hint (on request)
[Directional hint, not the answer]

### Solution
[Step-by-step derivation]

### ML Application
[How this exact math appears in practice]
```

## Adaptive Difficulty

Check knowledge-graph for math concept mastery:
- Not mastered → start with worked examples, then similar problems
- Learning → problems with hints available
- Mastered → challenging variations, proofs, connections to new areas
