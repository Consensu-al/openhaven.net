import type { Translations } from './en'

const ptBR: Translations = {
  meta: {
    siteName: 'OpenHaven',
    defaultDescription:
      'OpenHaven — Descubra, compare e escolha protocolos abertos para a web descentralizada.',
  },

  nav: {
    home: 'Navegador (Protótipo)',
    matrix: 'Matriz',
    protocols: 'Protocolos',
    domains: 'Domínios',
    backToOpenHaven: '← Voltar ao OpenHaven',
    backToHome: 'Voltar ao Início',
    selectDomain: 'Selecione um domínio de caso de uso',
    brief: 'Resumo para Stakeholders',
    navigatorPrototype: 'Navegador (Protótipo)',
    homeBreadcrumb: 'Início',
    matrixPrototype: 'Matriz (Protótipo)',
  },

  badge: {
    governance: {
      foundation: 'Fundação',
      dao: 'DAO',
      'single-company': 'Empresa',
      'open-standard-body': 'Padrão Aberto',
      community: 'Comunidade',
    },
    architecture: {
      'fully-p2p': 'Totalmente P2P',
      federated: 'Federado',
      hybrid: 'Híbrido',
    },
    captureRisk: {
      low: 'Baixo',
      medium: 'Médio',
      high: 'Alto',
    },
    captureRiskLabel: {
      low: 'Risco de captura baixo',
      medium: 'Risco de captura médio',
      high: 'Risco de captura alto',
    },
    captureRiskTooltip:
      'O risco de captura reflete a estrutura de governança, não a qualidade. Protocolos de alta captura podem ser candidatos a transição de governança.',
  },

  navigator: {
    heading: 'Escolha um Domínio de Caso de Uso',
    emptyState:
      'Nenhum domínio de caso de uso carregado ainda — volte em breve, estamos mapeando ativamente o cenário de protocolos abertos.',
    showingResults: 'Mostrando resultados para:',
    resultsHeading: 'Protocolos',
    allProtocolsHint: (name: string) =>
      `Mostrando todos os protocolos de ${name} — marque affordances acima para refinar`,
    step1Title: 'Escolha um Caso de Uso',
    step1Subtitle: 'Selecione a categoria que melhor descreve sua necessidade',
    step1Badge: 'Obrigatório',
    step3Title: 'Revise os Protocolos Correspondentes',
    showingOnly: 'Mostrando apenas',
    protocolsDot: 'protocolos.',
    filteredBy: '— filtrado por',
    affordanceCount: (n: number) =>
      `${n} affordance${n > 1 ? 's' : ''}`,
    resultsTip:
      'Para ver outros protocolos correspondentes, tente alterar suas seleções nos Passos 1 e 2 acima.',
  },

  affordances: {
    title: 'Refine por Affordance',
    subtitle:
      'Reduza seus resultados — marque as affordances que importam para você',
    badge: 'Opcional',
    matchLabel: 'Correspondência:',
    matchModeLabel: 'Modo de correspondência',
    matchAny: 'QUALQUER',
    matchAll: 'TODOS',
    clearAll: 'Limpar tudo',
    selectAll: 'Selecionar tudo',
    nudge:
      'Marque as affordances que importam para você para refinar os resultados',
    filtersLabel: 'Filtros de affordances',
  },

  matrix: {
    protocolCount: (n: number) =>
      `${n} protocolo${n !== 1 ? 's' : ''} corresponde${n !== 1 ? 'm' : ''}`,
    clearAll: 'Limpar tudo',
    activeFilters: (n: number) => `${n} ativo${n !== 1 ? 's' : ''}`,
    searchPlaceholder: 'Pesquisar protocolos\u2026',
    filtersLabel: 'Filtros',
    columns: {
      name: 'Nome',
      entityType: 'Tipo de Entidade',
      architecture: 'Arquitetura',
      governance: 'Governança',
      captureRisk: 'Risco de Captura',
      devStatus: 'Status de Dev',
      lastInvestigated: 'Última Investigação',
    },
    emptyState:
      'Nenhum protocolo verificado ainda para esta combinação \u2014 isso não significa que não existam. Indica uma área não mapeada do cenário.',
    sortAsc: 'Ordenar crescente',
    sortDesc: 'Ordenar decrescente',
    expandRow: 'Expandir detalhes',
    collapseRow: 'Recolher detalhes',
    closeDetails: 'Fechar detalhes',
    viewFullPage: 'Ver página completa do protocolo',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Affordances',
    visitCommunity: 'Visitar Comunidade',
    license: 'Licença',
    devStatus: 'Status de Desenvolvimento',
    owner: 'Proprietário',
    country: 'País',
    startYear: 'Ano de Início',
    stack: 'Stack',
    funding: 'Financiamento',
    lastInvestigated: 'Última Investigação',
    description: 'Descrição',
    noDescription: 'Nenhuma descrição disponível',
    selectForComparison: 'Selecionar para comparação',
    compareNSelected: 'Comparar',
    nOfMaxSelected: 'selecionados',
    clearSelection: 'Limpar seleção',
    maxSelection: 'Máximo de 5 protocolos para comparação',
    filterArchitecture: 'Arquitetura',
    filterGovernance: 'Governança',
    filterCaptureRisk: 'Risco de Captura',
    filterEntityType: 'Tipo de Entidade',
    filterDevStatus: 'Status de Dev',
    collapseAriaLabel: (name: string, expanded: boolean) =>
      expanded ? `Recolher detalhes de ${name}` : `Expandir detalhes de ${name}`,
    selectAriaLabel: (name: string) =>
      `Selecionar ${name} para comparação`,
    detailsAriaLabel: (name: string) => `Detalhes de ${name}`,
  },

  comparison: {
    compareSelected: 'Comparar selecionados',
    selected: 'selecionados',
    clearSelection: 'Limpar seleção',
    clearComparison: 'Limpar comparação',
    removeFromComparison: 'Remover da comparação',
    protocolComparison: 'Comparação de Protocolos',
    architectureType: 'Arquitetura',
    governanceModel: 'Governança',
    captureRisk: 'Risco de Captura',
    license: 'Licença',
    devStatus: 'Status de Desenvolvimento',
    owner: 'Proprietário',
    startYear: 'Ano de Início',
    stack: 'Stack',
    funding: 'Financiamento',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Affordances',
    communityLink: 'Comunidade',
    lastInvestigated: 'Última Investigação',
    sharedAffordance: 'Compartilhado entre os protocolos selecionados',
    noValue: '\u2014',
    maxSelection: 'Máximo de 5 protocolos para comparação',
    ariaLabel: 'Comparação de protocolos',
    comparisonDataAriaLabel: (name: string) =>
      `Dados de comparação de ${name}`,
    removeAriaLabel: (name: string) =>
      `Remover ${name} da comparação`,
    visitLink: 'Visitar',
  },

  results: {
    countHeader: (count: number) =>
      count === 1
        ? '1 protocolo corresponde'
        : `${count} protocolos correspondem`,
    emptyHeading: 'Nenhum protocolo verificado ainda para esta combinação',
    emptyBody:
      'Isso não significa que não existam \u2014 apenas que ainda não os mapeamos.',
    emptyContribute: 'Conhece um que devemos adicionar?',
    contributeLinkText: 'Contribuir',
  },

  card: {
    viewDetails: 'Ver Detalhes',
  },

  cta: {
    heading: 'Não sabe por onde começar?',
    subtitle: 'Deixe-nos guiá-lo até os protocolos certos',
    button: 'Me guie',
  },

  wizard: {
    question: 'O que você está tentando fazer?',
    close: 'Fechar',
    tooltipPrefix: 'Isso corresponde a:',
    tooltipSuffix: 'na grade de domínios abaixo',
    answers: {
      communicate: 'Conversar livremente com pessoas e grupos',
      identity: 'Saber com quem estou lidando e controlar meus dados',
      organize: 'Organizar um grupo ou tomar decisões juntos',
      help: 'Ajudar e apoiar pessoas na minha comunidade',
      create: 'Criar, aprender ou compartilhar conhecimento juntos',
      coordinate: 'Coordenar eventos ou projetos locais',
    },
  },

  home: {
    title: 'OpenHaven — Construindo Pontes no Ecossistema P2P',
    description:
      'OpenHaven documenta o cenário de protocolos abertos e defende a interoperabilidade. Descubra, compare e escolha protocolos abertos para a web descentralizada.',
    heroTitle: 'OpenHaven',
    heroTagline: 'Construindo Pontes no Ecossistema P2P',
    buildingTogetherHeading: 'Construindo Juntos',
    buildingTogetherBody:
      'A transição para sistemas descentralizados requer colaboração entre laboratórios de pesquisa, equipes de protocolos e desenvolvedores de aplicações. O OpenHaven documenta o cenário atual, torna-o mais navegável e defende a interoperabilidade. Nossos princípios:',
    principles: [
      'Protocolos modulares em vez de plataformas monolíticas',
      'Aplicações local-first com conectividade global',
      'Dados e identidade controlados pelo usuário',
      'Padrões composáveis que permitem inovação',
      'Soluções pragmáticas para adoção no mundo real',
    ],
    navigableHeading: 'Tornando Navegável',
    navigableBody1:
      'Dezenas de protocolos abertos existem na web descentralizada — cada um resolvendo problemas sobrepostos, em grande parte isolados. Encontrar a ferramenta certa para uma necessidade real de coordenação não deveria exigir conhecimento técnico profundo.',
    navigableBody2:
      'Nosso protótipo de navegador de tecnologia permite que você comece pelo que precisa, entenda as capacidades necessárias e descubra os protocolos que as fornecem — modelo de governança e risco de captura incluídos.',
    explorePrototype: 'Explorar o Protótipo',
    readBrief: 'Ler o Resumo para Stakeholders',
    newBadge: 'Novo',
  },

  hero: {
    title: 'Navegue pelo Cenário de Protocolos',
    highlight: 'Abertos',
    subtitle:
      'Descubra protocolos verificados organizados por necessidades do mundo real — não jargão técnico. Feito para construtores, coalizões e comunidades moldando a web descentralizada.',
    badge: 'Status: Protótipo. Leia o <a href="/pt-BR/brief" style="color:inherit;text-decoration:underline;">Resumo para Stakeholders</a>.',
    getStarted: 'Começar',
    browseMatrix: 'Navegar na Matriz Completa',
  },

  principles: {
    heading: 'Como o OpenHaven Funciona',
    subheading: 'Protocolos abertos, organizados pelo que importa para você.',
    stepLabels: [
      'Escolha um Caso de Uso',
      'Refine por Affordance',
      'Revise os Protocolos',
      'Conecte e Construa',
    ],
    items: [
      {
        title: 'Comece pela Necessidade',
        description:
          'Entre por casos de uso do mundo real como Comunicação, Identidade ou Ajuda Mútua — não jargão técnico.',
      },
      {
        title: 'Entenda o que Importa',
        description:
          'Veja affordances em linguagem simples que explicam capacidades técnicas em termos do que elas permitem para você.',
      },
      {
        title: 'Encontre Sua Stack',
        description:
          'Chegue a protocolos verificados com contexto de governança, risco e comunidade para que você possa escolher com confiança.',
      },
      {
        title: 'Conecte e Construa',
        description:
          'Conecte-se com a comunidade do protocolo e comece a construir, manualmente ou com prompts de IA predefinidos.',
      },
    ],
  },

  disclaimer: {
    alphaDemo:
      'Status: Protótipo. <strong>Os dados são apenas para fins de demonstração.</strong> Leia o <a href="/pt-BR/brief" style="color:inherit;text-decoration:underline;">Resumo para Stakeholders</a>.',
    alphaIncomplete:
      'Status: Protótipo. <strong>Os dados são apenas para fins de demonstração.</strong> Leia o <a href="/pt-BR/brief" style="color:inherit;text-decoration:underline;">Resumo para Stakeholders</a>.',
  },

  matrixPage: {
    title: 'Matriz de Protocolos — OpenHaven',
    description:
      'Navegue e filtre a matriz completa de convergência de protocolos abertos. Ordene por governança, arquitetura, risco de captura e mais para revelar sobreposições de capacidades no cenário.',
    jsonLdName: 'Matriz de Protocolos — Cenário de Protocolos Abertos',
    jsonLdDescription:
      'Navegue e filtre a matriz completa de convergência de protocolos abertos por governança, arquitetura, risco de captura e mais.',
    jsonLdListName: 'Protocolos abertos na matriz de convergência',
    pageTitle: 'Matriz de Protocolos',
    pageSubtitle:
      'Navegue pela matriz completa de convergência. Filtre por governança, arquitetura, risco de captura e mais para revelar sobreposições de capacidades no cenário.',
  },

  navigatorPage: {
    title: 'Navegador de Protocolos Abertos — OpenHaven',
    description:
      'Navegue e compare protocolos abertos para a web descentralizada.',
    heading: 'Navegador de Protocolos Abertos',
    tagline: 'Descubra, compare e escolha protocolos abertos',
  },

  domain: {
    useCaseDomain: 'Domínio de Caso de Uso',
    affordances: 'Affordances',
    affordancesSubtitle:
      'Capacidades que os protocolos deste domínio podem fornecer',
    overview: 'Visão Geral',
    primaryDomain: 'Domínio Principal',
    protocolsMapped: 'Protocolos Mapeados',
    yes: 'Sim',
    no: 'Não',
    protocolsIn: (name: string) => `Protocolos em ${name}`,
    noProtocols: 'Nenhum protocolo mapeado ainda para este domínio.',
    exploreInNavigator: 'Explorar no Navegador',
    protocolCount: (n: number) =>
      `${n} protocolo${n !== 1 ? 's' : ''}`,
    affordanceCount: (n: number) =>
      `${n} affordance${n !== 1 ? 's' : ''}`,
    keyAffordances: 'Affordances principais:',
    openProtocols: 'protocolos abertos',
  },

  protocol: {
    details: 'Detalhes',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Affordances',
    links: 'Links',
    visitWebsite: 'Visitar Website',
    visitCommunity: 'Visitar Comunidade',
    attributes: 'Atributos',
    license: 'Licença',
    devStatus: 'Status de Dev',
    owner: 'Proprietário',
    country: 'País',
    startYear: 'Ano de Início',
    stack: 'Stack',
    funding: 'Financiamento',
    lastInvestigated: 'Última Investigação',
  },

  exportSection: {
    heading: 'Exporte Sua Stack para Desenvolvimento Assistido por IA',
    subheading:
      'Selecione seus protocolos e gere contexto para Cursor, Windsurf, Claude ou sua ferramenta de vibe coding preferida.',
    badge: 'Pronto para Vibe Coding',
    selectProtocols: 'Selecionar Protocolos',
    generatePrompt: 'Gerar Prompt',
    comingSoon: 'Versão interativa em breve',
  },

  resources: {
    heading: 'Aprofunde-se',
    subheading:
      'Recursos, comunidades e formas de contribuir com o projeto.',
  },

  contributors: {
    heading: 'Quem Está Por Trás Disso',
    subheading:
      'Conheça os construtores e pesquisadores que contribuíram com estas avaliações.',
  },

  footer: {
    copyright: '\u00A9 2026 OpenHaven',
  },

  brief: {
    title: 'Resumo para Stakeholders — OpenHaven',
    description:
      'OpenHaven é um navegador de convergência liderado pela comunidade e orientado por dados para o cenário de protocolos peer-to-peer e descentralizados.',
    heading: 'OpenHaven: Resumo para Stakeholders',
    executiveSummary: 'Resumo Executivo',
    executiveSummaryP1:
      'OpenHaven é um navegador de convergência liderado pela comunidade e orientado por dados para o cenário de protocolos peer-to-peer (P2P) e descentralizados que o torna visível, navegável e diretamente acionável — incluindo para fluxos de trabalho de desenvolvimento assistido por IA. Ele substitui o atual site de página única openhaven.net por um site dinâmico e orientado por dados que serve tanto como guia navegável de protocolos abertos quanto como voz coletiva das pessoas que os constroem e utilizam.',
    executiveSummaryP2:
      'Nascido da Collaborative Technology Alliance (CTA) e de uma coalizão crescente de pesquisadores, construtores e líderes comunitários, o OpenHaven traduz pesquisas complexas sobre protocolos em algo legível, acionável e compartilhável. <strong>A missão do OpenHaven é tornar o cenário de protocolos abertos interoperável e interativo — navegável pelas pessoas que precisam dele — informado pelo entendimento de que a convergência técnica depende da convergência social.</strong> Não apenas mapeando a tecnologia, mas construindo a tenda — dando ao movimento uma voz coletiva, um lar compartilhado e ferramentas — incluindo contexto legível por máquina e geração de prompts para fluxos de trabalho assistidos por IA — que reduzem a barreira para compreensão e adoção.',
    executiveSummaryP3:
      'O OpenHaven atende três audiências interconectadas: <strong>líderes comunitários</strong> buscando ferramentas para resolver problemas reais de coordenação, <strong>construtores e pesquisadores</strong> buscando convergência e efeitos de rede em esforços fragmentados, e <strong>organizações de coalizão</strong> (ex.: CTA, DWeb) precisando de uma base de evidências compartilhada para tecer seu trabalho de convergência. Para todos os três, o OpenHaven é um hub que eles têm orgulho de compartilhar — porque demonstra progresso tangível em direção à infraestrutura fundamental para os desafios de coordenação da humanidade.',
    coreVision: 'Visão Central',
    problemStatement: 'Declaração do Problema',
    problemStatementBody:
      'O cenário de protocolos P2P e descentralizados é profundamente fragmentado. Dezenas de protocolos, plataformas e aplicações existem em um espectro de totalmente P2P a federado a centralizado — cada um resolvendo problemas sobrepostos, desenvolvidos em grande parte isoladamente.',
    problemList: [
      '<strong>Para líderes comunitários e usuários não técnicos:</strong> O cenário é ilegível. Eles têm necessidades reais — comunicação privada, coordenação de ajuda mútua, jornalismo resistente à censura — mas nenhum guia confiável e orientado por resultados para combinar necessidades com ferramentas.',
      '<strong>Para construtores e pesquisadores:</strong> A dor é a fragmentação. Equipes talentosas constroem tecnologia impressionante em silos, lutando para alcançar efeitos de rede. Todos sentem o arrasto — se esses projetos fossem mais unificados, o impacto coletivo seria exponencialmente maior.',
      '<strong>Para organizações de coalizão como CTA:</strong> Não existe mecanismo compartilhado para mapear "qual código cada pessoa está trazendo à mesa" para que os esforços de convergência possam ser tecidos juntos de forma eficaz. O OpenHaven pode servir como esse mecanismo.',
    ],
    problemImpact: 'Impacto do Problema',
    problemImpactBody:
      'As apostas se estendem bem além da comunidade tecnológica. A convergência de falhas de coordenação ambientais, políticas e sociais exige infraestrutura fundamental — sistemas que permitam à humanidade organizar, comunicar e governar em escala sem dependência de sistemas centralizados vulneráveis a captura, censura ou falha. Comunidades enfrentando pressão autoritária, jornalistas protegendo fontes, vizinhos coordenando resposta a desastres — eles precisam que isso funcione, e precisa ser encontrável, compreensível e capacitador de ação.',
    whyExistingFail: 'Por que as Soluções Existentes Falham',
    whyExistingFailIntro:
      'Vários esforços de mapeamento existem — o mapa DWeb Kumu de Christina Bowen, a Wise Tech Capabilities Matrix de Josh Field, a planilha de convergência de Brandon Norgaard — mas cada um aborda apenas uma fatia:',
    whyExistingFailList: [
      '<strong>Mapas existentes são voltados para pesquisadores</strong>, não para líderes comunitários — catalogam tecnologia mas não respondem "o que devo usar?"',
      '<strong>Nada é orientado por resultados</strong> — as ferramentas atuais organizam por categoria tecnológica, não por necessidade humana.',
      '<strong>Não há camada de convergência social</strong> — os recursos existentes são documentos estáticos, não hubs vivos.',
      '<strong>Nada é construído para fluxos assistidos por IA</strong> — nenhum recurso fornece contexto legível por máquina, exploração por chatbot ou recomendações prontas para prompts.',
      '<strong>O movimento carece de uma voz coletiva</strong> — contribuidores de DWeb, NAO, RegenOS e CTA não têm um lar compartilhado.',
    ],
    proposedSolution: 'Solução Proposta',
    proposedSolutionIntro:
      'O OpenHaven (openhaven.net) se torna um navegador de convergência dinâmico e orientado por dados composto por:',
    proposedSolutionList: [
      '<strong>Navegador de Protocolos Abertos</strong> — Uma ferramenta interativa e orientada por dados apoiada por uma matriz de convergência de 69+ entradas de protocolos com 40+ atributos padronizados cada. Os usuários navegam por uma arquitetura Casos de Uso → Affordances → Ferramentas: entram por necessidades humanas, entendem as capacidades necessárias e descobrem os protocolos que as fornecem. Modelo de governança e risco de captura são apresentados junto com as capacidades técnicas para cada entrada.',
      '<strong>Infraestrutura de Dados Verificados</strong> — Uma plataforma de dados relacional de código aberto como fonte da verdade. Cada entrada é verificada por especialistas, atribuída a contribuidores, referenciada por fontes e possui uma data de <code>last_investigated</code>.',
      '<strong>Estado da Convergência</strong> — Conteúdo editorial resumindo o cenário e onde a convergência está emergindo, produzido colaborativamente com CTA, DWeb e outros.',
      '<strong>Contexto Legível por Máquina e Geração de Prompts</strong> — V1 entrega <code>llms-full.txt</code> para ingestão completa por IA e geração de prompts para stacks tecnológicas selecionadas, permitindo que desenvolvedores vão da descoberta de protocolos à construção em uma única sessão. Versões futuras adicionam chatbot consultor de protocolos, geração de código e integração com agentes de IA.',
      '<strong>Integração de Design Pró-social</strong> — Conexão com a aplicação e comunidade de Design Pró-social, unindo infraestrutura de protocolos com design relacional e emocional.',
      '<strong>Mecanismos de Feedback e Contribuição</strong> — Integrados desde o primeiro dia. Feedback por entrada, sugestões para todo o site, caminhos de contribuição para novas submissões de dados e mecanismos de pesquisa para histórias qualitativas.',
    ],
    proposedSolutionFooter:
      'Todos os dados são verificados por humanos antes da publicação. O ciclo de qualidade dos dados distingue capacidade declarada de demonstrada, com atribuição de contribuidores e referências de fontes rastreadas por entrada.',
    keyDifferentiators: 'Diferenciais Chave',
    keyDifferentiatorsList: [
      '<strong>Interoperabilidade de protocolos, informada por interoperabilidade social:</strong> O OpenHaven mapeia o cenário técnico enquanto o fundamenta no entendimento de que convergência social — ressonância comunitária, diálogo, confiança — é precursora da convergência técnica. O software serve à fundação social, não o contrário.',
      '<strong>Navegação Casos de Uso → Affordances → Ferramentas:</strong> Comece por necessidades humanas, revele as capacidades necessárias e então mapeie para protocolos. Resultado primeiro, não tecnologia primeiro.',
      '<strong>Construído para fluxos assistidos por IA:</strong> Contexto completo legível por máquina (<code>llms-full.txt</code>), exportação de prompts para stacks selecionadas e uma arquitetura projetada para evoluir em direção a exploração por chatbot e geração de código. V1 torna o cenário compreensível; versões futuras o tornam diretamente acionável.',
      '<strong>Conector, não plataforma:</strong> O OpenHaven aponta para comunidades e conversas existentes em vez de construir uma camada social concorrente.',
      '<strong>Baseado em evidências, não em defesa:</strong> O Navegador atende todas as posições no debate de convergência fornecendo dados verificados, não empurrando uma agenda.',
      '<strong>Voz coletiva:</strong> Um lar que o movimento tem orgulho de apontar — uma representação tangível do trabalho sendo feito para o bem coletivo.',
    ],
    ecosystemContext: 'Contexto do Ecossistema',
    ecosystemContextBody:
      'O OpenHaven está inserido em uma constelação mais ampla de esforços de convergência — pipelines de financiamento, infraestrutura narrativa, definição de casos de uso, experimentos comunitários e design de ecossistema social aberto. Esses esforços estão cada vez mais se encontrando. O papel do OpenHaven é específico — descoberta e navegação de protocolos — mas seu valor se multiplica à medida que esforços adjacentes amadurecem e as pessoas que os impulsionam usam o Navegador como ponto de referência compartilhado.',
    whoItsFor: 'Para Quem É',
    whoItsForIntro:
      'O OpenHaven atende quatro audiências, cada uma com uma relação distinta com o cenário de protocolos:',
    personas: {
      mira: '<strong>Mira, a Construtora de Convergência</strong> — Uma desenvolvedora de protocolos trabalhando em ferramentas de colaboração local-first, três anos imersa no espaço DWeb. Ela está frustrada porque seu trabalho e projetos adjacentes operam em silos. Ela precisa de uma visão única de quem está construindo o quê para que possa colaborar em vez de duplicar — e quer contribuir com os dados de seu próprio projeto para o mapa coletivo.',
      raul: '<strong>Raul, o Tecelão de Coalizões</strong> — Um coordenador técnico em uma organização adjacente a DWeb/CTA que está na interseção de vários grupos de convergência. Ele precisa de um artefato compartilhável que mapeie capacidades na coalizão — algo que possa puxar em uma chamada de coordenação, usar para construir propostas conjuntas de financiamento e enviar a novos colaboradores como "a base de evidências do que estamos fazendo."',
      jess: '<strong>Jess, a Vibe Coder</strong> — Uma desenvolvedora full-stack construindo ferramentas comunitárias com fluxos de trabalho assistidos por IA. Ela quer construir sobre protocolos abertos, mas o ecossistema é esmagador. Ela precisa entender suas opções, escolher uma stack e obter contexto pronto para prompts que possa colar em sua IDE de IA — sem gastar semanas pesquisando.',
      amara: '<strong>Amara, a Representante Comunitária</strong> — Uma coordenadora de tecnologia em uma ONG internacional de liberdade de imprensa, recomendando ferramentas de comunicação segura para jornalistas em regiões de risco. As apostas são de vida ou morte. Ela precisa navegar por resultado ("comunicação resistente à censura para jornalistas no Irã") e confiar que as recomendações são verificadas, não apenas comercializadas.',
    },
    successHeading: 'Como Saberemos que Está Funcionando',
    successMetrics: [
      '<strong>As pessoas estão encontrando o que precisam</strong> — usuários estão entrando por domínios de casos de uso e chegando a listas de protocolos relevantes e verificados sem conhecimento técnico prévio',
      '<strong>A comunidade está compartilhando</strong> — membros de coalizões, construtores e contribuidores estão ativamente enviando links do OpenHaven para suas redes como a referência canônica',
      '<strong>A convergência está se tornando visível</strong> — a camada de abstração que abrange protocolos é mais legível, e está mais claro quais protocolos estão melhor posicionados para coordenação coletiva',
      '<strong>Feedback está fluindo</strong> — sugestões, atualizações e histórias reais estão chegando pelos mecanismos integrados ("Encontrei X pelo OpenHaven e mudou como coordenamos")',
      '<strong>Conversas de financiamento o referenciam</strong> — pelo menos uma solicitação de subsídio ou conversa com financiador usa o OpenHaven como base de evidências',
      '<strong>A esperança está crescendo</strong> — feedback da comunidade reflete um senso mais forte de coesão e momentum, com menos energia desperdiçada em esforços fragmentados',
    ],
    getInTouch: 'Entre em Contato',
    getInTouchBody:
      'Interessado em contribuir, fazer parcerias ou saber mais? Entre em contato com <strong>Day Waterbury</strong>, <strong>Brandon Nørgaard</strong> e <strong>Zach Miltz</strong>.',
    attribution:
      'Produzido em 27-Fev-2026 por Zach Miltz para o OpenHaven, a comunidade e em apoio à convergência técnica e social que desbloqueará o potencial coletivo da humanidade.',
    explorePrototype: 'Explorar o protótipo →',
  },
} as const satisfies Translations

export default ptBR
