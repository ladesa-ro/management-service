import { DiarioEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioEntity).extend({});
});

export type IDiarioRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createDiarioRepository>;
