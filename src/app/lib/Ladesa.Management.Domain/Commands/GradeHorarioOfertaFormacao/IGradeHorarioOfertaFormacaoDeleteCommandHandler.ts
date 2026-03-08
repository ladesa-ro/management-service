import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { GradeHorarioOfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneInputDto";

export interface IGradeHorarioOfertaFormacaoDeleteCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<boolean>;
}
