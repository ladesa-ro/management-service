import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { ModalidadeEntity } from "./modalidade.typeorm.entity";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({});
});

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
