import { ArquivoEntity } from "@/Ladesa.Management.Application/armazenamento/arquivo/infrastructure/persistence/typeorm/arquivo.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createArquivoRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(ArquivoEntity).extend({});
});

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
