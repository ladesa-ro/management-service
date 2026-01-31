import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DiarioEntity } from "./diario.entity";

export const createDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioEntity).extend({});
});

export type DiarioRepository = IRepositoryFactoryOutput<typeof createDiarioRepository>;
