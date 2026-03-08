import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneInputDto";

export interface IOfertaFormacaoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: OfertaFormacaoFindOneInputDto): Promise<boolean>;
}
