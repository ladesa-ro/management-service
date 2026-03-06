import { HorarioGeradoAulaEntity } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula/infrastructure/persistence/typeorm/horario-gerado-aula.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createHorarioGeradoAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoAulaEntity).extend({});
});

export type HorarioGeradoAulaRepository = IRepositoryFactoryOutput<
  typeof createHorarioGeradoAulaRepository
>;
