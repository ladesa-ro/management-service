import { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createEtapaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EtapaEntity).extend({});
});

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
