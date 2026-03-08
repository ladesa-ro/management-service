import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { GradeHorarioOfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneInputDto";
import type { GradeHorarioOfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneOutputDto";

export interface IGradeHorarioOfertaFormacaoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoFindOneInputDto,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutputDto | null>;
}
