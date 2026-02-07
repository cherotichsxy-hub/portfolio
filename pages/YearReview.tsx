
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Lock, Activity, Terminal, ArrowRight, RefreshCw, ShieldCheck, 
  Minus, ChevronDown, FolderOpen, X, Maximize2, AlertTriangle, CheckCircle2, Eye, EyeOff, LockKeyhole,
  Bug, Cpu, Scan, Check, Network, Target, Briefcase, User, MousePointerClick, FileText, ExternalLink
} from 'lucide-react';
import { 
  OKR_DATA, 
  ISSUES_DATA, 
  ABSTRACT_DETAILS, 
  STRATEGY_CORE_PRINCIPLE, 
  STRATEGY_MODULES, 
  StrategyItem,
  PASSCODE 
} from '../content/year-review/data';

// --- CONTENT SECTIONS ---

// 1. Mission Log (Dashboard)
const MissionDashboard = () => {
    const [activeId, setActiveId] = useState("M01");
    const activeData = OKR_DATA.find(d => d.id === activeId) || OKR_DATA[0];

    return (
        <div className="flex flex-col md:flex-row h-full gap-0 md:gap-8 p-4 md:p-8">
            {/* Sidebar List */}
            <div className="w-full md:w-1/4 h-auto md:h-full flex md:flex-col gap-2 border-b md:border-b-0 md:border-r border-black/10 pb-4 md:pb-0 md:pr-4 overflow-x-auto md:overflow-visible">
                 {OKR_DATA.map(item => (
                     <button 
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`
                            text-left p-4 transition-all shrink-0 md:shrink rounded-sm
                            ${activeId === item.id 
                                ? 'bg-black text-white shadow-[4px_4px_0px_0px_#ccff00]' 
                                : 'bg-slate-50 border border-black/10 hover:bg-black/5 text-slate-500'}
                        `}
                     >
                         <div className="font-mono text-[10px] font-bold uppercase mb-1 opacity-70">{item.id}</div>
                         <div className="font-black text-sm uppercase leading-tight whitespace-nowrap">{item.subtitle}</div>
                     </button>
                 ))}
            </div>

            {/* Main Content Stream */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar md:pl-4 pt-4 md:pt-0">
                 <AnimatePresence mode="wait">
                     <motion.div
                        key={activeId}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                     >
                         <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                             <h3 className="text-2xl md:text-3xl font-bold leading-tight max-w-2xl text-slate-800">
                                 {activeData.objective}
                             </h3>
                             
                             {/* Prominent Rating Badge */}
                             <div className="flex flex-col items-end shrink-0">
                                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Performance Rating</span>
                                <div className="font-mono text-4xl font-black bg-black text-cyber-green px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#ccff00] rotate-[-2deg]">
                                    {activeData.score}
                                </div>
                             </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white p-6 border border-black/10 rounded-lg">
                             <div>
                                 <div className="font-mono text-[10px] font-bold uppercase text-slate-400 mb-4 border-b border-black/10 pb-2 flex items-center gap-2">
                                     <Terminal size={12} /> Key Actions
                                 </div>
                                 <ul className="space-y-3">
                                     {activeData.actions.map((act, i) => (
                                         <li key={i} className="text-sm font-medium flex items-start gap-3 text-slate-700">
                                             <div className="w-1.5 h-1.5 bg-black mt-1.5 rounded-full shrink-0"></div>
                                             {act}
                                         </li>
                                     ))}
                                 </ul>
                             </div>
                             <div>
                                 <div className="font-mono text-[10px] font-bold uppercase text-slate-400 mb-4 border-b border-black/10 pb-2 flex items-center gap-2">
                                     <Activity size={12} /> Results
                                 </div>
                                 <div className="space-y-3">
                                     {activeData.results.map((res, i) => (
                                         <div key={i} className={`p-3 text-sm border-l-2 ${res.type === 'positive' ? 'border-green-500 bg-green-50/50' : res.type === 'negative' ? 'border-red-500 bg-red-50/50' : 'border-yellow-500 bg-yellow-50/50'}`}>
                                             {res.text}
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     </motion.div>
                 </AnimatePresence>
            </div>
        </div>
    )
};

// 2. Abstract (Word Search Puzzle)
const WordSearchPuzzle = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Optimized for the window aspect ratio (approx 16:9) to fill space
    // Increased density to cover the full window
    const GRID_COLS = 20;
    const GRID_ROWS = 12;

    const placements = [
        { id: 'abs_1', word: 'HIGHSPEED', row: 2, col: 2 },
        { id: 'abs_2', word: 'PASSION', row: 5, col: 9 },
        { id: 'abs_3', word: 'IMMATURE', row: 8, col: 3 },
        { id: 'abs_4', word: 'REALITY', row: 10, col: 12 },
    ];

    // Generate grid state
    const grid = useMemo(() => {
        const cells = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));
        
        // Place keywords
        placements.forEach(p => {
            for (let i = 0; i < p.word.length; i++) {
                if (p.col + i < GRID_COLS) {
                     cells[p.row][p.col + i] = { char: p.word[i], id: p.id, index: i, length: p.word.length };
                }
            }
        });

        // Fill randomness
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (!cells[r][c]) {
                    cells[r][c] = { 
                        char: chars[Math.floor(Math.random() * chars.length)], 
                        id: null 
                    };
                }
            }
        }
        return cells;
    }, []);

    const activeItem = ABSTRACT_DETAILS.find(i => i.id === activeId);

    return (
        <div className="w-full h-full relative bg-white overflow-hidden flex flex-col select-none">
            
            {/* THE PUZZLE GRID */}
            <div className="w-full h-full grid" style={{ 
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)` 
            }}>
                {grid.map((row, rIndex) => (
                    row.map((cell: any, cIndex: number) => {
                        const isKeyword = !!cell.id;
                        const isActive = activeId === cell.id;
                        const isRelated = activeId && activeId === cell.id;
                        
                        // If something is active, dim everything else
                        const isDimmed = activeId && !isActive; 

                        return (
                            <motion.div
                                key={`${rIndex}-${cIndex}`}
                                onClick={() => isKeyword && setActiveId(cell.id)}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: isDimmed ? 0.05 : 1, // Almost invisible when something else is active
                                    backgroundColor: isActive ? '#000' : 'transparent',
                                    color: isActive ? '#00FF41' : isKeyword ? '#000' : '#f1f5f9', // Active: Green, Keyword: Black, Noise: Very Light Gray
                                    fontWeight: isKeyword || isActive ? 900 : 400,
                                }}
                                transition={{ delay: (rIndex * 0.02) + (cIndex * 0.01) }}
                                className={`
                                    w-full h-full
                                    text-base md:text-2xl 
                                    font-mono flex items-center justify-center
                                    ${isKeyword ? 'cursor-pointer z-10' : 'cursor-default z-0'}
                                    ${isKeyword && !isActive ? 'hover:bg-gray-50' : ''}
                                `}
                            >
                                {cell.char}
                            </motion.div>
                        );
                    })
                ))}
            </div>

            {/* DETAIL OVERLAY */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="absolute inset-4 md:inset-12 bg-white border-2 border-black shadow-[15px_15px_0_0_rgba(0,0,0,1)] z-30 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-black text-white p-4 md:p-6 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-cyber-green text-black rounded-sm shadow-[4px_4px_0_0_#fff]">
                                    {activeItem.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                                        {activeItem.keyword}
                                    </h2>
                                    <span className="font-mono text-xs md:text-sm text-slate-400 uppercase tracking-[0.3em] font-bold">
                                        {activeItem.cn}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setActiveId(null)}
                                className="hover:text-cyber-green transition-colors p-2"
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                             <div className="space-y-8 max-w-4xl mx-auto">
                                {activeItem.content.map((block, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-shadow">
                                        <div className="flex items-center gap-3 mb-4 border-b-2 border-black/5 pb-3">
                                            <div className="w-3 h-3 bg-cyber-green border border-black rounded-full"></div>
                                            <h4 className="font-mono text-sm font-black uppercase text-slate-900 tracking-widest">
                                                {block.title}
                                            </h4>
                                        </div>
                                        <p className="text-base md:text-xl leading-relaxed font-medium text-slate-800">
                                            {block.text}
                                        </p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// 3. System Diagnostics (Fixed, Interconnected Layout)
const SystemDiagnostics = () => {
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
    const [patchedIssues, setPatchedIssues] = useState<Record<string, boolean>>({});
    const [isCostRevealed, setIsCostRevealed] = useState(false);
    const [patchingState, setPatchingState] = useState<'idle' | 'patching' | 'complete'>('idle');

    // Reset interaction states when opening new modal
    useEffect(() => {
        setIsCostRevealed(false);
        setPatchingState('idle');
    }, [selectedIssueId]);

    const handlePatch = (id: string) => {
        setPatchingState('patching');
        setTimeout(() => {
            setPatchedIssues(prev => ({ ...prev, [id]: true }));
            // Skip the "Complete" animation state, go straight to "Complete" visually but with guide
            setPatchingState('complete');
        }, 1500);
    };

    const selectedIssue = ISSUES_DATA.find(i => i.id === selectedIssueId);
    const allPatched = ISSUES_DATA.every(i => patchedIssues[i.id]);

    // Fixed Positions for the 3 Nodes to form a triangle
    const POSITIONS = [
        { id: 'loop_1', top: '35%', left: '50%' },      // Top Center
        { id: 'loop_2', top: '65%', left: '35%' },      // Bottom Left
        { id: 'loop_3', top: '65%', left: '65%' },      // Bottom Right
    ];

    // GLOBAL THEME VARIABLES
    // When all patched: Green Theme. When not: Red Theme.
    const themeColor = allPatched ? '#00ff41' : '#ef4444'; // Cyber Green vs Red
    const themeBg = allPatched ? '#020f02' : '#0f0202'; // Dark Green vs Dark Red background

    return (
        <motion.div 
            className="relative w-full h-full overflow-hidden select-none font-mono transition-colors duration-1000"
            animate={{ backgroundColor: themeBg }}
        >
            {/* Background Layer: Grid & Radar */}
            <div className="absolute inset-0 z-0">
                {/* Grid Pattern */}
                <motion.div 
                    className="absolute inset-0 bg-[size:30px_30px]"
                    animate={{ 
                        backgroundImage: `linear-gradient(rgba(${allPatched ? '0,255,65' : '239,68,68'},0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(${allPatched ? '0,255,65' : '239,68,68'},0.05) 1px, transparent 1px)`
                    }}
                    transition={{ duration: 1 }}
                />
                
                {/* Radar Scan Line */}
                <motion.div 
                    animate={{ 
                        top: ['0%', '100%'],
                        boxShadow: `0 0 20px rgba(${allPatched ? '0,255,65' : '239,68,68'},0.5)`
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className={`absolute w-full h-1 z-0 pointer-events-none ${allPatched ? 'bg-cyber-green/30' : 'bg-red-500/30'}`}
                />
            </div>

            {/* CORE LOGIC (Background Watermark - Left Top) */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none opacity-50 mix-blend-plus-lighter">
                 <div className="font-mono text-sm md:text-base leading-relaxed text-slate-500">
                    <span style={{ color: allPatched ? '#00ff41' : '#9ca3af' }} className="transition-colors duration-500">if</span> <span className="text-slate-600">(</span><span className="text-slate-400">life</span><span className="text-slate-600">.</span><span className="text-yellow-100/80">gives</span><span className="text-slate-600">(</span><span className="text-red-400/80">"bugs"</span><span className="text-slate-600">)):</span>
                    <br/>
                    <span className="inline-block w-6"></span><span className="text-purple-400/80">debug()</span>
                    <br/>
                    <span style={{ color: allPatched ? '#00ff41' : '#9ca3af' }} className="transition-colors duration-500">else</span><span className="text-slate-600">:</span>
                    <br/>
                    <span className="inline-block w-6"></span><span className="text-purple-400/80">keep_coding()</span>
                </div>
            </div>

            {/* CONNECTING LINES (The "Interconnection") */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="lineGradSecure" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00ff41" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#00ff41" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                {/* Draw triangle connections */}
                <motion.line 
                    x1="50%" y1="35%" x2="35%" y2="65%" 
                    stroke={patchedIssues['loop_1'] && patchedIssues['loop_2'] ? "url(#lineGradSecure)" : "url(#lineGrad)"} 
                    strokeWidth="2" strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.line 
                    x1="35%" y1="65%" x2="65%" y2="65%" 
                    stroke={patchedIssues['loop_2'] && patchedIssues['loop_3'] ? "url(#lineGradSecure)" : "url(#lineGrad)"} 
                    strokeWidth="2" strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.line 
                    x1="65%" y1="65%" x2="50%" y2="35%" 
                    stroke={patchedIssues['loop_3'] && patchedIssues['loop_1'] ? "url(#lineGradSecure)" : "url(#lineGrad)"} 
                    strokeWidth="2" strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* FIXED NODES (The Issues/Bugs) */}
            <div className="absolute inset-0 z-20 overflow-hidden">
                {ISSUES_DATA.map((issue, index) => {
                    const isPatched = patchedIssues[issue.id];
                    // Find position or default to center
                    const pos = POSITIONS.find(p => p.id === issue.id) || { top: '50%', left: '50%' };
                    
                    return (
                        <FixedNode 
                            key={issue.id}
                            issue={issue}
                            isPatched={isPatched}
                            onClick={() => setSelectedIssueId(issue.id)}
                            position={pos}
                        />
                    );
                })}
            </div>

            {/* STATUS HUD (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 border-t flex items-center justify-between px-6 z-30 transition-colors duration-500" style={{ borderColor: `${themeColor}4D` }}>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${allPatched ? 'bg-cyber-green' : 'bg-red-500 animate-pulse'}`}></div>
                        <span className={allPatched ? "text-cyber-green" : "text-red-500 font-bold"}>
                            {allPatched ? "SYSTEM_OPTIMIZED" : "CRITICAL_ERRORS_FOUND"}
                        </span>
                    </div>
                </div>
                <div className="text-[10px] animate-pulse" style={{ color: themeColor }}>
                    {allPatched ? "ALL_SYSTEMS_GO" : "DIAGNOSTIC_MODE_ACTIVE..."}
                </div>
            </div>

            {/* DIAGNOSTIC MODAL */}
            <AnimatePresence>
                {selectedIssue && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setSelectedIssueId(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-3xl bg-[#0f0f0f] border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row max-h-[85vh] relative"
                            style={{ borderColor: themeColor }}
                        >
                            {/* CRT Scanline Overlay on Modal */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none z-50 opacity-20"></div>

                            {/* Left: The Problem (Terminal Style) */}
                            <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-cyber-green/30 relative flex flex-col bg-black/50">
                                <div className="absolute top-0 left-0 bg-red-500 text-black px-3 py-1 text-xs font-bold">ERROR_LOG</div>
                                
                                <div className="mt-8 flex-1">
                                    <h2 className="text-2xl font-black text-red-500 mb-2 uppercase tracking-tight glitch-text">
                                        {selectedIssue.title}
                                    </h2>
                                    <div className="text-xs text-red-400/70 mb-8 font-mono border-b border-red-500/20 pb-4">
                                        > DETECTED: {selectedIssue.code}
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-bold text-xs uppercase mb-2 flex items-center gap-2 text-slate-300">
                                                <Activity size={14} /> Manifestation
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedIssue.symptoms.map((s, i) => (
                                                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                                                        <span className="text-red-500 mt-1">-</span> {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="relative">
                                            <h4 className="font-bold text-xs uppercase mb-2 flex items-center gap-2 text-red-400">
                                                <AlertTriangle size={14} /> System Cost
                                            </h4>
                                            
                                            <div className="relative min-h-[60px]">
                                                <div className={`transition-all duration-500 ease-out ${isCostRevealed ? 'blur-0 opacity-100' : 'blur-md opacity-20 select-none'}`}>
                                                    <p className="text-sm font-mono text-red-200 bg-red-900/20 p-3 border border-red-500/30">
                                                        {selectedIssue.cost}
                                                    </p>
                                                </div>

                                                {!isCostRevealed && (
                                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                                        <button 
                                                            onClick={() => setIsCostRevealed(true)}
                                                            className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500 px-4 py-2 text-xs font-bold uppercase transition-all flex items-center gap-2"
                                                        >
                                                            <Eye size={14} /> Decrypt
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: The Solution (Patch Interface) */}
                            <div className="w-full md:w-1/2 p-8 bg-[#111] relative flex flex-col">
                                <button 
                                    onClick={() => setSelectedIssueId(null)}
                                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex-1 flex flex-col justify-center items-center">
                                    {patchedIssues[selectedIssue.id] ? (
                                        // POST-PATCH: SHOW ACTION GUIDE DIRECTLY
                                        <div className="text-center w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                                            <div className="text-cyber-green mb-4 animate-bounce">
                                                <ShieldCheck size={48} />
                                            </div>
                                            <h3 className="text-xl font-bold text-cyber-green uppercase mb-1 tracking-widest">
                                                PATCH SCHEDULED
                                            </h3>
                                            <div className="w-16 h-1 bg-cyber-green mb-8"></div>
                                            
                                            <div className="bg-cyber-green/10 border border-cyber-green p-6 w-full text-left relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 bg-cyber-green text-black text-[9px] font-bold px-2 py-0.5">ACTION_GUIDE</div>
                                                <h4 className="font-mono text-xs text-cyber-green/70 uppercase mb-2">Recommended Protocol:</h4>
                                                <p className="text-white text-base md:text-lg font-bold leading-relaxed">
                                                    {selectedIssue.direction}
                                                </p>
                                                {/* Scanline effect inside the card */}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                                            </div>

                                            <button 
                                                onClick={() => setSelectedIssueId(null)}
                                                className="mt-8 text-slate-500 text-xs font-mono hover:text-white flex items-center gap-2 hover:underline"
                                            >
                                                CLOSE_TERMINAL <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        // PRE-PATCH STATES
                                        <>
                                            {patchingState === 'idle' && (
                                                <div className="text-center w-full">
                                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700 animate-pulse">
                                                        <Bug size={32} className="text-red-500" />
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-300 uppercase mb-8">
                                                        Solution Available
                                                    </h3>
                                                    <button 
                                                        onClick={() => handlePatch(selectedIssue.id)}
                                                        className="w-full py-4 bg-cyber-green text-black font-bold text-lg hover:bg-white transition-all border-2 border-transparent hover:border-cyber-green shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center justify-center gap-3 group"
                                                    >
                                                        <Terminal size={20} className="group-hover:rotate-90 transition-transform" />
                                                        RUN_DEBUGGER.EXE
                                                    </button>
                                                </div>
                                            )}

                                            {patchingState === 'patching' && (
                                                <div className="w-full space-y-4">
                                                    <div className="font-mono text-xs text-cyber-green space-y-1">
                                                        <div>> INTIALIZING PATCH...</div>
                                                        <div>> REWRITING KERNEL...</div>
                                                        <div>> OPTIMIZING...</div>
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-800 overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                                            className="h-full bg-cyber-green shadow-[0_0_10px_#00ff41]"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Component for Fixed Virus/Patched Nodes
const FixedNode = ({ issue, isPatched, onClick, position }: { issue: any, isPatched: boolean, onClick: () => void, position: { top: string, left: string } }) => {
    
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ 
                scale: 1,
                top: position.top,
                left: position.left,
                x: "-50%",
                y: "-50%"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onClick={onClick}
            className={`
                absolute cursor-pointer flex flex-col items-center justify-center p-4 border-2 backdrop-blur-sm transition-all duration-500 group
                ${isPatched 
                    ? 'w-48 h-20 bg-cyber-green/10 border-cyber-green hover:bg-cyber-green/20' 
                    : 'w-40 h-40 bg-red-900/10 border-red-500 hover:bg-red-900/30 hover:scale-105 z-20 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]'}
            `}
        >
            <div className="flex items-center gap-2 mb-1">
                {isPatched ? <ShieldCheck size={16} className="text-cyber-green"/> : <Bug size={24} className="text-red-500 animate-pulse"/>}
                <span className={`font-bold text-xs uppercase tracking-widest ${isPatched ? 'text-cyber-green' : 'text-red-500'}`}>
                    {isPatched ? 'SECURE' : 'WARNING'}
                </span>
            </div>
            
            <h3 className={`font-black text-center uppercase leading-none ${isPatched ? 'text-white text-sm' : 'text-red-500 text-lg'}`}>
                {issue.title}
            </h3>

            {!isPatched && (
                <div className="mt-3 px-3 py-1 bg-red-500 text-black text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Click to Debug
                </div>
            )}
            
            {/* Connector Dots for the SVG lines */}
            <div className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full ${isPatched ? 'bg-cyber-green' : 'bg-red-500'}`}></div>

            {/* Corner Accents */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isPatched ? 'border-cyber-green' : 'border-red-500'}`}></div>
            <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isPatched ? 'border-cyber-green' : 'border-red-500'}`}></div>
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isPatched ? 'border-cyber-green' : 'border-red-500'}`}></div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isPatched ? 'border-cyber-green' : 'border-red-500'}`}></div>
        </motion.div>
    );
};

// 4. Strategy System (With Modal)

const StrategyModal = ({ item, onClose }: { item: StrategyItem, onClose: () => void }) => {
    // Colors mapped to themes
    const colors = {
        blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', shadow: 'shadow-blue-500' },
        red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', shadow: 'shadow-red-500' },
        orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', shadow: 'shadow-orange-500' },
        green: { bg: 'bg-cyber-green', text: 'text-cyber-green', border: 'border-cyber-green', shadow: 'shadow-cyber-green' },
    };
    const c = colors[item.theme];
    const hasPositioning = !!item.positioning;
    const hasMetric = !!item.coreMetric;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-slate-900 border-2 border-slate-500 shadow-2xl flex flex-col relative overflow-hidden max-h-[90vh]"
            >
                {/* Header Line */}
                <div className={`h-1.5 w-full shrink-0 ${c.bg}`}></div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors hover:bg-white/10 rounded-sm z-30"
                >
                    <X size={20} />
                </button>

                {/* Header Section */}
                <div className="p-6 md:p-8 bg-black/40 border-b border-white/10 relative shrink-0">
                    <div className="flex items-start gap-5">
                        <div className={`w-14 h-14 ${c.bg} text-white flex items-center justify-center rounded-lg border-2 border-white/20 shadow-lg shrink-0`}>
                            {item.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    ID: {item.id}
                                </span>
                                <div className={`px-2 py-0.5 rounded text-[9px] font-bold border border-white/10 ${c.bg} bg-opacity-20 text-white/90`}>
                                    ACTIVE
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-none mb-1">
                                {item.title}
                            </h2>
                            <div className={`text-xs font-mono font-bold ${c.text} uppercase tracking-widest`}>
                                {item.subtitle}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-slate-900/50">
                    <div className="space-y-6">
                        
                        {/* Core Goal & Positioning */}
                        <div className="space-y-4">
                             {hasPositioning && (
                                <div>
                                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1 flex items-center gap-2">
                                        <Target size={12} /> Positioning
                                    </h4>
                                    <p className="text-base font-bold text-white leading-tight">
                                        {item.positioning}
                                    </p>
                                </div>
                            )}
                            <div>
                                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1 flex items-center gap-2">
                                    <CheckCircle2 size={12} /> Core Goal
                                </h4>
                                <p className="text-lg font-bold text-white leading-tight">
                                    {item.coreGoal}
                                </p>
                            </div>
                        </div>

                        {/* Value Matrix */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-500/5 border-l-2 border-blue-500 p-4">
                                <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase mb-2">Value to Company</h4>
                                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                                    {item.valueToCompany}
                                </p>
                            </div>
                            <div className="bg-green-500/5 border-l-2 border-green-500 p-4">
                                <h4 className="text-[10px] font-mono font-bold text-green-400 uppercase mb-2">Value to Self</h4>
                                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                                    {item.valueToSelf}
                                </p>
                            </div>
                        </div>

                        {/* Risk & Strategy Footer */}
                        <div className="pt-4 border-t border-white/5">
                             {hasMetric && (
                                <div className="mb-4">
                                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">Core Metric</h4>
                                    <div className="text-sm font-mono font-bold text-cyber-green">
                                        {item.coreMetric}
                                    </div>
                                </div>
                            )}
                            
                            <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-sm">
                                <div className="flex items-center gap-2 mb-2 text-red-400">
                                    <AlertTriangle size={12}/> 
                                    <span className="text-[10px] font-mono font-bold uppercase">Risk & Mitigation</span>
                                </div>
                                <p className="text-xs text-red-200/80 mb-3 leading-relaxed">
                                    Risk: {item.risk}
                                </p>
                                <div className="flex items-center gap-2 pt-3 border-t border-red-500/20">
                                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded uppercase font-bold">Strategy</span>
                                    <span className="text-xs text-white font-medium">{item.strategy}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// 4. Strategy (Revised Grid)
const StrategyCard = ({ item, heightClass = "h-full", isActive, onClick }: { item: StrategyItem, heightClass?: string, isActive: boolean, onClick: () => void }) => {
    // Colors mapped to themes
    const colors = {
        blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', shadow: 'shadow-blue-500' },
        red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', shadow: 'shadow-red-500' },
        orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', shadow: 'shadow-orange-500' },
        green: { bg: 'bg-cyber-green', text: 'text-cyber-green', border: 'border-cyber-green', shadow: 'shadow-cyber-green' },
    };
    const c = colors[item.theme];

    return (
        <div 
            className={`
                relative ${heightClass} 
                overflow-hidden transition-all duration-500 cursor-pointer border
                ${isActive 
                    ? `${c.bg} border-transparent` 
                    : 'bg-white border-slate-200 hover:border-black'
                }
            `}
            onClick={onClick}
        >
             {/* --- CARD CONTENT --- */}
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className={`
                    p-4 rounded-full border-2 mb-4 transition-all duration-500 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]
                    ${isActive 
                        ? 'bg-white text-black border-white scale-110' 
                        : `${c.bg} text-white border-black`
                    }
                `}>
                    {item.icon}
                </div>
                
                <h3 className={`
                    text-xl font-black uppercase tracking-tight transition-colors duration-500
                    ${isActive ? 'text-white' : 'text-black'}
                `}>
                    {item.title}
                </h3>
                
                <div className={`
                    text-[10px] font-mono font-bold uppercase tracking-widest mt-2 transition-colors duration-500
                    ${isActive ? 'text-white/70' : 'text-slate-400'}
                `}>
                    {isActive ? 'DECRYPTED // VIEWING' : item.subtitle}
                </div>
                
                {/* Click hint (Only when not active) */}
                {!isActive && (
                    <div className="absolute bottom-6 flex items-center gap-1 text-[9px] font-mono font-bold text-slate-300 opacity-0 animate-[pulse_2s_infinite] group-hover:opacity-100 transition-opacity">
                        <MousePointerClick size={10} />
                        <span>CLICK TO DECRYPT</span>
                    </div>
                )}
             </div>
             
             {/* Decorative Scanline (Active Only) */}
             {isActive && (
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-30"></div>
             )}
        </div>
    );
};

const StrategyGrid = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyItem | null>(null);

    return (
        <div className="w-full h-full bg-[#f3f4f6] flex flex-col relative overflow-hidden">
            {/* 1. TOP BANNER: CORE PRINCIPLE */}
            <div className="h-20 bg-black text-white shrink-0 flex items-center justify-center px-6 border-b-4 border-cyber-green shadow-lg z-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#333_10px,#333_20px)]"></div>
                
                <div className="text-center relative z-10">
                     <div className="flex items-center justify-center gap-2 text-cyber-green text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-1">
                        <Target size={12} /> Strategic Core
                     </div>
                     <h1 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                         {STRATEGY_CORE_PRINCIPLE}
                     </h1>
                </div>
            </div>

            {/* 2. MAIN GRID LAYOUT */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="h-full w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 border-2 border-black bg-black shadow-[10px_10px_0_0_rgba(0,0,0,0.1)]">
                    
                    {/* COLUMN 1: NEWSLETTER (Information Asset) */}
                    <div className="w-full md:w-1/3 md:border-r-2 border-black">
                        <StrategyCard 
                            item={STRATEGY_MODULES.newsletter} 
                            isActive={selectedStrategy?.id === STRATEGY_MODULES.newsletter.id}
                            onClick={() => setSelectedStrategy(STRATEGY_MODULES.newsletter)}
                        />
                    </div>

                    {/* COLUMN 2: CONNECTION (RedNote + Events) */}
                    <div className="w-full md:w-1/3 flex flex-col md:border-r-2 border-black">
                        <div className="h-1/2 border-b-2 border-black">
                             <StrategyCard 
                                item={STRATEGY_MODULES.rednote} 
                                isActive={selectedStrategy?.id === STRATEGY_MODULES.rednote.id}
                                onClick={() => setSelectedStrategy(STRATEGY_MODULES.rednote)}
                             />
                        </div>
                        <div className="h-1/2">
                             <StrategyCard 
                                item={STRATEGY_MODULES.events} 
                                isActive={selectedStrategy?.id === STRATEGY_MODULES.events.id}
                                onClick={() => setSelectedStrategy(STRATEGY_MODULES.events)}
                             />
                        </div>
                    </div>

                    {/* COLUMN 3: EXPLORATION (Long Term) */}
                    <div className="w-full md:w-1/3">
                        <StrategyCard 
                            item={STRATEGY_MODULES.explore} 
                            isActive={selectedStrategy?.id === STRATEGY_MODULES.explore.id}
                            onClick={() => setSelectedStrategy(STRATEGY_MODULES.explore)}
                        />
                    </div>

                </div>
            </div>

            {/* 3. DETAILS MODAL */}
            <AnimatePresence>
                {selectedStrategy && (
                    <StrategyModal 
                        item={selectedStrategy} 
                        onClose={() => setSelectedStrategy(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


// --- DESKTOP UI COMPONENTS ---

// 1. Desktop Folder Icon
const DesktopFolder = ({ label, onClick, className = "", style = {} }: { label: string, onClick: () => void, className?: string, style?: any }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            onClick={onClick}
            className={`flex flex-col items-center gap-2 cursor-pointer w-24 group ${className}`}
            style={style}
        >
             <div className="relative w-20 h-16 md:w-24 md:h-20 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-2">
                {/* Back Plate */}
                <svg viewBox="0 0 100 80" className="w-full h-full overflow-visible">
                    {/* Shadow */}
                    <path d="M5 15 H95 V75 H5 Z" fill="rgba(0,0,0,0.2)" transform="translate(4,4)" />
                    {/* Back Folder */}
                    <path d="M0 10 C0 7 3 5 5 5 H35 L40 0 H95 C98 0 100 2 100 5 V75 C100 78 98 80 95 80 H5 C2 80 0 78 0 75 Z" fill="#2563eb" />
                    {/* Front Plate (lighter) */}
                    <path d="M0 25 C0 22 2 20 5 20 H95 C98 20 100 22 100 25 V75 C100 78 98 80 95 80 H5 C2 80 0 78 0 75 Z" fill="#60a5fa" />
                    {/* Highlight */}
                    <path d="M5 20 H95" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                </svg>
                {/* Notification Badge (optional) */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">1</span>
                </div>
             </div>
             
             {/* Label */}
             <div className="bg-black/80 px-2 py-0.5 rounded-sm backdrop-blur-sm border border-white/10 shadow-sm">
                 <span className="font-sans text-[10px] md:text-xs font-bold text-white tracking-wide text-center whitespace-nowrap block">
                     {label}
                 </span>
             </div>
        </motion.div>
    );
};

// 2. OS Window
interface OSWindowProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const OSWindow: React.FC<OSWindowProps> = ({ title, onClose, children }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            // Removed fixed positioning and transforms from here
            className="w-full h-full md:w-[900px] md:h-[600px] flex flex-col shadow-2xl z-[50] relative"
        >
            {/* Window Frame */}
            <div className="flex-1 flex flex-col bg-[#e5e5e5] rounded-lg border border-white/40 shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {/* Title Bar */}
                <div className="h-8 bg-gradient-to-b from-[#f6f6f6] to-[#dcdcdc] border-b border-[#a0a0a0] flex items-center justify-between px-3 shrink-0 select-none cursor-grab active:cursor-grabbing">
                    <div className="flex items-center gap-2">
                        {/* Traffic Lights */}
                        <div className="flex gap-1.5 group">
                            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:opacity-80">
                                <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                            </button>
                            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24] flex items-center justify-center">
                                <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                            </div>
                            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] flex items-center justify-center">
                                <Maximize2 size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="font-sans text-xs font-bold text-slate-600 drop-shadow-sm flex items-center gap-2">
                        <FolderOpen size={12} className="fill-blue-400 text-blue-500" />
                        {title}
                    </div>

                    <div className="w-10"></div> {/* Spacer for balance */}
                </div>

                {/* Toolbar (Fake) */}
                <div className="h-10 bg-[#f6f6f6] border-b border-[#a0a0a0] flex items-center px-4 gap-4 shrink-0">
                    <div className="flex gap-2 text-slate-400">
                         <ChevronDown size={16} />
                    </div>
                    <div className="h-5 w-[1px] bg-slate-300"></div>
                    <div className="flex gap-4 text-xs font-medium text-slate-600">
                        <span>Icon</span>
                        <span>List</span>
                        <span>Columns</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white overflow-hidden relative">
                    {children}
                </div>
                
                {/* Footer Status Bar */}
                <div className="h-6 bg-[#f6f6f6] border-t border-[#dcdcdc] flex items-center px-3 text-[10px] text-slate-500 font-mono">
                    <span>1 item selected</span>
                    <span className="ml-auto">1.2 GB available</span>
                </div>
            </div>
        </motion.div>
    );
};


// --- MAIN PAGE ---

const PasswordGuard = ({ onUnlock }: { onUnlock: () => void }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f4f4f5] z-[100] flex flex-col items-center justify-center font-mono">
       <div className="w-full max-w-sm p-8 bg-white border border-slate-200 shadow-xl rounded-xl">
          <div className="flex justify-center mb-6 text-slate-900">
             <Lock size={32} />
          </div>
          <h1 className="text-xl font-black text-center mb-2 uppercase tracking-tight">System Locked</h1>
          <p className="text-xs text-center text-slate-400 mb-8 font-bold">PLEASE ENTER CREDENTIALS</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
             <input 
               autoFocus
               type="password" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-center tracking-[0.5em] focus:outline-none focus:border-black transition-colors text-lg font-bold rounded-lg"
               placeholder="...."
             />
             <button 
                type="submit"
                className="bg-black text-white font-bold py-3 hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs rounded-lg"
             >
                {error ? "ACCESS DENIED" : "UNLOCK"}
             </button>
          </form>
       </div>
    </div>
  );
};

const YearReview: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null); // ID of active window
  
  if (!isUnlocked) {
    return <PasswordGuard onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900 font-sans pt-16 relative overflow-hidden">
      
      {/* 1. Desktop Wallpaper / Background Typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10 select-none">
           <div className="flex flex-col items-center leading-none tracking-tighter text-slate-900 mix-blend-multiply">
               <h1 className="text-[15vw] font-black">RECAP &</h1>
               <h1 className="text-[15vw] font-black">PLAN</h1>
               <h2 className="text-[4vw] font-mono font-bold tracking-[0.5em] mt-8 text-slate-400">2025 ARCHIVE</h2>
           </div>
      </div>

      {/* 2. Desktop Surface (The Folders) */}
      <div className="relative z-10 w-full h-[calc(100vh-64px)] p-4 md:p-12">
          
          {/* Scatter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 h-full gap-4 max-w-7xl mx-auto">
              
              {/* Folder 1: Top Left */}
              <div className="flex justify-center md:justify-start items-center md:items-start p-4 md:p-12">
                  <DesktopFolder 
                      label="01_OKR" 
                      onClick={() => setActiveWindow("execution")} 
                      className="rotate-[-3deg]"
                  />
              </div>

              {/* Folder 2: Top Right (Offset) */}
              <div className="flex justify-center md:justify-end items-center md:items-start p-4 md:pt-24 md:pr-12">
                   <DesktopFolder 
                      label="02_Keywords" 
                      onClick={() => setActiveWindow("mindset")} 
                      className="rotate-[2deg]"
                  />
              </div>

              {/* Folder 3: Bottom Left (Offset) */}
              <div className="flex justify-center md:justify-start items-center md:items-end p-4 md:pb-24 md:pl-16">
                   <DesktopFolder 
                      label="03_Diagnostics" 
                      onClick={() => setActiveWindow("diagnostics")} 
                      className="rotate-[4deg]"
                  />
              </div>

              {/* Folder 4: Bottom Right */}
              <div className="flex justify-center md:justify-end items-center md:items-end p-4 md:p-12">
                   <DesktopFolder 
                      label="04_Strategy" 
                      onClick={() => setActiveWindow("strategy")} 
                      className="rotate-[-2deg]"
                  />
              </div>

          </div>
      </div>

      {/* 3. Window Modals */}
      <AnimatePresence>
          {activeWindow && (
              // Added Flexbox centering to the container
              <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] flex items-center justify-center p-4 md:p-0" onClick={() => setActiveWindow(null)}>
                  {/* Prevent click propagation on window, also centering inside */}
                  <div onClick={(e) => e.stopPropagation()} className="w-full h-full md:w-auto md:h-auto flex items-center justify-center">
                      
                      {activeWindow === "execution" && (
                          <OSWindow title="OKR_Log.db" onClose={() => setActiveWindow(null)}>
                              <MissionDashboard />
                          </OSWindow>
                      )}

                      {activeWindow === "mindset" && (
                          <OSWindow title="Keywords_Abstract.txt" onClose={() => setActiveWindow(null)}>
                              <WordSearchPuzzle />
                          </OSWindow>
                      )}

                      {activeWindow === "diagnostics" && (
                          <OSWindow title="System_Diagnostics.exe" onClose={() => setActiveWindow(null)}>
                              <SystemDiagnostics />
                          </OSWindow>
                      )}

                      {activeWindow === "strategy" && (
                          <OSWindow title="2026_Strategy_Map.pdf" onClose={() => setActiveWindow(null)}>
                              <StrategyGrid />
                          </OSWindow>
                      )}
                  
                  </div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
};

export default YearReview;
