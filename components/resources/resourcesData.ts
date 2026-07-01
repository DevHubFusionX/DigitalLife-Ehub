export interface Resource {
  id: string;
  title: string;
  description: string;
  topic: 'Marketing' | 'Sales' | 'Customer Success' | 'Leadership' | 'AI and Automation';
  format: 'Ebook' | 'Tool' | 'Guide' | 'Template' | 'Webinar';
  contentType: 'Free' | 'Premium';
  downloadUrl: string;
  infoLabel?: string; // e.g. "PDF", "Excel Sheet", "15 Mins Video"
  featured?: boolean;
  coverGradient: string; // Tailwind gradient classes for visually rich covers
  tagLabel?: string; // Tag displayed on the cover (e.g. "Guides", "Template", "Kit")
  coverUrl?: string;
  youtubeUrl?: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  playbookTitle: string;
  playbookLink: string;
}

export const TOPICS = [
  'Marketing',
  'Sales',
  'Customer Success',
  'Leadership',
  'AI and Automation'
] as const;

export const CONTENT_TYPES = [
  'Free',
  'Premium'
] as const;

export const FORMATS = [
  'Ebook',
  'Tool',
  'Guide',
  'Template',
  'Webinar'
] as const;

export const EXPERTS_DATA: Expert[] = [
  {
    id: 'brandon-smithwick',
    name: 'Brandon Smithwick',
    title: 'Content Strategy',
    bio: 'This Forbes 30 Under 30 entrepreneur and former Head of Content at Kickstarter has shared his strategies and tips with the masses. Published in Hypebeast, AdAge, Complex, Highsnobiety, and AdWeek.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    playbookTitle: 'How to Turn Your LinkedIn into a Content Sales Machine',
    playbookLink: '#'
  },
  {
    id: 'gabrielle-judge',
    name: 'Gabrielle Judge',
    title: 'Productivity & Automation',
    bio: 'Founder of Ms. Anti Work and TEDx speaker focused on helping people break burnout-inducing work habits. Published in The New York Times, BBC, The Wall Street Journal, 60 Minutes, and HubSpot.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    playbookTitle: 'The Grind Is Broken: What Workers Really Think About Jobs in 2025',
    playbookLink: '#'
  },
  {
    id: 'valerie-chapman',
    name: 'Valerie Chapman',
    title: 'Marketing & Branding',
    bio: 'Founder & CEO of Ruth, a career platform focused on closing the gender wage gap with tools that help women build personal brands, negotiate salaries, and navigate careers with confidence.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    playbookTitle: 'How Gen Z is Changing the Way Brands Use AI [Data + Guide]',
    playbookLink: '#'
  }
];

