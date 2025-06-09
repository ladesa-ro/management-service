import { CidadeEntity } from "../../entities/00-01-base-lugares/cidade.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({
    //
  });
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
