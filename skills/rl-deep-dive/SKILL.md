---
name: rl-deep-dive
description: >
  Deep reinforcement learning coverage: MDPs, value methods, policy gradient,
  actor-critic, model-based RL, RLHF connection.
  Use when: user asks about RL, "policy gradient", "PPO", "reward model",
  "exploration", "Bellman equation", "value function".
metadata:
  { "openclaw": { "emoji": "🎮" } }
---

# Reinforcement Learning Deep Dive

From MDP fundamentals to RLHF for LLMs.

## Fundamentals

### MDP Framework
- State s, Action a, Reward r, Transition P(s'|s,a), Discount γ
- Value function: V(s) = E[Σ γᵗrₜ | s₀=s]
- Action-value: Q(s,a) = E[Σ γᵗrₜ | s₀=s, a₀=a]
- Bellman equation: V(s) = max_a [R(s,a) + γ Σ P(s'|s,a)V(s')]

### Algorithm Taxonomy
| Category | Examples | Key Idea |
|----------|---------|----------|
| Value-based | DQN, Rainbow, C51 | Learn Q(s,a), act greedily |
| Policy gradient | REINFORCE, PPO, A3C | Directly optimize policy |
| Actor-critic | A2C, SAC, TD3 | Combine value + policy |
| Model-based | Dreamer, MuZero, MBPO | Learn dynamics model |
| Offline RL | CQL, IQL, Decision Transformer | Learn from fixed dataset |

### Policy Gradient Theorem
∇J(θ) = E_π[∇log π(a|s) · Q(s,a)]
- REINFORCE: use returns as Q estimate
- Baseline: subtract V(s) to reduce variance → Advantage A(s,a) = Q(s,a) - V(s)
- GAE: Generalized Advantage Estimation — λ-weighted TD errors

### PPO (used in RLHF)
- Clipped surrogate objective:
  L = min(r(θ)·A, clip(r(θ), 1-ε, 1+ε)·A)
- where r(θ) = π_new(a|s) / π_old(a|s)
- Prevents too-large policy updates
- Standard for RLHF: fine-tune LLM with PPO against reward model

### Connection to RLHF
1. Pretrained LLM = initial policy π
2. Reward model trained on human preferences
3. PPO optimizes: E[R(s,a)] - β·D_KL(π||π_ref)
4. KL penalty prevents forgetting pretrained capabilities
5. DPO alternative: directly optimize preferences without RL
