import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  LayoutDashboard,
  User,
  FileUp,
  Boxes,
  Target,
  Send,
  GitMerge,
  Bot,
  ChevronRight,
  X,
  Sparkles,
  Lock,
} from 'lucide-react';

export interface RadialSector {
  id: string;
  label: string;
  code: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isStandby?: boolean;
  isCopilotTrigger?: boolean;
  badge?: string;
}

export interface ProfileContextSection {
  id: string;
  label: string;
  code: string;
  href: string;
}

export const GLOBAL_SECTORS: RadialSector[] = [
  { id: 'dashboard', label: 'Dashboard', code: '01', description: 'Executive Candidate Command & Real-Time Signals', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'identity', label: 'Identity', code: '02', description: 'Verified Professional Identity & Profile Credentials', icon: User, href: '/profile' },
  { id: 'resume', label: 'Resume', code: '03', description: 'Document Ingestion & Resume Intelligence Artifacts', icon: FileUp, href: '/resume' },
  { id: 'skills', label: 'Skill Passport', code: '04', description: 'Digital Skill Passport & Verified Capabilities', icon: Boxes, href: '/skills' },
  { id: 'opportunities', label: 'Opportunities', code: '05', description: 'Opportunity Intelligence Radar & Alignment Slices', icon: Target, href: '/opportunities' },
  { id: 'applications', label: 'Applications', code: '06', description: 'Application Lifecycle Command & Interview Prep', icon: Send, href: '/applications' },
  { id: 'career', label: 'Career Vector', code: '07', description: 'Long-term Trajectory Vector & Promotion Pathways', icon: GitMerge, href: '#', isStandby: true, badge: 'MODULE_STANDBY' },
  { id: 'copilot', label: 'AI Copilot', code: '08', description: 'Global Command Interface & Autonomous Assistant', icon: Bot, href: '#copilot', isCopilotTrigger: true, badge: '⌘K' },
];

export const PROFILE_CONTEXT_SECTORS: ProfileContextSection[] = [
  { id: 'identity', label: 'Identity Header', code: 'P1', href: '#identity' },
  { id: 'career', label: 'Career Direction', code: 'P2', href: '#career' },
  { id: 'summary', label: 'Summary', code: 'P3', href: '#summary' },
  { id: 'experience', label: 'Experience', code: 'P4', href: '#experience' },
  { id: 'education', label: 'Education', code: 'P5', href: '#education' },
  { id: 'projects', label: 'Projects', code: 'P6', href: '#projects' },
  { id: 'certifications', label: 'Certifications', code: 'P7', href: '#certifications' },
  { id: 'links', label: 'Links', code: 'P8', href: '#links' },
];

interface Props {
  activeRoute?: string;
  onSelectSector?: (sectorId: string) => void;
}

