import { GradeHorarioOfertaFormacaoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/GradeHorarioOfertaFormacaoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createGradeHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoEntity).extend({});
});

export type GradeHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createGradeHorarioOfertaFormacaoRepository
>;
