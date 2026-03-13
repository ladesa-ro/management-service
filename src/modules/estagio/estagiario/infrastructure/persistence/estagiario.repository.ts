import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

export const createEstagiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstagiarioTypeormEntity).extend({});
});

export type EstagiarioRepository = IRepositoryFactoryOutput<typeof createEstagiarioRepository>;
