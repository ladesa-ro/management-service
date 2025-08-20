import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoIntervaloDeTempoEntity).extend({});
});

export type GradeHorarioOfertaFormacaoIntervaloDeTempoRepository = IRepositoryFactoryOutput<typeof createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository>;
