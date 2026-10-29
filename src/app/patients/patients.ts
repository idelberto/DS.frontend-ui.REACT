// Pacientes fictícios da vitrine.
export interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  isActive: boolean;
}

export const PATIENTS: Patient[] = [
  {
    id: 'p01',
    name: 'Ana Carolina Silva Santos',
    email: 'ana.silva@exemplo.com',
    cpf: '123.456.789-01',
    phone: '(11) 98765-4321',
    birthDate: '15/05/1990',
    isActive: true,
  },
  {
    id: 'p02',
    name: 'Bruno Henrique Costa',
    email: 'bruno.costa@exemplo.com',
    cpf: '234.567.890-12',
    phone: '(11) 97654-3210',
    birthDate: '22/08/1985',
    isActive: true,
  },
  {
    id: 'p03',
    name: 'Carla Regina Mendes Oliveira',
    email: 'carla.mendes@exemplo.com',
    cpf: '345.678.901-23',
    phone: '(11) 96543-2109',
    birthDate: '03/12/1992',
    isActive: true,
  },
  {
    id: 'p04',
    name: 'Diego Augusto Ferreira Lima',
    email: 'diego.ferreira@exemplo.com',
    cpf: '456.789.012-34',
    phone: '(11) 95432-1098',
    birthDate: '10/03/1988',
    isActive: true,
  },
  {
    id: 'p05',
    name: 'Eduarda Cristina Rocha',
    email: 'eduarda.rocha@exemplo.com',
    cpf: '567.890.123-45',
    phone: '(11) 94321-0987',
    birthDate: '28/07/1995',
    isActive: true,
  },
  {
    id: 'p06',
    name: 'Fernando José Alves Pereira',
    email: 'fernando.alves@exemplo.com',
    cpf: '678.901.234-56',
    phone: '(11) 93210-9876',
    birthDate: '14/11/1980',
    isActive: false,
  },
  {
    id: 'p07',
    name: 'Gabriela Santos Lima',
    email: 'gabriela.lima@exemplo.com',
    cpf: '789.012.345-67',
    phone: '(11) 92109-8765',
    birthDate: '19/02/1998',
    isActive: true,
  },
  {
    id: 'p08',
    name: 'Henrique Barbosa Souza',
    email: 'henrique.souza@exemplo.com',
    cpf: '890.123.456-78',
    phone: '(11) 91098-7654',
    birthDate: '05/09/1983',
    isActive: true,
  },
  {
    id: 'p09',
    name: 'Isabela Martins Ribeiro',
    email: 'isabela.ribeiro@exemplo.com',
    cpf: '901.234.567-89',
    phone: '(11) 90987-6543',
    birthDate: '30/06/1993',
    isActive: true,
  },
  {
    id: 'p10',
    name: 'João Pedro Carvalho',
    email: 'joao.carvalho@exemplo.com',
    cpf: '012.345.678-90',
    phone: '(11) 99876-5432',
    birthDate: '08/01/1987',
    isActive: false,
  },
];
