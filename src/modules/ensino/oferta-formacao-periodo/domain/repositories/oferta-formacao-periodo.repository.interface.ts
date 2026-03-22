import type { IOfertaFormacaoPeriodo } from "../oferta-formacao-periodo.types";

export const IOfertaFormacaoPeriodoRepository = Symbol("IOfertaFormacaoPeriodoRepository");

export interface IOfertaFormacaoPeriodoRepository {
  findByOfertaFormacaoId(ofertaFormacaoId: string): Promise<IOfertaFormacaoPeriodo[]>;
  deleteByOfertaFormacaoId(ofertaFormacaoId: string): Promise<void>;
  save(entity: Partial<IOfertaFormacaoPeriodo>): Promise<IOfertaFormacaoPeriodo>;
}
