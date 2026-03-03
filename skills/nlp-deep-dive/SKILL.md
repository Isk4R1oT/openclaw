---
name: nlp-deep-dive
description: >
  Deep NLP coverage: tokenization, language models, scaling laws, RLHF/DPO,
  in-context learning, RAG, long-context methods. Use when: user asks about
  NLP topics, "tokenization", "BPE", "language model", "scaling laws",
  "instruction tuning", "in-context learning", "RAG architecture".
metadata:
  { "openclaw": { "emoji": "📝" } }
---

# NLP Deep Dive

Comprehensive NLP coverage for advanced practitioners.

## Topic Map

### Tokenization
- **BPE**: Byte Pair Encoding — merge most frequent byte pairs
- **WordPiece**: Similar to BPE but uses likelihood-based merging
- **SentencePiece**: Language-agnostic, treats input as raw bytes
- **Unigram**: Probabilistic model, prune from large vocabulary
- Key insight: tokenizer quality directly affects model capability
- Practical: vocabulary size trade-off (32k vs 128k), multilingual considerations

### Language Model Architectures
- **Autoregressive (decoder-only)**: GPT family, LLaMA, predict next token
- **Masked LM (encoder-only)**: BERT, predict masked tokens, bidirectional
- **Encoder-Decoder**: T5, BART, seq2seq tasks
- **Prefix LM**: Combines causal and bidirectional (PaLM)
- Why decoder-only won: simpler, scales better, unifies tasks via generation

### Scaling Laws
- **Kaplan et al. (2020)**: Loss scales as power law with compute, data, parameters
- **Chinchilla (2022)**: Optimal balance — tokens ≈ 20× parameters
- **Post-Chinchilla**: Over-training for inference efficiency (LLaMA approach)
- **Emergent abilities**: Capabilities that appear at scale (chain-of-thought, few-shot)
- Critical question: Are emergent abilities real or measurement artifacts?

### Alignment Pipeline
1. **Pretraining**: Next-token prediction on web text
2. **SFT**: Supervised fine-tuning on instruction-response pairs
3. **RLHF**: Train reward model → optimize with PPO against KL constraint
4. **DPO**: Direct preference optimization — skip reward model
5. **Constitutional AI**: Self-critique and revision using principles
6. **RLAIF**: AI feedback instead of human feedback

### In-Context Learning
- Few-shot prompting: examples in context window
- Chain-of-thought: "Let's think step by step"
- Why it works: task vectors in activation space, implicit Bayesian inference
- Limitations: position bias, lost-in-the-middle, prompt sensitivity

### RAG (Retrieval-Augmented Generation)
- Architecture: Query → Retrieve → Augment prompt → Generate
- Retrieval: sparse (BM25) vs dense (embeddings) vs hybrid
- Chunking strategies: fixed-size, semantic, recursive
- Reranking: cross-encoder for precision
- Challenges: multi-hop reasoning, contradictory sources, hallucination
