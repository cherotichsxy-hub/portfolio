
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Crosshair, ArrowRight, Lock } from 'lucide-react';

const LAYOUT_CONFIG = [
  // --- CLUSTER 1: CREATOR (Top Left) ---
  { 
    type: 'box',
    id: 'creator-box', 
    img: 'https://i.postimg.cc/HjGP4wjj/590e2af7aa949096dd5a94cfea20ce23.png', 
    top: '15%', 
    left: '18%', 
    width: '160px', 
    height: '160px', 
    depth: 50,
    rotate: -3,
    isNav: false, 
  },
  {
    type: 'action-button', 
    lines: ['Currently', '@42章经'],
    top: '20%',
    left: '32%', 
    depth: 100,
    rotate: 2,
    isNav: true,
    path: '/creator',
  },

  // --- CLUSTER 2: SIDE PROJECTS (Middle) ---
  { 
    type: 'box', 
    id: 'sp-box', 
    img: 'https://i.postimg.cc/HLH1CgY6/IMG_5742.jpg', 
    top: '48%', 
    left: '26%', 
    width: '150px', // 3:4 Aspect Ratio
    height: '200px', // 3:4 Aspect Ratio
    depth: 90,
    rotate: 3,
    isNav: true,
    path: '/explorer',
    sticker: {
      text: 'SIDE_PROJECTS',
      color: 'bg-thin-lime',
      style: 'tag',
      relativeRotate: -8, 
      offset: { top: '-20px', left: '-20px' }
    }
  },

  // --- CLUSTER 3: PRODUCER (Bottom Left) ---
  { 
    type: 'box', 
    id: 'producer-box',
    img: 'https://i.postimg.cc/Xv8Sjzqs/Live_20250414175106096.avif', 
    top: '66%', 
    left: '18%', 
    width: '160px', // 1:1 Aspect Ratio
    height: '160px', // 1:1 Aspect Ratio
    depth: 0, // Set to 0 to sit behind the portrait (which is at depth 10)
    rotate: -5,
    isNav: false,
  },
  {
    type: 'bar-label',
    text: 'Independent Producer',
    top: '72%',
    left: '29%',
    depth: 100,
    rotate: -2,
    isNav: true,
    path: '/producer',
    linkedId: 'producer-box'
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [3, -3]); 
  const rotateY = useTransform(smoothX, [0, 1], [-3, 3]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-full w-full overflow-hidden flex items-center justify-center perspective-container relative"
      style={{ perspective: '1200px' }}
    >
      {/* 3D SCENE WRAPPER */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full max-w-[1400px] flex items-center justify-center"
      >
        
        {/* --- LAYER 1: PORTRAIT (Far Left) - INTERACTIVE ENTRY POINT --- */}
        <motion.div 
          style={{ transform: 'translateZ(10px)' }}
          // UPDATED: 
          // 1. Moved left: -left-[6%] (mobile) / -left-[2%] (desktop) to clear center area.
          // 2. Reduced width: w-[40vw] -> w-[30vw] to tighten the container.
          // 3. pointer-events-none: The container NO LONGER captures clicks/hovers.
          className="absolute -left-[6%] md:-left-[2%] bottom-0 h-[85%] w-[40vw] md:w-[30vw] flex items-end justify-center z-10 pointer-events-none"
        >
           {/* Secret Label on Hover */}
           <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isPortraitHovered ? 1 : 0, y: isPortraitHovered ? 0 : 10 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black text-cyber-green border border-cyber-green px-4 py-2 font-mono text-xs font-bold tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,65,0.4)] whitespace-nowrap"
           >
              <Lock size={12} /> RESTRICTED_ACCESS
           </motion.div>

           {/* UPDATED: Interaction events moved strictly to the IMG tag */}
           <img 
              src="https://i.postimg.cc/Wp6Z3NT3/IMG-9304-removebg-preview.png"
              alt="Portrait"
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
              onClick={() => navigate('/review')}
              className={`
                h-full w-auto object-contain object-bottom relative z-10 transition-all duration-500 ease-out cursor-pointer pointer-events-auto
                ${isPortraitHovered 
                  ? 'grayscale-0 contrast-100 brightness-110 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-[1.02]' 
                  : 'grayscale contrast-125 brightness-110 mix-blend-multiply opacity-90 drop-shadow-2xl'
                }
              `}
           />
        </motion.div>

        {/* --- LAYER 2: HUGE TEXT (Far Right) --- */}
        <motion.div 
          style={{ transform: 'translateZ(-20px)' }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-0 flex flex-col items-end text-right pointer-events-none select-none"
        >
          <h1 className="font-sans font-black text-[15vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black to-slate-600 opacity-80 uppercase drop-shadow-sm">
            Port<br/>folio
          </h1>
        </motion.div>

        {/* --- LAYER 3: SCATTERED FLOATING UI (Cluster Left) --- */}
        <div className="absolute inset-0 pointer-events-none">
          {LAYOUT_CONFIG.map((item, index) => {
            const isHighlighted = !!(item.id && hoveredId === item.id);
            return (
              <FloatingElement
                key={index}
                config={item}
                isHighlighted={isHighlighted}
                onHover={(isHovering) => {
                   if (isHovering) {
                      if (item.id) setHoveredId(item.id);
                      if (item.linkedId) setHoveredId(item.linkedId);
                   } else {
                      setHoveredId(null);
                   }
                }}
                onClick={() => {
                  if (item.isNav && item.path) {
                    navigate(item.path);
                  }
                }}
              />
            );
          })}
        </div>
        
      </motion.div>
    </div>
  );
};

