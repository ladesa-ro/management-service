import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoFindOneInputDto,
  GradeHorarioOfertaFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: GradeHorarioOfertaFormacaoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IGradeHorarioOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  IGradeHorarioOfertaFormacaoFindOneQuery,
  GradeHorarioOfertaFormacaoFindOneOutputDto | null
>;
export const IGradeHorarioOfertaFormacaoFindOneQueryHandler = Symbol(
  "IGradeHorarioOfertaFormacaoFindOneQueryHandler",
);
