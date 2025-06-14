import { AulaEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(AulaEntity).extend({});
});

export type AulaRepository = IRepositoryFactoryOutput<typeof createAulaRepository>;
