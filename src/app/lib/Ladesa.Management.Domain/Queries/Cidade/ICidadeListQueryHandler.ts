import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CidadeListInputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeListInputDto";
import type { CidadeListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CidadeListOutputDto";

export interface ICidadeListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CidadeListInputDto | null,
  ): Promise<CidadeListOutputDto>;
}
