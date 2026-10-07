export type GlobalTab = 'tab-home' | 'tab-auth' | 'tab-dash';
export type AuthPortalRole = 'citizen' | 'staff' | 'official' | 'vendor';
export type DashboardRole = 'citizen' | 'staff' | 'official';
export type Language = 'en' | 'te' | 'hi';

export interface TokenItem {
  id: string;
  code: string;
  citizenName: string;
  phone: string;
  service: string;
  category: 'Senior (65+)' | 'Standard' | 'Divyangjan';
  counter: string;
  status: 'CALLED / SERVING' | 'Waiting in Hall' | 'Temporary Hold' | 'Completed' | 'Absent';
  position?: number;
  time: string;
  isSenior: boolean;
  needsAssistance: boolean;
}

export interface StallItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  services: string;
  contact: string;
  location: string;
  verified: boolean;
  rateCap: string;
}

export interface CivicOffice {
  id: string;
  name: string;
  circle: string;
  address: string;
  phone: string;
  countersActive: number;
  avgWaitMins: number;
  timings: string;
  status: 'Normal Flow' | 'High Traffic' | 'Express Drive';
}

export interface GrievanceItem {
  id: string;
  code: string;
  issue: string;
  location: string;
  status: 'Unresolved' | 'Under Investigation' | 'Resolved';
  time: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
