import { ProfessorIndisponibilidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ProfessorIndisponibilidadeEntity";
import { createRepositoryFactory } from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createProfessorIndisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ProfessorIndisponibilidadeEntity).extend({});
});

export type ProfessorIndisponibilidadeRepository = ReturnType<
  typeof createProfessorIndisponibilidadeRepository
>;
