import { DiarioEntity } from "../../entities/06-ensino-discente/diario.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioEntity).extend({});
});

export type DiarioRepository = IRepositoryFactoryOutput<typeof createDiarioRepository>;
