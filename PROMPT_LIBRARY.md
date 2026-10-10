# Prompt Library — ChatGPT image generation

Use these as two independent pieces: a character and scene prompt for the gallery example, and a visual style prompt for the rendering treatment. To make your own image in a style, write your own subject description and paste only that style's prompt after it. To approach a gallery example, paste the shared character and scene prompt followed by its style prompt.

The gallery images were selected from outputs generated after submitting these combined prompt parts. The exact submitted text and each image checksum are recorded in [`site/benchmark-manifest.json`](site/benchmark-manifest.json). The image tool did not expose a seed or underlying model version, so the same prompt can produce a different composition on another run.

Text prompts target the visible technique, not an identical image. For a closer match to a gallery image, attach that image in ChatGPT as a visual reference and say to preserve its medium, mark making, palette, and texture while following your subject description. Keep the same image model and output shape when comparing results, then inspect repeated generations. [OpenAI's image prompting guide](https://developers.openai.com/api/docs/guides/image-prompting) describes reference-based edits and consistency checks.

## Character and scene — shared benchmark

Benchmark ID: `station-map-v3` · Version: `3.0`. This prompt deliberately contains the person, pose, setting, and composition. It can be replaced in full when you want a different subject.

```text
Create one wide 16:9 landscape image, with no border or typography. A young adult East Asian woman with shoulder-length dark brown hair blowing gently to the left and expressive brown eyes wears a rust-red hooded coat and a black backpack. She holds an unfolded paper map in both hands at chest level, with the entire map visible near the lower edge. Frame her from the waist up in a medium close-up, slightly left of center: her head, torso, and map should fill most of the left half of the image. Her body is turned three-quarters to the right, and she looks up toward the right with a curious, slightly uncertain expression. She stands on a sunlit outdoor commuter-train platform. A long white commuter train with a muted teal stripe remains clearly visible across the right half of the background. The platform canopy and columns recede diagonally from the upper left; a few indistinct commuters stand far behind her. Keep the woman, map, platform, and train all clearly visible.
```

## Visual style prompts

### 水彩

![水彩 benchmark](site/public/images/watercolor.webp)

紙の白を透かす水彩。柔らかな境界と絵具の溜まりが、軽やかな空気を作ります。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as a hand-painted watercolor illustration with contemporary Japanese animation-inspired drawing when people appear: simplified expressive faces and very fine pencil-like contours, never photorealistic skin. Layer transparent pigment over visible cold-press paper. Let pale powder-blue and warm beige washes bleed and pool softly in the background while retaining crisp, delicate detail at the focal face and hands. Leave luminous paper-white highlights and use one richer warm accent from the subject. The result should feel airy and visibly painted with water. Avoid realistic portrait rendering, opaque digital paint, thick black outlines, and smooth computer gradients.
```

**注意点:** If every edge is sharp and opaque, the result can read as digital painting rather than watercolor.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### リソグラフ

![リソグラフ benchmark](site/public/images/risograph.webp)

少数の特色と不均一なインクで、手刷りのポスターのように描きます。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as a two-color risograph print on warm off-white uncoated paper. Use only deep midnight-navy and warm coral-orange spot inks, plus the third dark tone formed where they overlap; let the paper supply the light areas. Reduce the image to bold graphic shapes and strong contours. If a person appears, keep their expression readable through simplified comic-like features. Build midtones from coarse halftone dots and irregular ink grain, with slight visible misregistration between the two plates and imperfect ink coverage. Avoid full-color gradients, clean vector flatness, photographic shading, and uniform digital-noise overlays.
```

**注意点:** A uniform digital noise overlay is not a substitute for uneven ink and interacting color layers.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### ガッシュ

![ガッシュ benchmark](site/public/images/gouache.webp)

不透明な絵具の面と控えめな筆跡で、温かな手描きの形を作ります。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as an opaque gouache illustration with the warmth of hand-painted Japanese animation background art. Use broad, confident matte color shapes, layered opaque paint, softly visible bristle marks, and edges shaped by the brush rather than heavy ink outlines. If a person appears, give them simplified expressive drawn features. Balance muted powder blues, warm stone neutrals, and one earthy red accent; let soft daylight separate foreground and distance. Preserve enough surface texture to feel painted on paper. Avoid transparent watercolor blooms, glossy acrylic shine, photorealistic skin, and perfectly smooth vector fills.
```

**注意点:** Excess shine or transparent washes can make the image look like acrylic or watercolor instead.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### 墨絵

![墨絵 benchmark](site/public/images/ink-wash.webp)

薄めた墨と残した白紙で、形と余韻を表します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as an expressive ink-wash illustration on absorbent off-white paper. Build almost the entire image from black ink diluted into soft gray tonal washes, reserved white paper, and a few energetic dark calligraphic marks. When a person appears, use delicate manga-inspired contour lines around the face and hands, with simplified expressive features. Permit a single muted rust-red accent on the main subject; reinterpret every other color specified in the subject description as grayscale, including clothing and background details. Let distant forms dissolve into wet washes while focal details remain legible. Avoid photographic grayscale, full-color watercolor, polished digital gradients, and uniformly heavy outlines.
```

**注意点:** Pure grayscale with photographic shading misses the expressive role of brush marks and open paper.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### ピクセルアート

![ピクセルアート benchmark](site/public/images/pixel-art.webp)

意図的に配置したピクセルの塊で、物語ゲームのように描きます。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as carefully authored 2D pixel art for a narrative adventure game. Design on a low-resolution pixel grid, roughly 320 by 180 logical pixels for a wide scene, then display it with crisp nearest-neighbor enlargement. Use a limited palette of navy, slate blue, warm cream, peach, and rust red. Build forms from intentional square pixel clusters, stepped contours, flat color bands, and discrete shade changes; use readable anime-inspired sprite features if people appear. Keep the background architecture legible without fine photographic detail. Avoid blur, antialiasing, smooth gradients, vector outlines, and a merely downsampled photograph.
```

**注意点:** A blurry low-resolution picture is not pixel art; every cluster should look intentional.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### 35mm フィルム

![35mm フィルム benchmark](site/public/images/35mm-film.webp)

自然光、レンズの焦点、フィルムの粒子で、観察した日常を写します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
Render the subject as a candid photograph on 35mm color negative film, not an illustration. Use a natural 50mm documentary viewpoint, available light, gentle backlight when the scene permits, soft highlight rolloff, muted warm highlights, and slightly cool teal shadows. Keep the primary subject in believable focus while the background softens naturally through lens depth of field. If a person appears, preserve natural anatomy and an unposed expression. Add fine organic grain and slight exposure variation in the image itself, without making it look like a digital noise filter. Favor an observed everyday moment over polished commercial staging. Avoid airbrushed skin, heavy cinematic color grading, extreme bokeh, and painterly or anime rendering.
```

**注意点:** An aggressive grain overlay alone will not create believable lens, light, and color behavior.
**装丁:** 縦長の表紙ではタイトル用の余白を別途指定してください。文字は生成後に組版します。

### フラット日本アニメ

![フラット日本アニメ benchmark](site/public/images/flat-anime.webp)

形と色面で読ませる、軽快で明瞭な表現。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。細い均一な輪郭で閉じた形を作り、全画面を合計8色以内の完全なベタ塗りだけで構成する。肌、髪、服、地図、列車のどこにも影色、ハイライト、グラデーションを置かない。髪は一つの色面、服も一つの色面とする。地図は無地の紙と数本の線だけ。背景は列車の輪郭と帯、屋根のシルエットだけに簡略化し、窓の反射、床の影、遠景の小物は省く。奥行きは形の重なりだけで示す。人物がいる場合は日本アニメの簡潔な目鼻と自然な体型にする。平面的な人間の手描きイラストとして、描かない場所を残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：グラデーション、立体的な肌、細密な背景。
```

**注意点:** グラデーション、立体的な肌、細密な背景に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 二段セル塗り

![二段セル塗り benchmark](site/public/images/two-tone-cel.webp)

TVアニメらしい影の形で、人物の読みやすさを保つ。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。各素材を基本色と単一の影色だけで描く。影の境界は硬く、光源方向を統一する。顔と手は簡略化した日本アニメの造形で、影を小さく整理する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：エアブラシのぼかし、反射の多重塗り。
```

**注意点:** エアブラシのぼかし、反射の多重塗りに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 輪郭なしアニメ

![輪郭なしアニメ benchmark](site/public/images/line-free-anime.webp)

線を消し、シルエットと色の接点で柔らかく見せる。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。外輪郭線を省き、形の境界は隣り合う色面と明度差で示す。人物の目鼻など必要最小限の内側の線のみ細く残す。単純化したアニメ造形で、髪と衣服を大きな形に分ける。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：黒い縁取り、写実的な陰影。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 黒い縁取り、写実的な陰影に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 太線ポップアニメ

![太線ポップアニメ benchmark](site/public/images/thick-line-pop.webp)

小さい表紙でも読める、元気な形と強い輪郭。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。丸い終端の太い輪郭でシルエットを囲み、内側の線は少なくする。大きな色面と一段の影で塗る。表情を明快にし、背景は幾何学的に整理する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：繊細な線の密集、写真的な質感。
```

**注意点:** 繊細な線の密集、写真的な質感に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### レトロ手描きセル

![レトロ手描きセル benchmark](site/public/images/retro-cel.webp)

昔のセル画の手仕事を感じる、懐かしい画面。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。手描きのわずかな線幅の揺れを残す。セル画の不透明な平塗りと硬い影を使い、背景は柔らかいポスターカラーの筆致で描く。微かな塗膜むらを残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：VHSの大きな走査線、単なるノイズフィルタ。
```

**注意点:** VHSの大きな走査線、単なるノイズフィルタに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 漫画スクリーントーン

![漫画スクリーントーン benchmark](site/public/images/manga-screentone.webp)

白黒漫画の線とトーンで、物語の瞬間を切り取る。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。黒インクと白紙のみで描く。輪郭はペンの強弱をつけ、影は規則的なスクリーントーンの網点と黒ベタで分ける。焦点の顔と手は白を多く残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：連続グレーの写真階調、全体の一様な粒子。
```

**注意点:** 連続グレーの写真階調、全体の一様な粒子に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 繊細少女漫画線

![繊細少女漫画線 benchmark](site/public/images/shojo-delicate.webp)

髪と眼差しの繊細さを生かす、叙情的な漫画表現。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。極細の強弱線で髪を流れに沿って描き、目元に線の密度を集める。色は薄い透明な層に留め、背景の輪郭は部分的に消す。人物がいない場合も同じ繊細な線と白の余韻を保つ。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：必須の花や星、過剰なまつ毛、厚い影。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 必須の花や星、過剰なまつ毛、厚い影に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### デフォルメ・コミカル

![デフォルメ・コミカル benchmark](site/public/images/chibi-editorial.webp)

コミカルな短編や親しみやすい作品に向く。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。人物がいる場合は頭を大きめ、手足を短めにした三〜四頭身の造形にする。物や背景も丸い簡潔な形へ整理する。二〜三段階の平塗りで、表情と動作を読みやすくする。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：写実頭身、細かな筋肉、過剰な装飾。
```

**注意点:** 写実頭身、細かな筋肉、過剰な装飾に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 鉛筆アニメ原画

![鉛筆アニメ原画 benchmark](site/public/images/anime-pencil.webp)

完成画より手前の線の息づかいを残す。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。アニメの原画のような鉛筆の輪郭、薄い補助的な描き直し線、短いハッチングで描く。重要な輪郭を濃く、背景を薄くする。淡い色面は最小限に留め、紙の地を広く見せる。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：カラー指定記号や制作メモ、完成セルの平滑さ。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** カラー指定記号や制作メモ、完成セルの平滑さに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### アニメ背景美術

![アニメ背景美術 benchmark](site/public/images/anime-background.webp)

場面の空気と距離を主役にした、情景中心の表現。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。日本アニメの背景美術のように、建物や自然を不透明な細い筆致で描く。近景は鮮明に、遠景は明度差と彩度を下げる。人物がいる場合は簡潔なセル塗りで背景から区別する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：写真の貼り付け、全面同じ細密さ。
```

**注意点:** 写真の貼り付け、全面同じ細密さに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・透明感

![ラノベ・透明感 benchmark](site/public/images/ln-clean.webp)

人物の魅力を端正に見せる、読みやすい表紙表現。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。細い端正な線と日本アニメの造形を用い、肌の陰影は薄く、髪には束ごとの透明な明暗をつける。小さな反射光を焦点に絞り、背景は低コントラストへ整理する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：全面の強い光沢、肌の写真質感。
```

**注意点:** 全面の強い光沢、肌の写真質感に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・柔光ロマンス

![ラノベ・柔光ロマンス benchmark](site/public/images/ln-romantic.webp)

恋愛や青春の繊細な距離感を表す。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。輪郭を局所色に近い細線にし、柔らかな逆光で輪郭の一部を明るく抜く。アニメ造形と淡いグラデーションを使い、顔の陰影を浅くする。焦点以外は大きな柔らかい面へ省略する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：必須の花びら、ハート、過剰なぼけ玉。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 必須の花びら、ハート、過剰なぼけ玉に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・鋭角アクション

![ラノベ・鋭角アクション benchmark](site/public/images/ln-action.webp)

対立や緊張を鋭いエッジと明暗で描く。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。輪郭に鋭い角と強弱をつけ、布や髪を方向性のある形に分ける。明部と暗部を大きく分割し、焦点に強いコントラストを置く。元の場面を保ち、対角線の流れで緊張を作る。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：指定されていない武器や爆発、無意味な速度線。
```

**注意点:** 指定されていない武器や爆発、無意味な速度線に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・絵画幻想

![ラノベ・絵画幻想 benchmark](site/public/images/ln-fantasy-paint.webp)

ファンタジー向けの厚みと、描かれた手触り。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。アニメ寄りの人物造形を保ちつつ、衣服や背景を薄い不透明な筆の層で立体的に描く。素材ごとに反射と筆跡を変え、焦点に細部を集める。背景は大きな明暗の塊で整理する。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：指定されていない魔法陣、宝石、衣装変更。
```

**注意点:** 指定されていない魔法陣、宝石、衣装変更に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・陰影ミステリー

![ラノベ・陰影ミステリー benchmark](site/public/images/ln-mystery.webp)

暗い画面でも焦点を見失わない、不穏な表現。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。日本アニメの造形で、大きい影の面を画面の半分程度にまとめる。焦点の輪郭だけ明瞭にし、他の輪郭は暗部へ溶かす。小さな局所光と低彩度の塗りで静かな緊張を作る。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：血や恐怖物の追加、すべての細部の黒潰れ。
```

**注意点:** 血や恐怖物の追加、すべての細部の黒潰れに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・精密SF

![ラノベ・精密SF benchmark](site/public/images/ln-scifi.webp)

構造や材質を読み分ける、理知的な画面。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。細く正確なアニメ線で形を描き、金属、ガラス、布の反射を区別する。影は硬い面を基本に、反射は小さく整理する。直線的な背景構造を明確にし、人物の表情を柔らかく保つ。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：場面にない機械やHUD、全面のネオン。
```

**注意点:** 場面にない機械やHUD、全面のネオンに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・墨線彩色

![ラノベ・墨線彩色 benchmark](site/public/images/ln-ink-color.webp)

和風・伝奇作品に合う、線の力を生かした彩色。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。筆ペンの速度と強弱を感じる輪郭を主役にする。内側は淡い色の層で塗り、影は線の密度と限られた墨の面で表す。黒の量を焦点に集中させ、かすれを部分的に残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：墨だけの全面洗い、必須の和服や桜。
```

**注意点:** 墨だけの全面洗い、必須の和服や桜に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・パステル日常

![ラノベ・パステル日常 benchmark](site/public/images/ln-soft-pastel.webp)

日常の温かさを、粉っぽい柔らかな色で描く。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。人物がいれば穏やかなアニメ造形にし、色鉛筆のような柔らかい輪郭を使う。塗りはパステルの粉が紙に乗る微細な粒で、重ねた色の境界を軽くこする。影は浅く、白を多く残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：写実的なパステル肖像、強い黒線。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 写実的なパステル肖像、強い黒線に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・硬質光彩

![ラノベ・硬質光彩 benchmark](site/public/images/ln-jewel-light.webp)

髪・瞳・素材の反射を絞って華やかに見せる。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。アニメの細い輪郭と、透明な色の層で描く。髪や瞳、指定された硬い素材には小さく鋭いハイライトを置き、柔らかい素材はマットにする。反射は焦点に集中させる。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：宝石の追加、全身のプラスチック光沢、過飽和。
```

**注意点:** 宝石の追加、全身のプラスチック光沢、過飽和に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### ラノベ・グラフィック表紙

![ラノベ・グラフィック表紙 benchmark](site/public/images/ln-graphic-cover.webp)

人物と図形のリズムで、タイトルを載せやすくする。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。人物や主題は明瞭なアニメ輪郭と二〜三段の塗りで描く。背景の具体物は必要な形だけに整理し、大きな平面と対角線で構成する。焦点の周囲に低密度の空間を作る。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：文字の生成、装飾図形の詰め込み。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 文字の生成、装飾図形の詰め込みに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・余白の線画

![純文学・余白の線画 benchmark](site/public/images/literary-line.webp)

語りすぎない線と余白で、静かな気配を残す。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。少数の細いインク線で主題の特徴だけを描く。輪郭は部分的に途切れ、陰影はごく少ない短い線に留める。背景は必要な輪郭だけを残し、広い白い紙の地で呼吸を作る。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：全面の細密ハッチング、巨大な黒ベタ。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 全面の細密ハッチング、巨大な黒ベタに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・黒鉛スケッチ

![純文学・黒鉛スケッチ benchmark](site/public/images/literary-graphite.webp)

触れられるような鉛筆の濃淡で、記憶を描く。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。黒鉛鉛筆のみで描く。輪郭は細く、形は短いハッチングと擦った淡いグレーで作る。焦点は線を重ね、背景は描きかけのように薄く残す。紙の粒に黒鉛が不均一に乗る質感を保つ。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：写真の白黒変換、完全に滑らかな階調。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 写真の白黒変換、完全に滑らかな階調に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・銅版画

![純文学・銅版画 benchmark](site/public/images/literary-etching.webp)

密な線と紙の対比が、重みと歴史を感じさせる。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。単色の銅版画として、形を細い彫り線と交差ハッチングで描く。輪郭だけでなく面の方向に沿って線を刻み、暗部は線の密度で作る。紙の地と微かな拭き残しを残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：網点トーン、写真階調、版の飾り枠。
```

**注意点:** 網点トーン、写真階調、版の飾り枠に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・木版の刻み

![純文学・木版の刻み benchmark](site/public/images/literary-woodcut.webp)

荒い刻みと力強い形で、言葉の重みを支える。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。一色刷りの木版画として、白く彫り抜いた線と黒い版の面を組み合わせる。形の方向へ短い彫り跡を走らせ、黒白の大きな塊で構成する。木目とインクの欠けを局所的に残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：なめらかなベクター面、細い銅版ハッチング。
```

**注意点:** なめらかなベクター面、細い銅版ハッチングに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・リノカット

![純文学・リノカット benchmark](site/public/images/literary-linocut.webp)

木版より滑らかな刃の流れと、簡潔な図形。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。リノリウム版画の丸く滑らかな彫り跡で描く。輪郭は太い切り抜き線に整理し、二〜三色の版を重ねる。曲線の反復と大きな面で陰影を表し、わずかなインクむらを残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：木目、点状の網版、写真の陰影。
```

**注意点:** 木目、点状の網版、写真の陰影に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・モノタイプ

![純文学・モノタイプ benchmark](site/public/images/literary-monotype.webp)

ぼんやりした版の痕が、曖昧な記憶を表す。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。一回刷りのモノタイプとして、版上で拭き取ったインクの明暗と柔らかい転写の縁で形を作る。主題は読める程度に残し、背景は擦れや薄いインクの膜へ溶かす。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：水彩の鮮やかな花状にじみ、規則的な網点。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 水彩の鮮やかな花状にじみ、規則的な網点に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・切り紙コラージュ

![純文学・切り紙コラージュ benchmark](site/public/images/literary-paper-collage.webp)

紙の層と形の省略で、象徴的な場面を作る。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。無地の色紙を切り貼りしたコラージュとして描く。形は大きな紙片へ省略し、切断面のわずかな揺れと紙の繊維を残す。紙が重なる部分だけに小さな物理的影をつける。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：雑誌の文字、写真の切り抜き、CGの厚い立体。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 雑誌の文字、写真の切り抜き、CGの厚い立体に寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・薄塗り油彩

![純文学・薄塗り油彩 benchmark](site/public/images/literary-oil.webp)

重層的な色と失われる縁が、時間の厚みを作る。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。薄塗りの油彩として、落ち着いた色を何層も重ねる。輪郭は明暗の境界から立ち上げ、暗部では消す。焦点には小さな不透明な筆触を残し、背景は布目が透ける薄い層にする。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：厚い盛り上げ全面、光沢の強いCG。
```

**注意点:** 厚い盛り上げ全面、光沢の強いCGに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・木炭の気配

![純文学・木炭の気配 benchmark](site/public/images/literary-charcoal.webp)

曖昧な境界と強い明暗で、内面の揺れを表す。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。木炭で大きな明暗の塊を描き、指で擦った柔らかい灰色と練り消しで抜いた光を使う。焦点の特徴だけ鋭い木炭線で示し、他の縁は途切れさせる。紙の粒と粉の痕を残す。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：精密なペン輪郭、全体が均一なぼかし。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 精密なペン輪郭、全体が均一なぼかしに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。

### 純文学・ドライポイント

![純文学・ドライポイント benchmark](site/public/images/literary-drypoint.webp)

鋭い線の端にインクがにじむ、繊細な凹版表現。 焦点以外を省き、意図的な抜け感を残します。

Copy this section by itself after your own subject description. It intentionally does not describe the gallery character or train platform.

```text
指定された被写体と場面を次の絵柄で描いてください。ドライポイント版画として、直接引っかいた細い線と、その周囲に残るバリの柔らかなインクにじみで描く。線を少しずつ重ねて明暗を作り、余白は拭き上げた紙色にする。 被写体、服装、持ち物、場所は別の人物・場面プロンプトに従い、絵柄指定から追加しない。文字、ロゴ、透かしは描かない。避けるもの：完全に均一な銅版線、筆による広い洗い。 描き込みの密度を均等にしない。焦点の形と表情を丁寧に仕上げ、それ以外は線を途切れさせる、影を省く、紙や地色をそのまま残すなど、この技法に合う省略を使う。背景の小物や装飾を増やさない。余白にも構成上の意図を持たせ、低解像度や全面ぼかしで代用しない。
```

**注意点:** 完全に均一な銅版線、筆による広い洗いに寄ると、この絵柄の差が薄れます。
**装丁:** 縦長の表紙では上部25％を低密度にし、主題と顔を中央より下へ。タイトルと著者名は生成後に組版してください。
