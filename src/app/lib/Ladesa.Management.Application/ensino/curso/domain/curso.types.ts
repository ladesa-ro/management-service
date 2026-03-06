import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { IImagem } from "@/Ladesa.Management.Application/armazenamento/imagem";
import type { IOfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao";

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
