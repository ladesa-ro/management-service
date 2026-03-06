import { DiarioProfessorEntity } from "@/Ladesa.Management.Application/ensino/diario-professor/infrastructure/persistence/typeorm/diario-professor.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type DiarioProfessorRepository = IRepositoryFactoryOutput<
  typeof createDiarioProfessorRepository
>;
