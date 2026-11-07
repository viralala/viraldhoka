import type { Dict } from './en'

const zh: Dict = {
  meta: { title: 'Viral Dhoka | 创意前端与全栈开发者，浦那' },
  lang: { label: '语言', switching: '中文' },

  nav: { main: '主导航', about: '关于', work: '作品', wins: '成绩', contact: '联系', top: '顶部', research: '研究' },
  clock: (time) => `浦那 ${time}`,

  loader: { greetings: ['你好', '欢迎', '欢迎光临'], aria: '正在加载 Viral Dhoka 的作品集', place: '印度浦那' },

  hero: {
    title: '让网页\n活起来',
    sub: '我是 Viral，浦那 VIT 计算机工程专业的学生。我做富有创意的前端，也做支撑它们的全栈系统和模型。',
    cta: '看看我的作品',
    jump: '跳到作品',
    scroll: '向下滚动',
  },

  story: {
    pune: '浦那',
    drag: '拖动',
    coords: '北纬 18.52°，东经 73.86°',
    where: {
      kicker: '我在哪里',
      title: '印度浦那',
      body: '位于德干高原，印度西部的马哈拉施特拉邦。抓住地球仪，转一转吧。',
      big: '浦那',
    },
    zoom: {
      kicker: '拉近看看',
      body: '把鼠标移到地图上，就能看到每个邦的名字。点击马哈拉施特拉邦继续。',
      cta: '飞往浦那',
      map: '按邦划分的印度地图',
      zoomIn: '放大',
    },
    study: {
      kicker: '我在哪里读书',
      title: '维什瓦卡尔玛理工学院',
      body: '计算机工程专业二年级。莫尔会带你四处看看。',
      places: '浦那的地点',
    },
    build: { kicker: '我做什么' },
    apps: { kicker: '我在构建什么' },
    os: {
      name: 'Mor OS',
      dock: 'Mor OS 应用',
      move: '拖动',
      search: '搜索',
      apps: { maps: '地图', id: '学生证', term: '终端', apps: '应用' },
      mapsIndia: '地图 · 印度',
      card: {
        kind: '学生',
        name: '姓名',
        programme: '专业',
        branch: '计算机工程',
        year: '年级',
        yearValue: '大二',
        batch: '届别',
        places: '浦那的地点',
        flip: '翻转卡片',
        flipHint: '点击卡片即可翻面',
      },
      term: {
        label: '终端命令',
        placeholder: '输入 help',
        help: '命令：frontend、backend、ai、whoami、ls、clear',
        whoami: 'Viral Dhoka。创意前端与全栈，浦那。',
        missing: (c) => `找不到命令：${c}。试试 help。`,
      },
      appsWin: {
        live: '在线',
        more: (n) => `书架上还有 ${n} 个`,
        open: (title) => `打开 ${title}`,
        readme: 'readme.txt',
      },
    },
    next: {
      kicker: '接下来',
      title: '还有很多要追',
      body: '更多黑客马拉松，更多真实用户，也在寻找新的机会。多做、多学、多参赛。',
      cta: '看看作品',
    },
    tabs: {
      front: {
        label: '前端',
        title: '会动的界面',
        body: '用 React 和 Next.js，配合 GSAP 和 WebGL，就像你正在看的这个页面。动效是我最先想到的东西。',
        hint: '随便点一下，像素就会回应',
      },
      back: {
        label: '后端',
        title: '扛得住的系统',
        body: 'API、身份验证、队列和 Postgres。CESAC 目前已收录 2,400 多名学生的 11,000 多条记录。',
        hint: '点击一个节点来发送请求',
      },
      ai: {
        label: '人工智能与机器学习',
        title: '有任务的模型',
        body: '可解释的信用模型、对抗反欺诈训练，以及基于摄像头的实时眼动追踪。',
        hint: '点击一个神经元来激活它',
      },
    },
    graph: { Client: '客户端', API: 'API', Auth: '鉴权', Queue: '队列', Postgres: 'Postgres', send: '发送', fire: '激活' },
  },

  statement:
    '我是计算机工程专业的大二学生，在意事物带给人的感受。大多数时候，这意味着富有创意的前端。另一些时候，这意味着让它们真正好用的后端和模型。',
  marquee: ['创意前端', '全栈', '后端', '人工智能与机器学习', '浦那'],

  work: {
    kicker: '精选作品',
    hint: '拖动、滑动或使用箭头',
    count: (n) => `${n} 盘磁带，循环播放`,
    build: 'Viral Dhoka 作品',
    initials: 'VD',
    drag: '拖动',
    open: '打开',
    openProject: '打开这个项目',
    prev: '上一个项目',
    next: '下一个项目',
    halftoneL: ['作', '品'],
    halftoneR: ['收', '藏', '架'],
  },

  wins: {
    title: '目前的成绩',
    results: '黑客马拉松成绩',
    funnelDone: '250 多支队伍中排名第三',
    funnelLeft: (n) => `还剩 ${n} 支队伍`,
    funnelAria: '250 支队伍筛选到 40 支决赛队伍，再到领奖台上的三支队伍',
    replay: '重播',
    cesac: 'CESAC，已在 cesac.in 上线',
    students: '注册学生',
    records: '提交记录',
    views: '页面浏览量',
    openCesac: '打开 CESAC',
    research: '研究与\n深入探索',
    open: '打开',
    shipping: '一直在发布',
    commits: '次提交',
    repos: '个代码仓库',
    vercel: '个 Vercel 项目',
    hoverDay: '把鼠标移到某一天',
    onDay: (n, day) => `${day}：${n} 次`,
    calendar: (n) => `过去一年共 ${n} 次提交`,
    also: '书架上还有',
  },

  detail: {
    close: '关闭',
    visit: (domain) => `访问 ${domain}`,
    visitSite: '访问网站',
    code: '代码',
    shot: (title) => `${title} 的截图`,
  },

  footer: {
    kicker: '正在寻找新机会',
    hello: '打个招呼',
    greets: ['打个招呼', '聊聊吧', '给我写信'],
    another: '换个说法',
    copy: '复制',
    copied: '已复制',
    copiedSay: '已复制！',
    builds: '个书架上的作品',
    podiums: '次黑客马拉松获奖',
    commits: '一年内的提交',
    vercel: '个 Vercel 项目',
    basedIn: '所在地',
    city: '印度浦那',
    now: (time, part) => `${part} ${time}`,
    parts: { lateNight: '深夜', morning: '上午', afternoon: '下午', evening: '傍晚', night: '晚上' },
    studying: '就读',
    degree: '计算机工程',
    college: '浦那 VIT，2025 至 2029 年',
    live: '已上线',
    elsewhere: '其他平台',
    onPage: '本页内容',
    sign: 'Viral Dhoka，2026',
    built: '在浦那用 React、GSAP 和 WebGL 打造',
    mapFrom: '印度地图来自',
    license: 'CC BY 4.0',
    fanIt: '开屏',
    backTop: '回到顶部',
  },

  mor: {
    aria: '孔雀莫尔。点击让它开屏。',
    cry: '莫尔！',
    lines: {
      hero: '你好，我是莫尔！',
      statement: '继续往下滑',
      night: '转转地球仪！',
      work: '挑一盘磁带',
      research: '这是我们做到的！',
      activity: '看看这些提交',
      footer: '打个招呼吧！',
    },
  },

  projects: {
    cesac: {
      tagline: '全系每一项学生成就，集中记录在一处',
      kind: '全栈',
      credit: '前端、后端和数据库都由我搭建',
      summary:
        '浦那 VIT 计算机工程学生活动委员会的平台。学生在同一个地方提交证书、活动、竞赛、实习、专利和论文，老师进行审核，每一项成就都会被记录下来。',
      points: ['2,400 多名注册学生', '11,000 多条提交记录', '200,000 多次页面浏览'],
    },
    patienttap: {
      tagline: '戴在手腕上的加密医疗身份',
      kind: '医疗科技',
      credit: '与 Vishwakarma gng 团队合作',
      summary:
        '一种离线优先的 NFC 急救身份。过敏、用药和关键病史加密存储在可穿戴卡片上，任何急救人员都能在没有信号的情况下几秒内读取。',
      points: ["MIT-WPU Incubex '26 亚军", '纳威孟买卡尔加尔 CODEAMBLE 2026 季军', '在仅有 504 字节的 NFC 标签上实现 AES-256-GCM', '读写完全不依赖网络'],
    },
    itspune: {
      tagline: '为浦那一家维修店打造的网站和维修追踪系统',
      kind: '客户网站',
      credit: '为松瓦尔佩特的一家维修店打造',
      summary:
        '一家打印机、笔记本和电脑维修店的网站，背后有一套员工登记系统。每台设备都有批次号、送修照片和状态更新，顾客可以在追踪页面上随时查看。',
      points: ['带店主和团队账号的员工应用', '批次号、打印单据和 WhatsApp 通知', '顾客自己追踪自己的设备'],
    },
    sigil: {
      tagline: '用签名核验学历和简历，而不是打电话',
      kind: '信任与身份',
      credit: '与 VIT 浦那的 Sigil 团队合作',
      summary:
        '由签发方签名的证明，任何人都能即时核验，无需每次都向签发方查询。涵盖证书、完整简历、纸质核查，以及归持有人所有的钱包。',
      points: ['不说明由谁担保，就绝不显示“已核验”', 'AI 提出建议，持有人确认', '英语、印地语和马拉地语'],
    },
    samvada: {
      tagline: '在开口说话中学语言',
      kind: '教育',
      credit: '独立完成',
      summary:
        '以对话为先的课程，面向认识一些单词却从没学过语法的人。只有真实句子需要时才出现语法，每个单元都以真正的对话结束。',
      points: ['十门课程，每门都有自己的文字、配色和字体', '梵语、印地语、马拉地语、孟加拉语、泰米尔语、泰卢固语、卡纳达语、巴利语、德语和法语', '没有连胜，没有经验值，没有吉祥物'],
    },
    wattway: {
      tagline: '找到真正最合适的充电桩，而不只是最近的那个',
      kind: '地图与路线',
      credit: '索引与后端负责人，Kothimbir 团队',
      summary:
        '电动车路线与排队优化工具。它实时显示排队长度，规划考虑电量、只停一次充电的路线，还能让司机在线排队。这是一个数据结构项目，每种结构都支撑着一个真实功能。',
      points: ['201 项测试全部通过', '综合距离、等待时间和价格来选择停靠点', '面向运营方的时段和排队管理面板'],
    },
    taral: {
      tagline: '证明你是人类。顺便玩得开心。',
      kind: '互动故事',
      credit: '为 Insight AI 的 Pixathon 打造',
      summary:
        '把验证码重新想象成一个有旁白的童话。你输入自己和另一半的名字，然后闯过三道考验把对方找回来，而每一道门都是只有人类才能通过的测试。',
      points: ['故事中有 13 种挑战', '以“人类指数”百分比计分', '实时排行榜和全程语音旁白'],
    },
    pathway: {
      tagline: '贷款被拒，应该换来一张路线图',
      kind: '金融科技与机器学习',
      credit: '黑客马拉松原型，一个教学模拟',
      summary:
        '用浅白的英语、印地语或马拉地语解释贷款为什么被拒，找出能扭转结果的最小、最现实的改变，并预测你什么时候能做到。',
      points: ['原因代码来自可解释的模型', '400 种模拟未来给出最可能获批的月份', '为即时贷款核算真实年化利率'],
    },
    abyssguard: {
      tagline: '看清水下的一切',
      kind: '海洋人工智能',
      credit: 'TMS<3 团队，2026 印度智慧黑客马拉松',
      summary:
        '一套船载系统的产品展示，它把原始侧扫声呐日志转化为带地理标记和置信度评分的危险报告，服务于印度地球科学部和国家海洋技术研究所（NIOT）。',
      points: ['问题编号 26057', '检测器之后还有基于物理的过滤，不只是一个模型', '设计为在载具上运行，无需联网'],
    },
    satquery: {
      tagline: '向地球提问，获得洞察。',
      kind: '遥感人工智能',
      credit: 'TMS<3 团队，2026 印度智慧黑客马拉松',
      summary:
        '为印度空间研究组织（ISRO）设计的视觉语言助手的产品展示。给它一张图像、一组光学与 SAR 图像，或同一片地面的两个日期，然后用日常语言提问。问题本身决定处理流程。',
      points: ['问题编号 26167', '一个问题取代多个单一用途的工具', '每个数字都标明出处'],
    },
    immunis: {
      tagline: '为支付网络打造的对抗式免疫系统',
      kind: '反欺诈与机器学习',
      credit: 'Python 引擎加网页原型',
      summary:
        '提前制造还没发生的欺诈。它在逼真的账本中生成由生成式 AI 驱动的新型支付欺诈，用校准过的混合检测器进行防御，再让一个红方智能体对抗在线模型不断进化，直到模型胜出。',
      points: ['每一次绕过都成为明天的训练标签', '整个流程在 CPU 上约 7 分钟跑完', '一条命令即可重新生成全部结果'],
    },
    eagle: {
      tagline: '图纸是标准答案，照片是证据。',
      kind: '工业人工智能',
      credit: '与 Vishwakarma gng 团队合作',
      summary:
        '一个电气柜质量检测原型。它把照片中的每个部件、标签和线鼻子与工程图纸逐一比对，并引导检验员完成检查表。本轮结果为模拟数据。',
      points: ['检验、质检表和复检记录', '插件式检查', '为下一轮接入真正的 AI 流程做好准备'],
    },
    fingervault: {
      tagline: '一根手指，调出完整的核验档案。',
      kind: '生物识别研究',
      credit: '第 17 组，指导老师 Rahul Diwate 博士',
      summary:
        '一套隐私优先的生物识别员工信息与紧急访问系统。当前阶段是界面原型，用合成档案代替加密存储，并模拟硬件耗时。',
      points: ['九个阶段的扫描流程，包括伪造指纹和磨损纹线', '同一份档案按角色呈现不同视图', '与具体事件绑定的紧急信息披露'],
    },
    riyaaz: {
      tagline: '印度斯坦古典声乐的练习室',
      kind: '音乐',
      credit: '为手机设计的 PWA 和安卓应用',
      summary:
        '拉格参考、坦普拉、风琴和塔布拉鼓，跟着同步歌词一起唱，录音，音准表和练习日志，支持英语和马拉地语。所有数据都留在设备上，离线也能用。',
      points: ['可以像应用一样安装', '通过 Capacitor 构建安卓版', '备份始终掌握在你手里'],
    },
    riddles: {
      tagline: '三个题包，三条命，一次机会。',
      kind: '游戏',
      credit: '独立完成，作为一份礼物',
      summary:
        '一个长出了真正后端的猜谜游戏：用自然语言处理匹配答案、Firebase 排行榜、AI 谜题生成器、实时管理后台，还有一个检查谜题是否已在网上出现过的爬虫。',
      points: ['GitHub 上 13 颗星', '理解答案的意思，而不是死板匹配字词', '进入前三名时发送邮件提醒'],
    },
    sunshine: {
      tagline: '指尖上的音乐',
      kind: '创意科技',
      credit: '在浏览器里用手演奏的乐器',
      summary:
        '你的摄像头变成了一件乐器。它实时识别手部关键点和捏合手势，把它们映射成和弦，所有声音都在浏览器中生成。',
      points: ['实时识别手部关键点', '捏合手势映射为和弦', '用 Web Audio 生成声音'],
    },
  },

  stack: {
    'YOLO11-seg design': 'YOLO11-seg 方案',
    'Vision-language design': '视觉语言方案',
    'ESP32 design': 'ESP32 方案',
    'Computer vision': '计算机视觉',
    'Hand tracking': '手部追踪',
  },

  archive: {
    Poof: { note: '24 小时后自动消失的群投票' },
    'Bhav Saathi': { note: '为 GAVS 黑客马拉松拍摄的概念短片，与 Tanaya Thorat 合作' },
    BioAI: { note: '基于 NCBI、UniProt 和 GWAS 数据的基因组智能平台' },
    Cognito: { note: '基于 Gemini Live API、以语音为主的心理健康陪伴应用' },
    Pixels: { note: '用 Next.js、GSAP 和 Lenis 制作的动态代理公司网站' },
    Brioso: { note: '以故事为线索的电影感咖啡馆网站' },
    'Mafia Moderator': { note: '替你主持一整局杀人游戏' },
    'Drowsiness Detection': { title: '疲劳检测', note: '用 MediaPipe 追踪眼睛，通过 Arduino 发出警报' },
    Marginalia: { note: '在你的锁屏上放一句由人写下的话' },
  },

  pins: {
    vit: { place: '比布韦瓦迪', note: '我在这里读计算机工程，2025 至 2029 年。' },
    mit: { place: '科特鲁德', note: "Patient-Tap 在这里获得 Incubex '26 亚军。" },
    its: { place: '松瓦尔佩特', note: '一家本地维修店，我为它做了网站和追踪系统。' },
  },

  hackathons: {
    incubex: {
      place: '亚军',
      host: '浦那 MIT 世界和平大学',
      note: '凭 Patient-Tap 获得第二名，队友有 Tanaya Thorat、Samruddhi Wankhede、Vedant Patil、Samarth Dhage 和 Vyanktesh Yeole。',
    },
    codeamble: {
      place: '季军',
      host: '全国性 24 小时黑客马拉松，纳威孟买卡尔加尔',
      note: '我的第一次线下黑客马拉松，也是第一次登上领奖台，作品是 Patient-Tap。与 Samarth Dhage、Tanaya Thorat 和 Vyanktesh Yeole 一起完成。',
    },
  },

  research: {
    fingervault: { title: '隐私优先的生物识别档案', where: '第 17 组，指导老师 Rahul Diwate 博士' },
    abyssguard: { title: '用侧扫声呐识别海洋垃圾', where: 'SIH 2026，问题编号 26057' },
    satquery: { title: '视觉语言遥感', where: 'SIH 2026，问题编号 26167' },
    immunis: { title: '对抗支付欺诈的对抗训练', where: '红方智能体对抗在线模型' },
  },

  states: {
    'Andaman and Nicobar Islands': '安达曼－尼科巴群岛',
    'Andhra Pradesh': '安得拉邦',
    'Arunachal Pradesh': '阿鲁纳恰尔邦',
    Assam: '阿萨姆邦',
    Bihar: '比哈尔邦',
    Chandigarh: '昌迪加尔',
    Chhattisgarh: '恰蒂斯加尔邦',
    'Dadra and Nagar Haveli': '达德拉－纳加尔哈维利',
    'Daman and Diu': '达曼－第乌',
    Delhi: '德里',
    Goa: '果阿邦',
    Gujarat: '古吉拉特邦',
    Haryana: '哈里亚纳邦',
    'Himachal Pradesh': '喜马偕尔邦',
    'Jammu and Kashmir': '查谟和克什米尔',
    Jharkhand: '贾坎德邦',
    Karnataka: '卡纳塔克邦',
    Kerala: '喀拉拉邦',
    Lakshadweep: '拉克沙群岛',
    'Madhya Pradesh': '中央邦',
    Maharashtra: '马哈拉施特拉邦',
    Manipur: '曼尼普尔邦',
    Meghalaya: '梅加拉亚邦',
    Mizoram: '米佐拉姆邦',
    Nagaland: '那加兰邦',
    Odisha: '奥里萨邦',
    Puducherry: '本地治里',
    Punjab: '旁遮普邦',
    Rajasthan: '拉贾斯坦邦',
    Sikkim: '锡金邦',
    'Tamil Nadu': '泰米尔纳德邦',
    Telangana: '特伦甘纳邦',
    Tripura: '特里普拉邦',
    'Uttar Pradesh': '北方邦',
    Uttarakhand: '北阿坎德邦',
    'West Bengal': '西孟加拉邦',
  },
}

export default zh
