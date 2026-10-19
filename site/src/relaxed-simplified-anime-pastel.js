// Exact saved V3 trial instructions, adopted as an additional style by the owner.
import sample from "../provenance/relaxed-simplified-anime-pastel-active-sample.json" with { type: "json" };
export const relaxedSimplifiedAnimePastelStyles = [
  {
    "slug": "anime-relaxed-simplified-pastel",
    "name": "Relaxed Simplified Anime — Pastel",
    "family": "anime",
    "density": "airy",
    "image": "/images/anime-relaxed-simplified-pastel.webp",
    "imageStatus": "ready",
    "short": "Economical contours · Broad hair locks · Pastel-toned color",
    "definition": "The relaxed simplified anime treatment with an added pastel-toned color instruction. Broad hair locks and economical cel shadows remain the shared rendering approach.",
    "characteristics": {
      "Line": "Clean economical contours",
      "Paint & shading": "Pastel-toned local colors with a few broad cel shadows",
      "Texture": "Minimal surface detail and decoration"
    },
    "vocabulary": [
      "economical contours",
      "broad hair locks",
      "pastel-toned color treatment"
    ],
    "stylePrompt": "Create a relaxed, simplified anime-and-manga illustration with moderate stylization rather than chibi proportions. For human figures, aim for approximately 5.5 to 6 heads tall while preserving the supplied age and identity. Use clean, economical contour lines and clear, rounded shapes. Group hair into broad, readable locks instead of drawing individual strands. Simplify clothing into large shapes and flat color areas, with only a few essential folds and details. Use restrained cel shading and broad shadow shapes instead of intricate rendering or glossy material effects. Keep the subject recognizable through its hairstyle, clothing design, posture, and silhouette. Preserve the supplied local colors of skin, hair, clothing, objects, and surroundings; soften saturation and contrast without replacing their color identities or imposing a fixed palette. Reduce visual noise without losing distinctive features. For nonhuman subjects, use the same broad, readable forms and restrained surface detail. Keep the requested background structure, objects, and environmental cues legible; do not replace the scene with a blank backdrop. Follow the separate subject, scene, and composition instructions. Avoid photorealism, highly polished ornate rendering, intricate costume textures, and super-deformed or chibi anatomy.\nUse a pastel-toned color treatment.",
    "watchFor": "Pastel tone adjusts the overall color treatment without requiring a specific hue for clothing, hair, objects, or surroundings. The difference from the standard variant can be subtle and varies between generations.",
    "translations": {
      "ja": {
        "name": "ゆるく省略したアニメ（パステル調）",
        "short": "少ない輪郭線 · 大きな髪の束 · パステル調の色",
        "definition": "ゆるく省略したアニメの描き方に、パステル調の色の指定を加えた版です。大きな髪の束と少ないセル影を共通の特徴にしています。",
        "characteristics": {
          "線": "すっきりした少ない輪郭線",
          "塗り・陰影": "パステル調の面塗りと少数のセル影",
          "質感": "質感や細かな装飾を抑える"
        },
        "vocabularyLabels": [
          "少ない輪郭線",
          "大きな髪の束",
          "パステル調の色"
        ],
        "watchFor": "服、髪、物、周囲を特定の色に固定せず、全体の色調をパステル寄りに指定します。通常版との差は小さく見える場合があり、生成ごとにも変わります。",
        "coverAdvice": ""
      }
    },
    "generationStylePrompt": "Create a relaxed, simplified anime-and-manga illustration with moderate stylization rather than chibi proportions. For human figures, aim for approximately 5.5 to 6 heads tall while preserving the supplied age and identity. Use clean, economical contour lines and clear, rounded shapes. Group hair into broad, readable locks instead of drawing individual strands. Simplify clothing into large shapes and flat color areas, with only a few essential folds and details. Use restrained cel shading and broad shadow shapes instead of intricate rendering or glossy material effects. Keep the subject recognizable through its hairstyle, clothing design, posture, and silhouette. Preserve the supplied local colors of skin, hair, clothing, objects, and surroundings; soften saturation and contrast without replacing their color identities or imposing a fixed palette. Reduce visual noise without losing distinctive features. For nonhuman subjects, use the same broad, readable forms and restrained surface detail. Keep the requested background structure, objects, and environmental cues legible; do not replace the scene with a blank backdrop. Follow the separate subject, scene, and composition instructions. Avoid photorealism, highly polished ornate rendering, intricate costume textures, and super-deformed or chibi anatomy.\nUse a pastel-toned color treatment.",
    "medium": "Illustration",
    "color": "Pastel-toned local colors",
    "texture": "Minimal surface detail",
    "era": "Contemporary",
    "mood": "Relaxed",
    "lineStyle": "Clean economical contours",
    "coverAdvice": "",
    "related": [
      "anime-relaxed-simplified",
      "anime-adult-everyday-cel"
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
      "breathing room",
      "pastel",
      "pastel tone",
      "パステル",
      "パステル調"
    ]
  }
].map(style => ({...style, sampleRecord:sample, sampleModel:sample.model}));
