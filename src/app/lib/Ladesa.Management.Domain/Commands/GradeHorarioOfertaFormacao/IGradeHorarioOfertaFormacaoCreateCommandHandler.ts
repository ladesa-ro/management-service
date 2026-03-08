import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { GradeHorarioOfertaFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoCreateInputDto";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneOutputDto";

export interface IGradeHorarioOfertaFormacaoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto>;
}
