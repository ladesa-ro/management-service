import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { EstagiarioTypeormEntity } from "./estagiario.typeorm.entity";

export const createEstagiarioRepository = createRepositoryFactory((ds) => {
  return ds.getRepository(EstagiarioTypeormEntity).extend({});
});

export type EstagiarioRepository = IRepositoryFactoryOutput<typeof createEstagiarioRepository>;
