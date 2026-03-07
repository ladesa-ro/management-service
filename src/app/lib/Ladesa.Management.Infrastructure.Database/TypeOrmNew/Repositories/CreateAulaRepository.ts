import { AulaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/AulaEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(AulaEntity).extend({});
});

export type IAulaRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createAulaRepository>;
