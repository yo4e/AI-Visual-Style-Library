# Prototype Instructions

## Confirmed design direction

- The user selected the first generated field-guide layout.
- Use the clean white page background from the second generated option instead of the first option's warm ivory background.
- The revised source image is `/Users/yo4e/.codex/generated_images/01a0cc90-aab0-7fc3-9fc1-eb5063543feb/exec-f25de709-d5f3-4441-bbb4-fcc4426c1073.png`.
- Keep visual discovery, controlled benchmark samples, and readable style vocabulary central to this prototype.
- Treat this as a usable prompt library. Keep the character/scene prompt separate from each visual-style prompt so people can copy the style alone for their own subject.
- Write and validate prompts before generating gallery examples. Each published benchmark image must come from the prompt parts shown for that style; record the submitted prompt and image provenance.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
