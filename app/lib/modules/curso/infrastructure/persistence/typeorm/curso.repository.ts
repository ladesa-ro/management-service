import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { CursoEntity } from "./curso.entity";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({});
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
