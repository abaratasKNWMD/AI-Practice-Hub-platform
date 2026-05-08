---
name: code-rag-index-codex
description: Use when Codex needs to design, inspect, or improve a code RAG index with semantic chunks, metadata, ACLs, and evals.
---

# Code RAG Index Codex

Use this skill for enterprise RAG work where Codex needs precise code context.

## Workflow

1. Identify target languages and parser strategy.
2. Prefer semantic chunks:
   - function;
   - class;
   - endpoint;
   - test;
   - config;
   - ADR/doc.
3. Attach metadata:
   - file;
   - range;
   - symbol;
   - imports/exports;
   - callers;
   - related tests;
   - owner;
   - ACL;
   - freshness.
4. Separate `embedding_text` from `display_text`.
5. Define retrieval tools:
   - `search_symbol`;
   - `find_related_tests`;
   - `explain_callers`;
   - `find_policy_docs`.
6. Add evals:
   - Recall@k;
   - MRR;
   - faithfulness;
   - latency;
   - ACL correctness.

## Rules

- Do not chunk by raw token windows unless there is no better parser.
- Do not expose results before ACL filtering.
- Do not treat RAG as source of truth without citations.
- Keep stale chunks detectable by commit SHA or timestamp.
