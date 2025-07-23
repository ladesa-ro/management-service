import { OfertaFormacaoNivelFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createOfertaFormacaoNivelFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoNivelFormacaoEntity).extend({
    //
  });
});

export type OfertaFormacaoNivelFormacaoRepository = IRepositoryFactoryOutput<typeof createOfertaFormacaoNivelFormacaoRepository>;
