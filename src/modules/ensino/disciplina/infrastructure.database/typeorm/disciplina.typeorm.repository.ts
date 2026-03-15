import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DisciplinaEntity } from "./disciplina.typeorm.entity";

export const createDisciplinaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisciplinaEntity).extend({});
});

export type DisciplinaRepository = IRepositoryFactoryOutput<typeof createDisciplinaRepository>;
