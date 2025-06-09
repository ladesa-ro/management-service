import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoIntervaloDeTempoEntity).extend({
    //
  });
});

export type GradeHorarioOfertaFormacaoIntervaloDeTempoRepository = IRepositoryFactoryOutput<typeof createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository>;
