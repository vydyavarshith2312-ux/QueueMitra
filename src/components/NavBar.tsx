import React from 'react';
import { GlobalTab } from '../types';

interface NavBarProps {
  currentTab: GlobalTab;
  onNavigateTab: (tab: GlobalTab, sectionId?: string) => void;
  onOpenHelp: () => void;
  onEmergencyClick: () => void;
  onOpenAuth: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentTab,
  onNavigateTab,
  onOpenHelp,
  onEmergencyClick,
  onOpenAuth,
}) => {
  return (
    <header className="bg-surface border-b-2 border-outline-variant shadow-[0px_2px_4px_rgba(26,37,54,0.08)] sticky top-[36px] z-40 backdrop-blur-md bg-opacity-95">
      <div className="w-full mx-auto px-4 sm:px-8 max-w-[1240px] flex justify-between items-center min-h-[58px] py-2 flex-wrap gap-2">
        {/* Brand Anchor */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigateTab('tab-home')}
        >
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[26px]" data-weight="fill">
              confirmation_number
            </span>
          </div>
          <div>
            <span className="font-headline-md text-lg sm:text-xl md:text-2xl font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors block">
              SmartSeva - Queue Mitra
            </span>
            <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium tracking-normal block -mt-1">
              Public Queue & Civic Appointment Infrastructure
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Global Primary Navigation" className="hidden lg:flex items-center gap-6">
          <button
            className={`font-label-lg text-sm sm:text-base font-bold pb-1 transition-colors border-b-2 cursor-pointer ${
              currentTab === 'tab-home'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
            onClick={() => onNavigateTab('tab-home', 'live-queue-sec')}
          >
            Live Queue
          </button>
          <button
            className="text-on-surface-variant hover:text-primary font-label-lg text-sm sm:text-base font-bold pb-1 transition-colors border-b-2 border-transparent cursor-pointer"
            onClick={() => onNavigateTab('tab-dash', 'booking-form-box')}
          >
            Book Appointment
          </button>
          <button
            className="text-on-surface-variant hover:text-primary font-label-lg text-sm sm:text-base font-bold pb-1 transition-colors border-b-2 border-transparent cursor-pointer"
            onClick={() => onNavigateTab('tab-dash', 'active-token-card')}
          >
            Token Tracker
          </button>
          <button
            className="text-on-surface-variant hover:text-primary font-label-lg text-sm sm:text-base font-bold pb-1 transition-colors border-b-2 border-transparent cursor-pointer"
            onClick={() => onNavigateTab('tab-home', 'civic-desks-sec')}
          >
            Civic Desks
          </button>
          <button
            className="text-on-surface-variant hover:text-primary font-label-lg text-sm sm:text-base font-bold pb-1 transition-colors border-b-2 border-transparent cursor-pointer"
            onClick={onOpenHelp}
          >
            Help & FAQs
          </button>
        </nav>

        {/* Trailing Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="min-h-[44px] px-3 sm:px-4 rounded-lg bg-surface text-error border-2 border-error hover:bg-error-container hover:text-on-error-container font-label-md text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm focus:ring-2 focus:ring-error focus:outline-none active:scale-95 cursor-pointer"
            onClick={onEmergencyClick}
            title="Immediate emergency escalation"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]" data-weight="fill">
              e911_emergency
            </span>
            <span>Emergency Desk</span>
          </button>

          <button
            className="min-h-[44px] px-3 sm:px-4 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-md text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm focus:ring-2 focus:ring-secondary focus:outline-none active:scale-95 cursor-pointer"
            onClick={onOpenAuth}
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">account_circle</span>
            <span>Citizen Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};
