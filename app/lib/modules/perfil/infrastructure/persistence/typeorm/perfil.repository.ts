import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { PerfilEntity } from "./perfil.entity";

export const createPerfilRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(PerfilEntity).extend({});
});

export type PerfilRepository = IRepositoryFactoryOutput<typeof createPerfilRepository>;
