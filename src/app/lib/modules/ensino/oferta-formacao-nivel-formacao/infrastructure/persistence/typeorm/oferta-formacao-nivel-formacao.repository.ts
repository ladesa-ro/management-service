import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/create-repository-factory";
import { OfertaFormacaoNivelFormacaoEntity } from "./oferta-formacao-nivel-formacao.entity";

export const createOfertaFormacaoNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoNivelFormacaoEntity).extend({});
});

export type OfertaFormacaoNivelFormacaoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoNivelFormacaoRepository
>;
