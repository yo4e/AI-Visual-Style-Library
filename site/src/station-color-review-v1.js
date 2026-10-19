// Local review candidates only. Not imported by the active gallery.
// Old sample/image records must never be relabeled as these revised prompts.
export const stationColorReview = {
  id: 'station-local-color-review-v1',
  source: 'https://w1770415140-3ik617062.slack.com/archives/C0C89AGSGE5/p1792036144524299',
  status: 'revised-prompts-awaiting-sample-review',
  excludedIndices: [1, 6, 56, 59, 62, 64, 75, 76, 77],
  entries: [
    {
      catalogIndex: 2, slug: 'risograph', decision: 'review-medium-tradeoff',
      reasonJa: '紺・コーラルへの置換を外し、場面の固有色から特色を選びます。少色・重なり・網点・版ずれは保持します。',
      questionJa: '厳密な2色刷りと複数の固有色を同時に保証できないため、案は少色刷りへ緩めています。2色を必須にするなら、明示した減色を例外として認めるか月曜に判断。',
      edits: [
        ['a two-color risograph print', 'a small-palette risograph print'],
        ['Use only deep midnight-navy and warm coral-orange spot inks, plus the third dark tone formed where they overlap; let the paper supply the light areas.', 'Choose a compact set of spot inks from the supplied local color families of the subject and scene. Preserve the specified hue identities of hair, clothing, and objects wherever color is printed; simplify shade steps within those hue families rather than replacing them with a fixed ink palette. Let ink overlaps create darker tones and the paper supply the light areas.'],
        ['between the two plates', 'between the color plates'],
      ],
    },
    {
      catalogIndex: 4, slug: 'ink-wash', decision: 'review-accent-policy',
      reasonJa: '必須の錆赤だけを外し、差し色を置く場合はその領域に指定された色を使います。墨・灰色・紙白は変更しません。',
      questionJa: '白黒技法は対象外という本人の方針に従い、差し色以外は灰色化を保持。全物体をカラー化する案ではありません。差し色を任意で残すか、純粋な墨一色にするか確認。',
      edits: [['Permit a single muted rust-red accent on the main subject; reinterpret every other color specified in the subject description as grayscale, including clothing and background details.', 'Permit a single muted color accent only on an area specified as colored in the separate scene description, using that area\'s supplied hue without introducing a new hue. Render the remaining areas as grayscale, including clothing and background details, as part of the ink-wash medium.']],
    },
    {
      catalogIndex: 5, slug: 'pixel-art', decision: 'ready-for-sample-review',
      reasonJa: '固定5色への強制変換と色追加禁止を外します。少ない色数と段階的な明暗・ピクセルの塊は保持します。',
      edits: [['Use a limited palette of navy, slate blue, warm cream, peach, and rust red. Translate all local colors specified in the separate scene description into this palette without changing the identities of people or objects; do not add colors to match literal scene hues.', 'Use a compact palette built from the supplied local color families of skin, hair, clothing, objects, and surroundings. Preserve those hue identities, limiting the number of shades within each hue family rather than remapping them to a fixed palette.']],
    },
    {
      catalogIndex: 54, slug: 'manga-limited-color-print', decision: 'ready-for-sample-review',
      reasonJa: '黒赤黄白の固定を外し、元の色から少数の特色を選びます。黒い輪郭、網点、版ずれ、紙白は保持します。',
      edits: [['Use black, warm red, muted yellow, and the white paper only; translate the supplied local colors into this palette without changing the objects.', 'Use black drawing ink, white paper, and a small set of flat spot colors selected from the supplied local hues. Preserve the specified hue identities of hair, clothing, and objects in colored areas; reduce shade steps and repeated color variations rather than forcing all objects into a fixed red-and-yellow palette.']],
    },
    {
      catalogIndex: 60, slug: 'photo-horror', decision: 'ready-for-sample-review',
      reasonJa: '物体に酸化赤を要求する部分だけを外します。青緑のハイライト、脱色した影、露出・粒子などの写真処理は残します。',
      edits: [['with desaturated gray shadows and a subdued oxidized-red accent from supplied materials.', 'with desaturated gray shadows. Preserve the underlying supplied color identities of skin, hair, clothing, and objects through this lighting and grading; do not introduce a red accent into materials that were not specified as red.']],
    },
    {
      catalogIndex: 65, slug: 'fiction-reportage-spot-ink', decision: 'ready-for-sample-review',
      reasonJa: '錆赤の必須差し色を、場面内の実際の色から選ぶ小さな差し色に変更。主に紙白のルポ風線画は保持します。',
      edits: [['use a restrained rust-red accent from the supplied subject and very pale cool gray only where needed to separate planes.', 'use a restrained color accent selected from the supplied local hue of the area receiving it, and very pale cool gray only where needed to separate planes. Preserve that accent\'s hue identity; do not recolor another object to create an accent.']],
    },
    {
      catalogIndex: 67, slug: 'fiction-oil-pastel', decision: 'ready-for-sample-review',
      reasonJa: '錆・黄土・青・青緑への置換を外します。抑えた色、太いワックスの筆跡、紙の抜けと面の省略を保持します。',
      edits: [['Use warm rust, ochre, slate blue, muted teal, and soft cream, interpreting the supplied local colors through this palette.', 'Use a small, muted set of colors derived from the supplied local hues, preserving the color identities of skin, hair, clothing, objects, and surroundings. Simplify each into broad color masses and a few value steps rather than replacing its hue with a fixed palette.']],
    },
    {
      catalogIndex: 68, slug: 'fiction-ballpoint', decision: 'review-accent-policy',
      reasonJa: 'コバルトのペン線は画材として残し、塗りの錆赤固定と他色の青への変換を外します。白紙の省略は保持します。',
      questionJa: '青線は画材の色であり物体の地色ではありません。未着彩部分の色は省略されます。すべての地色を着彩すると青ボールペンの個性が変わるため、少量の元色アクセント案です。英名のWarm Accentも採用時に再確認。',
      edits: [['Add one small unshaded rust-red accent; translate other supplied colors into blue linework and the paper ground.', 'Add one small unshaded color accent using the supplied local hue of the area receiving it, without recoloring another object. Keep the cobalt-blue pen marks as drawing ink, not a replacement for an object\'s stated surface color; other forms may remain unfilled paper as deliberate line-drawing omissions.']],
    },
    {
      catalogIndex: 69, slug: 'fiction-stipple-duotone', decision: 'review-accent-policy',
      reasonJa: '赤・青緑への変換を外します。紺の点描インクと場面由来の差し色1色、紙白を使う2色表現の案です。',
      questionJa: '紺は輪郭・点描の画材として保持。未着彩領域は紙白なので、すべての固有色が見えるわけではありません。多色化せずデュオトーンを残す案を確認。',
      edits: [['Add restrained flat rust-red areas and a very small pale-teal accent, interpreting supplied local colors through this limited palette.', 'Use one restrained flat accent hue selected from the supplied local colors, only on areas specified with that hue. Leave other surfaces as uncolored paper rather than remapping them to a fixed accent palette. Keep navy as the contour and stippling ink, not a mandatory flat surface color for supplied objects.']],
    },
    {
      catalogIndex: 70, slug: 'fiction-cutout-silhouette', decision: 'ready-for-sample-review',
      reasonJa: '固定パレットへの置換だけを外し、元の色を少数の平面に整理。切り縁・角張った省略・紙白を保持します。',
      edits: [['Use rust red, deep charcoal, pale teal, and paper white, translating supplied local colors into this palette.', 'Use a compact set of flat colors drawn from the supplied local hues, preserving the color identities of hair, clothing, and objects. Simplify shades within each hue family instead of translating objects into a fixed palette; use paper white for intentionally unpainted space and highlights.']],
    },
    {
      catalogIndex: 71, slug: 'fiction-elastic-symbols', decision: 'ready-for-sample-review',
      reasonJa: '赤・青緑・濃青・淡黄の指定だけを外します。伸縮した形、黒線、少ないベタ面と大きな紙白は保持します。',
      edits: [['Fill selected areas with flat rust red, muted teal, dark blue, and pale yellow, translating supplied local colors into this palette.', 'Fill selected areas with a small set of flat colors drawn from their supplied local hues. Preserve each colored area\'s hue identity while simplifying its shade variations; leave other areas as unpainted paper instead of assigning a fixed palette.']],
    },
    {
      catalogIndex: 72, slug: 'fiction-chunky-wax-shapes', decision: 'ready-for-sample-review',
      reasonJa: '指定5色のみの制限を外し、元の色から太い色面を作ります。色数の節約、ワックスの欠け、誇張と余白を保持します。',
      edits: [['Use only rust red, charcoal, cream, muted teal, and warm ochre, interpreting supplied local colors through this palette.', 'Use a small set of wax colors selected from the supplied local hues, preserving the color identities of hair, clothing, and objects. Reduce shade variations into chunky color masses rather than replacing those hues with a fixed palette.']],
    },
    {
      catalogIndex: 73, slug: 'fiction-spare-continuous-line', decision: 'review-accent-policy',
      reasonJa: 'コバルトの連続線は残し、赤・青緑の差し色固定と他色の青への変換を外します。少量の着彩と紙白を保持します。',
      questionJa: '青線は画材として保持し、未着彩部分は色を省略。元の色をすべて塗る案ではありません。少数の差し色でよいか月曜に確認。',
      edits: [['Keep forms mostly unfilled, adding only one small flat rust-red accent and a very small pale-teal accent. Translate other supplied colors into blue linework and white paper.', 'Keep forms mostly unfilled, adding at most two small flat color accents drawn from the supplied local hues of the areas receiving them. Preserve those hue identities without recoloring other objects. Treat the cobalt-blue curves as drawing ink; leave other surfaces as uncolored paper rather than translating their stated colors into blue fills.']],
    },
    {
      catalogIndex: 74, slug: 'fiction-modular-dot-design', decision: 'ready-for-sample-review',
      reasonJa: '赤・紺・青緑への置換だけを外します。大きな紺のドットは影の印刷インクとして残し、形の地色と分けます。',
      edits: [['Use rust red, navy, and a small pale-teal accent, translating supplied local colors into this palette.', 'Use a small set of flat colors drawn from the supplied local hues, preserving the color identities of hair, clothing, and objects while reducing shade variations. Treat navy as the ink of the shadow dots, not a compulsory flat surface color for objects.']],
    },
    {
      catalogIndex: 3, slug: 'gouache', decision: 'ready-for-sample-review',
      reasonJa: '必須の土色の赤を外し、指定された元色の中で暖冷色と抑えた彩度を整理します。不透明な塗り・筆跡・場面に沿う光は保持します。',
      edits: [['Balance muted powder blues, warm stone neutrals, and one earthy red accent;', 'Balance muted warm and cool color masses derived from the supplied local hues, preserving the color identities of hair, clothing, and objects without requiring a red accent;']],
    },
    {
      catalogIndex: 66, slug: 'fiction-looping-flat', decision: 'ready-for-sample-review',
      reasonJa: '元色を保つ指示と衝突する赤・青緑・クリーム・青の列挙だけを外します。濃茶の輪郭インク、明るく抑えたマットな面を保持します。',
      edits: [['Fill existing forms with bright but restrained opaque matte color patches: rust red, muted teal, buttery cream, and slate blue, while retaining supplied local colors.', 'Fill existing forms with bright but restrained opaque matte patches of their supplied local colors. Preserve the hue identities of hair, clothing, and objects while simplifying shade variations; do not substitute a fixed palette.']],
    },
    {
      catalogIndex: 63, slug: 'manga-bold-scruffy-ink', decision: 'ready-for-hair-probe',
      reasonJa: '髪全体を黒ベタにする指定を、元の髪色の大きな塊へ変更。黒ベタは深い重なりや服の影に限定し、太い荒れた輪郭と毛束は保持します。',
      edits: [['Make the hair and a few overlapping cloth folds read as simple black ink masses, not thousands of fine strands.', 'Group the hair into a few broad, simple masses in its supplied local color, not thousands of fine strands. Preserve light or colored hair rather than filling the whole hair shape with black ink. Reserve sparse black ink masses for the deepest overlaps and cloth-fold shadows.']],
    },
  ],
};

export function revisedStationColorPrompt(style, entry) {
  if (style.slug !== entry.slug) throw new Error(`Wrong style: ${style.slug}`);
  let revised = style.stylePrompt;
  for (const [before, after] of entry.edits) {
    if (revised.split(before).length !== 2) throw new Error(`Expected one exact source clause: ${entry.slug}`);
    revised = revised.replace(before, after);
  }
  return revised;
}
