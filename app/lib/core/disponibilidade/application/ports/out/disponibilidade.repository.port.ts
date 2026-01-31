import type { PartialEntity } from "@/core/@shared";
import {
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
} from "@/core/disponibilidade";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const DISPONIBILIDADE_REPOSITORY_PORT = Symbol("IDisponibilidadeRepositoryPort");

export interface IDisponibilidadeRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInput | null,
  ): Promise<DisponibilidadeListOutput>;
  findById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInput,
  ): Promise<DisponibilidadeFindOneOutput | null>;
  save(entity: PartialEntity<DisponibilidadeEntity>): Promise<DisponibilidadeEntity>;
  create(): DisponibilidadeEntity;
  merge(entity: DisponibilidadeEntity, data: PartialEntity<DisponibilidadeEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
