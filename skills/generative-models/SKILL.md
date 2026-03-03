---
name: generative-models
description: >
  Deep coverage of generative AI: VAEs, GANs, diffusion, flow models,
  autoregressive generation. Mathematical foundations for each family.
  Use when: user asks about "diffusion models", "VAE", "ELBO", "GAN training",
  "flow matching", "score matching", "DDPM math", "sampling strategies".
metadata:
  { "openclaw": { "emoji": "🎨" } }
---

# Generative Models

Mathematical foundations and practical aspects of all generative model families.

## Taxonomy

### Autoregressive Models
- p(x) = Π p(xᵢ | x₁,...,xᵢ₋₁)
- GPT family, WaveNet, PixelCNN
- Pros: exact likelihood, simple training
- Cons: sequential generation, slow sampling

### Variational Autoencoders (VAEs)
- ELBO = E_q[log p(x|z)] - D_KL(q(z|x) || p(z))
- Reparameterization trick: z = μ + σ⊙ε, ε~N(0,I)
- VQ-VAE: discrete latents, codebook learning
- β-VAE: β > 1 for disentangled representations
- Key limitation: posterior collapse, blurry outputs

### GANs
- min_G max_D E[log D(x)] + E[log(1-D(G(z)))]
- Training dynamics: Nash equilibrium (often unstable)
- Mode collapse: generator produces limited variety
- Wasserstein GAN: Earth Mover distance, more stable
- StyleGAN: style-based generator, progressive growing

### Diffusion Models
- Forward: q(xₜ|xₜ₋₁) = N(√(1-βₜ)xₜ₋₁, βₜI)
- Reverse: learn p_θ(xₜ₋₁|xₜ) ≈ N(μ_θ(xₜ,t), σₜ²I)
- Training: predict noise ε_θ(xₜ, t) with MSE loss
- Score matching connection: ε_θ ∝ -σₜ ∇log p(xₜ)
- Classifier-free guidance: ε̃ = ε_uncond + w·(ε_cond - ε_uncond)
- Latent diffusion: operate in VAE latent space (Stable Diffusion)

### Flow Models
- Normalizing flows: invertible transforms, exact log-likelihood
- Flow matching: regress on vector field, simple training
- Rectified flows: straight-line paths, fewer sampling steps
- Consistency models: direct mapping from noise to data

## Key Questions for Each Family
1. How is the model trained? (objective function)
2. How is sampling done? (generation procedure)
3. Can we compute exact likelihood?
4. Quality vs speed trade-off?
5. What are the failure modes?
