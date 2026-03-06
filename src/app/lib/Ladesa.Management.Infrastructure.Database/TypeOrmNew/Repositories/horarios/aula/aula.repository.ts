import { AulaEntity } from "@/Ladesa.Management.Application/horarios/aula/infrastructure/persistence/typeorm/aula.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(AulaEntity).extend({});
});

export type AulaRepository = IRepositoryFactoryOutput<typeof createAulaRepository>;
