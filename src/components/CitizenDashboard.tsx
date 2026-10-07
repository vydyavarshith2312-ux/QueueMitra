import React, { useState } from 'react';
import { TokenItem, StallItem, ChatMessage } from '../types';
import { SERVICE_DOCUMENT_CHECKLIST } from '../data/mockData';

interface CitizenDashboardProps {
  activeToken: TokenItem;
  stalls: StallItem[];
  onCreateToken: (token: TokenItem) => void;
  onOpenTokenPassModal: () => void;
  onLocateStall: (stall: StallItem) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  activeToken,
  stalls,
  onCreateToken,
  onOpenTokenPassModal,
  onLocateStall,
}) => {
  // Booking Form State
  const [bookOffice, setBookOffice] = useState('Ranga Reddy - Shamshabad Tehsildar & Land Office');
  const [bookCategory, setBookCategory] = useState('pension');
  const [seniorPriority, setSeniorPriority] = useState(true);
  const [disabilityAssist, setDisabilityAssist] = useState(false);
  const [preferredTime, setPreferredTime] = useState('Immediate Next Available (~15 mins)');
  const [citizenName, setCitizenName] = useState('Smt. Lakshmi Devi Rao');
  const [citizenContact, setCitizenContact] = useState('9876543210');

  // Offline Token OCR Sync State
  const [manualSlipCode, setManualSlipCode] = useState('');
  const [syncedSlip, setSyncedSlip] = useState<string | null>(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);

  // Seva Mitra AI Assistant State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text:
        'Namaste! I am <strong>Seva Mitra</strong>, your public queue assistant. How can I assist you with your civic appointment or token today? Ask me about documents, senior priority, or office timings.',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // Handle New Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenPrefix = seniorPriority ? 'SM-' : disabilityAssist ? 'D-' : 'T-';
    const randomNum = Math.floor(400 + Math.random() * 80);
    const generatedCode = `${tokenPrefix}${randomNum}`;

    const serviceNameMap: Record<string, string> = {
      aadhaar: 'Aadhaar Card Biometric Update / Correction',
      pension: 'Senior Citizen Aasara Pension Verification',
      'caste-income': 'Caste & Income Certificate Endorsement',
      'land-mutation': 'Land Pattadar Passbook Mutation Inquiry',
      'trade-license': 'Municipal Trade License & Property Tax NOC',
    };

    const newToken: TokenItem = {
      id: 'tok-' + Date.now(),
      code: generatedCode,
      citizenName: citizenName || 'Citizen Applicant',
      phone: citizenContact || '9876543210',
      service: serviceNameMap[bookCategory] || 'Civic Verification',
      category: seniorPriority ? 'Senior (65+)' : disabilityAssist ? 'Divyangjan' : 'Standard',
      counter: seniorPriority ? 'Counter 07 (Pensions & Senior Desk)' : 'Counter 04',
      status: 'CALLED / SERVING',
      position: seniorPriority ? 1 : 3,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSenior: seniorPriority,
      needsAssistance: disabilityAssist,
    };

    onCreateToken(newToken);
    alert(
      `🎉 Appointment Confirmed!\n\nToken Number: ${generatedCode}\nApplicant: ${citizenName}\nLocation: ${bookOffice}\nPriority: ${
        seniorPriority ? 'Senior Citizen Fast-Track (Hall B)' : 'General Public'
      }\n\nYour digital pass has been generated!`
    );

    const card = document.getElementById('active-token-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // OCR Slip Sync
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsOcrProcessing(true);
      setTimeout(() => {
        setIsOcrProcessing(false);
        setSyncedSlip('RR-9104');
        alert(
          '✓ Physical Paper Slip OCR Completed!\n\nRecognized Slip #RR-9104 from Shamshabad Kiosk.\nEstimated wait: ~14 mins at Counter 04.'
        );
      }, 1500);
    }
  };

  const handleManualSlipSync = () => {
    if (!manualSlipCode.trim()) {
      alert('Please enter a slip code (e.g. RR-9104).');
      return;
    }
    const cleanCode = manualSlipCode.trim().toUpperCase();
    setSyncedSlip(cleanCode);
    alert(`✓ Physical Token ${cleanCode} synced to your phone! Live alerts active.`);
  };

  // Seva Mitra bot response logic
  const sendBotResponse = (userQuestion: string) => {
    const q = userQuestion.toLowerCase();
    let reply =
      'For civic services, please carry your Original Aadhaar Card and address proof. Government tokens are 100% free with zero agent charges.';

    if (q.includes('pension')) {
      reply =
        '<strong>Aasara Pension Prerequisites:</strong><br/>• Original Aadhaar Card with matching date of birth<br/>• Age proof certifying 65+ years<br/>• Active Bank Passbook with IFSC<br/>• 2 passport-size photographs<br/>Senior citizens are prioritized at ground floor <strong>Counter 07</strong> with zero stairs.';
    } else if (q.includes('wheelchair') || q.includes('disab') || q.includes('elder')) {
      reply =
        '<strong>Mobility & Wheelchair Assistance:</strong><br/>Complimentary wheelchairs and escorts are stationed at <strong>Desk 00 (Lobby Reception)</strong>. You can also dial toll-free <strong>1800-425-SEVA</strong> to reserve an escort at the arrival gate.';
    } else if (q.includes('miss') || q.includes('skip') || q.includes('late')) {
      reply =
        '<strong>Missed Token Policy:</strong><br/>If your token is called while you are away, the operator places it on a <strong>15-Minute Temporary Hold</strong>. Simply report to Counter 04 to be queued as the immediate next candidate.';
    } else if (q.includes('caste') || q.includes('income')) {
      reply =
        '<strong>Caste & Income Certificates:</strong><br/>• Ration Card copy<br/>• School/College TC indicating caste<br/>• ₹10 Court fee stamp (available at Stall #02)<br/>• Standard turnaround SLA: 48 hours via MeeSeva portal.';
    } else if (q.includes('fee') || q.includes('price') || q.includes('cost')) {
      reply =
        '<strong>Regulated Government Fee Caps:</strong><br/>• Queue Token: ₹0 (FREE)<br/>• Xerox at authorized stalls: ₹1.50/page maximum<br/>• Non-judicial stamp paper: Printed face value<br/>Report any overcharging to 1800-425-SEVA.';
    }

    const botMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, botMsg]);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setTimeout(() => sendBotResponse(userText), 500);
  };

  const handlePresetQuery = (preset: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: preset,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setTimeout(() => sendBotResponse(preset), 400);
  };

  const handleSendSmsUpdate = () => {
    alert(
      `📲 SMS Sent to ${activeToken.phone}:\n\n"SmartSeva Alert: Your token ${activeToken.code} is scheduled at Counter 04 in ~12 mins. Please proceed to Hall B."`
    );
  };

  return (
    <div className="space-y-space-lg" id="dash-view-citizen">
      {/* ============================================== */}
      {/* TOP BENTO ROW: BOOKING INTAKE & LIVE TOKEN CARD*/}
      {/* ============================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: BOOKING INTAKE FORM (7 COLS) */}
        <div className="lg:col-span-7 bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm" id="booking-form-box">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant">
            <div>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <span>New Civic Appointment Booking</span>
              </h3>
              <span className="text-xs text-on-surface-variant">Step 1 of 2: Reserve your instant slot</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase">
              Open for Today
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleBookingSubmit}>
            {/* Office Selector */}
            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="book-office">
                Select Civic Center / Tehsil Office <span className="text-error">*</span>
              </label>
              <select
                className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface focus:ring-4 focus:ring-secondary/20"
                id="book-office"
                required
                value={bookOffice}
                onChange={(e) => setBookOffice(e.target.value)}
              >
                <option value="Ranga Reddy - Shamshabad Tehsildar & Land Office">
                  Ranga Reddy - Shamshabad Tehsildar & Land Office
                </option>
                <option value="Hyderabad Urban - Khairatabad Collectorate Hub">
                  Hyderabad Urban - Khairatabad Collectorate Hub
                </option>
                <option value="Secunderabad Sub-Registrar & Stamp Office">Secunderabad Sub-Registrar & Stamp Office</option>
                <option value="Medchal District Citizen Services Center">Medchal District Citizen Services Center</option>
                <option value="Sangareddy West Revenue Division Porch">Sangareddy West Revenue Division Porch</option>
              </select>
            </div>

            {/* Service Category */}
            <div>
              <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="book-category">
                Service Category <span className="text-error">*</span>
              </label>
              <select
                className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base text-on-surface"
                id="book-category"
                required
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value)}
              >
                <option value="pension">Senior Citizen Aasara Pension Verification</option>
                <option value="aadhaar">Aadhaar Card Biometric Update / Correction</option>
                <option value="caste-income">Caste & Income Certificate Endorsement</option>
                <option value="land-mutation">Land Pattadar Passbook Mutation Inquiry</option>
                <option value="trade-license">Municipal Trade License & Property Tax NOC</option>
              </select>
            </div>

            {/* High Contrast Accessibility Toggles */}
            <div className="p-4 rounded-lg bg-surface-container border-2 border-outline-variant space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px]">elderly</span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface block">
                      Senior Citizen Fast-Track (65+)
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Allocates dedicated ground floor Counter 07 with no stairs.
                    </span>
                  </div>
                </div>
                <input
                  checked={seniorPriority}
                  onChange={(e) => setSeniorPriority(e.target.checked)}
                  className="w-6 h-6 rounded border-2 border-outline text-primary focus:ring-secondary cursor-pointer"
                  id="senior-priority-toggle"
                  type="checkbox"
                />
              </div>

              <div className="border-t border-outline-variant pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[26px]">accessible</span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface block">
                      Disability Assistance Required
                    </span>
                    <span className="text-xs text-on-surface-variant">Reserve wheelchair escort at entry reception.</span>
                  </div>
                </div>
                <input
                  checked={disabilityAssist}
                  onChange={(e) => setDisabilityAssist(e.target.checked)}
                  className="w-6 h-6 rounded border-2 border-outline text-secondary focus:ring-secondary cursor-pointer"
                  id="disability-toggle"
                  type="checkbox"
                />
              </div>
            </div>

            {/* Preferred Slot & Applicant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="book-time">
                  Preferred Time Window
                </label>
                <select
                  className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                  id="book-time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="Immediate Next Available (~15 mins)">Immediate Next Available (~15 mins)</option>
                  <option value="Morning (10:30 AM - 11:30 AM)">Morning (10:30 AM - 11:30 AM)</option>
                  <option value="Afternoon (02:00 PM - 03:00 PM)">Afternoon (02:00 PM - 03:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1.5" htmlFor="citizen-name">
                  Applicant Full Name
                </label>
                <input
                  className="w-full min-h-[50px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm sm:text-base"
                  id="citizen-name"
                  required
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full min-h-[52px] sm:min-h-[56px] rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-sm sm:text-base font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              type="submit"
            >
              <span className="material-symbols-outlined">confirmation_number</span>
              <span>Generate Priority Digital Token</span>
            </button>
          </form>
        </div>

        {/* RIGHT: LIVE DIGITAL TOKEN CARD (SIGNATURE COMPONENT - 5 COLS) */}
        <div className="lg:col-span-5 flex flex-col" id="active-token-card">
          <div className="bg-surface rounded-xl border-2 border-tertiary shadow-[0px_8px_16px_rgba(26,37,54,0.14)] overflow-hidden flex flex-col justify-between h-full relative">
            {/* 8px Left Status Bar from Design Spec */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-tertiary"></div>

            {/* Upper Quadrant: Big Display Characters */}
            <div className="p-6 pl-8 bg-surface-container-low border-b-2 border-dashed border-outline-variant">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-ping"></span>
                  <span>Live Token: {activeToken.status}</span>
                </span>
                <span className="text-xs font-mono font-bold text-on-surface-variant">NIC-REG-9418</span>
              </div>

              <div className="text-center py-2">
                <div className="text-xs font-label-sm text-on-surface-variant uppercase font-bold tracking-widest mb-1">
                  YOUR SERVICING TOKEN
                </div>
                <div
                  className="font-display-queue text-5xl sm:text-6xl text-tertiary font-extrabold tracking-tight"
                  id="active-token-code"
                >
                  {activeToken.code}
                </div>
                <div className="inline-block bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-1">
                  {activeToken.isSenior ? 'Senior Fast-Track Lane (Hall B)' : 'General Priority Desk'}
                </div>
              </div>
            </div>

            {/* Lower Quadrant: Counter & Live Metrics Context */}
            <div className="p-6 pl-8 space-y-4 bg-surface">
              <div className="grid grid-cols-3 gap-2 text-center border-b border-outline-variant pb-4">
                <div className="p-2 bg-surface-container rounded-lg">
                  <div className="text-[11px] sm:text-xs font-label-sm text-on-surface-variant font-bold">Assigned</div>
                  <div className="font-headline-sm text-base sm:text-lg font-extrabold text-secondary">
                    {activeToken.counter.includes('07') ? 'Desk #07' : 'Desk #04'}
                  </div>
                </div>

                <div className="p-2 bg-surface-container rounded-lg">
                  <div className="text-[11px] sm:text-xs font-label-sm text-on-surface-variant font-bold">Ahead of You</div>
                  <div className="font-headline-sm text-base sm:text-lg font-extrabold text-primary" id="people-ahead-count">
                    {activeToken.isSenior ? '1 Person' : '3 People'}
                  </div>
                </div>

                <div className="p-2 bg-surface-container rounded-lg">
                  <div className="text-[11px] sm:text-xs font-label-sm text-on-surface-variant font-bold">Est. Wait</div>
                  <div className="font-headline-sm text-base sm:text-lg font-extrabold text-tertiary">
                    {activeToken.isSenior ? '~6 Mins' : '~12 Mins'}
                  </div>
                </div>
              </div>

              {/* QR Simulation & Required Documents */}
              <div className="flex items-center gap-4">
                {/* Tactical QR box */}
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container-highest rounded-lg border-2 border-outline flex flex-col items-center justify-center shrink-0 p-1 text-center cursor-pointer hover:bg-surface-container transition-colors"
                  title="Digital verification QR - Click to view pass"
                  onClick={onOpenTokenPassModal}
                >
                  <span className="material-symbols-outlined text-[38px] sm:text-[44px] text-on-surface">qr_code_2</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-on-surface-variant">SCAN AT ENTRY</span>
                </div>

                <div className="space-y-1.5 flex-grow">
                  <div className="font-label-sm text-xs font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">checklist</span>
                    <span>Required Document Pack:</span>
                  </div>
                  <ul className="text-xs space-y-1 text-on-surface-variant">
                    {(SERVICE_DOCUMENT_CHECKLIST[bookCategory] || SERVICE_DOCUMENT_CHECKLIST.pension)
                      .slice(0, 3)
                      .map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-on-surface">
                          <span className="material-symbols-outlined text-[14px] text-tertiary shrink-0 mt-0.5">check</span>
                          <span className="line-clamp-1">{doc}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  className="flex-1 min-h-[44px] rounded-lg bg-secondary text-on-secondary font-label-sm text-xs sm:text-sm font-bold flex items-center justify-center gap-1 hover:bg-on-secondary-container cursor-pointer transition-colors"
                  onClick={onOpenTokenPassModal}
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Save Pass to Phone</span>
                </button>

                <button
                  className="px-3 min-h-[44px] rounded-lg bg-surface border border-outline text-on-surface font-label-sm text-xs sm:text-sm font-bold hover:bg-surface-container cursor-pointer transition-colors"
                  onClick={handleSendSmsUpdate}
                  title="Send SMS Update"
                >
                  <span className="material-symbols-outlined text-[18px]">sms</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* MIDDLE ROW: OFFLINE TOKEN SYNC & NEARBY STALLS */}
      {/* ============================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* OFFLINE TOKEN UPLOAD UTILITY (6 COLS) */}
        <div className="lg:col-span-6 bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">document_scanner</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                  Offline Paper Token Upload Utility
                </h3>
                <span className="text-xs text-on-surface-variant font-medium">
                  Have a printed slip from physical kiosk? Sync to your phone.
                </span>
              </div>
            </div>

            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mb-4">
              If you picked a paper ticket at the physical entrance, scan the slip barcode or type the 6-digit token code below to receive real-time audio & SMS alerts.
            </p>

            {/* Upload Drag / Scan Box */}
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer mb-4 ${
                isOcrProcessing
                  ? 'border-primary bg-primary-fixed/20 animate-pulse'
                  : 'border-outline hover:border-primary bg-surface-container-low'
              }`}
              onClick={() => document.getElementById('file-token-input')?.click()}
            >
              <input
                accept="image/*"
                className="hidden"
                id="file-token-input"
                onChange={handleFileUpload}
                type="file"
              />
              <span className="material-symbols-outlined text-[44px] text-primary mb-1">
                {isOcrProcessing ? 'hourglass_top' : 'add_a_photo'}
              </span>
              <div className="font-label-md text-sm font-bold text-on-surface">
                {isOcrProcessing ? 'Reading Paper Ticket OCR...' : 'Tap to Scan Slip Camera or Upload Photo'}
              </div>
              <div className="text-xs text-on-surface-variant mt-1">
                Automatic OCR extracts Token ID, Office ID, and Timestamp
              </div>
            </div>

            {/* Manual Entry Option */}
            <div className="flex gap-2 items-center">
              <input
                className="flex-grow min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-sm uppercase"
                id="manual-slip-code"
                placeholder="Or enter manual code e.g. RR-9104"
                type="text"
                value={manualSlipCode}
                onChange={(e) => setManualSlipCode(e.target.value)}
              />
              <button
                className="min-h-[48px] px-5 rounded-lg bg-secondary text-on-secondary font-label-md text-xs sm:text-sm font-bold hover:bg-on-secondary-container cursor-pointer whitespace-nowrap"
                onClick={handleManualSlipSync}
              >
                Sync Token
              </button>
            </div>
          </div>

          {/* OCR Result Status banner */}
          {syncedSlip && (
            <div className="mt-4 p-3 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                OCR Success: Synced Physical Slip #{syncedSlip} to Shamshabad Center.
              </span>
              <span className="text-tertiary uppercase">Active</span>
            </div>
          )}
        </div>

        {/* NEARBY REGISTERED STALLS & KIOSKS (6 COLS) */}
        <div className="lg:col-span-6 bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm" id="stalls-directory">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[26px]">store</span>
              <div>
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                  Nearby Verified Support Stalls
                </h3>
                <span className="text-xs text-on-surface-variant font-medium">
                  Govt-approved rates for Photostat, Stamp Papers & Affidavit notarization
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded">
              Govt Regulated Rates
            </span>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {stalls.map((stall) => (
              <div
                key={stall.id}
                className="p-3.5 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-between gap-3 hover:border-secondary transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="font-label-md text-sm font-bold text-on-surface">{stall.name}</strong>
                    <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {stall.distance}
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant block mt-0.5">
                    Services: {stall.services}
                  </span>
                  <span className="text-xs text-tertiary font-bold">
                    Contact: {stall.contact} • {stall.location}
                  </span>
                </div>

                <button
                  className="px-3 py-1.5 rounded bg-surface border border-outline text-secondary font-label-sm text-xs font-bold hover:bg-surface-container-high shrink-0 cursor-pointer"
                  onClick={() => onLocateStall(stall)}
                >
                  Locate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================== */}
      {/* EMBEDDED AI ASSISTANT: SEVA MITRA              */}
      {/* ============================================== */}
      <div className="bg-surface rounded-xl border-2 border-secondary p-6 shadow-md">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">smart_toy</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
                <span>AI Civic Assistant: 'Seva Mitra'</span>
                <span className="text-xs bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold uppercase">
                  Multilingual Ready
                </span>
              </h3>
              <span className="text-xs text-on-surface-variant">
                Ask questions about document prerequisites, priority quotas, or fee schedules in plain language.
              </span>
            </div>
          </div>

          <button
            className="text-xs text-outline hover:text-on-surface underline font-bold cursor-pointer"
            onClick={() =>
              setChatMessages([
                {
                  id: 'msg-0',
                  sender: 'bot',
                  text: 'Namaste! I am <strong>Seva Mitra</strong>. Chat cleared. What can I help you with?',
                  timestamp: 'Just now',
                },
              ])
            }
          >
            Clear Chat
          </button>
        </div>

        {/* Chat Stream Box */}
        <div
          className="bg-surface-container-low rounded-lg p-4 border border-outline-variant min-h-[160px] max-h-[260px] overflow-y-auto space-y-3 mb-4 text-xs sm:text-sm font-body-md"
          id="chat-stream"
        >
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'bot' && (
                <span className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs font-bold shrink-0">
                  AI
                </span>
              )}

              <div
                className={`p-3 rounded-lg max-w-xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary font-medium'
                    : 'bg-surface border border-outline-variant text-on-surface leading-relaxed'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />

              {msg.sender === 'user' && (
                <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold shrink-0">
                  YOU
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Quick Question Prompts */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            className="text-xs bg-surface-container hover:bg-surface-container-highest px-3 py-1 rounded-full border border-outline font-medium text-on-surface cursor-pointer"
            onClick={() => handlePresetQuery('Pension docs checklist?')}
          >
            👴 Pension Docs Checklist?
          </button>
          <button
            className="text-xs bg-surface-container hover:bg-surface-container-highest px-3 py-1 rounded-full border border-outline font-medium text-on-surface cursor-pointer"
            onClick={() => handlePresetQuery('How to request wheelchair at office?')}
          >
            ♿ Request Wheelchair Help?
          </button>
          <button
            className="text-xs bg-surface-container hover:bg-surface-container-highest px-3 py-1 rounded-full border border-outline font-medium text-on-surface cursor-pointer"
            onClick={() => handlePresetQuery('What if my token number is skipped?')}
          >
            ⏱️ What if I miss my call?
          </button>
          <button
            className="text-xs bg-surface-container hover:bg-surface-container-highest px-3 py-1 rounded-full border border-outline font-medium text-on-surface cursor-pointer"
            onClick={() => handlePresetQuery('Are token passes free or charged?')}
          >
            💵 Regulated Government Fee Caps?
          </button>
        </div>

        {/* Chat Input */}
        <form className="flex gap-2" onSubmit={handleSendChat}>
          <input
            className="flex-grow min-h-[48px] px-4 rounded-lg border-2 border-outline bg-surface font-body-md text-xs sm:text-sm text-on-surface focus:ring-2 focus:ring-secondary"
            id="bot-input-field"
            placeholder="Type your query (e.g. Caste certificate timeline, fee, or elder desk)..."
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
          <button
            className="min-h-[48px] px-5 sm:px-6 rounded-lg bg-secondary text-on-secondary font-label-md text-xs sm:text-sm font-bold hover:bg-on-secondary-container flex items-center gap-1 cursor-pointer transition-colors"
            type="submit"
          >
            <span>Ask</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
