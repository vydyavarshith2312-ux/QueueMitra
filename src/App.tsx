/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GlobalTab, AuthPortalRole, DashboardRole, Language, TokenItem, StallItem, GrievanceItem } from './types';
import { INITIAL_TOKENS, INITIAL_STALLS, INITIAL_GRIEVANCES } from './data/mockData';
import { HeaderMarquee } from './components/HeaderMarquee';
import { AccessibilityBar } from './components/AccessibilityBar';
import { NavBar } from './components/NavBar';
import { PortalTabNav } from './components/PortalTabNav';
import { HomePublicPortal } from './components/HomePublicPortal';
import { RoleGatedAuth } from './components/RoleGatedAuth';
import { CitizenDashboard } from './components/CitizenDashboard';
import { StaffOperationsHub } from './components/StaffOperationsHub';
import { OfficialExecutiveDesk } from './components/OfficialExecutiveDesk';
import { Modals } from './components/Modals';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Role states
  const [currentTab, setCurrentTab] = useState<GlobalTab>('tab-home');
  const [authRole, setAuthRole] = useState<AuthPortalRole>('citizen');
  const [dashRole, setDashRole] = useState<DashboardRole>('citizen');

  // Accessibility & Localization states
  const [fontSizeDelta, setFontSizeDelta] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  // Dynamic Data states
  const [marqueeText, setMarqueeText] = useState<string>(
    '🔴 URGENT: Special Aadhaar & Pension Enrollment Drive active at Ranga Reddy Tehsildar Office • Token wait times reduced by 40% across 12 civic circles • Offline token sync available via SMS or Portal • Senior Citizen (65+) Priority Desks active in Hall B'
  );
  const [tokens, setTokens] = useState<TokenItem[]>(INITIAL_TOKENS);
  const [stalls, setStalls] = useState<StallItem[]>(INITIAL_STALLS);
  const [grievances, setGrievances] = useState<GrievanceItem[]>(INITIAL_GRIEVANCES);

  // Modals state
  const [showHelp, setShowHelp] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showElder, setShowElder] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showOffices, setShowOffices] = useState(false);
  const [showTokenPass, setShowTokenPass] = useState(false);
  const [noticeModal, setNoticeModal] = useState<{ title: string; message: string } | null>(null);
  const [locatedStall, setLocatedStall] = useState<StallItem | null>(null);

  // Font size adjusting effect
  const handleAdjustFontSize = (delta: number) => {
    if (delta === 0) {
      setFontSizeDelta(0);
      document.documentElement.style.fontSize = '16px';
    } else {
      const nextDelta = Math.min(Math.max(fontSizeDelta + delta, -1), 1);
      setFontSizeDelta(nextDelta);
      document.documentElement.style.fontSize = nextDelta === 1 ? '18px' : nextDelta === -1 ? '14px' : '16px';
    }
  };

  // High contrast mode effect
  const handleToggleHighContrast = () => {
    setIsHighContrast((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('high-contrast-mode');
      } else {
        document.body.classList.remove('high-contrast-mode');
      }
      return next;
    });
  };

  // Language switch announcement
  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (lang === 'te') {
      alert('భాష తెలుగుకి మార్చబడింది (SmartSeva - ప్రజా క్యూ పోర్టల్).');
    } else if (lang === 'hi') {
      alert('भाषा हिन्दी में बदली गई (SmartSeva - सार्वजनिक कतार प्रबंधन).');
    } else {
      alert('Language updated to English.');
    }
  };

  // Navigation helper with scroll support
  const handleNavigateTab = (tab: GlobalTab, sectionId?: string) => {
    setCurrentTab(tab);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 110, behavior: 'smooth' });
    }
  };

  // Add new token
  const handleCreateToken = (newToken: TokenItem) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  // Add new stall from registration
  const handleAddStall = (newStall: StallItem) => {
    setStalls((prev) => [newStall, ...prev]);
  };

  // Active citizen token
  const activeToken = tokens.find((t) => t.isSenior) || tokens[0];

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col font-body-md transition-all duration-200">
      {/* 1. TOP LIVE URGENT MARQUEE TICKER */}
      <HeaderMarquee
        marqueeText={marqueeText}
        onAlertClick={() =>
          setNoticeModal({
            title: 'Urgent State Public Announcement',
            message: marqueeText,
          })
        }
      />

      {/* 2. ACCESSIBILITY UTILITY BAR */}
      <AccessibilityBar
        fontSizeDelta={fontSizeDelta}
        onAdjustFontSize={handleAdjustFontSize}
        isHighContrast={isHighContrast}
        onToggleHighContrast={handleToggleHighContrast}
        language={language}
        onChangeLanguage={handleChangeLanguage}
        onEmergencyClick={() => setShowEmergency(true)}
      />

      {/* 3. TOP NAV BAR */}
      <NavBar
        currentTab={currentTab}
        onNavigateTab={handleNavigateTab}
        onOpenHelp={() => setShowHelp(true)}
        onEmergencyClick={() => setShowEmergency(true)}
        onOpenAuth={() => {
          setAuthRole('citizen');
          handleNavigateTab('tab-auth');
        }}
      />

      {/* 4. MAIN INTERACTIVE 3-TAB CONTROLLER */}
      <PortalTabNav currentTab={currentTab} onSelectTab={(tab) => handleNavigateTab(tab)} />

      {/* 5. MAIN CONTENT CONTAINER */}
      <main className="flex-grow max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-6 md:py-8">
        {/* ========================================== */}
        {/* TAB 1: HOME & PUBLIC PORTAL                */}
        {/* ========================================== */}
        {currentTab === 'tab-home' && (
          <HomePublicPortal
            onNavigateTab={handleNavigateTab}
            onSetDashboardRole={setDashRole}
            onSetAuthPortalRole={setAuthRole}
            onOpenDocsModal={() => setShowDocs(true)}
            onOpenElderModal={() => setShowElder(true)}
            onOpenOfficesModal={() => setShowOffices(true)}
            onAddStall={handleAddStall}
            onShowNotice={(title, message) => setNoticeModal({ title, message })}
          />
        )}

        {/* ========================================== */}
        {/* TAB 2: ROLE-GATED AUTHENTICATION (4 PORTALS)*/}
        {/* ========================================== */}
        {currentTab === 'tab-auth' && (
          <RoleGatedAuth
            currentRole={authRole}
            onChangeRole={setAuthRole}
            onNavigateTab={setCurrentTab}
            onSetDashboardRole={setDashRole}
          />
        )}

        {/* ========================================== */}
        {/* TAB 3: SMART DASHBOARDS (MULTI-ROLE VIEWS) */}
        {/* ========================================== */}
        {currentTab === 'tab-dash' && (
          <div className="space-y-6" id="tab-dash">
            {/* ROLE VIEW CONTROLLER PILLS */}
            <div className="bg-surface-container rounded-xl p-3 border-2 border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">switch_account</span>
                <span className="font-label-lg text-sm sm:text-base text-on-surface font-bold">
                  Switch Operational Role View:
                </span>
              </div>

              <div className="flex p-1 bg-surface-container-highest rounded-lg border border-outline w-full sm:w-auto">
                <button
                  className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    dashRole === 'citizen'
                      ? 'bg-primary-container text-on-primary-container shadow'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setDashRole('citizen')}
                >
                  Citizen Dashboard
                </button>
                <button
                  className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    dashRole === 'staff'
                      ? 'bg-primary-container text-on-primary-container shadow'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setDashRole('staff')}
                >
                  Staff Operations Hub
                </button>
                <button
                  className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded font-label-md text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    dashRole === 'official'
                      ? 'bg-primary-container text-on-primary-container shadow'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setDashRole('official')}
                >
                  Official Executive Desk
                </button>
              </div>
            </div>

            {/* DASHBOARD VIEWS */}
            {dashRole === 'citizen' && (
              <CitizenDashboard
                activeToken={activeToken}
                stalls={stalls}
                onCreateToken={handleCreateToken}
                onOpenTokenPassModal={() => setShowTokenPass(true)}
                onLocateStall={(stall) => setLocatedStall(stall)}
              />
            )}

            {dashRole === 'staff' && (
              <StaffOperationsHub
                tokens={tokens}
                onUpdateTokens={setTokens}
                onAnnounceToken={(text) => {
                  // Announcement callback
                }}
              />
            )}

            {dashRole === 'official' && (
              <OfficialExecutiveDesk
                grievances={grievances}
                onUpdateMarquee={setMarqueeText}
                onUpdateGrievances={setGrievances}
              />
            )}
          </div>
        )}
      </main>

      {/* 6. MODALS & DRAWERS */}
      <Modals
        showHelp={showHelp}
        onCloseHelp={() => setShowHelp(false)}
        showDocs={showDocs}
        onCloseDocs={() => setShowDocs(false)}
        showElder={showElder}
        onCloseElder={() => setShowElder(false)}
        showEmergency={showEmergency}
        onCloseEmergency={() => setShowEmergency(false)}
        showOffices={showOffices}
        onCloseOffices={() => setShowOffices(false)}
        showTokenPass={showTokenPass}
        onCloseTokenPass={() => setShowTokenPass(false)}
        activeToken={activeToken}
        noticeModal={noticeModal}
        onCloseNotice={() => setNoticeModal(null)}
        locatedStall={locatedStall}
        onCloseLocatedStall={() => setLocatedStall(null)}
      />

      {/* 7. FOOTER */}
      <Footer
        onEmergencyClick={() => setShowEmergency(true)}
        onOpenGrievances={() => {
          setDashRole('official');
          handleNavigateTab('tab-dash');
        }}
        onOpenFaq={() => setShowHelp(true)}
        onShowAccessibilityStatement={() =>
          alert(
            'Accessibility Statement:\n\nSmartSeva Portal is designed in full compliance with WCAG 2.1 AAA Accessibility Guidelines, featuring tactile touch targets (min 48px), high-contrast palettes, scalable fonts, voice-chime announcements, and bilingual readouts.'
          )
        }
        onShowPrivacyPolicy={() =>
          alert(
            'Citizen Privacy Policy:\n\nYour Aadhaar numbers and biometric records are authenticated strictly in-memory per UIDAI 2016 regulations. Queue tokens do not expose personal identifiable data.'
          )
        }
      />
    </div>
  );
}
