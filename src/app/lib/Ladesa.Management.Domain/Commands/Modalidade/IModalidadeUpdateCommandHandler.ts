import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneInputDto";
import type { ModalidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneOutputDto";
import type { ModalidadeUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeUpdateInputDto";

export interface IModalidadeUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;
}
