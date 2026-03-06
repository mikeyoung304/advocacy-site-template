// ============================================================================
// Content Type Definitions
// ============================================================================

// Section Keys - must match DOM anchor IDs
export type SectionKey = 'project' | 'why-this-matters' | 'benefits' | 'environmental' | 'site-design' | 'faq';

// Site Configuration
export interface SiteConfig {
  projectName: string;
  location: string;
  stateName: string;
  totalInvestment: string;
  facilitySize: string;
  powerCapacity: string;
  buildingCount: string;
}

// Hero Section
export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  trustStrip: string;
  estimationDisclosure: string | null;
  heroImageAlt: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

// Project Overview
export interface Fact {
  label: string;
  value: string;
}

interface InfoSection {
  title: string;
  description: string;
  items: string[];
  footer: string;
}

export interface ProjectOverviewContent {
  title: string;
  description: string;
  facts: Fact[];
  whyDataCentersMatter: InfoSection;
  characteristics: InfoSection;
  sitePlanImageAlt: string;
  sitePlanCaption: string;
}

// Economic Content
interface ConstructionSubsection {
  title: string;
  items: string[];
}

interface ConstructionPhase {
  title: string;
  perBuilding: ConstructionSubsection;
  entireCampus: ConstructionSubsection;
}

export interface OperationalItem {
  label: string;
  value: string;
  description: string;
}

interface OperationalPhase {
  title: string;
  items: OperationalItem[];
}

export interface EconomicContent {
  title: string;
  subtitle: string;
  constructionPhase: ConstructionPhase;
  operationalPhase: OperationalPhase;
}

// Benefits
export type BenefitIcon = 'DollarSign' | 'Users' | 'Wrench' | 'Building2';

export interface BenefitItem {
  icon: BenefitIcon;
  title: string;
  description: string;
  /** Optional preview text for progressive disclosure */
  previewText?: string;
  /** Optional expanded text for progressive disclosure */
  expandedText?: string;
}

export interface BenefitsContent {
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

// Environmental Content
interface CoolingSection {
  title: string;
  description: string;
}

interface EnvironmentalSubsection {
  title: string;
  description: string;
  items: string[];
  note: string;
}

export interface EnvironmentalContent {
  title: string;
  subtitle: string;
  cooling: CoolingSection;
  recycledWater: EnvironmentalSubsection;
  communityBenefits: EnvironmentalSubsection;
  landscapeImageAlt: string;
}

// Why This Matters
interface WhyThisMattersCard {
  heading: string;
  text: string;
}

export interface WhyThisMattersContent {
  title: string;
  opportunity: WhyThisMattersCard;
  nationalPriority: WhyThisMattersCard;
}

// Site Design
interface LocalRepresentationFirm {
  name: string;
  logoPath: string;
  logoAlt: string;
}

interface LandscapeBuffer {
  heading: string;
  imageLabel: string;
  elevationLabel: string;
  description: string;
  elevationImageAlt: string;
  overheadImageAlt: string;
}

export interface SiteDesignContent {
  title: string;
  subtitle: string;
  designFeaturesHeading: string;
  features: string[];
  note: string;
  landscapeBuffer: LandscapeBuffer;
  localRepresentation: {
    heading: string;
    description: string;
    firms: LocalRepresentationFirm[];
  } | null;
  sitePlanImageAlt: string;
}

// Noise Comparison
export interface NoiseComparisonRow {
  source: string;
  level: string;
  isHighlighted: boolean;
  icon: 'low' | 'medium' | 'high';
}

// Land Use Comparison
interface LandUseComparisonRow {
  category: string;
  dataCenter: string;
  warehouse: string;
  retail: string;
  residential: string;
}

export interface LandUseComparisonContent {
  heading: string;
  subtitle: string;
  tableHeaderText: string;
  columnHeaders: {
    category: string;
    dataCenter: string;
    warehouse: string;
    retail: string;
    residential: string;
  };
  rows: LandUseComparisonRow[];
  footerNote: string;
  mobileHint: string;
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
  hasNoiseTable?: boolean;
}

export interface FAQContent {
  title: string;
  subtitle: string;
  noiseTableCaption: string;
  noiseTableFooter: string;
  items: FAQItem[];
}

// Footer
export interface FooterContent {
  projectName: string;
  disclaimer: string;
  contactNote: string;
  ctaParagraph: string;
}

// Not Found Page
export interface NotFoundContent {
  heading: string;
  message: string;
  linkText: string;
}

// Site Metadata
export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  authors: { name: string }[];
  creator: string;
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
}

// Navigation
export interface NavLink {
  href: string;
  label: string;
}

// ============================================================================
// TODO(fork): Replace ALL content below with your project's information
// ============================================================================

