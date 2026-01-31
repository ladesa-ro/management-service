import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { DiarioPreferenciaAgrupamentoEntity } from "./diario-preferencia-agrupamento.entity";

export const createDiarioPreferenciaAgrupamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoEntity).extend({});
});

export type DiarioPreferenciaAgrupamentoRepository = IRepositoryFactoryOutput<
  typeof createDiarioPreferenciaAgrupamentoRepository
>;
