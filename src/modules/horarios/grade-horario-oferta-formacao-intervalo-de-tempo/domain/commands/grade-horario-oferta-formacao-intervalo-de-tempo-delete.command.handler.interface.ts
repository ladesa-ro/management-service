import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto } from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto;
};

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommand,
  boolean
>;
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoDeleteCommandHandler",
);
