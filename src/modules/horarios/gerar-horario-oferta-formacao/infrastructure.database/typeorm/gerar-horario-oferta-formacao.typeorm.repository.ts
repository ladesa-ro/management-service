import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { GerarHorarioOfertaFormacaoEntity } from "./gerar-horario-oferta-formacao.typeorm.entity";

export const createGerarHorarioOfertaFormacaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GerarHorarioOfertaFormacaoEntity).extend({});
});

export type GerarHorarioOfertaFormacaoRepository = IRepositoryFactoryOutput<
  typeof createGerarHorarioOfertaFormacaoRepository
>;
