import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoListInputDto";
import type { OfertaFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoListOutputDto";

export interface IOfertaFormacaoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null,
  ): Promise<OfertaFormacaoListOutputDto>;
}
