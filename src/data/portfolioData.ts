import { Project, Service, ProcessStep, Testimonial, ResumeExperience } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'project-alpha',
    title: 'Project Alpha',
    subtitle: 'Autonomous Robotics Brand & Collateral System',
    category: 'Graphic Design',
    year: '2025',
    client: 'Alpha Dynamics Inc.',
    mockupType: 'Stationery & Collateral Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Comprehensive graphic design collateral system, stationery paper mockups, embossed cardstock, editorial poster series, and packaging design mockups.',
    overview: 'Alpha Dynamics approached Tushar Visuals to design an uncompromising, cinematic graphic collateral system bridging quantum hardware engineering with sovereign enterprise software.',
    challenge: 'The legacy collateral felt fragmented and academic, lacking the tactile authority and visual weight needed to close series-B enterprise capital.',
    strategy: 'Engineered a monolithic geometric graphic language anchored in precision grid layouts, deep obsidian textures, and stark laser-red telemetry accents.',
    process: [
      'Comprehensive competitor landscape mapping and visual differentiation analysis',
      'Iterative typographic exploration combining bespoke monospaced numerals with sharp display geometry',
      'High-resolution 3D packaging and multi-channel collateral mockup rendering',
      'Global graphic brand manual synthesis spanning print, environmental, and trade presence'
    ],
    solution: 'A razor-sharp graphic architecture backed by print-ready collateral mockups, vector lockups, and modular merchandise deployed across 14 international markets.',
    results: [
      { label: 'Funding Secured', value: '$34M Series B' },
      { label: 'Brand Recognition', value: '+340%' },
      { label: 'Collateral Adoption', value: '100% Team Sync' }
    ],
    tags: ['Graphic Design', 'Stationery Mockup', 'Packaging Mockup', 'Editorial'],
    gallery: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-nova',
    title: 'Project Nova',
    subtitle: 'Spatial Audio Flagship E-Commerce Website',
    category: 'Website Design',
    year: '2025',
    client: 'Nova Sound Audio',
    mockupType: 'Desktop & Multi-Device Web Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Custom high-conversion responsive website design, dark aesthetic storefront mockups across Apple Studio Display and iPhone screen previews.',
    overview: 'Nova Sound required an ultra-luxury digital storefront design for their studio-grade spatial audio headphones, demanding seamless visual hierarchy and high-fidelity web mockups.',
    challenge: 'Previous web presence suffered from generic template styling, cluttered layout hierarchies, and high cart abandonment.',
    strategy: 'Crafted a bespoke website design system featuring sleek dark-mode desktop interfaces, friction-free checkout flows, and fluid responsive breakpoint layouts.',
    process: [
      'High-fidelity Figma wireframes focused on luxury product discovery and immersive audio previews',
      'Desktop & mobile website mockup generation using realistic Apple hardware environments',
      'Speed-optimized frontend styling with sub-second page transition animations',
      'Multi-device responsive stress testing across 4K displays, laptops, and smartphones'
    ],
    solution: 'An electrifying dark-themed website design that doubled customer conversion rate within 45 days of launch.',
    results: [
      { label: 'Page Load Time', value: '0.64s' },
      { label: 'Conversion Lift', value: '+88%' },
      { label: 'Mobile Revenue', value: '2.4x Growth' }
    ],
    tags: ['Website Design', 'E-Commerce Mockup', 'Responsive UI', 'Dark Mode'],
    gallery: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-red',
    title: 'Project Red',
    subtitle: 'Cyberpunk Editorial Posters & Advertising Graphics',
    category: 'Graphic Design',
    year: '2024',
    client: 'REDLINE Streetwear Tokyo',
    mockupType: 'Street Billboard & Poster Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Multi-platform graphic design campaign, billboard outdoor mockups, street poster mockups, and high-contrast digital marketing visual compositions.',
    overview: 'Tokyo-based apparel powerhouse REDLINE sought an incendiary graphic design takeover for their Autumn capsule release, requiring 60+ unified digital and physical art assets.',
    challenge: 'Cutting through saturated digital feeds and urban environments where generic lifestyle photography gets ignored.',
    strategy: 'Developed a brutalist editorial graphic language utilizing heavy typographic masking, analog noise treatments, and piercing crimson glow accents.',
    process: [
      'Creative direction moodboarding merging brutalist editorial typography and Tokyo night cyber aesthetics',
      'Creation of 25 animated social story templates and high-impact carousel masterfiles',
      'Print-ready billboard & bus shelter out-of-home (OOH) graphic mockups in Shibuya and Shinjuku',
      'Physical exhibition prints and large-format wall poster mockups'
    ],
    solution: 'A viral graphic campaign suite that helped sell out the entire 10,000-piece collection in under 4 hours.',
    results: [
      { label: 'Sell-out Time', value: '3h 48m' },
      { label: 'Social Impressions', value: '4.2 Million' },
      { label: 'Organic Shares', value: '45,000+' }
    ],
    tags: ['Graphic Design', 'Poster Mockup', 'Billboard Mockup', 'Editorial Graphics'],
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-orbit',
    title: 'Project Orbit',
    subtitle: 'Architectural Atelier Portfolio Website',
    category: 'Website Design',
    year: '2024',
    client: 'Orbit Atelier Zurich',
    mockupType: 'MacBook & Mobile Web Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Monolithic bespoke website design engineered with smooth cursor parallax, full-page screen mockups, and immersive project walkthroughs.',
    overview: 'Orbit Atelier, a Swiss architectural firm renowned for brutalist concrete pavilions, commissioned a clean website design reflecting their structural philosophy: permanent, spacious, and poetic.',
    challenge: 'Translating massive physical structures into a light, fluid digital website without diluting scale and architectural gravitas.',
    strategy: 'Formulated a horizontal-scrolling architectural index with dynamic image reveals, typography layered beneath images, and a clean client showcase portal.',
    process: [
      'Information architecture restructuring into timeline-based blueprints and spatial photography',
      'Custom CSS grid layouts matching the golden ratio and Swiss typographic grids',
      'High-resolution desktop and tablet web mockup rendering for stakeholder presentations',
      'Multi-language responsive viewport optimization'
    ],
    solution: 'An architectural website lauded in industry annuals that helped secure 3 major institutional museum commissions within six months.',
    results: [
      { label: 'Inbound Inquiries', value: '+165%' },
      { label: 'Average Time on Site', value: '4m 12s' },
      { label: 'Award Recognitions', value: '3 Design Features' }
    ],
    tags: ['Website Design', 'Portfolio Website', 'Desktop Mockup', 'Minimalist UI'],
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-mono',
    title: 'Project Mono',
    subtitle: 'Geometric Specimen Book & Print Graphics',
    category: 'Graphic Design',
    year: '2024',
    client: 'Monolith Holdings',
    mockupType: 'Book Spread & Foil Card Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Curated graphic design collection of minimalist mathematical marks, hardcover specimen book mockups, and foil-stamped print collateral.',
    overview: 'A deep-dive graphic design series exploring the intersection of sacred geometry, Swiss typography, and high-contrast negative space emblems.',
    challenge: 'Creating unforgettable single-glyph marks that remain razor-sharp from a tiny favicon to an embossed hardcover catalog.',
    strategy: 'Obsessive grid calibration using golden spirals, optical alignment over mathematical symmetry, and zero-tolerance kerning.',
    process: [
      'Over 200 physical ink sketches exploring symmetry, tension, and glyph reduction',
      'Vector vectorization in Adobe Illustrator with sub-millimeter anchor precision',
      'Realistic 3D material stress testing on foil-stamped business cards and linen hardcovers',
      'Compilation into a limited-edition risograph printed specimen book mockup'
    ],
    solution: 'A masterclass graphic portfolio adopted by venture capital firms, recording labels, and quantum cryptography startups.',
    results: [
      { label: 'Marks Deployed', value: '18 Systems' },
      { label: 'Trademark Success', value: '100% Cleared' },
      { label: 'Industry Nominations', value: '2 International' }
    ],
    tags: ['Graphic Design', 'Print Mockup', 'Book Mockup', 'Vector Geometry'],
    gallery: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-flux',
    title: 'Project Flux',
    subtitle: 'Dark FinTech Protocol & SaaS Web Platform',
    category: 'Website Design',
    year: '2025',
    client: 'Flux Core Protocol',
    mockupType: 'Curved Display & Mobile Web Mockup',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop',
    shortDescription: 'Futuristic high-impact dark-mode website design with glassmorphism, interactive web mockups, and conversion-optimized screen architecture.',
    overview: 'Flux Protocol needed to articulate complex cryptographic liquidity primitives through an intoxicating, ultra-modern website design.',
    challenge: 'Most tech websites look either like chaotic comic books or confusing text terminals without intuitive user journeys.',
    strategy: 'Pioneered an editorial financial website interface marrying dark obsidian glass panels, live network throughput counters, and subtle neon telemetry.',
    process: [
      'Full Figma interactive prototypes with responsive component hierarchies',
      'High-resolution curved monitor and mobile device mockup generation',
      'A/B tested headline variants and interactive yield calculator widget',
      'Clean website layout implementation with smooth micro-interactions'
    ],
    solution: 'A flagship website destination that helped onboard $120M in total locked value during the testnet launch week.',
    results: [
      { label: 'Waitlist Signups', value: '82,000+' },
      { label: 'Conversion Rate', value: '14.8%' },
      { label: 'Total Value Locked', value: '$120M+' }
    ],
    tags: ['Website Design', 'SaaS Web Mockup', 'Dark Mode UI', 'Dashboard Mockup'],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    number: '01',
    id: 'brand-identity',
    title: 'Brand Identity',
    tagline: 'Visual systems that command market authority.',
    description: 'Logo systems, brand architecture, visual direction, color theory, custom typography lockups, and comprehensive brand books that make your company unforgettable.',
    deliverables: [
      'Bespoke Primary & Secondary Logomarks',
      'Exhaustive Brand Guidelines & Rules',
      'Typography Selection & Kerning Systems',
      'Color Harmonies & Contrast Matrix',
      'Stationery, Packaging & Social Kits'
    ],
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vector Pro'],
    icon: 'Sparkles'
  },
  {
    number: '02',
    id: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'High-impact creative assets engineered to stop the scroll.',
    description: 'Striking social media campaigns, print collateral, advertising creatives, pitch decks, and large-format promotional assets that convert attention into action.',
    deliverables: [
      'High-Conversion Social Media Ad Sets',
      'Investor Pitch Decks & Keynotes',
      'Marketing Collateral & Brochures',
      'Merchandise & Apparel Graphics',
      'Digital Banner & Display Networks'
    ],
    tools: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Lightroom'],
    icon: 'Layers'
  },
  {
    number: '03',
    id: 'wordpress-design',
    title: 'WordPress Web Design',
    tagline: 'Modern, responsive, blazing-fast WordPress solutions.',
    description: 'Custom-tailored WordPress websites engineered with Elementor and modern frontend best practices. Designed for effortless client content management without bloat.',
    deliverables: [
      'Custom Responsive WordPress Theme',
      'Elementor Pro Tailored Components',
      'WooCommerce Storefront Integration',
      'Speed & Core Web Vitals Optimization',
      'Rock-Solid Security & SEO Architecture'
    ],
    tools: ['WordPress', 'Elementor', 'Tailwind', 'PHP / JS', 'ACF Pro'],
    icon: 'Globe'
  },
  {
    number: '04',
    id: 'landing-pages',
    title: 'Landing Pages',
    tagline: 'Conversion-obsessed digital sales funnels.',
    description: 'High-impact, single-purpose landing pages designed to drive product launches, SaaS user acquisitions, and qualified enterprise client leads.',
    deliverables: [
      'Wireframing & Conversion Rate UX Strategy',
      'Dynamic Micro-Interactions & Form Validation',
      'A/B Testing Staging & Event Tracking',
      'Instant-Load Speed Optimization',
      'CRM & Email Marketing Automation Hookup'
    ],
    tools: ['Figma', 'WordPress', 'Elementor', 'Motion', 'Analytics'],
    icon: 'Zap'
  },
  {
    number: '05',
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Clean, intuitive, and modern digital product experiences.',
    description: 'User-centered interfaces that balance visual elegance with surgical usability. From interactive Figma prototypes to fully documented design systems.',
    deliverables: [
      'End-to-End User Flow Mapping',
      'High-Fidelity Interactive Prototypes',
      'Modular Design System in Figma',
      'Micro-Interaction & State Specifications',
      'Developer-Ready Hand-off Specifications'
    ],
    tools: ['Figma', 'FigJam', 'Protopie', 'Design Tokens'],
    icon: 'Layout'
  },
  {
    number: '06',
    id: 'website-redesign',
    title: 'Website Redesign',
    tagline: 'Transform outdated digital presences into market leaders.',
    description: 'Take clunky, slow legacy websites and transform them into sleek, modern, high-performing digital powerhouses that elevate your brand perception.',
    deliverables: [
      'Full UX & Accessibility Performance Audit',
      'Modern Visual Direction Revamp',
      'Zero-Downtime Data & Content Migration',
      'Mobile-First Layout Modernization',
      'Dramatic PageSpeed & SEO Elevation'
    ],
    tools: ['WordPress', 'Audit Tools', 'CSS Grid', 'SEO Optimizers'],
    icon: 'RefreshCw'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    summary: 'Deep-dive into brand DNA, market positioning, and core objectives.',
    details: 'We dissect your competitors, define target customer psychology, map out conversion priorities, and establish unambiguous success metrics before opening design software.',
    deliverable: 'Creative Brief, Project Roadmap & Moodboards'
  },
  {
    step: '02',
    title: 'Strategize',
    summary: 'Architect the visual direction and user experience framework.',
    details: 'We formulate the strategic foundation: wireframes, structural hierarchy, content architecture, and spatial guidelines tailored to your target audience.',
    deliverable: 'Interactive Wireframes & Art Direction Concepts'
  },
  {
    step: '03',
    title: 'Design',
    summary: 'Crafting bold aesthetics, high-fidelity layouts, and 3D depth.',
    details: 'This is where the magic happens. We build the visual language, typography pairings, color systems, and dynamic interactions that make your brand stand out.',
    deliverable: 'Pixel-Perfect Figma Prototypes & Design Tokens'
  },
  {
    step: '04',
    title: 'Refine',
    summary: 'Rigorous optimization, responsive engineering, and interaction polish.',
    details: 'We translate designs into responsive WordPress or custom code, fine-tuning motion timings, optimizing asset sizes, and testing across 12+ device viewports.',
    deliverable: 'Staging Environment & Cross-Device QA'
  },
  {
    step: '05',
    title: 'Deliver',
    summary: 'Flawless deployment, speed validation, and training.',
    details: 'We launch your website to production, run comprehensive SEO and security audits, connect analytics, and provide video tutorials on updating your content effortlessly.',
    deliverable: 'Live Production Launch & Hand-off Video Toolkit'
  }
];

