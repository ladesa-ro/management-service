import type { OfertaFormacaoPeriodoEtapaEntity } from "../../infrastructure.database/typeorm/oferta-formacao-periodo-etapa.typeorm.entity";

export const IOfertaFormacaoPeriodoEtapaRepository = Symbol(
  "IOfertaFormacaoPeriodoEtapaRepository",
);

export interface IOfertaFormacaoPeriodoEtapaRepository {
  findByPeriodoId(periodoId: string): Promise<OfertaFormacaoPeriodoEtapaEntity[]>;
  deleteByPeriodoId(periodoId: string): Promise<void>;
  save(entity: OfertaFormacaoPeriodoEtapaEntity): Promise<OfertaFormacaoPeriodoEtapaEntity>;
}
