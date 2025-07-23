import { OfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(OfertaFormacaoEntity).extend({
    //
  });
});

export type OfertaFormacaoRepository = IRepositoryFactoryOutput<typeof createOfertaFormacaoRepository>;
