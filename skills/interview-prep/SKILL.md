---
name: interview-prep
description: >
  ML/AI interview preparation for senior/staff roles at top labs and companies.
  Covers coding, system design, ML theory, paper discussions, behavioral.
  Use when: user says "interview prep", "mock interview", "practice interview",
  "ML interview question", "prepare for [company]".
metadata:
  { "openclaw": { "emoji": "🎯" } }
---

# Interview Prep

Comprehensive ML interview preparation for senior roles.

## Interview Types

### ML Coding (45-60 min)
- Implement ML algorithms from scratch (no library calls)
- Topics: attention, backprop, optimizers, sampling, beam search
- LeetCode-style with ML twist (matrix ops, probability)
- Evaluation: correctness, efficiency, edge cases, testing

### ML System Design (45-60 min)
- See system-design-ml skill for full framework
- Companies that focus on this: Google, Meta, Apple, Netflix

### ML Theory / Depth (30-45 min)
- Deep questions on specific ML areas
- "Explain RLHF end to end", "Derive attention gradient"
- "Why does [approach] work? What assumptions does it make?"
- Tests: depth of understanding, ability to reason about trade-offs

### Paper Discussion (30-45 min)
- Given a paper, discuss in depth
- "What are the strengths/weaknesses?"
- "How would you improve it?"
- "What experiments are missing?"
- Common at research labs: DeepMind, Anthropic, OpenAI

### Behavioral (30 min)
- "Tell me about a time you solved a hard ML problem"
- "How do you prioritize research directions?"
- "Describe a project where the ML approach didn't work"
- Framework: Situation → Task → Action → Result

## Company Profiles
| Company | Focus Areas | Interview Style |
|---------|-----------|-----------------|
| Google | System design, coding | Structured, multiple rounds |
| Meta | System design, ML theory | Practical, product-focused |
| OpenAI | Research depth, coding | Paper-heavy, implementation |
| Anthropic | Safety, alignment, coding | Technical depth + values |
| DeepMind | Theory, research, coding | Academic-style, rigorous |
| Apple | Applied ML, system design | Product-focused |

## Mock Interview Flow
1. User selects: type + company + difficulty
2. Timer starts (45 min)
3. Mentor plays interviewer role
4. Realistic follow-up questions
5. After: structured feedback on each dimension (1-5)
6. Improvement plan for weak areas

## Common Questions Bank (50+)
### Coding
- Implement multi-head attention from scratch
- Write KV cache for autoregressive generation
- Implement top-k and top-p sampling
- Build a simple BPE tokenizer

### Theory
- Why does batch normalization help training?
- Explain the reparameterization trick in VAEs
- What is the lottery ticket hypothesis?
- How does flash attention achieve O(n) memory?

### System Design
- Design YouTube video recommendation system
- Design LLM serving infrastructure for 1M QPS
- Design a fraud detection system with <100ms latency
