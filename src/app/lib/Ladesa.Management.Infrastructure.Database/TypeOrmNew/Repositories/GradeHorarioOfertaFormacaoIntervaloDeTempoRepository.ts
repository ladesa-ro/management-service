import { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/GradeHorarioOfertaFormacaoIntervaloDeTempoEntity";
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
