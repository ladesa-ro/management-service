import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { ModalidadeCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeCreateInputDto";
import { ModalidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneInputDto";
import { ModalidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneOutputDto";
import { ModalidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeListInputDto";
import { ModalidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeListOutputDto";
import { ModalidadeUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeUpdateInputDto";

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
