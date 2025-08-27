import { professorIndisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities/07-horario-academico/professor-indisponibilidade.entity";
import { createRepositoryFactory} from "../../helpers/create-repository-factory";

const createProfessorIndisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(professorIndisponibilidadeEntity).extend({});
});

export type ProfessorIndisponibilidadeRepository = ReturnType<typeof createProfessorIndisponibilidadeRepository>;
