import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { IOfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao";

/**
 * Interface que define a estrutura de dados de GradeHorarioOfertaFormacao
 * Tipagem pura sem implementacao de regras
 */
export interface IGradeHorarioOfertaFormacao extends IEntityBase {
  /** Campus associado */
  campus: ICampus | null;

  /** Oferta de formacao associada */
  ofertaFormacao: IOfertaFormacao | null;
}

/**
 * Dados necessarios para criar uma grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoCreate {
  campus: { id: IdUuid };
  ofertaFormacao: { id: IdUuid };
}

/**
 * Dados para atualizacao de grade horario de oferta de formacao
 */
export interface IGradeHorarioOfertaFormacaoUpdate {
  campus?: { id: IdUuid };
  ofertaFormacao?: { id: IdUuid };
}
