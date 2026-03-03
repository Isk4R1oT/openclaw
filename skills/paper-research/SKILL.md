---
name: paper-research
description: >
  Find and curate AI/ML research papers on any topic. Use when: user asks
  "find papers on X", "what should I read about Y", "SOTA for Z", "seminal
  papers on W", "recent work on V", "paper list for", "research on".
  Returns structured paper lists with relevance assessment.
  NOT for: reading a specific paper (use arxiv-reader), blog posts (use ml-feed).
metadata:
  {
    "openclaw": {
      "emoji": "🔍"
    }
  }
---

# Paper Research

Finds and curates research papers using web search across academic sources.

## Search Strategy

### Step 1: Understand the Query
- Is user looking for: seminal/foundational, recent SOTA, survey/tutorial, or specific technique?
- Check knowledge-graph: what related concepts are already mastered?
- Check curriculum-tracker: does this align with current learning path?

### Step 2: Search Sources

**For seminal papers:**
```
web_search: "[topic] seminal paper foundational"
web_search: "[topic] original paper site:arxiv.org"
```

**For recent SOTA:**
```
web_search: "[topic] state of the art 2025 2026 site:arxiv.org"
web_search: "[topic] site:paperswithcode.com"
```

**For surveys:**
```
web_search: "[topic] survey review arxiv 2024 2025 2026"
```

### Step 3: Filter and Rank

For each paper found, assess:
- **Relevance** (1-5): How well does it match the query?
- **Quality** (1-5): Citation count, venue, author reputation
- **Accessibility** (1-5): How readable for this student's level?
- **Curriculum fit**: Does it align with current learning path?

### Step 4: Present Results

```markdown
## Papers Found: [topic]

### Must-Read (foundational)
1. **[Title]** ([Year]) — [Authors]
   URL: [link]
   Why: [1 sentence on importance]
   Prereqs: [concepts needed from knowledge-graph]

### Recommended (recent, relevant)
2. **[Title]** ([Year]) — [Authors]
   URL: [link]
   Why: [1 sentence]

### Optional (deep dive)
3. **[Title]** ([Year]) — [Authors]
   URL: [link]
```

### Step 5: Queue Management

Add selected papers to `~/.mentor/reading-queue.md`:
```markdown
# Reading Queue

| Priority | Paper | Topic | Added | Status |
|----------|-------|-------|-------|--------|
| High | Attention Is All You Need | attention | 2026-01-15 | Read |
| High | Flash Attention | attention | 2026-01-20 | Queued |
| Medium | Ring Attention | distributed | 2026-02-01 | Queued |
```

## Key Sources

- **arxiv.org**: cs.LG, cs.AI, cs.CL, cs.CV, stat.ML, cs.NE
- **paperswithcode.com**: Trending papers, task leaderboards
- **semanticscholar.org**: Citation graph, related papers
- **Google Scholar**: Broad coverage, citation counts
- **openreview.net**: ICLR/NeurIPS reviews (quality signal)
- **Connected Papers**: Visual citation graph exploration

## Avoiding Duplicates

Before suggesting a paper:
1. Check `~/.mentor/papers/` for already-read papers
2. Check `~/.mentor/reading-queue.md` for already-queued papers
3. Check knowledge-graph: if ALL concepts in the paper are mastered, it may be redundant
