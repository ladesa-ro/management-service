import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { EstagioTypeormEntity } from "./estagio.typeorm.entity";

export const createEstagioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstagioTypeormEntity).extend({});
});

export type EstagioRepository = IRepositoryFactoryOutput<typeof createEstagioRepository>;
