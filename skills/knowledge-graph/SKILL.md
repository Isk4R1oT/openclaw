---
name: knowledge-graph
description: >
  Maintains a concept knowledge graph tracking what the student has learned,
  is learning, and hasn't started. Prevents re-explaining mastered topics.
  Builds connections between concepts across sessions. Use when: checking if
  a concept was already covered, updating concept status, finding related
  concepts, building on prior knowledge. This skill is called by other skills
  (ai-mentor, concept-explainer, assignment-manager) — it is the single
  source of truth for what the student knows.
metadata:
  {
    "openclaw": {
      "emoji": "🧠"
    }
  }
---

# Knowledge Graph

The central nervous system of the mentor. Tracks every concept the student
has encountered, its mastery status, and connections to other concepts.

## The Graph File

Maintained at `~/.mentor/knowledge-graph.md`:

```markdown
# Knowledge Graph

## Mastered (do not re-explain from scratch)
| Concept | First Seen | Mastered | Related | Sessions |
|---------|-----------|----------|---------|----------|
| Softmax | 2026-01-15 | 2026-01-17 | attention, cross-entropy | S001, S003 |
| Backpropagation | 2026-01-10 | 2026-01-12 | chain rule, autodiff | S001 |

## Learning (in progress, may need reinforcement)
| Concept | First Seen | Confidence | Related | Sessions |
|---------|-----------|------------|---------|----------|
| Flash Attention | 2026-02-01 | 3/5 | attention, tiling, SRAM | S045 |
| RLHF | 2026-02-05 | 2/5 | PPO, reward model, KL | S048 |

## Not Started (prerequisites identified)
| Concept | Prerequisites | Priority |
|---------|--------------|----------|
| Ring Attention | Flash Attention, distributed | High |
| Mamba/SSM | recurrence, convolutions | Medium |
```

## How Other Skills Use This

### ai-mentor (before explaining anything):
```
1. Search knowledge-graph for the concept
2. If MASTERED: "We covered [concept] on [date]. Building on that..."
3. If LEARNING: "Last time we discussed [concept] (confidence: X/5). Let's deepen..."
4. If NOT STARTED: Check prerequisites. If all met, proceed. If not, study prereqs first.
```

### concept-explainer (before any explanation):
```
1. Check knowledge-graph for the concept AND all related concepts
2. Tailor explanation depth: mastered concepts get one-line references,
   learning concepts get medium detail, new concepts get full treatment
3. Explicitly link: "This is similar to [mastered concept] because..."
```

### assignment-manager (when creating problems):
```
1. Don't create basic problems for mastered concepts
2. For mastered: create advanced/transfer problems
3. For learning: create reinforcement problems
4. For not_started: don't assign yet — study first
```

## Updating the Graph

After every session, update the graph:
1. New concepts discussed → add with status "learning", confidence 1/5
2. Concepts explained well by student → increase confidence
3. Concepts where student answered perfectly on quiz → consider for "mastered"
4. Mastery criteria: confident = 5/5, correct on 2+ assignments, can explain to others

## Cross-Referencing

When a concept comes up in discussion:
1. Find ALL related concepts in the graph
2. For each related mastered concept: "This connects to [X] which you mastered"
3. For each related learning concept: "This is related to [Y] which we're working on"
4. For each related not-started: "We'll eventually connect this to [Z]"

## Concept Taxonomy

Major branches:
- **Fundamentals**: linear algebra, probability, optimization, information theory
- **Architectures**: transformers, CNNs, RNNs, SSMs, diffusion, flow
- **Training**: loss functions, optimizers, regularization, distributed
- **Inference**: quantization, serving, caching, batching
- **Alignment**: RLHF, DPO, safety, interpretability
- **Applications**: NLP, CV, RL, multimodal, agents
- **Engineering**: MLOps, data pipelines, evaluation, monitoring
