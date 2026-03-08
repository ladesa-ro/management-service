import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneOutputDto";

export interface IModalidadeFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
  ): Promise<ModalidadeFindOneOutputDto>;
}
