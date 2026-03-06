import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";
import { ModalidadeEntity } from "./modalidade.entity";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({});
});

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
