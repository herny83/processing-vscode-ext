---
name: onboarding
agent: onboarding-agent
description: "Onboard a new or unfamiliar project: scan structure, clarify intentions, generate memory, detect code style, and suggest Copilot customizations."
argument-hint: "Describe any special goals or requirements for the project."
---

# Project Onboarding Prompt

Onboard this project autonomously:

1. Scan and summarize the project structure, main files, and dependencies.
2. Search for existing customizations (memories, agents, skills, prompts, instructions) in .github, .copilot, and .claude folders. Reference and reuse them as needed.
3. Ask clarifying questions about unclear areas, project intentions, or missing documentation. Use input variables like `${input:projectGoal}` if needed.
4. Generate memory notes for each important area/module (architecture, APIs, business logic, etc.).
5. Detect or ask about code style and generate instructions or a copilot-instructions.md file if needed.
6. Suggest relevant agents, skills, and prompts based on the project’s scope and tech stack.
7. Propose new customizations (skills, prompts, instructions) to improve Copilot’s effectiveness.

Output actionable onboarding results, including:
- Project summary
- Clarifying questions (if needed)
- Memory notes for key areas
- Code style notes or instructions
- Suggestions for agents, skills, and prompts
- Proposed new customizations

Use Markdown links to reference project files or documentation. Test and refine this onboarding workflow as project needs evolve.
