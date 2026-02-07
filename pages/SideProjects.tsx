
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { SIDE_PROJECT_LADDERS } from '../data';
import { SideProjectLadder } from '../types';
import { X, ExternalLink, Play, Square, ArrowUp, Gamepad2, Code2, Terminal, ChevronRight, Hash, Smartphone } from 'lucide-react';

// --- UTILS & CONSTANTS ---
const SPRITE_SIZE = 48; // Size of the pixel character
const GROUND_HEIGHT = 80; // Height of the floor in px

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- PIXEL ART COMPONENTS ---

interface RetroBoxProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

// 1. Retro Box (The base container for everything)
const RetroBox: React.FC<RetroBoxProps> = ({ children, className = "", active = false }) => (
  <div className={`
    relative bg-black border-4 
    ${active ? 'border-cyber-green shadow-[4px_4px_0px_0px_#00ff41]' : 'border-white shadow-[4px_4px_0px_0px_#ffffff]'}
    ${className}
  `}>
    {/* Corner Decorations for that extra 8-bit feel */}
    <div className={`absolute -top-1 -left-1 w-2 h-2 bg-black`}></div>
    <div className={`absolute -top-1 -right-1 w-2 h-2 bg-black`}></div>
    <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-black`}></div>
    <div className={`absolute -bottom-1 -right-1 w-2 h-2 bg-black`}></div>
    {children}
  </div>
);

// 2. The Pixel Hero (Pure CSS Art)
const PixelHero = ({ state }: { state: 'idle' | 'run' | 'climb' }) => {
  return (
    <div className={`w-10 h-10 relative transition-transform duration-100 ${state === 'run' ? 'animate-bounce' : ''}`}>
      {/* 8-bit Head */}
      <div className="absolute top-0 left-2 w-6 h-5 bg-cyber-green border-2 border-black"></div>
      {/* Eyes */}
      <div className="absolute top-2 left-3 w-1 h-1 bg-black"></div>
      <div className="absolute top-2 left-6 w-1 h-1 bg-black"></div>
      {/* Body */}
      <div className="absolute top-5 left-1 w-8 h-4 bg-cyber-green border-2 border-black"></div>
      {/* Arms/Legs based on state */}
      {state === 'climb' ? (
        <>
          <div className="absolute top-3 left-0 w-2 h-4 bg-black animate-pulse"></div>
          <div className="absolute top-3 right-0 w-2 h-4 bg-black animate-pulse delay-75"></div>
          {/* Climbing Legs */}
          <div className="absolute top-9 left-1 w-2 h-2 bg-black"></div>
          <div className="absolute top-9 right-1 w-2 h-2 bg-black"></div>
        </>
      ) : (
        <>
           <div className="absolute top-9 left-2 w-2 h-3 bg-black"></div>
           <div className="absolute top-9 right-2 w-2 h-3 bg-black"></div>
        </>
      )}
    </div>
  );
};

// 3. The Ladder Visual (Rails Only)
const PixelLadder = ({ active }: { active: boolean }) => {
  // Infinite look
  const heightStyle = { height: '120vh' }; 

  return (
    <div className="w-16 relative flex flex-col items-center justify-end" style={heightStyle}>
      {/* Rails */}
      <div className={`absolute left-3 top-0 bottom-0 w-2 border-x-2 border-slate-600 transition-colors ${active ? 'bg-cyber-green/20 border-cyber-green' : 'bg-slate-800'}`}></div>
      <div className={`absolute right-3 top-0 bottom-0 w-2 border-x-2 border-slate-600 transition-colors ${active ? 'bg-cyber-green/20 border-cyber-green' : 'bg-slate-800'}`}></div>
      
      {/* Rungs */}
      <div className="absolute inset-0 flex flex-col justify-end pb-0 overflow-hidden z-10 w-full px-3">
         {[...Array(40)].map((_, i) => (
             <div 
                key={i} 
                className={`w-full h-1 mb-8 border-y border-slate-500 bg-slate-700 transition-colors ${active ? 'bg-cyber-green border-cyber-green' : ''}`}
             ></div>
         ))}
      </div>
    </div>
  );
};

// --- CONTENT MODAL COMPONENTS ---

const ModalHeader = ({ title, onClose }: { title: string, onClose: () => void }) => (
  <div className="bg-cyber-green p-2 border-b-4 border-black flex justify-between items-center select-none">
    <div className="flex items-center gap-2">
       <Square size={12} fill="black" />
       <h2 className="font-pixel text-xs text-black uppercase tracking-widest">{title}</h2>
    </div>
    <button onClick={onClose} className="hover:bg-black hover:text-white p-1 transition-colors">
       <X size={20} strokeWidth={3} />
    </button>
  </div>
);

const ContentGallery = ({ data }: { data: any }) => (
  <div className="space-y-8 p-4">
    {data.media?.map((item: any, idx: number) => (
      <RetroBox key={idx} className="p-2 bg-slate-900">
        {item.type === 'video' ? (
           <div className="aspect-video w-full border-2 border-black bg-black">
             <iframe 
                src={`https://www.youtube.com/embed/${getYouTubeId(item.src)}`}
                className="w-full h-full"
                allowFullScreen
                title="Video"
             />
           </div>
        ) : (
           <div className="aspect-[4/3] w-full border-2 border-black relative overflow-hidden">
             <img src={item.src} alt="" className="w-full h-full object-cover pixelated hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
           </div>
        )}
        {item.caption && (
           <div className="mt-2 font-mono text-xs text-cyber-green text-center uppercase border-t-2 border-black pt-1 bg-black">
             {item.caption}
           </div>
        )}
      </RetroBox>
    ))}
  </div>
);

