import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { AulaEntity } from "./aula.entity";

export const createAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(AulaEntity).extend({});
});

export type AulaRepository = IRepositoryFactoryOutput<typeof createAulaRepository>;
