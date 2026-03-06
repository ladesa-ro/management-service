import { CursoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CursoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCursoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(CursoEntity).extend({});
});

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
