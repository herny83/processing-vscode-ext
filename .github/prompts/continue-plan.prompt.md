---
name: continue-plan
description: "Resume work from the master plan. Reads PROGRESS.md, picks up where the last session left off, executes the next step."
---

# Continue Plan

Resume work on the Processing Extension from where the last session left off.

## Steps

1. **Read** `.github/PROGRESS.md` to find:
   - The "Last Session" section (what was done, what's next)
   - The first unchecked `[ ]` item in the checklist
2. **Read** `.github/PLAN.md` for the full details of that step.
3. **Announce** to the user: "Resuming at step X.Y — [step title]. Last session completed X.Z on [date]."
4. **Execute** the step following PLAN.md instructions:
   - Phase 1 (Unification) → follow PLAN.md directly
   - Phase 2 (antlr4ts → antlr4) → follow PLAN.md, change only imports and API calls
   - Phase 3 (Processing v4.0) → research and update grammar/stdlib
   - Phase 4 (LSP) → follow `/lsp-feature-implementation` procedure
   - Phase 5 (Debugger) → follow PLAN.md directly
   - Phase 6 (Publish) → follow PLAN.md directly
5. **Validate** using the step's acceptance criteria (usually `npx tsc --noEmit`).
6. **Update** `.github/PROGRESS.md`:
   - Check off `[x]` the completed step
   - Add a one-line note with today's date and what was done
   - Update the "Last Session" section
7. **Ask** the user if they want to continue to the next step or stop.

## Rules

- Always read PROGRESS.md before doing anything.
- Never skip steps — they are ordered by dependency.
- If a step is blocked, note it in PROGRESS.md and move to the next independent step if possible.
