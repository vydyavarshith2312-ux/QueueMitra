import React, { useState } from 'react';
import { StallItem, GlobalTab, AuthPortalRole, DashboardRole } from '../types';

interface HomePublicPortalProps {
  onNavigateTab: (tab: GlobalTab, sectionId?: string) => void;
  onSetDashboardRole: (role: DashboardRole) => void;
  onSetAuthPortalRole: (role: AuthPortalRole) => void;
  onOpenDocsModal: () => void;
  onOpenElderModal: () => void;
  onOpenOfficesModal: () => void;
  onAddStall: (newStall: StallItem) => void;
  onShowNotice: (title: string, message: string) => void;
}

export const HomePublicPortal: React.FC<HomePublicPortalProps> = ({
  onNavigateTab,
  onSetDashboardRole,
  onSetAuthPortalRole,
  onOpenDocsModal,
  onOpenElderModal,
  onOpenOfficesModal,
  onAddStall,
  onShowNotice,
}) => {
  // Stall registration form state
  const [stallName, setStallName] = useState('');
  const [stallCategory, setStallCategory] = useState('Photocopy, Scanning & Form Print');
  const [civicOffice, setCivicOffice] = useState('Ranga Reddy Tehsildar & Sub-Registrar Complex, Gate 2');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [tradeLicense, setTradeLicense] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  const handleSendVendorOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setOtpSent(true);
    alert(`Verification OTP sent to +91-${mobileNumber}! Use code 482910.`);
  };

  const handleRegisterStall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stallName || !ownerName || !mobileNumber) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const newStall: StallItem = {
      id: 'stall-' + Date.now(),
      name: stallName,
      category: stallCategory,
      distance: 'Adjacent to Center',
      services: 'Authorized Token Dispensing, Attested Copies, Official Forms',
      contact: mobileNumber,
      location: `${civicOffice} (Prop: ${ownerName})`,
      verified: true,
      rateCap: 'Govt Regulated Fee Schedule',
    };

    onAddStall(newStall);
    setRegistrationSuccess(stallName);
    alert(
      `🎉 Stall Registration Successful!\n\nBusiness: ${stallName}\nAuthorized Operator: ${ownerName}\nAssigned Circle: ${civicOffice}\n\nYour official Queue Mitra Partner QR Badge & Kit ID have been provisioned and added to the Citizen Directory!`
    );

    // Reset form
    setStallName('');
    setOwnerName('');
    setMobileNumber('');
    setTradeLicense('');
    setOtpSent(false);
  };

  return (
    <div className="space-y-space-lg" id="tab-home">
      {/* ========================================== */}
      {/* HERO CIVIC SECTION                         */}
      {/* ========================================== */}
      <div className="bg-surface-container-low rounded-xl border-2 border-outline-variant p-5 sm:p-8 md:p-10 shadow-[0px_2px_4px_rgba(26,37,54,0.08)] relative overflow-hidden">
        <div className="absolute -right-12 -top-12 opacity-10 text-primary pointer-events-none select-none">
          <span className="material-symbols-outlined text-[200px] sm:text-[260px]">reduce_capacity</span>
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs sm:text-sm font-label-sm font-bold uppercase tracking-wide mb-3 border border-tertiary">
            <span className="material-symbols-outlined text-[16px]">elderly</span>
            <span>Priority Senior Citizens (65+) & Divyangjan Enabled</span>
          </div>

          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface font-extrabold tracking-tight mb-3">
            Civic Visits Made Simple, Dignified & Queue-Free.
          </h1>

          <p className="font-body-xl text-base sm:text-lg md:text-xl text-on-surface-variant mb-6 leading-relaxed">
            Reserve your civic appointment beforehand, receive live token SMS updates, or sync your physical paper slip in real-time. No standing in sweltering corridors.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              className="min-h-[52px] sm:min-h-[56px] px-6 sm:px-8 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center gap-2 sm:gap-3 border-2 border-transparent focus:ring-4 focus:ring-secondary focus:outline-none active:scale-95 cursor-pointer"
              onClick={() => {
                onSetDashboardRole('citizen');
                onNavigateTab('tab-dash', 'booking-form-box');
              }}
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">event_available</span>
              <span>📅 Book an Appointment</span>
            </button>

            <button
              className="min-h-[52px] sm:min-h-[56px] px-5 sm:px-6 rounded-lg bg-surface text-secondary hover:bg-surface-container-high border-2 border-secondary font-label-lg text-sm sm:text-base font-bold transition-all flex items-center gap-2 focus:ring-2 focus:ring-secondary focus:outline-none active:scale-95 cursor-pointer"
              onClick={() => {
                onSetDashboardRole('citizen');
                onNavigateTab('tab-dash', 'active-token-card');
              }}
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">qr_code_scanner</span>
              <span>Track Existing Token</span>
            </button>
          </div>
        </div>

        {/* Live Civic Counters Metric Bar */}
        <div
          className="mt-8 pt-6 border-t-2 border-outline-variant grid grid-cols-1 sm:grid-cols-3 gap-4"
          id="live-queue-sec"
        >
          <div className="bg-surface rounded-lg p-4 border-2 border-outline-variant flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">groups</span>
            </div>
            <div>
              <div className="text-xs font-label-sm text-on-surface-variant uppercase font-bold">
                Citizens Served Today
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl text-tertiary font-extrabold">14,820</div>
              <span className="text-xs text-tertiary font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% faster throughput
              </span>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4 border-2 border-outline-variant flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">timer</span>
            </div>
            <div>
              <div className="text-xs font-label-sm text-on-surface-variant uppercase font-bold">
                Average Wait Time
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl text-primary font-extrabold">18 mins</div>
              <span className="text-xs text-on-surface-variant font-medium">
                Down from 95 mins historical baseline
              </span>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4 border-2 border-outline-variant flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">desktop_windows</span>
            </div>
            <div>
              <div className="text-xs font-label-sm text-on-surface-variant uppercase font-bold">
                Active Counters Online
              </div>
              <div className="font-headline-lg text-2xl sm:text-3xl text-secondary font-extrabold">142</div>
              <span className="text-xs text-secondary font-bold">Across 18 Tehsildar & RTO Hubs</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* QUICK ACTION CARDS (Tactile High-Contrast) */}
      {/* ========================================== */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[28px]">touch_app</span>
            <span>Civic Self-Service Quick Actions</span>
          </h2>
          <span className="text-xs sm:text-sm text-on-surface-variant">Tap any card to initiate direct service</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            className="bg-surface rounded-xl p-5 border-2 border-outline-variant hover:border-secondary hover:shadow-[0px_8px_16px_rgba(26,37,54,0.14)] cursor-pointer transition-all flex flex-col justify-between group min-h-[190px]"
            onClick={() => {
              onSetDashboardRole('citizen');
              onNavigateTab('tab-dash', 'active-token-card');
            }}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">sync_alt</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Check Queue Status</h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                Live position check for any district office token in real-time.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant flex items-center text-secondary font-label-md text-sm font-bold">
              <span>Track Now</span>
              <span className="material-symbols-outlined text-[18px] ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-surface rounded-xl p-5 border-2 border-outline-variant hover:border-secondary hover:shadow-[0px_8px_16px_rgba(26,37,54,0.14)] cursor-pointer transition-all flex flex-col justify-between group min-h-[190px]"
            onClick={onOpenOfficesModal}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-surface-container text-secondary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">distance</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Find a Civic Office</h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                Locate nearest Sub-Registrar, Municipal Ward, or Tehsildar center.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant flex items-center text-secondary font-label-md text-sm font-bold">
              <span>View Directory</span>
              <span className="material-symbols-outlined text-[18px] ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-surface rounded-xl p-5 border-2 border-outline-variant hover:border-primary hover:shadow-[0px_8px_16px_rgba(26,37,54,0.14)] cursor-pointer transition-all flex flex-col justify-between group min-h-[190px]"
            onClick={onOpenDocsModal}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">fact_check</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Documents Checklist</h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                Prevent rejected visits. Find exact attested copies required beforehand.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant flex items-center text-primary font-label-md text-sm font-bold">
              <span>Inspect Checklist</span>
              <span className="material-symbols-outlined text-[18px] ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="bg-surface rounded-xl p-5 border-2 border-outline-variant hover:border-tertiary hover:shadow-[0px_8px_16px_rgba(26,37,54,0.14)] cursor-pointer transition-all flex flex-col justify-between group min-h-[190px]"
            onClick={onOpenElderModal}
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">assist_walker</span>
              </div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Get Elder Assistance</h3>
              <p className="font-body-md text-sm text-on-surface-variant">
                Request wheelchair, ground-floor escort, or priority queue badge.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant flex items-center text-tertiary font-label-md text-sm font-bold">
              <span>Request Helper</span>
              <span className="material-symbols-outlined text-[18px] ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* CIVIC INFORMATION FEED & DESKS             */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="civic-desks-sec">
        {/* Column 1 & 2: About SmartSeva & Live News */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Card */}
          <div className="bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-primary text-[32px]">account_balance</span>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  About SmartSeva (Queue Mitra Initiative)
                </h3>
                <span className="text-xs text-on-surface-variant font-medium">
                  Digital Public Infrastructure (DPI) for Citizen Dignity
                </span>
              </div>
            </div>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
              SmartSeva is mandated by the Department of Administrative Reforms to eradicate chaotic physical lines at local government centers. Combining AI load-balancing, SMS token broadcasts, and dedicated physical assistance booths, we ensure every citizen receives dignified, predictable public service.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                <span className="material-symbols-outlined text-tertiary shrink-0">check_circle</span>
                <div>
                  <strong className="font-label-md text-sm font-bold text-on-surface block">Zero Morning Scramble</strong>
                  <span className="text-xs text-on-surface-variant">
                    Appointments staggered in 15-minute windows with SMS alarms.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                <span className="material-symbols-outlined text-tertiary shrink-0">accessible</span>
                <div>
                  <strong className="font-label-md text-sm font-bold text-on-surface block">Mandatory 65+ Fast Track</strong>
                  <span className="text-xs text-on-surface-variant">
                    Dedicated ground floor seating with automated counter prioritization.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Civic News Card Feed */}
          <div className="bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm">
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface mb-4 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">newspaper</span>
                <span>Latest News & Circle Updates</span>
              </span>
              <span className="text-xs font-label-sm text-on-surface-variant">Updated 12 mins ago</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-error-container text-on-error-container mb-1">
                    Advisory
                  </span>
                  <h4 className="font-label-lg text-sm sm:text-base font-bold text-on-surface">
                    Pahadishareef Sub-Registrar Server Upgrade
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Property registration tokens rescheduled between 2:00 PM – 4:00 PM today.
                  </p>
                </div>
                <button
                  className="px-3 py-1.5 rounded bg-surface border border-outline text-on-surface text-xs font-bold hover:bg-surface-container-highest shrink-0 cursor-pointer self-start sm:self-auto"
                  onClick={() =>
                    onShowNotice(
                      'Pahadishareef Sub-Registrar Server Upgrade',
                      'Notice: Counter operations will resume at 4:15 PM. SMS alerts have been dispatched to all 42 registered token holders. Emergency desk is active.'
                    )
                  }
                >
                  Read Notice
                </button>
              </div>

              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed mb-1">
                    New Facility
                  </span>
                  <h4 className="font-label-lg text-sm sm:text-base font-bold text-on-surface">
                    3 Dedicated Fast-Track Kiosks Deployed at Malkajgiri
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant">
                    Walk-in instant tokens now available with Aadhaar thumbprint authentication.
                  </p>
                </div>
                <button
                  className="px-3 py-1.5 rounded bg-surface border border-outline text-on-surface text-xs font-bold hover:bg-surface-container-highest shrink-0 cursor-pointer self-start sm:self-auto"
                  onClick={() =>
                    onShowNotice(
                      'Malkajgiri Express Kiosks Launched',
                      'Malkajgiri Circle: Now offering express tokens for Caste, Income, and Residence certificates. Average token wait time cut to 9 minutes.'
                    )
                  }
                >
                  Read Notice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Official Administrative Entry Gateway */}
        <div className="space-y-6">
          <div className="bg-surface-container rounded-xl border-2 border-secondary p-6 shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[30px]">shield_person</span>
              </div>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface mb-2">
                Official Administrative Gateway
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                Counter Operators, Circle Tehsildars, and Verified Xerox Stall Partners must access their designated secure terminals below.
              </p>

              <div className="space-y-3">
                <button
                  className="w-full min-h-[50px] px-4 rounded-lg bg-surface text-secondary border-2 border-secondary hover:bg-surface-container-highest font-label-md text-sm font-bold flex items-center justify-between transition-colors cursor-pointer"
                  onClick={() => {
                    onSetAuthPortalRole('staff');
                    onNavigateTab('tab-auth');
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">desk</span> Staff Counter Hub
                  </span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>

                <button
                  className="w-full min-h-[50px] px-4 rounded-lg bg-surface text-secondary border-2 border-secondary hover:bg-surface-container-highest font-label-md text-sm font-bold flex items-center justify-between transition-colors cursor-pointer"
                  onClick={() => {
                    onSetAuthPortalRole('official');
                    onNavigateTab('tab-auth');
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span> Executive Officer Portal
                  </span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>

                <div className="space-y-1.5">
                  <button
                    className="w-full min-h-[50px] px-4 rounded-lg bg-surface text-primary border-2 border-primary hover:bg-surface-container-highest font-label-md text-sm font-bold flex items-center justify-between transition-colors cursor-pointer"
                    onClick={() => {
                      onSetAuthPortalRole('vendor');
                      onNavigateTab('tab-auth');
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">storefront</span> Xerox / Stall Partner Portal
                    </span>
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                  <div className="flex justify-end pr-1">
                    <a
                      href="#stall-registration-sec"
                      className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">add_business</span> New Stall? Register Here
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant text-xs text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">security</span>
              <span>256-Bit SSL Encrypted National GovNet Gateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* STALL & LOCAL VENDOR REGISTRATION SECTION  */}
      {/* ========================================== */}
      <section
        id="stall-registration-sec"
        aria-label="Stall & Local Vendor Registration"
        className="bg-surface rounded-xl border-2 border-primary shadow-[0px_4px_12px_rgba(147,71,0,0.12)] p-6 md:p-8 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b-2 border-outline-variant">
          <div className="max-w-2xl">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-bold uppercase tracking-wider mb-2 border border-primary">
                <span className="material-symbols-outlined text-[16px]">verified</span> PARTNER WITH CIVIC OFFICES
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
              Register Your Xerox, Notary, or Kiosk Stall
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
              Empower local citizens by becoming an authorized Queue Mitra partner: issue offline paper slips, sync walk-in tokens, and verify pre-visit document checklists.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-label-sm text-on-surface-variant font-bold">
              <span className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Zero Commission
              </span>
              <span className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-[16px]">hub</span> Direct NIC Integration
              </span>
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">badge</span> Verified Vendor Kit & QR Badge
              </span>
            </div>
          </div>

          <div className="bg-surface-container p-4 rounded-xl border border-outline-variant shrink-0 max-w-xs space-y-2">
            <div className="font-label-md text-sm font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">handshake</span> Partner Perks
            </div>
            <ul className="text-xs text-on-surface-variant space-y-1.5">
              <li>✓ Listed on citizen queue tracking screen (30m away indicator)</li>
              <li>✓ Certified rate display preventing price disputes</li>
              <li>✓ Early access to daily appointment influx schedules</li>
            </ul>
          </div>
        </div>

        {registrationSuccess && (
          <div className="mt-4 p-4 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <div>
                <strong>{registrationSuccess}</strong> is registered as an Authorized Queue Mitra Stall!
                <div className="text-xs">Now displayed in the Nearby Verified Support Stalls list.</div>
              </div>
            </div>
            <button
              className="text-xs font-bold underline cursor-pointer"
              onClick={() => {
                onSetDashboardRole('citizen');
                onNavigateTab('tab-dash', 'stalls-directory');
              }}
            >
              View in Directory
            </button>
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={handleRegisterStall}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-stall-name">
                Business / Stall Name <span className="text-error">*</span>
              </label>
              <input
                className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface focus:ring-4 focus:ring-secondary/20"
                id="reg-stall-name"
                placeholder="e.g. Sai Balaji Xerox & Form Center"
                required
                type="text"
                value={stallName}
                onChange={(e) => setStallName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-stall-cat">
                Stall Category <span className="text-error">*</span>
              </label>
              <select
                className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                id="reg-stall-cat"
                required
                value={stallCategory}
                onChange={(e) => setStallCategory(e.target.value)}
              >
                <option value="Photocopy, Scanning & Form Print">Photocopy, Scanning & Form Print</option>
                <option value="Notary, Stamp Paper & Affidavit">Notary, Stamp Paper & Affidavit</option>
                <option value="Affidavit & Legal Drafting">Affidavit & Legal Drafting</option>
                <option value="CSC / e-Seva Citizen Kiosk">CSC / e-Seva Citizen Kiosk</option>
                <option value="Tea, Refreshments & Water Stand">Tea, Refreshments & Water Stand</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-civic-office">
                Attached Civic Office / Center <span className="text-error">*</span>
              </label>
              <select
                className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                id="reg-civic-office"
                required
                value={civicOffice}
                onChange={(e) => setCivicOffice(e.target.value)}
              >
                <option value="Ranga Reddy Tehsildar & Sub-Registrar Complex, Gate 2">
                  Ranga Reddy Tehsildar & Sub-Registrar Complex, Gate 2
                </option>
                <option value="Hyderabad Central Collectorate Hub, Outer Gate">
                  Hyderabad Central Collectorate Hub, Outer Gate
                </option>
                <option value="Medchal Malkajgiri Sub-Registrar Lane">Medchal Malkajgiri Sub-Registrar Lane</option>
                <option value="Sangareddy West Revenue Division Porch">Sangareddy West Revenue Division Porch</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-owner-name">
                Vendor Owner Name <span className="text-error">*</span>
              </label>
              <input
                className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                id="reg-owner-name"
                placeholder="Full legal name"
                required
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-owner-mobile">
                Mobile Number (OTP-linked) <span className="text-error">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                  id="reg-owner-mobile"
                  placeholder="10-digit mobile"
                  required
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <button
                  className={`px-3 min-h-[48px] rounded-lg border-2 font-bold text-xs shrink-0 cursor-pointer ${
                    otpSent
                      ? 'bg-tertiary text-white border-tertiary'
                      : 'bg-surface border-primary text-primary hover:bg-primary-fixed'
                  }`}
                  type="button"
                  onClick={handleSendVendorOtp}
                >
                  {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="reg-trade-license">
                Trade License / Permit / Kiosk ID
              </label>
              <input
                className="w-full min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                id="reg-trade-license"
                placeholder="GHMC-TRD-2024-XXXX (Optional)"
                type="text"
                value={tradeLicense}
                onChange={(e) => setTradeLicense(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-2">
              Authorized Services Provided to Queue Citizens:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-outline bg-surface-container-low cursor-pointer hover:bg-surface-container">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-outline text-primary focus:ring-secondary cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-on-surface">Physical Paper Token Dispensing & Sync</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-outline bg-surface-container-low cursor-pointer hover:bg-surface-container">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-outline text-primary focus:ring-secondary cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-on-surface">Aadhaar & Attestation Certified Xerox</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-outline bg-surface-container-low cursor-pointer hover:bg-surface-container">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-outline text-primary focus:ring-secondary cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-on-surface">Elderly & Divyangjan Queue Assistance</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">verified_user</span>
              <span>Verification completed within 2 business hours by Mandal Executive Officer.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onSetAuthPortalRole('vendor');
                  onNavigateTab('tab-auth');
                }}
                className="min-h-[48px] px-5 rounded-lg bg-surface border-2 border-outline text-on-surface font-label-md text-xs sm:text-sm font-bold hover:bg-surface-container w-full sm:w-auto cursor-pointer"
              >
                Already Registered? Log In
              </button>

              <button
                type="submit"
                className="min-h-[48px] px-6 sm:px-7 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                <span>Register Stall & Get Authorized QR Badge</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
