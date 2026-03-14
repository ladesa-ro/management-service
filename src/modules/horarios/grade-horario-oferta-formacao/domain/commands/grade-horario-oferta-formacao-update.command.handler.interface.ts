import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoUpdateInputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoFindOneInputDto & GradeHorarioOfertaFormacaoUpdateInputDto;
};

export type IGradeHorarioOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoUpdateCommand,
  GradeHorarioOfertaFormacaoFindOneOutputDto
>;
export const IGradeHorarioOfertaFormacaoUpdateCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoUpdateCommandHandler",
);
