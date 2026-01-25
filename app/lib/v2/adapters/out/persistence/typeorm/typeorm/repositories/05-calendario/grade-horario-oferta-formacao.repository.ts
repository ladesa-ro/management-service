import { GradeHorarioOfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createGradeHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GradeHorarioOfertaFormacaoEntity).extend({});
});

export type GradeHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<typeof createGradeHorarioOfertaFormacaoRepository>;
