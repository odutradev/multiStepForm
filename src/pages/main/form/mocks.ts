export const MOCK_SUBMIT_DELAY_MS = 2000;
export const MOCK_DELAY_MS = 1500;

export const usersMock = [
  { registration: 'P-1234567', name: 'João da Silva' },
  { registration: 'M-7654321', name: 'Maria Souza' },
  { registration: 'F-9988776', name: 'Ana Costa' },
  { registration: 'P-1122334', name: 'Carlos Eduardo' },
  { registration: 'M-5544332', name: 'Beatriz Lima' },
  { registration: 'F-6677889', name: 'Fernando Alves' },
  { registration: 'P-9900112', name: 'Gabriela Rocha' },
  { registration: 'M-3344556', name: 'Henrique Santos' },
  { registration: 'F-2211009', name: 'Isabela Ferreira' },
  { registration: 'P-8877665', name: 'Juliano Martins' },
  { registration: 'M-1100223', name: 'Karina Mendes' },
  { registration: 'F-4455667', name: 'Leonardo Gomes' },
  { registration: 'P-9988001', name: 'Mariana Azevedo' },
  { registration: 'M-7766554', name: 'Nicolas Pereira' },
  { registration: 'F-2233445', name: 'Olivia Ribeiro' },
  { registration: 'P-5566778', name: 'Paulo Carvalho' },
  { registration: 'M-1122003', name: 'Quintino Silva' },
  { registration: 'F-9900887', name: 'Rafaela Castro' },
  { registration: 'P-3344221', name: 'Samuel Nunes' },
  { registration: 'M-6677112', name: 'Tatiana Borges' },
  { registration: 'F-8899001', name: 'Ulisses Monteiro' },
  { registration: 'P-2211334', name: 'Vanessa Dias' },
  { registration: 'M-5544778', name: 'Wagner Correia' },
  { registration: 'F-1100998', name: 'Xuxa Meneghel' },
  { registration: 'P-7766223', name: 'Yuri Nogueira' },
  { registration: 'M-4455110', name: 'Zélia Duncan' },
  { registration: 'S-0123456', name: 'Silvana Almeida' },
  { registration: 'S-0987654', name: 'Sérgio Ramos' },
  { registration: 'S-9876543', name: 'João Guimarães Rosa' },
  { registration: 'P-5555555', name: 'Clarice Lispector' },
  { registration: 'M-4444444', name: 'Machado de Assis' },
  { registration: 'F-3333333', name: 'Jorge Amado' },
  { registration: 'P-2222222', name: 'Cecília Meireles' },
  { registration: 'M-1111111', name: 'Graciliano Ramos' },
  { registration: 'F-7777777', name: 'Monteiro Lobato' },
  { registration: 'P-8888888', name: 'Carlos Drummond' },
  { registration: 'M-9999999', name: 'Vinicius de Moraes' },
  { registration: 'F-1010101', name: 'Mario de Andrade' },
  { registration: 'P-2020202', name: 'Oswald de Andrade' },
  { registration: 'M-3030303', name: 'Guimarães Rosa' }
];

export const courtsMock = [
  { code: '100240412', name: '1ª Vara de Feitos Tributários do Estado da comarca de Belo Horizonte' },
  { code: '100240413', name: '2ª Vara Cível da Comarca de São Paulo' },
  { code: '100240414', name: '3ª Vara Criminal da Comarca de Rio de Janeiro' },
  { code: '100240415', name: 'Vara Única da Comarca de Interiorzinho' },
  { code: '100240416', name: 'Juizado Especial Cível da Comarca de Curitiba' },
  { code: '100240417', name: '4ª Vara de Família e Sucessões de Porto Alegre' },
  { code: '100240418', name: '1ª Vara do Trabalho de Manaus' },
  { code: '100240419', name: 'Juizado Especial Federal de Brasília' },
  { code: '100240420', name: '5ª Vara Cível da Comarca de Fortaleza' },
  { code: '100240421', name: '2ª Vara da Fazenda Pública de Salvador' },
  { code: '100240422', name: '1ª Vara Criminal da Comarca de Recife' },
  { code: '100240423', name: '3ª Vara do Trabalho de Goiânia' },
  { code: '100240424', name: 'Juizado Especial da Mulher de Belém' },
  { code: '100240425', name: '2ª Vara de Execuções Penais de São Luís' },
  { code: '100240426', name: '1ª Vara de Entorpecentes de Maceió' },
  { code: '100240427', name: 'Vara de Meio Ambiente de Cuiabá' },
  { code: '100240428', name: '4ª Vara Cível da Comarca de Natal' },
  { code: '100240429', name: 'Juizado Especial de Pequenas Causas de Teresina' },
  { code: '100240430', name: '1ª Vara da Infância e Juventude de João Pessoa' },
  { code: '100240431', name: '3ª Vara de Família de Aracaju' }
];

