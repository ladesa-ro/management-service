import { UsuarioEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/UsuarioEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createUsuarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(UsuarioEntity).extend({});
});

export type IUsuarioRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
