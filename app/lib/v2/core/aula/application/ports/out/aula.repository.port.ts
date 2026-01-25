import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
} from "@/v2/adapters/in/http/aula/dto";
import type { AulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IAulaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  save(aula: DeepPartial<AulaEntity>): Promise<AulaEntity>;

  create(): AulaEntity;

  merge(aula: AulaEntity, data: DeepPartial<AulaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