export const WHY_WORK_WITH_ME = [
  {
    title: 'Design-First Thinking',
    description: 'Every layout, pixel, and typographic pairing is rooted in intentional psychology, never random aesthetic trends.',
    icon: 'Eye'
  },
  {
    title: 'Obsessive Detail',
    description: 'From sub-pixel kerning to microsecond interaction delays, nothing ships until it meets elite studio standards.',
    icon: 'Crosshair'
  },
  {
    title: 'Futuristic Aesthetic',
    description: 'Blending dark cinematic elegance with cutting-edge 3D depth to guarantee your brand commands immediate respect.',
    icon: 'Compass'
  },
  {
    title: 'Bespoke Solutions',
    description: 'Zero generic templates or repetitive cookie-cutter themes. Everything is built from scratch for your specific goals.',
    icon: 'Code2'
  },
  {
    title: 'Blazing Performance',
    description: 'Ultra-fast load times, responsive mobile fluidity, clean code, and top-tier SEO best practices baked in.',
    icon: 'Gauge'
  },
  {
    title: 'Direct Communication',
    description: 'You work directly with me—the designer and builder. No account manager layers, no miscommunication, no delays.',
    icon: 'MessageSquare'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Vance',
    role: 'Co-Founder & CEO',
    company: 'Alpha Dynamics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    highlight: 'Raised our $34M Series B with the brand Tushar built.',
    content: 'Tushar is a visionary. He took our dense technical jargon and translated it into a striking, cinematic brand identity that immediately commanded reverence from Tier-1 Silicon Valley investors. Easily the best design investment we ever made.',
    projectType: 'Brand Identity & Guidelines',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Nova Sound Audio',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    highlight: 'Our conversion rate jumped 88% within the first month.',
    content: 'Most WordPress developers build slow, bloated websites. Tushar built an astonishingly fast, award-worthy flagship store that feels like an Apple product launch. His aesthetic sensibility combined with technical precision is rare.',
    projectType: 'WordPress & WooCommerce',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Kenji Takahashi',
    role: 'Head of Marketing',
    company: 'REDLINE Tokyo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    highlight: 'Sold out 10,000 apparel items in less than 4 hours.',
    content: 'Tushar understood our Tokyo cyberpunk aesthetic instantly. The posters, Instagram motion assets, and billboard visuals stopped people in their tracks across Shibuya. A master of visual tension and graphic impact.',
    projectType: 'Social Media & Graphic Design',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Sophia Lindqvist',
    role: 'Managing Principal',
    company: 'Orbit Atelier Zurich',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    highlight: 'A digital experience worthy of Swiss architectural heritage.',
    content: 'Collaborating with Tushar was seamless. He treated our portfolio not as a generic website, but as a digital exhibition space. We secured three institutional museum commissions directly attributed to the new site.',
    projectType: 'WordPress Custom Architecture',
    rating: 5
  }
];

