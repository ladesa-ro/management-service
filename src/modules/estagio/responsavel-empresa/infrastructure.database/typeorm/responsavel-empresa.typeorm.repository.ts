import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { ResponsavelEmpresaEntity } from "./responsavel-empresa.typeorm.entity";

export const createResponsavelEmpresaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ResponsavelEmpresaEntity).extend({});
});

export type ResponsavelEmpresaRepository = IRepositoryFactoryOutput<
  typeof createResponsavelEmpresaRepository
>;
