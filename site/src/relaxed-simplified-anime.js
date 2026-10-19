// Exact V2 rendering instructions and the validated parent-generated station sample.
import sample from "../provenance/relaxed-simplified-anime-active-sample.json" with { type: "json" };
export const relaxedSimplifiedAnimeStyles = [
  {
    "slug": "anime-relaxed-simplified",
    "name": "Relaxed Simplified Anime",
    "family": "anime",
    "density": "airy",
    "image": "/images/anime-relaxed-simplified.webp",
    "imageStatus": "ready",
    "short": "Economical contours · Broad hair locks · Few flat shadow shapes",
    "definition": "Moderate figure stylization and broad, readable shapes reduce visual detail while keeping distinctive clothing, posture and silhouette recognizable.",
    "characteristics": {
      "Line": "Clean economical contours",
      "Paint & shading": "Flat local colors with a few broad cel shadows",
      "Texture": "Minimal surface detail and decoration"
    },
    "vocabulary": [
      "economical contours",
      "broad hair locks",
      "restrained cel shading"
    ],
    "stylePrompt": "Create a relaxed, simplified anime-and-manga illustration with moderate stylization rather than chibi proportions. For human figures, aim for approximately 5.5 to 6 heads tall while preserving the supplied age and identity. Use clean, economical contour lines and clear, rounded shapes. Group hair into broad, readable locks instead of drawing individual strands. Simplify clothing into large shapes and flat color areas, with only a few essential folds and details. Use restrained cel shading and broad shadow shapes instead of intricate rendering or glossy material effects. Keep the subject recognizable through its hairstyle, clothing design, posture, and silhouette. Preserve the supplied local colors of skin, hair, clothing, objects, and surroundings; soften saturation and contrast without replacing their color identities or imposing a fixed palette. Reduce visual noise without losing distinctive features. For nonhuman subjects, use the same broad, readable forms and restrained surface detail. Keep the requested background structure, objects, and environmental cues legible; do not replace the scene with a blank backdrop. Follow the separate subject, scene, and composition instructions. Avoid photorealism, highly polished ornate rendering, intricate costume textures, and super-deformed or chibi anatomy.",
    "watchFor": "Keep distinctive design cues while reducing hair subdivisions, clothing folds, shadows, and surface detail. Simplification should preserve the requested colors and readable setting rather than turn the figure into chibi or erase the background.",
    "translations": {
      "ja": {
        "name": "ゆるく省略したアニメ",
        "short": "少ない輪郭線 · 大きな髪の束 · 少数の平面的な影",
        "definition": "適度なデフォルメと大きな形で描き込みを抑え、服のデザイン、姿勢、シルエットの特徴を残す表現です。",
        "characteristics": {
          "線": "すっきりした少ない輪郭線",
          "塗り・陰影": "元の色を保つ面塗りと少数のセル影",
          "質感": "質感や細かな装飾を抑える"
        },
        "vocabularyLabels": [
          "少ない輪郭線",
          "大きな髪の束",
          "控えめなセル影"
        ],
        "watchFor": "髪の分割、服のしわ、影、表面の描写を減らしながら、デザインの特徴を残します。指定色と場面の分かりやすさを保ち、SD化や背景の省略だけに頼らないことが大切です。",
        "coverAdvice": ""
      }
    },
    "generationStylePrompt": "Create a relaxed, simplified anime-and-manga illustration with moderate stylization rather than chibi proportions. For human figures, aim for approximately 5.5 to 6 heads tall while preserving the supplied age and identity. Use clean, economical contour lines and clear, rounded shapes. Group hair into broad, readable locks instead of drawing individual strands. Simplify clothing into large shapes and flat color areas, with only a few essential folds and details. Use restrained cel shading and broad shadow shapes instead of intricate rendering or glossy material effects. Keep the subject recognizable through its hairstyle, clothing design, posture, and silhouette. Preserve the supplied local colors of skin, hair, clothing, objects, and surroundings; soften saturation and contrast without replacing their color identities or imposing a fixed palette. Reduce visual noise without losing distinctive features. For nonhuman subjects, use the same broad, readable forms and restrained surface detail. Keep the requested background structure, objects, and environmental cues legible; do not replace the scene with a blank backdrop. Follow the separate subject, scene, and composition instructions. Avoid photorealism, highly polished ornate rendering, intricate costume textures, and super-deformed or chibi anatomy.",
    "medium": "Illustration",
    "color": "Soft, cohesive local colors",
    "texture": "Minimal surface detail",
    "era": "Contemporary",
    "mood": "Relaxed",
    "lineStyle": "Clean economical contours",
    "coverAdvice": "",
    "related": [
      "anime-adult-everyday-cel",
      "two-tone-cel"
    ],
    "keywords": [
      "relaxed",
      "simplified",
      "broad shapes",
      "moderate stylization",
      "ゆるアニメ",
      "省略",
      "大きな髪の束",
      "抜け感",
      "breathing room"
    ]
  }
].map(style => ({...style, sampleRecord:sample, sampleModel:sample.model}));
