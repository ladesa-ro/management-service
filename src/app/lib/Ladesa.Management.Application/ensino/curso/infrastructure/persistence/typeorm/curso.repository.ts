import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { CursoEntity } from "./curso.entity";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({});
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
