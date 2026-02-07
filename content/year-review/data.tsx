
import React from 'react';
import { 
  Zap, Heart, CloudLightning, Activity, Flame, Users, Sparkles, Terminal, 
  ShieldCheck, RefreshCw, ArrowRight, Radio, Box, Target, Briefcase, User,
  Globe, Mic, Coffee
} from 'lucide-react';

export const PASSCODE = "4242";

// --- DATA CONSTANTS ---
export const OKR_DATA = [
  {
    id: "M01",
    title: "EFFICIENCY",
    subtitle: "工作质量与效率",
    objective: "提高日常工作的质量与效率（尤其是文字稿）",
    score: "A-",
    actions: [
      "和 Celia、曲老师多次对齐标准",
      "拆解耗时点（以津剑文字稿为例）",
      "维护「42章经内容记录 / 避雷清单」",
      "复盘不同版本文字稿",
      "想办法用 AI 做辅助"
    ],
    results: [
      { text: "东旭活动文字稿从 30-40h 降到约 10h，提速 3-5 倍", type: "positive", label: "SPEED_UP" },
      { text: "遇到表达绕的嘉宾，仍会比较花时间", type: "mixed", label: "COMPLEXITY" },
      { text: "时间充裕的时候，还是难免会扣细节", type: "negative", label: "PERFECTIONISM" }
    ]
  },
  {
    id: "M02",
    title: "PERSONAL_IP",
    subtitle: "个体价值感",
    objective: "从幕后走向更前台",
    score: "C",
    actions: [
      "经营小红书：复盘数据、调整简介、统一封面、尝试内容形态",
      "研究对标账号；与博主交流",
      "做个人播客 AnyBGM",
      "Vibe Coding 一些小产品，尝试 Build in Public"
    ],
    results: [
      { text: "小红书起号很快", type: "positive", label: "GROWTH" },
      { text: "做自己的事更主动、更细致、有热情", type: "positive", label: "PASSION" },
      { text: "发得太少、定位与可复制 pattern 不稳，后续经营不足", type: "negative", label: "CONSISTENCY" },
      { text: "容易在非关键细节上耗时，偶尔闭门造车", type: "mixed", label: "FOCUS" }
    ]
  },
  {
    id: "M03",
    title: "EDITORIAL",
    subtitle: "选题与提问",
    objective: "提升选题与提问能力",
    score: "D",
    actions: [
      "整理海外播客选题",
      "和曲老师 / Celia 交流",
      "尝试列选题"
    ],
    results: [
      { text: "后面没有认真在做这件事", type: "negative", label: "ABANDONED" }
    ]
  }
];

// UPDATED DIAGNOSTICS DATA
export const ISSUES_DATA = [
  {
    id: "loop_1",
    code: "ERR_DISSOCIATION",
    title: "解离",
    icon: <CloudLightning size={32} />,
    symptoms: [
      "潜意识里把“工作”和“自我”分得很开",
      "极少主动转发工作内容",
      "怀疑一切的意义，觉得都是虚无"
    ],
    cost: "自我设限，无法借用平台杠杆沉淀影响力；缺乏 Ownership，获得的正反馈极其有限。",
    direction: "将个人表达与工作绑定，打造个人品牌资产",
    action: "Personal Brand Binding"
  },
  {
    id: "loop_2",
    code: "ERR_CONFUSION",
    title: "迷茫",
    icon: <RefreshCw size={32} />,
    symptoms: [
      "对自己太宽容，太“尊重”当下感受",
      "兴趣点太散，频繁横跳",
      "缺乏一条贯穿始终的“主线”"
    ],
    cost: "精力分散，看似很忙实则瞎忙；难以形成长期的复利和积累。",
    direction: "建立年度主线项目，拒绝瞎忙",
    action: "Establish Main Thread"
  },
  {
    id: "loop_3",
    code: "ERR_LOW_VALUE",
    title: "价值感不足",
    icon: <Activity size={32} />,
    symptoms: [
      "长期处于“服务者心态” (帮别人表达)",
      "一旦熟练掌握某事，立刻丧失兴趣",
      "获取不到 for myself 的正反馈"
    ],
    cost: "高内耗，感到被消耗；更解离、更迷茫、更焦虑，甚至产生厌世情绪。",
    direction: "增加“为自己而做”的输出",
    action: "Output For Myself"
  }
];

