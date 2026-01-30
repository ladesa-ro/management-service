import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
} from "@/v2/server/modules/diario-professor/http/dto";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IDiarioProfessorRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null>;

  save(diarioProfessor: DeepPartial<DiarioProfessorEntity>): Promise<DiarioProfessorEntity>;

  create(): DiarioProfessorEntity;

  merge(diarioProfessor: DiarioProfessorEntity, data: DeepPartial<DiarioProfessorEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
