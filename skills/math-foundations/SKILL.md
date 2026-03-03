---
name: math-foundations
description: >
  Mathematical foundations for ML: linear algebra, probability, optimization,
  information theory. Formal treatment with ML applications.
  Use when: user asks about math underlying ML, "why does this formula work",
  "derive X", "mathematical foundation for Y", "proof of Z".
  NOT for: practice problems (use math-drills).
metadata:
  { "openclaw": { "emoji": "📐" } }
---

# Math Foundations for ML

Rigorous mathematical treatment of concepts underlying modern ML.

## Coverage Areas

### Linear Algebra
| Concept | ML Application |
|---------|---------------|
| Eigendecomposition | PCA, spectral clustering, graph neural networks |
| SVD | Low-rank approximation, LoRA, embeddings |
| Matrix calculus | Backpropagation, Jacobians, Hessians |
| Tensor operations | Einsum, attention computation, batched ops |
| Orthogonality | Weight initialization, regularization |
| Positive definiteness | Kernel methods, Fisher information |

### Probability & Statistics
| Concept | ML Application |
|---------|---------------|
| Bayesian inference | Prior/posterior, MAP estimation |
| Conjugate priors | Analytically tractable posteriors |
| Graphical models | VAEs, diffusion models, causal inference |
| MCMC | Sampling, Langevin dynamics |
| Variational inference | VAEs, ELBO, amortized inference |
| Exponential families | GLMs, natural gradient |

### Optimization
| Concept | ML Application |
|---------|---------------|
| Convexity | Loss landscape analysis, guarantees |
| Gradient descent | All training, convergence proofs |
| Stochastic methods | SGD, mini-batch, variance reduction |
| Second-order | Natural gradient, K-FAC, Hessian-free |
| Constrained optimization | Lagrangian, KKT, penalty methods |
| Non-convex optimization | Neural network training, saddle points |

### Information Theory
| Concept | ML Application |
|---------|---------------|
| Entropy | Cross-entropy loss, uncertainty |
| KL divergence | VAE loss, RLHF, distribution matching |
| Mutual information | Representation learning, InfoNCE |
| Rate-distortion | Compression, MDL principle |
| Fisher information | Natural gradient, confidence intervals |

## Explanation Pattern

For each concept:
1. **What it is** (formal definition)
2. **Why it matters for ML** (concrete application)
3. **Key formula** (standard notation, all symbols defined)
4. **Derivation** (step by step, asking student to fill in steps)
5. **Implementation** (numpy/torch code showing the math)
6. **Connection** to concepts in knowledge-graph
