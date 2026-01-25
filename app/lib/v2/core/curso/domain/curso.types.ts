import type { ICampus } from "@/v2/core/campus/domain/campus.types";
import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";
import type { IOfertaFormacao } from "@/v2/core/oferta-formacao/domain/oferta-formacao.types";

/**
 * Interface que define a estrutura de dados de Curso
 * Tipagem pura sem implementação de regras
 */
export interface ICurso {
  id: string;
  nome: string;
  nomeAbreviado: string;
  campus: ICampus;
  ofertaFormacao: IOfertaFormacao;
  imagemCapa: IImagem | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar um curso
 */
export interface ICursoCreate {
  nome: string;
  nomeAbreviado: string;
  campus: { id: string };
  ofertaFormacao: { id: string };
}

/**
 * Dados para atualização de curso
 */
export interface ICursoUpdate {
  nome?: string;
  nomeAbreviado?: string;
  campus?: { id: string };
  ofertaFormacao?: { id: string };
}
