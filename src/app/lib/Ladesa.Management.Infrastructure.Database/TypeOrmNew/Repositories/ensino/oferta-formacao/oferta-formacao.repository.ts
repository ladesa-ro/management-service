import { OfertaFormacaoEntity } from "@/Ladesa.Management.Application/ensino/oferta-formacao/infrastructure/persistence/typeorm/oferta-formacao.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoEntity).extend({});
});

export type OfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoRepository
>;