export const siteConfig: SiteConfig = {
  projectName: 'Your Project Name',
  location: 'Your City',
  stateName: 'Your State',
  totalInvestment: '$X billion',
  facilitySize: 'X million sq ft',
  powerCapacity: 'X MW',
  buildingCount: 'X buildings',
};

export const heroContent: HeroContent = {
  headline: 'Your Project Name',
  subheadline:
    'A Proposed Technology Campus in Your City',
  ctaText: 'Learn More',
  trustStrip: 'Factual Information\u2002\u2022\u2002Community Benefits\u2002\u2022\u2002Responsible Operations',
  estimationDisclosure: 'This website is meant to inform the public about this project\'s attributes, design, and impact. The figures included on this page are estimates based on the conceptual site plan.',
  heroImageAlt: 'Project campus architectural rendering',
};

export const heroStats: readonly HeroStat[] = [
  { value: '$XB', label: 'Capital Investment' },
  { value: 'X,000+', label: 'Construction Jobs' },
  { value: 'X+', label: 'Permanent Jobs' },
];

export const projectOverviewContent: ProjectOverviewContent = {
  title: 'What is the Project?',
  description:
    'The project proposes a high technology campus with multiple buildings, located with convenient access to major transportation routes. The campus is designed with setbacks, landscaping, and screening to integrate with the surrounding community.',
  facts: [
    { label: 'Capital Investment', value: '$XB' },
    { label: 'Buildings', value: 'X' },
    { label: 'Facility Size', value: 'X sq ft' },
    { label: 'Power Capacity', value: 'X MW' },
    { label: 'Project Acreage', value: 'X Acres' },
  ],
  whyDataCentersMatter: {
    title: 'Why Data Centers Matter',
    description:
      'Data centers provide the infrastructure that supports many everyday services, including:',
    items: [
      'Cloud computing and digital communications',
      'Healthcare and financial systems',
      'Emergency response and public safety networks',
      'Advanced research and technology development',
    ],
    footer:
      'Communities across the country are hosting data centers as part of broader efforts to support modern infrastructure, economic diversification, and long-term tax base stability.',
  },
  characteristics: {
    title: 'Data Center Characteristics',
    description:
      'Data centers differ from many other commercial or industrial developments. They typically:',
    items: [
      'Operate quietly',
      'Generate limited daily traffic',
      'Do not include retail uses or distribution activity',
      'Have minimal demand on public services such as schools and emergency response',
    ],
    footer:
      'The result is to support long-term economic growth while being a low-impact, well-managed neighbor.',
  },
  sitePlanImageAlt: 'Conceptual site plan showing campus layout with buildings and landscape buffers',
  sitePlanCaption: 'Conceptual site plan layout',
};

export const economicContent: EconomicContent = {
  title: 'Economic Investment & Community Benefits',
  subtitle: 'A multi-billion-dollar private investment with long-term community impact',
  constructionPhase: {
    title: 'Construction Phase',
    perBuilding: {
      title: 'Per Building',
      items: ['$X billion in construction investment', 'X+ on-site construction jobs'],
    },
    entireCampus: {
      title: 'Entire Campus (Over Time)',
      items: [
        '$X billion capital investment',
        'X,000+ construction jobs over multiple phases',
        '$X million private investment in infrastructure',
      ],
    },
  },
  operationalPhase: {
    title: 'Long-Term Community Benefits',
    items: [
      {
        label: 'Permanent Jobs',
        value: 'X+',
        description: 'High-paying technical positions',
      },
      {
        label: 'Annual Payroll',
        value: '$XM+',
        description: 'Significant ongoing economic contribution',
      },
      {
        label: 'Annual Revenue',
        value: '$XM',
        description: 'Annual revenue contribution to local community',
      },
    ],
  },
};

export const benefitsContent: BenefitsContent = {
  title: 'Community Benefits',
  subtitle: 'How this project supports the local community',
  items: [
    {
      icon: 'Users' as const,
      title: 'Employment',
      description:
        'Hundreds of permanent high-paying technical jobs plus thousands of construction jobs over multiple phases.',
    },
    {
      icon: 'Wrench' as const,
      title: 'Infrastructure',
      description:
        'Significant investment in power, fiber, water, and sewer infrastructure that will improve public infrastructure for the entire community.',
    },
    {
      icon: 'Building2' as const,
      title: 'Low Impact Neighbor',
      description:
        'Data centers operate quietly, generate limited traffic, have no retail activity, and place minimal demand on schools and emergency services.',
    },
    {
      icon: 'DollarSign' as const,
      title: 'Local Revenue',
      description:
        'Generates public revenue through property taxes, sales and income taxes, and utility fees, funding local services, infrastructure, and education.',
    },
  ],
};

