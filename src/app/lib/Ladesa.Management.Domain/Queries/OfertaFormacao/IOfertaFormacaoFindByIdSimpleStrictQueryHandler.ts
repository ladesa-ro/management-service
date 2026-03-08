import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneOutputDto";

export interface IOfertaFormacaoFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
  ): Promise<OfertaFormacaoFindOneOutputDto>;
}
