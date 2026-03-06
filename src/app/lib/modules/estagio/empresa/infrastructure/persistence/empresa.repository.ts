import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/create-repository-factory";
import { EmpresaTypeormEntity } from "./empresa.typeorm.entity";

export const createEmpresaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EmpresaTypeormEntity).extend({});
});

export type EmpresaRepository = IRepositoryFactoryOutput<typeof createEmpresaRepository>;
