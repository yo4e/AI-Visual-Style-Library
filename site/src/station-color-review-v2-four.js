// Separate, unpublished review version. Concrete palettes are executor proposals,
// not owner-specified final hues. Do not rewrite V1 prompt/image history.
export const stationColorReviewV2Four = {
  id: 'station-color-review-v2-four',
  ownerDirection: 'Slack1792390051.650419: risograph/comic two colors; ink wash plus one accent; pixel art may remap into8 or16 colors.',
  paletteStatus: 'provisional-executor-proposal-not-owner-final-color-choice',
  entries: [
    {
      catalogIndex: 2, slug: 'risograph',
      mediumRuleJa: '2インク刷り。紙白とインクの重なりによる暗い調子は、追加のインクとして数えません。',
      paletteJa: '仮案：群青 #243C8F ＋ 黄土 #C6953D、無着色の紙。具体色は本人の確定指定ではありません。',
      palette: ['#243C8F', '#C6953D'],
      edits: [['Use only deep midnight-navy and warm coral-orange spot inks, plus the third dark tone formed where they overlap; let the paper supply the light areas.', 'Use exactly two printing inks throughout the image: ultramarine blue (#243C8F) and warm ochre (#C6953D). Use these same two inks for all contours, fills, shading, skin, hair, clothing, objects, and background. Translate the supplied local colors into these ink separations; the two-ink print treatment takes priority over literal object hues. Let their overlap form a darker tone, and let the unprinted off-white paper supply the light areas. Do not introduce a third ink or preserve an original scene color by adding another ink.']],
    },
    {
      catalogIndex: 54, slug: 'manga-limited-color-print',
      mediumRuleJa: '輪郭の黒も含めた2インク刷り。白は紙、濃淡は網点の面積率で表します。',
      paletteJa: '仮案：墨に近い黒 #23232B ＋ 朱赤 #C7573F、白紙。具体色は本人の確定指定ではありません。',
      palette: ['#23232B', '#C7573F'],
      edits: [['Use black, warm red, muted yellow, and the white paper only; translate the supplied local colors into this palette without changing the objects.', 'Use exactly two printing inks: near-black (#23232B) and vermilion red (#C7573F), with unprinted white paper. Near-black counts as one of the two inks and must also be used for every drawn outline; add no separate outline color. Translate all supplied local colors, including skin, hair, clothing, and background objects, into these two inks while preserving the shapes and identities of the objects. Make lighter tones through halftone coverage and paper gaps, not additional ink colors. The two-ink print treatment takes priority over literal scene hues. Do not add a yellow, blue, teal, or skin-colored ink.']],
    },
    {
      catalogIndex: 4, slug: 'ink-wash',
      mediumRuleJa: '墨・灰色のにじみ・紙白を主体にし、アクセントだけ1つの色相へ置換します。',
      paletteJa: '仮案：墨 ＋ 青緑 #2A7776 のアクセント1色、白に近い紙。青緑は本人の確定指定ではありません。',
      palette: ['#000000', '#2A7776'],
      edits: [['Permit a single muted rust-red accent on the main subject; reinterpret every other color specified in the subject description as grayscale, including clothing and background details.', 'Use just one accent hue in addition to the black ink and gray washes: muted teal (#2A7776). Place it sparingly on one small existing region of the supplied main subject, such as part of a garment or an object already present, translating that region\'s original hue into this accent. Render all remaining areas, including skin, hair, other clothing, objects, and background, only with black ink, gray washes, and unpainted paper. Do not retain the original red coat, natural skin colors, blue sky, or teal train stripe as extra colored areas. Do not add an object to carry the accent.']],
    },
    {
      catalogIndex: 5, slug: 'pixel-art',
      mediumRuleJa: 'まず明示16色への再配色を試します。紙色・輪郭・ハイライトも16色に含め、アルファ混色や追加色を使わない指示です。',
      paletteJa: '仮案のカスタム16色。8色か16色かの最終選択と、16色の具体色は未確定です。',
      palette: ['#1B1B2F', '#3D2D42', '#5B4B62', '#7B6D7D', '#B7A9A0', '#F1E4C8', '#FFFFFF', '#4A2D24', '#8C4A3A', '#C66A4A', '#E0A66B', '#EEC68F', '#283B5A', '#4B718A', '#4C8B83', '#C2AF57'],
      edits: [['Use a limited palette of navy, slate blue, warm cream, peach, and rust red. Translate all local colors specified in the separate scene description into this palette without changing the identities of people or objects; do not add colors to match literal scene hues.', 'Recolor the entire image into this single explicitly fixed sixteen-color palette: #1B1B2F, #3D2D42, #5B4B62, #7B6D7D, #B7A9A0, #F1E4C8, #FFFFFF, #4A2D24, #8C4A3A, #C66A4A, #E0A66B, #EEC68F, #283B5A, #4B718A, #4C8B83, #C2AF57. Every pixel, including outlines, skin, hair, clothing, map, train, sky, highlights, and shadows, must use one of these sixteen RGB colors at full opacity. Remap all supplied local colors to suitable colors within this palette; do not add colors to preserve literal scene hues. Use only discrete palette steps and intentional pixel clusters, with no antialiasing, alpha blending, smooth gradients, extra texture shades, or colors introduced between palette entries.']],
    },
  ],
};
