import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.typeorm.entity";

export const createDiarioPreferenciaAgrupamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoEntity).extend({});
});

export type DiarioPreferenciaAgrupamentoRepository = IRepositoryFactoryOutput<
  typeof createDiarioPreferenciaAgrupamentoRepository
>;
