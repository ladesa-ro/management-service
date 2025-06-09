import { EnderecoEntity } from "../../entities/00-01-base-lugares/endereco.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoEntity).extend({
    //
  });
});

export type IEnderecoRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
