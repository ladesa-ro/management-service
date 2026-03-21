import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { TurmaHorarioAulaEntity } from "./turma-horario-aula.typeorm.entity";

export const createTurmaHorarioAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaHorarioAulaEntity).extend({});
});

export type TurmaHorarioAulaRepository = IRepositoryFactoryOutput<
  typeof createTurmaHorarioAulaRepository
>;
