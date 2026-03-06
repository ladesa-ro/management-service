import { CidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CidadeEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CidadeEntity).extend({});
});

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
