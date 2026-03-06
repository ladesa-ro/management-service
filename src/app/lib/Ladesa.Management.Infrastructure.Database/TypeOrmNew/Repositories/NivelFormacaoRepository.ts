import { NivelFormacaoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/NivelFormacaoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(NivelFormacaoEntity).extend({});
});

export type NivelFormacaoRepository = IRepositoryFactoryOutput<
  typeof createNivelFormacaoRepository
>;
