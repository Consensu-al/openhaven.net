import type { Translations } from './en'

const ptBR: Translations = {
  meta: {
    siteName: 'OpenHaven',
    defaultDescription:
      'OpenHaven — Descubra, compare e escolha protocolos abertos para a web descentralizada.',
  },

  nav: {
    home: 'Navegador',
    matrix: 'Matriz',
    protocols: 'Ferramentas Tecnológicas',
    domains: 'Domínios',
    backToOpenHaven: '← Voltar ao OpenHaven',
    backToHome: 'Voltar ao Início',
    selectDomain: 'Selecione um domínio de caso de uso',
    brief: 'Resumo',
    navigatorPrototype: 'Navegador',
    homeBreadcrumb: 'Início',
    matrixPrototype: 'Matriz',
    contribute: 'Contribuir',
    process: 'Nosso Processo',
    beta: 'Status Beta',
    contact: 'Contato',
    research: 'Nossa Pesquisa',
    breadcrumb: 'Trilha de navegação',
    researchOverview: 'Visão geral da Pesquisa',
    about: 'Sobre/Resumo',
    // Títulos das seções do menu Pesquisa + tag "comece aqui" (editorial OpenHaven)
    menuStartHere: 'Comece Aqui',
    menuKeyTools: 'Ferramentas Principais',
    menuReports: 'Relatórios',
    menuDiagrams: 'Diagramas',
    startHereTag: 'Comece aqui',
  },

  badge: {
    governance: {
      foundation: 'Fundação',
      dao: 'DAO',
      'single-company': 'Empresa',
      'open-standard-body': 'Padrão Aberto',
      community: 'Comunidade',
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
    resultsHeading: 'Ferramentas Tecnológicas',
    allProtocolsHint: (name: string) =>
      `Mostrando todas as ferramentas tecnológicas de ${name} — marque capacidades acima para refinar`,
    step1Title: 'Escolha um Caso de Uso',
    step1Subtitle: 'Selecione a categoria que melhor descreve sua necessidade',
    step1Badge: 'Obrigatório',
    step3Title: 'Revise as Ferramentas Tecnológicas Correspondentes',
    showingOnly: 'Mostrando apenas',
    protocolsDot: 'ferramentas tecnológicas.',
    filteredBy: '— filtrado por',
    affordanceCount: (n: number) =>
      `${n} capacidade${n > 1 ? 's' : ''}`,
    resultsTip:
      'Para ver outras ferramentas tecnológicas correspondentes, tente alterar suas seleções nos Passos 1 e 2 acima.',
  },

  affordances: {
    title: 'Refine por Capacidade',
    subtitle:
      'Reduza seus resultados — marque as capacidades que importam para você',
    badge: 'Opcional',
    matchLabel: 'Correspondência:',
    matchModeLabel: 'Modo de correspondência',
    matchAny: 'QUALQUER',
    matchAll: 'TODOS',
    clearAll: 'Limpar tudo',
    selectAll: 'Selecionar tudo',
    nudge:
      'Marque as capacidades que importam para você para refinar os resultados',
    filtersLabel: 'Filtros de capacidades',
  },

  matrix: {
    protocolCount: (n: number) =>
      `${n} ferramenta${n !== 1 ? 's' : ''} tecnol\u00f3gica${n !== 1 ? 's' : ''} corresponde${n !== 1 ? 'm' : ''}`,
    clearAll: 'Limpar tudo',
    activeFilters: (n: number) => `${n} ativo${n !== 1 ? 's' : ''}`,
    searchPlaceholder: 'Pesquisar ferramentas tecnol\u00f3gicas\u2026',
    filtersLabel: 'Filtros',
    columns: {
      name: 'Nome',
      entityType: 'Tipo de Entidade',
      governance: 'Governança',
      captureRisk: 'Risco de Captura',
      devStatus: 'Status de Dev',
      lastInvestigated: 'Última Investigação',
    },
    emptyState:
      'Nenhuma ferramenta tecnológica verificada ainda para esta combinação \u2014 isso não significa que não existam. Indica uma área não mapeada do cenário.',
    sortAsc: 'Ordenar crescente',
    sortDesc: 'Ordenar decrescente',
    expandRow: 'Expandir detalhes',
    collapseRow: 'Recolher detalhes',
    closeDetails: 'Fechar detalhes',
    viewFullPage: 'Ver página completa da ferramenta tecnológica',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Capacidades',
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
    maxSelection: 'Máximo de 5 ferramentas tecnológicas para comparação',
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
    protocolComparison: 'Comparação de Ferramentas Tecnológicas',
    governanceModel: 'Governança',
    captureRisk: 'Risco de Captura',
    license: 'Licença',
    devStatus: 'Status de Desenvolvimento',
    owner: 'Proprietário',
    startYear: 'Ano de Início',
    stack: 'Stack',
    funding: 'Financiamento',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Capacidades',
    communityLink: 'Comunidade',
    lastInvestigated: 'Última Investigação',
    sharedAffordance: 'Compartilhado entre as ferramentas tecnológicas selecionadas',
    noValue: '\u2014',
    maxSelection: 'Máximo de 5 ferramentas tecnológicas para comparação',
    ariaLabel: 'Comparação de ferramentas tecnológicas',
    comparisonDataAriaLabel: (name: string) =>
      `Dados de comparação de ${name}`,
    removeAriaLabel: (name: string) =>
      `Remover ${name} da comparação`,
    visitLink: 'Visitar',
  },

  results: {
    countHeader: (count: number) =>
      count === 1
        ? '1 ferramenta tecnológica corresponde'
        : `${count} ferramentas tecnológicas correspondem`,
    emptyHeading: 'Nenhuma ferramenta tecnológica verificada ainda para esta combinação',
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
    subtitle: 'Deixe-nos guiá-lo até as tecnologias certas',
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
      'Padrões modulares que permitem inovação',
      'Soluções pragmáticas para adoção no mundo real',
    ],
    navigableHeading: 'Tornando Navegável',
    navigableBody1:
      'Dezenas de protocolos abertos existem na web descentralizada — cada um resolvendo problemas sobrepostos, em grande parte isolados. Encontrar a ferramenta certa para uma necessidade real de coordenação não deveria exigir conhecimento técnico profundo.',
    navigableBody2:
      'Nosso protótipo de navegador de tecnologia permite que você comece pelo que precisa, entenda as capacidades necessárias e descubra os protocolos que as fornecem — modelo de governança e risco de captura incluídos.',
    explorePrototype: 'Explorar o Navegador',
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
      'Refine por Capacidade',
      'Revise as Opções',
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
          'Veja capacidades em linguagem simples que explicam o que cada tecnologia permite para você.',
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
    beta:
      'O Navegador e a Matriz do OpenHaven estão em status beta. <strong>Os dados são um rascunho de trabalho.</strong> <a href="/pt-BR/beta" style="color:inherit;text-decoration:underline;">Saiba mais sobre nosso status \u2192</a>',
    alphaDemo:
      'Status: Protótipo. <strong>Os dados são apenas para fins de demonstração.</strong> Por favor, considere <a href="/pt-BR/contribute" style="color:inherit;text-decoration:underline;">contribuir</a>.',
    alphaIncomplete:
      'Status: Protótipo. <strong>Os dados são apenas para fins de demonstração.</strong> Por favor, considere <a href="/pt-BR/contribute" style="color:inherit;text-decoration:underline;">contribuir</a>.',
  },

  contribute: {
    pageTitle: 'Contribuir — OpenHaven',
    pageDescription:
      'Ajude a moldar o cenário de protocolos abertos. Compartilhe seu conhecimento sobre tecnologias P2P, casos de uso e capacidades com a comunidade OpenHaven.',
    heading: 'Contribua com o OpenHaven',
    intro1:
      'O OpenHaven é uma iniciativa coletiva pela convergência de tecnologias P2P — tornando o cenário de protocolos abertos visível, navegável e acionável.',
    intro2:
      'Precisamos de ajuda para mapear Casos de Uso e Capacidades — o que cada tecnologia permite — aos protocolos. Se você trabalha ou pesquisa tecnologias P2P, seu conhecimento é valioso.',
    contactNote:
      'Para consultas gerais, use nosso <a href="/pt-BR/contact">formulário de contato</a>.',
    formLinkText: 'abrir o formulário diretamente →',
    formNote:
      'Se o formulário abaixo não carregar,',
    iframeTitle: 'Formulário de Contribuição do OpenHaven',
    contributeBannerMessage: 'Viu algo faltando ou que poderia ser melhorado?',
    contributeBannerCta: 'Nos diga →',
    contributeBannerDismiss: 'Dispensar',
  },

  contact: {
    pageTitle: 'Contato — OpenHaven',
    pageDescription:
      'Entre em contato com a equipe OpenHaven. Dúvidas, ideias de parceria ou apenas para dizer olá.',
    heading: 'Fale Conosco',
    intro:
      'Tem uma dúvida, ideia de parceria ou só quer dizer olá? Adoraríamos ouvir de você.',
    contributeNote:
      'Quer contribuir com dados ou feedback? Use nosso <a href="/pt-BR/contribute">formulário de contribuição</a>.',
    formLinkText: 'abrir o formulário diretamente →',
    formNote:
      'Se o formulário abaixo não carregar,',
    iframeTitle: 'Formulário de Contato do OpenHaven',
  },

  matrixPage: {
    title: 'Matriz de Protocolos — OpenHaven',
    description:
      'Navegue e filtre a matriz completa de convergência de protocolos abertos. Ordene por governança, risco de captura e mais para revelar sobreposições de capacidades no cenário.',
    jsonLdName: 'Matriz de Protocolos — Cenário de Protocolos Abertos',
    jsonLdDescription:
      'Navegue e filtre a matriz completa de convergência de protocolos abertos por governança, risco de captura e mais.',
    jsonLdListName: 'Protocolos abertos na matriz de convergência',
    pageTitle: 'Matriz de Protocolos',
    pageSubtitle:
      'Navegue pela matriz completa de convergência. Filtre por governança, risco de captura e mais para revelar sobreposições de capacidades no cenário.',
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
    affordances: 'Capacidades',
    affordancesSubtitle:
      'Capacidades que as ferramentas tecnológicas deste domínio podem fornecer',
    overview: 'Visão Geral',
    primaryDomain: 'Domínio Principal',
    protocolsMapped: 'Ferramentas Tecnológicas Mapeadas',
    yes: 'Sim',
    no: 'Não',
    protocolsIn: (name: string) => `Ferramentas Tecnológicas em ${name}`,
    noProtocols: 'Nenhuma ferramenta tecnológica mapeada ainda para este domínio.',
    exploreInNavigator: 'Explorar no Navegador',
    protocolCount: (n: number) =>
      `${n} ferramenta${n !== 1 ? 's' : ''} tecnológica${n !== 1 ? 's' : ''}`,
    affordanceCount: (n: number) =>
      `${n} capacidade${n !== 1 ? 's' : ''}`,
    keyAffordances: 'Capacidades principais:',
    openProtocols: 'ferramentas tecnológicas',
  },

  protocol: {
    details: 'Detalhes',
    useCaseDomains: 'Domínios de Caso de Uso',
    affordances: 'Capacidades',
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
      'Selecione suas tecnologias e gere contexto para Cursor, Windsurf, Claude ou sua ferramenta de vibe coding preferida.',
    badge: 'Pronto para Vibe Coding',
    selectProtocols: 'Selecionar Ferramentas Tecnológicas',
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

  beta: {
    pageTitle: 'Status Beta \u2014 OpenHaven',
    pageDescription:
      'O OpenHaven está em beta. O Navegador e a Matriz estão no ar com verificação em estágio inicial, e os caminhos de contribuição estão sendo abertos.',
    heading: 'Status Beta',
    subtitle: 'Ferramentas funcionais, verificação em estágio inicial, aberto a contribuições.',
    statusHeading: 'Estado atual',
    statusBody:
      'O OpenHaven está em desenvolvimento ativo. O Navegador e a Matriz estão no ar, mas os dados por trás deles ainda estão sendo refinados \u2014 revisados, mas ainda não profundamente verificados.',
    dataHeading: 'Completude dos dados',
    dataBody:
      'Os mapeamentos entre casos de uso, capacidades e protocolos são pesquisa real, mas precisam de mais iteração para completude. Algumas entradas são bem verificadas; outras são estágio inicial. Cada entrada carrega uma data de last_investigated para que você veja o quão atual ela é.',
    contributionHeading: 'Abrindo caminhos de contribuição',
    contributionBody:
      'Estamos no processo de abrir nossos caminhos para contribuição e colaboração. Agora, a melhor forma de participar é pelo nosso formulário de contribuição ou entrando em contato diretamente. Caminhos formais de participação na governança estão sendo desenvolvidos.',
    verificationHeading: 'Modelo de verificação',
    verificationBody:
      'Estamos construindo um modelo de verificação progressiva onde as entradas carregam sinais visíveis e independentes \u2014 não um único selo de \u201Cverificado\u201D. A revisão pelo Líder de Pesquisa é a base hoje. Confirmação pela equipe de desenvolvimento e verificação por terceiros da comunidade estão sendo adicionadas.',
    getInvolved: 'Participe',
    getInvolvedBody:
      'Se você trabalha com tecnologias P2P ou descentralizadas, seu conhecimento pode melhorar diretamente esses dados. Se você tem experiência com avaliação de governança ou verificação de dados, queremos sua contribuição nos nossos padrões.',
    contributeLink: 'Contribuir com dados ou sinalizar um problema \u2192',
    processLink: 'Leia como trabalhamos \u2192',
    contactLink: 'Fale com a equipe \u2192',
    navigatorLink: 'Explorar o Navegador \u2192',
    matrixLink: 'Navegar pela Matriz \u2192',
  },

  process: {
    pageTitle: 'Como o OpenHaven Funciona — OpenHaven',
    pageDescription:
      'Como construímos e mantemos o Navegador e a Matriz \u2014 e como participar.',
    heading: 'Como o OpenHaven Funciona',
    subtitle:
      'Como construímos e mantemos o Navegador e a Matriz \u2014 e como participar.',
    alphaNotice:
      '<strong>O OpenHaven está em desenvolvimento ativo.</strong> Os dados no Navegador são reais, mas ainda não estão completos. Estamos construindo abertamente. <a href="/pt-BR/contribute" style="color:inherit;text-decoration:underline;">Considere contribuir \u2192</a>',

    intakeHeading: 'Como protocolos e ferramentas entram no Navegador',
    intakeIntro:
      'A matriz de convergência do OpenHaven \u2014 o conjunto de dados estruturado por trás do Navegador \u2014 é construída através de pesquisa dedicada e contribuição da comunidade.',
    intakeResearch:
      'Nossa equipe de pesquisa investiga o cenário de protocolos peer-to-peer e descentralizados usando documentação publicada, código-fonte, registros de governança e engajamento direto com comunidades de protocolos. Novas entradas são propostas pela equipe de pesquisa ou por membros da comunidade e parceiros.',
    intakeCommunity:
      'Qualquer pessoa pode propor um novo protocolo, ferramenta ou projeto para inclusão. Nosso caminho de contribuição captura o que a equipe de pesquisa precisa: nome do protocolo, modelo de governança, capacidades principais, status de desenvolvimento e referências de fontes.',
    intakeCollect:
      'Cada entrada inclui mais de 40 atributos padronizados cobrindo capacidades técnicas, estrutura de governança, risco de captura, status de desenvolvimento, auto-hospedagem, licenciamento de código e links da comunidade. Cada alegação de capacidade é apoiada por pelo menos uma referência de fonte independente.',

    reviewHeading: 'Nossos padrões de revisão \u2014 e como estão evoluindo',
    reviewToday: 'Nossa equipe de pesquisa redige cada entrada, e nosso Líder de Pesquisa a revisa contra fontes publicadas antes da publicação. Cada entrada é verificada por:',
    reviewChecks: [
      'Status de desenvolvimento está atual (ativo, mantido, arquivado ou descontinuado)',
      'Modelo de governança está documentado e referenciado (fundação, DAO, empresa única, organismo de padrão aberto, etc.)',
      'Avaliação de risco de captura é fundamentada em estrutura de governança observável',
      'Alegações de capacidade são apoiadas por pelo menos uma fonte independente \u2014 documentação, evidência de repositório ou confirmação de terceiros. Auto-atestação da equipe de desenvolvimento não é suficiente.',
      'Links da comunidade (repos, fóruns, grupos de chat) estão ativos e atuais',
    ],
    reviewFreshness:
      'Cada entrada carrega uma data de last_investigated \u2014 quando a equipe de pesquisa a revisou pela última vez. Dados desatualizados são visíveis, não escondidos.',
    reviewHeadedIntro:
      'Não carimbamos entradas como \u201Cverificado\u201D ou \u201Cnão verificado.\u201D Em vez disso, cada entrada mostra uma combinação de sinais independentes \u2014 revisão de pesquisa, confirmação da equipe de desenvolvimento e verificação comunitária \u2014 para que você possa ver exatamente quanta análise ela recebeu.',
    reviewSignals: [
      {
        title: 'Revisado pelo Líder de Pesquisa',
        description: 'Revisão interna contra fontes publicadas. Esta é a base hoje.',
      },
      {
        title: 'Confirmado pela equipe de desenvolvimento',
        description: 'A própria equipe de desenvolvimento da tecnologia revisou e confirmou a precisão da entrada. Um sinal útil, mas não suficiente por si só \u2014 uma contribuição, não um selo de aprovação.',
      },
      {
        title: 'Verificado por terceiros (N)',
        description: 'Membros independentes da comunidade revisaram e confirmaram a entrada, com contagem visível. Uma entrada verificada por 24 pessoas tem mais peso do que uma verificada por 2.',
      },
    ],
    reviewSignalsNote:
      'Esses sinais são aditivos, não sequenciais. Uma entrada pode ser revisada pelo Líder de Pesquisa e confirmada por 12 verificadores independentes, mas ainda não confirmada pela equipe de desenvolvimento. Outra pode ter confirmação da equipe de desenvolvimento, mas nenhuma revisão de terceiros ainda. Cada entrada mostra exatamente onde está.',
    reviewSharedPractice:
      'Esse modelo significa que a verificação não depende de uma única pessoa. Torna-se uma prática compartilhada \u2014 enraizada na comunidade que esses dados servem.',
    reviewTriggers:
      'Entradas são revisitadas quando:',
    reviewTriggerList: [
      'Um membro da comunidade sinaliza um problema ou sugere uma atualização',
      'Uma equipe de protocolo lança uma atualização significativa ou mudança de governança',
      'Parceiros trazem novas informações através de canais de coordenação',
    ],
    reviewCaptureRisk:
      'Exibimos modelo de governança e risco de captura em cada entrada porque acreditamos que isso importa \u2014 a estrutura de governança de uma tecnologia determina se ela permanece aberta ou é capturada. Mas queremos ser diretos: como melhor avaliar o risco de captura para cada tecnologia é algo que ainda estamos desenvolvendo, e estamos buscando orientação da comunidade sobre como fazer isso bem.',

    contributeHeading: 'Formas de contribuir e conectar',
    contributeIntro:
      'O Navegador é mais forte porque as pessoas que conhecem o cenário ajudam a construí-lo e mantê-lo. Se você depende desses dados, pode ajudar a melhorá-los.',
    contributeFlag: 'Sinalize um erro ou sugira uma atualização.',
    contributeFlagBody: 'Sinalizações da comunidade são um gatilho primário de atualização. Sua contribuição melhora diretamente os dados para todos.',
    contributePropose: 'Proponha uma nova entrada.',
    contributeProposeBody: 'Conhece um protocolo, ferramenta ou projeto que deveria estar aqui? Nosso caminho de contribuição captura o que a equipe de pesquisa precisa para verificar e publicar.',
    contributeVerification: 'Ajude a moldar os padrões de verificação e risco de captura.',
    contributeVerificationBody: 'Nossos padrões de verificação e frameworks de avaliação de risco de captura ainda estão evoluindo. Se você tem experiência com verificação de dados, avaliação de protocolos ou avaliação de governança em contextos de código aberto ou descentralizados, queremos sua contribuição.',
    contributePartnership: 'Parcerias com equipes de protocolos e coalizões.',
    contributePartnershipBody: 'Se você representa uma equipe de protocolo, organização de coalizão ou grupo de pesquisa no espaço P2P e descentralizado \u2014 vamos conversar. Seja para garantir que os dados do seu projeto estejam precisos, coordenar pesquisas compartilhadas ou explorar colaborações mais profundas.',
    contributeGovernance: 'Participe da governança.',
    contributeGovernanceBody: 'A governança do OpenHaven evolui conforme a comunidade cresce. Operamos como uma pequena equipe fundadora com um modelo de decisão baseado em consentimento e estamos construindo caminhos para participação mais ampla. Se você está interessado em contribuir para como o OpenHaven é governado \u2014 não apenas seus dados \u2014 entre em contato.',
    contributeAttribution: 'Atribuição.',
    contributeAttributionBody: 'Toda contribuição é creditada. Contribuições de dados, input editorial e sinalizações da comunidade são rastreados com atribuição de contribuidor. Quando sua submissão é verificada e publicada, seu nome (ou pseudônimo, por preferência) aparece no trabalho \u2014 incluindo nos cards de protocolo no Navegador.',
    contributeSpread: 'Divulgue.',
    contributeSpreadBody: 'Se o OpenHaven é útil para você, compartilhe. Quanto mais olhos nos dados, mais precisos e completos eles se tornam.',

    teamHeading: 'Equipe',
    teamMembers: [
      { name: 'Day Waterbury', role: 'Visionário de Protocolo Aberto e Gerenciamento de Projeto' },
      { name: 'Brandon N\u00F8rgaard', role: 'Desenvolvimento Backend e Pesquisa Técnica' },
      { name: 'Zach Miltz', role: 'Gerenciamento de Produto e Desenvolvimento Full Stack' },
      { name: 'Marty Behrens', role: 'Pesquisa de Usuário e Alcance Comunitário' },
      { name: 'Kevin Triplett', role: 'Consultor de Tecnologia Descentralizada' },
    ],
    teamFooter:
      'O OpenHaven nasceu da Collaborative Technology Alliance. Nosso framework de governança \u2014 como decisões são tomadas e como este processo evolui \u2014 está sendo desenvolvido de forma transparente.',

    proposeEntry: 'Propor uma nova entrada \u2192',
    suggestUpdate: 'Sugerir uma atualização \u2192',
    getInTouch: 'Entre em contato \u2192',
    learnMore: 'entre em contato \u2192',
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
      '<strong>Navegador de Protocolos Abertos</strong> — Uma ferramenta interativa e orientada por dados apoiada por uma matriz de convergência de 69+ entradas de protocolos com 40+ atributos padronizados cada. Os usuários navegam por uma arquitetura Casos de Uso → Capacidades → Ferramentas: entram por necessidades humanas, entendem as capacidades necessárias e descobrem os protocolos que as fornecem. Modelo de governança e risco de captura são apresentados junto com as capacidades técnicas para cada entrada.',
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
      '<strong>Navegação Casos de Uso → Capacidades → Ferramentas:</strong> Comece por necessidades humanas, revele as capacidades necessárias e então mapeie para protocolos. Resultado primeiro, não tecnologia primeiro.',
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

  research: {
    landingTitle: 'Visão geral da Pesquisa',
    landingBreadcrumb: 'Visão geral da Pesquisa',
    // Body + framing stay English per FR34 — chrome translates, content does not.
    intro:
      "Research and reference materials that ground OpenHaven's work — writeups on the data infrastructure behind ecosystem mapping and on commons-based finance, alongside the sovereign-stack diagrams and a monetary-architecture report.",
    // Key Tools highlight — section chrome translates; card summaries stay English (FR34, like intro)
    keyPiecesHeading: 'As duas ferramentas principais',
    keyPiecesIntro:
      'Tudo aqui apoia as duas ferramentas principais do OpenHaven — comece por elas.',
    navigatorSummary:
      "Guided discovery — answer a few questions about what you're building and surface the protocols and tools that fit.",
    matrixSummary:
      'The full comparison table — every protocol and tool, side by side across attributes.',
    embeddedHeading: 'Relatórios',
    diagramsHeading: 'Diagramas',
    diagramsNote:
      'Estes diagramas abrem em suas implantações originais; a importação para o site está planejada para uma etapa posterior.',
    externalNewTab: 'Abre em uma nova aba',
    readReport: 'Ler o relatório',
    viewDiagram: 'Ver diagrama',
    attributionBy: 'Por',
    publishedBy: 'Publicado em nome de',
    licenseLabel: 'Licenciado sob',
    importedOnLabel: 'Importação única em',
    noAutoUpdate: 'Esta página não é atualizada automaticamente se a fonte mudar.',
    localeNotice: 'Este conteúdo é publicado em inglês.',
    attributionRegionLabel: 'Atribuição e manutenção',
    // Diagram titles are proper nouns — kept in English.
    stackTitle: 'Sovereign Stack Model',
    stackEntityTitle: 'Stack Model — Entity Placement',
    stackSampleTitle: 'Entities Mapped to Stack Layers',
    monetaryTitle: 'Monetary Architecture',
    // Diagram summaries stay English per FR34 (editorial body content, like intro)
    stackSummary:
      'An interactive map of the sovereign-technology stack — the layers, from infrastructure to application, a self-sovereign digital ecosystem is built on.',
    stackEntitySummary:
      "The same stack model with real protocols and projects placed onto each layer — showing where today's tools actually sit.",
    monetarySummary:
      'A visual breakdown of the monetary and value-flow architecture underpinning commons-oriented and regenerative economic systems.',
    rawDocsHeading: 'Documentos adicionais',
    rawDocsNote: 'Páginas de referência independentes, exibidas em sua formatação original, fora do design principal do site.',
    openDocument: 'Abrir documento',
  },
} as const satisfies Translations

export default ptBR