const ContentIframe = ({ data }: { data: any }) => (
  <div className="h-[500px] bg-black border-4 border-slate-800 p-1">
     {!data.url ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-cyber-green animate-pulse">
           <ExternalLink size={48} />
           <p className="font-pixel text-xs mt-4">DATA_LINK_MISSING</p>
        </div>
     ) : (
        <iframe src={data.url} className="w-full h-full bg-white border-2 border-white" title="Embed" />
     )}
  </div>
);

const ContentSitePreview = ({ data }: { data: any }) => (
  <div className="h-full flex flex-col items-center justify-center p-4 bg-slate-900 border-4 border-slate-800">
     <div className="w-full max-w-2xl relative group">
        {/* Browser Frame */}
        <div className="bg-slate-200 border-2 border-black rounded-t-lg flex items-center gap-2 p-2 select-none">
           <div className="w-3 h-3 rounded-full bg-red-500 border border-black/20"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black/20"></div>
           <div className="w-3 h-3 rounded-full bg-green-500 border border-black/20"></div>
           <div className="flex-1 bg-white border border-slate-300 h-6 mx-2 rounded-sm text-[10px] font-mono flex items-center px-2 text-slate-400 truncate">
              {data.url}
           </div>
        </div>
        {/* Image Area */}
        <div className="border-x-2 border-b-2 border-black bg-black relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-shadow">
           <img 
             src={data.previewImage} 
             alt="Site Preview" 
             className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity" 
           />
           {/* Overlay Button */}
           <a 
             href={data.url} 
             target="_blank" 
             rel="noreferrer"
             className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
           >
              <div className="bg-cyber-green text-black px-6 py-3 font-pixel text-xs border-4 border-white shadow-[4px_4px_0_0_#000] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer">
                 VISIT WEBSITE <ExternalLink size={14} />
              </div>
           </a>
        </div>
     </div>
     <p className="mt-4 font-mono text-[10px] text-slate-500 animate-pulse uppercase tracking-wider">
        CLICK PREVIEW TO LAUNCH
     </p>
  </div>
);

