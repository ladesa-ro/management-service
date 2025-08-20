import { OfertaFormacaoNivelFormacaoEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createOfertaFormacaoNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoNivelFormacaoEntity).extend({});
});

export type OfertaFormacaoNivelFormacaoRepository = IRepositoryFactoryOutput<typeof createOfertaFormacaoNivelFormacaoRepository>;
