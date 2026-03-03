---
name: pytorch-patterns
description: >
  PyTorch best practices, patterns, and idiomatic code. Use when: user asks
  about PyTorch patterns, "how to do X in PyTorch", "best practice for Y",
  "PyTorch 2.x features", "torch.compile", custom datasets, training patterns.
metadata:
  { "openclaw": { "emoji": "🔥" } }
---

# PyTorch Patterns

Idiomatic PyTorch 2.x patterns for production ML code.

## Essential Patterns

### Custom Dataset
```python
class MyDataset(torch.utils.data.Dataset):
    def __init__(self, data, transform=None):
        self.data = data
        self.transform = transform
    def __len__(self): return len(self.data)
    def __getitem__(self, idx):
        x = self.data[idx]
        if self.transform: x = self.transform(x)
        return x
```

### Modern Training Loop
```python
model = torch.compile(model)  # PyTorch 2.x
scaler = torch.amp.GradScaler()
for batch in dataloader:
    with torch.amp.autocast(device_type="cuda", dtype=torch.bfloat16):
        loss = model(batch).loss
    scaler.scale(loss / accumulation_steps).backward()
    if (step + 1) % accumulation_steps == 0:
        scaler.unscale_(optimizer)
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        scaler.step(optimizer)
        scaler.update()
        optimizer.zero_grad(set_to_none=True)
        scheduler.step()
```

### Distributed Training (FSDP)
```python
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
model = FSDP(model, auto_wrap_policy=transformer_auto_wrap_policy)
```

### Efficient Inference
```python
model.eval()
with torch.inference_mode():
    output = model(input)
```

## Key Gotchas
- `zero_grad(set_to_none=True)` is faster than `zero_grad()`
- `torch.inference_mode()` is faster than `torch.no_grad()`
- Always use `torch.amp.autocast` not deprecated `torch.cuda.amp`
- `torch.compile` needs warmup — first call is slow
- `pin_memory=True` in DataLoader for GPU training
- Use `persistent_workers=True` with `num_workers>0`
