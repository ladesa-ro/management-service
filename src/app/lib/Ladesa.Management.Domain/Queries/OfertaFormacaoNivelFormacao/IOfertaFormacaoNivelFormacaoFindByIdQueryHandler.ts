import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneInputDto";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneOutputDto";

export interface IOfertaFormacaoNivelFormacaoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto | null>;
}
