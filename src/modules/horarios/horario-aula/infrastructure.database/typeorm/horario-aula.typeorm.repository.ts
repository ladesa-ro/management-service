import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { HorarioAulaEntity } from "./horario-aula.typeorm.entity";

export const createHorarioAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioAulaEntity).extend({});
});

export type HorarioAulaRepository = IRepositoryFactoryOutput<typeof createHorarioAulaRepository>;
