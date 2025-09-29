import {
  EnderecoDatabaseEntity
} from "../../../../../../features/endereco/infrastructure/persistence/typeorm/entities/endereco.database-entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoDatabaseEntity).extend({});
});

export type IEnderecoRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
