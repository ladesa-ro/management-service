import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import { GradeHorarioOfertaFormacaoFindOneOutputDto } from "./GradeHorarioOfertaFormacaoFindOneOutputDto";
import { IntervaloDeTempoFindOneOutputDto } from "./IntervaloDeTempoFindOneOutputDto";

export class GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto extends EntityOutputDto {
  intervaloDeTempo!: IntervaloDeTempoFindOneOutputDto;
  gradeHorarioOfertaFormacao!: GradeHorarioOfertaFormacaoFindOneOutputDto;
}
