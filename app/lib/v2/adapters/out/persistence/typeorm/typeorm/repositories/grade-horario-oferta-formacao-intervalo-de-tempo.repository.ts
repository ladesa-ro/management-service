import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = createRepositoryFactory(
  (ds) => {
    return ds.getRepository(GradeHorarioOfertaFormacaoIntervaloDeTempoEntity).extend({});
  },
);

export type GradeHorarioOfertaFormacaoIntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository
>;
