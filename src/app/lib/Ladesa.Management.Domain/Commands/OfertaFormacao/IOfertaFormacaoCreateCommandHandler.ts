import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoCreateInputDto";
import type { OfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneOutputDto";

export interface IOfertaFormacaoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;
}
