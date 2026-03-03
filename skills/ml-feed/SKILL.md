---
name: ml-feed
description: >
  Morning briefing and AI/ML news digest. Monitors arxiv, ML blogs, and newsletters
  for new content. Use when: user says "what's new", "morning briefing", "anything
  on arxiv", "recent ML news", "what dropped today", "catch me up", or during
  morning cron trigger. Filters by relevance to current curriculum.
  NOT for: deep paper reading (use arxiv-reader), finding specific papers (use paper-research).
metadata:
  {
    "openclaw": {
      "emoji": "📰"
    }
  }
---

# ML Feed — Morning Briefing

Curates daily AI/ML content from trusted sources, filtered by curriculum relevance.

## Morning Briefing Format

```markdown
# Morning Briefing — [date]

## Top Papers (arxiv)
1. **[Title]** — [authors] (arxiv:[id])
   [1-sentence summary]. Relevant to: [curriculum topic]

2. **[Title]** — [authors]
   [1-sentence summary]. Relevant to: [curriculum topic]

3. **[Title]** — [authors]
   [1-sentence summary]

## Blog Posts
1. **[Title]** — [blog name]
   [1-sentence summary]. [link]

2. **[Title]** — [blog name]
   [1-sentence summary]. [link]

## Notable
- [Any major AI news, model releases, benchmark results]

## Today's Suggested Reading
[Pick the single most relevant item for today's curriculum focus]
Estimated read time: [X] min
```

## Sources

### Blogs (use blogwatcher to track)
- **Lilian Weng** (lilianweng.github.io) — Deep technical explainers
- **Andrej Karpathy** (karpathy.github.io) — Training insights, architectures
- **Jay Alammar** (jalammar.github.io) — Visual explanations
- **Eugene Yan** (eugeneyan.com) — Applied ML, RecSys, LLM patterns
- **Chip Huyen** (huyenchip.com) — ML systems, deployment
- **Sebastian Raschka** (sebastianraschka.com) — LLM research
- **Hugging Face Blog** (huggingface.co/blog) — Model releases, tutorials
- **Google AI Blog** (ai.googleblog.com) — Research updates
- **OpenAI Blog** (openai.com/blog) — Model releases
- **Anthropic Research** (anthropic.com/research) — Safety, interpretability

### Arxiv Categories
- cs.LG (Machine Learning)
- cs.AI (Artificial Intelligence)
- cs.CL (Computation and Language / NLP)
- cs.CV (Computer Vision)
- stat.ML (Statistics - Machine Learning)
- cs.NE (Neural and Evolutionary Computing)

### Newsletters
- Import AI (Jack Clark) — Weekly AI policy + research
- The Batch (Andrew Ng) — Weekly ML digest
- TLDR AI — Daily AI news

### Podcasts (for summarize --youtube)
- Machine Learning Street Talk
- Lex Fridman Podcast (AI episodes)
- The TWIML AI Podcast
- Gradient Dissent (W&B)

## Filtering by Curriculum

1. Read current focus from `~/.mentor/curriculum.md`
2. Get "learning" concepts from knowledge-graph
3. Prioritize content matching current focus
4. Flag content on upcoming curriculum topics as "preview"
5. Deprioritize content on already-mastered topics unless it's breakthrough new work

## Using blogwatcher

```bash
blogwatcher scan          # Check all tracked blogs for new posts
blogwatcher list          # Show tracked blogs
blogwatcher add "URL"     # Add a new blog to track
```
