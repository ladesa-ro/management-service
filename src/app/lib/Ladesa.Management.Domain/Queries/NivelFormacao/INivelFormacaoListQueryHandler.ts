import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListInputDto";
import type { NivelFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListOutputDto";

export interface INivelFormacaoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null,
  ): Promise<NivelFormacaoListOutputDto>;
}
