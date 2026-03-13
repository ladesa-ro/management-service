import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DisciplinaEntity } from "./disciplina.entity";

export const createDisciplinaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisciplinaEntity).extend({});
});

export type DisciplinaRepository = IRepositoryFactoryOutput<typeof createDisciplinaRepository>;
