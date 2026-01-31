import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { GradeHorarioOfertaFormacaoEntity } from "./grade-horario-oferta-formacao.entity";

export const createGradeHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoEntity).extend({});
});

export type GradeHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createGradeHorarioOfertaFormacaoRepository
>;
