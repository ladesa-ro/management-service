import { CampusEntity } from "../../entities/02-ambientes/campus.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createCampusRepository = createRepositoryFactory((ds) => ds.getRepository(CampusEntity).extend({}));

export type ICampusRepository = IRepositoryFactoryOutput<typeof createCampusRepository>;