export const environmentalContent: EnvironmentalContent = {
  title: 'Environmental Stewardship & Cooling',
  subtitle: 'Responsible resource management and community infrastructure benefits',
  cooling: {
    title: 'Our Approach to Cooling',
    description:
      'Modern data centers use a range of efficient cooling technologies, which may include recycled-water systems or closed-loop cooling designs that recirculate cooling fluids and minimize water use.',
  },
  recycledWater: {
    title: 'Using Recycled Water',
    description: 'The project is evaluating opportunities to:',
    items: [
      'Utilize treated wastewater for cooling where available',
      'Invest private capital to help improve public infrastructure',
      'Reduce reliance on freshwater resources',
    ],
    note: 'This approach allows wastewater that has already been treated to be reused for cooling, rather than relying on drinking water supplies.',
  },
  communityBenefits: {
    title: 'Community Infrastructure Benefits',
    description: 'If implemented, this approach could:',
    items: [
      'Improve the capacity and reliability of local infrastructure',
      'Support long-term system planning for the community',
      'Create additional value and revenue from existing public assets',
      'Align with state and local environmental standards',
    ],
    note: 'All infrastructure improvements would be subject to applicable local and state review and approval.',
  },
  landscapeImageAlt: 'Natural landscape representing environmental stewardship',
};

export const whyThisMattersContent: WhyThisMattersContent = {
  title: 'Why This Matters',
  opportunity: {
    heading: 'The Opportunity',
    text: 'Major tech companies are investing billions in data center infrastructure across America. Communities that welcome responsible development see transformative benefits: better-funded schools, modern jobs, and improved infrastructure.',
  },
  nationalPriority: {
    heading: 'National Priority',
    text: 'The responsible development of data centers is a national priority and of critical importance to ensure the global competitiveness of the USA and its technology sector.',
  },
};

export const siteDesignContent: SiteDesignContent = {
  title: 'Community Integration',
  subtitle: 'Thoughtfully designed to integrate with the surrounding community',
  designFeaturesHeading: 'Design Features',
  features: [
    'Enhanced setbacks from major roads and adjacent properties',
    'Enhanced landscaping buffers and screening',
    'Thoughtful screening of equipment and infrastructure from public rights of way',
    'Campus-style layout with thoughtful and aesthetic building designs',
  ],
  note: 'The intent is for the project to operate quietly and integrate with the surrounding area.',
  landscapeBuffer: {
    heading: 'Landscape Buffer',
    imageLabel: 'Landscape buffer design integrates native vegetation to screen facilities and enhance aesthetics',
    elevationLabel: 'Elevation & Plant View',
    description: 'Landscape buffer design integrates native vegetation to screen facilities and enhance aesthetics',
    elevationImageAlt: 'Landscape Buffer elevation showing landscaping design with trees and vegetation',
    overheadImageAlt: 'Landscape Buffer overhead plant view showing shrubs, trees, and vegetation layout',
  },
  // TODO(fork): Set to an object with heading, description, and firms array to show local representation
  // localRepresentation: {
  //   heading: 'Local Representation',
  //   description: 'Local firms representing the project include:',
  //   firms: [
  //     { name: 'Firm Name', logoPath: '/images/firm-logo.png', logoAlt: 'Firm Name' },
  //   ],
  // },
  localRepresentation: null,
  sitePlanImageAlt: 'Conceptual site plan showing campus layout',
};

export const noiseComparisonData: NoiseComparisonRow[] = [
  { source: 'Data Center (at property line)', level: '< 60 dBA', isHighlighted: true, icon: 'low' },
  { source: 'Normal Conversation', level: '60-70 dBA', isHighlighted: false, icon: 'medium' },
  { source: 'Light Industrial', level: '65-75 dBA', isHighlighted: false, icon: 'medium' },
  { source: 'Busy Traffic', level: '70-85 dBA', isHighlighted: false, icon: 'high' },
  { source: 'Lawn Mower', level: '85-90 dBA', isHighlighted: false, icon: 'high' },
];

