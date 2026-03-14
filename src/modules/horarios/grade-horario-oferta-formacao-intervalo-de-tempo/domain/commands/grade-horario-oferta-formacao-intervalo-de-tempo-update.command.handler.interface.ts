import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto &
    GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputDto;
};

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommand,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto
>;
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoUpdateCommandHandler",
);
