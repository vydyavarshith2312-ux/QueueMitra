import React, { useState } from 'react';
import { AuthPortalRole, DashboardRole, GlobalTab } from '../types';

interface RoleGatedAuthProps {
  currentRole: AuthPortalRole;
  onChangeRole: (role: AuthPortalRole) => void;
  onNavigateTab: (tab: GlobalTab) => void;
  onSetDashboardRole: (role: DashboardRole) => void;
}

export const RoleGatedAuth: React.FC<RoleGatedAuthProps> = ({
  currentRole,
  onChangeRole,
  onNavigateTab,
  onSetDashboardRole,
}) => {
  // Citizen state
  const [citizenMethod, setCitizenMethod] = useState<'mobile' | 'aadhaar' | 'google'>('mobile');
  const [citizenPhone, setCitizenPhone] = useState('98765 43210');
  const [citizenOtp, setCitizenOtp] = useState('849201');
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);

  // Staff state
  const [counterId, setCounterId] = useState('C-04');
  const [staffOfficerId, setStaffOfficerId] = useState('OFF-TS-8402');
  const [staffPin, setStaffPin] = useState('••••••••');
  const [biometricScanned, setBiometricScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Official state
  const [officialCircle, setOfficialCircle] = useState('Ranga Reddy - Shamshabad Division');
  const [officialDesignation, setOfficialDesignation] = useState('Mandal Revenue Officer (MRO / Tehsildar)');
  const [officialGovMail, setOfficialGovMail] = useState('mro.shamshabad@telangana.gov.in');

  // Vendor state
  const [vendorName, setVendorName] = useState('Sri Balaji Xerox & e-Seva Point');
  const [vendorLicense, setVendorLicense] = useState('GHMC-TRD-2024-991');
  const [vendorOffice, setVendorOffice] = useState('Opposite Shamshabad Tehsildar Office');
  const [vendorPhone, setVendorPhone] = useState('94400 11223');
  const [googleMerchantLinked, setGoogleMerchantLinked] = useState(false);

  const handleCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Citizen Authentication Verified! Redirecting to Citizen Dashboard.');
    onSetDashboardRole('citizen');
    onNavigateTab('tab-dash');
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Officer ${staffOfficerId} Verified! Terminal Counter ${counterId} Online.`);
    onSetDashboardRole('staff');
    onNavigateTab('tab-dash');
  };

  const handleOfficialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Executive Clearance Granted for ${officialDesignation} (${officialCircle}). Welcome to Executive Desk.`);
    onSetDashboardRole('official');
    onNavigateTab('tab-dash');
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Stall Verified: '${vendorName}' (${vendorLicense}) registered at ${vendorOffice}.`);
    onSetDashboardRole('citizen');
    onNavigateTab('tab-dash');
  };

  const triggerBiometricScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setBiometricScanned(true);
      alert('✓ Morpho MSO1300 Device Scan Complete: Biometric Match Score 98.4%.');
    }, 1200);
  };

  return (
    <div className="space-y-space-md" id="tab-auth">
      <div className="bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm">
        <div className="max-w-xl mx-auto text-center mb-6">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
            Unified Portal Access Gateway
          </h2>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-1">
            Select your designated public or administrative identity role to authenticate.
          </p>
        </div>

        {/* 4-Tab Auth Switcher Nav */}
        <div className="flex flex-wrap border-b-2 border-outline-variant max-w-4xl mx-auto mb-8 justify-center gap-1">
          <button
            className={`px-4 sm:px-5 py-3 border-b-4 font-label-lg text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer ${
              currentRole === 'citizen'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => onChangeRole('citizen')}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">person</span>
            <span>1. Citizen Access</span>
          </button>

          <button
            className={`px-4 sm:px-5 py-3 border-b-4 font-label-lg text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer ${
              currentRole === 'staff'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => onChangeRole('staff')}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">desk</span>
            <span>2. Staff / Operator</span>
          </button>

          <button
            className={`px-4 sm:px-5 py-3 border-b-4 font-label-lg text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer ${
              currentRole === 'official'
                ? 'border-tertiary text-tertiary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => onChangeRole('official')}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">assured_workload</span>
            <span>3. Gov Official</span>
          </button>

          <button
            className={`px-4 sm:px-5 py-3 border-b-4 font-label-lg text-sm sm:text-base font-bold flex items-center gap-2 transition-all cursor-pointer ${
              currentRole === 'vendor'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => onChangeRole('vendor')}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">print</span>
            <span>4. Stall / Shop Reg</span>
          </button>
        </div>

        {/* AUTH PANEL CONTAINER */}
        <div className="max-w-2xl mx-auto">
          {/* ========================================== */}
          {/* PORTAL 1: CITIZEN ACCESS                   */}
          {/* ========================================== */}
          {currentRole === 'citizen' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-primary text-sm text-on-surface flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0">info</span>
                <div>
                  <strong className="font-bold">Citizen Privileges:</strong> Instant queue tokens, elder priority lanes (65+), and automated SMS sync for offline visits.
                </div>
              </div>

              {/* Login Method Radios */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-3 rounded-lg border-2 font-label-md text-xs sm:text-sm font-bold text-center cursor-pointer transition-colors ${
                    citizenMethod === 'mobile'
                      ? 'border-primary bg-primary-fixed text-on-primary-fixed'
                      : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setCitizenMethod('mobile')}
                  type="button"
                >
                  Mobile OTP
                </button>
                <button
                  className={`p-3 rounded-lg border-2 font-label-md text-xs sm:text-sm font-bold text-center cursor-pointer transition-colors ${
                    citizenMethod === 'aadhaar'
                      ? 'border-primary bg-primary-fixed text-on-primary-fixed'
                      : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setCitizenMethod('aadhaar')}
                  type="button"
                >
                  Aadhaar (UIDAI)
                </button>
                <button
                  className={`p-3 rounded-lg border-2 font-label-md text-xs sm:text-sm font-bold text-center cursor-pointer transition-colors ${
                    citizenMethod === 'google'
                      ? 'border-primary bg-primary-fixed text-on-primary-fixed'
                      : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container'
                  }`}
                  onClick={() => setCitizenMethod('google')}
                  type="button"
                >
                  Google SSO
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleCitizenSubmit}>
                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="citizen-phone">
                    {citizenMethod === 'aadhaar'
                      ? '12-Digit UIDAI Aadhaar Number'
                      : citizenMethod === 'google'
                      ? 'Registered Gmail Address'
                      : 'Registered Mobile Number'}{' '}
                    <span className="text-error">*</span>
                  </label>

                  <div className="relative">
                    {citizenMethod === 'mobile' && (
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm sm:text-base">
                        +91
                      </span>
                    )}
                    <input
                      className={`w-full min-h-[52px] sm:min-h-[56px] pr-4 rounded-lg border-2 border-outline focus:border-secondary focus:ring-4 focus:ring-secondary/20 text-sm sm:text-base bg-surface ${
                        citizenMethod === 'mobile' ? 'pl-14' : 'pl-4'
                      }`}
                      id="citizen-phone"
                      placeholder={
                        citizenMethod === 'aadhaar'
                          ? '4810 9920 1140'
                          : citizenMethod === 'google'
                          ? 'citizen.rao@gmail.com'
                          : '98765 43210'
                      }
                      required
                      type={citizenMethod === 'google' ? 'email' : 'text'}
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1.5">
                    {citizenMethod === 'aadhaar'
                      ? 'UIDAI OTP will be transmitted to Aadhaar-linked mobile.'
                      : 'You will receive an instant 6-digit OTP via Government NIC Gateway.'}
                  </p>
                </div>

                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="citizen-otp">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    className="w-full min-h-[52px] sm:min-h-[56px] px-4 rounded-lg border-2 border-outline text-center tracking-[0.5em] font-headline-md text-lg sm:text-xl bg-surface"
                    id="citizen-otp"
                    maxLength={6}
                    placeholder="• • • • • •"
                    type="text"
                    value={citizenOtp}
                    onChange={(e) => setCitizenOtp(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    className="w-6 h-6 rounded border-2 border-outline text-primary focus:ring-secondary cursor-pointer"
                    id="senior-citizen-check"
                    type="checkbox"
                    checked={isSeniorCitizen}
                    onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                  />
                  <label className="font-label-md text-xs sm:text-sm text-on-surface cursor-pointer select-none" htmlFor="senior-citizen-check">
                    Senior Citizen (Age 65+) or Divyangjan (Fast-Track Priority Eligibility)
                  </label>
                </div>

                <button
                  className="w-full min-h-[52px] sm:min-h-[56px] rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  type="submit"
                >
                  <span>Authenticate Citizen Portal</span>
                  <span className="material-symbols-outlined">login</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================== */}
          {/* PORTAL 2: STAFF / OPERATOR ACCESS          */}
          {/* ========================================== */}
          {currentRole === 'staff' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-secondary text-sm text-on-surface flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px] shrink-0">badge</span>
                <div>
                  <strong className="font-bold">Staff Console Access:</strong> Requires active Counter Terminal ID and Biometric passkey.
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleStaffSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="staff-counter">
                      Assigned Counter ID
                    </label>
                    <select
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="staff-counter"
                      value={counterId}
                      onChange={(e) => setCounterId(e.target.value)}
                    >
                      <option value="Counter 04">Counter 04 (Aadhaar & Certificates)</option>
                      <option value="Counter 01">Counter 01 (Token Triage & Enquiry)</option>
                      <option value="Counter 02">Counter 02 (Land Records & Mutation)</option>
                      <option value="Counter 07">Counter 07 (Pensions & Senior Desk)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="staff-user">
                      Operator Officer ID
                    </label>
                    <input
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="staff-user"
                      required
                      type="text"
                      value={staffOfficerId}
                      onChange={(e) => setStaffOfficerId(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="staff-pin">
                    Security PIN / Passphrase
                  </label>
                  <input
                    className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                    id="staff-pin"
                    required
                    type="password"
                    value={staffPin}
                    onChange={(e) => setStaffPin(e.target.value)}
                  />
                </div>

                {/* Biometric simulation */}
                <div className="p-4 rounded-lg border-2 border-dashed border-secondary bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[36px] ${
                        biometricScanned ? 'text-tertiary' : isScanning ? 'text-primary animate-pulse' : 'text-secondary'
                      }`}
                    >
                      fingerprint
                    </span>
                    <div>
                      <strong className="font-label-md text-sm font-bold text-on-surface block">
                        Biometric RD Service (Registered Device)
                      </strong>
                      <span className="text-xs font-bold text-tertiary">
                        {isScanning
                          ? '● Capturing Biometrics...'
                          : biometricScanned
                          ? '✓ Morpho Device Match Score: 98.4%'
                          : '● Morpho MSO1300 Device Ready'}
                      </span>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                      biometricScanned
                        ? 'bg-tertiary text-white'
                        : isScanning
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-on-secondary hover:bg-on-secondary-container'
                    }`}
                    onClick={triggerBiometricScan}
                    type="button"
                    disabled={isScanning}
                  >
                    {isScanning ? 'Scanning...' : biometricScanned ? 'Re-scan Finger' : 'Scan Finger'}
                  </button>
                </div>

                <button
                  className="w-full min-h-[52px] sm:min-h-[56px] rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  type="submit"
                >
                  <span>Open {counterId} Queue Hub</span>
                  <span className="material-symbols-outlined">desktop_windows</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================== */}
          {/* PORTAL 3: GOVERNMENT OFFICIAL ACCESS       */}
          {/* ========================================== */}
          {currentRole === 'official' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-tertiary text-sm text-on-surface flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0">admin_panel_settings</span>
                <div>
                  <strong className="font-bold">Executive Officer Access:</strong> Tehsildars, Revenue Divisional Officers (RDO), and District Collectors.
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleOfficialSubmit}>
                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="official-circle">
                    Jurisdiction District / Circle
                  </label>
                  <select
                    className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                    id="official-circle"
                    value={officialCircle}
                    onChange={(e) => setOfficialCircle(e.target.value)}
                  >
                    <option value="Ranga Reddy - Shamshabad Division">Ranga Reddy - Shamshabad Division</option>
                    <option value="Hyderabad Central - Khairatabad">Hyderabad Central - Khairatabad</option>
                    <option value="Medchal-Malkajgiri Circle">Medchal-Malkajgiri Circle</option>
                    <option value="Sangareddy West Circle">Sangareddy West Circle</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="official-designation">
                    Designation
                  </label>
                  <select
                    className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                    id="official-designation"
                    value={officialDesignation}
                    onChange={(e) => setOfficialDesignation(e.target.value)}
                  >
                    <option value="Mandal Revenue Officer (MRO / Tehsildar)">Mandal Revenue Officer (MRO / Tehsildar)</option>
                    <option value="Revenue Divisional Officer (RDO)">Revenue Divisional Officer (RDO)</option>
                    <option value="District Collectorate Public Grievance Officer">
                      District Collectorate Public Grievance Officer
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="official-govmail">
                    Official Gov Email ID / e-Office ID
                  </label>
                  <input
                    className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                    id="official-govmail"
                    required
                    type="email"
                    value={officialGovMail}
                    onChange={(e) => setOfficialGovMail(e.target.value)}
                  />
                </div>

                <button
                  className="w-full min-h-[52px] sm:min-h-[56px] rounded-lg bg-tertiary text-on-tertiary hover:bg-tertiary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  type="submit"
                >
                  <span>Access Executive Hub & Live Ticker Console</span>
                  <span className="material-symbols-outlined">domain_verification</span>
                </button>
              </form>
            </div>
          )}

          {/* ========================================== */}
          {/* PORTAL 4: STALL / SHOP REGISTRATION        */}
          {/* ========================================== */}
          {currentRole === 'vendor' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-outline text-sm text-on-surface flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[24px] shrink-0">storefront</span>
                <div>
                  <strong className="font-bold">Verified Civic Stall Portal:</strong> For Photocopy/Xerox booths, e-Seva kiosks, Affidavits, and Stamp Paper vendors located within 500m of civic offices.
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleVendorSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="vendor-name">
                      Business / Stall Name <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="vendor-name"
                      placeholder="e.g. Sri Balaji Xerox & e-Seva Point"
                      required
                      type="text"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="vendor-license">
                      Trade License / Kiosk ID <span className="text-error">*</span>
                    </label>
                    <input
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="vendor-license"
                      placeholder="GHMC-TRD-2024-991"
                      required
                      type="text"
                      value={vendorLicense}
                      onChange={(e) => setVendorLicense(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="vendor-office">
                      Nearby Civic Center
                    </label>
                    <select
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="vendor-office"
                      value={vendorOffice}
                      onChange={(e) => setVendorOffice(e.target.value)}
                    >
                      <option value="Opposite Shamshabad Tehsildar Office">Opposite Shamshabad Tehsildar Office</option>
                      <option value="Near Malkajgiri Sub-Registrar">Near Malkajgiri Sub-Registrar</option>
                      <option value="Adjacent to Khairatabad Ward 14">Adjacent to Khairatabad Ward 14</option>
                      <option value="Sangareddy West Revenue Porch">Sangareddy West Revenue Porch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="vendor-phone">
                      Vendor Mobile Contact
                    </label>
                    <input
                      className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                      id="vendor-phone"
                      placeholder="94400 11223"
                      required
                      type="tel"
                      value={vendorPhone}
                      onChange={(e) => setVendorPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-3 bg-surface rounded-lg border border-outline-variant flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs sm:text-sm font-medium">Verify through Google Merchant ID</span>
                  <button
                    className={`px-3 py-1.5 rounded border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      googleMerchantLinked
                        ? 'bg-tertiary text-white border-tertiary'
                        : 'bg-surface-container border-outline text-on-surface hover:bg-surface-container-highest'
                    }`}
                    onClick={() => {
                      setGoogleMerchantLinked(true);
                      alert('Google Merchant Account (Telangana Business Hub) linked successfully.');
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>{googleMerchantLinked ? 'Merchant Linked ✓' : 'Link Google Business'}</span>
                  </button>
                </div>

                <button
                  className="w-full min-h-[52px] sm:min-h-[56px] rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  type="submit"
                >
                  <span>Submit Stall Verification & Login</span>
                  <span className="material-symbols-outlined">how_to_reg</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
