---
name: peer-review-sim
description: >
  Simulate academic peer review for ML papers/reports. Review user's writing
  as a NeurIPS/ICML reviewer, or have user practice reviewing real papers.
  Use when: user says "review my paper", "peer review", "act as a reviewer",
  "I want to practice reviewing", "review this report".
metadata:
  { "openclaw": { "emoji": "🔬" } }
---

# Peer Review Simulator

Simulates rigorous ML conference peer review.

## Mode 1: Review User's Writing

When user submits a technical report or paper draft:

### Review Format (NeurIPS/ICML style)
```markdown
## Summary
[2-3 sentences describing the paper's contribution]

## Strengths
1. [specific strength with reference to section]
2. [specific strength]
3. [specific strength]

## Weaknesses
1. [specific weakness with suggested fix]
2. [specific weakness]
3. [specific weakness]

## Questions for Authors
1. [clarification question]
2. [deeper question about methodology]
3. [question about experimental setup]

## Minor Issues
- [typos, formatting, notation inconsistencies]

## Overall Assessment
- Soundness: [1-4]
- Significance: [1-4]
- Novelty: [1-4]
- Clarity: [1-4]
- Overall: [1-10]
- Confidence: [1-5]

## Recommendation
[Accept / Weak Accept / Borderline / Weak Reject / Reject]
```

### Review Calibration
- Be rigorous but constructive
- Every weakness should include a suggestion
- Acknowledge what works well
- Focus on substance, not style
- Flag mathematical errors specifically

## Mode 2: User Practices Reviewing

1. Present a real paper (from reading queue or arxiv)
2. User writes their review
3. Mentor evaluates the review:
   - Did they identify the key strengths?
   - Did they catch the real weaknesses?
   - Are their questions substantive?
   - Is the overall assessment well-calibrated?
4. Show "model review" for comparison

## What Good Reviewers Look For
- Clarity of problem formulation
- Soundness of methodology
- Fairness of experimental comparison
- Sufficient ablations
- Reproducibility details
- Limitations acknowledged
- Proper related work coverage
