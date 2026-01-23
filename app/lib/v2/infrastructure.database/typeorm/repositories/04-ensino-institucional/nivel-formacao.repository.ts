import { NivelFormacaoEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(NivelFormacaoEntity).extend({});
});

export type NivelFormacaoRepository = IRepositoryFactoryOutput<typeof createNivelFormacaoRepository>;
