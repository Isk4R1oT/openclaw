---
name: multimodal-ai
description: >
  Multimodal AI systems: vision-language, text-to-image, text-to-video,
  speech-language, code models. Architecture patterns for combining modalities.
  Use when: user asks about "CLIP", "multimodal", "vision-language", "LLaVA",
  "text-to-image architecture", "Stable Diffusion", "Whisper".
metadata:
  { "openclaw": { "emoji": "🌐" } }
---

# Multimodal AI

Systems that process and generate across multiple modalities.

## Vision-Language Models
| Model | Architecture | Key Innovation |
|-------|-------------|----------------|
| CLIP | Dual encoder (contrastive) | Zero-shot transfer via text-image alignment |
| BLIP-2 | Q-Former bridge | Lightweight vision-language connector |
| LLaVA | Vision encoder + LLM | Simple visual instruction tuning |
| Flamingo | Cross-attention to frozen LLM | Few-shot multimodal learning |
| GPT-4V | Native multimodal | Unified training, strongest capability |
| Gemini | Natively multimodal | Multi-modal from pretraining |

## Fusion Strategies
- **Early fusion**: Concatenate modality tokens, single transformer
- **Late fusion**: Separate encoders, combine at output
- **Cross-attention**: Attend from one modality to another
- **Projection**: Map one modality into another's embedding space (LLaVA approach)

## Text-to-Image
- Stable Diffusion: text encoder (CLIP) → cross-attention → UNet → VAE decode
- DALL-E 3: improved text understanding with detailed captions
- Key components: text encoder quality, guidance scale, sampling steps

## Text-to-Video
- Temporal extension of image diffusion models
- 3D UNet or temporal attention layers
- Challenges: temporal consistency, motion quality, compute cost

## Speech-Language
- Whisper: encoder-decoder, trained on 680k hours, multilingual
- AudioLM: hierarchical tokenization of audio
- SpeechGPT: unified text-speech model
- TTS: text → phonemes → mel spectrogram → waveform

## Evaluation Challenges
- No single metric captures multimodal quality
- Human evaluation often necessary
- Benchmarks: MMMU, MM-Vet, VQA, image-text alignment scores
