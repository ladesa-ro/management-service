import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DiaCalendarioEntity } from "./dia-calendario.entity";

export const createDiaCalendarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiaCalendarioEntity).extend({});
});

export type DiaCalendarioRepository = IRepositoryFactoryOutput<
  typeof createDiaCalendarioRepository
>;
