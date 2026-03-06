import { NivelFormacaoEntity } from "@/Ladesa.Management.Application/ensino/nivel-formacao/infrastructure/persistence/typeorm/nivel-formacao.entity";
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
