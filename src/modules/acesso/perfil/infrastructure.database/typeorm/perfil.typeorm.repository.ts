import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { PerfilEntity } from "./perfil.typeorm.entity";

export const createPerfilRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(PerfilEntity).extend({});
});

export type PerfilRepository = IRepositoryFactoryOutput<typeof createPerfilRepository>;
