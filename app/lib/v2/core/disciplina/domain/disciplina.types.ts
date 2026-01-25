import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Disciplina
 * Tipagem pura sem implementação de regras
 */
export interface IDisciplina {
  id: string;
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
  imagemCapa: IImagem | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar uma disciplina
 */
export interface IDisciplinaCreate {
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
}

/**
 * Dados para atualização de disciplina
 */
export interface IDisciplinaUpdate {
  nome?: string;
  nomeAbreviado?: string;
  cargaHoraria?: number;
}
