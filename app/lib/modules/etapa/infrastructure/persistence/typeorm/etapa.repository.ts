import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { EtapaEntity } from "./etapa.entity";

export const createEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EtapaEntity).extend({});
});

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
