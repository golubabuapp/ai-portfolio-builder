export interface PortfolioData {
  hero: { name: string; title: string; description: string; cta: string; };
  about: { text: string; };
  skills: string[];
  projects: Array<{ title: string; description: string; tags: string[]; }>;
  experience: Array<{ role: string; company: string; period: string; description: string; }>;
  contact: { email: string; socials: { github?: string; linkedin?: string; twitter?: string; }; };
}

export interface GeneratedSite {
  id: string;
  data: PortfolioData;
  createdAt: number;
}
