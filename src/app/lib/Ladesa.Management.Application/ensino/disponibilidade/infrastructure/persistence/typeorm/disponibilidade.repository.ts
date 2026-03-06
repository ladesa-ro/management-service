import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { DisponibilidadeEntity } from "./disponibilidade.entity";

export const createDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisponibilidadeEntity).extend({});
});

export type DisponibilidadeRepository = IRepositoryFactoryOutput<
  typeof createDisponibilidadeRepository
>;
