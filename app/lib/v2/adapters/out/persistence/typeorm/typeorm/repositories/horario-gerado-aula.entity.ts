import { HorarioGeradoAulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createHorarioGeradoAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoAulaEntity).extend({});
});

export type HorarioGeradoAulaRepository = IRepositoryFactoryOutput<
  typeof createHorarioGeradoAulaRepository
>;
