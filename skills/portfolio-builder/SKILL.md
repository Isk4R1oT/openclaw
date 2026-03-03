---
name: portfolio-builder
description: >
  Build an impactful ML portfolio: project selection, GitHub repos, blog posts,
  demos, personal website. Use when: user asks about "portfolio", "showcase my work",
  "GitHub profile", "ML projects to build".
metadata:
  { "openclaw": { "emoji": "💼" } }
---

# Portfolio Builder

Build a portfolio that demonstrates depth, not breadth.

## What Makes a Strong ML Portfolio

### Do
- Projects that show depth in one area (not 10 shallow tutorials)
- Clear README: problem, approach, results, how to reproduce
- Well-documented code with tests
- Results compared to baselines
- Discussion of what didn't work and why

### Don't
- Kaggle notebooks with no explanation
- "I fine-tuned BERT" with no analysis
- Tutorials copied from blog posts
- Projects without reproducibility instructions

## Project Ideas (Advanced Level)
1. **Paper reproduction**: Reproduce a key paper, document discrepancies
2. **Ablation study**: Take a model, systematically remove components, analyze
3. **Novel application**: Apply technique from one domain to another
4. **Efficiency improvement**: Make an existing model faster/smaller
5. **Evaluation framework**: Build comprehensive evaluation for an ML task
6. **Open-source contribution**: Meaningful PR to PyTorch/HF/etc

## GitHub Repo Structure
```
project-name/
├── README.md          # Problem, approach, results, reproduce
├── notebooks/         # Exploration and analysis
├── src/              # Clean, modular code
├── configs/          # Experiment configurations
├── scripts/          # Training, evaluation scripts
├── tests/            # Unit tests
├── results/          # Figures, tables, logs
└── requirements.txt  # Exact dependencies
```

## Blog Post Strategy
- Write about what you just learned (freshest understanding)
- Target audience: yourself 6 months ago
- Include: code, diagrams, math, results
- Publish on personal site + cross-post to relevant platforms
