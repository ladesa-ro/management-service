import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { GradeHorarioOfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneInputDto";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneOutputDto";
import type { GradeHorarioOfertaFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoUpdateInputDto";

export interface IGradeHorarioOfertaFormacaoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;
}
