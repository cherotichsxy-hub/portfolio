
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, FileText, Headphones, FolderOpen, Disc, Hash, Calendar, BarChart3, User, Lock, Unlock, KeyRound, Link as LinkIcon, ExternalLink, Music2, MonitorPlay, Zap, Coffee, Terminal, Image as ImageIcon, Crown, Radio, Sparkles, Tv, ArrowUpRight } from 'lucide-react';
import { CreatorItem } from '../types';
import { CREATOR_ITEMS } from '../data';

// --- RICH MEMOS DATA ---
const MEMOJI_DATA = {
  // 1. Top Level: Responsibility
  responsibility: {
    title: 'Bigger Responsibility',
    text: "今年开始独立负责播客与文字稿的工作，减轻了 Celia 的一部分负担。",
    icon: <Crown size={24} className="text-purple-600" />,
    stats: [
      { label: 'Podcast Lead', prev: 90, curr: 100 },
      { label: 'Editorial Lead', prev: 80, curr: 100 },
    ]
  },
  // 2. Top Level: Efficiency
  efficiency: {
    title: 'Efficiency Breakthrough',
    text: "在保证质量的前提下，日常工作显著提效。尤其是文字稿，提效约 2-3 倍。",
    stat: "300%",
    statLabel: "EFFICIENCY",
    icon: <Zap size={24} className="text-yellow-500" />
  },
  // 3. Parent: Exploration
  exploration: {
    title: "Have more time to explore",
    items: [
      {
        id: 'ex1',
        title: 'Channel Expansion',
        text: "把我们的播客分发到了 Spotify 和 B 站上。",
        type: 'links',
        spotifyLink: "https://open.spotify.com/show/2sUidNJ5DsgqzpIaBq5d42",
        bilibiliLink: "https://space.bilibili.com/3546921618639513?spm_id_from=333.337.0.0",
        icon: <MonitorPlay size={20} className="text-blue-500" />
      },
      {
        id: 'ex2',
        title: 'Input & Output',
        text: "25 年过半，follow 了一段时间海外头部播客，给 newsletter 加了一把小小的油。",
        type: 'text',
        icon: <Radio size={20} className="text-orange-500" />
      },
      {
        id: 'ex3',
        title: 'Vibe Coding',
        text: "自学 vibe coding，把识人方式沉淀出了一套好用的 prompt（产品化缓慢推进中...）",
        type: 'text',
        icon: <Terminal size={20} className="text-green-500" />
      }
    ]
  },
  // Integrated Meme
  memeImage: "https://i.postimg.cc/sxJJDvZ5/dcdf5a7cf1471553bf07757c90dbde09.jpg",
  
  // Takeaways
  takeaways: [
    {
      category: "日常工作中积累的 knowhow",
      links: [
        { title: "做内容的一些经验｜陈皮@42章经", url: "https://my.feishu.cn/docx/RRubdLLPioWBoFxZR18cjOovn9e" },
        { title: "42章经内容记录", url: "https://my.feishu.cn/sheets/LQpnswBJlhQA1jt7TBDcYSyMnch" }
      ]
    },
    {
      category: "小红书研究笔记",
      links: [
        { title: "张咋啦的小红书是怎么做起来的？", url: "https://my.feishu.cn/wiki/WJ3VwcYSBiEczako7R9cELSRnWg?from=from_copylink" },
        { title: "三种类型的小红书博主", url: "https://my.feishu.cn/wiki/T4uQwHJHXiSipCkgjCrcFGfvnYf?from=from_copylink" },
        { title: "内部小红书分享 by Ziwei", url: "https://my.feishu.cn/wiki/XjltwE2rAiWLDXkGF78cXHFpnvh?from=from_copylink" },
        { title: "小红书&抖音博主个人分享", url: "https://my.feishu.cn/docx/Bsf5d0aYcoe4WuxeyXFcxEb1nUd?from=from_copylink" }
      ]
    },
    {
        category: "内容产出梳理",
        links: [
            { title: "播客｜听感问题", url: "https://my.feishu.cn/docx/RKvkdAfzKorVRzxeDeLc710rnDe?from=from_copylink" }
        ]
    },
    {
        category: "Vibe Coding & 平台研究",
        links: [
            { title: "Vibe Coding 学习笔记", url: "https://my.feishu.cn/wiki/SkAZwhGMYiAHhskiD0vcwtrWnIc?from=from_copylink" },
            { title: "海外播客平台推荐位&算法规则", url: "https://my.feishu.cn/docx/GM8Edx0UjorUefxDxkqcB98LnTf?from=from_copylink" },
            { title: "B 站官方 0 帧起手指南", url: "https://my.feishu.cn/wiki/GGAlwV8Pai4SJlkS2bvcoc9vn6b?from=from_copylink" }
        ]
    },
    {
        category: "思维模型",
        links: [
            { title: "Case interview 笔记", url: "https://my.feishu.cn/wiki/NWExwg76ri2rmikT7Ryce34vnqb?from=from_copylink" }
        ]
    },
    {
        category: "零散 takeaways 大乱炖",
        links: [
            { title: "零散 takeaways 大乱炖", url: "https://my.feishu.cn/wiki/BnKCwxVUyiskGFkcmY2cF4arnrh?from=from_copylink" }
        ]
    }
  ]
};

