import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeListInputDto";
import type { ModalidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeListOutputDto";

export interface IModalidadeListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null,
  ): Promise<ModalidadeListOutputDto>;
}
