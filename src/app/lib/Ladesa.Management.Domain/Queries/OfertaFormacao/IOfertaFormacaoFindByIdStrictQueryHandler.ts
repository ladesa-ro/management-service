import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { OfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneInputDto";
import type { OfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneOutputDto";

export interface IOfertaFormacaoFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;
}
