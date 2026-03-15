import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { UsuarioEntity } from "./usuario.typeorm.entity";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({});
});

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
