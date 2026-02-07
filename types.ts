
export enum RoleType {
  CREATOR = 'creator',
  PRODUCER = 'producer',
  EXPLORER = 'explorer'
}

export interface CreatorItem {
  id: string;
  title: string;
  guest: string;
  description: string; 
  coverImage: string;
  link: string; // The transcript/article link
  date: string; // ISO String or YYYY-MM-DD
  year?: number; // Added helper for filtering
  shareRank?: number; // Added for specific year sorting
  audioUrl?: string; // Optional direct mp3 link
  outroMusic?: {
    title: string;
    url?: string; // Link to the 3rd level page or music link
  };
  type?: string;
}

export interface ProducerItem {
  id: string;
  title: string;
  client: string; // Derived from "｜" in title
  roles: string[]; // Array of roles like "Planning", "Editing"
  description: string;
  isFeatured: boolean;
  image: string; // Color gradient or placeholder if actual image missing
  year?: number; // Optional
  dataHighlights?: string; // New field for specific data achievements
  listenLink?: string; // New field for the listen URL
}

// --- SIDE PROJECT TYPES ---

export type SideProjectContentType = 'gallery-vertical' | 'iframe' | 'tabs' | 'static-gallery' | 'site-preview' | 'code-log' | 'feed-scroll';

export interface SideProjectMedia {
  type: 'image' | 'video';
  src: string; // URL
  caption?: string;
}

export interface SideProjectTab {
  name: string;
  content?: string; 
  link?: string;
}

export interface SideProjectLadder {
  id: string;
  name: string;
  score: number; // 1-10, determines climb height
  ladderPosition: { left: number; top: number }; // Percentage (0-100) for scattered layout
  contentType: SideProjectContentType;
  content: {
    description: string;
    media?: SideProjectMedia[];
    url?: string;
    tabs?: SideProjectTab[];
    previewImage?: string; // Added for site screenshots
    feedImages?: string[]; // Added for feed-scroll type
    // For Code Log
    projects?: Array<{
        id: string;
        name: string;
        status: string;
        description: string;
        image?: string;
    }>;
    links?: Array<{
        title: string;
        url: string;
    }>;
  };
  icon: string; // Emoji or simple icon char
  link?: string; // External link for "Access" button
}

export interface IdentityCard {
  type: RoleType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}
