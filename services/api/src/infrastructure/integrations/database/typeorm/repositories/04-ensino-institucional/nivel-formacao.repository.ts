import { NivelFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(NivelFormacaoEntity).extend({
    //
  });
});

export type NivelFormacaoRepository = IRepositoryFactoryOutput<typeof createNivelFormacaoRepository>;
