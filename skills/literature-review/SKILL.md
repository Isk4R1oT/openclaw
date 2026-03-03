---
name: literature-review
description: >
  Guide writing structured literature reviews on AI/ML topics. Produces
  comprehensive review documents with proper citations and gap analysis.
  Use when: user says "literature review on X", "survey the field of Y",
  "what's the landscape of Z research", "review of approaches to W".
  NOT for: finding individual papers (use paper-research), reading one paper (use arxiv-reader).
metadata:
  {
    "openclaw": {
      "emoji": "📖"
    }
  }
---

# Literature Review Guide

Produces structured literature reviews that synthesize a research area.

## Process

### Step 1: Define Scope (5 min)
- What is the research question or area?
- Time period: all-time or recent (last 2-3 years)?
- Breadth: narrow (one technique) or broad (an entire subfield)?
- Depth: survey-level or deep technical?

### Step 2: Find Seminal Papers (15 min)
Use paper-research skill to find:
- The 3-5 foundational papers that defined the area
- Key survey papers already written on this topic
- Citation graph: what does everyone cite?

### Step 3: Trace Evolution (20 min)
- Map the chronological development of ideas
- Identify key paradigm shifts
- Note which ideas were abandoned and why
- Track how evaluation metrics evolved

### Step 4: Categorize Approaches (15 min)
Create a taxonomy:
- Group papers by approach/methodology
- Identify pros/cons of each category
- Note which approaches are currently dominant

### Step 5: Identify Gaps (10 min)
- What hasn't been tried?
- What assumptions are commonly made but rarely challenged?
- Where do current methods fail?
- What would an ideal solution look like?

### Step 6: Write Review (30 min)
Output to `~/.mentor/lit-reviews/[topic].md`:

```markdown
# Literature Review: [Topic]
Date: [date]
Papers reviewed: [count]

## 1. Introduction
[Why this area matters, scope of review]

## 2. Background
[Key concepts needed to understand the field]

## 3. Historical Development
[Chronological evolution of approaches]

## 4. Taxonomy of Approaches
### 4.1 [Category A]
[Papers, methods, results]
### 4.2 [Category B]
[Papers, methods, results]

## 5. Comparative Analysis
| Method | Approach | Key Result | Limitation |
|--------|----------|-----------|------------|

## 6. Open Problems and Future Directions
[Gaps identified, promising directions]

## 7. References
[All papers cited]
```

## Integration

- Cross-reference with knowledge-graph: mastered concepts get brief mentions
- Link to curriculum-tracker: suggest this review as a curriculum milestone
- Generate flashcards for key distinctions between approaches
