#!/usr/bin/env node
// scripts/bootstrap.mjs
//
// TabulaKit v2 scaffold-level bootstrap — the v2 replacement for v1's
// `/startup` skill (OPORD 202604-019 issue #694).
//
// Runs on first fork-clone. Reads scripts/setup-items.json and creates
// the canonical initial set of Setup-tab GitHub Issues in the current
// repo. Idempotent: checks for existing issues labeled with the marker
// label (`tabulakit-setup`) and skips any item whose title is already
// present.
//
// The Setup tab UI itself ships from `tabulakit-core` under
// OPORD 202604-022 — this script just seeds the issues it will render.
//
// Requirements:
//   - gh CLI installed and authenticated against the target repo
//   - Run from the repo root (where package.json lives)
//
// Usage:
//   npm run bootstrap          # default
//   node scripts/bootstrap.mjs # equivalent

import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const setupItemsPath = resolve(__dirname, 'setup-items.json');

function log(msg) {
	process.stdout.write(`[bootstrap] ${msg}\n`);
}

function fail(msg, code = 1) {
	process.stderr.write(`[bootstrap] ERROR: ${msg}\n`);
	process.exit(code);
}

function ensureGh() {
	const ghCheck = spawnSync('gh', ['--version'], { encoding: 'utf8' });
	if (ghCheck.status !== 0) {
		fail(
			'`gh` CLI not found. Install from https://cli.github.com/ and run `gh auth login` before running bootstrap.',
		);
	}
	const authCheck = spawnSync('gh', ['auth', 'status'], { encoding: 'utf8' });
	if (authCheck.status !== 0) {
		fail('`gh auth status` failed. Run `gh auth login` and retry.');
	}
	log(`gh CLI OK (${ghCheck.stdout.split('\n')[0].trim()})`);
}

function detectRepo() {
	const result = spawnSync('gh', ['repo', 'view', '--json', 'nameWithOwner'], {
		encoding: 'utf8',
		cwd: repoRoot,
	});
	if (result.status !== 0) {
		fail(
			'Could not detect current repo via `gh repo view`. Are you inside a cloned GitHub repo?',
		);
	}
	try {
		const { nameWithOwner } = JSON.parse(result.stdout);
		return nameWithOwner;
	} catch {
		fail('Could not parse `gh repo view` output.');
	}
}

function loadSetupItems() {
	if (!existsSync(setupItemsPath)) {
		fail(`Missing setup-items file at ${setupItemsPath}`);
	}
	const raw = readFileSync(setupItemsPath, 'utf8');
	try {
		return JSON.parse(raw);
	} catch (e) {
		fail(`Invalid JSON in ${setupItemsPath}: ${e.message}`);
	}
}

function existingIssueTitles(repo, markerLabel) {
	const result = spawnSync(
		'gh',
		['issue', 'list', '--repo', repo, '--label', markerLabel, '--json', 'title', '--limit', '200'],
		{ encoding: 'utf8' },
	);
	if (result.status !== 0) {
		fail(`gh issue list failed: ${result.stderr}`);
	}
	try {
		return new Set(JSON.parse(result.stdout).map((i) => i.title));
	} catch {
		fail('Could not parse `gh issue list` output.');
	}
}

function createIssue(repo, item) {
	const args = [
		'issue',
		'create',
		'--repo',
		repo,
		'--title',
		item.title,
		'--body',
		item.body,
	];
	for (const label of item.labels || []) {
		args.push('--label', label);
	}
	const result = spawnSync('gh', args, { encoding: 'utf8' });
	if (result.status !== 0) {
		// Most common failure: label does not exist yet. Retry without labels,
		// then warn.
		const retry = spawnSync(
			'gh',
			[
				'issue',
				'create',
				'--repo',
				repo,
				'--title',
				item.title,
				'--body',
				item.body,
			],
			{ encoding: 'utf8' },
		);
		if (retry.status !== 0) {
			log(`  ⚠️  failed to create issue "${item.title}": ${result.stderr.trim()}`);
			return null;
		}
		log(
			`  ⚠️  created "${item.title}" without labels (labels may not exist yet in this repo; re-run after /triage)`,
		);
		return retry.stdout.trim();
	}
	return result.stdout.trim();
}

function main() {
	log('TabulaKit v2 bootstrap starting');
	ensureGh();
	const repo = detectRepo();
	log(`target repo: ${repo}`);

	const config = loadSetupItems();
	const markerLabel = config.marker_label || 'tabulakit-setup';
	log(`loaded ${config.items.length} setup items (schema ${config.schema_version})`);

	const existing = existingIssueTitles(repo, markerLabel);
	if (existing.size > 0) {
		log(`found ${existing.size} existing issues labeled "${markerLabel}" — will skip duplicates`);
	}

	let created = 0;
	let skipped = 0;
	for (const item of config.items) {
		if (existing.has(item.title)) {
			log(`  • SKIP (exists): ${item.title}`);
			skipped += 1;
			continue;
		}
		const url = createIssue(repo, item);
		if (url) {
			log(`  ✓ CREATED: ${item.title} → ${url}`);
			created += 1;
		}
	}

	log('');
	log(`bootstrap complete — ${created} created, ${skipped} skipped (already existed)`);
	if (created === 0 && skipped > 0) {
		log('tip: bootstrap is idempotent; all items were already present.');
	}
}

main();