export const RESOURCES_DATA: Resource[] = [
  // FEATURED RESOURCES (Will show up in Section 2 under respective topics)
  {
    id: 'state-of-marketing-2026',
    title: 'The 2026 State of Marketing Report',
    description: 'Discover the strategies shaping 2026 and how data-driven decisions, privacy shifts, and new channels are redefining marketing success.',
    topic: 'Marketing',
    format: 'Guide',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'PDF',
    featured: true,
    coverGradient: 'from-[#FF5E36] via-[#FF4B2B] to-[#D31027]', // Vibrant Orange/Red
    tagLabel: 'Guides'
  },
  {
    id: 'marketing-dashboard-template',
    title: 'Marketing Dashboard Template',
    description: 'Track the success of your latest marketing campaigns, spend, ROI, and attribution with our premium interactive marketing dashboard template.',
    topic: 'Marketing',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Google Sheets',
    featured: true,
    coverGradient: 'from-[#00c6ff] to-[#0072ff]', // Cool Blue
    tagLabel: 'Template'
  },
  {
    id: 'marketing-prompts-scale',
    title: '20 Prompts to Scale Your Marketing Without Scaling...',
    description: 'Maximize your marketing impact with minimal resources using this curated collection of battle-tested, role-specific generative AI prompts.',
    topic: 'Marketing',
    format: 'Webinar', // Representing the "Kit"
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Kit',
    featured: true,
    coverGradient: 'from-[#11998e] to-[#38ef7d]', // Minty Green
    tagLabel: 'Kit'
  },
  {
    id: 'pricing-strategy-calculator',
    title: 'MSME Pricing Strategy Calculator',
    description: 'An interactive utility to help you factor in overhead, taxes, direct costs, and margins to set highly profitable pricing for your services and physical products.',
    topic: 'Sales',
    format: 'Tool',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Excel Utility',
    featured: true,
    coverGradient: 'from-[#f12711] to-[#f5af19]', // Sunburst Yellow/Red
    tagLabel: 'Tool'
  },
  {
    id: 'client-onboarding-sop',
    title: 'Client Onboarding SOP Template',
    description: 'A pre-written Word/Docs template detailing standard operating procedures (SOPs) for onboarding clients, reducing churn, and maintaining excellent feedback.',
    topic: 'Customer Success',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Word Document',
    featured: true,
    coverGradient: 'from-[#8A2387] via-[#E94057] to-[#F27121]', // Magenta/Orange
    tagLabel: 'Template'
  },
  {
    id: 'msme-scaling-handbook',
    title: 'From Hustle to Structured Growth',
    description: 'Our signature guide on building sustainable operations, designing organizational roles, and moving away from operational chaos to build a business that runs itself.',
    topic: 'Leadership',
    format: 'Ebook',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: '24 Pages',
    featured: true,
    coverGradient: 'from-[#3a7bd5] to-[#3a6073]', // Steel Blue
    tagLabel: 'Guides'
  },
  {
    id: 'ai-local-growth-webinar',
    title: 'Leveraging AI for Local Business Growth',
    description: 'Access our exclusive 45-minute training session demonstrating how to use free and low-cost generative AI tools to write copy, automate emails, and streamline daily ops.',
    topic: 'AI and Automation',
    format: 'Webinar',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: '45 Mins Video',
    featured: true,
    coverGradient: 'from-[#f953c6] to-[#b91d73]', // Hot Pink
    tagLabel: 'Webinar'
  },

  // BROWSE ONLY RESOURCES (Will populate the bottom grid based on filters)
  {
    id: 'ai-ad-factory',
    title: 'The AI Ad Factory: 5 Workflows to Build Any Campaign',
    description: 'From Photoshop-level image editing to video scripting and ad copy generation - learn how to construct end-to-end campaigns using 5 simple AI workflows.',
    topic: 'AI and Automation',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'PDF + Prompt Kit',
    featured: false,
    coverGradient: 'from-[#141517] to-[#42444a]', // Charcoal Slate
    tagLabel: 'Template'
  },
  {
    id: 'spot-100m-product-ideas',
    title: 'How to Spot $100M+ Product Ideas [MFM]',
    description: 'Learn the brainstorming frameworks and evaluation sheets used by leading founders to identify, validate, and scale high-potential products in underserved markets.',
    topic: 'Leadership',
    format: 'Guide',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'PDF',
    featured: false,
    coverGradient: 'from-[#0f2027] via-[#203a43] to-[#2c5364]', // Dark Ocean Gradient
    tagLabel: 'Guide'
  },
  {
    id: 'space-makers-marketing',
    title: 'Space Makers: Real Talk on Rising in Marketing',
    description: 'Pivotal moments, strategies, and career wins, including 25 AI prompts to apply their insights to your own brand campaigns and organizational growth.',
    topic: 'Marketing',
    format: 'Guide',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'PDF',
    featured: false,
    coverGradient: 'from-[#654ea3] to-[#eaafc8]', // Purple/Pink Pastel
    tagLabel: 'Guide'
  },
  {
    id: 'sales-gated-funnel-workbook',
    title: 'The Sales Funnel Blueprint Workbook',
    description: 'Design and implement a high-converting customer journey from scratch. Includes worksheets for lead magnets, email follow-up sequences, and closing scripts.',
    topic: 'Sales',
    format: 'Guide',
    contentType: 'Premium',
    downloadUrl: '#',
    infoLabel: 'PDF Workbook',
    featured: false,
    coverGradient: 'from-[#e65c00] to-[#f9d423]', // Bright Orange/Gold
    tagLabel: 'Workbook'
  },
  {
    id: 'automation-health-audit',
    title: 'Operational Automation Health Audit Tool',
    description: 'A self-assessment diagnostic checklist to review your current business workflows and discover exactly which manual tasks can be automated using simple tools.',
    topic: 'AI and Automation',
    format: 'Tool',
    contentType: 'Premium',
    downloadUrl: '#',
    infoLabel: 'Self-Audit Form',
    featured: false,
    coverGradient: 'from-[#2193b0] to-[#6dd5ed]', // Clear Teal
    tagLabel: 'Tool'
  },
  {
    id: 'content-calendar-framework',
    title: '30-Day Content Calendar Planner',
    description: 'A structured content strategy planner tailored for MSMEs. Includes daily prompts, caption templates, and post formats designed to convert followers into customers.',
    topic: 'Marketing',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Interactive Planner',
    featured: false,
    coverGradient: 'from-[#2b5876] to-[#4e4376]', // Dark Indigo
    tagLabel: 'Template'
  },
  {
    id: 'retention-sop-handbook',
    title: 'Customer Retention & Feedback Handbook',
    description: 'A detailed handbook outlining standard procedures for gathering customer feedback, handling complaints, and boosting Net Promoter Scores (NPS) in high-growth companies.',
    topic: 'Customer Success',
    format: 'Ebook',
    contentType: 'Premium',
    downloadUrl: '#',
    infoLabel: '18 Pages',
    featured: false,
    coverGradient: 'from-[#000428] to-[#004e92]', // Midnight Blue
    tagLabel: 'Ebook'
  }
];
