import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { GradeHorarioOfertaFormacaoFindOneInputDto } from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoFindOneInputDto;
};

export type IGradeHorarioOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoDeleteCommand,
  boolean
>;
export const IGradeHorarioOfertaFormacaoDeleteCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoDeleteCommandHandler",
);
