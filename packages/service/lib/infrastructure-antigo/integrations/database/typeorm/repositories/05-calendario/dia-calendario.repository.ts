import { DiaCalendarioEntity } from "../../entities/05-calendario/dia-calendario.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createDiaCalendarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiaCalendarioEntity).extend({});
});

export type DiaCalendarioRepository = IRepositoryFactoryOutput<typeof createDiaCalendarioRepository>;
