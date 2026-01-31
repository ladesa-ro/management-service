import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { UsuarioEntity } from "./usuario.entity";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({});
});

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
