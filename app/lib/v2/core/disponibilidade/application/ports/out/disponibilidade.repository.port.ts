import type { DeepPartial } from "typeorm";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
} from "@/v2/server/modules/disponibilidade/http/dto";

export interface IDisponibilidadeRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null,
    selection?: string[],
  ): Promise<DisponibilidadeListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null>;

  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null>;

  save(disponibilidade: DeepPartial<DisponibilidadeEntity>): Promise<DisponibilidadeEntity>;

  create(): DisponibilidadeEntity;

  merge(disponibilidade: DisponibilidadeEntity, data: DeepPartial<DisponibilidadeEntity>): void;

  softDeleteById(id: string): Promise<void>;
}
