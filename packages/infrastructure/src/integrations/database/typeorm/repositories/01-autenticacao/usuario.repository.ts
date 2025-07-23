import { UsuarioEntity } from "../../entities/01-autenticacao/usuario.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({
    //
  });
});

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
