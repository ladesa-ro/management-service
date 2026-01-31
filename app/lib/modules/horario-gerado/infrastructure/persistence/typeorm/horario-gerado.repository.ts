import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { HorarioGeradoEntity } from "./horario-gerado.entity";

export const createHorarioGeradoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoEntity).extend({});
});

export type HorarioGeradoRepository = IRepositoryFactoryOutput<
  typeof createHorarioGeradoRepository
>;
