import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { NivelFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoCreateInputDto";
import type { NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";

export interface INivelFormacaoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;
}
