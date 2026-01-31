import type { PartialEntity } from "@/core/@shared";
import {
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
} from "@/core/modalidade";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

export const MODALIDADE_REPOSITORY_PORT = Symbol("IModalidadeRepositoryPort");

export interface IModalidadeRepositoryPort {
  findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInput | null,
  ): Promise<ModalidadeListOutput>;
  findById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput,
  ): Promise<ModalidadeFindOneOutput | null>;
  save(entity: PartialEntity<ModalidadeEntity>): Promise<ModalidadeEntity>;
  create(): ModalidadeEntity;
  merge(entity: ModalidadeEntity, data: PartialEntity<ModalidadeEntity>): void;
  softDeleteById(id: string): Promise<void>;
}
