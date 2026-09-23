export const benchmark = {
  id: "station-map-v3",
  label: "The station map",
  description:
    "A woman in a red coat studies a folded map on a train platform. The subject, framing, and scene remain the same so the visual language can change.",
  alt: "a woman in a red coat studying a folded map on a train platform",
  version: "3.0",
  characterPrompt:
    "Create one wide 16:9 landscape image, with no border or typography. A young adult East Asian woman with shoulder-length dark brown hair blowing gently to the left and expressive brown eyes wears a rust-red hooded coat and a black backpack. She holds an unfolded paper map in both hands at chest level, with the entire map visible near the lower edge. Frame her from the waist up in a medium close-up, slightly left of center: her head, torso, and map should fill most of the left half of the image. Her body is turned three-quarters to the right, and she looks up toward the right with a curious, slightly uncertain expression. She stands on a sunlit outdoor commuter-train platform. A long white commuter train with a muted teal stripe remains clearly visible across the right half of the background. The platform canopy and columns recede diagonally from the upper left; a few indistinct commuters stand far behind her. Keep the woman, map, platform, and train all clearly visible.",
};

export const styles = [
  {
    slug: "watercolor",
    name: "Watercolor",
    family: "Painting & drawing",
    image: "/images/watercolor.webp",
    short: "Transparent pigment · Fluid edges · Soft texture",
    definition:
      "Transparent washes let the paper glow through, while water softens boundaries and gathers pigment at the edges.",
    medium: "Paint",
    color: "Muted",
    texture: "Paper grain",
    era: "Timeless",
    mood: "Dreamy",
    lineStyle: "Soft",
    characteristics: {
      line: "Loose pencil-like contours; some edges dissolve into the wash.",
      color: "Layered, translucent color with luminous white paper.",
      texture: "Soft blooms, pigment pooling, and visible paper tooth.",
    },
    vocabulary: ["transparent watercolor washes", "soft bleeding edges", "paper texture", "pigment blooms"],
    stylePrompt:
      "Render the subject as a hand-painted watercolor illustration with contemporary Japanese animation-inspired drawing when people appear: simplified expressive faces and very fine pencil-like contours, never photorealistic skin. Layer transparent pigment over visible cold-press paper. Let pale powder-blue and warm beige washes bleed and pool softly in the background while retaining crisp, delicate detail at the focal face and hands. Leave luminous paper-white highlights and use one richer warm accent from the subject. The result should feel airy and visibly painted with water. Avoid realistic portrait rendering, opaque digital paint, thick black outlines, and smooth computer gradients.",
    watchFor: "If every edge is sharp and opaque, the result can read as digital painting rather than watercolor.",
    related: ["gouache", "ink-wash"],
    keywords: ["soft", "paint", "wash", "handmade", "fluid", "translucent"],
  },
  {
    slug: "risograph",
    name: "Risograph",
    family: "Printmaking",
    image: "/images/risograph.webp",
    short: "Two-color print · Grainy texture · Bold shapes",
    definition:
      "A stencil printing process with a small ink palette, textured solids, and imperfect color registration.",
    medium: "Print",
    color: "Limited",
    texture: "Paper grain",
    era: "Contemporary",
    mood: "Bold",
    lineStyle: "Bold",
    characteristics: {
      line: "Chunky contours and shapes with occasional registration drift.",
      color: "Two spot inks overlap to create a third color.",
      texture: "Grainy ink coverage and coarse halftone on uncoated paper.",
    },
    vocabulary: ["two-color risograph print", "navy and coral spot inks", "misregistered layers", "grainy halftone"],
    stylePrompt:
      "Render the subject as a two-color risograph print on warm off-white uncoated paper. Use only deep midnight-navy and warm coral-orange spot inks, plus the third dark tone formed where they overlap; let the paper supply the light areas. Reduce the image to bold graphic shapes and strong contours. If a person appears, keep their expression readable through simplified comic-like features. Build midtones from coarse halftone dots and irregular ink grain, with slight visible misregistration between the two plates and imperfect ink coverage. Avoid full-color gradients, clean vector flatness, photographic shading, and uniform digital-noise overlays.",
    watchFor: "A uniform digital noise overlay is not a substitute for uneven ink and interacting color layers.",
    related: ["gouache", "ink-wash"],
    keywords: ["grainy", "two-color", "print", "indie", "rough", "halftone", "limited colors"],
  },
  {
    slug: "gouache",
    name: "Gouache",
    family: "Painting & drawing",
    image: "/images/gouache.webp",
    short: "Opaque paint · Matte finish · Painterly strokes",
    definition:
      "Opaque, matte color creates confident shapes with hand-painted transitions and softly visible brushwork.",
    medium: "Paint",
    color: "Muted",
    texture: "Brushstrokes",
    era: "Timeless",
    mood: "Dreamy",
    lineStyle: "Soft",
    characteristics: {
      line: "Edges are shaped by paint rather than strong ink outlines.",
      color: "Opaque layers make solid, matte color fields.",
      texture: "Gentle brush marks remain visible inside larger shapes.",
    },
    vocabulary: ["opaque gouache", "matte color fields", "visible brushwork", "painted edges"],
    stylePrompt:
      "Render the subject as an opaque gouache illustration with the warmth of hand-painted Japanese animation background art. Use broad, confident matte color shapes, layered opaque paint, softly visible bristle marks, and edges shaped by the brush rather than heavy ink outlines. If a person appears, give them simplified expressive drawn features. Balance muted powder blues, warm stone neutrals, and one earthy red accent; let soft daylight separate foreground and distance. Preserve enough surface texture to feel painted on paper. Avoid transparent watercolor blooms, glossy acrylic shine, photorealistic skin, and perfectly smooth vector fills.",
    watchFor: "Excess shine or transparent washes can make the image look like acrylic or watercolor instead.",
    related: ["watercolor", "risograph"],
    keywords: ["opaque", "matte", "painting", "handmade", "brush"],
  },
  {
    slug: "ink-wash",
    name: "Ink Wash",
    family: "Painting & drawing",
    image: "/images/ink-wash.webp",
    short: "Expressive brushwork · Tonal washes · Minimal color",
    definition:
      "Diluted ink describes form through value, gesture, and the balance between marks and untouched paper.",
    medium: "Ink",
    color: "Monochrome",
    texture: "Paper grain",
    era: "Timeless",
    mood: "Quiet",
    lineStyle: "Expressive",
    characteristics: {
      line: "Calligraphic strokes alternate with lost edges.",
      color: "Mostly charcoal and gray values with a restrained red accent.",
      texture: "Absorbent paper gives each wash a slightly irregular edge.",
    },
    vocabulary: ["expressive ink wash", "tonal brushwork", "reserved white paper", "minimal color"],
    stylePrompt:
      "Render the subject as an expressive ink-wash illustration on absorbent off-white paper. Build almost the entire image from black ink diluted into soft gray tonal washes, reserved white paper, and a few energetic dark calligraphic marks. When a person appears, use delicate manga-inspired contour lines around the face and hands, with simplified expressive features. Permit a single muted rust-red accent on the main subject; reinterpret every other color specified in the subject description as grayscale, including clothing and background details. Let distant forms dissolve into wet washes while focal details remain legible. Avoid photographic grayscale, full-color watercolor, polished digital gradients, and uniformly heavy outlines.",
    watchFor: "Pure grayscale with photographic shading misses the expressive role of brush marks and open paper.",
    related: ["watercolor", "risograph"],
    keywords: ["black and white", "monochrome", "brush", "minimal", "quiet", "drawing"],
  },
  {
    slug: "pixel-art",
    name: "Pixel Art",
    family: "Digital & 3D",
    image: "/images/pixel-art.webp",
    short: "Low resolution · Limited palette · Crisp pixels",
    definition:
      "Shapes are deliberately designed on a small pixel grid, using clusters of flat color rather than smooth gradients.",
    medium: "Digital",
    color: "Limited",
    texture: "Pixels",
    era: "Retro",
    mood: "Nostalgic",
    lineStyle: "Pixelated",
    characteristics: {
      line: "Stepped contours and carefully grouped pixel clusters.",
      color: "A compact palette builds form through discrete value changes.",
      texture: "Crisp square pixels; no interpolation or soft blur.",
    },
    vocabulary: ["hand-placed pixel clusters", "limited color palette", "crisp pixel edges", "retro game art"],
    stylePrompt:
      "Render the subject as carefully authored 2D pixel art for a narrative adventure game. Design on a low-resolution pixel grid, roughly 320 by 180 logical pixels for a wide scene, then display it with crisp nearest-neighbor enlargement. Use a limited palette of navy, slate blue, warm cream, peach, and rust red. Build forms from intentional square pixel clusters, stepped contours, flat color bands, and discrete shade changes; use readable anime-inspired sprite features if people appear. Keep the background architecture legible without fine photographic detail. Avoid blur, antialiasing, smooth gradients, vector outlines, and a merely downsampled photograph.",
    watchFor: "A blurry low-resolution picture is not pixel art; every cluster should look intentional.",
    related: ["risograph", "gouache"],
    keywords: ["pixels", "game", "low resolution", "retro", "digital", "sprite", "limited colors"],
  },
  {
    slug: "35mm-film",
    name: "35mm Film",
    family: "Photography",
    image: "/images/35mm-film.webp",
    short: "Natural grain · Subtle color shifts · Analog feel",
    definition:
      "A photographic look shaped by organic grain, gentle highlight rolloff, and slightly imperfect color response.",
    medium: "Photo",
    color: "Natural",
    texture: "Film grain",
    era: "Contemporary",
    mood: "Nostalgic",
    lineStyle: "Natural",
    characteristics: {
      line: "Edges follow lens focus and depth of field rather than drawn contours.",
      color: "Natural color with subtle warm shadows and subdued highlights.",
      texture: "Organic, fine-grained noise and gentle exposure variation.",
    },
    vocabulary: ["35mm color film", "natural film grain", "soft highlight rolloff", "subtle color shifts"],
    stylePrompt:
      "Render the subject as a candid photograph on 35mm color negative film, not an illustration. Use a natural 50mm documentary viewpoint, available light, gentle backlight when the scene permits, soft highlight rolloff, muted warm highlights, and slightly cool teal shadows. Keep the primary subject in believable focus while the background softens naturally through lens depth of field. If a person appears, preserve natural anatomy and an unposed expression. Add fine organic grain and slight exposure variation in the image itself, without making it look like a digital noise filter. Favor an observed everyday moment over polished commercial staging. Avoid airbrushed skin, heavy cinematic color grading, extreme bokeh, and painterly or anime rendering.",
    watchFor: "An aggressive grain overlay alone will not create believable lens, light, and color behavior.",
    related: ["watercolor", "pixel-art"],
    keywords: ["photo", "analog", "cinematic", "film", "grain", "grainy", "realistic"],
  },
];

