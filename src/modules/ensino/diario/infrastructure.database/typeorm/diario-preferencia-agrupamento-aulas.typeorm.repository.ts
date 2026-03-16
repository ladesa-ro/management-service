import { createRepositoryFactory, IRepositoryFactoryOutput } from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { DiarioPreferenciaAgrupamentoAulasEntity } from "./diario-preferencia-agrupamento-aulas.typeorm.entity";

export const createDiarioPreferenciaAgrupamentoAulasRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoAulasEntity).extend({});
});

export type DiarioPreferenciaAgrupamentoAulasRepository = IRepositoryFactoryOutput<typeof createDiarioPreferenciaAgrupamentoAulasRepository>;
