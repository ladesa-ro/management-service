import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneInputDto";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneOutputDto";
import type { OfertaFormacaoNivelFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoUpdateInputDto";

export interface IOfertaFormacaoNivelFormacaoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto>;
}
