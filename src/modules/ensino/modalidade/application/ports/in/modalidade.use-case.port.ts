import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "../../dtos";

export interface IModalidadeUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null,
  ): Promise<ModalidadeListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<ModalidadeFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: ModalidadeFindOneInputDto): Promise<boolean>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<ModalidadeFindOneOutputDto>;
}
