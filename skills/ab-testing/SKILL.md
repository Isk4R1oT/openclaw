---
name: ab-testing
description: >
  A/B testing for ML models: statistical methods, sample sizes, multi-armed
  bandits, sequential testing, guardrail metrics.
  Use when: user asks about "A/B testing", "experiment design", "sample size",
  "statistical significance", "multi-armed bandit", "hypothesis testing for ML".
metadata:
  { "openclaw": { "emoji": "🧪" } }
---

# A/B Testing for ML

Rigorous experimentation methodology for evaluating ML models.

## Experiment Design

### Step 1: Hypothesis
- H₀: New model performs same as baseline
- H₁: New model improves primary metric
- Define: primary metric, secondary metrics, guardrail metrics

### Step 2: Sample Size
n = (Z_α/2 + Z_β)² · 2σ² / δ²
- α = 0.05 (Type I error), β = 0.2 (Type II error → 80% power)
- σ = metric standard deviation
- δ = minimum detectable effect
- Rule of thumb: need ~10k samples per variant for small effects

### Step 3: Randomization
- Random split by user ID (not session)
- Check balance: covariate distributions similar across groups
- Watch for: network effects, novelty effects, day-of-week patterns

## Statistical Methods

### Frequentist
- Two-sample t-test: compare means
- Chi-squared test: compare proportions
- Mann-Whitney U: non-parametric alternative
- Multiple testing correction: Bonferroni, BH procedure

### Bayesian
- Prior: belief about metric distribution before experiment
- Posterior: updated belief after seeing data
- Decision: P(treatment > control) > threshold
- Advantage: natural interpretation, early stopping

### Sequential Testing
- Don't peek at p-values repeatedly (inflates false positive rate)
- Methods: O'Brien-Fleming, SPRT, mixture sequential probability ratio
- Allows early stopping while controlling error rates

## Multi-Armed Bandits
| Algorithm | Strategy | When to Use |
|-----------|---------|-------------|
| ε-greedy | Random explore ε% of time | Simple baseline |
| UCB | Explore uncertain options | Bounded rewards |
| Thompson Sampling | Sample from posterior | Best general-purpose |

## Guardrail Metrics
- Metrics that must NOT degrade even if primary metric improves
- Examples: latency, crash rate, revenue, user retention
- If guardrail fails: reject treatment even with positive primary
