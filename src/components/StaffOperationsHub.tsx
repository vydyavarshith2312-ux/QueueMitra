import React, { useState } from 'react';
import { TokenItem } from '../types';

interface StaffOperationsHubProps {
  tokens: TokenItem[];
  onUpdateTokens: (tokens: TokenItem[]) => void;
  onAnnounceToken: (text: string) => void;
}

export const StaffOperationsHub: React.FC<StaffOperationsHubProps> = ({
  tokens,
  onUpdateTokens,
  onAnnounceToken,
}) => {
  const [servedTodayCount, setServedTodayCount] = useState(48);
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinService, setWalkinService] = useState('Aadhaar Biometric Correction');
  const [walkinIsSenior, setWalkinIsSenior] = useState(false);

  // Current active token at Counter 04
  const currentServingToken = tokens.find((t) => t.status === 'CALLED / SERVING') || tokens[0];

  const playChimeAndAnnounce = (message: string) => {
    // Web Speech API Voice Announcement
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
    onAnnounceToken(message);
  };

  const handleCallNext = () => {
    // Find next waiting token
    const nextWaiting = tokens.find((t) => t.status === 'Waiting in Hall');
    if (!nextWaiting) {
      alert('All waiting tokens for Counter 04 have been cleared!');
      return;
    }

    const updated = tokens.map((t) => {
      if (t.id === currentServingToken?.id && t.status === 'CALLED / SERVING') {
        return { ...t, status: 'Completed' as const };
      }
      if (t.id === nextWaiting.id) {
        return { ...t, status: 'CALLED / SERVING' as const };
      }
      return t;
    });

    onUpdateTokens(updated);
    setServedTodayCount((prev) => prev + 1);

    const announcement = `Attention please: Token ${nextWaiting.code}, ${nextWaiting.citizenName}, please proceed to Counter 04.`;
    playChimeAndAnnounce(announcement);
    alert(`📢 CALLING NEXT TOKEN:\n\n${announcement}\nHall audio loudspeaker and SMS gateway triggered.`);
  };

  const handleRecall = () => {
    if (!currentServingToken) return;
    const announcement = `Reminder: Token ${currentServingToken.code}, ${currentServingToken.citizenName}, please report immediately to Counter 04.`;
    playChimeAndAnnounce(announcement);
    alert(`📢 RECALL CHIME TRANSMITTED:\n\n"${announcement}"`);
  };

  const handlePutOnHold = () => {
    if (!currentServingToken) return;
    const updated = tokens.map((t) =>
      t.id === currentServingToken.id ? { ...t, status: 'Temporary Hold' as const } : t
    );
    onUpdateTokens(updated);
    alert(
      `⏸️ Token ${currentServingToken.code} marked on "Temporary Hold" (15-minute grace window). Citizen SMS alert notified.`
    );
  };

  const handleMarkAbsent = () => {
    if (!currentServingToken) return;
    if (confirm(`Mark Token ${currentServingToken.code} (${currentServingToken.citizenName}) as Absent?`)) {
      const updated = tokens.map((t) =>
        t.id === currentServingToken.id ? { ...t, status: 'Absent' as const } : t
      );
      onUpdateTokens(updated);
      alert(`Token ${currentServingToken.code} recorded as absent. Advancing queue.`);
    }
  };

  const handleFinishCurrent = () => {
    if (!currentServingToken) return;
    const updated = tokens.map((t) =>
      t.id === currentServingToken.id ? { ...t, status: 'Completed' as const } : t
    );
    onUpdateTokens(updated);
    setServedTodayCount((prev) => prev + 1);
    alert(`✓ Completed servicing Token ${currentServingToken.code}. Digital receipt issued.`);
  };

  const handleIssueWalkinToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim()) return;

    const prefix = walkinIsSenior ? 'SM-' : 'W-';
    const code = `${prefix}${Math.floor(500 + Math.random() * 50)}`;

    const newTok: TokenItem = {
      id: 'tok-' + Date.now(),
      code,
      citizenName: walkinName.trim(),
      phone: '9849000000',
      service: walkinService,
      category: walkinIsSenior ? 'Senior (65+)' : 'Standard',
      counter: 'Counter 04',
      status: 'Waiting in Hall',
      position: tokens.filter((t) => t.status === 'Waiting in Hall').length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSenior: walkinIsSenior,
      needsAssistance: false,
    };

    onUpdateTokens([newTok, ...tokens]);
    setShowWalkinModal(false);
    setWalkinName('');
    alert(`🎫 Walk-in Paper Slip Printed!\n\nToken: ${code}\nCitizen: ${walkinName}\nQueue Position: #${newTok.position}`);
  };

  return (
    <div className="space-y-space-md" id="dash-view-staff">
      {/* ========================================== */}
      {/* COUNTER CONTROLLER BANNER                  */}
      {/* ========================================== */}
      <div className="bg-surface rounded-xl border-2 border-secondary p-6 shadow-md">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 pb-4 border-b-2 border-outline-variant mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase mb-1">
              Active Terminal
            </div>
            <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface flex items-center gap-2 sm:gap-3 flex-wrap">
              <span>Counter 04 Queue Controller</span>
              <span className="text-sm sm:text-base font-normal text-on-surface-variant font-body-md">
                (Officer: TS-8402 • Hall B)
              </span>
            </h2>
          </div>

          {/* Operator Daily Metrics Bar */}
          <div className="flex items-center gap-4 bg-surface-container px-4 py-2.5 rounded-lg border border-outline flex-wrap">
            <div className="text-center">
              <span className="text-xs text-on-surface-variant font-bold block">Served Today</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-tertiary">
                {servedTodayCount}
              </span>
            </div>
            <div className="w-px h-8 bg-outline hidden sm:block"></div>
            <div className="text-center">
              <span className="text-xs text-on-surface-variant font-bold block">Avg Wait Time</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-primary">14 mins</span>
            </div>
            <div className="w-px h-8 bg-outline hidden sm:block"></div>
            <div className="text-center">
              <span className="text-xs text-on-surface-variant font-bold block">SLA Compliance</span>
              <span className="font-headline-sm text-lg sm:text-xl font-extrabold text-secondary">92%</span>
            </div>
          </div>
        </div>

        {/* Current Active Serving Token Banner */}
        {currentServingToken && (
          <div className="mb-4 p-4 rounded-xl bg-surface-container-low border-2 border-tertiary flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-xl font-mono shrink-0">
                {currentServingToken.code}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-base font-bold text-on-surface">{currentServingToken.citizenName}</strong>
                  <span className="text-xs px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-bold">
                    {currentServingToken.category}
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant">
                  Service: {currentServingToken.service} • Status:{' '}
                  <span className="font-bold text-tertiary">{currentServingToken.status}</span>
                </div>
              </div>
            </div>

            <button
              className="px-4 py-2 rounded-lg bg-tertiary text-on-tertiary font-label-sm text-xs sm:text-sm font-bold hover:bg-tertiary-container cursor-pointer transition-colors whitespace-nowrap self-stretch sm:self-auto"
              onClick={handleFinishCurrent}
            >
              Finish & Clear Token
            </button>
          </div>
        )}

        {/* PRIMARY QUEUE CONTROL ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            className="min-h-[58px] sm:min-h-[64px] rounded-lg bg-tertiary text-on-tertiary hover:bg-tertiary-container font-headline-sm text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
            onClick={handleCallNext}
          >
            <span className="material-symbols-outlined text-[24px] sm:text-[28px]" data-weight="fill">
              volume_up
            </span>
            <span>CALL NEXT TOKEN</span>
          </button>

          <button
            className="min-h-[58px] sm:min-h-[64px] rounded-lg bg-surface text-secondary border-2 border-secondary hover:bg-surface-container font-label-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            onClick={handleRecall}
          >
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">replay</span>
            <span>Recall Current Token</span>
          </button>

          <button
            className="min-h-[58px] sm:min-h-[64px] rounded-lg bg-surface text-primary border-2 border-primary hover:bg-surface-container font-label-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            onClick={handlePutOnHold}
          >
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">pause_circle</span>
            <span>Put on Temporary Hold</span>
          </button>

          <button
            className="min-h-[58px] sm:min-h-[64px] rounded-lg bg-surface text-error border-2 border-error hover:bg-error-container font-label-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            onClick={handleMarkAbsent}
          >
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">person_off</span>
            <span>Mark Absent / Pass</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* LIVE TOKEN LIST TABLE & QUEUE LOGS         */}
      {/* ========================================== */}
      <div className="bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">format_list_numbered</span>
            <span>Real-Time Roster (Counter 04 Stream)</span>
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant font-medium">Auto-refreshed via NIC WebSockets</span>
            <button
              className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-on-secondary-container"
              onClick={() => setShowWalkinModal(true)}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Issue Walk-in Slip</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-surface-container border-b-2 border-outline-variant font-label-md text-xs sm:text-sm text-on-surface">
                <th className="p-3">Token #</th>
                <th className="p-3">Citizen Name</th>
                <th className="p-3">Service Required</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-xs sm:text-sm font-body-md" id="staff-token-table">
              {tokens.map((tok) => (
                <tr
                  key={tok.id}
                  className={`transition-colors ${
                    tok.status === 'CALLED / SERVING'
                      ? 'bg-tertiary-fixed/30 font-medium'
                      : tok.status === 'Completed'
                      ? 'opacity-70 bg-surface-container-low'
                      : tok.status === 'Temporary Hold'
                      ? 'bg-primary-fixed/20'
                      : 'hover:bg-surface-container/50'
                  }`}
                >
                  <td className="p-3 font-bold font-mono text-tertiary text-sm sm:text-base">{tok.code}</td>
                  <td className="p-3 font-bold text-on-surface">{tok.citizenName}</td>
                  <td className="p-3 text-on-surface-variant">{tok.service}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        tok.isSenior
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : tok.category === 'Divyangjan'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {tok.category}
                    </span>
                  </td>
                  <td className="p-3">
                    {tok.status === 'CALLED / SERVING' ? (
                      <span className="inline-flex items-center gap-1 font-bold text-tertiary text-xs">
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                        CALLED / SERVING
                      </span>
                    ) : tok.status === 'Waiting in Hall' ? (
                      <span className="text-xs font-bold text-primary">
                        Waiting in Hall (Pos #{tok.position || 1})
                      </span>
                    ) : tok.status === 'Temporary Hold' ? (
                      <span className="text-xs font-bold text-outline">Temporary Hold (15m)</span>
                    ) : tok.status === 'Completed' ? (
                      <span className="text-xs font-bold text-outline">Completed ({tok.time})</span>
                    ) : (
                      <span className="text-xs font-bold text-error">Absent</span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {tok.status === 'CALLED / SERVING' ? (
                      <button
                        className="px-3 py-1 rounded bg-tertiary text-on-tertiary text-xs font-bold hover:bg-tertiary-container cursor-pointer"
                        onClick={() => {
                          const updated = tokens.map((t) =>
                            t.id === tok.id ? { ...t, status: 'Completed' as const } : t
                          );
                          onUpdateTokens(updated);
                          setServedTodayCount((c) => c + 1);
                          alert(`Completed ${tok.code}. Acknowledgement sent.`);
                        }}
                      >
                        Finish Token
                      </button>
                    ) : tok.status === 'Waiting in Hall' ? (
                      <button
                        className="px-3 py-1 rounded bg-surface border border-outline text-xs font-bold text-on-surface hover:bg-surface-container cursor-pointer"
                        onClick={() => alert(`Pushing live SMS alert to ${tok.citizenName} (+91-${tok.phone}).`)}
                      >
                        SMS Alert
                      </button>
                    ) : (
                      <span className="text-xs text-outline font-medium">Closed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WALK-IN TICKET MODAL */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border-2 border-outline p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">confirmation_number</span>
                <span>Issue Walk-in Ticket</span>
              </h3>
              <button
                className="p-1 rounded-full hover:bg-surface-container cursor-pointer"
                onClick={() => setShowWalkinModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleIssueWalkinToken}>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Citizen Full Name</label>
                <input
                  className="w-full p-2.5 rounded-lg border-2 border-outline bg-surface text-sm"
                  placeholder="e.g. Ramesh Chandra"
                  required
                  type="text"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Service Type</label>
                <select
                  className="w-full p-2.5 rounded-lg border-2 border-outline bg-surface text-sm"
                  value={walkinService}
                  onChange={(e) => setWalkinService(e.target.value)}
                >
                  <option value="Aadhaar Biometric Correction">Aadhaar Biometric Correction</option>
                  <option value="Aasara Pension Endorsement">Aasara Pension Endorsement</option>
                  <option value="Caste & Income Certificate">Caste & Income Certificate</option>
                  <option value="Pattadar Passbook Mutation">Pattadar Passbook Mutation</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  className="w-5 h-5 rounded border-2 border-outline text-primary cursor-pointer"
                  id="walkin-senior"
                  type="checkbox"
                  checked={walkinIsSenior}
                  onChange={(e) => setWalkinIsSenior(e.target.checked)}
                />
                <label className="text-xs font-bold text-on-surface cursor-pointer" htmlFor="walkin-senior">
                  Senior Citizen (65+) Fast-Track
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-surface border border-outline text-xs font-bold cursor-pointer"
                  onClick={() => setShowWalkinModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container cursor-pointer shadow-sm"
                >
                  Print Walk-in Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