export const subjectsTreeMock = [
  {
    code: '14',
    description: 'DIREITO TRIBUTÁRIO',
    children: [
      {
        code: '5913',
        description: 'Limitações ao Poder de Tributar',
        children: [
          {
            code: '5914',
            description: 'Imunidade',
            children: [
              { code: '10527', description: 'Livros / Jornais / Periódicos' },
              { code: '10528', description: 'Entidades Sem Fins Lucrativos' },
              { code: '10529', description: 'Partidos Políticos' },
              { code: '10530', description: 'Imunidade Recíproca' }
            ]
          },
          { code: '5915', description: 'Isenção' },
          { code: '10540', description: 'Competência Tributária' }
        ]
      },
      {
        code: '5916',
        description: 'Impostos',
        children: [
          { code: '5917', description: 'IRPF/Imposto de Renda de Pessoa Física' },
          { code: '5918', description: 'IRPJ/Imposto de Renda de Pessoa Jurídica' },
          { code: '5919', description: 'IPTU/ Imposto Predial e Territorial Urbano' },
          { code: '5920', description: 'IPVA - Imposto Sobre Propriedade de Veículos Automotores' },
          { code: '5921', description: 'ICMS/ Imposto sobre Circulação de Mercadorias' }
        ]
      },
      { code: '5956', description: 'Taxas' },
      { code: '5973', description: 'Empréstimos Compulsórios' },
      { code: '5980', description: 'Contribuições' },
      { code: '6000', description: 'Dívida Ativa' }
    ]
  },
  {
    code: '15',
    description: 'DIREITO PENAL',
    children: [
      {
        code: '3369',
        description: 'Crimes contra a Pessoa',
        children: [
          {
            code: '3370',
            description: 'Crimes contra a vida',
            children: [
              { code: '3371', description: 'Homicídio Simples' },
              { code: '3372', description: 'Homicídio Qualificado' },
              { code: '3373', description: 'Infanticídio' },
              { code: '3374', description: 'Aborto provocado pela gestante' }
            ]
          },
          { code: '3380', description: 'Lesão Corporal' },
          { code: '3390', description: 'Periclitação da Vida e da Saúde' }
        ]
      },
      {
        code: '3400',
        description: 'Crimes contra o Patrimônio',
        children: [
          { code: '3401', description: 'Furto' },
          { code: '3402', description: 'Roubo' },
          { code: '3403', description: 'Extorsão' },
          { code: '3404', description: 'Estelionato' }
        ]
      },
      { code: '3500', description: 'Crimes contra a Administração Pública' }
    ]
  },
  {
    code: '16',
    description: 'DIREITO CIVIL',
    children: [
      {
        code: '899',
        description: 'Fatos Jurídicos',
        children: [
          { code: '900', description: 'Negócio Jurídico' },
          { code: '901', description: 'Ato Lícito' },
          { code: '902', description: 'Ato Ilícito' }
        ]
      },
      {
        code: '903',
        description: 'Obrigações',
        children: [
          { code: '904', description: 'Espécies de Obrigações' },
          { code: '905', description: 'Adimplemento e Extinção' },
          { code: '906', description: 'Inadimplemento' }
        ]
      },
      {
        code: '907',
        description: 'Responsabilidade Civil',
        children: [
          { code: '908', description: 'Indenização por Dano Material' },
          { code: '909', description: 'Indenização por Dano Moral' }
        ]
      }
    ]
  },
  {
    code: '17',
    description: 'DIREITO DO TRABALHO',
    children: [
      {
        code: '1000',
        description: 'Contrato Individual de Trabalho',
        children: [
          { code: '1001', description: 'Reconhecimento de Relação de Emprego' },
          { code: '1002', description: 'Alteração Contratual' },
          { code: '1003', description: 'Rescisão do Contrato de Trabalho' }
        ]
      },
      {
        code: '1010',
        description: 'Remuneração, Magisterio e Vantagens',
        children: [
          { code: '1011', description: 'Salário' },
          { code: '1012', description: 'Adicional de Insalubridade' },
          { code: '1013', description: 'Adicional de Periculosidade' },
          { code: '1014', description: 'Horas Extras' }
        ]
      }
    ]
  }
];

