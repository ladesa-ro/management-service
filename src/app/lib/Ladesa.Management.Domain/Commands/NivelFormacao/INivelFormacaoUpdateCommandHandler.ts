import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneInputDto";
import type { NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";
import type { NivelFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoUpdateInputDto";

export interface INivelFormacaoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;
}
