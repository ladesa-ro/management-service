import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "./grade-horario-oferta-formacao-intervalo-de-tempo.entity";

export const createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = createRepositoryFactory(
  (ds) => {
    return ds.getRepository(GradeHorarioOfertaFormacaoIntervaloDeTempoEntity).extend({});
  },
);

export type GradeHorarioOfertaFormacaoIntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository
>;
