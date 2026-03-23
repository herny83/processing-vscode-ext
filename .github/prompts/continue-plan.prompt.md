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
4. **Execute** the step following PLAN.md instructions. Use the appropriate prompt or skill:
   - Migration steps (1.x) → follow `/file-migration` or `/symbol-migration` procedures
   - LSP steps (2.x) → follow `/lsp-feature-implementation` procedure
   - Other steps → follow PLAN.md directly
5. **Validate** using the step's acceptance criteria (usually `npx tsc --noEmit`).
6. **Update** `.github/PROGRESS.md`:
   - Check off `[x]` the completed step
   - Add a one-line note with today's date and what was done
   - Update the "Last Session" section:
     - Date: today
     - Completed: what was just finished
     - Next step: the next unchecked item
     - Error count: current `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l`
     - Notes: any blockers or decisions made
7. **Ask** the user if they want to continue to the next step or stop.

## Rules

- Always read PROGRESS.md before doing anything.
- Never skip steps — they are ordered by dependency.
- If a step is blocked by something unexpected, note it in PROGRESS.md and move to the next independent step if possible.
- If the user asks to jump to a specific step, warn if prerequisites are incomplete.
