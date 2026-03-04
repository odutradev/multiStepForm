export const usersMock = [
  { matricula: 'P-1234567', nome: 'João da Silva' },
  { matricula: 'M-7654321', nome: 'Maria Souza' },
  { matricula: 'F-9988776', nome: 'Ana Costa' },
  { matricula: 'P-1122334', nome: 'Carlos Eduardo' },
  { matricula: 'M-5544332', nome: 'Beatriz Lima' },
  { matricula: 'F-6677889', nome: 'Fernando Alves' },
  { matricula: 'P-9900112', nome: 'Gabriela Rocha' },
  { matricula: 'M-3344556', nome: 'Henrique Santos' },
  { matricula: 'F-2211009', nome: 'Isabela Ferreira' },
  { matricula: 'P-8877665', nome: 'Juliano Martins' },
  { matricula: 'M-1100223', nome: 'Karina Mendes' },
  { matricula: 'F-4455667', nome: 'Leonardo Gomes' },
  { matricula: 'P-9988001', nome: 'Mariana Azevedo' },
  { matricula: 'M-7766554', nome: 'Nicolas Pereira' },
  { matricula: 'F-2233445', nome: 'Olivia Ribeiro' },
  { matricula: 'P-5566778', nome: 'Paulo Carvalho' },
  { matricula: 'M-1122003', nome: 'Quintino Silva' },
  { matricula: 'F-9900887', nome: 'Rafaela Castro' },
  { matricula: 'P-3344221', nome: 'Samuel Nunes' },
  { matricula: 'M-6677112', nome: 'Tatiana Borges' },
  { matricula: 'F-8899001', nome: 'Ulisses Monteiro' },
  { matricula: 'P-2211334', nome: 'Vanessa Dias' },
  { matricula: 'M-5544778', nome: 'Wagner Correia' },
  { matricula: 'F-1100998', nome: 'Xuxa Meneghel' },
  { matricula: 'P-7766223', nome: 'Yuri Nogueira' },
  { matricula: 'M-4455110', nome: 'Zélia Duncan' },
  { matricula: 'S0123456', nome: 'Silvana Almeida' },
  { matricula: 'S0987654', nome: 'Sérgio Ramos' },
  { matricula: 'S9876543', nome: 'João Guimarães Rosa' }
];

export const stepOneAutoFillMock = {
  matriculaGerenteDaSecretaria: 'S9876543',
  numeroUnicoProcessoJudicialCNJ: '00185037520118130251',
  nomeDaVara: '1ª Vara de Feitos Tributários do Estado da comarca de Belo Horizonte',
  nomeGerenteDaSecretaria: 'João Guimarães Rosa',
  codigoDaVara: '100240412'
};

const MOCK_DELAY_MS = 800;


export const fetchUsers = async (filters: Record<string, unknown>): Promise<Record<string, unknown>[]> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  const searchName = String(filters.nome || '').toLowerCase();
  const searchMatricula = String(filters.matricula || '').toLowerCase();
  return usersMock.filter((item) => item.nome.toLowerCase().includes(searchName) && item.matricula.toLowerCase().includes(searchMatricula));
};