import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
  Sparkles,
  Lock,
  Grid,
  Disc,
  ArrowUpRight,
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
  const [viewMode, setViewMode] = useState<'radial' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 'list';
    }
    return 'radial';
  });

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

  // Determine active primary sector
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

  // Dynamic Central Hub Tag
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
      const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
      window.dispatchEvent(event);
      setIsOpen(false);
      return;
    }

    if (sector.href.startsWith('/')) {
      if (window.location.pathname !== sector.href) {
        window.location.href = sector.href;
      }
    }
    setIsOpen(false);
  };

  const handleContextClick = (sec: ProfileContextSection) => {
    setActiveProfileHash(sec.id);
    const el = document.querySelector(sec.href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', sec.href);
    }
  };

  // Radial Geometry Calculations for 8 Sectors in a Spacious Semi-Circular Arc
  const CX = 45;
  const CY = 230;
  const RADIUS = 235;
  const START_ANGLE = -62; // degrees
  const END_ANGLE = 62; // degrees

  const getSectorPos = (index: number, total: number) => {
    const angleDeg = START_ANGLE + (index * (END_ANGLE - START_ANGLE)) / (total - 1);
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = CX + RADIUS * Math.cos(angleRad);
    const y = CY + RADIUS * Math.sin(angleRad);
    return { x, y, angleDeg };
  };

  const focusedSector = GLOBAL_SECTORS.find((s) => s.id === hoveredSector) || GLOBAL_SECTORS.find((s) => s.id === activeSectorId);

  return (
    <>
      {/* Radial Spatial Navigator Modal Backdrop & Overlay Canvas */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] bg-slate-950/75 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative mt-12 sm:mt-14 bg-slate-950/95 backdrop-blur-xl border-2 border-slate-800 shadow-[12px_12px_0px_0px_#06B6D4] rounded-3xl p-4 sm:p-5 w-full max-w-3xl sm:max-w-4xl font-mono text-slate-100">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center border border-cyan-500/40 shadow-inner">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    SPATIAL_RADIAL_NAVIGATOR
                    <span className="px-2 py-0.5 text-[9px] bg-cyan-950 text-cyan-400 rounded-md border border-cyan-500/40 font-extrabold">
                      V2.0_SPACIOUS_ARC
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-mono">1 radial sector = 1 full spatial workspace</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center text-[10px]">
                  <button
                    type="button"
                    onClick={() => setViewMode('radial')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                      viewMode === 'radial' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Spacious Radial Arc View"
                  >
                    <Disc className="w-3.5 h-3.5" />
                    <span>ARC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                      viewMode === 'list' ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Compact List View"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>LIST</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* RADIAL ARC VIEW MODE */}
            {viewMode === 'radial' ? (
              <div className="space-y-3">
                {/* Interactive SVG Arc Canvas */}
                <div className="relative w-full h-[460px] overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                  {/* Background Grid Pattern */}
                  <div className="absolute inset-0 bg-crosshair-pattern-dark opacity-40"></div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 680 460">
                    <defs>
                      <linearGradient id="radialArcGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Semi-Circular Guide Arc */}
                    <path
                      d={`M ${CX + RADIUS * Math.cos((START_ANGLE * Math.PI) / 180)} ${CY + RADIUS * Math.sin((START_ANGLE * Math.PI) / 180)} A ${RADIUS} ${RADIUS} 0 0 1 ${CX + RADIUS * Math.cos((END_ANGLE * Math.PI) / 180)} ${CY + RADIUS * Math.sin((END_ANGLE * Math.PI) / 180)}`}
                      fill="none"
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />

                    {/* Radial Connector Rays from Hub to Node */}
                    {GLOBAL_SECTORS.map((sector, index) => {
                      const { x, y } = getSectorPos(index, GLOBAL_SECTORS.length);
                      const isActive = activeSectorId === sector.id;
                      const isHovered = hoveredSector === sector.id;

                      return (
                        <g key={`ray-${sector.id}`}>
                          <line
                            x1={CX}
                            y1={CY}
                            x2={x}
                            y2={y}
                            stroke={isActive || isHovered ? '#06B6D4' : '#334155'}
                            strokeWidth={isActive || isHovered ? '2' : '1'}
                            opacity={isActive || isHovered ? '0.9' : '0.4'}
                            className={isActive ? 'animated-beam' : ''}
                          />
                          {/* Radial Wedge Slice Indicator */}
                          {(isActive || isHovered) && (
                            <circle cx={x} cy={y} r="26" fill="#06B6D4" fillOpacity="0.15" filter="url(#glow)" />
                          )}
                        </g>
                      );
                    })}

                    {/* Central Radial Core Wheel */}
                    <circle cx={CX} cy={CY} r="34" fill="#0F172A" stroke="#06B6D4" strokeWidth="3" filter="url(#glow)" />
                    <circle cx={CX} cy={CY} r="26" fill="#0284C7" fillOpacity="0.25" />
                    <circle cx={CX} cy={CY} r="8" fill="#06B6D4" className="animate-pulse" />
                  </svg>

                  {/* Central Hub Label */}
                  <div
                    className="absolute z-20 font-mono text-[9px] font-bold text-cyan-400 bg-slate-950/90 px-2 py-0.5 rounded border border-cyan-500/40 shadow-lg pointer-events-none"
                    style={{ left: `${CX - 28}px`, top: `${CY + 40}px` }}
                  >
                    CORE_HUB
                  </div>

                  {/* Render 8 Radial Floating Circular Nodes & Angled Pill Badges */}
                  {GLOBAL_SECTORS.map((sector, index) => {
                    const { x, y } = getSectorPos(index, GLOBAL_SECTORS.length);
                    const Icon = sector.icon;
                    const isActive = activeSectorId === sector.id;
                    const isHovered = hoveredSector === sector.id;
                    const isStandby = sector.isStandby;

                    return (
                      <div
                        key={sector.id}
                        className="absolute z-30 transition-transform duration-200"
                        style={{
                          left: `${x - 20}px`,
                          top: `${y - 20}px`,
                        }}
                      >
                        {/* Unified Sector Button containing Icon Node AND Pill Tag */}
                        <button
                          type="button"
                          id={`radial-sector-${sector.id}`}
                          disabled={isStandby}
                          onClick={() => handleSectorClick(sector)}
                          onMouseEnter={() => setHoveredSector(sector.id)}
                          onMouseLeave={() => setHoveredSector(null)}
                          className={`group inline-flex items-center gap-2 text-left focus:outline-none transition-all ${
                            isStandby ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                          }`}
                          title={`${sector.label} [${sector.code}]`}
                        >
                          {/* Circular Icon Node */}
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 shrink-0 ${
                              isStandby
                                ? 'bg-slate-900/90 text-slate-500 border-slate-700'
                                : isActive
                                ? 'bg-cyan-400 text-slate-950 border-white shadow-[0_0_15px_rgba(6,182,212,0.8)] scale-110 node-active-ring'
                                : isHovered
                                ? 'bg-slate-800 text-cyan-300 border-cyan-400 scale-110 shadow-lg'
                                : 'bg-slate-950 text-slate-300 border-slate-700 group-hover:border-cyan-400'
                            }`}
                          >
                            <span className="sr-only">[{sector.code}] {sector.label}</span>
                            {isStandby ? <Lock className="w-4 h-4 text-slate-500" /> : <Icon className="w-4.5 h-4.5 stroke-[2.2]" />}
                          </div>

                          {/* Angled Radial Pill Tag / Badge extending to the right */}
                          <div
                            className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono border backdrop-blur-md transition-all ${
                              isStandby
                                ? 'bg-slate-950/90 text-slate-500 border-slate-800'
                                : isActive
                                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400 font-bold shadow-[2px_2px_0px_0px_#06B6D4]'
                                : isHovered
                                ? 'bg-slate-900 text-white border-cyan-400 translate-x-1'
                                : 'bg-slate-950/80 text-slate-300 border-slate-800 group-hover:border-slate-600'
                            }`}
                          >
                            <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                              [{sector.code}]
                            </span>
                            <span className="font-semibold">{sector.label}</span>
                            {isStandby && (
                              <span className="text-[9px] px-1 py-0.5 rounded bg-slate-900 text-amber-400 border border-amber-500/30 font-bold ml-0.5">
                                STANDBY
                              </span>
                            )}
                            {!isStandby && (
                              <ArrowUpRight className={`w-3 h-3 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Focused Sector Live Description Panel (Positioned Cleanly Below Canvas) */}
                {focusedSector && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 backdrop-blur-md flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3 truncate pr-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold shrink-0">
                        SECTOR_{focusedSector.code}
                      </span>
                      <div className="truncate">
                        <div className="text-white font-bold text-xs">{focusedSector.label}</div>
                        <div className="text-[11px] text-slate-400 truncate">{focusedSector.description}</div>
                      </div>
                    </div>

                    {!focusedSector.isStandby && (
                      <button
                        type="button"
                        onClick={() => handleSectorClick(focusedSector)}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <span>OPEN</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* COMPACT LIST VIEW MODE */
              <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
                {GLOBAL_SECTORS.map((sector) => {
                  const Icon = sector.icon;
                  const isActive = activeSectorId === sector.id;
                  const isHovered = hoveredSector === sector.id;
                  const isStandby = sector.isStandby;

                  return (
                    <button
                      key={sector.id}
                      id={`radial-sector-${sector.id}`}
                      type="button"
                      disabled={isStandby}
                      onClick={() => handleSectorClick(sector)}
                      onMouseEnter={() => setHoveredSector(sector.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                      className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs transition-all font-mono ${
                        isStandby
                          ? 'bg-slate-900/50 text-slate-500 border-slate-800/80 cursor-not-allowed opacity-75'
                          : isActive
                          ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 font-bold shadow-[3px_3px_0px_0px_#06B6D4]'
                          : isHovered
                          ? 'bg-slate-900 text-slate-100 border-slate-700'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                            isStandby
                              ? 'bg-slate-900 text-slate-500 border-slate-800'
                              : isActive
                              ? 'bg-cyan-400 text-slate-950 border-white'
                              : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {isStandby ? <Lock className="w-3.5 h-3.5 text-slate-500" /> : <Icon className="w-4 h-4 stroke-[2]" />}
                        </div>
                        <div>
                          <div className={isStandby ? 'text-slate-500 font-normal' : 'font-bold text-white'}>{sector.label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{sector.description}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-[10px]">
                        {isStandby ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 font-bold">
                            MODULE_STANDBY
                          </span>
                        ) : (
                          <>
                            <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                              [{sector.badge || sector.code}]
                            </span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                          </>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Contextual Sub-Navigation (Profile Layer) */}
            {currentPath === '/profile' && (
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
                <div className="px-1 text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>PROFILE_CONTEXTUAL_SECTIONS</span>
                  </span>
                  <span className="text-slate-500">[SUB_NAV]</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-28 overflow-y-auto">
                  {PROFILE_CONTEXT_SECTORS.map((sec) => {
                    const isContextActive = activeProfileHash === sec.id;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleContextClick(sec)}
                        className={`text-left px-2 py-1.5 rounded-lg text-[10px] truncate border font-mono transition-all ${
                          isContextActive
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold shadow-sm'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white'
                        }`}
                      >
                        #{sec.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer System Status Bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>JOB_AI_SPATIAL_SHELL</span>
              </span>
              <span className="text-cyan-400 font-bold">[RADIAL_ARC_ACTIVE]</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Control Hub Trigger Button */}
      <div className="fixed z-[100] left-4 top-4 sm:left-6 sm:top-4 font-mono select-none">
        <button
          type="button"
          id="radial-hub-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="relative z-[100] flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 text-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#06B6D4] hover:bg-slate-900 hover:shadow-[6px_6px_0px_0px_#06B6D4] transition-all active:scale-95 group pointer-events-auto"
          title="Toggle Spatial Radial Application Navigator"
        >
          <div className="w-5 h-5 rounded-md bg-cyan-400 text-slate-950 flex items-center justify-center font-bold group-hover:rotate-12 transition-transform">
            <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">JOB_AI</span>
          <span className="text-cyan-400 text-xs font-bold font-mono">[{getHubTag()}]</span>
          {isOpen ? <X className="w-4 h-4 text-slate-400 ml-1" /> : <Menu className="w-4 h-4 text-cyan-400 ml-1" />}
        </button>
      </div>
    </>
  );
};

export default RadialNavMenu;
