import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { OfertaFormacaoEntity } from "./oferta-formacao.entity";

export const createOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoEntity).extend({});
});

export type OfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createOfertaFormacaoRepository
>;
