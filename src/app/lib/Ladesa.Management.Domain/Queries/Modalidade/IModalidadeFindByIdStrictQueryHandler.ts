import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ModalidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneInputDto";
import type { ModalidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ModalidadeFindOneOutputDto";

export interface IModalidadeFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<ModalidadeFindOneOutputDto>;
}
