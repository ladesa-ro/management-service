import { DiarioPreferenciaAgrupamentoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/DiarioPreferenciaAgrupamentoEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDiarioPreferenciaAgrupamentoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DiarioPreferenciaAgrupamentoEntity).extend({});
});

export type IDiarioPreferenciaAgrupamentoRepositoryTypeOrm = IRepositoryFactoryOutput<
  typeof createDiarioPreferenciaAgrupamentoRepository
>;
