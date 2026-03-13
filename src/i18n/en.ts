const en = {
  meta: {
    siteName: 'OpenHaven',
    defaultDescription:
      'OpenHaven — Discover, compare, and choose open protocols for the decentralized web.',
  },

  nav: {
    home: 'Navigator (Prototype)',
    matrix: 'Matrix',
    protocols: 'Protocols',
    domains: 'Domains',
    backToOpenHaven: '← Back to OpenHaven',
    backToHome: 'Back to Home',
    selectDomain: 'Select a use case domain',
    brief: 'Stakeholder Brief',
    navigatorPrototype: 'Navigator (Prototype)',
    homeBreadcrumb: 'Home',
    matrixPrototype: 'Matrix (Prototype)',
  },

  badge: {
    governance: {
      foundation: 'Foundation',
      dao: 'DAO',
      'single-company': 'Company',
      'open-standard-body': 'Open Standard',
      community: 'Community',
    },
    architecture: {
      'fully-p2p': 'Fully P2P',
      federated: 'Federated',
      hybrid: 'Hybrid',
    },
    captureRisk: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
    captureRiskLabel: {
      low: 'Low capture risk',
      medium: 'Medium capture risk',
      high: 'High capture risk',
    },
    captureRiskTooltip:
      'Capture risk reflects governance structure, not quality. High-capture protocols may be candidates for governance transition.',
  },

  navigator: {
    heading: 'Choose a Use Case Domain',
    emptyState:
      "No use case domains are loaded yet — check back soon as we're actively mapping the open protocol landscape.",
    showingResults: 'Showing results for:',
    resultsHeading: 'Protocols',
    allProtocolsHint: (name: string) =>
      `Showing all ${name} protocols — check affordances above to refine`,
    step1Title: 'Choose a Use Case',
    step1Subtitle: 'Select the category that best describes your need',
    step1Badge: 'Required',
    step3Title: 'Review Matching Protocols',
    showingOnly: 'Showing only',
    protocolsDot: 'protocols.',
    filteredBy: '— filtered by',
    affordanceCount: (n: number) =>
      `${n} affordance${n > 1 ? 's' : ''}`,
    resultsTip:
      'To see other protocol matches, try changing your selections in Steps 1 and 2 above.',
  },

  affordances: {
    title: 'Refine by Affordance',
    subtitle:
      'Narrow your results — check the affordances that matter to you',
    badge: 'Optional',
    matchLabel: 'Match:',
    matchModeLabel: 'Match mode',
    matchAny: 'ANY',
    matchAll: 'ALL',
    clearAll: 'Clear all',
    selectAll: 'Select all',
    nudge:
      'Check the affordances that matter to you to narrow results',
    filtersLabel: 'Affordance filters',
  },

  matrix: {
    protocolCount: (n: number) =>
      `${n} protocol${n !== 1 ? 's' : ''} match`,
    clearAll: 'Clear all',
    activeFilters: (n: number) => `${n} active`,
    searchPlaceholder: 'Search protocols\u2026',
    filtersLabel: 'Filters',
    columns: {
      name: 'Name',
      entityType: 'Entity Type',
      architecture: 'Architecture',
      governance: 'Governance',
      captureRisk: 'Capture Risk',
      devStatus: 'Dev Status',
      lastInvestigated: 'Last Investigated',
    },
    emptyState:
      'No verified protocols yet for this combination \u2014 not that none exist. This indicates an unmapped area of the landscape.',
    sortAsc: 'Sort ascending',
    sortDesc: 'Sort descending',
    expandRow: 'Expand details',
    collapseRow: 'Collapse details',
    closeDetails: 'Close details',
    viewFullPage: 'View full protocol page',
    useCaseDomains: 'Use Case Domains',
    affordances: 'Affordances',
    visitCommunity: 'Visit Community',
    license: 'License',
    devStatus: 'Development Status',
    owner: 'Owner',
    country: 'Country',
    startYear: 'Start Year',
    stack: 'Stack',
    funding: 'Funding',
    lastInvestigated: 'Last Investigated',
    description: 'Description',
    noDescription: 'No description available',
    selectForComparison: 'Select for comparison',
    compareNSelected: 'Compare',
    nOfMaxSelected: 'selected',
    clearSelection: 'Clear selection',
    maxSelection: 'Maximum 5 protocols for comparison',
    filterArchitecture: 'Architecture',
    filterGovernance: 'Governance',
    filterCaptureRisk: 'Capture Risk',
    filterEntityType: 'Entity Type',
    filterDevStatus: 'Dev Status',
    collapseAriaLabel: (name: string, expanded: boolean) =>
      expanded ? `Collapse ${name} details` : `Expand ${name} details`,
    selectAriaLabel: (name: string) =>
      `Select ${name} for comparison`,
    detailsAriaLabel: (name: string) => `${name} details`,
  },

  comparison: {
    compareSelected: 'Compare selected',
    selected: 'selected',
    clearSelection: 'Clear selection',
    clearComparison: 'Clear comparison',
    removeFromComparison: 'Remove from comparison',
    protocolComparison: 'Protocol Comparison',
    architectureType: 'Architecture',
    governanceModel: 'Governance',
    captureRisk: 'Capture Risk',
    license: 'License',
    devStatus: 'Development Status',
    owner: 'Owner',
    startYear: 'Start Year',
    stack: 'Stack',
    funding: 'Funding',
    useCaseDomains: 'Use Case Domains',
    affordances: 'Affordances',
    communityLink: 'Community',
    lastInvestigated: 'Last Investigated',
    sharedAffordance: 'Shared across selected protocols',
    noValue: '\u2014',
    maxSelection: 'Maximum 5 protocols for comparison',
    ariaLabel: 'Protocol comparison',
    comparisonDataAriaLabel: (name: string) =>
      `${name} comparison data`,
    removeAriaLabel: (name: string) =>
      `Remove ${name} from comparison`,
    visitLink: 'Visit',
  },

  results: {
    countHeader: (count: number) =>
      count === 1 ? '1 protocol matches' : `${count} protocols match`,
    emptyHeading: 'No verified protocols yet for this combination',
    emptyBody:
      "That doesn\u2019t mean none exist \u2014 just that we haven\u2019t mapped them yet.",
    emptyContribute: 'Know one we should add?',
    contributeLinkText: 'Contribute',
  },

  card: {
    viewDetails: 'View Details',
  },

  cta: {
    heading: 'Not sure where to start?',
    subtitle: 'Let us guide you to the right protocols',
    button: 'Guide me',
  },

  wizard: {
    question: 'What are you trying to do?',
    close: 'Close',
    tooltipPrefix: 'This maps to:',
    tooltipSuffix: 'in the domain grid below',
    answers: {
      communicate: 'Talk freely with people and groups',
      identity: "Know who I'm dealing with and control my data",
      organize: 'Organize a group or make decisions together',
      help: 'Help and support people in my community',
      create: 'Create, learn, or share knowledge together',
      coordinate: 'Coordinate events or local projects',
    },
  },

  home: {
    title: 'OpenHaven — Building Bridges in the P2P Ecosystem',
    description:
      'OpenHaven documents the open protocol landscape and advocates for interoperability. Discover, compare, and choose open protocols for the decentralized web.',
    heroTitle: 'OpenHaven',
    heroTagline: 'Building Bridges in the P2P Ecosystem',
    buildingTogetherHeading: 'Building Together',
    buildingTogetherBody:
      'The shift to decentralized systems requires collaboration across research labs, protocol teams, and application developers. OpenHaven documents the current landscape, makes it more navigable, and advocates for interoperability. Our principles:',
    principles: [
      'Modular protocols over monolithic platforms',
      'Local-first applications with global connectivity',
      'User-controlled data and identity',
      'Composable standards that enable innovation',
      'Pragmatic solutions for real-world adoption',
    ],
    navigableHeading: 'Making It Navigable',
    navigableBody1:
      "Dozens of open protocols exist across the decentralized web — each solving overlapping problems, largely in isolation. Finding the right tool for a real coordination need shouldn't require deep technical knowledge.",
    navigableBody2:
      'Our technology navigator prototype lets you start from what you need, understand the capabilities required, and discover the protocols that provide them — governance model and capture risk included.',
    explorePrototype: 'Explore the Prototype',
    readBrief: 'Read the Stakeholder Brief',
    newBadge: 'New',
  },

  hero: {
    title: 'Navigate the Open Protocol',
    highlight: 'Landscape',
    subtitle:
      'Discover verified protocols organized by real-world needs — not technical jargon. Built for builders, coalitions, and communities shaping the decentralized web.',
    badge: 'Status: Prototype. Read the <a href="/brief" style="color:inherit;text-decoration:underline;">Stakeholder Brief</a>.',
    getStarted: 'Get Started',
    browseMatrix: 'Browse Full Matrix',
  },

  principles: {
    heading: 'How OpenHaven Works',
    subheading: 'Open protocols, organized by what matters to you.',
    stepLabels: [
      'Choose a Use Case',
      'Refine by Affordance',
      'Review Protocols',
      'Connect & Build',
    ],
    items: [
      {
        title: 'Start from Need',
        description:
          'Enter through real-world use cases like Communication, Identity, or Mutual Aid — not technical jargon.',
      },
      {
        title: 'Understand What Matters',
        description:
          'See plain-language affordances that explain technical capabilities in terms of what they enable for you.',
      },
      {
        title: 'Find Your Stack',
        description:
          'Arrive at verified protocols with governance, risk, and community context so you can choose with confidence.',
      },
      {
        title: 'Connect & Build',
        description:
          "Connect with the protocol's community and start building, manually or with preset AI prompts.",
      },
    ],
  },

  disclaimer: {
    alphaDemo:
      'Status: Prototype. <strong>Data is for demo purposes only.</strong> Read the <a href="/brief" style="color:inherit;text-decoration:underline;">Stakeholder Brief</a>.',
    alphaIncomplete:
      'Status: Prototype. <strong>Data is for demo purposes only.</strong> Read the <a href="/brief" style="color:inherit;text-decoration:underline;">Stakeholder Brief</a>.',
  },

  matrixPage: {
    title: 'Protocol Matrix — OpenHaven',
    description:
      'Browse and filter the full convergence matrix of open protocols. Sort by governance, architecture, capture risk, and more to surface capability overlaps across the landscape.',
    jsonLdName: 'Protocol Matrix — Open Protocol Landscape',
    jsonLdDescription:
      'Browse and filter the full convergence matrix of open protocols by governance, architecture, capture risk, and more.',
    jsonLdListName: 'Open protocols in the convergence matrix',
    pageTitle: 'Protocol Matrix',
    pageSubtitle:
      'Browse the full convergence matrix. Filter by governance, architecture, capture risk, and more to surface capability overlaps across the landscape.',
  },

  navigatorPage: {
    title: 'Open Protocol Navigator — OpenHaven',
    description:
      'Navigate and compare open protocols for the decentralized web.',
    heading: 'Open Protocol Navigator',
    tagline: 'Discover, compare, and choose open protocols',
  },

  domain: {
    useCaseDomain: 'Use Case Domain',
    affordances: 'Affordances',
    affordancesSubtitle:
      'Capabilities protocols in this domain may provide',
    overview: 'Overview',
    primaryDomain: 'Primary Domain',
    protocolsMapped: 'Protocols Mapped',
    yes: 'Yes',
    no: 'No',
    protocolsIn: (name: string) => `Protocols in ${name}`,
    noProtocols: 'No protocols mapped yet for this domain.',
    exploreInNavigator: 'Explore in Navigator',
    protocolCount: (n: number) =>
      `${n} protocol${n !== 1 ? 's' : ''}`,
    affordanceCount: (n: number) =>
      `${n} affordance${n !== 1 ? 's' : ''}`,
    keyAffordances: 'Key affordances:',
    openProtocols: 'open protocols',
  },

  protocol: {
    details: 'Details',
    useCaseDomains: 'Use Case Domains',
    affordances: 'Affordances',
    links: 'Links',
    visitWebsite: 'Visit Website',
    visitCommunity: 'Visit Community',
    attributes: 'Attributes',
    license: 'License',
    devStatus: 'Dev Status',
    owner: 'Owner',
    country: 'Country',
    startYear: 'Start Year',
    stack: 'Stack',
    funding: 'Funding',
    lastInvestigated: 'Last Investigated',
  },

  exportSection: {
    heading: 'Export Your Stack for AI-Assisted Development',
    subheading:
      'Select your protocols and generate context for Cursor, Windsurf, Claude, or your vibe coding tool of choice.',
    badge: 'Vibe Coding Ready',
    selectProtocols: 'Select Protocols',
    generatePrompt: 'Generate Prompt',
    comingSoon: 'Interactive version coming soon',
  },

  resources: {
    heading: 'Go Deeper',
    subheading:
      'Resources, communities, and ways to contribute to the project.',
  },

  contributors: {
    heading: "Who's Behind This",
    subheading:
      'Meet the builders and researchers who contributed these evaluations.',
  },

  footer: {
    copyright: '\u00A9 2026 OpenHaven',
  },

  brief: {
    title: 'Stakeholder Brief — OpenHaven',
    description:
      'OpenHaven is a community-led, data-driven convergence navigator for the peer-to-peer and decentralized protocol landscape.',
    heading: 'OpenHaven: Stakeholder Brief',
    executiveSummary: 'Executive Summary',
    executiveSummaryP1:
      'OpenHaven is a community-led, data-driven convergence navigator for the peer-to-peer (P2P) and decentralized protocol landscape that makes it visible, navigable, and directly actionable — including for AI-assisted development workflows. It replaces the current single-page openhaven.net with a live, data-driven website that serves as both a navigable guide to open protocols and a collective voice for the people building and using them.',
    executiveSummaryP2:
      "Born from the Collaborative Technology Alliance (CTA) and a growing coalition of researchers, builders, and community leaders, OpenHaven translates complex protocol research into something legible, actionable, and shareable. <strong>OpenHaven's mission is making the open protocol landscape interoperable and interact-able — navigable by the people who need it — informed by the understanding that technical convergence depends on social convergence.</strong> Not just mapping the technology, but building the tent — giving the movement a collective voice, a shared home, and tools — including machine-readable context and prompt generation for AI-assisted workflows — that lower the barrier to understanding and adoption.",
    executiveSummaryP3:
      'OpenHaven serves three interconnected audiences: <strong>community leaders</strong> seeking tools to solve real coordination problems, <strong>builders and researchers</strong> seeking convergence and network effects across fragmented efforts, and <strong>coalition organizations</strong> (e.g. CTA, DWeb) needing a shared evidence base to weave their convergence work together. For all three, OpenHaven is a hub they are proud to share — because it demonstrates tangible progress toward foundational infrastructure for humanity\'s coordination challenges.',
    coreVision: 'Core Vision',
    problemStatement: 'Problem Statement',
    problemStatementBody:
      'The P2P and decentralized protocol landscape is deeply fragmented. Dozens of protocols, platforms, and applications exist across a spectrum from fully P2P to federated to centralized — each solving overlapping problems, developed largely in isolation.',
    problemList: [
      '<strong>For community leaders and non-technical users:</strong> The landscape is illegible. They have real needs — private communication, mutual aid coordination, censorship-resistant journalism — but no trusted, outcome-oriented guide to match needs with tools.',
      '<strong>For builders and researchers:</strong> The pain is fragmentation. Talented teams build impressive technology in silos, struggling to achieve network effects. Everyone feels the drag — if these projects were more unified, the collective impact would be exponentially greater.',
      '<strong>For coalition organizations like CTA:</strong> There is no shared mechanism to map "what code each person is bringing to the table" so convergence efforts can be woven together effectively. OpenHaven can serve as that mechanism.',
    ],
    problemImpact: 'Problem Impact',
    problemImpactBody:
      'The stakes extend well beyond the technology community. The convergence of environmental, political, and social coordination failures demands foundational infrastructure — systems that enable humanity to organize, communicate, and govern at scale without dependence on centralized systems vulnerable to capture, censorship, or failure. Communities facing authoritarian pressure, journalists protecting sources, neighbors coordinating disaster response — they need this to work, and it needs to be findable, understandable, and action-enabling.',
    whyExistingFail: 'Why Existing Solutions Fall Short',
    whyExistingFailIntro:
      "Several mapping efforts exist — Christina Bowen's DWeb Kumu map, Josh Field's Wise Tech Capabilities Matrix, Brandon Norgaard's convergence spreadsheet — but each addresses only a slice:",
    whyExistingFailList: [
      '<strong>Existing maps are researcher-facing</strong>, not community-leader-facing — they catalog technology but don\'t answer "what should I use?"',
      '<strong>Nothing is outcome-oriented</strong> — current tools organize by technology category, not by human need.',
      '<strong>There is no social convergence layer</strong> — existing resources are static documents, not living hubs.',
      '<strong>Nothing is built for AI-assisted workflows</strong> — no resource provides machine-readable context, chatbot exploration, or prompt-ready recommendations.',
      '<strong>The movement lacks a collective voice</strong> — contributors across DWeb, NAO, RegenOS, and CTA have no shared home.',
    ],
    proposedSolution: 'Proposed Solution',
    proposedSolutionIntro:
      'OpenHaven (openhaven.net) becomes a live, data-driven convergence navigator comprising:',
    proposedSolutionList: [
      '<strong>Open Protocol Navigator</strong> — An interactive, data-driven tool backed by a convergence matrix of 69+ protocol entries with 40+ standardized attributes each. Users navigate through a Use Cases → Affordances → Tools architecture: enter through human needs, understand the capabilities required, and discover the protocols that provide them. Governance model and capture risk are surfaced alongside technical capabilities for every entry.',
      '<strong>Verified Data Infrastructure</strong> — An open-source relational data platform as the source of truth. Every entry is expert-verified, contributor-attributed, source-referenced, and carries a <code>last_investigated</code> date.',
      '<strong>State of Convergence</strong> — Editorial content summarizing the landscape and where convergence is emerging, produced collaboratively with CTA, DWeb, and others.',
      '<strong>Machine-Readable Context &amp; Prompt Generation</strong> — V1 ships <code>llms-full.txt</code> for full-context AI ingestion and prompt generation for selected tech stacks, so developers can go from protocol discovery to building in a single session. Future versions add a protocol advisor chatbot, code generation, and AI agent integration.',
      '<strong>Pro-social Design Integration</strong> — Connection to the Pro-social Design application and community, bridging protocol infrastructure with relational and emotional design.',
      '<strong>Feedback &amp; Contribution Mechanisms</strong> — Built in from day one. Entry-level feedback, site-wide suggestions, contributor pathways for new data submissions, and survey mechanisms for qualitative stories.',
    ],
    proposedSolutionFooter:
      'All data is human-verified before publication. The data quality lifecycle distinguishes claimed from demonstrated capability, with contributor attribution and source references tracked per entry.',
    keyDifferentiators: 'Key Differentiators',
    keyDifferentiatorsList: [
      '<strong>Protocol interoperability, informed by social interoperability:</strong> OpenHaven maps the technical landscape while grounding it in the understanding that social convergence — community resonance, dialogue, trust — is a precursor to technical convergence. Software serves the social foundation, not the other way around.',
      '<strong>Use Cases → Affordances → Tools navigation:</strong> Start from human needs, surface the capabilities required, then map to protocols. Outcome-first, not technology-first.',
      '<strong>Built for AI-assisted workflows:</strong> Full machine-readable context (<code>llms-full.txt</code>), prompt export for selected tech stacks, and an architecture designed to evolve toward chatbot exploration and code generation. V1 makes the landscape understandable; future versions make it directly actionable.',
      '<strong>Connector, not platform:</strong> OpenHaven points to existing communities and conversations rather than building a competing social layer.',
      '<strong>Evidence-based, not advocacy-based:</strong> The Navigator serves all positions in the convergence debate by providing verified data, not pushing an agenda.',
      '<strong>Collective voice:</strong> A home the movement is proud to point to — a tangible representation of the work being done for collective betterment.',
    ],
    ecosystemContext: 'Ecosystem Context',
    ecosystemContextBody:
      "OpenHaven is embedded in a broader constellation of convergence efforts — funding pipelines, narrative infrastructure, use case definition, community experiments, and open social ecosystem design. These efforts are increasingly finding each other. OpenHaven's role is specific — protocol discovery and navigation — but its value compounds as adjacent efforts mature and as the people driving them use the Navigator as a shared reference point.",
    whoItsFor: "Who It's For",
    whoItsForIntro:
      'OpenHaven serves four audiences, each with a distinct relationship to the protocol landscape:',
    personas: {
      mira: "<strong>Mira, the Convergence Builder</strong> — A protocol developer working on local-first collaboration tools, three years deep in the DWeb space. She's frustrated that her work and adjacent projects operate in silos. She needs a single view of who's building what so she can collaborate instead of duplicate — and she wants to contribute her own project's data to the collective map.",
      raul: '<strong>Raul, the Coalition Weaver</strong> — A technical coordinator at a DWeb/CTA-adjacent organization who sits at the intersection of several convergence groups. He needs a shareable artifact that maps capabilities across the coalition — something he can pull up in a coordination call, use to build joint funding proposals, and send to new collaborators as "the evidence base for what we\'re doing."',
      jess: '<strong>Jess, the Vibe Coder</strong> — A full-stack developer building community tools with AI-assisted workflows. She wants to build on open protocols but the ecosystem is overwhelming. She needs to understand her options, pick a stack, and get prompt-ready context she can paste into her AI IDE — without spending weeks researching.',
      amara: '<strong>Amara, the Community Proxy</strong> — A tech coordinator at an international press freedom NGO, recommending secure communication tools for journalists in at-risk regions. The stakes are life-or-death. She needs to navigate by outcome ("censorship-resistant communication for journalists in Iran") and trust that the recommendations are verified, not just marketed.',
    },
    successHeading: "How We'll Know It's Working",
    successMetrics: [
      '<strong>People are finding what they need</strong> — users are entering through use case domains and arriving at relevant, verified protocol lists without prior technical knowledge',
      '<strong>The community is sharing it</strong> — coalition members, builders, and contributors are actively sending OpenHaven links to their networks as the canonical reference',
      '<strong>Convergence is becoming visible</strong> — the abstraction layer spanning protocols is more legible, and it\'s clearer which protocols are best positioned for collective coordination',
      '<strong>Feedback is flowing</strong> — suggestions, updates, and real stories are coming through the built-in mechanisms ("I found X through OpenHaven and it changed how we coordinate")',
      '<strong>Funding conversations reference it</strong> — at least one grant application or funder conversation uses OpenHaven as an evidence base',
      '<strong>Hope is growing</strong> — community feedback reflects a stronger sense of cohesion and momentum, with less energy spilled from fragmented effort',
    ],
    getInTouch: 'Get In Touch',
    getInTouchBody:
      'Interested in contributing, partnering, or learning more? Please reach out to <strong>Day Waterbury</strong>, <strong>Brandon Nørgaard</strong>, and <strong>Zach Miltz</strong>.',
    attribution:
      "Produced 27-Feb-2026 by Zach Miltz for OpenHaven, the community, and in support of the technical and social convergence that will unlock humanity's collective potential.",
    explorePrototype: 'Explore the prototype →',
  },
} as const

export type Translations = typeof en
export default en
