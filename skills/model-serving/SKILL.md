---
name: model-serving
description: >
  Model serving and inference optimization: serving frameworks, quantization,
  compilation, speculative decoding, KV cache, batching strategies.
  Use when: user asks about "model serving", "inference", "quantization",
  "vLLM", "latency", "throughput", "speculative decoding", "KV cache".
metadata:
  { "openclaw": { "emoji": "🚀" } }
---

# Model Serving

Inference optimization and serving infrastructure.

## Serving Frameworks
| Framework | Focus | Key Feature |
|-----------|-------|-------------|
| vLLM | LLM serving | PagedAttention, continuous batching |
| TGI | LLM serving (HF) | Token streaming, quantization |
| Triton | General | Multi-framework, ensemble |
| TorchServe | PyTorch | Torch-native, simple |
| SGLang | LLM serving | RadixAttention, structured generation |
| Ollama | Local LLMs | Easy setup, GGUF models |

## Quantization Methods
| Method | Bits | Quality Loss | Speed Gain | When to Use |
|--------|------|-------------|-----------|-------------|
| FP16/BF16 | 16 | None | 2× | Default for training/inference |
| INT8 | 8 | Minimal | 2-4× | Production serving |
| GPTQ | 4 | Small | 3-4× | Memory-constrained serving |
| AWQ | 4 | Small | 3-4× | Better activation handling |
| GGUF | 2-8 | Variable | Variable | CPU inference, edge |
| FP8 | 8 | Minimal | 2× | H100 GPU native |

## LLM-Specific Optimizations

### KV Cache Management
- Standard: O(batch × seq_len × layers × heads × dim) memory
- PagedAttention (vLLM): Virtual memory for KV cache, reduces waste
- Multi-Query Attention: Share K,V across heads, reduce cache size
- Prefix caching: Reuse KV cache for shared prompt prefixes

### Speculative Decoding
- Use small "draft" model to generate N candidate tokens
- Large model verifies all N in parallel (single forward pass)
- Accept matching tokens, reject from first mismatch
- Speedup: proportional to draft model's accuracy

### Continuous Batching
- Don't wait for all sequences to finish
- New requests join batch as slots free up
- Significantly higher throughput vs static batching

## Benchmarking
Key metrics:
- **TTFT**: Time to first token (latency)
- **ITL**: Inter-token latency (streaming speed)
- **Throughput**: Tokens per second at given concurrency
- **Memory**: Peak GPU memory usage
