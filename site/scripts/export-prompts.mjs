import { writeFile } from "node:fs/promises";
import { benchmark, styles } from "../src/style-data.js";

const output = new URL("../../PROMPT_LIBRARY.md", import.meta.url);
const sections = [
  "# Prompt Library — ChatGPT image generation",
  "",
  "Use these as two independent pieces: a character and scene prompt for the gallery example, and a visual style prompt for the rendering treatment. To make your own image in a style, write your own subject description and paste only that style's prompt after it. To approach a gallery example, paste the shared character and scene prompt followed by its style prompt.",
  "",
  "The gallery images were selected from outputs generated after submitting these combined prompt parts. The exact submitted text and each image checksum are recorded in [`site/benchmark-manifest.json`](site/benchmark-manifest.json). The image tool did not expose a seed or underlying model version, so the same prompt can produce a different composition on another run.",
  "",
  "Text prompts target the visible technique, not an identical image. For a closer match to a gallery image, attach that image in ChatGPT as a visual reference and say to preserve its medium, mark making, palette, and texture while following your subject description. Keep the same image model and output shape when comparing results, then inspect repeated generations. [OpenAI's image prompting guide](https://developers.openai.com/api/docs/guides/image-prompting) describes reference-based edits and consistency checks.",
  "",
  "## Character and scene — shared benchmark",
  "",
  `Benchmark ID: \`${benchmark.id}\` · Version: \`${benchmark.version}\`. This prompt deliberately contains the person, pose, setting, and composition. It can be replaced in full when you want a different subject.`,
  "",
  "```text",
  benchmark.characterPrompt,
  "```",
  "",
  "## Visual style prompts",
  "",
];

for (const style of styles) {
  sections.push(
    `### ${style.name}`,
    "",
    `![${style.name} benchmark](site/public${style.image})`,
    "",
    "Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.",
    "",
    "```text",
    style.stylePrompt,
    "```",
    "",
    `**Watch for:** ${style.watchFor}`,
    "",
  );
}

await writeFile(output, `${sections.join("\n").trimEnd()}\n`, "utf8");
process.stdout.write(`Wrote ${output.pathname}\n`);
