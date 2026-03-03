---
name: jax-patterns
description: >
  JAX best practices and functional patterns. Use when: user asks about JAX,
  "how to do X in JAX", jit/vmap/pmap usage, Flax patterns, JAX gotchas.
metadata:
  { "openclaw": { "emoji": "⚡" } }
---

# JAX Patterns

Functional ML patterns with JAX transformations.

## Core Principles
- **Pure functions**: No side effects, no mutation
- **Explicit state**: Model parameters passed as arguments
- **Composable transforms**: jit, vmap, pmap, grad stack freely

## Key Transforms
```python
# JIT compilation
@jax.jit
def train_step(params, batch): ...

# Automatic vectorization
batched_predict = jax.vmap(predict, in_axes=(None, 0))

# Automatic differentiation
grad_fn = jax.grad(loss_fn)  # or jax.value_and_grad

# Multi-device parallelism
parallel_step = jax.pmap(train_step, axis_name='devices')
```

## Common Gotchas
1. **In-place mutation**: JAX arrays are immutable. Use `jnp.array.at[i].set(v)`
2. **Control flow in jit**: Use `jax.lax.cond`, `jax.lax.fori_loop` not Python if/for
3. **Random keys**: Always split keys, never reuse: `key, subkey = jax.random.split(key)`
4. **Shapes in jit**: All array shapes must be static (known at compile time)
5. **Side effects**: No print() in jit. Use `jax.debug.print()`
6. **Global state**: No global variables. Pass everything as arguments
7. **NaN debugging**: `jax.config.update("jax_debug_nans", True)`

## Flax Model Pattern
```python
class TransformerBlock(nn.Module):
    d_model: int
    n_heads: int
    @nn.compact
    def __call__(self, x, mask=None, deterministic=True):
        residual = x
        x = nn.LayerNorm()(x)
        x = nn.MultiHeadDotProductAttention(num_heads=self.n_heads)(x, mask=mask, deterministic=deterministic)
        x = residual + x
        residual = x
        x = nn.LayerNorm()(x)
        x = nn.Dense(4 * self.d_model)(x)
        x = nn.gelu(x)
        x = nn.Dense(self.d_model)(x)
        return residual + x
```

## PyTorch vs JAX Comparison
| Pattern | PyTorch | JAX |
|---------|---------|-----|
| Gradient | loss.backward() | jax.grad(loss_fn)(params) |
| GPU transfer | tensor.cuda() | Automatic (jax.devices()) |
| Batch dim | DataLoader | jax.vmap |
| Multi-GPU | DDP/FSDP | jax.pmap |
| Compilation | torch.compile | jax.jit |
