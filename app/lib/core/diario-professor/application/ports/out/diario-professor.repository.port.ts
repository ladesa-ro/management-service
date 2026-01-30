import type { DeepPartial } from "typeorm";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
} from "../../dtos";

export const DIARIO_PROFESSOR_REPOSITORY_PORT = Symbol("IDiarioProfessorRepositoryPort");

export interface IDiarioProfessorRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutput>;

  findById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput | null>;

  save(diarioProfessor: DeepPartial<DiarioProfessorEntity>): Promise<DiarioProfessorEntity>;

  create(): DiarioProfessorEntity;

  merge(diarioProfessor: DiarioProfessorEntity, data: DeepPartial<DiarioProfessorEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