export const RadialNavMenu: React.FC<Props> = ({ activeRoute, onSelectSector }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(() => activeRoute || (typeof window !== 'undefined' ? window.location.pathname : ''));
  const [activeProfileHash, setActiveProfileHash] = useState<string>('identity');
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover In / Out Handlers with Grace Period
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = (e?: React.MouseEvent) => {
    if (e && e.relatedTarget) {
      const related = e.relatedTarget as Node;
      if (e.currentTarget && e.currentTarget.contains && e.currentTarget.contains(related)) {
        return;
      }
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  // Sync active route & hash derived state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = activeRoute || window.location.pathname;
    setCurrentPath(path);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveProfileHash(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    if (path === '/profile') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveProfileHash(entry.target.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      PROFILE_CONTEXT_SECTORS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.observe(el);
      });

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [activeRoute]);

  const getActivePrimarySectorId = (): string => {
    if (currentPath === '/dashboard') return 'dashboard';
    if (currentPath === '/profile') return 'identity';
    if (currentPath === '/resume') return 'resume';
    if (currentPath === '/skills') return 'skills';
    if (currentPath === '/opportunities') return 'opportunities';
    if (currentPath === '/applications') return 'applications';
    return 'dashboard';
  };

  const activeSectorId = getActivePrimarySectorId();

  const getHubTag = (): string => {
    if (currentPath === '/dashboard') return 'DASHBOARD_ACTIVE';
    if (currentPath === '/profile') return `IDENTITY_${activeProfileHash.toUpperCase()}`;
    if (currentPath === '/resume') return 'RESUME_ACTIVE';
    if (currentPath === '/skills') return 'SKILLS_ACTIVE';
    if (currentPath === '/opportunities') return 'OPPORTUNITY_ACTIVE';
    if (currentPath === '/applications') return 'APPLICATIONS_ACTIVE';
    return 'JOB_AI_HUB';
  };

  const handleSectorClick = (sector: RadialSector) => {
    if (sector.isStandby) return;

    if (onSelectSector) {
      onSelectSector(sector.id);
    }

    if (sector.isCopilotTrigger) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-copilot'));
      }
      setIsOpen(false);
      return;
    }

    if (sector.href && sector.href !== '#') {
      if (typeof window !== 'undefined') {
        window.location.href = sector.href;
      }
      setIsOpen(false);
    }
  };

  const handleContextClick = (sec: ProfileContextSection) => {
    setActiveProfileHash(sec.id);
    if (typeof window !== 'undefined') {
      const el = document.getElementById(sec.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = sec.id;
      }
    }
    setIsOpen(false);
  };

  // Radial Geometry Parameters
  const START_ANGLE = -66;
  const END_ANGLE = 66;
  const RADIUS = isMobile ? 140 : 210;

  const getSectorAngle = (index: number, total: number): number => {
    if (total <= 1) return 0;
    const step = (END_ANGLE - START_ANGLE) / (total - 1);
    return START_ANGLE + index * step;
  };

  const getSectorPos = (index: number, total: number) => {
    const angleDeg = getSectorAngle(index, total);
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: RADIUS * Math.cos(angleRad),
      y: RADIUS * Math.sin(angleRad),
      angleDeg,
    };
  };

  return (
    <>
      {/* Translucent Backdrop on Hover/Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[90] transition-opacity duration-300 pointer-events-auto"
          onClick={() => setIsOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Floating Radial Arc Menu Container attached to Left Edge */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] font-mono select-none pointer-events-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left-Edge Semi-Circular Hub Anchor Trigger */}
        <button
          type="button"
          id="radial-hub-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="relative z-[102] group cursor-pointer flex items-center pointer-events-auto bg-transparent border-0 p-0 outline-none"
          title="Toggle Spatial Radial Application Navigator"
        >
          <div
            className={`w-12 h-32 rounded-r-full bg-slate-950/95 backdrop-blur-xl border-2 border-l-0 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 shadow-[6px_0px_30px_rgba(6,182,212,0.5)] ${
              isOpen ? 'border-cyan-400 bg-cyan-950/80 shadow-[10px_0px_40px_rgba(6,182,212,0.8)]' : 'border-cyan-500/60 hover:border-cyan-400 hover:w-14'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg transition-transform duration-300 ${
                isOpen ? 'bg-cyan-400 text-slate-950 rotate-90 scale-110' : 'bg-cyan-400 text-slate-950 group-hover:scale-110'
              }`}
            >
              {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Compass className="w-5 h-5 stroke-[2.5] group-hover:rotate-45 transition-transform" />}
            </div>
            <div className={`w-2 h-2 rounded-full transition-all ${isOpen ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-cyan-400 animate-pulse'}`} />
          </div>
          <span className="sr-only font-mono">JOB_AI [{getHubTag()}]</span>
        </button>

        {/* SVG Rays & Arc Guide (Visible when Open) */}
        {isOpen && (
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2 overflow-visible pointer-events-none z-[95]"
            width={RADIUS + 180}
            height={RADIUS * 2 + 100}
            viewBox={`0 ${-RADIUS - 50} ${RADIUS + 180} ${RADIUS * 2 + 100}`}
          >
            <defs>
              <linearGradient id="floatingArcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Guide Arc */}
            <path
              d={`M ${RADIUS * Math.cos((START_ANGLE * Math.PI) / 180)} ${RADIUS * Math.sin((START_ANGLE * Math.PI) / 180)} A ${RADIUS} ${RADIUS} 0 0 1 ${RADIUS * Math.cos((END_ANGLE * Math.PI) / 180)} ${RADIUS * Math.sin((END_ANGLE * Math.PI) / 180)}`}
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.5"
            />

            {/* Connecting Rays */}
            {GLOBAL_SECTORS.map((sector, index) => {
              const { x, y } = getSectorPos(index, GLOBAL_SECTORS.length);
              const isActive = activeSectorId === sector.id;
              const isHovered = hoveredSector === sector.id;

              return (
                <line
                  key={`ray-${sector.id}`}
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke={isActive || isHovered ? '#06B6D4' : '#334155'}
                  strokeWidth={isActive || isHovered ? '2.5' : '1.5'}
                  opacity={isActive || isHovered ? '0.9' : '0.4'}
                />
              );
            })}
          </svg>
        )}

        {/* Floating Radial Node Array */}
        <div className={`absolute left-0 top-0 z-[101] transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {GLOBAL_SECTORS.map((sector, index) => {
            const { x, y, angleDeg } = getSectorPos(index, GLOBAL_SECTORS.length);
            const isActive = activeSectorId === sector.id;
            const isHovered = hoveredSector === sector.id;
            const Icon = sector.icon;
            const isStandby = sector.isStandby;

            return (
              <div
                key={sector.id}
                className={`absolute flex items-center transition-all duration-300 ease-out ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                style={{
                  left: `${isOpen ? x : 0}px`,
                  top: `${isOpen ? y : 0}px`,
                  transform: 'translate(-50%, -50%)',
                  transitionDelay: `${isOpen ? index * 30 : 0}ms`,
                  opacity: isOpen ? 1 : 0,
                }}
                onMouseEnter={() => setHoveredSector(sector.id)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {/* Circular Icon Button Node */}
                <button
                  type="button"
                  id={`radial-sector-${sector.id}`}
                  onClick={() => handleSectorClick(sector)}
                  disabled={isStandby}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-xl group outline-none relative z-10 ${
                    isStandby
                      ? 'bg-slate-900/90 text-slate-600 border-slate-800 cursor-not-allowed'
                      : isActive
                      ? 'bg-cyan-400 text-slate-950 border-white shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-110'
                      : isHovered
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-110'
                      : 'bg-slate-950/95 text-cyan-400 border-cyan-500/50 hover:border-cyan-400 hover:text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  }`}
                  title={`${sector.label} — ${sector.description}`}
                >
                  {isStandby ? <Lock className="w-5 h-5" /> : <Icon className="w-5.5 h-5.5 stroke-[2]" />}
                  <span className="sr-only">[{sector.badge || sector.code}] {sector.label}</span>
                </button>

                {/* Angled Pill Badge Label floating alongside Node */}
                <div
                  className={`absolute left-14 top-1/2 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  style={{
                    transform: `translateY(-50%) rotate(${angleDeg}deg)`,
                    transformOrigin: 'left center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleSectorClick(sector)}
                    disabled={isStandby}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide whitespace-nowrap flex items-center gap-2 border shadow-lg transition-all duration-200 outline-none ${
                      isStandby
                        ? 'bg-slate-950/90 text-slate-600 border-slate-800 cursor-not-allowed'
                        : isActive
                        ? 'bg-cyan-400 text-slate-950 border-white shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                        : isHovered
                        ? 'bg-cyan-950 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] scale-105'
                        : 'bg-slate-950/90 text-cyan-300 border-cyan-500/40 hover:bg-cyan-950 hover:text-white hover:border-cyan-400'
                    }`}
                  >
                    <span>[{sector.badge || sector.code}]</span>
                    <span>{sector.label}</span>
                    {isStandby && <span className="text-[9px] px-1 bg-slate-900 text-slate-500 rounded border border-slate-800">STANDBY</span>}
                    {!isStandby && <ChevronRight className="w-3 h-3 text-cyan-400" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profile Contextual Sub-Nav Bar (Visible on /profile when open) */}
        {isOpen && currentPath === '/profile' && (
          <div className="absolute left-16 top-[240px] z-[102] pointer-events-auto flex flex-wrap gap-1.5 max-w-xs bg-slate-950/90 p-2 rounded-xl border border-cyan-500/40 backdrop-blur-md shadow-2xl">
            <div className="w-full text-[9px] text-cyan-400 font-bold uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>PROFILE_CONTEXTUAL_SECTIONS</span>
            </div>
            {PROFILE_CONTEXT_SECTORS.map((sec) => {
              const isContextActive = activeProfileHash === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleContextClick(sec)}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono border transition-all ${
                    isContextActive
                      ? 'bg-cyan-400 text-slate-950 border-white font-bold'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:border-cyan-500/50'
                  }`}
                >
                  #{sec.id}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default RadialNavMenu;
