import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/infrastructure.database/typeorm/repositories/create-repository-factory";
import { CampusEntity } from "./campus.typeorm.entity";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type CampusTypeOrmRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