const ContentTabs = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex border-b-4 border-black bg-slate-800">
        {data.tabs?.map((tab: any, idx: number) => (
           <button
             key={idx}
             onClick={() => setActiveTab(idx)}
             className={`px-4 py-3 font-pixel text-[10px] uppercase border-r-4 border-black transition-all ${activeTab === idx ? 'bg-cyber-green text-black' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
           >
             {tab.name}
           </button>
        ))}
      </div>
      <div className="flex-1 bg-black p-6 border-x-4 border-b-4 border-black">
         <div className="font-mono text-sm text-green-400 leading-relaxed mb-6 typing-effect">
            <span className="text-white mr-2">root@system:</span>
            {data.tabs?.[activeTab].content}
         </div>
         {data.tabs?.[activeTab].link && (
            <a 
              href={data.tabs[activeTab].link} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 font-pixel text-[10px] border-4 border-slate-500 hover:border-cyber-green hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_0px_#333]"
            >
               RUN_PROGRAM <Play size={10} fill="black" />
            </a>
         )}
      </div>
    </div>
  );
};

// Redesigned: No raw JSON, cleaner "Developer Card" interface
const ContentCodeLog = ({ data }: { data: any }) => {
   
  const getStatusColor = (status: string) => {
     switch(status) {
        case 'LIVE': return 'bg-cyber-green text-black';
        case 'PROTOTYPE': return 'bg-yellow-400 text-black';
        case 'PROMPT_ENG': return 'bg-blue-400 text-black';
        default: return 'bg-slate-700 text-white';
     }
  };

  return (
    <div className="h-full bg-[#1e1e1e] font-mono text-sm overflow-hidden flex flex-col">
       
       {/* Pseudo-Terminal Header */}
       <div className="p-3 bg-[#2a2a2a] border-b border-black flex items-center justify-between select-none">
           <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Terminal size={14} />
              <span>root@portfolio:~/vibe-coding</span>
           </div>
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
           </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
           {/* Command Input Simulation */}
           <div className="mb-6 flex items-center gap-2 text-cyber-green text-sm font-bold">
              <span>{">"}</span>
              <span className="typing-effect">run list_projects --all</span>
              <span className="w-2 h-4 bg-cyber-green animate-pulse inline-block"></span>
           </div>

           {/* Projects List */}
           <div className="space-y-6">
              {data.projects?.map((project: any, i: number) => (
                 <div key={i} className="bg-[#252525] rounded-md border border-slate-700 overflow-hidden hover:border-cyber-green transition-colors group shadow-lg">
                    {/* Project Header */}
                    <div className="p-4 bg-[#2f2f2f] border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
                       <div className="flex items-center gap-3">
                          <Hash size={16} className="text-slate-500" />
                          <h3 className="text-white font-bold text-base tracking-wide">{project.name}</h3>
                       </div>
                       <div className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${getStatusColor(project.status)}`}>
                          {project.status}
                       </div>
                    </div>
                    
                    {/* Project Body */}
                    <div className="p-5">
                       <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans opacity-90">
                          {project.description}
                       </p>
                       
                       {/* Screenshot (if available) */}
                       {project.image && (
                          <div className="mt-4 rounded border border-slate-700 overflow-hidden relative group/img">
                             <img src={project.image} alt={project.name} className="w-full h-auto opacity-80 group-hover/img:opacity-100 transition-opacity" />
                             {/* Scanline overlay */}
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
                          </div>
                       )}
                    </div>
                 </div>
              ))}
           </div>

           {/* Learning Resources */}
           <div className="mt-12 pt-8 border-t border-dashed border-slate-700">
               <div className="flex items-center gap-2 text-slate-500 mb-6 font-bold uppercase text-xs tracking-widest">
                  <Code2 size={14} /> Learning Logs
               </div>
               <div className="grid grid-cols-1 gap-3">
                  {data.links?.map((link: any, i: number) => (
                     <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-4 p-3 rounded bg-[#252525] border border-slate-700 hover:bg-[#2f2f2f] hover:border-cyber-green hover:translate-x-1 transition-all group"
                     >
                        <div className="text-slate-600 group-hover:text-cyber-green">
                           <ChevronRight size={16} />
                        </div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white flex-1 font-sans">
                           {link.title}
                        </span>
                        <ExternalLink size={12} className="text-slate-600 group-hover:text-white" />
                     </a>
                  ))}
               </div>
           </div>
       </div>
    </div>
  );
};