export const RESUME_EXPERIENCE: ResumeExperience[] = [
  {
    period: '2023 — Present',
    role: 'Lead Designer & Creative Director',
    company: 'Tushar Visuals Studio',
    type: 'Independent Practice',
    description: 'Leading end-to-end brand identity systems, high-conversion custom WordPress platforms, and digital experiences for global venture-backed startups and luxury brands.',
    achievements: [
      'Delivered 35+ bespoke brand identities and custom WordPress websites across 8 countries',
      'Maintained 100% 5-star client satisfaction rating and 70% repeat/referral client retention',
      'Helped client startups collectively raise over $45M in institutional venture funding'
    ]
  },
  {
    period: '2021 — 2023',
    role: 'Senior WordPress Web Designer',
    company: 'Nexus Creative Labs',
    type: 'Agency',
    description: 'Spearheaded frontend web design, Elementor design systems, and responsive eCommerce platforms for high-growth DTC brands and corporate enterprises.',
    achievements: [
      'Architected modular Elementor widget libraries cutting project delivery timelines by 40%',
      'Optimized Core Web Vitals for 20+ enterprise portals, lifting average mobile PageSpeed to 95+',
      'Mentored junior graphic designers in typographic discipline and vector precision'
    ]
  },
  {
    period: '2019 — 2021',
    role: 'Graphic & Brand Designer',
    company: 'Vanguard Visuals',
    type: 'Design Studio',
    description: 'Designed logo marks, print collateral, social media campaigns, and marketing visuals for tech startups, music artists, and lifestyle brands.',
    achievements: [
      'Created 50+ distinctive vector logomarks and visual identity guidelines',
      'Designed multi-channel social media campaigns reaching 5M+ organic impressions',
      'Standardized production workflow for print, out-of-home, and digital advertising deliverables'
    ]
  }
];

