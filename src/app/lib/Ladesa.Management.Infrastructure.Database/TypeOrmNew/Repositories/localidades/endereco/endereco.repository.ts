import { EnderecoEntity } from "@/Ladesa.Management.Application/localidades/endereco/infrastructure/persistence/typeorm/endereco.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEnderecoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EnderecoEntity).extend({});
});

export type IEnderecoRepository = IRepositoryFactoryOutput<typeof createEnderecoRepository>;
