---
name: ai-safety
description: >
  AI safety and alignment: RLHF mechanics, constitutional AI, interpretability,
  red teaming, adversarial attacks, governance. Both technical and philosophical.
  Use when: user asks about "alignment", "safety", "interpretability", "jailbreaking",
  "red teaming", "mechanistic interpretability", "AI governance", "existential risk".
metadata:
  { "openclaw": { "emoji": "🛡️" } }
---

# AI Safety & Alignment

Technical and philosophical aspects of making AI systems safe and aligned.

## Alignment Techniques

### RLHF Pipeline
1. Collect preference data: (prompt, response_A, response_B, preference)
2. Train reward model: R(prompt, response) → scalar
3. Fine-tune with PPO: maximize R while staying close to SFT policy
4. Challenges: reward hacking, distributional shift, annotation quality

### DPO (Direct Preference Optimization)
- Skip reward model training
- Directly optimize: L = -log σ(β(log π(y_w|x)/π_ref(y_w|x) - log π(y_l|x)/π_ref(y_l|x)))
- Simpler pipeline, often competitive with RLHF
- Variants: IPO, KTO, ORPO

### Constitutional AI
- Define principles (constitution)
- Model critiques its own outputs against principles
- Revise outputs based on self-critique
- Train on revised outputs (RLAIF)

## Interpretability

### Mechanistic Interpretability
- Goal: understand what neural networks learn internally
- Circuits: identify computational subgraphs for specific behaviors
- Features: find what individual neurons/directions represent
- Superposition: one neuron encodes multiple features

### Tools and Techniques
- Probing: train linear classifiers on activations
- Attention patterns: what tokens attend to what
- Activation patching: causally test which components matter
- Sparse autoencoders: decompose activations into interpretable features
- Logit lens: decode intermediate representations through unembedding

## Red Teaming
- Systematic adversarial testing
- Prompt injection: override system instructions
- Jailbreaking: bypass safety training
- Categories: harmful content, bias, hallucination, privacy
- Defense: input filtering, output filtering, robust training

## Governance & Policy
- Responsible disclosure practices
- Model evaluation before release
- Compute governance
- Open vs closed source debate
- Regulatory landscape: EU AI Act, executive orders

## Key Readings
- Superintelligence (Bostrom)
- Human Compatible (Russell)
- RLHF Book (Lambert)
- Anthropic's research on interpretability
- OpenAI's system card methodology
