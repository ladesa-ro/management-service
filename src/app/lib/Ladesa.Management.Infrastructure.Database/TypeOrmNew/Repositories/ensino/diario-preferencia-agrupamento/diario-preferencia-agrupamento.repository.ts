import { DiarioPreferenciaAgrupamentoEntity } from "@/Ladesa.Management.Application/ensino/diario-preferencia-agrupamento/infrastructure/persistence/typeorm/diario-preferencia-agrupamento.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiarioPreferenciaAgrupamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoEntity).extend({});
});

export type DiarioPreferenciaAgrupamentoRepository = IRepositoryFactoryOutput<
  typeof createDiarioPreferenciaAgrupamentoRepository
>;
