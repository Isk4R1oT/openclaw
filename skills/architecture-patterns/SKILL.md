---
name: architecture-patterns
description: >
  Deep dive into neural network architecture patterns: attention variants,
  normalization, activations, MoE, SSMs, hybrid architectures.
  Use when: user asks about "attention variants", "architecture comparison",
  "RoPE vs ALiBi", "pre-norm vs post-norm", "mixture of experts", "Mamba".
metadata:
  { "openclaw": { "emoji": "🧱" } }
---

# Architecture Patterns

Deep technical coverage of neural network architecture components.

## Attention Variants
| Variant | Key Idea | KV Cache | Quality |
|---------|----------|----------|---------|
| Multi-Head (MHA) | Separate Q,K,V per head | O(n·h·d) | Baseline |
| Multi-Query (MQA) | Shared K,V across heads | O(n·d) | Slightly worse |
| Grouped-Query (GQA) | K,V shared in groups | O(n·g·d) | Close to MHA |
| Flash Attention | Tiled computation in SRAM | Same | Same (exact) |
| Ring Attention | Distributed across devices | Sharded | Same (exact) |
| Sliding Window | Local attention window | O(w·h·d) | Trade-off |
| Linear Attention | Kernel trick, O(n) | O(d²) | Often worse |

## Position Encodings
| Method | Key Idea | Extrapolation | Used In |
|--------|----------|--------------|---------|
| Sinusoidal | Fixed sin/cos | Poor | Original Transformer |
| Learned | Trainable embeddings | None | GPT-2, BERT |
| RoPE | Rotation matrices | Good with NTK | LLaMA, Qwen |
| ALiBi | Linear bias on attention | Excellent | BLOOM, MPT |
| YaRN | RoPE + NTK scaling | Extended | LLaMA extended |

## Normalization
| Method | Formula | Where | Used In |
|--------|---------|-------|---------|
| LayerNorm | (x-μ)/σ · γ + β | Post-attention (original) | BERT, GPT-2 |
| Pre-LayerNorm | LN before attention | Pre-attention | GPT-3+, most LLMs |
| RMSNorm | x/RMS(x) · γ | Pre-attention | LLaMA, Gemma |
| DeepNorm | α·x + SubLayer(LN(x)) | Deep transformers | GLM-130B |

## Activation Functions
| Function | Formula | Properties | Used In |
|----------|---------|-----------|---------|
| ReLU | max(0,x) | Sparse, dead neurons | CNNs, older models |
| GELU | x·Φ(x) | Smooth, standard | BERT, GPT |
| SwiGLU | Swish(xW)⊙(xV) | Gated, +parameter | LLaMA, PaLM |
| GeGLU | GELU(xW)⊙(xV) | Gated | Some T5 variants |

## Mixture of Experts (MoE)
- Router selects top-k experts per token
- Load balancing loss prevents expert collapse
- Sparse computation: only k of N experts active
- Examples: Mixtral (8 experts, top-2), Switch Transformer (top-1)
- Key concern: load balancing, expert specialization, training instability

## State Space Models
- Mamba: selective state spaces, input-dependent dynamics
- S4: structured state space, long-range dependencies
- Hybrid: Mamba + attention blocks (Jamba architecture)
- Trade-off: O(n) vs O(n²) but often lower quality per parameter

## For Each Pattern
When explaining, cover:
1. Mathematical formulation
2. Implementation details (shapes, code)
3. Why it works (intuition)
4. When to use vs alternatives
5. Historical context (what came before, what improved)
