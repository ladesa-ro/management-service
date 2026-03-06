import { DiaCalendarioEntity } from "@/Ladesa.Management.Application/horarios/dia-calendario/infrastructure/persistence/typeorm/dia-calendario.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiaCalendarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiaCalendarioEntity).extend({});
});

export type DiaCalendarioRepository = IRepositoryFactoryOutput<
  typeof createDiaCalendarioRepository
>;
