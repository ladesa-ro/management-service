import { DisponibilidadeDiaEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createDisponibilidadeDiaRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(DisponibilidadeDiaEntity).extend({});
});

export type DisponibilidadeDiaRepository = IRepositoryFactoryOutput<typeof createDisponibilidadeDiaRepository>;
