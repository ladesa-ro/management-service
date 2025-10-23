import { ProfessorIndisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities/07-horario-academico/professor-indisponibilidade.entity";
import { createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createProfessorIndisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ProfessorIndisponibilidadeEntity).extend({});
});

export type ProfessorIndisponibilidadeRepository = ReturnType<typeof createProfessorIndisponibilidadeRepository>;
