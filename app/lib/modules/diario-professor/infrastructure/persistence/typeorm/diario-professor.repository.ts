import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DiarioProfessorEntity } from "./diario-professor.entity";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type DiarioProfessorRepository = IRepositoryFactoryOutput<
  typeof createDiarioProfessorRepository
>;
