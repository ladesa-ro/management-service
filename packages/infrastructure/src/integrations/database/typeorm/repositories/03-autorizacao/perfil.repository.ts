import { PerfilEntity } from "../../entities/03-autorizacao/perfil.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createPerfilRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(PerfilEntity).extend({
    //
  });
});

export type PerfilRepository = IRepositoryFactoryOutput<typeof createPerfilRepository>;
