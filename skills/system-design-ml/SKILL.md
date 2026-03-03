---
name: system-design-ml
description: >
  ML system design practice and evaluation. Covers recommendation systems,
  search ranking, fraud detection, LLM serving, real-time ML.
  Use when: user says "design a system", "ML system design", "how would you build",
  "design interview", "architecture for X at scale".
  NOT for: code-level architecture (use architecture-patterns), pure coding (use coding-challenges).
metadata:
  { "openclaw": { "emoji": "🏗️" } }
---

# ML System Design

Structured ML system design practice for interviews and real-world architecture.

## Design Framework

### Step 1: Requirements (5 min)
- What exactly does the system need to do?
- Scale: QPS, data volume, latency requirements
- Online vs offline vs near-real-time?
- Constraints: budget, team size, timeline

### Step 2: Data (10 min)
- What data is available? What needs to be collected?
- Data freshness requirements
- Feature engineering strategy
- Training data vs serving data

### Step 3: Model (15 min)
- Baseline: what's the simplest approach?
- Proposed approach: why this model?
- Input features → model → output
- Training procedure: loss, optimizer, hardware
- Offline evaluation: metrics, dataset splits

### Step 4: Serving (10 min)
- Online vs batch prediction
- Latency budget breakdown
- Feature serving: precomputed vs on-the-fly
- Model serving: framework, hardware, scaling
- Caching strategy

### Step 5: Monitoring (5 min)
- Online metrics vs offline metrics
- Data drift detection
- Model performance degradation
- Alerting and fallback strategy

### Step 6: Iteration (5 min)
- A/B testing plan
- How to improve: more data, better features, bigger model?
- Technical debt and maintenance

## Problem Bank

### Classic Problems
1. **Recommendation System** (Netflix/YouTube): collaborative filtering → deep learning → multi-stage
2. **Search Ranking** (Google/Bing): query understanding → candidate retrieval → ranking
3. **Fraud Detection**: imbalanced classification → real-time scoring → feedback loops
4. **Ad Click Prediction**: feature engineering → wide & deep → calibration
5. **Content Moderation**: multi-label classification → human-in-the-loop → appeals

### LLM-Era Problems
6. **LLM Serving Infrastructure**: batching, KV cache, speculative decoding, multi-tenant
7. **RAG System**: retrieval → reranking → generation → citation
8. **AI Agent Platform**: tool use, planning, memory, safety guardrails
9. **Semantic Search**: embedding models → ANN index → hybrid search
10. **AI-Powered Customer Support**: intent detection → retrieval → generation → escalation

### Advanced Problems
11. **Self-Driving Perception**: sensor fusion → 3D detection → tracking → prediction
12. **Drug Discovery ML**: molecular representation → property prediction → generation
13. **Real-Time Bidding**: latency constraints → feature serving → model freshness

## Interview Simulation

When user says "mock interview":
1. Pick a problem (or let user choose)
2. Set timer: 45 minutes
3. User drives, mentor asks clarifying questions
4. At end: structured feedback on each dimension
5. Score: requirements (1-5), data (1-5), model (1-5), serving (1-5), depth (1-5)
