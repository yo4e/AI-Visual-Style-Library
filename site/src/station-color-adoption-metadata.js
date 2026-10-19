// Metadata and observed limitations for the owner-adopted17 samples.
export const stationColorAdoptionMetadata = {
  "risograph": {
    "en": {
      "watchFor": "Ink grain, halftones and paper gaps should carry the print effect; this sample does not certify two printing plates.",
      "short": "Two inks · Grainy halftone · Registration drift",
      "characteristics": {
        "line": "Chunky contours and shapes with occasional registration drift.",
        "color": "Ultramarine and ochre spot inks, unprinted paper and darker overlaps.",
        "texture": "Grainy ink coverage and coarse halftone on uncoated paper."
      },
      "vocabulary": [
        "two-ink risograph print",
        "ultramarine and ochre spot inks",
        "misregistered layers",
        "grainy halftone"
      ]
    },
    "ja": {
      "watchFor": "インクの粒・網点・紙白を確認してください。この見本は実際の2版分解を保証するものではありません。",
      "short": "2インク · 粗い網点 · 版ずれ",
      "characteristics": {
        "線": "大胆な輪郭",
        "塗り・陰影": "群青と黄土の2インク、紙白と重なりの暗部。",
        "質感": "粗い網点と版ずれ"
      },
      "vocabularyLabels": [
        "大胆な輪郭",
        "群青と黄土の2インク、紙白と重なりの暗部。",
        "粗い網点と版ずれ"
      ]
    },
    "qualityNotes": {
      "en": "The sample uses blue and ochre print-like marks, paper highlights and granular halftones. Source colors are remapped into the chosen ink treatment. A two-ink appearance does not verify real two-plate separations; paper texture and overlapping tones contain many RGB values.",
      "ja": "群青・黄土・紙白を主体に、粒状インクと網点風の面が見えます。コートと列車の帯も刷り色へ置換されています。2インク風の見た目ですが、生成PNGから本物の2版分解を確認したわけではありません。"
    }
  },
  "ink-wash": {
    "en": {
      "watchFor": "Check the size and location of the single accent; colored areas can spread beyond the requested focal region.",
      "short": "Tonal ink wash · One teal accent · Open paper",
      "characteristics": {
        "line": "Calligraphic strokes alternate with lost edges.",
        "color": "Black and gray ink washes with a single muted-teal accent.",
        "texture": "Absorbent paper gives each wash a slightly irregular edge."
      },
      "vocabulary": [
        "expressive ink wash",
        "black and gray ink washes with a single muted-teal accent.",
        "reserved white paper",
        "minimal color"
      ]
    },
    "ja": {
      "watchFor": "アクセント1色の面積と位置を確認してください。指定した主役の領域以外にも色が出る場合があります。",
      "short": "墨の濃淡 · 青緑1色 · 紙白",
      "characteristics": {
        "線": "筆の強弱",
        "塗り・陰影": "墨と灰色のにじみに、青緑のアクセント1色。",
        "質感": "吸水紙の縁"
      },
      "vocabularyLabels": [
        "筆の強弱",
        "墨と灰色のにじみに、青緑のアクセント1色。",
        "吸水紙の縁"
      ]
    },
    "qualityNotes": {
      "en": "Gray ink washes and a teal accent dominate, with skin and clothing rendered in gray. The teal appears broadly on the train stripe rather than on the small main-subject area requested by the prompt.",
      "ja": "墨の灰色と青緑が主体で、肌やコートも灰色化しています。ただしアクセントは主役の小領域ではなく列車の帯へ広く出ており、列車帯を追加着彩しないという指示には沿っていません。"
    }
  },
  "pixel-art": {
    "en": {
      "watchFor": "A palette named in a prompt does not guarantee an exact pixel color count or a strict logical grid.",
      "short": "Pixel clusters · 16-color palette prompt · Stepped values",
      "definition": "Forms are organized into deliberate pixel clusters and discrete shade steps. This version requests remapping into an explicit 16-color palette; the selected output does not meet an exact 16-color limit.",
      "characteristics": {
        "line": "Stepped contours and carefully grouped pixel clusters.",
        "color": "Explicit16-color remapping instructions and discrete value steps.",
        "texture": "Crisp square pixels; no interpolation or soft blur."
      },
      "vocabulary": [
        "hand-placed pixel clusters",
        "explicit 16-color remapping instructions and discrete value steps.",
        "crisp pixel edges",
        "retro game art"
      ]
    },
    "ja": {
      "watchFor": "パレットを文で指定しても、厳密な色数や論理グリッドへの準拠は保証されません。",
      "short": "ピクセルの塊 · 16色パレットの指示 · 段階的な明暗",
      "definition": "ピクセルの塊と段階的な明暗で形を作り、明示した16色への再配色を指示する版です。選ばれた出力は厳密な16色制限には達していません。",
      "characteristics": {
        "線": "階段状の輪郭",
        "塗り・陰影": "明示16色への再配色指示と段階的な明暗。",
        "質感": "鮮明なピクセル"
      },
      "vocabularyLabels": [
        "階段状の輪郭",
        "明示16色への再配色指示と段階的な明暗。",
        "鮮明なピクセル"
      ]
    },
    "qualityNotes": {
      "en": "The explicit 16-color palette prompt produces warm brown, rust and blue-gray pixel-like clusters. The original PNG contains 290,238 distinct RGB values, so exact 16-color compliance is not achieved. A strict 320-by-180 logical grid is also unverified; no quantization was applied.",
      "ja": "暖かい茶・錆・黄土と青灰の段階色に再配色され、階段状の輪郭と色の塊が見えます。元PNGの実測では16色に制限されておらず、空などに多くの中間色があります。約320×180の論理グリッドへの厳密準拠も確認できません。"
    }
  },
  "manga-limited-color-print": {
    "en": {
      "watchFor": "Check broad spot-color planes, halftones and limited-ink appearance rather than treating RGB counts as ink counts.",
      "name": "Two-Ink Printed Comic",
      "short": "Two printing inks · Bold contours · Coarse halftone",
      "definition": "Bold brush contours, near-black and vermilion spot inks, halftone coverage and paper gaps create a two-ink printed comic treatment.",
      "characteristics": {
        "Line": "Bold uneven brush outlines",
        "Paint & shading": "Near-black and vermilion ink plates with paper highlights.",
        "Texture": "Visible halftone and slight registration drift"
      },
      "vocabulary": [
        "bold uneven brush outlines",
        "near-black and vermilion ink plates with paper highlights.",
        "visible halftone and slight registration drift"
      ]
    },
    "ja": {
      "watchFor": "特色の面と網点、限られた刷り色の見た目を確認してください。RGB値の数とインク数は異なります。",
      "name": "2色刷りの印刷漫画",
      "short": "2インク · 太い輪郭 · 粗い網点",
      "definition": "太い筆線、黒と朱赤の特色、網点の面積率と紙白で描く2色刷りの漫画表現です。",
      "characteristics": {
        "線": "太く不均一な筆線",
        "塗り・陰影": "黒と朱赤の2インク、紙白のハイライト。",
        "質感": "網点とわずかな版ずれ"
      },
      "vocabularyLabels": [
        "太く不均一な筆線",
        "黒と朱赤の2インク、紙白のハイライト。",
        "網点とわずかな版ずれ"
      ]
    },
    "qualityNotes": {
      "en": "Near-black, vermilion and paper white dominate the halftones and flat areas; the train stripe is remapped to red. The face, map and background remain detailed. Two printing inks were requested, but the PNG is not an exact two-RGB-color file.",
      "ja": "黒・朱赤・紙白の面と網点が見え、青緑の列車帯も朱赤へ置換されています。顔・地図・背景は細かめです。黒を含む2インクを指示した出力で、PNGのRGB値が2色という意味ではありません。"
    }
  },
  "photo-horror": {
    "en": {
      "watchFor": "The cold grade and hard shadows can obscure local colors and fine object detail."
    },
    "ja": {
      "watchFor": "冷たい色調と硬い影で、固有色や物の細部が見えにくくなる場合があります。"
    },
    "qualityNotes": {
      "en": "Brown hair, a dark rust-red coat and a teal train stripe remain visible under cold cyan-green light and deep shadows. Dark areas reduce how clearly the local colors can be judged.",
      "ja": "茶系の髪・暗い赤茶のコートと青緑の列車帯が見え、冷たい青緑の光と強い影が残っています。顔や服の暗部は暗めで、色の見え方はグレーディングの影響を受けます。"
    }
  },
  "fiction-reportage-spot-ink": {
    "en": {
      "watchFor": "Check open paper and economical pen marks; broad color coverage can weaken the sparse reportage look."
    },
    "ja": {
      "watchFor": "紙白と簡潔なペン跡を確認してください。広い着彩で線画の余白が弱まる場合があります。"
    },
    "qualityNotes": {
      "en": "Fine pen lines and open paper are visible alongside brown hair, a rust-red coat and teal train accents. Color extends farther than the requested restrained accent, and architectural/map linework is detailed.",
      "ja": "細いペン線と紙白、茶髪・赤茶コート・青緑の列車が見えます。指定の控えめな差し色より広く着彩され、建物や地図の描写も細かめです。"
    }
  },
  "fiction-oil-pastel": {
    "en": {
      "watchFor": "Look for broad wax deposits and broken paper coverage rather than smooth digital blending."
    },
    "ja": {
      "watchFor": "滑らかなデジタル塗りより、太い蝋質の跡と紙の抜けを確認してください。"
    },
    "qualityNotes": {
      "en": "Broad waxy marks and broken paper coverage preserve brown hair, the rust-red coat and the teal train stripe. Facial shading and map marks remain detailed rather than uniformly simplified into broad masses.",
      "ja": "広いワックス状の筆跡と欠けた紙の目が見え、茶髪・赤茶コート・青緑の列車が残っています。人物の陰影や地図は細かめで、広い色面への省略度を"
    }
  },
  "fiction-ballpoint": {
    "en": {
      "watchFor": "Blue marks are drawing ink; the intended small accent can expand across larger areas in the output.",
      "name": "Blue Ballpoint & Color Accent",
      "definition": "Cobalt ballpoint lines and a small accent selected from the supplied local hue create a notebook-like observational drawing.",
      "characteristics": {
        "Line": "Fine blue loops and overlapping ballpoint lines",
        "Paint & shading": "Sparse blue hatching with a supplied-hue accent",
        "Texture": "Small pen accumulations and untouched paper"
      },
      "vocabulary": [
        "fine blue loops and overlapping ballpoint lines",
        "sparse blue hatching with a supplied-hue accent",
        "small pen accumulations and untouched paper"
      ],
      "short": "Fine blue loops and overlapping ballpoint lines · Sparse blue hatching with a supplied-hue accent · Small pen accumulations and untouched paper"
    },
    "ja": {
      "watchFor": "青は描画インクです。小さな差し色の指定より広く着彩される場合があります。",
      "name": "青いボールペンと色のアクセント",
      "definition": "コバルト色のボールペン跡と、指定された元の色から選ぶ小さな差し色で描く観察画です。",
      "characteristics": {
        "線": "青い細線のループと重なるボールペン跡",
        "塗り・陰影": "疎らな青ハッチと、元色から選ぶ差し色",
        "質感": "ペンの溜まりと描かない紙白"
      },
      "vocabularyLabels": [
        "青い細線のループと重なるボールペン跡",
        "疎らな青ハッチと、元色から選ぶ差し色",
        "ペンの溜まりと描かない紙白"
      ],
      "short": "青い細線のループと重なるボールペン跡 · 疎らな青ハッチと、元色から選ぶ差し色 · ペンの溜まりと描かない紙白"
    },
    "qualityNotes": {
      "en": "Cobalt linework, hatching and open paper remain, with color on the hair, coat and train stripe. The colored areas and hatching are broader and denser than the requested one small accent.",
      "ja": "コバルト系の線とハッチング、紙白が残り、茶系の髪・赤茶コートと青緑の列車帯にも着彩があります。「小さな差し色1か所」より色の範囲が広く、線も密です。"
    }
  },
  "fiction-stipple-duotone": {
    "en": {
      "watchFor": "Check separated hand-placed dots and accent count; dense dots or extra hues can weaken the duotone treatment.",
      "characteristics": {
        "Line": "Clean natural contours and fine irregular dot clusters",
        "Paint & shading": "Navy stippling ink and one scene-derived accent hue",
        "Texture": "Hand-stippled dots and clear paper highlights"
      },
      "vocabulary": [
        "clean natural contours and fine irregular dot clusters",
        "navy stippling ink and one scene-derived accent hue",
        "hand-stippled dots and clear paper highlights"
      ],
      "short": "Clean natural contours and fine irregular dot clusters · Navy stippling ink and one scene-derived accent hue · Hand-stippled dots and clear paper highlights"
    },
    "ja": {
      "watchFor": "分かれた手打ちの点と差し色数を確認してください。密な点や追加色が増える場合があります。",
      "characteristics": {
        "線": "自然な輪郭と細かな不均一の点",
        "塗り・陰影": "紺の点描インクと、元色から選ぶ差し色1色",
        "質感": "手打ちの点と明るい紙白"
      },
      "vocabularyLabels": [
        "自然な輪郭と細かな不均一の点",
        "紺の点描インクと、元色から選ぶ差し色1色",
        "手打ちの点と明るい紙白"
      ],
      "short": "自然な輪郭と細かな不均一の点 · 紺の点描インクと、元色から選ぶ差し色1色 · 手打ちの点と明るい紙白"
    },
    "qualityNotes": {
      "en": "Navy stippling and open paper remain, with rust-red coat areas and a teal train stripe. More than the requested one accent hue is visible, and stippling extends densely into the background.",
      "ja": "紺の点と紙白が主体で、赤茶のコートと青緑の列車帯が見えます。指定した差し色1色より多く着彩され、点描も背景まで密です。厳密な2色表現とは言い切れません。"
    }
  },
  "fiction-cutout-silhouette": {
    "en": {
      "watchFor": "Cut-like edges and flat planes should dominate; modeled shadows and paper texture may still appear."
    },
    "ja": {
      "watchFor": "切り形の縁と平面性を確認してください。立体的な影や紙目が出る場合もあります。"
    },
    "qualityNotes": {
      "en": "Brown hair, a rust-red coat and a teal stripe are organized into large angular planes. Shadows on the face, neck and coat, plus paper texture, exceed the requested unmodeled cut-paper treatment.",
      "ja": "茶系の髪・赤茶のコート・青緑の帯を、大きな面と角のある輪郭へ整理しています。顔・首・コートに陰影、全体に紙目があり、完全に無陰影の切り形という指定からは外れています。"
    }
  },
  "fiction-elastic-symbols": {
    "en": {
      "watchFor": "Check visible proportion exaggeration; conventional anatomy can weaken the elastic shapes.",
      "characteristics": {
        "Line": "Loose thin contour around stretched shapes",
        "Paint & shading": "A few flat color islands from supplied local hues",
        "Texture": "Open white background with omitted details"
      },
      "vocabulary": [
        "loose thin contour around stretched shapes",
        "a few flat color islands from supplied local hues",
        "open white background with omitted details"
      ],
      "short": "Loose thin contour around stretched shapes · A few flat color islands from supplied local hues · Open white background with omitted details"
    },
    "ja": {
      "watchFor": "比率の誇張が見えるか確認してください。自然な人体比率では伸縮する形が弱まります。",
      "characteristics": {
        "線": "伸びた形を囲む細いラフ線",
        "塗り・陰影": "元の色を使う、少数の平らな色の島",
        "質感": "細部を描かない白い背景"
      },
      "vocabularyLabels": [
        "伸びた形を囲む細いラフ線",
        "元の色を使う、少数の平らな色の島",
        "細部を描かない白い背景"
      ],
      "short": "伸びた形を囲む細いラフ線 · 元の色を使う、少数の平らな色の島 · 細部を描かない白い背景"
    },
    "qualityNotes": {
      "en": "Brown hair, a rust-red coat and a teal stripe remain, with thin dark lines and white gaps. The figure has fairly conventional proportions, so elastic exaggeration is weak and background/map detail remains high.",
      "ja": "茶髪・赤茶コート・青緑の帯、薄い黒線と白い抜けが見えます。一方で人物の比率は通常寄りで、伸縮する大胆な誇張は弱く、背景や地図は細かめです。"
    }
  },
  "fiction-chunky-wax-shapes": {
    "en": {
      "watchFor": "Check blunt marks and broad masses, and whether softened colors still retain their intended hue families.",
      "characteristics": {
        "Line": "Blunt crayon boundaries and blocky anatomy",
        "Paint & shading": "Broad opaque wax masses in supplied local hues",
        "Texture": "Coarse wax breaks without fine strokes"
      },
      "vocabulary": [
        "blunt crayon boundaries and blocky anatomy",
        "broad opaque wax masses in supplied local hues",
        "coarse wax breaks without fine strokes"
      ],
      "short": "Blunt crayon boundaries and blocky anatomy · Broad opaque wax masses in supplied local hues · Coarse wax breaks without fine strokes"
    },
    "ja": {
      "watchFor": "鈍い跡と大きな面、抑えた色でも元の色相が分かるかを確認してください。",
      "characteristics": {
        "線": "鈍いクレヨンの境界とブロック状の人体",
        "塗り・陰影": "元の色を使う、大きな不透明の蝋質の塊",
        "質感": "細線を使わない粗い蝋質の切れ目"
      },
      "vocabularyLabels": [
        "鈍いクレヨンの境界とブロック状の人体",
        "元の色を使う、大きな不透明の蝋質の塊",
        "細線を使わない粗い蝋質の切れ目"
      ],
      "short": "鈍いクレヨンの境界とブロック状の人体 · 元の色を使う、大きな不透明の蝋質の塊 · 細線を使わない粗い蝋質の切れ目"
    },
    "qualityNotes": {
      "en": "Broken wax coverage, broad color masses and a simplified face are visible. The coat looks brighter and more orange than the specified rust-red; brown hair and the teal train stripe remain recognizable.",
      "ja": "粗いワックスの欠け、大きな色面と単純化した顔が見えます。茶髪・暖色の赤いコート・青緑の帯も残っています。コートは指定の錆赤より鮮やかなオレンジ寄りに見えるため色の許容幅を"
    }
  },
  "fiction-spare-continuous-line": {
    "en": {
      "watchFor": "Open paper and a few long curves should dominate; accent areas can become broader than intended.",
      "characteristics": {
        "Line": "Few long continuous loops with deliberate gaps",
        "Paint & shading": "Up to two small supplied-hue accents without shadows",
        "Texture": "White space rather than hatching or texture"
      },
      "vocabulary": [
        "few long continuous loops with deliberate gaps",
        "up to two small supplied-hue accents without shadows",
        "white space rather than hatching or texture"
      ],
      "short": "Few long continuous loops with deliberate gaps · Up to two small supplied-hue accents without shadows · White space rather than hatching or texture"
    },
    "ja": {
      "watchFor": "紙白と少数の長い曲線を確認してください。差し色が指定より広くなる場合があります。",
      "characteristics": {
        "線": "少数の長いループと意図した途切れ",
        "塗り・陰影": "影を付けず、元色から選ぶ差し色を最大2色",
        "質感": "ハッチや質感の代わりの余白"
      },
      "vocabularyLabels": [
        "少数の長いループと意図した途切れ",
        "影を付けず、元色から選ぶ差し色を最大2色",
        "ハッチや質感の代わりの余白"
      ],
      "short": "少数の長いループと意図した途切れ · 影を付けず、元色から選ぶ差し色を最大2色 · ハッチや質感の代わりの余白"
    },
    "qualityNotes": {
      "en": "Long blue contours and open white paper dominate, with rust color on part of the coat and teal on the train stripe. Other surface colors are omitted; the marks do not form a literal single uninterrupted line.",
      "ja": "青い長い輪郭線と大きな白紙を残し、コートの一部に赤茶、列車の帯に青緑を置いています。他の地色は省略され、描かれた線は厳密な一筆ではありません。少数の色アクセントの方針を"
    }
  },
  "fiction-modular-dot-design": {
    "en": {
      "watchFor": "Check simplified geometric forms and selected large dot clusters rather than repeated dense rows.",
      "characteristics": {
        "Line": "Clean edges of simple geometric silhouettes",
        "Paint & shading": "Supplied-hue flat planes and navy shadow-dot ink",
        "Texture": "Ivory paper and selected large-dot shadow clusters"
      },
      "vocabulary": [
        "geometric flat silhouettes",
        "supplied-hue flat planes and navy shadow-dot ink",
        "open ivory paper"
      ],
      "short": "Clean edges of simple geometric silhouettes · Supplied-hue flat planes and navy shadow-dot ink · Ivory paper and selected large-dot shadow clusters"
    },
    "ja": {
      "watchFor": "単純な幾何学形と要所の大きな点を確認してください。密な点の反復が増える場合があります。",
      "characteristics": {
        "線": "単純な幾何学シルエットの明確な縁",
        "塗り・陰影": "元色の平面と、紺の影ドットのインク",
        "質感": "象牙色の紙と大きな点による影"
      },
      "vocabularyLabels": [
        "単純な幾何学シルエットの明確な縁",
        "元色の平面と、紺の影ドットのインク",
        "象牙色の紙と大きな点による影"
      ],
      "short": "単純な幾何学シルエットの明確な縁 · 元色の平面と、紺の影ドットのインク · 象牙色の紙と大きな点による影"
    },
    "qualityNotes": {
      "en": "Brown hair, rust-red clothing, a teal stripe and navy shadow dots remain visible. The figure is fairly natural in proportion; repeated ground dots and broad navy shadows weaken the requested sparse modular simplification.",
      "ja": "茶系の髪・赤茶コート・青緑の列車帯と、紺の影ドットが見えます。幾何学的な面はありますが人物の比率は比較的自然で、ドットが地面にも反復しています。影の紺ベタも広めです。"
    }
  },
  "gouache": {
    "en": {
      "watchFor": "Look for opaque matte brushwork rather than transparent washes or glossy modeled surfaces."
    },
    "ja": {
      "watchFor": "透明なにじみや艶のある立体塗りより、不透明でマットな筆跡を確認してください。"
    },
    "qualityNotes": {
      "en": "Matte opaque brush marks and warm/cool color planes are visible, with brown hair, a rust-red coat and a teal train stripe. Brushwork and map detail remain dense.",
      "ja": "マットな不透明の筆跡、暖冷色の面、茶髪・赤茶コート・青緑の列車帯が見えます。筆跡は背景全体に細かく、地図も描き込まれています。"
    }
  },
  "fiction-looping-flat": {
    "en": {
      "watchFor": "Check loose contour loops and flat paint; modeled shadows and dense detail can make the result more conventional."
    },
    "ja": {
      "watchFor": "揺れる輪郭と平らな塗りを確認してください。陰影や細部が増えると通常の人物画に近づきます。"
    },
    "qualityNotes": {
      "en": "Brown hair, a rust-red coat and a teal train stripe remain visible. Fine contours, detailed architecture/map marks and clothing shadows weaken the requested loose, mostly unmodeled flat-color treatment.",
      "ja": "茶髪・赤茶コート・青緑の列車帯を保った面と輪郭が見えます。ただし線や背景・地図は細かく、服の陰影もあるため、ゆるい輪郭とほぼ無陰影のベタ面という狙いは弱めです。"
    }
  },
  "manga-bold-scruffy-ink": {
    "en": {
      "watchFor": "Check rough contours and broad hair masses; fine strands and background detail can overwhelm the ink economy."
    },
    "ja": {
      "watchFor": "荒い輪郭と大きな毛束を確認してください。細い毛筋や背景の細部が増える場合があります。"
    },
    "qualityNotes": {
      "en": "This is the normal brown-haired scene, with brown hair masses, black contours and solid dark overlaps. Fine strands and map/building detail remain denser than the requested rough, economical ink treatment.",
      "ja": "茶髪の通常場面です。茶色の髪の面と、黒い輪郭・服の重なりの黒が見えます。細い毛筋や地図・建物の細部が多く、太く荒いインクの省略度は確認が必要です。"
    }
  }
};
