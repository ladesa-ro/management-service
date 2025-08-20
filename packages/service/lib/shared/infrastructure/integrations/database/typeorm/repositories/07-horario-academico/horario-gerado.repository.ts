import { HorarioGeradoEntity } from "../../entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createHorarioGeradoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoEntity).extend({});
});

export type HorarioGeradoRepository = IRepositoryFactoryOutput<typeof createHorarioGeradoRepository>;
