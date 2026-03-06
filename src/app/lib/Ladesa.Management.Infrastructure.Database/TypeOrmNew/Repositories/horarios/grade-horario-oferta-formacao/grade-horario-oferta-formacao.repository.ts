import { GradeHorarioOfertaFormacaoEntity } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/infrastructure/persistence/typeorm/grade-horario-oferta-formacao.entity";
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
