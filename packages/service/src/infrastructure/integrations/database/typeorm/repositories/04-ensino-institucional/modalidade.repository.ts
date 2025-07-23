import { ModalidadeEntity } from "../../entities/04-ensino-institucional/modalidade.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createModalidadeRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ModalidadeEntity).extend({
    //
  });
});

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
