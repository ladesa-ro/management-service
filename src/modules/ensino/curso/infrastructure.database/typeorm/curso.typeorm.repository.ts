import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CursoEntity } from "./curso.typeorm.entity";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({});
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
