import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CalendarioAgendamentoDiarioEntity } from "./calendario-agendamento-diario.typeorm.entity";

export const createCalendarioAgendamentoDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CalendarioAgendamentoDiarioEntity).extend({});
});

export type CalendarioAgendamentoDiarioRepository = IRepositoryFactoryOutput<typeof createCalendarioAgendamentoDiarioRepository>;
