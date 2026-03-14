import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoListQuery = {
  accessContext: AccessContext;
  dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputDto | null;
  selection?: string[] | boolean;
};

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler = IQueryHandler<
  IGradeHorarioOfertaFormacaoIntervaloDeTempoListQuery,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto
>;
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoListQueryHandler",
);
