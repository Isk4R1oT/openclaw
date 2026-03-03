---
name: data-engineering
description: >
  Data engineering for ML: data quality, augmentation, synthetic data,
  pipelines, tokenizer training, data mixing for pretraining.
  Use when: user asks about "data pipeline", "data quality", "augmentation",
  "synthetic data", "tokenizer training", "data mixing", "data labeling".
metadata:
  { "openclaw": { "emoji": "🗄️" } }
---

# Data Engineering for ML

Data is the foundation. Bad data = bad model, no matter the architecture.

## Data Quality Dimensions
| Dimension | Metric | Threshold |
|-----------|--------|-----------|
| Completeness | % missing values | <5% per feature |
| Consistency | Cross-field validation | 100% pass |
| Accuracy | Spot-check vs ground truth | >95% |
| Timeliness | Data freshness | Task-dependent |
| Uniqueness | Deduplication rate | >99% unique |

## Data Labeling
- Human labeling: gold standard but expensive
- Active learning: label most informative samples first
- Weak supervision: programmatic labeling (Snorkel)
- Self-training: model labels its own data (filter by confidence)
- Inter-annotator agreement: Cohen's κ > 0.8 for quality

## Data Augmentation
| Domain | Techniques |
|--------|-----------|
| Text | Back-translation, synonym replacement, random insertion/deletion |
| Image | Flip, rotate, crop, color jitter, mixup, cutout, RandAugment |
| Audio | Speed perturbation, noise injection, SpecAugment |
| Tabular | SMOTE, feature noise, mixup |

## Synthetic Data
- LLM-generated training data (self-instruct, Alpaca pattern)
- Simulation data (autonomous driving, robotics)
- Quality control: validate with held-out real data
- Risk: model collapse from training on own outputs

## Data for LLM Pretraining
- **Data mixing**: proportions of web, code, books, papers, conversations
- **Deduplication**: exact (MinHash) and fuzzy deduplication critical
- **Quality filtering**: perplexity-based, classifier-based, heuristic
- **Tokenizer training**: BPE on representative corpus, vocabulary size trade-off
- **Curriculum**: start with clean data, add noisier data later
