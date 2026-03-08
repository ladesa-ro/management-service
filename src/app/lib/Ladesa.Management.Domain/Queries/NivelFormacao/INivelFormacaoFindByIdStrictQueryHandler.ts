import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneInputDto";
import type { NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";

export interface INivelFormacaoFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;
}
