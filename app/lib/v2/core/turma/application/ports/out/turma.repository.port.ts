import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
} from "@/v2/server/modules/turma/http/dto";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface ITurmaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null>;

  save(turma: DeepPartial<TurmaEntity>): Promise<TurmaEntity>;

  create(): TurmaEntity;

  merge(turma: TurmaEntity, data: DeepPartial<TurmaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
