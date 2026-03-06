import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm/grade-horario-oferta-formacao-intervalo-de-tempo.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = createRepositoryFactory(
  (ds) => {
    return ds.getRepository(GradeHorarioOfertaFormacaoIntervaloDeTempoEntity).extend({});
  },
);

export type GradeHorarioOfertaFormacaoIntervaloDeTempoRepository = IRepositoryFactoryOutput<
  typeof createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository
>;
