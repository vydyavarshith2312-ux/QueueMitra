import React from 'react';

interface HeaderMarqueeProps {
  marqueeText: string;
  onAlertClick?: () => void;
}

export const HeaderMarquee: React.FC<HeaderMarqueeProps> = ({ marqueeText, onAlertClick }) => {
  return (
    <aside
      aria-label="Urgent Public Announcements"
      className="bg-inverse-surface text-inverse-on-surface py-2 px-4 sm:px-8 overflow-hidden border-b-2 border-outline flex items-center shadow-sm select-none z-50 sticky top-0"
    >
      <div className="flex items-center gap-2 pr-4 bg-inverse-surface z-10 font-label-sm text-xs sm:text-sm text-inverse-primary uppercase tracking-wider shrink-0 border-r border-outline">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
        <button
          onClick={onAlertClick}
          className="font-bold flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          title="Click to view full advisory"
        >
          <span className="material-symbols-outlined text-[18px]">campaign</span>
          <span>LIVE ALERT</span>
        </button>
      </div>

      <div className="overflow-hidden w-full relative flex items-center">
        <div
          className="animate-marquee font-body-md text-sm md:text-base text-surface font-medium pl-6 cursor-pointer"
          id="marquee-text"
          onClick={onAlertClick}
          title="Hover to pause ticker"
        >
          {marqueeText}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 pl-4 shrink-0 text-xs font-label-sm text-surface-container-highest">
        <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
        <span>Real-time NIC Feed</span>
      </div>
    </aside>
  );
};
