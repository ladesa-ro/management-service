import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { HorarioGeradoAulaEntity } from "./horario-gerado-aula.entity";

export const createHorarioGeradoAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoAulaEntity).extend({});
});

export type HorarioGeradoAulaRepository = IRepositoryFactoryOutput<
  typeof createHorarioGeradoAulaRepository
>;
