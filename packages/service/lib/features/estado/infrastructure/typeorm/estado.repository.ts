import { EstadoDatabaseEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput
} from "../../../../infrastructure/integrations/database/typeorm/helpers/create-repository-factory";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoDatabaseEntity).extend({});
});

export type IEstadoRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
