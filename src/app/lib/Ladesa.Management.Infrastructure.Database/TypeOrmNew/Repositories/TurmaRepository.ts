import { TurmaEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/TurmaEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createTurmaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(TurmaEntity).extend({});
});

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
