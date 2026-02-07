
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

// --- Custom Brand Icons (Optimized for Pill Layout) ---

// Xiaohongshu: Red logo
const XiaohongshuLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3V4H6V3ZM5 6H19V8H16.5C16.5 11.5 15.5 14.5 13.5 16.5C15 17.5 17 18 19 18V20C16 20 13.5 18.5 12 16.5C10.5 18.5 8 20 5 20V18C7 18 9 17.5 10.5 16.5C8.5 14.5 7.5 11.5 7.5 8H5V6ZM13.5 6V8C13.5 10.5 13 12.5 12 14C11 12.5 10.5 10.5 10.5 8V6H13.5Z" />
  </svg>
);

// Jike: White/Yellow logo
const JikeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
     <path d="M16.5 4H12.5C11.95 4 11.5 4.45 11.5 5V14.5C11.5 16.43 9.93 18 8 18C7.55 18 7.13 17.89 6.76 17.69C6.46 18.53 6.94 19.56 7.85 19.91C8.36 20.1 8.91 20.15 9.42 20.06C12.33 19.53 14.5 16.97 14.5 14V5C14.5 4.45 14.95 4 15.5 4H16.5C17.05 4 17.5 3.55 17.5 3C17.5 2.45 17.05 2 16.5 2V4Z" transform="translate(-2, 1) scale(1.1)" />
     <path d="M14 5V14.5C14 16.99 11.99 19 9.5 19C9.17 19 8.85 18.96 8.54 18.88C9.36 18.25 9.92 17.29 10 16.21C10.02 16.03 10 14.7 10 14.5V5H14Z" opacity="0.5" />
  </svg>
);

// Xiaoyuzhou/Podcast: Blue Planet
const XiaoyuzhouLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <circle cx="12" cy="12" r="6" />
    <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <path d="M19.5 5.5C16.5 2.5 11.5 2.5 8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// --- Pill Component ---
interface SocialPillProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  iconColor: string;
}

const SocialPill: React.FC<SocialPillProps> = ({ icon, label, href, iconColor }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, y: -1 }}
    whileTap={{ scale: 0.95 }}
    className="group flex items-center gap-3 px-4 py-1.5 bg-[#1a1a1a] rounded-full border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-[#252525] hover:border-white/30 transition-all cursor-pointer no-underline select-none"
  >
    <div className={`flex items-center justify-center ${iconColor}`}>
      {icon}
    </div>
    <span className="font-mono text-xs font-bold text-slate-200 tracking-wider group-hover:text-white">
      {label}
    </span>
  </motion.a>
);

// --- GLOBAL ASCII LAYER COMPONENT ---
// This component adds the complex ASCII styling to the entire page
const GlobalAsciiLayer = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none font-mono">
      
      {/* 1. TOP RULER (Scale) */}
      <div className="absolute top-16 left-0 right-0 h-4 flex justify-between px-2 opacity-20 border-b border-black/10">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
             <div className={`w-px bg-black ${i % 5 === 0 ? 'h-3' : 'h-1'}`}></div>
          </div>
        ))}
      </div>

      {/* 2. LEFT SIDE HEX STREAM (Hidden on mobile) */}
      <div className="hidden lg:block absolute top-1/3 left-4 text-[9px] text-slate-400 leading-4 opacity-40 mix-blend-multiply">
         <div className="mb-2 font-bold">[ MEM_DUMP ]</div>
         {Array.from({ length: 16 }).map((_, i) => (
           <div key={i} className="font-mono">
             0x{Math.floor(Math.random() * 10000).toString(16).toUpperCase().padStart(4, '0')} 
             <span className="ml-2 text-slate-300">::</span> 
             {Math.random() > 0.5 ? ' 1' : ' 0'}
           </div>
         ))}
      </div>

      {/* 3. RIGHT SIDE SYSTEM STATUS (Hidden on mobile) */}
      <div className="hidden lg:block absolute bottom-24 right-4 text-[9px] text-slate-400 leading-4 text-right opacity-40 mix-blend-multiply">
         <div className="mb-2 font-bold">[ SYS_OPTS ]</div>
         <div>RENDER: GPU_01</div>
         <div>V_SYNC: OFF</div>
         <div>AA_MODE: FXAA</div>
         <div>CACHE: CLEAR</div>
         <div className="mt-4">
            ┌──────────┐<br/>
            │  ONLINE  │<br/>
            └──────────┘
         </div>
      </div>

      {/* 4. LARGE BACKGROUND ASCII ART (Watermark) */}
      <div className="absolute top-[15%] right-[10%] text-[8px] leading-[8px] text-slate-300 pointer-events-none opacity-20 hidden 2xl:block mix-blend-multiply whitespace-pre">
{`
              .,-:;//;:=,
          . :H@@@MM@M#H/.,+%;,
       ,/X+ +M@@M@MM%=,-%HMMM@X/,
     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-
    ;@MMMM= XM@X;. -+mMMMM@MMMM@MM@;
   $MMMMMM+ =%=.  -oHMMMM@MMMM@MMMM@;
  =MMMMMM+..      ./oHMMM@MMMM@MMMM@;
  =MMMMMM+..      ./oHMMM@MMMM@MMMM@;
  +MMMMMM+..      ./oHMMM@MMMM@MMMM@;
   $MMMMMM+ =%=.  -oHMMMM@MMMM@MMMM@;
    ;@MMMM= XM@X;. -+mMMMM@MMMM@MMMM@;
     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-
       ,/X+ +M@@M@MM%=,-%HMMM@X/,
          . :H@@@MM@M#H/.,+%;,
              .,-:;//;:=,
`}
      </div>
      
      {/* 5. CORNER DECORATIONS */}
      {/* Top Left */}
      <div className="absolute top-24 left-6 text-slate-300 opacity-60">
         <pre className="text-[10px] leading-none">
{`╔════════════════╗
║ SYS_ID: CP_25  ║
╚════════════════╝`}
         </pre>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-12 left-6 text-slate-300 opacity-60">
        <div className="flex items-end gap-1">
           <div className="w-1 h-1 bg-black/20"></div>
           <div className="w-1 h-2 bg-black/30"></div>
           <div className="w-1 h-4 bg-black/40"></div>
           <div className="w-1 h-6 bg-cyber-green animate-pulse"></div>
        </div>
        <div className="text-[9px] mt-1 font-mono">SIGNAL_STR</div>
      </div>

    </div>
  );
};

