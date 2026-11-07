import type { Dict } from './en'

const ja: Dict = {
  meta: { title: 'Viral Dhoka | クリエイティブ・フロントエンド＆フルスタック開発者、プネー' },
  lang: { label: '言語', switching: '日本語' },

  nav: { main: 'メイン', about: '自己紹介', work: '作品', wins: '実績', contact: '連絡先', top: 'トップ', research: '研究' },
  clock: (time) => `プネー ${time}`,

  loader: { greetings: ['こんにちは', 'ようこそ', 'いらっしゃい'], aria: 'Viral Dhoka のポートフォリオを読み込み中', place: 'インド、プネー' },

  hero: {
    title: 'ウェブに\n命を吹き込む',
    sub: 'ヴィラルです。VIT プネーでコンピュータ工学を学んでいます。クリエイティブなフロントエンドと、それを支えるフルスタックのシステムやモデルをつくっています。',
    cta: '作品を見る',
    jump: '作品へ移動',
    scroll: 'スクロール',
  },

  story: {
    pune: 'プネー',
    drag: 'ドラッグ',
    coords: '北緯 18.52°、東経 73.86°',
    where: {
      kicker: 'いる場所',
      title: 'インド、プネー',
      body: 'デカン高原の上、インド西部のマハーラーシュトラ州にあります。地球儀をつかんで回してみてください。',
      big: 'プネー',
    },
    zoom: {
      kicker: 'ズームイン',
      body: '地図にカーソルを合わせると州の名前が読めます。マハーラーシュトラ州をクリックして先へ。',
      cta: 'プネーへ飛ぶ',
      map: '州ごとのインド地図',
      zoomIn: '拡大',
    },
    study: {
      kicker: '学んでいる場所',
      title: 'ヴィシュワカルマ工科大学',
      body: 'コンピュータ工学の2年生です。モルが案内します。',
      places: 'プネーの場所',
    },
    build: { kicker: 'つくっているもの' },
    next: {
      kicker: 'これから',
      title: '追いかけたいことはまだまだある',
      body: 'もっとハッカソンへ、もっと本物のユーザーへ、そして新しいチャンスへ。もっとつくり、もっと学び、もっと挑戦します。',
      cta: '作品を見る',
    },
    tabs: {
      front: {
        label: 'フロントエンド',
        title: '動くインターフェース',
        body: 'GSAP と WebGL を組み合わせた React と Next.js。今見ているこのページのように。最初に手を伸ばすのはいつもモーションです。',
        hint: 'どこかをクリックするとピクセルが反応します',
      },
      back: {
        label: 'バックエンド',
        title: '崩れないシステム',
        body: 'API、認証、キュー、そして Postgres。CESAC には今、2,400 人以上の学生による 11,000 件以上の記録があります。',
        hint: 'ノードをクリックしてリクエストを送信',
      },
      ai: {
        label: 'AI と機械学習',
        title: '仕事をするモデル',
        body: '説明可能な与信モデル、不正に対する敵対的学習、そしてウェブカメラによるリアルタイムの視線追跡。',
        hint: 'ニューロンをクリックして発火させる',
      },
    },
    graph: { Client: 'クライアント', API: 'API', Auth: '認証', Queue: 'キュー', Postgres: 'Postgres', send: '送信', fire: '発火' },
  },

  statement:
    'コンピュータ工学を学ぶ2年生で、ものの「触り心地」を大切にしています。たいていの日はクリエイティブなフロントエンドのこと。別の日は、それを本当に使えるものにするバックエンドとモデルのことです。',
  marquee: ['クリエイティブ・フロントエンド', 'フルスタック', 'バックエンド', 'AI と機械学習', 'プネー'],

  work: {
    kicker: '厳選した作品',
    hint: 'ドラッグ、スワイプ、または矢印で操作',
    count: (n) => `${n} 本のテープをループ再生`,
    build: 'Viral Dhoka の作品',
    initials: 'VD',
    drag: 'ドラッグ',
    open: '開く',
    openProject: 'このプロジェクトを開く',
    prev: '前のプロジェクト',
    next: '次のプロジェクト',
    halftoneL: ['作', '品'],
    halftoneR: ['棚', '一', '覧'],
  },

  wins: {
    title: 'これまでの実績',
    results: 'ハッカソンの結果',
    funnelDone: '250 以上のチーム中 3 位',
    funnelLeft: (n) => `残り ${n} チーム`,
    funnelAria: '250 チームから決勝の 40 チームへ、そして表彰台の 3 チームへ',
    replay: 'もう一度',
    cesac: 'CESAC、cesac.in で公開中',
    students: '登録した学生',
    records: '提出された記録',
    views: 'ページビュー',
    openCesac: 'CESAC を開く',
    research: '研究と\n掘り下げ',
    open: '開く',
    shipping: 'いつもリリース中',
    commits: 'コミット',
    repos: 'リポジトリ',
    vercel: 'Vercel プロジェクト',
    hoverDay: '日付にカーソルを合わせる',
    onDay: (n, day) => `${day}：${n} 件`,
    calendar: (n) => `この 1 年で ${n} 件のコミット`,
    also: '棚にはほかにも',
  },

  detail: {
    close: '閉じる',
    visit: (domain) => `${domain} を見る`,
    visitSite: 'サイトを見る',
    code: 'コード',
    shot: (title) => `${title} のスクリーンショット`,
  },

  footer: {
    kicker: '新しいチャンスを探しています',
    hello: '声をかけてください',
    greets: ['声をかけてください', '話しましょう', 'メールをください'],
    another: '別の言い方',
    copy: 'コピー',
    copied: 'コピーしました',
    copiedSay: 'コピーしました！',
    builds: '棚に並ぶ作品',
    podiums: 'ハッカソンでの入賞',
    commits: '1 年間のコミット',
    vercel: 'Vercel プロジェクト',
    basedIn: '拠点',
    city: 'インド、プネー',
    now: (time, part) => `${part}の ${time}`,
    parts: { lateNight: '深夜', morning: '朝', afternoon: '昼', evening: '夕方', night: '夜' },
    studying: '在学',
    degree: 'コンピュータ工学',
    college: 'VIT プネー、2025〜2029年',
    live: '公開中',
    elsewhere: 'ほかの場所',
    onPage: 'このページ',
    sign: 'Viral Dhoka、2026',
    built: 'プネーで React、GSAP、WebGL を使ってつくりました',
    mapFrom: 'インド地図の出典：',
    license: 'CC BY 4.0',
    fanIt: '羽を広げる',
    backTop: 'トップへ戻る',
  },

  mor: {
    aria: 'クジャクのモル。クリックすると羽を広げます。',
    cry: 'モル！',
    lines: {
      hero: 'こんにちは、モルです！',
      statement: 'スクロールを続けて',
      night: '地球儀を回して！',
      work: 'テープを選んで',
      research: 'みんなでやりとげた！',
      activity: 'コミットを見て',
      footer: '声をかけてね！',
    },
  },

  projects: {
    cesac: {
      tagline: '学科のすべての学生の実績を、ひとつの記録に',
      kind: 'フルスタック',
      credit: 'フロントエンド、バックエンド、データベースを担当',
      summary:
        'VIT プネーのコンピュータ工学科学生活動委員会のためのプラットフォーム。学生は資格、イベント、コンテスト、インターンシップ、特許、論文をひとつの場所に提出し、教員がそれを確認し、すべての実績が記録されます。',
      points: ['2,400 人以上の学生が登録', '11,000 件以上の記録を提出', '200,000 回以上のページビュー'],
    },
    patienttap: {
      tagline: '手首につける、暗号化された医療ID',
      kind: 'ヘルステック',
      credit: 'チーム Vishwakarma gng と共に',
      summary:
        'オフラインで動く NFC の緊急用ID。アレルギー、服薬、重要な病歴が身につけるカードに暗号化して保存され、救急隊員なら誰でも、電波がまったくなくても数秒で読み取れます。',
      points: ["MIT-WPU の Incubex '26 で準優勝", 'ナビムンバイ・カルガルの CODEAMBLE 2026 で 3 位', 'わずか 504 バイトの NFC タグで AES-256-GCM', 'ネットワークにまったく頼らず読み書き'],
    },
    itspune: {
      tagline: 'プネーの修理店のためのウェブサイトと修理トラッカー',
      kind: 'クライアントサイト',
      credit: 'ソムワール・ペートの修理店のために制作',
      summary:
        'プリンター、ノートPC、パソコンの修理店のサイトと、その裏で動くスタッフ用の受付記録。すべての機器にロット番号、預かり時の写真、ステータス更新がつき、お客さんは追跡ページで進み具合を確認できます。',
      points: ['オーナーとチームのアカウントを備えたスタッフ用アプリ', 'ロット番号、印刷した伝票、WhatsApp での通知', 'お客さんが自分の機器を追跡できる'],
    },
    sigil: {
      tagline: '学位や履歴書の確認は、電話ではなく署名で',
      kind: '信頼とアイデンティティ',
      credit: 'VIT プネーのチーム Sigil と共に',
      summary:
        '発行元が署名した証明を、誰でもその場で確認できます。確認のたびに発行元へ問い合わせる必要はありません。証明書、履歴書まるごと、紙での確認、そして本人が持つウォレットまでをカバーします。',
      points: ['誰が保証したかを示さずに「確認済み」とは言わない', 'AI が提案し、本人が確定する', '英語、ヒンディー語、マラーティー語'],
    },
    samvada: {
      tagline: '話しながら言語を学ぶ',
      kind: '教育',
      credit: 'ひとりで制作',
      summary:
        '単語はいくつか知っているけれど、文法は学んだことがない人のための会話中心のコース。文法は実際の文に必要なところでだけ登場し、どのモジュールも本当に会話をして終わります。',
      points: ['10 コース、それぞれ独自の文字、配色、書体', 'サンスクリット語、ヒンディー語、マラーティー語、ベンガル語、タミル語、テルグ語、カンナダ語、パーリ語、ドイツ語、フランス語', '連続記録なし、XP なし、マスコットなし'],
    },
    wattway: {
      tagline: 'いちばん近い充電器ではなく、本当にいちばん良い充電器を',
      kind: '地図とルート',
      credit: 'インデックスとバックエンドのリード、チーム Kothimbir',
      summary:
        'EV のルートと順番待ちの最適化ツール。待ち列の長さをリアルタイムで表示し、バッテリーを考慮した充電 1 回のルートを計画し、ドライバーがバーチャルに順番待ちできます。どのデータ構造も実際の機能を支えている、データ構造のプロジェクトです。',
      points: ['201 件のテストに合格', '距離、待ち時間、料金をまとめて考えて立ち寄り先を選ぶ', '時間枠と待ち列を管理する運営者用ダッシュボード'],
    },
    taral: {
      tagline: '人間であることを証明しよう。楽しく。',
      kind: 'インタラクティブな物語',
      credit: 'Insight AI の Pixathon のために制作',
      summary:
        'CAPTCHA を、語りつきのおとぎ話として作り直しました。自分とパートナーの名前を入力し、相手を取り戻すために 3 つの試練を越えていきます。どの門も、人間にしか通れないテストです。',
      points: ['物語全体で 13 種類のチャレンジ', '「人間らしさ」のパーセンテージで採点', 'リアルタイムのランキングと全編ボイスの語り'],
    },
    pathway: {
      tagline: 'ローンの不承認は、道しるべであるべきだ',
      kind: 'フィンテックと機械学習',
      credit: 'ハッカソンのプロトタイプ、教育用シミュレーション',
      summary:
        'ローンが断られた理由をわかりやすい英語、ヒンディー語、マラーティー語で説明し、結果をくつがえす最小で現実的な変化を見つけ、いつそこにたどり着けるかを予測します。',
      points: ['解釈可能なモデルによる理由コード', '400 通りの未来から承認されそうな月を算出', '即時ローンの本当の実質年率をチェック'],
    },
    abyssguard: {
      tagline: '海の底にあるものを見る',
      kind: '海洋 AI',
      credit: 'チーム TMS<3、スマート・インディア・ハッカソン 2026',
      summary:
        '生のサイドスキャンソナーのログを、位置情報と信頼度スコアのついた危険報告に変える搭載システムの製品紹介。インド地球科学省と NIOT のためのものです。',
      points: ['課題番号 26057', 'モデルだけでなく、検出器の後に物理ベースのフィルター', 'クラウドに接続せず機体の上で動くよう設計'],
    },
    satquery: {
      tagline: '地球に聞こう。答えを得よう。',
      kind: 'リモートセンシング AI',
      credit: 'チーム TMS<3、スマート・インディア・ハッカソン 2026',
      summary:
        'ISRO のための視覚言語アシスタントの製品紹介。画像 1 枚、光学と SAR の組み合わせ、または同じ土地の 2 つの日付を渡して、ふつうの言葉で質問するだけ。処理の流れは質問が決めます。',
      points: ['課題番号 26167', 'ひとつの質問が、単機能のツールの代わりになる', 'すべての数値に出典をつける'],
    },
    immunis: {
      tagline: '決済ネットワークのための敵対的な免疫システム',
      kind: '不正検知と機械学習',
      credit: 'Python エンジンとウェブのプロトタイプ',
      summary:
        'まだ起きていない不正を先につくり出します。生成 AI による新しい決済不正をリアルな台帳の中に生成し、調整済みのハイブリッド検出器で守り、モデルが勝つまでレッドエージェントを本番モデルに対して進化させ続けます。',
      points: ['すり抜けはすべて、明日の学習ラベルになる', 'パイプライン全体が CPU で約 7 分', 'コマンドひとつで結果を再生成'],
    },
    eagle: {
      tagline: '図面が正解。写真が証拠。',
      kind: '産業 AI',
      credit: 'チーム Vishwakarma gng と共に',
      summary:
        '電気キャビネットの品質管理プロトタイプ。写真の中の部品、ラベル、圧着端子をひとつずつ設計図面と照らし合わせ、検査員をチェックシートに沿って案内します。今回のラウンドの結果はシミュレーションです。',
      points: ['検査、品質管理シート、再検査の履歴', 'プラグイン式のチェック', '次のラウンドで本物の AI パイプラインを組み込める設計'],
    },
    fingervault: {
      tagline: '指一本で、確認済みの記録がすべて。',
      kind: '生体認証の研究',
      credit: 'グループ 17、指導教員 Rahul Diwate 博士',
      summary:
        'プライバシーを最優先にした、生体認証による従業員情報と緊急アクセスのシステム。この段階はインターフェースのプロトタイプで、暗号化ストアの代わりに合成データを、ハードウェアにはシミュレーションの処理時間を使っています。',
      points: ['偽造や摩耗した隆線にも対応する 9 段階のスキャン処理', 'ひとつの記録を役割ごとに見せ分ける', 'インシデントに結びついた緊急開示'],
    },
    riyaaz: {
      tagline: 'ヒンドゥスターニー古典声楽の練習部屋',
      kind: '音楽',
      credit: 'スマホ向けの PWA と Android アプリ',
      summary:
        'ラーガの資料、タンプーラ、ハルモニウム、タブラ、時間に合わせて流れる歌詞での歌唱、録音、スワラ計、練習ログを英語とマラーティー語で。データはすべて端末に残り、オフラインでも動きます。',
      points: ['アプリとしてインストールできる', 'Capacitor で Android 版をビルド', 'バックアップはあなたの手元に'],
    },
    riddles: {
      tagline: '3 つのパック。3 つの命。チャンスは 1 回。',
      kind: 'ゲーム',
      credit: 'ひとりで制作、贈り物として',
      summary:
        '本格的なバックエンドまで育ったなぞなぞゲーム。自然言語処理による答え合わせ、Firebase のランキング、AI のなぞなぞ生成、リアルタイムの管理画面、そしてなぞなぞがすでにネット上にあるかを確かめるスクレイパー。',
      points: ['GitHub で 13 スター', '文字の完全一致ではなく、答えの意味を理解', '上位 3 位に入るとメールでお知らせ'],
    },
    sunshine: {
      tagline: '指のあいだの音楽',
      kind: 'クリエイティブ・テック',
      credit: 'ブラウザで手を使って奏でる楽器',
      summary:
        'ウェブカメラが楽器になります。手のランドマークをリアルタイムで検出し、つまむ動作を認識してコードに割り当て、音はすべてブラウザの中でつくられます。',
      points: ['手のランドマークをリアルタイムで検出', 'つまむジェスチャーをコードに割り当て', 'Web Audio で音を生成'],
    },
  },

  stack: {
    'YOLO11-seg design': 'YOLO11-seg による設計',
    'Vision-language design': '視覚言語モデルによる設計',
    'ESP32 design': 'ESP32 による設計',
    'Computer vision': 'コンピュータビジョン',
    'Hand tracking': 'ハンドトラッキング',
  },

  archive: {
    Poof: { note: '24 時間後に自動で消えるグループ投票' },
    'Bhav Saathi': { note: 'GAVS ハッカソンのためのコンセプト映像、Tanaya Thorat と共に' },
    BioAI: { note: 'NCBI、UniProt、GWAS のデータを使ったゲノム解析プラットフォーム' },
    Cognito: { note: 'Gemini Live API で動く、声で話すメンタルヘルスの相棒' },
    Pixels: { note: 'Next.js、GSAP、Lenis でつくったアニメーションのあるエージェンシーサイト' },
    Brioso: { note: '物語でつくった、映画のようなカフェのウェブサイト' },
    'Mafia Moderator': { note: '人狼に似た「マフィア」ゲームの進行をまるごと担当' },
    'Drowsiness Detection': { title: '居眠り検知', note: 'MediaPipe で目を追跡し、Arduino で警告' },
    Marginalia: { note: 'ロック画面に、人が書いた一行を' },
  },

  pins: {
    vit: { place: 'ビブウェワディ', note: 'コンピュータ工学を学んでいる場所。2025〜2029年。' },
    mit: { place: 'コトルード', note: "Patient-Tap が Incubex '26 で準優勝した場所。" },
    its: { place: 'ソムワール・ペート', note: 'サイトとトラッカーをつくった、地元の修理店。' },
  },

  hackathons: {
    incubex: {
      place: '準優勝',
      host: 'MIT 世界平和大学、プネー',
      note: 'Patient-Tap で 2 位。Tanaya Thorat、Samruddhi Wankhede、Vedant Patil、Samarth Dhage、Vyanktesh Yeole と共に。',
    },
    codeamble: {
      place: '3 位',
      host: '全国規模の 24 時間ハッカソン、ナビムンバイ・カルガル',
      note: '初めてのオフラインのハッカソンで、初めての表彰台。作品は Patient-Tap。Samarth Dhage、Tanaya Thorat、Vyanktesh Yeole と共につくりました。',
    },
  },

  research: {
    fingervault: { title: 'プライバシー優先の生体認証記録', where: 'グループ 17、指導教員 Rahul Diwate 博士' },
    abyssguard: { title: 'サイドスキャンソナーで見る海洋ごみ', where: 'SIH 2026、課題番号 26057' },
    satquery: { title: '視覚言語モデルによるリモートセンシング', where: 'SIH 2026、課題番号 26167' },
    immunis: { title: '決済不正に対する敵対的学習', where: '本番モデルに挑むレッドエージェント' },
  },

  states: {
    'Andaman and Nicobar Islands': 'アンダマン・ニコバル諸島',
    'Andhra Pradesh': 'アーンドラ・プラデーシュ州',
    'Arunachal Pradesh': 'アルナーチャル・プラデーシュ州',
    Assam: 'アッサム州',
    Bihar: 'ビハール州',
    Chandigarh: 'チャンディーガル',
    Chhattisgarh: 'チャッティースガル州',
    'Dadra and Nagar Haveli': 'ダードラー及びナガル・ハヴェーリー',
    'Daman and Diu': 'ダマン・ディーウ',
    Delhi: 'デリー',
    Goa: 'ゴア州',
    Gujarat: 'グジャラート州',
    Haryana: 'ハリヤーナー州',
    'Himachal Pradesh': 'ヒマーチャル・プラデーシュ州',
    'Jammu and Kashmir': 'ジャンムー・カシミール',
    Jharkhand: 'ジャールカンド州',
    Karnataka: 'カルナータカ州',
    Kerala: 'ケーララ州',
    Lakshadweep: 'ラクシャドウィープ',
    'Madhya Pradesh': 'マディヤ・プラデーシュ州',
    Maharashtra: 'マハーラーシュトラ州',
    Manipur: 'マニプル州',
    Meghalaya: 'メーガーラヤ州',
    Mizoram: 'ミゾラム州',
    Nagaland: 'ナガランド州',
    Odisha: 'オディシャ州',
    Puducherry: 'ポンディシェリ',
    Punjab: 'パンジャーブ州',
    Rajasthan: 'ラージャスターン州',
    Sikkim: 'シッキム州',
    'Tamil Nadu': 'タミル・ナードゥ州',
    Telangana: 'テランガーナ州',
    Tripura: 'トリプラ州',
    'Uttar Pradesh': 'ウッタル・プラデーシュ州',
    Uttarakhand: 'ウッタラーカンド州',
    'West Bengal': '西ベンガル州',
  },
}

export default ja
