---
name: mlops-practices
description: >
  MLOps best practices: ML pipelines, model versioning, CI/CD for ML,
  monitoring, feature stores, reproducibility. Use when: user asks about
  "MLOps", "ML pipeline", "model versioning", "MLflow", "model monitoring",
  "feature store", "ML in production".
metadata:
  { "openclaw": { "emoji": "⚙️" } }
---

# MLOps Practices

Production ML operations from development to monitoring.

## MLOps Maturity Levels
1. **Manual**: Notebooks, manual deployment, no versioning
2. **Pipeline**: Automated training pipeline, basic versioning
3. **CI/CD**: Automated testing, validation, deployment
4. **Full automation**: Continuous training, monitoring, retraining

## Key Components

### ML Pipelines
| Tool | Strengths | Best For |
|------|----------|---------|
| Kubeflow | K8s native, scalable | Large teams, cloud |
| Airflow | Mature, large ecosystem | Data engineering teams |
| Prefect | Modern Python, dynamic | Medium teams |
| Dagster | Asset-based, type-safe | Software-oriented teams |
| Metaflow | Simple, Netflix-proven | Research → production |

### Model Versioning
- **MLflow**: Experiment tracking + model registry + deployment
- **DVC**: Git-like versioning for data and models
- **Weights & Biases**: Cloud experiment tracking + collaboration
- What to version: code, data, hyperparameters, environment, model weights

### Model Monitoring
- **Data drift**: Input distribution changes (KS test, PSI)
- **Concept drift**: Relationship between input→output changes
- **Performance degradation**: Metrics decay over time
- Alert thresholds and automatic retraining triggers

### CI/CD for ML
- **CI**: Lint, test, validate data schema, check model quality
- **CD**: Deploy model to staging → canary → production
- **CT**: Continuous training on new data with validation gates

### Reproducibility Checklist
- [ ] Code version pinned (git commit)
- [ ] Data version pinned (DVC/hash)
- [ ] Environment pinned (Docker/conda)
- [ ] Random seeds set
- [ ] Hardware specified
- [ ] All hyperparameters logged
