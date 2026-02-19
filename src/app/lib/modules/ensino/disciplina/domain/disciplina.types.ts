import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem.types";
import type { IEntityBase } from "@/modules/@shared";

/**
 * Interface que define a estrutura de dados de Disciplina
 * Tipagem pura sem implementação de regras
 */
export interface IDisciplina extends IEntityBase {
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
  imagemCapa: IImagem | null;
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
