import { EstadoEntity } from "@/infrastructure-antigo/integrations/database/typeorm/entities";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createEstadoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstadoEntity).extend({});
});

export type IEstadoRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
