import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoProfessorEntity } from "./calendario-agendamento-professor.typeorm.entity";

export const createCalendarioAgendamentoProfessorRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoProfessorEntity).extend({});
});

export type CalendarioAgendamentoProfessorRepository = IRepositoryFactoryOutput<typeof createCalendarioAgendamentoProfessorRepository>;
