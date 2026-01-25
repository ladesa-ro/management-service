import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
} from "@/v2/adapters/in/http/disciplina/dto";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IDisciplinaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  save(disciplina: DeepPartial<DisciplinaEntity>): Promise<DisciplinaEntity>;
  create(): DisciplinaEntity;
  merge(disciplina: DisciplinaEntity, data: DeepPartial<DisciplinaEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
