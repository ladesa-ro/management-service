import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { GerarHorarioCalendarioLetivoEntity } from "./gerar-horario-calendario-letivo.typeorm.entity";

export const createGerarHorarioCalendarioLetivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GerarHorarioCalendarioLetivoEntity).extend({});
});

export type GerarHorarioCalendarioLetivoRepository = IRepositoryFactoryOutput<
  typeof createGerarHorarioCalendarioLetivoRepository
>;
