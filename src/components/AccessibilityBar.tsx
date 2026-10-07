import React from 'react';
import { Language } from '../types';

interface AccessibilityBarProps {
  fontSizeDelta: number;
  onAdjustFontSize: (delta: number) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onEmergencyClick: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  fontSizeDelta,
  onAdjustFontSize,
  isHighContrast,
  onToggleHighContrast,
  language,
  onChangeLanguage,
  onEmergencyClick,
}) => {
  return (
    <div className="bg-surface-container-low border-b border-outline-variant px-4 sm:px-8 py-1.5 flex flex-wrap justify-between items-center text-on-surface-variant text-xs sm:text-sm font-label-sm gap-2">
      {/* Toll-free & Timings */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="material-symbols-outlined text-[18px] text-tertiary">support_agent</span>
          National Toll-Free:{' '}
          <a
            href="tel:18004257382"
            className="text-on-surface font-bold tracking-wide hover:underline cursor-pointer"
          >
            1800-425-SEVA
          </a>{' '}
          <span className="text-[11px] text-on-surface-variant font-normal">(7 AM - 9 PM)</span>
        </span>
        <span className="hidden lg:inline text-outline">•</span>
        <span className="hidden lg:flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
          Office Timings: 09:30 AM – 05:30 PM (Mon–Sat)
        </span>
      </div>

      {/* Accessibility Tools Cluster */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-wrap">
        {/* Font Resizing */}
        <div
          className="flex items-center bg-surface-container rounded border border-outline-variant p-0.5"
          title="Adjust Text Size"
        >
          <button
            aria-label="Decrease font size"
            className={`px-2 py-0.5 hover:bg-surface-container-highest rounded font-bold text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none cursor-pointer ${
              fontSizeDelta === -1 ? 'bg-secondary text-white' : ''
            }`}
            onClick={() => onAdjustFontSize(-1)}
          >
            -A
          </button>
          <span className="text-outline text-xs">|</span>
          <button
            aria-label="Reset font size"
            className={`px-2 py-0.5 hover:bg-surface-container-highest rounded font-bold text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none cursor-pointer ${
              fontSizeDelta === 0 ? 'bg-surface-container-highest' : ''
            }`}
            onClick={() => onAdjustFontSize(0)}
          >
            A
          </button>
          <span className="text-outline text-xs">|</span>
          <button
            aria-label="Increase font size"
            className={`px-2 py-0.5 hover:bg-surface-container-highest rounded font-bold text-on-surface focus:ring-2 focus:ring-secondary focus:outline-none cursor-pointer ${
              fontSizeDelta === 1 ? 'bg-secondary text-white' : ''
            }`}
            onClick={() => onAdjustFontSize(1)}
          >
            +A
          </button>
        </div>

        {/* High Contrast AAA Toggle */}
        <button
          className={`flex items-center gap-1 px-2.5 py-1 rounded border text-xs sm:text-sm font-label-sm transition-colors focus:ring-2 focus:ring-secondary focus:outline-none cursor-pointer ${
            isHighContrast
              ? 'bg-on-surface text-surface border-primary font-bold'
              : 'bg-surface border-outline hover:bg-surface-container text-on-surface'
          }`}
          onClick={onToggleHighContrast}
          title="Toggle AAA High Contrast Mode"
        >
          <span className="material-symbols-outlined text-[18px]">contrast</span>
          <span className="hidden sm:inline">High Contrast</span>
          {isHighContrast && <span className="text-tertiary-fixed font-bold text-[10px]">ON</span>}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px] text-outline">translate</span>
          <select
            className="bg-surface text-on-surface border border-outline rounded px-2 py-0.5 text-xs font-label-sm focus:ring-2 focus:ring-secondary focus:outline-none cursor-pointer"
            id="lang-select"
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
