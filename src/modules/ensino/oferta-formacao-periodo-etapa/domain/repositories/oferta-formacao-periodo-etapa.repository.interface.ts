import type { IOfertaFormacaoPeriodoEtapa } from "../oferta-formacao-periodo-etapa.types";

export const IOfertaFormacaoPeriodoEtapaRepository = Symbol(
  "IOfertaFormacaoPeriodoEtapaRepository",
);

export interface IOfertaFormacaoPeriodoEtapaRepository {
  findByPeriodoId(periodoId: string): Promise<IOfertaFormacaoPeriodoEtapa[]>;
  deleteByPeriodoId(periodoId: string): Promise<void>;
  save(entity: Partial<IOfertaFormacaoPeriodoEtapa>): Promise<IOfertaFormacaoPeriodoEtapa>;
}
