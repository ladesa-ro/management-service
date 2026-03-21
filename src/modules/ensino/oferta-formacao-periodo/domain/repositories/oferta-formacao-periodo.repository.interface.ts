import type { OfertaFormacaoPeriodoEntity } from "../../infrastructure.database/typeorm/oferta-formacao-periodo.typeorm.entity";

export const IOfertaFormacaoPeriodoRepository = Symbol("IOfertaFormacaoPeriodoRepository");

export interface IOfertaFormacaoPeriodoRepository {
  findByOfertaFormacaoId(ofertaFormacaoId: string): Promise<OfertaFormacaoPeriodoEntity[]>;
  deleteByOfertaFormacaoId(ofertaFormacaoId: string): Promise<void>;
  save(entity: OfertaFormacaoPeriodoEntity): Promise<OfertaFormacaoPeriodoEntity>;
}
