import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/modules/@shared/infrastructure/persistence/typeorm/create-repository-factory";
import { CampusEntity } from "./campus.entity";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type CampusTypeOrmRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
