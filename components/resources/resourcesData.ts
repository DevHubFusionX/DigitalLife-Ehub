export interface Resource {
  id: string;
  title: string;
  description: string;
  topic: string;
  format: string;
  contentType: string;
  downloadUrl: string;
  infoLabel?: string; // e.g. "PDF", "Excel Sheet", "15 Mins Video"
  featured?: boolean;
  coverGradient: string; // Tailwind gradient classes for visually rich covers
  tagLabel?: string; // Tag displayed on the cover (e.g. "Guides", "Template", "Kit")
  coverUrl?: string;
  youtubeUrl?: string;
  categorySlug?: string;
  longContent?: string;
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
  },
  {
    id: 'how-to-write-sop-small-business',
    title: 'How to Write an SOP for a Small Business',
    description: 'Learn the step-by-step framework to document your processes. Download our free SOP template word download to formalize operations.',
    topic: 'Customer Success',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Word Document',
    featured: true,
    coverGradient: 'from-[#8A2387] via-[#E94057] to-[#F27121]',
    tagLabel: 'free-SOP-downloads',
    categorySlug: 'free-SOP-downloads',
    longContent: `# How to Write an SOP for a Small Business

A Standard Operating Procedure (SOP) is the foundation of structured growth. When operations depend solely on the founder's memory, scaling becomes impossible. Here is how to write an effective SOP:

## 1. Identify the Process
Start with recurring tasks that take up the most time or have the highest error rates.

## 2. Define the Target Audience
Who is executing this SOP? Write it in a language they understand, avoiding unnecessary jargon.

## 3. Map the Workflow
Write down the steps sequentially. Use screenshots, checklists, and video snippets where possible.

## 4. Test and Refine
Have someone unfamiliar with the task try to perform it using only your draft SOP. Fix any gaps they encounter.

**Free Download:** Use our editable **free SOP template word download** to structure your company's processes today!`
  },
  {
    id: 'move-from-business-hustle-to-structure',
    title: 'How to Move from Business Hustle to Structure',
    description: 'Ditch the operational chaos. Download the growth roadmap worksheet for founders to design sustainable structures.',
    topic: 'Leadership',
    format: 'Guide',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'PDF Roadmap',
    featured: true,
    coverGradient: 'from-[#3a7bd5] to-[#3a6073]',
    tagLabel: 'structure-over-hustle',
    categorySlug: 'structure-over-hustle',
    longContent: `# How to Move from Business Hustle to Structure

Many founders find themselves stuck in a constant loop of fires to fight. Moving from hustle to structured growth is essential for survival:

## 1. Document Everything
If it's not documented, it doesn't exist. Start with basic checklists.

## 2. Build Roles, Not People
Design an organization chart based on functions (Marketing, Sales, Delivery) rather than names.

## 3. Establish Clear KPIs
Make every team member accountable for specific key performance indicators.

## 4. Implement Weekly Reporting
Review the numbers every week to spot deviations early.

**Free Download:** Use our **growth roadmap worksheet for founders** to guide your transition today!`
  },
  {
    id: 'why-business-stagnant-despite-high-sales',
    title: 'Why is My Business Stagnant Despite High Sales?',
    description: 'Uncover hidden leaks in your revenue. Get the small business dashboard template download to audit your margins.',
    topic: 'Sales',
    format: 'Tool',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Excel Utility',
    featured: true,
    coverGradient: 'from-[#f12711] to-[#f5af19]',
    tagLabel: 'msme-growth-frameworks',
    categorySlug: 'msme-growth-frameworks',
    longContent: `# Why is My Business Stagnant Despite High Sales?

High sales volume is exciting, but it can mask structural gaps that choke profitability. Here is why stagnation happens and how to fix it:

## 1. High Overhead Costs
Increased sales often lead to creeping overheads. Monitor every subscription, utility, and indirect expense.

## 2. Low Gross Margins
If your pricing model is outdated or direct costs are rising, more sales will just mean more work with less profit.

## 3. Cashflow Leaks
Delayed invoices, long payment terms, and uncollected debt drain resources.

## 4. Outdated Tooling
Manually doing work that could be automated costs valuable employee hours.

**Free Download:** Use our **small business dashboard template download** to audit your profit margins and operational efficiency!`
  },
  {
    id: 'build-team-structure-msme',
    title: 'How to Build a Team Structure for an MSME',
    description: 'Define clear roles and reporting lines. Download the small business organizational structure chart template.',
    topic: 'Leadership',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Editable Chart',
    featured: true,
    coverGradient: 'from-[#0F172A] via-[#1E293B] to-[#FEDB54]',
    tagLabel: 'small-business-playbooks',
    categorySlug: 'small-business-playbooks',
    longContent: `# How to Build a Team Structure for an MSME

Micro, Small, and Medium Enterprises (MSMEs) often struggle with role overlap. To build an effective team structure:

## 1. Separate Functions
Identify the key pillars: Sales, Operations, Finance, and Administration.

## 2. Write Job Profiles
Draft 3-5 key responsibilities for every role. Ensure there is no overlap in decision-making power.

## 3. Create a Reporting Hierarchy
Determine who reports to whom, reducing direct communication lines to the founder.

## 4. Automate Onboarding
Provide new hires with predefined onboarding playbooks to cut down training time.

**Free Download:** Get the **small business organizational structure chart** template to start design work!`
  },
  {
    id: 'structural-gaps-killing-business-growth',
    title: 'What Are the Structural Gaps Killing Business Growth?',
    description: 'Diagnose bottlenecks before they choke your cash flow. Use our business workflow design template.',
    topic: 'Leadership',
    format: 'Tool',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Workflow Canvas',
    featured: true,
    coverGradient: 'from-[#11998e] to-[#38ef7d]',
    tagLabel: 'operational-efficiency-templates',
    categorySlug: 'operational-efficiency-templates',
    longContent: `# What Are the Structural Gaps Killing Business Growth?

Structural gaps are invisible flaws in your workflows that waste resources. Common gaps include:

## 1. Communication Silos
Departments failing to share updates promptly, causing delays.

## 2. Lack of Tooling Integration
Employees manually copy-pasting customer data between platforms.

## 3. Undefined Delegation
The founder remaining a bottleneck for simple approvals.

## 4. Inconsistent Quality
Deliverables varying wildly because there are no clear checklists.

**Free Download:** Map and plug these leaks with our **business workflow design template** canvas!`
  },
  {
    id: 'transition-informal-business-to-corporate',
    title: 'How to Transition from Informal Business to Corporate',
    description: 'Establish professionalism and legitimacy. Download the editable company policy template.',
    topic: 'Leadership',
    format: 'Template',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Word Document',
    featured: true,
    coverGradient: 'from-[#00c6ff] to-[#0072ff]',
    tagLabel: 'business-formalization-tools',
    categorySlug: 'business-formalization-tools',
    longContent: `# How to Transition from Informal Business to Corporate

Informal operations work in the early days but limit credibility. Transitioning to a corporate structure requires:

## 1. Business Registration
Incorporate your business and obtain all relevant licenses and tax IDs.

## 2. Separate Bank Accounts
Never mix personal and corporate funds. All revenues must go through the business account.

## 3. Formal Contracts
Draft agreements for employees, contractors, and vendors to protect intellectual property.

## 4. Clear Company Policy
Define guidelines on work hours, leave, remote working, and client data security.

**Free Download:** Use our **editable company policy template** handbook to get started!`
  },
  {
    id: 'create-sops-without-tech-skills',
    title: 'How to Create Standard Operating Procedures Without Tech Skills',
    description: 'SOP writing made simple. Get our standard operating procedures checklist download to train your team today.',
    topic: 'Customer Success',
    format: 'Guide',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Checklist PDF',
    featured: true,
    coverGradient: 'from-[#654ea3] to-[#eaafc8]',
    tagLabel: 'free-SOP-downloads',
    categorySlug: 'free-SOP-downloads',
    longContent: `# How to Create Standard Operating Procedures Without Tech Skills

You do not need complicated software or expensive platforms to document your processes. You can write SOPs using basic tools:

## 1. Use Simple Checklists
A numbered list of instructions in Microsoft Word or Google Docs works perfectly.

## 2. Record Screen Captures
Use free tools like Loom or Zoom to record your screen as you execute a task. Share the video link.

## 3. Keep Sentences Short
Write commands clearly: "Click the blue button," not "Proceed to interact with the interface."

## 4. Standardize the Format
Use our standard checklist template to ensure consistency across different departments.

**Free Download:** Grab our **standard operating procedures checklist download** now!`
  },
  {
    id: 'turn-services-into-scalable-digital-products',
    title: 'How to Turn Business Services into Scalable Digital Products',
    description: 'Stop trading time for money. Leverage value-over-skills monetization and get the small business operations manual template pdf.',
    topic: 'Sales',
    format: 'Ebook',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Operations Manual',
    featured: true,
    coverGradient: 'from-[#e65c00] to-[#f9d423]',
    tagLabel: 'skill-monetization-guides',
    categorySlug: 'skill-monetization-guides',
    longContent: `# How to Turn Business Services into Scalable Digital Products

Service providers are often limited by hours in a day. Packaging services into products allows infinite scale:

## 1. Audit Your Deliverables
What assets, worksheets, or guidelines do you repeatedly deliver to clients?

## 2. Create Templates
Build reusable kits, spreadsheets, or ebooks that clients can use independently.

## 3. Standardize Delivery
Write a clear operations manual detailing how the product is purchased and accessed.

## 4. Transition to Product-First
Market your productized service before booking individual custom consultations.

**Free Download:** Get our **small business operations manual template pdf** and **skill-monetization-guides** to scale!`
  },
  {
    id: 'monitor-employee-accountability',
    title: 'How to Monitor Employee Accountability in Small Business',
    description: 'Keep your remote or local team accountable without micromanagement. Download our excel daily operations report sheet.',
    topic: 'Leadership',
    format: 'Tool',
    contentType: 'Free',
    downloadUrl: '#',
    infoLabel: 'Excel Sheet',
    featured: true,
    coverGradient: 'from-[#2193b0] to-[#6dd5ed]',
    tagLabel: 'operational-efficiency-templates',
    categorySlug: 'operational-efficiency-templates',
    longContent: `# How to Monitor Employee Accountability in Small Business

Micromanagement destroys trust and wastes the founder's time. Instead, build accountability systems:

## 1. Set Daily Deliverables
Define exactly what represents a successful work day (e.g., 5 articles written, 10 tickets resolved).

## 2. Daily Operations Report Sheet
Use a unified tracking template where employees log their progress, roadblocks, and next actions.

## 3. Automate Onboarding
An **employee onboarding checklist template** ensures new team members understand expectations from day one.

## 4. Focus on Outcomes, Not Hours
Evaluate employee value based on output and meeting SLAs rather than hours active online.

**Free Download:** Download our **daily operations report sheet excel** and **employee onboarding checklist template**!`
  }
];
