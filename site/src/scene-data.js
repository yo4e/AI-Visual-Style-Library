import { benchmark, combinedPrompt, styles } from "./style-data.js";
import { youngManDetailedBenchmark as youngManBenchmark } from "./young-man-detailed-scene.js";
import results from "../provenance/young-man-full-body-detailed-generation-results.json" with { type: "json" };
import watercolorResults from "../provenance/young-man-detailed-watercolor-generation-results.json" with { type: "json" };
import currentStyleResults from "../provenance/young-man-all-current-styles-generation-results.json" with { type: "json" };
import rejected from "../provenance/young-man-rejected-samples.json" with { type: "json" };

export const sceneBenchmarks = { station: benchmark, "young-man": youngManBenchmark };
const youthSamples = new Map([results, watercolorResults, currentStyleResults].flatMap(collection => collection.images.filter(sample => {
  if (rejected.samples.some(item => item.slug === sample.slug && item.sourceSha256 === sample.sourceSha256)) return false;
  const style = styles.find(style => style.slug === sample.slug);
  return style && collection.benchmarkId === youngManBenchmark.id &&
    collection.benchmarkVersion === youngManBenchmark.version &&
    sample.benchmarkId === youngManBenchmark.id &&
    sample.benchmarkVersion === youngManBenchmark.version &&
    sample.submittedPrompt === combinedPrompt(style, youngManBenchmark) &&
    sample.imagePath === `/images/young-man-full-body-detailed/${style.slug}.webp`;
})).map(sample => [sample.slug, sample]));

export function hasSceneSample(scene, slug) {
  return scene === "station" ? styles.some(style => style.slug === slug && style.image && style.imageStatus !== "pending") : Boolean(youthSamples.get(slug));
}

export function styleForScene(style, scene = "station") {
  const sampleBenchmark = sceneBenchmarks[scene] || benchmark;
  if (scene !== "young-man") return { ...style, sampleBenchmark, sampleModel: style.sampleRecord ? style.sampleModel : "GPT Image 2", sampleNotes: style.sampleRecord?.qualityNotes || style.sampleNotes || null };
  const sample = youthSamples.get(style.slug);
  // The approved detailed scene uses the girl's rendering text unchanged.
  // Original-brief and expanded outputs remain in their separate histories.
  return {
    ...style,
    sampleBenchmark,
    image: sample?.imagePath || null,
    imageStatus: sample ? "ready" : "pending",
    sampleModel: sample?.model || null,
    sampleRecord: sample || null,
    sampleNotes: sample?.qualityNotes || null,
    fullSamplePrompt: combinedPrompt(style, sampleBenchmark),
    sceneSpecificStyle: /\b(?:woman|map|train|commuters)\b/i.test(style.stylePrompt),
  };
}
