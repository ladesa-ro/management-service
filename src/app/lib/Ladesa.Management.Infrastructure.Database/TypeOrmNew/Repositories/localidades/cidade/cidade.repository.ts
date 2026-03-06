import { CidadeEntity } from "@/Ladesa.Management.Application/localidades/cidade/infrastructure/persistence/typeorm/cidade.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({});
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
