import { CampusEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "../helpers/create-repository-factory";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type ICampusRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
