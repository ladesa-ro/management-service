import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { OfertaFormacaoPeriodoEtapaEntity } from "./oferta-formacao-periodo-etapa.typeorm.entity";

export const createOfertaFormacaoPeriodoEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoPeriodoEtapaEntity).extend({});
});

export type OfertaFormacaoPeriodoEtapaRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoPeriodoEtapaRepository
>;
