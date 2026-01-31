import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Disciplina
 * Tipagem pura sem implementação de regras
 */
export interface IDisciplina {
  id: IdUuid;
  nome: string;
  nomeAbreviado: string;
  cargaHoraria: number;
  imagemCapa: IImagem | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
