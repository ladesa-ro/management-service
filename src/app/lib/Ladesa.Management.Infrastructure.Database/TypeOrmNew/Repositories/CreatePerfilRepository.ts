import { PerfilEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/PerfilEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createPerfilRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(PerfilEntity).extend({});
});

export type IPerfilRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createPerfilRepository>;
