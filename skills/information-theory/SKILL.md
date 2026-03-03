---
name: information-theory
description: >
  Information theory concepts in ML: entropy, KL divergence, mutual information,
  ELBO, variational bounds. Mathematical rigor with ML applications.
  Use when: user asks about entropy, KL divergence, information bottleneck,
  ELBO derivation, mutual information in ML.
metadata:
  { "openclaw": { "emoji": "📡" } }
---

# Information Theory for ML

Rigorous information theory with direct ML applications.

## Core Concepts

### Entropy
H(X) = -∑ p(x) log p(x)
- Measures uncertainty/information content
- ML: Cross-entropy loss H(p,q) = -∑ p(x) log q(x)
- Connection: minimizing cross-entropy = maximizing likelihood

### KL Divergence
D_KL(P||Q) = ∑ p(x) log(p(x)/q(x)) = E_p[log p(x) - log q(x)]
- Not symmetric: D_KL(P||Q) ≠ D_KL(Q||P)
- Forward KL (Q||P): mean-seeking → used in variational inference
- Reverse KL (P||Q): mode-seeking → used in policy optimization
- ML: VAE regularizer, RLHF KL penalty, knowledge distillation

### Mutual Information
I(X;Y) = H(X) - H(X|Y) = D_KL(p(x,y) || p(x)p(y))
- Measures shared information between variables
- ML: InfoNCE loss (contrastive learning), representation learning
- InfoMax principle: maximize MI between input and representation

### ELBO Derivation (critical for VAEs)
```
log p(x) = log ∫ p(x,z)dz
         = log ∫ p(x,z) q(z|x)/q(z|x) dz
         ≥ E_q[log p(x,z) - log q(z|x)]     (Jensen's inequality)
         = E_q[log p(x|z)] - D_KL(q(z|x) || p(z))
         = ELBO
```
Gap: log p(x) - ELBO = D_KL(q(z|x) || p(z|x)) ≥ 0

### Rate-Distortion Theory
- Trade-off: compression rate vs reconstruction quality
- MDL principle: best model minimizes description length
- Connection to PAC-Bayes bounds on generalization
- Practical: understanding why overparameterized models can generalize

## Applications in Modern ML

| IT Concept | ML Application | Example |
|-----------|---------------|---------|
| Cross-entropy | Classification loss | Softmax CE |
| KL divergence | VAE regularizer | β-VAE |
| KL penalty | RLHF constraint | PPO-clip |
| Mutual information | Contrastive learning | SimCLR, CLIP |
| Entropy regularization | Exploration in RL | SAC |
| Bits-per-dimension | Generative model evaluation | Diffusion, flows |
| Information bottleneck | Representation learning | Deep IB |
