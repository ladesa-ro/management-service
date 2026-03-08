import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeFindOneInputDto";
import type { CidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeFindOneOutputDto";

export interface ICidadeFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CidadeFindOneInputDto,
  ): Promise<CidadeFindOneOutputDto | null>;
}
