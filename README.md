# tabulakit-v2 (Astro development fork)

**Status:** v2 Astro/Starlight development fork — in progress. Not yet the canonical TabulaKit.

This is the v2 Astro development fork of [`heatherstoneio/tabulakit`](https://github.com/heatherstoneio/tabulakit). Scaffolding work is tracked under [OPORD 202604-019](https://gitlab.com/heatherstone/mojo/-/issues/685) (TabulaKit Repo Split + v2 Astro Scaffold + Build Pipeline).

## Current Users → Use Upstream

If you want a working TabulaKit template *today* (including for the April 29, 2026 course), use the upstream v1 repo:

👉 **[heatherstoneio/tabulakit](https://github.com/heatherstoneio/tabulakit)**

The v1 Docsify path is unchanged and will stay the course-delivery source of truth until v2 reaches stability and merges back.

## What This Fork Is

A place to rebuild TabulaKit on [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) while the v1 Docsify path continues shipping. Driven by Plan 202604-004 (TabulaKit Productization) and the April 2026 intelligence review on [Mojo Decomposition and Astro Migration Feasibility](https://gitlab.com/heatherstone/mojo/-/blob/main/docs/s2-intelligence/research/mojo-decomposition-and-astro-migration.md).

**What's changing:**
- Site backend: Docsify → Astro/Starlight
- Build model: zero-build → `astro build` via GitHub Actions, deployed to GitHub Pages
- Content location: `site/` → `src/content/docs/`
- `/startup` skill → scaffold-level bootstrap script that seeds initial Setup-tab GitHub Issues on fork-clone

**What's not changing:**
- Fork-based template model (you fork a TabulaKit repo, you get a site)
- Claude Code integration philosophy

## Merge-Back Plan

Once v2 proves stable — Phase A (OPORDs 020-022) complete, at least one non-founder user successfully onboarded via the v2 flow, and no open high-priority blockers — this fork **merges back** to upstream `heatherstoneio/tabulakit`. At that point:

- `heatherstoneio/tabulakit` becomes the Astro-based canonical TabulaKit (v2 branding becomes just "TabulaKit")
- `heatherstoneio/tabulakit-v2` is archived (or retained as a reference branch/tag)
- v1 Docsify users from the April 14 dry run are personally migrated; the v1 branch/tag remains accessible for reference

**Merge-back criteria (OPORD backbrief 2026-04-19):**
1. v2 scaffold builds + deploys green end-to-end (OPORD 202604-019 complete)
2. Sites, Tasks, Setup panels operational (OPORDs 020-022 complete, or OSS shell outcome per OPORD 023 resolved)
3. At least one non-founder user successfully onboarded against v2
4. Zero `priority::high` blockers open against v2

Merge-back will be tracked in its own OPORD (not yet drafted) once criteria are approaching satisfaction.

## For Contributors

This fork's `main` is the integration target for Phase A work. Once scaffold commits land (Phase 1 of OPORD 019), branch protection on `main` activates — direct pushes will be blocked in favor of PRs.

Sub-forks for the Phase 2 green-deploy verification test are welcomed; follow the instructions in `.github/workflows/deploy.yml` once it exists.

## Questions / Issues

Open an issue at [heatherstone/mojo](https://gitlab.com/heatherstone/mojo) (the Heatherstone operational repo) with label `opord::202604-019`.
