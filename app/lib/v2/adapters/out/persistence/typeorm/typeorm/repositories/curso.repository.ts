import { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({});
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
