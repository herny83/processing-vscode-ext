---
name: wrap-up
description: "Verify build passes, then commit pending changes with a concise descriptive message. One-line title; body only when it adds future-reader value."
model: GPT-4.1
---

# Wrap Up & Commit

Close out the current work session: verify the build is green, then commit all pending changes with a meaningful message.

## Steps

### 1. Pre-commit gate (run in parallel)

```bash
git status
git diff --stat
git log -5 --oneline      # match repo commit style
npm run build             # all 4 tsc projects + root tsc must pass
```

If `npm run build` fails: **stop**. Do not commit. Report the errors and ask how to proceed. Never pass `--no-verify` or skip hooks to push past failures.

If you only edited config files (no code), you may skip `npm run build`.

### 2. Compose the commit message

**Title (required)**: one line, ≤70 characters, imperative mood, describes *what* changed in user-visible terms.

- Good: `Migrate moduleResolution to bundler and fix this-binding bugs`
- Good: `Enable strict mode for client and debugger workspaces`
- Bad: `Various fixes` (vague)
- Bad: `Updated 9 files` (count, not content)
- Bad: `WIP` (meaningless to a future reader)

**Body (optional)**: include **only** if it adds value a future reader would need:
- Why the change was made (when not obvious from the title)
- A non-obvious tradeoff or constraint
- A breaking change or migration note
- A list of fixed-but-related bugs (when the title can't fit them)

Skip the body for: refactors, dependency bumps, test additions, doc fixes, single-file fixes — the diff speaks for itself.

### 3. Stage and commit

Stage files **by name** (never `git add -A` or `git add .` — those can include `.env`, build artifacts, or unintended changes):

```bash
git add <file1> <file2> ...
```

Commit using a HEREDOC for clean formatting (always include the Co-Authored-By trailer):

```bash
git commit -m "$(cat <<'EOF'
<title line>

<optional body, only if useful>

Co-Authored-By: Copilot (GPT-4.1) <noreply@github.com>
EOF
)"
```

### 4. Verify

```bash
git status                # should report clean working tree
git log -1 --oneline      # confirm commit landed with the right title
```

Report the commit SHA and title to the user. Do **not** push to remote unless the user explicitly asks.

## Guardrails

- **Never commit secrets**: scan the diff for `.env`, `*.key`, `*.pem`, credentials, API tokens. If any are present, refuse and warn.
- **Never amend a published commit** (one already pushed to a remote branch). Always create a new commit.
- **Never bypass pre-commit hooks** with `--no-verify`. If a hook fails, surface the failure and ask the user.
- **Don't auto-push.** Pushing is a separate, explicit action.
- If `git status` shows nothing to commit, report that and stop — don't create empty commits.
