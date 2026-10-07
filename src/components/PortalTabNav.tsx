import React from 'react';
import { GlobalTab } from '../types';

interface PortalTabNavProps {
  currentTab: GlobalTab;
  onSelectTab: (tab: GlobalTab) => void;
}

export const PortalTabNav: React.FC<PortalTabNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <section
      aria-label="Portal Mode Switcher"
      className="bg-surface-container border-b-2 border-outline-variant py-2.5 sticky top-[94px] z-30 shadow-sm"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">swap_horiz</span>
          <span className="font-label-lg text-xs sm:text-sm text-on-surface font-bold uppercase tracking-wide">
            Platform Views:
          </span>
        </div>

        {/* High-Contrast 3-Tab Pill Switcher */}
        <div
          className="flex p-1 bg-surface-container-highest rounded-xl border-2 border-outline shadow-inner w-full md:w-auto overflow-x-auto"
          role="tablist"
        >
          <button
            aria-selected={currentTab === 'tab-home'}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'tab-home'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface hover:bg-surface-container'
            }`}
            onClick={() => onSelectTab('tab-home')}
            role="tab"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">public</span>
            <span>Tab 1: Home & Public Portal</span>
          </button>

          <button
            aria-selected={currentTab === 'tab-auth'}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'tab-auth'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface hover:bg-surface-container'
            }`}
            onClick={() => onSelectTab('tab-auth')}
            role="tab"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">badge</span>
            <span>Tab 2: Role-Gated Auth (4 Portals)</span>
          </button>

          <button
            aria-selected={currentTab === 'tab-dash'}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentTab === 'tab-dash'
                ? 'bg-primary-container text-on-primary-container shadow-md'
                : 'text-on-surface hover:bg-surface-container'
            }`}
            onClick={() => onSelectTab('tab-dash')}
            role="tab"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">dashboard</span>
            <span>Tab 3: Smart Dashboards</span>
          </button>
        </div>

        {/* Quick Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-label-sm text-tertiary font-bold bg-surface px-3 py-1.5 rounded-full border border-tertiary shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block animate-pulse"></span>
          <span>Connected to State Central Queue Registry</span>
        </div>
      </div>
    </section>
  );
};
