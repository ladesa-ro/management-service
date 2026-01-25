import { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoEntity).extend({});
});

export type IEnderecoRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
