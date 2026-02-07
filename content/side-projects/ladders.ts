
import { SideProjectLadder } from '../../types';

export const ladders: SideProjectLadder[] = [
  {
    id: 'l1',
    name: 'RED NOTE', // Updated to English
    score: 6,
    ladderPosition: { left: 15, top: 40 },
    contentType: 'feed-scroll',
    icon: '🍠',
    link: 'https://www.xiaohongshu.com/user/profile/5de711d8000000000100bbc0',
    content: {
      description: '完全没想到一个不垂直的号能收获 4500 粉丝！',
      feedImages: [
        'https://i.postimg.cc/TPr3mWN0/截屏2026_02_07_12_55_02.png',
        'https://i.postimg.cc/Dzqwsbpg/截屏2026_02_07_12_54_53.png',
        'https://i.postimg.cc/wBhjJs4k/截屏2026_02_07_12_54_48.png',
        'https://i.postimg.cc/ZR4KLKXd/截屏2026_02_07_12_54_44.png'
      ]
    }
  },
  {
    id: 'l2',
    name: 'Indie Podcast',
    score: 4,
    ladderPosition: { left: 38, top: 55 },
    contentType: 'site-preview', // Changed to new type
    icon: '🎙️',
    link: 'https://www.xiaoyuzhoufm.com/podcast/690c70aae20e223cdc598584',
    content: {
      description: '从播客幕后到主播的一次随性而起的尝试。',
      url: 'https://anybgm-60nx2s25v-cherotichsxy-hubs-projects.vercel.app/',
      previewImage: 'https://i.postimg.cc/zffMX3x0/jie-ping2026-02-04-22-11-43.png'
    }
  },
  {
    id: 'l3',
    name: 'Vibe Coding',
    score: 7,
    ladderPosition: { left: 62, top: 35 },
    contentType: 'code-log',
    icon: '💻',
    content: {
      description: '在 AI 的帮助下，我居然也能用代码构建世界了！虽然还在入门阶段，但创造的快乐是真实的。',
      projects: [
        {
          id: '01',
          name: 'Personal Portfolio',
          status: 'LIVE',
          description: '就是你现在看到的这个网站！基于 React + Framer Motion 构建。零基础手搓代码，把想象力变成现实。'
        },
        {
          id: '02',
          name: 'MeowBTI',
          status: 'PROTOTYPE',
          description: '试图复刻小猫数字分身的小产品。通过给小猫测试 MeowBTI 记录性格，生成专属报告。Built in Google AI Studio.',
          image: 'https://i.postimg.cc/8krCzzYy/jie-ping2026-02-04-22-19-35.png'
        },
        {
          id: '03',
          name: 'Founder Analysis',
          status: 'PROMPT_ENG',
          description: '基于 42章经 识人逻辑沉淀的 Prompt 库。虽然产品化落地困难，但核心逻辑已跑通，这是一个为创始人做性格分析并提供 Feedback 的工具。'
        }
      ],
      links: [
        { title: '将自己的审美注入AI', url: 'http://xhslink.com/o/5uUpFrHzyII' },
        { title: '0基础也能做出美丽的定制化网站', url: 'http://xhslink.com/o/AcXbxz3MUdG' },
        { title: 'vibe coding了一个给猫咪测mbti的小产品', url: 'http://xhslink.com/o/5Vnbu8TzlAg' }
      ]
    }
  },
  {
    id: 'l4',
    name: 'Coffee Brewing',
    score: 7,
    ladderPosition: { left: 85, top: 50 },
    contentType: 'gallery-vertical',
    icon: '☕',
    content: {
      description: '练了一年，终于能拉出一个像样的拉花了… 这是我驯服咖啡机的旅程。',
      media: [
        { type: 'image', src: 'https://i.postimg.cc/CKpJB5MM/IMG-9940.jpg', caption: '就这样龟速进步' },
        { type: 'image', src: 'https://i.postimg.cc/TPj0rxhF/b302258456340fd0fe01f918d39c04_livephoto.avif', caption: '一年前' },
        { type: 'image', src: 'https://i.postimg.cc/rpGjSTzP/5610f82bd5e62df617e459444f2101_livephoto.avif', caption: '一年后' },
      ]
    }
  }
];
