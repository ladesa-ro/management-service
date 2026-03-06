import { CampusEntity } from "@/Ladesa.Management.Application/ambientes/campus/infrastructure/persistence/typeorm/campus.entity";
import {
  createRepositoryFactory,
  IRepositoryFactoryOutput,
} from "@/Ladesa.Management.Infrastructure.Database/typeorm/create-repository-factory";

export const createCampusRepository = createRepositoryFactory((ds) =>
  ds.getRepository(CampusEntity).extend({}),
);

export type ICampusRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
