---
name: review-changes
agent: code-reviewer
description: "Run an isolated code review of uncommitted + staged changes on the current branch. Use before /wrap-up."
argument-hint: "Optional: file path or area to focus on (default: full diff)"
---

# Review Pending Changes

Run an independent review of all pending changes (uncommitted + staged) on the current branch, before they get committed.

## Scope

- **Default**: review every changed file (both unstaged and staged) against the `code-reviewer` agent's checklist.
- **If `${input:focus}` is provided**: deep-dive on that file or directory, but still skim the rest of the diff for cross-cutting impact (e.g., a signature change in `${input:focus}` may break callers elsewhere).

## What to ignore

- **Untracked files in `out/`, `node_modules/`, `*.vsix`, `*.log`** — build artifacts, not source.
- **Auto-formatted whitespace-only changes** unless they cause merge conflicts or break tabs-vs-spaces convention (this repo uses tabs).
- **Files in `.gitignore`** — they wouldn't ship anyway.

## Hand off

After reporting, end with one of:

- **APPROVE / APPROVE WITH NITS** → suggest the user run `/wrap-up` to commit.
- **REQUEST CHANGES / BLOCK** → list the must-fix items and stop. Do not suggest committing.

Do not stage, commit, or modify any files yourself — review only.
