import { DiarioPreferenciaAgrupamentoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createDiarioPreferenciaAgrupamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoEntity).extend({});
});

export type DiarioPreferenciaAgrupamentoRepository = IRepositoryFactoryOutput<
  typeof createDiarioPreferenciaAgrupamentoRepository
>;
