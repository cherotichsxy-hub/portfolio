
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PRODUCER_ITEMS } from '../data';
import { Star, X, Filter, ArrowLeft, Activity, Target, Headphones, Sparkles, FolderOpen, ExternalLink, Play, Disc, FileText, User, Briefcase, Zap } from 'lucide-react';
import { ProducerItem } from '../types';

// --- ASSETS ---
const MEMOJI_URL = "https://i.postimg.cc/tRP4rJwF/wei-xin-tu-pian-20260129164844-455-96-removebg-preview.png"; 

// --- CONFIGURATION ---
const RADIUS_X = 35; // Horizontal spread (%)
const RADIUS_Y = 32; // Vertical spread (%)
const ROTATION_SPEED = 0.03; // Degrees per frame
const CENTER_X = 50; // Center X %
const CENTER_Y = 50; // Center Y %

// --- SUB-COMPONENTS FOR INDUSTRIAL UI ---

const SpeakerGrille = () => (
  <div className="grid grid-cols-12 gap-1.5 w-32 opacity-20">
    {[...Array(36)].map((_, i) => (
      <div key={i} className="w-1 h-1 bg-black rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"></div>
    ))}
  </div>
);

const Knob = ({ color, rotation = 0, label }: { color: string, rotation?: number, label?: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative w-12 h-12 rounded-full bg-[#d4d4d8] shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center border border-black/5">
        {/* Side texture */}
        <div className="absolute inset-0 rounded-full border-[4px] border-dashed border-black/5 opacity-50"></div>
        {/* Cap */}
        <div className="w-10 h-10 rounded-full bg-[#e4e4e7] shadow-[0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center relative transform" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className={`w-1 h-3 absolute top-1 rounded-full ${color}`}></div>
        </div>
    </div>
    {label && <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">{label}</span>}
  </div>
);

const Producer: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('All Units');
  const [selectedItem, setSelectedItem] = useState<ProducerItem | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false); // Controls the "About Me" modal
  
  // Animation State
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef<number | null>(null);

  // --- ANIMATION LOOP ---
  const animate = () => {
    // Pause animation if interacting with modal or item
    if (!isPaused && !selectedItem && !showProfile) {
      setRotation(prev => (prev + ROTATION_SPEED) % 360);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPaused, selectedItem, showProfile]);

  // --- 3D PARALLAX SETUP ---
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Gentle tilt effect
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]); 
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  // --- FILTER LOGIC ---
  const FILTER_OPTIONS = [
    'All Units', 
    'Featured', 
    '全案制作', 
    '策划', 
    '后期'
  ];

  const isMatch = (item: ProducerItem) => {
    const hasRole = (r: string) => item.roles.some(role => role.includes(r));

    switch (activeFilter) {
      case 'All Units':
        return true;
      case 'Featured':
        return item.isFeatured;
      case '全案制作':
        return hasRole('制片') || item.description.includes('全流程') || item.description.includes('0 到 1') || item.description.includes('全案');
      case '策划':
        return hasRole('策划') || hasRole('立项');
      case '后期':
        return hasRole('剪辑') || hasRole('后期');
      default:
        return true;
    }
  };

  // Calculate Positions
  const itemsWithPos = useMemo(() => {
    const total = PRODUCER_ITEMS.length;
    return PRODUCER_ITEMS.map((item, i) => {
        const offsetAngle = (i / total) * 360;
        const currentAngleDeg = (offsetAngle + rotation) % 360;
        const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

        const x = CENTER_X + RADIUS_X * Math.cos(currentAngleRad);
        const y = CENTER_Y + RADIUS_Y * Math.sin(currentAngleRad);

        // Z-Index based on Y (items lower down are visually "closer")
        const zIndex = Math.floor(y * 10);

        return { ...item, x, y, zIndex };
    });
  }, [rotation]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[50] bg-[#f3f4f6] text-slate-900 overflow-hidden font-sans selection:bg-cyber-green selection:text-black perspective-container cursor-default"
      style={{ perspective: '1000px' }}
      onClick={() => { /* Clicking background does nothing now, explicit close buttons only */ }}
    >
      
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 opacity-60"></div>
      
      {/* --- HEADER (Top Left) --- */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-8 flex items-start justify-between pointer-events-none select-none">
         <div className="pointer-events-auto flex flex-col gap-6 pt-16 md:pt-0">
            <button 
                onClick={(e) => { e.stopPropagation(); navigate('/'); }}
                className="flex items-center gap-2 bg-black text-white px-3 py-1.5 hover:bg-slate-800 transition-colors self-start shadow-md group rounded-full"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">BACK</span>
            </button>
            
            <div className="flex flex-col gap-0 opacity-90 mix-blend-multiply">
                <h1 className="font-black text-6xl md:text-8xl tracking-tighter uppercase text-slate-900 leading-[0.8]">
                    PRODUCER
                </h1>
                <h2 className="text-xl md:text-3xl text-slate-400 font-bold tracking-[0.2em] uppercase ml-1 md:ml-2">
                    WORK LOG
                </h2>
            </div>
         </div>
      </div>

      {/* --- HUD FILTER BAR (Left Side) --- */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-[60] pointer-events-auto w-64 hidden md:flex flex-col gap-8"
      >
         {/* System Status */}
         <div className="flex items-center gap-2 text-cyber-green font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">
            <Activity size={12} />
            <span>SYSTEM_READY</span>
         </div>

         {/* Filter Panel */}
         <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-slate-900 font-mono text-[10px] font-bold uppercase tracking-widest border-b-2 border-slate-900 pb-2 w-full">
                 <Filter size={12} /> MODE SELECT
             </div>
             
             <div className="flex flex-col items-start gap-1">
                {FILTER_OPTIONS.map((filter) => (
                    <button
                        key={filter}
                        onClick={(e) => { e.stopPropagation(); setActiveFilter(filter); }}
                        className={`
                            relative w-full text-left px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider transition-all
                            flex items-center justify-between
                            ${activeFilter === filter 
                                ? 'bg-slate-900 text-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)]' 
                                : 'text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                            }
                        `}
                    >
                        <span className="flex items-center gap-2 z-10">
                            {filter === 'Featured' ? <Star size={10} fill={activeFilter === filter ? "white" : "currentColor"} /> : null}
                            {filter.toUpperCase()}
                        </span>
                        
                        {activeFilter === filter && (
                            <div className="w-1.5 h-1.5 bg-cyber-green rounded-full shadow-[0_0_8px_#00ff41]"></div>
                        )}
                    </button>
                ))}
             </div>
         </div>
      </motion.div>

      {/* --- MAIN INTERACTIVE GALAXY --- */}
      <motion.div
         style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
         className="w-full h-full relative flex items-center justify-center"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
      >
          {/* --- LAYER 0: NEURAL LINES (SVG) --- */}
          <div className="absolute inset-0 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible">
                 <defs>
                    <linearGradient id="gradHover" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#00FF41', stopOpacity: 0.2}} />
                        <stop offset="100%" style={{stopColor: '#00FF41', stopOpacity: 1}} />
                    </linearGradient>
                 </defs>
                 {itemsWithPos.map((item) => {
                     const matched = isMatch(item);
                     const isHovered = hoveredItemId === item.id;
                     
                     if (!matched) return null;

                     return (
                        <motion.line
                            key={`line-${item.id}`}
                            x1={`${CENTER_X}%`}
                            y1={`${CENTER_Y}%`}
                            x2={`${item.x}%`}
                            y2={`${item.y}%`}
                            stroke={isHovered ? "url(#gradHover)" : "#cbd5e1"} 
                            strokeWidth={isHovered ? 2 : 1}
                            strokeDasharray={isHovered ? "0" : "4 4"}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: 1, 
                                opacity: isHovered ? 1 : 0.4
                            }}
                        />
                     );
                 })}
              </svg>
          </div>

          {/* --- LAYER 1: CENTER HUB (Memoji Trigger) --- */}
          <div 
             className="absolute z-10 flex flex-col items-center justify-center pointer-events-auto"
             style={{ 
                 left: `${CENTER_X}%`, 
                 top: `${CENTER_Y}%`, 
                 transform: 'translate(-50%, -50%)'
             }}
          >
              <div 
                 className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer"
                 onClick={(e) => { 
                    e.stopPropagation(); 
                    setShowProfile(true); 
                 }}
              >
                  <div className="absolute inset-0 bg-cyber-green rounded-full blur-[50px] opacity-20 animate-pulse"></div>
                  {/* Outer Ring */}
                  <div className="absolute inset-[-12px] rounded-full border border-dashed border-slate-300 group-hover:border-cyber-green group-hover:rotate-180 transition-all duration-700"></div>
                  
                  <div className="absolute inset-0 border-2 border-white bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                     <img 
                        src={MEMOJI_URL} 
                        alt="Producer" 
                        className="w-full h-full object-contain drop-shadow-2xl"
                     />
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                     <div className="px-3 py-1 bg-black text-white text-[9px] font-mono font-bold uppercase tracking-[0.2em] shadow-lg border border-white/20 flex items-center gap-2 group-hover:bg-cyber-green group-hover:text-black transition-colors">
                        <User size={10} />
                        PROFILE_DATA
                     </div>
                  </div>
              </div>
          </div>

          {/* --- LAYER 2: ORBITING ITEMS --- */}
          {itemsWithPos.map((item) => {
             const matched = isMatch(item);
             const isHovered = hoveredItemId === item.id;
             const isFilterActive = activeFilter !== 'All Units';
             const isDimmed = isFilterActive && !matched;
             const isGhost = isDimmed && !isHovered;
             const isGrayscale = isGhost;

             return (
                 <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: isGhost ? 0.15 : 1, 
                        scale: isGhost ? 0.8 : 1,
                        filter: isGrayscale ? 'grayscale(100%)' : 'grayscale(0%)',
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        zIndex: isHovered ? 1000 : item.zIndex + 20
                    }}
                    transition={{ 
                        left: { duration: 0 },
                        top: { duration: 0 },
                        zIndex: { duration: 0 },
                        scale: { duration: 0.2 },
                        opacity: { duration: 0.3 },
                        filter: { duration: 0.3 }
                    }}
                    className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
                    style={{
                        pointerEvents: isGhost ? 'none' : 'auto', 
                    }}
                 >
                    {/* Card Container */}
                    <div 
                        className={`
                            relative bg-white ease-out overflow-hidden transform-gpu
                            ${isHovered 
                                ? 'w-56 h-56 border-4 border-cyber-green shadow-[0_0_30px_rgba(0,255,65,0.4)] rounded-lg' 
                                : 'w-20 h-20 md:w-24 md:h-24 border border-slate-300 shadow-lg rounded-md'
                            }
                            ${!isHovered && !isGhost ? 'hover:border-slate-900' : ''}
                        `}
                        style={{
                            transitionProperty: 'width, height, box-shadow, border-width, border-color, border-radius, background-color',
                            transitionDuration: '200ms',
                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                         <div className="w-full h-full relative bg-slate-200">
                             <div 
                                className={`absolute inset-0 bg-cover bg-center duration-500`}
                                style={{ 
                                    backgroundImage: item.image,
                                    transform: isHovered ? 'scale(1.1)' : 'scale(1.0)',
                                    transition: 'transform 500ms'
                                }}
                             />
                             {!isHovered && <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>}
                         </div>

                         {isHovered && (
                             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 animate-in fade-in duration-200">
                                 <h3 className="text-white font-black text-sm uppercase leading-tight mb-2">{item.title}</h3>
                                 <div className="flex flex-wrap gap-1">
                                     {item.roles.slice(0, 3).map(r => (
                                         <span key={r} className="text-[9px] font-mono bg-cyber-green text-black px-1.5 py-0.5 rounded-sm font-bold">
                                             {r}
                                         </span>
                                     ))}
                                 </div>
                             </div>
                         )}
                         
                         {!isHovered && item.isFeatured && !isGhost && (
                             <div className="absolute top-0 right-0 p-1 bg-yellow-400 text-black z-20">
                                 <Star size={8} fill="currentColor" />
                             </div>
                         )}
                    </div>
                 </motion.div>
             );
          })}
      </motion.div>

      {/* --- MODAL 1: PROJECT DETAILS (Existing) --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
               animate={{ scale: 1, opacity: 1, rotateX: 0 }}
               exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               onClick={(e) => e.stopPropagation()}
               className="w-full max-w-5xl bg-[#e0e0e0] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row border border-white/40 ring-1 ring-black/10"
               style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.9)' }}
             >
                {/* --- LEFT: SCREEN & SPEAKER --- */}
                <div className="w-full md:w-5/12 bg-[#e4e4e7] p-8 md:p-10 relative flex flex-col justify-between border-r border-black/5">
                    <div className="absolute top-8 left-8"><SpeakerGrille /></div>
                    <div className="absolute top-8 right-8 text-right">
                       <div className="text-[10px] font-mono font-bold text-gray-400 tracking-widest">TE-2025</div>
                       <div className="text-[10px] font-mono text-gray-300">OP-1 FIELD</div>
                    </div>
                    {/* The Screen */}
                    <div className="mt-16 mb-8 relative">
                       <div className="bg-black rounded-xl p-2.5 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.5)] border-b border-white/20">
                          <div className="aspect-square w-full bg-[#111] rounded-lg overflow-hidden relative group border border-white/5">
                             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20"></div>
                             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none z-10"></div>
                             <div className="w-full h-full bg-cover bg-center opacity-90 contrast-125 saturate-150" style={{ backgroundImage: selectedItem.image }}></div>
                             <div className="absolute top-4 left-4 z-30 flex gap-1">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="text-[9px] font-mono text-white/80 leading-none">REC</div>
                             </div>
                             <div className="absolute bottom-4 left-4 right-4 z-30 flex justify-between font-mono text-[9px] text-[#ccff00]">
                                <span>ISO 800</span>
                                <span>{selectedItem.roles.length} TRACKS</span>
                                <span>120 BPM</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    {/* Left Bottom Labels */}
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1"><div className="w-8 h-1 bg-gray-300 rounded-full"></div><span className="text-[9px] font-bold text-gray-400 font-mono text-center">VOL</span></div>
                        <div className="flex flex-col gap-1"><div className="w-8 h-1 bg-gray-300 rounded-full"></div><span className="text-[9px] font-bold text-gray-400 font-mono text-center">MIC</span></div>
                    </div>
                </div>

                {/* --- RIGHT: CONTROLS & INFO --- */}
                <div className="w-full md:w-7/12 bg-[#f4f4f5] p-8 md:p-10 flex flex-col relative">
                    <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#e4e4e7] shadow-inner flex items-center justify-center hover:bg-[#d4d4d8] text-gray-500 border border-black/5"><X size={14} strokeWidth={3} /></button>
                    {/* Top Row: Knobs */}
                    <div className="flex gap-6 mb-10 pl-2">
                       <Knob color="bg-blue-500" rotation={45} />
                       <Knob color="bg-green-500" rotation={120} />
                       <Knob color="bg-white" rotation={200} />
                       <Knob color="bg-orange-500" rotation={310} />
                    </div>
                    {/* Main Content Info */}
                    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                       <div>
                          <div className="flex items-center gap-2 mb-2"><span className="px-2 py-0.5 bg-black text-white text-[9px] font-mono font-bold tracking-widest rounded-sm">PROJECT_ID: {selectedItem.id.toUpperCase()}</span></div>
                          <h2 className="text-4xl md:text-5xl font-sans font-bold text-slate-800 tracking-tighter leading-none mb-4">{selectedItem.title}</h2>
                          <div className="h-px w-full bg-gradient-to-r from-black/20 to-transparent"></div>
                       </div>
                       <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          <div><h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2">Client</h3><p className="font-mono text-sm font-bold text-slate-700">{selectedItem.client}</p></div>
                          <div><h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-2">Roles</h3><div className="flex flex-wrap gap-2">{selectedItem.roles.map(role => (<span key={role} className="px-2 py-1 bg-[#e4e4e7] border border-[#d4d4d8] rounded-sm text-[10px] font-bold text-slate-600 shadow-sm">{role}</span>))}</div></div>
                       </div>
                       <div className="bg-[#e4e4e7] p-5 rounded-lg border border-black/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                          <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3">Briefing</h3>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed font-mono">{selectedItem.description}</p>
                       </div>
                       {selectedItem.dataHighlights && (
                          <div className="flex items-start gap-3 p-4 border border-dashed border-gray-300 rounded-lg">
                             <div className="mt-1 text-orange-500"><Activity size={16} /></div>
                             <div><h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1">Highlights</h3><p className="text-xs font-bold text-slate-800 font-mono">{selectedItem.dataHighlights}</p></div>
                          </div>
                       )}
                    </div>
                    {/* Bottom Action Bar */}
                    <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                       <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span className="text-[9px] font-mono font-bold text-gray-400">OUTPUT ACTIVE</span></div>
                       {selectedItem.listenLink && selectedItem.listenLink !== '#' ? (
                          <a href={selectedItem.listenLink} target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#e4e4e7] rounded-md shadow-[0_4px_0_#d4d4d8,0_5px_10px_rgba(0,0,0,0.1)] active:shadow-[0_1px_0_#d4d4d8,0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[3px] transition-all border border-white/50 text-slate-800 font-bold font-mono text-sm uppercase tracking-wide hover:bg-white"><Play size={16} className="fill-slate-800" />PLAY / VIEW<div className="absolute top-1 left-2 w-full h-full bg-white opacity-20 rounded-md pointer-events-none"></div></a>
                       ) : (<button disabled className="px-6 py-3 bg-[#f0f0f0] rounded-md text-gray-400 font-mono text-xs font-bold border border-gray-200 cursor-not-allowed">NO SIGNAL</button>)}
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: IDENTITY PROFILE (New "About Me" Modal) --- */}
      <AnimatePresence>
        {showProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowProfile(false)}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
               animate={{ scale: 1, opacity: 1, rotateX: 0 }}
               exit={{ scale: 0.9, opacity: 0, rotateX: 20 }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               onClick={(e) => e.stopPropagation()}
               className="w-full max-w-5xl bg-[#e0e0e0] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row border border-white/40 ring-1 ring-black/10"
               style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255,255,255,0.9)' }}
             >
                {/* --- LEFT: BIOMETRIC SCREEN --- */}
                <div className="w-full md:w-5/12 bg-[#27272a] p-8 md:p-10 relative flex flex-col justify-center items-center border-r border-black/50 overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    {/* Scanner Line */}
                    <motion.div 
                        animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-cyber-green shadow-[0_0_20px_#00ff41] z-20"
                    ></motion.div>

                    {/* Memoji Container */}
                    <div className="relative w-48 h-48 md:w-56 md:h-56 z-10">
                        <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-3xl animate-pulse"></div>
                        <img src={MEMOJI_URL} alt="Profile" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" />
                        
                        {/* HUD Elements around head */}
                        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-cyber-green w-6 h-6"></div>
                        <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-cyber-green w-6 h-6"></div>
                    </div>

                    <div className="mt-8 text-center z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyber-green text-cyber-green bg-black/50 text-[10px] font-mono font-bold tracking-widest mb-2">
                            <Activity size={12} className="animate-pulse" /> IDENTITY VERIFIED
                        </div>
                        <div className="text-white/50 font-mono text-[9px]">ID: PRODUCER_CP_2025</div>
                    </div>
                </div>

                {/* --- RIGHT: DATA & BIO --- */}
                <div className="w-full md:w-7/12 bg-[#f4f4f5] p-8 md:p-10 flex flex-col relative">
                    <button onClick={() => setShowProfile(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#e4e4e7] shadow-inner flex items-center justify-center hover:bg-[#d4d4d8] text-gray-500 border border-black/5"><X size={14} strokeWidth={3} /></button>
                    
                    {/* Capability Knobs */}
                    <div className="flex gap-8 mb-10 pl-2 border-b border-black/10 pb-8">
                       <Knob color="bg-orange-500" rotation={280} label="PLANNING" />
                       <Knob color="bg-blue-500" rotation={320} label="PRODUCTION" />
                       <Knob color="bg-cyber-green" rotation={300} label="DISTRIBUTION" />
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <h2 className="text-4xl font-sans font-bold text-slate-800 tracking-tighter mb-1">INDEPENDENT</h2>
                        <h2 className="text-4xl font-sans font-bold text-slate-400 tracking-tighter mb-6">PRODUCER</h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center gap-2 mb-4 text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                                    <FileText size={12} /> Bio_Data.txt
                                </div>
                                <p className="font-mono text-sm leading-7 text-slate-700">
                                    我是一个全案播客制作人，一个人就能搞定策划、制作、传播全流程。
                                    <br/><br/>
                                    截止目前已制作了 <strong className="bg-yellow-200 px-1">11 档</strong> 音视频节目，涉猎话题包括但不限于商业科技、女性主义、文化艺术。
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#e4e4e7] p-4 rounded-lg">
                                    <h3 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-3">Clients</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['腾讯公关', '腾讯雇主品牌', '优酷人文', '42章经'].map(c => (
                                            <span key={c} className="bg-white px-2 py-1 text-[10px] font-bold text-slate-700 shadow-sm border border-slate-200">{c}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#e4e4e7] p-4 rounded-lg flex items-center justify-center">
                                    <div className="text-center transform rotate-[-2deg]">
                                        <div className="text-xs font-mono text-slate-500 mb-1">CUSTOMER RATING</div>
                                        <div className="text-lg font-black bg-cyber-green px-2 py-0.5 shadow-md border border-black inline-block">
                                            合作过的都说好！
                                        </div>
                                        <div className="flex justify-center gap-1 mt-1 text-orange-400">
                                            <Star size={10} fill="currentColor" />
                                            <Star size={10} fill="currentColor" />
                                            <Star size={10} fill="currentColor" />
                                            <Star size={10} fill="currentColor" />
                                            <Star size={10} fill="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center">
                        <div className="text-[10px] font-mono text-slate-400">STATUS: <span className="text-cyber-green font-bold animate-pulse">OPEN_TO_WORK</span></div>
                        <div className="font-mono text-[10px] text-slate-400">LOC: SHANGHAI / REMOTE</div>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Producer;
