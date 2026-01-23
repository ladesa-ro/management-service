import { GradeHorarioOfertaFormacaoEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoEntity).extend({});
});

export type GradeHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<typeof createGradeHorarioOfertaFormacaoRepository>;
