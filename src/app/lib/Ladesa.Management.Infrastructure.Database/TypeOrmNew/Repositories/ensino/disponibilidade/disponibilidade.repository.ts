import { DisponibilidadeEntity } from "@/Ladesa.Management.Application/ensino/disponibilidade/infrastructure/persistence/typeorm/disponibilidade.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisponibilidadeEntity).extend({});
});

export type DisponibilidadeRepository = IRepositoryFactoryOutput<
  typeof createDisponibilidadeRepository
>;
