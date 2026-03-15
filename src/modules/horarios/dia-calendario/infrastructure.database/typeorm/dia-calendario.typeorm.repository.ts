import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DiaCalendarioEntity } from "./dia-calendario.typeorm.entity";

export const createDiaCalendarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiaCalendarioEntity).extend({});
});

export type DiaCalendarioRepository = IRepositoryFactoryOutput<
  typeof createDiaCalendarioRepository
>;
