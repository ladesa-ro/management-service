import { PerfilEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createPerfilRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(PerfilEntity).extend({});
});

export type PerfilRepository = IRepositoryFactoryOutput<typeof createPerfilRepository>;
