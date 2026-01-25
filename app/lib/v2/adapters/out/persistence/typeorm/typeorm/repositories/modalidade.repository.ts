import { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({});
});

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
