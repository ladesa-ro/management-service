import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
} from "@/v2/adapters/in/http/disponibilidade/dto";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

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
