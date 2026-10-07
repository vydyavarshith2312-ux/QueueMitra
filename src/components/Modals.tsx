import React, { useState } from 'react';
import { CIVIC_OFFICES, SERVICE_DOCUMENT_CHECKLIST } from '../data/mockData';
import { TokenItem, StallItem } from '../types';

interface ModalsProps {
  // Modal visibility states
  showHelp: boolean;
  onCloseHelp: () => void;

  showDocs: boolean;
  onCloseDocs: () => void;

  showElder: boolean;
  onCloseElder: () => void;

  showEmergency: boolean;
  onCloseEmergency: () => void;

  showOffices: boolean;
  onCloseOffices: () => void;

  showTokenPass: boolean;
  onCloseTokenPass: () => void;
  activeToken: TokenItem;

  noticeModal: { title: string; message: string } | null;
  onCloseNotice: () => void;

  locatedStall: StallItem | null;
  onCloseLocatedStall: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  showHelp,
  onCloseHelp,
  showDocs,
  onCloseDocs,
  showElder,
  onCloseElder,
  showEmergency,
  onCloseEmergency,
  showOffices,
  onCloseOffices,
  showTokenPass,
  onCloseTokenPass,
  activeToken,
  noticeModal,
  onCloseNotice,
  locatedStall,
  onCloseLocatedStall,
}) => {
  const [docFilter, setDocFilter] = useState<'all' | 'pension' | 'aadhaar' | 'caste-income' | 'land-mutation'>('all');

  return (
    <>
      {/* ========================================== */}
      {/* 1. HELP & FAQ MODAL                        */}
      {/* ========================================== */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-outline p-6 max-w-xl w-full bg-surface shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">help</span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">SmartSeva Help & FAQs</h3>
              </div>
              <button
                aria-label="Close Modal"
                className="p-1 rounded-full hover:bg-surface-container text-on-surface cursor-pointer"
                onClick={onCloseHelp}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-sm font-body-md text-on-surface">
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <strong className="font-bold block text-base mb-1 text-primary">
                  Q: How does Senior Citizen (65+) & Divyangjan priority work?
                </strong>
                <p className="text-on-surface-variant">
                  When checking the 65+ box, our algorithmic queue engine automatically slots you into the priority buffer for ground floor Counter 07. This minimizes walking, eliminates staircases, and reduces average standing time from 95 mins to under 12 mins.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <strong className="font-bold block text-base mb-1 text-secondary">
                  Q: Can I walk in without an online booking?
                </strong>
                <p className="text-on-surface-variant">
                  Yes! Every center has physical touch-screen kiosks at Gate 1. You can grab a paper slip, then tap our "Offline Paper Token Upload Utility" to scan the ticket barcode on your phone and wait comfortably outside in shaded seating or at authorized stalls.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <strong className="font-bold block text-base mb-1 text-tertiary">
                  Q: What if I miss my token announcement?
                </strong>
                <p className="text-on-surface-variant">
                  If an applicant is not present at the counter when called, the operator puts the token on a 15-minute "Temporary Hold". Once you arrive, present your slip to Desk 04 to be queued as the next immediate person.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <strong className="font-bold block text-base mb-1">
                  Q: Is there any fee for queue tokens?
                </strong>
                <p className="text-on-surface-variant">
                  Never. Government queue tokens, appointment slots, and wheelchair concierge escorts are 100% free under the Public Services Guarantee Act. Report any touts or agent demands to 1800-425-SEVA.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end">
              <button
                className="px-5 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-sm font-bold cursor-pointer hover:bg-on-secondary-container"
                onClick={onCloseHelp}
              >
                Understood, Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. DOCUMENT CHECKLIST MODAL                */}
      {/* ========================================== */}
      {showDocs && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-outline p-6 max-w-xl w-full bg-surface shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">fact_check</span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">Required Documents Guide</h3>
              </div>
              <button
                className="p-1 rounded-full hover:bg-surface-container text-on-surface cursor-pointer"
                onClick={onCloseDocs}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant mb-3">
              Ensure you carry attested original documents + 1 set of photocopies to avoid repeated visits.
            </p>

            <div className="space-y-3 text-xs sm:text-sm font-body-md text-on-surface">
              <div className="p-3.5 bg-surface-container rounded-lg border border-outline-variant">
                <strong className="block font-bold text-base text-primary mb-1">
                  1. Aasara Pension Verification (Senior 65+)
                </strong>
                <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                  {SERVICE_DOCUMENT_CHECKLIST.pension.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-surface-container rounded-lg border border-outline-variant">
                <strong className="block font-bold text-base text-secondary mb-1">
                  2. Aadhaar Card Biometric Update / Correction
                </strong>
                <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                  {SERVICE_DOCUMENT_CHECKLIST.aadhaar.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-surface-container rounded-lg border border-outline-variant">
                <strong className="block font-bold text-base text-tertiary mb-1">
                  3. Caste & Income Certificate Endorsement
                </strong>
                <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                  {SERVICE_DOCUMENT_CHECKLIST['caste-income'].map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-surface-container rounded-lg border border-outline-variant">
                <strong className="block font-bold text-base text-on-surface mb-1">
                  4. Land Pattadar Passbook Mutation
                </strong>
                <ul className="list-disc pl-5 space-y-1 text-on-surface-variant">
                  {SERVICE_DOCUMENT_CHECKLIST['land-mutation'].map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end">
              <button
                className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-sm font-bold cursor-pointer hover:bg-primary-container"
                onClick={onCloseDocs}
              >
                Got It, Thank You
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. SENIOR CITIZEN CONCIERGE HELP MODAL     */}
      {/* ========================================== */}
      {showElder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-tertiary p-6 max-w-md w-full bg-surface shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[36px]">elderly</span>
            </div>

            <h3 className="font-headline-sm text-xl font-bold text-on-surface">Senior Citizen Concierge Help</h3>

            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Our ground support staff is on standby at main entrances with complimentary wheelchairs, physical form-filling assistance, and dedicated ground-floor escort to Counter 07.
            </p>

            <div className="p-4 bg-tertiary-fixed/30 rounded-lg text-tertiary font-bold text-sm border border-tertiary">
              Dedicated Concierge Hotline: <br />
              <strong className="text-base text-on-surface">1800-425-SEVA (Press 9 for Priority Desk)</strong>
            </div>

            <div className="space-y-2 pt-2">
              <button
                className="w-full py-3 rounded-lg bg-tertiary text-on-tertiary font-label-md text-sm font-bold cursor-pointer hover:bg-tertiary-container shadow-md"
                onClick={() => {
                  alert(
                    `✓ Priority Concierge Reserved!\n\nToken: ${activeToken.code}\nEscort Duty: Shri K. Ramu (Badge #ESC-14)\nMeeting Point: Gate 1 Porch / Disabled Parking Bay.`
                  );
                  onCloseElder();
                }}
              >
                Confirm Escort at Gate 1
              </button>

              <button
                className="w-full py-2 text-outline font-bold text-xs hover:text-on-surface cursor-pointer"
                onClick={onCloseElder}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. EMERGENCY DESK MODAL                    */}
      {/* ========================================== */}
      {showEmergency && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-error p-6 max-w-lg w-full bg-surface shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-error">
                <span className="material-symbols-outlined text-[32px]" data-weight="fill">
                  e911_emergency
                </span>
                <h3 className="font-headline-sm text-xl font-bold">Public Emergency Command Desk</h3>
              </div>
              <button className="p-1 rounded-full hover:bg-surface-container cursor-pointer" onClick={onCloseEmergency}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-sm text-on-surface-variant">
              Immediate escalation protocol for medical distress, overcrowding incidents, or security intervention at civic premises.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-bold flex flex-col justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider">Medical Emergency</span>
                  <div className="text-lg">Ambulance (108)</div>
                </div>
                <button
                  className="mt-2 py-1.5 px-3 rounded bg-error text-white text-xs hover:opacity-90 cursor-pointer"
                  onClick={() => alert('Dispatching 108 Ambulance Unit to Shamshabad Tehsildar Complex Gate 1.')}
                >
                  Dispatch Ambulance
                </button>
              </div>

              <div className="p-3 rounded-lg bg-surface-container border border-outline font-bold flex flex-col justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-on-surface-variant">
                    Security & Law Enforcement
                  </span>
                  <div className="text-lg text-on-surface">Police (100 / 112)</div>
                </div>
                <button
                  className="mt-2 py-1.5 px-3 rounded bg-secondary text-white text-xs hover:bg-on-secondary-container cursor-pointer"
                  onClick={() => alert('Police Mobile Patrol alert sent to Shamshabad Police Station jurisdiction.')}
                >
                  Alert Police Patrol
                </button>
              </div>
            </div>

            <div className="p-3 bg-surface-container rounded-lg text-xs space-y-1">
              <div className="font-bold text-on-surface">District Nodal Control Room:</div>
              <div>Telangana State Revenue Relief Commissioner: 040-23454088</div>
              <div>Ranga Reddy Collectorate Disaster Cell: 040-24001920</div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                className="px-5 py-2.5 rounded-lg bg-surface border border-outline font-bold text-xs cursor-pointer hover:bg-surface-container"
                onClick={onCloseEmergency}
              >
                Close Emergency Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. CIVIC OFFICES DIRECTORY MODAL           */}
      {/* ========================================== */}
      {showOffices && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-outline p-6 max-w-3xl w-full bg-surface shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[28px]">distance</span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                  Civic Center Directory & Live Wait Times
                </h3>
              </div>
              <button className="p-1 rounded-full hover:bg-surface-container cursor-pointer" onClick={onCloseOffices}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant mb-4">
              Real-time traffic throughput and operational counters across major government centers.
            </p>

            <div className="space-y-3">
              {CIVIC_OFFICES.map((off) => (
                <div
                  key={off.id}
                  className="p-4 rounded-xl bg-surface-container border border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-secondary transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-sm sm:text-base font-bold text-on-surface">{off.name}</strong>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          off.status === 'Normal Flow'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {off.status}
                      </span>
                    </div>
                    <div className="text-xs text-on-surface-variant mt-1">{off.address}</div>
                    <div className="text-xs text-secondary font-medium mt-0.5">
                      Phone: {off.phone} • Hours: {off.timings}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant shrink-0">
                    <div className="text-xs font-bold text-primary">{off.avgWaitMins} min avg wait</div>
                    <div className="text-[11px] text-tertiary font-bold">{off.countersActive} Active Desks</div>
                    <button
                      className="mt-1 px-3 py-1 rounded bg-secondary text-white text-xs font-bold cursor-pointer hover:bg-on-secondary-container"
                      onClick={() => alert(`Directions to ${off.name}: Link sent to navigation app.`)}
                    >
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end">
              <button
                className="px-5 py-2.5 rounded-lg bg-surface border border-outline font-bold text-xs cursor-pointer hover:bg-surface-container"
                onClick={onCloseOffices}
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. DIGITAL TOKEN PASS MODAL (FORMAL SLIP)  */}
      {/* ========================================== */}
      {showTokenPass && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-2xl border-4 border-primary p-6 max-w-md w-full bg-surface shadow-2xl relative">
            <button
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-surface-container cursor-pointer"
              onClick={onCloseTokenPass}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Official Pass Header */}
            <div className="text-center pb-4 border-b-2 border-dashed border-outline-variant">
              <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
                <span className="font-bold text-xs uppercase tracking-widest">GOVERNMENT OF TELANGANA</span>
              </div>
              <h3 className="font-headline-sm text-lg font-extrabold text-on-surface">
                SmartSeva Official Queue Mitra Pass
              </h3>
              <span className="text-[11px] text-on-surface-variant">DPI Civic Authentication Token Slip</span>
            </div>

            {/* Pass Body */}
            <div className="py-4 space-y-4">
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant text-center">
                <div className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
                  TOKEN REGISTRATION CODE
                </div>
                <div className="text-5xl font-mono font-extrabold text-tertiary tracking-tight my-1">
                  {activeToken.code}
                </div>
                <div className="text-xs font-bold text-secondary">{activeToken.counter}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant block">Applicant:</span>
                  <strong className="text-on-surface">{activeToken.citizenName}</strong>
                </div>
                <div className="p-2 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant block">Category:</span>
                  <strong className="text-on-surface">{activeToken.category}</strong>
                </div>
                <div className="p-2 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant block">Issued Time:</span>
                  <strong className="text-on-surface">{activeToken.time} Today</strong>
                </div>
                <div className="p-2 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant block">Status:</span>
                  <strong className="text-tertiary">{activeToken.status}</strong>
                </div>
              </div>

              {/* Barcode & Security stamp */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="font-mono text-2xl tracking-[0.3em] font-bold select-none text-on-surface">
                  ||| | ||||| || |||| |||
                </div>
                <span className="text-[10px] text-outline font-mono mt-0.5">
                  UIDAI-SECURITY-HASH-94028-VERIFIED
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t-2 border-outline-variant flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-xs cursor-pointer hover:bg-primary-container shadow-sm flex items-center justify-center gap-1.5"
                onClick={() => {
                  window.print();
                }}
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print / Download PDF</span>
              </button>
              <button
                className="px-4 py-2.5 rounded-lg bg-surface border border-outline font-bold text-xs cursor-pointer hover:bg-surface-container"
                onClick={onCloseTokenPass}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 7. NOTICE ADVISORY DETAIL MODAL            */}
      {/* ========================================== */}
      {noticeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-outline p-6 max-w-md w-full bg-surface shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">campaign</span>
                <span>Official Circular</span>
              </div>
              <button className="p-1 rounded-full hover:bg-surface-container cursor-pointer" onClick={onCloseNotice}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">{noticeModal.title}</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">{noticeModal.message}</p>
            <div className="pt-2 flex justify-end">
              <button
                className="px-5 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs cursor-pointer"
                onClick={onCloseNotice}
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 8. LOCATED STALL DIRECTIONS MODAL          */}
      {/* ========================================== */}
      {locatedStall && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="rounded-xl border-2 border-secondary p-6 max-w-md w-full bg-surface shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div className="flex items-center gap-2 text-secondary font-bold">
                <span className="material-symbols-outlined">storefront</span>
                <span>Verified Partner Stall Info</span>
              </div>
              <button
                className="p-1 rounded-full hover:bg-surface-container cursor-pointer"
                onClick={onCloseLocatedStall}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div>
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">{locatedStall.name}</h3>
              <div className="text-xs text-tertiary font-bold">{locatedStall.category}</div>
            </div>

            <div className="space-y-2 text-xs bg-surface-container p-3 rounded-lg">
              <div>
                <strong>Location:</strong> {locatedStall.location}
              </div>
              <div>
                <strong>Proximity:</strong> {locatedStall.distance}
              </div>
              <div>
                <strong>Certified Services:</strong> {locatedStall.services}
              </div>
              <div>
                <strong>Price Ceiling:</strong> {locatedStall.rateCap}
              </div>
              <div>
                <strong>Vendor Contact:</strong>{' '}
                <a href={`tel:${locatedStall.contact}`} className="text-secondary font-bold underline">
                  {locatedStall.contact}
                </a>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-bold cursor-pointer hover:bg-on-secondary-container"
                onClick={() => alert(`Calling vendor at ${locatedStall.contact}...`)}
              >
                Call Stall
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-surface border border-outline text-xs font-bold cursor-pointer"
                onClick={onCloseLocatedStall}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
