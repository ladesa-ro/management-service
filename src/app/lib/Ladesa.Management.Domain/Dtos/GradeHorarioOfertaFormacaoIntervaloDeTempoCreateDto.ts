import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type GradeHorarioOfertaFormacao } from "@/Ladesa.Management.Domain/Entities/GradeHorarioOfertaFormacao";
import { type IntervaloDeTempo } from "@/Ladesa.Management.Domain/Entities/IntervaloDeTempo";

export interface GradeHorarioOfertaFormacaoIntervaloDeTempoCreateDto {
  intervaloDeTempo: IFindOneByIdDto<IntervaloDeTempo["id"]>;
  gradeHorarioOfertaFormacao: IFindOneByIdDto<GradeHorarioOfertaFormacao["id"]>;
}
