import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { NivelFormacaoEntity } from "./nivel-formacao.typeorm.entity";

export const createNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(NivelFormacaoEntity).extend({});
});

export type NivelFormacaoRepository = IRepositoryFactoryOutput<
  typeof createNivelFormacaoRepository
>;
