import { HorarioGeradoAulaEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createHorarioGeradoAulaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioGeradoAulaEntity).extend({
    //
  });
});

export type HorarioGeradoAulaRepository = IRepositoryFactoryOutput<typeof createHorarioGeradoAulaRepository>;
