---
name: experiment-tracker
description: >
  Track, log, and compare ML experiments locally. Records hyperparameters,
  metrics, and observations. Use when: user says "log this experiment",
  "compare runs", "what was my best run", "experiment results",
  "track this training run", "what should I tune next".
metadata:
  { "openclaw": { "emoji": "📊" } }
---

# Experiment Tracker

Local experiment tracking with comparison and advising.

## Logging an Experiment

Store at `~/.mentor/experiments/log.jsonl` (one JSON object per line):

```json
{
  "id": "exp-001",
  "date": "2026-03-01",
  "name": "GPT-2 small finetune",
  "model": {"arch": "GPT-2", "params": "124M", "layers": 12},
  "hyperparams": {"lr": 3e-4, "bs": 32, "epochs": 10, "optimizer": "AdamW", "wd": 0.01},
  "dataset": {"name": "wikitext-103", "size": "100M tokens"},
  "metrics": {"train_loss": 2.8, "val_loss": 3.1, "val_ppl": 22.2},
  "notes": "Baseline run. Val loss plateaued at epoch 7.",
  "duration": "45 min"
}
```

## Comparing Runs

When asked to compare:
```markdown
| Experiment | LR | BS | Val Loss | Val PPL | Notes |
|-----------|------|-----|---------|---------|-------|
| exp-001 | 3e-4 | 32 | 3.1 | 22.2 | Baseline |
| exp-002 | 1e-4 | 64 | 2.9 | 18.1 | Lower LR helped |
| exp-003 | 1e-4 | 64 | 2.7 | 14.8 | + cosine schedule |
```

## Advising Next Steps

Based on experiment history, suggest:
- If loss plateaued → try learning rate warmup, cosine decay
- If overfitting → add dropout, reduce model size, more data
- If underfitting → larger model, longer training, lower LR
- If unstable → gradient clipping, warmup steps
- If slow → mixed precision, larger batch, torch.compile

## W&B Integration (optional)
If `wandb` CLI is available:
```bash
wandb login
wandb sync [run_dir]
```
Cross-reference local logs with W&B dashboard.
