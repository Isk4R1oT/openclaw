---
name: cv-deep-dive
description: >
  Deep computer vision coverage: CNNs, ViTs, object detection, segmentation,
  generative vision models, video understanding.
  Use when: user asks about CV topics, "convolutions", "ViT", "object detection",
  "YOLO", "segmentation", "diffusion for images", "CLIP".
metadata:
  { "openclaw": { "emoji": "👁️" } }
---

# Computer Vision Deep Dive

Comprehensive CV coverage from fundamentals to SOTA.

## Architecture Evolution

### CNN Era
- **LeNet** (1998): First practical CNN
- **AlexNet** (2012): Deep CNNs + GPU, started the revolution
- **VGG** (2014): Deeper = better (3×3 kernels only)
- **GoogLeNet/Inception** (2014): Multi-scale filters, efficient
- **ResNet** (2015): Skip connections, enabled 100+ layers
- **EfficientNet** (2019): Compound scaling (width × depth × resolution)

### Vision Transformer Era
- **ViT** (2020): Patch embeddings → transformer → classification
- **DeiT** (2021): Data-efficient training with distillation
- **Swin** (2021): Hierarchical ViT with shifted windows
- **DINOv2** (2023): Self-supervised ViT, strong features
- Key insight: ViTs need more data but scale better than CNNs

### Detection & Segmentation
- **Two-stage**: Faster R-CNN (region proposals → classification)
- **One-stage**: YOLO family (direct prediction), SSD
- **Transformer-based**: DETR (set prediction with Hungarian matching)
- **Segmentation**: Mask R-CNN, SAM (Segment Anything Model)
- **Panoptic**: Unified instance + semantic segmentation

### Generative Vision
- **GANs**: StyleGAN (high-quality faces), conditional generation
- **Diffusion**: Stable Diffusion, DALL-E, architecture and math
- **Flow matching**: Rectified flows, consistency models
- **Multimodal**: CLIP (contrastive vision-language), LLaVA, Flamingo

## Key Concepts
- Receptive field and how it grows with depth
- Feature pyramid networks for multi-scale detection
- Anchor-free vs anchor-based detection
- Self-supervised pretraining (DINO, MAE, SimCLR)
- Vision-language alignment (CLIP, SigLIP)
