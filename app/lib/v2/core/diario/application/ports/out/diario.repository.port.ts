import type { DeepPartial } from "typeorm";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
} from "@/v2/server/modules/diario/http/dto";

export interface IDiarioRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  save(diario: DeepPartial<DiarioEntity>): Promise<DiarioEntity>;

  create(): DiarioEntity;

  merge(diario: DiarioEntity, data: DeepPartial<DiarioEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
