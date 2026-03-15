import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DiarioEntity } from "./diario.typeorm.entity";

export const createDiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioEntity).extend({});
});

export type DiarioRepository = IRepositoryFactoryOutput<typeof createDiarioRepository>;
