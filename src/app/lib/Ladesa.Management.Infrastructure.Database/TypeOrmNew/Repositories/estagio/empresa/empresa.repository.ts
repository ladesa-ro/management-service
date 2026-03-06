import { EmpresaTypeormEntity } from "@/Ladesa.Management.Application/estagio/empresa/infrastructure/persistence/empresa.typeorm.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createEmpresaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EmpresaTypeormEntity).extend({});
});

export type EmpresaRepository = IRepositoryFactoryOutput<typeof createEmpresaRepository>;
