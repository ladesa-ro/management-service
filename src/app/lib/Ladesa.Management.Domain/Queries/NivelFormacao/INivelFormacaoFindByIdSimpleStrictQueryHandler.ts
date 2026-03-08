import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";

export interface INivelFormacaoFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
  ): Promise<NivelFormacaoFindOneOutputDto>;
}