export const ABSTRACT_DETAILS = [
  {
    id: 'abs_1',
    keyword: 'HIGH SPEED',
    cn: '高速',
    icon: <Zap size={24} />,
    content: [
      { title: "外部世界", text: "AI 的发展实在太快了。每天都有各种各样的新产品和新变化，一切都在疯狂加速。" },
      { title: "个人成长", text: "个人认为自己的成长还是比较快的。快到我现在看自己一个月前讲的东西，都觉得很 Naive…" }
    ]
  },
  {
    id: 'abs_2',
    keyword: 'PASSION',
    cn: '热爱',
    icon: <Heart size={24} />,
    content: [
      { title: "恒定的驱动力", text: "在高速变化的环境里，我很容易感到焦虑和被影响。但热爱其实是一个恒定的驱动力。" },
      { title: "尝试把热爱和工作结合起来", text: "以前我会觉得，喜欢的事情和要做的事情应该是剥离的，总担心热爱的事一旦变成工作，就会被“污染”。但现在觉得不应该这样。" },
      { title: "实例：Vibe Coding", text: "在 Vibe Coding 的过程中，我会很自然地进入心流，也会有不断 Connecting the dots 的爽感。" }
    ]
  },
  {
    id: 'abs_3',
    keyword: 'IMMATURE',
    cn: '不成熟',
    icon: <CloudLightning size={24} />,
    content: [
      { title: "定义", text: "一个成熟的人应该既知道自己要什么，也知道别人要什么。" },
      { title: "痛苦来源", text: "在工作中，我比较知道别人要什么。但在面对「自己想要什么”这件事时，我却经常处于迷茫状态。" }
    ]
  },
  {
    id: 'abs_4',
    keyword: 'REALITY',
    cn: '现充',
    icon: <Activity size={24} />,
    content: [
      { title: "定义", text: "从虚无缥缈的网络或精神世界，向物理世界、更具体的感官体验中迁移。" },
      { title: "重建生活的秩序感", text: "积极就医、补维生素 D、晒太阳、养猫、恢复健身…" }
    ]
  }
];

// --- STRATEGY DATA RESTRUCTURED ---

export const STRATEGY_CORE_PRINCIPLE = "核心原则：做非重复性、有挑战、能留下个人资产的事情";

// Updated Interface: Removed Frequency
export interface StrategyItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  theme: 'blue' | 'red' | 'orange' | 'green';
  positioning?: string; // Optional
  coreGoal: string;
  valueToCompany: string;
  valueToSelf: string;
  coreMetric?: string; // Optional
  risk: string;
  strategy: string;
}

export const STRATEGY_MODULES = {
  // COLUMN 1
  newsletter: {
    id: 'newsletter',
    title: 'Newsletter',
    subtitle: '信息资产',
    icon: <Terminal size={32} />,
    theme: 'blue',
    // Removed positioning as per request
    coreGoal: '稳定输出主阵地',
    valueToCompany: '强化内容品牌、Cover 优质信息',
    valueToSelf: '积累 Insights 和 Knowhow、更知道圈子里的人关心什么',
    coreMetric: '触达了多少优秀的人',
    risk: '拖更 / 中断',
    strategy: '建立更合理高效的工作/协作流程'
  } as StrategyItem,

  // COLUMN 2 (SPLIT)
  rednote: {
    id: 'rednote',
    title: '小红书',
    subtitle: '个人影响力',
    icon: <Radio size={32} />,
    theme: 'red',
    positioning: 'AI / 内容 / 工作方法账号',
    coreGoal: '快速获得正反馈',
    valueToCompany: '拓展曝光渠道、链接优质创业者',
    valueToSelf: '认识聊得来的人、给自己多一些曝光和收益',
    // Removed core metric
    risk: '流量波动',
    strategy: '做了再说'
  } as StrategyItem,

  events: {
    id: 'events',
    title: '线下活动',
    subtitle: '线下关系网络',
    icon: <Users size={32} />,
    theme: 'orange',
    positioning: '创业者 / 嘉宾连接平台',
    coreGoal: '建立真关系网络',
    valueToCompany: '链接优质创业者',
    valueToSelf: '认识聊得来的人、给自己多一些曝光和收益',
    // Removed core metric
    risk: '事务性消耗',
    strategy: '做了再说'
  } as StrategyItem,

  // COLUMN 3
  explore: {
    id: 'explore',
    title: '自由探索',
    subtitle: '长期可能性 (Side/R&D)',
    icon: <Sparkles size={32} />,
    theme: 'green',
    positioning: '保留自我探索与实验空间',
    coreGoal: '保持学习曲线',
    valueToCompany: '提供创新试验田',
    valueToSelf: '保持好奇与热情',
    coreMetric: '开心',
    risk: '分散主线',
    strategy: '资源分配'
  } as StrategyItem,
};

// Deprecated old strategy exports
export const STRATEGY_GROUPS = [];
export const STRATEGY_COLS = {};
export const STRATEGY_DETAILS = {};
