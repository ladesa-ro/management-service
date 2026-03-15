import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { OfertaFormacaoEntity } from "./oferta-formacao.typeorm.entity";

export const createOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoEntity).extend({});
});

export type OfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoRepository
>;
