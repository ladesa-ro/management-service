import { EtapaEntity } from "@/Ladesa.Management.Application/ensino/etapa/infrastructure/persistence/typeorm/etapa.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EtapaEntity).extend({});
});

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