// Large Background Typography (Kept but modified opacity)
const BigTypeDecor = () => (
  <>
    <div className="absolute bottom-[10%] -left-10 transform -rotate-90 origin-bottom-left pointer-events-none z-0 opacity-[0.03]">
      <h1 className="text-[120px] font-black font-sans leading-none tracking-tighter text-slate-900">
        ARCHIVE
      </h1>
    </div>
    <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 pointer-events-none z-0 opacity-[0.02] mix-blend-multiply">
      <h1 className="text-[200px] font-black font-sans leading-none tracking-tighter text-slate-400">
        2025
      </h1>
    </div>
  </>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900 font-sans selection:bg-cyber-green selection:text-black overflow-x-hidden relative">
      
      {/* --- GLOBAL VISUAL LAYER --- */}
      
      {/* 1. CSS Noise Overlay (Grain) */}
      <div className="bg-noise" />

      {/* 2. Base Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-[size:40px_40px] opacity-100 z-0 mix-blend-multiply" />
      
      {/* 3. Global ASCII & HUD Elements */}
      <GlobalAsciiLayer />
      
      {/* 4. Artistic Elements (Fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Data Block */}
        <div className="absolute top-20 right-6 text-right z-10">
          <div className="font-mono text-[10px] text-slate-400 leading-tight">
            CAM_01 [REC]<br/>
            LOC: 34.05N, 118.24W<br/>
            ISO: 400
          </div>
          <div className="mt-2 flex justify-end gap-1">
             {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-slate-300"></div>)}
          </div>
        </div>

        <BigTypeDecor />

        {/* Bottom Left Circle Graphic */}
        <div className="absolute bottom-16 left-6 opacity-30">
           <div className="w-24 h-24 rounded-full border border-slate-300 border-dashed flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="w-20 h-20 rounded-full border border-slate-200"></div>
           </div>
        </div>
      </div>


      {/* --- CONTENT LAYER --- */}

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 h-16 z-[100] flex items-center justify-between px-6 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {!isHome ? (
            <button 
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 font-mono text-sm uppercase font-bold hover:text-lavender-dark transition-colors"
            >
              <div className="bg-black text-white p-1 rounded-sm group-hover:bg-lavender-dark transition-colors">
                 <ArrowLeft size={16} />
              </div>
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <a 
              href="https://web.okjike.com/u/C53E9127-90D4-4474-A31D-061A218FD360/post/66fcee552cacf9416aa5e72a" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-thin-lime px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                 <span className="font-mono text-xl font-black text-black tracking-tighter">
                   @陈皮
                 </span>
              </motion.div>
            </a>
          )}
        </div>

        {/* --- PILL BUTTONS (Updated per user request) --- */}
        <div className="flex flex-wrap items-center gap-3 justify-end">
              {/* Podcast: Blue Planet Icon */}
              <SocialPill 
                label="播客"
                href="https://www.xiaoyuzhoufm.com/podcast/690c70aae20e223cdc598584"
                icon={<XiaoyuzhouLogo />} 
                iconColor="text-cyan-400" 
              />
              
              {/* RED: Red Icon */}
              <SocialPill 
                label="RED"
                href="https://www.xiaohongshu.com/user/profile/5de711d8000000000100bbc0" 
                icon={<XiaohongshuLogo />} 
                iconColor="text-red-500" 
              />
              
              {/* Jike: White Icon */}
              <SocialPill 
                label="即刻"
                href="https://web.okjike.com/u/C53E9127-90D4-4474-A31D-061A218FD360"
                icon={<JikeLogo />} 
                iconColor="text-white" 
              />
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 ${isHome ? 'h-screen w-full overflow-hidden' : 'pt-24 px-4 sm:px-8 max-w-7xl mx-auto pb-20'}`}>
        {children}
      </main>

      {/* Decorative Footer Ticker */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-black text-white font-mono text-xs flex items-center overflow-hidden z-40 border-t border-white">
        <motion.div 
          className="whitespace-nowrap flex gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
           {[...Array(10)].map((_, i) => (
             <span key={i} className="flex items-center gap-4">
               <span>YEAR IN REVIEW 2025</span>
               <span className="text-cyber-green">/// ALWAYS EXPLORING ///</span>
               <span>INVICTUS MANEO</span>
             </span>
           ))}
        </motion.div>
      </footer>
    </div>
  );
};

export default Layout;
