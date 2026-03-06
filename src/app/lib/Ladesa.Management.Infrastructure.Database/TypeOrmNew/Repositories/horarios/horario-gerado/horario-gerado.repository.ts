import { HorarioGeradoEntity } from "@/Ladesa.Management.Application/horarios/horario-gerado/infrastructure/persistence/typeorm/horario-gerado.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createHorarioGeradoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoEntity).extend({});
});

export type HorarioGeradoRepository = IRepositoryFactoryOutput<
  typeof createHorarioGeradoRepository
>;
