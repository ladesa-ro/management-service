import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneInputDto";

export interface IModalidadeDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: ModalidadeFindOneInputDto): Promise<boolean>;
}
