import { TurmaDisponibilidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/TurmaDisponibilidadeEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaDisponibilidadeEntity).extend({});
});

export type ITurmaDisponibilidadeRepositoryTypeOrm = IRepositoryFactoryOutput<
  typeof createTurmaDisponibilidadeRepository
>;