export const landUseComparisonContent: LandUseComparisonContent = {
  heading: 'Land Use Comparison',
  subtitle: 'How data center campuses compare to alternative development options',
  tableHeaderText: 'Comparative Analysis of Land Use Types',
  columnHeaders: {
    category: 'Category',
    dataCenter: 'DATA CENTER',
    warehouse: 'Warehouse',
    retail: 'Retail',
    residential: 'Residential',
  },
  rows: [
    {
      category: 'Daily Traffic',
      dataCenter: 'Low',
      warehouse: 'High',
      retail: 'High',
      residential: 'Moderate',
    },
    {
      category: 'Truck Traffic',
      dataCenter: 'Very limited',
      warehouse: 'Frequent',
      retail: 'Regular deliveries',
      residential: 'Very limited',
    },
    {
      category: 'Permanent Jobs',
      dataCenter: 'Moderate, highly skilled',
      warehouse: 'Moderate, logistics-focused',
      retail: 'Higher count, service-oriented',
      residential: 'None',
    },
    {
      category: 'Average Wages',
      dataCenter: 'High',
      warehouse: 'Moderate',
      retail: 'Lower to moderate',
      residential: 'N/A',
    },
    {
      category: 'Public Service Demand',
      dataCenter: 'Low',
      warehouse: 'Moderate',
      retail: 'Higher',
      residential: 'Higher (schools, local services)',
    },
    {
      category: 'Tax Revenue Stability',
      dataCenter: 'Very stable, long-term',
      warehouse: 'Moderate',
      retail: 'Market-dependent',
      residential: 'Stable but service-intensive',
    },
    {
      category: 'Land Use Intensity',
      dataCenter: 'Moderate size buildings, low activity',
      warehouse: 'Large buildings, high activity',
      retail: 'Smaller buildings, high activity',
      residential: 'Smaller buildings, continuous activity',
    },
  ],
  footerNote: 'Data center campuses offer significant advantages in traffic, wages, and tax revenue stability',
  mobileHint: 'Swipe to compare all options \u2192',
};

export const faqContent: FAQContent = {
  title: 'Frequently Asked Questions',
  subtitle: 'Information about the proposed project',
  noiseTableCaption: 'Sound Level Comparison',
  noiseTableFooter: 'Data centers maintain noise levels comparable to normal conversation',
  items: [
    {
      question: 'What is a data center?',
      answer:
        'A data center is a secure facility that houses computer servers and networking equipment used to store and process digital information. These facilities support many services people use every day, such as email, banking, healthcare systems, and online communications.',
    },
    {
      question: 'Will the project create noise?',
      answer:
        'Data centers are designed to operate quietly. Sound levels are expected to be within applicable zoning and regulatory standards and lower than other light industrial uses. The project design includes building placement, equipment screening, and landscaping buffers to minimize any noise impact.',
      hasNoiseTable: true,
    },
    {
      question: 'Will the project increase traffic?',
      answer:
        'Data centers generate low traffic volumes as there are no retail customers or significant delivery activity. Traffic impact is expected to be minimal compared to other commercial or industrial uses.',
    },
    {
      question: 'How much water will the project use?',
      answer:
        'The project is designed to use efficient cooling technologies. Potable water use will be limited to restrooms, fire protection, landscaping, and office operations.',
    },
    {
      question: 'Will the project affect electricity rates?',
      answer:
        'Utilities generally serve large electricity users under specialized agreements subject to regulatory oversight. These arrangements are structured to avoid shifting costs to other utility customers.',
    },
    {
      question: 'How could this affect property values?',
      answer:
        'Data centers can contribute to a long-term, stable tax base while placing relatively limited demand on schools and public services. These factors can help strengthen community investment and contribute to stable property values over time.',
    },
  ],
};

export const footerContent: FooterContent = {
  projectName: 'Your Project Name',
  disclaimer:
    'This website provides factual information about the proposed project. For official information, please visit the relevant government website.',
  contactNote: 'For questions or more information about this project, please reach out through the official project channels.',
  ctaParagraph: 'Have questions about the project? We\'d love to hear from you.',
};

export const notFoundContent: NotFoundContent = {
  heading: 'Page Not Found',
  message: 'The page you\'re looking for doesn\'t exist or has been moved. Return to the homepage to learn more about the project.',
  linkText: 'Back to Homepage',
};

export const siteMetadata: SiteMetadata = {
  title: 'Your Project Name | Infrastructure Advocacy',
  description:
    'Learn about the proposed project and its community benefits including jobs, infrastructure investment, and economic growth.',
  keywords: [
    'data center',
    'economic development',
    'jobs',
    'technology',
    'community benefits',
    'infrastructure',
  ],
  authors: [{ name: 'Your Project Name' }],
  creator: 'Your Project Name',
  ogTitle: 'Your Project Name',
  ogDescription:
    'A proposed technology campus bringing significant investment and long-term economic growth to the community.',
  ogImageAlt: 'Your Project Name - Community Investment',
  twitterTitle: 'Your Project Name',
  twitterDescription:
    'A proposed technology campus bringing investment and economic growth to the community.',
};

// Navigation
export const navLinks: NavLink[] = [
  { href: '#project', label: 'Overview' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#environmental', label: 'Environment' },
  { href: '#site-design', label: 'Community Integration' },
  { href: '#faq', label: 'FAQ' },
];

// Section toggling
export const enabledSections: SectionKey[] = [
  'project',
  'why-this-matters',
  'benefits',
  'environmental',
  'site-design',
  'faq',
];

// Derive visible nav links based on enabled sections
export function getVisibleNavLinks(): NavLink[] {
  return navLinks.filter((link) => {
    const sectionKey = link.href.replace('#', '') as SectionKey;
    return enabledSections.includes(sectionKey);
  });
}
