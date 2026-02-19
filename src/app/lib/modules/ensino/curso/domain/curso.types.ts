import type { IImagem } from "@/modules/@base/armazenamento/imagem";
import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao";

/**
 * Interface que define a estrutura de dados de Curso
 * Tipagem pura sem implementacao de regras
 */
export interface ICurso extends IEntityBase {
  nome: string;
  nomeAbreviado: string;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  imagemCapa: IImagem | null;
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
