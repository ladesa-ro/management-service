import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeCreateInputDto";
import type { ModalidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneOutputDto";

export interface IModalidadeCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;
}
