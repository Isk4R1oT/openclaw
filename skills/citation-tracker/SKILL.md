---
name: citation-tracker
description: >
  Track paper citations and idea lineage. Maps which papers cite which,
  identifies must-read papers, traces evolution of ideas.
  Use when: user asks "what cites this paper", "trace the history of X",
  "paper lineage for Y", "most cited papers on Z", "citation graph".
metadata:
  {
    "openclaw": {
      "emoji": "🔗"
    }
  }
---

# Citation Tracker

Tracks paper citation relationships and idea evolution.

## Citation Graph

Maintained at `~/.mentor/citation-graph.md`:

```markdown
# Citation Graph

## Papers Read
| Paper ID | Title | Year | Cites | Cited By (known) |
|----------|-------|------|-------|------------------|
| vaswani2017 | Attention Is All You Need | 2017 | bahdanau2015 | flash-attn, gpt2, bert |
| dao2022 | Flash Attention | 2022 | vaswani2017 | flash-attn-2, ring-attn |

## Idea Lineage Trees
### Attention
bahdanau2015 → vaswani2017 → flash-attention → flash-attention-2 → ring-attention
                           → multi-query-attn → grouped-query-attn

### Language Models
GPT → GPT-2 → GPT-3 → InstructGPT → ChatGPT → GPT-4
                    → Chinchilla → LLaMA → LLaMA 2 → LLaMA 3
```

## When Reading a Paper

After arxiv-reader processes a paper:
1. Extract key references from the paper
2. Add to citation graph
3. Identify "must-read" papers that appear in 3+ citation lists
4. Update idea lineage trees
5. Suggest: "This paper heavily cites [X] which you haven't read — consider reading it first"

## Tracing Ideas

When user asks "trace the history of [concept]":
1. Find the earliest known paper on the concept
2. Follow the citation chain forward
3. Identify key branch points where the idea diverged
4. Present as a timeline with brief descriptions
5. Highlight which papers in the chain the student has already read

## Must-Read Detection

Papers that appear in many citation lists are flagged:
- Appears in 5+ papers' references → "Essential read"
- Appears in 3-4 papers → "Strongly recommended"
- Cross-check with knowledge-graph: skip if all concepts are mastered
