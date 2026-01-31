import type { PartialEntity } from "@/core/@shared";
import type { AulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  AulaFindOneInput,
  AulaFindOneOutput,
  AulaListInput,
  AulaListOutput,
} from "../../dtos";

export const AULA_REPOSITORY_PORT = Symbol("IAulaRepositoryPort");

export interface IAulaRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: AulaListInput | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutput>;

  findById(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  save(aula: PartialEntity<AulaEntity>): Promise<AulaEntity>;

  create(): AulaEntity;

  merge(aula: AulaEntity, data: PartialEntity<AulaEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
