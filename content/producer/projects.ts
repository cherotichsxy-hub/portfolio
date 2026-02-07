
import { ProducerItem } from '../../types';
import { DEFAULT_COVER } from '../constants';

export const projects: ProducerItem[] = [
  {
    id: 'p1',
    title: '无限派对',
    client: '日谈公园',
    isFeatured: false,
    roles: ['制片', '宣传', '立项', '策划', '运营'],
    description: '首档播客选拔综艺节目',
    image: 'url(https://i.postimg.cc/DzXp3QnH/IMG_5074.jpg)',
    dataHighlights: '荣获 2022 年小宇宙年度创新实践奖。',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/6336b5659186d4e4c46a07f4'
  },
  {
    id: 'p2',
    title: '她的房间',
    client: '优酷人文',
    isFeatured: true, // FEATURED
    roles: ['剪辑', '后期', '文案', '策划', '运营'],
    description: '张越老师主持、我从 0 到 1 制作的女性谈话节目，每期邀请女性表达者与经历者，共读生命体验，理解群体困境。嘉宾包括咏梅、尹丽川、阿美、周轶君等。',
    image: 'url(https://i.postimg.cc/wMHGVt8p/头像_pic.png)',
    dataHighlights: '上线 5 期订阅量破 50000；连续出现在平台首页/榜单；单集最高播放 18w。',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/66e52e3b3a5ff0a0ca66e3d1'
  },
  {
    id: 'p3',
    title: '维她命',
    client: '日谈公园',
    isFeatured: false,
    roles: ['剪辑', '后期', '文案', '立项', '策划', '运营'],
    description: '一档女性生活方式节目。我参与节目的前期规划，并全流程制作 2023 年 7 月到 2024 年 4 月的 11 期节目。',
    image: 'url(https://i.postimg.cc/4NWS6NWQ/维她命logo.jpg)',
    dataHighlights: '平均播放量 5w+，平均互动量 300+；期期进入小宇宙最热榜前 10。',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast-topic/65d9b02e0bef6c207445261c'
  },
  {
    id: 'p4',
    title: '42章经',
    client: '42章经',
    isFeatured: true, // FEATURED
    roles: ['剪辑', '后期', '文字稿', '文案'],
    description: '深度创投内容',
    image: `url(${DEFAULT_COVER})`,
    dataHighlights: 'AI 播客 Top1；获得 2025 小宇宙年度趋势内容',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/648b0b641c48983391a63f98'
  },
  {
    id: 'p5',
    title: '单集策划',
    client: '日谈公园',
    isFeatured: false,
    roles: ['策划'],
    description: '针对特定选题进行的深度策划与嘉宾挖掘，包括瓦依那、Nova Heart、大山、丁薇、郭采洁等单集。',
    image: 'url(https://i.postimg.cc/vTQ0npfB/ab67656300005f1f28909d419b8735b75ae28832.jpg)',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/5e280faa418a84a0461f9ad8'
  },
  {
    id: 'p6',
    title: '单集制作',
    client: '温柔一刀',
    isFeatured: false,
    roles: ['制作', '文案', '策划'],
    description: '「温柔一刀」是一档聚焦于消费品牌、商业趋势、职业发展以及多元人生等领域的对谈播客。我策划、制作了 3 期，如：Vol.91 广告VS内容，我和江南春辩论了2个小时。',
    image: 'url(https://i.postimg.cc/kgkwsVK8/a_HR0c_HM6Ly9pb_WFn_ZS54e_Xpj_ZG4ubm_V0L0Zta_TQ2Vks5Vjg2VU0ye_HNo_T1JKWDhub_E5GQ24uan_Bn.jpg)',
    listenLink: 'https://www.xiaoyuzhoufm.com/episode/665ef02a63c334a2fb4d913f'
  },
  {
    id: 'p8',
    title: '大夫，您看看我没事吧',
    client: '日谈公园',
    isFeatured: false,
    roles: ['制作', '立项', '策划'],
    description: '由日谈公园和日知录共同出品的硬核医学科普付费节目',
    image: 'url(https://i.postimg.cc/ZKH1wL5L/专辑封面.png)',
    dataHighlights: '深度参与选题策划，找到专业知识与大众兴趣平衡点；对节目销售情况负责。',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/65051fb15c88d2412603f642'
  },
  {
    id: 'p9',
    title: '第一人称复数',
    client: '优酷人文',
    isFeatured: false,
    roles: ['文案', '后期'],
    description: '《第一人称复数》音频版，每期节目以周轶君为话题发起人，邀请不同领域的嘉宾进行对谈。',
    image: 'url(https://i.postimg.cc/Px17YW7P/IMG_9766.jpg)',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/6773692815a5fd520ee99834'
  },
  {
    id: 'p10',
    title: '鹅厂wo谈会',
    client: '腾讯雇主品牌',
    isFeatured: true, // FEATURED
    roles: ['策划', '后期', '文案'],
    description: '腾讯招聘出品、我独立承接全流程制作的职场播客。',
    image: 'url(https://image.xyzcdn.net/FqNI_rO1mdS1WfAzC1QLqRrjjTjF.jpg)',
    dataHighlights: '上线 6 期订阅量 1.2w，并多次登小宇宙锋芒榜及新星榜。',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/68930e9232f99d376893d00c'
  },
  {
    id: 'p11',
    title: '以鹅传鹅',
    client: '腾讯',
    isFeatured: false,
    roles: ['策划', '后期', '文案'],
    description: '腾讯出品的企业播客，以轻松有趣的方式传递企业价值观。',
    image: 'url(https://i.postimg.cc/t4M47x84/Fnt-Pyq-FSx0lz-CWTOTRa-YP5wc8qdm.jpg)',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/67594c5c6734a5ad7a9169a4'
  },
  {
    id: 'p12',
    title: '三五环',
    client: '刘飞',
    isFeatured: false,
    roles: ['剪辑', '后期', '文案'],
    description: '刘飞的个人播客。',
    image: 'url(https://image.xyzcdn.net/FuNJZCKSazUqutO8XGXVKWPPh7K4.png)',
    listenLink: 'https://www.xiaoyuzhoufm.com/podcast/5e280fab418a84a0461faa3c'
  }
];
