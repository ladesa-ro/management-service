import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { EnderecoEntity } from "./endereco.entity";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoEntity).extend({});
});

export type IEnderecoRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