// --- SCRATCH CARD COMPONENT ---
interface ScratchRevealProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
  coverColor?: string;
  coverText?: string;
}

const ScratchReveal: React.FC<ScratchRevealProps> = ({ 
  children, 
  className = "", 
  coverColor = "#e2e8f0", 
  coverText = "CONFIDENTIAL // SCRATCH TO REVEAL" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with cover color/pattern
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise/pattern
    for(let i=0; i<500; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    // Add "Confidential" text pattern
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.font = "bold 10px monospace";
    ctx.rotate(-Math.PI / 12);
    for(let i=-50; i<canvas.width + 50; i+=100) {
        for(let j=-50; j<canvas.height + 50; j+=40) {
            ctx.fillText("HIDDEN_LAYER", i, j);
        }
    }
    // Reset transform for central text
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Central Big Text
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const words = coverText.split('//');
    words.forEach((word, index) => {
        ctx.fillText(word.trim(), canvas.width / 2, canvas.height / 2 + (index * 20) - 10);
    });

  }, [coverColor, coverText]);

  const handleStart = () => setIsScratching(true);
  const handleEnd = () => setIsScratching(false);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = (e as React.MouseEvent).clientX - rect.left;
        y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false);
    ctx.fill();
    
    // Optional: Check if enough is cleared to auto-hide canvas (simple approx)
    // setIsRevealed(true); 
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* The Content */}
      <div className="w-full h-full relative z-0">
        {children}
      </div>
      
      {/* The Scratch Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onMouseMove={handleMove}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
        className={`absolute inset-0 z-10 touch-none transition-opacity duration-500 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isScratching ? 'cursor-grabbing' : 'cursor-grab'}`}
      />
    </div>
  );
};


const Creator: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<CreatorItem | null>(null);
  
  // --- PASSWORD & MEMOS STATE ---
  const [selectedYear, setSelectedYear] = useState<number | 'all' | 'memos'>('all'); 
  const [isMemosUnlocked, setIsMemosUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // --- AUDIO PLAYER STATE ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<{
    isPlaying: boolean;
    loading: boolean;
    currentTrack: string | null; 
    previewUrl: string | null;
    appleMusicUrl: string | null;
    error: boolean;
  }>({
    isPlaying: false,
    loading: false,
    currentTrack: null,
    previewUrl: null,
    appleMusicUrl: null,
    error: false,
  });

  const safePlay = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name === 'AbortError') return;
          console.error("Playback failed:", error);
        });
      }
    }
  };

  const handlePlayMusic = async (query: string) => {
    if (audioState.currentTrack === query && audioState.previewUrl) {
      if (audioState.isPlaying) {
        audioRef.current?.pause();
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      } else {
        safePlay();
        setAudioState(prev => ({ ...prev, isPlaying: true }));
      }
      return;
    }

    setAudioState(prev => ({ 
      ...prev, 
      loading: true, 
      currentTrack: query, 
      error: false, 
      isPlaying: false 
    }));

    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=1`);
      const data = await response.json();

      if (data.resultCount > 0) {
        const track = data.results[0];
        setAudioState({
          isPlaying: true,
          loading: false,
          currentTrack: query,
          previewUrl: track.previewUrl,
          appleMusicUrl: track.trackViewUrl,
          error: false,
        });
        
        if (audioRef.current) {
          audioRef.current.src = track.previewUrl;
          safePlay();
        }
      } else {
        setAudioState(prev => ({ ...prev, loading: false, error: true }));
      }
    } catch (err) {
      console.error(err);
      setAudioState(prev => ({ ...prev, loading: false, error: true }));
    }
  };

  const handleStopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioState({
      isPlaying: false,
      loading: false,
      currentTrack: null,
      previewUrl: null,
      appleMusicUrl: null,
      error: false,
    });
  };

  const handleTogglePlay = () => {
    if (audioState.isPlaying) {
      audioRef.current?.pause();
      setAudioState(s => ({...s, isPlaying: false}));
    } else {
      safePlay();
      setAudioState(s => ({...s, isPlaying: true}));
    }
  };

  // --- FILTER LOGIC ---
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(CREATOR_ITEMS.map(i => i.year))).sort((a, b) => (b || 0) - (a || 0));
    return uniqueYears;
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedYear === 'memos') return [];
    
    let items = [...CREATOR_ITEMS];
    if (selectedYear === 'all') {
      return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return items
        .filter(item => item.year === selectedYear)
        .sort((a, b) => (a.shareRank || 99) - (b.shareRank || 99));
    }
  }, [selectedYear]);

  const isAllYears = selectedYear === 'all';
  const isMemos = selectedYear === 'memos';

  const handleTabClick = (tab: number | 'all' | 'memos') => {
    if (tab === 'memos' && !isMemosUnlocked) {
        setShowPasswordModal(true);
        setPasswordInput('');
        setPasswordError(false);
    } else {
        setSelectedYear(tab);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '4242') {
        setIsMemosUnlocked(true);
        setShowPasswordModal(false);
        setSelectedYear('memos');
    } else {
        setPasswordError(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen pb-20 relative px-2 md:px-0">
      <audio 
        ref={audioRef} 
        onEnded={() => setAudioState(prev => ({ ...prev, isPlaying: false }))}
        onError={() => setAudioState(prev => ({ ...prev, isPlaying: false, error: true }))}
        playsInline
      />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-8 border-b-4 border-black pb-4 gap-4 relative">
        <div className="flex items-center gap-4 z-10">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_#ccff00]">
             42
          </div>
          <div>
            <h1 className="text-4xl font-black font-sans uppercase tracking-tighter leading-none">
              Content<span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-dark to-purple-600">.Archive</span>
            </h1>
          </div>
        </div>
        
        {/* RIGHT SIDE INTRO */}
        <div className="text-right hidden md:flex flex-col items-end justify-end z-20 mb-2">
           <h3 className="text-xs md:text-sm font-bold font-mono text-slate-600 uppercase tracking-tight">
              播客制作人｜文字稿女工｜Newsletter 预备役｜乱七八糟探索者
           </h3>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="relative z-10 pl-2">
        <div className="flex items-end gap-1 overflow-x-auto no-scrollbar">
           <button
             onClick={() => handleTabClick('all')}
             className={`px-6 py-2 rounded-t-lg font-mono text-sm font-bold border-t-2 border-x-2 transition-all relative top-[2px] ${
                selectedYear === 'all' 
                ? 'bg-white border-black text-black h-12 z-20 pb-4' 
                : 'bg-slate-200 border-slate-300 text-slate-500 h-10 hover:bg-slate-300 z-10'
             }`}
           >
              VIEW_ALL
           </button>

           {years.map(year => (
              <button
                key={year}
                onClick={() => handleTabClick(year as number)}
                className={`px-5 py-2 rounded-t-lg font-mono text-sm font-bold border-t-2 border-x-2 transition-all relative top-[2px] ${
                  selectedYear === year 
                  ? 'bg-white border-black text-black h-12 z-20 pb-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]' 
                  : 'bg-slate-200 border-slate-300 text-slate-500 h-10 hover:bg-slate-300 z-10'
                }`}
              >
                 {year}
              </button>
           ))}
           
           <button
             onClick={() => handleTabClick('memos')}
             className={`px-5 py-2 rounded-t-lg font-mono text-sm font-bold border-t-2 border-x-2 transition-all relative top-[2px] flex items-center gap-2 ${
                selectedYear === 'memos' 
                ? 'bg-white border-black text-black h-12 z-20 pb-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]' 
                : 'bg-slate-200 border-slate-300 text-slate-500 h-10 hover:bg-slate-300 z-10'
             }`}
           >
              {isMemosUnlocked ? <Unlock size={12} className="text-cyber-green fill-cyber-green" /> : <Lock size={12} />}
              Memos
           </button>

           <div className="flex-grow border-b-2 border-black h-10"></div>
        </div>
      </div>

      {/* --- BODY --- */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-20 min-h-[500px] rounded-b-lg rounded-tr-lg p-0 md:p-1 overflow-hidden">
         <div className="h-8 bg-slate-100 border-b-2 border-black flex items-center justify-between px-4 font-mono text-[10px] uppercase text-slate-500 select-none">
            <span className="font-bold">
               {isMemos 
                 ? '/root/archive/memos/confidential_mode'
                 : isAllYears 
                    ? '/root/archive/sorted_by_date' 
                    : `/root/archive/${selectedYear}/sorted_by_share_count`
               }
            </span>
            <div className="flex gap-2">
               <div className={`w-3 h-3 rounded-full border border-black ${isMemos ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`}></div>
               <div className="w-3 h-3 rounded-full bg-slate-300 border border-black"></div>
            </div>
         </div>

         {/* --- CONTENT SWITCH: LIST vs MEMOS --- */}
         {isMemos ? (
            <div className="p-4 md:p-12 animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="border-b-2 border-dashed border-slate-300 pb-6 mb-12 flex items-start justify-between">
                        <div>
                            <h2 className="text-4xl font-black font-sans uppercase mb-2">Key Milestones</h2>
                            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                                <span className="bg-black text-white px-2 py-0.5 font-bold">2025 REVIEW</span>
                                <span>// CONFIDENTIAL_FILE_ACCESS</span>
                            </div>
                        </div>
                        {/* Changed "Top Secret" to "Internal Share" */}
                        <div className="hidden md:block opacity-100 rotate-12 border-4 border-black p-2 bg-yellow-100 shadow-md">
                            <span className="text-sm font-black uppercase text-black font-mono">INTERNAL SHARE</span>
                        </div>
                    </div>

                    {/* --- LEVEL 1: RESPONSIBILITY & EFFICIENCY --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                       {/* Responsibility Card with Graphic */}
                       <div className="border-2 border-black p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] bg-lavender/30 flex flex-col">
                          <div className="absolute -top-3 -left-3 bg-white border border-black p-1.5 shadow-sm">
                              {MEMOJI_DATA.responsibility.icon}
                          </div>
                          <h3 className="font-bold font-mono text-lg mb-2 mt-2 uppercase tracking-wide">
                              {MEMOJI_DATA.responsibility.title}
                          </h3>
                          <p className="text-slate-900 text-sm leading-relaxed font-mono font-medium mb-6">
                              {MEMOJI_DATA.responsibility.text}
                          </p>

                          {/* Interactive Scratch Area for Chart */}
                          <ScratchReveal className="mt-auto rounded-sm border border-black/10 overflow-hidden" coverText="SECURED DATA // SCRATCH">
                             <div className="space-y-4 p-4 bg-white/50">
                                {MEMOJI_DATA.responsibility.stats.map((stat, i) => (
                                    <div key={i}>
                                    <div className="flex justify-between text-[10px] font-mono font-bold uppercase mb-1">
                                        <span>{stat.label}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-slate-400 line-through">{stat.prev}%</span>
                                            <span className="text-purple-700">➜ {stat.curr}%</span>
                                        </div>
                                    </div>
                                    <div className="h-3 w-full bg-white border border-black rounded-sm relative overflow-hidden">
                                        {/* Striped Background */}
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.1)_25%,rgba(0,0,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.1)_75%,rgba(0,0,0,0.1)_100%)] bg-[size:10px_10px] opacity-20"></div>
                                        {/* Previous Level Indicator (Ghost) */}
                                        <div style={{ width: `${stat.prev}%` }} className="absolute top-0 bottom-0 left-0 bg-slate-300 border-r border-black/20"></div>
                                        {/* Current Level Indicator (The Delta) */}
                                        <div style={{ width: `${stat.curr}%` }} className="absolute top-0 bottom-0 left-0 bg-purple-500 mix-blend-multiply opacity-60 transition-all duration-1000"></div>
                                        {/* Arrow Marker for Previous */}
                                        <div style={{ left: `${stat.prev}%` }} className="absolute top-0 bottom-0 w-0.5 bg-black z-10"></div>
                                    </div>
                                    </div>
                                ))}
                             </div>
                          </ScratchReveal>
                       </div>

                       {/* Efficiency Card */}
                       <div className="border-2 border-black p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] bg-gradient-to-br from-white to-slate-100 flex flex-col justify-between">
                          <div className="absolute -top-3 -left-3 bg-white border border-black p-1.5 shadow-sm">
                              {MEMOJI_DATA.efficiency.icon}
                          </div>
                          <div>
                            <h3 className="font-bold font-mono text-lg mb-2 mt-2 uppercase tracking-wide">
                                {MEMOJI_DATA.efficiency.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-mono">
                                {MEMOJI_DATA.efficiency.text}
                            </p>
                          </div>
                          
                          {/* Interactive Scratch Area for Stats */}
                          <ScratchReveal className="mt-6 rounded-sm border border-black/10" coverText="METRICS HIDDEN // SCRATCH">
                             <div className="text-right p-4 bg-white/50">
                                <span className="block text-6xl md:text-7xl font-black text-cyber-green text-stroke-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    {MEMOJI_DATA.efficiency.stat}
                                </span>
                                <div className="inline-block border border-black bg-black text-white px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest mt-2">
                                {MEMOJI_DATA.efficiency.statLabel}
                                </div>
                             </div>
                          </ScratchReveal>
                       </div>
                    </div>

                    {/* --- LEVEL 2: EXPLORATION (Split Layout 70/30) --- */}
                    <div className="flex flex-col md:flex-row items-stretch gap-6 mb-16 relative">
                        {/* LEFT COLUMN: 70% Width - The Content Box */}
                        <div className="w-full md:w-[70%] border-2 border-black p-6 md:p-8 bg-slate-50 relative">
                            {/* Title Badge */}
                            <div className="absolute -top-4 left-6 bg-black text-white px-4 py-1 font-mono font-bold text-sm uppercase shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]">
                               {MEMOJI_DATA.exploration.title}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 md:mt-2 relative z-10">
                               {/* 1. Channel Expansion (Compact Buttons) */}
                               <div className="md:col-span-1 bg-white border border-slate-200 p-4 flex flex-col hover:border-black transition-colors shadow-sm">
                                  <div className="flex items-center gap-2 font-bold font-mono text-sm text-slate-800 mb-2">
                                     {MEMOJI_DATA.exploration.items[0].icon}
                                     {MEMOJI_DATA.exploration.items[0].title}
                                  </div>
                                  <p className="text-xs text-slate-500 font-mono leading-relaxed mb-4">
                                     {MEMOJI_DATA.exploration.items[0].text}
                                  </p>
                                  
                                  <div className="mt-auto flex gap-2">
                                      <a 
                                        href={MEMOJI_DATA.exploration.items[0].spotifyLink}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1 bg-[#1DB954] text-white py-1.5 text-[10px] font-bold font-mono border border-transparent hover:border-black hover:shadow-sm rounded-sm transition-all"
                                      >
                                        <Music2 size={12} /> Spotify
                                      </a>
                                      <a 
                                        href={MEMOJI_DATA.exploration.items[0].bilibiliLink}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1 bg-[#23ADE5] text-white py-1.5 text-[10px] font-bold font-mono border border-transparent hover:border-black hover:shadow-sm rounded-sm transition-all"
                                      >
                                        <Tv size={12} /> Bilibili
                                      </a>
                                  </div>
                               </div>

                               {/* 2. Input & Output */}
                               <div className="md:col-span-1 bg-white border border-slate-200 p-4 flex flex-col hover:border-black transition-colors shadow-sm">
                                  <div className="flex items-center gap-2 font-bold font-mono text-sm text-slate-800 mb-2">
                                     {MEMOJI_DATA.exploration.items[1].icon}
                                     {MEMOJI_DATA.exploration.items[1].title}
                                  </div>
                                  <p className="text-xs text-slate-500 font-mono leading-relaxed">
                                     {MEMOJI_DATA.exploration.items[1].text}
                                  </p>
                               </div>

                               {/* 3. Vibe Coding */}
                               <div className="md:col-span-1 bg-white border border-slate-200 p-4 flex flex-col hover:border-black transition-colors shadow-sm">
                                  <div className="flex items-center gap-2 font-bold font-mono text-sm text-slate-800 mb-2">
                                     {MEMOJI_DATA.exploration.items[2].icon}
                                     {MEMOJI_DATA.exploration.items[2].title}
                                  </div>
                                  <p className="text-xs text-slate-500 font-mono leading-relaxed">
                                     {MEMOJI_DATA.exploration.items[2].text}
                                  </p>
                               </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: 30% Width - The Meme Holder */}
                        <div className="w-full md:w-[30%] flex items-center justify-center relative min-h-[150px]">
                            {/* Integrated Meme "Sticker" (Restored Grayscale filter) */}
                            <div className="relative bg-white p-2 pb-6 shadow-xl rotate-6 border border-slate-300 hover:rotate-0 hover:scale-105 transition-all duration-300 max-w-[200px]">
                               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200/80 opacity-80 rotate-[-2deg] shadow-sm"></div>
                               <img src={MEMOJI_DATA.memeImage} alt="Mood" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300" />
                               <div className="text-center font-mono font-bold text-[10px] text-slate-500 mt-2 tracking-widest uppercase">
                                  精神状况 BE LIKE
                               </div>
                            </div>
                        </div>
                    </div>

                    {/* Takeaways Section */}
                    <div className="bg-slate-900 text-white p-8 rounded-xl shadow-[8px_8px_0px_0px_#ccff00]">
                        <h3 className="font-mono text-xl font-bold mb-8 uppercase tracking-widest text-cyber-green flex items-center gap-3">
                           <FolderOpen size={24} />
                           Takeaways_Database
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {MEMOJI_DATA.takeaways.map((section, idx) => (
                                <div key={idx} className="border-l-2 border-slate-700 pl-4 hover:border-cyber-green transition-colors">
                                    <h4 className="font-bold text-sm mb-3 text-slate-300">
                                        {section.category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {section.links.map((link, lIdx) => (
                                            <li key={lIdx}>
                                                <a 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="flex items-start gap-2 text-xs text-slate-400 hover:text-white transition-colors font-mono leading-tight group"
                                                >
                                                    <LinkIcon size={10} className="mt-0.5 shrink-0 group-hover:text-cyber-green"/>
                                                    <span className="decoration-slate-700 underline underline-offset-4 group-hover:decoration-cyber-green">{link.title}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-[10px] font-mono text-slate-500 text-center border-t border-slate-800 pt-4">
                            END OF FILE // GENERATED BY SYSTEM
                        </div>
                    </div>
                </div>
            </div>
         ) : (
            <>
                {/* Standard List Table Header */}
                <div className="grid grid-cols-12 gap-2 p-3 border-b border-black/10 text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono hidden md:grid">
                    <div className="col-span-1 text-center">ID</div>
                    <div className={isAllYears ? "col-span-7" : "col-span-6"}>Subject / Title</div>
                    <div className="col-span-2">Guest</div>
                    <div className="col-span-2 text-center">Date</div>
                    {!isAllYears && <div className="col-span-1 text-center">Rank</div>}
                </div>

                {/* Items */}
                <div className="divide-y divide-dashed divide-slate-300">
                    {filteredItems.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => setSelectedItem(item)}
                        className="group grid grid-cols-1 md:grid-cols-12 gap-2 p-4 md:p-3 items-center cursor-pointer hover:bg-cyber-green transition-colors relative overflow-hidden"
                    >
                        {/* Decorative Hover Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="col-span-12 md:col-span-1 font-mono text-xs font-bold text-slate-400 group-hover:text-black flex items-center gap-2 md:justify-center">
                            <span className="md:hidden">ID:</span>
                            {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div className={`col-span-12 ${isAllYears ? 'md:col-span-7' : 'md:col-span-6'}`}>
                            <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-black line-clamp-1 leading-tight">
                                {item.title}
                            </h3>
                            <div className="md:hidden text-xs text-slate-600 font-mono mt-1 group-hover:text-black">
                                w/ {item.guest}
                            </div>
                        </div>

                        <div className="col-span-2 hidden md:flex items-center gap-2 text-xs font-bold text-slate-600 group-hover:text-black">
                            <User size={12} />
                            <span className="truncate">{item.guest}</span>
                        </div>

                        <div className="col-span-6 md:col-span-2 font-mono text-xs text-slate-500 group-hover:text-black flex items-center md:justify-center gap-2">
                            <Calendar size={10} className="md:hidden"/>
                            {item.date}
                        </div>

                        {!isAllYears && (
                            <div className="col-span-6 md:col-span-1 flex justify-end md:justify-center">
                                <div className="flex items-center gap-1 font-mono text-xs font-bold bg-slate-100 group-hover:bg-black group-hover:text-cyber-green px-2 py-1 border border-slate-300 group-hover:border-black rounded-sm transition-colors">
                                    <BarChart3 size={10} />
                                    <span>{item.shareRank ? `#${item.shareRank}` : 'N/A'}</span>
                                </div>
                            </div>
                        )}
                        
                        <div className="md:hidden absolute bottom-0 left-4 right-4 border-b border-dashed border-slate-300"></div>
                    </motion.div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="p-20 text-center font-mono text-slate-400 flex flex-col items-center gap-4">
                            <FolderOpen size={48} strokeWidth={1} />
                            <div>FOLDER_EMPTY // NO RECORDS FOUND</div>
                        </div>
                    )}
                </div>
            </>
         )}
      </div>

      {/* --- PASSWORD MODAL --- */}
      <AnimatePresence>
        {showPasswordModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white border-2 border-black p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black uppercase flex items-center gap-2">
                            <Lock size={20} /> Security Check
                        </h2>
                        <button onClick={() => setShowPasswordModal(false)} className="hover:text-red-500">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleUnlock}>
                        <div className="mb-6">
                            <label className="block text-xs font-mono font-bold mb-2 uppercase text-slate-500">Enter Access Code</label>
                            <input 
                                type="password" 
                                autoFocus
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    if(passwordError) setPasswordError(false);
                                }}
                                className={`w-full bg-slate-100 border-2 ${passwordError ? 'border-red-500 text-red-500' : 'border-black'} p-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-black/20`}
                                placeholder="****"
                            />
                            {passwordError && (
                                <p className="text-red-500 text-xs font-mono mt-2 font-bold animate-pulse">
                                    ACCESS_DENIED // INCORRECT_CODE
                                </p>
                            )}
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-black text-white font-mono font-bold py-3 hover:bg-cyber-green hover:text-black transition-colors border-2 border-black flex items-center justify-center gap-2"
                        >
                            <KeyRound size={16} />
                            UNLOCK_ARCHIVE
                        </button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- ARCHIVE FILE MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
              className="w-full max-w-5xl h-[85vh] bg-[#f0f0f0] border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] relative flex flex-col md:flex-row overflow-hidden"
            >
               <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-0 right-0 p-3 bg-black text-white hover:bg-red-600 transition-colors z-50"
               >
                  <X size={24} />
               </button>

               <div className="w-full md:w-[300px] bg-slate-200 border-b-4 md:border-b-0 md:border-r-4 border-black p-4 flex flex-col relative shrink-0">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                  
                  <div className="bg-white p-2 pb-6 shadow-md border border-slate-300 rotate-1 mb-6 relative mx-auto w-full max-w-[240px] md:max-w-full">
                     <div className="aspect-square bg-slate-100 border border-slate-200 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                        <img 
                           src={selectedItem.coverImage} 
                           alt="Cover" 
                           className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                     </div>
                  </div>

                  <div className="mt-auto space-y-3">
                     <a 
                        href={selectedItem.audioUrl}
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full bg-black text-white py-4 font-mono font-bold flex items-center justify-center gap-3 hover:bg-cyber-green hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_#888] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                     >
                        <Headphones size={20} />
                        LISTEN
                     </a>
                     
                     <div className="flex gap-2">
                        <a 
                           href={selectedItem.link}
                           target="_blank" 
                           rel="noreferrer"
                           className="flex-1 bg-white text-black py-2 font-mono text-xs font-bold border-2 border-black flex items-center justify-center gap-2 hover:bg-slate-100"
                        >
                           <FileText size={14} /> TRANSCRIPT
                        </a>
                     </div>
                  </div>
               </div>

               <div className="flex-1 flex flex-col bg-[#f0f0f0] relative">
                  <div className="p-6 md:p-8 border-b-2 border-slate-300 bg-white">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-slate-300">
                           Year: {selectedItem.year}
                        </span>
                     </div>
                     <h2 className="text-2xl md:text-3xl font-black font-sans uppercase leading-tight text-slate-900 mb-2">
                        {selectedItem.title}
                     </h2>
                     <div className="flex items-center gap-2 font-mono text-sm text-slate-500">
                         <Hash size={14} />
                         <span className="font-bold">GUEST:</span>
                         <span className="border-b border-dashed border-slate-400 pb-0.5 text-black">{selectedItem.guest}</span>
                     </div>
                  </div>

                  <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 relative">
                     <h3 className="font-mono text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyber-green rounded-full"></span>
                        Summary_Log
                     </h3>
                     <div className="font-mono text-sm md:text-base leading-relaxed text-slate-800 space-y-4 max-w-2xl">
                        <p>{selectedItem.description}</p>
                     </div>
                  </div>

                  {selectedItem.outroMusic && (
                     <div className="border-t-2 border-slate-300 bg-slate-100 p-4 md:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 bg-black rounded-full flex items-center justify-center text-white ${audioState.isPlaying && audioState.currentTrack === selectedItem.outroMusic.title ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
                              <Disc size={20} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Outro Music</span>
                              <span className="font-mono text-xs font-bold truncate max-w-[150px] md:max-w-xs">{selectedItem.outroMusic.title}</span>
                           </div>
                        </div>

                        <button 
                           onClick={() => selectedItem.outroMusic && handlePlayMusic(selectedItem.outroMusic.title)}
                           className="flex items-center gap-2 px-4 py-2 bg-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:bg-cyber-green"
                        >
                            {audioState.loading && audioState.currentTrack === selectedItem.outroMusic.title ? (
                               <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            ) : audioState.isPlaying && audioState.currentTrack === selectedItem.outroMusic.title ? (
                               <Pause size={14} /> 
                            ) : (
                               <Play size={14} />
                            )}
                            <span className="text-xs font-bold font-mono uppercase">Preview</span>
                        </button>
                     </div>
                  )}
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PLAYING INDICATOR (Sticky) --- */}
      <AnimatePresence>
        {audioState.currentTrack && !selectedItem && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[80] bg-black border-t-2 border-cyber-green p-3 flex items-center justify-between md:justify-center gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]"
          >
             <div className="flex items-center gap-3 overflow-hidden">
                <div className={`w-2 h-2 rounded-full ${audioState.isPlaying ? 'bg-cyber-green animate-pulse' : 'bg-red-500'}`}></div>
                <div className="font-mono text-xs text-cyber-green truncate max-w-[200px] md:max-w-md">
                   PLAYING_STREAM: {audioState.currentTrack}
                </div>
             </div>
             <div className="flex gap-2">
                <button onClick={handleTogglePlay} className="text-white hover:text-cyber-green p-1">
                   {audioState.isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={handleStopMusic} className="text-white hover:text-red-500 p-1">
                   <X size={18} />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Creator;
