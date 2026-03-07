import { CampusEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/CampusEntity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type ICampusRepositoryTypeOrm = IRepositoryFactoryOutput<typeof createCampusRepository>;
