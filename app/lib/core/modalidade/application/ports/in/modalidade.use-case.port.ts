import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import {
  ModalidadeCreateInput,
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
  ModalidadeUpdateInput,
} from "../../dtos";

export interface IModalidadeUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInput | null,
  ): Promise<ModalidadeListOutput>;
  findById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput,
  ): Promise<ModalidadeFindOneOutput | null>;
  findByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput,
  ): Promise<ModalidadeFindOneOutput>;
  create(
    accessContext: AccessContext,
    dto: ModalidadeCreateInput,
  ): Promise<ModalidadeFindOneOutput>;
  update(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput & ModalidadeUpdateInput,
  ): Promise<ModalidadeFindOneOutput>;
  deleteOneById(accessContext: AccessContext, dto: ModalidadeFindOneInput): Promise<boolean>;
  // Legacy method alias - accepts string id
  modalidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<ModalidadeFindOneOutput>;
}
