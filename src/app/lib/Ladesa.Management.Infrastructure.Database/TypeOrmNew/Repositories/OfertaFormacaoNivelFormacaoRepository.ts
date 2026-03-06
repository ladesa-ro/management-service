import { OfertaFormacaoNivelFormacaoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/OfertaFormacaoNivelFormacaoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createOfertaFormacaoNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoNivelFormacaoEntity).extend({});
});

export type OfertaFormacaoNivelFormacaoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoNivelFormacaoRepository
>;
