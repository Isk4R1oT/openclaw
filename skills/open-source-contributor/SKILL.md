---
name: open-source-contributor
description: >
  Contributing to ML open source projects. Finding issues, reading codebases,
  writing PRs. Use when: user says "contribute to open source", "find issues",
  "how to contribute to PyTorch/HuggingFace", "open source ML".
metadata:
  { "openclaw": { "emoji": "🤝" } }
---

# Open Source Contributor

Guide to meaningful contributions to ML open-source projects.

## Good First Projects
| Project | Areas | Good For |
|---------|-------|---------|
| PyTorch | Core ops, autograd, distributed | Deep understanding |
| HuggingFace Transformers | Models, tokenizers, pipelines | Breadth of models |
| vLLM | Serving, batching, GPU | Inference optimization |
| LangChain | Chains, agents, tools | LLM applications |
| scikit-learn | Algorithms, preprocessing | Classical ML |
| MLflow | Tracking, registry, deployment | MLOps |

## Contribution Workflow
1. **Find an issue**: label:good-first-issue, help-wanted
2. **Understand the codebase**: Read docs, run tests, trace a simple path
3. **Discuss**: Comment on the issue with your proposed approach
4. **Implement**: Fork → branch → code → tests → PR
5. **Review**: Respond to feedback promptly and thoroughly
6. **Iterate**: Address comments, keep PR focused

## Using github skill
```
gh issue list --repo pytorch/pytorch --label "good first issue"
gh pr create --title "Fix: ..." --body "Fixes #..."
```

## Tips for ML Codebases
- Run the full test suite before making changes
- Match existing code style exactly
- Include tests for your changes
- Performance matters — benchmark if relevant
- Documentation is valued as much as code
