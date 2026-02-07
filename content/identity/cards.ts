
import { IdentityCard, RoleType } from '../../types';

export const cards: IdentityCard[] = [
  {
    type: RoleType.CREATOR,
    title: '42章经',
    subtitle: 'Content Creator',
    description: '深度商业内容的观察者与记录者。',
    color: 'bg-lavender-dark'
  },
  {
    type: RoleType.PRODUCER,
    title: 'Independent Producer',
    subtitle: 'Podcast Master',
    description: '合作头部主播与大厂，全流程音频制作。',
    color: 'bg-gray-800'
  },
  {
    type: RoleType.EXPLORER,
    title: 'Side Projects',
    subtitle: 'The Explorer',
    description: '永远在探索，永远在路上。爬向不同的可能性。',
    color: 'bg-cyber-green'
  }
];
