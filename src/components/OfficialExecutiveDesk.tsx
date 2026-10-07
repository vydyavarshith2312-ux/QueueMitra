import React, { useState } from 'react';
import { GrievanceItem } from '../types';

interface OfficialExecutiveDeskProps {
  grievances: GrievanceItem[];
  onUpdateMarquee: (newText: string) => void;
  onUpdateGrievances: (grievances: GrievanceItem[]) => void;
}

export const OfficialExecutiveDesk: React.FC<OfficialExecutiveDeskProps> = ({
  grievances,
  onUpdateMarquee,
  onUpdateGrievances,
}) => {
  const [broadcastInput, setBroadcastInput] = useState('');
  const [activeCircleFilter, setActiveCircleFilter] = useState('All');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastInput.trim()) {
      alert('Please enter a message for the live marquee announcement.');
      return;
    }
    const formatted = `🔴 OFFICIAL BROADCAST: ${broadcastInput.trim()} • Live State Central Queue Sync Active across 18 Circles.`;
    onUpdateMarquee(formatted);
    alert('✓ Emergency Bulletin published successfully! Top ticker is now displaying the updated advisory.');
    setBroadcastInput('');
  };

  const handleDispatchCrew = (grievanceId: string) => {
    const updated = grievances.map((g) =>
      g.id === grievanceId ? { ...g, status: 'Under Investigation' as const } : g
    );
    onUpdateGrievances(updated);
    alert('🚨 Rapid Response Facility Maintenance Crew dispatched to site! ETA: 12 minutes.');
  };

  const handleResolveGrievance = (grievanceId: string) => {
    const updated = grievances.map((g) =>
      g.id === grievanceId ? { ...g, status: 'Resolved' as const } : g
    );
    onUpdateGrievances(updated);
    alert('✓ Citizen Grievance marked Resolved. Resolution logged in state CPGRAMS ledger.');
  };

  return (
    <div className="space-y-space-md" id="dash-view-official">
      {/* ========================================== */}
      {/* OFFICIAL BROADCAST: EMERGENCY MARQUEE      */}
      {/* ========================================== */}
      <div className="bg-surface rounded-xl border-2 border-primary p-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">broadcast_on_home</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
              Emergency Live Broadcast Console
            </h3>
            <span className="text-xs text-on-surface-variant">
              Directly override top scrolling marquee banner across all citizen kiosks and portals.
            </span>
          </div>
        </div>

        <form className="space-y-3 mt-4" onSubmit={handlePublish}>
          <div>
            <label className="block font-label-md text-xs sm:text-sm font-bold text-on-surface mb-1" htmlFor="broadcast-input">
              New Marquee Broadcast Message
            </label>
            <textarea
              className="w-full p-3 rounded-lg border-2 border-outline bg-surface font-body-md text-sm"
              id="broadcast-input"
              placeholder="e.g. 🔴 NOTICE: Thunderstorm delay alert. Shamshabad evening tokens shifted 45 minutes with priority seating."
              rows={2}
              value={broadcastInput}
              onChange={(e) => setBroadcastInput(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs text-on-surface-variant font-medium">
              Broadcast reaches 142 kiosks and 18,000 concurrent citizen devices instantly.
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 py-2 rounded-lg bg-surface-container border border-outline text-xs font-bold hover:bg-surface-container-highest cursor-pointer"
                onClick={() =>
                  setBroadcastInput(
                    '🔴 ADVISORY: Special Aadhaar Enrollment Camp today at Collectorate Hall C for students & seniors.'
                  )
                }
              >
                Sample Advisory
              </button>
              <button
                className="min-h-[44px] px-5 sm:px-6 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Publish to Public Marquee</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ========================================== */}
      {/* PERFORMANCE BY CIRCLE & GRIEVANCES         */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CIRCLE PERFORMANCE (7 COLS) */}
        <div className="lg:col-span-7 bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              <span>Circle Throughput & SLA Adherence</span>
            </h3>
            <span className="text-xs bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded font-bold">
              All 4 Circles Active
            </span>
          </div>

          <div className="space-y-4">
            {/* Circle 1 */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-label-md mb-1">
                <span className="font-bold text-on-surface">Shamshabad Tehsildar Center</span>
                <span className="font-bold text-tertiary">96% SLA • 12 min avg</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '96%' }}></div>
              </div>
            </div>

            {/* Circle 2 */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-label-md mb-1">
                <span className="font-bold text-on-surface">Khairatabad Collectorate Hub</span>
                <span className="font-bold text-secondary">88% SLA • 19 min avg</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
              </div>
            </div>

            {/* Circle 3 */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-label-md mb-1">
                <span className="font-bold text-on-surface">Malkajgiri Municipal Division</span>
                <span className="font-bold text-primary">79% SLA • 24 min avg</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant">
                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '79%' }}></div>
              </div>
            </div>

            {/* Circle 4 */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-label-md mb-1">
                <span className="font-bold text-on-surface">Sangareddy West Circle</span>
                <span className="font-bold text-tertiary">91% SLA • 15 min avg</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant">
                <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>

          {/* Daily Endorsement Tally */}
          <div className="mt-6 pt-4 border-t border-outline-variant">
            <div className="font-label-md text-xs sm:text-sm font-bold text-on-surface mb-2">
              Daily Endorsement Tally:
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                <div className="text-xl sm:text-2xl font-extrabold">1,240</div>
                <div className="text-[11px] sm:text-xs">Approved</div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container text-on-surface-variant font-bold">
                <div className="text-xl sm:text-2xl font-extrabold">82</div>
                <div className="text-[11px] sm:text-xs">Under Review</div>
              </div>
              <div className="p-2.5 rounded-lg bg-error-container text-on-error-container font-bold">
                <div className="text-xl sm:text-2xl font-extrabold">14</div>
                <div className="text-[11px] sm:text-xs">Deficiency Notices</div>
              </div>
            </div>
          </div>
        </div>

        {/* CITIZEN GRIEVANCE ACTION DESK (5 COLS) */}
        <div className="lg:col-span-5 bg-surface rounded-xl border-2 border-outline-variant p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-error text-[26px]">feedback</span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                Citizen Grievance Action Desk
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              Direct escalations submitted through 1800-425-SEVA toll-free line.
            </p>

            <div className="space-y-3">
              {grievances.map((grievance) => (
                <div
                  key={grievance.id}
                  className="p-3.5 rounded-lg border-2 border-outline-variant bg-surface-container hover:border-secondary transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <strong className="font-label-sm text-xs sm:text-sm text-on-surface">{grievance.code}</strong>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        grievance.status === 'Resolved'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : grievance.status === 'Under Investigation'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {grievance.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">{grievance.issue}</p>
                  <div className="text-[11px] text-outline flex items-center justify-between">
                    <span>{grievance.location}</span>
                    <span>{grievance.time}</span>
                  </div>

                  {grievance.status !== 'Resolved' && (
                    <div className="mt-2 pt-2 border-t border-outline-variant flex gap-2">
                      <button
                        className="px-2.5 py-1 rounded bg-secondary text-on-secondary text-xs font-bold cursor-pointer hover:bg-on-secondary-container"
                        onClick={() => handleDispatchCrew(grievance.id)}
                      >
                        Dispatch Crew
                      </button>
                      <button
                        className="px-2.5 py-1 rounded bg-tertiary text-on-tertiary text-xs font-bold cursor-pointer hover:bg-tertiary-container"
                        onClick={() => handleResolveGrievance(grievance.id)}
                      >
                        Resolve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="mt-4 w-full py-2.5 rounded-lg bg-surface border-2 border-secondary text-secondary font-label-md text-xs sm:text-sm font-bold hover:bg-surface-container text-center cursor-pointer transition-colors"
            onClick={() =>
              alert(
                'Opening Statewide Grievance Redressal Portal (CPGRAMS integration)...\n\nTotal Statewide Open Grievances: 19\nAvg Resolution Time: 4.2 Hours.'
              )
            }
          >
            View All 19 State Grievances
          </button>
        </div>
      </div>
    </div>
  );
};
