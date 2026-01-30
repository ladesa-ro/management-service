import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICampus } from "@/core/campus";
import type { IImagem } from "@/core/imagem";
import type { IOfertaFormacao } from "@/core/oferta-formacao";

/**
 * Interface que define a estrutura de dados de Curso
 * Tipagem pura sem implementacao de regras
 */
export interface ICurso {
  id: IdUuid;
  nome: string;
  nomeAbreviado: string;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  imagemCapa: IImagem | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessarios para criar um curso
 */
export interface ICursoCreate {
  nome: string;
  nomeAbreviado: string;
  campus: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}

/**
 * Dados para atualizacao de curso
 */
export interface ICursoUpdate {
  nome?: string;
  nomeAbreviado?: string;
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}
