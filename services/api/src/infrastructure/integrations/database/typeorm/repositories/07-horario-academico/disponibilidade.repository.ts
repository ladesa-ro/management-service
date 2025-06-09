import { DisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createDisponibilidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisponibilidadeEntity).extend({});
});

export type DisponibilidadeRepository = IRepositoryFactoryOutput<typeof createDisponibilidadeRepository>;