export const stepOneAutoFillMock = {
  numeroUnicoProcessoJudicialCnj: '12345678912345678912',
  nomeVara: '1ª Vara de Feitos Tributários do Estado da comarca de Belo Horizonte',
  matriculaGerenteSecretaria: 'S-1234567',
  nomeGerenteSecretaria: 'João Guimarães Rosa',
  codigoVara: '100240413'
};

export const beneficiariesMock = [
  {
    id: '1',
    nome: 'João da Silva',
    tipoDocumento: 'CPF',
    documento: '111.222.333-44',
    dataNascimento: '15/05/1980',
    idade: 45
  },
  {
    id: '2',
    nome: 'Empresa Tecnologia LTDA',
    tipoDocumento: 'CNPJ',
    documento: '12.345.678/0001-99'
  },
  {
    id: '3',
    nome: 'Maria Souza',
    tipoDocumento: 'CPF',
    documento: '555.666.777-88',
    dataNascimento: '20/10/1995',
    idade: 30
  }
];

export const procuradoresMock = [
  {
    id: '1',
    nome: 'Dr. Roberto Alves',
    tipoDocumento: 'CPF',
    documentoCPF: '123.456.789-00',
    documentoCNPJ: '',
    documentoRNE: '',
    oab: '12345',
    categoria: 'A',
    secao: 'SP'
  },
  {
    id: '2',
    nome: 'Dra. Camila Santos',
    tipoDocumento: 'CPF',
    documentoCPF: '987.654.321-11',
    documentoCNPJ: '',
    documentoRNE: '',
    oab: '54321',
    categoria: 'B',
    secao: 'RJ'
  },
  {
    id: '3',
    nome: 'Advocacia Lima & Associados',
    tipoDocumento: 'CNPJ',
    documentoCPF: '',
    documentoCNPJ: '12.345.678/0001-90',
    documentoRNE: '',
    oab: '99999',
    categoria: 'E',
    secao: 'MG'
  }
];

export const beneficiariesOptions = beneficiariesMock.map((beneficiary) => ({
  label: beneficiary.nome,
  value: beneficiary.id
}));

export const procuradoresOptions = procuradoresMock.map((procurador) => ({
  label: procurador.nome,
  value: procurador.id
}));

export const fetchUsers = async (filters: Record<string, unknown>): Promise<Record<string, unknown>[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  const searchName = String(filters.name || '').toLowerCase();
  const searchRegistration = String(filters.registration || '').toLowerCase();
  return usersMock.filter((item) => item.name.toLowerCase().includes(searchName) && item.registration.toLowerCase().includes(searchRegistration));
};

export const fetchCourts = async (filters: Record<string, unknown>): Promise<Record<string, unknown>[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  const searchName = String(filters.name || '').toLowerCase();
  const searchCode = String(filters.code || '').toLowerCase();
  return courtsMock.filter((item) => item.name.toLowerCase().includes(searchName) && item.code.toLowerCase().includes(searchCode));
};

export const fetchSubjects = async (filters: Record<string, unknown>): Promise<Record<string, unknown>[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  const searchCode = String(filters.code || '').toLowerCase();
  const searchDescription = String(filters.description || '').toLowerCase();

  if (!searchCode && !searchDescription) return subjectsTreeMock;

  const filterTree = (nodes: Record<string, unknown>[]): Record<string, unknown>[] => nodes.reduce((acc: Record<string, unknown>[], node) => {
    const nodeCode = String(node.code || '').toLowerCase();
    const nodeDescription = String(node.description || '').toLowerCase();

    const matchesCode = searchCode ? nodeCode.includes(searchCode) : true;
    const matchesDescription = searchDescription ? nodeDescription.includes(searchDescription) : true;
    const isMatch = (searchCode ? matchesCode : true) && (searchDescription ? matchesDescription : true);

    if (isMatch) return [...acc, { ...node }];

    const children = node.children as Record<string, unknown>[] | undefined;

    if (children?.length) {
      const filteredChildren = filterTree(children);
      if (filteredChildren.length > 0) return [...acc, { ...node, children: filteredChildren }];
    }

    return acc;
  }, []);

  return filterTree(subjectsTreeMock);
};