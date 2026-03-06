import { DisciplinaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DisciplinaEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDisciplinaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisciplinaEntity).extend({});
});

export type DisciplinaRepository = IRepositoryFactoryOutput<typeof createDisciplinaRepository>;