export function combinedPrompt(style) {
  return `Create one image using these two independent instructions.\n\nCHARACTER AND SCENE\n${benchmark.characterPrompt}\n\nVISUAL STYLE\n${style.stylePrompt}`;
}

export const filterDefinitions = [
  { key: "medium", label: "Medium", values: ["Paint", "Print", "Ink", "Digital", "Photo"] },
  { key: "color", label: "Color", values: ["Muted", "Limited", "Monochrome", "Natural"] },
  { key: "texture", label: "Texture", values: ["Paper grain", "Brushstrokes", "Pixels", "Film grain"] },
  { key: "era", label: "Era", values: ["Timeless", "Contemporary", "Retro"] },
  { key: "mood", label: "Mood", values: ["Dreamy", "Bold", "Quiet", "Nostalgic"] },
  { key: "lineStyle", label: "Line style", values: ["Soft", "Bold", "Expressive", "Pixelated", "Natural"] },
];

export const quickTraits = ["grainy", "soft", "limited colors", "handmade", "retro"];

export function findStyles({ query = "", filters = {}, sort = "relevant" }) {
  const words = query.toLowerCase().replace(/[-–]/g, " ").trim().split(/\s+/).filter(Boolean);
  const result = styles.filter((style) => {
    if (Object.entries(filters).some(([key, value]) => value && style[key] !== value)) return false;
    const haystack = [
      style.name,
      style.family,
      style.short,
      style.definition,
      ...Object.values(style.characteristics),
      ...style.vocabulary,
      ...style.keywords,
    ].join(" ").toLowerCase().replace(/[-–]/g, " ");
    return words.every((word) => haystack.includes(word));
  });
  if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
  return result;
}
