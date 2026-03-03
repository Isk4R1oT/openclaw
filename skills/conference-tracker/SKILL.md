---
name: conference-tracker
description: >
  Track ML conference deadlines, accepted papers, and events.
  Use when: user asks about conference deadlines, accepted papers, what conferences
  to attend, or says "NeurIPS papers", "ICML deadline", "conference calendar".
metadata:
  {
    "openclaw": {
      "emoji": "🎤"
    }
  }
---

# Conference Tracker

Tracks ML conferences, deadlines, and paper releases.

## Major Conferences

| Conference | Typical Deadline | Typical Date | Focus |
|-----------|-----------------|-------------|-------|
| NeurIPS | May | December | General ML |
| ICML | January | July | General ML |
| ICLR | September | May | Representation Learning |
| ACL | January | July | NLP |
| EMNLP | June | December | NLP |
| CVPR | November | June | Computer Vision |
| ECCV | March | October | Computer Vision |
| AAAI | August | February | General AI |
| AISTATS | October | April | Statistics + ML |
| CoLM | March | October | Language Models |

## Features

### Deadline Alerts
Use web_search to check upcoming deadlines:
```
web_search: "[conference] 2026 submission deadline"
```
Alert user 2 weeks and 1 week before deadlines of interest.

### Accepted Papers
When conference papers are released:
1. Search for accepted paper lists
2. Filter by curriculum relevance
3. Present top 10 most relevant papers
4. Add to reading queue

### Conference Planning
Help decide which conferences to follow:
- Based on curriculum focus areas
- Suggest specific workshops or tutorials
- Plan reading schedule around paper releases

## Storing Data

Track at `~/.mentor/conferences.md`:
```markdown
# Conference Tracker

## Upcoming Deadlines
| Conference | Deadline | Interest Level |
|-----------|----------|---------------|

## Papers to Read from Conferences
| Conference | Year | Paper | Status |
|-----------|------|-------|--------|
```
