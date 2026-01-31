import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { CampusEntity } from "./campus.entity";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type ICampusRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
