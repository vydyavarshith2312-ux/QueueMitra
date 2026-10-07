import React from 'react';

interface FooterProps {
  onEmergencyClick: () => void;
  onOpenGrievances: () => void;
  onOpenFaq: () => void;
  onShowAccessibilityStatement: () => void;
  onShowPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onEmergencyClick,
  onOpenGrievances,
  onOpenFaq,
  onShowAccessibilityStatement,
  onShowPrivacyPolicy,
}) => {
  return (
    <footer className="bg-surface-container-low border-t-2 border-outline-variant mt-12 sm:mt-16">
      <div className="w-full mx-auto px-4 sm:px-8 py-8 md:py-10 max-w-[1240px] flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Copyright */}
        <div className="text-center md:text-left">
          <div className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="material-symbols-outlined text-primary" data-weight="fill">
              account_balance
            </span>
            <span>SmartSeva - Queue Mitra</span>
          </div>
          <p className="text-on-surface-variant font-body-md text-xs sm:text-sm">
            © 2025 SmartSeva (Queue Mitra) Public Infrastructure Portal. All rights reserved.
          </p>
          <span className="text-[11px] text-outline block mt-1">
            Designed in compliance with WCAG 2.1 AAA High-Contrast & Elderly Usability Standards.
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-label-sm text-xs sm:text-sm">
          <button
            className="text-error font-bold hover:underline transition-colors cursor-pointer"
            onClick={onEmergencyClick}
          >
            Emergency Desk
          </button>
          <button
            className="text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer"
            onClick={onOpenGrievances}
          >
            Grievance Redressal
          </button>
          <button
            className="text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer"
            onClick={onOpenFaq}
          >
            Civic FAQs
          </button>
          <button
            className="text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer"
            onClick={onShowAccessibilityStatement}
          >
            Accessibility Statement
          </button>
          <button
            className="text-on-surface-variant hover:text-primary underline transition-colors cursor-pointer"
            onClick={onShowPrivacyPolicy}
          >
            Citizen Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