const ContentStaticGallery = ({ data }: { data: any }) => (
  <div className="grid grid-cols-2 gap-4 p-2">
     {data.media?.map((item: any, idx: number) => (
        <div key={idx} className="aspect-square bg-slate-800 border-4 border-white p-1 shadow-[4px_4px_0px_0px_#000]">
           <img src={item.src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 pixelated transition-all" />
        </div>
     ))}
  </div>
);

// New Component: Mobile Scroll Feed (For Red Note)
const ContentFeed = ({ data }: { data: any }) => (
  <div className="min-h-full bg-slate-200 p-0 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-[400px] bg-white shadow-2xl overflow-hidden relative border-x-4 border-slate-300 min-h-[600px]">
          {/* Fake Phone Status Bar */}
          <div className="h-6 bg-black text-white flex justify-between items-center px-4 text-[10px] font-mono select-none sticky top-0 z-10">
              <span>20:25</span>
              <div className="flex gap-1">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
          </div>
          
          {/* The Scrolling Feed Content */}
          <div className="flex flex-col">
              {data.feedImages?.map((src: string, idx: number) => (
                 <img key={idx} src={src} alt={`Feed content ${idx}`} className="w-full h-auto block select-none" />
              ))}
          </div>

          {/* Fake Bottom Bar */}
          <div className="h-1 bg-black w-1/3 mx-auto rounded-full my-2"></div>
      </div>
  </div>
);

// --- MAIN SCENE ---

const SideProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<SideProjectLadder | null>(null);
  const [targetLadderId, setTargetLadderId] = useState<string | null>(null);
  
  // Hero State
  const [heroX, setHeroX] = useState(10); // Percent
  const [heroY, setHeroY] = useState(0); // vh value relative to ground
  const [heroState, setHeroState] = useState<'idle' | 'run' | 'climb'>('idle');

  // Animation Springs for smooth but snappy movement
  const springX = useSpring(10, { stiffness: 120, damping: 20 });
  const springY = useSpring(0, { stiffness: 80, damping: 20 });

  // --- INTERACTION LOGIC (Desktop) ---
  const handleMouseMove = (e: React.MouseEvent) => {
    // If modal open, disable game logic
    if (activeProject || !containerRef.current) return;
    
    // If climbing, ignore mouse X
    if (targetLadderId) return;

    const rect = containerRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const percentX = (rawX / rect.width) * 100;
    
    // Clamp to screen bounds
    const clampedX = Math.min(Math.max(percentX, 2), 98);
    
    setHeroX(clampedX);
    setHeroState('run');
    
    // Reset to idle after movement stops (debounced)
    clearTimeout((window as any).moveTimeout);
    (window as any).moveTimeout = setTimeout(() => {
        if (!targetLadderId) setHeroState('idle');
    }, 100);
  };

  // --- GAME LOOP EFFECT ---
  useEffect(() => {
    // Sync React state to Framer Motion springs
    springX.set(heroX);
    springY.set(heroY);
  }, [heroX, heroY, springX, springY]);

  // Handle Ladder Interaction
  const handleLadderHover = (ladder: SideProjectLadder | null) => {
    if (activeProject) return;

    if (ladder) {
      setTargetLadderId(ladder.id);
      setHeroX(ladder.ladderPosition.left); // Snap EXACTLY to ladder center
      
      // Climb to the marker height
      // Score 1-10 mapped to visual height VH
      const climbHeightVh = ladder.score * 7; 
      
      setHeroY(climbHeightVh); 
      setHeroState('climb');
    } else {
      setTargetLadderId(null);
      setHeroY(0); // Return to ground
      setHeroState('idle');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111] font-sans pt-16 select-none overflow-hidden">
      
      {/* --- LAYER 1: CRT SCANLINE OVERLAY --- */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]"></div>
      
      {/* --- LAYER 2: BACKGROUND --- */}
      <div className="absolute inset-0 bg-[#050505]">
          {/* Grid Floor Perspective */}
          <div className="absolute bottom-0 w-full h-[30vh] bg-[linear-gradient(to_bottom,#000_1px,transparent_1px),linear-gradient(to_right,#333_1px,transparent_1px)] bg-[size:40px_20px] opacity-20 transform-gpu perspective-[500px] rotate-x-60 origin-bottom"></div>
      </div>

      {/* --- LAYER 3: GAME STAGE (Desktop) --- */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="hidden md:block absolute inset-0 z-20 cursor-crosshair"
      >
         {/* THE GROUND */}
         <div className="absolute bottom-0 w-full bg-[#111] border-t-2 border-slate-700 flex items-center px-6 md:px-12 justify-between z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]" style={{ height: `${GROUND_HEIGHT}px` }}>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 w-full">
                <div className="inline-block py-1.5">
                   <h1 className="font-pixel text-[10px] md:text-xs text-cyber-green animate-pulse whitespace-nowrap drop-shadow-[0_0_8px_rgba(0,255,65,0.6)]">> LEVEL: SIDE_PROJECTS</h1>
                </div>
                <p className="font-mono text-[10px] md:text-xs text-slate-400 truncate">
                   我在 2025 年爬的各种技能梯子…
                </p>
                
                <div className="hidden md:block ml-auto font-mono text-[9px] text-slate-600">
                   SYSTEM_STATUS: ONLINE
                </div>
            </div>
         </div>

         {/* LADDERS & NODES */}
         {SIDE_PROJECT_LADDERS.map((ladder) => {
            const isHovered = targetLadderId === ladder.id;
            // The node position (where the label/icon sits)
            const nodeHeightVh = ladder.score * 7; 

            return (
              <div 
                key={ladder.id}
                className="absolute flex flex-col items-center group transform -translate-x-1/2"
                style={{ 
                    left: `${ladder.ladderPosition.left}%`, 
                    bottom: `${GROUND_HEIGHT - 4}px` 
                }}
                onMouseEnter={() => handleLadderHover(ladder)}
                onMouseLeave={() => handleLadderHover(null)}
                onClick={() => setActiveProject(ladder)}
              >
                  {/* --- THE NODE (Icon + Label + Level) --- */}
                  <div 
                     className="absolute w-64 flex flex-col items-center z-30 pointer-events-none"
                     style={{ bottom: `${nodeHeightVh}vh` }}
                  >
                      {/* Name Label */}
                      <div className={`
                          mb-3 px-3 py-1.5 border-2 transition-all duration-300 bg-black/80
                          ${isHovered 
                            ? 'border-cyber-green text-cyber-green shadow-[0_0_15px_#00ff41]' 
                            : 'border-slate-600 text-slate-400'}
                      `}>
                          <span className="font-pixel text-[10px] uppercase tracking-widest">
                             {ladder.name}
                          </span>
                      </div>

                      {/* Icon Box */}
                      <div className={`
                          w-12 h-12 border-2 bg-black flex items-center justify-center text-2xl transition-all duration-300 relative
                          ${isHovered ? 'border-cyber-green text-white scale-110' : 'border-slate-500 text-slate-500'}
                      `}>
                          {ladder.icon}

                          {/* Level Marker (Attached to right of Icon Box) */}
                          <div className={`
                              absolute left-full ml-3 top-1/2 -translate-y-1/2
                              border-2 bg-black px-1.5 py-0.5
                              ${isHovered ? 'border-white text-white' : 'border-slate-600 text-slate-500'}
                          `}>
                              <span className="font-pixel text-[8px] whitespace-nowrap">LV.{ladder.score}</span>
                          </div>
                      </div>
                  </div>

                  {/* The Ladder Visual (Extends infinitely upwards visually) */}
                  <PixelLadder active={isHovered} />

              </div>
            );
         })}

         {/* THE HERO CHARACTER */}
         <motion.div
            className="absolute z-30 pointer-events-none flex flex-col items-center"
            style={{ 
                left: useTransform(springX, val => `${val}%`), 
                bottom: useTransform(springY, val => `calc(${GROUND_HEIGHT}px + ${val}vh)`),
                x: '-50%' 
            }}
         >
            {targetLadderId && (
               <div className="mb-2 bg-white text-black text-[8px] font-pixel px-1 py-0.5 animate-bounce shadow-[4px_4px_0_0_#000]">
                  CLICK!
               </div>
            )}
            <PixelHero state={heroState} />
         </motion.div>

      </div>

      {/* --- LAYER 3B: MOBILE VIEW (Grid) --- */}
      <div className="md:hidden absolute inset-0 z-20 overflow-y-auto p-6 pb-24">
         <div className="mt-20 grid grid-cols-1 gap-8">
            {SIDE_PROJECT_LADDERS.map((ladder) => (
               <div 
                  key={ladder.id}
                  onClick={() => setActiveProject(ladder)}
                  className="bg-black border-4 border-slate-700 p-6 shadow-[8px_8px_0px_0px_#222] active:translate-y-1 active:shadow-none transition-all flex items-center justify-between group"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-slate-800 border-2 border-white flex items-center justify-center text-2xl">
                        {ladder.icon}
                     </div>
                     <div>
                        <h3 className="font-pixel text-xs text-white uppercase mb-1">{ladder.name}</h3>
                        <div className="flex gap-1">
                           {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-3 h-3 border border-black ${i < (ladder.score/2) ? 'bg-cyber-green' : 'bg-slate-800'}`}></div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="text-slate-500 group-hover:text-cyber-green">
                     <ArrowUp size={24} className="animate-bounce" />
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* --- LAYER 4: MODAL (Retro Popup) --- */}
      <AnimatePresence>
         {activeProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 bg-black/90 backdrop-blur-md">
               <motion.div
                  initial={{ scale: 0, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 5 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="w-full max-w-4xl max-h-[85vh] flex flex-col relative"
               >
                  {/* Outer Retro Shell */}
                  <RetroBox className="flex-1 flex flex-col overflow-hidden bg-[#111]" active={true}>
                     
                     <ModalHeader title={`${activeProject.name}.EXE`} onClose={() => setActiveProject(null)} />
                     
                     <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
                        
                        {/* Sidebar Info */}
                        <div className="w-full md:w-1/3 bg-slate-900 border-b-4 md:border-b-0 md:border-r-4 border-black p-6 flex flex-col gap-6">
                            <div className="w-24 h-24 mx-auto bg-black border-4 border-white flex items-center justify-center text-5xl shadow-[4px_4px_0px_0px_#333]">
                               {activeProject.icon}
                            </div>
                            
                            <div className="space-y-4 font-mono text-sm">
                               <div className="bg-black border border-slate-700 p-3">
                                  <span className="text-xs text-slate-500 uppercase block mb-1">Status</span>
                                  <span className="text-cyber-green font-bold animate-pulse">
                                     {activeProject.score === 10 ? 'COMPLETED' : 'IN_PROGRESS'}
                                  </span>
                               </div>
                               
                               <div className="bg-black border border-slate-700 p-3">
                                  <span className="text-xs text-slate-500 uppercase block mb-1">Description</span>
                                  <p className="text-slate-300 text-xs leading-relaxed">
                                     {activeProject.content.description}
                                  </p>
                               </div>
                            </div>

                            <div className="mt-auto pt-6">
                               {activeProject.link ? (
                                  <a 
                                    href={activeProject.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="block w-full bg-cyber-green text-black font-pixel text-xs text-center py-3 border-4 border-black hover:bg-white hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_0px_#000]"
                                  >
                                     {activeProject.id === 'l2' ? 'LISTEN ON XYZ' : 'ACCESS LINK'}
                                  </a>
                               ) : (
                                  <div className="text-center font-pixel text-[10px] text-slate-600">OFFLINE</div>
                               )}
                            </div>
                        </div>

                        {/* Main Content Viewer */}
                        <div className="w-full md:w-2/3 bg-slate-800 p-1 md:p-6">
                           <div className="bg-black border-4 border-slate-600 h-full overflow-y-auto custom-scrollbar relative">
                              <div className="sticky top-0 bg-slate-700 border-b-4 border-slate-600 p-2 flex justify-between items-center z-10">
                                 <span className="font-mono text-[10px] text-white">VIEWER_MODE</span>
                                 <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                 </div>
                              </div>
                              
                              {/* Dynamic Content Switching */}
                              {activeProject.contentType === 'gallery-vertical' && <ContentGallery data={activeProject.content} />}
                              {activeProject.contentType === 'iframe' && <ContentIframe data={activeProject.content} />}
                              {activeProject.contentType === 'tabs' && <ContentTabs data={activeProject.content} />}
                              {activeProject.contentType === 'static-gallery' && <ContentStaticGallery data={activeProject.content} />}
                              {activeProject.contentType === 'site-preview' && <ContentSitePreview data={activeProject.content} />}
                              {activeProject.contentType === 'code-log' && <ContentCodeLog data={activeProject.content} />}
                              {activeProject.contentType === 'feed-scroll' && <ContentFeed data={activeProject.content} />}
                              
                           </div>
                        </div>

                     </div>
                  </RetroBox>

                  {/* Decorative Cable */}
                  <div className="absolute -bottom-20 left-10 w-4 h-24 bg-black border-x-2 border-slate-700 -z-10"></div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </div>
  );
};

export default SideProjects;
