import { UsuarioEntity } from "@/Ladesa.Management.Application/acesso/usuario/infrastructure/persistence/typeorm/usuario.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({});
});

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
