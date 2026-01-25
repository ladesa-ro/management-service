import { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({});
});

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
