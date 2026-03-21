import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { HorarioAulaConfiguracaoEntity } from "./horario-aula-configuracao.typeorm.entity";

export const createHorarioAulaConfiguracaoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(HorarioAulaConfiguracaoEntity).extend({});
});

export type HorarioAulaConfiguracaoRepository = IRepositoryFactoryOutput<
  typeof createHorarioAulaConfiguracaoRepository
>;
