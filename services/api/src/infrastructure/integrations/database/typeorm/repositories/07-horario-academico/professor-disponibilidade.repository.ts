import { ProfessorDisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../../helpers/create-repository-factory";

export const createProfessorDisponibilidadeRepository = createRepositoryFactory((ds) => ds.getRepository(ProfessorDisponibilidadeEntity).extend({}));

export type ProfessorDisponibilidadeRepository = IRepositoryFactoryOutput<typeof createProfessorDisponibilidadeRepository>;
