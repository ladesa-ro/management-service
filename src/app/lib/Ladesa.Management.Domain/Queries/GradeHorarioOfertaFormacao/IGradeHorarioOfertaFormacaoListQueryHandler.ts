import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { GradeHorarioOfertaFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoListInputDto";
import type { GradeHorarioOfertaFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoListOutputDto";

export interface IGradeHorarioOfertaFormacaoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoListInputDto | null,
  ): Promise<GradeHorarioOfertaFormacaoListOutputDto>;
}
