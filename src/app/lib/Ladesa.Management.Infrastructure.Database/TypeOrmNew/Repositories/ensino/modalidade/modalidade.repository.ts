import { ModalidadeEntity } from "@/Ladesa.Management.Application/ensino/modalidade/infrastructure/persistence/typeorm/modalidade.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({});
});

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
