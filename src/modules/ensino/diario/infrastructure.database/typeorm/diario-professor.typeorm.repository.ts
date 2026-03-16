import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DiarioProfessorEntity } from "./diario-professor.typeorm.entity";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type DiarioProfessorRepository = IRepositoryFactoryOutput<
  typeof createDiarioProfessorRepository
>;
