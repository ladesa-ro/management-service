import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoCreateInputDto";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneOutputDto";

export interface IOfertaFormacaoNivelFormacaoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;
}
