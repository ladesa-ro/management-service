import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { OfertaFormacaoPeriodoEntity } from "./oferta-formacao-periodo.typeorm.entity";

export const createOfertaFormacaoPeriodoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoPeriodoEntity).extend({});
});

export type OfertaFormacaoPeriodoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoPeriodoRepository
>;
