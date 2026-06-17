const en = {
  meta: {
    siteName: 'OpenHaven',
    defaultDescription:
      'OpenHaven — Discover, compare, and choose open protocols for the decentralized web.',
  },

  nav: {
    home: 'Navigator',
    matrix: 'Matrix',
    protocols: 'Tech Tools',
    domains: 'Domains',
    backToOpenHaven: '← Back to OpenHaven',
    backToHome: 'Back to Home',
    selectDomain: 'Select a use case domain',
    brief: 'Brief',
    navigatorPrototype: 'Navigator',
    homeBreadcrumb: 'Home',
    matrixPrototype: 'Matrix',
    contribute: 'Contribute',
    process: 'Our Process',
    beta: 'Beta Status',
    contact: 'Contact',
    research: 'Our Research',
    breadcrumb: 'Breadcrumb',
    researchOverview: 'Research Overview',
    about: 'About/Brief',
    // Research dropdown section titles + "start here" tag (OpenHaven editorial)
    menuStartHere: 'Start Here',
    menuKeyTools: 'Key Tools',
    menuReports: 'Reports',
    menuDiagrams: 'Diagrams',
    startHereTag: 'Start here',
  },

  badge: {
    governance: {
      foundation: 'Foundation',
      dao: 'DAO',
      'single-company': 'Company',
      'open-standard-body': 'Open Standard',
      community: 'Community',
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
    resultsHeading: 'Tech Tools',
    allProtocolsHint: (name: string) =>
      `Showing all ${name} tech tools — check affordances above to refine`,
    step1Title: 'Choose a Use Case',
    step1Subtitle: 'Select the category that best describes your need',
    step1Badge: 'Required',
    step3Title: 'Review Matching Tech Tools',
    showingOnly: 'Showing only',
    protocolsDot: 'tech tools.',
    filteredBy: '— filtered by',
    affordanceCount: (n: number) =>
      `${n} affordance${n > 1 ? 's' : ''}`,
    resultsTip:
      'To see other tech tool matches, try changing your selections in Steps 1 and 2 above.',
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
      `${n} tech tool${n !== 1 ? 's' : ''} match`,
    clearAll: 'Clear all',
    activeFilters: (n: number) => `${n} active`,
    searchPlaceholder: 'Search tech tools\u2026',
    filtersLabel: 'Filters',
    columns: {
      name: 'Name',
      entityType: 'Entity Type',
      governance: 'Governance',
      captureRisk: 'Capture Risk',
      devStatus: 'Dev Status',
      lastInvestigated: 'Last Investigated',
    },
    emptyState:
      'No verified tech tools yet for this combination \u2014 not that none exist. This indicates an unmapped area of the landscape.',
    sortAsc: 'Sort ascending',
    sortDesc: 'Sort descending',
    expandRow: 'Expand details',
    collapseRow: 'Collapse details',
    closeDetails: 'Close details',
    viewFullPage: 'View full tech tool page',
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
    maxSelection: 'Maximum 5 tech tools for comparison',
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
    protocolComparison: 'Tech Tool Comparison',
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
    sharedAffordance: 'Shared across selected tech tools',
    noValue: '\u2014',
    maxSelection: 'Maximum 5 tech tools for comparison',
    ariaLabel: 'Tech tool comparison',
    comparisonDataAriaLabel: (name: string) =>
      `${name} comparison data`,
    removeAriaLabel: (name: string) =>
      `Remove ${name} from comparison`,
    visitLink: 'Visit',
  },

  results: {
    countHeader: (count: number) =>
      count === 1 ? '1 tech tool matches' : `${count} tech tools match`,
    emptyHeading: 'No verified tech tools yet for this combination',
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
    subtitle: 'Let us guide you to the right technologies',
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
    explorePrototype: 'Explore the Navigator',
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
      'Review Options',
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
    beta:
      'OpenHaven\u2019s Navigator and Matrix are in beta status. <strong>Data is a working draft.</strong> <a href="/beta" style="color:inherit;text-decoration:underline;">Learn more about our status \u2192</a>',
    alphaDemo:
      'Status: Prototype. <strong>Data is for demo purposes only.</strong> Please consider <a href="/contribute" style="color:inherit;text-decoration:underline;">contributing</a>.',
    alphaIncomplete:
      'Status: Prototype. <strong>Data is for demo purposes only.</strong> Please consider <a href="/contribute" style="color:inherit;text-decoration:underline;">contributing</a>.',
  },

  contribute: {
    pageTitle: 'Contribute — OpenHaven',
    pageDescription:
      'Help shape the open protocol landscape. Share your knowledge of P2P technologies, use cases, and affordances with the OpenHaven community.',
    heading: 'Contribute to OpenHaven',
    intro1:
      'OpenHaven is a collective initiative for the convergence of P2P technologies — making the open protocol landscape visible, navigable, and actionable.',
    intro2:
      'We need help mapping Use Cases and Affordances — specific abilities a technology allows for — to protocols. If you work with or research P2P technologies, your knowledge is valuable.',
    contactNote:
      'For general inquiries, use our <a href="/contact">contact form</a>.',
    formLinkText: 'open the form directly →',
    formNote:
      'If the form below does not load,',
    iframeTitle: 'OpenHaven Contribution Form',
    contributeBannerMessage: 'See something missing or that could be improved?',
    contributeBannerCta: 'Let us know →',
    contributeBannerDismiss: 'Dismiss',
  },

  contact: {
    pageTitle: 'Contact — OpenHaven',
    pageDescription:
      'Get in touch with the OpenHaven team. Questions, partnership ideas, or just want to say hello.',
    heading: 'Contact Us',
    intro:
      "Have a question, partnership idea, or just want to say hello? We'd love to hear from you.",
    contributeNote:
      'Want to contribute data or feedback? Use our <a href="/contribute">contribution form</a>.',
    formLinkText: 'open the form directly →',
    formNote:
      'If the form below does not load,',
    iframeTitle: 'OpenHaven Contact Form',
  },

  matrixPage: {
    title: 'Protocol Matrix — OpenHaven',
    description:
      'Browse and filter the full convergence matrix of open protocols. Sort by governance, capture risk, and more to surface capability overlaps across the landscape.',
    jsonLdName: 'Protocol Matrix — Open Protocol Landscape',
    jsonLdDescription:
      'Browse and filter the full convergence matrix of open protocols by governance, capture risk, and more.',
    jsonLdListName: 'Open protocols in the convergence matrix',
    pageTitle: 'Protocol Matrix',
    pageSubtitle:
      'Browse the full convergence matrix. Filter by governance, capture risk, and more to surface capability overlaps across the landscape.',
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
      'Capabilities tech tools in this domain may provide',
    overview: 'Overview',
    primaryDomain: 'Primary Domain',
    protocolsMapped: 'Tech Tools Mapped',
    yes: 'Yes',
    no: 'No',
    protocolsIn: (name: string) => `Tech Tools in ${name}`,
    noProtocols: 'No tech tools mapped yet for this domain.',
    exploreInNavigator: 'Explore in Navigator',
    protocolCount: (n: number) =>
      `${n} tech tool${n !== 1 ? 's' : ''}`,
    affordanceCount: (n: number) =>
      `${n} affordance${n !== 1 ? 's' : ''}`,
    keyAffordances: 'Key affordances:',
    openProtocols: 'tech tools',
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
      'Select your technologies and generate context for Cursor, Windsurf, Claude, or your vibe coding tool of choice.',
    badge: 'Vibe Coding Ready',
    selectProtocols: 'Select Tech Tools',
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

  beta: {
    pageTitle: 'Beta Status \u2014 OpenHaven',
    pageDescription:
      'OpenHaven is in beta. The Navigator and Matrix are live with early-stage verification, and contribution pathways are opening up.',
    heading: 'Beta Status',
    subtitle: 'Working tools, early-stage verification, open to contribution.',
    statusHeading: 'Current state',
    statusBody:
      'OpenHaven is in active development. The Navigator and Matrix are live, but the data behind them is still being refined \u2014 reviewed, but not yet deeply verified.',
    dataHeading: 'Data completeness',
    dataBody:
      'The mappings between use cases, affordances, and protocols are real research, but they need further iteration for completeness. Some entries are well-verified; others are early-stage. Every entry carries a last_investigated date so you can see how fresh it is.',
    contributionHeading: 'Opening up contribution',
    contributionBody:
      'We are in the process of opening up our pathways for contribution and collaboration. Right now, the best way to get involved is through our contribution form or by reaching out directly. Formal governance participation pathways are being developed.',
    verificationHeading: 'Verification model',
    verificationBody:
      'We\u2019re building a progressive verification model where entries carry visible, independent signals \u2014 not a single \u201Cverified\u201D stamp. Research Lead review is the baseline today. Development team confirmation and third-party community verification are being added.',
    getInvolved: 'Get involved',
    getInvolvedBody:
      'If you work with P2P or decentralized technologies, your knowledge can directly improve this data. If you have experience with governance evaluation or data verification, we want your input on our standards.',
    contributeLink: 'Contribute data or flag an issue \u2192',
    processLink: 'Read how we work \u2192',
    contactLink: 'Reach out to the team \u2192',
    navigatorLink: 'Explore the Navigator \u2192',
    matrixLink: 'Browse the Matrix \u2192',
  },

  process: {
    pageTitle: 'How OpenHaven Works — OpenHaven',
    pageDescription:
      'How we build and maintain the Navigator and Matrix \u2014 and how to get involved.',
    heading: 'How OpenHaven Works',
    subtitle:
      'How we build and maintain the Navigator and Matrix \u2014 and how to get involved.',
    alphaNotice:
      '<strong>OpenHaven is in active development.</strong> The data in the Navigator is real but not yet complete. We\u2019re building in the open. <a href="/contribute" style="color:inherit;text-decoration:underline;">Consider contributing \u2192</a>',

    intakeHeading: 'How protocols and tools get into the Navigator',
    intakeIntro:
      'OpenHaven\u2019s convergence matrix \u2014 the structured dataset behind the Navigator \u2014 is built through dedicated research and community contribution.',
    intakeResearch:
      'Our research team investigates the peer-to-peer and decentralized protocol landscape using published documentation, source code, governance records, and direct engagement with protocol communities. New entries are proposed by the research team or by community members and partners.',
    intakeCommunity:
      'Anyone can propose a new protocol, tool, or project for inclusion. Our contribution pathway captures what the research team needs: protocol name, governance model, key affordances, development status, and source references.',
    intakeCollect:
      'Each entry includes 40+ standardized attributes covering technical capabilities, governance structure, capture risk, development status, self-hostability, source licensing, and community links. Every capability claim is backed by at least one independent source reference.',

    reviewHeading: 'Our review standards \u2014 and how they\u2019re evolving',
    reviewToday: 'Our research team drafts each entry, and our Research Lead reviews it against published sources before publication. Every entry is checked for:',
    reviewChecks: [
      'Development status is current (active, maintained, archived, or deprecated)',
      'Governance model is documented and sourced (foundation, DAO, single company, open standard body, etc.)',
      'Capture risk assessment is grounded in observable governance structure',
      'Capability claims are supported by at least one independent source \u2014 documentation, repository evidence, or third-party confirmation. Self-attestation from a developing team is not sufficient.',
      'Community links (repos, forums, chat groups) are active and current',
    ],
    reviewFreshness:
      'Every entry carries a last_investigated date \u2014 when the research team last reviewed it. Stale data is visible, not hidden.',
    reviewHeadedIntro:
      'We don\u2019t stamp entries \u201Cverified\u201D or \u201Cunverified.\u201D Instead, each entry shows a combination of independent signals \u2014 research review, development team confirmation, and community verification \u2014 so you can see exactly how much scrutiny it\u2019s received.',
    reviewSignals: [
      {
        title: 'Reviewed by Research Lead',
        description: 'Internal review against published sources. This is the baseline today.',
      },
      {
        title: 'Confirmed by development team',
        description: 'The technology\u2019s own development team has reviewed and confirmed the entry\u2019s accuracy. A useful signal, but not sufficient on its own \u2014 one input, not a stamp of approval.',
      },
      {
        title: 'Third-party verified (N)',
        description: 'Independent community members have reviewed and confirmed the entry, with a visible count. An entry verified by 24 people carries more weight than one verified by 2.',
      },
    ],
    reviewSignalsNote:
      'These signals are additive, not sequential. An entry might be reviewed by the Research Lead and confirmed by 12 independent verifiers but not yet confirmed by the development team. Another might have development team confirmation but no third-party review yet. Every entry shows exactly where it stands.',
    reviewSharedPractice:
      'This model means verification doesn\u2019t depend on any single person. It becomes a shared practice \u2014 rooted in the community this data serves.',
    reviewTriggers:
      'Entries are revisited when:',
    reviewTriggerList: [
      'A community member flags an issue or suggests an update',
      'A protocol team releases a significant update or governance change',
      'Partners surface new information through coordination channels',
    ],
    reviewCaptureRisk:
      'We surface governance model and capture risk on every entry because we believe it matters \u2014 a technology\u2019s governance structure shapes whether it stays open or gets captured. But we want to be direct: how to best assess capture risk for each technology is something we\u2019re still working out, and we\u2019re looking to the community for guidance on how to do it well.',

    contributeHeading: 'Ways to contribute and connect',
    contributeIntro:
      'The Navigator is stronger because people who know the landscape help build and maintain it. If you rely on this data, you can help make it better.',
    contributeFlag: 'Flag an error or suggest an update.',
    contributeFlagBody: 'Community flags are a primary update trigger. Your input directly improves the data for everyone.',
    contributePropose: 'Propose a new entry.',
    contributeProposeBody: 'Know a protocol, tool, or project that should be here? Our contribution pathway captures what the research team needs to verify and publish it.',
    contributeVerification: 'Help shape verification and capture-risk standards.',
    contributeVerificationBody: 'Our verification standards and capture-risk assessment frameworks are still evolving. If you have experience with data verification, protocol evaluation, or governance assessment in open-source or decentralized contexts, we want your input.',
    contributePartnership: 'Protocol team and coalition partnerships.',
    contributePartnershipBody: 'If you represent a protocol team, a coalition organization, or a research group in the P2P and decentralized space \u2014 let\u2019s talk. Whether that\u2019s ensuring your project\u2019s data is accurate, coordinating on shared research, or exploring deeper collaboration.',
    contributeGovernance: 'Participate in governance.',
    contributeGovernanceBody: 'OpenHaven\u2019s governance evolves as the community grows. We operate as a small founding team with a consent-based decision model and are building pathways for broader participation. If you\u2019re interested in contributing to how OpenHaven is governed \u2014 not just its data \u2014 reach out.',
    contributeAttribution: 'Attribution.',
    contributeAttributionBody: 'Every contribution is credited. Data contributions, editorial input, and community flags are tracked with contributor attribution. When your submission is verified and published, your name (or pseudonym, by preference) appears on the work \u2014 including on protocol cards in the Navigator.',
    contributeSpread: 'Spread the word.',
    contributeSpreadBody: 'If OpenHaven is useful to you, share it. The more eyes on this data, the more accurate and complete it becomes.',

    teamHeading: 'Team',
    teamMembers: [
      { name: 'Day Waterbury', role: 'Open Protocol Visionary and Project Management' },
      { name: 'Brandon N\u00F8rgaard', role: 'Backend Development and Technical Research' },
      { name: 'Zach Miltz', role: 'Product Management and Full Stack Development' },
      { name: 'Marty Behrens', role: 'User Research and Community Outreach' },
      { name: 'Kevin Triplett', role: 'Decentralized Technology Advisor' },
    ],
    teamFooter:
      'OpenHaven was born from the Collaborative Technology Alliance. Our governance framework \u2014 how decisions are made and how this process evolves \u2014 is being developed transparently.',

    proposeEntry: 'Propose a new entry \u2192',
    suggestUpdate: 'Suggest an update \u2192',
    getInTouch: 'Get in touch \u2192',
    learnMore: 'reach out \u2192',
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

  research: {
    landingTitle: 'Research Overview',
    landingBreadcrumb: 'Research Overview',
    intro:
      "Research and reference materials that ground OpenHaven's work — writeups on the data infrastructure behind ecosystem mapping and on commons-based finance, alongside the sovereign-stack diagrams and a monetary-architecture report.",
    // Key Tools highlight (Navigator + Matrix) — OpenHaven editorial (flag for review)
    keyPiecesHeading: 'The two core tools',
    keyPiecesIntro:
      "Everything else here supports OpenHaven's two primary tools — start with these.",
    navigatorSummary:
      "Guided discovery — answer a few questions about what you're building and surface the protocols and tools that fit.",
    matrixSummary:
      'The full comparison table — every protocol and tool, side by side across attributes.',
    embeddedHeading: 'Reports',
    diagramsHeading: 'Diagrams',
    diagramsNote:
      'These diagrams open on their original deployments; importing them into the site is planned for a later stage.',
    externalNewTab: 'Opens in a new tab',
    readReport: 'Read the report',
    viewDiagram: 'View diagram',
    attributionBy: 'By',
    publishedBy: 'Published on behalf of',
    licenseLabel: 'Licensed under',
    importedOnLabel: 'One-time import on',
    noAutoUpdate: 'This page does not auto-update if the source changes upstream.',
    localeNotice: 'This content is published in English.',
    attributionRegionLabel: 'Attribution and maintenance',
    stackTitle: 'Sovereign Stack Model',
    stackEntityTitle: 'Stack Model — Entity Placement',
    stackSampleTitle: 'Entities Mapped to Stack Layers',
    monetaryTitle: 'Monetary Architecture',
    // Diagram summaries (1 line each) — OpenHaven editorial (flag for review)
    stackSummary:
      'An interactive map of the sovereign-technology stack — the layers, from infrastructure to application, a self-sovereign digital ecosystem is built on.',
    stackEntitySummary:
      "The same stack model with real protocols and projects placed onto each layer — showing where today's tools actually sit.",
    monetarySummary:
      'A visual breakdown of the monetary and value-flow architecture underpinning commons-oriented and regenerative economic systems.',
    rawDocsHeading: 'Additional documents',
    rawDocsNote: 'Standalone reference pages, shown in their original formatting outside the main site design.',
    openDocument: 'Open document',
  },
} as const

export type Translations = typeof en
export default en
