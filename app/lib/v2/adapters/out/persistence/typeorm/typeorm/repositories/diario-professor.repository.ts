import { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type DiarioProfessorRepository = IRepositoryFactoryOutput<
  typeof createDiarioProfessorRepository
>;
