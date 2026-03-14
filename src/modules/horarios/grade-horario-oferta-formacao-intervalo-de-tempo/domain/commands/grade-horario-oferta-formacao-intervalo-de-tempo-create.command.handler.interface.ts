import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputDto;
};

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommand,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto
>;
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoCreateCommandHandler",
);
