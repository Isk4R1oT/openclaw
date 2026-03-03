---
name: feature-store-design
description: >
  Feature store design and patterns. Use when: user asks about "feature store",
  "Feast", "feature engineering at scale", "online features", "point-in-time".
metadata:
  { "openclaw": { "emoji": "🏪" } }
---

# Feature Store Design

Centralized feature management for ML systems.

## When to Use a Feature Store
- Multiple models share the same features
- Need consistent features between training and serving
- Feature computation is expensive (precompute and cache)
- Point-in-time correctness is critical (prevent data leakage)

## Architecture
```
Data Sources → Feature Pipelines → Feature Store → Model Serving
                                  ├── Offline Store (batch)
                                  └── Online Store (real-time)
```

### Offline Store (Training)
- Backing stores: S3/GCS + Parquet, BigQuery, Snowflake, Delta Lake
- Used for: training data generation, batch predictions
- Must support: point-in-time joins, time-travel queries

### Online Store (Serving)
- Backing stores: Redis, DynamoDB, Cassandra, Bigtable
- Requirements: p99 < 10ms latency, high availability
- Features precomputed and materialized

## Point-in-Time Correctness
Critical to prevent training-serving skew and data leakage:
- At training time: use only features available BEFORE the label event
- Feature timestamps must precede event timestamps
- Implement temporal joins correctly

## Tools
| Tool | Type | Best For |
|------|------|---------|
| Feast | Open source | Standard feature store needs |
| Tecton | Managed | Complex real-time features |
| Hopsworks | Open source | End-to-end ML platform |
| Vertex AI FS | Managed | GCP-native teams |
| SageMaker FS | Managed | AWS-native teams |
