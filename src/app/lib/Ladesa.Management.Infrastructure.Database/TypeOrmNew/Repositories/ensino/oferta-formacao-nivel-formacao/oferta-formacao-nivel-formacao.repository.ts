import { OfertaFormacaoNivelFormacaoEntity } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/infrastructure/persistence/typeorm/oferta-formacao-nivel-formacao.entity";
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
