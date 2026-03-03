---
name: arxiv-reader
description: >
  Structured reading of arxiv research papers using the 3-pass method.
  Use when: user pastes an arxiv URL or paper ID (e.g. "2401.12345"),
  says "read this paper", "explain this paper", "what does this paper contribute",
  "what's the key idea in", "paper breakdown", or wants deep-dive into a paper.
  NOT for: finding papers on a topic (use paper-research), general URL summaries
  (use summarize skill), concept explanations without a paper (use concept-explainer).
metadata:
  {
    "openclaw": {
      "emoji": "📄"
    }
  }
---

# Arxiv Reader

Structured paper reading using Keshav's 3-pass method adapted for ML papers.

## The 3-Pass Method

### Pass 1: Bird's Eye (5 min)
Read: title, abstract, introduction (first 2 paragraphs), section headings,
conclusions, glance at figures.

Extract and present:
- **Category**: What type of paper? (new method, analysis, survey, benchmark)
- **Context**: What problem does it address?
- **Contribution**: What are the claimed contributions (usually 3-4 bullet points)?
- **Clarity**: Is the paper well-written? (affects reading strategy)

Ask student: "Based on this overview, what do you think their key insight is?"

### Pass 2: Detailed Read (30 min)
Read the full paper, skipping proofs and complex derivations.

Extract and present:
- **Problem Formulation**: The exact mathematical problem being solved
- **Prior Work Gap**: What existing approaches miss (from Related Work)
- **Method**: Step-by-step explanation of the proposed approach
- **Key Equations**: The 3-5 most important equations with explanation
- **Experiments**: Datasets, baselines, main results table
- **Ablations**: What matters most according to ablation studies
- **Limitations**: What the authors acknowledge (and what they don't)

Ask student: "Walk me through how their method addresses the gap they identified."

### Pass 3: Deep Understanding (optional, 60+ min)
For papers worth re-implementing:
- Derive the key equations step by step
- Identify implementation details that aren't in the paper
- Compare to similar approaches mathematically
- Discuss what experiments are missing
- Sketch a re-implementation plan

## After Reading

1. **Generate flashcards**: 3-5 cards via spaced-repetition skill
2. **Update knowledge-graph**: Mark related concepts as "learning" or update confidence
3. **Add to citation-tracker**: Record key citations for follow-up
4. **Tag by topic**: Link to curriculum-tracker categories
5. **Store summary**: Write to `~/.mentor/papers/YYYY/paper-id.md`

## Paper Summary Format

```markdown
# [Paper Title] ([Year])
**Authors:** [names]
**URL:** [arxiv link]
**Read on:** [date]
**Related to:** [knowledge-graph concepts]

## One-Sentence Summary
[The core contribution in one sentence]

## Key Contributions
1. [contribution 1]
2. [contribution 2]

## Method
[2-3 paragraph explanation]

## Key Results
[Main numbers from experiments]

## Strengths
- [strength 1]

## Weaknesses
- [weakness 1]

## Connections to Prior Knowledge
- Builds on [concept from knowledge-graph]
- Related to [paper we previously read]

## Discussion Questions Covered
1. [question] → [insight from discussion]
```

## Using the summarize CLI

For fetching paper content:
```bash
summarize "https://arxiv.org/abs/XXXX.XXXXX" --length xl
```
