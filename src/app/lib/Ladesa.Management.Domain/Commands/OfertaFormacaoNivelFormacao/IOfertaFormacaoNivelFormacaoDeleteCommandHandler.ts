import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoNivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoNivelFormacaoFindOneInputDto";

export interface IOfertaFormacaoNivelFormacaoDeleteCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto,
  ): Promise<boolean>;
}
