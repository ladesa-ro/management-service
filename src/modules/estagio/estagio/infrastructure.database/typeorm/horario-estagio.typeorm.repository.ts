import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { HorarioEstagioTypeormEntity } from "./horario-estagio.typeorm.entity";

export const createHorarioEstagioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioEstagioTypeormEntity).extend({});
});

export type HorarioEstagioRepository = IRepositoryFactoryOutput<
  typeof createHorarioEstagioRepository
>;
