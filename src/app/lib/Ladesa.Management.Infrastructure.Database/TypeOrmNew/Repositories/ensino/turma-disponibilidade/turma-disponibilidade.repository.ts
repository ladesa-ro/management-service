import { TurmaDisponibilidadeEntity } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/infrastructure/persistence/typeorm/turma-disponibilidade.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaDisponibilidadeEntity).extend({});
});

export type TurmaDisponibilidadeRepository = IRepositoryFactoryOutput<
  typeof createTurmaDisponibilidadeRepository
>;
