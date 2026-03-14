import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoCreateInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoCreateInputDto;
};

export type IGradeHorarioOfertaFormacaoCreateCommandHandler = ICommandHandler<
  IGradeHorarioOfertaFormacaoCreateCommand,
  GradeHorarioOfertaFormacaoFindOneOutputDto
>;
export const IGradeHorarioOfertaFormacaoCreateCommandHandler = Symbol(
  "IGradeHorarioOfertaFormacaoCreateCommandHandler",
);
