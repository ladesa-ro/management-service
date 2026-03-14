import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoListInputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoListQuery = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoListInputDto | null;
  selection?: string[] | boolean;
};

export type IGradeHorarioOfertaFormacaoListQueryHandler = IQueryHandler<
  IGradeHorarioOfertaFormacaoListQuery,
  GradeHorarioOfertaFormacaoListOutputDto
>;
export const IGradeHorarioOfertaFormacaoListQueryHandler = Symbol(
  "IGradeHorarioOfertaFormacaoListQueryHandler",
);
