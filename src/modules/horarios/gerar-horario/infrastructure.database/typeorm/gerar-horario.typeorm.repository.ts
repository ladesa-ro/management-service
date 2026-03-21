import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { GerarHorarioEntity } from "./gerar-horario.typeorm.entity";

export const createGerarHorarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(GerarHorarioEntity).extend({});
});

export type GerarHorarioRepository = IRepositoryFactoryOutput<typeof createGerarHorarioRepository>;
