// tipos.ts
export interface Endereco {
  id: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
  links: any[]; // Ajuste conforme a estrutura dos links
}

export interface Telefone {
  id: number;
  ddd: string;
  numero: string;
  links: any[]; // Ajuste conforme a estrutura dos links
}

export interface Cliente {
  id: number;
  nome: string;
  sobreNome: string;
  email: string | null;
  endereco: Endereco;
  telefones: Telefone[];
  links: any[]; // Ajuste conforme a estrutura dos links
}
