export type NavScreen = 'home' | 'club' | 'disciplines' | 'calendar' | 'members' | 'journal';

export interface Discipline {
  id: string;
  number: string;
  title: string;
  schedule: string;
  tagline: string;
  description: string;
  firearms: string[];
  courseOfFire: string;
  calibers: string;
  powderSpecs: string;
  equipmentNotes: string;
  image?: string;
}

export interface MatchStage {
  name: string;
  targets: string;
  type?: string;
}

export interface ClubEvent {
  id: string;
  day: string;
  month: string;
  year: string;
  discipline: string;
  title: string;
  location: string;
  time: string;
  themeColor: 'rust' | 'green' | 'tan';
  description: string;
  matchDirector: string;
  rangesOpen: string;
  fees: string;
  safetyBriefing: string;
  visitorFriendly: boolean;
  program?: MatchStage[];
  trophies?: string;
  lunchIncluded?: boolean;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
  category: 'Match' | 'Championship' | 'AGM' | 'Range' | 'Safety' | 'Notice';
  urgent?: boolean;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  image: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  licenseStatus: 'licensed_cat_ab' | 'licensed_cat_h' | 'unlicensed_visitor' | 'interstate_licensed';
  licenseNumber?: string;
  disciplines: string[];
  preferredDate: string;
  experienceLevel: 'complete_beginner' | 'modern_shooter_new_to_blackpowder' | 'experienced_muzzleloader';
  notes: string;
}

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadDate: string;
  category?: string;
}
