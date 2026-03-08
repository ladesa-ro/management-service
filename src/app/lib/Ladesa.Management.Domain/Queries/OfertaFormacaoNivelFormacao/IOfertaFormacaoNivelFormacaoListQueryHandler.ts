import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoListInputDto";
import type { OfertaFormacaoNivelFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoListOutputDto";

export interface IOfertaFormacaoNivelFormacaoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoListInputDto | null,
  ): Promise<OfertaFormacaoNivelFormacaoListOutputDto>;
}
