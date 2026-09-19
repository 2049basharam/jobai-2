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
} from 'lucide-react';

export interface RadialSector {
  id: string;
  label: string;
  code: string;
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
  { id: 'dashboard', label: 'Dashboard', code: '01', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'identity', label: 'Identity', code: '02', icon: User, href: '/profile' },
  { id: 'resume', label: 'Resume', code: '03', icon: FileUp, href: '/resume' },
  { id: 'skills', label: 'Skill Passport', code: '04', icon: Boxes, href: '/skills' },
  { id: 'opportunities', label: 'Opportunities', code: '05', icon: Target, href: '/opportunities' },
  { id: 'applications', label: 'Applications', code: '06', icon: Send, href: '#', isStandby: true, badge: 'MODULE_STANDBY' },
  { id: 'career', label: 'Career Vector', code: '07', icon: GitMerge, href: '#', isStandby: true, badge: 'MODULE_STANDBY' },
  { id: 'copilot', label: 'AI Copilot', code: '08', icon: Bot, href: '#copilot', isCopilotTrigger: true, badge: '⌘K' },
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

    // Contextual scroll observer when inside /profile
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
    return 'JOB_AI_HUB';
  };

  const handleSectorClick = (sector: RadialSector) => {
    if (sector.isStandby) return;

    if (onSelectSector) {
      onSelectSector(sector.id);
    }

    if (sector.isCopilotTrigger) {
      // Trigger global command bar event if available
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

  return (
    <div className="fixed z-40 left-4 top-4 sm:left-6 sm:top-4 font-mono select-none">
      {/* Radial Control Toggle Hub Button */}
      <button
        type="button"
        id="radial-hub-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4] hover:bg-slate-900 transition-all active:scale-95"
        title="Toggle Spatial Radial Application Navigator"
      >
        <div className="w-5 h-5 rounded-md bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
          <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">JOB_AI</span>
        <span className="text-cyan-400 text-xs font-bold font-mono">[{getHubTag()}]</span>
        {isOpen ? <X className="w-4 h-4 text-slate-400 ml-1" /> : <Menu className="w-4 h-4 text-cyan-400 ml-1" />}
      </button>

      {/* Expanded Radial Spatial Navigator Wheel */}
      {isOpen && (
        <div className="mt-3 w-72 brutalist-card bg-white/95 backdrop-blur-md rounded-2xl p-3 border-2 border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header Title Bar */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-slate-200 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-cyan-700">
              <Sparkles className="w-3 h-3 text-cyan-500" />
              <span>SPATIAL_PLATFORM_NAV</span>
            </span>
            <span>8_SECTORS</span>
          </div>

          {/* Primary Global Application Sectors */}
          <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
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
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all font-mono ${
                    isStandby
                      ? 'bg-slate-50/70 text-slate-400 border-slate-200/60 cursor-not-allowed opacity-75'
                      : isActive
                      ? 'bg-cyan-500/10 text-cyan-950 border-cyan-500/40 font-bold shadow-[2px_2px_0px_0px_#06B6D4]'
                      : isHovered
                      ? 'bg-slate-100 text-slate-900 border-slate-300'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                        isStandby
                          ? 'bg-slate-100 text-slate-400 border-slate-200'
                          : isActive
                          ? 'bg-cyan-400 text-slate-950 border-slate-900'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {isStandby ? <Lock className="w-3 h-3 text-slate-400" /> : <Icon className="w-3.5 h-3.5 stroke-[2]" />}
                    </div>
                    <span className={isStandby ? 'text-slate-400' : 'truncate'}>{sector.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                    {isStandby ? (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 border border-slate-200 font-bold">
                        MODULE_STANDBY
                      </span>
                    ) : (
                      <>
                        <span className={isActive ? 'text-cyan-700 font-bold' : 'text-slate-400'}>
                          [{sector.badge || sector.code}]
                        </span>
                        <ChevronRight className={`w-3 h-3 ${isActive ? 'text-cyan-600' : 'text-slate-300'}`} />
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Contextual Sub-Navigation (Profile Layer) */}
          {currentPath === '/profile' && (
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <div className="px-2 text-[9px] text-cyan-700 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>// PROFILE_CONTEXTUAL_SECTIONS</span>
                <span className="text-slate-400">[SUB_NAV]</span>
              </div>
              <div className="grid grid-cols-2 gap-1 max-h-28 overflow-y-auto pr-1">
                {PROFILE_CONTEXT_SECTORS.map((sec) => {
                  const isContextActive = activeProfileHash === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleContextClick(sec)}
                      className={`text-left px-2 py-1 rounded text-[10px] truncate border font-mono transition-all ${
                        isContextActive
                          ? 'bg-slate-900 text-cyan-400 border-slate-900 font-bold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      #{sec.id}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom System Tag */}
          <div className="px-2 pt-1 border-t border-slate-100 text-[9px] text-slate-400 flex justify-between items-center">
            <span>// GLOBAL_APP_SHELL</span>
            <span className="text-cyan-700 font-bold">[SPATIAL_READY]</span>
          </div>
        </div>
      )}
    </div>
  );
};
