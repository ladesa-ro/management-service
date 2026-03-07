import { EtapaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/EtapaEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EtapaEntity).extend({});
});

export type IEtapaRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createEtapaRepository>;
