import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { EnderecoEntity } from "./endereco.typeorm.entity";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoEntity).extend({});
});

export type EnderecoTypeOrmRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
