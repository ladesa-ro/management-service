import { DiarioProfessorEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioProfessorEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioProfessorEntity).extend({});
});

export type IDiarioProfessorRepositoryTypeOrm = IRepositoryFactoryOutput<
  typeof createDiarioProfessorRepository
>;