export const SKILLS_DATA = {
  graphicDesign: [
    { name: 'Brand Identity Systems', level: 98 },
    { name: 'Logo & Monogram Design', level: 96 },
    { name: 'Social Media Advertising', level: 95 },
    { name: 'Editorial & Typography', level: 94 },
    { name: 'Marketing Materials & Print', level: 92 },
    { name: 'Creative Direction', level: 90 }
  ],
  wordPress: [
    { name: 'Custom WordPress Architecture', level: 96 },
    { name: 'Elementor Pro Systems', level: 98 },
    { name: 'Landing Page Conversion', level: 95 },
    { name: 'Responsive & Mobile UX', level: 97 },
    { name: 'Website Redesign', level: 94 },
    { name: 'Core Web Vitals & Speed', level: 93 }
  ],
  digitalDesign: [
    { name: 'UI / UX Product Design', level: 93 },
    { name: 'Design Systems in Figma', level: 95 },
    { name: '3D Web Centerpieces & Motion', level: 88 },
    { name: 'Prototyping & Micro-Interactions', level: 92 },
    { name: 'Visual Hierarchy & Grid Systems', level: 96 }
  ]
};

export const TOOLS_DATA = [
  { name: 'Adobe Photoshop', category: 'Creative', level: 'Master' },
  { name: 'Adobe Illustrator', category: 'Vector / Identity', level: 'Master' },
  { name: 'Figma', category: 'UI/UX & Systems', level: 'Master' },
  { name: 'WordPress', category: 'CMS Architecture', level: 'Master' },
  { name: 'Elementor Pro', category: 'Visual Builder', level: 'Master' },
  { name: 'Tailwind CSS', category: 'Styling', level: 'Advanced' },
  { name: 'Three.js / WebGL', category: '3D Interaction', level: 'Proficient' },
  { name: 'Core Web Vitals', category: 'Performance', level: 'Advanced' }
];

export const EDUCATION_DATA = [
  {
    degree: 'Bachelor of Fine Arts in Visual Communication & Graphic Design',
    institution: 'Institute of Art & Design',
    year: '2016 — 2020',
    honors: 'Summa Cum Laude • Award for Best Thesis in Brand Architecture'
  }
];

export const CERTIFICATIONS_DATA = [
  {
    title: 'Certified WordPress Specialist & Core Architecture',
    issuer: 'WP Engine / Advanced Developer Network',
    year: '2023'
  },
  {
    title: 'Advanced UI/UX & Design Systems Masterclass',
    issuer: 'Figma Certified Professional',
    year: '2022'
  },
  {
    title: 'Advanced Typography & Grid Structure',
    issuer: 'Swiss Typographic Guild',
    year: '2021'
  }
];
