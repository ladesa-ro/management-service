import {
  CampusDatabaseEntity
} from "../../../../../../features/campus/infrastructure/persistence/typeorm/entities/campus.database-entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../../helpers/create-repository-factory";

export const createCampusRepository = createRepositoryFactory((ds) => ds.getRepository(CampusDatabaseEntity).extend({}));

export type ICampusRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
