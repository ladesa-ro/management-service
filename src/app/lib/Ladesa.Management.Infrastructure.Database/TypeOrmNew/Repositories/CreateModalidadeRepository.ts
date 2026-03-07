import { ModalidadeEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ModalidadeEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({});
});

export type IModalidadeRepositoryTypeOrm = IRepositoryFactoryOutput<
  typeof createModalidadeRepository
>;
