---
name: curriculum-tracker
description: >
  Manage a structured AI/ML learning curriculum with books, courses, papers,
  and topic progression. Use when: user asks "what should I study next",
  "where am I in the curriculum", "add this book", "mark chapter complete",
  "show my progress", "learning plan", "what's the roadmap".
  NOT for: individual session tracking (use study-session), paper finding (use paper-research).
metadata:
  {
    "openclaw": {
      "emoji": "🗺️"
    }
  }
---

# Curriculum Tracker

Manages the long-arc learning journey through AI/ML. Tracks books chapter by chapter,
courses lecture by lecture, paper lists by topic, and overall progress.

## Curriculum File

Maintained at `~/.mentor/curriculum.md`:

```markdown
# AI/ML Learning Curriculum

## Current Focus: [topic area]
## Overall Progress: [X]%

### Books
| Book | Progress | Status |
|------|----------|--------|
| Deep Learning (Goodfellow) | Ch 8/20 | In Progress |
| Probabilistic ML (Murphy) | Ch 0/28 | Not Started |

### Courses
| Course | Progress | Status |
|--------|----------|--------|
| Karpathy Zero to Hero | 5/8 lectures | In Progress |
| CS224N (Stanford) | 0/20 | Not Started |

### Paper Lists by Topic
| Topic | Papers Read | Total | Key Papers |
|-------|-----------|-------|------------|
| Attention | 5 | 12 | Vaswani 2017, Flash Attention |
| RLHF | 2 | 8 | InstructGPT, DPO |

### Concepts Mastered (links to knowledge-graph)
- [concept]: mastered on [date], session [link]
```

## Prerequisites System

Before suggesting a topic, check if prerequisites are met:
- Attention mechanisms → requires: linear algebra, softmax, matrix multiplication
- RLHF → requires: policy gradient, reward modeling, KL divergence
- Diffusion models → requires: score matching, Gaussian processes, ELBO
- Flash Attention → requires: attention mechanism, GPU memory hierarchy, tiling

If a prerequisite is missing (check knowledge-graph), study it first.

## Adding Items

When user says "add this book" or provides a new resource:
1. Extract: title, author, chapter count (if possible)
2. Ask which section of curriculum it fits
3. Add to `~/.mentor/curriculum.md`
4. Identify which topics it covers
5. Suggest reading order based on prerequisites

## Progress Tracking

When user asks "show my progress":
1. Read `~/.mentor/curriculum.md`
2. Cross-reference with knowledge-graph for concept mastery
3. Show: overall %, per-book %, per-course %, papers read
4. Highlight: next recommended items based on current momentum

## Suggesting Next Steps

When user asks "what next":
1. Check current focus area
2. Find the next item in sequence (book chapter, lecture, paper)
3. Verify prerequisites are met
4. Check if there are any high-priority items (pending assignments, due reviews)
5. Suggest with rationale: "Next: Chapter 9 on CNNs, because you just mastered backprop"
