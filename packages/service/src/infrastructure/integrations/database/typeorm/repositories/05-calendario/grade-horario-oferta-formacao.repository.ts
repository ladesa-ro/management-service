import { GradeHorarioOfertaFormacaoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoEntity).extend({
    //
  });
});

export type GradeHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<typeof createGradeHorarioOfertaFormacaoRepository>;
