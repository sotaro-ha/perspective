import { DemoSelection, StreamerText } from "@/models";

export const demoInput: Record<DemoSelection["key"], StreamerText> = {
    apple: "朝、みんながりんごになる夢を見た。目が覚めたら、昨日食べきれなかったりんごが机の上に置きっぱなしで、真夏だから変な匂いがしている。夏はそんなものだね。アラームの曲は穏やかで、聴いても眠気が取れない。眠くて、眠くて、りんごになってしまった。全く困ったものだ。",
    book: "朝、みんなが本になる夢を見た。目が覚めたら、昨日食べきれなかった本が机の上に置きっぱなしで、真夏だから変な匂いがしている。夏はそんなものだね。アラームの曲は穏やかで、聴いても眠気が取れない。眠くて、眠くて、本になってしまった。全く困ったものだ。",
    brush: "朝、みんなが歯ブラシになる夢を見た。目が覚めたら、昨日食べきれなかった歯ブラシが机の上に置きっぱなしで、真夏だから変な匂いがしている。夏はそんなものだね。アラームの曲は穏やかで、聴いても眠気が取れない。眠くて、眠くて、歯ブラシになってしまった。全く困ったものだ。",
    pencil: "朝、みんながペンになる夢を見た。目が覚めたら、昨日食べきれなかったペンが机の上に置きっぱなしで、真夏だから変な匂いがしている。夏はそんなものだね。アラームの曲は穏やかで、聴いても眠気が取れない。眠くて、眠くて、ペンになってしまった。全く困ったものだ。",
} as const;