// --- SUB COMPONENTS ---

interface FloatingElementProps {
  config: any;
  isHighlighted: boolean;
  onHover: (state: boolean) => void;
  onClick: () => void;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ config, isHighlighted, onHover, onClick }) => {
  const isInteractive = !!config.isNav;

  // Merge rotate and translateZ into a single transform string to avoid conflicts
  // and ensure correct composition order.
  const style: React.CSSProperties = {
    top: config.top,
    left: config.left,
    width: config.width || 'auto',
    height: config.height || 'auto',
    transform: `translateZ(${config.depth}px) rotate(${config.rotate}deg)`,
  };

  if (config.type === 'action-button') {
    return (
      <motion.div 
        style={style as any} 
        className="absolute pointer-events-auto z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onClick}
      >
        <button className="bg-white border-2 border-black px-4 py-2 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-thin-lime transition-all duration-200">
           <div className="flex flex-col items-start text-left">
             {config.lines.map((line: string, i: number) => (
                <span key={i} className={`font-mono font-bold leading-none ${i === 0 ? 'text-xs text-gray-500' : 'text-sm text-black'}`}>
                  {line}
                </span>
             ))}
           </div>
           <div className="bg-black text-white p-1 rounded-full">
              <ArrowRight size={14} />
           </div>
        </button>
      </motion.div>
    );
  }

  if (config.type === 'bar-label') {
     return (
       <motion.div 
         style={style as any} 
         className={`absolute pointer-events-auto transition-transform ${isInteractive ? 'cursor-pointer hover:scale-105' : ''}`}
         onMouseEnter={() => onHover(true)}
         onMouseLeave={() => onHover(false)}
         onClick={onClick}
       >
         <div className="bg-white border border-black px-3 py-1 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:bg-black hover:text-white transition-colors">
            <div className={`w-2 h-2 rounded-full ${isInteractive ? 'bg-thin-lime' : 'bg-black group-hover:bg-white'}`} />
            <span className="font-mono font-bold text-xs uppercase tracking-wider">{config.text}</span>
            {isInteractive && <ArrowRight size={12} className="ml-1" />}
         </div>
       </motion.div>
     );
  }

  if (config.type === 'box') {
    return (
      <motion.div
        style={style as any}
        className={`absolute pointer-events-auto transition-transform duration-300 ${isInteractive ? 'cursor-pointer hover:z-50' : 'z-auto'}`}
        whileHover={isInteractive ? { scale: 1.05, rotate: 0, transition: { duration: 0.2 } } : {}}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={onClick}
      >
        <div className={`group relative w-full h-full bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${isInteractive ? 'hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]' : ''}`}>
            <div className="absolute top-1 left-1 flex gap-1 z-10">
              <div className="w-1 h-1 bg-white border border-black"></div>
              <div className="w-1 h-1 bg-white border border-black"></div>
            </div>

            {config.sticker && (
              <div 
                 className={`absolute z-30 px-2 py-1 ${config.sticker.color} border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${config.sticker.style === 'tag' ? 'font-black text-sm' : 'font-mono font-bold text-xs'}`}
                 style={{
                   top: config.sticker.offset?.top || '-10px',
                   left: config.sticker.offset?.left || '-10px',
                   transform: `rotate(${config.sticker.relativeRotate || 0}deg)`
                 }}
              >
                <span className="tracking-tighter uppercase whitespace-nowrap">{config.sticker.text}</span>
              </div>
            )}

            <div className="w-full h-full p-1 bg-white">
                <div className="w-full h-full relative overflow-hidden border border-black bg-slate-200">
                  <img 
                    src={config.img} 
                    alt="" 
                    className={`w-full h-full object-cover object-center transition-all duration-500 ${isHighlighted ? 'grayscale-0 opacity-100' : 'grayscale opacity-80 brightness-110'}`} 
                  />
                  {/* Image halftone overlay effect */}
                  <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none mix-blend-overlay"></div>
                </div>
            </div>

            {isInteractive && (
                <div className="absolute -top-2 -right-2 bg-thin-lime border border-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <ArrowUpRight size={14} />
                </div>
            )}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default Home;
